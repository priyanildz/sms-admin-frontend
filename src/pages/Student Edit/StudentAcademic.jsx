// import React, { useState } from 'react';

// export default function StudentAcademic() {
//     const [std, setStd] = useState('');
//     const [div, setDiv] = useState('');
//     const [isStudentActive, setIsStudentActive] = useState(true);

//     const handleToggleStatus = () => {
//         setIsStudentActive(!isStudentActive);
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 p-8">
//                         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
//                 <div>
//                     <h2 className="text-2xl font-bold text-gray-800 mb-2">Students Overview</h2>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                     <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
//                         AY 2025-2026
//                     </div>
//                     <div className="flex items-center space-x-3">
//                         <span className={`text-sm font-medium ${isStudentActive ? 'text-green-700' : 'text-red-700'}`}>
//                             {isStudentActive ? 'Active' : 'Inactive'}
//                         </span>
//                         <button
//                             onClick={handleToggleStatus}
//                             className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isStudentActive ? 'bg-green-500' : 'bg-gray-300'
//                                 }`}
//                             role="switch"
//                             aria-checked={isStudentActive}
//                             aria-label="Toggle student status"
//                         >
//                             <span
//                                 className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${isStudentActive ? 'translate-x-6' : 'translate-x-1'
//                                     }`}
//                             />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             <div className="max-w-4xl mx-auto">
//                 {/* Header */}
//                 <div className="text-center mb-8">
//                     <h1 className="text-2xl font-semibold text-gray-800">Academic Management</h1>
//                 </div>

//                 {/* Input Fields */}
//                 <div className="flex gap-8 mb-8 justify-center items-center">
//                     <div className="flex items-center gap-3">
//                         <label className="text-gray-700 font-medium">Std</label>
//                         <input
//                             type="text"
//                             value={std}
//                             onChange={(e) => setStd(e.target.value)}
//                             className="border border-gray-400 px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                     </div>

//                     <div className="flex items-center gap-3">
//                         <label className="text-gray-700 font-medium">Div</label>
//                         <input
//                             type="text"
//                             value={div}
//                             onChange={(e) => setDiv(e.target.value)}
//                             className="border border-gray-400 px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         />
//                     </div>
//                 </div>

//                 {/* Subjects, Assigned Teachers Button */}
//                 <div className="text-center mb-8">
//                     <button className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-6 py-2 rounded-full border border-blue-300 transition-colors duration-200">
//                         Subjects, Assigned Teachers
//                     </button>
//                 </div>

//                 {/* Table */}
//                 <div className="max-w-2xl mx-auto">
//                     <table className="w-full border-collapse">
//                         <thead>
//                             <tr>
//                                 <th className="border-2 border-blue-500 bg-white px-4 py-3 text-left font-semibold text-gray-800 w-1/2">
//                                     Subjects
//                                 </th>
//                                 <th className="border-2 border-blue-500 bg-white px-4 py-3 text-left font-semibold text-gray-800 w-1/2">
//                                     Assigned Teachers
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {/* Empty rows for demonstration */}
//                             {Array.from({ length: 5 }).map((_, index) => (
//                                 <tr key={index}>
//                                     <td className="border border-blue-500 px-4 py-4 bg-white">
//                                         {/* Empty cell */}
//                                     </td>
//                                     <td className="border border-blue-500 px-4 py-4 bg-white">
//                                         {/* Empty cell */}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }








// import React, { useState } from 'react';
// import axios from 'axios'; 

// // --- NEW: Arrays for your dropdowns ---
// const stdOptions = Array.from({ length: 10 }, (_, i) => i + 1); // Creates [1, 2, 3... 10]
// const divOptions = ['A', 'B', 'C', 'D', 'E']; // As you requested

// const AUTH_HEADER = 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=';

// export default function StudentAcademic() {
//     // Default to empty string to match the "Select" option
//     const [std, setStd] = useState(''); 
//     const [div, setDiv] = useState('');
//     const [isStudentActive, setIsStudentActive] = useState(true);
//     const [academicBlocks, setAcademicBlocks] = useState([]);

//     const handleToggleStatus = () => {
//         setIsStudentActive(!isStudentActive);
//     };

//     const getSubjectsAndTeachers = async () => {
//         // --- NEW: Validation check ---
//         if (!std || !div) {
//             alert("Please select both a Standard and a Division.");
//             return; // Stop the function
//         }

//         try {
//             console.log("Fetching with state:", { std, div });

//             const response = await axios.get(
//                 'http://localhost:5000/api/academic-blocks',
//                 {
//                     headers: {
//                         'auth': AUTH_HEADER 
//                     }
//                 }
//             );
            
//             console.log("Raw data from API:", response.data);

//             const filteredData = response.data.filter(block => {
//                 // This logic is now much safer since dropdowns provide clean data
//                 const isStdMatch = String(block.standard) === std;
//                 const isDivMatch = String(block.division) === div;

//                 console.log(`Comparing DB item: (Std: ${block.standard}, Div: ${block.division}) | Match? ${isStdMatch && isDivMatch}`);
//                 return isStdMatch && isDivMatch;
//             });

//             console.log("Filtered Data:", filteredData);
//             setAcademicBlocks(filteredData);

//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 p-8">
//             {/* ... (Top header section is unchanged) ... */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
//                 <div>
//                     <h2 className="text-2xl font-bold text-gray-800 mb-2">Students Overview</h2>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                     <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
//                         AY 2025-2026
//                     </div>
//                     <div className="flex items-center space-x-3">
//                         <span className={`text-sm font-medium ${isStudentActive ? 'text-green-700' : 'text-red-700'}`}>
//                             {isStudentActive ? 'Active' : 'Inactive'}
//                         </span>
//                         <button
//                             onClick={handleToggleStatus}
//                             className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isStudentActive ? 'bg-green-500' : 'bg-gray-300'
//                                 }`}
//                             role="switch"
//                             aria-checked={isStudentActive}
//                             aria-label="Toggle student status"
//                         >
//                             <span
//                                 className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${isStudentActive ? 'translate-x-6' : 'translate-x-1'
//                                     }`}
//                             />
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <div className="max-w-4xl mx-auto">
//                 <div className="text-center mb-8">
//                     <h1 className="text-2xl font-semibold text-gray-800">Academic Management</h1>
//                 </div>

//                 {/* --- UPDATED: Inputs replaced with Dropdowns --- */}
//                 <div className="flex gap-8 mb-8 justify-center items-center">
//                     <div className="flex items-center gap-3">
//                         <label className="text-gray-700 font-medium">Std</label>
//                         <select
//                             value={std}
//                             onChange={(e) => setStd(e.target.value)}
//                             className="border border-gray-400 px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         >
//                             <option value="">Select Std</option>
//                             {stdOptions.map(option => (
//                                 <option key={option} value={option}>{option}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="flex items-center gap-3">
//                         <label className="text-gray-700 font-medium">Div</label>
//                         <select
//                             value={div}
//                             onChange={(e) => setDiv(e.target.value)}
//                             className="border border-gray-400 px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         >
//                             <option value="">Select Div</option>
//                             {divOptions.map(option => (
//                                 <option key={option} value={option}>{option}</option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>

//                 {/* ... (Button is unchanged) ... */}
//                 <div className="text-center mb-8">
//                     <button
//                         onClick={getSubjectsAndTeachers}
//                         className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-6 py-2 rounded-full border border-blue-300 transition-colors duration-200"
//                     >
//                         Subjects, Assigned Teachers
//                     </button>
//                 </div>

//                 {/* ... (Table is unchanged) ... */}
//                 <div className="max-w-2xl mx-auto">
//                     <table className="w-full border-collapse">
//                         <thead>
//                             <tr>
//                                 <th className="border-2 border-blue-500 bg-white px-4 py-3 text-left font-semibold text-gray-800 w-1/2">
//                                     Subjects
//                                 </th>
//                                 <th className="border-2 border-blue-500 bg-white px-4 py-3 text-left font-semibold text-gray-800 w-1/2">
//                                     Assigned Teachers
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {academicBlocks.length === 0 ? (
//                                 <tr>
//                                     <td colSpan="2" className="border border-blue-500 px-4 py-4 bg-white text-center text-gray-500">
//                                         No data found.
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 academicBlocks.map((block) => (
//                                     <tr key={block._id}>
//                                         <td className="border border-blue-500 px-4 py-4 bg-white">
//                                             {block.blockNo}
//                                         </td>
//                                         <td className="border border-blue-500 px-4 py-4 bg.white">
//                                             {block.teacherAssigned}
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }













// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// // --- Arrays for dropdowns (only used if no student prop) ---
// const stdOptions = Array.from({ length: 10 }, (_, i) => i + 1);
// const divOptions = ['A', 'B', 'C', 'D', 'E']; // Or A-F as needed

// // --- Auth Header ---
// const AUTH_HEADER = 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=';

// // --- Accept 'studentid' and 'student' props ---
// export default function StudentAcademic({ studentid, student }) {
//     // State for manual dropdowns
//     const [std, setStd] = useState('');
//     const [div, setDiv] = useState('');
//     const [isStudentActive, setIsStudentActive] = useState(true); // Default or fetch actual status later if needed
//     const [academicBlocks, setAcademicBlocks] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);

//     // --- Function to fetch academic blocks ---
//     const fetchAcademicBlocks = async (stdToFetch, divToFetch) => {
//         if (!student && (!stdToFetch || !divToFetch)) {
//              alert("Please select both a Standard and a Division.");
//              return;
//         }
//         setIsLoading(true);
//         setAcademicBlocks([]);
//         try {
//             console.log("Fetching academic blocks for:", { std: stdToFetch, div: divToFetch });
//             const response = await axios.get(
//                 'http://localhost:5000/api/academic-blocks',
//                 { headers: { 'auth': AUTH_HEADER } }
//             );
//             console.log("Raw data from API:", response.data);
//             const filteredData = response.data.filter(block => {
//                 const isStdMatch = String(block.standard) === String(stdToFetch);
//                 const isDivMatch = String(block.division) === String(divToFetch);
//                 console.log(`Comparing DB item: (Std: ${block.standard}, Div: ${block.division}) | Match? ${isStdMatch && isDivMatch}`);
//                 return isStdMatch && isDivMatch;
//             });
//             console.log("Filtered Data:", filteredData);
//             setAcademicBlocks(filteredData);
//         } catch (error) {
//             console.error("Error fetching academic data:", error);
//             setAcademicBlocks([]);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // --- useEffect to fetch data automatically if 'student' prop exists ---
//     useEffect(() => {
//         if (student && student.std && student.div) {
//             console.log("Student prop found in Academic, fetching automatically:", student);
//             fetchAcademicBlocks(student.std, student.div);
//         } else {
//              console.log("No student prop in Academic, waiting for manual fetch.");
//              setAcademicBlocks([]);
//         }
//     }, [student]);

//     // --- Handler for the manual fetch button ---
//     const handleManualFetch = () => {
//         fetchAcademicBlocks(std, div);
//     };

//     // --- Toggle status handler (remains the same) ---
//     const handleToggleStatus = () => {
//         setIsStudentActive(!isStudentActive);
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 p-8">
//             {/* Header section (unchanged) */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
//                 <div>
//                     <h2 className="text-2xl font-bold text-gray-800 mb-2">Students Overview</h2>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                     <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
//                         AY 2025-2026
//                     </div>
//                     <div className="flex items-center space-x-3">
//                          <span className={`text-sm font-medium ${isStudentActive ? 'text-green-700' : 'text-red-700'}`}>
//                             {isStudentActive ? 'Active' : 'Inactive'}
//                         </span>
//                         <button
//                             onClick={handleToggleStatus}
//                             className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isStudentActive ? 'bg-green-500' : 'bg-gray-300'}`}
//                             role="switch"
//                             aria-checked={isStudentActive}
//                             aria-label="Toggle student status"
//                         >
//                             <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${isStudentActive ? 'translate-x-6' : 'translate-x-1'}`}/>
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <div className="max-w-4xl mx-auto">
//                 <div className="text-center mb-8">
//                     <h1 className="text-2xl font-semibold text-gray-800">Academic Management</h1>
//                 </div>

//                 {/* --- Conditionally show dropdowns or student info --- */}
//                 {!student ? (
//                     // --- Show dropdowns and button if NO student prop ---
//                     <>
//                         <div className="flex gap-8 mb-8 justify-center items-center">
//                             {/* Std Dropdown */}
//                              <div className="flex items-center gap-3">
//                                 <label className="text-gray-700 font-medium">Std</label>
//                                 <select
//                                     value={std}
//                                     onChange={(e) => setStd(e.target.value)}
//                                     className="border border-gray-400 px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded" // Added rounded
//                                 >
//                                     <option value="">Select Std</option>
//                                     {stdOptions.map(option => (
//                                         <option key={option} value={option}>{option}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                             {/* Div Dropdown */}
//                             <div className="flex items-center gap-3">
//                                 <label className="text-gray-700 font-medium">Div</label>
//                                 <select
//                                     value={div}
//                                     onChange={(e) => setDiv(e.target.value)}
//                                     className="border border-gray-400 px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded" // Added rounded
//                                 >
//                                     <option value="">Select Div</option>
//                                     {divOptions.map(option => (
//                                         <option key={option} value={option}>{option}</option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>
//                         {/* Fetch Button */}
//                         <div className="text-center mb-8">
//                             <button
//                                 onClick={handleManualFetch}
//                                 className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-6 py-2 rounded-full border border-blue-300 transition-colors duration-200"
//                                 disabled={isLoading}
//                             >
//                                 {isLoading ? 'Fetching...' : 'Subjects, Assigned Teachers'}
//                             </button>
//                         </div>
//                     </>
//                 ) : (
//                     // --- Show student info in boxes if student prop IS present ---
//                     <div className="flex flex-col items-center gap-4 mb-8"> {/* Use flex-col for centering */}
//                         {/* Student Name Display */}
//                         <div className="flex items-center gap-3 w-full max-w-sm"> {/* Limit width */}
//                             <label className="text-gray-700 font-medium w-20 text-right">Name</label>
//                             <div className="flex-1 border border-gray-300 bg-gray-100 px-3 py-2 rounded text-gray-700">
//                                 {student.name || 'N/A'}
//                             </div>
//                         </div>
//                         {/* Std and Div Display */}
//                         <div className="flex gap-8 justify-center items-center w-full max-w-sm"> {/* Limit width */}
//                              <div className="flex items-center gap-3 flex-1">
//                                 <label className="text-gray-700 font-medium">Std</label>
//                                 <div className="border border-gray-300 bg-gray-100 px-3 py-2 w-full rounded text-gray-700"> {/* Use w-full */}
//                                     {student.std || 'N/A'}
//                                 </div>
//                             </div>
//                              <div className="flex items-center gap-3 flex-1">
//                                 <label className="text-gray-700 font-medium">Div</label>
//                                 <div className="border border-gray-300 bg-gray-100 px-3 py-2 w-full rounded text-gray-700"> {/* Use w-full */}
//                                     {student.div || 'N/A'}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* --- Table --- */}
//                 <div className="max-w-2xl mx-auto">
//                     {/* ... (table structure remains the same) ... */}
//                     <table className="w-full border-collapse">
//                         <thead>
//                             <tr>
//                                 <th className="border-2 border-blue-500 bg-white px-4 py-3 text-left font-semibold text-gray-800 w-1/2">
//                                     Subjects {/* Corresponds to blockNo */}
//                                 </th>
//                                 <th className="border-2 border-blue-500 bg-white px-4 py-3 text-left font-semibold text-gray-800 w-1/2">
//                                     Assigned Teachers
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {isLoading ? (
//                                 <tr>
//                                     <td colSpan="2" className="border border-blue-500 px-4 py-4 bg-white text-center text-gray-500">
//                                         Loading academic data...
//                                     </td>
//                                 </tr>
//                             ) : academicBlocks.length === 0 ? (
//                                 <tr>
//                                     <td colSpan="2" className="border border-blue-500 px-4 py-4 bg-white text-center text-gray-500">
//                                         No academic data found for this selection.
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 academicBlocks.map((block) => (
//                                     <tr key={block._id}>
//                                         <td className="border border-blue-500 px-4 py-4 bg-white">
//                                             {block.blockNo}
//                                         </td>
//                                         <td className="border border-blue-500 px-4 py-4 bg-white">
//                                             {block.teacherAssigned}
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from '../../config';


// --- Arrays for dropdowns (only used if no student prop) ---
const stdOptions = Array.from({ length: 10 }, (_, i) => i + 1);
const divOptions = ['A', 'B', 'C', 'D', 'E']; // Or A-F as needed

// --- Auth Header ---
const AUTH_HEADER = 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=';

// --- Accept 'studentid' and 'student' props ---
export default function StudentAcademic({ studentid, student }) {
    // State for manual dropdowns
    const [std, setStd] = useState('');
    const [div, setDiv] = useState('');
    const [isStudentActive, setIsStudentActive] = useState(true); // Default or fetch actual status later if needed
    const [academicBlocks, setAcademicBlocks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // --- Function to fetch academic blocks ---
    const fetchAcademicBlocks = async (stdToFetch, divToFetch) => {
        if (!student && (!stdToFetch || !divToFetch)) {
             alert("Please select both a Standard and a Division.");
             return;
        }
        setIsLoading(true);
        setAcademicBlocks([]);
        try {
            console.log("Fetching academic blocks for:", { std: stdToFetch, div: divToFetch });
            // FIX: Using imported API_BASE_URL
            const response = await axios.get(
                `${API_BASE_URL}api/academic-blocks`,
                { headers: { 'auth': AUTH_HEADER } }
            );
            console.log("Raw data from API:", response.data);
            const filteredData = response.data.filter(block => {
                const isStdMatch = String(block.standard) === String(stdToFetch);
                const isDivMatch = String(block.division) === String(divToFetch);
                console.log(`Comparing DB item: (Std: ${block.standard}, Div: ${block.division}) | Match? ${isStdMatch && isDivMatch}`);
                return isStdMatch && isDivMatch;
            });
            console.log("Filtered Data:", filteredData);
            setAcademicBlocks(filteredData);
        } catch (error) {
            console.error("Error fetching academic data:", error);
            setAcademicBlocks([]);
        } finally {
            setIsLoading(false);
        }
    };

    // --- useEffect to fetch data automatically if 'student' prop exists ---
    useEffect(() => {
        if (student && student.std && student.div) {
            console.log("Student prop found in Academic, fetching automatically:", student);
            fetchAcademicBlocks(student.std, student.div);
        } else {
             console.log("No student prop in Academic, waiting for manual fetch.");
             setAcademicBlocks([]);
        }
    }, [student]);

    // --- Handler for the manual fetch button ---
    const handleManualFetch = () => {
        fetchAcademicBlocks(std, div);
    };

    // --- Toggle status handler (remains the same) ---
    const handleToggleStatus = () => {
        setIsStudentActive(!isStudentActive);
    };

    return (
        <div className="min-h-screen">
            {/* Header section (unchanged) */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
                <div>
{/*                     <h2 className="text-2xl font-bold text-gray-800 mb-2">Students Management</h2> */}
                </div>
                <div className="flex items-center space-x-4">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
                        AY 2025-2026
                    </div>
                    <div className="flex items-center space-x-3">
                         <span className={`text-sm font-medium ${isStudentActive ? 'text-green-700' : 'text-red-700'}`}>
                            {isStudentActive ? 'Active' : 'Inactive'}
                        </span>
                        <button
                            onClick={handleToggleStatus}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isStudentActive ? 'bg-green-500' : 'bg-gray-300'}`}
                            role="switch"
                            aria-checked={isStudentActive}
                            aria-label="Toggle student status"
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${isStudentActive ? 'translate-x-6' : 'translate-x-1'}`}/>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold text-gray-800">Academic Management</h1>
                </div>

                {/* --- Conditionally show dropdowns or student info --- */}
                {!student ? (
                    // --- Show dropdowns and button if NO student prop ---
                    <>
                        <div className="flex gap-8 mb-8 justify-center items-center">
                            {/* Std Dropdown */}
                             <div className="flex items-center gap-3">
                                <label className="text-gray-700 font-medium">Std</label>
                                <select
                                    value={std}
                                    onChange={(e) => setStd(e.target.value)}
                                    className="border border-gray-400 px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded" // Added rounded
                                >
                                    <option value="">Select Std</option>
                                    {stdOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Div Dropdown */}
                            <div className="flex items-center gap-3">
                                <label className="text-gray-700 font-medium">Div</label>
                                <select
                                    value={div}
                                    onChange={(e) => setDiv(e.target.value)}
                                    className="border border-gray-400 px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded" // Added rounded
                                >
                                    <option value="">Select Div</option>
                                    {divOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {/* Fetch Button */}
                        <div className="text-center mb-8">
                            <button
                                onClick={handleManualFetch}
                                className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-6 py-2 rounded-full border border-blue-300 transition-colors duration-200"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Fetching...' : 'Subjects, Assigned Teachers'}
                            </button>
                        </div>
                    </>
                ) : (
                    // --- Show student info in boxes if student prop IS present ---
                    <div className="flex flex-col items-center gap-4 mb-8"> {/* Use flex-col for centering */}
                        {/* Student Name Display */}
                        <div className="flex items-center gap-3 w-full max-w-sm"> {/* Limit width */}
                            <label className="text-gray-700 font-medium w-20 text-right">Name</label>
                            <div className="flex-1 border border-gray-300 bg-gray-100 px-3 py-2 rounded text-gray-700">
                                {student.name || 'N/A'}
                            </div>
                        </div>
                        {/* Std and Div Display */}
                        <div className="flex gap-8 justify-center items-center w-full max-w-sm"> {/* Limit width */}
                             <div className="flex items-center gap-3 flex-1">
                                <label className="text-gray-700 font-medium">Std</label>
                                <div className="border border-gray-300 bg-gray-100 px-3 py-2 w-full rounded text-gray-700"> {/* Use w-full */}
                                    {student.std || 'N/A'}
                                </div>
                            </div>
                             <div className="flex items-center gap-3 flex-1">
                                <label className="text-gray-700 font-medium">Div</label>
                                <div className="border border-gray-300 bg-gray-100 px-3 py-2 w-full rounded text-gray-700"> {/* Use w-full */}
                                    {student.div || 'N/A'}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- Table --- */}
                <div className="max-w-2xl mx-auto">
                    {/* ... (table structure remains the same) ... */}
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border-2 border-blue-500 bg-white px-4 py-3 text-left font-semibold text-gray-800 w-1/2">
                                    Subjects {/* Corresponds to blockNo */}
                                </th>
                                <th className="border-2 border-blue-500 bg-white px-4 py-3 text-left font-semibold text-gray-800 w-1/2">
                                    Assigned Teachers
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="2" className="border border-blue-500 px-4 py-4 bg-white text-center text-gray-500">
                                        Loading academic data...
                                    </td>
                                </tr>
                            ) : academicBlocks.length === 0 ? (
                                <tr>
                                    <td colSpan="2" className="border border-blue-500 px-4 py-4 bg-white text-center text-gray-500">
                                        No academic data found for this selection.
                                    </td>
                                </tr>
                            ) : (
                                academicBlocks.map((block) => (
                                    <tr key={block._id}>
                                        <td className="border border-blue-500 px-4 py-4 bg-white">
                                            {block.blockNo}
                                        </td>
                                        <td className="border border-blue-500 px-4 py-4 bg-white">
                                            {block.teacherAssigned}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}