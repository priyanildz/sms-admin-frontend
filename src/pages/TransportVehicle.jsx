import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import AddVehicleModal from "../components/AddVehicleModal";
import VehicleDetailsModal from "../components/VehicleDetailsModal"; // 🌟 NEW IMPORT
import { useCallback } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const TransportVehicle = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [vehicleData, setVehicleData] = useState([]); // This state expects an array

  // 🌟 NEW STATE for View/Edit
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    vid: Date.now(),
    type: "",
    vehiclename: "",
    capacity: "",
    regno: "",
    vehicleno: "",
    status: "active",
  });

  // --- REUSABLE FUNCTION TO FETCH VEHICLES ---
  const fetchVehicles = useCallback(async () => {
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await axios.get(`${API_BASE_URL}api/vehicles`, {
        headers: {
          auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          username: storedUsername,
          role: storedRole,
        },
      });

      // ✅ FIX: Access the 'data' property inside the response body
      setVehicleData(response.data.data || []);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      // Optionally set vehicleData to empty array if fetch fails to prevent crash
      setVehicleData([]);
    }
  }, []);

  const handleSave = async (finalFormData) => {
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await axios.post(
        `${API_BASE_URL}api/add-vehicle`,
        finalFormData,
        {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
            username: storedUsername,
            role: storedRole,
          },
        },
      );

      console.log("Vehicle added successfully:", response.data);
      await fetchVehicles();

      setShowModal(false);
      setFormData({
        vid: Date.now(),
        type: "",
        vehiclename: "",
        capacity: "",
        regno: "",
        vehicleno: "",
        status: "active",
      });

      alert("Vehicle added successfully!");
    } catch (error) {
      console.error(
        "Error saving vehicle:",
        error.response?.data || error.message,
      );
      alert(
        `Failed to save vehicle: ${error.response?.data?.error || error.message}`,
      );
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleOpenModal = () => {
    setFormData((prev) => ({
      ...prev,
      vid: Date.now(),
      status: "active",
    }));
    setShowModal(true);
  };

  // 🌟 NEW HANDLERS for View/Edit
  const handleViewClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsDetailsModalOpen(true);
  };

  const handleEditClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsDetailsModalOpen(true);
    // In VehicleDetailsModal, we will set a state to show the editable form
  };

  const handleCloseDetailsModal = () => {
    setSelectedVehicle(null);
    setIsDetailsModalOpen(false);
    fetchVehicles(); // Refresh data after closing details/edit form
  };
  // ------------------------------------

  // Ensure vehicleData is always treated as an array before filtering
  const vehiclesToFilter = Array.isArray(vehicleData) ? vehicleData : [];

  const filteredVehicles = vehiclesToFilter.filter((v) => {
    const matchesSearch =
      v.vehicleno?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.vehiclename?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || v.status?.toLowerCase() === statusFilter;

    const matchesType =
      typeFilter === "all" || v.type?.toLowerCase() === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="p-6 space-y-6">
          {/* Top Section: Search, Filters, and Add Button */}
          <div className="flex justify-between items-center flex-wrap gap-4">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search Vehicle No. or Name..."
              className="border px-3 py-2 rounded-md w-64 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="flex items-center space-x-4">
              {/* Vehicle Type Filter Dropdown */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="bus">Bus</option>
                <option value="van">Van</option>
                <option value="auto">Auto</option>
              </select>

              {/* Status Filter Dropdown */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              {/* Add Button */}
              <button
                onClick={handleOpenModal}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-150"
              >
                Add
              </button>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center text-2xl font-semibold">
            Vehicle Management
          </h2>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded text-center">
              <thead className="bg-blue-100 text-black">
                <tr>
                  <th className="px-4 py-2 border">Vehicle Number</th>
                  <th className="px-4 py-2 border">Vehicle Name</th>
                  <th className="px-4 py-2 border">Type</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Action</th>{" "}
                  {/* 🌟 NEW COLUMN HEADER */}
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredVehicles.length > 0 ? (
                  filteredVehicles.map((vehicle, idx) => (
                    <tr key={vehicle._id || idx}>
                      <td className="px-4 py-2 border">{vehicle.vehicleno}</td>
                      <td className="px-4 py-2 border">
                        {vehicle.vehiclename}
                      </td>
                      <td className="px-4 py-2 border capitalize">
                        {vehicle.type}
                      </td>
                      <td className="px-4 py-2 border">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            vehicle.status?.toLowerCase() === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {vehicle.status}
                        </span>
                      </td>
                      {/* 🌟 ACTION BUTTONS 🌟 */}
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => handleViewClick(vehicle)}
                          className="text-blue-600 hover:text-blue-800 font-medium mr-3"
                        >
                          View/Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-4 text-center text-gray-500"
                    >
                      {vehicleData.length === 0 && searchQuery === ""
                        ? "No vehicles found."
                        : "No matching vehicles found for the current search and filter criteria."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <AddVehicleModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          formData={formData}
          setFormData={setFormData}
        />

        {/* 🌟 NEW: Vehicle Details/Edit Modal Component */}
        {isDetailsModalOpen && (
          <VehicleDetailsModal
            show={isDetailsModalOpen}
            onClose={handleCloseDetailsModal}
            vehicle={selectedVehicle}
            API_BASE_URL={API_BASE_URL}
            // When editing is complete, the modal will call onClose and fetchVehicles will run
          />
        )}
      </div>
    </MainLayout>
  );
};
export default TransportVehicle;
