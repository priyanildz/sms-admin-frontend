// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import Select from "react-select";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const AddEvents = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [selectedParticipants, setSelectedParticipants] = useState([]);
//   const [allStudents, setAllStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [participantsOptions, setParticipantsOptions] = useState([]);
//   const [formData, setFormData] = useState({
//     eventName: "",
//     date: "",
//     managedBy: "",
//     standard: "",
//     division: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [loadingStudents, setLoadingStudents] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // Fetch all students from API on component mount
//   useEffect(() => {
//     const fetchStudents = async () => {
//       if (formData.division && formData.standard) {
//         console.log(
//           "Fetching students for:",
//           formData.standard,
//           formData.division
//         );
//         setLoadingStudents(true);
//         try {
//           const res = await axios.post(
//             "https://sspd-school-portal.vercel.app/api/student",
//             { standard: formData.standard, division: formData.division },
//             {
//               headers: {
//                 auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//               },
//             }
//           );
//           console.log("Students fetched:", res.data);
//           setAllStudents(res.data);
//           setError(""); 
//         } catch (err) {
//           console.error("Error fetching students:", err);
//           setError("Failed to load students. Please try again.");
//           setAllStudents([]);
//         } finally {
//           setLoadingStudents(false);
//         }
//       } else {
//         // Clear students when standard or division is empty
//         setAllStudents([]);
//         setFilteredStudents([]);
//         setParticipantsOptions([]);
//       }
//     };
//     fetchStudents();
//   }, [formData.standard, formData.division]);

//   // Process students for select options when allStudents changes
//   useEffect(() => {
//     console.log("Processing students:", allStudents);
//     if (allStudents.length > 0) {
//       // Since API already filters by standard/division, use all returned students
//       setFilteredStudents(allStudents);

//       // Create options for react-select
//       const options = allStudents.map((student) => ({
//         value: student.firstname,
//         label: `${student.firstname} ${student.lastname || ""}`.trim(),
//         studentId: student._id || student.id,
//       }));
//       setParticipantsOptions(options);
//     } else {
//       setFilteredStudents([]);
//       setParticipantsOptions([]);
//     }
//   }, [allStudents]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Get current date in YYYY-MM-DD format
//   const today = new Date().toISOString().split("T")[0];

//   const validateStep1 = () => {
//     return (
//       formData.eventName &&
//       formData.date &&
//       formData.managedBy &&
//       formData.standard &&
//       formData.division
//     );
//   };

//   const validateStep2 = () => {
//     return selectedParticipants.length > 0;
//   };

//   const handleNextStep = () => {
//     if (!validateStep1()) {
//       setError("Please fill in all required fields.");
//       return;
//     }

//     // Validate date is not in the past
//     if (formData.date < today) {
//       setError(
//         "Event date cannot be in the past. Please select current or future date."
//       );
//       return;
//     }

//     setError("");
//     setLoadingStudents(true);

//     // Small delay to show loading state for students
//     setTimeout(() => {
//       setLoadingStudents(false);
//       setCurrentStep(2);
//     }, 500);
//   };

//   const handlePreviousStep = () => {
//     setCurrentStep(1);
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateStep2()) {
//       setError("Please select at least one participant.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const eventData = {
//         eventname: formData.eventName,
//         date: formData.date,
//         managedby: formData.managedBy,
//         standard: formData.standard,
//         division: formData.division,
//         participants: selectedParticipants.map(
//           (participant) => participant.value
//         ),
//       };

//       const response = await axios.post(
//         "https://sspd-school-portal.vercel.app/api/addevent",
//         eventData,
//         {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         }
//       );

//       if (response.status >= 400) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       console.log("Event created successfully:", response.data);

//       // Reset form
//       setFormData({
//         eventName: "",
//         date: "",
//         managedBy: "",
//         standard: "",
//         division: "",
//       });
//       setSelectedParticipants([]);
//       setCurrentStep(1);

//       navigate("/events");
//     } catch (err) {
//       console.error("Error creating event:", err);
//       setError(err.message || "Failed to create event. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderStep1 = () => (
//     <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
//       <h3 className="text-lg font-semibold text-gray-700 mb-6 flex items-center">
//         <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
//           1
//         </span>
//         Event Details
//       </h3>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="text-sm font-medium text-gray-700 block mb-1">
//             Event Name *
//           </label>
//           <input
//             name="eventName"
//             value={formData.eventName}
//             onChange={handleInputChange}
//             className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="e.g., Science Fair"
//             required
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium text-gray-700 block mb-1">
//             Event Date *
//           </label>
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleInputChange}
//             min={today}
//             className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             required
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             Only current or future dates allowed
//           </p>
//         </div>

//         <div>
//           <label className="text-sm font-medium text-gray-700 block mb-1">
//             Managed By *
//           </label>
//           <input
//             name="managedBy"
//             value={formData.managedBy}
//             onChange={handleInputChange}
//             className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="e.g., Mr. John Smith"
//             required
//           />
//         </div>

//         <div className="flex gap-4">
//           <div className="flex-1">
//             <label className="text-sm font-medium text-gray-700 block mb-1">
//               Standard *
//             </label>
//             <input
//               name="standard"
//               value={formData.standard}
//               onChange={handleInputChange}
//               className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="e.g., 10"
//               required
//             />
//           </div>

//           <div className="flex-1">
//             <label className="text-sm font-medium text-gray-700 block mb-1">
//               Division *
//             </label>
//             <input
//               name="division"
//               value={formData.division}
//               onChange={handleInputChange}
//               className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="e.g., A"
//               required
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderStep2 = () => (
//     <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
//       <h3 className="text-lg font-semibold text-gray-700 mb-6 flex items-center">
//         <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
//           2
//         </span>
//         👥 Select Participants
//       </h3>

//       <div className="mb-4 p-4 bg-blue-50 rounded-lg">
//         <h4 className="font-medium text-blue-800 mb-2">Event Summary:</h4>
//         <div className="grid grid-cols-2 gap-4 text-sm text-blue-700">
//           <div>
//             <strong>Event:</strong> {formData.eventName}
//           </div>
//           <div>
//             <strong>Date:</strong> {formData.date}
//           </div>
//           <div>
//             <strong>Class:</strong> {formData.standard} - {formData.division}
//           </div>
//           <div>
//             <strong>Managed by:</strong> {formData.managedBy}
//           </div>
//         </div>
//       </div>

//       {loadingStudents ? (
//         <div className="text-center py-8">
//           <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <p className="mt-2 text-gray-600">Loading students...</p>
//         </div>
//       ) : (
//         <>
//           <div className="mb-4">
//             <p className="text-sm text-gray-600">
//               Found <strong>{filteredStudents.length}</strong> students in
//               Standard {formData.standard} - Division {formData.division}
//             </p>
//           </div>

//           <Select
//             options={participantsOptions}
//             isMulti
//             value={selectedParticipants}
//             onChange={setSelectedParticipants}
//             className="basic-multi-select"
//             classNamePrefix="select"
//             placeholder={
//               participantsOptions.length > 0
//                 ? "Select participants..."
//                 : "No students found for this class"
//             }
//             isDisabled={participantsOptions.length === 0}
//             maxMenuHeight={200}
//           />

//           {selectedParticipants.length > 0 && (
//             <p className="mt-2 text-sm text-green-600">
//               Selected {selectedParticipants.length} participant(s)
//             </p>
//           )}
//         </>
//       )}
//     </div>
//   );

//   return (
//     <MainLayout>
//       <div className="p-6">
//         <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
//           <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">
//             Create New Event
//           </h2>

//           {/* Progress Indicator */}
//           <div className="flex items-center justify-center mb-8">
//             <div className="flex items-center">
//               <div
//                 className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium ${
//                   currentStep >= 1
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-300 text-gray-600"
//                 }`}
//               >
//                 1
//               </div>
//               <div
//                 className={`w-16 h-0.5 ${
//                   currentStep > 1 ? "bg-blue-600" : "bg-gray-300"
//                 }`}
//               ></div>
//               <div
//                 className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium ${
//                   currentStep >= 2
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-300 text-gray-600"
//                 }`}
//               >
//                 2
//               </div>
//             </div>
//           </div>

//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
//               <svg
//                 className="w-4 h-4 mr-2"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             {currentStep === 1 ? renderStep1() : renderStep2()}

//             {/* Action Buttons */}
//             <div className="flex justify-between mt-8">
//               <button
//                 type="button"
//                 onClick={() => navigate("/events")}
//                 className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
//                 disabled={loading || loadingStudents}
//               >
//                 Cancel
//               </button>

//               <div className="flex">

//                 {currentStep === 1 ? (
//                   <button
//                     type="button"
//                     onClick={handleNextStep}
//                     className={`px-2 py-2 rounded-lg text-white transition ${
//                       !validateStep1()
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-blue-600 hover:bg-blue-700"
//                     }`}
//                     disabled={!validateStep1()}
//                   >
//                     Next: Select Participants
//                   </button>
//                 ) : (
//                   <button
//                     type="submit"
//                     className={`px-6 py-2 rounded-lg text-white transition ${
//                       loading || !validateStep2()
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-green-600 hover:bg-green-700"
//                     }`}
//                     disabled={loading || !validateStep2()}
//                   >
//                     {loading ? (
//                       <span className="flex items-center">
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                         Creating Event...
//                       </span>
//                     ) : (
//                       "Create Event"
//                     )}
//                   </button>
//                 )}
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default AddEvents;

// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import Select from "react-select";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // Define the base URL for your local backend API
// const LOCAL_API_BASE_URL = "http://localhost:5000/api";

// const AddEvents = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [selectedParticipants, setSelectedParticipants] = useState([]);
//   const [allStudents, setAllStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [participantsOptions, setParticipantsOptions] = useState([]);
//   const [formData, setFormData] = useState({
//     eventName: "",
//     date: "",
//     managedBy: "",
//     standard: "",
//     division: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [loadingStudents, setLoadingStudents] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   // Fetch all students from API on component mount
//   useEffect(() => {
//     const fetchStudents = async () => {
//       if (formData.division && formData.standard) {
//         console.log(
//           "Fetching students for:",
//           formData.standard,
//           formData.division
//         );
//         setLoadingStudents(true);
//         try {
//           const res = await axios.post(
//             // #vercel: Changed from hardcoded Vercel URL to local base URL
//             `${LOCAL_API_BASE_URL}/student`,
//             { standard: formData.standard, division: formData.division },
//             {
//               headers: {
//                 auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//               },
//             }
//           );
//           console.log("Students fetched:", res.data);
//           setAllStudents(res.data);
//           setError(""); 
//         } catch (err) {
//           console.error("Error fetching students:", err);
//           setError("Failed to load students. Please try again.");
//           setAllStudents([]);
//         } finally {
//           setLoadingStudents(false);
//         }
//       } else {
//         // Clear students when standard or division is empty
//         setAllStudents([]);
//         setFilteredStudents([]);
//         setParticipantsOptions([]);
//       }
//     };
//     fetchStudents();
//   }, [formData.standard, formData.division]);

//   // Process students for select options when allStudents changes
//   useEffect(() => {
//     console.log("Processing students:", allStudents);
//     if (allStudents.length > 0) {
//       // Since API already filters by standard/division, use all returned students
//       setFilteredStudents(allStudents);

//       // Create options for react-select
//       const options = allStudents.map((student) => ({
//         // Using student._id or studentId for the value to ensure uniqueness and proper submission
//         value: student._id, 
//         label: `${student.firstname} ${student.lastname || ""}`.trim(),
//         studentId: student._id || student.id,
//       }));
//       setParticipantsOptions(options);
//     } else {
//       setFilteredStudents([]);
//       setParticipantsOptions([]);
//     }
//   }, [allStudents]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Get current date in YYYY-MM-DD format
//   const today = new Date().toISOString().split("T")[0];

//   const validateStep1 = () => {
//     return (
//       formData.eventName &&
//       formData.date &&
//       formData.managedBy &&
//       formData.standard &&
//       formData.division
//     );
//   };

//   const validateStep2 = () => {
//     return selectedParticipants.length > 0;
//   };

//   const handleNextStep = () => {
//     if (!validateStep1()) {
//       setError("Please fill in all required fields.");
//       return;
//     }

//     // Validate date is not in the past
//     if (formData.date < today) {
//       setError(
//         "Event date cannot be in the past. Please select current or future date."
//       );
//       return;
//     }

//     setError("");
//     setLoadingStudents(true);

//     // Small delay to show loading state for students
//     setTimeout(() => {
//       setLoadingStudents(false);
//       setCurrentStep(2);
//     }, 500);
//   };

//   const handlePreviousStep = () => {
//     setCurrentStep(1);
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateStep2()) {
//       setError("Please select at least one participant.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const eventData = {
//         eventname: formData.eventName,
//         date: formData.date,
//         managedby: formData.managedBy,
//         standard: formData.standard,
//         division: formData.division,
//         participants: selectedParticipants.map(
//           (participant) => participant.value // participant.value is now the student _id
//         ),
//       };

//       const response = await axios.post(
//         // #vercel: Changed from hardcoded Vercel URL to local base URL
//         `${LOCAL_API_BASE_URL}/addevent`,
//         eventData,
//         {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         }
//       );

//       if (response.status >= 400) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       console.log("Event created successfully:", response.data);

//       // Reset form
//       setFormData({
//         eventName: "",
//         date: "",
//         managedBy: "",
//         standard: "",
//         division: "",
//       });
//       setSelectedParticipants([]);
//       setCurrentStep(1);

//       navigate("/events");
//     } catch (err) {
//       console.error("Error creating event:", err);
//       setError(err.message || "Failed to create event. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderStep2 = () => (
//     <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
//       <h3 className="text-lg font-semibold text-gray-700 mb-6 flex items-center">
//         <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
//           2
//         </span>
//         👥 Select Participants
//       </h3>

//       <div className="mb-4 p-4 bg-blue-50 rounded-lg">
//         <h4 className="font-medium text-blue-800 mb-2">Event Summary:</h4>
//         <div className="grid grid-cols-2 gap-4 text-sm text-blue-700">
//           <div>
//             <strong>Event:</strong> {formData.eventName}
//           </div>
//           <div>
//             <strong>Date:</strong> {formData.date}
//           </div>
//           <div>
//             <strong>Class:</strong> {formData.standard} - {formData.division}
//           </div>
//           <div>
//             <strong>Managed by:</strong> {formData.managedBy}
//           </div>
//         </div>
//       </div>

//       {loadingStudents ? (
//         <div className="text-center py-8">
//           <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           <p className="mt-2 text-gray-600">Loading students...</p>
//         </div>
//       ) : (
//         <>
//           <div className="mb-4">
//             <p className="text-sm text-gray-600">
//               Found <strong>{filteredStudents.length}</strong> students in
//               Standard {formData.standard} - Division {formData.division}
//             </p>
//           </div>

//           <Select
//             options={participantsOptions}
//             isMulti
//             value={selectedParticipants}
//             onChange={setSelectedParticipants}
//             className="basic-multi-select"
//             classNamePrefix="select"
//             placeholder={
//               participantsOptions.length > 0
//                 ? "Select participants..."
//                 : "No students found for this class"
//             }
//             isDisabled={participantsOptions.length === 0}
//             maxMenuHeight={200}
//           />

//           {selectedParticipants.length > 0 && (
//             <p className="mt-2 text-sm text-green-600">
//               Selected {selectedParticipants.length} participant(s)
//             </p>
//           )}
//         </>
//       )}
//     </div>
//   );

//   return (
//     <MainLayout>
//       <div className="p-6">
//         <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
//           <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">
//             Create New Event
//           </h2>

//           {/* Progress Indicator */}
//           <div className="flex items-center justify-center mb-8">
//             <div className="flex items-center">
//               <div
//                 className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium ${
//                   currentStep >= 1
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-300 text-gray-600"
//                 }`}
//               >
//                 1
//               </div>
//               <div
//                 className={`w-16 h-0.5 ${
//                   currentStep > 1 ? "bg-blue-600" : "bg-gray-300"
//                 }`}
//               ></div>
//               <div
//                 className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium ${
//                   currentStep >= 2
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-300 text-gray-600"
//                 }`}
//               >
//                 2
//               </div>
//             </div>
//           </div>

//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
//               <svg
//                 className="w-4 h-4 mr-2"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             {currentStep === 1 ? renderStep1() : renderStep2()}

//             {/* Action Buttons */}
//             <div className="flex justify-between mt-8">
//               <button
//                 type="button"
//                 onClick={() => navigate("/events")}
//                 className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
//                 disabled={loading || loadingStudents}
//               >
//                 Cancel
//               </button>

//               <div className="flex">

//                 {currentStep === 1 ? (
//                   <button
//                     type="button"
//                     onClick={handleNextStep}
//                     className={`px-2 py-2 rounded-lg text-white transition ${
//                       !validateStep1()
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-blue-600 hover:bg-blue-700"
//                     }`}
//                     disabled={!validateStep1()}
//                   >
//                     Next: Select Participants
//                   </button>
//                 ) : (
//                   <button
//                     type="submit"
//                     className={`px-6 py-2 rounded-lg text-white transition ${
//                       loading || !validateStep2()
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-green-600 hover:bg-green-700"
//                     }`}
//                     disabled={loading || !validateStep2()}
//                   >
//                     {loading ? (
//                       <span className="flex items-center">
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                         Creating Event...
//                       </span>
//                     ) : (
//                       "Create Event"
//                     )}
//                   </button>
//                 )}
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default AddEvents;


import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config";

// Define the base URL for your local backend API
// DELETING THIS LINE AND USING IMPORTED API_BASE_URL INSTEAD
// const LOCAL_API_BASE_URL = "http://localhost:5000/api";

const AddEvents = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [participantsOptions, setParticipantsOptions] = useState([]);
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    managedBy: "",
    standard: "",
    division: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch all students from API on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      if (formData.division && formData.standard) {
        console.log(
          "Fetching students for:",
          formData.standard,
          formData.division
        );
        setLoadingStudents(true);
        try {
          const res = await axios.post(
            // FIX 1: Using imported API_BASE_URL
            `${API_BASE_URL}api/student`,
            { standard: formData.standard, division: formData.division },
            {
              headers: {
                auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
              },
            }
          );
          console.log("Students fetched:", res.data);
          setAllStudents(res.data);
          setError(""); 
        } catch (err) {
          console.error("Error fetching students:", err);
          setError("Failed to load students. Please try again.");
          setAllStudents([]);
        } finally {
          setLoadingStudents(false);
        }
      } else {
        // Clear students when standard or division is empty
        setAllStudents([]);
        setFilteredStudents([]);
        setParticipantsOptions([]);
      }
    };
    fetchStudents();
  }, [formData.standard, formData.division]);

  // Process students for select options when allStudents changes
  useEffect(() => {
    console.log("Processing students:", allStudents);
    if (allStudents.length > 0) {
      // Since API already filters by standard/division, use all returned students
      setFilteredStudents(allStudents);

      // Create options for react-select
      const options = allStudents.map((student) => ({
        // Using student._id or studentId for the value to ensure uniqueness and proper submission
        value: student._id, 
        label: `${student.firstname} ${student.lastname || ""}`.trim(),
        studentId: student._id || student.id,
      }));
      setParticipantsOptions(options);
    } else {
      setFilteredStudents([]);
      setParticipantsOptions([]);
    }
  }, [allStudents]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Get current date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const validateStep1 = () => {
    return (
      formData.eventName &&
      formData.date &&
      formData.managedBy &&
      formData.standard &&
      formData.division
    );
  };

  const validateStep2 = () => {
    return selectedParticipants.length > 0;
  };

  const handleNextStep = () => {
    if (!validateStep1()) {
      setError("Please fill in all required fields.");
      return;
    }

    // Validate date is not in the past
    if (formData.date < today) {
      setError(
        "Event date cannot be in the past. Please select current or future date."
      );
      return;
    }

    setError("");
    setLoadingStudents(true);

    // Small delay to show loading state for students
    setTimeout(() => {
      setLoadingStudents(false);
      setCurrentStep(2);
    }, 500);
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep2()) {
      setError("Please select at least one participant.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const eventData = {
        eventname: formData.eventName,
        date: formData.date,
        managedby: formData.managedBy,
        standard: formData.standard,
        division: formData.division,
        participants: selectedParticipants.map(
          (participant) => participant.value // participant.value is now the student _id
        ),
      };

      const response = await axios.post(
        // FIX 2: Using imported API_BASE_URL
        `${API_BASE_URL}api/addevent`,
        eventData,
        {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
        }
      );

      if (response.status >= 400) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Event created successfully:", response.data);

      // Reset form
      setFormData({
        eventName: "",
        date: "",
        managedBy: "",
        standard: "",
        division: "",
      });
      setSelectedParticipants([]);
      setCurrentStep(1);

      navigate("/events");
    } catch (err) {
      console.error("Error creating event:", err);
      setError(err.message || "Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep2 = () => (
    <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
      <h3 className="text-lg font-semibold text-gray-700 mb-6 flex items-center">
        <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
          2
        </span>
        👥 Select Participants
      </h3>

      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">Event Summary:</h4>
        <div className="grid grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <strong>Event:</strong> {formData.eventName}
          </div>
          <div>
            <strong>Date:</strong> {formData.date}
          </div>
          <div>
            <strong>Class:</strong> {formData.standard} - {formData.division}
          </div>
          <div>
            <strong>Managed by:</strong> {formData.managedBy}
          </div>
        </div>
      </div>

      {loadingStudents ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading students...</p>
          </div>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Found <strong>{filteredStudents.length}</strong> students in
              Standard {formData.standard} - Division {formData.division}
            </p>
          </div>

          <Select
            options={participantsOptions}
            isMulti
            value={selectedParticipants}
            onChange={setSelectedParticipants}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder={
              participantsOptions.length > 0
                ? "Select participants..."
                : "No students found for this class"
            }
            isDisabled={participantsOptions.length === 0}
            maxMenuHeight={200}
          />

          {selectedParticipants.length > 0 && (
            <p className="mt-2 text-sm text-green-600">
              Selected {selectedParticipants.length} participant(s)
            </p>
          )}
        </>
      )}
    </div>
  );

  const renderStep1 = () => (
    <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
      <h3 className="text-lg font-semibold text-gray-700 mb-6 flex items-center">
        <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
          1
        </span>
        📝 Event Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Event Name */}
        <div>
          <label
            htmlFor="eventName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Event Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={formData.eventName}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            min={today}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Managed By */}
        <div>
          <label
            htmlFor="managedBy"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Managed By (Teacher/Staff) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="managedBy"
            name="managedBy"
            value={formData.managedBy}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Standard Dropdown */}
        <div>
          <label
            htmlFor="standard"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Standard <span className="text-red-500">*</span>
          </label>
          <select
            id="standard"
            name="standard"
            value={formData.standard}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Standard</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((std) => (
              <option key={std} value={std}>
                {std}
              </option>
            ))}
          </select>
        </div>

        {/* Division Dropdown */}
        <div>
          <label
            htmlFor="division"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Division <span className="text-red-500">*</span>
          </label>
          <select
            id="division"
            name="division"
            value={formData.division}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Division</option>
            {["A", "B", "C", "D", "E", "F"].map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );


  return (
    <MainLayout>
      <div className="p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">
            Create New Event
          </h2>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div
                className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium ${
                  currentStep >= 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                1
              </div>
              <div
                className={`w-16 h-0.5 ${
                  currentStep > 1 ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium ${
                  currentStep >= 2
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                2
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {currentStep === 1 ? renderStep1() : renderStep2()}

            {/* Action Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={currentStep === 2 ? handlePreviousStep : () => navigate("/events")}
                className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                disabled={loading || loadingStudents}
              >
                {currentStep === 2 ? "Previous" : "Cancel"}
              </button>

              <div className="flex">

                {currentStep === 1 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className={`px-2 py-2 rounded-lg text-white transition ${
                      !validateStep1()
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    disabled={!validateStep1()}
                  >
                    Next: Select Participants
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={`px-6 py-2 rounded-lg text-white transition ${
                      loading || !validateStep2()
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                    disabled={loading || !validateStep2()}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating Event...
                      </span>
                    ) : (
                      "Create Event"
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default AddEvents;