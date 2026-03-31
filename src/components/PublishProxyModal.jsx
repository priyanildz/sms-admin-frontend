// import React, { useState, useEffect } from "react";
// import axios from "axios";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from "../config";

// const PublishProxyModal = ({
//   isOpen,
//   onClose,
//   standard,
//   setStandard,
//   division,
//   setDivision,
//   date,
//   setDate,
//   lecNo,
//   setLecNo,
//   subject,
//   setSubject,
//   fromTeacher,
//   setFromTeacher,
//   toTeacher,
//   setToTeacher,
//   teacherOptions,
//   // --- PROPS FOR FILTERED DROPDOWNS ---
//   stdOptions, // Array of standards from allotments
//   divisionMap, // Map for all available divisions per standard
//   divOptions, // Division options for the currently selected standard
//   allotmentList, // Full list of allocations to filter subjects
//   fullTimetableData, // NEW: Full data used for client-side conflict check
// }) => {
//   if (!isOpen) return null;

//   const AUTH_HEADER = `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`;
//   const [subjectOptionsState, setSubjectOptionsState] = useState([]);

//   // --- CONFLICT STATES ---
//   const [availableProxyTeachers, setAvailableProxyTeachers] =
//     useState(teacherOptions);
//   const [isConflict, setIsConflict] = useState(false);
//   const [isCheckingConflict, setIsCheckingConflict] = useState(false);
//   // ----------------------

//   // --- Standard/Division/Subject logic remains unchanged ---
//   useEffect(() => {
//     if (isOpen && !standard && stdOptions.length > 0) {
//       setStandard(stdOptions[0]);
//     }

//     if (!isOpen) {
//       setDivision("");
//       // Reset conflict states when closing
//       setIsConflict(false);
//       setIsCheckingConflict(false);
//     }
//   }, [isOpen, standard, stdOptions, setStandard]);

//   useEffect(() => {
//     if (!standard || !division) {
//       setSubjectOptionsState([]);
//       setSubject("");
//       return;
//     }
//     const matchingAllotments = allotmentList.filter(
//       (alloc) =>
//         alloc.standards?.[0] === standard && alloc.divisions?.[0] === division,
//     );
//     const subjectsSet = new Set();
//     matchingAllotments.forEach((alloc) => {
//       alloc.subjects?.forEach((sub) => {
//         if (sub) subjectsSet.add(sub);
//       });
//     });
//     const uniqueSubjects = Array.from(subjectsSet).sort();
//     setSubjectOptionsState(
//       uniqueSubjects.map((sub) => ({ label: sub, value: sub })),
//     );
//     if (subject && !uniqueSubjects.includes(subject)) {
//       setSubject("");
//     }
//   }, [standard, division, allotmentList, subject, setSubject]);
//   // --- End Standard/Division/Subject logic ---

//   // --- CRITICAL FIX: LIVE DROPDOWN FILTERING AND CONFLICT CHECK (Client-side) ---
//   useEffect(() => {
//     // Run check only if date, lecture number, and timetable data are available
//     if (
//       !date ||
//       !lecNo ||
//       fullTimetableData.length === 0 ||
//       !teacherOptions.length
//     ) {
//       setAvailableProxyTeachers(teacherOptions); // Reset to full list
//       setIsConflict(false);
//       return;
//     }

//     const checkAvailabilityAndFilter = () => {
//       setIsCheckingConflict(true);
//       setIsConflict(false);

//       const availableTeachers = [];
//       const busyTeacherIds = new Set();
//       const requestedLecNo = parseInt(lecNo);

//       const selectedDate = new Date(date);
//       const days = [
//         "Sunday",
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday",
//       ];
//       const dayName = days[selectedDate.getUTCDay()];

//       // --- 1. Identify ALL busy teachers for the specific time slot ---
//       fullTimetableData.forEach((classTimetable) => {
//         // Find the schedule for the required day
//         const daySchedule = classTimetable.timetable.find(
//           (tt) => tt.day === dayName,
//         );

//         if (daySchedule) {
//           // Find the specific period slot
//           const period = daySchedule.periods.find(
//             (p) => p.periodNumber === requestedLecNo,
//           );

