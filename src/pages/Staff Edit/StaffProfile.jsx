// import React, { useState, useEffect } from 'react';
// import { User, X } from 'lucide-react';
// import axios from 'axios';

// const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
// // Placeholder for the Cloudinary upload preset/URL (Update these if they change)
// const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dfc8sai1i/auto/upload"; 
// const CLOUDINARY_PRESET = "sspd-student-management"; 

// // Placeholder function for Cloudinary upload (using axios)
// const uploadToCloudinary = async (file, staffData) => {
//     console.log("DEBUG: uploadToCloudinary - Initiating file upload...");
//     const uploadFormData = new FormData();
//     uploadFormData.append("file", file);
//     uploadFormData.append("upload_preset", CLOUDINARY_PRESET);
//     uploadFormData.append("folder", `staff_images/profile_photos`);
//     uploadFormData.append("public_id", `${staffData.staffid}_${staffData.lastname}`); 

//     try {
//         const res = await axios.post(
//             CLOUDINARY_UPLOAD_URL,
//             uploadFormData
//         );
//         console.log("DEBUG: uploadToCloudinary - Upload successful:", res.data.secure_url);
//         return res.data.secure_url; // Returns the public URL
//     } catch (err) {
//         console.error("❌ ERROR: uploadToCloudinary - Upload failed.", err);
//         throw new Error("Photo upload failed. Check network/console.");
//     }
// };

// export default function StaffProfile({ staffData, setStaffData, handleSubmit, handleInputChange, isActive, toggleActive, loading, error }) {
    
//     const [photoFile, setPhotoFile] = useState(null);
//     const [photoPreview, setPhotoPreview] = useState(null);
//     const [localLoading, setLocalLoading] = useState(false);
//     const [notification, setNotification] = useState({ type: '', message: '' });

