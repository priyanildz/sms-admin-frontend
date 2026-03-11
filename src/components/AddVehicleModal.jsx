import React, { useState } from "react";
import axios from "axios";

// NOTE: Since the file uploads rely on an external service (like Cloudinary, based on your student form),
// we define the necessary constants here. Ensure these match your actual setup.
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dyloa2svi/auto/upload"; // Placeholder/Example URL
const CLOUDINARY_UPLOAD_PRESET = "sspd-student-management"; // Reusing your student preset for this example

// 🌟 NEW: Vehicle Document Options - Match schema field names for tracking
const VEHICLE_DOCUMENT_OPTIONS = [
  "Select Document Type",
  "PUC Certificate",
  "Vehicle Insurance",
  "Registration Certificate (RC)",
];

// 🌟 NEW: Reusable Component for Document Upload Fields
const DocumentInputField = ({ label, name, file, onChange, error }) => (
  <div className="flex flex-col"><label className="block text-sm font-semibold text-gray-700 mb-1">
         {label}</label><input
      type="file"
      name={name}
      accept=".pdf,image/*" // Accepting common document/image formats
      onChange={onChange}
      className={`
        mt-1 block w-full text-sm text-gray-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-yellow-100 file:text-yellow-800
        hover:file:bg-yellow-200
        ${error ? "border border-red-500 rounded-lg" : ""}
      `}
    />{file && (
      <p className="text-xs text-green-600 mt-1 truncate">
            File selected: {file.name}</p>
    )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}</div>
);

