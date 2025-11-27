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
  const navigate = useNavigate();

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(
        // FIX: Using imported API_BASE_URL
        `${API_BASE_URL}api/etimetable`,
        {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
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
    const dayOptions = { weekday: 'long' };
    return date.toLocaleDateString('en-US', dayOptions);
  };


  const handleViewClick = (exam) => {
    setSelectedExam(exam);
    setIsModalOpen(true);
  };
  
  // NEW CHANGE: Handle Delete Function
  const handleDelete = async (id, examtype, standard) => {
    if (!window.confirm(`Are you sure you want to delete the ${examtype} timetable for Standard ${standard}?`)) {
      return;
    }

    try {
      const response = await axios.delete(
        `${API_BASE_URL}api/etimetable/${id}`,
        {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
        }
      );

      if (response.status === 200) {
        alert(response.data.message); // Show success notification
        fetchSchedules(); // Refresh the list
      }
    } catch (error) {
      console.error("Error deleting exam timetable:", error);
      alert(error.response?.data?.message || "Failed to delete timetable.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExam(null);
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
                {/* MODIFIED: Combined Action column */}
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
                      {/* Display startdate only in this table */}
                      {exam.startdate ? formatDateOnly(exam.startdate) : ""}
                    </td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => handleViewClick(exam)}
                        className="text-blue-500 hover:text-blue-700 font-medium mr-3"
                      >
                        View
                      </button>
                      {/* NEW CHANGE: Delete Button */}
                      <button
                        onClick={() => handleDelete(exam._id, exam.examtype, exam.standard)}
                        className="text-red-500 hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
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
                    {/* Separate Day and Date columns */}
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
                        {/* Display Day and Date using the functions */}
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
      </div>
    </MainLayout>
  );
};

export default ExamManagement;