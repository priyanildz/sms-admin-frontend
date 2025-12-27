// import { useState, useEffect } from "react";
// import axios from "axios";
// import MainLayout from "../layout/MainLayout";
// import PublishTimetable from "../components/PublishTimetable";
// import Modal from "react-modal";

// Modal.setAppElement("#root");

// export default function StaffTimetable() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isPublishing, setIsPublishing] = useState(false);
//   const [timetableData, setTimetableData] = useState([]);
//   const [teachersData, setTeachersData] = useState({}); 
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedTimetable, setSelectedTimetable] = useState(null);
//   const [selectedTimetableInfo, setSelectedTimetableInfo] = useState(null);
//   const [retry, setRetry] = useState(0);

//   const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         // Fetch timetables
//         const timetableResponse = await axios.get(
//           "http://localhost:5000/api/timetables",
//           {
//             headers: { auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=` },
//           }
//         );
//         setTimetableData(timetableResponse.data);

//         // Fetch teachers
//         const teachersResponse = await axios.get(
//           "http://localhost:5000/api/staff",
//           {
//             headers: { auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=` },
//           }
//         );
//         const teachersMap = {};
//         teachersResponse.data.forEach((t) => {
//           teachersMap[t._id] = t;
//         });
//         setTeachersData(teachersMap);
//       } catch (err) {
//         setError("Failed to fetch data: " + err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [retry]);

//   const handleSearchChange = (e) => setSearchQuery(e.target.value);
//   const handlePublishClick = () => setIsPublishing(true);
//   const handleCancelPublish = () => setIsPublishing(false);
//   const handleRetry = () => setRetry((prev) => prev + 1);

//   const handleValidate = async (standard, division) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/timetables/validate/${standard}/${division}`,
//         {
//           headers: { auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=` },
//         }
//       );
//       alert(response.data.message || response.data.errors.join("\n"));
//     } catch (err) {
//       alert("Error validating timetable: " + err.response?.data?.error);
//     }
//   };

//   const handleViewTimetable = (item) => {
//     setSelectedTimetable(item.timetable);
//     setSelectedTimetableInfo({ standard: item.standard, division: item.division });
//   };

//   const closeModal = () => {
//     setSelectedTimetable(null);
//     setSelectedTimetableInfo(null);
//   };

//   // Get teacher name from ID or object
//   const getTeacherName = (teacherId) => {
//     if (!teacherId) return "Not Assigned";
//     const teacher = teachersData[teacherId];
//     if (!teacher) return "Unknown";
//     return teacher.firstname || teacher.fullname?.split(" ")[0] || "Unknown";
//   };

//   // Get subject + teacher for a given day and period
//   const getSubjectForDayAndPeriod = (day, periodNumber) => {
//     if (!selectedTimetable) return { subject: "", teacher: "" };
//     const dayData = selectedTimetable.find((d) => d.day === day);
//     if (!dayData) return { subject: "", teacher: "" };
//     const period = dayData.periods.find((p) => p.periodNumber === periodNumber);
//     if (!period) return { subject: "", teacher: "" };
//     return { subject: period.subject || "", teacher: getTeacherName(period.teacher) };
//   };

//   // Extract all unique period numbers for table rows
//   const getAllPeriods = () => {
//     if (!selectedTimetable) return [];
//     const periodsSet = new Set();
//     selectedTimetable.forEach((day) =>
//       day.periods.forEach((p) => periodsSet.add(p.periodNumber))
//     );
//     return Array.from(periodsSet).sort((a, b) => a - b);
//   };

//   // Get period time dynamically from first day that has this period
//   const getTimeForPeriod = (periodNumber) => {
//     for (let day of daysOfWeek) {
//       const dayData = selectedTimetable.find((d) => d.day === day);
//       if (!dayData) continue;
//       const period = dayData.periods.find((p) => p.periodNumber === periodNumber);
//       if (period?.time) return period.time;
//     }
//     return "N/A";
//   };

//   // Filter timetables
//   const uniqueTimetables = Array.from(
//     new Map(timetableData.map((item) => [`${item.standard}-${item.division}`, item])).values()
//   );

//   const filteredData = uniqueTimetables.filter(
//     (item) =>
//       item.standard.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.division.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="flex flex-col flex-1 p-4 sm:p-6 overflow-y-auto">
//           {!isPublishing && (
//             <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 placeholder="Search by standard or division..."
//                 className="w-full sm:w-72 px-3 py-2 rounded-md border border-gray-300 text-sm"
//               />
//               <button
//                 onClick={handlePublishClick}
//                 className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//               >
//                 Publish
//               </button>
//             </div>
//           )}

//           <div className="my-4 text-center">
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Timetable</h2>
//           </div>

//           {error && (
//             <div className="text-red-500 mb-4 flex justify-between items-center">
//               {error}
//               <button
//                 onClick={handleRetry}
//                 className="ml-4 px-2 py-1 bg-gray-300 rounded-md text-sm hover:bg-gray-400"
//               >
//                 Retry
//               </button>
//             </div>
//           )}
//           {loading && (
//             <div className="text-gray-500 mb-4 flex justify-center">
//               <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//           )}

//           {isPublishing ? (
//             <PublishTimetable handleCancelPublish={handleCancelPublish} />
//           ) : (
//             <>
//               {/* Timetable List */}
//               <div className="overflow-auto border border-gray-200">
//                 <table className="min-w-full table-auto text-sm sm:text-base">
//                   <thead className="bg-blue-100 text-black">
//                     <tr>
//                       <th className="border px-2 sm:px-4 py-2 text-center">Std</th>
//                       <th className="border px-2 sm:px-4 py-2 text-center">Div</th>
//                       <th className="border px-2 sm:px-4 py-2 text-center">Year</th>
//                       <th className="border px-2 sm:px-4 py-2 text-center">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white">
//                     {filteredData.map((item) => (
//                       <tr key={`${item.standard}-${item.division}`} className="border-b border-gray-200 hover:bg-gray-50">
//                         <td className="px-2 border sm:px-4 py-2 text-center">{item.standard}</td>
//                         <td className="px-2 border sm:px-4 py-2 text-center">{item.division}</td>
//                         <td className="px-2 border sm:px-4 py-2 text-center">{item.year}</td>
//                         <td className="px-2 border sm:px-4 py-2 text-center">
//                           <button
//                             className="text-blue-600 hover:underline mr-2"
//                             onClick={() => handleViewTimetable(item)}
//                           >
//                             View
//                           </button>
//                           {/* <button
//                             className="text-green-600 hover:underline"
//                             onClick={() => handleValidate(item.standard, item.division)}
//                           >
//                             Validate
//                           </button> */}
//                         </td>
//                       </tr>
//                     ))}
//                     {filteredData.length === 0 && (
//                       <tr>
//                         <td colSpan={4} className="text-center py-4 text-gray-500">No timetables found</td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Modal for Timetable Grid */}
//               <Modal
//                 isOpen={!!selectedTimetable}
//                 onRequestClose={closeModal}
//                 style={{
//                   content: {
//                     top: "50%",
//                     left: "50%",
//                     right: "auto",
//                     bottom: "auto",
//                     transform: "translate(-50%, -50%)",
//                     width: "95%",
//                     maxWidth: "1200px",
//                     maxHeight: "90vh",
//                     overflow: "hidden",
//                     padding: "0",
//                     borderRadius: "12px",
//                     boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
//                   },
//                   overlay: { backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1000 },
//                 }}
//               >
//                 <div className="flex flex-col h-full">
//                   <div className="flex justify-between items-center p-4 border-b bg-blue-500 text-white rounded-t-md">
//                     <h2 className="font-semibold text-lg">
//                       Timetable - Std {selectedTimetableInfo?.standard}, Div {selectedTimetableInfo?.division}
//                     </h2>
//                     <button
//                       onClick={closeModal}
//                       className="text-white px-3 py-1 rounded hover:bg-red-600 bg-red-500"
//                     >
//                       ✕ Close
//                     </button>
//                   </div>

//                   <div className="overflow-auto flex-1">
//                     <table className="min-w-full border-collapse">
//                       <thead>
//                         <tr className="bg-blue-100 text-gray-800 sticky top-0">
//                           <th className="border px-4 py-2 text-left">Time</th>
//                           {daysOfWeek.map((day) => (
//                             <th key={day} className="border px-4 py-2 text-center">{day}</th>
//                           ))}
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {getAllPeriods().map((periodNumber) => (
//                           <tr key={periodNumber} className="hover:bg-gray-50">
//                             <td className="border px-4 py-2 font-medium bg-gray-50">
//                               {getTimeForPeriod(periodNumber)}
//                             </td>
//                             {daysOfWeek.map((day) => {
//                               const { subject, teacher } = getSubjectForDayAndPeriod(day, periodNumber);
//                               return (
//                                 <td key={`${day}-${periodNumber}`} className="border px-4 py-2 text-center">
//                                   {subject ? (
//                                     <div>
//                                       <div className="font-medium text-gray-800">{subject}</div>
//                                       <div className="text-xs text-gray-600 mt-1">{teacher}</div>
//                                     </div>
//                                   ) : (
//                                     <span className="text-gray-400">-</span>
//                                   )}
//                                 </td>
//                               );
//                             })}
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </Modal>
//             </>
//           )}
//         </div>
//       </div>
//     </MainLayout>
//   );
// }


import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

Modal.setAppElement("#root");

export default function StaffTimetable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [timetableData, setTimetableData] = useState([]);
  const [teachersData, setTeachersData] = useState({}); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTimetable, setSelectedTimetable] = useState(null);
  const [selectedTimetableInfo, setSelectedTimetableInfo] = useState(null);
  const [retry, setRetry] = useState(0);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const AUTH_HEADER = `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch timetables
        // FIX 1: Using imported API_BASE_URL - ADDED FORWARD SLASH
        const timetableResponse = await axios.get(
          `${API_BASE_URL}api/timetables`, // FIX: Ensuring the URL path starts correctly with a slash
          {
            headers: { auth: AUTH_HEADER },
          }
        );
        setTimetableData(timetableResponse.data);

        // Fetch teachers
        // FIX 2: Using imported API_BASE_URL - ADDED FORWARD SLASH
        const teachersResponse = await axios.get(
          `${API_BASE_URL}api/staff`, // FIX: Ensuring the URL path starts correctly with a slash
          {
            headers: { auth: AUTH_HEADER },
          }
        );
        const teachersMap = {};
        teachersResponse.data.forEach((t) => {
          teachersMap[t._id] = t;
        });
        setTeachersData(teachersMap);
      } catch (err) {
        // A more detailed error handling for 404
        if (err.response && err.response.status === 404) {
          setError("Failed to fetch data: Resource Not Found (404). Check API endpoint.");
        } else {
          setError("Failed to fetch data: " + err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [retry]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handlePublishClick = () => setIsPublishing(true);
  const handleCancelPublish = () => setIsPublishing(false);
  const handleRetry = () => setRetry((prev) => prev + 1);

  const handleValidate = async (standard, division) => {
    try {
      // FIX 3: Using imported API_BASE_URL - ADDED FORWARD SLASH
      const response = await axios.get(
        `${API_BASE_URL}api/timetables/validate/${standard}/${division}`, // FIX: Ensuring the URL path starts correctly with a slash
        {
          headers: { auth: AUTH_HEADER },
        }
      );
      alert(response.data.message || response.data.errors.join("\n"));
    } catch (err) {
      alert("Error validating timetable: " + err.response?.data?.error);
    }
  };

  const handleViewTimetable = (item) => {
    setSelectedTimetable(item.timetable);
    setSelectedTimetableInfo({ standard: item.standard, division: item.division });
  };

  const closeModal = () => {
    setSelectedTimetable(null);
    setSelectedTimetableInfo(null);
  };

  // Get teacher name from ID or object
  const getTeacherName = (teacherId) => {
    if (!teacherId) return "Not Assigned";
    const teacher = teachersData[teacherId];
    if (!teacher) return "Unknown";
    return teacher.firstname || teacher.fullname?.split(" ")[0] || "Unknown";
  };

  // Get subject + teacher for a given day and period
  const getSubjectForDayAndPeriod = (day, periodNumber) => {
    if (!selectedTimetable) return { subject: "", teacher: "" };
    const dayData = selectedTimetable.find((d) => d.day === day);
    if (!dayData) return { subject: "", teacher: "" };
    const period = dayData.periods.find((p) => p.periodNumber === periodNumber);
    if (!period) return { subject: "", teacher: "" };
    return { subject: period.subject || "", teacher: getTeacherName(period.teacher) };
  };

  // Extract all unique period numbers for table rows
  const getAllPeriods = () => {
    if (!selectedTimetable) return [];
    const periodsSet = new Set();
    selectedTimetable.forEach((day) =>
      day.periods.forEach((p) => periodsSet.add(p.periodNumber))
    );
    return Array.from(periodsSet).sort((a, b) => a - b);
  };

  // Get period time dynamically from first day that has this period
  const getTimeForPeriod = (periodNumber) => {
    for (let day of daysOfWeek) {
      const dayData = selectedTimetable.find((d) => d.day === day);
      if (!dayData) continue;
      const period = dayData.periods.find((p) => p.periodNumber === periodNumber);
      if (period?.time) return period.time;
    }
    return "N/A";
  };

  // Filter timetables
  const uniqueTimetables = Array.from(
    new Map(timetableData.map((item) => [`${item.standard}-${item.division}`, item])).values()
  );

  const filteredData = uniqueTimetables.filter(
    (item) =>
      item.standard.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.division.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex flex-col flex-1 p-4 sm:p-6 overflow-y-auto">
          {!isPublishing && (
            <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by standard or division..."
                className="w-full sm:w-72 px-3 py-2 rounded-md border border-gray-300 text-sm"
              />
              <button
                onClick={handlePublishClick}
                className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Publish
              </button>
            </div>
          )}

          <div className="my-4 text-center">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Timetable</h2>
          </div>

          {error && (
            <div className="text-red-500 mb-4 flex justify-between items-center">
              {error}
              <button
                onClick={handleRetry}
                className="ml-4 px-2 py-1 bg-gray-300 rounded-md text-sm hover:bg-gray-400"
              >
                Retry
              </button>
            </div>
          )}
          {loading && (
            <div className="text-gray-500 mb-4 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {isPublishing ? (
            <PublishTimetable handleCancelPublish={handleCancelPublish} />
          ) : (
            <>
              {/* Timetable List */}
              <div className="overflow-auto border border-gray-200">
                <table className="min-w-full table-auto text-sm sm:text-base">
                  <thead className="bg-blue-100 text-black">
                    <tr>
                      <th className="border px-2 sm:px-4 py-2 text-center">Std</th>
                      <th className="border px-2 sm:px-4 py-2 text-center">Div</th>
                      <th className="border px-2 sm:px-4 py-2 text-center">Year</th>
                      <th className="border px-2 sm:px-4 py-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {filteredData.map((item) => (
                      <tr key={`${item.standard}-${item.division}`} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-2 border sm:px-4 py-2 text-center">{item.standard}</td>
                        <td className="px-2 border sm:px-4 py-2 text-center">{item.division}</td>
                        <td className="px-2 border sm:px-4 py-2 text-center">{item.year}</td>
                        <td className="px-2 border sm:px-4 py-2 text-center">
                          <button
                            className="text-blue-600 hover:underline mr-2"
                            onClick={() => handleViewTimetable(item)}
                          >
                            View
                          </button>
                          {/* <button
                            className="text-green-600 hover:underline"
                            onClick={() => handleValidate(item.standard, item.division)}
                          >
                            Validate
                          </button> */}
                        </td>
                      </tr>
                    ))}
                    {filteredData.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center py-4 text-gray-500">No timetables found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Modal for Timetable Grid */}
              <Modal
                isOpen={!!selectedTimetable}
                onRequestClose={closeModal}
                style={{
                  content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    transform: "translate(-50%, -50%)",
                    width: "95%",
                    maxWidth: "1200px",
                    maxHeight: "100vh",
                    overflow: "hidden",
                    padding: "0",
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  },
                  overlay: { backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1000 },
                }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center p-4 border-b bg-blue-500 text-white rounded-t-md">
                    <h2 className="font-semibold text-lg">
                      Timetable - Std {selectedTimetableInfo?.standard}, Div {selectedTimetableInfo?.division}
                    </h2>
                    <button
                      onClick={closeModal}
                      className="text-white px-3 py-1 rounded hover:bg-red-600 bg-red-500"
                    >
                      ✕ Close
                    </button>
                  </div>

                  <div className="overflow-auto flex-1">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="bg-blue-100 text-gray-800 sticky top-0">
                          <th className="border px-4 py-2 text-left">Time</th>
                          {daysOfWeek.map((day) => (
                            <th key={day} className="border px-4 py-2 text-center">{day}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {getAllPeriods().map((periodNumber) => (
                          <tr key={periodNumber} className="hover:bg-gray-50">
                            <td className="border px-4 py-2 font-medium bg-gray-50">
                              {getTimeForPeriod(periodNumber)}
                            </td>
                            {daysOfWeek.map((day) => {
                              const { subject, teacher } = getSubjectForDayAndPeriod(day, periodNumber);
                              return (
                                <td key={`${day}-${periodNumber}`} className="border px-4 py-2 text-center">
                                  {subject ? (
                                    <div>
                                      <div className="font-medium text-gray-800">{subject}</div>
                                      <div className="text-xs text-gray-600 mt-1">{teacher}</div>
                                    </div>
                                  ) : (
                                    <span className="text-gray-400">-</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Modal>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}