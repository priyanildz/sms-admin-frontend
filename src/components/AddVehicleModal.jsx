// import React from "react";

// const AddVehicleModal = ({ show, onClose, onSave, formData, setFormData }) => {
//   if (!show) return null;

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50"
    
//             style={{ 
//                 // Using RGBA to create the dimming effect without blurring the backdrop
//                 backgroundColor: 'rgba(50, 50, 50, 0.5)', 
//             }}>
//       <div className="bg-white rounded-md shadow-md w-full max-w-2xl p-6 space-y-4">
//         <h2 className="text-xl font-semibold mb-4">Add Vehicle</h2>

//         <div className="grid grid-cols-2 gap-4">
//           <div className="flex flex-col">
//             <label className="mb-1 text-sm font-medium text-gray-700">
//               Vehicle Type *
//             </label>
//             <select
//               className="border p-2 rounded-lg"
//               value={formData.vehiclename}
//               onChange={handleChange}
//               name="vehiclename"
//             >
//               <option value="bus">Bus</option>
//               <option value="van">Van</option>
//               <option value="auto">Auto</option>
//             </select>
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-1 text-sm font-medium text-gray-700">
//               Capacity *
//             </label>
//             <input
//               name="capacity"
//               type="text"
//               placeholder="e.g 7"
//               className="border px-3 py-2 rounded-md"
//               value={formData.capacity}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-1 text-sm font-medium text-gray-700">
//               Registration Contact Number *
//             </label>
//             <input
//               name="regno"
//               type="text"
//               placeholder="e.g 9320x xxxxx"
//               className="border px-3 py-2 rounded-md"
//               value={formData.regno}
//               onChange={handleChange}
//             />
//           </div>

//           {/* <div className="flex flex-col">
//             <label className="mb-1 text-sm font-medium text-gray-700">Assign Route</label>
//             <input
//               name="assignedroute"
//               type="text"
//               className="border px-3 py-2 rounded-md"
//               value={formData.assignedroute}
//               onChange={handleChange}
//             />
//           </div> */}

//           <div className="flex flex-col">
//             <label className="mb-1 text-sm font-medium text-gray-700">
//               Vehicle No *
//             </label>
//             <input
//               name="vehicleno"
//               type="text"
//               placeholder="e.g MH12AB1234"
//               className="border px-3 py-2 rounded-md"
//               value={formData.vehicleno}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="mb-1 text-sm font-medium text-gray-700">
//               Status *
//             </label>
//             <select
//               className="border p-2 rounded-lg"
//               value={formData.status}
//               onChange={handleChange}
//               name="status"
//             >
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>
//         </div>

//         <div className="flex justify-end gap-3 mt-6">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onSave}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddVehicleModal;
























// import React, { useState } from "react";
// import axios from "axios";

// // 🚨 Define your Cloudinary configuration here
// const CLOUDINARY_CLOUD_NAME = "dfc8sai1i";
// const CLOUDINARY_UPLOAD_PRESET = "sspd-transport-management"; // <--- 🚨 CHANGE THIS
// const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`;


// const AddVehicleModal = ({ show, onClose, onSave, formData, setFormData }) => {
//   if (!show) return null;

//   // STATE FOR FILE UPLOADS
//   const [files, setFiles] = useState({
//     vehicleDocument: null,
//     puc: null,
//     insurance: null,
//     registrationCertificate: null,
//   });
//   
//   const [isSaving, setIsSaving] = useState(false);


//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };
//   
//   // HANDLER FOR FILE INPUTS - Enforces PDF only
//   const handleFileChange = (e) => {
//     const { name, files: selectedFiles } = e.target;
//     const file = selectedFiles[0];
//     
//     if (file) {
//       if (file.type !== 'application/pdf') {
//         alert("Only PDF files are allowed for documents.");
//         e.target.value = null; // Clear the input
//         setFiles((prev) => ({ ...prev, [name]: null }));
//         return;
//       }
//       setFiles((prev) => ({ ...prev, [name]: file }));
//     } else {
//       setFiles((prev) => ({ ...prev, [name]: null }));
//     }
//   };


//   // CLOUDINARY UPLOAD HELPER
//   const uploadToCloudinary = async (file, customName) => {
//     if (!file) throw new Error(`Missing file for upload: ${customName}`);

//     const uploadFormData = new FormData();
//     uploadFormData.append("file", file);
//     uploadFormData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
//     uploadFormData.append("folder", `transport_documents`);
//     uploadFormData.append("public_id", customName);

//     try {
//       const res = await axios.post(
//         CLOUDINARY_UPLOAD_URL,
//         uploadFormData
//       );
//       return res.data.secure_url;
//     } catch (err) {
//       console.error("Cloudinary upload error:", err.response || err);
//       throw new Error(`Upload failed for ${customName}.`);
//     }
//   };


//   // HANDLE SAVE LOGIC
//   const handleSaveClick = async () => {
//     setIsSaving(true);

//     // 1. Basic validation (checking if all required fields/files are filled)
//     const requiredFields = ["type", "vehiclename", "capacity", "regno", "vehicleno", "status"];
//     const requiredFiles = ["vehicleDocument", "puc", "insurance", "registrationCertificate"];

//     const isFormValid = requiredFields.every(field => formData[field] && String(formData[field]).trim() !== "");
//     const isFilesValid = requiredFiles.every(file => files[file] !== null);

//     if (!isFormValid || !isFilesValid) {
//       alert("Please fill in all required fields and upload all four PDF documents.");
//       setIsSaving(false);
//       return;
//     }
//     
//     try {
//       // 2. Upload documents concurrently
//       const uniqueId = Date.now().toString();
//       const vehicleNo = formData.vehicleno.replace(/[^a-zA-Z0-9]/g, '');

//       const [
//         vehicleDocumentUrl,
//         pucUrl,
//         insuranceUrl,
//         registrationCertificateUrl
//       ] = await Promise.all([
//         uploadToCloudinary(files.vehicleDocument, `${vehicleNo}_Documents_${uniqueId}`),
//         uploadToCloudinary(files.puc, `${vehicleNo}_PUC_${uniqueId}`),
//         uploadToCloudinary(files.insurance, `${vehicleNo}_Insurance_${uniqueId}`),
//         uploadToCloudinary(files.registrationCertificate, `${vehicleNo}_RC_${uniqueId}`)
//       ]);

//       // 3. Prepare final data payload with Cloudinary URLs
//       const finalFormData = {
//         ...formData,
//         vehicleDocumentUrl,
//         pucUrl,
//         insuranceUrl,
//         registrationCertificateUrl
//       };

//       // 4. Call the parent component's onSave function with the final data
//       await onSave(finalFormData);

//     } catch (error) {
//       console.error("Save failed:", error);
//       alert(error.message || "Failed to save vehicle due to an upload error. Check the console for Cloudinary details.");
//     } finally {
//       setIsSaving(false);
//     }
//   };


//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50"
//       style={{ backgroundColor: 'rgba(50, 50, 50, 0.5)' }}>
//       <div className="bg-white rounded-md shadow-md w-full max-w-4xl p-6 space-y-4">
//         <h2 className="text-xl font-semibold mb-4">Add Vehicle</h2>

