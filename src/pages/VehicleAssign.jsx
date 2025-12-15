import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { API_BASE_URL } from '../config'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons"; 
import { useNavigate } from "react-router-dom";

// Placeholder for a modal or form to handle assignment logic
const AddAssignmentModal = ({ show, onClose, currentVehicle }) => {
    if (!show || !currentVehicle) return null;
    
    // Check assignment status
    const isAssigned = currentVehicle.driver !== 'Unassigned' || currentVehicle.supervisor !== 'Unassigned';
    const modalTitle = isAssigned ? 
                       `Edit Assignment for ${currentVehicle.vehicleNumber}` : 
                       `Assign Staff to ${currentVehicle.vehicleNumber}`;

    // State for the form (using mock IDs for now, but they are in valid format)
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        // Use the fields expected by the backend update endpoint
        assignedDriverId: currentVehicle.assignedDriverId || '',
        assignedSupervisorId: currentVehicle.assignedSupervisorId || '',
        // assignedRouteId: currentVehicle.assignedRouteId || '', // Route removed from form
        // currentStudents: currentVehicle.currentStudents || 0, // Students removed from form
    });

    // 🚨 FIX: Using valid 24-char hex strings for mock IDs
    // These IDs MUST be replaced with real IDs fetched from your Driver/Supervisor collections
    const mockDrivers = [{ id: '659021e1498f4803023e3b3a', name: 'Sanjay Kumar (Driver)' }];
    const mockSupervisors = [{ id: '659021e1498f4803023e3b3b', name: 'Rajesh Sharma (Supervisor)' }];

    const headers = { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" };
    
    // Handle form submission (API call to assign/update vehicle)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        
        // Payload includes only assignment IDs
        const payload = {
            assignedDriverId: formData.assignedDriverId || null,
            assignedSupervisorId: formData.assignedSupervisorId || null,
             // NOTE: If your VehicleSchema requires other fields (like document URLs) 
             // and they are missing in the PUT payload, you MUST fetch the existing vehicle 
             // data and merge the required fields into this payload to prevent a Mongoose Validation Error.
        };

        try {
            // PUT request to the vehicle update route
            const response = await axios.put(`${API_BASE_URL}api/update-vehicle/${currentVehicle._id}`, payload, { headers }); 
            
            if (response.status === 200) {
                alert(`Assignment for ${currentVehicle.vehicleNumber} updated successfully!`);
                onClose(true); // Close and refresh table
            } else {
                throw new Error("Server response failed.");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            console.error("Assignment Save Error:", error.response?.data || error.message);
            alert(`Failed to save assignment: ${errorMessage}`);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h3 className="text-xl font-bold mb-4 text-blue-600">{modalTitle}</h3>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Vehicle Number (Read Only)</label>
                        <input
                            type="text"
                            value={currentVehicle.vehicleNumber}
                            disabled
                            className="border p-2 w-full rounded-md bg-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Select Driver</label>
                        <select 
                            className="border p-2 w-full rounded-md" 
                            name="assignedDriverId"
                            value={formData.assignedDriverId || ''} // Use nullish coalescing to handle empty string
                            onChange={(e) => setFormData({...formData, assignedDriverId: e.target.value})}
                            disabled={isSaving}
                        >
                            <option value="">-- Unassigned --</option>
                            {mockDrivers.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold mb-1">Select Supervisor</label>
                        <select 
                            className="border p-2 w-full rounded-md"
                            name="assignedSupervisorId"
                            value={formData.assignedSupervisorId || ''}
                            onChange={(e) => setFormData({...formData, assignedSupervisorId: e.target.value})}
                            disabled={isSaving}
                        >
                            <option value="">-- Unassigned --</option>
                            {mockSupervisors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
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
                            {isSaving ? 'Saving...' : isAssigned ? 'Save Changes' : 'Assign Vehicle'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default function VehicleAssign() {
    const [searchQuery, setSearchQuery] = useState("");
    const [assignmentData, setAssignmentData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentVehicleToEdit, setCurrentVehicleToEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Consolidated fetch function
    const fetchAssignmentData = async () => {
        try {
            setIsLoading(true);
            const headers = { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" };

            // 1. Fetch Vehicle data from /api/vehicles
            const vehiclesResponse = await axios.get(`${API_BASE_URL}api/vehicles`, { headers });
            const vehicles = vehiclesResponse.data.data || vehiclesResponse.data || [];
            
            // 2. Map all vehicles to the required table columns
            const combinedAssignments = vehicles.map(vehicle => ({
                _id: vehicle._id,
                // Vehicle Details 
                vehicleNumber: vehicle.vehicleno || 'N/A', 
                vehicleType: vehicle.vehiclename || 'N/A', 
                status: vehicle.status || 'N/A', 
                
                // Assignment Details (Now correctly populated by backend using name fields)
                driver: vehicle.assignedDriverName || vehicle.assignedDriverId || 'Unassigned',
                supervisor: vehicle.assignedSupervisorName || vehicle.assignedSupervisorId || 'Unassigned',
                
                // Fields needed for Modal and Save
                assignedDriverId: vehicle.assignedDriverId || null,
                assignedSupervisorId: vehicle.assignedSupervisorId || null,
                assignedRouteId: vehicle.assignedRouteId || null,
                currentStudents: vehicle.currentStudents || 0,
            }));
            
            setAssignmentData(combinedAssignments); 
        } catch (error) {
            console.error("Error fetching vehicle assignment data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Initial data fetch
        fetchAssignmentData();
    }, []);

    // Function to handle modal closing and refresh
    const handleCloseModal = (shouldRefresh = false) => {
        setIsModalOpen(false);
        setCurrentVehicleToEdit(null);
        if (shouldRefresh) {
            fetchAssignmentData(); // Refresh data after successful save/update
        }
    }

    // Filter logic
    const filteredData = assignmentData.filter(
        (row) =>
            // Filter logic adapted for the reduced column set
            row.vehicleNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.vehicleType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.driver?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.supervisor?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleActionClick = (vehicle) => {
        setCurrentVehicleToEdit(vehicle);
        setIsModalOpen(true);
    };

    return (
        <MainLayout>
            <div className="bg-white rounded-2xl shadow p-6">
                <div className="p-4 sm:p-6 space-y-6">
                    
                    {/* Search Bar */}
                    <div className="flex justify-start items-center">
                        <input
                            type="text"
                            placeholder="Search Vehicle, Driver, or Supervisor..."
                            className="border px-3 py-2 rounded-md w-full max-w-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Title */}
                    <h2 className="text-center text-xl sm:text-2xl font-semibold">
                        Vehicle Assignment Management
                    </h2>

                    {/* Table */}
                    <div className="overflow-x-auto mt-4">
                        {isLoading ? (
                            <div className="text-center py-8 text-gray-500">Loading available vehicles...</div>
                        ) : (
                            <table className="min-w-full border border-gray-300 text-center rounded text-sm sm:text-base">
                                <thead className="bg-blue-100 text-black">
                                    <tr>
                                        {/* Vehicle Information */}
                                        <th className="px-4 py-2 border">Vehicle Number</th>
                                        <th className="px-4 py-2 border">Vehicle Type</th>
                                        <th className="px-4 py-2 border">Status</th>
                                        {/* Assignment Information */}
                                        <th className="px-4 py-2 border">Driver</th>
                                        <th className="px-4 py-2 border">Supervisor</th>
                                        {/* Route and Students columns removed */}
                                        <th className="px-4 py-2 border">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {filteredData.length > 0 ? (
                                        filteredData.map((row) => {
                                            // Determine if assignment fields are anything other than the default 'Unassigned'
                                            const isAssigned = row.driver !== 'Unassigned' || row.supervisor !== 'Unassigned';
                                            return (
                                            <tr key={row._id}>
                                                <td className="px-4 py-2 border">{row.vehicleNumber}</td>
                                                <td className="px-4 py-2 border">{row.vehicleType}</td>
                                                <td className="px-4 py-2 border">
                                                    <span className={`font-semibold ${row.status?.toLowerCase() === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                                                        {row.status}
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
                                            {/* Colspan adjusted to 6 */}
                                            <td colSpan="6" className="py-4 text-gray-500">
                                                {searchQuery ? "No matching vehicles found." : "No vehicles found in the system."}
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
                    />
                </div>
            </div>
        </MainLayout>
    );
};