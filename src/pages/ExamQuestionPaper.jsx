// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";

// const ExamQuestionPaper = () => {
//   const [selectedStd, setSelectedStd] = useState("");
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [sets, setSets] = useState([]);
//   const [schedule, setSchedule] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedSet, setSelectedSet] = useState(null);

//   const handleStandardChange = async (e) => {
//     const std = e.target.value;
//     setSelectedStd(std);
//     setSelectedSubject("");
//     setSets([]);
//     if (!std) return;
//     try {
//       console.log(`http://localhost:5000/api/subjects/${std}`);
//       const res = await axios.get(`http://localhost:5000/api/subjects/${std}`, {
//         headers: {
//           "Content-Type": "application/json",
//           auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//         },
//       });
//       console.log(res.data.subjects[0]?.subjectname || []);
//       setSubjects(res.data.subjects[0]?.subjectname || []);
//     } catch (err) {
//       console.error("Error fetching subjects:", err);
//     }
//   };

//   const handleSubjectClick = async (subject) => {
//     setSelectedSubject(subject);
//     setSets([]);
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `http://localhost:5000/api/sets/${selectedStd}/${subject}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         }
//       );
//       setSets(res.data || []);
//     } catch (err) {
//       console.error("Error fetching sets:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSchedule = async (setUrl) => {
//     if (!schedule) {
//       alert("Please select date & time before scheduling");
//       return;
//     }
//     try {
//       await axios.post(
//         "http://localhost:5000/api/schedule",
//         {
//           standard: selectedStd,
//           subject: selectedSubject,
//           set: setUrl,
//           schedule,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         }
//       );
//       alert("Scheduled successfully!");
//       setShowModal(false);
//       setSchedule("");
//     } catch (err) {
//       console.error("Error scheduling:", err);
//     }
//   };

//   const openScheduleModal = (set) => {
//     setSelectedSet(set);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedSet(null);
//     setSchedule("");
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto mt-10">
//         {/* Header */}
//         <h3 className="text-center text-xl font-semibold text-gray-800 mb-8">
//           Create Question Paper
//         </h3>

//         {/* Step 1: Select Standard */}
//         <div className="mb-8">
//           <label className="block text-lg font-medium text-gray-800 mb-2">
//             Select Standard
//           </label>
//           <select
//             value={selectedStd}
//             onChange={handleStandardChange}
//             className="w-full border border-gray-300 rounded-md px-4 py-2 text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="">Select</option>
//             <option value="1">Grade 1</option>
//             <option value="2">Grade 2</option>
//             <option value="3">Grade 3</option>
//             <option value="4">Grade 4</option>
//             <option value="5">Grade 5</option>
//             <option value="6">Grade 6</option>
//             <option value="7">Grade 7</option>
//             <option value="8">Grade 8</option>
//             <option value="9">Grade 9</option>
//             <option value="10">Grade 10</option>
//           </select>
//         </div>

//         {/* Step 2: Subjects */}
//         {selectedStd && (
//           <div>
//             <h4 className="text-center text-lg font-medium text-gray-800 mb-6">
//               Select Subject
//             </h4>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//               {subjects.map((sub, i) => (
//                 <button
//                   key={i}
//                   onClick={() => handleSubjectClick(sub)}
//                   className="bg-blue-600 text-white py-2 px-4 rounded-full shadow-md m-1"
//                 >
//                   {sub}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Loading State */}
//         {loading && <p className="text-center mt-6">Loading sets...</p>}

//         {/* Step 3: Available Sets */}
//         {selectedSubject && !loading && (
//           <div className="mt-10">
//             <h4 className="text-center text-lg font-medium text-gray-800 mb-6">
//               Available Sets
//             </h4>
//             {sets.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {sets.map((set, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6"
//                   >
//                     <div className="text-center">
//                       {/* Set Icon */}
//                       <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <svg
//                           className="w-8 h-8 text-blue-600"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                           />
//                         </svg>
//                       </div>

//                       {/* Set Name */}
//                       <h5 className="text-lg font-semibold text-gray-800 mb-3">
//                         {set.name}
//                       </h5>

//                       {/* Action Buttons */}
//                       <div className="space-y-3">
//                         {/* Action Buttons */}
//                         <div className="space-y-3">
//                           {!set.isScheduled && (
//                             <button
//                               onClick={() => window.open(set.url, "_blank")}
//                               className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
//                             >
//                               <svg
//                                 className="w-4 h-4"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth="2"
//                                   d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                                 />
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth="2"
//                                   d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                                 />
//                               </svg>
//                               View
//                             </button>
//                           )}

//                           <button
//                             onClick={() =>
//                               !set.isScheduled && openScheduleModal(set)
//                             }
//                             disabled={set.isScheduled}
//                             className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
//                               set.isScheduled
//                                 ? "bg-gray-400 text-gray-200 cursor-not-allowed"
//                                 : "bg-green-600 hover:bg-green-700 text-white"
//                             }`}
//                           >
//                             <svg
//                               className="w-4 h-4"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
//                               />
//                             </svg>
//                             {set.isScheduled ? "Already Scheduled" : "Schedule"}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <svg
//                     className="w-8 h-8 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                     />
//                   </svg>
//                 </div>
//                 <p className="text-gray-500 text-lg">
//                   No question sets available
//                 </p>
//                 <p className="text-gray-400 text-sm mt-2">
//                   No sets found for {selectedSubject} in Grade {selectedStd}
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Schedule Modal */}
//         {showModal && selectedSet && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
//               {/* Modal Header */}
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-bold text-gray-800">
//                   Schedule Exam
//                 </h3>
//                 <button
//                   onClick={closeModal}
//                   className="text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               {/* Set Details */}
//               <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//                 <h4 className="font-semibold text-gray-800 mb-2">
//                   Selected Set:
//                 </h4>
//                 <p className="text-gray-600">{selectedSet.name}</p>
//                 <p className="text-sm text-gray-500">
//                   Standard {selectedStd} • {selectedSubject}
//                 </p>
//               </div>

//               {/* Date Time Input */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Select Date & Time
//                 </label>
//                 <input
//                   type="datetime-local"
//                   value={schedule}
//                   onChange={(e) => setSchedule(e.target.value)}
//                   disabled={selectedSet.isScheduled}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
//                 />
//               </div>

//               {/* Modal Actions */}
//               <div className="flex gap-3">
//                 <button
//                   onClick={closeModal}
//                   className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => handleSchedule(selectedSet.url)}
//                   disabled={selectedSet.isScheduled}
//                   className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
//                     selectedSet.isScheduled
//                       ? "bg-gray-400 text-gray-200 cursor-not-allowed"
//                       : "bg-blue-600 hover:bg-blue-700 text-white"
//                   }`}
//                 >
//                   {selectedSet.isScheduled
//                     ? "Already Scheduled"
//                     : "Schedule Exam"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// };

// export default ExamQuestionPaper;



// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// const ExamQuestionPaper = () => {
//   const [selectedStd, setSelectedStd] = useState("");
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [sets, setSets] = useState([]);
//   const [schedule, setSchedule] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedSet, setSelectedSet] = useState(null);

//   const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

//   const handleStandardChange = async (e) => {
//     const std = e.target.value;
//     setSelectedStd(std);
//     setSelectedSubject("");
//     setSets([]);
//     if (!std) return;
//     try {
//       console.log(`${API_BASE_URL}api/subjects/${std}`);
//       // FIX 1: Using imported API_BASE_URL
//       const res = await axios.get(`${API_BASE_URL}api/subjects/${std}`, {
//         headers: {
//           "Content-Type": "application/json",
//           auth: AUTH_HEADER,
//         },
//       });
//       console.log(res.data.subjects[0]?.subjectname || []);
//       setSubjects(res.data.subjects[0]?.subjectname || []);
//     } catch (err) {
//       console.error("Error fetching subjects:", err);
//     }
//   };

//   const handleSubjectClick = async (subject) => {
//     setSelectedSubject(subject);
//     setSets([]);
//     try {
//       setLoading(true);
//       // FIX 2: Using imported API_BASE_URL
//       const res = await axios.get(
//         `${API_BASE_URL}api/sets/${selectedStd}/${subject}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             auth: AUTH_HEADER,
//           },
//         }
//       );
//       setSets(res.data || []);
//     } catch (err) {
//       console.error("Error fetching sets:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSchedule = async (setUrl) => {
//     if (!schedule) {
//       alert("Please select date & time before scheduling");
//       return;
//     }
//     try {
//       // FIX 3: Using imported API_BASE_URL
//       await axios.post(
//         `${API_BASE_URL}api/schedule`,
//         {
//           standard: selectedStd,
//           subject: selectedSubject,
//           set: setUrl,
//           schedule,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             auth: AUTH_HEADER,
//           },
//         }
//       );
//       alert("Scheduled successfully!");
//       setShowModal(false);
//       setSchedule("");
//     } catch (err) {
//       console.error("Error scheduling:", err);
//     }
//   };

//   const openScheduleModal = (set) => {
//     setSelectedSet(set);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedSet(null);
//     setSchedule("");
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto mt-10">
//         {/* Header */}
//         <h3 className="text-center text-xl font-semibold text-gray-800 mb-8">
//           Create Question Paper
//         </h3>

//         {/* Step 1: Select Standard */}
//         <div className="mb-8">
//           <label className="block text-lg font-medium text-gray-800 mb-2">
//             Select Standard
//           </label>
//           <select
//             value={selectedStd}
//             onChange={handleStandardChange}
//             className="w-full border border-gray-300 rounded-md px-4 py-2 text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="">Select</option>
//             <option value="1">Grade 1</option>
//             <option value="2">Grade 2</option>
//             <option value="3">Grade 3</option>
//             <option value="4">Grade 4</option>
//             <option value="5">Grade 5</option>
//             <option value="6">Grade 6</option>
//             <option value="7">Grade 7</option>
//             <option value="8">Grade 8</option>
//             <option value="9">Grade 9</option>
//             <option value="10">Grade 10</option>
//           </select>
//         </div>

//         {/* Step 2: Subjects */}
//         {selectedStd && (
//           <div>
//             <h4 className="text-center text-lg font-medium text-gray-800 mb-6">
//               Select Subject
//             </h4>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//               {subjects.map((sub, i) => (
//                 <button
//                   key={i}
//                   onClick={() => handleSubjectClick(sub)}
//                   className="bg-blue-600 text-white py-2 px-4 rounded-full shadow-md m-1"
//                 >
//                   {sub}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Loading State */}
//         {loading && <p className="text-center mt-6">Loading sets...</p>}

//         {/* Step 3: Available Sets */}
//         {selectedSubject && !loading && (
//           <div className="mt-10">
//             <h4 className="text-center text-lg font-medium text-gray-800 mb-6">
//               Available Sets
//             </h4>
//             {sets.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {sets.map((set, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6"
//                   >
//                     <div className="text-center">
//                       {/* Set Icon */}
//                       <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <svg
//                           className="w-8 h-8 text-blue-600"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                           />
//                         </svg>
//                       </div>

//                       {/* Set Name */}
//                       <h5 className="text-lg font-semibold text-gray-800 mb-3">
//                         {set.name}
//                       </h5>

//                       {/* Action Buttons */}
//                       <div className="space-y-3">
//                         {/* Action Buttons */}
//                         <div className="space-y-3">
//                           {!set.isScheduled && (
//                             <button
//                               onClick={() => window.open(set.url, "_blank")}
//                               className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
//                             >
//                               <svg
//                                 className="w-4 h-4"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth="2"
//                                   d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                                 />
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth="2"
//                                   d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                                 />
//                               </svg>
//                               View
//                             </button>
//                           )}

//                           <button
//                             onClick={() =>
//                               !set.isScheduled && openScheduleModal(set)
//                             }
//                             disabled={set.isScheduled}
//                             className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
//                               set.isScheduled
//                                 ? "bg-gray-400 text-gray-200 cursor-not-allowed"
//                                 : "bg-green-600 hover:bg-green-700 text-white"
//                             }`}
//                           >
//                             <svg
//                               className="w-4 h-4"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002-2H5a2 2 0 002-2H5a2 2 0 00-2-2z"
//                               />
//                             </svg>
//                             {set.isScheduled ? "Already Scheduled" : "Schedule"}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <svg
//                     className="w-8 h-8 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                     />
//                   </svg>
//                 </div>
//                 <p className="text-gray-500 text-lg">
//                   No question sets available
//                 </p>
//                 <p className="text-gray-400 text-sm mt-2">
//                   No sets found for {selectedSubject} in Grade {selectedStd}
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Schedule Modal */}
//         {showModal && selectedSet && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
//               {/* Modal Header */}
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-bold text-gray-800">
//                   Schedule Exam
//                 </h3>
//                 <button
//                   onClick={closeModal}
//                   className="text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               {/* Set Details */}
//               <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//                 <h4 className="font-semibold text-gray-800 mb-2">
//                   Selected Set:
//                 </h4>
//                 <p className="text-gray-600">{selectedSet.name}</p>
//                 <p className="text-sm text-gray-500">
//                   Standard {selectedStd} • {selectedSubject}
//                 </p>
//               </div>

//               {/* Date Time Input */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Select Date & Time
//                 </label>
//                 <input
//                   type="datetime-local"
//                   value={schedule}
//                   onChange={(e) => setSchedule(e.target.value)}
//                   disabled={selectedSet.isScheduled}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
//                 />
//               </div>

//               {/* Modal Actions */}
//               <div className="flex gap-3">
//                 <button
//                   onClick={closeModal}
//                   className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => handleSchedule(selectedSet.url)}
//                   disabled={selectedSet.isScheduled}
//                   className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
//                     selectedSet.isScheduled
//                       ? "bg-gray-400 text-gray-200 cursor-not-allowed"
//                       : "bg-blue-600 hover:bg-blue-700 text-white"
//                   }`}
//                 >
//                   {selectedSet.isScheduled
//                     ? "Already Scheduled"
//                     : "Schedule Exam"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// };

// export default ExamQuestionPaper;

// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// const ExamQuestionPaper = () => {
//   const [selectedStd, setSelectedStd] = useState("");
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [sets, setSets] = useState([]);
//   const [schedule, setSchedule] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedSet, setSelectedSet] = useState(null);

//   // NEW STATE for Set Creation
//   const [showCreateSetModal, setShowCreateSetModal] = useState(false);
//   const [newSetName, setNewSetName] = useState("");
//   const [newSetUrl, setNewSetUrl] = useState("");

//   const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