//     // Set preview from fetched data on mount/update
//     useEffect(() => {
//         // Only set the initial photo preview if we have a fetched photo URL AND no new file has been selected
//         if (staffData?.photo && !photoFile) {
//             setPhotoPreview(staffData.photo);
//         } else if (!staffData?.photo && !photoFile) {
//             setPhotoPreview(null);
//         }
//         if (staffData?.firstname) {
//             console.log(`DEBUG: StaffProfile - Data loaded for: ${staffData.firstname} ${staffData.lastname}`);
//         }
//     }, [staffData, photoFile]);

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         if (!file.type.startsWith("image/")) {
//             setNotification({ type: 'error', message: 'Please select a valid image file.' });
//             return;
//         }
//         if (file.size > 5 * 1024 * 1024) { // 5MB limit
//             setNotification({ type: 'error', message: 'Image file size should be less than 5MB.' });
//             return;
//         }

//         setPhotoFile(file);
//         setPhotoPreview(URL.createObjectURL(file));
//         setNotification({ type: '', message: '' });
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         setLocalLoading(true);
//         setNotification({ type: '', message: '' });
//         let photoUrl = staffData.photo; // Start with the existing URL

//         if (photoFile) {
//             try {
//                 // 1. Upload the new file
//                 photoUrl = await uploadToCloudinary(photoFile, staffData);
//                 console.log("DEBUG: handleFormSubmit - Upload successful, new URL ready for database update.");
//                 setPhotoFile(null); // Clear file state
//                 // Note: The new URL will be visible via photoPreview immediately 
//                 // and will be permanently stored on successful parent submit/re-fetch.

//             } catch (uploadError) {
//                 const msg = uploadError.message || "Failed to upload photo.";
//                 setNotification({ type: 'error', message: msg });
//                 setLocalLoading(false);
//                 return; // Stop submission if upload fails
//             }
//         }
        
//         // 2. Call parent handleSubmit, passing the final photo URL (new or existing)
//         // Parent component handles the API call and re-fetch.
//         await handleSubmit(e, photoUrl);
        
//         setLocalLoading(false); 
//     };

//     if (!staffData) {
//         // Fallback safety barrier (should be caught by parent's rendering guard)
//         return <div className="text-center p-8 text-red-500">Error: Staff data object is missing.</div>;
//     }


//     return (
//         <form onSubmit={handleFormSubmit}>
//             {/* Loading and error messages for the profile tab only */}
//             {(loading || localLoading) && (
//                  <div className="text-center p-4 text-blue-500">Profile data is currently saving or refreshing...</div>
//             )}
//             {error && (
//                  <div className="text-center p-4 text-red-500">ERROR: Profile failed to save. Check console for details.</div>
//             )}
//             {notification.message && (
//                  <div className={`p-4 mb-4 rounded-lg flex justify-between items-center ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     <p>{notification.message}</p>
//                     <button type="button" onClick={() => setNotification({ type: '', message: '' })}>
//                         <X className="h-5 w-5" />
//                     </button>
//                  </div>
//             )}
            
//             <div className="flex flex-col xl:flex-row space-y-8 xl:space-y-0 xl:space-x-8">
//                 <div className="flex-1">
//                     <div className="space-y-6">
//                         {/* Name Fields */}
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Name <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="firstname"
//                                     value={staffData.firstname}
//                                     onChange={handleInputChange}
//                                     placeholder="First Name"
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                     required
//                                 />
//                             </div>
//                             <div className="mt-0 md:mt-8">
//                                 <input
//                                     type="text"
//                                     name="middlename"
//                                     value={staffData.middlename}
//                                     onChange={handleInputChange}
//                                     placeholder="Middle Name"
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 />
//                             </div>
//                             <div className="mt-0 md:mt-8">
//                                 <input
//                                     type="text"
//                                     name="lastname"
//                                     value={staffData.lastname}
//                                     onChange={handleInputChange}
//                                     placeholder="Last Name"
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                     required
//                                 />
//                             </div>
//                         </div>

//                         {/* Date of Birth and Marital Status */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Date of Birth <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                     type="date"
//                                     name="dob"
//                                     value={staffData.dob}
//                                     onChange={handleInputChange}
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Marital Status <span className="text-red-500">*</span>
//                                 </label>
//                                 <select
//                                     name="maritalstatus"
//                                     value={staffData.maritalstatus}
//                                     onChange={handleInputChange}
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//                                     required
//                                 >
//                                     <option value="">Select</option>
//                                     <option value="Single">Single</option>
//                                     <option value="Married">Married</option>
//                                     <option value="Divorced">Divorced</option>
//                                     <option value="Widowed">Widowed</option>
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Blood Group and Gender */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Blood Group <span className="text-red-500">*</span>
//                                 </label>
//                                 <select
//                                     name="bloodgroup"
//                                     value={staffData.bloodgroup}
//                                     onChange={handleInputChange}
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//                                     required
//                                 >
//                                     <option value="">Select</option>
//                                     <option value="A+">A+</option>
//                                     <option value="A-">A-</option>
//                                     <option value="B+">B+</option>
//                                     <option value="B-">B-</option>
//                                     <option value="AB+">AB+</option>
//                                     <option value="AB-">AB-</option>
//                                     <option value="O+">O+</option>
//                                     <option value="O-">O-</option>
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                     Gender <span className="text-red-500">*</span>
//                                 </label>
//                                 <select
//                                     name="gender"
//                                     value={staffData.gender}
//                                     onChange={handleInputChange}
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//                                     required
//                                 >
//                                     <option value="">Select</option>
//                                     <option value="Male">Male</option>
//                                     <option value="Female">Female</option>
//                                     <option value="Other">Other</option>
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Contact Details (bg-white) */}
//                         <div className="bg-white p-4 rounded-lg">
//                             <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                                 Contact Details
//                             </h3>
//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Contact Number <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="tel"
//                                         name="phoneno"
//                                         value={staffData.phoneno}
//                                         onChange={handleInputChange}
//                                         placeholder="Contact Number"
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Email Address <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="email"
//                                         name="emailaddress"
//                                         value={staffData.emailaddress}
//                                         onChange={handleInputChange}
//                                         placeholder="example@gmail.com"
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Profile Picture (Image Upload/Preview) */}
//                 <div className="w-full xl:w-64">
//                     <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
//                         <div className="w-32 h-32 mx-auto bg-white rounded-full shadow-md flex items-center justify-center mb-4 border-4 border-blue-200 overflow-hidden">
//                              {/* Display photo preview (local or fetched URL) */}
//                              {photoPreview ? (
//                                 <img 
//                                     src={photoPreview} 
//                                     alt={`${staffData?.firstname || ''} profile`} 
//                                     className="object-cover w-full h-full" 
//                                 />
//                              ) : (
//                                 <User className="w-16 h-16 text-gray-400" />
//                              )}
//                         </div>
//                         <p className="text-sm text-gray-600 mb-4">
//                             Upload Staff Photo
//                         </p>
//                         <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//                             Choose File
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handleFileChange}
//                                 className="hidden"
//                                 disabled={loading || localLoading}
//                             />
//                         </label>
//                     </div>
//                 </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-8 pt-6 border-t border-gray-200">
//                 <button
//                     type="button"
//                     className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//                     onClick={() => console.log("DEBUG: StaffProfile - Cancel button clicked. Resetting form is usually done here.")}
//                     disabled={loading || localLoading} // Disable while saving
//                 >
//                     Cancel
//                 </button>
//                 <button
//                     type="submit"
//                     className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
//                     disabled={loading || localLoading} // Disable while saving
//                 >
//                     {(loading || localLoading) ? 'Saving...' : 'Save & Continue'}
//                 </button>
//             </div>
//         </form>
//     );
// }







// import React, { useState, useEffect } from 'react';
// import { User, X } from 'lucide-react';
// import axios from 'axios';

// const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
// const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dyloa2svi/auto/upload"; 
// const CLOUDINARY_PRESET = "sspd-student-management"; 

// const uploadToCloudinary = async (file, staffData) => {
//     const uploadFormData = new FormData();
//     uploadFormData.append("file", file);
//     uploadFormData.append("upload_preset", CLOUDINARY_PRESET);
//     uploadFormData.append("folder", `staff_images/profile_photos`);
//     uploadFormData.append("public_id", `${staffData.staffid}_${staffData.lastname}`); 

//     try {
//         const res = await axios.post(CLOUDINARY_UPLOAD_URL, uploadFormData);
//         return res.data.secure_url;
//     } catch (err) {
//         throw new Error("Photo upload failed. Check network/console.");
//     }
// };

// export default function StaffProfile({
//     staffData,
//     setStaffData,
//     handleSubmit,
//     handleInputChange,
//     isActive,
//     toggleActive,
//     loading,
//     error,
//     isViewMode
// }) {
    
//     const [photoFile, setPhotoFile] = useState(null);
//     const [photoPreview, setPhotoPreview] = useState(null);
//     const [localLoading, setLocalLoading] = useState(false);
//     const [notification, setNotification] = useState({ type: '', message: '' });

//     useEffect(() => {
//         if (staffData?.photo && !photoFile) {
//             setPhotoPreview(staffData.photo);
//         } else if (!staffData?.photo && !photoFile) {
//             setPhotoPreview(null);
//         }
//     }, [staffData, photoFile]);

//     const handleFileChange = (e) => {
//         if (isViewMode) return;

//         const file = e.target.files[0];
//         if (!file) return;

//         if (!file.type.startsWith("image/")) {
//             setNotification({ type: 'error', message: 'Please select a valid image file.' });
//             return;
//         }
//         if (file.size > 5 * 1024 * 1024) {
//             setNotification({ type: 'error', message: 'Image file size should be less than 5MB.' });
//             return;
//         }

//         setPhotoFile(file);
//         setPhotoPreview(URL.createObjectURL(file));
//         setNotification({ type: '', message: '' });
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         if (isViewMode) return;

//         setLocalLoading(true);
//         setNotification({ type: '', message: '' });

//         let photoUrl = staffData.photo;

//         if (photoFile) {
//             try {
//                 photoUrl = await uploadToCloudinary(photoFile, staffData);
//                 setPhotoFile(null);
//             } catch (uploadError) {
//                 setNotification({ type: 'error', message: uploadError.message });
//                 setLocalLoading(false);
//                 return;
//             }
//         }
        
//         await handleSubmit(e, photoUrl);
//         setLocalLoading(false);
//     };

//     if (!staffData) {
//         return <div className="text-center p-8 text-red-500">Error: Staff data object is missing.</div>;
//     }

//     return (
//         <form onSubmit={handleFormSubmit}>
            
//             {(loading || localLoading) && (
//                 <div className="text-center p-4 text-blue-500">
//                     Profile data is currently saving or refreshing...
//                 </div>
//             )}

//             {error && (
//                 <div className="text-center p-4 text-red-500">
//                     ERROR: Profile failed to save.
//                 </div>
//             )}

//             {notification.message && (
//                 <div className={`p-4 mb-4 rounded-lg flex justify-between items-center ${
//                     notification.type === 'success'
//                         ? 'bg-green-100 text-green-800'
//                         : 'bg-red-100 text-red-800'
//                 }`}>
//                     <p>{notification.message}</p>
//                     <button type="button" onClick={() => setNotification({ type: '', message: '' })}>
//                         <X className="h-5 w-5" />
//                     </button>
//                 </div>
//             )}
            
//             <div className="flex flex-col xl:flex-row space-y-8 xl:space-y-0 xl:space-x-8">
                
//                 {/* LEFT SECTION */}
//                 <div className="flex-1">
//                     <div className="space-y-6">
                        
//                         {/* Name Fields */}
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium mb-2">
//                                     Name <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="firstname"
//                                     value={staffData.firstname}
//                                     onChange={handleInputChange}
//                                     className="w-full px-4 py-3 border rounded-lg"
//                                     required
//                                     disabled={isViewMode}
//                                 />
//                             </div>

//                             <div className="mt-0 md:mt-8">
//                                 <input
//                                     type="text"
//                                     name="middlename"
//                                     value={staffData.middlename}
//                                     onChange={handleInputChange}
//                                     className="w-full px-4 py-3 border rounded-lg"
//                                     disabled={isViewMode}
//                                 />
//                             </div>

//                             <div className="mt-0 md:mt-8">
//                                 <input
//                                     type="text"
//                                     name="lastname"
//                                     value={staffData.lastname}
//                                     onChange={handleInputChange}
//                                     className="w-full px-4 py-3 border rounded-lg"
//                                     required
//                                     disabled={isViewMode}
//                                 />
//                             </div>
//                         </div>

//                         {/* DOB & Marital */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium mb-2">
//                                     Date of Birth <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                     type="date"
//                                     name="dob"
//                                     value={staffData.dob}
//                                     onChange={handleInputChange}
//                                     className="w-full px-4 py-3 border rounded-lg"
//                                     required
//                                     disabled={isViewMode}
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium mb-2">
//                                     Marital Status <span className="text-red-500">*</span>
//                                 </label>
//                                 <select
//                                     name="maritalstatus"
//                                     value={staffData.maritalstatus}
//                                     onChange={handleInputChange}
//                                     className="w-full px-4 py-3 border rounded-lg bg-white"
//                                     required
//                                     disabled={isViewMode}
//                                 >
//                                     <option value="">Select</option>
//                                     <option value="Single">Single</option>
//                                     <option value="Married">Married</option>
//                                     <option value="Divorced">Divorced</option>
//                                     <option value="Widowed">Widowed</option>
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Blood Group & Gender */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium mb-2">
//                                     Blood Group <span className="text-red-500">*</span>
//                                 </label>
//                                 <select
//                                     name="bloodgroup"
//                                     value={staffData.bloodgroup}
//                                     onChange={handleInputChange}
//                                     className="w-full px-4 py-3 border rounded-lg bg-white"
//                                     required
//                                     disabled={isViewMode}
//                                 >
//                                     <option value="">Select</option>
//                                     <option value="A+">A+</option>
//                                     <option value="A-">A-</option>
//                                     <option value="B+">B+</option>
//                                     <option value="B-">B-</option>
//                                     <option value="AB+">AB+</option>
//                                     <option value="AB-">AB-</option>
//                                     <option value="O+">O+</option>
//                                     <option value="O-">O-</option>
//                                 </select>
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium mb-2">
//                                     Gender <span className="text-red-500">*</span>
//                                 </label>
//                                 <select
//                                     name="gender"
//                                     value={staffData.gender}
//                                     onChange={handleInputChange}
//                                     className="w-full px-4 py-3 border rounded-lg bg-white"
//                                     required
//                                     disabled={isViewMode}
//                                 >
//                                     <option value="">Select</option>
//                                     <option value="Male">Male</option>
//                                     <option value="Female">Female</option>
//                                     <option value="Other">Other</option>
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Contact Details */}
//                         <div className="bg-white p-4 rounded-lg">
//                             <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
//                             <div className="space-y-4">

