// import React, { useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import InputField from "../components/InputField";
// import SelectField from "../components/SelectField";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function StudentAdmission() {
//   const navigate = useNavigate();
//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [photo, setPhoto] = useState(null);
//   const [admissionType, setAdmissionType] = useState("regular");
//   const [isDeclared, setIsDeclared] = useState(false);

//   // Error state to hold validation messages
//   const [errors, setErrors] = useState({});

//   // Get today's date in YYYY-MM-DD format for max date restriction
//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split("T")[0];
//   };

//   const [formData, setFormData] = useState({
//     // Student basic details
//     firstname: "",
//     middlename: "",
//     lastname: "",
//     gender: "",
//     dob: "",
//     birthplace: "",
//     bloodgroup: "",
//     category: "",
//     nationality: "",
//     aadharno: "",
//     photo: "",

//     // Parent/Guardian details
//     fathername: "",
//     mothername: "",
//     guardianname: "",
//     relationwithstudent: "",
//     primarycontact: "",
//     alternatecontact: "",
//     emailaddress: "",
//     occupation: "",
//     annualincome: "",

//     // Address details
//     addressline1: "",
//     addressline2: "",
//     city: "",
//     postalcode: "",
//     district: "",
//     state: "",
//     country: "",

//     // Admission details
//     admissionstd: "",
//     admissiondivision: "",
//     academicyear: "",
//     admissiontype: "regular",
//     lastschoolname: "",
//     laststandardattended: "",
//     board: "",
//     mediuminstruction: "",
//     lcno: "",
//     admissiondate: "",
//     admissionno: "",
//     grno: "",

//     // Transport details
//     transportstatus: "",
//     pickuppoint: "",
//     droppoint: "",
//     modetransport: "",
//   });

//   const validateField = (field, value) => {
//     let errorMsg = "";
//     switch (field) {
//       case "firstname":
//       case "lastname":
//       case "fathername":
//       case "mothername":
//       case "addressline1":
//       case "city":
//       case "state":
//       case "country":
//       case "admissionstd":
//       case "academicyear":
//         if (!value.trim()) errorMsg = "This field is required";
//         break;
//       case "dob":
//         if (!value) errorMsg = "Date of birth is required";
//         else if (new Date(value) > new Date())
//           errorMsg = "DOB cannot be in the future";
//         break;
//       case "gender":
//       case "bloodgroup":
//       case "nationality":
//       case "transportstatus":
//       case "category": // Add category validation
//         if (!value || value === "Select Category") errorMsg = "Please select an option";
//         break;
//       case "aadharno":
//         if (!value.trim()) errorMsg = "Aadhaar number is required";
//         else if (!/^\d{12}$/.test(value))
//           errorMsg = "Aadhaar must be 12 digits";
//         break;
//       case "primarycontact":
//         if (!value.trim()) errorMsg = "Primary contact is required";
//         else if (!/^\d{10}$/.test(value))
//           errorMsg = "Contact must be 10 digits";
//         break;
//       case "alternatecontact":
//         if (value && !/^\d{10}$/.test(value))
//           errorMsg = "Contact must be 10 digits";
//         break;
//       case "emailaddress":
//         if (value && !/^\S+@\S+\.\S+$/.test(value))
//           errorMsg = "Invalid email address";
//         break;
//       case "postalcode":
//         if (!value.trim()) errorMsg = "Postal code is required";
//         break;
//       default:
//         errorMsg = "";
//     }
//     setErrors((prev) => ({ ...prev, [field]: errorMsg }));
//     return !errorMsg;
//   };

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     validateField(field, value);
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file type
//       if (!file.type.startsWith("image/")) {
//         alert("Please select a valid image file");
//         return;
//       }

//       // Validate file size (e.g., max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         alert("Image file size should be less than 5MB");
//         return;
//       }
//       setPhoto(file);
//       setPhotoPreview(URL.createObjectURL(file));
//     }
//   };

//   // Generate unique IDs
//   const generateUniqueId = () => {
//     return Date.now().toString() + Math.random().toString(36).substr(2, 9);
//   };

//   // Upload file to Cloudinary
//   const uploadToCloudinary = async (file, docType, customName) => {
//     const uploadFormData = new FormData();
//     uploadFormData.append("file", file);
//     uploadFormData.append("upload_preset", "sspd-student-management");
//     uploadFormData.append("folder", `student_images/${docType}`);
//     uploadFormData.append("public_id", customName);

//     try {
//       const res = await axios.post(
//         "https://api.cloudinary.com/v1_1/dfc8sai1i/auto/upload",
//         uploadFormData
//       );
//       return res.data.secure_url;
//     } catch (err) {
//       console.error("Upload error:", err);
//       throw err;
//     }
//   };

//   const validateForm = () => {
//     const fieldsToValidate = [
//       "firstname", "lastname", "dob", "gender", "bloodgroup",
//       "category", // Include category in form validation
//       "nationality", "aadharno", "fathername", "mothername",
//       "primarycontact", "addressline1", "city", "postalcode",
//       "state", "country", "admissionstd", "academicyear", "transportstatus"
//     ];

//     let isValid = true;
//     fieldsToValidate.forEach((field) => {
//       const valid = validateField(field, formData[field]);
//       if (!valid) isValid = false;
//     });

