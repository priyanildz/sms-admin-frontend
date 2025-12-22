// import React, { useEffect, useState } from "react";
// import { Search } from "lucide-react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";

// export default function ExamManagement() {
//   const [selectedStudents, setSelectedStudents] = useState(new Set());
//   const [searchTerm, setSearchTerm] = useState("");
//   const [promoteFrom, setPromoteFrom] = useState("");
//   const [promoteTo, setPromoteTo] = useState("");
//   const [selectAll, setSelectAll] = useState(false);
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/students", {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         });
//         if (response.status === 200) {
//           setStudents(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching students:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStudents();
//   }, []);

//   // Filter students based on search term
//   const filteredStudents = students.filter((student) => {
//     const fullName = `${student.firstname} ${student.middlename || ''} ${student.lastname}`.trim();
//     const admissionStd = student.admission?.admissionstd || '';
//     return (
//       fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       admissionStd.includes(searchTerm)
//     );
//   });

//   // Filter students by selected class if promoteFrom is selected
//   const studentsInSelectedClass = promoteFrom 
//     ? filteredStudents.filter(student => 
//         student.admission?.admissionstd === promoteFrom.replace('Class ', '')
//       )
//     : filteredStudents;

//   const handleStudentToggle = (studentId) => {
//     const newSelected = new Set(selectedStudents);
//     if (newSelected.has(studentId)) {
//       newSelected.delete(studentId);
//     } else {
//       newSelected.add(studentId);
//     }
//     setSelectedStudents(newSelected);
//     setSelectAll(newSelected.size === studentsInSelectedClass.length);
//   };

//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedStudents(new Set());
//       setSelectAll(false);
//     } else {
//       setSelectedStudents(new Set(studentsInSelectedClass.map(s => s.studentid)));
//       setSelectAll(true);
//     }
//   };

//   const gradeOptions = [
//     "Class 1",
//     "Class 2", 
//     "Class 3",
//     "Class 4",
//     "Class 5",
//     "Class 6",
//     "Class 7",
//     "Class 8",
//     "Class 9",
//     "Class 10",
//   ];

//   // Auto-promotion logic: when "Promote From" changes, automatically set "Promote to" as next class
//   const handlePromoteFromChange = (selectedClass) => {
//     setPromoteFrom(selectedClass);
    
//     if (selectedClass) {
//       const currentIndex = gradeOptions.indexOf(selectedClass);
//       if (currentIndex !== -1 && currentIndex < gradeOptions.length - 1) {
//         // Set next class (+1)
//         setPromoteTo(gradeOptions[currentIndex + 1]);
//       } else if (selectedClass === 'Class 10') {
//         // Class 10 promotes to Graduated
//         setPromoteTo('Graduated');
//       }
//     } else {
//       setPromoteTo('');
//     }
    
//     // Clear selections when class changes
//     setSelectedStudents(new Set());
//     setSelectAll(false);
//   };

//   const handlePromotion = async () => {
//     if (selectedStudents.size === 0) {
//       alert("Please select students to promote");
//       return;
//     }
    
//     if (!promoteFrom || !promoteTo) {
//       alert("Please select both 'Promote From' and 'Promote To' classes");
//       return;
//     }

//     // Here you can add API call to promote students
//     console.log("Promoting students:", {
//       selectedStudents: Array.from(selectedStudents),
//       fromClass: promoteFrom,
//       toClass: promoteTo
//     });
    
//     alert(`${selectedStudents.size} students will be promoted from ${promoteFrom} to ${promoteTo}`);
//   };

//   return (
//     <MainLayout>
//       {/* Main Content */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-medium text-gray-800">
//             Promote Students
//           </h2>
//           <button 
//             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//             onClick={handlePromotion}
//           >
//             Promote
//           </button>
//         </div>

//         {/* Form Controls */}
//         <div className="space-y-4 mb-6">
//           {/* Academic Year */}
//           <div className="flex items-center space-x-3">
//             <label className="text-gray-700 font-medium w-32">
//               Academic Year:
//             </label>
//             <input
//               type="text"
//               className="border border-gray-300 rounded px-3 py-2 w-64 bg-gray-100"
//               placeholder="2025-2026"
//               readOnly
//             />
//           </div>

