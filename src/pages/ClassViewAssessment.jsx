// // pages/class-view-assessment.jsx
// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// const ClassViewAssessment = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get assessment data from navigation state
//   const assessmentData = location.state?.assessmentData;
//   const mode = location.state?.mode || "add"; // 'add' or 'view'
//   const filters = location.state?.filters || {};

//   // Form state for classwork
//   const [classworkData, setClassworkData] = useState({
//     standard: "",
//     division: "",
//     date: "",
//     teacherName: "",
//     subjectCovered: "",
//     topicCovered: "",
//     keyPoints: "",
//     classActivity: "",
//   });

//   // Form state for homework
//   const [homeworkData, setHomeworkData] = useState({
//     homeworkDescription: "",
//     submissionDeadline: "",
//   });

//   // Loading states
//   const [isClassworkSaving, setIsClassworkSaving] = useState(false);
//   const [isHomeworkSaving, setIsHomeworkSaving] = useState(false);

//   // Options for dropdowns
//   const stdOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
//   const divOptions = ["A", "B", "C"];

//   useEffect(() => {
//     if (assessmentData && mode === "view") {
//       setClassworkData({
//         standard: assessmentData.standard || "",
//         division: assessmentData.division || "",
//         date: assessmentData.date || "",
//         teacherName: assessmentData.teacherName || "",
//         subjectCovered: assessmentData.subjectCovered || "",
//         topicCovered: assessmentData.topicCovered || "",
//         keyPoints: assessmentData.keyPoints || "",
//         classActivity: assessmentData.classActivity || "",
//       });
//       setHomeworkData({
//         homeworkDescription: assessmentData.homeworkDescription || "",
//         submissionDeadline: assessmentData.submissionDeadline || "",
//       });
//     } else if (mode === "add" && filters) {
//       setClassworkData((prev) => ({
//         ...prev,
//         standard: filters.standard || "",
//         division: filters.division || "",
//         date: filters.date ? filters.date.toISOString().split("T")[0] : "",
//         teacherName: filters.classTeacher || "",
//       }));
//     }
//   }, [assessmentData, mode, filters]);

//   const handleClassworkChange = (field, value) => {
//     setClassworkData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleHomeworkChange = (field, value) => {
//     setHomeworkData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   // New function to handle saving both
//   const handleSaveAssessment = async () => {
//     try {
//       setIsClassworkSaving(true); // reuse same loader state
//       // First save classwork
//       await axios.post(
//         "http://localhost:5000/api/add-assessment",
//         classworkData,
//         {
//           headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" },
//         }
//       );

//       // Then save homework
//       await axios.post("http://localhost:5000/api/add-homework", homeworkData, {
//         headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" },
//       });

//       navigate("/classes-assessment");
//     } catch (error) {
//       console.error("Error saving assessment:", error);
//       alert("Failed to save assessment. Please try again.");
//     } finally {
//       setIsClassworkSaving(false);
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="p-6">
//         <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-6">
//           {/* Header */}
//           <div className="flex justify-between items-center">
//             <h2 className="text-2xl font-bold text-gray-800">
//               {mode === "view" ? "View Assessment" : "Add Assessment"}
//             </h2>
//           </div>

//           {/* Classwork Section */}
//           <div className="flex flex-col items-center">
//             <button className="bg-blue-100 text-blue-700 px-6 py-2 rounded-full mb-4 font-semibold">
//               Classwork
//             </button>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
//               <div className="flex flex-col">
//                 <label className="text-sm font-semibold mb-2">Standard:</label>
//                 <select
//                   className="border border-gray-300 rounded-lg p-2"
//                   value={classworkData.standard}
//                   onChange={(e) =>
//                     handleClassworkChange("standard", e.target.value)
//                   }
//                   disabled={mode === "view"}
//                 >
//                   <option value="">Select Standard</option>
//                   {stdOptions.map((std) => (
//                     <option key={std} value={std}>
//                       {std}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="flex flex-col">
//                 <label className="text-sm font-semibold mb-2">Division:</label>
//                 <select
//                   className="border border-gray-300 rounded-lg p-2"
//                   value={classworkData.division}
//                   onChange={(e) =>
//                     handleClassworkChange("division", e.target.value)
//                   }
//                   disabled={mode === "view"}
//                 >
//                   <option value="">Select Division</option>
//                   {divOptions.map((div) => (
//                     <option key={div} value={div}>
//                       {div}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="flex flex-col">
//                 <label className="text-sm font-semibold mb-2">Date:</label>
//                 <input
//                   type="date"
//                   className="border border-gray-300 rounded-lg p-2"
//                   value={classworkData.date}
//                   onChange={(e) =>
//                     handleClassworkChange("date", e.target.value)
//                   }
//                   disabled={mode === "view"}
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label className="text-sm font-semibold mb-2">
//                   Class Teacher:
//                 </label>
//                 <input
//                   type="text"
//                   className="border border-gray-300 rounded-lg p-2"
//                   placeholder="Class Teacher Name"
//                   value={classworkData.teacherName}
//                   onChange={(e) =>
//                     handleClassworkChange("teacherName", e.target.value)
//                   }
//                   disabled={mode === "view"}
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-6">
//               <div className="flex flex-col">
//                 <label className="text-sm font-semibold mb-2">
//                   Subject Covered:
//                 </label>
//                 <input
//                   type="text"
//                   className="border border-gray-300 rounded-lg p-2"
//                   placeholder="Subject"
//                   value={classworkData.subjectCovered}
//                   onChange={(e) =>
//                     handleClassworkChange("subjectCovered", e.target.value)
//                   }
//                   disabled={mode === "view"}
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label className="text-sm font-semibold mb-2">
//                   Topics/Chapters Covered:
//                 </label>
//                 <input
//                   type="text"
//                   className="border border-gray-300 rounded-lg p-2"
//                   placeholder="Topics"
//                   value={classworkData.topicCovered}
//                   onChange={(e) =>
//                     handleClassworkChange("topicCovered", e.target.value)
//                   }
//                   disabled={mode === "view"}
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col w-full mt-6">
//               <label className="text-sm font-semibold mb-2">
//                 Key Points or Summary:
//               </label>
//               <textarea
//                 className="border border-gray-300 rounded-lg p-2 h-32"
//                 value={classworkData.keyPoints}
//                 onChange={(e) =>
//                   handleClassworkChange("keyPoints", e.target.value)
//                 }
//                 disabled={mode === "view"}
//                 placeholder="Enter key points or summary..."
//               />
//             </div>

//             <div className="flex flex-col w-full mt-6">
//               <label className="text-sm font-semibold mb-2">
//                 Class Activity:
//               </label>
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   className="border border-gray-300 rounded-lg p-2 flex-1"
//                   placeholder="Describe class activity"
//                   value={classworkData.classActivity}
//                   onChange={(e) =>
//                     handleClassworkChange("classActivity", e.target.value)
//                   }
//                   disabled={mode === "view"}
//                 />
//                 {/* {mode !== "view" && (
//                   <button className="bg-blue-600 text-white px-4 rounded-lg">
//                     Upload
//                   </button>
//                 )} */}
//               </div>
//             </div>
//           </div>

//           {/* Homework Section */}
//           <div className="flex flex-col items-center mt-8">
//             <button className="bg-blue-100 text-blue-700 px-6 py-2 rounded-full mb-4 font-semibold">
//               Home Work
//             </button>
//             <div className="flex flex-col w-full">
//               <label className="text-sm font-semibold mb-2">
//                 Homework Description:
//               </label>
//               <textarea
//                 className="border border-gray-300 rounded-lg p-2 h-32"
//                 value={homeworkData.homeworkDescription}
//                 onChange={(e) =>
//                   handleHomeworkChange("homeworkDescription", e.target.value)
//                 }
//                 disabled={mode === "view"}
//                 placeholder="Enter homework description..."
//               />
//             </div>

//             <div className="flex flex-col w-full mt-6">
//               <label className="text-sm font-semibold mb-2">
//                 Submission Deadline:
//               </label>
//               <div className="space-y-4 gap-2">
//                 <input
//                   type="date"
//                   className="border border-gray-300 rounded-lg p-2 flex-1"
//                   value={homeworkData.submissionDeadline}
//                   onChange={(e) =>
//                     handleHomeworkChange("submissionDeadline", e.target.value)
//                   }
//                   disabled={mode === "view"}
//                 />
//                 {mode !== "view" && (
//                   <div className="flex justify-end w-full mt-6">
//                     <button
//                       onClick={handleSaveAssessment}
//                       disabled={isClassworkSaving}
//                       className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium py-2 px-6 rounded-lg shadow"
//                     >
//                       {isClassworkSaving
//                         ? "Saving..."
//                         : mode === "add"
//                         ? "Add Assessment"
//                         : "Save Assessment"}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-between items-center mt-8">
//             <button
//               onClick={() => navigate("/classes-assessment")}
//               className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
//             >
//               Back
//             </button>

//             <div className="flex gap-4">
//               {mode === "view" && (
//                 <button
//                   onClick={() => {
//                     // Switch to edit mode
//                     navigate("/classes-assessment-view", {
//                       state: {
//                         assessmentData: assessmentData,
//                         mode: "edit",
//                         filters: filters,
//                       },
//                     });
//                   }}
//                   className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
//                 >
//                   Edit
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default ClassViewAssessment;



import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 
import { FaCalendarAlt, FaUpload, FaCheckCircle, FaTimesCircle, FaChevronLeft } from 'react-icons/fa'; 

// --- REAL MOCK DATA (Replaced with internal data for filtering logic) ---
const ALL_STUDENTS_DATA = [
    {
        "firstname": "Seth", "lastname": "Morris", 
        "admission": { "admissionstd": "10", "admissiondivision": "A" },
        "_id": "69061911852df401a37301da" 
    },
    {
        "firstname": "Test3", "lastname": "Student3", 
        "admission": { "admissionstd": "10", "admissiondivision": "A" },
        "_id": "6909f1064b7806bd11051a8b" 
    },
    {
        "firstname": "Aman", "lastname": "jhsdf", 
        "admission": { "admissionstd": "5", "admissiondivision": "" }, 
        "_id": "6909fc78d847ace792c5c1e0"
    },
    {
        "firstname": "Khushi", "lastname": "Agarwal", 
        "admission": { "admissionstd": "2", "admissiondivision": "F" },
        "_id": "690c995427870801804fdc4c"
    },
    {
        "firstname": "Sneha", "lastname": "Rajput", 
        "admission": { "admissionstd": "10", "admissiondivision": "" }, 
        "_id": "69145f1c1eebe6627d6819bd"
    },
    {
        "firstname": "Adhrit", "lastname": "Singh", 
        "admission": { "admissionstd": "10", "admissiondivision": "A" },
        "_id": "6921d182fcb537683e5633e1"
    }
];

const getStudentListForClass = (standard, division) => {
    // This logic simulates fetching the correct student list based on class context
    return ALL_STUDENTS_DATA
        .filter(student => 
            student.admission.admissionstd === standard && 
            student.admission.admissiondivision === division
        )
        .map((student, index) => ({
            id: student._id,
            name: `${student.firstname} ${student.lastname}`,
            uploaded: index % 2 === 0 
        }));
};


// --- New Submission Status Modal Component ---
const SubmissionStatusModal = ({ show, onClose, title, students }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50"
 style={{ 
                // Using RGBA to create the dimming effect without blurring the backdrop
                backgroundColor: 'rgba(50, 50, 50, 0.5)', 
            }}
>
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">{title} Status</h3>
                <div className="max-h-80 overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0">
                            <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Student Name
                                </th>
                                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {students.length === 0 ? (
                                <tr>
                                    <td colSpan="2" className="px-3 py-4 text-center text-sm text-gray-500">
                                        No students found for this class.
                                    </td>
                                </tr>
                            ) : (
                                students.map((student) => (
                                    <tr key={student.id}>
                                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {student.name}
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap text-center">
                                            {student.uploaded ? (
                                                <FaCheckCircle className="text-green-500 inline w-5 h-5" title="Uploaded" />
                                            ) : (
                                                <FaTimesCircle className="text-red-500 inline w-5 h-5" title="Not Uploaded" />
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---
const ClassViewAssessment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const assessmentData = location.state?.assessmentData;
  // Get standard and division from the filter data passed from the list page
  const classStandard = location.state?.filters?.standard || (assessmentData?.standard);
  const classDivision = location.state?.filters?.division || (assessmentData?.division);

  const initialMode = location.state?.mode || "add"; 

  const [mode, setMode] = useState(initialMode);
  const isViewMode = mode === "view"; 

  const [classworkData, setClassworkData] = useState({
    date: "",
    teacherName: "",
    subjectCovered: "",
    topicCovered: "",
    keyPoints: "",
    classActivity: "",
  });

  const [homeworkData, setHomeworkData] = useState({
    homeworkDescription: "",
    submissionDeadline: "",
  });

  const [isSaving, setIsSaving] = useState(false); 
    
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [studentList, setStudentList] = useState([]); // Real student data state

  const AUTH_HEADER = "ZjVGZPUtYW1hX2anZHJvaWRfMjAyMzY0MjU="; 

  useEffect(() => {
    const dataToLoad = assessmentData || {};
    
    const formatDate = (dateString) => {
      if (!dateString) return ''; 
      try {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0]; 
      } catch {
        return dateString;
      }
    };

    setClassworkData({
      date: formatDate(dataToLoad.date) || "", 
      teacherName: dataToLoad.teacherName || "", 
      subjectCovered: dataToLoad.subjectCovered || "", 
      topicCovered: dataToLoad.topicCovered || "", 
      keyPoints: dataToLoad.keyPoints || "", 
      classActivity: dataToLoad.classActivity || "", 
    });
    setHomeworkData({
      homeworkDescription: dataToLoad.homeworkDescription || "", 
      submissionDeadline: formatDate(dataToLoad.submissionDeadline) || "",
    });
  }, [assessmentData]); 

  
  const handleClassworkChange = (field, value) => {
    setClassworkData((prev) => ({ ...prev, [field]: value }));
  };

  const handleHomeworkChange = (field, value) => {
    setHomeworkData((prev) => ({ ...prev, [field]: value }));
  };
    
  const openStatusModal = (title) => {
    // 1. Filter students based on the class standard and division
    const students = getStudentListForClass(classStandard, classDivision);
    
    // 2. Set the data for the modal
    setStudentList(students);
    setModalTitle(title);
    setShowModal(true);
  };

  const handleSaveAssessment = async () => {
    if (!classworkData.date || !classworkData.teacherName || !classworkData.subjectCovered || !classworkData.topicCovered) {
      alert("Please fill in Date, Teacher, Subject, and Topic fields.");
      return;
    }
    // Save logic here...
  };

  // --- Universal Field Renderer (Adapted for sketch styling) ---
  const FieldRenderer = ({ label, field, type = "text", placeholder = "", isTextarea = false, isSelect = false, isHomework = false, options = [] }) => {
    const stateData = isHomework ? homeworkData : classworkData;
    const stateHandler = isHomework ? handleHomeworkChange : handleClassworkChange;

    const currentValue = stateData[field];
    const displayValue = (currentValue === 'N/A' || currentValue === 'Select') ? '' : currentValue;

    // --- Determine rendering element ---
    let inputElement;

    if (isTextarea) {
        // Textarea element
        inputElement = (
            <textarea
                className="border border-gray-400 rounded-md p-2 w-full h-32 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={displayValue}
                onChange={(e) => stateHandler(field, e.target.value)}
                placeholder={placeholder}
            />
        );
    } else if (isSelect) {
        // Select element (Now removed for topic/activity, but kept for subject covered)
        inputElement = (
            <div className="relative">
                <select
                    className="border border-gray-400 rounded-md p-2 w-full h-10 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none bg-white pr-8"
                    value={displayValue}
                    onChange={(e) => stateHandler(field, e.target.value)}
                >
                    <option value="">Select</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
        );
    } else if (type === "date") {
        // Date input element
        inputElement = (
            <div className="relative">
                <input
                    type="date"
                    className="border border-gray-400 rounded-md p-2 w-full h-10 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none pr-10"
                    value={displayValue}
                    onChange={(e) => stateHandler(field, e.target.value)}
                />
                <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
        );
    } else {
        // Default text input element
        inputElement = (
            <input
                type={type}
                className="border border-gray-400 rounded-md p-2 w-full h-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder={placeholder}
                value={displayValue}
                onChange={(e) => stateHandler(field, e.target.value)}
            />
        );
    }

    return (
      <div className="flex flex-col">
        <label className="text-gray-700 mb-1">{label}:</label>
        {inputElement}
      </div>
    );
  };
    
  // --- Removed Mock Options ---

  return (
    <MainLayout>
      <SubmissionStatusModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        title={modalTitle} 
        students={studentList}
      />
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-5xl mx-auto border-2 border-gray-300"> 
          
          {/* CLASSWORK SECTION */}
          <div className="flex justify-center my-6">
            <div className="bg-blue-100 text-blue-700 px-8 py-2 rounded-full border border-blue-400 font-semibold shadow-md text-lg">
              Classwork
            </div>
          </div>

          {/* Date & Teacher */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
            {/* Date Field */}
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Date:</label>
              <div className="relative">
                <input
                  type="date"
                  className="border border-gray-400 rounded-md p-2 w-full h-10 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none pr-10"
                  value={classworkData.date}
                  onChange={(e) => handleClassworkChange("date", e.target.value)}
                  placeholder="dd-mm-yyyy"
                />
                <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Teacher Field */}
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Teacher:</label>
              <div className="relative">
                <input
                  type="text"
                  className="border border-gray-400 rounded-md p-2 w-full h-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Mr. R. Sharma"
                  value={classworkData.teacherName}
                  onChange={(e) => handleClassworkChange("teacherName", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Subject Covered & Topics/Chapters Covered (Topics changed to input) */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
            <FieldRenderer 
              label="Subject Covered" field="subjectCovered" 
              isSelect={true} options={["Mathematics", "Science", "History", "English"]} // Kept options locally
            />
            {/* TOPICS/CHAPTERS COVERED - CHANGED TO TEXT INPUT */}
            <FieldRenderer 
              label="Topics/Chapters Covered" field="topicCovered" 
              type="text" // Changed from isSelect={true}
              placeholder="Enter topics/chapters"
            />
          </div>

          {/* Key Points or Summary (Full Width) */}
          <div className="flex flex-col w-full mb-8">
            <FieldRenderer 
              label="Key Points or Summary" field="keyPoints" 
              placeholder="" isTextarea={true} 
            />
          </div>

          {/* Class Activity with Upload Button (Activity changed to input) */}
          <div className="flex flex-col w-full mb-10">
            <label className="text-gray-700 mb-1">Class Activity:</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                {/* CLASS ACTIVITY - CHANGED TO TEXT INPUT */}
                <input
                    type="text"
                    className="border border-gray-400 rounded-md p-2 w-full h-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter activity description"
                    value={classworkData.classActivity}
                    onChange={(e) => handleClassworkChange("classActivity", e.target.value)}
                />
              </div>
              <button 
                onClick={(e) => { e.preventDefault(); openStatusModal("Class Activity"); }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-1 hover:bg-blue-700 transition"
              >
                <FaUpload className="w-4 h-4" /> Upload
              </button>
            </div>
            {/* Temporary display of class standard/division for debugging */}
            <small className="mt-2 text-gray-500">
              Current Class Context: Standard {classStandard || 'N/A'} - Division {classDivision || 'N/A'}
            </small>
          </div>
          
          {/* HOMEWORK SECTION */}
          <div className="flex justify-center my-6">
            <div className="bg-blue-100 text-blue-700 px-8 py-2 rounded-full border border-blue-400 font-semibold shadow-md text-lg">
              Home Work
            </div>
          </div>

          {/* Homework Description (Full Width) */}
          <div className="flex flex-col w-full mb-2"> {/* mb-2 for spacing below textarea */}
            <FieldRenderer 
              label="Homework Description" field="homeworkDescription" 
              placeholder="" isTextarea={true} isHomework={true}
            />
          </div>

            {/* HOMEWORK UPLOAD BUTTON - MOVED OUTSIDE */}
            <div className="flex justify-end w-full mb-8">
                <button 
                    onClick={(e) => { e.preventDefault(); openStatusModal("Homework"); }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-1 hover:bg-blue-700 transition"
                >
                    <FaUpload className="w-4 h-4" /> Upload
                </button>
            </div>
          
          {/* Submission Deadline */}
          <div className="flex flex-col w-full mb-10">
            <FieldRenderer 
              label="Submission Deadline" field="submissionDeadline" 
              type="date" isHomework={true}
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={() => navigate("/classes-assessment")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md shadow flex items-center gap-2"
            >
              <FaChevronLeft /> Back
            </button>

            <button
              onClick={handleSaveAssessment}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-6 rounded-md shadow flex items-center gap-2"
            >
              {isSaving ? "Saving..." : "Next"} 
            </button>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default ClassViewAssessment;