import React, { useState, useEffect } from "react";
import axios from "axios";

// Reusing the handleChange logic from AddVehicleModal is a good idea
// but we will simplify the validation and focus on update/view.

const VehicleDetailsModal = ({ show, onClose, vehicle, API_BASE_URL }) => {
    if (!show || !vehicle) return null;

    // Use vehicle data as initial state for editing
    const [editFormData, setEditFormData] = useState(vehicle);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [errors, setErrors] = useState({}); // For edit validation

    // Helper function to convert the string status ('active'/'inactive') to a boolean for the toggle
    const getIsActive = (status) => status?.toLowerCase() === 'active';
    
    // --- Handlers ---
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setErrors(prev => ({ ...prev, [name]: null }));

        if (name === 'status' && type === 'checkbox') {
            const newStatus = checked ? 'active' : 'inactive';
            setEditFormData((prev) => ({ ...prev, [name]: newStatus }));
        } else {
            setEditFormData((prev) => ({ ...prev, [name]: value }));
        }
    };
    
    // --- Validation (Simplified for brevity, but should be robust) ---
    const validateEditForm = () => {
        let newErrors = {};
        let isValid = true;
        
        // Check required fields (same as AddVehicleModal)
        const requiredFields = ["type", "vehiclename", "capacity", "regno", "vehicleno"];
        requiredFields.forEach(field => {
            if (!editFormData[field] || String(editFormData[field]).trim() === "") {
                newErrors[field] = "Required.";
                isValid = false;
            }
        });
        
        // Capacity Validation (Must be a positive number/integer)
        const capacityValue = editFormData.capacity;
        if (capacityValue && (!/^\d+$/.test(capacityValue) || parseInt(capacityValue) <= 0)) {
          newErrors.capacity = "Capacity must be a positive number.";
          isValid = false;
        }

        // Contact Number Validation (10 digits)
        const regnoValue = editFormData.regno;
        if (regnoValue && !/^\d{10}$/.test(regnoValue)) {
          newErrors.regno = "Contact Number must be 10 digits.";
          isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };
    
    // --- Save Function ---
    const handleUpdate = async () => {
        if (!validateEditForm()) return;

        setIsSaving(true);
        try {
            // Call the existing exports.updateVehicle endpoint (uses vehicle._id)
            const response = await axios.put(`${API_BASE_URL}api/update-vehicle/${vehicle._id}`, editFormData, {
                headers: {
                    auth: 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
                },
            });
            
            alert(response.data.message);
            onClose(); // Close the modal and trigger data refresh in parent
            
        } catch (error) {
            console.error("Error updating vehicle:", error.response?.data || error.message);
            alert(`Update failed: ${error.response?.data?.error || "Server error"}`);
        } finally {
            setIsSaving(false);
        }
    };


    // Determine the header text
    const headerText = isEditing ? "Edit Vehicle Details" : "View Vehicle Details";

    const InputField = ({ label, name, value, placeholder, required, disabled = false, error }) => (
        <div className="flex flex-col">
            <label className="mb-1 text-sm font-semibold text-gray-700">{label} {required && <span className="text-red-500">*</span>}</label>
            <input
                name={name}
                type="text"
                placeholder={placeholder}
                className={`border px-4 py-2.5 rounded-lg transition duration-150 ${error ? 'border-red-500' : 'border-gray-300'} ${disabled ? 'bg-gray-100 text-gray-600' : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}`}
                value={value}
                onChange={handleChange}
                disabled={!isEditing || disabled}
                required={required}
            />
             {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50"
        style={{ 
                // Using RGBA to create the dimming effect without blurring the backdrop
                backgroundColor: 'rgba(50, 50, 50, 0.5)', 
            }}
        >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl transform transition-all p-0">
                
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-gray-100 bg-blue-50 rounded-t-xl flex justify-between items-center">
                    <h2 className="text-xl font-extrabold text-blue-800">{headerText}</h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-500 hover:text-gray-700 transition"
                        disabled={isSaving}
                    >
                        <i className="fas fa-times text-xl"></i>
                    </button>
                </div>

                {/* Toggle View/Edit */}
                <div className="flex justify-end p-4 border-b border-gray-100">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${
                            isEditing ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                        disabled={isSaving}
                    >
                        {isEditing ? 'Cancel Editing' : 'Start Editing'}
                    </button>
                </div>

                {/* Modal Body (Form/View) */}
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                        
                        {/* Vehicle Type */}
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm font-semibold text-gray-700">Vehicle Type <span className="text-red-500">*</span></label>
                            <select
                                className={`border px-4 py-2.5 rounded-lg transition duration-150 appearance-none ${errors.type ? 'border-red-500' : 'border-gray-300'} ${!isEditing ? 'bg-gray-100 text-gray-600' : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}`}
                                value={editFormData.type || ''}
                                onChange={handleChange}
                                name="type"
                                disabled={!isEditing}
                                required
                            >
                                <option value="" disabled>Select Type</option>
                                <option value="bus">Bus</option>
                                <option value="van">Van</option>
                                <option value="auto">Auto</option>
                            </select>
                            {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
                        </div>

                        {/* Vehicle Name */}
                        <InputField 
                            label="Vehicle Name" 
                            name="vehiclename" 
                            value={editFormData.vehiclename} 
                            placeholder="e.g School Bus 1" 
                            required 
                            error={errors.vehiclename}
                        />

                        {/* Capacity */}
                        <InputField 
                            label="Capacity" 
                            name="capacity" 
                            value={editFormData.capacity} 
                            placeholder="e.g 40" 
                            required 
                            error={errors.capacity}
                        />

                        {/* Registration Contact Number */}
                        <InputField 
                            label="Registration Contact Number" 
                            name="regno" 
                            value={editFormData.regno} 
                            placeholder="e.g 9320xxxxxx" 
                            required 
                            error={errors.regno}
                        />

                        {/* Vehicle No (Cannot edit Primary ID after creation, typically) */}
                        <InputField 
                            label="Vehicle No" 
                            name="vehicleno" 
                            value={editFormData.vehicleno} 
                            placeholder="e.g MH12AB1234" 
                            required 
                            disabled={true} // Usually non-editable
                        />
                        
                        {/* Status Toggle (Only visible/editable when editing) */}
                        <div className="flex items-center pt-2">
                           <label htmlFor="status-toggle" className="text-sm font-semibold text-gray-700 mr-4">
                                Status: 
                            </label>
                            <span className={`text-sm font-bold transition-colors ${getIsActive(editFormData.status) ? 'text-green-600' : 'text-red-600'} mr-4`}>
                                {editFormData.status?.toUpperCase()}
                            </span>
                            
                            {isEditing && (
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        name="status"
                                        id="status-toggle" 
                                        checked={getIsActive(editFormData.status)}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    {/* Custom Toggle Switch */}
                                    <div className='w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500'></div>
                                </label>
                            )}
                        </div>
                        
                    </div>
                </div>

                {/* Footer (Buttons) */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 rounded-b-xl">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-150"
                        disabled={isSaving}
                    >
                        Close
                    </button>
                    {isEditing && (
                        <button
                            onClick={handleUpdate}
                            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-150 disabled:bg-green-400 disabled:cursor-not-allowed flex items-center"
                            disabled={isSaving}
                        >
                            {isSaving ? (
                                <>
                                    <i className="fas fa-spinner fa-spin mr-2"></i> Updating...
                                </>
                            ) : 'Save Changes'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VehicleDetailsModal;