//           {/* Promote From/To */}
//           <div className="flex items-center space-x-3">
//             <label className="text-gray-700 font-medium w-32">
//               Promote From
//             </label>
//             <select
//               className="border border-gray-300 rounded px-3 py-2 w-40"
//               value={promoteFrom}
//               onChange={(e) => handlePromoteFromChange(e.target.value)}
//             >
//               <option value="">Select</option>
//               {gradeOptions.map((grade) => (
//                 <option key={grade} value={grade}>
//                   {grade}
//                 </option>
//               ))}
//             </select>

//             <span className="text-gray-700 font-medium">to</span>
//             <label className="text-gray-700 font-medium">Promote to</label>
//             <select
//               className="border border-gray-300 rounded px-3 py-2 w-40"
//               value={promoteTo}
//               onChange={(e) => setPromoteTo(e.target.value)}
//             >
//               <option value="">Select</option>
//               {gradeOptions.map((grade) => (
//                 <option key={grade} value={grade}>
//                   {grade}
//                 </option>
//               ))}
//               <option value="Graduated">Graduated</option>
//             </select>
//           </div>
//         </div>

//         {/* Search */}
//         <div className="relative mb-6">
//           <input
//             type="text"
//             placeholder="Search Students by name or class"
//             className="w-full border-2 border-blue-400 rounded-lg px-4 py-2 pr-12 focus:outline-none focus:border-blue-500"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
//         </div>

//         {/* Class Filter Info */}
//         {promoteFrom && (
//           <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//             <p className="text-yellow-800">
//               Showing students from {promoteFrom} ({studentsInSelectedClass.length} students)
//             </p>
//           </div>
//         )}

//         {/* Students Table */}
//         <div className="border-2 border-blue-400 rounded-lg overflow-hidden">
//           {/* Table Header */}
//           <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
//             <div className="flex items-center space-x-3">
//               <input
//                 type="checkbox"
//                 checked={selectAll && studentsInSelectedClass.length > 0}
//                 onChange={handleSelectAll}
//                 disabled={studentsInSelectedClass.length === 0}
//                 className="w-5 h-5 accent-white"
//               />
//               <span className="font-medium text-lg">Students Names</span>
//             </div>
//             <div className="text-sm bg-white text-blue-500 px-3 py-1 rounded">
//               {selectedStudents.size} selected
//             </div>
//           </div>

//           {/* Students List */}
//           <div className="bg-white max-h-96 overflow-y-auto">
//             {loading ? (
//               <div className="p-8 text-center text-gray-500">
//                 Loading students...
//               </div>
//             ) : studentsInSelectedClass.length === 0 ? (
//               <div className="p-8 text-center text-gray-500">
//                 {promoteFrom 
//                   ? `No students found in ${promoteFrom}` 
//                   : searchTerm 
//                     ? `No students found matching "${searchTerm}"`
//                     : "Please select a class to view students"
//                 }
//               </div>
//             ) : (
//               studentsInSelectedClass.map((student) => {
//                 const fullName = `${student.firstname} ${student.middlename || ''} ${student.lastname}`.trim();
//                 const currentClass = student.admission?.admissionstd || 'N/A';
                
//                 return (
//                   <div
//                     key={student.studentid}
//                     className={`flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
//                       selectedStudents.has(student.studentid) ? "bg-blue-50" : ""
//                     }`}
//                     onClick={() => handleStudentToggle(student.studentid)}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={selectedStudents.has(student.studentid)}
//                       onChange={() => handleStudentToggle(student.studentid)}
//                       className="w-5 h-5 mr-4 accent-blue-500"
//                     />
//                     <div className="flex-1">
//                       <span className="text-gray-800 font-medium">{fullName}</span>
//                       {/* <span className="ml-3 text-sm text-gray-500">
//                         (Class {currentClass} - {student.admission?.admissiondivision || 'N/A'})
//                       </span> */}
//                     </div>
//                     <div className="text-sm text-gray-400">
//                       Roll no: {student.admission?.admissionno || 'N/A'}
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         </div>

//         {/* Selection Summary */}
//         {selectedStudents.size > 0 && (
//           <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
//             <p className="text-blue-700 font-medium">
//               {selectedStudents.size} student
//               {selectedStudents.size !== 1 ? "s" : ""} selected for promotion
//               {promoteFrom && promoteTo && (
//                 <span className="ml-2">
//                   from {promoteFrom} to {promoteTo}
//                 </span>
//               )}
//             </p>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// }