//                                 <div>
//                                     <label className="block text-sm font-medium mb-2">
//                                         Contact Number <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="tel"
//                                         name="phoneno"
//                                         value={staffData.phoneno}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-3 border rounded-lg"
//                                         required
//                                         disabled={isViewMode}
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium mb-2">
//                                         Email Address <span className="text-red-500">*</span>
//                                     </label>
//                                     <input
//                                         type="email"
//                                         name="emailaddress"
//                                         value={staffData.emailaddress}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-3 border rounded-lg"
//                                         required
//                                         disabled={isViewMode}
//                                     />
//                                 </div>

//                             </div>
//                         </div>

//                     </div>
//                 </div>

//                 {/* RIGHT SIDE – PROFILE PHOTO */}
//                 <div className="w-full xl:w-64">

//                     <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">

//                         <div className="w-32 h-32 mx-auto bg-white rounded-full shadow-md border-4 border-blue-200 overflow-hidden flex items-center justify-center mb-4">

//                             {photoPreview ? (
//                                 <img
//                                     src={photoPreview}
//                                     alt="Profile"
//                                     className="object-cover w-full h-full"
//                                 />
//                             ) : (
//                                 <User className="w-16 h-16 text-gray-400" />
//                             )}

//                         </div>

//                         {!isViewMode && (
//                             <p className="text-sm text-gray-600 mb-4">
//                                 Upload Staff Photo
//                             </p>
//                         )}

//                         {!isViewMode && (
//                             <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//                                 Choose File
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     onChange={handleFileChange}
//                                     className="hidden"
//                                     disabled={loading || localLoading}
//                                 />
//                             </label>
//                         )}

//                     </div>
//                 </div>
//             </div>

//             {/* ACTION BUTTONS — HIDDEN IN VIEW MODE */}
//             {!isViewMode && (
//                 <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-8 pt-6 border-t border-gray-200">

//                     {/* CANCEL NOW REFRESHES THE PAGE */}
//                     <button
//                         type="button"
//                         className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
//                         onClick={() => window.location.reload()}   // ✅ ADDED
//                         disabled={loading || localLoading}
//                     >
//                         Cancel
//                     </button>

//                     {/* SAVE */}
//                     <button
//                         type="submit"
//                         className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
//                         disabled={loading || localLoading}
//                     >
//                         {(loading || localLoading) ? 'Saving...' : 'Save & Continue'}
//                     </button>

//                 </div>
//             )}

//         </form>
//     );
// }






























// import React, { useState, useEffect } from 'react';
// import { User } from 'lucide-react';
// import axios from 'axios';

// const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
// const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dyloa2svi/auto/upload"; 
// const CLOUDINARY_PRESET = "sspd-student-management"; 

// const DEPARTMENTS = ["", "Teaching", "Non-Teaching", "Administration", "Transport", "Security"];
// const POSITIONS = ["", "Principal", "Vice-Principal", "HOD", "Senior Teacher", "Junior Teacher", "Librarian", "IT Staff", "Bus Driver", "Cleaner"];
// const GRADES = ["", "Nursery", "Junior", "Senior", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

// const uploadToCloudinary = async (file, staffData) => {
//     const uploadFormData = new FormData();
//     uploadFormData.append("file", file);
//     uploadFormData.append("upload_preset", CLOUDINARY_PRESET);
//     uploadFormData.append("folder", `staff_images/profile_photos`);
//     uploadFormData.append("public_id", `${staffData.staffid}_${staffData.lastname}`); 
//     try {
//         const res = await axios.post(CLOUDINARY_UPLOAD_URL, uploadFormData);
//         return res.data.secure_url;
//     } catch (err) {
//         throw new Error("Photo upload failed.");
//     }
// };

// export default function StaffProfile({
//     staffData,
//     setStaffData,
//     handleSubmit,
//     handleInputChange,
//     isActive,
//     toggleActive,
//     loading,
//     error,
//     isViewMode
// }) {
//     const [photoFile, setPhotoFile] = useState(null);
//     const [photoPreview, setPhotoPreview] = useState(null);
//     const [localLoading, setLocalLoading] = useState(false);

//     useEffect(() => {
//         if (staffData?.photo && !photoFile) setPhotoPreview(staffData.photo);
//     }, [staffData, photoFile]);

//     const handleFileChange = (e) => {
//         if (isViewMode) return;
//         const file = e.target.files[0];
//         if (!file) return;
//         setPhotoFile(file);
//         setPhotoPreview(URL.createObjectURL(file));
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         setLocalLoading(true);
//         let photoUrl = staffData.photo;
//         if (photoFile) {
//             try {
//                 photoUrl = await uploadToCloudinary(photoFile, staffData);
//             } catch (err) { alert(err.message); setLocalLoading(false); return; }
//         }
//         await handleSubmit(e, photoUrl);
//         setLocalLoading(false);
//     };

