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





// import React, { useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import InputField from "../components/InputField";
// import SelectField from "../components/SelectField";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// // --- Import the API Base URL from the config file ---
// import { API_BASE_URL } from "../config"; 

// // --- Helper Functions for Academic Year ---
// const getCurrentAcademicYear = () => {
//     const year = new Date().getFullYear();
//     const month = new Date().getMonth();
//     // Assuming academic year starts in April (month index 3)
//     if (month >= 3) {
//         return `${year}-${String(year + 1).slice(2)}`;
//     } else {
//         return `${year - 1}-${String(year).slice(2)}`;
//     }
// };

// const getAcademicYearOptions = () => {
//     const currentYear = getCurrentAcademicYear();
//     const startYear = parseInt(currentYear.split('-')[0]);
    
//     // Calculate Next Year: Next Academic Year starts one year after the current start year
//     const nextStartYear = startYear + 1;
//     const nextAcademicYear = `${nextStartYear}-${String(nextStartYear + 1).slice(2)}`;

//     return [
//         { value: currentYear, label: `Current Year (${currentYear})` },
//         { value: nextAcademicYear, label: `Next Year (${nextAcademicYear})` },
//     ];
// };

// // --- Custom Options for Standard and Division ---
// const STANDARD_OPTIONS = [
//   "Select Standard",
//   "Nursery",
//   "Junior",
//   "Senior",
//   "1",
//   "2",
//   "3",
//   "4",
//   "5",
//   "6",
//   "7",
//   "8",
//   "9",
//   "10"
// ];
// const DIVISION_OPTIONS = ["Select Division", "A", "B", "C", "D", "E"];
// // Only divisions A-E are available for random assignment
// const RANDOM_DIVISIONS = ["A", "B", "C", "D", "E"]; 

// // --- Document Options (RESTRICTED AS REQUESTED) ---
// const DOCUMENT_OPTIONS = [
//     "Select Document Type",
//     "Aadhaar Card",
//     "Birth Certificate",
// ];

// export default function StudentAdmission() {
//   const navigate = useNavigate();
//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [photo, setPhoto] = useState(null); // Main Photo File object
//   const [admissionType, setAdmissionType] = useState("regular");
//   const [isDeclared, setIsDeclared] = useState(false);

//   // Error state to hold validation messages
//   const [errors, setErrors] = useState({});

//   // 🆕 Document Upload State for pending files
//   // Stores map of { documentType: FileObject }
//   const [pendingDocuments, setPendingDocuments] = useState({});
//   const [currentDocType, setCurrentDocType] = useState(DOCUMENT_OPTIONS[0]);

//   // Get today's date in YYYY-MM-DD format (used for max date restriction and default value)
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
//     birthplace: "", // Needs to be required
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
//     country: "India",

//     // Admission details
//     admissionstd: "", 
//     admissiondivision: "", 
//     academicyear: getCurrentAcademicYear(),
//     admissiontype: "regular",
//     lastschoolname: "",
//     laststandardattended: "",
//     board: "",
//     mediuminstruction: "",
//     lcno: "",
//     admissiondate: getTodayDate(), 
//     admissionno: "",
//     grno: "",

//     // Transport details
//     transportstatus: "",
//     pickuppoint: "",
//     droppoint: "",
//     modetransport: "",
//   });


//   // 🆕 PIN Code Lookup Logic
//   const fetchAddressByPin = async (pincode) => {
//     if (!/^\d{6}$/.test(pincode)) {
//       return; // Only proceed if it looks like a valid 6-digit PIN code
//     }
//     try {
//       // Using a public API for India PIN codes (postalpincode.in)
//       const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
//       
//       if (response.data && response.data[0].Status === 'Success') {
//         const postOffice = response.data[0].PostOffice[0];
//         
//         setFormData(prev => ({
//           ...prev,
//           city: postOffice.Block || postOffice.Block, 
//           district: postOffice.District,
//           state: postOffice.State,
//           country: 'India', 
//         }));
//         setErrors(prev => ({ ...prev, postalcode: "" }));
//       } else {
//         setErrors(prev => ({ ...prev, postalcode: "Invalid PIN Code" }));
//       }
//     } catch (error) {
//       console.error("Error fetching PIN code data:", error);
//       setErrors(prev => ({ ...prev, postalcode: "Error fetching address data" }));
//     }
//   };


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
//       case "birthplace": // 🛑 MADE REQUIRED
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
//       case "category": 
//       case "admissionstd": 
//         if (!value || value.includes("Select")) errorMsg = "Please select an option";
//         break;
//       case "academicyear": 
//         if (!value) errorMsg = "Academic Year is required";
//         break;
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
//         else if (!/^\d{6}$/.test(value)) errorMsg = "PIN code must be 6 digits";
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

//     // Trigger PIN code lookup when postal code is entered/changed and is 6 digits
//     if (field === "postalcode" && value.length === 6 && /^\d{6}$/.test(value)) {
//         fetchAddressByPin(value);
//     } else if (field === "postalcode" && value.length < 6) {
//         // Clear dependent fields if postal code is incomplete/deleted
//         setFormData(prev => ({ ...prev, city: '', district: '', state: '' }));
//     }
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Basic file validation remains here for instant user feedback
//       if (!file.type.startsWith("image/")) {
//         alert("Please select a valid image file");
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         alert("Image file size should be less than 5MB");
//         return;
//       }
//       setPhoto(file);
//       setPhotoPreview(URL.createObjectURL(file));
//     }
//   };
  
//   // 🆕 Handler for document file input
//   const handleDocumentFileChange = (e, docType) => {
//       const file = e.target.files[0];
//       if (file) {
//           // Basic file validation
//           if (file.size > 10 * 1024 * 1024) { // e.g., Max 10MB for documents
//               alert("Document file size should be less than 10MB");
//               e.target.value = null; // Clear input
//               return;
//           }
//           setPendingDocuments(prev => ({ ...prev, [docType]: file }));
//       } else {
//           // If input is cleared, remove the pending document
//           setPendingDocuments(prev => {
//               const newDocs = { ...prev };
//               delete newDocs[docType];
//               return newDocs;
//           });
//       }
//   };


//   // Generate unique IDs
//   const generateUniqueId = () => {
//     return Date.now().toString() + Math.random().toString(36).substr(2, 9);
//   };

//   // Upload file to Cloudinary (Single file upload helper)
//   const uploadToCloudinary = async (file, docType, customName) => {
//     const uploadFormData = new FormData();
//     uploadFormData.append("file", file);
//     uploadFormData.append("upload_preset", "sspd-student-management");
//     uploadFormData.append("folder", `student_documents`); // Use one general folder for security reasons
//     uploadFormData.append("public_id", customName);

//     try {
//       const res = await axios.post(
//         "https://api.cloudinary.com/v1_1/dyloa2svi/auto/upload",
//         uploadFormData
//       );
//       return { url: res.data.secure_url, filename: file.name };
//     } catch (err) {
//       console.error("Upload error:", err);
//       throw err;
//     }
//   };


//   const validateForm = () => {
//     const fieldsToValidate = [
//       "firstname", "lastname", "dob", "gender", "bloodgroup",
//       "category", 
//       "nationality", "aadharno", "fathername", "mothername",
//       "primarycontact", "addressline1", "city", "postalcode",
//       "state", "country", "admissionstd", "academicyear", "transportstatus",
//       "birthplace" // 🛑 ADDED TO VALIDATION
//     ];

//     let isValid = true;
//     fieldsToValidate.forEach((field) => {
//       if (field === "admissiondivision") return; 

//       const valid = validateField(field, formData[field]);
//       if (!valid) isValid = false;
//     });

//     if (!isDeclared) {
//       alert("You must agree to the declaration before submitting.");
//       isValid = false;
//     }

//     if (formData.admissionstd.includes("Select")) {
//       setErrors(prev => ({ ...prev, admissionstd: "Please select a standard." }));
//       isValid = false;
//     }

//     const academicOptions = getAcademicYearOptions().map(opt => opt.value);
//     if (!academicOptions.includes(formData.academicyear)) {
//         setErrors(prev => ({ ...prev, academicyear: "Please select a valid academic year." }));
//         isValid = false;
//     }


//     return isValid;
//   };


//   const selectRandomDivision = () => {
//     const randomIndex = Math.floor(Math.random() * RANDOM_DIVISIONS.length);
//     return RANDOM_DIVISIONS[randomIndex];
//   };


//   const handleSubmit = async () => {
//     if (!validateForm()) {
//         alert("Please fill all the required fields correctly.");
//         return;
//     };

//     let photoUrl = "";
//     const documentsPayload = [];
//     const submissionPromises = [];
    
//     // 1. Set submission state/UI feedback (if you had a dedicated status)
//     // Here we'll use a local alert for status:
//     // alert("Application valid. Starting file uploads...");

//     try {
//         // 2. Upload Main Photo
//         if (photo) {
//             const customName = `${formData.firstname}_${formData.lastname}_photo_${generateUniqueId()}`;
//             submissionPromises.push(
//                 uploadToCloudinary(photo, 'student_images', customName)
//                     .then(res => { photoUrl = res.url; })
//             );
//         }
        
//         // 3. Upload Pending Documents
//         for (const [docType, file] of Object.entries(pendingDocuments)) {
//             const customName = `${formData.lastname}_${docType.replace(/\s/g, '_')}_${generateUniqueId()}`;
            
//             submissionPromises.push(
//                 uploadToCloudinary(file, 'student_documents', customName)
//                     .then(res => {
//                         documentsPayload.push({
//                             type: docType,
//                             url: res.url,
//                             filename: res.filename
//                         });
//                     })
//             );
//         }

//         // Wait for all uploads to complete
//         await Promise.all(submissionPromises);

//         // 4. Construct Final Payload (after all URLs are available)
        
//         // AUTO-ASSIGN DIVISION
//         const assignedDivision = selectRandomDivision();
        
//         const uniqueAdmissionNo = formData.admissionno || generateUniqueId();
//         const uniqueGrNo = formData.grno || generateUniqueId();
//         const uniqueTransportId = generateUniqueId();

//         const structuredData = {
//             studentid: generateUniqueId(),
//             firstname: formData.firstname,
//             lastname: formData.lastname,
//             dob: formData.dob,
//             bloodgroup: formData.bloodgroup,
//             gender: formData.gender,
//             category: formData.category,
//             nationality: formData.nationality,
//             aadharno: formData.aadharno,
//             middlename: formData.middlename,
//             birthplace: formData.birthplace,
//             photo: photoUrl, 
//             documents: documentsPayload, 

//             parent: {
//                 parentid: generateUniqueId(),
//                 fathername: formData.fathername,
//                 mothername: formData.mothername,
//                 primarycontact: formData.primarycontact,
//                 alternatecontact: formData.alternatecontact || "",
//                 emailaddress: formData.emailaddress || "",
//                 occupation: formData.occupation || "",
//                 annualincome: formData.annualincome || "",
//                 guardianname: formData.guardianname || "",
//                 relationwithstudent: formData.relationwithstudent || "",
//             },

//             address: {
//                 addressid: generateUniqueId(),
//                 addressline1: formData.addressline1,
//                 addressline2: formData.addressline2 || "",
//                 city: formData.city,
//                 postalcode: formData.postalcode,
//                 district: formData.district || "",
//                 state: formData.state,
//                 country: formData.country,
//             },

//             admission: {
//                 admissionno: uniqueAdmissionNo,
//                 grno: uniqueGrNo,
//                 admissionstd: formData.admissionstd,
//                 academicyear: formData.academicyear,
//                 admissiondivision: formData.admissiondivision || assignedDivision, 
//                 admissiontype: formData.admissiontype,
//                 admissiondate: formData.admissiondate, 
//                 lastschoolname: formData.lastschoolname || "",
//                 laststandardattended: formData.laststandardattended || "",
//                 board: formData.board || "",
//                 mediuminstruction: formData.mediuminstruction || "",
//                 lcno: formData.lcno || "",
//             },

//             transport: {
//                 transportid: uniqueTransportId,
//                 transportstatus: formData.transportstatus,
//                 pickuppoint: formData.pickuppoint || "",
//                 droppoint: formData.droppoint || "",
//                 modetransport: formData.modetransport || "",
//             },
//         };

//         // 5. Send Final Submission
//         const response = await axios.post(
//           `${API_BASE_URL}api/addstudent`,
//           structuredData,
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );

//       if (response.status === 200 || response.status === 201) {
//         alert("Student admission successful! Assigned to Division " + assignedDivision);
//         
//         setTimeout(() => {
//             navigate("/students");
//         }, 500); 
//       }
//     } catch (err) {
//       console.error("Form submission error:", err.response);

//       if (err.response) {
//         console.error("Error response:", err.response.data);
//         alert(`Error: ${err.response.data.message || "Submission failed. Please check network and required fields."}`);
//       } else {
//         alert("Network/server error during file upload or submission. Try again.");
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
//                 <div>
//                   <InputField
//                     label="Place Of Birth *" // 🛑 LABEL UPDATED
//                     value={formData.birthplace}
//                     onChange={(val) => handleChange("birthplace", val)}
//                   />
//                 {errors.birthplace && ( // 🛑 ERROR DISPLAY ADDED
//                     <p className="text-red-500 text-xs mt-1">{errors.birthplace}</p>
//                   )}
//                 </div>
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
//                   {/* MODIFICATION HERE: Use SelectField for Category */}
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

//             {/* Photo Upload Section (Existing) */}
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
//               <div>
//                 <InputField
//                   label="City *"
//                   value={formData.city}
//                   onChange={(val) => handleChange("city", val)}
//                   // City/District/State are read-only if auto-populated
//                   disabled={!!formData.state && !!formData.district && !!formData.city} 
//                 />
//                 {errors.city && (
//                   <p className="text-red-500 text-xs mt-1">{errors.city}</p>
//                 )}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <InputField
//                 label="District"
//                 value={formData.district}
//                 onChange={(val) => handleChange("district", val)}
//                 disabled={!!formData.state && !!formData.district}
//               />
//               <div>
//                 <InputField
//                   label="State *"
//                   value={formData.state}
//                   onChange={(val) => handleChange("state", val)}
//                   disabled={!!formData.state}
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
//                   disabled={formData.country === 'India'} 
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
//                 {/* Standard Dropdown */}
//                 <SelectField
//                   label="Admission for Grade/Standard *"
//                   options={STANDARD_OPTIONS}
//                   value={formData.admissionstd}
//                   onChange={(val) => handleChange("admissionstd", val)}
//                 />
//                 {errors.admissionstd && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.admissionstd}
//                   </p>
//                 )}
//               </div>
//               
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <div>
//                 {/* Academic Year Dropdown */}
//                 <SelectField
//                   label="Academic Year *"
//                   options={getAcademicYearOptions().map(opt => ({ value: opt.value, label: opt.label }))}
//                   value={formData.academicyear}
//                   onChange={(val) => handleChange("academicyear", val)}
//                 />
//                  {errors.academicyear && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.academicyear}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 {/* Admission Date Input Field (now auto-populated) */}
//                 <InputField
//                   label="Admission Date"
//                   type="date"
//                   value={formData.admissiondate}
//                   onChange={(val) => handleChange("admissiondate", val)}
//                   max={getTodayDate()} 
//                 />
//               </div>
//             </div>
// {/*             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
//             </div> */}
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

//           {/* 🆕 Document Upload Section (Simplified UI) */}
//           <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
//             <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//               <h4 className="text-xl font-semibold">Upload Documents</h4>
//             </div>
//             <div className="mt-6 rounded-lg bg-white-50">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
//                     {/* Document Type Dropdown */}
//                     <div>
//                         <SelectField
//                             label="Select Document Type *"
//                             options={DOCUMENT_OPTIONS}
//                             value={currentDocType}
//                             onChange={(val) => setCurrentDocType(val)}
//                         />
//                     </div>
                    
//                     {/* File Input (Only visible if a document type is selected) */}
//                     {currentDocType !== DOCUMENT_OPTIONS[0] && (
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">
//                                 Upload {currentDocType}
//                             </label>
//                             <input
//                                 type="file"
//                                 accept=".pdf,image/*" // Accepting common document/image formats
//                                 onChange={(e) => handleDocumentFileChange(e, currentDocType)}
//                                 className="mt-1 block w-full text-sm text-gray-500
//                                     file:mr-4 file:py-2 file:px-4
//                                     file:rounded-full file:border-0
//                                     file:text-sm file:font-semibold
//                                     file:bg-blue-50 file:text-blue-700
//                                     hover:file:bg-blue-100"
//                             />
//                             {pendingDocuments[currentDocType] && (
//                                 <p className="text-xs text-green-600 mt-1">
//                                     File selected: {pendingDocuments[currentDocType].name}
//                                 </p>
//                             )}
//                         </div>
//                     )}
//                 </div>

//                 {/* List of Uploaded Documents (Pending) */}
//                 <div className="mt-6">
//                     <h5 className="text-md font-semibold text-gray-800 mb-2">Files Pending Upload on Submission:</h5>
//                     <ul className="space-y-2 text-sm text-gray-700">
//                         {DOCUMENT_OPTIONS.filter(type => type !== DOCUMENT_OPTIONS[0]).map((docType) => (
//                             <li key={docType} className={`flex justify-between items-center p-3 border rounded-lg ${pendingDocuments[docType] ? 'bg-yellow-100 border-yellow-400' : 'bg-white border-gray-200'}`}>
//                                 <span>
//                                     <strong className="font-medium">{docType}:</strong> 
//                                     {pendingDocuments[docType] 
//                                         ? ` ${pendingDocuments[docType].name}` 
//                                         : ' No file selected'}
//                                 </span>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//           </div>


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
// <SelectField
//                 label="Mode of Transport"
//                 options={["Select", "bus", "van", "rickshaw"]}
//                 value={formData.modetransport}
//                 onChange={(val) => handleChange("modetransport", val)}
//               />
//                 </>
//               )}
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
//         </div>
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

// // --- Helper Functions for Academic Year ---
// const getCurrentAcademicYear = () => {
//     const year = new Date().getFullYear();
//     const month = new Date().getMonth();
//     // Assuming academic year starts in April (month index 3)
//     if (month >= 3) {
//         return `${year}-${String(year + 1).slice(2)}`;
//     } else {
//         return `${year - 1}-${String(year).slice(2)}`;
//     }
// };

// const getAcademicYearOptions = () => {
//     const currentYear = getCurrentAcademicYear();
//     const startYear = parseInt(currentYear.split('-')[0]);
    
//     // Calculate Next Year: Next Academic Year starts one year after the current start year
//     const nextStartYear = startYear + 1;
//     const nextAcademicYear = `${nextStartYear}-${String(nextStartYear + 1).slice(2)}`;

//     return [
//         { value: currentYear, label: `Current Year (${currentYear})` },
//         { value: nextAcademicYear, label: `Next Year (${nextAcademicYear})` },
//     ];
// };

// // --- Options with Capitalized Labels for UI and Lowercase Values for Backend ---
// const GENDER_OPTIONS = [
//   { value: "Select", label: "Select Gender" },
//   { value: "male", label: "Male" },
//   { value: "female", label: "Female" },
//   { value: "others", label: "Others" }
// ];

// const BLOOD_GROUP_OPTIONS = [
//   { value: "Select", label: "Select Blood Group" },
//   { value: "a+", label: "A+" },
//   { value: "a-", label: "A-" },
//   { value: "b+", label: "B+" },
//   { value: "b-", label: "B-" },
//   { value: "ab+", label: "AB+" },
//   { value: "ab-", label: "AB-" },
//   { value: "o+", label: "O+" },
//   { value: "o-", label: "O-" }
// ];

// const TRANSPORT_MODE_OPTIONS = [
//   { value: "Select", label: "Select Mode" },
//   { value: "bus", label: "Bus" },
//   { value: "van", label: "Van" },
//   { value: "rickshaw", label: "Rickshaw" }
// ];

// const ADMISSION_TYPE_OPTIONS = [
//   { value: "regular", label: "Regular" },
//   { value: "transfer", label: "Transfer" },
//   { value: "other", label: "Other" }
// ];

// const RELATIONSHIP_OPTIONS = [
//   { value: "Select", label: "Select Relationship" },
//   { value: "father", label: "Father" },
//   { value: "mother", label: "Mother" },
//   { value: "guardian", label: "Guardian" },
//   { value: "other", label: "Other" }
// ];

// const TRANSPORT_REQUIRED_OPTIONS = [
//   { value: "Select", label: "Select Option" },
//   { value: "yes", label: "Yes" },
//   { value: "no", label: "No" }
// ];

// const STANDARD_OPTIONS = [
//   "Select Standard", "Nursery", "Junior", "Senior", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"
// ];

// const DIVISION_OPTIONS = ["Select Division", "A", "B", "C", "D", "E"];
// const RANDOM_DIVISIONS = ["A", "B", "C", "D", "E"]; 

// const DOCUMENT_OPTIONS = [
//     "Select Document Type",
//     "Aadhaar Card",
//     "Birth Certificate",
// ];

// export default function StudentAdmission() {
//   const navigate = useNavigate();
//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [photo, setPhoto] = useState(null); 
//   const [admissionType, setAdmissionType] = useState("regular");
//   const [isDeclared, setIsDeclared] = useState(false);

//   const [errors, setErrors] = useState({});
//   const [pendingDocuments, setPendingDocuments] = useState({});
//   const [currentDocType, setCurrentDocType] = useState(DOCUMENT_OPTIONS[0]);

//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split("T")[0];
//   };

//   const [formData, setFormData] = useState({
//     firstname: "",
//     middlename: "",
//     lastname: "",
//     gender: "",
//     dob: "",
//     birthplace: "", 
//     bloodgroup: "",
//     category: "",
//     nationality: "",
//     aadharno: "",
//     photo: "",
//     fathername: "",
//     mothername: "",
//     guardianname: "",
//     relationwithstudent: "",
//     primarycontact: "",
//     alternatecontact: "",
//     emailaddress: "",
//     occupation: "",
//     annualincome: "",
//     addressline1: "",
//     addressline2: "",
//     city: "",
//     postalcode: "",
//     district: "",
//     state: "",
//     country: "India",
//     admissionstd: "", 
//     admissiondivision: "", 
//     academicyear: getCurrentAcademicYear(),
//     admissiontype: "regular",
//     lastschoolname: "",
//     laststandardattended: "",
//     board: "",
//     mediuminstruction: "",
//     lcno: "",
//     admissiondate: getTodayDate(), 
//     admissionno: "",
//     grno: "",
//     transportstatus: "",
//     pickuppoint: "",
//     droppoint: "",
//     modetransport: "",
//   });

//   const fetchAddressByPin = async (pincode) => {
//     if (!/^\d{6}$/.test(pincode)) return;
//     try {
//       const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
//       if (response.data && response.data[0].Status === 'Success') {
//         const postOffice = response.data[0].PostOffice[0];
//         setFormData(prev => ({
//           ...prev,
//           city: postOffice.Block || postOffice.Block, 
//           district: postOffice.District,
//           state: postOffice.State,
//           country: 'India', 
//         }));
//         setErrors(prev => ({ ...prev, postalcode: "" }));
//       } else {
//         setErrors(prev => ({ ...prev, postalcode: "Invalid PIN Code" }));
//       }
//     } catch (error) {
//       console.error("Error fetching PIN code data:", error);
//       setErrors(prev => ({ ...prev, postalcode: "Error fetching address data" }));
//     }
//   };