// import { useState, useEffect } from "react";
// import { Search } from "lucide-react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// export default function ExamManagement() {
//   const [selectedStudents, setSelectedStudents] = useState(new Set());
//   const [searchTerm, setSearchTerm] = useState("");
//   const [promoteFrom, setPromoteFrom] = useState("");
//   const [promoteTo, setPromoteTo] = useState("");
//   const [selectAll, setSelectAll] = useState(false);
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         // FIX: Using imported API_BASE_URL
//         const response = await axios.get(`${API_BASE_URL}api/students`, {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         });
//         if (response.status === 200) {
//           setStudents(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching students:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStudents();
//   }, []);

//   // Filter students based on search term
//   const filteredStudents = students.filter((student) => {
//     const fullName = `${student.firstname} ${student.middlename || ''} ${student.lastname}`.trim();
//     const admissionStd = student.admission?.admissionstd || '';
//     return (
//       fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       admissionStd.includes(searchTerm)
//     );
//   });

//   // Filter students by selected class if promoteFrom is selected
//   const studentsInSelectedClass = promoteFrom 
//     ? filteredStudents.filter(student => 
//         student.admission?.admissionstd === promoteFrom.replace('Class ', '')
//       )
//         : filteredStudents;

//   const handleStudentToggle = (studentId) => {
//     const newSelected = new Set(selectedStudents);
//     if (newSelected.has(studentId)) {
//       newSelected.delete(studentId);
//     } else {
//       newSelected.add(studentId);
//     }
//     setSelectedStudents(newSelected);
//     setSelectAll(newSelected.size === studentsInSelectedClass.length);
//   };

//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedStudents(new Set());
//       setSelectAll(false);
//     } else {
//       setSelectedStudents(new Set(studentsInSelectedClass.map(s => s.studentid)));
//       setSelectAll(true);
//     }
//   };

//   const gradeOptions = [
//     "Class 1",
//     "Class 2", 
//     "Class 3",
//     "Class 4",
//     "Class 5",
//     "Class 6",
//     "Class 7",
//     "Class 8",
//     "Class 9",
//     "Class 10",
//   ];

//   // Auto-promotion logic: when "Promote From" changes, automatically set "Promote to" as next class
//   const handlePromoteFromChange = (selectedClass) => {
//     setPromoteFrom(selectedClass);
//     
//     if (selectedClass) {
//       const currentIndex = gradeOptions.indexOf(selectedClass);
//       if (currentIndex !== -1 && currentIndex < gradeOptions.length - 1) {
//         // Set next class (+1)
//         setPromoteTo(gradeOptions[currentIndex + 1]);
//       } else if (selectedClass === 'Class 10') {
//         // Class 10 promotes to Graduated
//         setPromoteTo('Graduated');
//       }
//     } else {
//       setPromoteTo('');
//     }
//     
//     // Clear selections when class changes
//     setSelectedStudents(new Set());
//     setSelectAll(false);
//   };

//   const handlePromotion = async () => {
//     if (selectedStudents.size === 0) {
//       alert("Please select students to promote");
//       return;
//     }
//     
//     if (!promoteFrom || !promoteTo) {
//       alert("Please select both 'Promote From' and 'Promote To' classes");
//       return;
//     }

//     // Here you can add API call to promote students
//     console.log("Promoting students:", {
//       selectedStudents: Array.from(selectedStudents),
//       fromClass: promoteFrom,
//       toClass: promoteTo
//     });
//     
//     alert(`${selectedStudents.size} students will be promoted from ${promoteFrom} to ${promoteTo}`);
//   };

//   return (
//     <MainLayout>
//       {/* Main Content */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-medium text-gray-800">
//             Promote Students
//           </h2>
//           <button 
//             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//             onClick={handlePromotion}
//           >
//             Promote
//           </button>
//         </div>

//         {/* Form Controls */}
//         <div className="space-y-4 mb-6">
//           {/* Academic Year */}
//           <div className="flex items-center space-x-3">
//             <label className="text-gray-700 font-medium w-32">
//               Academic Year:
//             </label>
//             <input
//               type="text"
//               className="border border-gray-300 rounded px-3 py-2 w-64 bg-gray-100"
//               placeholder="2025-2026"
//               readOnly
//             />
//           </div>

//           {/* Promote From/To */}
//           <div className="flex items-center space-x-3">
//             <label className="text-gray-700 font-medium w-32">
//               Promote From
//             </label>
//             <select
//               className="border border-gray-300 rounded px-3 py-2 w-40"
//               value={promoteFrom}
//               onChange={(e) => handlePromoteFromChange(e.target.value)}
//             >
//               <option value="">Select</option>
//               {gradeOptions.map((grade) => (
//                 <option key={grade} value={grade}>
//                   {grade}
//                 </option>
//               ))}
//             </select>

//             <span className="text-gray-700 font-medium">to</span>
//             <label className="text-gray-700 font-medium">Promote to</label>
//             <select
//               className="border border-gray-300 rounded px-3 py-2 w-40"
//               value={promoteTo}
//               onChange={(e) => setPromoteTo(e.target.value)}
//             >
//               <option value="">Select</option>
//               {gradeOptions.map((grade) => (
//                 <option key={grade} value={grade}>
//                   {grade}
//                 </option>
//               ))}
//               <option value="Graduated">Graduated</option>
//             </select>
//           </div>
//         </div>

//         {/* Search */}
//         <div className="relative mb-6">
//           <input
//             type="text"
//             placeholder="Search Students by name or class"
//             className="w-full border-2 border-blue-400 rounded-lg px-4 py-2 pr-12 focus:outline-none focus:border-blue-500"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
//         </div>

//         {/* Class Filter Info */}
//         {promoteFrom && (
//           <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//             <p className="text-yellow-800">
//               Showing students from {promoteFrom} ({studentsInSelectedClass.length} students)
//             </p>
//           </div>
//         )}

//         {/* Students Table */}
//         <div className="border-2 border-blue-400 rounded-lg overflow-hidden">
//           {/* Table Header */}
//           <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
//             <div className="flex items-center space-x-3">
//               <input
//                 type="checkbox"
//                 checked={selectAll && studentsInSelectedClass.length > 0}
//                 onChange={handleSelectAll}
//                 disabled={studentsInSelectedClass.length === 0}
//                 className="w-5 h-5 accent-white"
//               />
//               <span className="font-medium text-lg">Students Names</span>
//             </div>
//             <div className="text-sm bg-white text-blue-500 px-3 py-1 rounded">
//               {selectedStudents.size} selected
//             </div>
//           </div>

//           {/* Students List */}
//           <div className="bg-white max-h-96 overflow-y-auto">
//             {loading ? (
//               <div className="p-8 text-center text-gray-500">
//                 Loading students...
//               </div>
//             ) : studentsInSelectedClass.length === 0 ? (
//               <div className="p-8 text-center text-gray-500">
//                 {promoteFrom 
//                   ? `No students found in ${promoteFrom}` 
//                   : searchTerm 
//                     ? `No students found matching "${searchTerm}"`
//                     : "Please select a class to view students"
//                 }
//               </div>
//             ) : (
//               studentsInSelectedClass.map((student) => {
//                 const fullName = `${student.firstname} ${student.middlename || ''} ${student.lastname}`.trim();
//                 const currentClass = student.admission?.admissionstd || 'N/A';
//                 
//                 return (
//                   <div
//                     key={student.studentid}
//                     className={`flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
//                       selectedStudents.has(student.studentid) ? "bg-blue-50" : ""
//                     }`}
//                     onClick={() => handleStudentToggle(student.studentid)}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={selectedStudents.has(student.studentid)}
//                       onChange={() => handleStudentToggle(student.studentid)}
//                       className="w-5 h-5 mr-4 accent-blue-500"
//                     />
//                     <div className="flex-1">
//                       <span className="text-gray-800 font-medium">{fullName}</span>
//                       {/* <span className="ml-3 text-sm text-gray-500">
//                         (Class {currentClass} - {student.admission?.admissiondivision || 'N/A'})
//                       </span> */}
//                     </div>
//                     <div className="text-sm text-gray-400">
//                       Roll no: {student.admission?.admissionno || 'N/A'}
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         </div>

