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


// pages/class-view-assessment.jsx
import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

const ClassViewAssessment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get assessment data from navigation state
  const assessmentData = location.state?.assessmentData;
  const mode = location.state?.mode || "add"; // 'add' or 'view'
  const filters = location.state?.filters || {};

  // Form state for classwork
  const [classworkData, setClassworkData] = useState({
    standard: "",
    division: "",
    date: "",
    teacherName: "",
    subjectCovered: "",
    topicCovered: "",
    keyPoints: "",
    classActivity: "",
  });

  // Form state for homework
  const [homeworkData, setHomeworkData] = useState({
    homeworkDescription: "",
    submissionDeadline: "",
  });

  // Loading states
  const [isClassworkSaving, setIsClassworkSaving] = useState(false);
  const [isHomeworkSaving, setIsHomeworkSaving] = useState(false);

  // Options for dropdowns
  const stdOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const divOptions = ["A", "B", "C"];
  const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU="; 

  useEffect(() => {
    if (assessmentData && mode === "view") {
      setClassworkData({
        standard: assessmentData.standard || "",
        division: assessmentData.division || "",
        date: assessmentData.date || "",
        teacherName: assessmentData.teacherName || "",
        subjectCovered: assessmentData.subjectCovered || "",
        topicCovered: assessmentData.topicCovered || "",
        keyPoints: assessmentData.keyPoints || "",
        classActivity: assessmentData.classActivity || "",
      });
      setHomeworkData({
        homeworkDescription: assessmentData.homeworkDescription || "",
        submissionDeadline: assessmentData.submissionDeadline || "",
      });
    } else if (mode === "add" && filters) {
      setClassworkData((prev) => ({
        ...prev,
        standard: filters.standard || "",
        division: filters.division || "",
        date: filters.date ? filters.date.toISOString().split("T")[0] : "",
        teacherName: filters.classTeacher || "",
      }));
    }
  }, [assessmentData, mode, filters]);

  const handleClassworkChange = (field, value) => {
    setClassworkData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleHomeworkChange = (field, value) => {
    setHomeworkData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // New function to handle saving both
  const handleSaveAssessment = async () => {
    try {
      setIsClassworkSaving(true); // reuse same loader state
      // First save classwork
      // FIX 1: Using imported API_BASE_URL
      await axios.post(
        `${API_BASE_URL}api/add-assessment`,
        classworkData,
        {
          headers: { auth: AUTH_HEADER },
        }
      );

      // Then save homework
      // FIX 2: Using imported API_BASE_URL
      await axios.post(`${API_BASE_URL}api/add-homework`, homeworkData, {
        headers: { auth: AUTH_HEADER },
      });

      navigate("/classes-assessment");
    } catch (error) {
      console.error("Error saving assessment:", error);
      alert("Failed to save assessment. Please try again.");
    } finally {
      setIsClassworkSaving(false);
    }
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {mode === "view" ? "View Assessment" : "Add Assessment"}
            </h2>
          </div>

          {/* Classwork Section */}
          <div className="flex flex-col items-center">
            <button className="bg-blue-100 text-blue-700 px-6 py-2 rounded-full mb-4 font-semibold">
              Classwork
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2">Standard:</label>
                <select
                  className="border border-gray-300 rounded-lg p-2"
                  value={classworkData.standard}
                  onChange={(e) =>
                    handleClassworkChange("standard", e.target.value)
                  }
                  disabled={mode === "view"}
                >
                  <option value="">Select Standard</option>
                  {stdOptions.map((std) => (
                    <option key={std} value={std}>
                      {std}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2">Division:</label>
                <select
                  className="border border-gray-300 rounded-lg p-2"
                  value={classworkData.division}
                  onChange={(e) =>
                    handleClassworkChange("division", e.target.value)
                  }
                  disabled={mode === "view"}
                >
                  <option value="">Select Division</option>
                  {divOptions.map((div) => (
                    <option key={div} value={div}>
                      {div}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2">Date:</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg p-2"
                  value={classworkData.date}
                  onChange={(e) =>
                    handleClassworkChange("date", e.target.value)
                  }
                  disabled={mode === "view"}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2">
                  Class Teacher:
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Class Teacher Name"
                  value={classworkData.teacherName}
                  onChange={(e) =>
                    handleClassworkChange("teacherName", e.target.value)
                  }
                  disabled={mode === "view"}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-6">
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2">
                  Subject Covered:
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Subject"
                  value={classworkData.subjectCovered}
                  onChange={(e) =>
                    handleClassworkChange("subjectCovered", e.target.value)
                  }
                  disabled={mode === "view"}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-semibold mb-2">
                  Topics/Chapters Covered:
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-2"
                  placeholder="Topics"
                  value={classworkData.topicCovered}
                  onChange={(e) =>
                    handleClassworkChange("topicCovered", e.target.value)
                  }
                  disabled={mode === "view"}
                />
              </div>
            </div>

            <div className="flex flex-col w-full mt-6">
              <label className="text-sm font-semibold mb-2">
                Key Points or Summary:
              </label>
              <textarea
                className="border border-gray-300 rounded-lg p-2 h-32"
                value={classworkData.keyPoints}
                onChange={(e) =>
                  handleClassworkChange("keyPoints", e.target.value)
                }
                disabled={mode === "view"}
                placeholder="Enter key points or summary..."
              />
            </div>

            <div className="flex flex-col w-full mt-6">
              <label className="text-sm font-semibold mb-2">
                Class Activity:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg p-2 flex-1"
                  placeholder="Describe class activity"
                  value={classworkData.classActivity}
                  onChange={(e) =>
                    handleClassworkChange("classActivity", e.target.value)
                  }
                  disabled={mode === "view"}
                />
                {/* {mode !== "view" && (
                  <button className="bg-blue-600 text-white px-4 rounded-lg">
                    Upload
                  </button>
                )} */}
              </div>
            </div>
          </div>

          {/* Homework Section */}
          <div className="flex flex-col items-center mt-8">
            <button className="bg-blue-100 text-blue-700 px-6 py-2 rounded-full mb-4 font-semibold">
              Home Work
            </button>
            <div className="flex flex-col w-full">
              <label className="text-sm font-semibold mb-2">
                Homework Description:
              </label>
              <textarea
                className="border border-gray-300 rounded-lg p-2 h-32"
                value={homeworkData.homeworkDescription}
                onChange={(e) =>
                  handleHomeworkChange("homeworkDescription", e.target.value)
                }
                disabled={mode === "view"}
                placeholder="Enter homework description..."
              />
            </div>

            <div className="flex flex-col w-full mt-6">
              <label className="text-sm font-semibold mb-2">
                Submission Deadline:
              </label>
              <div className="space-y-4 gap-2">
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg p-2 flex-1"
                  value={homeworkData.submissionDeadline}
                  onChange={(e) =>
                    handleHomeworkChange("submissionDeadline", e.target.value)
                  }
                  disabled={mode === "view"}
                />
                {mode !== "view" && (
                  <div className="flex justify-end w-full mt-6">
                    <button
                      onClick={handleSaveAssessment}
                      disabled={isClassworkSaving}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium py-2 px-6 rounded-lg shadow"
                    >
                      {isClassworkSaving
                        ? "Saving..."
                        : mode === "add"
                        ? "Add Assessment"
                        : "Save Assessment"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => navigate("/classes-assessment")}
              className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
            >
              Back
            </button>

            <div className="flex gap-4">
              {mode === "view" && (
                <button
                  onClick={() => {
                    // Switch to edit mode
                    navigate("/classes-assessment-view", {
                      state: {
                        assessmentData: assessmentData,
                        mode: "edit",
                        filters: filters,
                      },
                    });
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ClassViewAssessment;