//           // If a subject is scheduled and a teacher ID is present
//           if (
//             period &&
//             period.teacher &&
//             period.subject &&
//             period.subject !== "BREAK" &&
//             period.subject !== "LUNCH" &&
//             period.subject !== "FREE"
//           ) {
//             busyTeacherIds.add(period.teacher); // Use the raw teacher ID from the timetable data
//           }
//         }
//       });

//       // --- 2. Filter available teachers ---
//       teacherOptions.forEach((teacher) => {
//         if (!busyTeacherIds.has(teacher.value)) {
//           availableTeachers.push(teacher);
//         }
//       });

//       // --- 3. Update Filtered Dropdown ---
//       setAvailableProxyTeachers(availableTeachers);

//       // --- 4. Check for Conflict on currently selected To Teacher ---
//       if (toTeacher && busyTeacherIds.has(toTeacher)) {
//         setIsConflict(true);
//       } else {
//         setIsConflict(false);
//       }

//       setIsCheckingConflict(false);
//     };

//     // Delay the check slightly to wait for the user to finish typing Lec No/Date
//     const timeoutId = setTimeout(checkAvailabilityAndFilter, 300);
//     return () => clearTimeout(timeoutId); // Cleanup previous checks
//   }, [date, lecNo, fullTimetableData, teacherOptions.length, toTeacher]);
//   // --- END LIVE FILTERING FIX ---

//   // --- Validation Check ---
//   const validateInputs = () => {
//     if (
//       !standard ||
//       !division ||
//       !date ||
//       !lecNo ||
//       !subject ||
//       !fromTeacher ||
//       !toTeacher
//     ) {
//       alert(
//         "Please fill in all required fields (Standard, Division, Date, Lecture No, Subject, From Teacher, To Teacher).",
//       );
//       return false;
//     }
//     if (fromTeacher === toTeacher) {
//       alert("The 'From Teacher' and 'To Teacher' must be different.");
//       return false;
//     }
//     if (isConflict) {
//       alert(
//         "Cannot publish: The selected 'To Teacher' is already scheduled for a class at this time.",
//       );
//       return false;
//     }
//     return true;
//   };
//   const handlePublish = async () => {
//     const storedUsername = localStorage.getItem("username") || "System_User";
//     const storedRole = localStorage.getItem("role") || "admin";
//     if (!validateInputs()) {
//       return;
//     }
//     try {
//       const payload = {
//         standard,
//         division,
//         date,
//         lecno: lecNo,
//         subject,
//         fromteacher: fromTeacher,
//         toteacher: toTeacher,
//       };

//       await axios.post(`${API_BASE_URL}api/add-proxy`, payload, {
//         headers: {
//           auth: AUTH_HEADER,
//           username: storedUsername,
//           role: storedRole,
//         },
//       });
//       alert("Proxy published successfully");
//       onClose(true);
//     } catch (error) {
//       console.error("Error publishing proxy:", error);
//       alert(
//         `Failed to publish proxy ❌. Error: ${error.response?.data?.error || "Server error"}`,
//       );
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center z-50"
//       style={{
//         // Using RGBA to create the dimming effect without blurring the backdrop
//         backgroundColor: "rgba(50, 50, 50, 0.5)",
//       }}
//     >
//       <div className="bg-white rounded-md p-6 w-full max-w-md shadow-lg">
//         <h3 className="text-xl font-semibold mb-4 text-center">
//           Proxy Creation
//         </h3>
//         {/* Standard + Division */}
//         <div className="flex gap-4 mb-4">
//           <div className="w-1/2">
//             <label className="block text-sm font-medium text-gray-700">
//               Standard <span className="text-red-500">*</span>
//             </label>

//             <select
//               value={standard}
//               onChange={(e) => {
//                 setStandard(e.target.value);
//                 setDivision(""); // Reset division when standard changes
//                 setSubject(""); // Reset subject when standard changes
//               }}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//             >
//               <option value="">Select Standard</option>

//               {stdOptions.map((std) => (
//                 <option key={std} value={std}>
//                   {std}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="w-1/2">
//             <label className="block text-sm font-medium text-gray-700">
//               Division <span className="text-red-500">*</span>
//             </label>

//             <select
//               value={division}
//               onChange={(e) => setDivision(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//               disabled={!standard || divOptions.length === 0}
//             >
//               <option value="">
//                 {!standard
//                   ? "Select Standard first"
//                   : divOptions.length === 0
//                     ? "No Divisions Allotted"
//                     : "Select Division"}
//               </option>

//               {divOptions.map((div) => (
//                 <option key={div} value={div}>
//                   {div}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         {/* Date */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Date <span className="text-red-500">*</span>
//           </label>

//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           />
//         </div>
//         {/* Lec No */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Lec No <span className="text-red-500">*</span>
//           </label>

//           <input
//             type="number"
//             value={lecNo || ""}
//             onChange={(e) => setLecNo(Number(e.target.value))}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           />
//         </div>
//         {/* Subject */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Subject <span className="text-red-500">*</span>
//           </label>

//           <select
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//             disabled={
//               !standard || !division || subjectOptionsState.length === 0
//             }
//           >
//             <option value="">
//               {!standard || !division
//                 ? "Select Standard and Division first"
//                 : subjectOptionsState.length > 0
//                   ? "Select Subject"
//                   : "No Subjects Allotted for this Std/Div"}
//             </option>

//             {subjectOptionsState.map((s, idx) => (
//               <option key={idx} value={s.value}>
//                 {s.label}
//               </option>
//             ))}
//           </select>
//         </div>
//         {/* From Teacher */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             From Teacher <span className="text-red-500">*</span>
//           </label>

//           <select
//             value={fromTeacher}
//             onChange={(e) => setFromTeacher(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           >
//             <option value="">Select Teacher</option>
//             {teacherOptions.map((t, idx) => (
//               <option key={idx} value={t.value}>
//                 {t.label}
//               </option>
//             ))}
//           </select>
//         </div>
//         {/* To Teacher (Proxy) with Conflict Check */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             To Teacher (Proxy)
//             <span className="text-red-500">*</span>
//           </label>

//           <select
//             value={toTeacher}
//             onChange={(e) => setToTeacher(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           >
//             <option value="">Select Teacher</option>
//             {availableProxyTeachers.map((t, idx) => (
//               <option key={idx} value={t.value}>
//                 {t.label}
//               </option>
//             ))}
//           </select>
//           {isCheckingConflict && (
//             <p className="text-sm text-yellow-600 mt-1">
//               Checking availability...
//             </p>
//           )}
//           {isConflict && (
//             <p className="text-sm text-red-600 font-semibold mt-1">
//               ⚠️ CONFLICT: Teacher is busy at Lec No. {lecNo} on this date.
//             </p>
//           )}
//         </div>
//         {/* Buttons */}
//         <div className="flex justify-end gap-4 mt-6">
//           <button
//             onClick={() => onClose(false)}
//             className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handlePublish}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             disabled={
//               !standard ||
//               !division ||
//               !date ||
//               !lecNo ||
//               !subject ||
//               !fromTeacher ||
//               !toTeacher ||
//               isConflict ||
//               isCheckingConflict
//             }
//           >
//             {isCheckingConflict ? "Checking..." : "Publish"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PublishProxyModal;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from "../config";

// const PublishProxyModal = ({
//   isOpen,
//   onClose,
//   standard,
//   setStandard,
//   division,
//   setDivision,
//   date,
//   setDate,
//   lecNo,
//   setLecNo,
//   subject,
//   setSubject,
//   fromTeacher,
//   setFromTeacher,
//   toTeacher,
//   setToTeacher,
//   teacherOptions,
//   // --- PROPS FOR FILTERED DROPDOWNS ---
//   stdOptions,
//   divisionMap,
//   divOptions,
//   allotmentList,
//   fullTimetableData,
// }) => {
//   if (!isOpen) return null;

//   const AUTH_HEADER = `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`;
//   const [subjectOptionsState, setSubjectOptionsState] = useState([]);

//   // --- CONFLICT STATES ---
//   const [availableProxyTeachers, setAvailableProxyTeachers] =
//     useState(teacherOptions);
//   const [isConflict, setIsConflict] = useState(false);
//   const [isCheckingConflict, setIsCheckingConflict] = useState(false);

//   // Logic for resetting/defaults
//   useEffect(() => {
//     if (isOpen && !standard && stdOptions.length > 0) {
//       setStandard(stdOptions[0]);
//     }
//     if (!isOpen) {
//       setDivision("");
//       setIsConflict(false);
//       setIsCheckingConflict(false);
//     }
//   }, [isOpen, standard, stdOptions, setStandard]);

//   // Subject filtering logic
//   useEffect(() => {
//     if (!standard || !division) {
//       setSubjectOptionsState([]);
//       setSubject("");
//       return;
//     }
//     const matchingAllotments = allotmentList.filter(
//       (alloc) =>
//         alloc.standards?.[0] === standard && alloc.divisions?.[0] === division
//     );
//     const subjectsSet = new Set();
//     matchingAllotments.forEach((alloc) => {
//       alloc.subjects?.forEach((sub) => {
//         if (sub) subjectsSet.add(sub);
//       });
//     });
//     const uniqueSubjects = Array.from(subjectsSet).sort();
//     setSubjectOptionsState(
//       uniqueSubjects.map((sub) => ({ label: sub, value: sub }))
//     );
//     if (subject && !uniqueSubjects.includes(subject)) {
//       setSubject("");
//     }
//   }, [standard, division, allotmentList, subject, setSubject]);

//   // Conflict check logic
//   useEffect(() => {
//     if (
//       !date ||
//       !lecNo ||
//       fullTimetableData.length === 0 ||
//       !teacherOptions.length
//     ) {
//       setAvailableProxyTeachers(teacherOptions);
//       setIsConflict(false);
//       return;
//     }

//     const checkAvailabilityAndFilter = () => {
//       setIsCheckingConflict(true);
//       setIsConflict(false);

//       const availableTeachers = [];
//       const busyTeacherIds = new Set();
//       const requestedLecNo = parseInt(lecNo);

//       const selectedDate = new Date(date);
//       const days = [
//         "Sunday",
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday",
//       ];
//       const dayName = days[selectedDate.getUTCDay()];

//       fullTimetableData.forEach((classTimetable) => {
//         const daySchedule = classTimetable.timetable.find(
//           (tt) => tt.day === dayName
//         );
//         if (daySchedule) {
//           const period = daySchedule.periods.find(
//             (p) => p.periodNumber === requestedLecNo
//           );
//           if (
//             period &&
//             period.teacher &&
//             period.subject &&
//             period.subject !== "BREAK" &&
//             period.subject !== "LUNCH" &&
//             period.subject !== "FREE"
//           ) {
//             busyTeacherIds.add(period.teacher);
//           }
//         }
//       });

//       teacherOptions.forEach((teacher) => {
//         if (!busyTeacherIds.has(teacher.value)) {
//           availableTeachers.push(teacher);
//         }
//       });

//       setAvailableProxyTeachers(availableTeachers);
//       if (toTeacher && busyTeacherIds.has(toTeacher)) {
//         setIsConflict(true);
//       } else {
//         setIsConflict(false);
//       }
//       setIsCheckingConflict(false);
//     };

//     const timeoutId = setTimeout(checkAvailabilityAndFilter, 300);
//     return () => clearTimeout(timeoutId);
//   }, [date, lecNo, fullTimetableData, teacherOptions.length, toTeacher]);

//   const validateInputs = () => {
//     if (
//       !standard ||
//       !division ||
//       !date ||
//       !lecNo ||
//       !subject ||
//       !fromTeacher ||
//       !toTeacher
//     ) {
//       alert("Please fill in all required fields.");
//       return false;
//     }
//     if (fromTeacher === toTeacher) {
//       alert("The 'From Teacher' and 'To Teacher' must be different.");
//       return false;
//     }
//     if (isConflict) {
//       alert("Cannot publish: The selected 'To Teacher' is already scheduled.");
//       return false;
//     }
//     return true;
//   };

//   const handlePublish = async () => {
//     const storedUsername = localStorage.getItem("username") || "System_User";
//     const storedRole = localStorage.getItem("role") || "admin";
//     if (!validateInputs()) return;
//     try {
//       const payload = {
//         standard,
//         division,
//         date,
//         lecno: lecNo,
//         subject,
//         fromteacher: fromTeacher,
//         toteacher: toTeacher,
//       };

