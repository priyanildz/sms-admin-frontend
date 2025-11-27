// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const ExamManagement = () => {
//   const [examData, setExamdata] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedExam, setSelectedExam] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSchedules = async () => {
//       try {
//         const response = await axios.get(
//           "https://sspd-school-portal.vercel.app/api/etimetable",
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         if (response.status === 200) setExamdata(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchSchedules();
//   }, []);

//   const createTimetable = () => {
//     navigate("/exams-create-timetable");
//   };

//   const formatDate = (isoDate) => {
//     return isoDate ? new Date(isoDate).toISOString().split("T")[0] : "";
//   };

//   const handleViewClick = (exam) => {
//     setSelectedExam(exam);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedExam(null);
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="flex justify-end mb-4">
//           <button
//             onClick={createTimetable}
//             className="bg-blue-700 text-white px-4 py-1 rounded-md hover:bg-blue-800"
//           >
//             + Add
//           </button>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full border rounded-xl">
//             <thead className="bg-blue-100 text-left text-black text-md">
//               <tr>
//                 <th className="py-2 px-4 border">Exam Type</th>
//                 <th className="py-2 px-4 border">Standard</th>
//                 <th className="py-2 px-4 border">Start Date</th>
//                 <th className="py-2 px-4 border">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {examData.length > 0 ? (
//                 examData.map((exam, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="py-2 px-4 border">{exam.examtype}</td>
//                     <td className="py-2 px-4 border">{exam.standard}</td>
//                     <td className="py-2 px-4 border">
//                       {exam.startdate}
//                     </td>
//                     <td className="py-2 px-4 border">
//                       <button
//                         onClick={() => handleViewClick(exam)}
//                         className="text-blue-500 hover:text-blue-700 font-medium"
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="4"
//                     className="text-center py-6 text-gray-500 border"
//                   >
//                     No exam records available.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {isModalOpen && selectedExam && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-6 max-w-lg w-full">
//               <h4 className="text-lg font-semibold text-gray-700 mb-4">
//                 Exam Timetable Details
//               </h4>
//               <div className="mb-4">
//                 <p className="text-sm font-medium">
//                   <span className="font-bold">Exam Type:</span> {selectedExam.examtype}
//                 </p>
//                 <p className="text-sm font-medium">
//                   <span className="font-bold">Standard:</span> {selectedExam.standard}
//                 </p>
//               </div>
//               <h5 className="text-md font-semibold text-gray-700 mb-2">Timetable</h5>
//               <table className="w-full text-left border">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="p-2">Date</th>
//                     <th className="p-2">Subject</th>
//                     <th className="p-2">Time</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {selectedExam.timetable && selectedExam.timetable.length > 0 ? (
//                     selectedExam.timetable.map((entry, index) => (
//                       <tr key={index} className="border-b">
//                         <td className="p-2">{formatDate(entry.date)}</td>
//                         <td className="p-2">{entry.subject}</td>
//                         <td className="p-2">
//                           {entry.starttime} - {entry.endtime}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="3" className="p-2 text-center text-gray-500">
//                         No timetable entries available
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//               <div className="mt-4 flex justify-end">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-4 rounded"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// };

// export default ExamManagement;

// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // Define the base URL for your local backend API
// const LOCAL_API_BASE_URL = "http://localhost:5000/api";

// const ExamManagement = () => {
//   const [examData, setExamdata] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedExam, setSelectedExam] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSchedules = async () => {
//       try {
//         const response = await axios.get(
//           // CRITICAL FIX: Change from Vercel URL to local API URL
//           `${LOCAL_API_BASE_URL}/etimetable`,
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         if (response.status === 200) setExamdata(response.data);
//       } catch (error) {
//         console.error("Error fetching exam schedules from local server:", error);
//       }
//     };
//     fetchSchedules();
//   }, []);

//   const createTimetable = () => {
//     navigate("/exams-create-timetable");
//   };

//   const formatDate = (isoDate) => {
//     return isoDate ? new Date(isoDate).toISOString().split("T")[0] : "";
//   };

//   const handleViewClick = (exam) => {
//     setSelectedExam(exam);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedExam(null);
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="flex justify-end mb-4">
//           <button
//             onClick={createTimetable}
//             className="bg-blue-700 text-white px-4 py-1 rounded-md hover:bg-blue-800"
//           >
//             + Add
//           </button>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full border rounded-xl">
//             <thead className="bg-blue-100 text-left text-black text-md">
//               <tr>
//                 <th className="py-2 px-4 border">Exam Type</th>
//                 <th className="py-2 px-4 border">Standard</th>
//                 <th className="py-2 px-4 border">Start Date</th>
//                 <th className="py-2 px-4 border">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {examData.length > 0 ? (
//                 examData.map((exam, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="py-2 px-4 border">{exam.examtype}</td>
//                     <td className="py-2 px-4 border">{exam.standard}</td>
//                     <td className="py-2 px-4 border">
//                       {exam.startdate}
//                     </td>
//                     <td className="py-2 px-4 border">
//                       <button
//                         onClick={() => handleViewClick(exam)}
//                         className="text-blue-500 hover:text-blue-700 font-medium"
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="4"
//                     className="text-center py-6 text-gray-500 border"
//                   >
//                     No exam records available.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {isModalOpen && selectedExam && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-6 max-w-lg w-full">
//               <h4 className="text-lg font-semibold text-gray-700 mb-4">
//                 Exam Timetable Details
//               </h4>
//               <div className="mb-4">
//                 <p className="text-sm font-medium">
//                   <span className="font-bold">Exam Type:</span> {selectedExam.examtype}
//                 </p>
//                 <p className="text-sm font-medium">
//                   <span className="font-bold">Standard:</span> {selectedExam.standard}
//                 </p>
//               </div>
//               <h5 className="text-md font-semibold text-gray-700 mb-2">Timetable</h5>
//               <table className="w-full text-left border">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="p-2">Date</th>
//                     <th className="p-2">Subject</th>
//                     <th className="p-2">Time</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {selectedExam.timetable && selectedExam.timetable.length > 0 ? (
//                     selectedExam.timetable.map((entry, index) => (
//                       <tr key={index} className="border-b">
//                         <td className="p-2">{formatDate(entry.date)}</td>
//                         <td className="p-2">{entry.subject}</td>
//                         <td className="p-2">
//                           {entry.starttime} - {entry.endtime}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="3" className="p-2 text-center text-gray-500">
//                         No timetable entries available
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//               <div className="mt-4 flex justify-end">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-4 rounded"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// };

// export default ExamManagement;

// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// // --- Import the API Base URL from the config file ---
// import { API_BASE_URL } from "../config";

// // Define the base URL for your local backend API
// // const LOCAL_API_BASE_URL = "http://localhost:5000/api"; // REMOVED

// const ExamManagement = () => {
//   const [examData, setExamdata] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedExam, setSelectedExam] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSchedules = async () => {
//       try {
//         const response = await axios.get(
//           // FIX: Using imported API_BASE_URL
//           `${API_BASE_URL}api/etimetable`,
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         if (response.status === 200) setExamdata(response.data);
//       } catch (error) {
//         console.error("Error fetching exam schedules from server:", error);
//       }
//     };
//     fetchSchedules();
//   }, []);

//   const createTimetable = () => {
//     navigate("/exams-create-timetable");
//   };

//   const formatDate = (isoDate) => {
//     return isoDate ? new Date(isoDate).toISOString().split("T")[0] : "";
//   };

//   const handleViewClick = (exam) => {
//     setSelectedExam(exam);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedExam(null);
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="flex justify-end mb-4">
//           <button
//             onClick={createTimetable}
//             className="bg-blue-700 text-white px-4 py-1 rounded-md hover:bg-blue-800"
//           >
//             + Add
//           </button>
//           </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full border rounded-xl">
//             <thead className="bg-blue-100 text-left text-black text-md">
//               <tr>
//                 <th className="py-2 px-4 border">Exam Type</th>
//                 <th className="py-2 px-4 border">Standard</th>
//                 <th className="py-2 px-4 border">Start Date</th>
//                 <th className="py-2 px-4 border">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {examData.length > 0 ? (
//                 examData.map((exam, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="py-2 px-4 border">{exam.examtype}</td>
//                     <td className="py-2 px-4 border">{exam.standard}</td>
//                     <td className="py-2 px-4 border">
//                       {exam.startdate}
//                     </td>
//                     <td className="py-2 px-4 border">
//                       <button
//                         onClick={() => handleViewClick(exam)}
//                         className="text-blue-500 hover:text-blue-700 font-medium"
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="4"
//                     className="text-center py-6 text-gray-500 border"
//                   >
//                     No exam records available.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {isModalOpen && selectedExam && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-6 max-w-lg w-full">
//               <h4 className="text-lg font-semibold text-gray-700 mb-4">
//                 Exam Timetable Details
//               </h4>
//               <div className="mb-4">
//                 <p className="text-sm font-medium">
//                   <span className="font-bold">Exam Type:</span> {selectedExam.examtype}
//                 </p>
//                 <p className="text-sm font-medium">
//                   <span className="font-bold">Standard:</span> {selectedExam.standard}
//                 </p>
//               </div>
//               <h5 className="text-md font-semibold text-gray-700 mb-2">Timetable</h5>
//               <table className="w-full text-left border">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="p-2">Date</th>
//                     <th className="p-2">Subject</th>
//                     <th className="p-2">Time</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {selectedExam.timetable && selectedExam.timetable.length > 0 ? (
//                     selectedExam.timetable.map((entry, index) => (
//                       <tr key={index} className="border-b">
//                         <td className="p-2">{formatDate(entry.date)}</td>
//                         <td className="p-2">{entry.subject}</td>
//                         <td className="p-2">
//                           {entry.starttime} - {entry.endtime}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="3" className="p-2 text-center text-gray-500">
//                         No timetable entries available
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//               <div className="mt-4 flex justify-end">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-4 rounded"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// };

// export default ExamManagement;



// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// // --- Import the API Base URL from the config file ---
// import { API_BASE_URL } from "../config";

// // Define the base URL for your local backend API
// // const LOCAL_API_BASE_URL = "http://localhost:5000/api"; // REMOVED

// const ExamManagement = () => {
//   const [examData, setExamdata] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedExam, setSelectedExam] = useState(null);
//   const navigate = useNavigate();

//   const fetchSchedules = async () => {
//     try {
//       const response = await axios.get(
//         // FIX: Using imported API_BASE_URL
//         `${API_BASE_URL}api/etimetable`,
//         {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         }
//       );
//       if (response.status === 200) setExamdata(response.data);
//     } catch (error) {
//       console.error("Error fetching exam schedules from server:", error);
//     }
//   };

//   useEffect(() => {
//     fetchSchedules();
//   }, []);

//   const createTimetable = () => {
//     navigate("/exams-create-timetable");
//   };

//   // Function to format date as YYYY-MM-DD
//   const formatDateOnly = (isoDate) => {
//     return isoDate ? new Date(isoDate).toISOString().split("T")[0] : "";
//   };

//   // Function to format date as Day of the week (e.g., 'Thu')
//   const formatDayOnly = (isoDate) => {
//     if (!isoDate) return "";
//     const date = new Date(isoDate);
//     const dayOptions = { weekday: 'long' };
//     return date.toLocaleDateString('en-US', dayOptions);
//   };


//   const handleViewClick = (exam) => {
//     setSelectedExam(exam);
//     setIsModalOpen(true);
//   };
  
//   // NEW CHANGE: Handle Delete Function
//   const handleDelete = async (id, examtype, standard) => {
//     if (!window.confirm(`Are you sure you want to delete the ${examtype} timetable for Standard ${standard}?`)) {
//       return;
//     }

//     try {
//       const response = await axios.delete(
//         `${API_BASE_URL}api/etimetable/${id}`,
//         {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         }
//       );

//       if (response.status === 200) {
//         alert(response.data.message); // Show success notification
//         fetchSchedules(); // Refresh the list
//       }
//     } catch (error) {
//       console.error("Error deleting exam timetable:", error);
//       alert(error.response?.data?.message || "Failed to delete timetable.");
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedExam(null);
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="flex justify-end mb-4">
//           <button
//             onClick={createTimetable}
//             className="bg-blue-700 text-white px-4 py-1 rounded-md hover:bg-blue-800"
//           >
//             + Add
//           </button>
//           </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full border rounded-xl">
//             <thead className="bg-blue-100 text-left text-black text-md">
//               <tr>
//                 <th className="py-2 px-4 border">Exam Type</th>
//                 <th className="py-2 px-4 border">Standard</th>
//                 <th className="py-2 px-4 border">Start Date</th>
//                 {/* MODIFIED: Combined Action column */}
//                 <th className="py-2 px-4 border">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {examData.length > 0 ? (
//                 examData.map((exam, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="py-2 px-4 border">{exam.examtype}</td>
//                     <td className="py-2 px-4 border">{exam.standard}</td>
//                     <td className="py-2 px-4 border">
//                       {/* Display startdate only in this table */}
//                       {exam.startdate ? formatDateOnly(exam.startdate) : ""}
//                     </td>
//                     <td className="py-2 px-4 border">
//                       <button
//                         onClick={() => handleViewClick(exam)}
//                         className="text-blue-500 hover:text-blue-700 font-medium mr-3"
//                       >
//                         View
//                       </button>
//                       {/* NEW CHANGE: Delete Button */}
//                       <button
//                         onClick={() => handleDelete(exam._id, exam.examtype, exam.standard)}
//                         className="text-red-500 hover:text-red-700 font-medium"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="4"
//                     className="text-center py-6 text-gray-500 border"
//                   >
//                     No exam records available.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {isModalOpen && selectedExam && (
//           <div className="fixed inset-0 flex items-center justify-center z-50"
// style={{ 
//                 // Using RGBA to create the dimming effect without blurring the backdrop
//                 backgroundColor: 'rgba(50, 50, 50, 0.5)', 
//             }}
// >
//             <div className="bg-white rounded-lg p-6 max-w-lg w-full">
//               <h4 className="text-lg font-semibold text-gray-700 mb-4">
//                 Exam Timetable Details
//               </h4>
//               <div className="mb-4">
//                 <p className="text-sm font-medium">
//                   <span className="font-bold">Exam Type:</span> {selectedExam.examtype}
//                 </p>
//                 <p className="text-sm font-medium">
//                   <span className="font-bold">Standard:</span> {selectedExam.standard}
//                 </p>
//               </div>
//               <h5 className="text-md font-semibold text-gray-700 mb-2">Timetable</h5>
//               <table className="w-full text-left border">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     {/* Separate Day and Date columns */}
//                     <th className="p-2">Day</th>
//                     <th className="p-2">Date</th>
//                     <th className="p-2">Subject</th>
//                     <th className="p-2">Time</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {selectedExam.timetable && selectedExam.timetable.length > 0 ? (
//                     selectedExam.timetable.map((entry, index) => (
//                       <tr key={index} className="border-b">
//                         {/* Display Day and Date using the functions */}
//                         <td className="p-2">{formatDayOnly(entry.date)}</td>
//                         <td className="p-2">{formatDateOnly(entry.date)}</td>
//                         <td className="p-2">{entry.subject}</td>
//                         <td className="p-2">
//                           {entry.starttime} - {entry.endtime}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="4" className="p-2 text-center text-gray-500">
//                         No timetable entries available
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//               <div className="mt-4 flex justify-end">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-4 rounded"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// };

// export default ExamManagement;

import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config";

// Define the base URL for your local backend API
// const LOCAL_API_BASE_URL = "http://localhost:5000/api"; // REMOVED

const ExamManagement = () => {
  const [examData, setExamdata] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  // NEW STATE for Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  
  // NEW STATE for Drag and Drop functionality
  const [draggedIndex, setDraggedIndex] = useState(null);
  
  const navigate = useNavigate();

  const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";


  const fetchSchedules = async () => {
    try {
      const response = await axios.get(
        // FIX: Using imported API_BASE_URL
        `${API_BASE_URL}api/etimetable`,
        {
          headers: {
            auth: AUTH_HEADER,
          },
        }
      );
      if (response.status === 200) setExamdata(response.data);
    } catch (error) {
      console.error("Error fetching exam schedules from server:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const createTimetable = () => {
    navigate("/exams-create-timetable");
  };

  // Function to format date as YYYY-MM-DD
  const formatDateOnly = (isoDate) => {
    return isoDate ? new Date(isoDate).toISOString().split("T")[0] : "";
  };

  // Function to format date as Day of the week (e.g., 'Thu')
  const formatDayOnly = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const dayOptions = { weekday: 'short' };
    return date.toLocaleDateString('en-US', dayOptions);
  };

  // Helper function to re-calculate dates based on current subject order and gaps
  const recalculateDates = (timetable, startdate, examgap) => {
      if (!startdate || timetable.length === 0) return timetable;
      
      // Attempt to infer the starting date from the first entry if startdate is null/invalid
      let startDateForCalc = startdate;
      if (!startDateForCalc && timetable[0]?.date) {
        startDateForCalc = timetable[0].date;
      }
      if (!startDateForCalc) return timetable; // Cannot proceed without a date
      
      let currentDate = new Date(startDateForCalc + 'T00:00:00');
      const gapDays = parseInt(examgap.split(" ")[0]) || 0;
      
      return timetable.map((entry, index) => {
          const newEntry = {
              ...entry,
              date: currentDate.toISOString().split("T")[0],
          };
          
          // Advance date for the next entry
          currentDate.setDate(currentDate.getDate() + 1 + gapDays);
          
          return newEntry;
      });
  };

  const handleViewClick = (exam) => {
    setSelectedExam(exam);
    setIsModalOpen(true);
  };
  
  // Handle Edit Click (replaces handleDelete)
  const handleEditClick = (exam) => {
    // Deep clone the timetable array for editing
    setEditFormData({
      ...exam,
      // Ensure date objects are converted to YYYY-MM-DD for input fields
      timetable: exam.timetable.map(entry => ({
        ...entry,
        date: formatDateOnly(entry.date)
      })),
      // Set a placeholder for examgap if not present, though it's not strictly necessary for this shuffle
      examgap: exam.examgap || 'None', 
      // Set startdate to its formatted string value
      startdate: formatDateOnly(exam.startdate) // Ensure we pass the base start date correctly
    });
    setIsEditModalOpen(true);
  };
  
  // Function to delete the entire timetable from within the edit modal
  const handleDeleteTimetable = async (id, examtype, standard) => {
    if (!window.confirm(`Are you sure you want to DELETE the entire ${examtype} timetable for Standard ${standard}? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await axios.delete(
        `${API_BASE_URL}api/etimetable/${id}`,
        { headers: { auth: AUTH_HEADER } }
      );

      if (response.status === 200) {
        alert(response.data.message);
        closeEditModal();
        fetchSchedules(); 
      }
    } catch (error) {
      console.error("Error deleting exam timetable:", error);
      alert(error.response?.data?.message || "Failed to delete timetable.");
    }
  };

  // Function to handle changes in the edit modal (date/time/subject of individual entry)
  const handleEditChange = (e, index, field) => {
    const { value } = e.target;
    const newTimetable = [...editFormData.timetable];
    newTimetable[index] = {
      ...newTimetable[index],
      [field]: value,
    };
    
    // NOTE: This does NOT trigger recalculateDates, as the user is manually editing date/time/subject.
    
    setEditFormData({ ...editFormData, timetable: newTimetable });
  };
  
  // Function to delete a single subject entry from the timetable array
  const handleDeleteEntry = (indexToDelete) => {
    if (!window.confirm("Are you sure you want to delete this subject entry?")) {
        return;
    }
    const newTimetable = editFormData.timetable.filter((_, index) => index !== indexToDelete);
    
    // Recalculate dates for the remaining entries after deletion
    const updatedTimetable = recalculateDates(
        newTimetable, 
        editFormData.startdate, 
        editFormData.examgap
    );
    
    setEditFormData({ ...editFormData, timetable: updatedTimetable });
  };
  
  // --- DRAG HANDLERS ---
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const newTimetable = [...editFormData.timetable];
    // Remove the dragged item
    const [removed] = newTimetable.splice(draggedIndex, 1);
    // Insert it into the target position
    newTimetable.splice(targetIndex, 0, removed);
    
    // Recalculate dates for the reordered entries
    // We use the original startdate stored in editFormData
    const updatedTimetable = recalculateDates(
        newTimetable, 
        editFormData.startdate, 
        editFormData.examgap
    );

    setEditFormData({ ...editFormData, timetable: updatedTimetable });
    setDraggedIndex(null); // Reset drag state
  };
  // --- END DRAG HANDLERS ---
  
  // Function to submit the updated timetable
  const handleUpdateTimetable = async (e) => {
    e.preventDefault();
    setDraggedIndex(null); // Clear drag state just in case

    if (editFormData.timetable.length === 0) {
        alert("Timetable cannot be empty. Use 'Delete Timetable' if you wish to remove the schedule entirely.");
        return;
    }
    
    // Basic validation check (can be expanded)
    const isValid = editFormData.timetable.every(entry => entry.date && entry.subject && entry.starttime && entry.endtime);
    if (!isValid) {
        alert("Please ensure all date, subject, start time, and end time fields are filled for every entry.");
        return;
    }

    try {
      const payload = {
        // Ensure startdate and examtype are passed correctly
        startdate: editFormData.startdate, 
        examtype: editFormData.examtype,
        timetable: editFormData.timetable,
      };
      
      const response = await axios.put(
        `${API_BASE_URL}api/etimetable/${editFormData._id}`,
        payload,
        { headers: { auth: AUTH_HEADER } }
      );

      if (response.status === 200) {
        alert(response.data.message);
        closeEditModal();
        fetchSchedules();
      }
    } catch (error) {
      console.error("Error updating timetable:", error);
      alert(error.response?.data?.message || "Failed to update timetable.");
    }
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExam(null);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditFormData(null);
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={createTimetable}
            className="bg-blue-700 text-white px-4 py-1 rounded-md hover:bg-blue-800"
          >
            + Add
          </button>
          </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-xl">
            <thead className="bg-blue-100 text-left text-black text-md">
              <tr>
                <th className="py-2 px-4 border">Exam Type</th>
                <th className="py-2 px-4 border">Standard</th>
                <th className="py-2 px-4 border">Start Date</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {examData.length > 0 ? (
                examData.map((exam, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border">{exam.examtype}</td>
                    <td className="py-2 px-4 border">{exam.standard}</td>
                    <td className="py-2 px-4 border">
                      {exam.startdate ? formatDateOnly(exam.startdate) : ""}
                    </td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => handleViewClick(exam)}
                        className="text-blue-500 hover:text-blue-700 font-medium mr-3"
                      >
                        View
                      </button>
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEditClick(exam)}
                        className="text-green-500 hover:text-green-700 font-medium"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : ( // Error was likely here due to the nesting/parenthesis before this colon
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-500 border"
                  >
                    No exam records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* View Modal (Unchanged structure) */}
        {isModalOpen && selectedExam && (
          <div className="fixed inset-0 flex items-center justify-center z-50"
style={{ 
                // Using RGBA to create the dimming effect without blurring the backdrop
                backgroundColor: 'rgba(50, 50, 50, 0.5)', 
            }}
>
            <div className="bg-white rounded-lg p-6 max-w-lg w-full">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">
                Exam Timetable Details
              </h4>
              <div className="mb-4">
                <p className="text-sm font-medium">
                  <span className="font-bold">Exam Type:</span> {selectedExam.examtype}
                </p>
                <p className="text-sm font-medium">
                  <span className="font-bold">Standard:</span> {selectedExam.standard}
                </p>
              </div>
              <h5 className="text-md font-semibold text-gray-700 mb-2">Timetable</h5>
              <table className="w-full text-left border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2">Day</th>
                    <th className="p-2">Date</th>
                    <th className="p-2">Subject</th>
                    <th className="p-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedExam.timetable && selectedExam.timetable.length > 0 ? (
                    selectedExam.timetable.map((entry, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{formatDayOnly(entry.date)}</td>
                        <td className="p-2">{formatDateOnly(entry.date)}</td>
                        <td className="p-2">{entry.subject}</td>
                        <td className="p-2">
                          {entry.starttime} - {entry.endtime}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="p-2 text-center text-gray-500">
                        No timetable entries available
                      </td>
                    </tr>
                )}
                </tbody>
              </table>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EDIT MODAL with Drag and Drop */}
        {isEditModalOpen && editFormData && (
            <div className=" fixed inset-0 flex items-center justify-center z-50"
            style={{ 
                // Using RGBA to create the dimming effect without blurring the backdrop
                backgroundColor: 'rgba(50, 50, 50, 0.5)', 
            }}
            >
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <h4 className="text-lg font-semibold text-gray-700 mb-4 flex justify-between items-center">
                  Edit Timetable
                  <button
                      onClick={() => handleDeleteTimetable(editFormData._id, editFormData.examtype, editFormData.standard)}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1 px-3 rounded"
                    >
                      Delete Timetable
                    </button>
                </h4>
                
                <form onSubmit={handleUpdateTimetable}>
                  {/* Immutable Fields Display */}
                  <div className="mb-4 bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium">
                      <span className="font-bold">Exam Type:</span> {editFormData.examtype}
                    </p>
                    <p className="text-sm font-medium">
                      <span className="font-bold">Standard:</span> {editFormData.standard}
                    </p>
                  </div>

                  {/* <h5 className="text-md font-semibold text-gray-700 mb-2">Timetable Entries (Drag rows to shuffle dates)</h5> */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left border">
                      <thead>
                        <tr className="bg-gray-100 text-xs sm:text-sm">
                          <th className="p-2 w-1/5">Date</th>
                          <th className="p-2 w-1/5">Subject</th>
                          <th className="p-2 w-1/6">Start</th>
                          <th className="p-2 w-1/6">End</th>
                          <th className="p-2 w-[10%]">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {editFormData.timetable.map((entry, index) => (
                          <tr 
                            key={index} 
                            className={`border-b cursor-move ${draggedIndex === index ? 'opacity-50 bg-yellow-100' : ''}`}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                            onDragEnd={() => setDraggedIndex(null)}
                          >
                            <td className="p-2">
                              <input
                                type="date"
                                // The date value reflects the re-calculated order
                                value={entry.date}
                                onChange={(e) => handleEditChange(e, index, 'date')}
                                className="w-full border rounded px-1 py-1 text-xs"
                                required
                              />
                            </td>
                            <td className="p-2">
                              <input
                                type="text"
                                value={entry.subject}
                                onChange={(e) => handleEditChange(e, index, 'subject')}
                                className="w-full border rounded px-1 py-1 text-xs"
                                required
                              />
                            </td>
                            <td className="p-2">
                              <input
                                type="time"
                                value={entry.starttime}
                                onChange={(e) => handleEditChange(e, index, 'starttime')}
                                className="w-full border rounded px-1 py-1 text-xs"
                                required
                              />
                            </td>
                            <td className="p-2">
                              <input
                                type="time"
                                value={entry.endtime}
                                onChange={(e) => handleEditChange(e, index, 'endtime')}
                                className="w-full border rounded px-1 py-1 text-xs"
                                required
                              />
                            </td>
                            <td className="p-2 text-center">
                              <button
                                type="button"
                                onClick={() => handleDeleteEntry(index)}
                                className="text-red-500 hover:text-red-700 text-sm font-medium"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={closeEditModal}
                      className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-4 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
      </div>
    </MainLayout>
  );
};

export default ExamManagement;