//   const validateField = (field, value) => {
//     let errorMsg = "";
//     switch (field) {
//       case "firstname":
//       case "lastname":
//       case "fathername":
//       case "mothername":
//       case "addressline1":
//       case "city":
//       case "state":
//       case "country":
//       case "birthplace": 
//         if (!value.trim()) errorMsg = "This field is required";
//         break;
//       case "dob":
//         if (!value) errorMsg = "Date of birth is required";
//         else if (new Date(value) > new Date()) errorMsg = "DOB cannot be in the future";
//         break;
//       case "gender":
//       case "bloodgroup":
//       case "nationality":
//       case "transportstatus":
//       case "category": 
//       case "admissionstd": 
//         if (!value || value.includes("Select")) errorMsg = "Please select an option";
//         break;
//       case "pickuppoint":
//       case "droppoint":
//         if (formData.transportstatus === "yes" && !value.trim()) errorMsg = "This field is required for transport";
//         break;
//       case "modetransport":
//         if (formData.transportstatus === "yes" && (!value || value.includes("Select"))) errorMsg = "Please select transport mode";
//         break;
//       case "academicyear": 
//         if (!value) errorMsg = "Academic Year is required";
//         break;
//       case "aadharno":
//         if (!value.trim()) errorMsg = "Aadhaar number is required";
//         else if (!/^\d{12}$/.test(value)) errorMsg = "Aadhaar must be 12 digits";
//         break;
//       case "primarycontact":
//         if (!value.trim()) errorMsg = "Primary contact is required";
//         else if (!/^\d{10}$/.test(value)) errorMsg = "Contact must be 10 digits";
//         break;
//       case "alternatecontact":
//         if (value && !/^\d{10}$/.test(value)) errorMsg = "Contact must be 10 digits";
//         break;
//       case "emailaddress":
//         if (value && !/^\S+@\S+\.\S+$/.test(value)) errorMsg = "Invalid email address";
//         break;
//       case "postalcode":
//         if (!value.trim()) errorMsg = "Postal code is required";
//         else if (!/^\d{6}$/.test(value)) errorMsg = "PIN code must be 6 digits";
//         break;
//       default:
//         errorMsg = "";
//     }
//     setErrors((prev) => ({ ...prev, [field]: errorMsg }));
//     return !errorMsg;
//   };

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     validateField(field, value);

//     if (field === "postalcode" && value.length === 6 && /^\d{6}$/.test(value)) {
//         fetchAddressByPin(value);
//     } else if (field === "postalcode" && value.length < 6) {
//         setFormData(prev => ({ ...prev, city: '', district: '', state: '' }));
//     }
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!file.type.startsWith("image/")) { alert("Please select a valid image file"); return; }
//       if (file.size > 5 * 1024 * 1024) { alert("Image file size should be less than 5MB"); return; }
//       setPhoto(file);
//       setPhotoPreview(URL.createObjectURL(file));
//     }
//   };
  
//   const handleDocumentFileChange = (e, docType) => {
//       const file = e.target.files[0];
//       if (file) {
//           if (file.size > 10 * 1024 * 1024) { alert("Document file size should be less than 10MB"); e.target.value = null; return; }
//           setPendingDocuments(prev => ({ ...prev, [docType]: file }));
//       } else {
//           setPendingDocuments(prev => {
//               const newDocs = { ...prev };
//               delete newDocs[docType];
//               return newDocs;
//           });
//       }
//   };

//   const generateUniqueId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

//   const uploadToCloudinary = async (file, docType, customName) => {
//     const uploadFormData = new FormData();
//     uploadFormData.append("file", file);
//     uploadFormData.append("upload_preset", "sspd-student-management");
//     uploadFormData.append("folder", `student_documents`); 
//     uploadFormData.append("public_id", customName);

//     try {
//       const res = await axios.post("https://api.cloudinary.com/v1_1/dyloa2svi/auto/upload", uploadFormData);
//       return { url: res.data.secure_url, filename: file.name };
//     } catch (err) {
//       console.error("Upload error:", err);
//       throw err;
//     }
//   };

//   const validateForm = () => {
//     const fieldsToValidate = [
//       "firstname", "lastname", "dob", "gender", "bloodgroup",
//       "category", "nationality", "aadharno", "fathername", "mothername",
//       "primarycontact", "alternatecontact", "addressline1", "city", "postalcode",
//       "state", "country", "admissionstd", "academicyear", "transportstatus",
//       "birthplace" 
//     ];

//     if (formData.transportstatus === "yes") {
//       fieldsToValidate.push("pickuppoint", "droppoint", "modetransport");
//     }

//     let isValid = true;
//     fieldsToValidate.forEach((field) => {
//       const valid = validateField(field, formData[field]);
//       if (!valid) isValid = false;
//     });

//     if (!isDeclared) { alert("You must agree to the declaration before submitting."); isValid = false; }
//     if (formData.admissionstd.includes("Select")) { setErrors(prev => ({ ...prev, admissionstd: "Please select a standard." })); isValid = false; }

//     const academicOptions = getAcademicYearOptions().map(opt => opt.value);
//     if (!academicOptions.includes(formData.academicyear)) {
//         setErrors(prev => ({ ...prev, academicyear: "Please select a valid academic year." }));
//         isValid = false;
//     }

//     return isValid;
//   };

//   const selectRandomDivision = () => RANDOM_DIVISIONS[Math.floor(Math.random() * RANDOM_DIVISIONS.length)];

//   const handleSubmit = async () => {
//     if (!validateForm()) { alert("Please fill all the required fields correctly."); return; };

//     let photoUrl = "";
//     const documentsPayload = [];
//     const submissionPromises = [];
    
//     try {
//         if (photo) {
//             const customName = `${formData.firstname}_${formData.lastname}_photo_${generateUniqueId()}`;
//             submissionPromises.push(uploadToCloudinary(photo, 'student_images', customName).then(res => { photoUrl = res.url; }));
//         }
        
//         for (const [docType, file] of Object.entries(pendingDocuments)) {
//             const customName = `${formData.lastname}_${docType.replace(/\s/g, '_')}_${generateUniqueId()}`;
//             submissionPromises.push(uploadToCloudinary(file, 'student_documents', customName).then(res => {
//                 documentsPayload.push({ type: docType, url: res.url, filename: res.filename });
//             }));
//         }

//         await Promise.all(submissionPromises);

//         const assignedDivision = selectRandomDivision();
//         const structuredData = {
//             studentid: generateUniqueId(),
//             firstname: formData.firstname,
//             lastname: formData.lastname,
//             dob: formData.dob,
//             bloodgroup: formData.bloodgroup,
//             gender: formData.gender,
//             category: formData.category,
//             nationality: formData.nationality,
//             aadharno: formData.aadharno,
//             middlename: formData.middlename,
//             birthplace: formData.birthplace,
//             photo: photoUrl, 
//             documents: documentsPayload, 
//             parent: {
//                 parentid: generateUniqueId(),
//                 fathername: formData.fathername,
//                 mothername: formData.mothername,
//                 primarycontact: formData.primarycontact,
//                 alternatecontact: formData.alternatecontact || "",
//                 emailaddress: formData.emailaddress || "",
//                 occupation: formData.occupation || "",
//                 annualincome: formData.annualincome || "",
//                 guardianname: formData.guardianname || "",
//                 relationwithstudent: formData.relationwithstudent || "",
//             },
//             address: {
//                 addressid: generateUniqueId(),
//                 addressline1: formData.addressline1,
//                 addressline2: formData.addressline2 || "",
//                 city: formData.city,
//                 postalcode: formData.postalcode,
//                 district: formData.district || "",
//                 state: formData.state,
//                 country: formData.country,
//             },
//             admission: {
//                 admissionno: formData.admissionno || generateUniqueId(),
//                 grno: formData.grno || generateUniqueId(),
//                 admissionstd: formData.admissionstd,
//                 academicyear: formData.academicyear,
//                 admissiondivision: formData.admissiondivision || assignedDivision, 
//                 admissiontype: formData.admissiontype,
//                 admissiondate: formData.admissiondate, 
//                 lastschoolname: formData.lastschoolname || "",
//                 laststandardattended: formData.laststandardattended || "",
//                 board: formData.board || "",
//                 mediuminstruction: formData.mediuminstruction || "",
//                 lcno: formData.lcno || "",
//             },
//             transport: {
//                 transportid: generateUniqueId(),
//                 transportstatus: formData.transportstatus,
//                 pickuppoint: formData.pickuppoint || "",
//                 droppoint: formData.droppoint || "",
//                 modetransport: formData.modetransport || "",
//             },
//         };

//         const response = await axios.post(`${API_BASE_URL}api/addstudent`, structuredData, {
//             headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" },
//         });

//       if (response.status === 200 || response.status === 201) {
//         alert("Student admission successful! Assigned to Division " + assignedDivision);
//         setTimeout(() => navigate("/students"), 500); 
//       }
//     } catch (err) {
//       console.error("Form submission error:", err.response);
//       alert("Student already exists Please check the Adhar Card number!");
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="p-8">
//         <div className="bg-white rounded-2xl shadow p-6">
//           <h4 className="text-2xl font-semibold mb-6 text-center">Student Admission</h4>

//           <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6 mb-6">
//             <div className="rounded-lg p-6 shadow-lg bg-white w-full">
//               <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//                 <h4 className="text-xl font-semibold">Student Details</h4>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//                 <div>
//                   <InputField label="First Name *" value={formData.firstname} onChange={(val) => handleChange("firstname", val)} />
//                   {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>}
//                 </div>
//                 <InputField label="Middle Name" value={formData.middlename} onChange={(val) => handleChange("middlename", val)} />
//                 <div>
//                   <InputField label="Last Name *" value={formData.lastname} onChange={(val) => handleChange("lastname", val)} />
//                   {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//                 <div>
//                   <InputField label="Date of Birth *" type="date" value={formData.dob} onChange={(val) => handleChange("dob", val)} max={getTodayDate()} />
//                   {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
//                 </div>
//                 <div>
//                   <InputField label="Place Of Birth *" value={formData.birthplace} onChange={(val) => handleChange("birthplace", val)} />
//                   {errors.birthplace && <p className="text-red-500 text-xs mt-1">{errors.birthplace}</p>}
//                 </div>
//                 <div>
//                   <SelectField label="Blood Group *" options={BLOOD_GROUP_OPTIONS} value={formData.bloodgroup} onChange={(val) => handleChange("bloodgroup", val)} />
//                    {errors.bloodgroup && <p className="text-red-500 text-xs mt-1">{errors.bloodgroup}</p>}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//                 <div>
//                   <SelectField label="Gender *" options={GENDER_OPTIONS} value={formData.gender} onChange={(val) => handleChange("gender", val)} />
//                   {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
//                 </div>
//                 <div>
//                   <SelectField label="Nationality *" options={["Select", "Indian", "Other"]} value={formData.nationality} onChange={(val) => handleChange("nationality", val)} />
//                   {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>}
//                 </div>
//                 <div>
//                   <SelectField label="Category *" options={["Select Category", "General", "OBC", "SC", "ST", "Other"]} value={formData.category} onChange={(val) => handleChange("category", val)} />
//                   {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <InputField label="Aadhaar Number *" value={formData.aadharno} onChange={(val) => handleChange("aadharno", val)} placeholder="12-digit Aadhaar number" />
//                 {errors.aadharno && <p className="text-red-500 text-xs mt-1">{errors.aadharno}</p>}
//               </div>
//             </div>

//             <div className="w-full flex flex-col items-center justify-between p-6 rounded-lg shadow-lg bg-white self-start">
//               <div className="w-full h-48 bg-gray-200 rounded mb-2 flex items-center justify-center relative overflow-hidden shadow-inner">
//                 {photoPreview ? <img src={photoPreview} alt="Preview" className="w-full h-full object-cover rounded" /> : <span className="text-sm text-gray-500">Preview</span>}
//               </div>
//               <label className="bg-blue-400 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded cursor-pointer shadow-md">
//                 Choose File
//                 <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
//               </label>
//               {photo && <span className="text-xs text-gray-600 mt-1 max-w-[200px] truncate text-center">{photo.name}</span>}
//             </div>
//           </div>

//           <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
//             <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//               <h4 className="text-xl font-semibold">Parent/Guardian Details</h4>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <div>
//                 <InputField label="Father's Name *" value={formData.fathername} onChange={(val) => handleChange("fathername", val)} />
//                 {errors.fathername && <p className="text-red-500 text-xs mt-1">{errors.fathername}</p>}
//               </div>
//               <div>
//                 <InputField label="Mother's Name *" value={formData.mothername} onChange={(val) => handleChange("mothername", val)} />
//                 {errors.mothername && <p className="text-red-500 text-xs mt-1">{errors.mothername}</p>}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <InputField label="Guardian's Name" value={formData.guardianname} onChange={(val) => handleChange("guardianname", val)} />
//               <SelectField label="Relationship with Student" options={RELATIONSHIP_OPTIONS} value={formData.relationwithstudent} onChange={(val) => handleChange("relationwithstudent", val)} />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <div>
//                 <InputField label="Primary Contact Number *" value={formData.primarycontact} onChange={(val) => handleChange("primarycontact", val)} placeholder="10-digit mobile number" />
//                 {errors.primarycontact && <p className="text-red-500 text-xs mt-1">{errors.primarycontact}</p>}
//               </div>
//               <div>
//                 <InputField label="Alternate Contact Number" value={formData.alternatecontact} onChange={(val) => handleChange("alternatecontact", val)} placeholder="10-digit mobile number" />
//                 {errors.alternatecontact && <p className="text-red-500 text-xs mt-1">{errors.alternatecontact}</p>}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <div>
//                 <InputField label="Email Address" value={formData.emailaddress} onChange={(val) => handleChange("emailaddress", val)} type="email" />
//                 {errors.emailaddress && <p className="text-red-500 text-xs mt-1">{errors.emailaddress}</p>}
//               </div>
//               <InputField label="Occupation" value={formData.occupation} onChange={(val) => handleChange("occupation", val)} />
//             </div>
//             <div className="mt-6">
//               <InputField label="Annual Income" value={formData.annualincome} onChange={(val) => handleChange("annualincome", val)} type="number" />
//             </div>
//           </div>

//           <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
//             <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//               <h4 className="text-xl font-semibold">Address Information</h4>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
//               <div>
//                 <InputField label="Address Line 1 *" value={formData.addressline1} onChange={(val) => handleChange("addressline1", val)} />
//                 {errors.addressline1 && <p className="text-red-500 text-xs mt-1">{errors.addressline1}</p>}
//               </div>
//               <InputField label="Address Line 2" value={formData.addressline2} onChange={(val) => handleChange("addressline2", val)} />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <div>
//                 <InputField label="Postal Code *" value={formData.postalcode} onChange={(val) => handleChange("postalcode", val)} />
//                 {errors.postalcode && <p className="text-red-500 text-xs mt-1">{errors.postalcode}</p>}
//               </div>
//               <div>
//                 <InputField label="City *" value={formData.city} onChange={(val) => handleChange("city", val)} disabled={!!formData.state && !!formData.district && !!formData.city} />
//                 {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <InputField label="District" value={formData.district} onChange={(val) => handleChange("district", val)} disabled={!!formData.state && !!formData.district} />
//               <div>
//                 <InputField label="State *" value={formData.state} onChange={(val) => handleChange("state", val)} disabled={!!formData.state} />
//                 {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
//               </div>
//             </div>
//             <div className="mt-6">
//               <InputField label="Country *" value={formData.country} onChange={(val) => handleChange("country", val)} disabled={formData.country === 'India'} />
//             </div>
//           </div>

//           <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
//             <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//               <h4 className="text-xl font-semibold">Admission Details</h4>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <div>
//                 <SelectField label="Admission for Grade/Standard *" options={STANDARD_OPTIONS} value={formData.admissionstd} onChange={(val) => handleChange("admissionstd", val)} />
//                 {errors.admissionstd && <p className="text-red-500 text-xs mt-1">{errors.admissionstd}</p>}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <div>
//                 <SelectField label="Academic Year *" options={getAcademicYearOptions().map(opt => ({ value: opt.value, label: opt.label }))} value={formData.academicyear} onChange={(val) => handleChange("academicyear", val)} />
//                 {errors.academicyear && <p className="text-red-500 text-xs mt-1">{errors.academicyear}</p>}
//               </div>
//               <InputField label="Admission Date" type="date" value={formData.admissiondate} onChange={(val) => handleChange("admissiondate", val)} max={getTodayDate()} />
//             </div>
//             <div className="mt-6">
//               <SelectField label="Admission Type" options={ADMISSION_TYPE_OPTIONS} value={formData.admissiontype} onChange={(value) => { setAdmissionType(value); handleChange("admissiontype", value); }} />
//             </div>
//           </div>

//           {(admissionType === "transfer" || formData.admissiontype === "transfer") && (
//             <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
//               <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//                 <h4 className="text-xl font-semibold">Previous School Details</h4>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
//                 <InputField label="Last School Name" value={formData.lastschoolname} onChange={(val) => handleChange("lastschoolname", val)} />
//                 <InputField label="Last Standard/Grade Attended" value={formData.laststandardattended} onChange={(val) => handleChange("laststandardattended", val)} />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//                 <SelectField label="Board" options={["Select", "CBSE", "ICSE", "State Board", "Other"]} value={formData.board} onChange={(val) => handleChange("board", val)} />
//                 <SelectField label="Medium of Instruction" options={["Select", "English", "Hindi", "Marathi", "Other"]} value={formData.mediuminstruction} onChange={(val) => handleChange("mediuminstruction", val)} />
//               </div>
//               <div className="mt-6">
//                 <InputField label="LC/TC Number" value={formData.lcno} onChange={(val) => handleChange("lcno", val)} />
//               </div>
//             </div>
//           )}

//           <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
//             <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//               <h4 className="text-xl font-semibold">Upload Documents</h4>
//             </div>
//             <div className="mt-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
//                     <SelectField label="Select Document Type *" options={DOCUMENT_OPTIONS} value={currentDocType} onChange={(val) => setCurrentDocType(val)} />
//                     {currentDocType !== DOCUMENT_OPTIONS[0] && (
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Upload {currentDocType}</label>
//                             <input type="file" accept=".pdf,image/*" onChange={(e) => handleDocumentFileChange(e, currentDocType)} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
//                             {pendingDocuments[currentDocType] && <p className="text-xs text-green-600 mt-1">File selected: {pendingDocuments[currentDocType].name}</p>}
//                         </div>
//                     )}
//                 </div>
//                 <div className="mt-6">
//                     <h5 className="text-md font-semibold text-gray-800 mb-2">Files Pending Upload:</h5>
//                     <ul className="space-y-2 text-sm text-gray-700">
//                         {DOCUMENT_OPTIONS.filter(type => type !== DOCUMENT_OPTIONS[0]).map((docType) => (
//                             <li key={docType} className={`flex justify-between items-center p-3 border rounded-lg ${pendingDocuments[docType] ? 'bg-blue-100 border-blue-400' : 'bg-white border-gray-200'}`}>
//                                 <span><strong className="font-medium">{docType}:</strong> {pendingDocuments[docType] ? ` ${pendingDocuments[docType].name}` : ' No file selected'}</span>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//           </div>

//           <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
//             <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//               <h4 className="text-xl font-semibold">Transport Details</h4>
//             </div>
//             <div className="space-y-6 mt-6">
//               <div>
//                 <SelectField label="Do you require school transportation? *" options={TRANSPORT_REQUIRED_OPTIONS} value={formData.transportstatus} onChange={(val) => handleChange("transportstatus", val)} />
//                 {errors.transportstatus && <p className="text-red-500 text-xs mt-1">{errors.transportstatus}</p>}
//               </div>

