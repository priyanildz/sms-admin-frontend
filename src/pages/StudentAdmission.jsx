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













// import React, { useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import InputField from "../components/InputField";
// import SelectField from "../components/SelectField";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// // --- Import the API Base URL from the config file ---
// import { API_BASE_URL } from "../config"; 

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
//         if (!value || value === "Select Category" || value === "Select") errorMsg = "Please select an option";
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
//       
//       // ⚠️ Use a Unique ID for transportid, admissionno, and grno if the field is empty,
//       //    as these are required to be unique in your MongoDB schema.
//       const uniqueAdmissionNo = formData.admissionno || generateUniqueId();
//       const uniqueGrNo = formData.grno || generateUniqueId();
//       const uniqueTransportId = generateUniqueId();

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
//           grno: uniqueGrNo,                 // Use unique ID
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

//       // FIX: Using imported API_BASE_URL
//       const response = await axios.post(
//         `${API_BASE_URL}api/addstudent`,
//         structuredData,
//         {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         }
//       );

//       if (response.status === 200 || response.status === 201) {
//         alert("Student admission successful!");
//         // ⚠️ FINAL FIX: Introduce a short delay before navigating to allow the database to stabilize
//         // This resolves the issue where data isn't immediately visible after submission.
//         setTimeout(() => {
//             navigate("/students");
//         }, 500); // 500ms delay 
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
//                   <p className="text-red-500 text-xs mt-1">{errors.country}</p>
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






import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import axios from "axios";
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config";

// --- NEW DROPDOWN OPTIONS ---
const DEPARTMENTS = ["", "Teaching", "Non-Teaching", "Administration", "Transport", "Security"];
const GRADES = ["", "Nursery", "Junior", "Senior", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const POSITIONS = ["", "Principal", "Vice-Principal", "HOD", "Senior Teacher", "Junior Teacher", "Librarian", "IT Staff", "Bus Driver", "Cleaner"];
const DESIGNATIONS = [...POSITIONS]; 

// --- Configuration Assumptions ---
const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

// --- API Endpoints ---
const PIN_CODE_API_URL = "https://api.postalpincode.in/pincode/"; // Used for Postal Code lookup
const IFSC_API_URL = "https://ifsc.razorpay.com/"; // Unauthenticated endpoint for IFSC lookup

// Generate staff ID automatically
const generateStaffId = () => {
  const timestamp = Date.now().toString().slice(-6);
  const randomNum = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, "0");
  return `STF${timestamp}${randomNum}`;
};

export default function StaffRegistration() {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isDeclared, setIsDeclared] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState("");
  // State to track if city/state fields were auto-populated via PIN code
  const [isAddressAutoPopulated, setIsAddressAutoPopulated] = useState(false);
  // State to track if bank details were auto-populated via IFSC code
  const [isBankAutoPopulated, setIsBankAutoPopulated] = useState(false);


  // Get today's date in YYYY-MM-DD format for max date restriction
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    staffid: generateStaffId(),
    firstname: "",
    middlename: "",
    lastname: "",
    dob: "",
    maritalstatus: "",
    bloodgroup: "",
    gender: "",
    nationality: "",
    category: "",
    aadharno: "",
    phoneno: "",
    alternatephoneno: "",
    emailaddress: "",
    password: "teacher@123",
    addressline1: "",
    addressline2: "",
    city: "", // Auto-populated
    postalcode: "",
    district: "", // Auto-populated
    state: "", // Auto-populated
    country: "",
    photo: "",
    // Educational fields are now mandatory
    highestqualification: "", // MANDATORY
    yearofpassing: "", // MANDATORY
    specialization: "",
    certificates: "",
    universityname: "", // MANDATORY
    totalexperience: "",
    designation: "",
    previousemployer: "",
    subjectstaught: "",
    reasonforleaving: "",
    position: "",
    dept: "",
    preferredgrades: "",
    // Bank fields are now mandatory
    bankname: "", // MANDATORY, Auto-populated
    branchname: "", // MANDATORY, Auto-populated
    accno: "", // MANDATORY
    ifccode: "", // MANDATORY, Trigger auto-populate
    panno: "", // **MANDATORY**
    transportstatus: "",
    pickuppoint: "",
    droppoint: "",
    modetransport: "",
    status: true, // Default to Active
    documentsurl: [],
  });


  // --------------------------------------------------------
  // 🆕 API LOOKUP FUNCTIONS (Postal Code and IFSC)
  // --------------------------------------------------------

  // Function to fetch bank details using IFSC code (Razorpay API)
  const fetchBankDetailsByIFSC = async (ifsc) => {
    setErrors((prev) => ({ ...prev, ifccode: "Fetching bank details..." }));
    try {
      const response = await axios.get(`${IFSC_API_URL}${ifsc}`);
      
      // Razorpay API returns a 404 for invalid IFSC, but sometimes 200 with error info.
      // Check if the response object has a BANK property (indicating success)
      if (response.data && response.data.BANK) {
        // Update form data with auto-populated fields
        setFormData(prev => ({
          ...prev,
          bankname: response.data.BANK, 
          branchname: response.data.BRANCH,
        }));
        setIsBankAutoPopulated(true);
        setErrors(prev => ({ ...prev, ifccode: "" })); // Clear loading/previous error
      } else {
        // Handle API success but invalid code (e.g., API returns { "error": true, ... })
        setErrors(prev => ({ ...prev, ifccode: "Invalid IFSC Code. Bank not found." }));
        setIsBankAutoPopulated(false);
      }
    } catch (error) {
      // Handle network error or 404 from API
      const errorMessage = error.response?.status === 404 ? "Invalid IFSC Code. Bank not found." : "Error fetching bank data.";
      setErrors(prev => ({ ...prev, ifccode: errorMessage }));
      setIsBankAutoPopulated(false);
    }
  };


  // Function to fetch address details using PIN code (Postalpincode API)
  const fetchAddressByPin = async (pincode) => {
    setErrors((prev) => ({ ...prev, postalcode: "Fetching address..." }));
    try {
      const response = await axios.get(`${PIN_CODE_API_URL}${pincode}`);
      
      if (response.data && response.data[0].Status === 'Success' && response.data[0].PostOffice.length > 0) {
        const postOffice = response.data[0].PostOffice[0];
        
        // Update form data with auto-populated fields
        setFormData(prev => ({
          ...prev,
          city: postOffice.Region || postOffice.Name, // Using Block/Name for City
          district: postOffice.District,
          state: postOffice.State,
          country: 'India', 
        }));
        setIsAddressAutoPopulated(true);
        setErrors(prev => ({ ...prev, postalcode: "" })); // Clear loading/previous error
      } else {
        setErrors(prev => ({ ...prev, postalcode: "Invalid PIN Code. Address not found." }));
        setIsAddressAutoPopulated(false);
      }
    } catch (error) {
      console.error("Error fetching PIN code data:", error);
      setErrors(prev => ({ ...prev, postalcode: "Error contacting address service." }));
      setIsAddressAutoPopulated(false);
    }
  };


  // --------------------------------------------------------
  // VALIDATION AND CHANGE HANDLERS
  // --------------------------------------------------------

  // New validation function for individual fields
  const validateField = (field, value) => {
    let errorMsg = "";
    switch (field) {
      // Required text fields
      case "firstname":
      case "lastname":
      case "addressline1":
      case "city":
      case "postalcode":
      case "district":
      case "state":
      case "country":
        if (!value.trim()) errorMsg = "This field is required";
        break;
    
      // --- MANDATORY FIELDS (Educational) ---
      case "highestqualification":
      case "yearofpassing":
      case "universityname":
        if (!value.trim()) errorMsg = "This educational detail is mandatory";
        break;

      // --- MANDATORY FIELDS (Bank) ---
      case "bankname":
      case "branchname":
      case "accno":
      case "ifccode":
      case "panno": // PAN mandatory
        if (!value.trim()) errorMsg = "This detail is mandatory";
        break;

      // Required select/dropdown fields
      case "gender":
      case "nationality":
      case "category":
      case "maritalstatus":
      case "bloodgroup":
      case "position":
      case "designation":
      case "dept":
      case "transportstatus":
        if (!value || value === "") errorMsg = "Please select an option";
        break;

      // Date of Birth validation
      case "dob": {
        if (!value) {
          errorMsg = "Date of birth is required";
          break;
        }
        const selectedDate = new Date(value);
        const today = new Date();
        if (selectedDate > today) {
          errorMsg = "Date of birth cannot be in the future";
          break;
        }
        const age = today.getFullYear() - selectedDate.getFullYear();
        const monthDiff = today.getMonth() - selectedDate.getMonth();
        const dayDiff = today.getDate() < selectedDate.getDate();
        const actualAge =
          monthDiff < 0 || (monthDiff === 0 && dayDiff) ? age - 1 : age;
        if (actualAge < 18) {
          errorMsg = "Staff member must be at least 18 years old";
        }
        break;
      }

      // Email validation
      case "emailaddress":
        if (!value.trim()) errorMsg = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(value))
          errorMsg = "Please enter a valid email address";
        break;

      // Phone number validation
      case "phoneno":
        if (!value.trim()) errorMsg = "Phone number is required";
        else if (!/^\d{10}$/.test(value))
          errorMsg = "Phone number must be 10 digits";
        break;

      // Aadhaar number validation (now required)
      case "aadharno":
        if (!value.trim()) errorMsg = "Aadhaar number is required";
        else if (!/^\d{12}$/.test(value))
          errorMsg = "Aadhaar number must be 12 digits";
        break;

      // PAN validation 
      case "panno":
        if (!value.trim()) errorMsg = "PAN number is mandatory";
        else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value))
          errorMsg = "Invalid PAN number format (e.g., ABCDE1234F)";
        break;

      // IFSC code validation (mandatory and validated)
      case "ifccode":
        if (!value.trim()) errorMsg = "IFSC code is mandatory";
        else if (value && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value))
          errorMsg = "Invalid IFSC code format";
        break;
      
      // Transport fields validation (only mandatory if status is 'Yes')
      case "pickuppoint":
      case "droppoint":
      case "modetransport":
        if (formData.transportstatus === 'Yes' && !value.trim()) {
          errorMsg = "This transport detail is required when transport is needed.";
        }
        break;

      default:
        errorMsg = "";
    }
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    return errorMsg === ""; // Return true if valid, false if invalid
  };

  // Refactored form validation for submission
  const validateForm = () => {
    const requiredFields = [
      "firstname", "lastname", "dob", "gender", "nationality", "category", "maritalstatus",
      "bloodgroup", "phoneno", "emailaddress", "addressline1", "city", "postalcode",
      "district", "state", "country", "aadharno",
      // Mandatory Fields
      "highestqualification", "yearofpassing", "universityname",
      "bankname", "branchname", "accno", "ifccode", "panno",
      "position", "dept", "transportstatus",
    ];
    
    // Add conditional fields if transport is required
    if (formData.transportstatus === 'Yes') {
      requiredFields.push("pickuppoint", "droppoint", "modetransport");
    }

    let isValid = true;
    requiredFields.forEach((field) => {
      // Skip address field validation ONLY if auto-populated via PIN code
      const isAddressField = (field === 'city' || field === 'district' || field === 'state' || field === 'country');
      if (isAddressField && isAddressAutoPopulated && formData[field]) {
        return;
      }
      // Skip bank field validation ONLY if auto-populated via IFSC code
      const isBankField = (field === 'bankname' || field === 'branchname');
      if (isBankField && isBankAutoPopulated && formData[field]) {
        return;
      }
      
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });
    return isValid;
  };

  // Updated handleChange to handle auto-population and conditional logic
  const handleChange = (field, value) => {
    let newFormData = { ...formData, [field]: value };
    
    // ----------------------------------------------------------------------
    // --- 1. Handle Postal Code Auto-Population Logic (Triggers API call) ---
    // ----------------------------------------------------------------------
    if (field === 'postalcode') {
      // Clear dependent address fields on change
      newFormData = {
        ...newFormData,
        city: '',
        district: '',
        state: '',
        country: '',
      };
      setIsAddressAutoPopulated(false);
      // Trigger API call if length is exactly 6 and looks valid
      if (value.length === 6 && /^\d{6}$/.test(value)) {
        fetchAddressByPin(value);
      }
    }

    // ----------------------------------------------------------------------
    // --- 2. Handle IFSC Auto-Population Logic (Triggers API call) ---
    // ----------------------------------------------------------------------
    if (field === 'ifccode') {
      // Clear dependent bank fields on change
      newFormData.bankname = '';
      newFormData.branchname = '';
      setIsBankAutoPopulated(false);

      // IFSC code validation regex: 4 letters, 0 (5th char), 6 alphanumeric
      if (value.length === 11 && /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value.toUpperCase())) {
        fetchBankDetailsByIFSC(value);
      }
    }
    
    // ----------------------------------------------------------------------
    // --- 3. Handle Transport Conditional Removal ---
    // ----------------------------------------------------------------------
    if (field === 'transportstatus' && value === 'No') {
      // Clear non-required transport fields
      newFormData.pickuppoint = '';
      newFormData.droppoint = '';
      newFormData.modetransport = '';
      // Clear errors for conditional fields
      setErrors((prev) => ({ 
        ...prev, 
        pickuppoint: '', 
        droppoint: '',
        modetransport: '',
      }));
    }


    setFormData(newFormData);
    
    // Trigger validation
    validateField(field, value);
  };

  // The rest of the functions (uploadToCloudinary, handlePhotoChange, handleDocumentUpload, handleStatusToggle, handleSubmit) remain unchanged...

  const uploadToCloudinary = async (file, docType, customName) => {
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("upload_preset", "sspd-student-management");
    uploadFormData.append("folder", `staff_documents/${docType}`);
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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Image file size should be less than 5MB");
        return;
      }

      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    const selectedDoc = e.target.getAttribute("data-doc-type");

    if (!selectedDoc) {
      alert("Please select a document type first");
      return;
    }

    const validFiles = files.filter((file) => {
      const isValidType =
        file.type === "application/pdf" || file.type.startsWith("image/");
      if (!isValidType) {
        alert(
          `${file.name} is not a valid file type. Please upload PDF or image files only.`
        );
        return false;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum file size is 10MB.`);
        return false;
      }

      return true;
    });

    if (validFiles.length === 0) return;

    const newDocuments = validFiles.map((file) => ({
      name: file.name,
      type: selectedDoc,
      file: file,
    }));

    setDocuments((prev) => [...prev, ...newDocuments]);
    e.target.value = "";
  };

  const handleStatusToggle = () => {
    const newStatus = !formData.status;
    handleChange("status", newStatus);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("Please fill in all required fields correctly");
      return;
    }

    if (!isDeclared) {
      alert("Please accept the terms and conditions");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create a clean copy of the data to be submitted
      const submissionData = { ...formData };

      // Improvement: Remove empty optional fields to avoid potential backend issues
      Object.keys(submissionData).forEach(key => {
        if (submissionData[key] === "" || submissionData[key] === null) {
          delete submissionData[key];
        }
      });


      if (photo) {
        console.log("Uploading photo...");
        const photoUrl = await uploadToCloudinary(
          photo,
          "photos",
          `${formData.firstname}_${formData.lastname}`
        );
        submissionData.photo = photoUrl;
      }

      const documentUrls = [];
      if (documents.length > 0) {
          for (const doc of documents) {
              console.log(`Uploading ${doc.name}...`);
              const url = await uploadToCloudinary(
                  doc.file,
                  doc.type,
                  `${formData.firstname}_${formData.lastname}_${doc.type}`
              );
              documentUrls.push({
                  url: url,
                  type: doc.type,
                  name: doc.name,
              });
          }
      }

      submissionData.documentsurl = documentUrls;

      console.log("All files uploaded, submitting form...");
      console.log("Submission data:", submissionData);

    const response = await axios.post(
        `${API_BASE_URL}api/addstaff`,
        submissionData,
        {
          headers: {
            "Content-Type": "application/json",
            auth: AUTH_HEADER,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setFormSubmitted(true);
        alert("Staff registration successful!");
      }
    } catch (err) {
      console.error("Error submitting form:", err);

      if (err.response) {
        console.error("Server Response:", err.response.data);
        // Display a more specific error from the backend if available
        const errorMsg = err.response.data.error || err.response.data.message || "Registration failed.";
        alert(`Error: ${errorMsg}`);
      } else {
        alert("Network error or server not reachable.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLabel = (type) => {
    switch (type) {
      case "photo":
        return "Staff Photo";
      case "aadhaar":
        return "Aadhaar Card";
      case "resume":
        return "Resume/CV";
      case "certificates":
        return "Educational Certificates";
      case "experience":
        return "Experience Letters";
      default:
        return "";
    }
  };

  if (formSubmitted) {
    return (
      <MainLayout>
        <div className="p-8 text-center">
          <div className="bg-white rounded-2xl shadow p-12 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              Staff Registered Successfully!
            </h2>
            <p className="text-gray-700 text-lg">
              Staff ID: {formData.staffid || "Generated automatically"}
            </p>
            <p className="text-gray-700 text-lg">
              Status: {formData.status ? "Active" : "Inactive"}
            </p>
            <p className="text-gray-700 text-lg">
              The staff member's information has been saved to the system.
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-8">
        <div className="bg-white rounded-2xl shadow p-6">
          <h4 className="text-2xl font-semibold mb-6 text-center">
            Staff Registration
          </h4>

          {/* Staff Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6 mb-6">
            {/* Staff Details Container */}
            <div className="rounded-lg p-6 shadow-lg bg-white w-full">
              <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
                <h4 className="text-xl font-semibold">Staff Details</h4>
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
                    max={getTodayDate()}
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
                  )}
                </div>
                <div>
                  <SelectField
                    label="Marital Status *"
                    options={["", "Single", "Married", "Divorced", "Widowed"]}
                    value={formData.maritalstatus}
                    onChange={(val) => handleChange("maritalstatus", val)}
                  />
                  {errors.maritalstatus && (
                    <p className="text-red-500 text-xs mt-1">{errors.maritalstatus}</p>
                  )}
                </div>
                <div>
                  <SelectField
                    label="Blood Group *"
                    options={["", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
                    value={formData.bloodgroup}
                    onChange={(val) => handleChange("bloodgroup", val)}
                  />
                  {errors.bloodgroup && (
                    <p className="text-red-500 text-xs mt-1">{errors.bloodgroup}</p>
                  )}
                </div>
                </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <SelectField
                    label="Gender *"
                    options={["", "Male", "Female", "Other"]}
                    value={formData.gender}
                    onChange={(val) => handleChange("gender", val)}
                  />
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                  )}
                </div>
                <div>
                  <SelectField
                    label="Nationality *"
                    options={["", "Indian", "Other"]}
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
                  <SelectField
                    label="Category *"
                    options={["", "General", "OBC", "SC", "ST", "Other"]}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <InputField
                    label="Aadhar Number *"
                    value={formData.aadharno}
                    onChange={(val) => handleChange("aadharno", val)}
                  />
                  {errors.aadharno && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.aadharno}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Photo Upload Section with Status Toggle */}
            <div className="w-full flex flex-col items-center justify-between p-6 rounded-lg shadow-lg bg-white self-start">
              <div className="w-full h-48 bg-gray-200 rounded mb-2 flex items-center justify-center relative overflow-hidden shadow-inner">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <span className="text-sm text-gray-500">Photo Preview</span>
                )}
              </div>
              <label className="bg-blue-400 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded cursor-pointer shadow-md mb-2">
                Choose Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
              {photo && (
                <span className="text-xs text-gray-600 mb-4 max-w-[200px] truncate text-center">
                  {photo.name}
                </span>
              )}

              {/* Status Toggle */}
              <div className="w-full border-t pt-4 mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                  Staff Status
                </label>
                <div className="flex items-center justify-center">
                  <span
                    className={`text-sm font-medium mr-3 ${
                      !formData.status ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    Resigned
                  </span>
                  <button
                    type="button"
                    onClick={handleStatusToggle}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      formData.status ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
                        formData.status ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span
                    className={`text-sm font-medium ml-3 ${
                      formData.status ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    Active
                  </span>
                </div>
                <div className="text-center mt-2">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      formData.status
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {formData.status ? "Active" : "Resigned"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">Contact Details</h4>
              </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <InputField
                  label="Phone Number (Primary) *"
                  value={formData.phoneno}
                  onChange={(val) => handleChange("phoneno", val)}
                />
                {errors.phoneno && (
                  <p className="text-red-500 text-xs mt-1">{errors.phoneno}</p>
                )}
              </div>
              <InputField
                label="Alternate Phone Number"
                value={formData.alternatephoneno}
                onChange={(val) => handleChange("alternatephoneno", val)}
              />
            </div>
            <div className="mt-6">
              <div>
                <InputField
                  label="Email Address *"
                  type="email"
                  value={formData.emailaddress}
                  onChange={(val) => handleChange("emailaddress", val)}
                />
                {errors.emailaddress && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emailaddress}
                  </p>
                )}
              </div>
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
              {/* CITY - NOW AUTO-POPULATED/READONLY */}
              <div>
                <InputField
                  label="City *"
                  value={formData.city}
                  onChange={(val) => handleChange("city", val)}
                  readOnly={isAddressAutoPopulated} 
                  className={isAddressAutoPopulated ? 'bg-gray-100' : ''}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* DISTRICT - NOW AUTO-POPULATED/READONLY */}
              <div>
                <InputField
                  label="District *"
                  value={formData.district}
                  onChange={(val) => handleChange("district", val)}
                  readOnly={isAddressAutoPopulated}
                  className={isAddressAutoPopulated ? 'bg-gray-100' : ''}
                />
                {errors.district && (
                  <p className="text-red-500 text-xs mt-1">{errors.district}</p>
                )}
              </div>
              {/* STATE - NOW AUTO-POPULATED/READONLY */}
              <div>
                <InputField
                  label="State *"
                  value={formData.state}
                  onChange={(val) => handleChange("state", val)}
                  readOnly={isAddressAutoPopulated}
                  className={isAddressAutoPopulated ? 'bg-gray-100' : ''}
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
                  readOnly={isAddressAutoPopulated}
                  className={isAddressAutoPopulated ? 'bg-gray-100' : ''}
                />
                {errors.country && (
                  <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                )}
              </div>
            </div>
          </div>

          {/* Educational Qualification */}
          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">
                Educational Qualification
              </h4>
              </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Highest Qualification - MANDATORY */}
              <div>
                <InputField
                  label="Highest Qualification *"
                  value={formData.highestqualification}
                  onChange={(val) => handleChange("highestqualification", val)}
                />
                {errors.highestqualification && (
                  <p className="text-red-500 text-xs mt-1">{errors.highestqualification}</p>
                )}
              </div>

              {/* Year of Passing - MANDATORY */}
              <div>
                <InputField
                  label="Year of Passing *"
                  value={formData.yearofpassing}
                  onChange={(val) => handleChange("yearofpassing", val)}
                />
                {errors.yearofpassing && (
                  <p className="text-red-500 text-xs mt-1">{errors.yearofpassing}</p>
                )}
              </div>
            </div>
            <div className="space-y-6 mt-6">
              <InputField
                label="Specialization/Subject Expertise"
                value={formData.specialization}
                onChange={(val) => handleChange("specialization", val)}
              />
              <InputField
                label="Additional Certificates"
                value={formData.certificates}
                onChange={(val) => handleChange("certificates", val)}
              />
              {/* University Name - MANDATORY */}
              <div>
                <InputField
                  label="University Name *"
                  value={formData.universityname}
                  onChange={(val) => handleChange("universityname", val)}
                />
                {errors.universityname && (
                  <p className="text-red-500 text-xs mt-1">{errors.universityname}</p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">Professional Experience</h4>
              </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <InputField
                label="Total Experience (in years)"
                value={formData.totalexperience}
                onChange={(val) => handleChange("totalexperience", val)}
              />
              
              {/* Designation - NOW DROPDOWN */}
              <div>
                <SelectField
                  label="Designation *"
                  options={DESIGNATIONS}
                  value={formData.designation}
                  onChange={(val) => handleChange("designation", val)}
                />
                {errors.designation && (
                  <p className="text-red-500 text-xs mt-1">{errors.designation}</p>
                )}
              </div>
            </div>
            <div className="space-y-6 mt-6">
              <InputField
                label="Previous Employer Name"
                value={formData.previousemployer}
                onChange={(val) => handleChange("previousemployer", val)}
              />
              <InputField
                label="Subjects Taught"
                value={formData.subjectstaught}
                onChange={(val) => handleChange("subjectstaught", val)}
              />
              <InputField
                label="Reason for Leaving Previous Job"
                value={formData.reasonforleaving}
                onChange={(val) => handleChange("reasonforleaving", val)}
              />
            </div>
            </div>

          {/* Role & Department */}
          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">
                Role & Department Details
              </h4>
              </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Position - NOW DROPDOWN */}
              <div>
                <SelectField
                  label="Position Applied For *"
                  options={POSITIONS}
                  value={formData.position}
                  onChange={(val) => handleChange("position", val)}
                />
                {errors.position && (
                  <p className="text-red-500 text-xs mt-1">{errors.position}</p>
                )}
              </div>

              {/* Department - NOW DROPDOWN */}
              <div>
                <SelectField
                  label="Department *"
                  options={DEPARTMENTS}
                  value={formData.dept}
                  onChange={(val) => handleChange("dept", val)}
                />
                {errors.dept && (
                  <p className="text-red-500 text-xs mt-1">{errors.dept}</p>
                )}
              </div>
            </div>
            <div className="space-y-6 mt-6">
              {/* Preferred Grades - NOW DROPDOWN */}
              <SelectField
                label="Preferred Grades/Classes (Multi-Select if needed)"
                options={GRADES}
                // Note: Multi-select requires updating the component logic/schema, 
                // keeping as single select per original field structure
                value={formData.preferredgrades}
                onChange={(val) => handleChange("preferredgrades", val)}
              />
              <InputField
                label="Joining Date"
                type="date"
                value={formData.joiningdate}
                onChange={(val) => handleChange("joiningdate", val)}
              />
            </div>
          </div>

          {/* Bank & Salary Details - MANDATORY SECTION */}
          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">Bank & Salary Details *</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Bank Name - NOW AUTO-POPULATED/MANDATORY */}
              <div>
                <InputField
                  label="Bank Name *"
                  value={formData.bankname}
                  onChange={(val) => handleChange("bankname", val)}
                  readOnly={isBankAutoPopulated}
                  className={isBankAutoPopulated ? 'bg-gray-100' : ''}
                />
                {errors.bankname && (
                  <p className="text-red-500 text-xs mt-1">{errors.bankname}</p>
                )}
              </div>

              {/* Branch Name - NOW AUTO-POPULATED/MANDATORY */}
              <div>
                <InputField
                  label="Branch Name *"
                  value={formData.branchname}
                  onChange={(val) => handleChange("branchname", val)}
                  readOnly={isBankAutoPopulated}
                  className={isBankAutoPopulated ? 'bg-gray-100' : ''}
                />
                {errors.branchname && (
                  <p className="text-red-500 text-xs mt-1">{errors.branchname}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Account Number - MANDATORY */}
              <div>
                <InputField
                  label="Account Number *"
                  value={formData.accno}
                  onChange={(val) => handleChange("accno", val)}
                />
                {errors.accno && (
                  <p className="text-red-500 text-xs mt-1">{errors.accno}</p>
                )}
              </div>

              {/* IFSC Code - MANDATORY + Trigger Auto-Populate */}
              <div>
                <InputField
                  label="IFSC Code *"
                  value={formData.ifccode}
                  onChange={(val) => handleChange("ifccode", val)}
                />
                {errors.ifccode && (
                  <p className="text-red-500 text-xs mt-1">{errors.ifccode}</p>
                )}
              </div>
              
            </div>
            <div className="mt-6">
              <div>
                <InputField
                  label="PAN Number *" // Label updated
                  value={formData.panno}
                  onChange={(val) => handleChange("panno", val)}
                />
                {errors.panno && (
                  <p className="text-red-500 text-xs mt-1">{errors.panno}</p>
                )}
              </div>
            </div>
          </div>

          {/* Transport Details */}
          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">Transport Details</h4>
            </div>
            <div className="space-y-6 mt-6">
              <div>
                <SelectField
                  label="Transport Required? *"
                  options={["", "Yes", "No"]}
                  value={formData.transportstatus}
                  onChange={(val) => handleChange("transportstatus", val)}
                />
                {errors.transportstatus && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.transportstatus}
                  </p>
                )}
              </div>

              {formData.transportstatus === 'Yes' && (
                <>
                  <div>
                    <InputField
                      label="Pickup Point *"
                      value={formData.pickuppoint}
                      onChange={(val) => handleChange("pickuppoint", val)}
                    />
                    {errors.pickuppoint && (
                      <p className="text-red-500 text-xs mt-1">{errors.pickuppoint}</p>
                    )}
                  </div>
                  
                  <div>
                    <InputField
                      label="Drop Point *"
                      value={formData.droppoint}
                      onChange={(val) => handleChange("droppoint", val)}
                    />
                    {errors.droppoint && (
                      <p className="text-red-500 text-xs mt-1">{errors.droppoint}</p>
                    )}
                  </div>
                  
                  <div>
                    <SelectField
                      label="Mode of Transport *"
                      options={[
                        "",
                        "School Bus",
                        "Personal Vehicle",
                        "Public Transport",
                      ]}
                      value={formData.modetransport}
                      onChange={(val) => handleChange("modetransport", val)}
                    />
                    {errors.modetransport && (
                      <p className="text-red-500 text-xs mt-1">{errors.modetransport}</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Document Upload */}
          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">Upload Documents</h4>
            </div>

            <div className="space-y-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Document Type *
                </label>
                <select
                  className="block w-full border border-gray-300 rounded px-3 py-2"
                  value={selectedDoc}
                  onChange={(e) => setSelectedDoc(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="resume">Resume/CV</option>
                  <option value="aadhaar">Aadhaar Card</option>
                  <option value="certificates">Educational Certificates</option>
                  <option value="experience">Experience Letters</option>
                </select>
              </div>

              {selectedDoc && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload {getLabel(selectedDoc)}
                  </label>
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    multiple
                    onChange={handleDocumentUpload}
                    data-doc-type={selectedDoc}
                    className="block w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              )}
              {documents.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    Uploaded Documents:
                  </h5>
                  <div className="space-y-2">
                    {documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded"
                      >
                        <div className="flex items-center gap-2">
                          <span>📄</span>
                          <span className="text-sm">{doc.name}</span>
                          <span className="text-xs text-gray-500">
                            ({doc.type})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
              disabled={!isDeclared || isSubmitting}
              className={`px-8 py-3 text-white font-semibold rounded-lg ${
                isDeclared && !isSubmitting
                  ? "bg-blue-500 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              } transition-all duration-200`}
            >
              {isSubmitting ? "Submitting..." : "Submit Registration"}
            </button>
          </div>
        </div>
        </div>
    </MainLayout>
  );
}