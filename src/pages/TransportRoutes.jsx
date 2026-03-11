import React, { useState, useEffect, useCallback } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faUsers,
  faPlus,
  faRoute,
  faBus,
  faMapMarkerAlt,
  faTrash,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

// --- MODAL COMPONENT (Reused) ---
const Modal = ({ isOpen, onClose, title, children, size = "lg" }) => {
  if (!isOpen) return null;

  const maxWidthClass =
    size === "lg"
      ? "max-w-2xl"
      : size === "xl"
        ? "max-w-4xl"
        : size === "sm"
          ? "max-w-md"
          : "max-w-md";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: "rgba(50, 50, 50, 0.5)",
      }}
    >
      <div
        className={`bg-white rounded-lg p-6 w-full ${maxWidthClass} mx-4 max-h-[90vh] overflow-y-auto shadow-2xl`}
      >
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// --- HELPER FUNCTION: Get Name from ID ---
const getNameFromId = (id, list, idKey, nameKey) => {
  if (!id) return "Unassigned";
  const idString = id.toString();
  const item = list.find((item) => item[idKey]?.toString() === idString);
  return item ? item[nameKey] : "Unassigned";
};

// --- NEW MODAL: Create Route & Assign Staff (Reused) ---
const CreateRouteStaffAssignmentModal = ({
  onClose,
  onAssign,
  eligibleVehicles,
  allDrivers,
  allSupervisors,
}) => {
  const [assignmentData, setAssignmentData] = useState({
    routeId: "", // Vehicle ID
    assignedDriverId: "",
    assignedSupervisorId: "",
  });

  const [newRoutes, setNewRoutes] = useState([
    { id: Date.now(), routeName: "" },
  ]);

  const [isSaving, setIsSaving] = useState(false);

  const selectedVehicleDetails = eligibleVehicles.find(
    (v) => v._id === assignmentData.routeId,
  );

  useEffect(() => {
    if (selectedVehicleDetails) {
      setAssignmentData((prev) => ({
        ...prev,
        assignedDriverId: selectedVehicleDetails.assignedDriverId || "",
        assignedSupervisorId: selectedVehicleDetails.assignedSupervisorId || "",
      }));
    } else {
      setAssignmentData((prev) => ({
        ...prev,
        assignedDriverId: "",
        assignedSupervisorId: "",
      }));
    }
  }, [selectedVehicleDetails]);

  const handleAddRouteInput = () => {
    setNewRoutes([...newRoutes, { id: Date.now(), routeName: "" }]);
  };

  const handleRemoveRouteInput = (id) => {
    if (newRoutes.length > 1) {
      setNewRoutes(newRoutes.filter((route) => route.id !== id));
    }
  };

  const handleRouteNameChange = (id, value) => {
    setNewRoutes(
      newRoutes.map((route) =>
        route.id === id ? { ...route, routeName: value } : route,
      ),
    );
  };

  const storedUsername = localStorage.getItem("username") || "System_User";
  const storedRole = localStorage.getItem("role") || "admin";
  const isVehicleSelected = !!assignmentData.routeId;
  const isFormValid =
    isVehicleSelected && newRoutes.every((r) => r.routeName.trim() !== "");
  const headers = {
    auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
    username: storedUsername,
    role: storedRole,
  };

  const handleAssign = async () => {
    if (!isFormValid) {
      alert("Please select a vehicle and ensure all route names are entered.");
      return;
    }

    setIsSaving(true);

    try {
      const vehicleIdToUpdate = assignmentData.routeId;
      const routePromises = [];

      for (const routeInput of newRoutes) {
        const routePayload = {
          routeName: routeInput.routeName,
          from: "Not Set",
          to: "Not Set",
          vehicleNumber: selectedVehicleDetails.vehicleno,
        };

        routePromises.push(
          axios.post(`${API_BASE_URL}api/add-route`, routePayload, { headers }),
        );
      }

      const results = await Promise.all(routePromises);

      const newRouteIds = results
        .filter((res) => res.status === 200 || res.status === 201)
        .map((res) => res.data.data?._id || res.data?._id)
        .filter((id) => id);

      if (newRouteIds.length === 0) {
        throw new Error(
          "No routes were successfully created. Check for duplicates.",
        );
      }

      const vehicleUpdatePayload = {
        assignedRouteId: newRouteIds,
      };

      const updateVehicleRes = await axios.put(
        `${API_BASE_URL}api/update-vehicle/${vehicleIdToUpdate}`,
        vehicleUpdatePayload,
        { headers },
      );

      if (updateVehicleRes.status !== 200 && updateVehicleRes.status !== 201) {
        throw new Error("Routes created but failed to link to vehicle.");
      }

      alert(
        `${newRouteIds.length} route(s) saved. Vehicle ${selectedVehicleDetails.vehicleno} now assigned to all new routes successfully.`,
      );
      onAssign(true);
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      console.error(
        "Route/Assignment Save Error:",
        error.response?.data || error.message,
      );

      if (errorMessage.includes("Duplicate entry detected")) {
        alert(`Error: One or more route names already exists.`);
      } else {
        alert(`Failed to save routes/assignment: ${errorMessage}`);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-1">
      {/* 1. Vehicle, Driver, Supervisor Section */}
      <div className="space-y-4 p-3 border border-gray-200 rounded-lg bg-gray-50">
        <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-3">
          <FontAwesomeIcon icon={faBus} /> VEHICLE & STAFF SELECTION
        </h4>

        {/* Vehicle Selection */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Vehicle No. :
          </label>
          <div className="relative w-full">
            <select
              value={assignmentData.routeId}
              onChange={(e) =>
                setAssignmentData({
                  ...assignmentData,
                  routeId: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              disabled={isSaving}
              required
            >
              <option value="">-- Select Eligible Vehicle --</option>
              {eligibleVehicles.map((v) => (
                <option key={v._id} value={v._id}>
                  {v.vehicleno} ({v.vehiclename}) - {v.status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Driver (Read-only status) */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Driver:
          </label>
          <div className="relative w-full">
            <input
              type="text"
              value={
                selectedVehicleDetails
                  ? getNameFromId(
                      selectedVehicleDetails.assignedDriverId,
                      allDrivers,
                      "_id",
                      "driverName",
                    )
                  : "Select Vehicle"
              }
              className={`w-full border rounded px-3 py-2 text-sm ${isVehicleSelected ? "bg-white" : "bg-gray-100 opacity-80"}`}
              disabled
            />
          </div>
        </div>

        {/* Supervisor (Read-only status) */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Supervisor:
          </label>
          <div className="relative w-full">
            <input
              type="text"
              value={
                selectedVehicleDetails
                  ? getNameFromId(
                      selectedVehicleDetails.assignedSupervisorId,
                      allSupervisors,
                      "_id",
                      "fullName",
                    )
                  : "Select Vehicle"
              }
              className={`w-full border rounded px-3 py-2 text-sm ${isVehicleSelected ? "bg-white" : "bg-gray-100 opacity-80"}`}
              disabled
            />
          </div>
        </div>
      </div>

      <hr className="my-4" />

      {/* 2. Route Details Section (Dynamic Route Input) */}
      <div className="space-y-4 p-3 border border-gray-200 rounded-lg">
        <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
          <FontAwesomeIcon icon={faRoute} /> ROUTE DETAILS
        </h4>

        {newRoutes.map((route, index) => (
          <div key={route.id} className="flex items-center gap-2">
            <input
              type="text"
              placeholder={`Route Name ${index + 1}`}
              value={route.routeName}
              onChange={(e) => handleRouteNameChange(route.id, e.target.value)}
              className="w-full border px-3 py-2 rounded-md text-sm"
              disabled={isSaving || !isVehicleSelected}
              required
            />
            {/* Action buttons */}
            {index === newRoutes.length - 1 ? (
              <button
                type="button"
                onClick={handleAddRouteInput}
                className="text-green-600 text-xl"
                title="Add another Route"
                disabled={isSaving || !isVehicleSelected}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleRemoveRouteInput(route.id)}
                className="text-red-500 text-lg"
                title="Remove Route"
                disabled={isSaving}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleAssign}
          className={`px-6 py-2 font-semibold text-white rounded hover:bg-blue-600 transition-colors ${isSaving ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500"}`}
          disabled={isSaving || !isFormValid}
        >
          {isSaving ? "Saving..." : "Save All Routes"}
        </button>
      </div>
    </div>
  );
};

// --- Step 1: Class Selection (Reused) ---
const ClassSelectionStep = ({ onNext, onClose }) => {
  const [classData, setClassData] = useState({
    standard: "",
    division: "",
  });

  const standards = [
    "Nursery",
    "Junior",
    "Senior",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];
  const divisions = ["A", "B", "C", "D", "E"];

  const handleNext = () => {
    if (classData.standard && classData.division) {
      onNext(classData);
    } else {
      alert("Please select both standard and division");
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h4 className="text-lg font-medium text-gray-800">
          Step 1: Select Class
        </h4>
        <p className="text-gray-600">
          Choose the standard and division to view students
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Standard
        </label>
        <select
          value={classData.standard}
          onChange={(e) =>
            setClassData({ ...classData, standard: e.target.value })
          }
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Standard</option>
          {standards.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Division
        </label>
        <select
          value={classData.division}
          onChange={(e) =>
            setClassData({ ...classData, division: e.target.value })
          }
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Division</option>
          {divisions.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// --- Step 2: Student Assignment (Reused) ---
const StudentAssignmentStep = ({
  classInfo,
  onBack,
  onClose,
  onSubmit,
  routes,
}) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [assignmentData, setAssignmentData] = useState({
    standard: classInfo.standard,
    division: classInfo.division,
    routeName: "",
    pickupPoint: "",
  });

  const storedUsername = localStorage.getItem("username") || "System_User";
  const storedRole = localStorage.getItem("role") || "admin";
  const headers = {
    auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
    username: storedUsername,
    role: storedRole,
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      if (classInfo.standard && classInfo.division) {
        const res = await axios.post(
          `${API_BASE_URL}api/student`,
          { standard: classInfo.standard, division: classInfo.division },
          { headers },
        );

        const transportStudents = (res.data.data || res.data || [])
          .filter(
            (student) =>
              student.transport?.transportstatus?.toLowerCase() === "yes",
          )
          .map((student) => ({
            ...student,
            pickupPoint: student.transport?.pickuppoint || "Not Set",
            dropPoint: student.transport?.droppoint || "Not Set",
            currentRoute: student.transport?.busroute || "Unassigned",
          }));

        setStudents(transportStudents);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      setStudents([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [classInfo]);

  const handleStudentSelection = (studentId) => {
    setSelectedStudents((prev) => {
      if (prev.includes(studentId)) {
        return prev.filter((id) => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  const handleAssignRoute = () => {
    if (selectedStudents.length === 0) {
      alert("Please select at least one student");
      return;
    }
    if (!assignmentData.routeName) {
      alert("Please select a route");
      return;
    }
    if (!assignmentData.pickupPoint) {
      alert("Please enter pickup point");
      return;
    }

    const assignmentInfo = {
      standard: classInfo.standard,
      division: classInfo.division,
      routeName: assignmentData.routeName,
      pickupPoint: assignmentData.pickupPoint,
      students: selectedStudents,
    };

    onSubmit(assignmentInfo);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-600">Loading students...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h4 className="text-lg font-medium text-gray-800">
          Step 2: Assign Route
        </h4>
        <p className="text-gray-600">
          Students from {classInfo.standard} - {classInfo.division}
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
        <h5 className="font-medium text-gray-800">Route Assignment Details</h5>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Route
            </label>
            <select
              value={assignmentData.routeName}
              onChange={(e) => {
                setAssignmentData({
                  ...assignmentData,
                  routeName: e.target.value,
                });
              }}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Route</option>
              {routes.map((route) => (
                <option key={route._id} value={route.routeName}>
                  {route.routeName} ({route.from} to {route.to})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Point
            </label>
            <input
              type="text"
              value={assignmentData.pickupPoint}
              onChange={(e) =>
                setAssignmentData({
                  ...assignmentData,
                  pickupPoint: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter pickup stop name"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <h5 className="font-medium text-gray-800 mb-3">
          Select Students ({selectedStudents.length} selected)
        </h5>

        <div className="max-h-64 overflow-y-auto border border-gray-200 rounded">
          {students.map((student) => (
            <div
              key={student._id}
              className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50"
            >
              <input
                type="checkbox"
                id={`student-${student._id}`}
                checked={selectedStudents.includes(student._id)}
                onChange={() => handleStudentSelection(student._id)}
                className="mr-3"
              />
              <label
                htmlFor={`student-${student._id}`}
                className="flex-1 cursor-pointer"
              >
                <div className="flex justify-between items-center w-full">
                  <div>
                    <div className="font-medium">
                      {student.firstname} {student.lastname}
                    </div>
                  </div>
                  <div className="text-right text-sm space-y-1 text-gray-700">
                    {/* Display Pickup/Drop Points Properly */}
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="text-xs text-blue-500"
                      />Pickup: {student.pickupPoint}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 ml-3">
                      Drop: {student.dropPoint}
                    </div>
                  </div>
                </div>
              </label>
            </div>
          ))}
        </div>

        {students.length === 0 && (
          <div className="text-center py-8 text-gray-600">
            No students with transport requirement found in {classInfo.standard}
            - {classInfo.division}
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <div>
          <button
            onClick={handleAssignRoute}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={
              selectedStudents.length === 0 ||
              !assignmentData.routeName ||
              !assignmentData.pickupPoint
            }
          >
            Assign Route ({selectedStudents.length})
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Route Students Modal (FINALIZED) ---
const RouteStudentsModal = ({
  isOpen,
  onClose,
  route,
  studentsData,
  allStudents,
  fetchAllData,
}) => {
  if (!isOpen || !route) return null;

  const storedUsername = localStorage.getItem("username") || "System_User";
  const storedRole = localStorage.getItem("role") || "admin";
  const headers = {
    auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
    username: storedUsername,
    role: storedRole,
  };

  // 1. Get the list of route names assigned to the vehicle
  const assignedRouteNames = route.routeName
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name !== "No Route");

  // 2. Filter the assignment records (studentsData) based on the vehicle's assigned routes
  const studentsOnRouteAssignments = studentsData.filter((s) =>
    assignedRouteNames.includes(s.routeName),
  );

  // 3. Join with full student data for display
  const studentsForDisplay = studentsOnRouteAssignments.map((assignment) => {
    const fullStudent = allStudents.find(
      (s) =>
        s.studentid === assignment.studentId || s._id === assignment.studentId,
    );

    return {
      assignmentId: assignment.assignmentId,
      studentName: fullStudent
        ? `${fullStudent.firstname} ${fullStudent.lastname}`
        : "Student Missing",
      studentClass: fullStudent ? fullStudent.admission.admissionstd : "N/A",
      studentDiv: fullStudent ? fullStudent.admission.admissiondivision : "N/A",
      route: assignment.routeName,
      pickupPoint: assignment.pickupPoint,
    };
  });

  // Delete function calls the backend API and refreshes the data
  const handleDeleteStudentAssignment = (assignmentId) => {
    if (
      window.confirm(
        `Are you sure you want to remove this student assignment? This action will remove the student from this specific route.`,
      )
    ) {
      axios
        .delete(`${API_BASE_URL}api/students-route/${assignmentId}`, {
          headers,
        })
        .then(() => {
          alert("Assignment deleted successfully!");
          fetchAllData(); // Refresh data in parent component
        })
        .catch((error) => {
          console.error(
            "Error deleting assignment:",
            error.response?.data || error.message,
          );
          alert(
            `Error deleting assignment: ${error.response?.data?.message || error.message}`,
          );
        });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Students on Route(s): ${route.routeName}`}
      size="xl"
    >
      <div className="space-y-4">
        {/* Header Block: Match Blue/Gray styling */}
        <div className="grid grid-cols-3 gap-4 bg-blue-50 p-3 rounded-lg text-sm font-semibold text-gray-700">
          <div>Vehicle: {route.vehicleNumber}</div>
          <div>Capacity: {route.vehicle?.capacity || "N/A"}</div>
          <div>Students Assigned: {studentsForDisplay.length}</div>
        </div>

        <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-lg">
          <table className="min-w-full text-sm">
            {/* Table Header: Match Blue/Gray styling */}
            <thead className="sticky top-0 bg-blue-100 text-black font-semibold">
              <tr>
                <th className="px-4 py-3 text-left border-b border-gray-300">
                  Student Name
                </th>
                <th className="px-4 py-3 text-left border-b border-gray-300">
                  Class
                </th>
                <th className="px-4 py-3 text-left border-b border-gray-300">
                  Div
                </th>
                <th className="px-4 py-3 text-left border-b border-gray-300">
                  Route
                </th>
                <th className="px-4 py-3 text-left border-b border-gray-300">
                  Pickup Point
                </th>
                <th className="px-4 py-3 text-left border-b border-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {studentsForDisplay.length > 0 ? (
                studentsForDisplay.map((student) => (
                  <tr
                    key={student.assignmentId}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">{student.studentName}</td>
                    <td className="px-4 py-2">{student.studentClass}</td>
                    <td className="px-4 py-2">{student.studentDiv}</td>
                    <td className="px-4 py-2 font-medium text-blue-700">
                      {student.route}
                    </td>
                    <td className="px-4 py-2">{student.pickupPoint}</td>
                    <td className="px-4 py-2 space-x-2">
                      {/* Delete action only */}
                      <button
                        onClick={() =>
                          handleDeleteStudentAssignment(student.assignmentId)
                        }
                        className="text-red-600 hover:text-red-800"
                        title="Remove Assignment"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No students currently assigned to these routes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 border border-gray-300 rounded text-gray-700 hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

// --- MAIN COMPONENT: TransportRoutes ---
const TransportRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [allDrivers, setAllDrivers] = useState([]);
  const [allSupervisors, setAllSupervisors] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [isCreateRouteModalOpen, setIsCreateRouteModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isRouteStudentsModalOpen, setIsRouteStudentsModalOpen] =
    useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [studentRoutes, setStudentRoutes] = useState([]);

  const storedUsername = localStorage.getItem("username") || "System_User";
  const storedRole = localStorage.getItem("role") || "admin";
  const headers = {
    auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
    username: storedUsername,
    role: storedRole,
  };

  // --- Data Fetching Logic ---
  const fetchAllData = useCallback(async () => {
    try {
      const [
        driversRes,
        supervisorsRes,
        routesRes,
        vehiclesRes,
        studentRoutesRes,
        studentsRes,
      ] = await Promise.all([
        axios.get(`${API_BASE_URL}api/drivers`, { headers }),
        axios.get(`${API_BASE_URL}api/vsupervisior`, { headers }),
        axios.get(`${API_BASE_URL}api/routes`, { headers }),
        axios.get(`${API_BASE_URL}api/vehicles`, { headers }),
        axios.get(`${API_BASE_URL}api/students-route`, { headers }),
        axios.get(`${API_BASE_URL}api/students`, { headers }),
      ]);

      setAllDrivers(driversRes.data.data || driversRes.data || []);
      setAllSupervisors(supervisorsRes.data.data || supervisorsRes.data || []);
      setRoutes(routesRes.data || []);
      setVehicles(vehiclesRes.data.data || []);
      setStudentRoutes(studentRoutesRes.data || []);
      setAllStudents(studentsRes.data.data || studentsRes.data || []);
    } catch (error) {
      console.error("Error fetching transport data:", error);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // --- Data Processing for Main Table ---
  const combinedTableData = vehicles
    .filter(
      (v) =>
        v.assignedDriverId ||
        v.assignedSupervisorId ||
        (v.assignedRouteId && v.assignedRouteId.length > 0),
    )
    .map((vehicle) => {
      const assignedRouteIds = Array.isArray(vehicle.assignedRouteId)
        ? vehicle.assignedRouteId
        : [];
      const assignedRouteObjects = routes.filter((r) =>
        assignedRouteIds.includes(r._id),
      );
      const assignedRouteNames = assignedRouteObjects.map((r) => r.routeName);

      const studentCount = studentRoutes.filter((sa) =>
        assignedRouteNames.includes(sa.routeName),
      ).length;

      let routeNameDisplay = "No Route";
      if (assignedRouteIds.length > 0) {
        routeNameDisplay = assignedRouteObjects
          .map((r) => r.routeName)
          .join(", ");
      }

      const firstRoute = assignedRouteObjects[0] || {};

      return {
        _id: vehicle._id,
        vehicleNumber: vehicle.vehicleno,
        vehicleType: vehicle.vehiclename,
        status: vehicle.status,
        capacity: vehicle.capacity,

        driver: getNameFromId(
          vehicle.assignedDriverId,
          allDrivers,
          "_id",
          "driverName",
        ),
        supervisor: getNameFromId(
          vehicle.assignedSupervisorId,
          allSupervisors,
          "_id",
          "fullName",
        ),

        routeId: assignedRouteIds, // Array of IDs
        routeName: routeNameDisplay, // String display
        routeFrom: firstRoute.from,
        routeTo: firstRoute.to,

        studentCount,
      };
    });

  const filteredTableData = combinedTableData.filter((item) =>
    `${item.routeName} ${item.vehicleNumber} ${item.driver} ${item.supervisor}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  // Filter for unassigned vehicles that are ELIGIBLE for route creation
  const eligibleVehicles = vehicles.filter(
    (v) =>
      (Array.isArray(v.assignedRouteId)
        ? v.assignedRouteId.length === 0
        : !v.assignedRouteId) &&
      v.assignedDriverId &&
      v.assignedSupervisorId,
  );

  // --- Helper to format student route data for the modal (Joining data) ---
  const formattedStudentRoutes = studentRoutes.flatMap((assignment) => {
    const assignmentDocId = assignment._id;

    return (assignment.students || []).map((studentId) => {
      const fullStudent = allStudents.find(
        (s) => s.studentid === studentId || s._id === studentId,
      );

      return {
        assignmentId: assignmentDocId,
        studentId: studentId,
        routeName: assignment.routeName,
        pickupPoint: assignment.pickupPoint,

        studentName: fullStudent
          ? `${fullStudent.firstname} ${fullStudent.lastname}`
          : "Student ID Missing",
        studentClass: fullStudent ? fullStudent.admission.admissionstd : "N/A",
        studentDiv: fullStudent
          ? fullStudent.admission.admissiondivision
          : "N/A",
        primarycontact: fullStudent?.parent?.primarycontact || "N/A",
      };
    });
  });

  const handleOpenRouteStudentsModal = (row) => {
    const fullVehicleData = vehicles.find(
      (v) => v.vehicleno === row.vehicleNumber,
    );

    setSelectedRoute({
      routeName: row.routeName,
      from: row.routeFrom,
      to: row.routeTo,
      vehicleNumber: row.vehicleNumber,
      vehicle: fullVehicleData,
    });
    setIsRouteStudentsModalOpen(true);
  };

  const handleAddStudent = async (assignmentData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}api/add-student-route`,
        assignmentData,
        {
          headers: {
            ...headers,
            "Content-Type": "application/json",
            username: storedUsername,
            role: storedRole,
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        alert("Students assigned successfully! Refreshing data...");
        setIsStudentModalOpen(false);
        fetchAllData();
      }
    } catch (error) {
      console.error(
        "Error assigning students:",
        error.response?.data || error.message,
      );
      alert("Error assigning students. Please check console for details.");
    }
  };

  const handleRouteAssignmentSubmit = (shouldRefresh = false) => {
    setIsCreateRouteModalOpen(false);
    if (shouldRefresh) {
      fetchAllData();
    }
  };

  // --- FUNCTION: Clear Route Assignment (Sets array to empty) ---
  const handleUnassignRouteFromVehicle = async (
    vehicleId,
    routeIds,
    routeNameDisplay,
  ) => {
    if (
      !window.confirm(
        `Are you sure you want to CLEAR ALL routes (${routeNameDisplay}) assigned to this vehicle? Before that, please ensure you have deleted student assignments for these routes to avoid orphaned records.`,
      )
    ) {
      return;
    }

    try {
      // NOTE: This PUT hits the existing /api/update-vehicle/:id endpoint.
      // The backend must be configured to handle the [] payload correctly.
      const updatePayload = {
        assignedRouteId: [], // Clear the array
      };

      const response = await axios.put(
        `${API_BASE_URL}api/update-vehicle/${vehicleId}`,
        updatePayload,
        { headers },
      );

      if (response.status === 200) {
        // If the vehicle update succeeds, alert the user about the next manual step
        alert(
          `Route assignment successfully cleared from vehicle! Please also delete student assignment documents for these routes.`,
        );
        fetchAllData();
      }
    } catch (error) {
      console.error("Error clearing route assignment:", error);
      alert(`Error clearing route assignment: ${error.message}`);
    }
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="p-4 space-y-6">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex w-full lg:w-auto justify-start">
              <input
                type="text"
                placeholder="Search route, vehicle, driver, or supervisor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-4 py-2 rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto justify-end">
              <button
                onClick={() => setIsStudentModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Assign Student
              </button>
              <button
                onClick={() => setIsCreateRouteModalOpen(true)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
              >
                Add Route
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <h2 className="text-2xl font-semibold">Route Schedule</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-center rounded text-sm sm:text-base">
              <thead className="bg-blue-100 text-black">
                <tr>
                  <th className="px-4 py-2 border">Vehicle Number</th>
                  <th className="px-4 py-2 border">Vehicle Type</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Driver</th>
                  <th className="px-4 py-2 border">Supervisor</th>
                  <th className="px-4 py-2 border">Route</th>
                  <th className="px-4 py-2 border">No. of Students</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredTableData.map((row) => (
                  <tr key={row._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{row.vehicleNumber}</td>
                    <td className="px-4 py-2 border">
                      {row.vehicleType || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          row.status?.toLowerCase() === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {row.status || "Unknown"}
                      </span>
                    </td>
                    <td className="px-4 py-2 border">{row.driver}</td>
                    <td className="px-4 py-2 border">{row.supervisor}</td>
                    <td className="px-4 py-2 border">{row.routeName}</td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => handleOpenRouteStudentsModal(row)}
                        className="text-blue-600 hover:text-blue-800 flex items-center justify-center gap-1"
                        title="View Students"
                      >
                        <FontAwesomeIcon icon={faUsers} className="text-sm" />
                        <span>{row.studentCount}</span>
                      </button>
                    </td>
                    <td className="px-4 py-2 border text-center">
                      {/* Action to clear ALL assigned routes */}
                      {row.routeId && row.routeId.length > 0 ? (
                        <button
                          onClick={() =>
                            handleUnassignRouteFromVehicle(
                              row._id,
                              row.routeId,
                              row.routeName,
                            )
                          }
                          className="text-red-600 hover:text-red-800"
                          title={`Clear all routes: ${row.routeName}`}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      ) : (
                        <span
                          className="text-gray-400"
                          title="No route assigned"
                        >
                          -
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredTableData.length === 0 && (
                  <tr>
                    <td colSpan="8" className="py-4 text-gray-500">
                      No assigned vehicles or routes found matching your
                      criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- MODALS --- */}
        {/* 1. Create Route/Staff Assignment Modal (image_57c899.png style) */}
        <Modal
          isOpen={isCreateRouteModalOpen}
          onClose={() => setIsCreateRouteModalOpen(false)}
          title="Create Route & Assign Staff"
          size="md"
        >
          <CreateRouteStaffAssignmentModal
            onClose={() => setIsCreateRouteModalOpen(false)}
            onAssign={handleRouteAssignmentSubmit}
            eligibleVehicles={eligibleVehicles}
            allDrivers={allDrivers}
            allSupervisors={allSupervisors}
          />
        </Modal>

        {/* 2. Assign Students Modal */}
        <Modal
          isOpen={isStudentModalOpen}
          onClose={() => setIsStudentModalOpen(false)}
          title="Assign Students to Route"
        >
          <div className="p-4">
            <StudentAssignmentWrapper
              onClose={() => setIsStudentModalOpen(false)}
              onSubmit={handleAddStudent}
              routes={routes}
            />
          </div>
        </Modal>

        {/* 3. View Students on Route Modal */}
        <RouteStudentsModal
          isOpen={isRouteStudentsModalOpen}
          onClose={() => setIsRouteStudentsModalOpen(false)}
          route={selectedRoute}
          studentsData={formattedStudentRoutes}
          vehicleData={selectedRoute?.vehicle}
          allStudents={allStudents}
          fetchAllData={fetchAllData}
        />
      </div>
    </MainLayout>
  );
};

// Wrapper for Student Assignment Step
const StudentAssignmentWrapper = (props) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [classInfo, setClassInfo] = useState(null);

  const handleClassSelection = (classData) => {
    setClassInfo(classData);
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
    setClassInfo(null);
  };

  return (
    <>
      {currentStep === 1 && (
        <ClassSelectionStep
          onNext={handleClassSelection}
          onClose={props.onClose}
        />
      )}
      {currentStep === 2 && (
        <StudentAssignmentStep
          classInfo={classInfo}
          onBack={handleBack}
          onClose={props.onClose}
          onSubmit={props.onSubmit}
          routes={props.routes}
        />
      )}
    </>
  );
};

export default TransportRoutes;
