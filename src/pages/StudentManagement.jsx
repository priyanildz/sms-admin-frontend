// import React, { useEffect, useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import { FaSearch } from "react-icons/fa"; 
// import { Link } from "react-router-dom";
// import axios from "axios";

// export default function StudentManagement() {
//   const [studentList, setStudentList] = useState([]);
//   const [lcList, setLCList] = useState([]);
//   const [newStudentList, setNewStudentList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [searchQuery, setSearchQuery] = useState(""); 

//   // Fetch students data from API
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch("http://localhost:5000/api/students", {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setStudentList(Array.isArray(data) ? data : []);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         console.error("Error fetching students:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     const fetchNewStudents = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           "http://localhost:5000/api/newstudent",
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         if (response.status !== 200) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.data;
//         setNewStudentList(Array.isArray(data) ? data : []);
//         console.log("new students ", data);
//         setError(null);
//       } catch (error) {
//         setError(error.message);
//         console.error("Error fetching students:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // for lc students
//     const fetchLCStudents = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           "http://localhost:5000/api/lcstudent",
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         if (response.status !== 200) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.data;
//         setLCList(Array.isArray(data) ? data : []);
//         console.log("lc students ", data);
//         setError(null);
//       } catch (error) {
//         setError(error.message);
//         console.error("Error fetching students:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNewStudents();
//     fetchStudents();
//     fetchLCStudents();
//   }, []);

//   const totalStudents = studentList.length + lcList.length;
//   const newAdmissions = newStudentList.length;
//   const lcStudents = lcList.length;

//   const cards = [
//     {
//       title: "Total Students",
//       count: totalStudents,
//       color: "blue",
//       key: "Total",
//     },
//     {
//       title: "New Admission",
//       count: newAdmissions,
//       color: "green",
//       key: "New Admission",
//     },
//     { title: "LC Students", count: lcStudents, color: "red", key: "LC Students" },
//   ];

//   const combinedAllStudents = [...studentList, ...lcList];

//   const filteredStudents =
//     selectedCard === "Total"
//       ? combinedAllStudents.filter((student) => 
//         student.firstname.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//       : selectedCard === "New Admission"
//         ? newStudentList.filter((student) =>
//           student.firstname.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//         : selectedCard === "LC Students"
//           ? lcList.filter((student) => student.firstname &&
//             student.firstname.toLowerCase().includes(searchQuery.toLowerCase())
//           )
//           : studentList.filter(
//             (s) =>
//               s.status === selectedCard &&
//               s.firstname.toLowerCase().includes(searchQuery.toLowerCase())
//           );
//   console.log(filteredStudents)

//   const getTableHeaders = () => {
//     if (selectedCard === "Total") {
//       return [
//         "Admission no.",
//         "Students Name",
//         "GR No.",
//         "Std",
//         "Div",
//         "Gender",
//         "Contact no.",
//         "Status",
//         "Action" // Single Action column
//       ];
//     } else if (selectedCard === "New Admission") {
//       return [
//         "Admission no.",
//         "Students Name",
//         "Std",
//         "Gender",
//         "Contact no.",
//         "Status",
//       ];
//     } else if (selectedCard === "LC Students") {
//       return [
//         "LC no.",
//         "Students Name",
//         "GR No.",
//         "Std",
//         "Div",
//         "Gender",
//         "Contact no.",
//         "Status",
//       ];
//     }
//     return [];
//   };
//   const capitalizeName = (name) => {
//     return name
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };

//   const renderTableRow = (student, index) => {
//     if (selectedCard === "Total") {
//       return (
//         <tr key={student._id || student.id} className="hover:bg-gray-50">
//           <td className="p-2 border">{student.admission.admissionno}</td>
//           <td className="p-2 border">
//             {capitalizeName(student.firstname)}{" "}
//             {capitalizeName(student.middlename)}{" "}
//             {capitalizeName(student.lastname)}
//           </td>
//           <td className="p-2 border">{student.admission.grno.toUpperCase()}</td>
//           <td className="p-2 border">{student.admission.admissionstd}</td>
//           <td className="p-2 border">
//             {student.admission.admissiondivision.toUpperCase()}
//           </td>
//           <td className="p-2 border">{student.gender}</td>
//           <td className="p-2 border">{student.parent.primarycontact}</td>
//           <td className="p-2 border">
//             {student.status === true || student.status === "Active" ? "Active": "Inactive"} 
//           </td>
//           {/* 🟢 START OF ACTION CELL FIX: Sending 'mode=view' signal */}
//           <td className="p-3 border">
//            {/* View link with query parameter to signal read-only mode */}
//            <Link to={`edit-student/${student._id}?mode=view`} className="text-gray-600 hover:text-blue-800 hover:underline mr-3">
//              View
//            </Link>
//            {/* Edit link (default mode, no parameter needed) */}
//            <Link to={`edit-student/${student._id}`} className="text-blue-600 hover:text-blue-800 hover:underline">
//              Edit
//            </Link>
//           </td>
//           {/* 🟢 END OF ACTION CELL FIX */}

//         </tr>
//       );
//     } else if (selectedCard === "New Admission") {
//       return (
//         <tr key={student.id} className="hover:bg-gray-50">
//           <td className="p-2 border">{student.admission.admissionno}</td>
//           <td className="p-2 border">
//             {student.firstname} {student.middlename} {student.lastname}
//           </td>
//           <td className="p-2 border">{student.admission.admissionstd}</td>
//           <td className="p-2 border">{student.gender}</td>
//           <td className="p-2 border">{student.parent.primarycontact}</td>
//           <td className="p-2 border">
//             {student.status === true || student.status === "Active" ? "Active": "Inactive"}
//           </td>
//         </tr>
//       );
//     } else if (selectedCard === "LC Students") {
//       return (
//         <tr key={student.id} className="hover:bg-gray-50">
//           <td className="p-2 border">{student.admission.admissionno}</td>
//           <td className="p-2 border">
//             {student.firstname} {student.middlename} {student.lastname}
//           </td>
//           <td className="p-2 border">{student.admission.grno}</td>
//           <td className="p-2 border">{student.admission.admissionstd}</td>
//           <td className="p-2 border">{student.admission.admissiondivision}</td>
//           <td className="p-2 border">{student.gender}</td>
//           <td className="p-2 border">{student.parent.primarycontact}</td>
//           <td className="p-2 border">
//             {student.status ? student.status : "Inctive"} 
//           </td>
//         </tr>
//       );
//     }
//     return null;
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <MainLayout>
//         <div className="h-full w-full p-6 bg-gray-50">
//           <div className="flex items-center justify-center h-64">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading students...</p>
//             </div>
//           </div>
//         </div>
//       </MainLayout>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <MainLayout>
//         <div className="h-full w-full p-6 bg-gray-50">
//           <div className="flex items-center justify-center h-64">
//             <div className="text-center">
//               <div className="text-red-500 text-4xl mb-4">⚠️</div>
//               <p className="text-red-600 text-lg font-medium mb-2">
//                 Error loading students
//               </p>
//               <p className="text-gray-600">{error}</p>
//               <button
//                 onClick={() => window.location.reload()}
//                 className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
//               >
//                 Retry
//               </button>
//             </div>
//           </div>
//         </div>
//       </MainLayout>
//     );
//   }

//   return (
//     <MainLayout>
//       <div className="h-full w-full p-6 bg-gray-50">
//         {/* Search bar and Add button */}
//         <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
//           <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-300 w-full sm:w-96 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500">
//             <input
//               type="text"
//               placeholder="Search students..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 pr-2"
//             />
//             <FaSearch className="text-gray-400 ml-2 mr-3" />
//           </div>

//           <Link to="/students-admission">
//             <button className="flex items-center bg-blue-600 text-white font-medium py-2 px-5 rounded-full shadow-md hover:bg-blue-700 transition-all duration-150">
//               + Add
//             </button>
//           </Link>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//           {cards.map((card) => (
//             <div
//               key={card.key}
//               onClick={() => setSelectedCard(card.key)}
//               className={`cursor-pointer bg-white p-6 rounded-xl shadow text-center hover:bg-gray-100 ${selectedCard === card.key ? "ring-2 ring-blue-500" : ""
//                 }`}
//             >
//               <h3 className="text-lg font-semibold text-gray-700">
//                 {card.title}
//               </h3>
//               <p className={`text-2xl font-bold text-${card.color}-600`}>
//                 {card.count}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Table */}
//         {selectedCard && (
//           <div className="bg-white p-6 rounded-xl shadow">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">
//               {selectedCard} Student List
//             </h2>

//             <div className="overflow-x-auto">
//               <table className="w-full border border-gray-300 text-sm text-left">
//                 <thead className="bg-gray-100 text-gray-700 font-semibold">
//                   <tr>
//                     {getTableHeaders().map((heading, index) => (
//                       <th key={index} className="p-2 border">
//                         {heading}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredStudents.map((student, index) =>
//                     renderTableRow(student, index)
//                   )}
//                   {filteredStudents.length === 0 && (
//                     <tr>
//                       <td colSpan="9" className="text-center p-4 text-gray-500">
//                         No students found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//           </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// }


// import React, { useEffect, useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import { FaSearch } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import axios from "axios";

// export default function StudentManagement() {
//   const [studentList, setStudentList] = useState([]);
//   const [lcList, setLCList] = useState([]);
//   const [newStudentList, setNewStudentList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch students data from API
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch("http://localhost:5000/api/students", {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setStudentList(Array.isArray(data) ? data : []);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         console.error("Error fetching students:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     const fetchNewStudents = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           "http://localhost:5000/api/newstudent",
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         if (response.status !== 200) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.data;
//         setNewStudentList(Array.isArray(data) ? data : []);
//         console.log("new students ", data);
//         setError(null);
//       } catch (error) {
//         setError(error.message);
//         console.error("Error fetching students:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // for lc students
//     const fetchLCStudents = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           "http://localhost:5000/api/lcstudent",
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         if (response.status !== 200) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.data;
//         setLCList(Array.isArray(data) ? data : []);
//         console.log("lc students ", data);
//         setError(null);
//       } catch (error) {
//         setError(error.message);
//         console.error("Error fetching students:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNewStudents();
//     fetchStudents();
//     fetchLCStudents();
//   }, []);

//   const totalStudents = studentList.length + lcList.length;
//   const newAdmissions = newStudentList.length;
//   const lcStudents = lcList.length;

//   const cards = [
//     {
//       title: "Total Students",
//       count: totalStudents,
//       color: "blue",
//       key: "Total",
//     },
//     {
//       title: "New Admission",
//       count: newAdmissions,
//       color: "green",
//       key: "New Admission",
//     },
//     { title: "LC Students", count: lcStudents, color: "red", key: "LC Students" },
//   ];

//   const combinedAllStudents = [...studentList, ...lcList];

//   const filteredStudents =
//     selectedCard === "Total"
//       ? combinedAllStudents.filter(
//           (student) =>
//             // 🟢 SAFTEY CHECK 1: Ensure firstname exists before calling toLowerCase
//             student.firstname && 
//             student.firstname.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       : selectedCard === "New Admission"
//       ? newStudentList.filter(
//           (student) =>
//             // 🟢 SAFTEY CHECK 2: Ensure firstname exists before calling toLowerCase
//             student.firstname &&
//             student.firstname.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       : selectedCard === "LC Students"
//       ? lcList.filter(
//           (student) =>
//             // 🟢 SAFTEY CHECK 3: This one already had a check, but we can simplify the check slightly
//             student.firstname &&
//             student.firstname.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       : studentList.filter(
//           (s) =>
//             // 🟢 SAFTEY CHECK 4: Ensure firstname exists before calling toLowerCase
//             s.status === selectedCard &&
//             s.firstname &&
//             s.firstname.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//   console.log(filteredStudents);

//   const getTableHeaders = () => {
//     if (selectedCard === "Total") {
//       return [
//         "Admission no.",
//         "Students Name",
//         "GR No.",
//         "Std",
//         "Div",
//         "Gender",
//         "Contact no.",
//         "Status",
//         "Action", // Single Action column
//       ];
//     } else if (selectedCard === "New Admission") {
//       return [
//         "Admission no.",
//         "Students Name",
//         "Std",
//         "Gender",
//         "Contact no.",
//         "Status",
//       ];
//     } else if (selectedCard === "LC Students") {
//       return [
//         "LC no.",
//         "Students Name",
//         "GR No.",
//         "Std",
//         "Div",
//         "Gender",
//         "Contact no.",
//         "Status",
//       ];
//     }
//     return [];
//   };

//   // 🟢 CORE FIX: Added safety check to prevent 'split' on undefined/null
//   const capitalizeName = (name) => {
//     // If name is null, undefined, or not a string, return an empty string
//     if (!name || typeof name !== 'string') {
//         return ""; 
//     }
    
//     return name
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };

//   const renderTableRow = (student, index) => {
//     // Helper function to safely read nested and optional properties
//     const safeRead = (path, defaultValue = "") => {
//       const parts = path.split('.');
//       let current = student;
//       for (const part of parts) {
//         if (current === null || current === undefined) {
//           return defaultValue;
//         }
//         current = current[part];
//       }
//       return current === null || current === undefined ? defaultValue : current;
//     };


//     if (selectedCard === "Total") {
//       return (
//         <tr key={student._id || student.id} className="hover:bg-gray-50">
//           {/* Use safeRead for all nested and optional properties */}
//           <td className="p-2 border">{safeRead('admission.admissionno')}</td>
//           <td className="p-2 border">
//             {/* 🟢 Using optional chaining ?. and default empty string || '' to prevent calling capitalizeName with null/undefined */}
//             {capitalizeName(safeRead('firstname'))}{" "}
//             {capitalizeName(safeRead('middlename'))}{" "}
//             {capitalizeName(safeRead('lastname'))}
//           </td>
//           <td className="p-2 border">{safeRead('admission.grno').toUpperCase() || ''}</td>
//           <td className="p-2 border">{safeRead('admission.admissionstd')}</td>
//           <td className="p-2 border">
//             {safeRead('admission.admissiondivision').toUpperCase() || ''}
//           </td>
//           <td className="p-2 border">{safeRead('gender')}</td>
//           <td className="p-2 border">{safeRead('parent.primarycontact')}</td>
//           <td className="p-2 border">
//             {student.status === true || student.status === "Active" ? "Active" : "Inactive"}
//           </td>
//           <td className="p-3 border">
//             <Link to={`edit-student/${student._id}?mode=view`} className="text-gray-600 hover:text-blue-800 hover:underline mr-3">
//               View
//             </Link>
//             <Link to={`edit-student/${student._id}`} className="text-blue-600 hover:text-blue-800 hover:underline">
//               Edit
//             </Link>
//           </td>
//         </tr>
//       );
//     } else if (selectedCard === "New Admission") {
//       return (
//         <tr key={student.id} className="hover:bg-gray-50">
//           <td className="p-2 border">{safeRead('admission.admissionno')}</td>
//           <td className="p-2 border">
//             {safeRead('firstname')} {safeRead('middlename')} {safeRead('lastname')}
//           </td>
//           <td className="p-2 border">{safeRead('admission.admissionstd')}</td>
//           <td className="p-2 border">{safeRead('gender')}</td>
//           <td className="p-2 border">{safeRead('parent.primarycontact')}</td>
//           <td className="p-2 border">
//             {student.status === true || student.status === "Active" ? "Active" : "Inactive"}
//           </td>
//         </tr>
//       );
//     } else if (selectedCard === "LC Students") {
//       return (
//         <tr key={student.id} className="hover:bg-gray-50">
//           <td className="p-2 border">{safeRead('admission.admissionno')}</td>
//           <td className="p-2 border">
//             {safeRead('firstname')} {safeRead('middlename')} {safeRead('lastname')}
//           </td>
//           <td className="p-2 border">{safeRead('admission.grno')}</td>
//           <td className="p-2 border">{safeRead('admission.admissionstd')}</td>
//           <td className="p-2 border">{safeRead('admission.admissiondivision')}</td>
//           <td className="p-2 border">{safeRead('gender')}</td>
//           <td className="p-2 border">{safeRead('parent.primarycontact')}</td>
//           <td className="p-2 border">
//             {student.status ? student.status : "Inactive"}
//           </td>
//         </tr>
//       );
//     }
//     return null;
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <MainLayout>
//         <div className="h-full w-full p-6 bg-gray-50">
//           <div className="flex items-center justify-center h-64">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading students...</p>
//             </div>
//           </div>
//         </div>
//       </MainLayout>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <MainLayout>
//         <div className="h-full w-full p-6 bg-gray-50">
//           <div className="flex items-center justify-center h-64">
//             <div className="text-center">
//               <div className="text-red-500 text-4xl mb-4">⚠️</div>
//               <p className="text-red-600 text-lg font-medium mb-2">
//                 Error loading students
//               </p>
//               <p className="text-gray-600">{error}</p>
//               <button
//                 onClick={() => window.location.reload()}
//                 className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
//               >
//                 Retry
//               </button>
//             </div>
//           </div>
//         </div>
//       </MainLayout>
//     );
//   }

//   return (
//     <MainLayout>
//       <div className="h-full w-full p-6 bg-gray-50">
//         {/* Search bar and Add button */}
//         <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
//           <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-300 w-full sm:w-96 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500">
//             <input
//               type="text"
//               placeholder="Search students..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 pr-2"
//             />
//             <FaSearch className="text-gray-400 ml-2 mr-3" />
//           </div>

//           <Link to="/students-admission">
//             <button className="flex items-center bg-blue-600 text-white font-medium py-2 px-5 rounded-full shadow-md hover:bg-blue-700 transition-all duration-150">
//               + Add
//             </button>
//           </Link>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//           {cards.map((card) => (
//             <div
//               key={card.key}
//               onClick={() => setSelectedCard(card.key)}
//               className={`cursor-pointer bg-white p-6 rounded-xl shadow text-center hover:bg-gray-100 ${selectedCard === card.key ? "ring-2 ring-blue-500" : ""
//                 }`}
//             >
//               <h3 className="text-lg font-semibold text-gray-700">
//                 {card.title}
//               </h3>
//               <p className={`text-2xl font-bold text-${card.color}-600`}>
//                 {card.count}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Table */}
//         {selectedCard && (
//           <div className="bg-white p-6 rounded-xl shadow">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">
//               {selectedCard} Student List
//             </h2>

//             <div className="overflow-x-auto">
//               <table className="w-full border border-gray-300 text-sm text-left">
//                 <thead className="bg-gray-100 text-gray-700 font-semibold">
//                   <tr>
//                     {getTableHeaders().map((heading, index) => (
//                       <th key={index} className="p-2 border">
//                         {heading}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredStudents.map((student, index) =>
//                     renderTableRow(student, index)
//                   )}
//                   {filteredStudents.length === 0 && (
//                     <tr>
//                       <td colSpan="9" className="text-center p-4 text-gray-500">
//                         No students found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// }








// import React, { useEffect, useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import { FaSearch } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import axios from "axios";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// export default function StudentManagement() {
//   const [studentList, setStudentList] = useState([]); // This will now represent ACTIVE students
//   const [lcList, setLCList] = useState([]);
//   // const [newStudentList, setNewStudentList] = useState([]); // REMOVED STATE
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch students data from API
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         setLoading(true);
//         // Fetch ALL ACTIVE STUDENTS (Non-LC)
//         const response = await fetch(`${API_BASE_URL}api/students`, {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setStudentList(Array.isArray(data) ? data : []);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         console.error("Error fetching students:", err);
//       } 
//     };
    
//     // REMOVED fetchNewStudents function entirely

//     // for lc students
//     const fetchLCStudents = async () => {
//       try {
//         
//         // Fetch all LC students
//         const response = await axios.get(
//           `${API_BASE_URL}api/lcstudent`,
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         if (response.status !== 200) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = response.data; // Changed await response.data to response.data
//         setLCList(Array.isArray(data) ? data : []);
//         setError(null);
//       } catch (error) {
//         setError(error.message);
//         console.error("Error fetching LC students:", error);
//       } finally {
//         // Only set loading to false after ALL fetches are complete
//       }
//     };

//     // Run all fetches concurrently
//     Promise.all([fetchStudents(), fetchLCStudents()])
//         .catch(err => console.error("One or more initial fetches failed:", err))
//         .finally(() => setLoading(false));

//   }, []);

//   // 🚀 NEW LOGIC: New Admissions is now explicitly the Active Student List
//   const activeStudents = studentList;
//   const newAdmissions = activeStudents.length;

//   const totalStudents = activeStudents.length + lcList.length;
//   const lcStudents = lcList.length;

//   const cards = [
//     {
//       title: "Total Students",
//       count: totalStudents,
//       color: "blue",
//       key: "Total",
//     },
//     {
//       title: "New Admission",
//       count: newAdmissions,
//       color: "green",
//       key: "New Admission",
//     },
//     { title: "LC Students", count: lcStudents, color: "red", key: "LC Students" },
//   ];

//   const combinedAllStudents = [...activeStudents, ...lcList];

//   // --- Filtering Logic Updated to use ActiveStudents ---
//   const filteredStudents = (() => {
//     const query = searchQuery.toLowerCase();
//     
//     const filterByName = (student) => 
//         student.firstname && student.firstname.toLowerCase().includes(query);

//     if (selectedCard === "Total") {
//       return combinedAllStudents.filter(filterByName);
//     } else if (selectedCard === "New Admission") {
//       // Filter the Active Students (studentList)
//       return activeStudents.filter(filterByName);
//     } else if (selectedCard === "LC Students") {
//       // Filter the LC Students
//       return lcList.filter(filterByName);
//     }
//     
//     // Fallback if no card is selected (or status-based filtering is still expected)
//     return activeStudents.filter(filterByName);
//   })();

//   const getTableHeaders = () => {
//     if (selectedCard === "Total" || selectedCard === "New Admission") {
//       return [
//         "Admission no.",
//         "Students Name",
//         "GR No.", // Total needs GR No., New Admission likely does too
//         "Std",
//         "Div",
//         "Gender",
//         "Contact no.",
//         "Status",
//         ...(selectedCard === "Total" ? ["Action"] : []),
//       ];
//     } else if (selectedCard === "LC Students") {
//       return [
//         "LC no.",
//         "Students Name",
//         "GR No.",
//         "Std",
//         "Div",
//         "Gender",
//         "Contact no.",
//         "Status",
//       ];
//     }
//     return [];
//   };

//   const capitalizeName = (name) => {
//     if (!name || typeof name !== 'string') {
//         return ""; 
//     }
//     
//     return name
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };

//   const renderTableRow = (student, index) => {
//     // Helper function to safely read nested and optional properties
//     const safeRead = (path, defaultValue = "") => {
//       const parts = path.split('.');
//       let current = student;
//       for (const part of parts) {
//         if (current === null || current === undefined) {
//           return defaultValue;
//         }
//         current = current[part];
//       }
//       return current === null || current === undefined ? defaultValue : current;
//     };

//     // Determine if the student is an LC student based on the list they came from
//     const isLCStudent = lcList.some(lc => lc._id === student._id);

//     if (selectedCard === "Total" || selectedCard === "New Admission") {
//       return (
//         <tr key={student._id || student.id} className="hover:bg-gray-50">
//           <td className="p-2 border">{safeRead('admission.admissionno')}</td>
//           <td className="p-2 border">
//             {capitalizeName(safeRead('firstname'))}{" "}
//             {capitalizeName(safeRead('middlename'))}{" "}
//             {capitalizeName(safeRead('lastname'))}
//           </td>
//           <td className="p-2 border">{safeRead('admission.grno').toUpperCase() || ''}</td>
//           <td className="p-2 border">{safeRead('admission.admissionstd')}</td>
//           <td className="p-2 border">
//             {safeRead('admission.admissiondivision').toUpperCase() || ''}
//           </td>
//           <td className="p-2 border">{safeRead('gender')}</td>
//           <td className="p-2 border">{safeRead('parent.primarycontact')}</td>
//           <td className="p-2 border">
//             {/* Use isLCStudent flag for accurate status if needed, otherwise rely on the student.status field */}
//             {isLCStudent ? "Inactive (LC)" : (student.status === true || student.status === "Active" ? "Active" : "Inactive")}
//           </td>
//           {/* Only show Action column for Total View */}
//           {selectedCard === "Total" && (
//             <td className="p-3 border">
//               <Link to={`edit-student/${student._id}?mode=view`} className="text-gray-600 hover:text-blue-800 hover:underline mr-3">
//                 View
//               </Link>
//               <Link to={`edit-student/${student._id}`} className="text-blue-600 hover:text-blue-800 hover:underline">
//                 Edit
//               </Link>
//             </td>
//           )}
//         </tr>
//       );
//     } else if (selectedCard === "LC Students") {
//       return (
//         <tr key={student.id} className="hover:bg-gray-50">
//           {/* LC No. is generally the Admission No. for LC students in this schema */}
//           <td className="p-2 border">{safeRead('lcno') || safeRead('admission.admissionno')}</td>
//           <td className="p-2 border">
//             {capitalizeName(safeRead('firstname'))}{" "}
//             {capitalizeName(safeRead('middlename'))}{" "}
//             {capitalizeName(safeRead('lastname'))}
//           </td>
//           <td className="p-2 border">{safeRead('admission.grno')}</td>
//           <td className="p-2 border">{safeRead('admission.admissionstd')}</td>
//           <td className="p-2 border">{safeRead('admission.admissiondivision')}</td>
//           <td className="p-2 border">{safeRead('gender')}</td>
//           <td className="p-2 border">{safeRead('parent.primarycontact')}</td>
//           <td className="p-2 border">
//             {safeRead('status') || "Inactive"}
//           </td>
//         </tr>
//       );
//     }
//     return null;
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <MainLayout>
//         <div className="h-full w-full p-6 bg-gray-50">
//           <div className="flex items-center justify-center h-64">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading students...</p>
//             </div>
//           </div>
//         </div>
//       </MainLayout>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <MainLayout>
//         <div className="h-full w-full p-6 bg-gray-50">
//           <div className="flex items-center justify-center h-64">
//             <div className="text-center">
//               <div className="text-red-500 text-4xl mb-4">⚠️</div>
//               <p className="text-red-600 text-lg font-medium mb-2">
//                 Error loading students
//               </p>
//               <p className="text-gray-600">{error}</p>
//               <button
//                 onClick={() => window.location.reload()}
//                 className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
//               >
//                 Retry
//               </button>
//             </div>
//           </div>
//         </div>
//       </MainLayout>
//     );
//   }

//   return (
//     <MainLayout>
//       <div className="h-full w-full p-6 bg-gray-50">
//         {/* Search bar and Add button */}
//         <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
//           <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-300 w-full sm:w-96 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500">
//             <input
//               type="text"
//               placeholder="Search students..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 pr-2"
//             />
//             <FaSearch className="text-gray-400 ml-2 mr-3" />
//           </div>

//           <Link to="/students-admission">
//             <button className="flex items-center bg-blue-600 text-white font-medium py-2 px-5 rounded-full shadow-md hover:bg-blue-700 transition-all duration-150">
//               + Add
//             </button>
//           </Link>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//           {cards.map((card) => (
//             <div
//               key={card.key}
//               onClick={() => setSelectedCard(card.key)}
//               className={`cursor-pointer bg-white p-6 rounded-xl shadow text-center hover:bg-gray-100 ${selectedCard === card.key ? "ring-2 ring-blue-500" : ""
//                 }`}
//             >
//               <h3 className="text-lg font-semibold text-gray-700">
//                 {card.title}
//               </h3>
//               <p className={`text-2xl font-bold text-${card.color}-600`}>
//                 {card.count}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Table */}
//         {selectedCard && (
//           <div className="bg-white p-6 rounded-xl shadow">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">
//               {selectedCard} Student List
//             </h2>

//             <div className="overflow-x-auto">
//               <table className="w-full border border-gray-300 text-sm text-left">
//                 <thead className="bg-gray-100 text-gray-700 font-semibold">
//                   <tr>
//                     {getTableHeaders().map((heading, index) => (
//                       <th key={index} className="p-2 border">
//                         {heading}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredStudents.map((student, index) =>
//                     renderTableRow(student, index)
//                   )}
//                   {filteredStudents.length === 0 && (
//                     <tr>
//                       <td colSpan="9" className="text-center p-4 text-gray-500">
//                         No students found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// }


// import React, { useEffect, useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import { FaSearch } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import axios from "axios";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// // --- Dummy data for filters (Replace with actual API fetch if available) ---
// const AVAILABLE_STANDARDS = ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// const AVAILABLE_DIVISIONS = ["All", "A", "B", "C", "D"];

// export default function StudentManagement() {
//   const [studentList, setStudentList] = useState([]); // This will now represent ACTIVE students
//   const [lcList, setLCList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCard, setSelectedCard] = useState("New Admission");
//   const [searchQuery, setSearchQuery] = useState("");
//   // NEW STATE FOR FILTERS
//   const [selectedStd, setSelectedStd] = useState("All");
//   const [selectedDiv, setSelectedDiv] = useState("All");

//   // Fetch students data from API
//   // 🛑 IMPORTANT: Now the fetch call includes Std and Div filters
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         setLoading(true);

//         // Construct query parameters for Std and Div
//         const params = new URLSearchParams();
//         if (selectedStd !== "All") {
//           params.append('std', selectedStd);
//         }
//         if (selectedDiv !== "All") {
//           params.append('div', selectedDiv);
//         }
//         // The backend `getStudents` is designed to handle this, fetching only ACTIVE students

//         // Fetch ALL ACTIVE STUDENTS (Non-LC) with filters
//         const response = await fetch(`${API_BASE_URL}api/students?${params.toString()}`, {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setStudentList(Array.isArray(data) ? data : []);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         console.error("Error fetching students:", err);
//       } 
//     };
//     
//     // for lc students (LC list doesn't need Std/Div filtering since they are inactive/left)
//     const fetchLCStudents = async () => {
//       try {
//         
//         // Fetch all LC students
//         const response = await axios.get(
//           `${API_BASE_URL}api/lcstudent`,
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         if (response.status !== 200) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = response.data; 
//         setLCList(Array.isArray(data) ? data : []);
//         setError(null);
//       } catch (error) {
//         setError(error.message);
//         console.error("Error fetching LC students:", error);
//       }
//     };

//     // Run all fetches concurrently, but ensure `fetchStudents` runs with current filters
//     Promise.all([fetchStudents(), fetchLCStudents()])
//         .catch(err => console.error("One or more initial fetches failed:", err))
//         .finally(() => setLoading(false));

//   // Re-run effect when standard or division filters change
//   }, [selectedStd, selectedDiv]);

//   const activeStudents = studentList;
//   const newAdmissions = activeStudents.length;

//   const totalStudents = activeStudents.length + lcList.length;
//   const lcStudents = lcList.length;

//   const cards = [
//     {
//       title: "Total Students",
//       count: totalStudents,
//       color: "blue",
//       key: "Total",
//     },
//     {
//       title: "New Admission",
//       count: newAdmissions,
//       color: "green",
//       key: "New Admission",
//     },
//     { title: "LC Students", count: lcStudents, color: "red", key: "LC Students" },
//   ];

//   const combinedAllStudents = [...activeStudents, ...lcList];

//   // --- Filtering Logic Updated to include middle/last name search ---
//   const filteredStudents = (() => {
//     const query = searchQuery.toLowerCase();
//     
//     // 🛑 UPDATED: Search filter checks firstname, middlename, and lastname
//     const filterByName = (student) => {
//       const fullName = `${student.firstname || ''} ${student.middlename || ''} ${student.lastname || ''}`.toLowerCase();
//       const grNo = (student.admission?.grno || '').toLowerCase();
//       const admissionNo = (student.admission?.admissionno || '').toLowerCase();
//         
//       return fullName.includes(query) || grNo.includes(query) || admissionNo.includes(query);
//     }

//     let listToFilter = [];

//     if (selectedCard === "Total") {
//       // For Total, we filter the combined list. Note: activeStudents already respect Std/Div filters from fetch.
//       listToFilter = combinedAllStudents;
//     } else if (selectedCard === "New Admission") {
//       // Filter the Active Students (studentList), which already respects Std/Div filters from fetch.
//       listToFilter = activeStudents;
//     } else if (selectedCard === "LC Students") {
//       // Filter the LC Students list (no Std/Div filter applied at fetch level)
//       listToFilter = lcList;
//     } else {
//         // Default view, matching the initial state
//         listToFilter = activeStudents;
//     }
//     
//     // Apply search query filter
//     return listToFilter.filter(filterByName);
//   })();

//   const getTableHeaders = () => {
//     // 🛑 MODIFICATION: Swapping "Admission no." and "Students Name"
//     const defaultHeaders = [
//       "Students Name", // 1st column
//       "Admission no.", // 2nd column
//       "GR No.", 
//       "Std",
//       "Div",
//       "Gender",
//       "Contact no.",
//       "Status",
//     ];

//     if (selectedCard === "LC Students") {
//       // If LC Students is selected, the first header is "LC no."
//       // Swap is applied: Students Name, LC no., GR No., etc.
//       return [defaultHeaders[0], "LC no.", ...defaultHeaders.slice(2), "Action"];
//     } else if (selectedCard === "Total" || selectedCard === "New Admission") {
//       // Add 'Action' column to both Total and New Admission views
//       return [...defaultHeaders, "Action"];
//     }
//     return [];
//   };

//   const capitalizeName = (name) => {
//     if (!name || typeof name !== 'string') {
//         return ""; 
//     }
//     
//     return name
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };

//   const renderTableRow = (student) => {
//     // Helper function to safely read nested and optional properties
//     const safeRead = (path, defaultValue = "") => {
//       const parts = path.split('.');
//       let current = student;
//       for (const part of parts) {
//         if (current === null || current === undefined) {
//           return defaultValue;
//         }
//         current = current[part];
//       }
//       return current === null || current === undefined ? defaultValue : current;
//     };

//     // Determine if the student is an LC student based on status field in API response
//     const isLCStudent = safeRead('status') === false; 

//     // Common cell rendering for Student Name and Admission No. (swapped order)
//     const studentNameCell = (
//         <td className="p-2 border">
//             {capitalizeName(safeRead('firstname'))}{" "}
//             {capitalizeName(safeRead('middlename'))}{" "}
//             {capitalizeName(safeRead('lastname'))}
//         </td>
//     );
//     const admissionNoCell = (
//         <td className="p-2 border">{safeRead('admission.admissionno')}</td>
//     );
//     const lcNoCell = (
//         <td className="p-2 border">{safeRead('lcno') || safeRead('admission.admissionno')}</td>
//     );
    

//     if (selectedCard === "Total" || selectedCard === "New Admission") {
//       return (
//         <tr key={student._id || student.id} className="hover:bg-gray-50">
//           {/* 🛑 SWAPPED: Students Name then Admission No. */}
//           {studentNameCell}
//           {admissionNoCell} 
            
//           <td className="p-2 border">{safeRead('admission.grno').toUpperCase() || ''}</td>
//           <td className="p-2 border">{safeRead('admission.admissionstd')}</td>
//           <td className="p-2 border">
//             {safeRead('admission.admissiondivision').toUpperCase() || ''}
//           </td>
//           <td className="p-2 border">{safeRead('gender')}</td>
//           <td className="p-2 border">{safeRead('parent.primarycontact')}</td>
//           <td className="p-2 border">
//             {isLCStudent ? "Inactive (LC)" : "Active"}
//           </td>
//           {/* ACTION COLUMN ADDED/MAINTAINED FOR ALL */}
//           <td className="p-3 border">
//             <Link to={`edit-student/${safeRead('_id')}?mode=view`} className="text-gray-600 hover:text-blue-800 hover:underline mr-3">
//               View
//             </Link>
//             <Link to={`edit-student/${safeRead('_id')}`} className="text-blue-600 hover:text-blue-800 hover:underline">
//               Edit
//             </Link>
//           </td>
//         </tr>
//       );
//     } else if (selectedCard === "LC Students") {
//       return (
//         <tr key={student.id} className="hover:bg-gray-50">
//           {/* 🛑 SWAPPED: Students Name then LC No. */}
//           {studentNameCell}
//           {lcNoCell}
            
//           <td className="p-2 border">{safeRead('admission.grno')}</td>
//           <td className="p-2 border">{safeRead('admission.admissionstd')}</td>
//           <td className="p-2 border">{safeRead('admission.admissiondivision')}</td>
//           <td className="p-2 border">{safeRead('gender')}</td>
//           <td className="p-2 border">{safeRead('parent.primarycontact')}</td>
//           <td className="p-2 border">
//             {/* LC students are always inactive */}
//             {"Inactive (LC)"}
//           </td>
//           {/* ACTION COLUMN ADDED */}
//           <td className="p-3 border">
//             {/* LC students typically only have a View mode */}
//             <Link to={`edit-student/${safeRead('_id')}?mode=view`} className="text-gray-600 hover:text-blue-800 hover:underline mr-3">
//               View
//             </Link>
//             <Link to={`edit-student/${safeRead('_id')}`} className="text-blue-600 hover:text-blue-800 hover:underline">
//               Edit
//             </Link>
//           </td>
//         </tr>
//       );
//     }
//     return null;
//   };

//   // Loading/Error states remain the same...
//   if (loading) {
//     return (
//       <MainLayout>
//         <div className="h-full w-full p-6 bg-gray-50">
//           <div className="flex items-center justify-center h-64">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading students...</p>
//             </div>
//           </div>
//         </div>
//       </MainLayout>
//     );
//   }

//   if (error) {
//     return (
//       <MainLayout>
//         <div className="h-full w-full p-6 bg-gray-50">
//           <div className="flex items-center justify-center h-64">
//             <div className="text-center">
//               <div className="text-red-500 text-4xl mb-4">⚠️</div>
//               <p className="text-red-600 text-lg font-medium mb-2">
//                 Error loading students
//               </p>
//               <p className="text-gray-600">{error}</p>
//               <button
//                 onClick={() => window.location.reload()}
//                 className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
//               >
//                 Retry
//               </button>
//             </div>
//           </div>
//         </div>
//       </MainLayout>
//     );
//   }


//   return (
//     <MainLayout>
//       <div className="h-full w-full p-6 bg-gray-50">
//         {/* Search bar, Filters, and Add button */}
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
//             
//             {/* Search Input */}
//             <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-300 w-full md:w-96 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 order-1 md:order-1">
//                 <input
//                   type="text"
//                   placeholder="Search by Name/GR/Admission No..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 pr-2"
//                 />
//                 <FaSearch className="text-gray-400 ml-2 mr-3" />
//             </div>

//             {/* Filter Dropdowns and Add Button (Grouped on the right) */}
//             <div className="flex items-center space-x-4 order-2 md:order-2">
//                 <span className="font-medium text-gray-700 whitespace-nowrap hidden sm:inline">Std:</span>
//                 <select
//                     value={selectedStd}
//                     onChange={(e) => setSelectedStd(e.target.value)}
//                     className="p-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm focus:ring-blue-500 focus:border-blue-500"
//                 >
//                     <option value="All">Select Standard</option>
//                     {AVAILABLE_STANDARDS.filter(s => s !== "All").map(std => (
//                         <option key={std} value={std}>{std}</option>
//                     ))}
//                 </select>

//                 <select
//                     value={selectedDiv}
//                     onChange={(e) => setSelectedDiv(e.target.value)}
//                     className="p-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm focus:ring-blue-500 focus:border-blue-500"
//                 >
//                     <option value="All">Select Division</option>
//                     {AVAILABLE_DIVISIONS.filter(d => d !== "All").map(div => (
//                         <option key={div} value={div}>{div}</option>
//                     ))}
//                 </select>

//                 <Link to="/students-admission">
//                   <button className="flex items-center bg-blue-600 text-white font-medium py-2 px-5 rounded-full shadow-md hover:bg-blue-700 transition-all duration-150 whitespace-nowrap">
//                     + Add
//                   </button>
//                 </Link>
//             </div>

//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//           {cards.map((card) => (
//             <div
//               key={card.key}
//               onClick={() => setSelectedCard(card.key)}
//               className={`cursor-pointer bg-white p-6 rounded-xl shadow text-center hover:bg-gray-100 ${selectedCard === card.key ? "ring-2 ring-blue-500" : ""
//                 }`}
//             >
//               <h3 className="text-lg font-semibold text-gray-700">
//                 {card.title}
//               </h3>
//               <p className={`text-2xl font-bold text-${card.color}-600`}>
//                 {card.count}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Table */}
//         {selectedCard && (
//           <div className="bg-white p-6 rounded-xl shadow">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">
//               {selectedCard} Student List
//             </h2>

//             <div className="overflow-x-auto">
//               <table className="w-full border border-gray-300 text-sm text-left">
//                 <thead className="bg-gray-100 text-gray-700 font-semibold">
//                   <tr>
//                     {getTableHeaders().map((heading, index) => (
//                       <th key={index} className="p-2 border">
//                         {heading}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredStudents.map((student, index) =>
//                     renderTableRow(student, index)
//                   )}
//                   {filteredStudents.length === 0 && (
//                     <tr>
//                       <td colSpan={getTableHeaders().length} className="text-center p-4 text-gray-500">
//                         No students found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//           </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// }


// import React, { useEffect, useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import { FaSearch } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import axios from "axios";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// // --- Dummy data for filters (Replace with actual API fetch if available) ---
// const AVAILABLE_STANDARDS = ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// const AVAILABLE_DIVISIONS = ["All", "A", "B", "C", "D"];
// // 🆕 New Status Options
// const AVAILABLE_STATUSES = ["All", "Active", "Inactive (LC)"];

// export default function StudentManagement() {
//   const [studentList, setStudentList] = useState([]); // This will now represent ACTIVE students
//   const [lcList, setLCList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCard, setSelectedCard] = useState("New Admission");
//   const [searchQuery, setSearchQuery] = useState("");
//   // NEW STATE FOR FILTERS
//   const [selectedStd, setSelectedStd] = useState("All");
//   const [selectedDiv, setSelectedDiv] = useState("All");
//   // 🆕 NEW STATE FOR STATUS FILTER
//   const [selectedStatus, setSelectedStatus] = useState("All");

//   // Fetch students data from API
//   // 🛑 IMPORTANT: Now the fetch call includes Std and Div filters
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         setLoading(true);

//         // Construct query parameters for Std and Div
//         const params = new URLSearchParams();
//         if (selectedStd !== "All") {
//           params.append('std', selectedStd);
//         }
//         if (selectedDiv !== "All") {
//           params.append('div', selectedDiv);
//         }
//         // The backend `getStudents` is designed to handle this, fetching only ACTIVE students

//         // Fetch ALL ACTIVE STUDENTS (Non-LC) with filters
//         const response = await fetch(`${API_BASE_URL}api/students?${params.toString()}`, {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setStudentList(Array.isArray(data) ? data : []);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         console.error("Error fetching students:", err);
//       } 
//     };
//     
//     // for lc students (LC list doesn't need Std/Div filtering since they are inactive/left)
//     const fetchLCStudents = async () => {
//       try {
//         
//         // Fetch all LC students
//         const response = await axios.get(
//           `${API_BASE_URL}api/lcstudent`,
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         if (response.status !== 200) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = response.data; 
//         setLCList(Array.isArray(data) ? data : []);
//         setError(null);
//       } catch (error) {
//         setError(error.message);
//         console.error("Error fetching LC students:", error);
//       }
//     };

//     // Run all fetches concurrently, but ensure `fetchStudents` runs with current filters
//     Promise.all([fetchStudents(), fetchLCStudents()])
//         .catch(err => console.error("One or more initial fetches failed:", err))
//         .finally(() => setLoading(false));

//   // Re-run effect when standard or division filters change
//   }, [selectedStd, selectedDiv]);

//   const activeStudents = studentList;
//   const newAdmissions = activeStudents.length;

//   const totalStudents = activeStudents.length + lcList.length;
//   const lcStudents = lcList.length;

//   const cards = [
//     {
//       title: "Total Students",
//       count: totalStudents,
//       color: "blue",
//       key: "Total",
//     },
//     {
//       title: "New Admission",
//       count: newAdmissions,
//       color: "green",
//       key: "New Admission",
//     },
//     { title: "LC Students", count: lcStudents, color: "red", key: "LC Students" },
//   ];

//   const combinedAllStudents = [...activeStudents, ...lcList];

//   // --- Filtering Logic Updated to handle Status filter ---
//   const filteredStudents = (() => {
//     const query = searchQuery.toLowerCase();
//     
//     // Search filter checks firstname, middlename, and lastname
//     const filterByName = (student) => {
//       const fullName = `${student.firstname || ''} ${student.middlename || ''} ${student.lastname || ''}`.toLowerCase();
//       const grNo = (student.admission?.grno || '').toLowerCase();
//       const admissionNo = (student.admission?.admissionno || '').toLowerCase();
//         
//       return fullName.includes(query) || grNo.includes(query) || admissionNo.includes(query);
//     }

//     let listToFilter = [];

//     // Determine the base list based on the selected card and status filter
//     if (selectedCard === "Total") {
//         if (selectedStatus === "Active") {
//             // Filter combined list to show only active students
//             listToFilter = combinedAllStudents.filter(s => s.status !== false);
//         } else if (selectedStatus === "Inactive (LC)") {
//             // Filter combined list to show only inactive/LC students
//             listToFilter = combinedAllStudents.filter(s => s.status === false);
//         } else {
//             // All students
//             listToFilter = combinedAllStudents;
//         }
//     } else if (selectedCard === "New Admission") {
//         // New Admission is equivalent to activeStudents list, subject to Std/Div filters
//         // If Status is set to Inactive here, we show nothing as New Admission implies Active
//         listToFilter = (selectedStatus === "Inactive (LC)") ? [] : activeStudents;
//     } else if (selectedCard === "LC Students") {
//         // LC Students is equivalent to lcList, no further filtering needed here
//         // If Status is set to Active here, we show nothing as LC implies Inactive
//         listToFilter = (selectedStatus === "Active") ? [] : lcList;
//     } else {
//         // Default case
//         listToFilter = activeStudents;
//     }
//     
//     // Apply search query filter
//     return listToFilter.filter(filterByName);
//   })();

//   const getTableHeaders = () => {
//     // 🛑 MODIFICATION: Swapping "Admission no." and "Students Name"
//     const defaultHeaders = [
//       "Students Name", // 1st column
//       "Admission no.", // 2nd column
//       "GR No.", 
//       "Std",
//       "Div",
//       "Gender",
//       "Contact no.",
//       "Status",
//     ];

//     if (selectedCard === "LC Students") {
//       // If LC Students is selected, the first header is "LC no."
//       // Swap is applied: Students Name, LC no., GR No., etc.
//       return [defaultHeaders[0], "LC no.", ...defaultHeaders.slice(2), "Action"];
//     } else if (selectedCard === "Total" || selectedCard === "New Admission") {
//       // Add 'Action' column to both Total and New Admission views
//       return [...defaultHeaders, "Action"];
//     }
//     return [];
//   };

//   const capitalizeName = (name) => {
//     if (!name || typeof name !== 'string') {
//         return ""; 
//     }
//     
//     return name
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };

//   const renderTableRow = (student) => {
//     // Helper function to safely read nested and optional properties
//     const safeRead = (path, defaultValue = "") => {
//       const parts = path.split('.');
//       let current = student;
//       for (const part of parts) {
//         if (current === null || current === undefined) {
//           return defaultValue;
//         }
//         current = current[part];
//       }
//       return current === null || current === undefined ? defaultValue : current;
//     };

//     // Determine if the student is an LC student based on status field in API response
//     const isLCStudent = safeRead('status') === false; 

//     // Common cell rendering for Student Name and Admission No. (swapped order)
//     const studentNameCell = (
//         <td className="p-2 border">
//             {capitalizeName(safeRead('firstname'))}{" "}
//             {capitalizeName(safeRead('middlename'))}{" "}
//             {capitalizeName(safeRead('lastname'))}
//         </td>
//     );
//     const admissionNoCell = (
//         <td className="p-2 border">{safeRead('admission.admissionno')}</td>
//     );
//     const lcNoCell = (
//         <td className="p-2 border">{safeRead('lcno') || safeRead('admission.admissionno')}</td>
//     );
//     

//     if (selectedCard === "Total" || selectedCard === "New Admission") {
//       return (
//         <tr key={student._id || student.id} className="hover:bg-gray-50">
//           {/* 🛑 SWAPPED: Students Name then Admission No. */}
//           {studentNameCell}
//           {admissionNoCell} 
//             
//           <td className="p-2 border">{safeRead('admission.grno').toUpperCase() || ''}</td>
//           <td className="p-2 border">{safeRead('admission.admissionstd')}</td>
//           <td className="p-2 border">
//             {safeRead('admission.admissiondivision').toUpperCase() || ''}
//           </td>
//           <td className="p-2 border">{safeRead('gender')}</td>
//           <td className="p-2 border">{safeRead('parent.primarycontact')}</td>
//           <td className="p-2 border">
//             {isLCStudent ? "Inactive (LC)" : "Active"}
//           </td>
//           {/* ACTION COLUMN ADDED/MAINTAINED FOR ALL */}
//           <td className="p-3 border">
//             <Link to={`edit-student/${safeRead('_id')}?mode=view`} className="text-gray-600 hover:text-blue-800 hover:underline mr-3">
//               View
//             </Link>
//             <Link to={`edit-student/${safeRead('_id')}`} className="text-blue-600 hover:text-blue-800 hover:underline">
//               Edit
//             </Link>
//           </td>
//         </tr>
//       );
//     } else if (selectedCard === "LC Students") {
//       return (
//         <tr key={student.id} className="hover:bg-gray-50">
//           {/* 🛑 SWAPPED: Students Name then LC No. */}
//           {studentNameCell}
//           {lcNoCell}
//             
//           <td className="p-2 border">{safeRead('admission.grno')}</td>
//           <td className="p-2 border">{safeRead('admission.admissionstd')}</td>
//           <td className="p-2 border">{safeRead('admission.admissiondivision')}</td>
//           <td className="p-2 border">{safeRead('gender')}</td>
//           <td className="p-2 border">{safeRead('parent.primarycontact')}</td>
//           <td className="p-2 border">
//             {/* LC students are always inactive */}
//             {"Inactive (LC)"}
//           </td>
//           {/* ACTION COLUMN ADDED */}
//           <td className="p-3 border">
//             {/* LC students typically only have a View mode */}
//             <Link to={`edit-student/${safeRead('_id')}?mode=view`} className="text-gray-600 hover:text-blue-800 hover:underline mr-3">
//               View
//             </Link>
//             <Link to={`edit-student/${safeRead('_id')}`} className="text-blue-600 hover:text-blue-800 hover:underline">
//               Edit
//             </Link>
//           </td>
//         </tr>
//       );
//     }
//     return null;
//   };

//   // Loading/Error states remain the same...
//   if (loading) {
//     return (
//       <MainLayout>
//         <div className="h-full w-full p-6 bg-gray-50">
//           <div className="flex items-center justify-center h-64">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//               <p className="text-gray-600">Loading students...</p>
//             </div>
//           </div>
//         </div>
//       </MainLayout>
//     );
//   }

//   if (error) {
//     return (
//       <MainLayout>
//         <div className="h-full w-full p-6 bg-gray-50">
//           <div className="flex items-center justify-center h-64">
//             <div className="text-center">
//               <div className="text-red-500 text-4xl mb-4">⚠️</div>
//               <p className="text-red-600 text-lg font-medium mb-2">
//                 Error loading students
//               </p>
//               <p className="text-gray-600">{error}</p>
//               <button
//                 onClick={() => window.location.reload()}
//                 className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
//               >
//                 Retry
//               </button>
//             </div>
//           </div>
//         </div>
//       </MainLayout>
//     );
//   }


//   return (
//     <MainLayout>
//       <div className="h-full w-full p-6 bg-gray-50">
//         {/* Search bar, Filters, and Add button */}
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
//             
//             {/* Search Input */}
//             <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-300 w-full md:w-96 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 order-1 md:order-1">
//                 <input
//                   type="text"
//                   placeholder="Search by Name/GR/Admission No..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 pr-2"
//                 />
//                 <FaSearch className="text-gray-400 ml-2 mr-3" />
//             </div>

//             {/* Filter Dropdowns and Add Button (Grouped on the right) */}
//             <div className="flex items-center space-x-4 order-2 md:order-2">
// {/*                 <span className="font-medium text-gray-700 whitespace-nowrap hidden sm:inline">Std:</span> */}
//                 <select
//                     value={selectedStd}
//                     onChange={(e) => setSelectedStd(e.target.value)}
//                     className="p-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm focus:ring-blue-500 focus:border-blue-500"
//                 >
//                     <option value="All">Select Standard</option>
//                     {AVAILABLE_STANDARDS.filter(s => s !== "All").map(std => (
//                         <option key={std} value={std}>{std}</option>
//                     ))}
//                 </select>

//                 <select
//                     value={selectedDiv}
//                     onChange={(e) => setSelectedDiv(e.target.value)}
//                     className="p-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm focus:ring-blue-500 focus:border-blue-500"
//                 >
//                     <option value="All">Select Division</option>
//                     {AVAILABLE_DIVISIONS.filter(d => d !== "All").map(div => (
//                         <option key={div} value={div}>{div}</option>
//                     ))}
//                 </select>
                
//                 {/* 🆕 Status Filter Dropdown */}
//                 <select
//                     value={selectedStatus}
//                     onChange={(e) => setSelectedStatus(e.target.value)}
//                     className="p-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm focus:ring-blue-500 focus:border-blue-500"
//                 >
//                     {AVAILABLE_STATUSES.map(status => (
//                         <option key={status} value={status}>{status}</option>
//                     ))}
//                 </select>


//                 <Link to="/students-admission">
//                   <button className="flex items-center bg-blue-600 text-white font-medium py-2 px-5 rounded-full shadow-md hover:bg-blue-700 transition-all duration-150 whitespace-nowrap">
//                     + Add
//                   </button>
//                 </Link>
//             </div>

//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//           {cards.map((card) => (
//             <div
//               key={card.key}
//               onClick={() => setSelectedCard(card.key)}
//               className={`cursor-pointer bg-white p-6 rounded-xl shadow text-center hover:bg-gray-100 ${selectedCard === card.key ? "ring-2 ring-blue-500" : ""
//                 }`}
//             >
//               <h3 className="text-lg font-semibold text-gray-700">
//                 {card.title}
//               </h3>
//               <p className={`text-2xl font-bold text-${card.color}-600`}>
//                 {card.count}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Table */}
//         {selectedCard && (
//           <div className="bg-white p-6 rounded-xl shadow">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">
//               {selectedCard} Student List
//             </h2>

//             <div className="overflow-x-auto">
//               <table className="w-full border border-gray-300 text-sm text-left">
//                 <thead className="bg-gray-100 text-gray-700 font-semibold">
//                   <tr>
//                     {getTableHeaders().map((heading, index) => (
//                       <th key={index} className="p-2 border">
//                         {heading}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredStudents.map((student, index) =>
//                     renderTableRow(student, index)
//                   )}
//                   {filteredStudents.length === 0 && (
//                     <tr>
//                       <td colSpan={getTableHeaders().length} className="text-center p-4 text-gray-500">
//                         No students found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//           </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// }






























// import React, { useEffect, useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import { FaSearch } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import axios from "axios";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// // --- Updated Filter Constants ---
// const AVAILABLE_STANDARDS = ["All", "Nursery", "Junior", "Senior", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const AVAILABLE_DIVISIONS = ["All", "A", "B", "C", "D", "E"];
// const AVAILABLE_STATUSES = ["All", "Active", "Inactive (LC)"];

// export default function StudentManagement() {
//   const [studentList, setStudentList] = useState([]); 
//   const [lcList, setLCList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCard, setSelectedCard] = useState("New Admission");
//   const [searchQuery, setSearchQuery] = useState("");
  
//   // State for Filters
//   const [selectedStd, setSelectedStd] = useState("All");
//   const [selectedDiv, setSelectedDiv] = useState("All");
//   const [selectedStatus, setSelectedStatus] = useState("All");

//   // Fetch students data from API
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         setLoading(true);

//         const params = new URLSearchParams();
//         if (selectedStd !== "All") {
//           params.append('std', selectedStd);
//         }
//         if (selectedDiv !== "All") {
//           params.append('div', selectedDiv);
//         }

//         const response = await fetch(`${API_BASE_URL}api/students?${params.toString()}`, {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setStudentList(Array.isArray(data) ? data : []);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         console.error("Error fetching students:", err);
//       } 
//     };
    
//     const fetchLCStudents = async () => {
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}api/lcstudent`,
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         if (response.status !== 200) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = response.data; 
//         setLCList(Array.isArray(data) ? data : []);
//         setError(null);
//       } catch (error) {
//         setError(error.message);
//         console.error("Error fetching LC students:", error);
//       }
//     };

//     Promise.all([fetchStudents(), fetchLCStudents()])
//         .catch(err => console.error("One or more initial fetches failed:", err))
//         .finally(() => setLoading(false));

//   }, [selectedStd, selectedDiv]); // Refetch when Std or Div changes

//   const activeStudents = studentList;
//   const newAdmissions = activeStudents.length;
//   const totalStudents = activeStudents.length + lcList.length;
//   const lcStudents = lcList.length;

//   const cards = [
//     { title: "Total Students", count: totalStudents, color: "blue", key: "Total" },
//     { title: "LC Students", count: lcStudents, color: "red", key: "LC Students" },
//     { title: "New Admission", count: newAdmissions, color: "green", key: "New Admission" },
//   ];

//   const combinedAllStudents = [...activeStudents, ...lcList];

//   // --- Linked Filtering Logic ---
//   const filteredStudents = (() => {
//     const query = searchQuery.toLowerCase();
    
//     const filterByName = (student) => {
//       const fullName = `${student.firstname || ''} ${student.middlename || ''} ${student.lastname || ''}`.toLowerCase();
//       const grNo = (student.admission?.grno || '').toLowerCase();
//       const admissionNo = (student.admission?.admissionno || '').toLowerCase();
//       return fullName.includes(query) || grNo.includes(query) || admissionNo.includes(query);
//     }

//     let listToFilter = [];

//     // 1. Determine base list based on card selection
//     if (selectedCard === "Total") {
//         listToFilter = combinedAllStudents;
//     } else if (selectedCard === "New Admission") {
//         listToFilter = activeStudents;
//     } else if (selectedCard === "LC Students") {
//         listToFilter = lcList;
//     }

//     // 2. Apply Linked Filters (Status, Std, Div)
//     return listToFilter.filter(student => {
//         // Status Filter
//         const isCurrentlyActive = student.status !== false;
//         if (selectedStatus === "Active" && !isCurrentlyActive) return false;
//         if (selectedStatus === "Inactive (LC)" && isCurrentlyActive) return false;

//         // Std Filter (Checking local list too in case API returns broader results)
//         if (selectedStd !== "All" && String(student.admission?.admissionstd) !== String(selectedStd)) return false;

//         // Div Filter
//         if (selectedDiv !== "All" && student.admission?.admissiondivision?.toUpperCase() !== selectedDiv.toUpperCase()) return false;

//         // Search Filter
//         return filterByName(student);
//     });
//   })();

//   const getTableHeaders = () => {
//     const defaultHeaders = ["Students Name", "Std", "Div", "Gender", "Contact no.", "Status"];
//     return [...defaultHeaders, "Action"];
//   };

//   const capitalizeName = (name) => {
//     if (!name || typeof name !== 'string') return ""; 
//     return name.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
//   };

//   const renderTableRow = (student) => {
//     const safeRead = (path, defaultValue = "") => {
//       const parts = path.split('.');
//       let current = student;
//       for (const part of parts) {
//         if (!current) return defaultValue;
//         current = current[part];
//       }
//       return current ?? defaultValue;
//     };

//     const isLCStudent = safeRead('status') === false; 

//     return (
//       <tr key={student._id || student.id} className="hover:bg-gray-50">
//         <td className="p-2 border">
//             {capitalizeName(safeRead('firstname'))} {capitalizeName(safeRead('middlename'))} {capitalizeName(safeRead('lastname'))}
//         </td>
//         <td className="p-2 border">{safeRead('admission.admissionstd')}</td>
//         <td className="p-2 border">{safeRead('admission.admissiondivision').toUpperCase()}</td>
//         <td className="p-2 border">{safeRead('gender')}</td>
//         <td className="p-2 border">{safeRead('parent.primarycontact')}</td>
//         <td className="p-2 border">{isLCStudent ? "Inactive (LC)" : "Active"}</td>
//         <td className="p-3 border">
//           <Link to={`edit-student/${safeRead('_id')}?mode=view`} className="text-gray-600 hover:text-blue-800 hover:underline mr-3">View</Link>
//           <Link to={`edit-student/${safeRead('_id')}`} className="text-blue-600 hover:text-blue-800 hover:underline">Edit</Link>
//         </td>
//       </tr>
//     );
//   };

//   if (loading) {
//     return (
//       <MainLayout>
//         <div className="h-full w-full p-6 bg-gray-50 flex items-center justify-center h-64">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading students...</p>
//           </div>
//         </div>
//       </MainLayout>
//     );
//   }

//   return (
//     <MainLayout>
//       <div className="h-full w-full p-6 bg-gray-50">
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
//             <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-300 w-full md:w-96 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500">
//                 <input
//                   type="text"
//                   placeholder="Search by Name/GR/Admission No..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 pr-2"
//                 />
//                 <FaSearch className="text-gray-400 ml-2 mr-3" />
//             </div>

//             <div className="flex items-center space-x-4">
//                 <select value={selectedStd} onChange={(e) => setSelectedStd(e.target.value)} className="p-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm">
//                     <option value="All">Select Standard</option>
//                     {AVAILABLE_STANDARDS.filter(s => s !== "All").map(std => <option key={std} value={std}>{std}</option>)}
//                 </select>

//                 <select value={selectedDiv} onChange={(e) => setSelectedDiv(e.target.value)} className="p-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm">
//                     <option value="All">Select Division</option>
//                     {AVAILABLE_DIVISIONS.filter(d => d !== "All").map(div => <option key={div} value={div}>{div}</option>)}
//                 </select>
                
//                 <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="p-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm">
//                     {AVAILABLE_STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
//                 </select>

//                 <Link to="/students-admission">
//                   <button className="flex items-center bg-blue-600 text-white font-medium py-2 px-5 rounded-full shadow-md hover:bg-blue-700 transition-all duration-150 whitespace-nowrap">
//                     + Add
//                   </button>
//                 </Link>
//             </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//           {cards.map((card) => (
//             <div key={card.key} onClick={() => setSelectedCard(card.key)} className={`cursor-pointer bg-white p-6 rounded-xl shadow text-center hover:bg-gray-100 ${selectedCard === card.key ? "ring-2 ring-blue-500" : ""}`}>
//               <h3 className="text-lg font-semibold text-gray-700">{card.title}</h3>
//               <p className={`text-2xl font-bold text-${card.color}-600`}>{card.count}</p>
//             </div>
//           ))}
//         </div>

//         {selectedCard && (
//           <div className="bg-white p-6 rounded-xl shadow">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">{selectedCard} Student List</h2>
//             <div className="overflow-x-auto">
//               <table className="w-full border border-gray-300 text-sm text-left">
//                 <thead className="bg-gray-100 text-gray-700 font-semibold">
//                   <tr>
//                     {getTableHeaders().map((heading, index) => <th key={index} className="p-2 border">{heading}</th>)}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredStudents.map((student) => renderTableRow(student))}
//                   {filteredStudents.length === 0 && (
//                     <tr><td colSpan={7} className="text-center p-4 text-gray-500">No students found.</td></tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// }

// import React, { useEffect, useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import { FaSearch } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import axios from "axios";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// // --- Updated Filter Constants ---
// const AVAILABLE_STANDARDS = ["All", "Nursery", "Junior", "Senior", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const AVAILABLE_DIVISIONS = ["All", "A", "B", "C", "D", "E"];
// const AVAILABLE_STATUSES = ["All", "Active", "Inactive (LC)"];

// export default function StudentManagement() {
//   const [studentList, setStudentList] = useState([]); 
//   const [lcList, setLCList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCard, setSelectedCard] = useState("New Admission");
//   const [searchQuery, setSearchQuery] = useState("");
  
//   // State for Filters
//   const [selectedStd, setSelectedStd] = useState("All");
//   const [selectedDiv, setSelectedDiv] = useState("All");
//   const [selectedStatus, setSelectedStatus] = useState("All");

//   // Fetch students data from API
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         setLoading(true);

//         const params = new URLSearchParams();
//         if (selectedStd !== "All") {
//           params.append('std', selectedStd);
//         }
//         if (selectedDiv !== "All") {
//           params.append('div', selectedDiv);
//         }

//         const response = await fetch(`${API_BASE_URL}api/students?${params.toString()}`, {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setStudentList(Array.isArray(data) ? data : []);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         console.error("Error fetching students:", err);
//       } 
//     };
    
//     const fetchLCStudents = async () => {
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}api/lcstudent`,
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         if (response.status !== 200) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = response.data; 
//         setLCList(Array.isArray(data) ? data : []);
//         setError(null);
//       } catch (error) {
//         setError(error.message);
//         console.error("Error fetching LC students:", error);
//       }
//     };

//     Promise.all([fetchStudents(), fetchLCStudents()])
//         .catch(err => console.error("One or more initial fetches failed:", err))
//         .finally(() => setLoading(false));

//   }, [selectedStd, selectedDiv]);

//   const activeStudents = studentList;
//   const newAdmissions = activeStudents.length;
//   const totalStudents = activeStudents.length + lcList.length;
//   const lcStudents = lcList.length;

//   const cards = [
//     { title: "Total Students", count: totalStudents, color: "blue", key: "Total" },
//     { title: "LC Students", count: lcStudents, color: "red", key: "LC Students" },
//     { title: "New Admission", count: newAdmissions, color: "green", key: "New Admission" },
//   ];

//   const combinedAllStudents = [...activeStudents, ...lcList];

//   const filteredStudents = (() => {
//     const query = searchQuery.toLowerCase();
    
//     const filterByName = (student) => {
//       const fullName = `${student.firstname || ''} ${student.middlename || ''} ${student.lastname || ''}`.toLowerCase();
//       const grNo = (student.admission?.grno || '').toLowerCase();
//       const admissionNo = (student.admission?.admissionno || '').toLowerCase();
//       return fullName.includes(query) || grNo.includes(query) || admissionNo.includes(query);
//     }

//     let listToFilter = [];

//     if (selectedCard === "Total") {
//         listToFilter = combinedAllStudents;
//     } else if (selectedCard === "New Admission") {
//         listToFilter = activeStudents;
//     } else if (selectedCard === "LC Students") {
//         listToFilter = lcList;
//     }

//     return listToFilter.filter(student => {
//         const isCurrentlyActive = student.status !== false;
//         if (selectedStatus === "Active" && !isCurrentlyActive) return false;
//         if (selectedStatus === "Inactive (LC)" && isCurrentlyActive) return false;
//         if (selectedStd !== "All" && String(student.admission?.admissionstd) !== String(selectedStd)) return false;
//         if (selectedDiv !== "All" && student.admission?.admissiondivision?.toUpperCase() !== selectedDiv.toUpperCase()) return false;
//         return filterByName(student);
//     });
//   })();

//   const getTableHeaders = () => {
//     if (selectedCard === "Total") {
//       return ["Admission no.", "Students Name", "GR No.", "Std", "Div", "Gender", "Contact no.", "Status", "Action"];
//     } else if (selectedCard === "LC Students") {
//       return ["LC no.", "Students Name", "GR No.", "Std", "Div", "Gender", "Contact no.", "Status", "Action"];
//     } else if (selectedCard === "New Admission") {
//       return ["Admission no.", "Students Name", "Std", "Div", "Gender", "Contact no.", "Status", "Action"];
//     }
//     return [];
//   };

//   const capitalizeName = (name) => {
//     if (!name || typeof name !== 'string') return ""; 
//     return name.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
//   };

//   const renderTableRow = (student) => {
//     const safeRead = (path, defaultValue = "") => {
//       const parts = path.split('.');
//       let current = student;
//       for (const part of parts) {
//         if (!current) return defaultValue;
//         current = current[part];
//       }
//       return current ?? defaultValue;
//     };

//     const isLCStudent = safeRead('status') === false; 

//     // Reusable Data Cells
//     const studentNameCell = (
//       <td className="p-2 border">
//           {capitalizeName(safeRead('firstname'))} {capitalizeName(safeRead('middlename'))} {capitalizeName(safeRead('lastname'))}
//       </td>
//     );
//     const grNoCell = <td className="p-2 border">{safeRead('admission.grno').toUpperCase()}</td>;
//     const commonCells = (
//       <>
//         <td className="p-2 border">{safeRead('admission.admissionstd')}</td>
//         <td className="p-2 border">{safeRead('admission.admissiondivision').toUpperCase()}</td>
//         <td className="p-2 border">{safeRead('gender')}</td>
//         <td className="p-2 border">{safeRead('parent.primarycontact')}</td>
//         <td className="p-2 border">{isLCStudent ? "Inactive (LC)" : "Active"}</td>
//         <td className="p-3 border">
//           <Link to={`edit-student/${safeRead('_id')}?mode=view`} className="text-gray-600 hover:text-blue-800 hover:underline mr-3">View</Link>
//           <Link to={`edit-student/${safeRead('_id')}`} className="text-blue-600 hover:text-blue-800 hover:underline">Edit</Link>
//         </td>
//       </>
//     );

//     return (
//       <tr key={student._id || student.id} className="hover:bg-gray-50">
//         {selectedCard === "Total" && (
//           <>
//             <td className="p-2 border">{safeRead('admission.admissionno')}</td>
//             {studentNameCell}
//             {grNoCell}
//           </>
//         )}
//         {selectedCard === "LC Students" && (
//           <>
//             <td className="p-2 border">{safeRead('lcno') || safeRead('admission.admissionno')}</td>
//             {studentNameCell}
//             {grNoCell}
//           </>
//         )}
//         {selectedCard === "New Admission" && (
//           <>
//             <td className="p-2 border">{safeRead('admission.admissionno')}</td>
//             {studentNameCell}
//           </>
//         )}
//         {commonCells}
//       </tr>
//     );
//   };

//   if (loading) {
//     return (
//       <MainLayout>
//         <div className="h-full w-full p-6 bg-gray-50 flex items-center justify-center">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading students...</p>
//           </div>
//         </div>
//       </MainLayout>
//     );
//   }

//   return (
//     <MainLayout>
//       <div className="h-full w-full p-6 bg-gray-50">
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
//             <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-300 w-full md:w-96 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500">
//                 <input
//                   type="text"
//                   placeholder="Search by Name/GR/Admission No..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 pr-2"
//                 />
//                 <FaSearch className="text-gray-400 ml-2 mr-3" />
//             </div>

//             <div className="flex items-center space-x-4">
//                 <select value={selectedStd} onChange={(e) => setSelectedStd(e.target.value)} className="p-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm">
//                     <option value="All">Select Standard</option>
//                     {AVAILABLE_STANDARDS.filter(s => s !== "All").map(std => <option key={std} value={std}>{std}</option>)}
//                 </select>

//                 <select value={selectedDiv} onChange={(e) => setSelectedDiv(e.target.value)} className="p-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm">
//                     <option value="All">Select Division</option>
//                     {AVAILABLE_DIVISIONS.filter(d => d !== "All").map(div => <option key={div} value={div}>{div}</option>)}
//                 </select>
                
//                 <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="p-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm">
//                     {AVAILABLE_STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
//                 </select>

//                 <Link to="/students-admission">
//                   <button className="flex items-center bg-blue-600 text-white font-medium py-2 px-5 rounded-full shadow-md hover:bg-blue-700 transition-all duration-150 whitespace-nowrap">
//                     + Add
//                   </button>
//                 </Link>
//             </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//           {cards.map((card) => (
//             <div key={card.key} onClick={() => setSelectedCard(card.key)} className={`cursor-pointer bg-white p-6 rounded-xl shadow text-center hover:bg-gray-100 ${selectedCard === card.key ? "ring-2 ring-blue-500" : ""}`}>
//               <h3 className="text-lg font-semibold text-gray-700">{card.title}</h3>
//               <p className={`text-2xl font-bold text-${card.color}-600`}>{card.count}</p>
//             </div>
//           ))}
//         </div>

//         {selectedCard && (
//           <div className="bg-white p-6 rounded-xl shadow">
//             <h2 className="text-xl font-semibold mb-4 text-gray-800">{selectedCard} Student List</h2>
//             <div className="overflow-x-auto">
//               <table className="w-full border border-gray-300 text-sm text-left">
//                 <thead className="bg-gray-100 text-gray-700 font-semibold">
//                   <tr>
//                     {getTableHeaders().map((heading, index) => <th key={index} className="p-2 border">{heading}</th>)}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredStudents.map((student) => renderTableRow(student))}
//                   {filteredStudents.length === 0 && (
//                     <tr><td colSpan={getTableHeaders().length} className="text-center p-4 text-gray-500">No students found.</td></tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// }
import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

// --- Updated Filter Constants ---
const AVAILABLE_STANDARDS = ["All", "Nursery", "Junior", "Senior", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const AVAILABLE_DIVISIONS = ["All", "A", "B", "C", "D", "E"];
const AVAILABLE_STATUSES = ["All", "Active", "Inactive (LC)"];

export default function StudentManagement() {
  const [studentList, setStudentList] = useState([]); 
  const [lcList, setLCList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // State for Filters
  const [selectedStd, setSelectedStd] = useState("All");
  const [selectedDiv, setSelectedDiv] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  // Fetch students data from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if (selectedStd !== "All") {
          params.append('std', selectedStd);
        }
        if (selectedDiv !== "All") {
          params.append('div', selectedDiv);
        }

        const response = await fetch(`${API_BASE_URL}api/students?${params.toString()}`, {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStudentList(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching students:", err);
      } 
    };
    
    const fetchLCStudents = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}api/lcstudent`,
          {
            headers: {
              auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
            },
          }
        );
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = response.data; 
        setLCList(Array.isArray(data) ? data : []);
        setError(null);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching LC students:", error);
      }
    };

    Promise.all([fetchStudents(), fetchLCStudents()])
        .catch(err => console.error("One or more initial fetches failed:", err))
        .finally(() => setLoading(false));

  }, [selectedStd, selectedDiv]);

  // Reset to page 1 whenever filters or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStd, selectedDiv, selectedStatus, selectedCard, searchQuery]);

  const activeStudents = studentList;
  const newAdmissions = activeStudents.length;
  const totalStudents = activeStudents.length + lcList.length;
  const lcStudents = lcList.length;

  const cards = [
    { title: "Total Students", count: totalStudents, color: "blue", key: "Total" },
    { title: "LC Students", count: lcStudents, color: "red", key: "LC Students" },
    { title: "New Admission", count: newAdmissions, color: "green", key: "New Admission" },
  ];

  const combinedAllStudents = [...activeStudents, ...lcList];

  const filteredStudents = (() => {
    const query = searchQuery.toLowerCase();
    
    const filterByName = (student) => {
      const fullName = `${student.firstname || ''} ${student.middlename || ''} ${student.lastname || ''}`.toLowerCase();
      const grNo = (student.admission?.grno || '').toLowerCase();
      const admissionNo = (student.admission?.admissionno || '').toLowerCase();
      return fullName.includes(query) || grNo.includes(query) || admissionNo.includes(query);
    }

    let listToFilter = [];

    if (selectedCard === "Total") {
        listToFilter = combinedAllStudents;
    } else if (selectedCard === "New Admission") {
        listToFilter = activeStudents;
    } else if (selectedCard === "LC Students") {
        listToFilter = lcList;
    }

    return listToFilter.filter(student => {
        const isCurrentlyActive = student.status !== false;
        if (selectedStatus === "Active" && !isCurrentlyActive) return false;
        if (selectedStatus === "Inactive (LC)" && isCurrentlyActive) return false;
        if (selectedStd !== "All" && String(student.admission?.admissionstd) !== String(selectedStd)) return false;
        if (selectedDiv !== "All" && student.admission?.admissiondivision?.toUpperCase() !== selectedDiv.toUpperCase()) return false;
        return filterByName(student);
    });
  })();

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredStudents.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

  const getTableHeaders = () => {
    if (selectedCard === "Total") {
      return ["Admission no.", "Students Name", "GR No.", "Std", "Div", "Gender", "Contact no.", "Status", "Action"];
    } else if (selectedCard === "LC Students") {
      return ["LC no.", "Students Name", "GR No.", "Std", "Div", "Gender", "Contact no.", "Status", "Action"];
    } else if (selectedCard === "New Admission") {
      return ["Admission no.", "Students Name", "Std", "Div", "Gender", "Contact no.", "Status", "Action"];
    }
    return [];
  };

  const capitalizeName = (name) => {
    if (!name || typeof name !== 'string') return ""; 
    return name.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
  };

  const renderTableRow = (student) => {
    const safeRead = (path, defaultValue = "") => {
      const parts = path.split('.');
      let current = student;
      for (const part of parts) {
        if (!current) return defaultValue;
        current = current[part];
      }
      return current ?? defaultValue;
    };

    const isLCStudent = safeRead('status') === false; 

    // Reusable Data Cells
    const studentNameCell = (
      <td className="p-2 border">
          {capitalizeName(safeRead('firstname'))} {capitalizeName(safeRead('middlename'))} {capitalizeName(safeRead('lastname'))}
      </td>
    );
    const grNoCell = <td className="p-2 border">{safeRead('admission.grno').toUpperCase()}</td>;
    const commonCells = (
      <>
        <td className="p-2 border">{safeRead('admission.admissionstd')}</td>
        <td className="p-2 border">{safeRead('admission.admissiondivision').toUpperCase()}</td>
        <td className="p-2 border">{safeRead('gender')}</td>
        <td className="p-2 border">{safeRead('parent.primarycontact')}</td>
        <td className="p-2 border">{isLCStudent ? "Inactive (LC)" : "Active"}</td>
        <td className="p-3 border">
          <Link to={`edit-student/${safeRead('_id')}?mode=view`} className="text-gray-600 hover:text-blue-800 hover:underline mr-3">View</Link>
          <Link to={`edit-student/${safeRead('_id')}`} className="text-blue-600 hover:text-blue-800 hover:underline">Edit</Link>
        </td>
      </>
    );

    return (
      <tr key={student._id || student.id} className="hover:bg-gray-50">
        {selectedCard === "Total" && (
          <>
            <td className="p-2 border">{safeRead('admission.admissionno')}</td>
            {studentNameCell}
            {grNoCell}
          </>
        )}
        {selectedCard === "LC Students" && (
          <>
            <td className="p-2 border">{safeRead('lcno') || safeRead('admission.admissionno')}</td>
            {studentNameCell}
            {grNoCell}
          </>
        )}
        {selectedCard === "New Admission" && (
          <>
            <td className="p-2 border">{safeRead('admission.admissionno')}</td>
            {studentNameCell}
          </>
        )}
        {commonCells}
      </tr>
    );
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="h-full w-full p-6 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading students...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="h-full w-full p-6 bg-gray-50">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-300 w-full md:w-96 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  type="text"
                  placeholder="Search by Name/GR/Admission No..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 pr-2"
                />
                <FaSearch className="text-gray-400 ml-2 mr-3" />
            </div>

            <div className="flex items-center space-x-4">
                <select value={selectedStd} onChange={(e) => setSelectedStd(e.target.value)} className="p-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm">
                    <option value="All">Select Standard</option>
                    {AVAILABLE_STANDARDS.filter(s => s !== "All").map(std => <option key={std} value={std}>{std}</option>)}
                </select>

                <select value={selectedDiv} onChange={(e) => setSelectedDiv(e.target.value)} className="p-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm">
                    <option value="All">Select Division</option>
                    {AVAILABLE_DIVISIONS.filter(d => d !== "All").map(div => <option key={div} value={div}>{div}</option>)}
                </select>
                
                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="p-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm">
                    {AVAILABLE_STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
                </select>

                <Link to="/students-admission">
                  <button className="flex items-center bg-blue-600 text-white font-medium py-2 px-5 rounded-full shadow-md hover:bg-blue-700 transition-all duration-150 whitespace-nowrap">
                    + Add
                  </button>
                </Link>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {cards.map((card) => (
            <div key={card.key} onClick={() => setSelectedCard(card.key)} className={`cursor-pointer bg-white p-6 rounded-xl shadow text-center hover:bg-gray-100 ${selectedCard === card.key ? "ring-2 ring-blue-500" : ""}`}>
              <h3 className="text-lg font-semibold text-gray-700">{card.title}</h3>
              <p className={`text-2xl font-bold text-${card.color}-600`}>{card.count}</p>
            </div>
          ))}
        </div>

        {selectedCard ? (
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-xl font-semibold text-gray-800">{selectedCard} Student List</h2>
               {/* Updated Filter Result Count Display */}
               <div className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-blue-200">
                  Total Student{selectedStd !== "All" ? ` (Std ${selectedStd})` : ""}{selectedDiv !== "All" ? ` (Div ${selectedDiv})` : ""}: {filteredStudents.length}
               </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                  <tr>
                    {getTableHeaders().map((heading, index) => <th key={index} className="p-2 border">{heading}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((student) => renderTableRow(student))}
                  {currentRows.length === 0 && (
                    <tr><td colSpan={getTableHeaders().length} className="text-center p-4 text-gray-500">No students found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 px-2">
                <p className="text-sm text-gray-600">
                  Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, filteredStudents.length)} of {filteredStudents.length} entries
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    <FaChevronLeft className="text-gray-600 text-xs" />
                  </button>
                  <span className="text-sm font-medium text-gray-700 px-3">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    <FaChevronRight className="text-gray-600 text-xs" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow">
            <h3 className="text-xl font-medium text-gray-600">Select a Category</h3>
            <p className="text-gray-400 mt-2">Click on a card to view the student details.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}