//               {formData.transportstatus === "yes" && (
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <div>
//                     <InputField label="Pickup Point *" value={formData.pickuppoint} onChange={(val) => handleChange("pickuppoint", val)} />
//                     {errors.pickuppoint && <p className="text-red-500 text-xs mt-1">{errors.pickuppoint}</p>}
//                   </div>
//                   <div>
//                     <InputField label="Drop Point *" value={formData.droppoint} onChange={(val) => handleChange("droppoint", val)} />
//                     {errors.droppoint && <p className="text-red-500 text-xs mt-1">{errors.droppoint}</p>}
//                   </div>
//                   <div>
//                     <SelectField label="Mode of Transport *" options={TRANSPORT_MODE_OPTIONS} value={formData.modetransport} onChange={(val) => handleChange("modetransport", val)} />
//                     {errors.modetransport && <p className="text-red-500 text-xs mt-1">{errors.modetransport}</p>}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="rounded-lg p-6 shadow-lg bg-white mb-8">
//             <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//               <h4 className="text-xl font-semibold">Declaration</h4>
//             </div>
//             <p className="text-sm text-gray-700 mt-6 mb-4">I hereby declare that the information provided above is accurate and true to the best of my knowledge. I agree to abide by the school's policies and code of conduct.</p>
//             <div className="flex items-center">
//               <input type="checkbox" id="declaration" className="mr-2" checked={isDeclared} onChange={(e) => setIsDeclared(e.target.checked)} />
//               <label htmlFor="declaration" className="text-sm text-gray-700">I agree to the terms and conditions</label>
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <button onClick={handleSubmit} disabled={!isDeclared} className={`px-8 py-3 text-white rounded-md font-semibold ${isDeclared ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}>
//               Submit Application
//             </button>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// }


// import React, { useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import InputField from "../components/InputField";
// import SelectField from "../components/SelectField";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// // --- Import the API Base URL from the config file ---
// import { API_BASE_URL } from "../config"; 

// // --- Helper Functions for Academic Year ---
// const getCurrentAcademicYear = () => {
//     const year = new Date().getFullYear();
//     const month = new Date().getMonth();
//     // Assuming academic year starts in April (month index 3)
//     if (month >= 3) {
//         return `${year}-${String(year + 1).slice(2)}`;
//     } else {
//         return `${year - 1}-${String(year).slice(2)}`;
//     }
// };

// const getAcademicYearOptions = () => {
//     const currentYear = getCurrentAcademicYear();
//     const startYear = parseInt(currentYear.split('-')[0]);
    
//     // Calculate Next Year: Next Academic Year starts one year after the current start year
//     const nextStartYear = startYear + 1;
//     const nextAcademicYear = `${nextStartYear}-${String(nextStartYear + 1).slice(2)}`;

//     return [
//         { value: currentYear, label: `Current Year (${currentYear})` },
//         { value: nextAcademicYear, label: `Next Year (${nextAcademicYear})` },
//     ];
// };

// // --- Options with Capitalized Labels for UI and Lowercase Values for Backend ---
// const GENDER_OPTIONS = [
//   { value: "Select", label: "Select Gender" },
//   { value: "male", label: "Male" },
//   { value: "female", label: "Female" },
//   { value: "others", label: "Others" }
// ];

// const BLOOD_GROUP_OPTIONS = [
//   { value: "Select", label: "Select Blood Group" },
//   { value: "a+", label: "A+" },
//   { value: "a-", label: "A-" },
//   { value: "b+", label: "B+" },
//   { value: "b-", label: "B-" },
//   { value: "ab+", label: "AB+" },
//   { value: "ab-", label: "AB-" },
//   { value: "o+", label: "O+" },
//   { value: "o-", label: "O-" }
// ];

// const TRANSPORT_MODE_OPTIONS = [
//   { value: "Select", label: "Select Mode" },
//   { value: "bus", label: "Bus" },
//   { value: "van", label: "Van" },
//   { value: "rickshaw", label: "Rickshaw" }
// ];

// const ADMISSION_TYPE_OPTIONS = [
//   { value: "regular", label: "Regular" },
//   { value: "transfer", label: "Transfer" },
//   { value: "other", label: "Other" }
// ];

// const RELATIONSHIP_OPTIONS = [
//   { value: "Select", label: "Select Relationship" },
//   { value: "father", label: "Father" },
//   { value: "mother", label: "Mother" },
//   { value: "guardian", label: "Guardian" },
//   { value: "other", label: "Other" }
// ];

// const TRANSPORT_REQUIRED_OPTIONS = [
//   { value: "Select", label: "Select Option" },
//   { value: "yes", label: "Yes" },
//   { value: "no", label: "No" }
// ];

// const STANDARD_OPTIONS = [
//   "Select Standard", "Nursery", "Junior", "Senior", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"
// ];

// const DIVISION_OPTIONS = ["Select Division", "A", "B", "C", "D", "E"];
// const RANDOM_DIVISIONS = ["A", "B", "C", "D", "E"]; 

// const DOCUMENT_OPTIONS = [
//     "Select Document Type",
//     "Aadhaar Card",
//     "Birth Certificate",
// ];

// export default function StudentAdmission() {
//   const navigate = useNavigate();
//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [photo, setPhoto] = useState(null); 
//   const [admissionType, setAdmissionType] = useState("regular");
//   const [isDeclared, setIsDeclared] = useState(false);

//   const [errors, setErrors] = useState({});
//   const [pendingDocuments, setPendingDocuments] = useState({});
//   const [currentDocType, setCurrentDocType] = useState(DOCUMENT_OPTIONS[0]);

//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split("T")[0];
//   };

//   const [formData, setFormData] = useState({
//     firstname: "",
//     middlename: "",
//     lastname: "",
//     gender: "",
//     dob: "",
//     birthplace: "", 
//     bloodgroup: "",
//     category: "",
//     nationality: "",
//     aadharno: "",
//     photo: "",
//     fathername: "",
//     mothername: "",
//     guardianname: "",
//     relationwithstudent: "",
//     primarycontact: "",
//     alternatecontact: "",
//     emailaddress: "",
//     occupation: "",
//     annualincome: "",
//     addressline1: "",
//     addressline2: "",
//     city: "",
//     postalcode: "",
//     district: "",
//     state: "",
//     country: "India",
//     admissionstd: "", 
//     admissiondivision: "", 
//     academicyear: getCurrentAcademicYear(),
//     admissiontype: "regular",
//     lastschoolname: "",
//     laststandardattended: "",
//     board: "",
//     mediuminstruction: "",
//     lcno: "",
//     admissiondate: getTodayDate(), 
//     admissionno: "",
//     grno: "",
//     transportstatus: "",
//     pickuppoint: "",
//     droppoint: "",
//     modetransport: "",
//   });

//   const fetchAddressByPin = async (pincode) => {
//     if (!/^\d{6}$/.test(pincode)) return;
//     try {
//       const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
//       if (response.data && response.data[0].Status === 'Success') {
//         const postOffice = response.data[0].PostOffice[0];
//         setFormData(prev => ({
//           ...prev,
//           city: postOffice.Block || postOffice.Block, 
//           district: postOffice.District,
//           state: postOffice.State,
//           country: 'India', 
//         }));
//         setErrors(prev => ({ ...prev, postalcode: "" }));
//       } else {
//         setErrors(prev => ({ ...prev, postalcode: "Invalid PIN Code" }));
//       }
//     } catch (error) {
//       console.error("Error fetching PIN code data:", error);
//       setErrors(prev => ({ ...prev, postalcode: "Error fetching address data" }));
//     }
//   };

//   const validateField = (field, value) => {
//     let errorMsg = "";
//     switch (field) {
//       case "firstname":
//       case "lastname":
//       case "fathername":
//       case "mothername":
//       case "addressline1":
//       case "city":
//       case "state":
//       case "country":
//       case "birthplace": 
//         if (!value.trim()) errorMsg = "This field is required";
//         break;
//       case "dob":
//         if (!value) errorMsg = "Date of birth is required";
//         else if (new Date(value) > new Date()) errorMsg = "DOB cannot be in the future";
//         break;
//       case "gender":
//       case "bloodgroup":
//       case "nationality":
//       case "transportstatus":
//       case "category": 
//       case "admissionstd": 
//         if (!value || value.includes("Select")) errorMsg = "Please select an option";
//         break;
//       case "pickuppoint":
//       case "droppoint":
//         if (formData.transportstatus === "yes" && !value.trim()) errorMsg = "This field is required for transport";
//         break;
//       case "modetransport":
//         if (formData.transportstatus === "yes" && (!value || value.includes("Select"))) errorMsg = "Please select transport mode";
//         break;
//       case "academicyear": 
//         if (!value) errorMsg = "Academic Year is required";
//         break;
//       case "aadharno":
//         if (!value.trim()) errorMsg = "Aadhaar number is required";
//         else if (!/^\d{12}$/.test(value)) errorMsg = "Aadhaar must be 12 digits";
//         break;
//       case "primarycontact":
//         if (!value.trim()) errorMsg = "Primary contact is required";
//         else if (!/^\d{10}$/.test(value)) errorMsg = "Contact must be 10 digits";
//         break;
//       case "alternatecontact":
//         if (value && !/^\d{10}$/.test(value)) errorMsg = "Contact must be 10 digits";
//         break;
//       case "emailaddress":
//         if (value && !/^\S+@\S+\.\S+$/.test(value)) errorMsg = "Invalid email address";
//         break;
//       case "postalcode":
//         if (!value.trim()) errorMsg = "Postal code is required";
//         else if (!/^\d{6}$/.test(value)) errorMsg = "PIN code must be 6 digits";
//         break;
//       default:
//         errorMsg = "";
//     }
//     setErrors((prev) => ({ ...prev, [field]: errorMsg }));
//     return !errorMsg;
//   };

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     validateField(field, value);

//     if (field === "postalcode" && value.length === 6 && /^\d{6}$/.test(value)) {
//         fetchAddressByPin(value);
//     } else if (field === "postalcode" && value.length < 6) {
//         setFormData(prev => ({ ...prev, city: '', district: '', state: '' }));
//     }
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!file.type.startsWith("image/")) { alert("Please select a valid image file"); return; }
//       if (file.size > 5 * 1024 * 1024) { alert("Image file size should be less than 5MB"); return; }
//       setPhoto(file);
//       setPhotoPreview(URL.createObjectURL(file));
//     }
//   };
  
//   const handleDocumentFileChange = (e, docType) => {
//       const file = e.target.files[0];
//       if (file) {
//           if (file.size > 10 * 1024 * 1024) { alert("Document file size should be less than 10MB"); e.target.value = null; return; }
//           setPendingDocuments(prev => ({ ...prev, [docType]: file }));
//       } else {
//           setPendingDocuments(prev => {
//               const newDocs = { ...prev };
//               delete newDocs[docType];
//               return newDocs;
//           });
//       }
//   };

//   const generateUniqueId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

//   const uploadToCloudinary = async (file, docType, customName) => {
//     const uploadFormData = new FormData();
//     uploadFormData.append("file", file);
//     uploadFormData.append("upload_preset", "sspd-student-management");
//     uploadFormData.append("folder", `student_documents`); 
//     uploadFormData.append("public_id", customName);

//     try {
//       const res = await axios.post("https://api.cloudinary.com/v1_1/dyloa2svi/auto/upload", uploadFormData);
//       return { url: res.data.secure_url, filename: file.name };
//     } catch (err) {
//       console.error("Upload error:", err);
//       throw err;
//     }
//   };

//   const validateForm = () => {
//     const fieldsToValidate = [
//       "firstname", "lastname", "dob", "gender", "bloodgroup",
//       "category", "nationality", "aadharno", "fathername", "mothername",
//       "primarycontact", "alternatecontact", "addressline1", "city", "postalcode",
//       "state", "country", "admissionstd", "academicyear", "transportstatus",
//       "birthplace" 
//     ];

//     if (formData.transportstatus === "yes") {
//       fieldsToValidate.push("pickuppoint", "droppoint", "modetransport");
//     }

//     let isValid = true;
//     fieldsToValidate.forEach((field) => {
//       const valid = validateField(field, formData[field]);
//       if (!valid) isValid = false;
//     });

//     if (!isDeclared) { alert("You must agree to the declaration before submitting."); isValid = false; }
//     if (formData.admissionstd.includes("Select")) { setErrors(prev => ({ ...prev, admissionstd: "Please select a standard." })); isValid = false; }
    
//     // Validate if Photo is selected
//     if (!photo) { alert("Student photo is mandatory. Please choose a file."); isValid = false; }

//     const academicOptions = getAcademicYearOptions().map(opt => opt.value);
//     if (!academicOptions.includes(formData.academicyear)) {
//         setErrors(prev => ({ ...prev, academicyear: "Please select a valid academic year." }));
//         isValid = false;
//     }

//     return isValid;
//   };

//   const selectRandomDivision = () => RANDOM_DIVISIONS[Math.floor(Math.random() * RANDOM_DIVISIONS.length)];

//   const handleSubmit = async () => {
//     if (!validateForm()) { return; };

//     let photoUrl = "";
//     const documentsPayload = [];
//     const submissionPromises = [];
    
//     try {
//         if (photo) {
//             const customName = `${formData.firstname}_${formData.lastname}_photo_${generateUniqueId()}`;
//             submissionPromises.push(uploadToCloudinary(photo, 'student_images', customName).then(res => { photoUrl = res.url; }));
//         }
        
//         for (const [docType, file] of Object.entries(pendingDocuments)) {
//             const customName = `${formData.lastname}_${docType.replace(/\s/g, '_')}_${generateUniqueId()}`;
//             submissionPromises.push(uploadToCloudinary(file, 'student_documents', customName).then(res => {
//                 documentsPayload.push({ type: docType, url: res.url, filename: res.filename });
//             }));
//         }

//         await Promise.all(submissionPromises);

//         const assignedDivision = selectRandomDivision();
//         const structuredData = {
//             studentid: generateUniqueId(),
//             firstname: formData.firstname,
//             lastname: formData.lastname,
//             dob: formData.dob,
//             bloodgroup: formData.bloodgroup,
//             gender: formData.gender,
//             category: formData.category,
//             nationality: formData.nationality,
//             aadharno: formData.aadharno,
//             middlename: formData.middlename,
//             birthplace: formData.birthplace,
//             photo: photoUrl, 
//             documents: documentsPayload, 
//             parent: {
//                 parentid: generateUniqueId(),
//                 fathername: formData.fathername,
//                 mothername: formData.mothername,
//                 primarycontact: formData.primarycontact,
//                 alternatecontact: formData.alternatecontact || "",
//                 emailaddress: formData.emailaddress || "",
//                 occupation: formData.occupation || "",
//                 annualincome: formData.annualincome || "",
//                 guardianname: formData.guardianname || "",
//                 relationwithstudent: formData.relationwithstudent || "",
//             },
//             address: {
//                 addressid: generateUniqueId(),
//                 addressline1: formData.addressline1,
//                 addressline2: formData.addressline2 || "",
//                 city: formData.city,
//                 postalcode: formData.postalcode,
//                 district: formData.district || "",
//                 state: formData.state,
//                 country: formData.country,
//             },
//             admission: {
//                 admissionno: formData.admissionno || generateUniqueId(),
//                 grno: formData.grno || generateUniqueId(),
//                 admissionstd: formData.admissionstd,
//                 academicyear: formData.academicyear,
//                 admissiondivision: formData.admissiondivision || assignedDivision, 
//                 admissiontype: formData.admissiontype,
//                 admissiondate: formData.admissiondate, 
//                 lastschoolname: formData.lastschoolname || "",
//                 laststandardattended: formData.laststandardattended || "",
//                 board: formData.board || "",
//                 mediuminstruction: formData.mediuminstruction || "",
//                 lcno: formData.lcno || "",
//             },
//             transport: {
//                 transportid: generateUniqueId(),
//                 transportstatus: formData.transportstatus,
//                 pickuppoint: formData.pickuppoint || "",
//                 droppoint: formData.droppoint || "",
//                 modetransport: formData.modetransport || "",
//             },
//         };

//         const response = await axios.post(`${API_BASE_URL}api/addstudent`, structuredData, {
//             headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" },
//         });

//       if (response.status === 200 || response.status === 201) {
//         alert("Student admission successful! Assigned to Division " + assignedDivision);
//         setTimeout(() => navigate("/students"), 500); 
//       }
//     } catch (err) {
//       console.error("Form submission error:", err.response);
//       alert("Student already exists Please check the Adhar Card number!");
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="p-8">
//         <div className="bg-white rounded-2xl shadow p-6">
//           <h4 className="text-2xl font-semibold mb-6 text-center">Student Admission</h4>

//           <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6 mb-6">
//             <div className="rounded-lg p-6 shadow-lg bg-white w-full">
//               <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//                 <h4 className="text-xl font-semibold">Student Details</h4>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//                 <div>
//                   <InputField label="First Name *" value={formData.firstname} onChange={(val) => handleChange("firstname", val)} />
//                   {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>}
//                 </div>
//                 <InputField label="Middle Name" value={formData.middlename} onChange={(val) => handleChange("middlename", val)} />
//                 <div>
//                   <InputField label="Last Name *" value={formData.lastname} onChange={(val) => handleChange("lastname", val)} />
//                   {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//                 <div>
//                   <InputField label="Date of Birth *" type="date" value={formData.dob} onChange={(val) => handleChange("dob", val)} max={getTodayDate()} />
//                   {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
//                 </div>
//                 <div>
//                   <InputField label="Place Of Birth *" value={formData.birthplace} onChange={(val) => handleChange("birthplace", val)} />
//                   {errors.birthplace && <p className="text-red-500 text-xs mt-1">{errors.birthplace}</p>}
//                 </div>
//                 <div>
//                   <SelectField label="Blood Group *" options={BLOOD_GROUP_OPTIONS} value={formData.bloodgroup} onChange={(val) => handleChange("bloodgroup", val)} />
//                    {errors.bloodgroup && <p className="text-red-500 text-xs mt-1">{errors.bloodgroup}</p>}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//                 <div>
//                   <SelectField label="Gender *" options={GENDER_OPTIONS} value={formData.gender} onChange={(val) => handleChange("gender", val)} />
//                   {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
//                 </div>
//                 <div>
//                   <SelectField label="Nationality *" options={["Select", "Indian", "Other"]} value={formData.nationality} onChange={(val) => handleChange("nationality", val)} />
//                   {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>}
//                 </div>
//                 <div>
//                   <SelectField label="Category *" options={["Select Category", "General", "OBC", "SC", "ST", "Other"]} value={formData.category} onChange={(val) => handleChange("category", val)} />
//                   {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <InputField label="Aadhaar Number *" value={formData.aadharno} onChange={(val) => handleChange("aadharno", val)} placeholder="12-digit Aadhaar number" />
//                 {errors.aadharno && <p className="text-red-500 text-xs mt-1">{errors.aadharno}</p>}
//               </div>
//             </div>

//             <div className="w-full flex flex-col items-center justify-between p-6 rounded-lg shadow-lg bg-white self-start">
//               <div className="w-full h-48 bg-gray-200 rounded mb-2 flex items-center justify-center relative overflow-hidden shadow-inner">
//                 {photoPreview ? <img src={photoPreview} alt="Preview" className="w-full h-full object-cover rounded" /> : <span className="text-sm text-gray-500">Preview</span>}
//               </div>
//               <label className="bg-blue-400 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded cursor-pointer shadow-md">
//                 Choose File *
//                 <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
//               </label>
//               {photo && <span className="text-xs text-gray-600 mt-1 max-w-[200px] truncate text-center">{photo.name}</span>}
//             </div>
//           </div>

//           <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
//             <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//               <h4 className="text-xl font-semibold">Parent/Guardian Details</h4>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <div>
//                 <InputField label="Father's Name *" value={formData.fathername} onChange={(val) => handleChange("fathername", val)} />
//                 {errors.fathername && <p className="text-red-500 text-xs mt-1">{errors.fathername}</p>}
//               </div>
//               <div>
//                 <InputField label="Mother's Name *" value={formData.mothername} onChange={(val) => handleChange("mothername", val)} />
//                 {errors.mothername && <p className="text-red-500 text-xs mt-1">{errors.mothername}</p>}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <InputField label="Guardian's Name" value={formData.guardianname} onChange={(val) => handleChange("guardianname", val)} />
//               <SelectField label="Relationship with Student" options={RELATIONSHIP_OPTIONS} value={formData.relationwithstudent} onChange={(val) => handleChange("relationwithstudent", val)} />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <div>
//                 <InputField label="Primary Contact Number *" value={formData.primarycontact} onChange={(val) => handleChange("primarycontact", val)} placeholder="10-digit mobile number" />
//                 {errors.primarycontact && <p className="text-red-500 text-xs mt-1">{errors.primarycontact}</p>}
//               </div>
//               <div>
//                 <InputField label="Alternate Contact Number" value={formData.alternatecontact} onChange={(val) => handleChange("alternatecontact", val)} placeholder="10-digit mobile number" />
//                 {errors.alternatecontact && <p className="text-red-500 text-xs mt-1">{errors.alternatecontact}</p>}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <div>
//                 <InputField label="Email Address" value={formData.emailaddress} onChange={(val) => handleChange("emailaddress", val)} type="email" />
//                 {errors.emailaddress && <p className="text-red-500 text-xs mt-1">{errors.emailaddress}</p>}
//               </div>
//               <InputField label="Occupation" value={formData.occupation} onChange={(val) => handleChange("occupation", val)} />
//             </div>
//             <div className="mt-6">
//               <InputField label="Annual Income" value={formData.annualincome} onChange={(val) => handleChange("annualincome", val)} type="number" />
//             </div>
//           </div>

//           <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
//             <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//               <h4 className="text-xl font-semibold">Address Information</h4>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
//               <div>
//                 <InputField label="Address Line 1 *" value={formData.addressline1} onChange={(val) => handleChange("addressline1", val)} />
//                 {errors.addressline1 && <p className="text-red-500 text-xs mt-1">{errors.addressline1}</p>}
//               </div>
//               <InputField label="Address Line 2" value={formData.addressline2} onChange={(val) => handleChange("addressline2", val)} />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <div>
//                 <InputField label="Postal Code *" value={formData.postalcode} onChange={(val) => handleChange("postalcode", val)} />
//                 {errors.postalcode && <p className="text-red-500 text-xs mt-1">{errors.postalcode}</p>}
//               </div>
//               <div>
//                 <InputField label="City *" value={formData.city} onChange={(val) => handleChange("city", val)} disabled={!!formData.state && !!formData.district && !!formData.city} />
//                 {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <InputField label="District" value={formData.district} onChange={(val) => handleChange("district", val)} disabled={!!formData.state && !!formData.district} />
//               <div>
//                 <InputField label="State *" value={formData.state} onChange={(val) => handleChange("state", val)} disabled={!!formData.state} />
//                 {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
//               </div>
//             </div>
//             <div className="mt-6">
//               <InputField label="Country *" value={formData.country} onChange={(val) => handleChange("country", val)} disabled={formData.country === 'India'} />
//             </div>
//           </div>

//           <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
//             <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//               <h4 className="text-xl font-semibold">Admission Details</h4>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <div>
//                 <SelectField label="Admission for Grade/Standard *" options={STANDARD_OPTIONS} value={formData.admissionstd} onChange={(val) => handleChange("admissionstd", val)} />
//                 {errors.admissionstd && <p className="text-red-500 text-xs mt-1">{errors.admissionstd}</p>}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <div>
//                 <SelectField label="Academic Year *" options={getAcademicYearOptions().map(opt => ({ value: opt.value, label: opt.label }))} value={formData.academicyear} onChange={(val) => handleChange("academicyear", val)} />
//                 {errors.academicyear && <p className="text-red-500 text-xs mt-1">{errors.academicyear}</p>}
//               </div>
//               <InputField label="Admission Date" type="date" value={formData.admissiondate} onChange={(val) => handleChange("admissiondate", val)} max={getTodayDate()} />
//             </div>
//             <div className="mt-6">
//               <SelectField label="Admission Type" options={ADMISSION_TYPE_OPTIONS} value={formData.admissiontype} onChange={(value) => { setAdmissionType(value); handleChange("admissiontype", value); }} />
//             </div>
//           </div>

//           {(admissionType === "transfer" || formData.admissiontype === "transfer") && (
//             <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
//               <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//                 <h4 className="text-xl font-semibold">Previous School Details</h4>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
//                 <InputField label="Last School Name" value={formData.lastschoolname} onChange={(val) => handleChange("lastschoolname", val)} />
//                 <InputField label="Last Standard/Grade Attended" value={formData.laststandardattended} onChange={(val) => handleChange("laststandardattended", val)} />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//                 <SelectField label="Board" options={["Select", "CBSE", "ICSE", "State Board", "Other"]} value={formData.board} onChange={(val) => handleChange("board", val)} />
//                 <SelectField label="Medium of Instruction" options={["Select", "English", "Hindi", "Marathi", "Other"]} value={formData.mediuminstruction} onChange={(val) => handleChange("mediuminstruction", val)} />
//               </div>
//               <div className="mt-6">
//                 <InputField label="LC/TC Number" value={formData.lcno} onChange={(val) => handleChange("lcno", val)} />
//               </div>
//             </div>
//           )}

//           <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
//             <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//               <h4 className="text-xl font-semibold">Upload Documents</h4>
//             </div>
//             <div className="mt-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
//                     <SelectField label="Select Document Type *" options={DOCUMENT_OPTIONS} value={currentDocType} onChange={(val) => setCurrentDocType(val)} />
//                     {currentDocType !== DOCUMENT_OPTIONS[0] && (
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700">Upload {currentDocType}</label>
//                             <input type="file" accept=".pdf,image/*" onChange={(e) => handleDocumentFileChange(e, currentDocType)} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
//                             {pendingDocuments[currentDocType] && <p className="text-xs text-green-600 mt-1">File selected: {pendingDocuments[currentDocType].name}</p>}
//                         </div>
//                     )}
//                 </div>
//                 <div className="mt-6">
//                     <h5 className="text-md font-semibold text-gray-800 mb-2">Files Pending Upload:</h5>
//                     <ul className="space-y-2 text-sm text-gray-700">
//                         {DOCUMENT_OPTIONS.filter(type => type !== DOCUMENT_OPTIONS[0]).map((docType) => (
//                             <li key={docType} className={`flex justify-between items-center p-3 border rounded-lg ${pendingDocuments[docType] ? 'bg-blue-100 border-blue-400' : 'bg-white border-gray-200'}`}>
//                                 <span><strong className="font-medium">{docType}:</strong> {pendingDocuments[docType] ? ` ${pendingDocuments[docType].name}` : ' No file selected'}</span>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//           </div>

//           <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
//             <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//               <h4 className="text-xl font-semibold">Transport Details</h4>
//             </div>
//             <div className="space-y-6 mt-6">
//               <div>
//                 <SelectField label="Do you require school transportation? *" options={TRANSPORT_REQUIRED_OPTIONS} value={formData.transportstatus} onChange={(val) => handleChange("transportstatus", val)} />
//                 {errors.transportstatus && <p className="text-red-500 text-xs mt-1">{errors.transportstatus}</p>}
//               </div>

//               {formData.transportstatus === "yes" && (
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <div>
//                     <InputField label="Pickup Point *" value={formData.pickuppoint} onChange={(val) => handleChange("pickuppoint", val)} />
//                     {errors.pickuppoint && <p className="text-red-500 text-xs mt-1">{errors.pickuppoint}</p>}
//                   </div>
//                   <div>
//                     <InputField label="Drop Point *" value={formData.droppoint} onChange={(val) => handleChange("droppoint", val)} />
//                     {errors.droppoint && <p className="text-red-500 text-xs mt-1">{errors.droppoint}</p>}
//                   </div>
//                   <div>
//                     <SelectField label="Mode of Transport *" options={TRANSPORT_MODE_OPTIONS} value={formData.modetransport} onChange={(val) => handleChange("modetransport", val)} />
//                     {errors.modetransport && <p className="text-red-500 text-xs mt-1">{errors.modetransport}</p>}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="rounded-lg p-6 shadow-lg bg-white mb-8">
//             <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
//               <h4 className="text-xl font-semibold">Declaration</h4>
//             </div>
//             <p className="text-sm text-gray-700 mt-6 mb-4">I hereby declare that the information provided above is accurate and true to the best of my knowledge. I agree to abide by the school's policies and code of conduct.</p>
//             <div className="flex items-center">
//               <input type="checkbox" id="declaration" className="mr-2" checked={isDeclared} onChange={(e) => setIsDeclared(e.target.checked)} />
//               <label htmlFor="declaration" className="text-sm text-gray-700">I agree to the terms and conditions</label>
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <button onClick={handleSubmit} disabled={!isDeclared} className={`px-8 py-3 text-white rounded-md font-semibold ${isDeclared ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}>
//               Submit Application
//             </button>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// }

import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config"; 

// --- Helper Functions for Academic Year ---
const getCurrentAcademicYear = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    // Assuming academic year starts in April (month index 3)
    if (month >= 3) {
        return `${year}-${String(year + 1).slice(2)}`;
    } else {
        return `${year - 1}-${String(year).slice(2)}`;
    }
};

