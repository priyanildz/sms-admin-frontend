import React, { useState, useEffect, useCallback } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";

// --- HELPER FUNCTION: Get Name from ID (Minor Robustness Improvement) ---
const getNameFromId = (id, list, idKey, nameKey) => {
  // Return 'Unassigned' if ID is null, undefined, or empty string
  if (!id) return "Unassigned";

  // Ensure the ID is treated as a string for comparison
  const idString = id.toString();

  // Safely look up the item using toString() for the list item's key as well
  const item = list.find((item) => item[idKey]?.toString() === idString);

  // Return the specific name field, or 'Unassigned'
  return item ? item[nameKey] : "Unassigned";
};
// ------------------------------------------

// --- MODAL COMPONENT ---
const AddAssignmentModal = ({
  show,
  onClose,
  currentVehicle,
  allDrivers,
  allSupervisors,
}) => {
  if (!show || !currentVehicle) return null;

  const isAssigned =
    currentVehicle.driver !== "Unassigned" ||
    currentVehicle.supervisor !== "Unassigned";
  const modalTitle = isAssigned
    ? `Edit Assignment for ${currentVehicle.vehicleNumber}`
    : `Assign Staff to ${currentVehicle.vehicleNumber}`;

  const [isSaving, setIsSaving] = useState(false);

  // Initialize form data with the current assigned IDs (which could be null)
  const [formData, setFormData] = useState({
    assignedDriverId: currentVehicle.assignedDriverId || "",
    assignedSupervisorId: currentVehicle.assignedSupervisorId || "",
  });

  const storedUsername = localStorage.getItem("username") || "System_User";
  const storedRole = localStorage.getItem("role") || "admin";
  const headers = {
    auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
    username: storedUsername,
    role: storedRole,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    // Payload sends the selected ObjectId, which Mongoose expects.
    // Use an empty string check as the select defaults to '' for Unassigned.
    const payload = {
      assignedDriverId: formData.assignedDriverId || null,
      assignedSupervisorId: formData.assignedSupervisorId || null,
    };

    try {
      // PUT request to the vehicle update route
      const response = await axios.put(
        `${API_BASE_URL}api/update-vehicle/${currentVehicle._id}`,
        payload,
        { headers },
      );

      if (response.status === 200) {
        alert(
          `Assignment for ${currentVehicle.vehicleNumber} updated successfully!`,
        );
        onClose(true); // Close and refresh table
      } else {
        throw new Error("Server response failed.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error(
        "Assignment Save Error:",
        error.response?.data || error.message,
      );
      alert(
        `Failed to save assignment: ${errorMessage}. If the 500 error persists, check your backend update logic to ensure required fields are handled.`,
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        // Using RGBA to create the dimming effect without blurring the backdrop
        backgroundColor: "rgba(50, 50, 50, 0.5)",
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h3 className="text-xl font-bold mb-4 text-blue-600">{modalTitle}</h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Vehicle Number
            </label>
            <input
              type="text"
              value={currentVehicle.vehicleNumber}
              disabled
              className="border p-2 w-full rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Select Driver
            </label>
            <select
              className="border p-2 w-full rounded-md"
              name="assignedDriverId"
              value={formData.assignedDriverId || ""}
              onChange={(e) =>
                setFormData({ ...formData, assignedDriverId: e.target.value })
              }
              disabled={isSaving}
            >
              <option value="">-- Unassigned --</option>
              {/* Dynamically populate drivers with their actual MongoDB _id */}
              {allDrivers.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.driverName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Select Supervisor
            </label>
            <select
              className="border p-2 w-full rounded-md"
              name="assignedSupervisorId"
              value={formData.assignedSupervisorId || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  assignedSupervisorId: e.target.value,
                })
              }
              disabled={isSaving}
            >
              <option value="">-- Unassigned --</option>
              {/* Dynamically populate supervisors with their actual MongoDB _id */}
              {allSupervisors.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.fullName}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => onClose()}
              disabled={isSaving}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed"
              disabled={isSaving}
            >
              {isSaving
                ? "Saving..."
                : isAssigned
                  ? "Save Changes"
                  : "Assign Vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function VehicleAssign() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [assignmentData, setAssignmentData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVehicleToEdit, setCurrentVehicleToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // STATES FOR STAFF LOOKUP
  const [allDrivers, setAllDrivers] = useState([]);
  const [allSupervisors, setAllSupervisors] = useState([]);

  const storedUsername = localStorage.getItem("username") || "System_User";
  const storedRole = localStorage.getItem("role") || "admin";
  const headers = {
    auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
    username: storedUsername,
    role: storedRole,
  };

  // --- 1. FETCH STAFF LISTS (Drivers and Supervisors) ---
  const fetchStaffData = useCallback(async () => {
    try {
      // Fetch Drivers (using /api/drivers route)
      const driversRes = await axios.get(`${API_BASE_URL}api/drivers`, {
        headers,
      });
      // Ensure the response data structure is handled (using .data or .data.data depending on your controller)
      const driverList = driversRes.data.data || driversRes.data || [];
      setAllDrivers(driverList);

      // Fetch Supervisors (using /api/vsupervisior route)
      const supervisorsRes = await axios.get(
        `${API_BASE_URL}api/vsupervisior`,
        { headers },
      );
      const supervisorList =
        supervisorsRes.data.data || supervisorsRes.data || [];
      setAllSupervisors(supervisorList);
    } catch (error) {
      console.error("Error fetching staff lists for lookup:", error);
      // Allow component to render even if staff lists fail
    }
  }, []);

  // --- 2. FETCH VEHICLES AND MAP IDs TO NAMES ---
  const fetchAssignmentData = useCallback(async () => {
    // This check is removed to allow the initial run, trusting the useEffect dependency.

    try {
      setIsLoading(true);
      // Backend returns raw vehicle data containing assignedDriverId (ObjectID)
      const vehiclesResponse = await axios.get(`${API_BASE_URL}api/vehicles`, {
        headers,
      });
      const vehicles =
        vehiclesResponse.data.data || vehiclesResponse.data || [];

      const combinedAssignments = vehicles.map((vehicle) => {
        const assignedDriverId = vehicle.assignedDriverId;
        const assignedSupervisorId = vehicle.assignedSupervisorId;

        return {
          _id: vehicle._id,
          vehicleNumber: vehicle.vehicleno || "N/A",
          vehicleType: vehicle.type || "N/A",
          // Normalizing status to lower case for reliable filtering
          status: vehicle.status ? vehicle.status.toLowerCase() : "n/a",

          // FRONTEND LOOKUP: Translate the ID to the Name for display
          driver: getNameFromId(
            assignedDriverId,
            allDrivers,
            "_id",
            "driverName", // Field in driverModel
          ),
          supervisor: getNameFromId(
            assignedSupervisorId,
            allSupervisors,
            "_id",
            "fullName", // Field in vehicleSupervisior model
          ),

          // Pass the raw IDs back down for the modal form
          assignedDriverId: assignedDriverId || null,
          assignedSupervisorId: assignedSupervisorId || null,
          assignedRouteId: vehicle.assignedRouteId || null,
          currentStudents: vehicle.currentStudents || 0,
        };
      });

      setAssignmentData(combinedAssignments);
    } catch (error) {
      console.error("Error fetching vehicle assignment data:", error);
      setAssignmentData([]);
    } finally {
      setIsLoading(false);
    }
  }, [allDrivers, allSupervisors]);

  // Initial Load: Fetch Staff Lists (Runs only once)
  useEffect(() => {
    fetchStaffData();
  }, [fetchStaffData]);

  // Load Assignments: Runs after initial staff fetch AND whenever staff lists update (refresh)
  useEffect(() => {
    fetchAssignmentData();
  }, [fetchAssignmentData]);

  const handleCloseModal = (shouldRefresh = false) => {
    setIsModalOpen(false);
    setCurrentVehicleToEdit(null);
    if (shouldRefresh) {
      // Trigger both staff and assignment data refresh after a successful save
      fetchStaffData();
    }
  };

  // Filter logic: Includes Status Filter
  const filteredData = assignmentData.filter((row) => {
    const matchesSearch =
      row.vehicleNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.vehicleType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.driver?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.supervisor?.toLowerCase().includes(searchQuery.toLowerCase());

    // Compare the already lower-cased row.status against the lower-cased filter
    const matchesStatus =
      statusFilter === "all" || row.status === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleActionClick = (vehicle) => {
    setCurrentVehicleToEdit(vehicle);
    setIsModalOpen(true);
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="p-4 sm:p-6 space-y-6">
          {/* Search Bar & Filter */}
          <div className="flex justify-between items-center flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search Vehicle, Driver, or Supervisor..."
              className="border px-3 py-2 rounded-md w-full max-w-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Status Filter Dropdown */}
            <div className="flex items-center space-x-4">
              {/* <label className="text-sm font-medium">Filter Status:</label> */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center text-xl sm:text-2xl font-semibold">
            Vehicle Assignment Management
          </h2>

          {/* Table */}
          <div className="overflow-x-auto mt-4">
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">
                Loading available vehicles...
              </div>
            ) : (
              <table className="min-w-full border border-gray-300 text-center rounded text-sm sm:text-base">
                <thead className="bg-blue-100 text-black">
                  <tr>
                    <th className="px-4 py-2 border">Vehicle Number</th>
                    <th className="px-4 py-2 border">Vehicle Type</th>
                    <th className="px-4 py-2 border">Status</th>
                    <th className="px-4 py-2 border">Driver</th>
                    <th className="px-4 py-2 border">Supervisor</th>
                    <th className="px-4 py-2 border">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {filteredData.length > 0 ? (
                    filteredData.map((row) => {
                      const isAssigned =
                        row.driver !== "Unassigned" ||
                        row.supervisor !== "Unassigned";
                      return (
                        <tr key={row._id}>
                          <td className="px-4 py-2 border">
                            {row.vehicleNumber}
                          </td>
                          <td className="px-4 py-2 border">
                            {row.vehicleType}
                          </td>
                          <td className="px-4 py-2 border">
                            <span
                              className={`font-semibold ${row.status === "active" ? "text-green-600" : "text-red-600"}`}
                            >
                              {/* Capitalize status for display */}
                              {row.status?.charAt(0).toUpperCase() +
                                row.status?.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-2 border">{row.driver}</td>
                          <td className="px-4 py-2 border">{row.supervisor}</td>

                          <td className="px-4 py-2 border space-x-2">
                            {isAssigned ? (
                              <button
                                title="View/Edit Assignment"
                                className="text-yellow-600 hover:text-yellow-800"
                                onClick={() => handleActionClick(row)}
                              >
                                <FontAwesomeIcon icon={faPenToSquare} />
                              </button>
                            ) : (
                              <button
                                title="Add Assignment"
                                className="text-green-600 hover:text-green-800"
                                onClick={() => handleActionClick(row)}
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-4 text-gray-500">
                        {searchQuery || statusFilter !== "all"
                          ? "No matching vehicles found."
                          : "No vehicles found in the system."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
          {/* Modal for assignment */}
          <AddAssignmentModal
            show={isModalOpen}
            onClose={handleCloseModal}
            currentVehicle={currentVehicleToEdit}
            allDrivers={allDrivers} // Pass full staff list to modal
            allSupervisors={allSupervisors} // Pass full staff list to modal
          />
        </div>
      </div>
    </MainLayout>
  );
}
