// import React, { useState } from "react";
// import MainLayout from "../layout/MainLayout";

// interface FormData {
//   photo: File | null;
//   name: string;
//   contactNo: string;
//   licenseNo: string;
//   aadhaarNo: string;
//   address: string;
//   alternateContactNo: string;
//   designation: string;
// }

// interface FormErrors {
//   [key: string]: string;
// }

// const AddSupervisor: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     photo: null,
//     name: "",
//     contactNo: "",
//     licenseNo: "",
//     aadhaarNo: "",
//     address: "",
//     alternateContactNo: "",
//     designation: "",
//   });

//   const [photoPreview, setPhotoPreview] = useState<string | null>(null);
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Reusable validation logic for a single field
//   const validateField = (name: string, value: string): boolean => {
//     let errorMsg = "";
//     switch (name) {
//       case "name":
//         if (!value.trim()) {
//           errorMsg = "Name is required";
//         } else if (value.trim().length < 2) {
//           errorMsg = "Name must be at least 2 characters long";
//         }
//         break;
//       case "contactNo":
//         if (!value.trim()) {
//           errorMsg = "Contact number is required";
//         } else if (!/^\d{10}$/.test(value)) {
//           errorMsg = "Contact number must be exactly 10 digits";
//         }
//         break;
//       case "licenseNo":
//         if (!value.trim()) {
//           errorMsg = "License number is required";
//         } else if (value.trim().length < 5) {
//           errorMsg = "Please enter a valid license number";
//         }
//         break;
//       case "aadhaarNo":
//         if (!value.trim()) {
//           errorMsg = "Aadhaar number is required";
//         } else if (!/^\d{12}$/.test(value)) {
//           errorMsg = "Aadhaar number must be exactly 12 digits";
//         }
//         break;
//       case "address":
//         if (!value.trim()) {
//           errorMsg = "Address is required";
//         } else if (value.trim().length < 10) {
//           errorMsg = "Please provide a complete address";
//         }
//         break;
//       case "designation":
//         if (!value) {
//           errorMsg = "Please select a designation";
//         }
//         break;
//       case "alternateContactNo":
//         if (value && !/^\d{10}$/.test(value)) {
//           errorMsg = "Alternate contact number must be 10 digits";
//         }
//         break;
//       default:
//         break;
//     }
//     setErrors((prev) => ({ ...prev, [name]: errorMsg }));
//     return errorMsg === ""; // Return true if valid, false if there's an error
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     // Validate the field on each change
//     validateField(name, value);
//   };

//   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         setErrors((prev) => ({
//           ...prev,
//           photo: "Photo size should be less than 5MB",
//         }));
//         return;
//       }
//       if (!file.type.startsWith("image/")) {
//         setErrors((prev) => ({
//           ...prev,
//           photo: "Please select a valid image file",
//         }));
//         return;
//       }

//       setFormData((prev) => ({ ...prev, photo: file }));
//       setPhotoPreview(URL.createObjectURL(file));

//       if (errors.photo) {
//         setErrors((prev) => ({ ...prev, photo: "" }));
//       }
//     }
//   };

//   // Validate all required fields before submitting
//   const validateForm = (): boolean => {
//     const fieldsToValidate: (keyof FormData)[] = [
//       "name",
//       "contactNo",
//       "licenseNo",
//       "aadhaarNo",
//       "address",
//       "designation",
//       "alternateContactNo",
//     ];

//     let isValid = true;
//     fieldsToValidate.forEach((field) => {
//       if (!validateField(field, formData[field] as string)) {
//         isValid = false;
//       }
//     });
//     return isValid;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) {
//         alert("Please fill all the required fields correctly.");
//         return;
//     }

//     setIsSubmitting(true);
//     try {
//       // Use FormData to handle file uploads
//       const submitData = new FormData();

//       // Append data with the correct field names for the backend
//       submitData.append("fullName", formData.name);
//       submitData.append("designation", formData.designation);
//       submitData.append("contactNumber", formData.contactNo);
//       submitData.append("licenseNumber", formData.licenseNo);
//       submitData.append("aadhaarNumber", formData.aadhaarNo);
//       submitData.append("completeAddress", formData.address);

//       if (formData.alternateContactNo) {
//         submitData.append("alternateContactNumber", formData.alternateContactNo);
//       }
//       if (formData.photo) {
//         submitData.append("photo", formData.photo);
//       }

//       // Make sure this URL matches your backend route for registering staff
//       const response = await fetch('http://localhost:5000/api/add-vsupervisior', {
//         method: 'POST',
//         headers: {
//           'auth': 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
//         },
//         body: submitData
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to register staff member');
//       }
      
//       alert("Staff member registered successfully!");
//       handleReset();

//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert(`Error: ${(error as Error).message || "An unknown error occurred."}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       photo: null,
//       name: "",
//       contactNo: "",
//       licenseNo: "",
//       aadhaarNo: "",
//       address: "",
//       alternateContactNo: "",
//       designation: "",
//     });
//     setPhotoPreview(null);
//     setErrors({});
//   };

