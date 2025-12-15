import React, { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../layout/MainLayout"; // Adjust path as necessary
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate
// Assuming API_BASE_URL is imported from the config file
import { API_BASE_URL } from '../config'; 

// --- Configuration Constants (Keep These) ---
// CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET removed as they are unused for view/edit
const MARITAL_STATUS = ["Single", "Married", "Divorced", "Widow"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const CATEGORIES = ["General", "OBC", "SC", "ST", "Other"];
const GENDERS = ["Male", "Female", "Other"];
const NATIONALITIES = ["Indian", "Other"];


// Renamed and restructured for a standalone page component
const EditTransportStaff = () => {
    // Read the staff ID from the URL path /transport-staff/edit/:staffId
    const { staffId: staffIdFromUrl } = useParams(); 
    const navigate = useNavigate();
    
    const [staff, setStaff] = useState(null); 
    const [editFormData, setEditFormData] = useState(null); 
    
    // Form and UI States
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [errors, setErrors] = useState({});

    // File States
    const [staffPhoto, setStaffPhoto] = useState(null); 
    const [imagePreview, setImagePreview] = useState(null); 

    // --- Data Fetching Effect ---
    useEffect(() => {
        const currentStaffId = staffIdFromUrl; 
        
        const fetchStaffDetails = async () => {
            if (!currentStaffId) {
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                
                // FETCH REAL DATA: Use the dedicated combined GET API endpoint: /api/staff-details/:id
                // This correctly calls vehicleSupController.getStaffById which checks both models.
                const response = await axios.get(`${API_BASE_URL}api/staff-details/${currentStaffId}`, {
                    headers: { auth: 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=' }
                });
                
                const fetchedStaff = response.data.data;

                if (!fetchedStaff) {
                     throw new Error("Staff not found in database.");
                }

                // Normalize data structure for the form
                const normalizedStaff = {
                    ...fetchedStaff,
                    // Designation is critical for conditional rendering
                    designation: fetchedStaff.designation || (fetchedStaff.driverName ? 'Driver' : 'Supervisor'),
                    contactNumber: fetchedStaff.contactNumber || fetchedStaff.contactNo,
                    // Ensure separate name fields are set if the backend only returned fullName
                    firstName: fetchedStaff.firstName || fetchedStaff.fullName?.split(' ')[0] || fetchedStaff.driverName?.split(' ')[0] || '',
                    lastName: fetchedStaff.lastName || fetchedStaff.fullName?.split(' ').slice(-1)[0] || fetchedStaff.driverName?.split(' ').slice(-1)[0] || '',
                    // Ensure fullName/driverName is available for the Save function's driverName mapping
                    fullName: fetchedStaff.fullName || fetchedStaff.driverName,
                };

                setStaff(normalizedStaff);
                setEditFormData(normalizedStaff);
                setImagePreview(normalizedStaff.photoUrl || null);
                setIsLoading(false);

            } catch (error) {
                console.error("Error fetching staff details:", error);
                setIsLoading(false);
                alert("Failed to load staff details for editing. Check API '/staff-details/:id'.");
            }
        };
        
        // Rely purely on real data fetch
        fetchStaffDetails(); 
    }, [staffIdFromUrl, navigate]);

    if (isLoading || !editFormData) {
        return (
            <MainLayout>
                <div className="text-center py-10 text-xl font-semibold">
                    Loading Staff Details...
                </div>
            </MainLayout>
        );
    }
    
    const headerText = isEditing ? `Edit ${editFormData.designation} Details` : `View ${editFormData.designation} Details`;

    // --- Handlers ---
    const getIsActive = (status) => status?.toLowerCase() === 'active';
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setErrors(prev => ({ ...prev, [name]: null }));

        if (name === 'status' && type === 'checkbox') {
            const newStatus = checked ? 'Active' : 'Resigned';
            setEditFormData((prev) => ({ ...prev, [name]: newStatus }));
        } else {
            // Update fullName whenever first, middle, or last name changes
            if (['firstName', 'middleName', 'lastName'].includes(name)) {
                const updatedData = { ...editFormData, [name]: value };
                const newFullName = `${updatedData.firstName} ${updatedData.middleName || ''} ${updatedData.lastName}`.trim().replace(/\s+/g, ' ');
                setEditFormData((prev) => ({ ...prev, [name]: value, fullName: newFullName }));
            } else {
                setEditFormData((prev) => ({ ...prev, [name]: value }));
            }
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
            setImagePreview(staff.photoUrl || null); 
        }
    };
    const validateEditForm = () => { /* Simplified validation logic here */ return true; };
    
    // --- Save Function ---
    const handleUpdate = async () => {
        if (!validateEditForm()) { alert("Please correct validation errors."); return; }
        setIsSaving(true);
        
        try {
            // PUT: Use the dedicated update API endpoint
            const response = await axios.put(`${API_BASE_URL}api/update-vsupervisior/${staff._id}`, editFormData, {
                headers: { auth: 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=' }
            });
            
            alert(`Staff ${editFormData.fullName} updated successfully!`);
            setIsEditing(false); 
            
        } catch (error) {
            console.error("Error updating staff:", error.response?.data || error.message);
            alert(`Update failed: ${error.message || error.response?.data?.error || "Server error"}`);
        } finally {
            setIsSaving(false);
        }
    };

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
        <MainLayout>
            <div className="max-w-7xl mx-auto py-8">
                <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6 md:p-8">
                    
                    {/* Header and Action Buttons */}
                    <div className="flex justify-between items-center pb-6 border-b border-gray-200 mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">{headerText}</h2>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={`px-4 py-2 rounded-lg font-semibold transition ${
                                    isEditing ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                                disabled={isSaving}
                            >
                                {isEditing ? 'Cancel Edit' : 'Start Editing'}
                            </button>
                            {isEditing && (
                                <button
                                    onClick={handleUpdate}
                                    className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed flex items-center"
                                    disabled={isSaving}
                                >
                                    {isSaving ? (
                                        <span className="flex items-center">
                                            <i className="fas fa-spinner fa-spin mr-2"></i> Saving...
                                        </span>
                                    ) : 'Save Changes'}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Main Content Sections */}
                    <div className="space-y-8">
                        
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
                            <div className="lg:col-span-1 w-full flex flex-col p-6 rounded-lg shadow-lg bg-white self-start">
                                <div className="flex flex-col items-center">
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
                                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
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
                                {editFormData.designation === 'Driver' && 
                                    <CustomInput label="License Number" name="licenseNumber" required error={errors.licenseNumber}/>
                                }
                            </div>
                        </div>


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
                    {/* Documents section removed for brevity as they are URLs */}


                    </div>

                </div>
        </MainLayout>
    );
};

export default EditTransportStaff;