//     const SectionTitle = ({ title }) => (
//         <div className="-mx-8 bg-blue-400 text-white px-4 py-2 rounded-t mb-6 mt-6 first:mt-0">
//             <h4 className="text-xl font-semibold">{title}</h4>
//         </div>
//     );

//     return (
//         <form onSubmit={handleFormSubmit}>
//             <div className="flex flex-col xl:flex-row space-y-8 xl:space-y-0 xl:space-x-8">
//                 <div className="flex-1">
                    
//                     {/* STAFF DETAILS */}
//                     <div className="rounded-lg p-8 border border-gray-200 mb-6">
//                         <SectionTitle title="Staff Details" />
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             <div><label className="block text-sm font-medium mb-1">First Name *</label>
//                             <input type="text" name="firstname" value={staffData.firstname || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required /></div>
//                             <div><label className="block text-sm font-medium mb-1">Middle Name</label>
//                             <input type="text" name="middlename" value={staffData.middlename || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} /></div>
//                             <div><label className="block text-sm font-medium mb-1">Last Name *</label>
//                             <input type="text" name="lastname" value={staffData.lastname || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required /></div>
//                             <div><label className="block text-sm font-medium mb-1">Date of Birth *</label>
//                             <input type="date" name="dob" value={staffData.dob || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required /></div>
//                             <div><label className="block text-sm font-medium mb-1">Gender *</label>
//                             <select name="gender" value={staffData.gender || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-white" disabled={isViewMode} required>
//                                 <option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
//                             </select></div>
//                             <div><label className="block text-sm font-medium mb-1">Marital Status *</label>
//                             <select name="maritalstatus" value={staffData.maritalstatus || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-white" disabled={isViewMode}>
//                                 <option value="">Select</option><option value="Single">Single</option><option value="Married">Married</option><option value="Divorced">Divorced</option><option value="Widowed">Widowed</option>
//                             </select></div>
//                             <div><label className="block text-sm font-medium mb-1">Blood Group *</label>
//                             <select name="bloodgroup" value={staffData.bloodgroup || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-white" disabled={isViewMode}>
//                                 <option value="">Select</option><option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="O+">O+</option><option value="O-">O-</option><option value="AB+">AB+</option><option value="AB-">AB-</option>
//                             </select></div>
//                             <div><label className="block text-sm font-medium mb-1">Nationality *</label>
//                             <input type="text" name="nationality" value={staffData.nationality || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} /></div>
//                             <div><label className="block text-sm font-medium mb-1">Category *</label>
//                             <input type="text" name="category" value={staffData.category || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} /></div>
//                             <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Aadhar Number *</label>
//                             <input type="text" name="aadharno" value={staffData.aadharno || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required /></div>
//                         </div>
//                     </div>

//                     {/* CONTACT DETAILS */}
//                     <div className="rounded-lg p-8 border border-gray-200 mb-6">
//                         <SectionTitle title="Contact Details" />
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div><label className="block text-sm font-medium mb-1">Phone Number (Primary) *</label>
//                             <input type="tel" name="phoneno" value={staffData.phoneno || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required /></div>
//                             <div><label className="block text-sm font-medium mb-1">Alternate Phone Number</label>
//                             <input type="tel" name="alternatephoneno" value={staffData.alternatephoneno || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} /></div>
//                             <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Email Address *</label>
//                             <input type="email" name="emailaddress" value={staffData.emailaddress || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required /></div>
//                         </div>
//                     </div>

//                     {/* ADDRESS INFORMATION */}
//                     <div className="rounded-lg p-8 border border-gray-200 mb-6">
//                         <SectionTitle title="Address Information" />
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Address Line 1 *</label>
//                             <input type="text" name="addressline1" value={staffData.addressline1 || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required /></div>
//                             <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Address Line 2</label>
//                             <input type="text" name="addressline2" value={staffData.addressline2 || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} /></div>
//                             <div><label className="block text-sm font-medium mb-1">Postal Code *</label>
//                             <input type="text" name="postalcode" value={staffData.postalcode || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required /></div>
//                             <div><label className="block text-sm font-medium mb-1">City *</label>
//                             <input type="text" name="city" value={staffData.city || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required /></div>
//                             <div><label className="block text-sm font-medium mb-1">District *</label>
//                             <input type="text" name="district" value={staffData.district || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required /></div>
//                             <div><label className="block text-sm font-medium mb-1">State *</label>
//                             <input type="text" name="state" value={staffData.state || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required /></div>
//                         </div>
//                     </div>

//                     {/* EDUCATIONAL QUALIFICATION */}
//                     <div className="rounded-lg p-8 border border-gray-200 mb-6">
//                         <SectionTitle title="Educational Qualification" />
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div><label className="block text-sm font-medium mb-1">Highest Qualification *</label>
//                             <input type="text" name="highestqualification" value={staffData.highestqualification || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} /></div>
//                             <div><label className="block text-sm font-medium mb-1">Year of Passing *</label>
//                             <input type="text" name="yearofpassing" value={staffData.yearofpassing || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} /></div>
//                             <div><label className="block text-sm font-medium mb-1">University Name *</label>
//                             <input type="text" name="universityname" value={staffData.universityname || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} /></div>
//                             <div><label className="block text-sm font-medium mb-1">Specialization</label>
//                             <input type="text" name="specialization" value={staffData.specialization || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} /></div>
//                         </div>
//                     </div>

//                     {/* PROFESSIONAL EXPERIENCE */}
//                     <div className="rounded-lg p-8 border border-gray-200 mb-6">
//                         <SectionTitle title="Professional Experience" />
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div><label className="block text-sm font-medium mb-1">Total Experience (Years)</label>
//                             <input type="text" name="totalexperience" value={staffData.totalexperience || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} /></div>
//                             <div><label className="block text-sm font-medium mb-1">Previous Employer</label>
//                             <input type="text" name="previousemployer" value={staffData.previousemployer || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} /></div>
//                             <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">Subjects Taught</label>
//                             <input type="text" name="subjectstaught" value={staffData.subjectstaught || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} /></div>
//                         </div>
//                     </div>

//                     {/* ROLE & DEPARTMENT DETAILS */}
//                     <div className="rounded-lg p-8 border border-gray-200 mb-6">
//                         <SectionTitle title="Role & Department Details" />
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div><label className="block text-sm font-medium mb-1">Position Applied For *</label>
//                             <select name="position" value={staffData.position || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-white" disabled={isViewMode}>
//                                 {POSITIONS.map(p => <option key={p} value={p}>{p || 'Select'}</option>)}
//                             </select></div>
//                             <div><label className="block text-sm font-medium mb-1">Department *</label>
//                             <select name="dept" value={staffData.dept || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-white" disabled={isViewMode}>
//                                 {DEPARTMENTS.map(d => <option key={d} value={d}>{d || 'Select'}</option>)}
//                             </select></div>
//                             <div><label className="block text-sm font-medium mb-1">Preferred Grades/Classes</label>
//                             <select name="preferredgrades" value={staffData.preferredgrades || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-white" disabled={isViewMode}>
//                                 {GRADES.map(g => <option key={g} value={g}>{g || 'Select'}</option>)}
//                             </select></div>
//                             <div><label className="block text-sm font-medium mb-1">Joining Date</label>
//                             <input type="date" name="joiningdate" value={staffData.joiningdate || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} /></div>
//                         </div>
//                     </div>

//                     {/* BANK & SALARY DETAILS */}
//                     <div className="rounded-lg p-8 border border-gray-200 mb-6">
//                         <SectionTitle title="Bank & Salary Details" />
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div><label className="block text-sm font-medium mb-1">Bank Name *</label>
//                             <input type="text" name="bankname" value={staffData.bankname || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} /></div>
//                             <div><label className="block text-sm font-medium mb-1">Branch Name *</label>
//                             <input type="text" name="branchname" value={staffData.branchname || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} /></div>
//                             <div><label className="block text-sm font-medium mb-1">Account Number *</label>
//                             <input type="text" name="accno" value={staffData.accno || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} /></div>
//                             <div><label className="block text-sm font-medium mb-1">IFSC Code *</label>
//                             <input type="text" name="ifccode" value={staffData.ifccode || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} /></div>
//                             <div className="md:col-span-2"><label className="block text-sm font-medium mb-1">PAN Number *</label>
//                             <input type="text" name="panno" value={staffData.panno || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} /></div>
//                         </div>
//                     </div>

//                     {/* TRANSPORT DETAILS */}
//                     <div className="rounded-lg p-8 border border-gray-200 mb-6">
//                         <SectionTitle title="Transport Details" />
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div><label className="block text-sm font-medium mb-1">Transport Required? *</label>
//                             <select name="transportstatus" value={staffData.transportstatus || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-white" disabled={isViewMode}>
//                                 <option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option>
//                             </select></div>
//                             {staffData.transportstatus === 'Yes' && (
//                                 <>
//                                     <div><label className="block text-sm font-medium mb-1">Pickup Point</label>
//                                     <input type="text" name="pickuppoint" value={staffData.pickuppoint || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} /></div>
//                                     <div><label className="block text-sm font-medium mb-1">Drop Point</label>
//                                     <input type="text" name="droppoint" value={staffData.droppoint || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} /></div>
//                                     <div><label className="block text-sm font-medium mb-1">Mode of Transport</label>
//                                     <input type="text" name="modetransport" value={staffData.modetransport || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} /></div>
//                                 </>
//                             )}
//                         </div>
//                     </div>

//                 </div>

//                 {/* PHOTO PREVIEW (RIGHT) */}
//                 <div className="w-full xl:w-64">
//                     <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center sticky top-4">
//                         <div className="w-32 h-32 mx-auto bg-white rounded-full shadow-md border-4 border-blue-200 overflow-hidden flex items-center justify-center mb-4">
//                             {photoPreview ? <img src={photoPreview} alt="Profile" className="object-cover w-full h-full" /> : <User className="w-16 h-16 text-gray-400" />}
//                         </div>
//                         {!isViewMode && (
//                             <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//                                 Change Photo
//                                 <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={localLoading} />
//                             </label>
//                         )}
//                         <div className="mt-4 text-xs font-mono text-gray-500 uppercase">Staff ID: {staffData.staffid}</div>
//                     </div>
//                 </div>
//             </div>

//             {!isViewMode && (
//                 <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-8 pt-6 border-t border-gray-200">
//                     <button type="button" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium" onClick={() => window.location.reload()} disabled={localLoading}>Discard</button>
//                     <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50" disabled={localLoading}>
//                         {localLoading ? 'Saving...' : 'Save Profile'}
//                     </button>
//                 </div>
//             )}
//         </form>
//     );
// }




















import React, { useState, useEffect } from 'react';
import { User, X } from 'lucide-react';
import axios from 'axios';

const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dyloa2svi/auto/upload"; 
const CLOUDINARY_PRESET = "sspd-student-management"; 

// Dropdown Options
const DEPARTMENTS = ["", "Teaching", "Non-Teaching", "Administration", "Transport", "Security"];
const POSITIONS = ["", "Principal", "Vice-Principal", "HOD", "Senior Teacher", "Junior Teacher", "Librarian", "IT Staff", "Bus Driver", "Cleaner"];
const GRADES = ["", "Pre-primary", "Primary", "Secondary"];

const uploadToCloudinary = async (file, staffData) => {
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("upload_preset", CLOUDINARY_PRESET);
    uploadFormData.append("folder", `staff_images/profile_photos`);
    uploadFormData.append("public_id", `${staffData.staffid}_${staffData.lastname}`); 

    try {
        const res = await axios.post(CLOUDINARY_UPLOAD_URL, uploadFormData);
        return res.data.secure_url;
    } catch (err) {
        throw new Error("Photo upload failed.");
    }
};

export default function StaffProfile({
    staffData,
    setStaffData,
    handleSubmit,
    handleInputChange,
    isActive,
    toggleActive,
    loading,
    error,
    isViewMode
}) {
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [localLoading, setLocalLoading] = useState(false);

    useEffect(() => {
        if (staffData?.photo && !photoFile) setPhotoPreview(staffData.photo);
    }, [staffData, photoFile]);

    const handleFileChange = (e) => {
        if (isViewMode) return;
        const file = e.target.files[0];
        if (!file) return;
        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLocalLoading(true);
        let photoUrl = staffData.photo;
        if (photoFile) {
            try {
                photoUrl = await uploadToCloudinary(photoFile, staffData);
            } catch (err) { 
                alert(err.message); 
                setLocalLoading(false); 
                return; 
            }
        }
        await handleSubmit(e, photoUrl);
        setLocalLoading(false);
    };

    const SectionTitle = ({ title }) => (
        <div className="-mx-8 bg-blue-500 text-white px-6 py-2 rounded-t mb-6 mt-8 first:mt-0">
            <h4 className="text-lg font-semibold uppercase tracking-wider">{title}</h4>
        </div>
    );

    if (!staffData) return <div className="text-center p-8 text-red-500">Loading component...</div>;

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col xl:flex-row space-y-8 xl:space-y-0 xl:space-x-8">
                <div className="flex-1">
                    
                    {/* 1. STAFF DETAILS */}
                    <div className="rounded-lg p-8 border border-gray-200 mb-6 bg-white shadow-sm">
                        <SectionTitle title="Staff Details" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">First Name *</label>
                                <input type="text" name="firstname" value={staffData.firstname || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" disabled={isViewMode} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Middle Name</label>
                                <input type="text" name="middlename" value={staffData.middlename || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" disabled={isViewMode} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Last Name *</label>
                                <input type="text" name="lastname" value={staffData.lastname || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" disabled={isViewMode} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Date of Birth *</label>
                                <input type="date" name="dob" value={staffData.dob || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" disabled={isViewMode} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Gender *</label>
                                <select name="gender" value={staffData.gender || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-white" disabled={isViewMode} required>
                                    <option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Marital Status *</label>
                                <select name="maritalstatus" value={staffData.maritalstatus || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-white" disabled={isViewMode} required>
                                    <option value="">Select</option><option value="Single">Single</option><option value="Married">Married</option><option value="Divorced">Divorced</option><option value="Widowed">Widowed</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Blood Group *</label>
                                <select name="bloodgroup" value={staffData.bloodgroup || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-white" disabled={isViewMode}>
                                    <option value="">Select</option><option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="O+">O+</option><option value="O-">O-</option><option value="AB+">AB+</option><option value="AB-">AB-</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Nationality</label>
                                <input type="text" name="nationality" value={staffData.nationality || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Category</label>
                                <input type="text" name="category" value={staffData.category || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1 text-gray-700">Aadhar Number *</label>
                                <input type="text" name="aadharno" value={staffData.aadharno || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required />
                            </div>
                        </div>
                    </div>

                    {/* 2. CONTACT DETAILS */}
                    <div className="rounded-lg p-8 border border-gray-200 mb-6 bg-white shadow-sm">
                        <SectionTitle title="Contact Details" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Phone Number (Primary) *</label>
                                <input type="tel" name="phoneno" value={staffData.phoneno || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Alternate Phone Number</label>
                                <input type="tel" name="alternatephoneno" value={staffData.alternatephoneno || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1 text-gray-700">Email Address *</label>
                                <input type="email" name="emailaddress" value={staffData.emailaddress || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required />
                            </div>
                        </div>
                    </div>

                    {/* 3. ADDRESS INFORMATION */}
                    <div className="rounded-lg p-8 border border-gray-200 mb-6 bg-white shadow-sm">
                        <SectionTitle title="Address Information" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1 text-gray-700">Address Line 1 *</label>
                                <input type="text" name="addressline1" value={staffData.addressline1 || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1 text-gray-700">Address Line 2</label>
                                <input type="text" name="addressline2" value={staffData.addressline2 || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Postal Code *</label>
                                <input type="text" name="postalcode" value={staffData.postalcode || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">City *</label>
                                <input type="text" name="city" value={staffData.city || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">District</label>
                                <input type="text" name="district" value={staffData.district || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">State *</label>
                                <input type="text" name="state" value={staffData.state || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required />
                            </div>
                        </div>
                    </div>

                    {/* 4. EDUCATIONAL QUALIFICATION */}
                    <div className="rounded-lg p-8 border border-gray-200 mb-6 bg-white shadow-sm">
                        <SectionTitle title="Educational Qualification" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Highest Qualification *</label>
                                <input type="text" name="highestqualification" value={staffData.highestqualification || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Year of Passing *</label>
                                <input type="text" name="yearofpassing" value={staffData.yearofpassing || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1 text-gray-700">University Name *</label>
                                <input type="text" name="universityname" value={staffData.universityname || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1 text-gray-700">Specialization</label>
                                <input type="text" name="specialization" value={staffData.specialization || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} />
                            </div>
                        </div>
                    </div>

                    {/* 5. PROFESSIONAL EXPERIENCE */}
                    <div className="rounded-lg p-8 border border-gray-200 mb-6 bg-white shadow-sm">
                        <SectionTitle title="Professional Experience" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Total Experience (Years)</label>
                                <input type="text" name="totalexperience" value={staffData.totalexperience || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Designation</label>
                                <select name="designation" value={staffData.designation || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-white" disabled={isViewMode}>
                                    {POSITIONS.map(p => <option key={p} value={p}>{p || 'Select'}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Previous Employer</label>
                                <input type="text" name="previousemployer" value={staffData.previousemployer || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1 text-gray-700">Subjects Taught</label>
                                <input type="text" name="subjectstaught" value={staffData.subjectstaught || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} />
                            </div>
                        </div>
                    </div>

                    {/* 6. ROLE & DEPARTMENT DETAILS */}
                    <div className="rounded-lg p-8 border border-gray-200 mb-6 bg-white shadow-sm">
                        <SectionTitle title="Role & Department Details" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Position Applied For *</label>
                                <select name="position" value={staffData.position || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-white" disabled={isViewMode} required>
                                    {POSITIONS.map(p => <option key={p} value={p}>{p || 'Select'}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Department *</label>
                                <select name="dept" value={staffData.dept || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-white" disabled={isViewMode} required>
                                    {DEPARTMENTS.map(d => <option key={d} value={d}>{d || 'Select'}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Preferred Grades</label>
                                <select name="preferredgrades" value={staffData.preferredgrades || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-white" disabled={isViewMode}>
                                    {GRADES.map(g => <option key={g} value={g}>{g || 'Select'}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Joining Date *</label>
                                <input type="date" name="joiningdate" value={staffData.joiningdate || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required />
                            </div>
                        </div>
                    </div>

                    {/* 7. BANK & SALARY DETAILS */}
                    <div className="rounded-lg p-8 border border-gray-200 mb-6 bg-white shadow-sm">
                        <SectionTitle title="Bank & Salary Details" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Bank Name *</label>
                                <input type="text" name="bankname" value={staffData.bankname || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Branch Name *</label>
                                <input type="text" name="branchname" value={staffData.branchname || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Account Number *</label>
                                <input type="text" name="accno" value={staffData.accno || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">IFSC Code *</label>
                                <input type="text" name="ifccode" value={staffData.ifccode || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1 text-gray-700">PAN Number *</label>
                                <input type="text" name="panno" value={staffData.panno || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} required />
                            </div>
                        </div>
                    </div>

                    {/* 8. TRANSPORT DETAILS */}
                    <div className="rounded-lg p-8 border border-gray-200 mb-6 bg-white shadow-sm">
                        <SectionTitle title="Transport Details" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-700">Transport Required? *</label>
                                <select name="transportstatus" value={staffData.transportstatus || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-white" disabled={isViewMode} required>
                                    <option value="">Select</option><option value="Yes">Yes</option><option value="No">No</option>
                                </select>
                            </div>
                            {staffData.transportstatus === 'Yes' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">Pickup Point</label>
                                        <input type="text" name="pickuppoint" value={staffData.pickuppoint || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">Drop Point</label>
                                        <input type="text" name="droppoint" value={staffData.droppoint || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-700">Mode of Transport</label>
                                        <input type="text" name="modetransport" value={staffData.modetransport || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg" disabled={isViewMode} />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                </div>

                {/* PHOTO PREVIEW (RIGHT) */}
                <div className="w-full xl:w-64">
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center sticky top-8">
                        <div className="w-32 h-32 mx-auto bg-white rounded-full shadow-md border-4 border-blue-200 overflow-hidden flex items-center justify-center mb-4">
                            {photoPreview ? <img src={photoPreview} alt="Profile" className="object-cover w-full h-full" /> : <User className="w-16 h-16 text-gray-400" />}
                        </div>
                        {!isViewMode && (
                            <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block text-sm font-medium">
                                Change Photo
                                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={localLoading} />
                            </label>
                        )}
                        <div className="mt-4 text-[10px] font-mono text-gray-400 uppercase tracking-widest">ID: {staffData.staffid}</div>
                    </div>
                </div>
            </div>

            {/* ACTION BUTTONS */}
            {!isViewMode && (
                <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-8 pt-6 border-t border-gray-200">
                    <button type="button" className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all" onClick={() => window.location.reload()} disabled={localLoading}>Discard Changes</button>
                    <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-lg shadow-blue-200 disabled:opacity-50 transition-all" disabled={localLoading || loading}>
                        {localLoading ? 'Saving...' : 'Save Profile'}
                    </button>
                </div>
            )}
        </form>
    );
}