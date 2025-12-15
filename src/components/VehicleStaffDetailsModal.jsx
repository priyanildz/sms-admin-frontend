import React, { useState, useEffect } from "react";
import axios from "axios";

// NOTE: Constants related to file uploads are kept for image logic only.
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dfc8sai1i/auto/upload"; 
const CLOUDINARY_UPLOAD_PRESET = "sspd-student-management";

// Fields used in the registration form
const VEHICLE_TYPES = ["Bus", "Van", "Auto"]; 
const MARITAL_STATUS = ["Single", "Married", "Divorced", "Widow"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const CATEGORIES = ["General", "OBC", "SC", "ST", "Other"];
const GENDERS = ["Male", "Female", "Other"];
const NATIONALITIES = ["Indian", "Other"];


const VehicleStaffDetailsModal = ({ show, onClose, staff, API_BASE_URL }) => {
    if (!show || !staff) return null;

    // Initialize form data based on the staff prop
    const [editFormData, setEditFormData] = useState(staff); 
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [errors, setErrors] = useState({});

    // File-related states 
    const [staffPhoto, setStaffPhoto] = useState(null); 
    const [imagePreview, setImagePreview] = useState(staff.photoUrl || staff.photo || null); 

    // Synchronize form state when staff prop changes or modal opens
    useEffect(() => {
        // Safely map fields, prioritizing normalized fields like 'fullName'
        setEditFormData({
            ...staff,
            designation: staff.designation || (staff.vid ? 'Driver' : 'Supervisor'), // Fallback role
            // Normalize contact fields if needed (e.g., driverModel uses contactNumber/contactNo)
            contactNumber: staff.contactNumber || staff.contactNo, 
        });
        setIsEditing(false);
        setErrors({});
        setImagePreview(staff.photoUrl || staff.photo || null);
        setStaffPhoto(null);
    }, [staff]);

    // Helper function
    const getIsActive = (status) => status?.toLowerCase() === 'active';
    
    // --- Handlers ---
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setErrors(prev => ({ ...prev, [name]: null }));

        if (name === 'status' && type === 'checkbox') {
            const newStatus = checked ? 'Active' : 'Resigned';
            setEditFormData((prev) => ({ ...prev, [name]: newStatus }));
        } else {
            setEditFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setErrors(prev => ({ ...prev, staffPhoto: null }));
        if (file) {
            setStaffPhoto(file);
            setImagePreview(URL.createObjectURL(file));
        } else {
            setStaffPhoto(null);
            setImagePreview(staff.photoUrl || staff.photo || null); 
        }
    };
    
    // --- Validation (Simplified) ---
    const validateEditForm = () => {
        let newErrors = {};
        let isValid = true;
        
        const requiredFields = ["firstName", "lastName", "email", "contactNumber", "designation"];
        requiredFields.forEach(field => {
            if (!editFormData[field] || String(editFormData[field]).trim() === "") {
                newErrors[field] = "Required.";
                isValid = false;
            }
        });
        
        // Example of conditional validation
        if (editFormData.designation === 'Driver' && (!editFormData.licenseNumber || editFormData.licenseNumber.trim() === '')) {
             newErrors.licenseNumber = "License is required for Drivers.";
             isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };
    
    // --- Save Function (Staff Update) ---
    const handleUpdate = async () => {
        if (!validateEditForm()) {
            alert("Please correct validation errors.");
            return;
        }

        setIsSaving(true);
        
        try {
            let finalData = { ...editFormData };
            
            // NOTE: In a real app, image upload logic (staffPhoto) would go here.
            
            // Call the exports.updateStaff endpoint
            // We use the route defined in router.js for editing staff details: router.put("/edit-staff/:id", staffController.editStaff);
            // Assuming we use the Mongo _id or a unique staff ID for the URL segment.
            const response = await axios.put(`${API_BASE_URL}api/edit-staff/${staff._id}`, finalData, {
                headers: {
                    auth: 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
                },
            });
            
            alert(`Staff ${finalData.fullName} updated successfully!`);
            onClose(true); // Signal parent to refresh data
            
        } catch (error) {
            console.error("Error updating staff:", error.response?.data || error.message);
            alert(`Update failed: ${error.message || error.response?.data?.error || "Server error"}`);
        } finally {
            setIsSaving(false);
        }
    };


    const headerText = isEditing ? `Edit ${staff.designation} Details` : `View ${staff.designation} Details`;

    // Reusable Input/Select components tailored for staff fields
    const CustomInput = ({ label, name, type = 'text', required, error, disabled = false, options }) => {
        const value = editFormData[name] !== undefined ? editFormData[name] : '';
        const isFieldDisabled = !isEditing || disabled;

        if (options) { // Renders Select field if options are provided
            return (
                 <div className="flex flex-col">
                    <label className="mb-1 text-sm font-semibold text-gray-700">{label} {required && <span className="text-red-500">*</span>}</label>
                    <select
                        name={name}
                        className={`border px-4 py-2.5 rounded-lg appearance-none ${error ? 'border-red-500' : 'border-gray-300'} ${isFieldDisabled ? 'bg-gray-100 text-gray-700' : 'focus:ring-2 focus:ring-blue-500'}`}
                        value={value}
                        onChange={handleChange}
                        disabled={isFieldDisabled}
                        required={required}
                    >
                        <option value="" disabled>Select {label}</option>
                        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>
            );
        }

        return (
            <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold text-gray-700">{label} {required && <span className="text-red-500">*</span>}</label>
                <input
                    name={name}
                    type={type}
                    className={`border px-4 py-2.5 rounded-lg transition duration-150 ${error ? 'border-red-500' : 'border-gray-300'} ${isFieldDisabled ? 'bg-gray-100 text-gray-700' : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'}`}
                    value={value}
                    onChange={handleChange}
                    disabled={isFieldDisabled}
                    required={required}
                />
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
        );
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50"
        style={{ 
                backgroundColor: 'rgba(50, 50, 50, 0.5)', 
            }}
        >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl transform transition-all p-0 flex flex-col max-h-[90vh]">
                
                {/* Modal Header and Edit Toggle */}
                <div className="flex-shrink-0 px-6 py-4 border-b border-gray-100 bg-blue-50 rounded-t-xl flex justify-between items-center">
                    <h2 className="text-xl font-bold text-blue-500">{headerText}</h2>
                    <div className="flex items-center gap-3">
                        {/* Toggle Button */}
                        <button
                            onClick={() => {
                                setIsEditing(!isEditing);
                                setErrors({});
                            }}
                            className={`px-4 py-2 text-sm rounded-lg font-semibold transition ${
                                isEditing ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                            disabled={isSaving}
                        >
                            {isEditing ? 'Cancel Edit' : 'Start Editing'}
                        </button>

                        {/* Close Button */}
                        <button 
                            onClick={onClose} 
                            className="text-gray-500 hover:text-gray-700 transition"
                            disabled={isSaving}
                        >
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>
                </div>

                {/* Modal Body (Form/View) - Scrollable */}
                <div className="p-6 space-y-6 overflow-y-auto">
                    
                    {/* ------------------ TOP GRID (Personal Details + Photo) ------------------ */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        
                        {/* LEFT (Col Span 3): Personal & ID Details */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="rounded-lg p-6 shadow-lg bg-white">
                                <div className="bg-blue-400 text-white px-4 py-2 rounded-t -mt-6 -mx-6 mb-6">
                                    <h4 className="text-xl font-semibold">Personal & Contact Details</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                                    {/* Name Fields */}
                                    <CustomInput label="First Name" name="firstName" required error={errors.firstName}/>
                                    <CustomInput label="Middle Name" name="middleName"/>
                                    <CustomInput label="Last Name" name="lastName" required error={errors.lastName}/>

                                    {/* DOB / Gender / Marital Status */}
                                    <CustomInput label="Date of Birth" name="dob" type="date" required error={errors.dob}/>
                                    <CustomInput label="Blood Group" name="bloodGroup" options={BLOOD_GROUPS} required error={errors.bloodGroup}/>
                                    <CustomInput label="Marital Status" name="maritalStatus" options={MARITAL_STATUS} required error={errors.maritalStatus}/>
                                    
                                    {/* Contact / Email / Aadhaar */}
                                    <CustomInput label="Contact Number" name="contactNumber" required error={errors.contactNumber}/>
                                    <CustomInput label="Email" name="email" type="email" required error={errors.email}/>
                                    <CustomInput label="Aadhaar Number" name="aadhaarNumber" required error={errors.aadhaarNumber}/>
                                    
                                    {/* Nationality / Category */}
                                    <CustomInput label="Nationality" name="nationality" options={NATIONALITIES} required error={errors.nationality}/>
                                    <CustomInput label="Category" name="category" options={CATEGORIES} required error={errors.category}/>
                                    <CustomInput label="Gender" name="gender" options={GENDERS} required error={errors.gender}/>
                                </div>
                            </div>
                        </div>
                        
                        {/* RIGHT (Col Span 1): Photo Upload & Status */}
                        <div className="w-full flex flex-col p-6 rounded-lg shadow-lg bg-white self-start">
                            <div className="flex flex-col items-center">
                                {/* Image Preview Area */}
                                <div
                                    className={`w-40 h-40 bg-gray-200 rounded mb-4 flex items-center justify-center relative overflow-hidden shadow-inner ${
                                        errors.staffPhoto ? "border-2 border-red-500" : ""
                                    }`}
                                >
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Staff Preview" className="w-full h-full object-cover rounded"/>
                                    ) : (
                                        <span className="text-sm text-gray-500">Staff Photo</span>
                                    )}
                                </div>
                                {/* File Input Trigger Button (Visible only during editing) */}
                                {isEditing && (
                                    <label className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded cursor-pointer shadow-md transition">
                                        Change Photo
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden"/>
                                    </label>
                                )}

                                {/* Status Toggle */}
                                <div className="w-full border-t pt-4 mt-4 flex justify-center items-center gap-3">
                                    <span className={`text-sm font-bold ${!getIsActive(editFormData.status) ? 'text-red-600' : 'text-gray-400'}`}>Resigned</span>
                                    <label className={`relative inline-flex items-center ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}>
                                        <input
                                            type="checkbox"
                                            name="status"
                                            checked={getIsActive(editFormData.status)}
                                            onChange={isEditing ? handleChange : null}
                                            disabled={!isEditing}
                                            className="sr-only peer"
                                        />
                                        <div className={`w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full`}></div>
                                    </label>
                                    <span className={`text-sm font-bold ${getIsActive(editFormData.status) ? 'text-green-600' : 'text-gray-400'}`}>Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ------------------ END TOP GRID ------------------ */}


                    {/* ------------------ ROLE / LICENSE DETAILS ------------------ */}
                    <div className="rounded-lg p-6 shadow-lg bg-white">
                        <div className="bg-blue-400 text-white px-4 py-2 rounded-t -mt-6 -mx-6 mb-6">
                            <h4 className="text-xl font-semibold">Role & License</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                            <CustomInput label="Designation" name="designation" disabled={true}/>
                            {staff.designation === 'Driver' ? (
                                <CustomInput label="License Number" name="licenseNumber" required error={errors.licenseNumber}/>
                            ) : (
                                <div className="md:col-span-2"></div>
                            )}
                        </div>
                    </div>


                    {/* ------------------ VEHICLE ASSIGNMENT DETAILS (Driver Only) ------------------ */}
                    {staff.designation === 'Driver' && (
                        <div className="rounded-lg p-6 shadow-lg bg-white">
                            <div className="bg-blue-400 text-white px-4 py-2 rounded-t -mt-6 -mx-6 mb-6">
                                <h4 className="text-xl font-semibold">Vehicle Assignment</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                                {/* The backend fields are 'vid' and 'vehicleType' (from AddSupervisor logic) */}
                                <CustomInput label="Vehicle Type" name="vehicleType" options={VEHICLE_TYPES} disabled={true}/>
                                <CustomInput label="Vehicle Number (VID)" name="vid" disabled={true}/> 
                                <CustomInput label="Route Assigned" name="routeAssigned" disabled={true}/> {/* Mock Route field */}
                            </div>
                        </div>
                    )}


                    {/* ------------------ BANK & EXPERIENCE DETAILS ------------------ */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Bank Details */}
                        <div className="rounded-lg p-6 shadow-lg bg-white">
                            <div className="bg-blue-400 text-white px-4 py-2 rounded-t -mt-6 -mx-6 mb-6">
                                <h4 className="text-xl font-semibold">Bank Details</h4>
                            </div>
                            <div className="space-y-4">
                                <CustomInput label="Bank Name" name="bankName" required error={errors.bankName}/>
                                <CustomInput label="Branch Name" name="branchName" required error={errors.branchName}/>
                                <CustomInput label="Account Number" name="accountNumber" required error={errors.accountNumber}/>
                                <CustomInput label="IFSC Code" name="ifscCode" required error={errors.ifscCode}/>
                                <CustomInput label="PAN Number" name="panNumber" required error={errors.panNumber}/>
                            </div>
                        </div>

                        {/* Experience Details */}
                        <div className="rounded-lg p-6 shadow-lg bg-white">
                            <div className="bg-blue-400 text-white px-4 py-2 rounded-t -mt-6 -mx-6 mb-6">
                                <h4 className="text-xl font-semibold">Experience Details</h4>
                            </div>
                            <div className="space-y-4">
                                <CustomInput label="Total Experience (Years)" name="totalExperience" required error={errors.totalExperience}/>
                                <CustomInput label="Previous Employer" name="previousEmployer" required error={errors.previousEmployer}/>
                            </div>
                        </div>
                    </div>


                </div>

                {/* Footer (Buttons) */}
                <div className="flex-shrink-0 flex justify-end gap-3 px-6 py-4 border-t border-gray-100 rounded-b-xl">
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

export default VehicleStaffDetailsModal;