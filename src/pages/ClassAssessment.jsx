// import React, { useEffect, useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import { FaBookOpen } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import axios from 'axios'

// const ClassAssessment = () => {
//   const navigate = useNavigate();

//   const [selectedStd, setSelectedStd] = useState("");
//   const [selectedDiv, setSelectedDiv] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [classTeacher, setClassTeacher] = useState("");
//   const [subjectsData, setSubjectsData] = useState([]);

//   const stdOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
//   const divOptions = ["A", "B", "C"];

//   useEffect(() => {
//     const fetchAssessments = async () => {
//       try {
//         const response = await axios.get(
//           "https://sspd-school-portal.vercel.app/api/assessment",
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         if (response.status == 200) setSubjectsData(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchAssessments();
//   }, []); // Added dependency array to prevent infinite calls

//   // Function to handle viewing a specific assessment
//   const handleViewAssessment = (assessmentItem) => {
//     // Navigate with assessment data as state
//     navigate("/classes-assessment-view", { 
//       state: { 
//         assessmentData: assessmentItem,
//         mode: 'view', // to differentiate between add and view mode
//         // Pass current filter values as well
//         filters: {
//           standard: selectedStd,
//           division: selectedDiv,
//           date: selectedDate,
//           classTeacher: classTeacher
//         }
//       } 
//     });
//   };

//   const handleAddAssessment = () => {
//     // Pass current filter values when adding new assessment
//     navigate("/classes-assessment-view", {
//       state: {
//         mode: 'add',
//         filters: {
//           standard: selectedStd,
//           division: selectedDiv,
//           date: selectedDate,
//           classTeacher: classTeacher
//         }
//       }
//     });
//   };

//   return (
//     <MainLayout>
//       <div className="p-6">
//         <div className="bg-white rounded-2xl shadow p-6">
//           {/* Top Inputs */}
//           <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-gray-700 mb-2">
//                 Standard
//               </label>
//               <select
//                 value={selectedStd}
//                 onChange={(e) => setSelectedStd(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//               >
//                 <option value="">Select</option>
//                 {stdOptions.map((std) => (
//                   <option key={std} value={std}>
//                     {std}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-gray-700 mb-2">
//                 Division
//               </label>
//               <select
//                 value={selectedDiv}
//                 onChange={(e) => setSelectedDiv(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//               >
//                 <option value="">Select</option>
//                 {divOptions.map((div) => (
//                   <option key={div} value={div}>
//                     {div}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-gray-700 mb-2">
//                 Date
//               </label>
//               <DatePicker
//                 selected={selectedDate}
//                 onChange={(date) => setSelectedDate(date)}
//                 dateFormat="dd/MM/yyyy"
//                 placeholderText="Select Date"
//                 className="border border-gray-300 rounded-lg px-4 py-2 w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//                 calendarClassName="rounded-lg shadow-lg"
//               />
//             </div>
//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-gray-700 mb-2">
//                 Class Teacher
//               </label>
//               <input
//                 type="text"
//                 value={classTeacher}
//                 onChange={(e) => setClassTeacher(e.target.value)}
//                 placeholder="Enter name"
//                 className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//               />
//             </div>
//           </div>
          
//           {/* Subject List */}
//           <div className="flex flex-col gap-4">
//             <div className="flex justify-end">
//               <button
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
//                 onClick={handleAddAssessment}
//               >
//                 Add Assessment
//               </button>
//             </div>
            
//             {subjectsData.map((item, index) => (
//               <div
//                 key={item._id}
//                 className="flex flex-col md:flex-row items-center justify-between p-4 border rounded-xl shadow-sm hover:bg-gray-50 transition"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center">
//                     <FaBookOpen className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-800">
//                       {item.subjectCovered}
//                     </h3>
//                     <p className="text-gray-500 text-sm">{item.topicCovered}</p>
//                   </div>
//                 </div>
//                 <div className="flex flex-col md:flex-row items-center gap-6 mt-4 md:mt-0">
//                   <p className="text-sm text-gray-600">
//                     Lecture by{" "}
//                     <span className="font-medium text-gray-800">
//                       {item.teacherName}
//                     </span>
//                   </p>
//                   <button
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
//                     onClick={() => handleViewAssessment(item)}
//                   >
//                     View Assessment
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default ClassAssessment;

// import React, { useEffect, useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import { FaBookOpen } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import axios from 'axios'

// // Define the base URL for your local backend API
// const LOCAL_API_BASE_URL = "http://localhost:5000/api";

// const ClassAssessment = () => {
//   const navigate = useNavigate();

//   const [selectedStd, setSelectedStd] = useState("");
//   const [selectedDiv, setSelectedDiv] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [classTeacher, setClassTeacher] = useState("");
//   const [subjectsData, setSubjectsData] = useState([]);

//   const stdOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
//   const divOptions = ["A", "B", "C"];

//   useEffect(() => {
//     const fetchAssessments = async () => {
//       try {
//         const response = await axios.get(
//           // CRITICAL FIX: Change from Vercel URL to local API URL
//           `${LOCAL_API_BASE_URL}/assessment`,
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         if (response.status == 200) setSubjectsData(response.data);
//       } catch (error) {
//         console.error("Error fetching class assessments from local server:", error);
//       }
//     };
//     fetchAssessments();
//   }, []); // Added dependency array to prevent infinite calls

//   // Function to handle viewing a specific assessment
//   const handleViewAssessment = (assessmentItem) => {
//     // Navigate with assessment data as state
//     navigate("/classes-assessment-view", { 
//       state: { 
//         assessmentData: assessmentItem,
//         mode: 'view', // to differentiate between add and view mode
//         // Pass current filter values as well
//         filters: {
//           standard: selectedStd,
//           division: selectedDiv,
//           date: selectedDate,
//           classTeacher: classTeacher
//         }
//       } 
//     });
//   };

//   const handleAddAssessment = () => {
//     // Pass current filter values when adding new assessment
//     navigate("/classes-assessment-view", {
//       state: {
//         mode: 'add',
//         filters: {
//           standard: selectedStd,
//           division: selectedDiv,
//           date: selectedDate,
//           classTeacher: classTeacher
//         }
//       }
//     });
//   };

//   return (
//     <MainLayout>
//       <div className="p-6">
//         <div className="bg-white rounded-2xl shadow p-6">
//           {/* Top Inputs */}
//           <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-gray-700 mb-2">
//                 Standard
//               </label>
//               <select
//                 value={selectedStd}
//                 onChange={(e) => setSelectedStd(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//               >
//                 <option value="">Select</option>
//                 {stdOptions.map((std) => (
//                   <option key={std} value={std}>
//                     {std}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-gray-700 mb-2">
//                 Division
//               </label>
//               <select
//                 value={selectedDiv}
//                 onChange={(e) => setSelectedDiv(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//               >
//                 <option value="">Select</option>
//                 {divOptions.map((div) => (
//                   <option key={div} value={div}>
//                     {div}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-gray-700 mb-2">
//                 Date
//               </label>
//               <DatePicker
//                 selected={selectedDate}
//                 onChange={(date) => setSelectedDate(date)}
//                 dateFormat="dd/MM/yyyy"
//                 placeholderText="Select Date"
//                 className="border border-gray-300 rounded-lg px-4 py-2 w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//                 calendarClassName="rounded-lg shadow-lg"
//               />
//               </div>
//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-gray-700 mb-2">
//                 Class Teacher
//               </label>
//               <input
//                 type="text"
//                 value={classTeacher}
//                 onChange={(e) => setClassTeacher(e.target.value)}
//                 placeholder="Enter name"
//                 className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//               />
//             </div>
//           </div>
//           
//           {/* Subject List */}
//           <div className="flex flex-col gap-4">
//             <div className="flex justify-end">
//               <button
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
//                 onClick={handleAddAssessment}
//               >
//                 Add Assessment
//               </button>
//             </div>
//             
//             {subjectsData.map((item, index) => (
//               <div
//                 key={item._id}
//                 className="flex flex-col md:flex-row items-center justify-between p-4 border rounded-xl shadow-sm hover:bg-gray-50 transition"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center">
//                     <FaBookOpen className="w-6 h-6" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-800">
//                       {item.subjectCovered}
//                     </h3>
//                     <p className="text-gray-500 text-sm">{item.topicCovered}</p>
//                   </div>
//                 </div>
//                 <div className="flex flex-col md:flex-row items-center gap-6 mt-4 md:mt-0">
//                   <p className="text-sm text-gray-600">
//                     Lecture by{" "}
//                     <span className="font-medium text-gray-800">
//                       {item.teacherName}
//                     </span>
//                   </p>
//                   <button
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
//                     onClick={() => handleViewAssessment(item)}
//                   >
//                     View Assessment
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default ClassAssessment;

import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { FaBookOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config"; 

// Define the base URL for your local backend API
// const LOCAL_API_BASE_URL = "http://localhost:5000/api"; // REMOVED

const ClassAssessment = () => {
  const navigate = useNavigate();

  const [selectedStd, setSelectedStd] = useState("");
  const [selectedDiv, setSelectedDiv] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [classTeacher, setClassTeacher] = useState("");
  const [subjectsData, setSubjectsData] = useState([]);

  const stdOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const divOptions = ["A", "B", "C"];

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axios.get(
          // FIX: Using imported API_BASE_URL
          `${API_BASE_URL}api/assessment`,
          {
            headers: {
              auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
            },
          }
        );
        if (response.status == 200) setSubjectsData(response.data);
      } catch (error) {
        console.error("Error fetching class assessments from server:", error);
      }
    };
    fetchAssessments();
  }, []); // Added dependency array to prevent infinite calls

  // Function to handle viewing a specific assessment
  const handleViewAssessment = (assessmentItem) => {
    // Navigate with assessment data as state
    navigate("/classes-assessment-view", { 
      state: { 
        assessmentData: assessmentItem,
        mode: 'view', // to differentiate between add and view mode
        // Pass current filter values as well
        filters: {
          standard: selectedStd,
          division: selectedDiv,
          date: selectedDate,
          classTeacher: classTeacher
        }
      } 
    });
  };

  const handleAddAssessment = () => {
    // Pass current filter values when adding new assessment
    navigate("/classes-assessment-view", {
      state: {
        mode: 'add',
        filters: {
          standard: selectedStd,
          division: selectedDiv,
          date: selectedDate,
          classTeacher: classTeacher
        }
      }
    });
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="bg-white rounded-2xl shadow p-6">
          {/* Top Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Standard
              </label>
              <select
                value={selectedStd}
                onChange={(e) => setSelectedStd(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              >
                <option value="">Select</option>
                {stdOptions.map((std) => (
                  <option key={std} value={std}>
                    {std}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Division
              </label>
              <select
                value={selectedDiv}
                onChange={(e) => setSelectedDiv(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              >
                <option value="">Select</option>
                {divOptions.map((div) => (
                  <option key={div} value={div}>
                    {div}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Date
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select Date"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                calendarClassName="rounded-lg shadow-lg"
              />
              </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Class Teacher
              </label>
              <input
                type="text"
                value={classTeacher}
                onChange={(e) => setClassTeacher(e.target.value)}
                placeholder="Enter name"
                className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>
          </div>
          
          {/* Subject List */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-end">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                onClick={handleAddAssessment}
              >
                Add Assessment
              </button>
            </div>
            
            {subjectsData.map((item, index) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center justify-between p-4 border rounded-xl shadow-sm hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    <FaBookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {item.subjectCovered}
                    </h3>
                    <p className="text-gray-500 text-sm">{item.topicCovered}</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-6 mt-4 md:mt-0">
                  <p className="text-sm text-gray-600">
                    Lecture by{" "}
                    <span className="font-medium text-gray-800">
                      {item.teacherName}
                    </span>
                  </p>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                    onClick={() => handleViewAssessment(item)}
                  >
                    View Assessment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ClassAssessment;