//       await axios.post(`${API_BASE_URL}api/add-proxy`, payload, {
//         headers: {
//           auth: AUTH_HEADER,
//           username: storedUsername,
//           role: storedRole,
//         },
//       });
//       alert("Proxy published successfully");
//       onClose(true);
//     } catch (error) {
//       console.error("Error publishing proxy:", error);
//       alert(`Failed to publish proxy ❌. Error: ${error.response?.data?.error || "Server error"}`);
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 flex items-center justify-center z-50"
//       style={{ backgroundColor: "rgba(50, 50, 50, 0.5)" }}
//     >
//       <div className="bg-white rounded-md p-6 w-full max-w-md shadow-lg">
//         <h3 className="text-xl font-semibold mb-4 text-center">Proxy Creation</h3>

//         {/* 1. From Teacher */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             From Teacher <span className="text-red-500">*</span>
//           </label>
//           <select
//             value={fromTeacher}
//             onChange={(e) => setFromTeacher(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           >
//             <option value="">Select Teacher</option>
//             {teacherOptions.map((t, idx) => (
//               <option key={idx} value={t.value}>
//                 {t.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* 2. Date */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Date <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         {/* CONDITIONAL BLOCK: Only appears if From Teacher and Date are selected */}
//         {fromTeacher && date && (
//           <>
//             {/* Standard + Division */}
//             <div className="flex gap-4 mb-4">
//               <div className="w-1/2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Standard <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   value={standard}
//                   onChange={(e) => {
//                     setStandard(e.target.value);
//                     setDivision("");
//                     setSubject("");
//                   }}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//                 >
//                   <option value="">Select Standard</option>
//                   {stdOptions.map((std) => (
//                     <option key={std} value={std}>{std}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="w-1/2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Division <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   value={division}
//                   onChange={(e) => setDivision(e.target.value)}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//                   disabled={!standard || divOptions.length === 0}
//                 >
//                   <option value="">
//                     {!standard ? "Select Standard first" : divOptions.length === 0 ? "No Divisions" : "Select Division"}
//                   </option>
//                   {divOptions.map((div) => (
//                     <option key={div} value={div}>{div}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Lec No */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Lec No <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="number"
//                 value={lecNo || ""}
//                 onChange={(e) => setLecNo(Number(e.target.value))}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//               />
//             </div>

//             {/* Subject */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 Subject <span className="text-red-500">*</span>
//               </label>
//               <select
//                 value={subject}
//                 onChange={(e) => setSubject(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//                 disabled={!standard || !division || subjectOptionsState.length === 0}
//               >
//                 <option value="">
//                   {!standard || !division ? "Select Std/Div first" : "Select Subject"}
//                 </option>
//                 {subjectOptionsState.map((s, idx) => (
//                   <option key={idx} value={s.value}>{s.label}</option>
//                 ))}
//               </select>
//             </div>

//             {/* To Teacher (Proxy) */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">
//                 To Teacher (Proxy) <span className="text-red-500">*</span>
//               </label>
//               <select
//                 value={toTeacher}
//                 onChange={(e) => setToTeacher(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//               >
//                 <option value="">Select Teacher</option>
//                 {availableProxyTeachers.map((t, idx) => (
//                   <option key={idx} value={t.value}>{t.label}</option>
//                 ))}
//               </select>
//               {isCheckingConflict && <p className="text-sm text-yellow-600 mt-1">Checking availability...</p>}
//               {isConflict && (
//                 <p className="text-sm text-red-600 font-semibold mt-1">
//                   ⚠️ CONFLICT: Teacher is busy at Lec No. {lecNo}
//                 </p>
//               )}
//             </div>
//           </>
//         )}

