// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const CreateTimetable = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     standard: "",
//     startdate: "",
//     starttime: "",
//     endtime: "",
//     examtype: "",
//     examgap: "",
//     subjects: [],
//   });
//   const [errors, setErrors] = useState({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedEntry, setSelectedEntry] = useState(null);

//   const standards = [
//     "Grade 1",
//     "Grade 2",
//     "Grade 3",
//     "Grade 4",
//     "Grade 5",
//     "Grade 6",
//     "Grade 7",
//     "Grade 8",
//     "Grade 9",
//     "Grade 10",
//   ];

//   const examTypes = ["mid-term", "finals", "unit test", "quarterly"];
//   const examGaps = ["None", "1 Day", "2 Days", "3 Days"];

//   const subjectsByGrade = {
//     "Grade 1": [
//       "English",
//       "Mathematics",
//       "Science",
//       "Social Studies",
//       "Art",
//       "Physical Education",
//     ],
//     "Grade 2": [
//       "English",
//       "Mathematics",
//       "Science",
//       "Social Studies",
//       "Art",
//       "Physical Education",
//       "Computer Basics",
//     ],
//     "Grade 3": [
//       "English",
//       "Mathematics",
//       "Science",
//       "Social Studies",
//       "Art",
//       "Physical Education",
//       "Computer Basics",
//     ],
//     "Grade 4": [
//       "English",
//       "Mathematics",
//       "Science",
//       "Social Studies",
//       "Art",
//       "Physical Education",
//       "Computer Science",
//       "Environmental Studies",
//     ],
//     "Grade 5": [
//       "English",
//       "Mathematics",
//       "Science",
//       "Social Studies",
//       "Art",
//       "Physical Education",
//       "Computer Science",
//       "Environmental Studies",
//     ],
//     "Grade 6": [
//       "English",
//       "Mathematics",
//       "Science",
//       "Social Studies",
//       "Hindi",
//       "Computer Science",
//       "Physical Education",
//       "Art",
//     ],
//     "Grade 7": [
//       "English",
//       "Mathematics",
//       "Science",
//       "Social Studies",
//       "Hindi",
//       "Computer Science",
//       "Physical Education",
//       "Art",
//     ],
//     "Grade 8": [
//       "English",
//       "Mathematics",
//       "Science",
//       "Social Studies",
//       "Hindi",
//       "Computer Science",
//       "Physical Education",
//       "Art",
//     ],
//     "Grade 9": [
//       "English",
//       "Mathematics",
//       "Science",
//       "Social Studies",
//       "Hindi",
//       "Computer Science",
//       "Physical Education",
//       "Economics",
//     ],
//     "Grade 10": [
//       "English",
//       "Mathematics",
//       "Science",
//       "Social Studies",
//       "Hindi",
//       "Computer Science",
//       "Physical Education",
//       "Economics",
//       "Business Studies",
//     ],
//   };

//   const getAvailableSubjects = () => {
//     return subjectsByGrade[formData.standard] || [];
//   };

//   useEffect(() => {
//     if (formData.standard) {
//       setFormData((prev) => ({ ...prev, subjects: [] }));
//       setErrors((prev) => ({ ...prev, subjects: "" }));
//     }
//   }, [formData.standard]);

//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split("T")[0];
//   };

//   const generateTimetablePreview = () => {
//     if (!formData.startdate || !formData.subjects.length) {
//       return [];
//     }

//     const timetable = [];
//     let currentDate = new Date(formData.startdate);
//     const gapDays = parseInt(formData.examgap.split(" ")[0]) || 0;

//     formData.subjects.forEach((subject) => {
//       timetable.push({
//         date: currentDate.toISOString().split("T")[0],
//         subject,
//         starttime: formData.starttime,
//         endtime: formData.endtime,
//       });
//       currentDate.setDate(currentDate.getDate() + 1 + gapDays);
//     });

//     return timetable;
//   };

//   const validateDatesAndTimes = (startDate, startTime, endTime, subjects) => {
//     const today = getTodayDate();
//     const newErrors = {};

//     if (startDate && startDate < today) {
//       newErrors.startdate = "Start date must be today or a future date";
//     }

//     if (startTime && endTime) {
//       const startTimeMinutes = convertTimeToMinutes(startTime);
//       const endTimeMinutes = convertTimeToMinutes(endTime);
//       if (endTimeMinutes <= startTimeMinutes) {
//         newErrors.endtime = "End time must be later than start time";
//       }
//     }

//     if (subjects.length === 0) {
//       newErrors.subjects = "At least one subject must be selected";
//     }

//     return newErrors;
//   };

//   const convertTimeToMinutes = (time) => {
//     const [hours, minutes] = time.split(":").map(Number);
//     return hours * 60 + minutes;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }

//     if (["startdate", "starttime", "endtime"].includes(name)) {
//       const updatedFormData = { ...formData, [name]: value };
//       const validationErrors = validateDatesAndTimes(
//         updatedFormData.startdate,
//         updatedFormData.starttime,
//         updatedFormData.endtime,
//         updatedFormData.subjects
//       );
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         ...validationErrors,
//       }));
//     }
//   };

//   const handleSubjectChange = (subject, isChecked) => {
//     let updatedSubjects;
//     if (isChecked) {
//       updatedSubjects = [...formData.subjects, subject];
//     } else {
//       updatedSubjects = formData.subjects.filter((s) => s !== subject);
//     }