//         {/* Selection Summary */}
//         {selectedStudents.size > 0 && (
//           <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
//             <p className="text-blue-700 font-medium">
//               {selectedStudents.size} student
//               {selectedStudents.size !== 1 ? "s" : ""} selected for promotion
//               {promoteFrom && promoteTo && (
//                 <span className="ml-2">
//                   from {promoteFrom} to {promoteTo}
//                 </span>
//               )}
//             </p>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// }



// import { useState, useEffect } from "react";
// import { Search } from "lucide-react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// export default function ExamManagement() {
//   const [selectedStudents, setSelectedStudents] = useState(new Set());
//   const [searchTerm, setSearchTerm] = useState("");
//   const [promoteFrom, setPromoteFrom] = useState("");
//   const [promoteTo, setPromoteTo] = useState("");
//   const [selectAll, setSelectAll] = useState(false);
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchStudents = async () => {
//     try {
//       // FIX: Using imported API_BASE_URL
//       const response = await axios.get(`${API_BASE_URL}api/students`, {
//         headers: {
//           auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//         },
//       });
//       if (response.status === 200) {
//         setStudents(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching students:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   // Filter students based on search term
//   const filteredStudents = students.filter((student) => {
//     const fullName = `${student.firstname} ${student.middlename || ''} ${student.lastname}`.trim();
//     const admissionStd = student.admission?.admissionstd || '';
//     return (
//       fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       admissionStd.includes(searchTerm)
//     );
//   });

//   // Filter students by selected class if promoteFrom is selected
//   const studentsInSelectedClass = promoteFrom 
//     ? filteredStudents.filter(student => 
//         student.admission?.admissionstd === promoteFrom.replace('Class ', '')
//       )
//         : filteredStudents;

//   const handleStudentToggle = (studentId) => {
//     const newSelected = new Set(selectedStudents);
//     if (newSelected.has(studentId)) {
//       newSelected.delete(studentId);
//     } else {
//       newSelected.add(studentId);
//     }
//     setSelectedStudents(newSelected);
//     setSelectAll(newSelected.size === studentsInSelectedClass.length);
//   };

//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedStudents(new Set());
//       setSelectAll(false);
//     } else {
//       setSelectedStudents(new Set(studentsInSelectedClass.map(s => s.studentid)));
//       setSelectAll(true);
//     }
//   };

//   const gradeOptions = [
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

//   // Auto-promotion logic: when "Promote From" changes, automatically set "Promote to" as next class
//   const handlePromoteFromChange = (selectedClass) => {
//     setPromoteFrom(selectedClass);
//     
//     if (selectedClass) {
//       const currentIndex = gradeOptions.indexOf(selectedClass);
//       if (currentIndex !== -1 && currentIndex < gradeOptions.length - 1) {
//         // Set next class (+1)
//         setPromoteTo(gradeOptions[currentIndex + 1]);
//       } else if (selectedClass === 'Class 10') {
//         // Class 10 promotes to Graduated
//         setPromoteTo('Graduated');
//       }
//     } else {
//       setPromoteTo('');
//     }
//     
//     // Clear selections when class changes
//     setSelectedStudents(new Set());
//     setSelectAll(false);
//   };

//   const handlePromotion = async () => {
//     if (selectedStudents.size === 0) {
//       alert("Please select students to promote");
//       return;
//     }
//     
//     if (!promoteFrom || !promoteTo) {
//       alert("Please select both 'Promote From' and 'Promote To' classes");
//       return;
//     }

//     setLoading(true); // Start loading state for promotion

//     // 1. Prepare data for API
//     // Extract the standard number (or null/special flag for 'Graduated')
//     const newStd = promoteTo === 'Graduated' ? null : promoteTo.replace('Class ', ''); 
//     const studentIds = Array.from(selectedStudents);
//     
//     // NOTE: Assuming division remains the same or is handled by the backend for simplicity.
//     // If division needs to be promoted (e.g., A -> B), that logic must be included here.

//     const payload = {
//       studentIds: studentIds,
//       newStandard: newStd,
//       // For a real system, you might need to determine the new division or pass null:
//       newDivision: null 
//     };

//     try {
//       // 2. Call the promotion API
//       const response = await axios.post(`${API_BASE_URL}api/promote-students`, payload, {
//         headers: {
//           auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           'Content-Type': 'application/json'
//         },
//       });

//       // 3. Handle success
//       alert(response.data.message);
//       
//       // Clear selection and refresh the list to show updated classes
//       setSelectedStudents(new Set());
//       setSelectAll(false);
//       
//       // Reload students from the server to reflect the promotion changes
//       await fetchStudents(); 
//       
//     } catch (error) {
//       console.error("Error promoting students:", error);
//       alert(`Promotion failed: ${error.response?.data?.message || error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <MainLayout>
//       {/* Main Content */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-medium text-gray-800">
//             Promote Students
//           </h2>
//           <button 
//             className={`text-white px-6 py-2 rounded-lg font-medium transition-colors ${
//               selectedStudents.size > 0 && promoteTo && !loading
//                 ? "bg-blue-500 hover:bg-blue-600"
//                 : "bg-gray-400 cursor-not-allowed"
//             }`}
//             onClick={handlePromotion}
//             disabled={selectedStudents.size === 0 || !promoteTo || loading}
//           >
//             {loading ? 'Processing...' : 'Promote'}
//           </button>
//         </div>

//         {/* Form Controls */}
//         <div className="space-y-4 mb-6">
//           {/* Academic Year */}
//           <div className="flex items-center space-x-3">
//             <label className="text-gray-700 font-medium w-32">
//               Academic Year:
//             </label>
//             <input
//               type="text"
//               className="border border-gray-300 rounded px-3 py-2 w-64 bg-gray-100"
//               placeholder="2025-2026"
//               readOnly
//             />
//           </div>

//           {/* Promote From/To */}
//           <div className="flex items-center space-x-3">
//             <label className="text-gray-700 font-medium w-32">
//               Promote From
//             </label>
//             <select
//               className="border border-gray-300 rounded px-3 py-2 w-40"
//               value={promoteFrom}
//               onChange={(e) => handlePromoteFromChange(e.target.value)}
//             >
//               <option value="">Select</option>
//               {gradeOptions.map((grade) => (
//                 <option key={grade} value={grade}>
//                   {grade}
//                 </option>
//               ))}
//             </select>

//             <span className="text-gray-700 font-medium">to</span>
//             <label className="text-gray-700 font-medium">Promote to</label>
//             <select
//               className="border border-gray-300 rounded px-3 py-2 w-40"
//               value={promoteTo}
//               onChange={(e) => setPromoteTo(e.target.value)}
//             >
//               <option value="">Select</option>
//               {gradeOptions.map((grade) => (
//                 <option key={grade} value={grade}>
//                   {grade}
//                 </option>
//               ))}
//               <option value="Graduated">Graduated</option>
//             </select>
//           </div>
//         </div>

//         {/* Search */}
//         <div className="relative mb-6">
//           <input
//             type="text"
//             placeholder="Search Students by name or class"
//             className="w-full border-2 border-blue-400 rounded-lg px-4 py-2 pr-12 focus:outline-none focus:border-blue-500"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
//         </div>

//         {/* Class Filter Info */}
//         {promoteFrom && (
//           <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//             <p className="text-yellow-800">
//               Showing students from {promoteFrom} ({studentsInSelectedClass.length} students)
//             </p>
//           </div>
//         )}

//         {/* Students Table */}
//         <div className="border-2 border-blue-400 rounded-lg overflow-hidden">
//           {/* Table Header */}
//           <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
//             <div className="flex items-center space-x-3">
//               <input
//                 type="checkbox"
//                 checked={selectAll && studentsInSelectedClass.length > 0}
//                 onChange={handleSelectAll}
//                 disabled={studentsInSelectedClass.length === 0}
//                 className="w-5 h-5 accent-white"
//               />
//               <span className="font-medium text-lg">Students Names</span>
//             </div>
//             <div className="text-sm bg-white text-blue-500 px-3 py-1 rounded">
//               {selectedStudents.size} selected
//             </div>
//           </div>

//           {/* Students List */}
//           <div className="bg-white max-h-96 overflow-y-auto">
//             {loading ? (
//               <div className="p-8 text-center text-gray-500">
//                 Loading students...
//               </div>
//             ) : studentsInSelectedClass.length === 0 ? (
//               <div className="p-8 text-center text-gray-500">
//                 {promoteFrom 
//                   ? `No students found in ${promoteFrom}` 
//                   : searchTerm 
//                     ? `No students found matching "${searchTerm}"`
//                     : "Please select a class to view students"
//                 }
//               </div>
//             ) : (
//               studentsInSelectedClass.map((student) => {
//                 const fullName = `${student.firstname} ${student.middlename || ''} ${student.lastname}`.trim();
//                 const currentClass = student.admission?.admissionstd || 'N/A';
//                 
//                 return (
//                   <div
//                     key={student.studentid}
//                     className={`flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
//                       selectedStudents.has(student.studentid) ? "bg-blue-50" : ""
//                     }`}
//                     onClick={() => handleStudentToggle(student.studentid)}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={selectedStudents.has(student.studentid)}
//                       onChange={() => handleStudentToggle(student.studentid)}
//                       className="w-5 h-5 mr-4 accent-blue-500"
//                     />
//                     <div className="flex-1">
//                       <span className="text-gray-800 font-medium">{fullName}</span>
//                       {/* <span className="ml-3 text-sm text-gray-500">
//                         (Class {currentClass} - {student.admission?.admissiondivision || 'N/A'})
//                       </span> */}
//                     </div>
//                     <div className="text-sm text-gray-400">
//                       Roll no: {student.admission?.admissionno || 'N/A'}
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         </div>

//         {/* Selection Summary */}
//         {selectedStudents.size > 0 && (
//           <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
//             <p className="text-blue-700 font-medium">
//               {selectedStudents.size} student
//               {selectedStudents.size !== 1 ? "s" : ""} selected for promotion
//               {promoteFrom && promoteTo && (
//                 <span className="ml-2">
//                   from {promoteFrom} to {promoteTo}
//                 </span>
//               )}
//             </p>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// }













import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

export default function ExamManagement() {
  const [selectedStudents, setSelectedStudents] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [promoteFrom, setPromoteFrom] = useState("");
  const [promoteTo, setPromoteTo] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}api/students`, {
        headers: {
          auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
        },
      });
      if (response.status === 200) {
        setStudents(response.data);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter students based on search term
  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstname} ${student.middlename || ''} ${student.lastname}`.trim();
    const admissionStd = student.admission?.admissionstd || '';
    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admissionStd.includes(searchTerm)
    );
  });

  // Filter students by selected class if promoteFrom is selected
  const studentsInSelectedClass = promoteFrom 
    ? filteredStudents.filter(student => 
        student.admission?.admissionstd === promoteFrom
      )
    : filteredStudents;

  const handleStudentToggle = (studentId) => {
    const newSelected = new Set(selectedStudents);
    if (newSelected.has(studentId)) {
      newSelected.delete(studentId);
    } else {
      newSelected.add(studentId);
    }
    setSelectedStudents(newSelected);
    setSelectAll(newSelected.size === studentsInSelectedClass.length);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedStudents(new Set());
      setSelectAll(false);
    } else {
      setSelectedStudents(new Set(studentsInSelectedClass.map(s => s.studentid)));
      setSelectAll(true);
    }
  };

  const gradeOptions = ["Nursery", "Junior", "Senior", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  // Auto-promotion logic
  const handlePromoteFromChange = (selectedClass) => {
    setPromoteFrom(selectedClass);
    
    if (selectedClass) {
      const currentIndex = gradeOptions.indexOf(selectedClass);
      if (currentIndex !== -1 && currentIndex < gradeOptions.length - 1) {
        setPromoteTo(gradeOptions[currentIndex + 1]);
      } else if (selectedClass === '10') {
        setPromoteTo('Graduated');
      }
    } else {
      setPromoteTo('');
    }
    
    setSelectedStudents(new Set());
    setSelectAll(false);
  };

  const handlePromotion = async () => {
    if (selectedStudents.size === 0) {
      alert("Please select students to promote");
      return;
    }
    
    if (!promoteFrom || !promoteTo) {
      alert("Please select both 'Promote From' and 'Promote To' classes");
      return;
    }

    setLoading(true);

    // Prepare payload - specifically excluding division to keep it the same
    const newStd = promoteTo === 'Graduated' ? 'Graduated' : promoteTo; 
    const studentIds = Array.from(selectedStudents);

    const payload = {
      studentIds: studentIds,
      newStandard: newStd
      // Note: newDivision is omitted to persist existing values on backend
    };

    try {
      const response = await axios.post(`${API_BASE_URL}api/promote-students`, payload, {
        headers: {
          auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          'Content-Type': 'application/json'
        },
      });

      alert(response.data.message);
      
      setSelectedStudents(new Set());
      setSelectAll(false);
      
      // Refresh local data to show updated standards
      await fetchStudents(); 
      
    } catch (error) {
      console.error("Error promoting students:", error);
      alert(`Promotion failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-gray-800">
            Promote Students
          </h2>
          <button 
            className={`text-white px-6 py-2 rounded-lg font-medium transition-colors ${
              selectedStudents.size > 0 && promoteTo && !loading
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handlePromotion}
            disabled={selectedStudents.size === 0 || !promoteTo || loading}
          >
            {loading ? 'Processing...' : 'Promote'}
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-3">
            <label className="text-gray-700 font-medium w-32">
              Academic Year:
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-2 w-64 bg-gray-100"
              placeholder="2025-2026"
              readOnly
            />
          </div>

          <div className="flex items-center space-x-3">
            <label className="text-gray-700 font-medium w-32">
              Promote From:
            </label>
            <select
              className="border border-gray-300 rounded px-3 py-2 w-40"
              value={promoteFrom}
              onChange={(e) => handlePromoteFromChange(e.target.value)}
            >
              <option value="">Select</option>
              {gradeOptions.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>

            <span className="text-gray-700 font-medium">to</span>
            <label className="text-gray-700 font-medium">Promote to:</label>
            <select
              className="border border-gray-300 rounded px-3 py-2 w-40"
              value={promoteTo}
              onChange={(e) => setPromoteTo(e.target.value)}
            >
              <option value="">Select</option>
              {gradeOptions.map((grade) => (
                <option key={grade} value={grade}>
                  Class {grade}
                </option>
              ))}
              <option value="Graduated">Graduated</option>
            </select>
          </div>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search Students by name or class"
            className="w-full border-2 border-blue-400 rounded-lg px-4 py-2 pr-12 focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
        </div>

        {promoteFrom && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">
              Showing students from <strong>Class {promoteFrom}</strong> ({studentsInSelectedClass.length} students)
            </p>
          </div>
        )}

        <div className="border-2 border-blue-400 rounded-lg overflow-hidden">
          <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectAll && studentsInSelectedClass.length > 0}
                onChange={handleSelectAll}
                disabled={studentsInSelectedClass.length === 0}
                className="w-5 h-5 accent-white"
              />
              <span className="font-medium text-lg">Student Names</span>
            </div>
            <div className="text-sm bg-white text-blue-500 px-3 py-1 rounded">
              {selectedStudents.size} selected
            </div>
          </div>

          <div className="bg-white max-h-96 overflow-y-auto">
            {loading && students.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Loading students...
              </div>
            ) : studentsInSelectedClass.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {promoteFrom 
                  ? `No students found in Class ${promoteFrom}` 
                  : "Please select a class to view students"
                }
              </div>
            ) : (
              studentsInSelectedClass.map((student) => {
                const fullName = `${student.firstname} ${student.middlename || ''} ${student.lastname}`.trim();
                return (
                  <div
                    key={student.studentid}
                    className={`flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                      selectedStudents.has(student.studentid) ? "bg-blue-50" : ""
                    }`}
                    onClick={() => handleStudentToggle(student.studentid)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedStudents.has(student.studentid)}
                      readOnly
                      className="w-5 h-5 mr-4 accent-blue-500"
                    />
                    <div className="flex-1">
                      <span className="text-gray-800 font-medium">{fullName}</span>
                      <span className="ml-3 text-sm text-gray-400">
                        {/* (Div: {student.admission?.admissiondivision || 'N/A'}) */}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">
                      ID: {student.studentid}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {selectedStudents.size > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-700 font-medium">
              <strong>{selectedStudents.size} student{selectedStudents.size !== 1 ? "s" : ""}</strong> selected for promotion from <strong>Class {promoteFrom}</strong> to <strong>{promoteTo === 'Graduated' ? 'Graduated' : `Class ${promoteTo}`}</strong>.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}