const getAcademicYearOptions = () => {
    const currentYear = getCurrentAcademicYear();
    const startYear = parseInt(currentYear.split('-')[0]);
    
    // Calculate Next Year: Next Academic Year starts one year after the current start year
    const nextStartYear = startYear + 1;
    const nextAcademicYear = `${nextStartYear}-${String(nextStartYear + 1).slice(2)}`;

    return [
        { value: currentYear, label: `Current Year (${currentYear})` },
        { value: nextAcademicYear, label: `Next Year (${nextAcademicYear})` },
    ];
};

// --- Options with Capitalized Labels for UI and Lowercase Values for Backend ---
const GENDER_OPTIONS = [
  { value: "Select", label: "Select Gender" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "others", label: "Others" }
];

const BLOOD_GROUP_OPTIONS = [
  { value: "Select", label: "Select Blood Group" },
  { value: "a+", label: "A+" },
  { value: "a-", label: "A-" },
  { value: "b+", label: "B+" },
  { value: "b-", label: "B-" },
  { value: "ab+", label: "AB+" },
  { value: "ab-", label: "AB-" },
  { value: "o+", label: "O+" },
  { value: "o-", label: "O-" }
];

const TRANSPORT_MODE_OPTIONS = [
  { value: "Select", label: "Select Mode" },
  { value: "bus", label: "Bus" },
  { value: "van", label: "Van" },
  { value: "rickshaw", label: "Rickshaw" }
];

const ADMISSION_TYPE_OPTIONS = [
  { value: "regular", label: "Regular" },
  { value: "transfer", label: "Transfer" },
  { value: "other", label: "Other" }
];

const RELATIONSHIP_OPTIONS = [
  { value: "Select", label: "Select Relationship" },
  { value: "father", label: "Father" },
  { value: "mother", label: "Mother" },
  { value: "guardian", label: "Guardian" },
  { value: "other", label: "Other" }
];

const TRANSPORT_REQUIRED_OPTIONS = [
  { value: "Select", label: "Select Option" },
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" }
];

const STANDARD_OPTIONS = [
  "Select Standard", "Nursery", "Junior", "Senior", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"
];

const DIVISION_OPTIONS = ["Select Division", "A", "B", "C", "D", "E"];
const RANDOM_DIVISIONS = ["A", "B", "C", "D", "E"]; 

const DOCUMENT_OPTIONS = [
    "Select Document Type",
    "Aadhaar Card",
    "Birth Certificate",
];

export default function StudentAdmission() {
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photo, setPhoto] = useState(null); 
  const [admissionType, setAdmissionType] = useState("regular");
  const [isDeclared, setIsDeclared] = useState(false);

  const [errors, setErrors] = useState({});
  const [pendingDocuments, setPendingDocuments] = useState({});
  const [currentDocType, setCurrentDocType] = useState(DOCUMENT_OPTIONS[0]);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
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
    fathername: "",
    mothername: "",
    guardianname: "",
    relationwithstudent: "",
    primarycontact: "",
    alternatecontact: "",
    emailaddress: "",
    occupation: "",
    annualincome: "",
    addressline1: "",
    addressline2: "",
    city: "",
    postalcode: "",
    district: "",
    state: "",
    country: "India",
    admissionstd: "", 
    admissiondivision: "", 
    academicyear: getCurrentAcademicYear(),
    admissiontype: "regular",
    lastschoolname: "",
    laststandardattended: "",
    board: "",
    mediuminstruction: "",
    lcno: "",
    admissiondate: getTodayDate(), 
    admissionno: "",
    grno: "",
    transportstatus: "",
    pickuppoint: "",
    droppoint: "",
    modetransport: "",
  });

  const fetchAddressByPin = async (pincode) => {
    if (!/^\d{6}$/.test(pincode)) return;
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      if (response.data && response.data[0].Status === 'Success') {
        const postOffice = response.data[0].PostOffice[0];
        setFormData(prev => ({
          ...prev,
          city: postOffice.Block || postOffice.Block, 
          district: postOffice.District,
          state: postOffice.State,
          country: 'India', 
        }));
        setErrors(prev => ({ ...prev, postalcode: "" }));
      } else {
        setErrors(prev => ({ ...prev, postalcode: "Invalid PIN Code" }));
      }
    } catch (error) {
      console.error("Error fetching PIN code data:", error);
      setErrors(prev => ({ ...prev, postalcode: "Error fetching address data" }));
    }
  };

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
      case "birthplace": 
        if (!value.trim()) errorMsg = "This field is required";
        break;
      case "dob":
        if (!value) errorMsg = "Date of birth is required";
        else if (new Date(value) > new Date()) errorMsg = "DOB cannot be in the future";
        break;
      case "gender":
      case "bloodgroup":
      case "nationality":
      case "transportstatus":
      case "category": 
      case "admissionstd": 
        if (!value || value.includes("Select")) errorMsg = "Please select an option";
        break;
      case "pickuppoint":
      case "droppoint":
        if (formData.transportstatus === "yes" && !value.trim()) errorMsg = "This field is required for transport";
        break;
      case "modetransport":
        if (formData.transportstatus === "yes" && (!value || value.includes("Select"))) errorMsg = "Please select transport mode";
        break;
      case "academicyear": 
        if (!value) errorMsg = "Academic Year is required";
        break;
      case "aadharno":
        if (!value.trim()) errorMsg = "Aadhaar number is required";
        else if (!/^\d{12}$/.test(value)) errorMsg = "Aadhaar must be 12 digits";
        break;
      case "primarycontact":
        if (!value.trim()) errorMsg = "Primary contact is required";
        else if (!/^\d{10}$/.test(value)) errorMsg = "Contact must be 10 digits";
        break;
      case "alternatecontact":
        if (value && !/^\d{10}$/.test(value)) errorMsg = "Contact must be 10 digits";
        break;
      case "emailaddress":
        if (value && !/^\S+@\S+\.\S+$/.test(value)) errorMsg = "Invalid email address";
        break;
      case "postalcode":
        if (!value.trim()) errorMsg = "Postal code is required";
        else if (!/^\d{6}$/.test(value)) errorMsg = "PIN code must be 6 digits";
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

    if (field === "postalcode" && value.length === 6 && /^\d{6}$/.test(value)) {
        fetchAddressByPin(value);
    } else if (field === "postalcode" && value.length < 6) {
        setFormData(prev => ({ ...prev, city: '', district: '', state: '' }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) { alert("Please select a valid image file"); return; }
      if (file.size > 5 * 1024 * 1024) { alert("Image file size should be less than 5MB"); return; }
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };
  
  const handleDocumentFileChange = (e, docType) => {
      const file = e.target.files[0];
      if (file) {
          if (file.size > 10 * 1024 * 1024) { alert("Document file size should be less than 10MB"); e.target.value = null; return; }
          setPendingDocuments(prev => ({ ...prev, [docType]: file }));
      } else {
          setPendingDocuments(prev => {
              const newDocs = { ...prev };
              delete newDocs[docType];
              return newDocs;
          });
      }
  };

  const generateUniqueId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9);

  const uploadToCloudinary = async (file, docType, customName) => {
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("upload_preset", "sspd-student-management");
    uploadFormData.append("folder", `student_documents`); 
    uploadFormData.append("public_id", customName);

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dyloa2svi/auto/upload", uploadFormData);
      return { url: res.data.secure_url, filename: file.name };
    } catch (err) {
      console.error("Upload error:", err);
      throw err;
    }
  };

  const validateForm = () => {
    const fieldsToValidate = [
      "firstname", "lastname", "dob", "gender", "bloodgroup",
      "category", "nationality", "aadharno", "fathername", "mothername",
      "primarycontact", "alternatecontact", "addressline1", "city", "postalcode",
      "state", "country", "admissionstd", "academicyear", "transportstatus",
      "birthplace" 
    ];

    if (formData.transportstatus === "yes") {
      fieldsToValidate.push("pickuppoint", "droppoint", "modetransport");
    }

    let isValid = true;
    fieldsToValidate.forEach((field) => {
      const valid = validateField(field, formData[field]);
      if (!valid) isValid = false;
    });

    if (!isDeclared) { alert("You must agree to the declaration before submitting."); isValid = false; }
    if (formData.admissionstd.includes("Select")) { setErrors(prev => ({ ...prev, admissionstd: "Please select a standard." })); isValid = false; }
    
    if (!photo) { alert("Student photo is mandatory. Please choose a file."); isValid = false; }

    const academicOptions = getAcademicYearOptions().map(opt => opt.value);
    if (!academicOptions.includes(formData.academicyear)) {
        setErrors(prev => ({ ...prev, academicyear: "Please select a valid academic year." }));
        isValid = false;
    }

    return isValid;
  };

  const selectRandomDivision = () => RANDOM_DIVISIONS[Math.floor(Math.random() * RANDOM_DIVISIONS.length)];

  const handleSubmit = async () => {
    if (!validateForm()) { return; };

    let photoUrl = "";
    const documentsPayload = [];
    const submissionPromises = [];
    
    try {
        if (photo) {
            const customName = `${formData.firstname}_${formData.lastname}_photo_${generateUniqueId()}`;
            submissionPromises.push(uploadToCloudinary(photo, 'student_images', customName).then(res => { photoUrl = res.url; }));
        }
        
        for (const [docType, file] of Object.entries(pendingDocuments)) {
            const customName = `${formData.lastname}_${docType.replace(/\s/g, '_')}_${generateUniqueId()}`;
            submissionPromises.push(uploadToCloudinary(file, 'student_documents', customName).then(res => {
                documentsPayload.push({ type: docType, url: res.url, filename: res.filename });
            }));
        }

        await Promise.all(submissionPromises);

        const assignedDivision = selectRandomDivision();
        const structuredData = {
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
            photo: photoUrl, 
            documents: documentsPayload, 
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
            admission: {
                // Set these to empty strings so the backend logic generates ADM-XXX and GR-XXX
                admissionno: "", 
                grno: "",
                admissionstd: formData.admissionstd,
                academicyear: formData.academicyear,
                admissiondivision: formData.admissiondivision || assignedDivision, 
                admissiontype: formData.admissiontype,
                admissiondate: formData.admissiondate, 
                lastschoolname: formData.lastschoolname || "",
                laststandardattended: formData.laststandardattended || "",
                board: formData.board || "",
                mediuminstruction: formData.mediuminstruction || "",
                lcno: formData.lcno || "",
            },
            transport: {
                transportid: generateUniqueId(),
                transportstatus: formData.transportstatus,
                pickuppoint: formData.pickuppoint || "",
                droppoint: formData.droppoint || "",
                modetransport: formData.modetransport || "",
            },
        };

        const response = await axios.post(`${API_BASE_URL}api/addstudent`, structuredData, {
            headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" },
        });

      if (response.status === 200 || response.status === 201) {
        alert("Student admission successful! Assigned to Division " + assignedDivision);
        setTimeout(() => navigate("/students"), 500); 
      }
    // } catch (err) {
    //   console.error("Form submission error:", err.response);
    //   alert("Student already exists Please check the Adhar Card number!");
    // }
    }catch (err) {
  console.error("Form submission error:", err.response);

  // Check if the backend sent a specific conflict message
  if (err.response && err.response.status === 409) {
    const backendMessage = err.response.data.message;
    const duplicateField = err.response.data.duplicateField;

    // Provide a user-friendly field name
    let friendlyField = duplicateField;
    if (duplicateField === "admission.admissionno") friendlyField = "Admission Number";
    if (duplicateField === "aadharno") friendlyField = "Aadhaar Card Number";
    if (duplicateField === "parent.primarycontact") friendlyField = "Contact Number";

    alert(`Student already exists! Please check the ${friendlyField}.`);
  } else {
    // Fallback for other types of errors
    alert("An error occurred during submission. Please try again later.");
  }
}
  };

  return (
    <MainLayout>
      <div className="p-8">
        <div className="bg-white rounded-2xl shadow p-6">
          <h4 className="text-2xl font-semibold mb-6 text-center">Student Admission</h4>

          <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6 mb-6">
            <div className="rounded-lg p-6 shadow-lg bg-white w-full">
              <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
                <h4 className="text-xl font-semibold">Student Details</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <InputField label="First Name *" value={formData.firstname} onChange={(val) => handleChange("firstname", val)} />
                  {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>}
                </div>
                <InputField label="Middle Name" value={formData.middlename} onChange={(val) => handleChange("middlename", val)} />
                <div>
                  <InputField label="Last Name *" value={formData.lastname} onChange={(val) => handleChange("lastname", val)} />
                  {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <InputField label="Date of Birth *" type="date" value={formData.dob} onChange={(val) => handleChange("dob", val)} max={getTodayDate()} />
                  {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                </div>
                <div>
                  <InputField label="Place Of Birth *" value={formData.birthplace} onChange={(val) => handleChange("birthplace", val)} />
                  {errors.birthplace && <p className="text-red-500 text-xs mt-1">{errors.birthplace}</p>}
                </div>
                <div>
                  <SelectField label="Blood Group *" options={BLOOD_GROUP_OPTIONS} value={formData.bloodgroup} onChange={(val) => handleChange("bloodgroup", val)} />
                   {errors.bloodgroup && <p className="text-red-500 text-xs mt-1">{errors.bloodgroup}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <SelectField label="Gender *" options={GENDER_OPTIONS} value={formData.gender} onChange={(val) => handleChange("gender", val)} />
                  {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                </div>
                <div>
                  <SelectField label="Nationality *" options={["Select", "Indian", "Other"]} value={formData.nationality} onChange={(val) => handleChange("nationality", val)} />
                  {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>}
                </div>
                <div>
                  <SelectField label="Category *" options={["Select Category", "General", "OBC", "SC", "ST", "Other"]} value={formData.category} onChange={(val) => handleChange("category", val)} />
                  {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                </div>
              </div>

              <div className="mt-6">
                <InputField label="Aadhaar Number *" value={formData.aadharno} onChange={(val) => handleChange("aadharno", val)} placeholder="12-digit Aadhaar number" />
                {errors.aadharno && <p className="text-red-500 text-xs mt-1">{errors.aadharno}</p>}
              </div>
            </div>

            <div className="w-full flex flex-col items-center justify-between p-6 rounded-lg shadow-lg bg-white self-start">
              <div className="w-full h-48 bg-gray-200 rounded mb-2 flex items-center justify-center relative overflow-hidden shadow-inner">
                {photoPreview ? <img src={photoPreview} alt="Preview" className="w-full h-full object-cover rounded" /> : <span className="text-sm text-gray-500">Preview</span>}
              </div>
              <label className="bg-blue-400 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded cursor-pointer shadow-md">
                Choose File *
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
              </label>
              {photo && <span className="text-xs text-gray-600 mt-1 max-w-[200px] truncate text-center">{photo.name}</span>}
            </div>
          </div>

          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">Parent/Guardian Details</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <InputField label="Father's Name *" value={formData.fathername} onChange={(val) => handleChange("fathername", val)} />
                {errors.fathername && <p className="text-red-500 text-xs mt-1">{errors.fathername}</p>}
              </div>
              <div>
                <InputField label="Mother's Name *" value={formData.mothername} onChange={(val) => handleChange("mothername", val)} />
                {errors.mothername && <p className="text-red-500 text-xs mt-1">{errors.mothername}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <InputField label="Guardian's Name" value={formData.guardianname} onChange={(val) => handleChange("guardianname", val)} />
              <SelectField label="Relationship with Student" options={RELATIONSHIP_OPTIONS} value={formData.relationwithstudent} onChange={(val) => handleChange("relationwithstudent", val)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <InputField label="Primary Contact Number *" value={formData.primarycontact} onChange={(val) => handleChange("primarycontact", val)} placeholder="10-digit mobile number" />
                {errors.primarycontact && <p className="text-red-500 text-xs mt-1">{errors.primarycontact}</p>}
              </div>
              <div>
                <InputField label="Alternate Contact Number" value={formData.alternatecontact} onChange={(val) => handleChange("alternatecontact", val)} placeholder="10-digit mobile number" />
                {errors.alternatecontact && <p className="text-red-500 text-xs mt-1">{errors.alternatecontact}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <InputField label="Email Address" value={formData.emailaddress} onChange={(val) => handleChange("emailaddress", val)} type="email" />
                {errors.emailaddress && <p className="text-red-500 text-xs mt-1">{errors.emailaddress}</p>}
              </div>
              <InputField label="Occupation" value={formData.occupation} onChange={(val) => handleChange("occupation", val)} />
            </div>
            <div className="mt-6">
              <InputField label="Annual Income" value={formData.annualincome} onChange={(val) => handleChange("annualincome", val)} type="number" />
            </div>
          </div>

          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">Address Information</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
              <div>
                <InputField label="Address Line 1 *" value={formData.addressline1} onChange={(val) => handleChange("addressline1", val)} />
                {errors.addressline1 && <p className="text-red-500 text-xs mt-1">{errors.addressline1}</p>}
              </div>
              <InputField label="Address Line 2" value={formData.addressline2} onChange={(val) => handleChange("addressline2", val)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <InputField label="Postal Code *" value={formData.postalcode} onChange={(val) => handleChange("postalcode", val)} />
                {errors.postalcode && <p className="text-red-500 text-xs mt-1">{errors.postalcode}</p>}
              </div>
              <div>
                <InputField label="City *" value={formData.city} onChange={(val) => handleChange("city", val)} disabled={!!formData.state && !!formData.district && !!formData.city} />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <InputField label="District" value={formData.district} onChange={(val) => handleChange("district", val)} disabled={!!formData.state && !!formData.district} />
              <div>
                <InputField label="State *" value={formData.state} onChange={(val) => handleChange("state", val)} disabled={!!formData.state} />
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
              </div>
            </div>
            <div className="mt-6">
              <InputField label="Country *" value={formData.country} onChange={(val) => handleChange("country", val)} disabled={formData.country === 'India'} />
            </div>
          </div>

          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">Admission Details</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <SelectField label="Admission for Grade/Standard *" options={STANDARD_OPTIONS} value={formData.admissionstd} onChange={(val) => handleChange("admissionstd", val)} />
                {errors.admissionstd && <p className="text-red-500 text-xs mt-1">{errors.admissionstd}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <SelectField label="Academic Year *" options={getAcademicYearOptions().map(opt => ({ value: opt.value, label: opt.label }))} value={formData.academicyear} onChange={(val) => handleChange("academicyear", val)} />
                {errors.academicyear && <p className="text-red-500 text-xs mt-1">{errors.academicyear}</p>}
              </div>
              <InputField label="Admission Date" type="date" value={formData.admissiondate} onChange={(val) => handleChange("admissiondate", val)} max={getTodayDate()} />
            </div>
            <div className="mt-6">
              <SelectField label="Admission Type" options={ADMISSION_TYPE_OPTIONS} value={formData.admissiontype} onChange={(value) => { setAdmissionType(value); handleChange("admissiontype", value); }} />
            </div>
          </div>

          {(admissionType === "transfer" || formData.admissiontype === "transfer") && (
            <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
              <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
                <h4 className="text-xl font-semibold">Previous School Details</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
                <InputField label="Last School Name" value={formData.lastschoolname} onChange={(val) => handleChange("lastschoolname", val)} />
                <InputField label="Last Standard/Grade Attended" value={formData.laststandardattended} onChange={(val) => handleChange("laststandardattended", val)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <SelectField label="Board" options={["Select", "CBSE", "ICSE", "State Board", "Other"]} value={formData.board} onChange={(val) => handleChange("board", val)} />
                <SelectField label="Medium of Instruction" options={["Select", "English", "Hindi", "Marathi", "Other"]} value={formData.mediuminstruction} onChange={(val) => handleChange("mediuminstruction", val)} />
              </div>
              <div className="mt-6">
                <InputField label="LC/TC Number" value={formData.lcno} onChange={(val) => handleChange("lcno", val)} />
              </div>
            </div>
          )}

          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">Upload Documents</h4>
            </div>
            <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <SelectField label="Select Document Type *" options={DOCUMENT_OPTIONS} value={currentDocType} onChange={(val) => setCurrentDocType(val)} />
                    {currentDocType !== DOCUMENT_OPTIONS[0] && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Upload {currentDocType}</label>
                            <input type="file" accept=".pdf,image/*" onChange={(e) => handleDocumentFileChange(e, currentDocType)} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                            {pendingDocuments[currentDocType] && <p className="text-xs text-green-600 mt-1">File selected: {pendingDocuments[currentDocType].name}</p>}
                        </div>
                    )}
                </div>
                <div className="mt-6">
                    <h5 className="text-md font-semibold text-gray-800 mb-2">Files Pending Upload:</h5>
                    <ul className="space-y-2 text-sm text-gray-700">
                        {DOCUMENT_OPTIONS.filter(type => type !== DOCUMENT_OPTIONS[0]).map((docType) => (
                            <li key={docType} className={`flex justify-between items-center p-3 border rounded-lg ${pendingDocuments[docType] ? 'bg-blue-100 border-blue-400' : 'bg-white border-gray-200'}`}>
                                <span><strong className="font-medium">{docType}:</strong> {pendingDocuments[docType] ? ` ${pendingDocuments[docType].name}` : ' No file selected'}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
          </div>

          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">Transport Details</h4>
            </div>
            <div className="space-y-6 mt-6">
              <div>
                <SelectField label="Do you require school transportation? *" options={TRANSPORT_REQUIRED_OPTIONS} value={formData.transportstatus} onChange={(val) => handleChange("transportstatus", val)} />
                {errors.transportstatus && <p className="text-red-500 text-xs mt-1">{errors.transportstatus}</p>}
              </div>

              {formData.transportstatus === "yes" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <InputField label="Pickup Point *" value={formData.pickuppoint} onChange={(val) => handleChange("pickuppoint", val)} />
                    {errors.pickuppoint && <p className="text-red-500 text-xs mt-1">{errors.pickuppoint}</p>}
                  </div>
                  <div>
                    <InputField label="Drop Point *" value={formData.droppoint} onChange={(val) => handleChange("droppoint", val)} />
                    {errors.droppoint && <p className="text-red-500 text-xs mt-1">{errors.droppoint}</p>}
                  </div>
                  <div>
                    <SelectField label="Mode of Transport *" options={TRANSPORT_MODE_OPTIONS} value={formData.modetransport} onChange={(val) => handleChange("modetransport", val)} />
                    {errors.modetransport && <p className="text-red-500 text-xs mt-1">{errors.modetransport}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-lg p-6 shadow-lg bg-white mb-8">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">Declaration</h4>
            </div>
            <p className="text-sm text-gray-700 mt-6 mb-4">I hereby declare that the information provided above is accurate and true to the best of my knowledge. I agree to abide by the school's policies and code of conduct.</p>
            <div className="flex items-center">
              <input type="checkbox" id="declaration" className="mr-2" checked={isDeclared} onChange={(e) => setIsDeclared(e.target.checked)} />
              <label htmlFor="declaration" className="text-sm text-gray-700">I agree to the terms and conditions</label>
            </div>
          </div>

          <div className="flex justify-center">
            <button onClick={handleSubmit} disabled={!isDeclared} className={`px-8 py-3 text-white rounded-md font-semibold ${isDeclared ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}>
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}