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
    // --- NEW PROPS FOR FILTERED DROPDOWNS ---
    stdOptions, // Array of standards with timetables
    divisionMap, // Map: { "5": ["A", "B", "C"] }
    divOptions // Division options for the currently selected standard (passed from parent)
}) => {
  if (!isOpen) return null;

  const AUTH_HEADER = `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`;
  
  const [subjectOptionsState, setSubjectOptionsState] = useState([]);

    // --- FIX 1: Set Default Standard (if available) when modal opens ---
    useEffect(() => {
        if (isOpen && !standard && stdOptions.length > 0) {
             // Set default standard to the first available one 
            setStandard(stdOptions[0]);
        }
    }, [isOpen, standard, stdOptions, setStandard]);

    // --- SUBJECT FETCH LOGIC (FIX: Improved handling of 404/No Subjects) ---
    useEffect(() => {
        if (!standard) {
            setSubjectOptionsState([]);
            setSubject("");
            return;
        }
        
        const fetchSubjects = async () => {
            try {
                if (!standard || standard === "") return;

                const res = await axios.get(
                    `${API_BASE_URL}api/subjects/${standard}`, // Use 'standard' state
                    {
                        headers: { auth: AUTH_HEADER },
                    }
                );

                // Safely extract subjects from the expected backend structure
                const dataArray = Array.isArray(res.data) ? res.data : (res.data.subjects || []);
                const subjects = dataArray[0]?.subjectname || []; 

                const formattedSubjects = subjects.map((sub) => ({
                    label: sub,
                    value: sub,
                }));

                setSubjectOptionsState(formattedSubjects);

                // If the currently selected subject is no longer in the list, clear it
                if (subject && !subjects.includes(subject)) {
                    setSubject("");
                }
                
            } catch (err) {
                console.error(`Error fetching subjects for Standard ${standard}. Response Status: ${err.response?.status || 'Network Error'}`, err);
                // Handle 404 by resetting options, showing 'No Subjects Available'
                setSubjectOptionsState([]);
                setSubject("");
            }
        };
        fetchSubjects();
        
        // Cleanup: Clear subjects when standard changes
        return () => {
            setSubjectOptionsState([]);
            setSubject("");
        };
        
    }, [standard, setSubject]);

    // --- Validation Check (Mandatory fields and teacher conflict) ---
    const validateInputs = () => {
        if (!standard || !division || !date || !lecNo || !subject || !fromTeacher || !toTeacher) {
            alert("Please fill in all required fields (Standard, Division, Date, Lecture No, Subject, From Teacher, To Teacher).");
            return false;
        }
        if (fromTeacher === toTeacher) {
            alert("The 'From Teacher' and 'To Teacher' must be different.");
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
      alert("Proxy published successfully ✅");
      onClose(true); // Pass true status to trigger parent refresh
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
              disabled={!standard} // Disable until standard is selected
            >
              <option value="">Select Division</option>
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
            disabled={!standard || subjectOptionsState.length === 0}
          >
            <option value="">
              {
                !standard 
                ? "Select Standard first" 
                : (subjectOptionsState.length > 0 ? "Select Subject" : "No Subjects Available")
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

        {/* To Teacher */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            To Teacher <span className="text-red-500">*</span>
          </label>
          <select
            value={toTeacher}
            onChange={(e) => setToTeacher(e.target.value)}
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
            disabled={!standard || !division || !date || !lecNo || !subject || !fromTeacher || !toTeacher}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishProxyModal;