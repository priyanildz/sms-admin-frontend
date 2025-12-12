// import React, { useEffect, useState } from "react";
// import { User, X } from 'lucide-react';
// import axios from "axios";

// // Helper function to format MongoDB ISO date string to DD/MM/YYYY
// const formatDate = (dateString) => {
//     if (!dateString) return '';
//     try {
//         const date = new Date(dateString);
//         if (isNaN(date.getTime())) {
//             return dateString;
//         }
//         const day = String(date.getDate()).padStart(2, '0');
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const year = date.getFullYear();
//         return `${day}/${month}/${year}`;
//     } catch {
//         return dateString;
//     }
// };

// // Helper to convert DD/MM/YYYY back to ISO string for submission
// const dateToISOString = (dateString) => {
//     if (!dateString || dateString.length !== 10) return dateString;
//     const parts = dateString.split('/');
//     if (parts.length === 3) {
//         return `${parts[2]}-${parts[1]}-${parts[0]}`;
//     }
//     return dateString;
// };

// // Utility function to flatten a nested object for Mongoose updates
// const flattenObjectForMongoose = (obj, parentKey = '', res = {}) => {
//     for (const key in obj) {
//         if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== undefined) {
//             const propName = parentKey ? `${parentKey}.${key}` : key;
//             const value = obj[key];
//             if (typeof value === 'object' && value !== null && !Array.isArray(value) && !(value instanceof Date) && !(propName.includes('__'))) {
//                 flattenObjectForMongoose(value, propName, res);
//             } else if (propName !== '_id' && propName !== '__v' && propName !== 'createdAt' && propName !== 'updatedAt') {
//                 res[propName] = value;
//             }
//         }
//     }
//     return res;
// };

// const StudentProfile = ({ studentid, isViewMode }) => { 

//     const [activeTab, setActiveTab] = useState('student');
//     const [formData, setFormData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [errors, setErrors] = useState({});
//     const [notification, setNotification] = useState({ type: '', message: '' });

//     // State for photo upload
//     const [photo, setPhoto] = useState(null);
//     const [photoPreview, setPhotoPreview] = useState(null);

//     const AUTH_HEADER = 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=';
//     const API_BASE_URL = 'http://localhost:5000/api';

//     // Validation logic for individual fields
//     const validateField = (name, value) => {
//         let errorMsg = '';
//         const requiredFields = [
//             'firstname', 'lastname', 'dob', 'birthplace', 'bloodgroup', 'aadharno',
//             'parent.fathername', 'parent.mothername', 'parent.primarycontact'
//         ];

//         if (requiredFields.includes(name) && (!value || String(value).trim() === '')) {
//             errorMsg = 'This field is required';
//         } else {
//             switch (name) {
//                 case 'dob':
//                     if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
//                         errorMsg = 'Date must be in DD/MM/YYYY format';
//                     }
//                     break;
//                 case 'aadharno':
//                     if (!/^\d{12}$/.test(value)) {
//                         errorMsg = 'Aadhar number must be 12 digits';
//                     }
//                     break;
//                 case 'parent.primarycontact':
//                     if (!/^\d{10}$/.test(value)) {
//                         errorMsg = 'Contact number must be 10 digits';
//                     }
//                     break;
//                 default:
//                     errorMsg = '';
//             }
//         }
//         setErrors(prev => ({ ...prev, [name]: errorMsg }));
//         return errorMsg === '';
//     };
//     
//     // Function to validate the entire form before submission
//     const validateForm = () => {
//         const requiredFields = [
//             'firstname', 'lastname', 'dob', 'birthplace', 'bloodgroup', 'gender', 'nationality', 'category', 'aadharno',
//             'parent.fathername', 'parent.mothername', 'parent.primarycontact', 'parent.relationwithstudent'
//         ];
//         let isValid = true;
//         requiredFields.forEach(field => {
//             const [section, subField] = field.includes('.') ? field.split('.') : [field, null];
//             const value = subField ? (formData[section] ? formData[section][subField] : '') : formData[section];
//             if (!validateField(field, value)) {
//                 isValid = false;
//             }
//         });
//         return isValid;
//     };

//     // Function to handle file selection for photo upload
//     const handlePhotoChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             if (!file.type.startsWith("image/")) {
//                 setNotification({ type: 'error', message: 'Please select a valid image file' });
//                 return;
//             }
//             if (file.size > 5 * 1024 * 1024) {
//                 setNotification({ type: 'error', message: 'Image file size should be less than 5MB' });
//                 return;
//             }
//             setPhoto(file);
//             setPhotoPreview(URL.createObjectURL(file));
//         }
//     };

//     // Function to upload file to Cloudinary
//     const uploadToCloudinary = async (file) => {
//         const uploadFormData = new FormData();
//         uploadFormData.append("file", file);
//         uploadFormData.append("upload_preset", "sspd-student-management");
//         uploadFormData.append("folder", `student_images/profile_photos`);
//         uploadFormData.append("public_id", `${formData.firstname}_${formData.lastname}_${formData._id}`); 

//         try {
//             const res = await axios.post(
//                 "https://api.cloudinary.com/v1_1/dfc8sai1i/auto/upload",
//                 uploadFormData
//             );
//             return res.data.secure_url;
//         } catch (err) {
//             console.error("Upload error:", err);
//             setNotification({ type: 'error', message: `Photo upload failed: ${err.message}` });
//             throw err;
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         validateField(name, value);
//         if (name.includes('.')) {
//             const [section, field] = name.split('.');
//             setFormData(prev => ({
//                 ...prev,
//                 [section]: {
//                     ...(prev ? prev[section] : {}),
//                     [field]: value
//                 }
//             }));
//         } else {
//             setFormData(prev => ({
//                 ...prev,
//                 [name]: value
//             }));
//         }
//     };

//     const handleSave = async (e) => {
//         if (!formData) return;
//         setNotification({ type: '', message: '' });

//         if (!validateForm()) {
//             setNotification({ type: 'error', message: 'Please fix the errors in the form before saving.' });
//             return;
//         }

//         setLoading(true);

//         try {
//             let photoUrl = formData.photo;

//             if (photo) {
//                 photoUrl = await uploadToCloudinary(photo);
//             }

//             const dataToSave = {
//                 ...formData,
//                 dob: dateToISOString(formData.dob),
//                 photo: photoUrl,
//                 status: formData.status
//             };

//             const flattenedUpdate = flattenObjectForMongoose(dataToSave);

//             const response = await axios.put(
//                 `${API_BASE_URL}/edit-student/${formData._id}`,
//                 flattenedUpdate,
//                 {
//                     headers: {
//                         auth: AUTH_HEADER,
//                         'Content-Type': 'application/json' // ✅ This is the critical fix
//                     }
//                 }
//             );

//             if (response.status === 200) {
//                 setNotification({ type: 'success', message: 'Student profile updated successfully!' });
//                 setErrors({});
//                 setPhoto(null);
//                 setPhotoPreview(null);
//             }
//         } catch (error) {
//             console.error("Error saving student data:", error);
//             const errorMsg = error.response?.data?.message || "An unknown error occurred.";
//             setNotification({ type: 'error', message: `Failed to save: ${errorMsg}` });
//         } finally {
//             setLoading(false);
//             fecthStudent();
//         }
//     };
//     
//     const handleToggleStatus = async () => {
//         if (!formData) return;
//         const newStatus = !formData.status;
//         setFormData(prev => ({ ...prev, status: newStatus }));
//         try {
//             const response = await axios.put(`${API_BASE_URL}/edit-student/${formData._id}`,
//                 { status: newStatus },
//                 { headers: { auth: AUTH_HEADER } }
//             );
//             if (response.status !== 200) {
//                  setFormData(prev => ({ ...prev, status: !newStatus }));
//                  console.error("Failed to toggle status: Non-200 response");
//             }
//         } catch (error) {
//             setFormData(prev => ({ ...prev, status: !newStatus }));
//             console.error("Error toggling status:", error);
//         }
//     };

//     const fecthStudent = async () => {
//         setLoading(true);
//         try {
//             const response = await axios.post(`${API_BASE_URL}/student-by-id`,
//                 { id: studentid }, {
//                 headers: { auth: AUTH_HEADER }
//             });
//             if (response.status === 200) {
//                 const studentData = response.data;
//                 studentData.dob = formatDate(studentData.dob); 
//                 setFormData(studentData);
//             }
//         } catch (error) {
//             console.error("Error fetching student:", error);
//             setFormData(null);
//         }
//         finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         if (studentid) {
//             fecthStudent();
//         }
//     }, [studentid]);

//     if (loading || !formData) {
//         return (
//             <div className="h-full w-full p-6 bg-gray-50">
//                 <div className="flex items-center justify-center h-64">
//                     <div className="text-center">
//                         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//                         <p className="text-gray-600">Loading student profile...</p>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="pt-2 px-1 sm:px-1 md:px-2 bg-gray-50 w-12/12 max-w-7xl"> 
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
//                 <div>
//                     <h2 className="text-2xl font-bold text-gray-800 mb-2">Students Overview</h2>
//                     <h3 className="text-xl font-semibold text-gray-700">Admission Form</h3>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                     <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"> 
//                         AY {formData.admission.academicyear}
//                     </div>
//                     {/* HIDING STATUS TOGGLE IN VIEW MODE */}
//                     {!isViewMode && (
//                         <div className="flex items-center space-x-3">
//                             <span className={`text-sm font-medium ${formData.status ? 'text-green-700' : 'text-red-700'}`}>
//                                 {formData.status ? 'Active' : 'Inactive'}
//                             </span>
//                             <button
//                                 onClick={handleToggleStatus}
//                                 className={`relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${formData.status ? 'bg-green-500' : 'bg-gray-300'}`}
//                                 role="switch"
//                                 aria-checked={formData.status}
//                                 aria-label="Toggle student status"
//                             >
//                                 <span
//                                     className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${formData.status ? 'translate-x-6' : 'translate-x-1'}`}
//                                 />
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             <div className="flex space-x-1 mb-6">
//                 <button
//                     onClick={() => setActiveTab('student')}
//                     className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeTab === 'student' ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}
//                 >
//                     Student Details
//                 </button>
//                 <button
//                     onClick={() => setActiveTab('parent')}
//                     className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeTab === 'parent' ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}
//                 >
//                     Parent/Guardian Details
//                 </button>
//             </div>