//     if (!isDeclared) {
//       alert("You must agree to the declaration before submitting.");
//       isValid = false;
//     }

//     return isValid;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) {
//         alert("Please fill all the required fields correctly.");
//         return;
//     };

//     try {
//       let photoUrl = "";

//       // Upload photo if exists
//       if (photo) {
//         console.log("Uploading photo...");
//         photoUrl = await uploadToCloudinary(
//           photo,
//           "photo:" + formData.firstname + " " + formData.lastname,
//           "" + formData.firstname + "_" + formData.lastname
//         );
//       }
      
//       // ⚠️ Use a Unique ID for transportid, admissionno, and grno if the field is empty,
//       //    as these are required to be unique in your MongoDB schema.
//       const uniqueAdmissionNo = formData.admissionno || generateUniqueId();
//       const uniqueGrNo = formData.grno || generateUniqueId();
//       const uniqueTransportId = generateUniqueId();

//       // Create the properly structured payload matching your schema
//       const structuredData = {
//         // Required root level fields
//         studentid: generateUniqueId(),
//         firstname: formData.firstname,
//         lastname: formData.lastname,
//         dob: formData.dob,
//         bloodgroup: formData.bloodgroup,
//         gender: formData.gender,
//         category: formData.category,
//         nationality: formData.nationality,
//         aadharno: formData.aadharno,
//         middlename: formData.middlename,
//         birthplace: formData.birthplace,
//         photo: photoUrl, // Use the uploaded photo URL

//         // Parent object structure
//         parent: {
//           parentid: generateUniqueId(),
//           fathername: formData.fathername,
//           mothername: formData.mothername,
//           primarycontact: formData.primarycontact,
//           alternatecontact: formData.alternatecontact || "",
//           emailaddress: formData.emailaddress || "",
//           occupation: formData.occupation || "",
//           annualincome: formData.annualincome || "",
//           guardianname: formData.guardianname || "",
//           relationwithstudent: formData.relationwithstudent || "",
//         },

//         // Address object structure
//         address: {
//           addressid: generateUniqueId(),
//           addressline1: formData.addressline1,
//           addressline2: formData.addressline2 || "",
//           city: formData.city,
//           postalcode: formData.postalcode,
//           district: formData.district || "",
//           state: formData.state,
//           country: formData.country,
//         },

//         // Admission object structure
//         admission: {
//           admissionno: uniqueAdmissionNo, // Use unique ID
//           grno: uniqueGrNo,                 // Use unique ID
//           admissionstd: formData.admissionstd,
//           academicyear: formData.academicyear,
//           admissiondivision: formData.admissiondivision || "",
//           admissiontype: formData.admissiontype,
//           admissiondate:
//             formData.admissiondate || new Date().toISOString().split("T")[0],
//           lastschoolname: formData.lastschoolname || "",
//           laststandardattended: formData.laststandardattended || "",
//           board: formData.board || "",
//           mediuminstruction: formData.mediuminstruction || "",
//           lcno: formData.lcno || "",
//         },

//         // Transport object structure
//         transport: {
//           transportid: uniqueTransportId, // Use unique ID (fixes duplicate key error)
//           transportstatus: formData.transportstatus,
//           pickuppoint: formData.pickuppoint || "",
//           droppoint: formData.droppoint || "",
//           modetransport: formData.modetransport || "",
//         },
//       };

//       console.log("sending data: ", structuredData);

//       // CRITICAL FIX: Changing from Vercel URL back to LOCALHOST
//       const response = await axios.post(
//         "http://localhost:5000/api/addstudent", // <--- LOCALHOST URL NOW!
//         structuredData,
//         {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         }
//       );

//       if (response.status === 200 || response.status === 201) {
//         alert("Student admission successful!");
//         // ⚠️ FINAL FIX: Introduce a short delay before navigating to allow the database to stabilize
//         // This resolves the issue where data isn't immediately visible after submission.
//         setTimeout(() => {
//             navigate("/students");
//         }, 500); // 500ms delay 
//       }
//     } catch (err) {
//       console.error("Form submission error:", err.response);

//       if (err.response) {
//         console.error("Error response:", err.response.data);
//         alert(`Error: ${err.response.data.message || "Submission failed."}`);
//       } else {
//         alert("Network/server error. Try again.");
//       }
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="p-8">
//         <div className="bg-white rounded-2xl shadow p-6">
//           <h4 className="text-2xl font-semibold mb-6 text-center">
//             Student Admission
//           </h4>

//           {/* Student Details Section */}
//           <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6 mb-6">
//             <div className="rounded-lg p-6 shadow-lg bg-white w-full">
//               <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//                 <h4 className="text-xl font-semibold">Student Details</h4>
//               </div>

//               {/* Name Fields */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//                 <div>
//                   <InputField
//                     label="First Name *"
//                     value={formData.firstname}
//                     onChange={(val) => handleChange("firstname", val)}
//                   />
//                   {errors.firstname && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.firstname}
//                     </p>
//                   )}
//                 </div>
//                 <InputField
//                   label="Middle Name"
//                   value={formData.middlename}
//                   onChange={(val) => handleChange("middlename", val)}
//                 />
//                 <div>
//                   <InputField
//                     label="Last Name *"
//                     value={formData.lastname}
//                     onChange={(val) => handleChange("lastname", val)}
//                   />
//                   {errors.lastname && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.lastname}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//                 <div>
//                   <InputField
//                     label="Date of Birth *"
//                     type="date"
//                     value={formData.dob}
//                     onChange={(val) => handleChange("dob", val)}
//                     max={getTodayDate()} // This restricts future dates
//                   />
//                   {errors.dob && (
//                     <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
//                   )}
//                 </div>
//                 <InputField
//                   label="Place Of Birth"
//                   value={formData.birthplace}
//                   onChange={(val) => handleChange("birthplace", val)}
//                 />
//                 <div>
//                   <SelectField
//                     label="Blood Group *"
//                     options={[ "Select", "a+", "a-", "b+", "b-", "ab+", "ab-", "o+", "o-"]}
//                     value={formData.bloodgroup}
//                     onChange={(val) => handleChange("bloodgroup", val)}
//                   />
//                    {errors.bloodgroup && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.bloodgroup}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//                 <div>
//                   <SelectField
//                     label="Gender *"
//                     options={["Select", "male", "female", "others"]}
//                     value={formData.gender}
//                     onChange={(val) => handleChange("gender", val)}
//                   />
//                   {errors.gender && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.gender}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <SelectField
//                     label="Nationality *"
//                     options={["Select", "Indian", "Other"]}
//                     value={formData.nationality}
//                     onChange={(val) => handleChange("nationality", val)}
//                   />
//                   {errors.nationality && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.nationality}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   {/* MODIFICATION HERE: Replace InputField with SelectField for Category */}
//                   <SelectField
//                     label="Category *"
//                     options={["Select Category", "General", "OBC", "SC", "ST", "Other"]}
//                     value={formData.category}
//                     onChange={(val) => handleChange("category", val)}
//                   />
//                   {errors.category && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.category}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <div>
//                   <InputField
//                     label="Aadhaar Number *"
//                     value={formData.aadharno}
//                     onChange={(val) => handleChange("aadharno", val)}
//                     placeholder="12-digit Aadhaar number"
//                   />
//                   {errors.aadharno && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.aadharno}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Photo Upload Section */}
//             <div className="w-full flex flex-col items-center justify-between p-6 rounded-lg shadow-lg bg-white self-start">
//               <div className="w-full h-48 bg-gray-200 rounded mb-2 flex items-center justify-center relative overflow-hidden shadow-inner">
//                 {photoPreview ? (
//                   <img
//                     src={photoPreview}
//                     alt="Preview"
//                     className="w-full h-full object-cover rounded"
//                   />
//                 ) : (
//                   <span className="text-sm text-gray-500">Preview</span>
//                 )}
//               </div>
//               <label className="bg-blue-400 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded cursor-pointer shadow-md">
//                 Choose File
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handlePhotoChange}
//                   className="hidden"
//                 />
//               </label>
//               {photo && (
//                 <span className="text-xs text-gray-600 mt-1 max-w-[200px] truncate text-center">
//                   {photo.name}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Parent/Guardian Details */}
//           <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
//             <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//               <h4 className="text-xl font-semibold">
//                 Parent/Guardian Details
//               </h4>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <div>
//                 <InputField
//                   label="Father's Name *"
//                   value={formData.fathername}
//                   onChange={(val) => handleChange("fathername", val)}
//                 />
//                 {errors.fathername && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.fathername}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <InputField
//                   label="Mother's Name *"
//                   value={formData.mothername}
//                   onChange={(val) => handleChange("mothername", val)}
//                 />
//                 {errors.mothername && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.mothername}
//                   </p>
//                 )}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <InputField
//                 label="Guardian's Name"
//                 value={formData.guardianname}
//                 onChange={(val) => handleChange("guardianname", val)}
//               />
//               <SelectField
//                 label="Relationship with Student"
//                 options={["Select", "father", "mother", "guardian", "other"]}
//                 value={formData.relationwithstudent}
//                 onChange={(val) => handleChange("relationwithstudent", val)}
//               />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <div>
//                 <InputField
//                   label="Primary Contact Number *"
//                   value={formData.primarycontact}
//                   onChange={(val) => handleChange("primarycontact", val)}
//                   placeholder="10-digit mobile number"
//                 />
//                 {errors.primarycontact && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.primarycontact}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <InputField
//                   label="Alternate Contact Number"
//                   value={formData.alternatecontact}
//                   onChange={(val) => handleChange("alternatecontact", val)}
//                   placeholder="10-digit mobile number"
//                 />
//                  {errors.alternatecontact && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.alternatecontact}
//                     </p>
//                   )}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <div>
//                 <InputField
//                   label="Email Address"
//                   value={formData.emailaddress}
//                   onChange={(val) => handleChange("emailaddress", val)}
//                   type="email"
//                 />
//                 {errors.emailaddress && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.emailaddress}
//                   </p>
//                 )}
//               </div>
//               <InputField
//                 label="Occupation"
//                 value={formData.occupation}
//                 onChange={(val) => handleChange("occupation", val)}
//               />
//             </div>
//             <div className="mt-6">
//               <InputField
//                 label="Annual Income"
//                 value={formData.annualincome}
//                 onChange={(val) => handleChange("annualincome", val)}
//                 type="number"
//               />
//             </div>
//           </div>

//           {/* Address Information */}
//           <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
//             <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//               <h4 className="text-xl font-semibold">Address Information</h4>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
//               <div>
//                  <InputField
//                     label="Address Line 1 *"
//                     value={formData.addressline1}
//                     onChange={(val) => handleChange("addressline1", val)}
//                   />
//                   {errors.addressline1 && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors.addressline1}
//                     </p>
//                   )}
//               </div>
//               <InputField
//                 label="Address Line 2"
//                 value={formData.addressline2}
//                 onChange={(val) => handleChange("addressline2", val)}
//               />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <div>
//                 <InputField
//                   label="City *"
//                   value={formData.city}
//                   onChange={(val) => handleChange("city", val)}
//                 />
//                 {errors.city && (
//                   <p className="text-red-500 text-xs mt-1">{errors.city}</p>
//                 )}
//               </div>
//               <div>
//                 <InputField
//                   label="Postal Code *"
//                   value={formData.postalcode}
//                   onChange={(val) => handleChange("postalcode", val)}
//                 />
//                 {errors.postalcode && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.postalcode}
//                   </p>
//                 )}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <InputField
//                 label="District"
//                 value={formData.district}
//                 onChange={(val) => handleChange("district", val)}
//               />
//               <div>
//                 <InputField
//                   label="State *"
//                   value={formData.state}
//                   onChange={(val) => handleChange("state", val)}
//                 />
//                  {errors.state && (
//                   <p className="text-red-500 text-xs mt-1">{errors.state}</p>
//                 )}
//               </div>
//             </div>
//             <div className="mt-6">
//               <div>
//                 <InputField
//                   label="Country *"
//                   value={formData.country}
//                   onChange={(val) => handleChange("country", val)}
//                 />
//                  {errors.country && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.country}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Admission Details */}
//           <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
//             <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//               <h4 className="text-xl font-semibold">Admission Details</h4>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <div>
//                 <InputField
//                   label="Admission for Grade/Standard *"
//                   value={formData.admissionstd}
//                   onChange={(val) => handleChange("admissionstd", val)}
//                 />
//                 {errors.admissionstd && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.admissionstd}
//                   </p>
//                 )}
//               </div>
//               <InputField
//                 label="Division/Section"
//                 value={formData.admissiondivision}
//                 onChange={(val) => handleChange("admissiondivision", val)}
//               />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <div>
//                 <InputField
//                   label="Academic Year *"
//                   value={formData.academicyear}
//                   onChange={(val) => handleChange("academicyear", val)}
//                   placeholder="e.g., 2024-25"
//                 />
//                  {errors.academicyear && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.academicyear}
//                   </p>
//                 )}
//               </div>
//               <InputField
//                 label="Admission Date"
//                 type="date"
//                 value={formData.admissiondate}
//                 onChange={(val) => handleChange("admissiondate", val)}
//                 max={getTodayDate()} // Also restrict admission date to past dates
//               />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <InputField
//                 label="Admission Number"
//                 value={formData.admissionno}
//                 onChange={(val) => handleChange("admissionno", val)}
//                 placeholder="Leave blank for auto-generation"
//               />
//               <InputField
//                 label="GR Number"
//                 value={formData.grno}
//                 onChange={(val) => handleChange("grno", val)}
//                 placeholder="Leave blank for auto-generation"
//               />
//             </div>
//             <div className="mt-6">
//               <SelectField
//                 label="Admission Type"
//                 options={["regular", "transfer", "other"]}
//                 value={formData.admissiontype}
//                 onChange={(value) => {
//                   setAdmissionType(value);
//                   handleChange("admissiontype", value);
//                 }}
//               />
//             </div>
//           </div>

//           {/* Academic Details - Show only for transfer admissions */}
//           {(admissionType === "transfer" ||
//             formData.admissiontype === "transfer") && (
//             <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
//               <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//                 <h4 className="text-xl font-semibold">
//                   Previous School Details
//                 </h4>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
//                 <InputField
//                   label="Last School Name"
//                   value={formData.lastschoolname}
//                   onChange={(val) => handleChange("lastschoolname", val)}
//                 />
//                 <InputField
//                   label="Last Standard/Grade Attended"
//                   value={formData.laststandardattended}
//                   onChange={(val) => handleChange("laststandardattended", val)}
//                 />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//                 <SelectField
//                   label="Board"
//                   options={["Select", "CBSE", "ICSE", "State Board", "Other"]}
//                   value={formData.board}
//                   onChange={(val) => handleChange("board", val)}
//                 />
//                 <SelectField
//                   label="Medium of Instruction"
//                   options={["Select", "English", "Hindi", "Marathi", "Other"]}
//                   value={formData.mediuminstruction}
//                   onChange={(val) => handleChange("mediuminstruction", val)}
//                 />
//               </div>
//               <div className="mt-6">
//                 <InputField
//                   label="LC/TC Number"
//                   value={formData.lcno}
//                   onChange={(val) => handleChange("lcno", val)}
//                 />
//               </div>
//             </div>
//           )}

//           {/* Transport Details */}
//           <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
//             <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//               <h4 className="text-xl font-semibold">Transport Details</h4>
//             </div>
//             <div className="space-y-6 mt-6">
//               <div>
//                 <SelectField
//                   label="Do you require school transportation? *"
//                   options={["Select", "yes", "no"]}
//                   value={formData.transportstatus}
//                   onChange={(val) => handleChange("transportstatus", val)}
//                 />
//                 {errors.transportstatus && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.transportstatus}
//                   </p>
//                 )}
//               </div>

//               {formData.transportstatus === "yes" && (
//                 <>
//                   <InputField
//                     label="Pickup Point"
//                     value={formData.pickuppoint}
//                     onChange={(val) => handleChange("pickuppoint", val)}
//                   />
//                   <InputField
//                     label="Drop Point"
//                     value={formData.droppoint}
//                     onChange={(val) => handleChange("droppoint", val)}
//                   />
//                 </>
//               )}

//               <SelectField
//                 label="Mode of Transport"
//                 options={["Select", "bus", "van", "rickshaw", "self", "other"]}
//                 value={formData.modetransport}
//                 onChange={(val) => handleChange("modetransport", val)}
//               />
//             </div>
//           </div>

//           {/* Declaration */}
//           <div className="rounded-lg p-6 shadow-lg bg-white mb-8">
//             <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//               <h4 className="text-xl font-semibold">Declaration</h4>
//             </div>
//             <p className="text-sm text-gray-700 mt-6 mb-4">
//               I hereby declare that the information provided above is accurate
//               and true to the best of my knowledge. I agree to abide by the
//               school's policies and code of conduct.
//             </p>
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="declaration"
//                 className="mr-2"
//                 checked={isDeclared}
//                 onChange={(e) => setIsDeclared(e.target.checked)}
//               />
//               <label htmlFor="declaration" className="text-sm text-gray-700">
//                 I agree to the terms and conditions
//               </label>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-center">
//             <button
//               onClick={handleSubmit}
//               disabled={!isDeclared}
//               className={`px-8 py-3 text-white rounded-md font-semibold ${
//                 isDeclared
//                   ? "bg-blue-600 hover:bg-blue-700"
//                   : "bg-gray-400 cursor-not-allowed"
//               }`}
//             >
//               Submit Application
//             </button>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// }

import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config"; 