const AddVehicleModal = ({ show, onClose, onSave, formData, setFormData }) => {
  if (!show) return null;

  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({}); // 🌟 Document States

  const [vehicleImage, setVehicleImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Stores map of { "PUC Certificate": FileObject } for all uploaded documents

  const [pendingDocuments, setPendingDocuments] = useState({}); // State for the currently selected document type in the dropdown
  const [currentDocType, setCurrentDocType] = useState(
    VEHICLE_DOCUMENT_OPTIONS[0],
  ); // Helper function to convert the string status ('active'/'inactive') to a boolean for the toggle

  const getIsActive = (status) => status?.toLowerCase() === "active";

  const generateUniqueId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }; // Cloudinary Upload Helper (copied from student form logic)

  const uploadToCloudinary = async (file, folderName, customName) => {
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    uploadFormData.append("folder", folderName);
    uploadFormData.append("public_id", customName);

    try {
      const res = await axios.post(CLOUDINARY_UPLOAD_URL, uploadFormData);
      return { url: res.data.secure_url, filename: file.name };
    } catch (err) {
      console.error(
        "Cloudinary Upload error:",
        err.response?.data || err.message,
      );
      throw new Error(
        `Failed to upload ${file.name}. Please check network or file size.`,
      );
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target; // Clear the error for the field being edited

    setErrors((prev) => ({ ...prev, [name]: null })); // Handle the Status Toggle (Checkbox)

    if (name === "status" && type === "checkbox") {
      const newStatus = checked ? "active" : "inactive";
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
  }; // Vehicle Image Handler

  const handleVehicleImageChange = (e) => {
    const file = e.target.files[0];
    setErrors((prev) => ({ ...prev, vehicleImage: null }));
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }
      setVehicleImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setVehicleImage(null);
      setImagePreview(null);
    }
  }; // 🌟 UPDATED: Document File Handler (handles dynamic selection)

  const handleDocumentFileChange = (e) => {
    const file = e.target.files[0]; // docType is stored in currentDocType state
    const docType = currentDocType;

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // Max 10MB for documents
        alert("Document file size should be less than 10MB");
        e.target.value = null; // Clear input
        return;
      }
      setPendingDocuments((prev) => ({ ...prev, [docType]: file }));
      setErrors((prev) => ({ ...prev, documentUpload: null })); // Clear generic doc upload error
    } else {
      setPendingDocuments((prev) => {
        const newDocs = { ...prev };
        delete newDocs[docType];
        return newDocs;
      });
    }
  }; // 🌟 UPDATED: Comprehensive Validation Function

  const validateForm = () => {
    let newErrors = {};
    let isValid = true; // 1. Basic Required Field Check

    const requiredFields = [
      "type",
      "vehiclename",
      "capacity",
      "regno",
      "vehicleno",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field] || String(formData[field]).trim() === "") {
        newErrors[field] = "This field is required.";
        isValid = false;
      }
    }); // 2. Required File Check

    if (!vehicleImage) {
      newErrors.vehicleImage = "Vehicle Image is required.";
      isValid = false;
    } // Check if all required documents are present in pendingDocuments state

    const requiredDocs = VEHICLE_DOCUMENT_OPTIONS.filter(
      (d) => d !== VEHICLE_DOCUMENT_OPTIONS[0],
    );
    let missingDocs = [];

    requiredDocs.forEach((docName) => {
      if (!pendingDocuments[docName]) {
        missingDocs.push(docName);
      }
    });

    if (missingDocs.length > 0) {
      newErrors.documentUpload = `Missing required documents: ${missingDocs.join(
        ", ",
      )}.`;
      isValid = false;
    } // 3. Capacity Validation (Must be a positive number/integer)

    const capacityValue = formData.capacity;
    if (
      capacityValue &&
      (!/^\d+$/.test(capacityValue) || parseInt(capacityValue) <= 0)
    ) {
      newErrors.capacity = "Capacity must be a positive whole number.";
      isValid = false;
    } // 4. Registration Contact Number Validation (Assuming 10 digits for a contact number)

    const regnoValue = formData.regno;
    if (regnoValue && !/^\d{10}$/.test(regnoValue)) {
      newErrors.regno = "Contact Number must be exactly 10 digits.";
      isValid = false;
    } // 5. Vehicle Number Validation (Basic Alphanumeric/Dash Pattern Check, customizable)

    const vehiclenoValue = formData.vehicleno;
    if (
      vehiclenoValue &&
      !/^[A-Z]{2}\d{1,2}[A-Z]{1,2}\d{4}$/i.test(vehiclenoValue)
    ) {
      newErrors.vehicleno = "Invalid format (e.g., MH12AB1234).";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }; // 🌟 UPDATED: HANDLE SAVE LOGIC

  const handleSaveClick = async () => {
    if (!validateForm()) {
      // alert message is triggered from validateForm
      return;
    }

    setIsSaving(true);

    try {
      // 1. Upload Files
      const uploadPromises = [];
      const uploadedUrls = {}; // A. Upload Vehicle Image

      const imageCustomName = `${
        formData.vehicleno
      }_image_${generateUniqueId()}`;
      uploadPromises.push(
        uploadToCloudinary(
          vehicleImage,
          "vehicle_images",
          imageCustomName,
        ).then((res) => {
          uploadedUrls.vehicleImageUrl = res.url;
        }),
      ); // B. Upload Documents
      // Mapping document names to the required schema keys (pucUrl, insuranceUrl, registrationCertificateUrl)

      const docKeyMap = {
        "PUC Certificate": "pucUrl",
        "Vehicle Insurance": "insuranceUrl",
        "Registration Certificate (RC)": "registrationCertificateUrl",
      };

      for (const [docName, file] of Object.entries(pendingDocuments)) {
        const docCustomName = `${formData.vehicleno}_${docName.replace(
          /[^a-zA-Z0-9]/g,
          "_",
        )}_${generateUniqueId()}`; // Ensure we only process files for the keys we know how to map

        if (docKeyMap[docName]) {
          uploadPromises.push(
            uploadToCloudinary(file, "vehicle_documents", docCustomName).then(
              (res) => {
                uploadedUrls[docKeyMap[docName]] = res.url;
              },
            ),
          );
        }
      } // Wait for all uploads to complete

      await Promise.all(uploadPromises); // 2. Prepare Final Data and Save to DB

      const finalFormData = {
        ...formData,
        ...uploadedUrls, // Add all the Cloudinary URLs
      };

      await onSave(finalFormData); // Reset states on successful save

      setErrors({});
      setVehicleImage(null);
      setImagePreview(null);
      setPendingDocuments({});
      setCurrentDocType(VEHICLE_DOCUMENT_OPTIONS[0]);
    } catch (error) {
      console.error("Save/Upload failed:", error);
      alert(
        error.message || "Failed to save vehicle. Check console for details.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    // Backdrop overlay
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: "rgba(50, 50, 50, 0.5)",
      }}
    >
         {/* MODIFICATION 1: max-w-4xl and fixed height/scrolling */}<div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl transform transition-all p-0 flex flex-col max-h-[90vh]">
            {/* Modal Header (Fixed Position) */}<div className="flex-shrink-0 px-6 py-4 border-b border-gray-100 bg-blue-50 rounded-t-xl flex justify-between items-center"><h2 className="text-xl font-bold text-blue-500">
                  <i className="fas fa-bus mr-2"></i> Add New Vehicle</h2><button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
            disabled={isSaving}
          >
                  <i className="fas fa-times text-xl"></i></button></div>
            {/* Modal Body (Scrollable Content) */}<div className="p-6 space-y-6 overflow-y-auto">{/* ------------------ START OF NESTED GRID (Details + Image) ------------------ */}<div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
                        {/* LEFT COLUMN: Basic Details */}<div className="space-y-6">
                     {/* Group 1: Vehicle Basic Details */}<div className="rounded-lg p-6 shadow-lg bg-white h-full"><div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t"><h4 className="text-xl font-semibold">Vehicle Details</h4></div><div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mt-6">
                           {/* 1. Vehicle Type */}<div className="flex flex-col"><label className="mb-1 text-sm font-semibold text-gray-700">
                                 Vehicle Type<span className="text-red-500">*</span></label><select
                      className={`border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 appearance-none ${
                        errors.type ? "border-red-500" : "border-gray-300"
                      }`}
                      value={formData.type}
                      onChange={handleChange}
                      name="type"
                      required
                    ><option value="" disabled>
                                    Select Type</option>
                                 <option value="bus">Bus</option> 
                               <option value="van">Van</option>   
                             <option value="auto">Auto</option></select>{errors.type && (
                      <p className="text-red-500 text-xs mt-1">{errors.type}</p>
                    )}</div>
                           {/* 2. Vehicle Name */}<div className="flex flex-col"><label className="mb-1 text-sm font-semibold text-gray-700">
                                 Vehicle Name<span className="text-red-500">*</span></label><input
                      name="vehiclename"
                      type="text"
                      placeholder="e.g School Bus 1"
                      className={`border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${
                        errors.vehiclename
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      value={formData.vehiclename}
                      onChange={handleChange}
                      required
                    />{errors.vehiclename && (
                      <p className="text-red-500 text-xs mt-1">
                                    {errors.vehiclename}</p>
                    )}</div>
                           {/* 3. Capacity */}<div className="flex flex-col"><label className="mb-1 text-sm font-semibold text-gray-700">
                                 Capacity<span className="text-red-500">*</span></label><input
                      name="capacity"
                      type="text"
                      placeholder="e.g 40"
                      className={`border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${
                        errors.capacity ? "border-red-500" : "border-gray-300"
                      }`}
                      value={formData.capacity}
                      onChange={handleChange}
                      required
                    />{errors.capacity && (
                      <p className="text-red-500 text-xs mt-1">
                                    {errors.capacity}</p>
                    )}</div>
                           {/* 4. Registration Contact Number */}<div className="flex flex-col"><label className="mb-1 text-sm font-semibold text-gray-700">
                                 Registration Contact Number    
                             <span className="text-red-500">*</span></label><input
                      name="regno"
                      type="text"
                      placeholder="10 digit phone number"
                      className={`border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${
                        errors.regno ? "border-red-500" : "border-gray-300"
                      }`}
                      value={formData.regno}
                      onChange={handleChange}
                      required
                      maxLength={10}
                    />{errors.regno && (
                      <p className="text-red-500 text-xs mt-1">
                                    {errors.regno}</p>
                    )}</div>
                           {/* 5. Vehicle No */}<div className="flex flex-col"><label className="mb-1 text-sm font-semibold text-gray-700">
                                 Vehicle No<span className="text-red-500">*</span></label><input
                      name="vehicleno"
                      type="text"
                      placeholder="e.g MH12AB1234"
                      className={`border px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${
                        errors.vehicleno ? "border-red-500" : "border-gray-300"
                      }`}
                      value={formData.vehicleno}
                      onChange={handleChange}
                      required
                    />{errors.vehicleno && (
                      <p className="text-red-500 text-xs mt-1">
                                    {errors.vehicleno}</p>
                    )}</div>
                           {/* Empty column for grid consistency */} 
                         <div></div></div></div></div>
                  {/* RIGHT COLUMN: Vehicle Image Upload */}<div className="w-full flex flex-col p-0 rounded-lg shadow-lg bg-white self-start"><div className="p-6">{/* Header for Image Section (Changed to red header, as per your image) */}<div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t-lg"><h4 className="text-xl font-semibold">Vehicle Image </h4></div><div className="mt-6 flex flex-col items-center">{/* MODIFICATION 2: Reduced size of Image Preview box */}<div
                    className={`w-48 h-48 bg-gray-200 rounded mb-4 flex items-center justify-center relative overflow-hidden shadow-inner ${
                      errors.vehicleImage ? "border-2 border-red-500" : ""
                    }`}
                  >{imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Vehicle Preview"
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <span className="text-sm text-gray-500">
                                    Vehicle Image Preview</span>
                    )}</div>
                           {/* File Input Trigger Button */}<label className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded cursor-pointer shadow-md transition">
                              Choose Vehicle Image<input
                      type="file"
                      accept="image/*"
                      onChange={handleVehicleImageChange}
                      className="hidden"
                    /></label>{vehicleImage && (
                    <span className="text-xs text-gray-600 mt-2 max-w-[200px] truncate text-center">
                                 {vehicleImage.name}</span>
                  )}{errors.vehicleImage && (
                    <p className="text-red-500 text-xs mt-1">
                                 {errors.vehicleImage}</p>
                  )}</div>{/* MODIFICATION 3: Status Toggle placed correctly below the image/upload */}<div className="flex justify-center mt-6"><div className="flex items-center space-x-2"><span
                      className={`text-sm font-bold transition-colors ${
                        !getIsActive(formData.status)
                          ? "text-red-600"
                          : "text-gray-400"
                      }`}
                    >
                                 INACTIVE</span><label className="relative inline-flex items-center cursor-pointer"><input
                        type="checkbox"
                        name="status"
                        id="status-toggle"
                        checked={getIsActive(formData.status)}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                                 {/* Custom Toggle Switch */}<div className='w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500'></div></label><span
                      className={`text-sm font-bold transition-colors ${
                        getIsActive(formData.status)
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                                 ACTIVE</span></div></div></div></div></div>{/* ------------------ END OF NESTED GRID (Details + Image) ------------------ */}{/* ------------------ START OF FULL WIDTH BLOCK (Documents) ------------------ */}{/* Group 2: Document Uploads (Using Dropdown/List Pattern) - Now full width */}<div className="rounded-lg p-6 shadow-lg bg-white"><div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t"><h4 className="text-xl font-semibold">
                        Vehicle Documents</h4></div><div className="mt-6 rounded-lg bg-white"><div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                        {/* Document Type Dropdown */}<div><label className="mb-1 text-sm font-semibold text-gray-700">
                              Select Document Type *</label><select
                    className="border px-4 py-2.5 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 appearance-none border-gray-300"
                    value={currentDocType}
                    onChange={(e) => setCurrentDocType(e.target.value)}
                  >{VEHICLE_DOCUMENT_OPTIONS.map((opt) => (
                      <option
                        key={opt}
                        value={opt}
                        disabled={opt === VEHICLE_DOCUMENT_OPTIONS[0]}
                      >
                                    {opt}</option>
                    ))}</select></div>{/* File Input (Only visible if a document type is selected) */}{currentDocType !== VEHICLE_DOCUMENT_OPTIONS[0] && (
                  <div><label className="block text-sm font-medium text-gray-700">
                                 Upload {currentDocType}</label><input
                      type="file"
                      accept=".pdf,image/*"
                      onChange={handleDocumentFileChange} // Key is crucial here to force re-render/clear input when dropdown changes
                      key={currentDocType}
                      className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                    />{pendingDocuments[currentDocType] && (
                      <p className="text-xs text-green-600 mt-1">
                                    File selected:         
                           {pendingDocuments[currentDocType].name}</p>
                    )}</div>
                )}</div>
                     {/* List of Uploaded Documents (Pending) */}<div className="mt-6"><h5 className="text-md font-semibold text-gray-800 mb-2">
                           Files Pending Upload on Submission:</h5><ul className="space-y-2 text-sm text-gray-700">{VEHICLE_DOCUMENT_OPTIONS.filter(
                    (type) => type !== VEHICLE_DOCUMENT_OPTIONS[0],
                  ).map((docType) => {
                    const file = pendingDocuments[docType];
                    return (
                      <li
                        key={docType}
                        className={`flex justify-between items-center p-3 border rounded-lg ${
                          file
                            ? "bg-blue-100 border-blue-400"
                            : "bg-white border-gray-200"
                        }`}
                      ><span><strong className="font-medium">
                                          {docType}:</strong>{file ? ` ${file.name}` : " No file selected"}</span></li>
                    );
                  })}</ul>{errors.documentUpload && (
                  <p className="text-red-500 text-xs mt-3">
                              {errors.documentUpload}</p>
                )}</div></div></div>{/* ------------------ END OF FULL WIDTH BLOCK (Documents) ------------------ */}</div>{/* ------------------ Footer (Buttons) (Fixed Position) ------------------ */}<div className="flex-shrink-0 flex justify-end gap-3 px-6 py-4 border-t border-gray-100 rounded-b-xl"><button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-150"
            disabled={isSaving}
          >
                  Cancel</button><button
            onClick={handleSaveClick}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center"
            disabled={isSaving}
          >{isSaving ? (
              <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>Saving...</>
            ) : (
              "Save Vehicle"
            )}</button></div></div><style>{`
    /* Ensure the modal is centered properly */
    @media (min-width: 1024px) {
      .max-w-4xl {
        width: 90%;
      }
    }
   `}</style></div>
  );
};

export default AddVehicleModal;
