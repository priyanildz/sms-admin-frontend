// import React, { useEffect } from "react";
// import axios from "axios";

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
//   subjectOptions, // ✅ coming from parent (filtered by standard)
//   teacherOptions, // ✅ coming from API (/staff)
// }) => {
//   if (!isOpen) return null;

//   const handlePublish = async () => {
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

//       await axios.post("http://localhost:5000/api/add-proxy", payload, {
//         headers: {
//           auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//         },
//       });
//       alert("Proxy published successfully ✅");
//       onClose();
//     } catch (error) {
//       console.error("Error publishing proxy:", error);
//       alert("Failed to publish proxy ❌");
//     }
//   };

//   const selectedStd = standard;
//   const [subjectOptionsState, setSubjectOptions] = React.useState([]);

//   useEffect(() => {
//     if (!selectedStd) {
//       setSubjectOptions([]);
//       return;
//     }
//     const fetchSubjects = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/subjects/${selectedStd}`,
//           {
//             headers: {
//               auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//             },
//           }
//         );

//         // subjectname is an array inside subjects[0]
//         const subjects = res.data.subjects[0]?.subjectname || [];

//         const formattedSubjects = subjects.map((sub) => ({
//           label: sub,
//           value: sub,
//         }));

//         setSubjectOptions(formattedSubjects);
//       } catch (err) {
//         console.error("Error fetching subjects:", err);
//       }
//     };
//     fetchSubjects();
//   }, [selectedStd]);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50 backdrop-blur-sm">
//       <div className="bg-white rounded-md p-6 w-full max-w-md shadow-lg">
//         <h3 className="text-xl font-semibold mb-4 text-center">
//           Proxy Creation
//         </h3>

//         {/* Standard + Division */}
//         <div className="flex gap-4 mb-4">
//           <div className="w-1/2">
//             <label className="block text-sm font-medium text-gray-700">
//               Standard
//             </label>
//             <select
//               value={standard}
//               onChange={(e) => setStandard(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//             >
//               <option value="">Select Standard</option>
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//               <option value="4">4</option>
//               <option value="5">5</option>
//               <option value="6">6</option>
//               <option value="7">7</option>
//               <option value="8">8</option>
//               <option value="9">9</option>
//               <option value="10">10</option>
//             </select>
//           </div>
//           <div className="w-1/2">
//             <label className="block text-sm font-medium text-gray-700">
//               Division
//             </label>
//             <select
//               value={division}
//               onChange={(e) => setDivision(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//             >
//               <option value="">Select Division</option>
//               <option value="A">A</option>
//               <option value="B">B</option>
//               <option value="C">C</option>
//             </select>
//           </div>
//         </div>

//         {/* Date */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Date
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
//             Lec No
//           </label>
//           <input
//             type="number"
//             value={lecNo || ""} // ensures controlled input
//             onChange={(e) => setLecNo(Number(e.target.value))} // store as Number
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         {/* Subject */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Subject
//           </label>
//           <select
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           >
//             <option value="">Select Subject</option>
//             {subjectOptionsState.map((s, idx) => (
//               <option key={idx} value={s.value || s}>
//                 {s.label || s}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* From Teacher */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             From Teacher
//           </label>
//           <select
//             value={fromTeacher}
//             onChange={(e) => setFromTeacher(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           >
//             <option value="">Select Teacher</option>
//             {teacherOptions.map((t, idx) => (
//               <option key={idx} value={t.value || t}>
//                 {t.label || t}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* To Teacher */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             To Teacher
//           </label>
//           <select
//             value={toTeacher}
//             onChange={(e) => setToTeacher(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           >
//             <option value="">Select Teacher</option>
//             {teacherOptions.map((t, idx) => (
//               <option key={idx} value={t.value || t}>
//                 {t.label || t}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end gap-4 mt-6">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handlePublish}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Publish
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
// import { API_BASE_URL } from '../config'; 

// const PublishProxyModal = ({
//   isOpen,
//   onClose,
//   standard,
//   setStandard,
//   division,
//   setDivision,
//   date,
//   setDate,
//   lecNo,
//   setLecNo,
//   subject,
//   setSubject,
//   fromTeacher,
//   setFromTeacher,
//   toTeacher,
//   setToTeacher,
//   subjectOptions, // ✅ coming from parent (filtered by standard)
//   teacherOptions, // ✅ coming from API (/staff)
// }) => {
//   if (!isOpen) return null;

//   const AUTH_HEADER = `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`;
//   const handlePublish = async () => {
//     try {
//       const payload = {
//         standard,
//         division,
//         date,
//         lecno: lecNo,
//         subject,
//         fromteacher: fromTeacher,
//         toteacher: toTeacher,
//       };

//       // FIX 1: Using imported API_BASE_URL (Post Proxy)
//       await axios.post(`${API_BASE_URL}api/add-proxy`, payload, {
//         headers: {
//           auth: AUTH_HEADER,
//         },
//       });
//       alert("Proxy published successfully ✅");
//       onClose();
//     } catch (error) {
//       console.error("Error publishing proxy:", error);
//       alert("Failed to publish proxy ❌");
//     }
//   };

//   const selectedStd = standard;
//   const [subjectOptionsState, setSubjectOptions] = React.useState([]);

//   useEffect(() => {
//     if (!selectedStd) {
//       setSubjectOptions([]);
//       return;
//     }
//     const fetchSubjects = async () => {
//       try {
//         // FIX 2: Using imported API_BASE_URL (Fetch Subjects)
//         const res = await axios.get(
//           `${API_BASE_URL}api/subjects/${selectedStd}`,
//           {
//             headers: {
//               auth: AUTH_HEADER,
//             },
//           }
//         );

//         // subjectname is an array inside subjects[0]
//         const subjects = res.data.subjects[0]?.subjectname || [];

//         const formattedSubjects = subjects.map((sub) => ({
//           label: sub,
//           value: sub,
//         }));

//         setSubjectOptions(formattedSubjects);
//       } catch (err) {
//         console.error("Error fetching subjects:", err);
//       }
//     };
//     fetchSubjects();
//   }, [selectedStd]);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50 backdrop-blur-sm">
//       <div className="bg-white rounded-md p-6 w-full max-w-md shadow-lg">
//         <h3 className="text-xl font-semibold mb-4 text-center">
//           Proxy Creation
//         </h3>

//         {/* Standard + Division */}
//         <div className="flex gap-4 mb-4">
//           <div className="w-1/2">
//             <label className="block text-sm font-medium text-gray-700">
//               Standard
//             </label>
//             <select
//               value={standard}
//               onChange={(e) => setStandard(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//             >
//               <option value="">Select Standard</option>
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//               <option value="4">4</option>
//               <option value="5">5</option>
//               <option value="6">6</option>
//               <option value="7">7</option>
//               <option value="8">8</option>
//               <option value="9">9</option>
//               <option value="10">10</option>
//             </select>
//           </div>
//           <div className="w-1/2">
//             <label className="block text-sm font-medium text-gray-700">
//               Division
//             </label>
//             <select
//               value={division}
//               onChange={(e) => setDivision(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//             >
//               <option value="">Select Division</option>
//               <option value="A">A</option>
//               <option value="B">B</option>
//               <option value="C">C</option>
//             </select>
//           </div>
//         </div>

//         {/* Date */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Date
//           </label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         {/* Lec No */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Lec No
//           </label>
//           <input
//             type="number"
//             value={lecNo || ""} // ensures controlled input
//             onChange={(e) => setLecNo(Number(e.target.value))} // store as Number
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         {/* Subject */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Subject
//           </label>
//           <select
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           >
//             <option value="">Select Subject</option>
//             {subjectOptionsState.map((s, idx) => (
//               <option key={idx} value={s.value || s}>
//                 {s.label || s}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* From Teacher */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             From Teacher
//           </label>
//           <select
//             value={fromTeacher}
//             onChange={(e) => setFromTeacher(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           >
//             <option value="">Select Teacher</option>
//             {teacherOptions.map((t, idx) => (
//               <option key={idx} value={t.value || t}>
//                 {t.label || t}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* To Teacher */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             To Teacher
//           </label>
//           <select
//             value={toTeacher}
//             onChange={(e) => setToTeacher(e.target.value)}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
//           >
//             <option value="">Select Teacher</option>
//             {teacherOptions.map((t, idx) => (
//               <option key={idx} value={t.value || t}>
//                 {t.label || t}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end gap-4 mt-6">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handlePublish}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Publish
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PublishProxyModal;


import React, { useState, useEffect } from "react";
import axios from "axios";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

const PublishProxyModal = ({
  isOpen,
  onClose,
  standard,
  setStandard,
  division,
  setDivision,
  date,
  setDate,
  lecNo,
  setLecNo,
  subject,
  setSubject,
  fromTeacher,
  setFromTeacher,
  toTeacher,
  setToTeacher,
  teacherOptions,
    // --- PROPS FOR FILTERED DROPDOWNS ---
    stdOptions, // Array of standards from allotments
    divisionMap, // Map for all available divisions per standard
    divOptions, // Division options for the currently selected standard
    allotmentList, // Full list of allocations to filter subjects
    fullTimetableData, // NEW: Full data used for client-side conflict check
}) => {
  if (!isOpen) return null;

  const AUTH_HEADER = `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`;
  
  const [subjectOptionsState, setSubjectOptionsState] = useState([]);
    
    // --- CONFLICT STATES ---
    const [availableProxyTeachers, setAvailableProxyTeachers] = useState(teacherOptions);
    const [isConflict, setIsConflict] = useState(false);
    const [isCheckingConflict, setIsCheckingConflict] = useState(false);
    // ----------------------

    // --- Standard/Division/Subject logic remains unchanged ---
    useEffect(() => {
        if (isOpen && !standard && stdOptions.length > 0) {
            setStandard(stdOptions[0]);
        }
        
        if (!isOpen) {
            setDivision("");
            // Reset conflict states when closing
            setIsConflict(false);
            setIsCheckingConflict(false);
        }
        
    }, [isOpen, standard, stdOptions, setStandard]);

    useEffect(() => {
        if (!standard || !division) {
            setSubjectOptionsState([]);
            setSubject("");
            return;
        }
        const matchingAllotments = allotmentList.filter(alloc => 
            alloc.standards?.[0] === standard && alloc.divisions?.[0] === division
        );
        const subjectsSet = new Set();
        matchingAllotments.forEach(alloc => {
            alloc.subjects?.forEach(sub => {
                if (sub) subjectsSet.add(sub);
            });
        });
        const uniqueSubjects = Array.from(subjectsSet).sort();
        setSubjectOptionsState(uniqueSubjects.map(sub => ({ label: sub, value: sub })));
        if (subject && !uniqueSubjects.includes(subject)) {
            setSubject("");
        }
    }, [standard, division, allotmentList, subject, setSubject]);
    // --- End Standard/Division/Subject logic ---


    // --- CRITICAL FIX: LIVE DROPDOWN FILTERING AND CONFLICT CHECK (Client-side) ---
    useEffect(() => {
        // Run check only if date, lecture number, and timetable data are available
        if (!date || !lecNo || fullTimetableData.length === 0 || !teacherOptions.length) {
            setAvailableProxyTeachers(teacherOptions); // Reset to full list
            setIsConflict(false);
            return;
        }

        const checkAvailabilityAndFilter = () => {
            setIsCheckingConflict(true);
            setIsConflict(false);
            
            const availableTeachers = [];
            const busyTeacherIds = new Set();
            const requestedLecNo = parseInt(lecNo);

            const selectedDate = new Date(date);
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const dayName = days[selectedDate.getUTCDay()]; 

            // --- 1. Identify ALL busy teachers for the specific time slot ---
            fullTimetableData.forEach(classTimetable => {
                // Find the schedule for the required day
                const daySchedule = classTimetable.timetable.find(tt => tt.day === dayName);

                if (daySchedule) {
                    // Find the specific period slot
                    const period = daySchedule.periods.find(p => p.periodNumber === requestedLecNo);
                    
                    // If a subject is scheduled and a teacher ID is present
                    if (period && period.teacher && period.subject && period.subject !== 'BREAK' && period.subject !== 'LUNCH' && period.subject !== 'FREE') {
                        busyTeacherIds.add(period.teacher); // Use the raw teacher ID from the timetable data
                    }
                }
            });

            // --- 2. Filter available teachers ---
            teacherOptions.forEach(teacher => {
                if (!busyTeacherIds.has(teacher.value)) {
                    availableTeachers.push(teacher);
                }
            });
            
            // --- 3. Update Filtered Dropdown ---
            setAvailableProxyTeachers(availableTeachers);
            
            // --- 4. Check for Conflict on currently selected To Teacher ---
            if (toTeacher && busyTeacherIds.has(toTeacher)) {
                setIsConflict(true);
            } else {
                setIsConflict(false);
            }
            
            setIsCheckingConflict(false);
        };

        // Delay the check slightly to wait for the user to finish typing Lec No/Date
        const timeoutId = setTimeout(checkAvailabilityAndFilter, 300);
        return () => clearTimeout(timeoutId); // Cleanup previous checks

    }, [date, lecNo, fullTimetableData, teacherOptions.length, toTeacher]);
    // --- END LIVE FILTERING FIX ---


    // --- Validation Check ---
    const validateInputs = () => {
        if (!standard || !division || !date || !lecNo || !subject || !fromTeacher || !toTeacher) {
            alert("Please fill in all required fields (Standard, Division, Date, Lecture No, Subject, From Teacher, To Teacher).");
            return false;
        }
        if (fromTeacher === toTeacher) {
            alert("The 'From Teacher' and 'To Teacher' must be different.");
            return false;
        }
        if (isConflict) {
            alert("Cannot publish: The selected 'To Teacher' is already scheduled for a class at this time.");
            return false;
        }
        return true;
    };
  
  const handlePublish = async () => {
    if (!validateInputs()) {
      return;
    }
    
    try {
      const payload = {
        standard,
        division,
        date,
        lecno: lecNo,
        subject,
        fromteacher: fromTeacher,
        toteacher: toTeacher,
      };

      await axios.post(`${API_BASE_URL}api/add-proxy`, payload, {
        headers: { auth: AUTH_HEADER },
      });
      alert("Proxy published successfully");
      onClose(true); 
    } catch (error) {
      console.error("Error publishing proxy:", error);
      alert(`Failed to publish proxy ❌. Error: ${error.response?.data?.error || 'Server error'}`);
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50"
style={{ 
                // Using RGBA to create the dimming effect without blurring the backdrop
                backgroundColor: 'rgba(50, 50, 50, 0.5)', 
            }}
>
      <div className="bg-white rounded-md p-6 w-full max-w-md shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Proxy Creation
        </h3>

        {/* Standard + Division */}
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Standard <span className="text-red-500">*</span>
            </label>
            <select
              value={standard}
              onChange={(e) => {
                setStandard(e.target.value);
                setDivision(''); // Reset division when standard changes
                setSubject(''); // Reset subject when standard changes
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Standard</option>
              {stdOptions.map((std) => (
                <option key={std} value={std}>
                  {std}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Division <span className="text-red-500">*</span>
            </label>
            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled={!standard || divOptions.length === 0}
            >
              <option value="">
                    {!standard ? "Select Standard first" : (divOptions.length === 0 ? "No Divisions Allotted" : "Select Division")}
                </option>
              {divOptions.map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Lec No */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Lec No <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={lecNo || ""}
            onChange={(e) => setLecNo(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Subject */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Subject <span className="text-red-500">*</span>
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            disabled={!standard || !division || subjectOptionsState.length === 0}
          >
            <option value="">
              {
                !standard || !division 
                ? "Select Standard and Division first" 
                : (subjectOptionsState.length > 0 ? "Select Subject" : "No Subjects Allotted for this Std/Div")
              }
            </option>
            {subjectOptionsState.map((s, idx) => (
              <option key={idx} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* From Teacher */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            From Teacher <span className="text-red-500">*</span>
          </label>
          <select
            value={fromTeacher}
            onChange={(e) => setFromTeacher(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Teacher</option>
            {teacherOptions.map((t, idx) => (
              <option key={idx} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* To Teacher (Proxy) with Conflict Check */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            To Teacher (Proxy) <span className="text-red-500">*</span>
          </label>
          <select
            value={toTeacher}
            onChange={(e) => setToTeacher(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Teacher</option>
            {availableProxyTeachers.map((t, idx) => (
              <option key={idx} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
            {isCheckingConflict && (
                <p className="text-sm text-yellow-600 mt-1">Checking availability...</p>
            )}
            {isConflict && (
                <p className="text-sm text-red-600 font-semibold mt-1">
                    ⚠️ CONFLICT: Teacher is busy at Lec No. {lecNo} on this date.
                </p>
            )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handlePublish}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={!standard || !division || !date || !lecNo || !subject || !fromTeacher || !toTeacher || isConflict || isCheckingConflict}
          >
            {isCheckingConflict ? 'Checking...' : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishProxyModal;