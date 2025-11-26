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

  // NEW STATE for Set Creation
  const [showCreateSetModal, setShowCreateSetModal] = useState(false);
  const [newSetName, setNewSetName] = useState("");
  const [newSetUrl, setNewSetUrl] = useState("");

  const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

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
    fetchSets(selectedStd, subject);
  };

  // NEW CHANGE: Handle creation of a new set
  const handleCreateSet = async () => {
    if (!newSetName || !newSetUrl || !selectedStd || !selectedSubject) {
      alert("Please fill in the Set Name and Set URL.");
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}api/add-set`,
        {
          name: newSetName,
          url: newSetUrl,
          standard: selectedStd,
          subject: selectedSubject,
        },
        {
          headers: {
            "Content-Type": "application/json",
            auth: AUTH_HEADER,
          },
        }
      );
      alert("New Set created successfully!");
      setShowCreateSetModal(false);
      setNewSetName("");
      setNewSetUrl("");
      // Refresh sets list
      fetchSets(selectedStd, selectedSubject); 
    } catch (err) {
      console.error("Error creating set:", err.response?.data?.message || err.message);
      alert(`Failed to create set: ${err.response?.data?.message || err.message}`);
    }
  };
  
  const handleSchedule = async (setUrl) => {
    if (!schedule) {
      alert("Please select date & time before scheduling");
      return;
    }
    try {
      // FIX 3: Using imported API_BASE_URL
      await axios.post(
        `${API_BASE_URL}api/schedule`,
        {
          standard: selectedStd,
          subject: selectedSubject,
          set: setUrl,
          schedule,
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
      // Re-fetch to update isScheduled status
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
            <option value="1">Grade 1</option>
            <option value="2">Grade 2</option>
            <option value="3">Grade 3</option>
            <option value="4">Grade 4</option>
            <option value="5">Grade 5</option>
            <option value="6">Grade 6</option>
            <option value="7">Grade 7</option>
            <option value="8">Grade 8</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
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
          </div>
        )}

        {/* Loading State */}
        {loading && <p className="text-center mt-6">Loading sets...</p>}

        {/* Step 3: Available Sets & Create Button */}
        {selectedSubject && !loading && (
          <div className="mt-10">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-medium text-gray-800">
                Available Sets for {selectedSubject}
              </h4>
              <button
                onClick={() => setShowCreateSetModal(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                + Create New Set
              </button>
            </div>

            {sets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sets.map((set, idx) => (
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

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        {/* View Button */}
                        <button
                          onClick={() => window.open(set.url, "_blank")}
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
                        
                        {/* Schedule Button */}
                        <button
                          onClick={() =>
                            !set.isScheduled && openScheduleModal(set)
                          }
                          disabled={set.isScheduled}
                          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
                            set.isScheduled
                              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700 text-white"
                          }`}
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
                          {set.isScheduled ? "Already Scheduled" : "Schedule"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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
                <p className="text-gray-400 text-sm mt-2">
                  Use the button above to create the first set.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Schedule Modal (Remains the same) */}
        {showModal && selectedSet && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
                  onClick={() => handleSchedule(selectedSet.url)}
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
        
        {/* NEW CHANGE: Create New Set Modal */}
        {showCreateSetModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Create New Question Set
                </h3>
                <button
                  onClick={() => setShowCreateSetModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Set Name (e.g., Set A, Final Paper)
                </label>
                <input
                  type="text"
                  value={newSetName}
                  onChange={(e) => setNewSetName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter set name"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Paper URL (Link to PDF/Doc)
                </label>
                <input
                  type="url"
                  value={newSetUrl}
                  onChange={(e) => setNewSetUrl(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="https://example.com/qp_set_a.pdf"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowCreateSetModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateSet}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Save Set
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