export default function StudentAdmission() {
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [admissionType, setAdmissionType] = useState("regular");
  const [isDeclared, setIsDeclared] = useState(false);

  // Error state to hold validation messages
  const [errors, setErrors] = useState({});

  // Get today's date in YYYY-MM-DD format for max date restriction
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    // Student basic details
    firstname: "",
    middlename: "",
    lastname: "",
    gender: "",
    dob: "",
    birthplace: "",
    bloodgroup: "",
    category: "",
    nationality: "",
    aadharno: "",
    photo: "",

    // Parent/Guardian details
    fathername: "",
    mothername: "",
    guardianname: "",
    relationwithstudent: "",
    primarycontact: "",
    alternatecontact: "",
    emailaddress: "",
    occupation: "",
    annualincome: "",

    // Address details
    addressline1: "",
    addressline2: "",
    city: "",
    postalcode: "",
    district: "",
    state: "",
    country: "",

    // Admission details
    admissionstd: "",
    admissiondivision: "",
    academicyear: "",
    admissiontype: "regular",
    lastschoolname: "",
    laststandardattended: "",
    board: "",
    mediuminstruction: "",
    lcno: "",
    admissiondate: "",
    admissionno: "",
    grno: "",

    // Transport details
    transportstatus: "",
    pickuppoint: "",
    droppoint: "",
    modetransport: "",
  });

  const validateField = (field, value) => {
    let errorMsg = "";
    switch (field) {
      case "firstname":
      case "lastname":
      case "fathername":
      case "mothername":
      case "addressline1":
      case "city":
      case "state":
      case "country":
      case "admissionstd":
      case "academicyear":
        if (!value.trim()) errorMsg = "This field is required";
        break;
      case "dob":
        if (!value) errorMsg = "Date of birth is required";
        else if (new Date(value) > new Date())
          errorMsg = "DOB cannot be in the future";
        break;
      case "gender":
      case "bloodgroup":
      case "nationality":
      case "transportstatus":
      case "category": // Add category validation
        if (!value || value === "Select Category" || value === "Select") errorMsg = "Please select an option";
        break;
      case "aadharno":
        if (!value.trim()) errorMsg = "Aadhaar number is required";
        else if (!/^\d{12}$/.test(value))
          errorMsg = "Aadhaar must be 12 digits";
        break;
      case "primarycontact":
        if (!value.trim()) errorMsg = "Primary contact is required";
        else if (!/^\d{10}$/.test(value))
          errorMsg = "Contact must be 10 digits";
        break;
      case "alternatecontact":
        if (value && !/^\d{10}$/.test(value))
          errorMsg = "Contact must be 10 digits";
        break;
      case "emailaddress":
        if (value && !/^\S+@\S+\.\S+$/.test(value))
          errorMsg = "Invalid email address";
        break;
      case "postalcode":
        if (!value.trim()) errorMsg = "Postal code is required";
        break;
      default:
        errorMsg = "";
    }
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    return !errorMsg;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }

      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image file size should be less than 5MB");
        return;
      }
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // Generate unique IDs
  const generateUniqueId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Upload file to Cloudinary
  const uploadToCloudinary = async (file, docType, customName) => {
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("upload_preset", "sspd-student-management");
    uploadFormData.append("folder", `student_images/${docType}`);
    uploadFormData.append("public_id", customName);

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dfc8sai1i/auto/upload",
        uploadFormData
      );
      return res.data.secure_url;
    } catch (err) {
      console.error("Upload error:", err);
      throw err;
    }
  };

  const validateForm = () => {
    const fieldsToValidate = [
      "firstname", "lastname", "dob", "gender", "bloodgroup",
      "category", // Include category in form validation
      "nationality", "aadharno", "fathername", "mothername",
      "primarycontact", "addressline1", "city", "postalcode",
      "state", "country", "admissionstd", "academicyear", "transportstatus"
    ];

    let isValid = true;
    fieldsToValidate.forEach((field) => {
      const valid = validateField(field, formData[field]);
      if (!valid) isValid = false;
    });

    if (!isDeclared) {
      alert("You must agree to the declaration before submitting.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
        alert("Please fill all the required fields correctly.");
        return;
    };

    try {
      let photoUrl = "";

      // Upload photo if exists
      if (photo) {
        console.log("Uploading photo...");
        photoUrl = await uploadToCloudinary(
          photo,
          "photo:" + formData.firstname + " " + formData.lastname,
          "" + formData.firstname + "_" + formData.lastname
        );
      }
      
      // ⚠️ Use a Unique ID for transportid, admissionno, and grno if the field is empty,
      //    as these are required to be unique in your MongoDB schema.
      const uniqueAdmissionNo = formData.admissionno || generateUniqueId();
      const uniqueGrNo = formData.grno || generateUniqueId();
      const uniqueTransportId = generateUniqueId();

      // Create the properly structured payload matching your schema
      const structuredData = {
        // Required root level fields
        studentid: generateUniqueId(),
        firstname: formData.firstname,
        lastname: formData.lastname,
        dob: formData.dob,
        bloodgroup: formData.bloodgroup,
        gender: formData.gender,
        category: formData.category,
        nationality: formData.nationality,
        aadharno: formData.aadharno,
        middlename: formData.middlename,
        birthplace: formData.birthplace,
        photo: photoUrl, // Use the uploaded photo URL

        // Parent object structure
        parent: {
          parentid: generateUniqueId(),
          fathername: formData.fathername,
          mothername: formData.mothername,
          primarycontact: formData.primarycontact,
          alternatecontact: formData.alternatecontact || "",
          emailaddress: formData.emailaddress || "",
          occupation: formData.occupation || "",
          annualincome: formData.annualincome || "",
          guardianname: formData.guardianname || "",
          relationwithstudent: formData.relationwithstudent || "",
        },

        // Address object structure
        address: {
          addressid: generateUniqueId(),
          addressline1: formData.addressline1,
          addressline2: formData.addressline2 || "",
          city: formData.city,
          postalcode: formData.postalcode,
          district: formData.district || "",
          state: formData.state,
          country: formData.country,
        },

        // Admission object structure
        admission: {
          admissionno: uniqueAdmissionNo, // Use unique ID
          grno: uniqueGrNo,                 // Use unique ID
          admissionstd: formData.admissionstd,
          academicyear: formData.academicyear,
          admissiondivision: formData.admissiondivision || "",
          admissiontype: formData.admissiontype,
          admissiondate:
            formData.admissiondate || new Date().toISOString().split("T")[0],
          lastschoolname: formData.lastschoolname || "",
          laststandardattended: formData.laststandardattended || "",
          board: formData.board || "",
          mediuminstruction: formData.mediuminstruction || "",
          lcno: formData.lcno || "",
        },

        // Transport object structure
        transport: {
          transportid: uniqueTransportId, // Use unique ID (fixes duplicate key error)
          transportstatus: formData.transportstatus,
          pickuppoint: formData.pickuppoint || "",
          droppoint: formData.droppoint || "",
          modetransport: formData.modetransport || "",
        },
      };

      console.log("sending data: ", structuredData);

      // FIX: Using imported API_BASE_URL
      const response = await axios.post(
        `${API_BASE_URL}api/addstudent`,
        structuredData,
        {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Student admission successful!");
        // ⚠️ FINAL FIX: Introduce a short delay before navigating to allow the database to stabilize
        // This resolves the issue where data isn't immediately visible after submission.
        setTimeout(() => {
            navigate("/students");
        }, 500); // 500ms delay 
      }
    } catch (err) {
      console.error("Form submission error:", err.response);

      if (err.response) {
        console.error("Error response:", err.response.data);
        alert(`Error: ${err.response.data.message || "Submission failed."}`);
      } else {
        alert("Network/server error. Try again.");
      }
    }
  };

  return (
    <MainLayout>
      <div className="p-8">
        <div className="bg-white rounded-2xl shadow p-6">
          <h4 className="text-2xl font-semibold mb-6 text-center">
            Student Admission
          </h4>

          {/* Student Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6 mb-6">
            <div className="rounded-lg p-6 shadow-lg bg-white w-full">
              <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
                <h4 className="text-xl font-semibold">Student Details</h4>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <InputField
                    label="First Name *"
                    value={formData.firstname}
                    onChange={(val) => handleChange("firstname", val)}
                  />
                  {errors.firstname && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstname}
                    </p>
                  )}
                </div>
                <InputField
                  label="Middle Name"
                  value={formData.middlename}
                  onChange={(val) => handleChange("middlename", val)}
                />
                <div>
                  <InputField
                    label="Last Name *"
                    value={formData.lastname}
                    onChange={(val) => handleChange("lastname", val)}
                  />
                  {errors.lastname && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastname}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <InputField
                    label="Date of Birth *"
                    type="date"
                    value={formData.dob}
                    onChange={(val) => handleChange("dob", val)}
                    max={getTodayDate()} // This restricts future dates
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
                  )}
                </div>
                <InputField
                  label="Place Of Birth"
                  value={formData.birthplace}
                  onChange={(val) => handleChange("birthplace", val)}
                />
                <div>
                  <SelectField
                    label="Blood Group *"
                    options={[ "Select", "a+", "a-", "b+", "b-", "ab+", "ab-", "o+", "o-"]}
                    value={formData.bloodgroup}
                    onChange={(val) => handleChange("bloodgroup", val)}
                  />
                   {errors.bloodgroup && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.bloodgroup}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <SelectField
                    label="Gender *"
                    options={["Select", "male", "female", "others"]}
                    value={formData.gender}
                    onChange={(val) => handleChange("gender", val)}
                  />
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.gender}
                    </p>
                  )}
                </div>
                <div>
                  <SelectField
                    label="Nationality *"
                    options={["Select", "Indian", "Other"]}
                    value={formData.nationality}
                    onChange={(val) => handleChange("nationality", val)}
                  />
                  {errors.nationality && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.nationality}
                    </p>
                  )}
                </div>
                <div>
                  {/* MODIFICATION HERE: Replace InputField with SelectField for Category */}
                  <SelectField
                    label="Category *"
                    options={["Select Category", "General", "OBC", "SC", "ST", "Other"]}
                    value={formData.category}
                    onChange={(val) => handleChange("category", val)}
                  />
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <div>
                  <InputField
                    label="Aadhaar Number *"
                    value={formData.aadharno}
                    onChange={(val) => handleChange("aadharno", val)}
                    placeholder="12-digit Aadhaar number"
                  />
                  {errors.aadharno && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.aadharno}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Photo Upload Section */}
            <div className="w-full flex flex-col items-center justify-between p-6 rounded-lg shadow-lg bg-white self-start">
              <div className="w-full h-48 bg-gray-200 rounded mb-2 flex items-center justify-center relative overflow-hidden shadow-inner">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <span className="text-sm text-gray-500">Preview</span>
                )}
              </div>
              <label className="bg-blue-400 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded cursor-pointer shadow-md">
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
              {photo && (
                <span className="text-xs text-gray-600 mt-1 max-w-[200px] truncate text-center">
                  {photo.name}
                </span>
              )}
            </div>
          </div>

          {/* Parent/Guardian Details */}
          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">
                Parent/Guardian Details
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <InputField
                  label="Father's Name *"
                  value={formData.fathername}
                  onChange={(val) => handleChange("fathername", val)}
                />
                {errors.fathername && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.fathername}
                  </p>
                )}
              </div>
              <div>
                <InputField
                  label="Mother's Name *"
                  value={formData.mothername}
                  onChange={(val) => handleChange("mothername", val)}
                />
                {errors.mothername && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.mothername}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <InputField
                label="Guardian's Name"
                value={formData.guardianname}
                onChange={(val) => handleChange("guardianname", val)}
              />
              <SelectField
                label="Relationship with Student"
                options={["Select", "father", "mother", "guardian", "other"]}
                value={formData.relationwithstudent}
                onChange={(val) => handleChange("relationwithstudent", val)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <InputField
                  label="Primary Contact Number *"
                  value={formData.primarycontact}
                  onChange={(val) => handleChange("primarycontact", val)}
                  placeholder="10-digit mobile number"
                />
                {errors.primarycontact && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.primarycontact}
                  </p>
                )}
              </div>
              <div>
                <InputField
                  label="Alternate Contact Number"
                  value={formData.alternatecontact}
                  onChange={(val) => handleChange("alternatecontact", val)}
                  placeholder="10-digit mobile number"
                />
                 {errors.alternatecontact && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.alternatecontact}
                    </p>
                  )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <InputField
                  label="Email Address"
                  value={formData.emailaddress}
                  onChange={(val) => handleChange("emailaddress", val)}
                  type="email"
                />
                {errors.emailaddress && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emailaddress}
                  </p>
                )}
              </div>
              <InputField
                label="Occupation"
                value={formData.occupation}
                onChange={(val) => handleChange("occupation", val)}
              />
            </div>
            <div className="mt-6">
              <InputField
                label="Annual Income"
                value={formData.annualincome}
                onChange={(val) => handleChange("annualincome", val)}
                type="number"
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">Address Information</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
              <div>
                 <InputField
                    label="Address Line 1 *"
                    value={formData.addressline1}
                    onChange={(val) => handleChange("addressline1", val)}
                  />
                  {errors.addressline1 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.addressline1}
                    </p>
                  )}
              </div>
              <InputField
                label="Address Line 2"
                value={formData.addressline2}
                onChange={(val) => handleChange("addressline2", val)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <InputField
                  label="City *"
                  value={formData.city}
                  onChange={(val) => handleChange("city", val)}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                )}
              </div>
              <div>
                <InputField
                  label="Postal Code *"
                  value={formData.postalcode}
                  onChange={(val) => handleChange("postalcode", val)}
                />
                {errors.postalcode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.postalcode}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <InputField
                label="District"
                value={formData.district}
                onChange={(val) => handleChange("district", val)}
              />
              <div>
                <InputField
                  label="State *"
                  value={formData.state}
                  onChange={(val) => handleChange("state", val)}
                />
                 {errors.state && (
                  <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <div>
                <InputField
                  label="Country *"
                  value={formData.country}
                  onChange={(val) => handleChange("country", val)}
                />
                 {errors.country && (
                  <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                )}
              </div>
            </div>
          </div>

          {/* Admission Details */}
          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">Admission Details</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <InputField
                  label="Admission for Grade/Standard *"
                  value={formData.admissionstd}
                  onChange={(val) => handleChange("admissionstd", val)}
                />
                {errors.admissionstd && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.admissionstd}
                  </p>
                )}
              </div>
              <InputField
                label="Division/Section"
                value={formData.admissiondivision}
                onChange={(val) => handleChange("admissiondivision", val)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <InputField
                  label="Academic Year *"
                  value={formData.academicyear}
                  onChange={(val) => handleChange("academicyear", val)}
                  placeholder="e.g., 2024-25"
                />
                 {errors.academicyear && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.academicyear}
                  </p>
                )}
              </div>
              <InputField
                label="Admission Date"
                type="date"
                value={formData.admissiondate}
                onChange={(val) => handleChange("admissiondate", val)}
                max={getTodayDate()} // Also restrict admission date to past dates
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <InputField
                label="Admission Number"
                value={formData.admissionno}
                onChange={(val) => handleChange("admissionno", val)}
                placeholder="Leave blank for auto-generation"
              />
              <InputField
                label="GR Number"
                value={formData.grno}
                onChange={(val) => handleChange("grno", val)}
                placeholder="Leave blank for auto-generation"
              />
            </div>
            <div className="mt-6">
              <SelectField
                label="Admission Type"
                options={["regular", "transfer", "other"]}
                value={formData.admissiontype}
                onChange={(value) => {
                  setAdmissionType(value);
                  handleChange("admissiontype", value);
                }}
              />
            </div>
          </div>

          {/* Academic Details - Show only for transfer admissions */}
          {(admissionType === "transfer" ||
            formData.admissiontype === "transfer") && (
            <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
              <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
                <h4 className="text-xl font-semibold">
                  Previous School Details
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
                <InputField
                  label="Last School Name"
                  value={formData.lastschoolname}
                  onChange={(val) => handleChange("lastschoolname", val)}
                />
                <InputField
                  label="Last Standard/Grade Attended"
                  value={formData.laststandardattended}
                  onChange={(val) => handleChange("laststandardattended", val)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <SelectField
                  label="Board"
                  options={["Select", "CBSE", "ICSE", "State Board", "Other"]}
                  value={formData.board}
                  onChange={(val) => handleChange("board", val)}
                />
                <SelectField
                  label="Medium of Instruction"
                  options={["Select", "English", "Hindi", "Marathi", "Other"]}
                  value={formData.mediuminstruction}
                  onChange={(val) => handleChange("mediuminstruction", val)}
                />
              </div>
              <div className="mt-6">
                <InputField
                  label="LC/TC Number"
                  value={formData.lcno}
                  onChange={(val) => handleChange("lcno", val)}
                />
              </div>
            </div>
          )}

          {/* Transport Details */}
          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">Transport Details</h4>
            </div>
            <div className="space-y-6 mt-6">
              <div>
                <SelectField
                  label="Do you require school transportation? *"
                  options={["Select", "yes", "no"]}
                  value={formData.transportstatus}
                  onChange={(val) => handleChange("transportstatus", val)}
                />
                {errors.transportstatus && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.transportstatus}
                  </p>
                )}
              </div>

              {formData.transportstatus === "yes" && (
                <>
                  <InputField
                    label="Pickup Point"
                    value={formData.pickuppoint}
                    onChange={(val) => handleChange("pickuppoint", val)}
                  />
                  <InputField
                    label="Drop Point"
                    value={formData.droppoint}
                    onChange={(val) => handleChange("droppoint", val)}
                  />
                </>
              )}

              <SelectField
                label="Mode of Transport"
                options={["Select", "bus", "van", "rickshaw", "self", "other"]}
                value={formData.modetransport}
                onChange={(val) => handleChange("modetransport", val)}
              />
            </div>
          </div>

          {/* Declaration */}
          <div className="rounded-lg p-6 shadow-lg bg-white mb-8">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">Declaration</h4>
            </div>
            <p className="text-sm text-gray-700 mt-6 mb-4">
              I hereby declare that the information provided above is accurate
              and true to the best of my knowledge. I agree to abide by the
              school's policies and code of conduct.
            </p>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="declaration"
                className="mr-2"
                checked={isDeclared}
                onChange={(e) => setIsDeclared(e.target.checked)}
              />
              <label htmlFor="declaration" className="text-sm text-gray-700">
                I agree to the terms and conditions
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={!isDeclared}
              className={`px-8 py-3 text-white rounded-md font-semibold ${
                isDeclared
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}