//     setFormData({ ...formData, subjects: updatedSubjects });

//     const validationErrors = validateDatesAndTimes(
//       formData.startdate,
//       formData.starttime,
//       formData.endtime,
//       updatedSubjects
//     );
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       ...validationErrors,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const validationErrors = validateDatesAndTimes(
//       formData.startdate,
//       formData.starttime,
//       formData.endtime,
//       formData.subjects
//     );

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     const timetableData = {
//       standard: formData.standard,
//       startdate: formData.startdate,
//       examtype: formData.examtype,
//       timetable: generateTimetablePreview().map((entry) => ({
//         date: entry.date,
//         subject: entry.subject,
//         starttime: entry.starttime,
//         endtime: entry.endtime,
//       })),
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/add-etimetable",
//         timetableData,
//         {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         }
//       );
//       if (response.status === 200) {
//         console.log("added etimetable successfully");
//         setTimeout(() => {
//           navigate("/exams");
//         }, 3000);
//       }
//     } catch (error) {
//       console.error(error);
//       if (error.response && error.response.data) {
//         setErrors({
//           submit: error.response.data.message || "Failed to create timetable",
//         });
//       } else {
//         setErrors({ submit: "An unexpected error occurred" });
//       }
//     }
//   };

//   const calculateMinEndDate = () => {
//     if (!formData.startdate || !formData.subjects.length) {
//       return formData.startdate || getTodayDate();
//     }

//     const startDate = new Date(formData.startdate);
//     const gapDays = parseInt(formData.examgap.split(" ")[0]) || 0;
//     const examDays = formData.subjects.length;
//     const totalGapDays = (formData.subjects.length - 1) * gapDays;

//     const endDate = new Date(startDate);
//     endDate.setDate(startDate.getDate() + examDays - 1 + totalGapDays);

//     return endDate.toISOString().split("T")[0];
//   };

//   const handleViewClick = (entry) => {
//     setSelectedEntry(entry);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedEntry(null);
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto mt-6">
//         <h3 className="text-center text-xl font-bold text-gray-700 mb-8">
//           Create Timetable
//         </h3>
//         {errors.submit && (
//           <p className="text-red-500 text-sm mb-4 text-center">{errors.submit}</p>
//         )}
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium mb-1">Standard</label>
//               <select
//                 name="standard"
//                 value={formData.standard}
//                 onChange={handleChange}
//                 className="w-full border rounded px-3 py-2"
//                 required
//               >
//                 <option value="">Select</option>
//                 {standards.map((std, i) => (
//                   <option key={i} value={std}>
//                     {std}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Exam Type
//               </label>
//               <select
//                 name="examtype"
//                 value={formData.examtype}
//                 onChange={handleChange}
//                 className="w-full border rounded px-3 py-2"
//                 required
//               >
//                 <option value="">Select</option>
//                 {examTypes.map((type, i) => (
//                   <option key={i} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Start Date
//               </label>
//               <input
//                 type="date"
//                 name="startdate"
//                 value={formData.startdate}
//                 onChange={handleChange}
//                 min={getTodayDate()}
//                 className={`w-full border rounded px-3 py-2 ${
//                   errors.startdate ? "border-red-500" : ""
//                 }`}
//                 required
//               />
//               {errors.startdate && (
//                 <p className="text-red-500 text-sm mt-1">{errors.startdate}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Start Time
//               </label>
//               <input
//                 type="time"
//                 name="starttime"
//                 value={formData.starttime}
//                 onChange={handleChange}
//                 className={`w-full border rounded px-3 py-2 ${
//                   errors.starttime ? "border-red-500" : ""
//                 }`}
//                 required
//               />
//               {errors.starttime && (
//                 <p className="text-red-500 text-sm mt-1">{errors.starttime}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">End Time</label>
//               <input
//                 type="time"
//                 name="endtime"
//                 value={formData.endtime}
//                 onChange={handleChange}
//                 className={`w-full border rounded px-3 py-2 ${
//                   errors.endtime ? "border-red-500" : ""
//                 }`}
//                 required
//               />
//               {errors.endtime && (
//                 <p className="text-red-500 text-sm mt-1">{errors.endtime}</p>
//               )}
//             </div>

//             <div className="sm:col-span-2">
//               <label className="block text-sm font-medium mb-1">
//                 Exam Gaps
//               </label>
//               <select
//                 name="examgap"
//                 value={formData.examgap}
//                 onChange={handleChange}
//                 className="w-full border rounded px-3 py-2"
//               >
//                 <option value="">Select</option>
//                 {examGaps.map((gap, i) => (
//                   <option key={i} value={gap}>
//                     {gap}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {formData.standard && (
//             <div className="mt-6">
//               <label className="block text-sm font-medium mb-3">
//                 Select Subjects for {formData.standard}
//               </label>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//                 {getAvailableSubjects().map((subject, index) => (
//                   <div key={index} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       id={`subject-${index}`}
//                       checked={formData.subjects.includes(subject)}
//                       onChange={(e) =>
//                         handleSubjectChange(subject, e.target.checked)
//                       }
//                       className="mr-2"
//                     />
//                     <label htmlFor={`subject-${index}`} className="text-sm">
//                       {subject}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//               {errors.subjects && (
//                 <p className="text-red-500 text-sm mt-2">{errors.subjects}</p>
//               )}
//               {formData.subjects.length > 0 && (
//                 <p className="text-blue-600 text-sm mt-2">
//                   Selected: {formData.subjects.length} subject(s)
//                 </p>
//               )}
//             </div>
//           )}

//           <div className="mt-8">
//             <h4 className="text-lg font-semibold text-gray-700 mb-4">
//               Timetable Preview
//             </h4>
//             {generateTimetablePreview().length > 0 ? (
//               <div className="border rounded-lg p-4">
//                 <table className="w-full text-left">
//                   <thead>
//                     <tr className="bg-gray-100">
//                       <th className="p-2">Date</th>
//                       <th className="p-2">Subject</th>
//                       <th className="p-2">Time</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {generateTimetablePreview().map((entry, index) => (
//                       <tr key={index} className="border-t">
//                         <td className="p-2">{entry.date}</td>
//                         <td className="p-2">{entry.subject}</td>
//                         <td className="p-2">
//                           {entry.starttime} - {entry.endtime}
//                         </td>                        
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <p className="text-gray-500">
//                 Fill in the details and select subjects to see the timetable
//                 preview.
//               </p>
//             )}
//           </div>

//           {isModalOpen && selectedEntry && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//               <div className="bg-white rounded-lg p-6 max-w-md w-full">
//                 <h4 className="text-lg font-semibold text-gray-700 mb-4">
//                   Timetable Entry Details
//                 </h4>
//                 <table className="w-full text-left border">
//                   <tbody>
//                     <tr className="border-b">
//                       <td className="p-2 font-medium">Date</td>
//                       <td className="p-2">{selectedEntry.date}</td>
//                     </tr>
//                     <tr className="border-b">
//                       <td className="p-2 font-medium">Subject</td>
//                       <td className="p-2">{selectedEntry.subject}</td>
//                     </tr>
//                     <tr className="border-b">
//                       <td className="p-2 font-medium">Start Time</td>
//                       <td className="p-2">{selectedEntry.starttime}</td>
//                     </tr>
//                     <tr>
//                       <td className="p-2 font-medium">End Time</td>
//                       <td className="p-2">{selectedEntry.endtime}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <div className="mt-4 flex justify-end">
//                   <button
//                     type="button"
//                     onClick={closeModal}
//                     className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-4 rounded"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="flex justify-between items-center mt-8">
//             <button
//               type="button"
//               onClick={() => navigate("/exams")}
//               className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
//             >
//               Back
//             </button>

//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
//             >
//               Confirm
//             </button>
//           </div>
//         </form>
//       </div>
//     </MainLayout>
//   );
// };

// export default CreateTimetable;


// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// const CreateTimetable = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     standard: "",
//     startdate: "",
//     starttime: "",
//     endtime: "",
//     examtype: "",
//     examgap: "",
//     subjects: [],
//   });
//   const [errors, setErrors] = useState({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedEntry, setSelectedEntry] = useState(null);
//   // NEW STATE: To hold fetched subjects
//   const [availableSubjects, setAvailableSubjects] = useState([]);

//   // NEW STATE: For drag and drop functionality
//   const [draggedSubject, setDraggedSubject] = useState(null);
//   const [draggedIndex, setDraggedIndex] = useState(null);


//   const standards = [
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//     "10",
//   ];

//   const examTypes = ["mid-term", "finals", "unit test", "quarterly"];
//   const examGaps = ["None", "1 Day", "2 Days", "3 Days"];
//   const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";


//   // MODIFIED: Function to get subjects from state
//   const getAvailableSubjects = () => {
//     return availableSubjects;
//   };

//   // NEW HOOK: Fetch subjects when standard changes
//   useEffect(() => {
//     const fetchSubjects = async () => {
//       const std = formData.standard;
//       setFormData((prev) => ({ ...prev, subjects: [] }));
//       setAvailableSubjects([]);
//       setErrors((prev) => ({ ...prev, subjects: "", fetchSubjects: "" }));

//       if (!std) return;

//       try {
//         // Fetch subjects from the API endpoint
//         const response = await axios.get(
//           `${API_BASE_URL}api/subjects/${std}`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               auth: AUTH_HEADER,
//             },
//           }
//         );

//         // Assuming the response structure is { subjects: [{ subjectname: [string, string, ...], standard: "X" }] }
//         const subjectList = response.data.subjects[0]?.subjectname || [];
//         setAvailableSubjects(subjectList);
//         
//         if (subjectList.length === 0) {
//           setErrors((prev) => ({ ...prev, fetchSubjects: `No subjects defined for Standard ${std}.` }));
//         } else {
//           setErrors((prev) => ({ ...prev, fetchSubjects: "" }));
//         }

//       } catch (error) {
//         console.error("Error fetching subjects:", error);
//         setErrors((prev) => ({
//           ...prev,
//           fetchSubjects: "Failed to load subjects. Check server logs.",
//         }));
//       }
//     };

//     fetchSubjects();
//   }, [formData.standard]);

//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split("T")[0];
//   };
  
//   // NEW UTILITY: Format date to get short day name
//   const formatDay = (dateString) => {
//     return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' });
//   };


//   const generateTimetablePreview = () => {
//     if (!formData.startdate || !formData.subjects.length) {
//       return [];
//     }

//     const timetable = [];
//     // IMPORTANT: Ensure the date string is interpreted as UTC to avoid timezone issues when setting date in local context
//     let currentDate = new Date(formData.startdate + 'T00:00:00'); 
//     const gapDays = parseInt(formData.examgap.split(" ")[0]) || 0;

//     formData.subjects.forEach((subject) => {
//       const dateString = currentDate.toISOString().split("T")[0];
//       timetable.push({
//         date: dateString,
//         day: formatDay(dateString), // NEW: Add day of the week
//         subject,
//         starttime: formData.starttime,
//         endtime: formData.endtime,
//       });
      
//       // Advance date by 1 day + gapDays
//       currentDate.setDate(currentDate.getDate() + 1 + gapDays);
//     });

//     return timetable;
//   };

//   const validateDatesAndTimes = (startDate, startTime, endTime, subjects) => {
//     const today = getTodayDate();
//     const newErrors = {};

//     if (startDate && startDate < today) {
//       newErrors.startdate = "Start date must be today or a future date";
//     }

//     if (startTime && endTime) {
//       const startTimeMinutes = convertTimeToMinutes(startTime);
//       const endTimeMinutes = convertTimeToMinutes(endTime);
//       if (endTimeMinutes <= startTimeMinutes) {
//         newErrors.endtime = "End time must be later than start time";
//       }
//     }

//     if (subjects.length === 0) {
//       newErrors.subjects = "At least one subject must be selected";
//     }

//     return newErrors;
//   };

//   const convertTimeToMinutes = (time) => {
//     const [hours, minutes] = time.split(":").map(Number);
//     return hours * 60 + minutes;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (errors[name]) {
//       setErrors({ ...errors, [name]: "" });
//     }

//     if (["startdate", "starttime", "endtime"].includes(name)) {
//       const updatedFormData = { ...formData, [name]: value };
//       const validationErrors = validateDatesAndTimes(
//         updatedFormData.startdate,
//         updatedFormData.starttime,
//         updatedFormData.endtime,
//         updatedFormData.subjects
//       );
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         ...validationErrors,
//       }));
//     }
//   };

//   const handleSubjectChange = (subject, isChecked) => {
//     let updatedSubjects;
//     if (isChecked) {
//       updatedSubjects = [...formData.subjects, subject];
//     } else {
//       updatedSubjects = formData.subjects.filter((s) => s !== subject);
//     }

//     setFormData({ ...formData, subjects: updatedSubjects });

//     const validationErrors = validateDatesAndTimes(
//       formData.startdate,
//       formData.starttime,
//       formData.endtime,
//       updatedSubjects
//     );
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       ...validationErrors,
//     }));
//   };
  
//   // NEW FUNCTION: Handle Select All checkbox
//   const handleSelectAll = (isChecked) => {
//     let updatedSubjects = [];
//     if (isChecked) {
//       // If checked, include all available subjects
//       updatedSubjects = getAvailableSubjects();
//     } else {
//       // If unchecked, set subjects list to empty
//       updatedSubjects = [];
//     }
    
//     setFormData({ ...formData, subjects: updatedSubjects });
    
//     // Re-validate to check if subjects list is now empty or full
//     const validationErrors = validateDatesAndTimes(
//       formData.startdate,
//       formData.starttime,
//       formData.endtime,
//       updatedSubjects
//     );
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       ...validationErrors,
//     }));
//   };

//   // NEW FUNCTIONS for Drag and Drop Reordering
//   const handleDragStart = (e, index) => {
//     setDraggedSubject(formData.subjects[index]);
//     setDraggedIndex(index);
//     e.dataTransfer.effectAllowed = "move";
//     e.dataTransfer.setData("text/plain", index);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault(); 
//     e.dataTransfer.dropEffect = "move";
//   };

//   const handleDrop = (e, targetIndex) => {
//     e.preventDefault();
//     if (draggedIndex === null || draggedIndex === targetIndex) return;

//     const newSubjects = [...formData.subjects];
//     // Remove the dragged item
//     const [removed] = newSubjects.splice(draggedIndex, 1);
//     // Insert it into the target position
//     newSubjects.splice(targetIndex, 0, removed);

//     setFormData((prev) => ({ ...prev, subjects: newSubjects }));
//     setDraggedIndex(null); // Reset drag state
//   };
//   // END Drag and Drop Functions


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const validationErrors = validateDatesAndTimes(
//       formData.startdate,
//       formData.starttime,
//       formData.endtime,
//       formData.subjects
//     );

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     const timetableData = {
//       standard: formData.standard,
//       startdate: formData.startdate,
//       examtype: formData.examtype,
//       timetable: generateTimetablePreview().map((entry) => ({
//         date: entry.date,
//         subject: entry.subject,
//         starttime: entry.starttime,
//         endtime: entry.endtime,
//       })),
//     };

//     try {
//       // FIX 2: Using imported API_BASE_URL
//       const response = await axios.post(
//         `${API_BASE_URL}api/add-etimetable`,
//         timetableData,
//         {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         }
//       );
//       if (response.status === 200) {
//         console.log("added etimetable successfully");
//         // Clear existing submit errors on success
//         setErrors((prev) => ({ ...prev, submit: "" }));
//         setTimeout(() => {
//           navigate("/exams");
//         }, 3000);
//       }
//     } catch (error) {
//       console.error(error);
//       if (error.response && error.response.data) {
//         setErrors({
//           submit: error.response.data.message || "Failed to create timetable",
//         });
//       } else {
//         setErrors({ submit: "An unexpected error occurred" });
//       }
//     }
//   };

//   const calculateMinEndDate = () => {
//     if (!formData.startdate || !formData.subjects.length) {
//       return formData.startdate || getTodayDate();
//     }

//     const startDate = new Date(formData.startdate);
//     const gapDays = parseInt(formData.examgap.split(" ")[0]) || 0;
//     const examDays = formData.subjects.length;
//     const totalGapDays = (formData.subjects.length - 1) * gapDays;

//     const endDate = new Date(startDate);
//     endDate.setDate(startDate.getDate() + examDays - 1 + totalGapDays);

//     return endDate.toISOString().split("T")[0];
//   };

//   const handleViewClick = (entry) => {
//     setSelectedEntry(entry);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedEntry(null);
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto mt-6">
//         <h3 className="text-center text-xl font-bold text-gray-700 mb-8">
//           Create Timetable
//         </h3>
//         {errors.submit && (
//           <p className="text-red-500 text-sm mb-4 text-center">**{errors.submit}**</p>
//         )}
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium mb-1">Standard</label>
//               <select
//                 name="standard"
//                 value={formData.standard}
//                 onChange={handleChange}
//                 className="w-full border rounded px-3 py-2"
//                 required
//               >
//                 <option value="">Select</option>
//                 {standards.map((std, i) => (
//                   <option key={i} value={std}>
//                     {std} 
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Exam Type
//               </label>
//               <select
//                 name="examtype"
//                 value={formData.examtype}
//                 onChange={handleChange}
//                 className="w-full border rounded px-3 py-2"
//                 required
//               >
//                 <option value="">Select</option>
//                 {examTypes.map((type, i) => (
//                   <option key={i} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Start Date
//               </label>
//               <input
//                 type="date"
//                 name="startdate"
//                 value={formData.startdate}
//                 onChange={handleChange}
//                 min={getTodayDate()}
//                 className={`w-full border rounded px-3 py-2 ${
//                   errors.startdate ? "border-red-500" : ""
//                 }`}
//                 required
//               />
//               {errors.startdate && (
//                 <p className="text-red-500 text-sm mt-1">{errors.startdate}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Start Time
//               </label>
//               <input
//                 type="time"
//                 name="starttime"
//                 value={formData.starttime}
//                 onChange={handleChange}
//                 className={`w-full border rounded px-3 py-2 ${
//                   errors.starttime ? "border-red-500" : ""
//                 }`}
//                 required
//               />
//               {errors.starttime && (
//                 <p className="text-red-500 text-sm mt-1">{errors.starttime}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">End Time</label>
//               <input
//                 type="time"
//                 name="endtime"
//                 value={formData.endtime}
//                 onChange={handleChange}
//                 className={`w-full border rounded px-3 py-2 ${
//                   errors.endtime ? "border-red-500" : ""
//                 }`}
//                 required
//               />
//               {errors.endtime && (
//                 <p className="text-red-500 text-sm mt-1">{errors.endtime}</p>
//               )}
//             </div>

//             <div className="sm:col-span-2">
//               <label className="block text-sm font-medium mb-1">
//                 Exam Gaps
//               </label>
//               <select
//                 name="examgap"
//                 value={formData.examgap}
//                 onChange={handleChange}
//                 className="w-full border rounded px-3 py-2"
//               >
//                 <option value="">Select</option>
//                 {examGaps.map((gap, i) => (
//                   <option key={i} value={gap}>
//                     {gap}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             </div>

//           {formData.standard && (
//             <div className="mt-6">
//               <label className="block text-sm font-medium mb-3">
//                 Select Subjects for Standard {formData.standard}
//               </label>
//               {/* Display Fetch Error/Message */}
//               {errors.fetchSubjects && (
//                 <p className="text-red-500 text-sm mb-2">{errors.fetchSubjects}</p>
//               )}
//               {getAvailableSubjects().length > 0 ? (
//                 <>
//                 {/* NEW CHANGE: Select All Checkbox */}
//                 <div className="mb-4">
//                   <input
//                     type="checkbox"
//                     id="selectAllSubjects"
//                     checked={formData.subjects.length === getAvailableSubjects().length && getAvailableSubjects().length > 0}
//                     onChange={(e) => handleSelectAll(e.target.checked)}
//                     className="mr-2"
//                   />
//                   <label htmlFor="selectAllSubjects" className="font-bold text-sm text-blue-600">
//                     Select All
//                   </label>
//                 </div>
                
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//                 {getAvailableSubjects().map((subject, index) => (
//                   <div key={index} className="flex items-center">
//                     <input
//                       type="checkbox"
//                       id={`subject-${index}`}
//                       checked={formData.subjects.includes(subject)}
//                       onChange={(e) =>
//                         handleSubjectChange(subject, e.target.checked)
//                       }
//                       className="mr-2"
//                     />
//                     <label htmlFor={`subject-${index}`} className="text-sm">
//                       {subject}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//               </>
//               ) : (
//                 // Only show this message if fetching was successful but the list is empty
//                 !errors.fetchSubjects && <p className="text-gray-500 text-sm">No subjects available for this standard.</p>
//               )}
//               {errors.subjects && (
//                 <p className="text-red-500 text-sm mt-2">{errors.subjects}</p>
//               )}
//               {formData.subjects.length > 0 && (
//                 <p className="text-blue-600 text-sm mt-2">
//                   Selected: {formData.subjects.length} subject(s)
//                 </p>
//               )}
//             </div>
//           )}

//           <div className="mt-8">
//             <h4 className="text-lg font-semibold text-gray-700 mb-4">
//               Timetable Preview
// {/*               {formData.subjects.length > 0 && <span className="text-xs text-gray-500 ml-2">(Drag rows to reorder)</span>} */}
//             </h4>
//             {generateTimetablePreview().length > 0 ? (
//               <div className="border rounded-lg p-4 overflow-x-auto">
//                 <table className="min-w-full text-left">
//                   <thead>
//                     <tr className="bg-gray-100">
//                       {/* NEW CHANGE: Added Day column */}
//                       <th className="p-2 w-[10%]">Day</th>
//                       <th className="p-2 w-[20%]">Date</th>
//                       <th className="p-2 w-1/2">Subject</th>
//                       <th className="p-2 w-1/4">Time</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {generateTimetablePreview().map((entry, index) => (
//                       <tr 
//                         key={entry.subject} 
//                         className={`border-t cursor-move ${draggedIndex === index ? 'opacity-50 bg-yellow-100' : ''}`}
//                         draggable
//                         onDragStart={(e) => handleDragStart(e, index)}
//                         onDragOver={handleDragOver}
//                         onDrop={(e) => handleDrop(e, index)}
//                         onDragEnd={() => setDraggedIndex(null)}
//                       >
//                         {/* NEW CHANGE: Display Day */}
//                         <td className="p-2 font-medium">{entry.day}</td>
//                         <td className="p-2">{entry.date}</td>
//                         <td className="p-2 font-medium">{entry.subject}</td>
//                         <td className="p-2">
//                           {entry.starttime} - {entry.endtime}
//                         </td>                        
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <p className="text-gray-500">
//                 Fill in the details and select subjects to see the timetable
//                 preview.
//               </p>
//             )}
//           </div>

//           {isModalOpen && selectedEntry && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//               <div className="bg-white rounded-lg p-6 max-w-md w-full">
//                 <h4 className="text-lg font-semibold text-gray-700 mb-4">
//                   Timetable Entry Details
//                 </h4>
//                 <table className="w-full text-left border">
//                   <tbody>
//                     <tr className="border-b">
//                       <td className="p-2 font-medium">Date</td>
//                       <td className="p-2">{selectedEntry.date}</td>
//                     </tr>
//                     <tr className="border-b">
//                       <td className="p-2 font-medium">Subject</td>
//                       <td className="p-2">{selectedEntry.subject}</td>
//                     </tr>
//                     <tr className="border-b">
//                       <td className="p-2 font-medium">Start Time</td>
//                       <td className="p-2">{selectedEntry.starttime}</td>
//                     </tr>
//                     <tr>
//                       <td className="p-2 font-medium">End Time</td>
//                       <td className="p-2">{selectedEntry.endtime}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <div className="mt-4 flex justify-end">
//                   <button
//                     type="button"
//                     onClick={closeModal}
//                     className="bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-4 rounded"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="flex justify-between items-center mt-8">
//             <button
//               type="button"
//               onClick={() => navigate("/exams")}
//               className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
//             >
//               Back
//             </button>

//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
//             >
//               Confirm
//             </button>
//           </div>
//         </form>
//         </div>
//     </MainLayout>
//   );
// };

// export default CreateTimetable;



























import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

const CreateTimetable = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    standard: "",
    startdate: "",
    starttime: "",
    endtime: "",
    examtype: "",
    examgap: "",
    subjects: [],
  });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  // NEW STATE: To hold fetched subjects
  const [availableSubjects, setAvailableSubjects] = useState([]);

  // NEW STATE: For drag and drop functionality
  const [draggedSubject, setDraggedSubject] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);


  const standards = [
    "Nursery",
    "Junior",
    "Senior",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];

  const examTypes = ["mid-term", "finals", "unit test", "quarterly"];
  const examGaps = ["None", "1 Day", "2 Days", "3 Days"];
  const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";


  // MODIFIED: Function to get subjects from state
  const getAvailableSubjects = () => {
    return availableSubjects;
  };

  // NEW HOOK: Fetch subjects when standard changes
  useEffect(() => {
    const fetchSubjects = async () => {
      const std = formData.standard;
      setFormData((prev) => ({ ...prev, subjects: [] }));
      setAvailableSubjects([]);
      setErrors((prev) => ({ ...prev, subjects: "", fetchSubjects: "" }));

      if (!std) return;

      try {
        // Fetch subjects from the API endpoint
        const response = await axios.get(
          `${API_BASE_URL}api/subjects/${std}`,
          {
            headers: {
              "Content-Type": "application/json",
              auth: AUTH_HEADER,
            },
          }
        );

        // FIX: Mapping the correct structure from the backend
        // Backend returns: { subjects: [ { subjectname: ["Math", "English"], ... } ] }
        const subjectList = response.data.subjects?.length > 0 
          ? response.data.subjects[0].subjectname 
          : [];
          
        setAvailableSubjects(subjectList);
        
        if (subjectList.length === 0) {
          setErrors((prev) => ({ ...prev, fetchSubjects: `No subjects defined for Standard ${std}.` }));
        } else {
          setErrors((prev) => ({ ...prev, fetchSubjects: "" }));
        }

      } catch (error) {
        console.error("Error fetching subjects:", error);
        setErrors((prev) => ({
          ...prev,
          fetchSubjects: "Failed to load subjects. Check server logs.",
        }));
      }
    };

    fetchSubjects();
  }, [formData.standard]);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };
  
  // NEW UTILITY: Format date to get short day name
  const formatDay = (dateString) => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' });
  };


  const generateTimetablePreview = () => {
    if (!formData.startdate || !formData.subjects.length) {
      return [];
    }

    const timetable = [];
    // IMPORTANT: Ensure the date string is interpreted as UTC to avoid timezone issues when setting date in local context
    let currentDate = new Date(formData.startdate + 'T00:00:00'); 
    const gapDays = parseInt(formData.examgap.split(" ")[0]) || 0;

    formData.subjects.forEach((subject) => {
      const dateString = currentDate.toISOString().split("T")[0];
      timetable.push({
        date: dateString,
        day: formatDay(dateString), // NEW: Add day of the week
        subject,
        starttime: formData.starttime,
        endtime: formData.endtime,
      });
      
      // Advance date by 1 day + gapDays
      currentDate.setDate(currentDate.getDate() + 1 + gapDays);
    });

    return timetable;
  };

  const validateDatesAndTimes = (startDate, startTime, endTime, subjects) => {
    const today = getTodayDate();
    const newErrors = {};

    if (startDate && startDate < today) {
      newErrors.startdate = "Start date must be today or a future date";
    }

    if (startTime && endTime) {
      const startTimeMinutes = convertTimeToMinutes(startTime);
      const endTimeMinutes = convertTimeToMinutes(endTime);
      if (endTimeMinutes <= startTimeMinutes) {
        newErrors.endtime = "End time must be later than start time";
      }
    }

    if (subjects.length === 0) {
      newErrors.subjects = "At least one subject must be selected";
    }

    return newErrors;
  };

  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    if (["startdate", "starttime", "endtime"].includes(name)) {
      const updatedFormData = { ...formData, [name]: value };
      const validationErrors = validateDatesAndTimes(
        updatedFormData.startdate,
        updatedFormData.starttime,
        updatedFormData.endtime,
        updatedFormData.subjects
      );
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...validationErrors,
      }));
    }
  };

  const handleSubjectChange = (subject, isChecked) => {
    let updatedSubjects;
    if (isChecked) {
      updatedSubjects = [...formData.subjects, subject];
    } else {
      updatedSubjects = formData.subjects.filter((s) => s !== subject);
    }

    setFormData({ ...formData, subjects: updatedSubjects });

    const validationErrors = validateDatesAndTimes(
      formData.startdate,
      formData.starttime,
      formData.endtime,
      updatedSubjects
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...validationErrors,
    }));
  };
  
  // NEW FUNCTION: Handle Select All checkbox
  const handleSelectAll = (isChecked) => {
    let updatedSubjects = [];
    if (isChecked) {
      // If checked, include all available subjects
      updatedSubjects = getAvailableSubjects();
    } else {
      // If unchecked, set subjects list to empty
      updatedSubjects = [];
    }
    
    setFormData({ ...formData, subjects: updatedSubjects });
    
    // Re-validate to check if subjects list is now empty or full
    const validationErrors = validateDatesAndTimes(
      formData.startdate,
      formData.starttime,
      formData.endtime,
      updatedSubjects
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...validationErrors,
    }));
  };

  // NEW FUNCTIONS for Drag and Drop Reordering
  const handleDragStart = (e, index) => {
    setDraggedSubject(formData.subjects[index]);
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

    const newSubjects = [...formData.subjects];
    // Remove the dragged item
    const [removed] = newSubjects.splice(draggedIndex, 1);
    // Insert it into the target position
    newSubjects.splice(targetIndex, 0, removed);

    setFormData((prev) => ({ ...prev, subjects: newSubjects }));
    setDraggedIndex(null); // Reset drag state
  };
  // END Drag and Drop Functions


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateDatesAndTimes(
      formData.startdate,
      formData.starttime,
      formData.endtime,
      formData.subjects
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const timetableData = {
      standard: formData.standard,
      startdate: formData.startdate,
      examtype: formData.examtype,
      timetable: generateTimetablePreview().map((entry) => ({
        date: entry.date,
        subject: entry.subject,
        starttime: entry.starttime,
        endtime: entry.endtime,
      })),
    };

    try {
      // FIX 2: Using imported API_BASE_URL
      const response = await axios.post(
        `${API_BASE_URL}api/add-etimetable`,
        timetableData,
        {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
        }
      );
      if (response.status === 200) {
        console.log("added etimetable successfully");
        // Clear existing submit errors on success
        setErrors((prev) => ({ ...prev, submit: "" }));
        setTimeout(() => {
          navigate("/exams");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setErrors({
          submit: error.response.data.message || "Failed to create timetable",
        });
      } else {
        setErrors({ submit: "An unexpected error occurred" });
      }
    }
  };

  const calculateMinEndDate = () => {
    if (!formData.startdate || !formData.subjects.length) {
      return formData.startdate || getTodayDate();
    }

    const startDate = new Date(formData.startdate);
    const gapDays = parseInt(formData.examgap.split(" ")[0]) || 0;
    const examDays = formData.subjects.length;
    const totalGapDays = (formData.subjects.length - 1) * gapDays;

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + examDays - 1 + totalGapDays);

    return endDate.toISOString().split("T")[0];
  };

  const handleViewClick = (entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEntry(null);
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto mt-6">
        <h3 className="text-center text-xl font-bold text-gray-700 mb-8">
          Create Timetable
        </h3>
        {errors.submit && (
          <p className="text-red-500 text-sm mb-4 text-center">**{errors.submit}**</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Standard</label>
              <select
                name="standard"
                value={formData.standard}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Select</option>
                {standards.map((std, i) => (
                  <option key={i} value={std}>
                    {std} 
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Exam Type
              </label>
              <select
                name="examtype"
                value={formData.examtype}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Select</option>
                {examTypes.map((type, i) => (
                  <option key={i} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startdate"
                value={formData.startdate}
                onChange={handleChange}
                min={getTodayDate()}
                className={`w-full border rounded px-3 py-2 ${
                  errors.startdate ? "border-red-500" : ""
                }`}
                required
              />
              {errors.startdate && (
                <p className="text-red-500 text-sm mt-1">{errors.startdate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Start Time
              </label>
              <input
                type="time"
                name="starttime"
                value={formData.starttime}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${
                  errors.starttime ? "border-red-500" : ""
                }`}
                required
              />
              {errors.starttime && (
                <p className="text-red-500 text-sm mt-1">{errors.starttime}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">End Time</label>
              <input
                type="time"
                name="endtime"
                value={formData.endtime}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 ${
                  errors.endtime ? "border-red-500" : ""
                }`}
                required
              />
              {errors.endtime && (
                <p className="text-red-500 text-sm mt-1">{errors.endtime}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Exam Gaps
              </label>
              <select
                name="examgap"
                value={formData.examgap}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select</option>
                {examGaps.map((gap, i) => (
                  <option key={i} value={gap}>
                    {gap}
                  </option>
                ))}
              </select>
            </div>
            </div>

          {formData.standard && (
            <div className="mt-6">
              <label className="block text-sm font-medium mb-3">
                Select Subjects for Standard {formData.standard}
              </label>
              {/* Display Fetch Error/Message */}
              {errors.fetchSubjects && (
                <p className="text-red-500 text-sm mb-2">{errors.fetchSubjects}</p>
              )}
              {getAvailableSubjects().length > 0 ? (
                <>
                {/* NEW CHANGE: Select All Checkbox */}
                <div className="mb-4">
                  <input
                    type="checkbox"
                    id="selectAllSubjects"
                    checked={formData.subjects.length === getAvailableSubjects().length && getAvailableSubjects().length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="selectAllSubjects" className="font-bold text-sm text-blue-600">
                    Select All
                  </label>
                </div>
                
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {getAvailableSubjects().map((subject, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`subject-${index}`}
                      checked={formData.subjects.includes(subject)}
                      onChange={(e) =>
                        handleSubjectChange(subject, e.target.checked)
                      }
                      className="mr-2"
                    />
                    <label htmlFor={`subject-${index}`} className="text-sm">
                      {subject}
                    </label>
                  </div>
                ))}
              </div>
              </>
              ) : (
                // Only show this message if fetching was successful but the list is empty
                !errors.fetchSubjects && <p className="text-gray-500 text-sm">No subjects available for this standard.</p>
              )}
              {errors.subjects && (
                <p className="text-red-500 text-sm mt-2">{errors.subjects}</p>
              )}
              {formData.subjects.length > 0 && (
                <p className="text-blue-600 text-sm mt-2">
                  Selected: {formData.subjects.length} subject(s)
                </p>
              )}
            </div>
          )}

          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">
              Timetable Preview
              {formData.subjects.length > 0 && <span className="text-xs text-gray-500 ml-2">(Drag rows to reorder)</span>}
            </h4>
            {generateTimetablePreview().length > 0 ? (
              <div className="border rounded-lg p-4 overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="bg-gray-100">
                      {/* NEW CHANGE: Added Day column */}
                      <th className="p-2 w-[10%]">Day</th>
                      <th className="p-2 w-[20%]">Date</th>
                      <th className="p-2 w-1/2">Subject</th>
                      <th className="p-2 w-1/4">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generateTimetablePreview().map((entry, index) => (
                      <tr 
                        key={entry.subject} 
                        className={`border-t cursor-move ${draggedIndex === index ? 'opacity-50 bg-yellow-100' : ''}`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        onDragEnd={() => setDraggedIndex(null)}
                      >
                        {/* NEW CHANGE: Display Day */}
                        <td className="p-2 font-medium">{entry.day}</td>
                        <td className="p-2">{entry.date}</td>
                        <td className="p-2 font-medium">{entry.subject}</td>
                        <td className="p-2">
                          {entry.starttime} - {entry.endtime}
                        </td>                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">
                Fill in the details and select subjects to see the timetable
                preview.
              </p>
            )}
          </div>

          {isModalOpen && selectedEntry && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">
                  Timetable Entry Details
                </h4>
                <table className="w-full text-left border">
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Date</td>
                      <td className="p-2">{selectedEntry.date}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Subject</td>
                      <td className="p-2">{selectedEntry.subject}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Start Time</td>
                      <td className="p-2">{selectedEntry.starttime}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium">End Time</td>
                      <td className="p-2">{selectedEntry.endtime}</td>
                    </tr>
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

          <div className="flex justify-between items-center mt-8">
            <button
              type="button"
              onClick={() => navigate("/exams")}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
            >
              Back
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
            >
              Confirm
            </button>
          </div>
        </form>
        </div>
    </MainLayout>
  );
};

export default CreateTimetable;