//         {/* ------------------ Vehicle Details Grid ------------------ */}
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//           
//           {/* Vehicle Type (Mapping to 'type' in state) */}
//           <div className="flex flex-col">
//             <label className="mb-1 text-sm font-medium text-gray-700">Vehicle Type *</label>
//             <select
//               className="border p-2 rounded-lg"
//               value={formData.type}
//               onChange={handleChange}
//               name="type"
//               required
//             >
//               <option value="">Select Type</option>
//               <option value="bus">Bus</option>
//               <option value="van">Van</option>
//               <option value="auto">Auto</option>
//             </select>
//           </div>
//           
//           {/* Vehicle Name */}
//           <div className="flex flex-col">
//             <label className="mb-1 text-sm font-medium text-gray-700">Vehicle Name *</label>
//             <input
//               name="vehiclename"
//               type="text"
//               placeholder="e.g School Bus 1"
//               className="border px-3 py-2 rounded-md"
//               value={formData.vehiclename}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Capacity */}
//           <div className="flex flex-col">
//             <label className="mb-1 text-sm font-medium text-gray-700">Capacity *</label>
//             <input
//               name="capacity"
//               type="text"
//               placeholder="e.g 40"
//               className="border px-3 py-2 rounded-md"
//               value={formData.capacity}
//               onChange={handleChange}
//               required
//             />
//             </div>

//           {/* Registration Contact Number */}
//           <div className="flex flex-col">
//             <label className="mb-1 text-sm font-medium text-gray-700">Registration Contact Number *</label>
//             <input
//               name="regno"
//               type="text"
//               placeholder="e.g 9320x xxxxx"
//               className="border px-3 py-2 rounded-md"
//               value={formData.regno}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Vehicle No */}
//           <div className="flex flex-col">
//             <label className="mb-1 text-sm font-medium text-gray-700">Vehicle No *</label>
//             <input
//               name="vehicleno"
//               type="text"
//               placeholder="e.g MH12AB1234"
//               className="border px-3 py-2 rounded-md"
//               value={formData.vehicleno}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Status */}
//           <div className="flex flex-col">
//             <label className="mb-1 text-sm font-medium text-gray-700">Status *</label>
//             <select
//               className="border p-2 rounded-lg"
//               value={formData.status}
//               onChange={handleChange}
//               name="status"
//               required
//             >
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>
//         </div>

//         {/* ------------------ Document Upload Section ------------------ */}
//         <div className="mt-6 border-t pt-4">
//           <h3 className="text-lg font-semibold mb-3">Upload Vehicle Documents (PDF Only) *</h3>
//           <div className="grid grid-cols-2 gap-4">
//             
//             {/* 1. Vehicle Documents */}
//             <div className="flex flex-col">
//               <label className="mb-1 text-sm font-medium text-gray-700">Vehicle Documents (PDF) *</label>
//               <input
//                 name="vehicleDocument"
//                 type="file"
//                 accept=".pdf"
//                 className="border p-2 rounded-md"
//                 onChange={handleFileChange}
//                 required
//               />
//               {files.vehicleDocument && (<p className="text-xs text-green-600 mt-1 truncate">Selected: {files.vehicleDocument.name}</p>)}
//             </div>

//             {/* 2. PUC */}
//             <div className="flex flex-col">
//               <label className="mb-1 text-sm font-medium text-gray-700">PUC (PDF) *</label>
//               <input
//                 name="puc"
//                 type="file"
//                 accept=".pdf"
//                 className="border p-2 rounded-md"
//                 onChange={handleFileChange}
//                 required
//               />
//               {files.puc && (<p className="text-xs text-green-600 mt-1 truncate">Selected: {files.puc.name}</p>)}
//             </div>

//             {/* 3. Insurance */}
//             <div className="flex flex-col">
//               <label className="mb-1 text-sm font-medium text-gray-700">Insurance (PDF) *</label>
//               <input
//                 name="insurance"
//                 type="file"
//                 accept=".pdf"
//                 className="border p-2 rounded-md"
//                 onChange={handleFileChange}
//                 required
//               />
//               {files.insurance && (<p className="text-xs text-green-600 mt-1 truncate">Selected: {files.insurance.name}</p>)}
//             </div>