//   // Function to fetch schedules (can be called by useEffect or after creation/deletion)
//   const fetchSets = async (std, subject) => {
//     if (!std || !subject) return;
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `${API_BASE_URL}api/sets/${std}/${subject}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             auth: AUTH_HEADER,
//           },
//         }
//       );
//       setSets(res.data || []);
//     } catch (err) {
//       console.error("Error fetching sets:", err);
//       alert("Failed to fetch sets.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   
//   const handleStandardChange = async (e) => {
//     const std = e.target.value;
//     setSelectedStd(std);
//     setSelectedSubject("");
//     setSets([]);
//     if (!std) return;
//     try {
//       // FIX 1: Using imported API_BASE_URL
//       const res = await axios.get(`${API_BASE_URL}api/subjects/${std}`, {
//         headers: {
//           "Content-Type": "application/json",
//           auth: AUTH_HEADER,
//         },
//       });
//       setSubjects(res.data.subjects[0]?.subjectname || []);
//     } catch (err) {
//       console.error("Error fetching subjects:", err);
//     }
//   };

//   const handleSubjectClick = async (subject) => {
//     setSelectedSubject(subject);
//     setSets([]);
//     fetchSets(selectedStd, subject);
//   };

//   // NEW CHANGE: Handle creation of a new set
//   const handleCreateSet = async () => {
//     if (!newSetName || !newSetUrl || !selectedStd || !selectedSubject) {
//       alert("Please fill in the Set Name and Set URL.");
//       return;
//     }

//     try {
//       await axios.post(
//         `${API_BASE_URL}api/add-set`,
//         {
//           name: newSetName,
//           url: newSetUrl,
//           standard: selectedStd,
//           subject: selectedSubject,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             auth: AUTH_HEADER,
//           },
//         }
//       );
//       alert("New Set created successfully!");
//       setShowCreateSetModal(false);
//       setNewSetName("");
//       setNewSetUrl("");
//       // Refresh sets list
//       fetchSets(selectedStd, selectedSubject); 
//     } catch (err) {
//       console.error("Error creating set:", err.response?.data?.message || err.message);
//       alert(`Failed to create set: ${err.response?.data?.message || err.message}`);
//     }
//   };
//   
//   const handleSchedule = async (setUrl) => {
//     if (!schedule) {
//       alert("Please select date & time before scheduling");
//       return;
//     }
//     try {
//       // FIX 3: Using imported API_BASE_URL
//       await axios.post(
//         `${API_BASE_URL}api/schedule`,
//         {
//           standard: selectedStd,
//           subject: selectedSubject,
//           set: setUrl,
//           schedule,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             auth: AUTH_HEADER,
//           },
//         }
//       );
//       alert("Scheduled successfully!");
//       setShowModal(false);
//       setSchedule("");
//       // Re-fetch to update isScheduled status
//       fetchSets(selectedStd, selectedSubject); 
//     } catch (err) {
//       console.error("Error scheduling:", err);
//       alert(`Failed to schedule: ${err.response?.data?.message || err.message}`);
//     }
//   };

//   const openScheduleModal = (set) => {
//     setSelectedSet(set);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedSet(null);
//     setSchedule("");
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto mt-10">
//         {/* Header */}
//         <h3 className="text-center text-xl font-semibold text-gray-800 mb-8">
//           Question Paper Management
//         </h3>

//         {/* Step 1: Select Standard */}
//         <div className="mb-8">
//           <label className="block text-lg font-medium text-gray-800 mb-2">
//             Select Standard
//           </label>
//           <select
//             value={selectedStd}
//             onChange={handleStandardChange}
//             className="w-full border border-gray-300 rounded-md px-4 py-2 text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="">Select</option>
//             <option value="1">Grade 1</option>
//             <option value="2">Grade 2</option>
//             <option value="3">Grade 3</option>
//             <option value="4">Grade 4</option>
//             <option value="5">Grade 5</option>
//             <option value="6">Grade 6</option>
//             <option value="7">Grade 7</option>
//             <option value="8">Grade 8</option>
//             <option value="9">Grade 9</option>
//             <option value="10">Grade 10</option>
//           </select>
//         </div>

//         {/* Step 2: Subjects */}
//         {selectedStd && (
//           <div className="mb-10">
//             <h4 className="text-center text-lg font-medium text-gray-800 mb-6">
//               Select Subject
//             </h4>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//               {subjects.map((sub, i) => (
//                 <button
//                   key={i}
//                   onClick={() => handleSubjectClick(sub)}
//                   className={`py-2 px-4 rounded-full shadow-md m-1 transition-colors duration-200 ${
//                     selectedSubject === sub ? 'bg-blue-800 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
//                 }`}
//                 >
//                   {sub}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Loading State */}
//         {loading && <p className="text-center mt-6">Loading sets...</p>}

//         {/* Step 3: Available Sets & Create Button */}
//         {selectedSubject && !loading && (
//           <div className="mt-10">
//             <div className="flex justify-between items-center mb-6">
//               <h4 className="text-lg font-medium text-gray-800">
//                 Available Sets for {selectedSubject}
//               </h4>
//               <button
//                 onClick={() => setShowCreateSetModal(true)}
//                 className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
//               >
//                 + Create New Set
//               </button>
//             </div>

//             {sets.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {sets.map((set, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6"
//                   >
//                     <div className="text-center">
//                       {/* Set Icon */}
//                       <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                         <svg
//                           className="w-8 h-8 text-blue-600"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                           />
//                         </svg>
//                       </div>

//                       {/* Set Name */}
//                       <h5 className="text-lg font-semibold text-gray-800 mb-3">
//                         {set.name}
//                       </h5>

//                       {/* Action Buttons */}
//                       <div className="space-y-3">
//                         {/* View Button */}
//                         <button
//                           onClick={() => window.open(set.url, "_blank")}
//                           className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
//                         >
//                           <svg
//                             className="w-4 h-4"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                             />
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                             />
//                           </svg>
//                           View
//                         </button>
//                         
//                         {/* Schedule Button */}
//                         <button
//                           onClick={() =>
//                             !set.isScheduled && openScheduleModal(set)
//                           }
//                           disabled={set.isScheduled}
//                           className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
//                             set.isScheduled
//                               ? "bg-gray-400 text-gray-200 cursor-not-allowed"
//                               : "bg-green-600 hover:bg-green-700 text-white"
//                           }`}
//                         >
//                           <svg
//                             className="w-4 h-4"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth="2"
//                               d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002-2H5a2 2 0 00-2-2z"
//                             />
//                           </svg>
//                           {set.isScheduled ? "Already Scheduled" : "Schedule"}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <svg
//                     className="w-8 h-8 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                     />
//                   </svg>
//                 </div>
//                 <p className="text-gray-500 text-lg">
//                   No question sets available
//                 </p>
//                 <p className="text-gray-400 text-sm mt-2">
//                   Use the button above to create the first set.
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Schedule Modal (Remains the same) */}
//         {showModal && selectedSet && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
//               {/* Modal Header */}
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-bold text-gray-800">
//                   Schedule Exam
//                 </h3>
//                 <button
//                   onClick={closeModal}
//                   className="text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               {/* Set Details */}
//               <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//                 <h4 className="font-semibold text-gray-800 mb-2">
//                   Selected Set:
//                 </h4>
//                 <p className="text-gray-600">{selectedSet.name}</p>
//                 <p className="text-sm text-gray-500">
//                   Standard {selectedStd} • {selectedSubject}
//                 </p>
//               </div>

//               {/* Date Time Input */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Select Date & Time
//                 </label>
//                 <input
//                   type="datetime-local"
//                   value={schedule}
//                   onChange={(e) => setSchedule(e.target.value)}
//                   disabled={selectedSet.isScheduled}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
//                 />
//               </div>

//               {/* Modal Actions */}
//               <div className="flex gap-3">
//                 <button
//                   onClick={closeModal}
//                   className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => handleSchedule(selectedSet.url)}
//                   disabled={selectedSet.isScheduled}
//                   className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
//                     selectedSet.isScheduled
//                       ? "bg-gray-400 text-gray-200 cursor-not-allowed"
//                       : "bg-blue-600 hover:bg-blue-700 text-white"
//                   }`}
//                 >
//                   {selectedSet.isScheduled
//                     ? "Already Scheduled"
//                     : "Schedule Exam"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
        
//         {/* NEW CHANGE: Create New Set Modal */}
//         {showCreateSetModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-bold text-gray-800">
//                   Create New Question Set
//                 </h3>
//                 <button
//                   onClick={() => setShowCreateSetModal(false)}
//                   className="text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Set Name (e.g., Set A, Final Paper)
//                 </label>
//                 <input
//                   type="text"
//                   value={newSetName}
//                   onChange={(e) => setNewSetName(e.target.value)}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                   placeholder="Enter set name"
//                 />
//               </div>

//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Question Paper URL (Link to PDF/Doc)
//                 </label>
//                 <input
//                   type="url"
//                   value={newSetUrl}
//                   onChange={(e) => setNewSetUrl(e.target.value)}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                   placeholder="https://example.com/qp_set_a.pdf"
//                 />
//               </div>

//               <div className="flex gap-3 mt-4">
//                 <button
//                   onClick={() => setShowCreateSetModal(false)}
//                   className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleCreateSet}
//                   className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
//                 >
//                   Save Set
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// };

// export default ExamQuestionPaper;



// import React, { useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";
// import { API_BASE_URL } from '../config'; 

// const ExamQuestionPaper = () => {
//   const [selectedStd, setSelectedStd] = useState("");
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const [sets, setSets] = useState([]);
//   const [schedule, setSchedule] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedSet, setSelectedSet] = useState(null);

//   // API Authentication Header
//   const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

