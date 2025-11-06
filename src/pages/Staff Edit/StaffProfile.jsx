import React, { useState, useEffect } from 'react';
import { User, X } from 'lucide-react';
import axios from 'axios';

const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
// Placeholder for the Cloudinary upload preset/URL (Update these if they change)
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dfc8sai1i/auto/upload"; 
const CLOUDINARY_PRESET = "sspd-student-management"; 

// Placeholder function for Cloudinary upload (using axios)
const uploadToCloudinary = async (file, staffData) => {
    console.log("DEBUG: uploadToCloudinary - Initiating file upload...");
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("upload_preset", CLOUDINARY_PRESET);
    uploadFormData.append("folder", `staff_images/profile_photos`);
    uploadFormData.append("public_id", `${staffData.staffid}_${staffData.lastname}`); 

    try {
        const res = await axios.post(
            CLOUDINARY_UPLOAD_URL,
            uploadFormData
        );
        console.log("DEBUG: uploadToCloudinary - Upload successful:", res.data.secure_url);
        return res.data.secure_url; // Returns the public URL
    } catch (err) {
        console.error("❌ ERROR: uploadToCloudinary - Upload failed.", err);
        throw new Error("Photo upload failed. Check network/console.");
    }
};

export default function StaffProfile({ staffData, setStaffData, handleSubmit, handleInputChange, isActive, toggleActive, loading, error }) {
    
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [localLoading, setLocalLoading] = useState(false);
    const [notification, setNotification] = useState({ type: '', message: '' });

    // Set preview from fetched data on mount/update
    useEffect(() => {
        // Only set the initial photo preview if we have a fetched photo URL AND no new file has been selected
        if (staffData?.photo && !photoFile) {
            setPhotoPreview(staffData.photo);
        } else if (!staffData?.photo && !photoFile) {
            setPhotoPreview(null);
        }
        if (staffData?.firstname) {
            console.log(`DEBUG: StaffProfile - Data loaded for: ${staffData.firstname} ${staffData.lastname}`);
        }
    }, [staffData, photoFile]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setNotification({ type: 'error', message: 'Please select a valid image file.' });
            return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setNotification({ type: 'error', message: 'Image file size should be less than 5MB.' });
            return;
        }

        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
        setNotification({ type: '', message: '' });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLocalLoading(true);
        setNotification({ type: '', message: '' });
        let photoUrl = staffData.photo; // Start with the existing URL

        if (photoFile) {
            try {
                // 1. Upload the new file
                photoUrl = await uploadToCloudinary(photoFile, staffData);
                console.log("DEBUG: handleFormSubmit - Upload successful, new URL ready for database update.");
                setPhotoFile(null); // Clear file state
                // Note: The new URL will be visible via photoPreview immediately 
                // and will be permanently stored on successful parent submit/re-fetch.

            } catch (uploadError) {
                const msg = uploadError.message || "Failed to upload photo.";
                setNotification({ type: 'error', message: msg });
                setLocalLoading(false);
                return; // Stop submission if upload fails
            }
        }
        
        // 2. Call parent handleSubmit, passing the final photo URL (new or existing)
        // Parent component handles the API call and re-fetch.
        await handleSubmit(e, photoUrl);
        
        setLocalLoading(false); 
    };

    if (!staffData) {
        // Fallback safety barrier (should be caught by parent's rendering guard)
        return <div className="text-center p-8 text-red-500">Error: Staff data object is missing.</div>;
    }


    return (
        <form onSubmit={handleFormSubmit}>
            {/* Loading and error messages for the profile tab only */}
            {(loading || localLoading) && (
                 <div className="text-center p-4 text-blue-500">Profile data is currently saving or refreshing...</div>
            )}
            {error && (
                 <div className="text-center p-4 text-red-500">ERROR: Profile failed to save. Check console for details.</div>
            )}
            {notification.message && (
                 <div className={`p-4 mb-4 rounded-lg flex justify-between items-center ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    <p>{notification.message}</p>
                    <button type="button" onClick={() => setNotification({ type: '', message: '' })}>
                        <X className="h-5 w-5" />
                    </button>
                 </div>
            )}
            
            <div className="flex flex-col xl:flex-row space-y-8 xl:space-y-0 xl:space-x-8">
                <div className="flex-1">
                    <div className="space-y-6">
                        {/* Name Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={staffData.firstname}
                                    onChange={handleInputChange}
                                    placeholder="First Name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mt-0 md:mt-8">
                                <input
                                    type="text"
                                    name="middlename"
                                    value={staffData.middlename}
                                    onChange={handleInputChange}
                                    placeholder="Middle Name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="mt-0 md:mt-8">
                                <input
                                    type="text"
                                    name="lastname"
                                    value={staffData.lastname}
                                    onChange={handleInputChange}
                                    placeholder="Last Name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Date of Birth and Marital Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date of Birth <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={staffData.dob}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Marital Status <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="maritalstatus"
                                    value={staffData.maritalstatus}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widowed">Widowed</option>
                                </select>
                            </div>
                        </div>

                        {/* Blood Group and Gender */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Blood Group <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="bloodgroup"
                                    value={staffData.bloodgroup}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Gender <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="gender"
                                    value={staffData.gender}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Contact Details (bg-white) */}
                        <div className="bg-white p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Contact Details
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Contact Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phoneno"
                                        value={staffData.phoneno}
                                        onChange={handleInputChange}
                                        placeholder="Contact Number"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="emailaddress"
                                        value={staffData.emailaddress}
                                        onChange={handleInputChange}
                                        placeholder="example@gmail.com"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Picture (Image Upload/Preview) */}
                <div className="w-full xl:w-64">
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <div className="w-32 h-32 mx-auto bg-white rounded-full shadow-md flex items-center justify-center mb-4 border-4 border-blue-200 overflow-hidden">
                             {/* Display photo preview (local or fetched URL) */}
                             {photoPreview ? (
                                <img 
                                    src={photoPreview} 
                                    alt={`${staffData?.firstname || ''} profile`} 
                                    className="object-cover w-full h-full" 
                                />
                             ) : (
                                <User className="w-16 h-16 text-gray-400" />
                             )}
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                            Upload Staff Photo
                        </p>
                        <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            Choose File
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                disabled={loading || localLoading}
                            />
                        </label>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button
                    type="button"
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    onClick={() => console.log("DEBUG: StaffProfile - Cancel button clicked. Resetting form is usually done here.")}
                    disabled={loading || localLoading} // Disable while saving
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                    disabled={loading || localLoading} // Disable while saving
                >
                    {(loading || localLoading) ? 'Saving...' : 'Save & Continue'}
                </button>
            </div>
        </form>
    );
}