//             {/* 4. Registration Certificate (RC) */}
//             <div className="flex flex-col">
//               <label className="mb-1 text-sm font-medium text-gray-700">Registration Certificate (RC) (PDF) *</label>
//               <input
//                 name="registrationCertificate"
//                 type="file"
//                 accept=".pdf"
//                 className="border p-2 rounded-md"
//                 onChange={handleFileChange}
//                 required
//               />
//               {files.registrationCertificate && (<p className="text-xs text-green-600 mt-1 truncate">Selected: {files.registrationCertificate.name}</p>)}
//             </div>
//           </div>
//         </div>

//         {/* ------------------ Buttons ------------------ */}
//         <div className="flex justify-end gap-3 mt-6">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//             disabled={isSaving}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSaveClick}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
//             disabled={isSaving}
//           >
//             {isSaving ? 'Uploading & Saving...' : 'Save'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddVehicleModal;















import React, { useState } from "react";
import axios from "axios";

const AddVehicleModal = ({ show, onClose, onSave, formData, setFormData }) => {
  if (!show) return null;

  const [isSaving, setIsSaving] = useState(false);
  // 🌟 NEW STATE for Validation Errors
  const [errors, setErrors] = useState({});

  // Helper function to convert the string status ('active'/'inactive') to a boolean for the toggle
  const getIsActive = (status) => status?.toLowerCase() === 'active';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Clear the error for the field being edited
    setErrors(prev => ({ ...prev, [name]: null }));

    // Handle the Status Toggle (Checkbox)
    if (name === 'status' && type === 'checkbox') {
      const newStatus = checked ? 'active' : 'inactive';
      setFormData((prev) => ({
        ...prev,
        [name]: newStatus,
      }));
    } else {
      // Handle all other text/select inputs
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // 🌟 NEW: Comprehensive Validation Function
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // 1. Basic Required Field Check
    const requiredFields = ["type", "vehiclename", "capacity", "regno", "vehicleno"];
    requiredFields.forEach(field => {
      if (!formData[field] || String(formData[field]).trim() === "") {
        newErrors[field] = "This field is required.";
        isValid = false;
      }
    });

    // 2. Capacity Validation (Must be a positive number/integer)
    const capacityValue = formData.capacity;
    if (capacityValue && !/^\d+$/.test(capacityValue) || (capacityValue && parseInt(capacityValue) <= 0)) {
      newErrors.capacity = "Capacity must be a positive whole number.";
      isValid = false;
    }

    // 3. Registration Contact Number Validation (Assuming 10 digits for a contact number)
    const regnoValue = formData.regno;
    if (regnoValue && !/^\d{10}$/.test(regnoValue)) {
      newErrors.regno = "Contact Number must be exactly 10 digits.";
      isValid = false;
    }
    
    // 4. Vehicle Number Validation (Basic Alphanumeric/Dash Pattern Check, customizable)
    const vehiclenoValue = formData.vehicleno;
    // Example Pattern: MH12AB1234 or TN01A1234
    if (vehiclenoValue && !/^[A-Z]{2}\d{1,2}[A-Z]{1,2}\d{4}$/i.test(vehiclenoValue)) {
       newErrors.vehicleno = "Invalid format (e.g., MH12AB1234).";
       isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  // HANDLE SAVE LOGIC
  const handleSaveClick = async () => {
    // 🌟 Check validation before proceeding
    if (!validateForm()) {
      // Form is not valid, stop execution. Errors are set in state.
      return;
    }
    
    setIsSaving(true);
    
    try {
      const finalFormData = formData; 
      await onSave(finalFormData);
      setErrors({}); // Clear errors on successful save

    } catch (error) {
      console.error("Save failed:", error);
      alert(error.message || "Failed to save vehicle.");
    } finally {
      setIsSaving(false);
    }
  };


  return (
    // Backdrop overlay
    <div className="fixed inset-0 flex items-center justify-center z-50"
    style={{ 
                // Using RGBA to create the dimming effect without blurring the backdrop
                backgroundColor: 'rgba(50, 50, 50, 0.5)', 
            }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl transform transition-all p-0">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-blue-50 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-extrabold text-blue-800">
            <i className="fas fa-bus mr-2"></i> Add New Vehicle
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 transition"
            disabled={isSaving}
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* Modal Body (Form Content) */}
        <div className="p-6 space-y-6">
          
          {/* ------------------ STATUS TOGGLE BUTTON (TOP RIGHT) ------------------ */}
          <div className="flex justify-end mb-4">
            <div className="flex items-center">
              <label htmlFor="status-toggle" className="text-sm font-semibold text-gray-700 mr-4">
                Vehicle Status: 
              </label>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-bold transition-colors ${!getIsActive(formData.status) ? 'text-red-600' : 'text-gray-400'}`}>INACTIVE</span>
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="status"
                    id="status-toggle" 
                    checked={getIsActive(formData.status)}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  {/* Custom Toggle Switch */}
                  <div className='w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500'></div>
                </label>
                
                <span className={`text-sm font-bold transition-colors ${getIsActive(formData.status) ? 'text-green-600' : 'text-gray-400'}`}>ACTIVE</span>
              </div>
            </div>
          </div>
          
          {/* ------------------ Vehicle Details Grid ------------------ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            
            {/* 1. Vehicle Type */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold text-gray-700">Vehicle Type <span className="text-red-500">*</span></label>
              <select
                className={`border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 appearance-none ${errors.type ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.type}
                onChange={handleChange}
                name="type"
                required
              >
                <option value="" disabled>Select Type</option>
                <option value="bus">Bus</option>
                <option value="van">Van</option>
                <option value="auto">Auto</option>
              </select>
              {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
            </div>
            
            {/* 2. Vehicle Name */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold text-gray-700">Vehicle Name <span className="text-red-500">*</span></label>
              <input
                name="vehiclename"
                type="text"
                placeholder="e.g School Bus 1"
                className={`border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${errors.vehiclename ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.vehiclename}
                onChange={handleChange}
                required
              />
              {errors.vehiclename && <p className="text-red-500 text-xs mt-1">{errors.vehiclename}</p>}
            </div>

            {/* 3. Capacity */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold text-gray-700">Capacity <span className="text-red-500">*</span></label>
              <input
                name="capacity"
                type="text"
                placeholder="e.g 40"
                className={`border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${errors.capacity ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.capacity}
                onChange={handleChange}
                required
              />
              {errors.capacity && <p className="text-red-500 text-xs mt-1">{errors.capacity}</p>}
            </div>

            {/* 4. Registration Contact Number */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold text-gray-700">Registration Contact Number <span className="text-red-500">*</span></label>
              <input
                name="regno"
                type="text"
                placeholder="e.g 9320xxxxxx"
                className={`border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${errors.regno ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.regno}
                onChange={handleChange}
                required
                maxLength={10}
              />
              {errors.regno && <p className="text-red-500 text-xs mt-1">{errors.regno}</p>}
            </div>

            {/* 5. Vehicle No */}
            <div className="flex flex-col">
              <label className="mb-1 text-sm font-semibold text-gray-700">Vehicle No <span className="text-red-500">*</span></label>
              <input
                name="vehicleno"
                type="text"
                placeholder="e.g MH12AB1234"
                className={`border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${errors.vehicleno ? 'border-red-500' : 'border-gray-300'}`}
                value={formData.vehicleno}
                onChange={handleChange}
                required
              />
              {errors.vehicleno && <p className="text-red-500 text-xs mt-1">{errors.vehicleno}</p>}
            </div>
            
            {/* Empty column for grid consistency */}
            <div></div> 
            
          </div>
        </div>

        {/* ------------------ Footer (Buttons) ------------------ */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-150"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveClick}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center"
            disabled={isSaving}
          >
            {isSaving ? (
                <>
                    <i className="fas fa-spinner fa-spin mr-2"></i> Saving...
                </>
            ) : 'Save Vehicle'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVehicleModal;