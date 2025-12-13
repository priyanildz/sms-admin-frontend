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















import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import SelectField from "../components/SelectField";
import axios from "axios"; // 🚨 Added axios for reliable FormData submission
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

interface FormData {
  photo: File | null;
  name: string;
  contactNo: string;
  licenseNo: string;
  aadhaarNo: string;
  address: string;
  alternateContactNo: string;
  designation: string;
}

interface FormErrors {
  [key: string]: string;
}

const AddSupervisor: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    photo: null,
    name: "",
    contactNo: "",
    licenseNo: "",
    aadhaarNo: "",
    address: "",
    alternateContactNo: "",
    designation: "",
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reusable validation logic for a single field
  const validateField = (name: string, value: string): boolean => {
    let errorMsg = "";
    switch (name) {
      case "name":
        if (!value.trim()) {
          errorMsg = "Name is required";
        } else if (value.trim().length < 2) {
          errorMsg = "Name must be at least 2 characters long";
        }
        break;
      case "contactNo":
        if (!value.trim()) {
          errorMsg = "Contact number is required";
        } else if (!/^\d{10}$/.test(value)) {
          errorMsg = "Contact number must be exactly 10 digits";
        }
        break;
      case "licenseNo":
        if (formData.designation === 'Driver' && !value.trim()) {
          errorMsg = "License number is required for Drivers";
        } else if (value.trim() && value.trim().length < 5) {
          errorMsg = "Please enter a valid license number";
        }
        break;
      case "aadhaarNo":
        if (!value.trim()) {
          errorMsg = "Aadhaar number is required";
        } else if (!/^\d{12}$/.test(value)) {
          errorMsg = "Aadhaar number must be exactly 12 digits";
        }
        break;
      case "address":
        if (!value.trim()) {
          errorMsg = "Address is required";
        } else if (value.trim().length < 10) {
          errorMsg = "Please provide a complete address";
        }
        break;
      case "designation":
        if (!value) {
          errorMsg = "Please select a designation";
        }
        break;
      case "alternateContactNo":
        if (value && !/^\d{10}$/.test(value)) {
          errorMsg = "Alternate contact number must be 10 digits";
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    return errorMsg === ""; // Return true if valid, false if there's an error
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Validate the field on each change
    validateField(name, value);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          photo: "Photo size should be less than 5MB",
        }));
        return;
      }
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          photo: "Please select a valid image file",
        }));
        return;
      }

      setFormData((prev) => ({ ...prev, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));

      if (errors.photo) {
        setErrors((prev) => ({ ...prev, photo: "" }));
      }
    }
  };

  // Validate all required fields before submitting
  const validateForm = (): boolean => {
    const fieldsToValidate: (keyof FormData)[] = [
      "name",
      "contactNo",
      "aadhaarNo",
      "address",
      "designation",
    ];
    // Only conditionally validate licenseNo if designation is 'Driver'
    if (formData.designation === 'Driver') {
        fieldsToValidate.push("licenseNo");
    }

    let isValid = true;
    fieldsToValidate.forEach((field) => {
      // Use the string assertion for fields that are definitely strings here
      if (!validateField(field, formData[field] as string)) {
        isValid = false;
      }
    });
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
        alert("Please fill all the required fields correctly.");
        return;
    }

    setIsSubmitting(true);
    try {
      // Use FormData to handle file uploads
      const submitData = new FormData();

      // Append data with the correct field names for the backend
      submitData.append("fullName", formData.name);
      submitData.append("designation", formData.designation);
      submitData.append("contactNumber", formData.contactNo);
      submitData.append("licenseNumber", formData.licenseNo);
      submitData.append("aadhaarNumber", formData.aadhaarNo);
      submitData.append("completeAddress", formData.address);

      if (formData.alternateContactNo) {
        submitData.append("alternateContactNumber", formData.alternateContactNo);
      }
      if (formData.photo) {
        // The 'photo' field must match the expected file field name on the server
        submitData.append("photo", formData.photo);
      }

      // FIX: Use AXIOS for reliable FormData submission, omitting Content-Type
      const response = await axios.post(
        `${API_BASE_URL}api/add-vsupervisior`, 
        submitData, // FormData payload
        {
          headers: {
            // OMIT Content-Type to allow browser to correctly format multipart/form-data
            'auth': 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
          }
        }
      );
      
      if (response.status === 200 || response.status === 201) {
        alert("Staff member registered successfully!");
        handleReset();
      } else {
        throw new Error(response.data?.message || 'Failed to register staff member');
      }

    } catch (error) {
      console.error("Error submitting form:", error);
      
      const errorMessage = axios.isAxiosError(error) 
        ? (error.response?.data?.message || error.message) 
        : (error as Error).message || "An unknown error occurred.";
        
      alert(`Error registering staff: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      photo: null,
      name: "",
      contactNo: "",
      licenseNo: "",
      aadhaarNo: "",
      address: "",
      alternateContactNo: "",
      designation: "",
    });
    setPhotoPreview(null);
    setErrors({});
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <div className="mb-8 text-center">
              <div className="inline-block">
                <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Staff Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-gray-400">
                      <div className="text-5xl mb-2">👤</div>
                      <div className="text-sm font-medium">Upload Photo</div>
                      <div className="text-xs text-gray-500">Max 5MB</div>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="mt-4 block mx-auto text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer cursor-pointer"
                />
                {errors.photo && (
                  <div className="text-red-500 text-sm mt-2">
                    {errors.photo}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.name
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder="Enter full name"
                  />
                  {errors.name && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Designation *
                  </label>
                  <select
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.designation
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <option value="">Select designation</option>
                    <option value="Driver">Driver</option>
                    <option value="Supervisor">Supervisor</option>
                  </select>
                  {errors.designation && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.designation}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.contactNo
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                  />
                  {errors.contactNo && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.contactNo}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Alternate Contact Number
                  </label>
                  <input
                    type="tel"
                    name="alternateContactNo"
                    value={formData.alternateContactNo}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.alternateContactNo
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder="Enter alternate contact (optional)"
                    maxLength={10}
                  />
                  {errors.alternateContactNo && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.alternateContactNo}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    License Number {formData.designation === 'Driver' ? '*' : ''}
                  </label>
                  <input
                    type="text"
                    name="licenseNo"
                    value={formData.licenseNo}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.licenseNo
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder="Enter driving license number"
                    disabled={formData.designation === 'Supervisor'}
                  />
                  {errors.licenseNo && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.licenseNo}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Aadhaar Number *
                  </label>
                  <input
                    type="text"
                    name="aadhaarNo"
                    value={formData.aadhaarNo}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors.aadhaarNo
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    placeholder="Enter 12-digit Aadhaar number"
                    maxLength={12}
                  />
                  {errors.aadhaarNo && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.aadhaarNo}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Complete Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${
                    errors.address
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  placeholder="Enter complete address with city, state, and pincode"
                />
                {errors.address && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.address}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200 mt-8">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all font-semibold"
                disabled={isSubmitting}
              >
                Reset Form
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Registering...
                  </span>
                ) : (
                  "Register Staff"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AddSupervisor;