//   // Function to fetch question paper sets
//   const fetchSets = async (std, subject) => {
//     if (!std || !subject) return;
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `${API_BASE_URL}api/sets/${std}/${subject}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             auth: AUTH_HEADER,
//           },
//         }
//       );
//       // Sort sets by name (e.g., "Set 1", "Set 2") for better display order
//       const sortedSets = (res.data || []).sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
//       setSets(sortedSets);
//     } catch (err) {
//       console.error("Error fetching sets:", err);
//       alert("Failed to fetch sets.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   
//   const handleStandardChange = async (e) => {
//     const std = e.target.value;
//     setSelectedStd(std);
//     setSelectedSubject(""); 
//     setSets([]);
//     if (!std) return;

//     try {
//       // Fetch subjects for the new standard
//       const res = await axios.get(`${API_BASE_URL}api/subjects/${std}`, {
//         headers: {
//           "Content-Type": "application/json",
//           auth: AUTH_HEADER,
//         },
//       });
//       setSubjects(res.data.subjects[0]?.subjectname || []);
//     } catch (err) {
//       console.error("Error fetching subjects:", err);
//     }
//   };

//   const handleSubjectClick = async (subject) => {
//     setSelectedSubject(subject);
//     fetchSets(selectedStd, subject);
//   };

//   // CHANGED: Pass set.pdfPath instead of set.url
//   const handleSchedule = async (setPath) => { 
//     if (!schedule) {
//       alert("Please select date & time before scheduling");
//       return;
//     }
//     try {
//       await axios.post(
//         `${API_BASE_URL}api/schedule`,
//         {
//           standard: selectedStd,
//           subject: selectedSubject,
//           set: setPath, // Using the PDF identifier (pdfPath) as the 'set' for scheduling
//           schedule,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             auth: AUTH_HEADER,
//           },
//         }
//       );
//       alert("Scheduled successfully!");
//       setShowModal(false);
//       setSchedule("");
//       fetchSets(selectedStd, selectedSubject); 
//     } catch (err) {
//       console.error("Error scheduling:", err);
//       alert(`Failed to schedule: ${err.response?.data?.message || err.message}`);
//     }
//   };

//   const openScheduleModal = (set) => {
//     setSelectedSet(set);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedSet(null);
//     setSchedule("");
//   };

//   const getStandardOptions = () => {
//     const options = [];
//     for (let i = 1; i <= 10; i++) {
//       options.push(<option key={i} value={String(i)}>{i}</option>);
//     }
//     return options;
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto mt-10">
//         
//         {/* Main Title */}
//         <h3 className="text-center text-2xl font-bold text-blue-700 mb-8">
//           Question Paper Management
//         </h3>

//         {/* Standard and Selected Subject Display */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//           
//           {/* Select Standard */}
//           <div>
//             <label className="block text-lg font-medium text-gray-800 mb-2">
//               Std
//             </label>
//             <select
//               value={selectedStd}
//               onChange={handleStandardChange}
//               className="w-full border border-gray-300 rounded-md px-4 py-2 text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             >
//               <option value="">Select</option>
//               {getStandardOptions()} 
//             </select>
//           </div>

//           {/* Selected Subject Display (Read-only for the Subject title) */}
//           <div>
//             <label className="block text-lg font-medium text-gray-800 mb-2">
//               Subject:
//             </label>
//             <div className="border border-gray-300 rounded-md px-4 py-2 text-base bg-gray-100 h-[42px] flex items-center">
//               {selectedSubject || 'N/A'}
//             </div>
//           </div>
//         </div>

//         {/* --- STEP 2: Subject Buttons (Only appears if Standard is selected) --- */}
//         {selectedStd && (
//           <div className="mb-10 p-4 border rounded-lg bg-blue-50">
//             <h4 className="text-center text-lg font-medium text-blue-700 mb-6">
//               Select Subject
//             </h4>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//               {subjects.length > 0 ? subjects.map((sub, i) => (
//                 <button
//                   key={i}
//                   onClick={() => handleSubjectClick(sub)}
//                   className={`py-2 px-4 rounded-lg shadow-md transition-colors duration-200 ${
//                     selectedSubject === sub 
//                       ? 'bg-blue-800 text-white font-semibold ring-2 ring-blue-500' 
//                       : 'bg-blue-600 text-white hover:bg-blue-700'
//                 }`}
//                 >
//                   {sub}
//                 </button>
//               )) : <p className="col-span-4 text-center text-gray-500">No subjects found for this standard.</p>}
//             </div>
//           </div>
//         )}


//         {/* --- STEP 3: Available Sets Grid (Only appears if Subject is selected) --- */}
//         {selectedSubject && (
//           <div className="mt-10">
//             <h4 className="text-center text-xl font-bold text-gray-800 mb-6">
//               Question Paper Sets
//             </h4>
//             
//             {/* Loading State */}
//             {loading && <p className="text-center mt-6">Loading sets...</p>}

//             {/* Dynamic Sets Display (Modified for PDF Path/Viewing) */}
//             {!loading && sets.length > 0 ? (
//               <div className="flex flex-wrap justify-center gap-8">
//                 {sets.map((set, idx) => (
//                   <div
//                     key={idx}
//                     className={`w-40 h-40 border rounded-lg flex flex-col items-center justify-center gap-2 font-semibold text-xl shadow-lg transition duration-300 p-4 ${
//                       set.isScheduled 
//                         ? 'bg-green-100 border-green-400 text-green-700' 
//                         : 'bg-blue-50 border-blue-400 text-blue-700 hover:shadow-xl'
//                     }`}
//                   >
//                     
//                     <div className="text-center">
//                       <h5 className="text-xl font-bold mb-1">{set.name}</h5>
//                     </div>

//                     {/* View Button: Assumes a /view-pdf endpoint handles file retrieval */}
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation(); 
//                         // Use the new pdfPath field
//                         window.open(`${API_BASE_URL}api/view-pdf/${set.pdfPath}`, "_blank");
//                       }}
//                       className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm py-1 px-2 rounded-md transition-colors flex items-center justify-center gap-1"
//                     >
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                       </svg>
//                       View Paper
//                     </button>

//                     {/* Schedule Button/Status */}
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         !set.isScheduled && openScheduleModal(set);
//                       }}
//                       disabled={set.isScheduled}
//                       className={`w-full text-sm py-1 px-2 rounded-md font-medium transition-colors ${
//                         set.isScheduled
//                           ? "bg-green-600 text-white cursor-not-allowed"
//                           : "bg-blue-600 hover:bg-blue-700 text-white"
//                       }`}
//                     >
//                       {set.isScheduled ? "Scheduled" : "Schedule Exam"}
//                     </button>

//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <p className="text-gray-500 text-lg">
//                   No question sets available for {selectedSubject}.
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Schedule Modal */}
//         {showModal && selectedSet && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//             <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-bold text-gray-800">Schedule Exam</h3>
//                 <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
//                 </button>
//               </div>
//               <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//                 <h4 className="font-semibold text-gray-800 mb-2">Selected Set: {selectedSet.name}</h4>
//                 <p className="text-sm text-gray-500">Standard {selectedStd} • {selectedSubject}</p>
//               </div>
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Select Date & Time</label>
//                 <input
//                   type="datetime-local"
//                   value={schedule}
//                   onChange={(e) => setSchedule(e.target.value)}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
//                 />
//               </div>
//               <div className="flex gap-3">
//                 <button onClick={closeModal} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">Cancel</button>
//                 <button
//                   onClick={() => handleSchedule(selectedSet.pdfPath)} // Use pdfPath for schedule
//                   className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
//                 >
//                   Schedule Exam
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// };

// export default ExamQuestionPaper;




import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

const ExamQuestionPaper = () => {
  const [selectedStd, setSelectedStd] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [sets, setSets] = useState([]);
  const [schedule, setSchedule] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSet, setSelectedSet] = useState(null);

  // State to manage the approval status selected from the dropdown for each set
  const [setApprovalStatus, setSetApprovalStatus] = useState({});

  const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

  // ✅ FIX: Use the exact field name 'pdfPath' (Capital P) from MongoDB for the key.
  const getSetKey = (set, idx) => set.pdfPath || `idx-${idx}`;
  
  // Function to fetch schedules (can be called by useEffect or after creation/deletion)
  const fetchSets = async (std, subject) => {
    if (!std || !subject) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_BASE_URL}api/sets/${std}/${subject}`,
        {
          headers: {
            "Content-Type": "application/json",
            auth: AUTH_HEADER,
          },
        }
      );
      setSets(res.data || []);
    } catch (err) {
      console.error("Error fetching sets:", err);
      alert("Failed to fetch sets.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleStandardChange = async (e) => {
    const std = e.target.value;
    setSelectedStd(std);
    setSelectedSubject("");
    setSets([]);
    setSetApprovalStatus({}); // Clear approval status when changing standard
    if (!std) return;
    try {
      // FIX 1: Using imported API_BASE_URL
      const res = await axios.get(`${API_BASE_URL}api/subjects/${std}`, {
        headers: {
          "Content-Type": "application/json",
          auth: AUTH_HEADER,
        },
      });
      setSubjects(res.data.subjects[0]?.subjectname || []);
    } catch (err) {
      console.error("Error fetching subjects:", err);
    }
  };

  const handleSubjectClick = async (subject) => {
    setSelectedSubject(subject);
    setSets([]);
    setSetApprovalStatus({}); // Clear approval status when changing subject
    fetchSets(selectedStd, subject);
  };

  // Function to handle approval/rejection selection
  // 🐛 FIX: Take set and index, use getSetKey for state management
  const handleSelectChange = (set, idx, status) => {
    const key = getSetKey(set, idx); // Use the consistent unique key (pdfPath)
    setSetApprovalStatus(prevStatus => ({
      ...prevStatus,
      [key]: status
    }));
  };
  
  // setUrl is actually the pdfPath/unique key of the set passed from the JSX
  const handleSchedule = async (setUrl) => {
    if (!schedule) {
      alert("Please select date & time before scheduling");
      return;
    }
    
    // *** FIX 1 (Date Formatting): Convert the local datetime string to ISO 8601 format for the backend ***
    const scheduledTime = new Date(schedule).toISOString();

    try {
      // FIX 3: Using imported API_BASE_URL
      await axios.post(
        `${API_BASE_URL}api/schedule`,
        {
          // *** FIX 2 (Data Type Safety): Ensure fields are explicitly strings, matching Postman data ***
          standard: String(selectedStd),
          subject: String(selectedSubject),
          set: String(setUrl), // This is the fixed value (pdfPath)
          schedule: scheduledTime,
        },
        {
          headers: {
            "Content-Type": "application/json",
            auth: AUTH_HEADER,
          },
        }
      );
      alert("Scheduled successfully!");
      setShowModal(false);
      setSchedule("");
      
      // Reset local approval status for ALL sets on successful schedule, 
      // relying on the backend fetch to set 'isScheduled' correctly.
      setSetApprovalStatus({}); 
      // Re-fetch to update isScheduled status (will now lock all other sets via server logic)
      fetchSets(selectedStd, selectedSubject); 
    } catch (err) {
      console.error("Error scheduling:", err);
      alert(`Failed to schedule: ${err.response?.data?.message || err.message}`);
    }
  };

  const openScheduleModal = (set) => {
    setSelectedSet(set);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSet(null);
    setSchedule("");
  };

  // Check if ANY set in the list is currently scheduled.
  const isAnySetScheduled = sets.some(set => set.isScheduled);

  return (
    <MainLayout>
      <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto mt-10">
        {/* Header */}
        <h3 className="text-center text-xl font-semibold text-gray-800 mb-8">
          Question Paper Management
        </h3>

        {/* Step 1: Select Standard */}
        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-800 mb-2">
            Select Standard
          </label>
          <select
            value={selectedStd}
            onChange={handleStandardChange}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-base bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        {/* Step 2: Subjects */}
        {selectedStd && (
          <div className="mb-10">
            <h4 className="text-center text-lg font-medium text-gray-800 mb-6">
              Select Subject
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {subjects.map((sub, i) => (
                <button
                  key={i}
                  onClick={() => handleSubjectClick(sub)}
                  className={`py-2 px-4 rounded-full shadow-md m-1 transition-colors duration-200 ${
                    selectedSubject === sub ? 'bg-blue-800 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                >
                  {sub}
                </button>
              ))}
            </div>
{/*             <p className="text-sm text-gray-500 mt-4 text-center">Note: Rejection/Approval/Scheduling status applies per set.</p> */}
          </div>
        )}

        {/* Loading State */}
        {loading && <p className="text-center mt-6">Loading sets...</p>}

        {/* Step 3: Available Sets */}
        {selectedSubject && !loading && (
          <div className="mt-10">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-medium text-gray-800">
                Available Sets for {selectedSubject}
              </h4>
            </div>

            {sets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sets.map((set, idx) => {
                  // ✅ FIX: Use the correct key field 'pdfPath'
                  const setKey = set.pdfPath || `idx-${idx}`; 
                  const currentStatus = setApprovalStatus[setKey] || ""; 
                  
                  // Determine if this set is UNLOCKED (not scheduled AND no other set is scheduled)
                  const isUnlocked = !set.isScheduled && !isAnySetScheduled;
                    
                    // Determine button state and text
                    let buttonText = "Awaiting Approval";
                    if (set.isScheduled) {
                        buttonText = "Already Scheduled";
                    } else if (isAnySetScheduled) {
                        // ❌ NEW RULE IMPLEMENTATION: If any set is scheduled, this one must be treated as rejected/locked
                        buttonText = "Rejected";
                    } else if (currentStatus === "Reject") {
                        buttonText = "Rejected";
                    }

                    // Determine if the schedule button should appear
                    const showScheduleButton = currentStatus === "Approve" && !set.isScheduled && !isAnySetScheduled;

                  return (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6"
                  >
                    <div className="text-center">
                      {/* Set Icon */}
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>

                      {/* Set Name */}
                      <h5 className="text-lg font-semibold text-gray-800 mb-3">
                        {set.name}
                      </h5>

                      {/* Action Components */}
                      <div className="space-y-3">
                        {/* View Button */}
                        <button
                          // ✅ FIX: Use the correct field name 'pdfPath' for viewing the PDF
                          onClick={() => window.open(`${API_BASE_URL}api/view-pdf/${set.pdfPath}`, "_blank")}
                          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          View
                        </button>
        
                        {/* Select Dropdown for Approve/Reject */}
                        <div className="w-full">
                          <select
                            value={currentStatus}
                            onChange={(e) => handleSelectChange(set, idx, e.target.value)}
                            // Disable if already scheduled OR if any other set is scheduled
                            disabled={set.isScheduled || isAnySetScheduled}
                            className={`w-full border rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 ${
                              set.isScheduled || isAnySetScheduled 
                                ? 'bg-gray-400 text-gray-200 cursor-not-allowed border-gray-400'
                                : 'bg-white border-gray-300 focus:ring-blue-400'
                            }`}
                          >
                            <option value="">Select Action</option>
                            <option value="Approve" disabled={isAnySetScheduled}>Approve</option>
                            <option value="Reject" disabled={isAnySetScheduled}>Reject</option>
                          </select>
                        </div>


                        {/* Schedule Button (Only visible if Approved and not Scheduled) */}
                        {showScheduleButton ? ( 
                          <button
                            onClick={() => openScheduleModal(set)}
                            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white`}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002-2H5a2 2 0 00-2-2z"
                              />
                            </svg>
                            Schedule
                          </button>
                        ) : (
                            // Disabled button for Rejected or Awaiting Approval/Conflict
                          <button
                            disabled
                            className={`w-full py-2 px-4 rounded-lg font-medium cursor-not-allowed ${
                                set.isScheduled ? "bg-gray-500 text-white" : "bg-gray-200 text-gray-500"
                            }`}
                          >
                                {buttonText}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )})}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">
                  No question sets available
                </p>
              </div>
            )}
          </div>
        )}

        {/* Schedule Modal (Remains the same) */}
        {showModal && selectedSet && (
          <div className="fixed inset-0 flex items-center justify-center z-50"
style={{ 
                // Using RGBA to create the dimming effect without blurring the backdrop
                backgroundColor: 'rgba(50, 50, 50, 0.5)', 
            }}
>
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Schedule Exam
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Set Details */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Selected Set:
                </h4>
                <p className="text-gray-600">{selectedSet.name}</p>
                <p className="text-sm text-gray-500">
                  Standard {selectedStd} • {selectedSubject}
                </p>
              </div>

              {/* Date Time Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  disabled={selectedSet.isScheduled}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSchedule(selectedSet.pdfPath)}
                  disabled={selectedSet.isScheduled}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    selectedSet.isScheduled
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {selectedSet.isScheduled
                    ? "Already Scheduled"
                    : "Schedule Exam"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ExamQuestionPaper;