//   return (
//     <MainLayout>
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="p-6">
//             <div className="mb-8 text-center">
//               <div className="inline-block">
//                 <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors">
//                   {photoPreview ? (
//                     <img
//                       src={photoPreview}
//                       alt="Staff Preview"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="text-center text-gray-400">
//                       <div className="text-5xl mb-2">👤</div>
//                       <div className="text-sm font-medium">Upload Photo</div>
//                       <div className="text-xs text-gray-500">Max 5MB</div>
//                     </div>
//                   )}
//                 </div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handlePhotoChange}
//                   className="mt-4 block mx-auto text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer cursor-pointer"
//                 />
//                 {errors.photo && (
//                   <div className="text-red-500 text-sm mt-2">
//                     {errors.photo}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="space-y-6">
//               <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
//                 Personal Information
//               </h3>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.name
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-300 hover:border-gray-400"
//                     }`}
//                     placeholder="Enter full name"
//                   />
//                   {errors.name && (
//                     <div className="text-red-500 text-sm mt-1">
//                       {errors.name}
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Designation *
//                   </label>
//                   <select
//                     name="designation"
//                     value={formData.designation}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.designation
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-300 hover:border-gray-400"
//                     }`}
//                   >
//                     <option value="">Select designation</option>
//                     <option value="Driver">Driver</option>
//                     <option value="Supervisor">Supervisor</option>
//                   </select>
//                   {errors.designation && (
//                     <div className="text-red-500 text-sm mt-1">
//                       {errors.designation}
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Contact Number *
//                   </label>
//                   <input
//                     type="tel"
//                     name="contactNo"
//                     value={formData.contactNo}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.contactNo
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-300 hover:border-gray-400"
//                     }`}
//                     placeholder="Enter 10-digit mobile number"
//                     maxLength={10}
//                   />
//                   {errors.contactNo && (
//                     <div className="text-red-500 text-sm mt-1">
//                       {errors.contactNo}
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Alternate Contact Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="alternateContactNo"
//                     value={formData.alternateContactNo}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.alternateContactNo
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-300 hover:border-gray-400"
//                     }`}
//                     placeholder="Enter alternate contact (optional)"
//                     maxLength={10}
//                   />
//                   {errors.alternateContactNo && (
//                     <div className="text-red-500 text-sm mt-1">
//                       {errors.alternateContactNo}
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     License Number *
//                   </label>
//                   <input
//                     type="text"
//                     name="licenseNo"
//                     value={formData.licenseNo}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.licenseNo
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-300 hover:border-gray-400"
//                     }`}
//                     placeholder="Enter driving license number"
//                   />
//                   {errors.licenseNo && (
//                     <div className="text-red-500 text-sm mt-1">
//                       {errors.licenseNo}
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Aadhaar Number *
//                   </label>
//                   <input
//                     type="text"
//                     name="aadhaarNo"
//                     value={formData.aadhaarNo}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.aadhaarNo
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-300 hover:border-gray-400"
//                     }`}
//                     placeholder="Enter 12-digit Aadhaar number"
//                     maxLength={12}
//                   />
//                   {errors.aadhaarNo && (
//                     <div className="text-red-500 text-sm mt-1">
//                       {errors.aadhaarNo}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Complete Address *
//                 </label>
//                 <textarea
//                   name="address"
//                   value={formData.address}
//                   onChange={handleInputChange}
//                   rows={4}
//                   className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
//                     errors.address
//                       ? "border-red-500 bg-red-50"
//                       : "border-gray-300 hover:border-gray-400"
//                   }`}
//                   placeholder="Enter complete address with city, state, and pincode"
//                 />
//                 {errors.address && (
//                   <div className="text-red-500 text-sm mt-1">
//                     {errors.address}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200 mt-8">
//               <button
//                 type="button"
//                 onClick={handleReset}
//                 className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all font-semibold"
//                 disabled={isSubmitting}
//               >
//                 Reset Form
//               </button>
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={isSubmitting}
//                 className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isSubmitting ? (
//                   <span className="flex items-center">
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Registering...
//                   </span>
//                 ) : (
//                   "Register Staff"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default AddSupervisor;


// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import SelectField from "../components/SelectField";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// interface FormData {
//   photo: File | null;
//   name: string;
//   contactNo: string;
//   licenseNo: string;
//   aadhaarNo: string;
//   address: string;
//   alternateContactNo: string;
//   designation: string;
// }

// interface FormErrors {
//   [key: string]: string;
// }

// const AddSupervisor: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     photo: null,
//     name: "",
//     contactNo: "",
//     licenseNo: "",
//     aadhaarNo: "",
//     address: "",
//     alternateContactNo: "",
//     designation: "",
//   });

//   const [photoPreview, setPhotoPreview] = useState<string | null>(null);
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Reusable validation logic for a single field
//   const validateField = (name: string, value: string): boolean => {
//     let errorMsg = "";
//     switch (name) {
//       case "name":
//         if (!value.trim()) {
//           errorMsg = "Name is required";
//         } else if (value.trim().length < 2) {
//           errorMsg = "Name must be at least 2 characters long";
//         }
//         break;
//       case "contactNo":
//         if (!value.trim()) {
//           errorMsg = "Contact number is required";
//         } else if (!/^\d{10}$/.test(value)) {
//           errorMsg = "Contact number must be exactly 10 digits";
//         }
//         break;
//       case "licenseNo":
//         if (!value.trim()) {
//           errorMsg = "License number is required";
//         } else if (value.trim().length < 5) {
//           errorMsg = "Please enter a valid license number";
//         }
//         break;
//       case "aadhaarNo":
//         if (!value.trim()) {
//           errorMsg = "Aadhaar number is required";
//         } else if (!/^\d{12}$/.test(value)) {
//           errorMsg = "Aadhaar number must be exactly 12 digits";
//         }
//         break;
//       case "address":
//         if (!value.trim()) {
//           errorMsg = "Address is required";
//         } else if (value.trim().length < 10) {
//           errorMsg = "Please provide a complete address";
//         }
//         break;
//       case "designation":
//         if (!value) {
//           errorMsg = "Please select a designation";
//         }
//         break;
//       case "alternateContactNo":
//         if (value && !/^\d{10}$/.test(value)) {
//           errorMsg = "Alternate contact number must be 10 digits";
//         }
//         break;
//       default:
//         break;
//     }
//     setErrors((prev) => ({ ...prev, [name]: errorMsg }));
//     return errorMsg === ""; // Return true if valid, false if there's an error
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     // Validate the field on each change
//     validateField(name, value);
//   };

//   const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         setErrors((prev) => ({
//           ...prev,
//           photo: "Photo size should be less than 5MB",
//         }));
//         return;
//       }
//       if (!file.type.startsWith("image/")) {
//         setErrors((prev) => ({
//           ...prev,
//           photo: "Please select a valid image file",
//         }));
//         return;
//       }

//       setFormData((prev) => ({ ...prev, photo: file }));
//       setPhotoPreview(URL.createObjectURL(file));

//       if (errors.photo) {
//         setErrors((prev) => ({ ...prev, photo: "" }));
//       }
//     }
//   };

//   // Validate all required fields before submitting
//   const validateForm = (): boolean => {
//     const fieldsToValidate: (keyof FormData)[] = [
//       "name",
//       "contactNo",
//       "licenseNo",
//       "aadhaarNo",
//       "address",
//       "designation",
//       "alternateContactNo",
//     ];

//     let isValid = true;
//     fieldsToValidate.forEach((field) => {
//       if (!validateField(field, formData[field] as string)) {
//         isValid = false;
//       }
//     });
//     return isValid;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) {
//         alert("Please fill all the required fields correctly.");
//         return;
//     }

//     setIsSubmitting(true);
//     try {
//       // Use FormData to handle file uploads
//       const submitData = new FormData();

//       // Append data with the correct field names for the backend
//       submitData.append("fullName", formData.name);
//       submitData.append("designation", formData.designation);
//       submitData.append("contactNumber", formData.contactNo);
//       submitData.append("licenseNumber", formData.licenseNo);
//       submitData.append("aadhaarNumber", formData.aadhaarNo);
//       submitData.append("completeAddress", formData.address);

//       if (formData.alternateContactNo) {
//         submitData.append("alternateContactNumber", formData.alternateContactNo);
//       }
//       if (formData.photo) {
//         submitData.append("photo", formData.photo);
//       }

//       // FIX: Using imported API_BASE_URL
//       const response = await fetch(`${API_BASE_URL}api/add-vsupervisior`, {
//         method: 'POST',
//         headers: {
//           'auth': 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
//         },
//         body: submitData
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to register staff member');
//       }
//       
//       alert("Staff member registered successfully!");
//       handleReset();

//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert(`Error: ${(error as Error).message || "An unknown error occurred."}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       photo: null,
//       name: "",
//       contactNo: "",
//       licenseNo: "",
//       aadhaarNo: "",
//       address: "",
//       alternateContactNo: "",
//       designation: "",
//     });
//     setPhotoPreview(null);
//     setErrors({});
//   };

//   return (
//     <MainLayout>
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//           <div className="p-6">
//             <div className="mb-8 text-center">
//               <div className="inline-block">
//                 <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors">
//                   {photoPreview ? (
//                     <img
//                       src={photoPreview}
//                       alt="Staff Preview"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="text-center text-gray-400">
//                       <div className="text-5xl mb-2">👤</div>
//                       <div className="text-sm font-medium">Upload Photo</div>
//                       <div className="text-xs text-gray-500">Max 5MB</div>
//                     </div>
//                   )}
//                 </div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handlePhotoChange}
//                   className="mt-4 block mx-auto text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer cursor-pointer"
//                 />
//                 {errors.photo && (
//                   <div className="text-red-500 text-sm mt-2">
//                     {errors.photo}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="space-y-6">
//               <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
//                 Personal Information
//               </h3>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.name
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-300 hover:border-gray-400"
//                     }`}
//                     placeholder="Enter full name"
//                   />
//                   {errors.name && (
//                     <div className="text-red-500 text-sm mt-1">
//                       {errors.name}
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Designation *
//                   </label>
//                   <select
//                     name="designation"
//                     value={formData.designation}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.designation
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-300 hover:border-gray-400"
//                     }`}
//                   >
//                     <option value="">Select designation</option>
//                     <option value="Driver">Driver</option>
//                     <option value="Supervisor">Supervisor</option>
//                   </select>
//                   {errors.designation && (
//                     <div className="text-red-500 text-sm mt-1">
//                       {errors.designation}
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Contact Number *
//                   </label>
//                   <input
//                     type="tel"
//                     name="contactNo"
//                     value={formData.contactNo}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.contactNo
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-300 hover:border-gray-400"
//                     }`}
//                     placeholder="Enter 10-digit mobile number"
//                     maxLength={10}
//                   />
//                   {errors.contactNo && (
//                     <div className="text-red-500 text-sm mt-1">
//                       {errors.contactNo}
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Alternate Contact Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="alternateContactNo"
//                     value={formData.alternateContactNo}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.alternateContactNo
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-300 hover:border-gray-400"
//                     }`}
//                     placeholder="Enter alternate contact (optional)"
//                     maxLength={10}
//                   />
//                   {errors.alternateContactNo && (
//                     <div className="text-red-500 text-sm mt-1">
//                       {errors.alternateContactNo}
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     License Number *
//                   </label>
//                   <input
//                     type="text"
//                     name="licenseNo"
//                     value={formData.licenseNo}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.licenseNo
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-300 hover:border-gray-400"
//                     }`}
//                     placeholder="Enter driving license number"
//                   />
//                   {errors.licenseNo && (
//                     <div className="text-red-500 text-sm mt-1">
//                       {errors.licenseNo}
//                     </div>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Aadhaar Number *
//                   </label>
//                   <input
//                     type="text"
//                     name="aadhaarNo"
//                     value={formData.aadhaarNo}
//                     onChange={handleInputChange}
//                     className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//                       errors.aadhaarNo
//                         ? "border-red-500 bg-red-50"
//                         : "border-gray-300 hover:border-gray-400"
//                     }`}
//                     placeholder="Enter 12-digit Aadhaar number"
//                     maxLength={12}
//                   />
//                   {errors.aadhaarNo && (
//                     <div className="text-red-500 text-sm mt-1">
//                       {errors.aadhaarNo}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">
//                   Complete Address *
//                 </label>
//                 <textarea
//                   name="address"
//                   value={formData.address}
//                   onChange={handleInputChange}
//                   rows={4}
//                   className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
//                     errors.address
//                       ? "border-red-500 bg-red-50"
//                       : "border-gray-300 hover:border-gray-400"
//                   }`}
//                   placeholder="Enter complete address with city, state, and pincode"
//                 />
//                 {errors.address && (
//                   <div className="text-red-500 text-sm mt-1">
//                     {errors.address}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200 mt-8">
//               <button
//                 type="button"
//                 onClick={handleReset}
//                 className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all font-semibold"
//                 disabled={isSubmitting}
//               >
//                 Reset Form
//               </button>
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={isSubmitting}
//                 className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isSubmitting ? (
//                   <span className="flex items-center">
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Registering...
//                   </span>
//                 ) : (
//                   "Register Staff"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default AddSupervisor;




















import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios"; 
import { API_BASE_URL } from '../config'; 

// TypeScript interfaces (Updated for new fields)
interface FormData {
  photo: File | null;
  // --- Name Split ---
  firstName: string;
  middleName: string;
  lastName: string;
  // --- New Staff Details ---
  dob: string;
  maritalStatus: string;
  bloodGroup: string;
  gender: string;
  nationality: string;
  category: string;
  aadhaarNo: string;
  // --- Contact Details ---
  email: string;
  contactNo: string;
  alternateContactNo: string;
  // --- Bank Details ---
  bankName: string;
  branchName: string;
  accountNumber: string; // Changed from accountName to Number for standard banking field
  ifscCode: string;
  panNumber: string;
  // --- Transport Details (Original) ---
  licenseNo: string;
  designation: "Driver" | "Supervisor" | "";
  // --- Address Fields (Structured) ---
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  city: string;
  district: string;
  state: string;
  country: string;
  // --- Declaration ---
  isDeclared: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const AddSupervisor: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    photo: null, 
    firstName: "", middleName: "", lastName: "",
    dob: "", maritalStatus: "", bloodGroup: "", gender: "", nationality: "", category: "", aadhaarNo: "",
    email: "", contactNo: "", alternateContactNo: "",
    bankName: "", branchName: "", accountNumber: "", ifscCode: "", panNumber: "",
    licenseNo: "", designation: "",
    addressLine1: "", addressLine2: "", postalCode: "", city: "", district: "", state: "", country: "India", 
    isDeclared: false,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPincodeLoading, setIsPincodeLoading] = useState(false);

  // Helper Component for Error Messages
  const ErrorMessage = ({ error }: { error: string | null }) => 
    error ? <div className="text-red-500 text-xs mt-1">{error}</div> : null;

  // --- Address Lookup API ---
  const fetchAddressByPincode = async (pincode: string) => {
    if (!/^\d{6}$/.test(pincode)) {
        setErrors(prev => ({ ...prev, postalCode: "Pincode must be 6 digits." }));
        return;
    }
    
    setIsPincodeLoading(true);
    setErrors(prev => ({ ...prev, postalCode: null }));
    
    try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = response.data;

        if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice.length > 0) {
            const postOffice = data[0].PostOffice[0];
            
            setFormData(prev => ({
                ...prev,
                city: postOffice.Block || postOffice.District,
                district: postOffice.District,
                state: postOffice.State
            }));
            setErrors(prev => ({ ...prev, city: null, district: null, state: null }));
        } else {
            setErrors(prev => ({ ...prev, postalCode: "Invalid Pincode or service unavailable." }));
            setFormData(prev => ({ ...prev, city: "", district: "", state: "" }));
        }

    } catch (error) {
        setErrors(prev => ({ ...prev, postalCode: "Pincode service failed." }));
    } finally {
        setIsPincodeLoading(false);
    }
  };


  // --- Validation Logic ---
  const validateField = (name: keyof FormData, value: string | File | boolean | null): boolean => {
    let errorMsg = "";
    const stringValue = typeof value === 'string' ? value : '';
    
    // Check if the field is empty and required
    const isRequired = ["firstName", "lastName", "dob", "maritalStatus", "bloodGroup", "gender", "nationality", "category", "aadhaarNo", "email", "contactNo", "bankName", "branchName", "accountNumber", "ifscCode", "panNumber", "addressLine1", "postalCode", "city", "state", "country", "designation"].includes(name);
    
    if (name === 'isDeclared' && value === false) {
        errorMsg = "You must agree to the terms and conditions.";
    } else if (isRequired && !stringValue.trim() && name !== 'addressLine2' && name !== 'middleName' && name !== 'alternateContactNo') {
        errorMsg = "Required.";
    } else {
        switch (name) {
            case "contactNo":
            case "alternateContactNo":
                if (stringValue.trim() && !/^\d{10}$/.test(stringValue)) errorMsg = "Must be 10 digits.";
                break;
            case "aadhaarNo":
                if (stringValue.trim() && !/^\d{12}$/.test(stringValue)) errorMsg = "Must be 12 digits.";
                break;
            case "email":
                if (stringValue.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stringValue)) errorMsg = "Invalid email format.";
                break;
            case "licenseNo":
                if (formData.designation === 'Driver' && !stringValue.trim()) errorMsg = "Required for Drivers.";
                break;
            case "postalCode":
                if (stringValue.trim() && !/^\d{6}$/.test(stringValue)) errorMsg = "Must be 6 digits.";
                break;
            case "panNumber":
                if (stringValue.trim() && !/^[A-Z]{5}\d{4}[A-Z]{1}$/i.test(stringValue)) errorMsg = "Invalid PAN format.";
                break;
            case "ifscCode":
                if (stringValue.trim() && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(stringValue)) errorMsg = "Invalid IFSC format.";
                break;
            case "accountNumber":
                if (stringValue.trim() && !/^\d{9,18}$/.test(stringValue)) errorMsg = "Invalid account number.";
                break;
            default:
                break;
        }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    return errorMsg === "";
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    const key = name as keyof FormData;
    
    setErrors(prev => ({ ...prev, [key]: null }));

    if (type === 'checkbox') {
        setFormData(prev => ({ ...prev, [key]: checked }));
        validateField(key, checked);
    } else {
        if (key === 'designation' && value === 'Supervisor') {
            setFormData(prev => ({ ...prev, licenseNo: '', [key]: value }));
        } else {
            setFormData(prev => ({ ...prev, [key]: value }));
        }

        if (key === 'postalCode' && value.length === 6) {
            fetchAddressByPincode(value);
        } else if (key === 'postalCode' && value.length !== 6) {
            setErrors(prev => ({ ...prev, postalCode: null }));
        }

        validateField(key, value);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024 || !file.type.startsWith("image/")) {
            setErrors(prev => ({ ...prev, photo: "Invalid file or size > 5MB." }));
            e.target.value = '';
            return;
        }
        setFormData(prev => ({ ...prev, photo: file }));
        setPhotoPreview(URL.createObjectURL(file));
        setErrors(prev => ({ ...prev, photo: null }));
    } else {
        setFormData(prev => ({ ...prev, photo: null }));
        setPhotoPreview(null);
    }
  };


  const validateForm = (): boolean => {
    let isValid = true;
    
    // Validate all fields manually
    (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
        if (!validateField(key, formData[key])) {
            isValid = false;
        }
    });

    if (!isValid) {
        alert("Please fix the highlighted errors in the form before submitting.");
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) { return; }

    setIsSubmitting(true);
    
    // --- COMBINE ADDRESS ---
    const completeAddress = [
        formData.addressLine1,
        formData.addressLine2,
        `${formData.city}, ${formData.district}, ${formData.state}`,
        `${formData.postalCode}, ${formData.country}`
    ].filter(Boolean).join(', ');
    // --- Full Name ---
    const fullName = `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim().replace(/\s+/g, ' ');

    let apiEndpoint = '';
    let submitData: globalThis.FormData | Object;

    if (formData.designation === 'Supervisor') {
        apiEndpoint = `${API_BASE_URL}api/add-vsupervisior`;
        
        const supervisorData = new globalThis.FormData();
        supervisorData.append("completeAddress", completeAddress);
        supervisorData.append("fullName", fullName); // Using combined name
        supervisorData.append("designation", formData.designation);
        supervisorData.append("contactNumber", formData.contactNo);
        supervisorData.append("licenseNumber", formData.licenseNo || "NA");
        supervisorData.append("aadhaarNumber", formData.aadhaarNo);
        supervisorData.append("email", formData.email);
        supervisorData.append("bankName", formData.bankName);
        supervisorData.append("branchName", formData.branchName);
        supervisorData.append("accountNumber", formData.accountNumber);
        supervisorData.append("ifscCode", formData.ifscCode);
        supervisorData.append("panNumber", formData.panNumber);
        // Append other personal fields as needed by backend:
        supervisorData.append("dob", formData.dob);
        supervisorData.append("maritalStatus", formData.maritalStatus);
        supervisorData.append("bloodGroup", formData.bloodGroup);
        supervisorData.append("gender", formData.gender);
        supervisorData.append("nationality", formData.nationality);
        supervisorData.append("category", formData.category);

        if (formData.alternateContactNo) { supervisorData.append("alternateContactNumber", formData.alternateContactNo); }
        if (formData.photo) { supervisorData.append("photo", formData.photo); }
        submitData = supervisorData;
        
    } else if (formData.designation === 'Driver') {
        // Driver API typically needs only driverName and vid, but often more fields are stored in a dedicated driver schema
        // If your driver model is simple (vid, driverName), the rest of the data is discarded here.
        apiEndpoint = `${API_BASE_URL}api/adddriver`; 
        submitData = {
             vid: 'DUMMY_VID_' + Date.now(), 
             driverName: fullName, // Using combined name
        };
    } else {
        setIsSubmitting(false);
        return; 
    }

    try {
      const isSupervisor = formData.designation === 'Supervisor';
      
      const response = await axios.post(apiEndpoint, submitData, {
          headers: {
            ...(isSupervisor ? {} : {'Content-Type': 'application/json'}),
            // 🚨 Re-check this authorization token's validity and permissions
            'auth': 'ZjVGZPUtYW1hX2anuroid_20236425' 
          }
        }
      );
      
      if (response.status === 200 || response.status === 201) {
        alert(`${formData.designation} registered successfully!`);
        handleReset();
      } else {
        throw new Error(response.data?.message || `Failed to register ${formData.designation}`);
      }

    } catch (error) {
      console.error(`Error submitting ${formData.designation} form:`, error);
      
      const errorMessage = axios.isAxiosError(error) 
        ? (error.response?.data?.message || error.message) 
        : (error as Error).message || "An unknown error occurred.";
        
      alert(`Error registering ${formData.designation}: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      photo: null, firstName: "", middleName: "", lastName: "",
      dob: "", maritalStatus: "", bloodGroup: "", gender: "", nationality: "", category: "", aadhaarNo: "",
      email: "", contactNo: "", alternateContactNo: "",
      bankName: "", branchName: "", accountNumber: "", ifscCode: "", panNumber: "",
      licenseNo: "", designation: "",
      addressLine1: "", addressLine2: "", postalCode: "", city: "", district: "", state: "", country: "India", 
      isDeclared: false,
    });
    setPhotoPreview(null);
    setErrors({});
  };

  const isLicenseDisabled = formData.designation === 'Supervisor';


  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-8">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6 md:p-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Staff Registration</h2>

            {/* Main Content Grid: Form (Left) and Photo (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* -------------------- Left Side: Form Details (3/4 width) -------------------- */}
                <div className="lg:col-span-3 space-y-8">
                    
                    {/* -------------------- 1. Staff Details Box -------------------- */}
                    <div className="border border-gray-300 rounded-lg shadow-sm">
                        <div className="bg-blue-600 p-3 rounded-t-lg">
                            <h3 className="text-xl font-semibold text-white">Staff Details</h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                            
                            {/* Name Split */}
                            {['firstName', 'middleName', 'lastName'].map((field) => (
                                <div key={field}>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">{field.charAt(0).toUpperCase() + field.slice(1).replace('Name', ' Name')} {field !== 'middleName' && <span className="text-red-500">*</span>}</label>
                                    <input type="text" name={field} value={formData[field]} onChange={handleInputChange} 
                                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors[field] ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                                    placeholder={`Enter ${field.replace('Name', '')} name`} />
                                    <ErrorMessage error={errors[field]} />
                                </div>
                            ))}

                            {/* DOB */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth <span className="text-red-500">*</span></label>
                                <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} 
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.dob ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`} />
                                <ErrorMessage error={errors.dob} />
                            </div>

                            {/* Marital Status */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Marital Status <span className="text-red-500">*</span></label>
                                <select name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none ${errors.maritalStatus ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}>
                                    <option value="" disabled>Select Status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widow">Widow</option>
                                </select>
                                <ErrorMessage error={errors.maritalStatus} />
                            </div>
                            
                            {/* Blood Group */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Group <span className="text-red-500">*</span></label>
                                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none ${errors.bloodGroup ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}>
                                    <option value="" disabled>Select Blood Group</option>
                                    <option value="A+">A+</option><option value="A-">A-</option>
                                    <option value="B+">B+</option><option value="B-">B-</option>
                                    <option value="O+">O+</option><option value="O-">O-</option>
                                    <option value="AB+">AB+</option><option value="AB-">AB-</option>
                                </select>
                                <ErrorMessage error={errors.bloodGroup} />
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Gender <span className="text-red-500">*</span></label>
                                <select name="gender" value={formData.gender} onChange={handleInputChange}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none ${errors.gender ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}>
                                    <option value="" disabled>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <ErrorMessage error={errors.gender} />
                            </div>

                            {/* Nationality */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nationality <span className="text-red-500">*</span></label>
                                <select name="nationality" value={formData.nationality} onChange={handleInputChange}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none ${errors.nationality ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}>
                                    <option value="" disabled>Select Nationality</option>
                                    <option value="Indian">Indian</option>
                                    <option value="Other">Other</option>
                                </select>
                                <ErrorMessage error={errors.nationality} />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Category <span className="text-red-500">*</span></label>
                                <select name="category" value={formData.category} onChange={handleInputChange}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none ${errors.category ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}>
                                    <option value="" disabled>Select Category</option>
                                    <option value="General">General</option>
                                    <option value="OBC">OBC</option>
                                    <option value="SC">SC</option>
                                    <option value="ST">ST</option>
                                    <option value="Other">Other</option>
                                </select>
                                <ErrorMessage error={errors.category} />
                            </div>
                            
                            {/* Aadhaar Number (Moved here from Contact Details) */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhaar Number <span className="text-red-500">*</span></label>
                                <input type="text" name="aadhaarNo" value={formData.aadhaarNo} onChange={handleInputChange}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.aadhaarNo ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                                placeholder="Enter 12-digit Aadhaar number" maxLength={12} />
                                <ErrorMessage error={errors.aadhaarNo} />
                            </div>

                            {/* Designation (Moved here from Contact Details) */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Designation <span className="text-red-500">*</span></label>
                                <select name="designation" value={formData.designation} onChange={handleInputChange}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none ${errors.designation ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}>
                                    <option value="" disabled>Select designation</option>
                                    <option value="Driver">Driver</option>
                                    <option value="Supervisor">Supervisor</option>
                                </select>
                                <ErrorMessage error={errors.designation} />
                            </div>

                            {/* License Number (Conditional) */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">License Number {formData.designation === 'Driver' ? <span className="text-red-500">*</span> : ''}</label>
                                <input type="text" name="licenseNo" value={formData.licenseNo} onChange={handleInputChange}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.licenseNo ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"} ${isLicenseDisabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                placeholder={isLicenseDisabled ? 'N/A for Supervisors' : 'Enter driving license number'} disabled={isLicenseDisabled} />
                                <ErrorMessage error={errors.licenseNo} />
                            </div>
                        </div>
                    </div>

                    {/* -------------------- 2. Contact Details Box -------------------- */}
                    <div className="border border-gray-300 rounded-lg shadow-sm">
                        <div className="bg-blue-600 p-3 rounded-t-lg">
                            <h3 className="text-xl font-semibold text-white">Contact Details</h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                            
                            {/* Email Address */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                                placeholder="name@example.com" />
                                <ErrorMessage error={errors.email} />
                            </div>
                            
                            {/* Contact Number (Primary) */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number (Primary) <span className="text-red-500">*</span></label>
                                <input type="tel" name="contactNo" value={formData.contactNo} onChange={handleInputChange}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.contactNo ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                                placeholder="Enter 10-digit mobile number" maxLength={10} />
                                <ErrorMessage error={errors.contactNo} />
                            </div>

                            {/* Alternate Contact Number */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Alternate Contact Number</label>
                                <input type="tel" name="alternateContactNo" value={formData.alternateContactNo} onChange={handleInputChange}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.alternateContactNo ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                                placeholder="Enter alternate contact (optional)" maxLength={10} />
                                <ErrorMessage error={errors.alternateContactNo} />
                            </div>
                        </div>
                    </div>

                    {/* -------------------- 3. Address Details Box -------------------- */}
                    <div className="border border-gray-300 rounded-lg shadow-sm">
                        <div className="bg-blue-600 p-3 rounded-t-lg">
                            <h3 className="text-xl font-semibold text-white">Address Details</h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                            {/* Address Line 1 */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Address Line 1 <span className="text-red-500">*</span></label>
                                <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleInputChange}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.addressLine1 ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                                placeholder="House No, Building, Street" />
                                <ErrorMessage error={errors.addressLine1} />
                            </div>
                            
                            {/* Address Line 2 */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Address Line 2</label>
                                <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleInputChange}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300 hover:border-gray-400`}
                                placeholder="Area, Landmark (Optional)" />
                            </div>

                            {/* Postal Code (with Lookup) */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Postal Code <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.postalCode ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                                    placeholder="Enter 6-digit Pincode" maxLength={6} disabled={isPincodeLoading} />
                                    {isPincodeLoading && (
                                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600"><i className="fas fa-spinner fa-spin"></i></span>
                                    )}
                                </div>
                                <ErrorMessage error={errors.postalCode} />
                            </div>

                            {/* City (Auto-populated) */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">City <span className="text-red-500">*</span></label>
                                <input type="text" name="city" value={formData.city} onChange={handleInputChange}
                                className={`w-full px-4 py-3 border-2 rounded-lg ${errors.city ? "border-red-500 bg-red-50" : "border-gray-300"} bg-gray-100 text-gray-700`}
                                placeholder="Auto-populated" disabled={true} />
                                <ErrorMessage error={errors.city} />
                            </div>
                            
                            {/* State (Auto-populated) */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">State <span className="text-red-500">*</span></label>
                                <input type="text" name="state" value={formData.state} onChange={handleInputChange}
                                className={`w-full px-4 py-3 border-2 rounded-lg ${errors.state ? "border-red-500 bg-red-50" : "border-gray-300"} bg-gray-100 text-gray-700`}
                                placeholder="Auto-populated" disabled={true} />
                                <ErrorMessage error={errors.state} />
                            </div>
                            
                            {/* Country */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Country <span className="text-red-500">*</span></label>
                                <input type="text" name="country" value={formData.country} onChange={handleInputChange}
                                className={`w-full px-4 py-3 border-2 rounded-lg border-gray-300 bg-gray-100 text-gray-700`}
                                placeholder="India" disabled={true} />
                            </div>
                            
                        </div>
                    </div>

                    {/* -------------------- 4. Bank Salary Details Box -------------------- */}
                    <div className="border border-gray-300 rounded-lg shadow-sm">
                        <div className="bg-blue-600 p-3 rounded-t-lg">
                            <h3 className="text-xl font-semibold text-white">Bank & Salary Details</h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                            
                            {/* Bank Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Bank Name <span className="text-red-500">*</span></label>
                                <input type="text" name="bankName" value={formData.bankName} onChange={handleInputChange}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.bankName ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                                placeholder="e.g. State Bank of India" />
                                <ErrorMessage error={errors.bankName} />
                            </div>
                            
                            {/* Branch Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Branch Name <span className="text-red-500">*</span></label>
                                <input type="text" name="branchName" value={formData.branchName} onChange={handleInputChange}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.branchName ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                                placeholder="e.g. Vapi Branch" />
                                <ErrorMessage error={errors.branchName} />
                            </div>

                            {/* Account Number */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Account Number <span className="text-red-500">*</span></label>
                                <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.accountNumber ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                                placeholder="Enter A/C Number" />
                                <ErrorMessage error={errors.accountNumber} />
                            </div>

                            {/* IFSC Code */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">IFSC Code <span className="text-red-500">*</span></label>
                                <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleInputChange}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.ifscCode ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                                placeholder="e.g. SBIN0001234" maxLength={11} />
                                <ErrorMessage error={errors.ifscCode} />
                            </div>
                            
                            {/* PAN Number */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">PAN Number <span className="text-red-500">*</span></label>
                                <input type="text" name="panNumber" value={formData.panNumber} onChange={handleInputChange}
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.panNumber ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                                placeholder="e.g. ABCDE1234F" maxLength={10} />
                                <ErrorMessage error={errors.panNumber} />
                            </div>
                        </div>
                    </div>

                    {/* -------------------- 5. Declaration Section -------------------- */}
                    <div className="border border-gray-300 rounded-lg shadow-sm p-6">
                        <label className="flex items-start cursor-pointer">
                            <input
                                type="checkbox"
                                name="isDeclared"
                                checked={formData.isDeclared}
                                onChange={handleInputChange}
                                className="mt-1 mr-3 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <p className="text-sm text-gray-700 leading-relaxed">
                                **I hereby declare that the information provided above is accurate and true to the best of my knowledge. I agree to abide by the school's policies and code of conduct.**
                                <br />
                                I agree to the terms and conditions
                            </p>
                        </label>
                        <ErrorMessage error={errors.isDeclared} />
                    </div>
                </div>

                {/* -------------------- Right Side: Photo Upload (1/4 width) -------------------- */}
                <div className="lg:col-span-1 space-y-4 pt-10 lg:pt-0">
                    <div className="sticky top-6">
                        
                        <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
                            <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                                {photoPreview ? (
                                    <img src={photoPreview} alt="Staff Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center text-gray-500">
                                        <div className="text-lg">Photo Preview</div>
                                    </div>
                                )}
                            </div>
                            
                            <label className="w-full block">
                                <input type="file" accept="image/*" onChange={handlePhotoChange} className="sr-only" />
                                <div className="py-2 px-6 bg-blue-600 text-white hover:bg-blue-700 transition-colors font-semibold cursor-pointer text-center">
                                    Choose Photo
                                </div>
                            </label>
                        </div>
                        
                        <div className="mt-4 border border-gray-300 rounded-lg p-3 shadow-md">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-red-500">Resigned</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={true} disabled className="sr-only peer" /> 
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                                </label>
                                <span className="text-green-500 font-bold">Active</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            {/* Action Buttons (Full width below the main grid) */}
            <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200 mt-8">
              <button
                type="button" onClick={handleReset} disabled={isSubmitting}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 transition-all font-semibold"
              >
                Reset Form
              </button>
              <button
                type="button" onClick={handleSubmit} disabled={isSubmitting || !formData.designation || !formData.isDeclared}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <i className="fas fa-spinner fa-spin mr-3 h-5 w-5"></i>
                    Registering...
                  </span>
                ) : (
                  `Register ${formData.designation || 'Staff'}`
                )}
              </button>
            </div>
          </div>
        </div>
    </MainLayout>
  );
};

export default AddSupervisor;