//             <form onSubmit={(e) => { e.preventDefault(); handleSave(e); }} className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
//                 {notification.message && (
//                     <div className={`p-4 mb-6 rounded-lg flex justify-between items-center ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                         <p>{notification.message}</p>
//                         <button type="button" onClick={() => setNotification({ type: '', message: '' })}>
//                             <X className="h-5 w-5" />
//                         </button>
//                     </div>
//                 )}
//                 
//                 <div className="flex flex-col xl:flex-row space-y-8 xl:space-y-0 xl:space-x-8">
//                     <div className="flex-1">
//                         {activeTab === 'student' && (
//                             <div className="space-y-6">
//                                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                                             Name <span className="text-red-500">*</span>
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="firstname"
//                                             placeholder="First Name"
//                                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                             value={formData.firstname}
//                                             onChange={handleChange}
//                                             disabled={isViewMode}
//                                         />
//                                         {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>}
//                                     </div>
//                                     <div className="mt-0 md:mt-8"> 
//                                         <input
//                                             type="text"
//                                             name="middlename"
//                                             placeholder="Middle Name"
//                                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                             value={formData.middlename || ''}
//                                             onChange={handleChange}
//                                             disabled={isViewMode}
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="hidden md:block text-sm font-medium text-gray-700 mb-2 invisible">
//                                             Last Name
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="lastname"
//                                             placeholder="Last Name"
//                                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                             value={formData.lastname}
//                                             onChange={handleChange}
//                                             disabled={isViewMode}
//                                         />
//                                         {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>}
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                                             Date of Birth (DD/MM/YYYY) <span className="text-red-500">*</span>
//                                         </label>
//                                         <input
//                                             type="text" 
//                                             name="dob"
//                                             placeholder="DD/MM/YYYY"
//                                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                             value={formData.dob}
//                                             onChange={handleChange}
//                                             disabled={true} // 🟢 ALWAYS DISABLED (Permanent Fix)
//                                         />
//                                         {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                                             Place of Birth <span className="text-red-500">*</span>
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="birthplace"
//                                             placeholder="Write here"
//                                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                             value={formData.birthplace || ''}
//                                             onChange={handleChange}
//                                             disabled={isViewMode} 
//                                         />
//                                         {errors.birthplace && <p className="text-red-500 text-xs mt-1">{errors.birthplace}</p>}
//                                     </div>
//                                 </div>
//                                 
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-2">
//                                             Aadhar Card No. <span className="text-red-500">*</span>
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="aadharno"
//                                             placeholder="12-digit number"
//                                             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                             value={formData.aadharno}
//                                             onChange={handleChange}
//                                             disabled={isViewMode} 
//                                         />
//                                         {errors.aadharno && <p className="text-red-500 text-xs mt-1">{errors.aadharno}</p>}
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {activeTab === 'parent' && formData.parent && (
//                             <div className="space-y-6">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Father's Name <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="parent.fathername"
//                                         placeholder="Write here"
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//                                         value={formData.parent.fathername}
//                                         onChange={handleChange}
//                                         disabled={isViewMode} 
//                                     />
//                                     {errors['parent.fathername'] && <p className="text-red-500 text-xs mt-1">{errors['parent.fathername']}</p>}
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Mother's Name <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="parent.mothername"
//                                         placeholder="Write here"
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//                                         value={formData.parent.mothername}
//                                         onChange={handleChange}
//                                         disabled={isViewMode} // 🟢 DISABLED IN VIEW MODE
//                                     />
//                                     {errors['parent.mothername'] && <p className="text-red-500 text-xs mt-1">{errors['parent.mothername']}</p>}
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Contact Number (Primary) <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="parent.primarycontact"
//                                         placeholder="10-digit number"
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//                                         value={formData.parent.primarycontact}
//                                         onChange={handleChange}
//                                         disabled={isViewMode} // 🟢 DISABLED IN VIEW MODE
//                                     />
//                                     {errors['parent.primarycontact'] && <p className="text-red-500 text-xs mt-1">{errors['parent.primarycontact']}</p>}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                     
//                     {/* 🟢 START OF PHOTO SECTION MODIFICATION 🟢 */}
//                     {activeTab === 'student' && (
//                         <div className="w-full xl:w-64">
//                             <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center shadow-inner">
//                                 <div className="w-32 h-32 mx-auto bg-white rounded-xl shadow-md flex items-center justify-center mb-4 border-4 border-blue-200 overflow-hidden">
//                                     {(photoPreview || formData.photo) ? (
//                                         <img 
//                                             src={photoPreview || formData.photo} 
//                                             alt={`${formData.firstname} profile`} 
//                                             className="object-cover w-full h-full" 
//                                         />
//                                     ) : (
//                                         <User className="w-16 h-16 text-gray-400" />
//                                     )}
//                                 </div>
//                                 {/* HIDING UPLOAD BUTTON IN VIEW MODE */}
//                                 {!isViewMode && (
//                                     <>
//                                         <p className="text-sm text-gray-600 mb-4">Upload Student Photo</p>
//                                         <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md">
//                                                 Choose File
//                                             <input
//                                                 type="file"
//                                                 accept="image/*"
//                                                 onChange={handlePhotoChange}
//                                                 className="hidden"
//                                                 disabled={isViewMode}
//                                             />
//                                         </label>
//                                     </>
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                     {/* 🟢 END OF PHOTO SECTION MODIFICATION 🟢 */}
//                 </div>

//                 {/* 🟢 HIDING SAVE/CANCEL BUTTONS IN VIEW MODE */}
//                 {!isViewMode && (
//                     <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-8 pt-6 border-t border-gray-200">
//                         <button 
//                             onClick={fecthStudent}
//                             disabled={loading}
//                             className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//                             type="button"
//                         >
//                             Cancel
//                         </button>
//                         <button 
//                             disabled={loading}
//                             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                             type="submit"
//                         >
//                             {loading ? 'Saving...' : 'Save & Continue'}
//                         </button>
//                     </div>
//                 )}
//             </form>
//         </div>
//     );
// }

// export default StudentProfile;

import React, { useState, useEffect } from 'react'; // Import hooks
import { User, X } from 'lucide-react';
import axios from 'axios';
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from '../../config'; 

// Helper function to format MongoDB ISO date string to DD/MM/YYYY
const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return dateString;
        }
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    } catch {
        return dateString;
    }
};

// Helper to convert DD/MM/YYYY back to ISO string for submission
const dateToISOString = (dateString) => {
    if (!dateString || dateString.length !== 10) return dateString;
    const parts = dateString.split('/');
    if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateString;
};

// Utility function to flatten a nested object for Mongoose updates
const flattenObjectForMongoose = (obj, parentKey = '', res = {}) => {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== undefined) {
            const propName = parentKey ? `${parentKey}.${key}` : key;
            const value = obj[key];
            if (typeof value === 'object' && value !== null && !Array.isArray(value) && !(value instanceof Date) && !(propName.includes('__'))) {
                flattenObjectForMongoose(value, propName, res);
            } else if (propName !== '_id' && propName !== '__v' && propName !== 'createdAt' && propName !== 'updatedAt') {
                res[propName] = value;
            }
        }
    }
    return res;
};

const StudentProfile = ({ studentid, isViewMode }) => { 

    const [activeTab, setActiveTab] = useState('student');
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState({ type: '', message: '' });

    // State for photo upload
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    const AUTH_HEADER = 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=';

    // Validation logic for individual fields
    const validateField = (name, value) => {
        let errorMsg = '';
        const requiredFields = [
            'firstname', 'lastname', 'dob', 'birthplace', 'bloodgroup', 'aadharno',
            'parent.fathername', 'parent.mothername', 'parent.primarycontact'
        ];

        if (requiredFields.includes(name) && (!value || String(value).trim() === '')) {
            errorMsg = 'This field is required';
        } else {
            switch (name) {
                case 'dob':
                    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
                        errorMsg = 'Date must be in DD/MM/YYYY format';
                    }
                    break;
                case 'aadharno':
                    if (!/^\d{12}$/.test(value)) {
                        errorMsg = 'Aadhar number must be 12 digits';
                    }
                    break;
                case 'parent.primarycontact':
                    if (!/^\d{10}$/.test(value)) {
                        errorMsg = 'Contact number must be 10 digits';
                    }
                    break;
                default:
                    errorMsg = '';
            }
        }
        setErrors(prev => ({ ...prev, [name]: errorMsg }));
        return errorMsg === '';
    };
    
    // Function to validate the entire form before submission
    const validateForm = () => {
        const requiredFields = [
            'firstname', 'lastname', 'dob', 'birthplace', 'bloodgroup', 'gender', 'nationality', 'category', 'aadharno',
            'parent.fathername', 'parent.mothername', 'parent.primarycontact', 'parent.relationwithstudent'
        ];
        let isValid = true;
        requiredFields.forEach(field => {
            const [section, subField] = field.includes('.') ? field.split('.') : [field, null];
            const value = subField ? (formData[section] ? formData[section][subField] : '') : formData[section];
            if (!validateField(field, value)) {
                isValid = false;
            }
        });
        return isValid;
    };

    // Function to handle file selection for photo upload
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                setNotification({ type: 'error', message: 'Please select a valid image file' });
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setNotification({ type: 'error', message: 'Image file size should be less than 5MB' });
                return;
            }
            setPhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    // Function to upload file to Cloudinary
    const uploadToCloudinary = async (file) => {
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);
        uploadFormData.append("upload_preset", "sspd-student-management");
        uploadFormData.append("folder", `student_images/profile_photos`);
        uploadFormData.append("public_id", `${formData.firstname}_${formData.lastname}_${formData._id}`); 

        try {
            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/dfc8sai1i/auto/upload",
                uploadFormData
            );
            return res.data.secure_url;
        } catch (err) {
            console.error("Upload error:", err);
            setNotification({ type: 'error', message: `Photo upload failed: ${err.message}` });
            throw err;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
        if (name.includes('.')) {
            const [section, field] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [section]: {
                    ...(prev ? prev[section] : {}),
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSave = async (e) => {
        if (!formData) return;
        setNotification({ type: '', message: '' });

        if (!validateForm()) {
            setNotification({ type: 'error', message: 'Please fix the errors in the form before saving.' });
            return;
        }

        setLoading(true);

        try {
            let photoUrl = formData.photo;

            if (photo) {
                photoUrl = await uploadToCloudinary(photo);
            }

            const dataToSave = {
                ...formData,
                dob: dateToISOString(formData.dob),
                photo: photoUrl,
                status: formData.status
            };

            const flattenedUpdate = flattenObjectForMongoose(dataToSave);

            // FIX 1: Using imported API_BASE_URL
            const response = await axios.put(
                `${API_BASE_URL}api/edit-student/${formData._id}`,
                flattenedUpdate,
                {
                    headers: {
                        auth: AUTH_HEADER,
                        'Content-Type': 'application/json' // ✅ This is the critical fix
                    }
                }
            );

            if (response.status === 200) {
                setNotification({ type: 'success', message: 'Student profile updated successfully!' });
                setErrors({});
                setPhoto(null);
                setPhotoPreview(null);
            }
        } catch (error) {
            console.error("Error saving student data:", error);
            const errorMsg = error.response?.data?.message || "An unknown error occurred.";
            setNotification({ type: 'error', message: `Failed to save: ${errorMsg}` });
        } finally {
            setLoading(false);
            fecthStudent();
        }
    };
    
    const handleToggleStatus = async () => {
        if (!formData) return;
        const newStatus = !formData.status;
        setFormData(prev => ({ ...prev, status: newStatus }));
        try {
            // FIX 2: Using imported API_BASE_URL
            const response = await axios.put(`${API_BASE_URL}api/edit-student/${formData._id}`,
                { status: newStatus },
                { headers: { auth: AUTH_HEADER } }
            );
            if (response.status !== 200) {
                 setFormData(prev => ({ ...prev, status: !newStatus }));
                 console.error("Failed to toggle status: Non-200 response");
            }
        } catch (error) {
            setFormData(prev => ({ ...prev, status: !newStatus }));
            console.error("Error toggling status:", error);
        }
    };

    const fecthStudent = async () => {
        setLoading(true);
        try {
            // FIX 3: Using imported API_BASE_URL
            const response = await axios.post(`${API_BASE_URL}api/student-by-id`,
                { id: studentid }, {
                headers: { auth: AUTH_HEADER }
            });
            if (response.status === 200) {
                const studentData = response.data;
                studentData.dob = formatDate(studentData.dob); 
                
                // 🟢 CRITICAL FIX: Ensure nested objects are initialized if missing
                studentData.parent = studentData.parent || {};
                studentData.address = studentData.address || {}; 

                setFormData(studentData);
            }
        } catch (error) {
            console.error("Error fetching student:", error);
            setFormData(null);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (studentid) {
            fecthStudent();
        }
    }, [studentid]);

    if (loading || !formData) {
        return (
            <div className="h-full w-full p-6 bg-gray-50">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading student profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-2 px-1 sm:px-1 md:px-2 bg-gray-50 w-12/12 max-w-7xl"> 
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Students Management</h2>
                    <h3 className="text-xl font-semibold text-gray-700">Admission Form</h3>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"> 
                        AY {formData.admission.academicyear}
                    </div>
                    {/* HIDING STATUS TOGGLE IN VIEW MODE */}
                    {!isViewMode && (
                        <div className="flex items-center space-x-3">
                            <span className={`text-sm font-medium ${formData.status ? 'text-green-700' : 'text-red-700'}`}>
                                {formData.status ? 'Active' : 'Inactive'}
                            </span>
                            <button
                                onClick={handleToggleStatus}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${formData.status ? 'bg-green-500' : 'bg-gray-300'}`}
                                role="switch"
                                aria-checked={formData.status}
                                aria-label="Toggle student status"
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${formData.status ? 'translate-x-6' : 'translate-x-1'}`}
                                />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex space-x-1 mb-6">
                <button
                    onClick={() => setActiveTab('student')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeTab === 'student' ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}
                >
                    Student Details
                </button>
                <button
                    onClick={() => setActiveTab('parent')}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${activeTab === 'parent' ? 'bg-blue-100 text-blue-700 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}
                >
                    Parent/Guardian Details
                </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSave(e); }} className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
                {notification.message && (
                    <div className={`p-4 mb-6 rounded-lg flex justify-between items-center ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        <p>{notification.message}</p>
                        <button type="button" onClick={() => setNotification({ type: '', message: '' })}>
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                )}
                
                <div className="flex flex-col xl:flex-row space-y-8 xl:space-y-0 xl:space-x-8">
                    <div className="flex-1">
                        {activeTab === 'student' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="firstname"
                                            placeholder="First Name"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={formData.firstname}
                                            onChange={handleChange}
                                            disabled={isViewMode}
                                        />
                                        {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>}
                                    </div>
                                    <div className="mt-0 md:mt-8"> 
                                        <input
                                            type="text"
                                            name="middlename"
                                            placeholder="Middle Name"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={formData.middlename || ''}
                                            onChange={handleChange}
                                            disabled={isViewMode}
                                        />
                                    </div>
                                    <div>
                                        <label className="hidden md:block text-sm font-medium text-gray-700 mb-2 invisible">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastname"
                                            placeholder="Last Name"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={formData.lastname}
                                            onChange={handleChange}
                                            disabled={isViewMode}
                                        />
                                        {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Date of Birth (DD/MM/YYYY) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text" 
                                            name="dob"
                                            placeholder="DD/MM/YYYY"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={formData.dob}
                                            onChange={handleChange}
                                            disabled={true} // 🟢 ALWAYS DISABLED (Permanent Fix)
                                        />
                                        {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Place of Birth <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="birthplace"
                                            placeholder="Write here"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={formData.birthplace || ''}
                                            onChange={handleChange}
                                            disabled={isViewMode} 
                                        />
                                        {errors.birthplace && <p className="text-red-500 text-xs mt-1">{errors.birthplace}</p>}
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Aadhar Card No. <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="aadharno"
                                            placeholder="12-digit number"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={formData.aadharno}
                                            onChange={handleChange}
                                            disabled={isViewMode} 
                                        />
                                        {errors.aadharno && <p className="text-red-500 text-xs mt-1">{errors.aadharno}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="parent.emailaddress"
                                            placeholder="example@email.com"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                            value={formData.parent.emailaddress || ''}
                                            onChange={handleChange}
                                            disabled={isViewMode} 
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'parent' && formData.parent && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Father's Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="parent.fathername"
                                        placeholder="Write here"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                        value={formData.parent.fathername}
                                        onChange={handleChange}
                                        disabled={isViewMode} 
                                    />
                                    {errors['parent.fathername'] && <p className="text-red-500 text-xs mt-1">{errors['parent.fathername']}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mother's Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="parent.mothername"
                                        placeholder="Write here"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                        value={formData.parent.mothername}
                                        onChange={handleChange}
                                        disabled={isViewMode} // 🟢 DISABLED IN VIEW MODE
                                    />
                                    {errors['parent.mothername'] && <p className="text-red-500 text-xs mt-1">{errors['parent.mothername']}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Contact Number (Primary) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="parent.primarycontact"
                                        placeholder="10-digit number"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                        value={formData.parent.primarycontact}
                                        onChange={handleChange}
                                        disabled={isViewMode} // 🟢 DISABLED IN VIEW MODE
                                    />
                                    {errors['parent.primarycontact'] && <p className="text-red-500 text-xs mt-1">{errors['parent.primarycontact']}</p>}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* 🟢 START OF PHOTO SECTION MODIFICATION 🟢 */}
                    {activeTab === 'student' && (
                        <div className="w-full xl:w-64">
                            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center shadow-inner">
                                <div className="w-32 h-32 mx-auto bg-white rounded-xl shadow-md flex items-center justify-center mb-4 border-4 border-blue-200 overflow-hidden">
                                    {(photoPreview || formData.photo) ? (
                                        <img 
                                            src={photoPreview || formData.photo} 
                                            alt={`${formData.firstname} profile`} 
                                            className="object-cover w-full h-full" 
                                        />
                                    ) : (
                                        <User className="w-16 h-16 text-gray-400" />
                                    )}
                                </div>
                                {/* HIDING UPLOAD BUTTON IN VIEW MODE */}
                                {!isViewMode && (
                                    <>
                                        <p className="text-sm text-gray-600 mb-4">Upload Student Photo</p>
                                        <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md">
                                                Choose File
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handlePhotoChange}
                                                className="hidden"
                                                disabled={isViewMode}
                                            />
                                        </label>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                    {/* 🟢 END OF PHOTO SECTION MODIFICATION 🟢 */}
                </div>

                {/* 🟢 HIDING SAVE/CANCEL BUTTONS IN VIEW MODE */}
                {!isViewMode && (
                    <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-8 pt-6 border-t border-gray-200">
                        <button 
                            onClick={fecthStudent}
                            disabled={loading}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            type="button"
                        >
                            Cancel
                        </button>
                        <button 
                            disabled={loading}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            type="submit"
                        >
                            {loading ? 'Saving...' : 'Save & Continue'}
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}

export default StudentProfile;