//         {/* Buttons */}
//         <div className="flex justify-end gap-4 mt-6">
//           <button
//             onClick={() => onClose(false)}
//             className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handlePublish}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             disabled={!standard || !division || !date || !lecNo || !subject || !fromTeacher || !toTeacher || isConflict || isCheckingConflict}
//           >
//             {isCheckingConflict ? "Checking..." : "Publish"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PublishProxyModal;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const PublishProxyModal = ({
  isOpen,
  onClose,
  date,
  setDate,
  fromTeacher,
  setFromTeacher,
  teacherOptions,
  fullTimetableData,
}) => {
  if (!isOpen) return null;

  const AUTH_HEADER = `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`;
  const [lecturesToReplace, setLecturesToReplace] = useState([]);
  const [proxyMapping, setProxyMapping] = useState({});

  const getTeacherId = (t) => {
    if (!t) return null;
    return typeof t === "object" ? t.$oid || t._id : t;
  };

  const getStandardCategory = (std) => {
    const s = String(std).toLowerCase().trim();
    if (["nursery", "junior kg", "senior kg", "junior", "senior"].includes(s)) return "PRE-PRIMARY";
    const numStd = parseInt(s);
    if (numStd >= 1 && numStd <= 5) return "PRIMARY";
    if (numStd >= 6 && numStd <= 10) return "SECONDARY";
    return "OTHER";
  };

  useEffect(() => {
    if (!isOpen) {
      setLecturesToReplace([]);
      setProxyMapping({});
    }
  }, [isOpen]);

  useEffect(() => {
    if (!fromTeacher || !date || !fullTimetableData.length) {
      setLecturesToReplace([]);
      return;
    }

    const selectedDate = new Date(date);
    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][selectedDate.getUTCDay()];
    const currentFromTeacherId = getTeacherId(fromTeacher);

    const foundLectures = [];
    fullTimetableData.forEach((classTT) => {
      const daySchedule = classTT.timetable?.find((tt) => tt.day === dayName);
      if (daySchedule) {
        daySchedule.periods.forEach((period) => {
          if (getTeacherId(period.teacher) === currentFromTeacherId && period.subject && 
              !["BREAK", "LUNCH", "FREE", "BREAKFAST BREAK"].includes(period.subject.toUpperCase().trim())) {
            foundLectures.push({
              timetableId: classTT._id, // Store for automatic update
              standard: classTT.standard,
              division: classTT.division,
              lecNo: period.periodNumber,
              subject: period.subject,
              time: period.time,
              category: getStandardCategory(classTT.standard)
            });
          }
        });
      }
    });
    setLecturesToReplace(foundLectures.sort((a, b) => a.lecNo - b.lecNo));
  }, [fromTeacher, date, fullTimetableData]);

  const getAvailableProxyOptions = (lecNo, blockCategory) => {
    const selectedDate = new Date(date);
    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][selectedDate.getUTCDay()];
    const categoryTeacherIds = new Set();
    const busyTeacherIds = new Set();

    fullTimetableData.forEach((classTT) => {
      const classCat = getStandardCategory(classTT.standard);
      const daySchedule = classTT.timetable?.find((tt) => tt.day === dayName);
      if (daySchedule) {
        daySchedule.periods.forEach((p) => {
          const tid = getTeacherId(p.teacher);
          if (!tid) return;
          if (classCat === blockCategory) categoryTeacherIds.add(tid);
          if (p.periodNumber === lecNo && !["BREAK", "LUNCH", "FREE", "BREAKFAST BREAK"].includes((p.subject || "").toUpperCase())) {
            busyTeacherIds.add(tid);
          }
        });
      }
    });

    return teacherOptions.filter((t) => {
      const tId = getTeacherId(t.value);
      return categoryTeacherIds.has(tId) && !busyTeacherIds.has(tId) && tId !== getTeacherId(fromTeacher);
    });
  };

  // const handlePublishAll = async () => {
  //   const selectedKeys = Object.keys(proxyMapping).filter(k => proxyMapping[k]);
  //   if (!selectedKeys.length) return alert("Assign a proxy teacher first.");

  //   const storedUsername = localStorage.getItem("username");
  //   const storedRole = localStorage.getItem("role");

  //   try {
  //     const selectedDate = new Date(date);
  //     const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][selectedDate.getUTCDay()];

  //     const requests = selectedKeys.map(async (idx) => {
  //       const lec = lecturesToReplace[idx];
  //       const toTeacherId = getTeacherId(proxyMapping[idx]);

  //       // 1. Create Proxy Record
  //       await axios.post(`${API_BASE_URL}api/add-proxy`, {
  //         standard: lec.standard, division: lec.division, date,
  //         lecno: lec.lecNo, subject: lec.subject, fromteacher: getTeacherId(fromTeacher),
  //         toteacher: toTeacherId,
  //       }, {
  //         headers: { auth: AUTH_HEADER, username: storedUsername, role: storedRole },
  //       });

  //       // 2. AUTOMATIC TIMETABLE UPDATE (Update actual schedule)
  //       return axios.put(`${API_BASE_URL}api/update-timetable-period`, {
  //         timetableId: lec.timetableId,
  //         day: dayName,
  //         lecNo: lec.lecNo,
  //         newTeacherId: toTeacherId
  //       }, {
  //         headers: { auth: AUTH_HEADER, username: storedUsername, role: storedRole },
  //       });
  //     });

  //     await Promise.all(requests);
  //     alert("Proxy assigned and Timetable updated successfully!");
  //     onClose(true);
  //   } catch (error) {
  //     console.error(error);
  //     alert("Failed to publish proxies. Check permissions (403 Error).");
  //   }
  // };



  const handlePublishAll = async () => {
    const selectedKeys = Object.keys(proxyMapping).filter(k => proxyMapping[k]);
    if (!selectedKeys.length) return alert("Assign a proxy teacher first.");

    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    try {
      const selectedDate = new Date(date);
      const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][selectedDate.getUTCDay()];

      for (const idx of selectedKeys) {
        const lec = lecturesToReplace[idx];
        const toTeacherId = getTeacherId(proxyMapping[idx]);

        const config = {
          headers: { auth: AUTH_HEADER, username: storedUsername, role: storedRole }
        };

        // 1. Create Proxy Record (Preserving the original subject)
        await axios.post(`${API_BASE_URL}api/add-proxy`, {
          standard: lec.standard, 
          division: lec.division, 
          date,
          lecno: lec.lecNo, 
          subject: lec.subject, // Keeps the original subject (e.g., English)
          fromteacher: getTeacherId(fromTeacher),
          toteacher: toTeacherId,
        }, config);

        // 2. Automatically update the Timetable record
        await axios.put(`${API_BASE_URL}api/update-timetable-period`, {
          timetableId: lec.timetableId,
          day: dayName,
          lecNo: Number(lec.lecNo),
          newTeacherId: toTeacherId
          // Note: Subject is NOT sent here so it remains unchanged in the DB
        }, config);
      }

      alert("Proxy assigned! Original subject preserved and schedule updated. ✅");
      onClose(true);
    } catch (error) {
      console.error("Publish error:", error);
      alert("Failed to publish proxies.");
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="bg-white rounded-md p-6 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4 text-center border-b pb-2">Create Proxy</h3>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">From Teacher (Absent)</label>
            <select
              value={fromTeacher}
              onChange={(e) => { setFromTeacher(e.target.value); setProxyMapping({}); }}
              className="mt-1 block w-full p-2 border rounded-md border-gray-300"
            >
              <option value="">Select Teacher</option>
              {teacherOptions.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Date</label>
            <input type="date" value={date} onChange={(e) => { setDate(e.target.value); setProxyMapping({}); }} className="mt-1 block w-full p-2 border rounded-md border-gray-300" />
          </div>
        </div>

        {lecturesToReplace.length > 0 ? (
          <div className="space-y-4">
            {lecturesToReplace.map((lec, index) => {
              const available = getAvailableProxyOptions(lec.lecNo, lec.category);
              return (
                <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
                  <div className="grid grid-cols-2 text-sm mb-3">
                    <p><strong>Std:</strong> {lec.standard}-{lec.division}</p>
                    <p><strong>Lec:</strong> {lec.lecNo}</p>
                    <p className="col-span-2"><strong>Subject:</strong> {lec.subject}</p>
                  </div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">ASSIGN PROXY</label>
                  <select
                    value={proxyMapping[index] || ""}
                    onChange={(e) => setProxyMapping({ ...proxyMapping, [index]: e.target.value })}
                    className="w-full p-2 text-sm border border-gray-300 rounded bg-white"
                  >
                    <option value="">-- Select Teacher --</option>
                    {available.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
              );
            })}
          </div>
        ) : (
          fromTeacher && date && <p className="text-center text-gray-400 py-10">No lectures found.</p>
        )}

        <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
          <button onClick={() => onClose(false)} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded">Cancel</button>
          <button onClick={handlePublishAll} disabled={!Object.keys(proxyMapping).length} className="px-6 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 disabled:opacity-50 shadow-md">Publish & Update Timetable</button>
        </div>
      </div>
    </div>
  );
};

export default PublishProxyModal;