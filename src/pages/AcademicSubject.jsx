// import React, { useEffect, useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import AddSubjectModal from "../components/AddSubjectModal";
// import axios from "axios";

// export default function AcademicSubject() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [subjectData, setSubjectData] = useState([]);

//   const [teachers, setTeachers] = useState([]);
//   useEffect(() => {
//     const fetchallots = async () => {
//       try {
//         const response = await axios.get(
//           "https://sspd-school-portal.vercel.app/api/allotments",
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         setSubjectData(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchallots();
//   }, []);

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const response = await axios.get(
//           "https://sspd-school-portal.vercel.app/api/staff",
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         setTeachers(response.data);
//         // console.log(teachers)
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchTeachers();
//   }, []);

//   const teacherOptions = teachers.map((item) => ({
//     value: `${item._id},${item.firstname} ${item.lastname}`, // ek string bana do
//     label: `${item.firstname} ${item.lastname}`,
//   }));

//   // console.log(teacherOptions)
//   // Filter subjects based on search query
//   const filteredData = subjectData.filter((item) =>
//     item.teacherName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="flex flex-1 flex-col p-4 sm:p-6 overflow-y-auto">
//           {/* Search & Add */}
//           <div className="mb-4 flex items-center justify-between">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search subject..."
//               className="w-full sm:w-72 px-3 py-2 rounded-md border border-gray-300 text-sm"
//             />
//             <button
//               onClick={() => setShowModal(true)}
//               className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-4"
//             >
//               Add
//             </button>
//           </div>

//           {/* Header */}
//           <div className="my-4 text-center">
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//               Subject Allotment
//             </h2>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto shadow-md">
//             <table className="min-w-full border-collapse border border-gray-300">
//               <thead>
//                 <tr className="bg-blue-100 text-black">
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Subject
//                   </th>
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Teacher
//                   </th>
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Standards
//                   </th>
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Division
//                   </th>
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Weekly Lectures
//                   </th>
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//                 <tbody>
//                   {filteredData.map((item, index) => (
//                     <tr
//                       key={index}
//                       className="border-b border-gray-200 hover:bg-gray-50"
//                     >
//                       {/* Subjects */}
//                       <td className="px-4 py-2 text-sm text-gray-700 border text-center">
//                         {Array.isArray(item.subjects)
//                           ? item.subjects.join(", ")
//                           : item.subjects}
//                       </td>

//                       {/* Teacher Name */}
//                       <td className="px-4 py-2 text-sm text-gray-700 border text-center">
//                         {item.teacherName}
//                       </td>

//                       {/* Standards */}
//                       <td className="px-4 py-2 text-sm text-gray-700 border text-center">
//                         {Array.isArray(item.standards)
//                           ? item.standards.join(", ")
//                           : item.standards}
//                       </td>

//                       {/* Divisions */}
//                       <td className="px-4 py-2 text-sm text-gray-700 border text-center">
//                         {Array.isArray(item.divisions)
//                           ? item.divisions.join(", ")
//                           : item.divisions}
//                       </td>

//                       {/* Weekly Lectures */}
//                       <td className="px-4 py-2 text-sm text-gray-700 border text-center">
//                         {item.weeklyLectures}
//                       </td>

//                       {/* Actions */}
//                       <td className="px-4 py-2 text-sm border text-center">
//                         <button className="text-blue-500 hover:underline mr-2">
//                           Edit
//                         </button>
//                         <button className="text-red-500 hover:underline">
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//             </table>
//           </div>

//           {/* Add Subject Modal */}
//           <AddSubjectModal
//             isOpen={showModal}
//             onClose={() => setShowModal(false)}
//             teacherOptions={teacherOptions}
//           />
//         </div>
//       </div>
//     </MainLayout>
//   );
// }

// import React, { useEffect, useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import AddSubjectModal from "../components/AddSubjectModal";
// import axios from "axios";

// export default function AcademicSubject() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [subjectData, setSubjectData] = useState([]);

//   const [teachers, setTeachers] = useState([]);
//   useEffect(() => {
//     const fetchallots = async () => {
//       try {
//         const response = await axios.get(
//           // CRITICAL FIX 1: CHANGE to localhost
//           "http://localhost:5000/api/allotments", 
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         setSubjectData(response.data);
//       } catch (error) {
//         console.error("Error fetching subject allotments from local server:", error);
//       }
//     };
//     fetchallots();
//   }, []);

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const response = await axios.get(
//           // CRITICAL FIX 2: CHANGE to localhost
//           "http://localhost:5000/api/staff",
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         setTeachers(response.data);
//       } catch (error) {
//         console.error("Error fetching teachers from local server:", error);
//       }
//     };
//     fetchTeachers();
//   }, []);

//   const teacherOptions = teachers.map((item) => ({
//     value: `${item._id},${item.firstname} ${item.lastname}`, // ek string bana do
//     label: `${item.firstname} ${item.lastname}`,
//   }));

//   // Filter subjects based on search query
//   const filteredData = subjectData.filter((item) =>
//     item.teacherName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="flex flex-1 flex-col p-4 sm:p-6 overflow-y-auto">
//           {/* Search & Add */}
//           <div className="mb-4 flex items-center justify-between">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search subject..."
//               className="w-full sm:w-72 px-3 py-2 rounded-md border border-gray-300 text-sm"
//             />
//             <button
//               onClick={() => setShowModal(true)}
//               className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-4"
//             >
//               Add
//             </button>
//           </div>

//           {/* Header */}
//           <div className="my-4 text-center">
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//               Subject Allotment
//             </h2>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto shadow-md">
//             <table className="min-w-full border-collapse border border-gray-300">
//               <thead>
//                 <tr className="bg-blue-100 text-black">
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Subject
//                   </th>
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Teacher
//                   </th>
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Standards
//                   </th>
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Division
//                   </th>
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Weekly Lectures
//                   </th>
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//                 <tbody>
//                   {filteredData.map((item, index) => (
//                     <tr
//                       key={index}
//                       className="border-b border-gray-200 hover:bg-gray-50"
//                     >
//                       {/* Subjects */}
//                       <td className="px-4 py-2 text-sm text-gray-700 border text-center">
//                         {Array.isArray(item.subjects)
//                           ? item.subjects.join(", ")
//                           : item.subjects}
//                       </td>

//                       {/* Teacher Name */}
//                       <td className="px-4 py-2 text-sm text-gray-700 border text-center">
//                         {item.teacherName}
//                       </td>

//                       {/* Standards */}
//                       <td className="px-4 py-2 text-sm text-gray-700 border text-center">
//                         {Array.isArray(item.standards)
//                           ? item.standards.join(", ")
//                           : item.standards}
//                       </td>

//                       {/* Divisions */}
//                       <td className="px-4 py-2 text-sm text-gray-700 border text-center">
//                         {Array.isArray(item.divisions)
//                           ? item.divisions.join(", ")
//                           : item.divisions}
//                       </td>

//                       {/* Weekly Lectures */}
//                       <td className="px-4 py-2 text-sm text-gray-700 border text-center">
//                         {item.weeklyLectures}
//                       </td>

//                       {/* Actions */}
//                       <td className="px-4 py-2 text-sm border text-center">
//                         <button className="text-blue-500 hover:underline mr-2">
//                           Edit
//                         </button>
//                         <button className="text-red-500 hover:underline">
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//             </table>
//           </div>

//           {/* Add Subject Modal */}
//           <AddSubjectModal
//             isOpen={showModal}
//             onClose={() => setShowModal(false)}
//             teacherOptions={teacherOptions}
//           />
//         </div>
//       </div>
//     </MainLayout>
//   );
// }

// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";
// import { API_BASE_URL } from "../config";

// // Helper function to generate divisions (A, B, C, ...)
// const generateDivisions = (count) => {
//     if (count < 1) return [];
//     const divisions = [];
//     for (let i = 0; i < count; i++) {
//         divisions.push(String.fromCharCode(65 + i)); // 65 is 'A'
//     }
//     return divisions;
// };


// export default function AcademicSubject() {
//     // --- State for Table and Data Fetching ---
//     const [searchQuery, setSearchQuery] = useState("");
//     const [subjectData, setSubjectData] = useState([]); 
//     const [teachers, setTeachers] = useState([]); 
//     const [isLoading, setIsLoading] = useState(false);
    
//     // --- State for Modal and Form ---
//     const [showModal, setShowModal] = useState(false);
//     const [editingAllotment, setEditingAllotment] = useState(null); 
//     const [isEditMode, setIsEditMode] = useState(false);

//     // Form State
//     const [selectedTeacherOption, setSelectedTeacherOption] = useState(null); 
//     const [subjects, setSubjects] = useState([{ id: 1, value: '' }]); 
//     const [standards, setStandards] = useState([{ id: 1, value: '' }]); 
//     const [divisions, setDivisions] = useState([{ id: 1, value: '' }]); 
//     const [weeklyLectures, setWeeklyLectures] = useState('');
//     const [divisionCount, setDivisionCount] = useState(1);

//     // --- Data Fetching and Initialization ---
//     const fetchAllData = useCallback(async () => {
//         setIsLoading(true);
//         try {
//             const allotmentsResponse = await axios.get(
//                 `${API_BASE_URL}api/allotments`,
//                 { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } }
//             );
//             const rawData = allotmentsResponse.data;
//             const processedData = Array.isArray(rawData) ? rawData : (rawData ? [rawData] : []);
//             setSubjectData(processedData);

//             const teachersResponse = await axios.get(
//                 `${API_BASE_URL}api/staff`,
//                 { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } }
//             );
//             setTeachers(teachersResponse.data);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             setSubjectData([]); 
//         } finally {
//             setIsLoading(false);
//         }
//     }, [API_BASE_URL]);

//     useEffect(() => {
//         fetchAllData();
//     }, [fetchAllData]);

//     const teacherOptions = useMemo(() => {
//         return teachers.map((item) => ({
//             value: `${item._id},${item.firstname} ${item.lastname}`, 
//             label: `${item.firstname} ${item.lastname}`,
//         }));
//     }, [teachers]);

//     const resetFormState = useCallback(() => {
//         setSelectedTeacherOption(null);
//         setSubjects([{ id: 1, value: '' }]);
//         setStandards([{ id: 1, value: '' }]);
//         setDivisions([{ id: 1, value: '' }]);
//         setWeeklyLectures('');
//         setDivisionCount(1);
//     }, []);

//     useEffect(() => {
//         if (editingAllotment && editingAllotment._id) {
//             setIsEditMode(true);
            
//             const teacherName = editingAllotment.teacherName || '';
//             const teacherOption = teacherOptions.find(opt => opt.label === teacherName);
//             setSelectedTeacherOption(teacherOption || null);

//             setSubjects([{ id: 1, value: editingAllotment.subjects || '' }]);
//             setStandards([{ id: 1, value: editingAllotment.standards || '' }]);
//             setDivisions([{ id: 1, value: editingAllotment.divisions || '' }]);
//             setWeeklyLectures(String(editingAllotment.weeklyLectures || '') );
//             setDivisionCount(1);

//         } else {
//             setIsEditMode(false);
//             resetFormState();
//         }
//     }, [editingAllotment, teacherOptions, resetFormState]);


//     // --- Dynamic Input Handlers ---
//     const handleAddInput = (state, setState) => {
//         setState([...state, { id: state.length + 1, value: '' }]);
//     };

//     const handleRemoveInput = (state, setState, idToRemove) => {
//         if (state.length > 1) {
//             setState(state.filter(item => item.id !== idToRemove));
//         }
//     };
    
//     const handleChangeInput = (state, setState, id, newValue) => {
//         setState(state.map(item => 
//             item.id === id ? { ...item, value: newValue } : item
//         ));
//     };

//     const handleDivisionCountChange = (e) => {
//         const count = Number(e.target.value);
//         if (count < 1) return;
//         setDivisionCount(count);
//         const newDivisions = generateDivisions(count).map((div, index) => ({ id: index + 1, value: div }));
//         setDivisions(newDivisions);
//     };

//     // --- Table Data Normalization ---
//     const normalizedData = useMemo(() => {
//         const flattened = [];
//         subjectData.forEach((allotment) => {
//             flattened.push({
//                 _id: allotment._id, 
//                 teacherName: allotment.teacherName,
//                 subjects: allotment.subjects?.[0] || '', 
//                 standards: allotment.standards?.[0] || '', 
//                 divisions: allotment.divisions?.[0] || '', 
//                 weeklyLectures: allotment.weeklyLectures,
//             });
//         });
//         return flattened.filter((item) =>
//             item.teacherName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             item.subjects?.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//     }, [subjectData, searchQuery]);

//     // --- CRUD Handlers ---
//     const handleEdit = (itemToEdit) => {
//         setEditingAllotment(itemToEdit); 
//         setShowModal(true);
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure you want to delete this subject allotment?")) {
//             try {
//                 await axios.delete(
//                     `${API_BASE_URL}api/allotments/${id}`, 
//                     { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } }
//                 );
//                 alert("Subject allotment deleted successfully."); 
//                 fetchAllData(); 
//             } catch (error) {
//                 console.error("Error deleting subject allotment:", error);
//                 alert("Failed to delete allotment.");
//             }
//         }
//     };
    
//     const handleCloseModal = (refreshNeeded) => {
//         setShowModal(false);
//         setEditingAllotment(null); 
//         resetFormState(); 
//         if (refreshNeeded) {
//             fetchAllData(); 
//         }
//     };

//     const handleSave = async (e) => {
//         e.preventDefault();
        
//         const finalSubjects = subjects.map(s => s.value).filter(v => v.trim() !== '');
//         const finalStandards = standards.map(s => s.value).filter(v => v.trim() !== '');
//         const finalDivisions = divisions.map(d => d.value).filter(v => v.trim() !== '');

//         if (!selectedTeacherOption || finalSubjects.length === 0 || finalStandards.length === 0 || finalDivisions.length === 0 || !weeklyLectures) {
//             alert("Please fill all required fields.");
//             return;
//         }

//         const authHeader = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
//         const teacherID = selectedTeacherOption.value.split(',')[0];
//         const teacherName = selectedTeacherOption.label;

//         const payload = {
//             teacher: teacherID, 
//             teacherName: teacherName,
//             weeklyLectures: Number(weeklyLectures),
//             subjects: finalSubjects, 
//             standards: finalStandards, 
//             divisions: finalDivisions,
//         };
        
//         try {
//             if (isEditMode) {
//                 const singlePayload = {
//                     ...payload,
//                     subjects: [finalSubjects[0]], 
//                     standards: [finalStandards[0]], 
//                     divisions: [finalDivisions[0]],
//                 };
                
//                 await axios.put(
//                     `${API_BASE_URL}api/allotments/${editingAllotment._id}`, 
//                     singlePayload,
//                     { headers: { auth: authHeader } }
//                 );
//                 alert("Subject allotment updated successfully.");
//             } else {
//                 await axios.post(
//                     `${API_BASE_URL}api/allot-subject`, 
//                     payload,
//                     { headers: { auth: authHeader } }
//                 );
//                 alert("Subject allotment done successfully.");
//             }
            
//             handleCloseModal(true); 

//         } catch (error) {
//             console.error("API Error:", error);
//             alert(`Failed to ${isEditMode ? 'update' : 'add'} allotment.`);
//             handleCloseModal(false);
//         }
//     };

//     // --- Modal JSX (Inline component) ---
//     const ModalJSX = showModal ? (
//         // 🔑 MODAL BACKGROUND: Removed blur properties and set transparent background with high opacity.
//         <div 
//             className="fixed inset-0 flex items-center justify-center z-50"
//             style={{ 
//                 // Using RGBA to create the dimming effect without blurring the backdrop
//                 backgroundColor: 'rgba(50, 50, 50, 0.5)', 
//             }}
//         >
//             <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg overflow-y-auto max-h-[90vh]">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-semibold">
//                         {isEditMode ? 'Edit Subject Allotment' : 'Add Subject Allotment'}
//                     </h2>
//                     <button onClick={() => handleCloseModal(false)} className="text-gray-500 hover:text-gray-800">
//                         &times;
//                     </button>
//                 </div>
                
//                 <form onSubmit={handleSave}>
                    
//                     {/* 1. Teacher Name (Select) */}
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium mb-1">Teachers *</label>
//                         <select
//                             required
//                             value={selectedTeacherOption ? selectedTeacherOption.value : ''}
//                             onChange={(e) => {
//                                 const selectedValue = e.target.value;
//                                 const option = teacherOptions.find(opt => opt.value === selectedValue);
//                                 setSelectedTeacherOption(option || null);
//                             }}
//                             className="w-full p-2 border border-gray-300 rounded-md"
//                         >
//                             <option value="" disabled>Select Teacher</option>
//                             {teacherOptions.map((opt) => (
//                                 <option key={opt.value} value={opt.value}>{opt.label}</option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* 2. Subject (Dynamic Inputs) */}
//                     <label className="block text-sm font-medium mb-1">Subject *</label>
//                     {subjects.map((item) => (
//                         <div key={item.id} className="flex mb-2 items-center">
//                             <input
//                                 type="text"
//                                 required
//                                 value={item.value} 
//                                 onChange={(e) => handleChangeInput(subjects, setSubjects, item.id, e.target.value)}
//                                 placeholder="Enter Subject"
//                                 className="w-full p-2 border border-gray-300 rounded-md"
//                                 disabled={isEditMode && subjects.length > 1} 
//                             />
//                             {!isEditMode && (
//                                 <>
//                                     <button type="button" onClick={() => handleAddInput(subjects, setSubjects)} className="ml-2 text-xl font-bold text-green-500">+</button>
//                                     {subjects.length > 1 && (
//                                         <button type="button" onClick={() => handleRemoveInput(subjects, setSubjects, item.id)} className="ml-2 text-xl font-bold text-red-500">-</button>
//                                     )}
//                                 </>
//                             )}
//                         </div>
//                     ))}

//                     {/* 3. Standard (Dynamic Inputs) */}
//                     <label className="block text-sm font-medium mb-1 mt-4">Standard *</label>
//                     {standards.map((item) => (
//                         <div key={item.id} className="flex mb-2 items-center">
//                             <input
//                                 type="text"
//                                 required
//                                 value={item.value} 
//                                 onChange={(e) => handleChangeInput(standards, setStandards, item.id, e.target.value)}
//                                 placeholder="e.g. 5th, 6th"
//                                 className="w-full p-2 border border-gray-300 rounded-md"
//                                 disabled={isEditMode && standards.length > 1}
//                             />
//                             {!isEditMode && (
//                                 <>
//                                     <button type="button" onClick={() => handleAddInput(standards, setStandards)} className="ml-2 text-xl font-bold text-green-500">+</button>
//                                     {standards.length > 1 && (
//                                         <button type="button" onClick={() => handleRemoveInput(standards, setStandards, item.id)} className="ml-2 text-xl font-bold text-red-500">-</button>
//                                     )}
//                                 </>
//                             )}
//                         </div>
//                     ))}

//                     {/* 4. Division per Standard (Auto-generated based on count) */}
//                     <div className="mb-4 mt-4">
//                         <label className="block text-sm font-medium mb-1">No. of Divisions (for Auto-Generation) *</label>
//                         <input
//                             type="number"
//                             min="1"
//                             max="10" 
//                             required
//                             value={divisionCount} 
//                             onChange={handleDivisionCountChange}
//                             placeholder="e.g. 4 for A, B, C, D"
//                             className="w-full p-2 border border-gray-300 rounded-md"
//                             disabled={isEditMode}
//                         />
//                         {divisions.length > 0 && !isEditMode && (
//                             <p className="text-sm text-gray-500 mt-1">Divisions set: {divisions.map(d => d.value).join(', ')}</p>
//                         )}
//                         {isEditMode && (
//                             <p className="text-sm text-gray-500 mt-1">Division: {divisions[0]?.value}</p>
//                         )}
//                     </div>

//                     {/* 5. Weekly Lectures (Select) */}
//                     <div className="mb-6">
//                         <label className="block text-sm font-medium mb-1">Weekly Lecture Count *</label>
//                         <select
//                             required
//                             value={weeklyLectures} 
//                             onChange={(e) => setWeeklyLectures(e.target.value)}
//                             className="w-full p-2 border border-gray-300 rounded-md"
//                         >
//                             <option value="" disabled>Select Weekly Lectures</option>
//                             {[...Array(10)].map((_, i) => (
//                                 <option key={i + 1} value={i + 1}>{i + 1}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="flex justify-end">
//                         <button
//                             type="submit"
//                             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
//                         >
//                             {isEditMode ? 'Save Changes' : 'Save'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     ) : null;


//     // --- Main Component Render ---
//     return (
//         <MainLayout>
//             <div className="bg-white rounded-2xl shadow p-6">
//                 <div className="flex flex-1 flex-col p-4 sm:p-6 overflow-y-auto">
//                     {/* Search & Add */}
//                     <div className="mb-4 flex items-center justify-between">
//                         <input
//                             type="text"
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             placeholder="Search teacher or subject..."
//                             className="w-full sm:w-72 px-3 py-2 rounded-md border border-gray-300 text-sm"
//                         />
//                         <button
//                             onClick={() => handleEdit(null)}
//                             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-4"
//                         >
//                             Add
//                         </button>
//                     </div>

//                     {/* Header */}
//                     <div className="my-4 text-center">
//                         <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//                             Subject Allotment
//                         </h2>
//                     </div>

//                     {/* Table */}
//                     <div className="overflow-x-auto shadow-md">
//                         <table className="min-w-full border-collapse border border-gray-300">
//                             <thead>
//                                 <tr className="bg-blue-100 text-black">
//                                     <th className="px-4 py-2 text-center font-bold border ">Subject</th>
//                                     <th className="px-4 py-2 text-center font-bold border ">Teacher</th>
//                                     <th className="px-4 py-2 text-center font-bold border ">Standard</th>
//                                     <th className="px-4 py-2 text-center font-bold border ">Division</th>
//                                     <th className="px-4 py-2 text-center font-bold border ">Weekly Lectures</th>
//                                     <th className="px-4 py-2 text-center font-bold border ">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {isLoading ? (
//                                     <tr><td colSpan="6" className="text-center py-4 text-gray-500">Loading data...</td></tr>
//                                 ) : normalizedData.length === 0 ? (
//                                     <tr><td colSpan="6" className="text-center py-4 text-gray-500">No subject allotments found.</td></tr>
//                                 ) : (
//                                     normalizedData.map((item, index) => (
//                                         <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
//                                             <td className="px-4 py-2 text-sm text-gray-700 border text-center">{item.subjects}</td>
//                                             <td className="px-4 py-2 text-sm text-gray-700 border text-center">{item.teacherName}</td>
//                                             <td className="px-4 py-2 text-sm text-gray-700 border text-center">{item.standards}</td>
//                                             <td className="px-4 py-2 text-sm text-gray-700 border text-center">{item.divisions}</td>
//                                             <td className="px-4 py-2 text-sm text-gray-700 border text-center">{item.weeklyLectures}</td>
//                                             <td className="px-4 py-2 text-sm border text-center">
//                                                 <button className="text-blue-500 hover:underline mr-2" onClick={() => handleEdit(item)}>Edit</button>
//                                                 <button className="text-red-500 hover:underline" onClick={() => handleDelete(item._id)}>Delete</button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Render the inline Modal */}
//                     {ModalJSX} 
//                 </div>
//             </div>
//         </MainLayout>
//     );
// }









// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";
// import { API_BASE_URL } from "../config";

// const generateDivisions = (count) => {
//     if (count < 1) return [];
//     const divisions = [];
//     for (let i = 0; i < count; i++) {
//         divisions.push(String.fromCharCode(65 + i));
//     }
//     return divisions;
// };

// export default function AcademicSubject() {
//     const [searchQuery, setSearchQuery] = useState("");
//     const [subjectData, setSubjectData] = useState([]); 
//     const [teachers, setTeachers] = useState([]); 
//     const [isLoading, setIsLoading] = useState(false);
//     const [selectedIds, setSelectedIds] = useState([]);

//     const [showModal, setShowModal] = useState(false);
//     const [editingAllotment, setEditingAllotment] = useState(null); 
//     const [isEditMode, setIsEditMode] = useState(false);

//     const [selectedTeacherOption, setSelectedTeacherOption] = useState(null); 
//     const [subjects, setSubjects] = useState([{ id: 1, value: '' }]); 
//     const [standards, setStandards] = useState([{ id: 1, value: '' }]); 
//     const [divisions, setDivisions] = useState([{ id: 1, value: '' }]); 
//     const [weeklyLectures, setWeeklyLectures] = useState('');
//     const [divisionCount, setDivisionCount] = useState(1);

//     const fetchAllData = useCallback(async () => {
//         setIsLoading(true);
//         try {
//             const allotmentsResponse = await axios.get(
//                 `${API_BASE_URL}api/allotments`,
//                 { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } }
//             );
//             const rawData = allotmentsResponse.data;
//             setSubjectData(Array.isArray(rawData) ? rawData : (rawData ? [rawData] : []));

//             const teachersResponse = await axios.get(
//                 `${API_BASE_URL}api/staff`,
//                 { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } }
//             );
//             setTeachers(teachersResponse.data);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             setSubjectData([]); 
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     useEffect(() => { fetchAllData(); }, [fetchAllData]);

//     // 🔑 Logic to filter teachers based on selected standards
//     const filteredTeacherOptions = useMemo(() => {
//         const selectedStdValue = standards[0]?.value;

//         return teachers
//             .filter((teacher) => {
//                 if (!selectedStdValue || isEditMode) return true;
//                 const preferred = teacher.role?.preferredgrades || [];
//                 // Check if the selected standard is in the teacher's preferred grades
//                 return preferred.some(grade => grade.includes(selectedStdValue));
//             })
//             .map((item) => ({
//                 value: `${item._id},${item.firstname} ${item.lastname}`, 
//                 label: `${item.firstname} ${item.lastname}`,
//             }));
//     }, [teachers, standards, isEditMode]);

//     const resetFormState = useCallback(() => {
//         setSelectedTeacherOption(null);
//         setSubjects([{ id: 1, value: '' }]);
//         setStandards([{ id: 1, value: '' }]);
//         setDivisions([{ id: 1, value: '' }]);
//         setWeeklyLectures('');
//         setDivisionCount(1);
//     }, []);

//     useEffect(() => {
//         if (editingAllotment && editingAllotment._id) {
//             setIsEditMode(true);
//             const teacherOption = filteredTeacherOptions.find(opt => opt.label === editingAllotment.teacherName);
//             setSelectedTeacherOption(teacherOption || null);
//             setSubjects([{ id: 1, value: editingAllotment.subjects || '' }]);
//             setStandards([{ id: 1, value: editingAllotment.standards || '' }]);
//             setDivisions([{ id: 1, value: editingAllotment.divisions || '' }]);
//             setWeeklyLectures(String(editingAllotment.weeklyLectures || ''));
//         } else {
//             setIsEditMode(false);
//             resetFormState();
//         }
//     }, [editingAllotment, resetFormState]);

//     const handleAddInput = (state, setState) => setState([...state, { id: state.length + 1, value: '' }]);
//     const handleRemoveInput = (state, setState, idToRemove) => state.length > 1 && setState(state.filter(item => item.id !== idToRemove));
//     const handleChangeInput = (state, setState, id, newValue) => setState(state.map(item => item.id === id ? { ...item, value: newValue } : item));

//     const handleDivisionCountChange = (e) => {
//         const count = Number(e.target.value);
//         if (count < 1) return;
//         setDivisionCount(count);
//         setDivisions(generateDivisions(count).map((div, index) => ({ id: index + 1, value: div })));
//     };

//     const normalizedData = useMemo(() => {
//         const flattened = [];
//         subjectData.forEach((allotment) => {
//             flattened.push({
//                 _id: allotment._id, 
//                 teacherName: allotment.teacherName,
//                 subjects: allotment.subjects?.[0] || '', 
//                 standards: allotment.standards?.[0] || '', 
//                 divisions: allotment.divisions?.[0] || '', 
//                 weeklyLectures: allotment.weeklyLectures,
//             });
//         });
//         return flattened.filter((item) =>
//             item.teacherName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             item.subjects?.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//     }, [subjectData, searchQuery]);

//     const handleSelectAll = (e) => setSelectedIds(e.target.checked ? normalizedData.map(item => item._id) : []);
//     const handleSelectRow = (id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);

//     const handleEdit = (itemToEdit) => { setEditingAllotment(itemToEdit); setShowModal(true); };

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure?")) {
//             try {
//                 await axios.delete(`${API_BASE_URL}api/allotments/${id}`, { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } });
//                 fetchAllData();
//             } catch (error) { alert("Failed to delete."); }
//         }
//     };

//     const handleDeleteSelected = async () => {
//         if (window.confirm(`Delete ${selectedIds.length} items?`)) {
//             try {
//                 await Promise.all(selectedIds.map(id => axios.delete(`${API_BASE_URL}api/allotments/${id}`, { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } })));
//                 setSelectedIds([]); fetchAllData();
//             } catch (error) { alert("Failed to delete selected."); }
//         }
//     };

//     const handleSave = async (e) => {
//         e.preventDefault();
//         const finalSubjects = subjects.map(s => s.value).filter(v => v.trim() !== '');
//         const finalStandards = standards.map(s => s.value).filter(v => v.trim() !== '');
//         const finalDivisions = divisions.map(d => d.value).filter(v => v.trim() !== '');

//         if (!selectedTeacherOption || finalSubjects.length === 0 || finalStandards.length === 0 || finalDivisions.length === 0 || !weeklyLectures) {
//             alert("Fill all fields."); return;
//         }

//         const payload = {
//             teacher: selectedTeacherOption.value.split(',')[0], 
//             teacherName: selectedTeacherOption.label,
//             weeklyLectures: Number(weeklyLectures),
//             subjects: finalSubjects, standards: finalStandards, divisions: finalDivisions,
//         };
        
//         try {
//             const config = { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } };
//             if (isEditMode) {
//                 await axios.put(`${API_BASE_URL}api/allotments/${editingAllotment._id}`, payload, config);
//             } else {
//                 await axios.post(`${API_BASE_URL}api/allot-subject`, payload, config);
//             }
//             setShowModal(false); setEditingAllotment(null); resetFormState(); fetchAllData();
//         } catch (error) { alert("Error saving."); }
//     };

//     const ModalJSX = showModal ? (
//         <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(50, 50, 50, 0.5)' }}>
//             <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg overflow-y-auto max-h-[90vh]">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-semibold">{isEditMode ? 'Edit Subject Allotment' : 'Add Subject Allotment'}</h2>
//                     <button onClick={() => setShowModal(false)} className="text-gray-500">&times;</button>
//                 </div>
//                 <form onSubmit={handleSave}>
                    
//                     {/* 🔑 1. Standard Input is now first */}
//                     <label className="block text-sm font-medium mb-1">Standard *</label>
//                     {standards.map((item) => (
//                         <div key={item.id} className="flex mb-2 items-center">
//                             <input
//                                 type="text" required value={item.value} 
//                                 onChange={(e) => handleChangeInput(standards, setStandards, item.id, e.target.value)}
//                                 placeholder="e.g. 5" className="w-full p-2 border rounded-md"
//                                 disabled={isEditMode}
//                             />
//                             {!isEditMode && (
//                                 <button type="button" onClick={() => handleAddInput(standards, setStandards)} className="ml-2 text-green-500">+</button>
//                             )}
//                         </div>
//                     ))}

//                     {/* 🔑 2. Teachers Dropdown (Filtered) is now second */}
//                     <div className="mb-4 mt-4">
//                         <label className="block text-sm font-medium mb-1">Teachers *</label>
//                         <select
//                             required value={selectedTeacherOption ? selectedTeacherOption.value : ''}
//                             onChange={(e) => {
//                                 const option = filteredTeacherOptions.find(opt => opt.value === e.target.value);
//                                 setSelectedTeacherOption(option || null);
//                             }}
//                             className="w-full p-2 border rounded-md"
//                         >
//                             <option value="" disabled>Select Teacher</option>
//                             {filteredTeacherOptions.map((opt) => (
//                                 <option key={opt.value} value={opt.value}>{opt.label}</option>
//                             ))}
//                         </select>
//                         {!isEditMode && standards[0]?.value && filteredTeacherOptions.length === 0 && (
//                             <p className="text-red-500 text-xs mt-1">No teachers assigned to Standard {standards[0].value}</p>
//                         )}
//                     </div>

//                     <label className="block text-sm font-medium mb-1">Subject *</label>
//                     {subjects.map((item) => (
//                         <div key={item.id} className="flex mb-2 items-center">
//                             <input
//                                 type="text" required value={item.value} 
//                                 onChange={(e) => handleChangeInput(subjects, setSubjects, item.id, e.target.value)}
//                                 placeholder="Enter Subject" className="w-full p-2 border rounded-md"
//                             />
//                             {!isEditMode && <button type="button" onClick={() => handleAddInput(subjects, setSubjects)} className="ml-2 text-green-500">+</button>}
//                         </div>
//                     ))}

//                     <div className="mb-4 mt-4">
//                         <label className="block text-sm font-medium mb-1">No. of Divisions *</label>
//                         <input
//                             type="number" min="1" max="10" required value={divisionCount} 
//                             onChange={handleDivisionCountChange} className="w-full p-2 border rounded-md"
//                             disabled={isEditMode}
//                         />
//                     </div>

//                     <div className="mb-6">
//                         <label className="block text-sm font-medium mb-1">Weekly Lecture Count *</label>
//                         <select required value={weeklyLectures} onChange={(e) => setWeeklyLectures(e.target.value)} className="w-full p-2 border rounded-md">
//                             <option value="" disabled>Select</option>
//                             {[...Array(10)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
//                         </select>
//                     </div>

//                     <div className="flex justify-end">
//                         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">{isEditMode ? 'Save Changes' : 'Save'}</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     ) : null;

//     return (
//         <MainLayout>
//             <div className="bg-white rounded-2xl shadow p-6">
//                 <div className="flex flex-1 flex-col p-4 sm:p-6 overflow-y-auto">
//                     <div className="mb-4 flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                             <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="w-full sm:w-72 px-3 py-2 rounded-md border border-gray-300 text-sm" />
//                             {selectedIds.length > 0 && <button onClick={handleDeleteSelected} className="bg-red-500 text-white px-4 py-2 rounded-md text-sm">Delete Selected ({selectedIds.length})</button>}
//                         </div>
//                         <button onClick={() => { setEditingAllotment(null); setShowModal(true); }} className="bg-blue-500 text-white px-4 py-2 rounded-md">Add</button>
//                     </div>
//                     <div className="my-4 text-center"><h2 className="text-lg sm:text-xl font-semibold">Subject Allotment</h2></div>
//                     <div className="overflow-x-auto shadow-md">
//                         <table className="min-w-full border-collapse border border-gray-300">
//                             <thead>
//                                 <tr className="bg-blue-100">
//                                     <th className="px-4 py-2 border w-10"><input type="checkbox" onChange={handleSelectAll} checked={normalizedData.length > 0 && selectedIds.length === normalizedData.length} /></th>
//                                     <th className="px-4 py-2 border">Subject</th>
//                                     <th className="px-4 py-2 border">Teacher</th>
//                                     <th className="px-4 py-2 border">Standard</th>
//                                     <th className="px-4 py-2 border">Division</th>
//                                     <th className="px-4 py-2 border">Weekly Lectures</th>
//                                     <th className="px-4 py-2 border">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {isLoading ? (<tr><td colSpan="7" className="text-center py-4">Loading...</td></tr>) : 
//                                 normalizedData.length === 0 ? (<tr><td colSpan="7" className="text-center py-4">No allotments found.</td></tr>) : 
//                                 normalizedData.map((item, index) => (
//                                     <tr key={index} className="border-b hover:bg-gray-50 text-center">
//                                         <td className="px-4 py-2 border"><input type="checkbox" checked={selectedIds.includes(item._id)} onChange={() => handleSelectRow(item._id)} /></td>
//                                         <td className="px-4 py-2 border">{item.subjects}</td>
//                                         <td className="px-4 py-2 border">{item.teacherName}</td>
//                                         <td className="px-4 py-2 border">{item.standards}</td>
//                                         <td className="px-4 py-2 border">{item.divisions}</td>
//                                         <td className="px-4 py-2 border">{item.weeklyLectures}</td>
//                                         <td className="px-4 py-2 border">
//                                             <button className="text-blue-500 hover:underline mr-2" onClick={() => handleEdit(item)}>Edit</button>
//                                             <button className="text-red-500 hover:underline" onClick={() => handleDelete(item._id)}>Delete</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                     {ModalJSX} 
//                 </div>
//             </div>
//         </MainLayout>
//     );
// }


















// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";
// import { API_BASE_URL } from "../config";

// const generateDivisions = (count) => {
//     if (count < 1) return [];
//     const divisions = [];
//     for (let i = 0; i < count; i++) {
//         divisions.push(String.fromCharCode(65 + i));
//     }
//     return divisions;
// };

// const STANDARD_OPTIONS = ["Nursery", "Junior", "Senior", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
// const SUBJECT_OPTIONS = ["Mathematics", "Science", "English", "Hindi", "Marathi", "Social Studies", "Sanskrit", "Computer", "Art", "Physical Education"];
// const DIVISION_OPTIONS = ["A", "B", "C", "D", "E"];

// export default function AcademicSubject() {
//     const [searchQuery, setSearchQuery] = useState("");
//     const [filterStd, setFilterStd] = useState(""); // New Filter State
//     const [filterDiv, setFilterDiv] = useState(""); // New Filter State
//     const [subjectData, setSubjectData] = useState([]); 
//     const [teachers, setTeachers] = useState([]); 
//     const [isLoading, setIsLoading] = useState(false);
//     const [selectedIds, setSelectedIds] = useState([]);

//     const [showModal, setShowModal] = useState(false);
//     const [editingAllotment, setEditingAllotment] = useState(null); 
//     const [isEditMode, setIsEditMode] = useState(false);

//     const [selectedTeacherOption, setSelectedTeacherOption] = useState(null); 
//     const [subjects, setSubjects] = useState([{ id: 1, value: '' }]); 
//     const [standards, setStandards] = useState([{ id: 1, value: '' }]); 
//     const [divisions, setDivisions] = useState([{ id: 1, value: '' }]); 
//     const [weeklyLectures, setWeeklyLectures] = useState('');
//     const [divisionCount, setDivisionCount] = useState(1);

//     const fetchAllData = useCallback(async () => {
//         setIsLoading(true);
//         try {
//             const allotmentsResponse = await axios.get(
//                 `${API_BASE_URL}api/allotments`,
//                 { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } }
//             );
//             const rawData = allotmentsResponse.data;
//             setSubjectData(Array.isArray(rawData) ? rawData : (rawData ? [rawData] : []));

//             const teachersResponse = await axios.get(
//                 `${API_BASE_URL}api/staff`,
//                 { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } }
//             );
//             setTeachers(teachersResponse.data);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             setSubjectData([]); 
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     useEffect(() => { fetchAllData(); }, [fetchAllData]);

//     const filteredTeacherOptions = useMemo(() => {
//         const selectedStdValues = standards.map(s => s.value).filter(v => v !== '');

//         return teachers
//             .filter((teacher) => {
//                 if (selectedStdValues.length === 0) return true;
//                 const preferred = teacher.role?.preferredgrades || [];
//                 return selectedStdValues.every(selectedStd => 
//                     preferred.some(grade => grade.includes(selectedStd))
//                 );
//             })
//             .map((item) => ({
//                 value: `${item._id},${item.firstname} ${item.lastname}`, 
//                 label: `${item.firstname} ${item.lastname}`,
//             }));
//     }, [teachers, standards]);

//     const resetFormState = useCallback(() => {
//         setSelectedTeacherOption(null);
//         setSubjects([{ id: 1, value: '' }]);
//         setStandards([{ id: 1, value: '' }]);
//         setDivisions([{ id: 1, value: '' }]);
//         setWeeklyLectures('');
//         setDivisionCount(1);
//     }, []);

//     useEffect(() => {
//         if (editingAllotment && editingAllotment._id) {
//             setIsEditMode(true);
//             setSubjects([{ id: 1, value: editingAllotment.subjects || '' }]);
//             setStandards([{ id: 1, value: editingAllotment.standards || '' }]);
//             setDivisions([{ id: 1, value: editingAllotment.divisions || '' }]);
//             setWeeklyLectures(String(editingAllotment.weeklyLectures || ''));
            
//             const teacherName = editingAllotment.teacherName;
//             const teacherOption = teachers
//                 .map(item => ({
//                     value: `${item._id},${item.firstname} ${item.lastname}`, 
//                     label: `${item.firstname} ${item.lastname}`,
//                 }))
//                 .find(opt => opt.label === teacherName);
//             setSelectedTeacherOption(teacherOption || null);
//         } else {
//             setIsEditMode(false);
//             resetFormState();
//         }
//     }, [editingAllotment, resetFormState, teachers]);

//     const handleAddInput = (state, setState) => setState([...state, { id: Date.now(), value: '' }]);
//     const handleRemoveInput = (state, setState, idToRemove) => state.length > 1 && setState(state.filter(item => item.id !== idToRemove));
//     const handleChangeInput = (state, setState, id, newValue) => setState(state.map(item => item.id === id ? { ...item, value: newValue } : item));

//     const handleDivisionCountChange = (e) => {
//         const count = Number(e.target.value);
//         if (count < 1) return;
//         setDivisionCount(count);
//         setDivisions(generateDivisions(count).map((div, index) => ({ id: index + 1, value: div })));
//     };

//     const normalizedData = useMemo(() => {
//         const flattened = [];
//         subjectData.forEach((allotment) => {
//             flattened.push({
//                 _id: allotment._id, 
//                 teacherName: allotment.teacherName,
//                 subjects: allotment.subjects?.[0] || '', 
//                 standards: allotment.standards?.[0] || '', 
//                 divisions: allotment.divisions?.[0] || '', 
//                 weeklyLectures: allotment.weeklyLectures,
//             });
//         });
//         return flattened.filter((item) => {
//             const matchesSearch = item.teacherName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                                  item.subjects?.toLowerCase().includes(searchQuery.toLowerCase());
//             const matchesStd = filterStd === "" || item.standards === filterStd;
//             const matchesDiv = filterDiv === "" || item.divisions === filterDiv;
//             return matchesSearch && matchesStd && matchesDiv;
//         });
//     }, [subjectData, searchQuery, filterStd, filterDiv]);

//     const handleSelectAll = (e) => setSelectedIds(e.target.checked ? normalizedData.map(item => item._id) : []);
//     const handleSelectRow = (id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);

//     const handleEdit = (itemToEdit) => { setEditingAllotment(itemToEdit); setShowModal(true); };

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure?")) {
//             try {
//                 await axios.delete(`${API_BASE_URL}api/allotments/${id}`, { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } });
//                 fetchAllData();
//             } catch (error) { alert("Failed to delete."); }
//         }
//     };

//     const handleDeleteSelected = async () => {
//         if (window.confirm(`Delete ${selectedIds.length} items?`)) {
//             try {
//                 await Promise.all(selectedIds.map(id => axios.delete(`${API_BASE_URL}api/allotments/${id}`, { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } })));
//                 setSelectedIds([]); fetchAllData();
//             } catch (error) { alert("Failed to delete selected."); }
//         }
//     };

//     const handleSave = async (e) => {
//         e.preventDefault();
//         const finalSubjects = subjects.map(s => s.value).filter(v => v !== '');
//         const finalStandards = standards.map(s => s.value).filter(v => v !== '');
//         const finalDivisions = divisions.map(d => d.value).filter(v => v !== '');

//         if (!selectedTeacherOption || finalSubjects.length === 0 || finalStandards.length === 0 || finalDivisions.length === 0 || !weeklyLectures) {
//             alert("Fill all fields."); return;
//         }

//         const payload = {
//             teacher: selectedTeacherOption.value.split(',')[0], 
//             teacherName: selectedTeacherOption.label,
//             weeklyLectures: Number(weeklyLectures),
//             subjects: finalSubjects, standards: finalStandards, divisions: finalDivisions,
//         };
        
//         try {
//             const config = { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } };
//             if (isEditMode) {
//                 await axios.put(`${API_BASE_URL}api/allotments/${editingAllotment._id}`, payload, config);
//             } else {
//                 await axios.post(`${API_BASE_URL}api/allot-subject`, payload, config);
//             }
//             setShowModal(false); setEditingAllotment(null); resetFormState(); fetchAllData();
//         } catch (error) { alert("Error saving."); }
//     };

//     const ModalJSX = showModal ? (
//         <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(50, 50, 50, 0.5)' }}>
//             <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg overflow-y-auto max-h-[90vh]">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-semibold">{isEditMode ? 'Edit Subject Allotment' : 'Add Subject Allotment'}</h2>
//                     <button onClick={() => setShowModal(false)} className="text-gray-500">&times;</button>
//                 </div>
//                 <form onSubmit={handleSave}>
//                     <label className="block text-sm font-medium mb-1">Standard *</label>
//                     {standards.map((item) => (
//                         <div key={item.id} className="flex mb-2 items-center">
//                             <select
//                                 required value={item.value} 
//                                 onChange={(e) => handleChangeInput(standards, setStandards, item.id, e.target.value)}
//                                 className="w-full p-2 border rounded-md"
//                                 disabled={isEditMode}
//                             >
//                                 <option value="" disabled>Select Standard</option>
//                                 {STANDARD_OPTIONS.map(opt => (
//                                     <option key={opt} value={opt}>{opt}</option>
//                                 ))}
//                             </select>
//                             {!isEditMode && (
//                                 <>
//                                     <button type="button" onClick={() => handleAddInput(standards, setStandards)} className="ml-2 text-green-500">+</button>
//                                     {standards.length > 1 && <button type="button" onClick={() => handleRemoveInput(standards, setStandards, item.id)} className="ml-2 text-red-500">-</button>}
//                                 </>
//                             )}
//                         </div>
//                     ))}
//                     <div className="mb-4 mt-4">
//                         <label className="block text-sm font-medium mb-1">Teachers *</label>
//                         <select
//                             required value={selectedTeacherOption ? selectedTeacherOption.value : ''}
//                             onChange={(e) => {
//                                 const option = filteredTeacherOptions.find(opt => opt.value === e.target.value);
//                                 setSelectedTeacherOption(option || null);
//                             }}
//                             className="w-full p-2 border rounded-md"
//                         >
//                             <option value="" disabled>Select Teacher</option>
//                             {filteredTeacherOptions.map((opt) => (
//                                 <option key={opt.value} value={opt.value}>{opt.label}</option>
//                             ))}
//                         </select>
//                         {standards[0]?.value && filteredTeacherOptions.length === 0 && (
//                             <p className="text-red-500 text-xs mt-1">No teachers assigned to selected Standards</p>
//                         )}
//                     </div>
//                     <label className="block text-sm font-medium mb-1">Subject *</label>
//                     {subjects.map((item) => (
//                         <div key={item.id} className="flex mb-2 items-center">
//                             <select
//                                 required value={item.value} 
//                                 onChange={(e) => handleChangeInput(subjects, setSubjects, item.id, e.target.value)}
//                                 className="w-full p-2 border rounded-md"
//                             >
//                                 <option value="" disabled>Select Subject</option>
//                                 {SUBJECT_OPTIONS.map(opt => (
//                                     <option key={opt} value={opt}>{opt}</option>
//                                 ))}
//                             </select>
//                             {!isEditMode && (
//                                 <>
//                                     <button type="button" onClick={() => handleAddInput(subjects, setSubjects)} className="ml-2 text-green-500">+</button>
//                                     {subjects.length > 1 && <button type="button" onClick={() => handleRemoveInput(subjects, setSubjects, item.id)} className="ml-2 text-red-500">-</button>}
//                                 </>
//                             )}
//                         </div>
//                     ))}
//                     <div className="mb-4 mt-4">
//                         <label className="block text-sm font-medium mb-1">No. of Divisions *</label>
//                         <input
//                             type="number" min="1" max="10" required value={divisionCount} 
//                             onChange={handleDivisionCountChange} className="w-full p-2 border rounded-md"
//                             disabled={isEditMode}
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-sm font-medium mb-1">Weekly Lecture Count *</label>
//                         <select required value={weeklyLectures} onChange={(e) => setWeeklyLectures(e.target.value)} className="w-full p-2 border rounded-md">
//                             <option value="" disabled>Select</option>
//                             {[...Array(10)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
//                         </select>
//                     </div>
//                     <div className="flex justify-end">
//                         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">{isEditMode ? 'Save Changes' : 'Save'}</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     ) : null;

//     return (
//         <MainLayout>
//             <div className="bg-white rounded-2xl shadow p-6">
//                 <div className="flex flex-1 flex-col p-4 sm:p-6 overflow-y-auto">
//                     <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
//                         <div className="flex flex-wrap items-center gap-4">
//                             <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="w-full sm:w-64 px-3 py-2 rounded-md border border-gray-300 text-sm" />
                            
//                             {/* Standard Filter */}
//                             <select 
//                                 value={filterStd} 
//                                 onChange={(e) => setFilterStd(e.target.value)}
//                                 className="px-3 py-2 rounded-md border border-gray-300 text-sm"
//                             >
//                                 <option value="">All Standards</option>
//                                 {STANDARD_OPTIONS.map(std => <option key={std} value={std}>{std}</option>)}
//                             </select>

//                             {/* Division Filter */}
//                             <select 
//                                 value={filterDiv} 
//                                 onChange={(e) => setFilterDiv(e.target.value)}
//                                 className="px-3 py-2 rounded-md border border-gray-300 text-sm"
//                             >
//                                 <option value="">All Divisions</option>
//                                 {DIVISION_OPTIONS.map(div => <option key={div} value={div}>{div}</option>)}
//                             </select>

//                             {selectedIds.length > 0 && <button onClick={handleDeleteSelected} className="bg-red-500 text-white px-4 py-2 rounded-md text-sm">Delete Selected ({selectedIds.length})</button>}
//                         </div>
//                         <button onClick={() => { setEditingAllotment(null); setShowModal(true); }} className="bg-blue-500 text-white px-4 py-2 rounded-md">Add</button>
//                     </div>
//                     <div className="my-4 text-center"><h2 className="text-lg sm:text-xl font-semibold">Subject Allotment</h2></div>
//                     <div className="overflow-x-auto shadow-md">
//                         <table className="min-w-full border-collapse border border-gray-300">
//                             <thead>
//                                 <tr className="bg-blue-100">
//                                     <th className="px-4 py-2 border w-10"><input type="checkbox" onChange={handleSelectAll} checked={normalizedData.length > 0 && selectedIds.length === normalizedData.length} /></th>
//                                     <th className="px-4 py-2 border">Subject</th>
//                                     <th className="px-4 py-2 border">Teacher</th>
//                                     <th className="px-4 py-2 border">Standard</th>
//                                     <th className="px-4 py-2 border">Division</th>
//                                     <th className="px-4 py-2 border">Weekly Lectures</th>
//                                     <th className="px-4 py-2 border">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {isLoading ? (<tr><td colSpan="7" className="text-center py-4">Loading...</td></tr>) : 
//                                 normalizedData.length === 0 ? (<tr><td colSpan="7" className="text-center py-4">No allotments found matching criteria.</td></tr>) : 
//                                 normalizedData.map((item, index) => (
//                                     <tr key={index} className="border-b hover:bg-gray-50 text-center">
//                                         <td className="px-4 py-2 border"><input type="checkbox" checked={selectedIds.includes(item._id)} onChange={() => handleSelectRow(item._id)} /></td>
//                                         <td className="px-4 py-2 border">{item.subjects}</td>
//                                         <td className="px-4 py-2 border">{item.teacherName}</td>
//                                         <td className="px-4 py-2 border">{item.standards}</td>
//                                         <td className="px-4 py-2 border">{item.divisions}</td>
//                                         <td className="px-4 py-2 border">{item.weeklyLectures}</td>
//                                         <td className="px-4 py-2 border">
//                                             <button className="text-blue-500 hover:underline mr-2" onClick={() => handleEdit(item)}>Edit</button>
//                                             <button className="text-red-500 hover:underline" onClick={() => handleDelete(item._id)}>Delete</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                     {ModalJSX} 
//                 </div>
//             </div>
//         </MainLayout>
//     );
// }















// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";
// import { API_BASE_URL } from "../config";

// const generateDivisions = (count) => {
//     if (count < 1) return [];
//     const divisions = [];
//     for (let i = 0; i < count; i++) {
//         divisions.push(String.fromCharCode(65 + i));
//     }
//     return divisions;
// };

// const STANDARD_OPTIONS = ["Nursery", "Junior", "Senior", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
// const DIVISION_OPTIONS = ["A", "B", "C", "D", "E"];

// export default function AcademicSubject() {
//     const [searchQuery, setSearchQuery] = useState("");
//     const [filterStd, setFilterStd] = useState(""); 
//     const [filterDiv, setFilterDiv] = useState(""); 
//     const [subjectData, setSubjectData] = useState([]); 
//     const [teachers, setTeachers] = useState([]); 
//     const [isLoading, setIsLoading] = useState(false);
//     const [selectedIds, setSelectedIds] = useState([]);

//     const [showModal, setShowModal] = useState(false);
//     const [editingAllotment, setEditingAllotment] = useState(null); 
//     const [isEditMode, setIsEditMode] = useState(false);

//     const [selectedTeacherOption, setSelectedTeacherOption] = useState(null); 
//     const [subjects, setSubjects] = useState([{ id: 1, value: '' }]); 
//     const [standards, setStandards] = useState([{ id: 1, value: '' }]); 
//     const [divisions, setDivisions] = useState([{ id: 1, value: '' }]); 
//     const [weeklyLectures, setWeeklyLectures] = useState('');
//     const [divisionCount, setDivisionCount] = useState(1);

//     const fetchAllData = useCallback(async () => {
//         setIsLoading(true);
//         try {
//             const allotmentsResponse = await axios.get(
//                 `${API_BASE_URL}api/allotments`,
//                 { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } }
//             );
//             const rawData = allotmentsResponse.data;
//             setSubjectData(Array.isArray(rawData) ? rawData : (rawData ? [rawData] : []));

//             const teachersResponse = await axios.get(
//                 `${API_BASE_URL}api/staff`,
//                 { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } }
//             );
//             setTeachers(teachersResponse.data);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             setSubjectData([]); 
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     useEffect(() => { fetchAllData(); }, [fetchAllData]);

//     const filteredTeacherOptions = useMemo(() => {
//         const selectedStdValues = standards.map(s => s.value).filter(v => v !== '');

//         return teachers
//             .filter((teacher) => {
//                 if (selectedStdValues.length === 0) return true;
//                 const preferred = teacher.role?.preferredgrades || [];
//                 return selectedStdValues.every(selectedStd => 
//                     preferred.some(grade => grade.includes(selectedStd))
//                 );
//             })
//             .map((item) => ({
//                 value: `${item._id},${item.firstname} ${item.lastname}`, 
//                 label: `${item.firstname} ${item.lastname}`,
//             }));
//     }, [teachers, standards]);

//     const resetFormState = useCallback(() => {
//         setSelectedTeacherOption(null);
//         setSubjects([{ id: 1, value: '' }]);
//         setStandards([{ id: 1, value: '' }]);
//         setDivisions([{ id: 1, value: '' }]);
//         setWeeklyLectures('');
//         setDivisionCount(1);
//     }, []);

//     useEffect(() => {
//         if (editingAllotment && editingAllotment._id) {
//             setIsEditMode(true);
//             setSubjects([{ id: 1, value: editingAllotment.subjects || '' }]);
//             setStandards([{ id: 1, value: editingAllotment.standards || '' }]);
//             setDivisions([{ id: 1, value: editingAllotment.divisions || '' }]);
//             setWeeklyLectures(String(editingAllotment.weeklyLectures || ''));
            
//             const teacherName = editingAllotment.teacherName;
//             const teacherOption = teachers
//                 .map(item => ({
//                     value: `${item._id},${item.firstname} ${item.lastname}`, 
//                     label: `${item.firstname} ${item.lastname}`,
//                 }))
//                 .find(opt => opt.label === teacherName);
//             setSelectedTeacherOption(teacherOption || null);
//         } else {
//             setIsEditMode(false);
//             resetFormState();
//         }
//     }, [editingAllotment, resetFormState, teachers]);

//     const handleAddInput = (state, setState) => setState([...state, { id: Date.now(), value: '' }]);
//     const handleRemoveInput = (state, setState, idToRemove) => state.length > 1 && setState(state.filter(item => item.id !== idToRemove));
//     const handleChangeInput = (state, setState, id, newValue) => setState(state.map(item => item.id === id ? { ...item, value: newValue } : item));

//     const handleDivisionCountChange = (e) => {
//         const count = Number(e.target.value);
//         if (count < 1) return;
//         setDivisionCount(count);
//         setDivisions(generateDivisions(count).map((div, index) => ({ id: index + 1, value: div })));
//     };

//     const normalizedData = useMemo(() => {
//         const flattened = [];
//         subjectData.forEach((allotment) => {
//             flattened.push({
//                 _id: allotment._id, 
//                 teacherName: allotment.teacherName,
//                 subjects: allotment.subjects?.[0] || '', 
//                 standards: allotment.standards?.[0] || '', 
//                 divisions: allotment.divisions?.[0] || '', 
//                 weeklyLectures: allotment.weeklyLectures,
//             });
//         });
//         return flattened.filter((item) => {
//             const matchesSearch = item.teacherName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                                  item.subjects?.toLowerCase().includes(searchQuery.toLowerCase());
//             const matchesStd = filterStd === "" || item.standards === filterStd;
//             const matchesDiv = filterDiv === "" || item.divisions === filterDiv;
//             return matchesSearch && matchesStd && matchesDiv;
//         });
//     }, [subjectData, searchQuery, filterStd, filterDiv]);

//     const handleSelectAll = (e) => setSelectedIds(e.target.checked ? normalizedData.map(item => item._id) : []);
//     const handleSelectRow = (id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);

//     const handleEdit = (itemToEdit) => { setEditingAllotment(itemToEdit); setShowModal(true); };

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure?")) {
//             try {
//                 await axios.delete(`${API_BASE_URL}api/allotments/${id}`, { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } });
//                 fetchAllData();
//             } catch (error) { alert("Failed to delete."); }
//         }
//     };

//     const handleDeleteSelected = async () => {
//         if (window.confirm(`Delete ${selectedIds.length} items?`)) {
//             try {
//                 await Promise.all(selectedIds.map(id => axios.delete(`${API_BASE_URL}api/allotments/${id}`, { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } })));
//                 setSelectedIds([]); fetchAllData();
//             } catch (error) { alert("Failed to delete selected."); }
//         }
//     };

//     const handleSave = async (e) => {
//         e.preventDefault();
//         const finalSubjects = subjects.map(s => s.value).filter(v => v.trim() !== '');
//         const finalStandards = standards.map(s => s.value).filter(v => v.trim() !== '');
//         const finalDivisions = divisions.map(d => d.value).filter(v => v.trim() !== '');

//         if (!selectedTeacherOption || finalSubjects.length === 0 || finalStandards.length === 0 || finalDivisions.length === 0 || !weeklyLectures) {
//             alert("Fill all fields."); return;
//         }

//         const payload = {
//             teacher: selectedTeacherOption.value.split(',')[0], 
//             teacherName: selectedTeacherOption.label,
//             weeklyLectures: Number(weeklyLectures),
//             subjects: finalSubjects, standards: finalStandards, divisions: finalDivisions,
//         };
        
//         try {
//             const config = { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } };
//             if (isEditMode) {
//                 await axios.put(`${API_BASE_URL}api/allotments/${editingAllotment._id}`, payload, config);
//             } else {
//                 await axios.post(`${API_BASE_URL}api/allot-subject`, payload, config);
//             }
//             setShowModal(false); setEditingAllotment(null); resetFormState(); fetchAllData();
//         } catch (error) { alert("Error saving."); }
//     };

//     const ModalJSX = showModal ? (
//         <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(50, 50, 50, 0.5)' }}>
//             <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg overflow-y-auto max-h-[90vh]">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-semibold">{isEditMode ? 'Edit Subject Allotment' : 'Add Subject Allotment'}</h2>
//                     <button onClick={() => setShowModal(false)} className="text-gray-500">&times;</button>
//                 </div>
//                 <form onSubmit={handleSave}>
//                     <label className="block text-sm font-medium mb-1">Standard *</label>
//                     {standards.map((item) => (
//                         <div key={item.id} className="flex mb-2 items-center">
//                             <select
//                                 required value={item.value} 
//                                 onChange={(e) => handleChangeInput(standards, setStandards, item.id, e.target.value)}
//                                 className="w-full p-2 border rounded-md"
//                                 disabled={isEditMode}
//                             >
//                                 <option value="" disabled>Select Standard</option>
//                                 {STANDARD_OPTIONS.map(opt => (
//                                     <option key={opt} value={opt}>{opt}</option>
//                                 ))}
//                             </select>
//                             {!isEditMode && (
//                                 <>
//                                     <button type="button" onClick={() => handleAddInput(standards, setStandards)} className="ml-2 text-green-500">+</button>
//                                     {standards.length > 1 && <button type="button" onClick={() => handleRemoveInput(standards, setStandards, item.id)} className="ml-2 text-red-500">-</button>}
//                                 </>
//                             )}
//                         </div>
//                     ))}
//                     <div className="mb-4 mt-4">
//                         <label className="block text-sm font-medium mb-1">Teachers *</label>
//                         <select
//                             required value={selectedTeacherOption ? selectedTeacherOption.value : ''}
//                             onChange={(e) => {
//                                 const option = filteredTeacherOptions.find(opt => opt.value === e.target.value);
//                                 setSelectedTeacherOption(option || null);
//                             }}
//                             className="w-full p-2 border rounded-md"
//                         >
//                             <option value="" disabled>Select Teacher</option>
//                             {filteredTeacherOptions.map((opt) => (
//                                 <option key={opt.value} value={opt.value}>{opt.label}</option>
//                             ))}
//                         </select>
//                         {standards[0]?.value && filteredTeacherOptions.length === 0 && (
//                             <p className="text-red-500 text-xs mt-1">No teachers assigned to selected Standards</p>
//                         )}
//                     </div>
//                     {/* 🔑 Subject is now a Text Input again */}
//                     <label className="block text-sm font-medium mb-1">Subject *</label>
//                     {subjects.map((item) => (
//                         <div key={item.id} className="flex mb-2 items-center">
//                             <input
//                                 type="text"
//                                 required
//                                 value={item.value} 
//                                 onChange={(e) => handleChangeInput(subjects, setSubjects, item.id, e.target.value)}
//                                 placeholder="Enter Subject Name"
//                                 className="w-full p-2 border rounded-md"
//                             />
//                             {!isEditMode && (
//                                 <>
//                                     <button type="button" onClick={() => handleAddInput(subjects, setSubjects)} className="ml-2 text-green-500">+</button>
//                                     {subjects.length > 1 && <button type="button" onClick={() => handleRemoveInput(subjects, setSubjects, item.id)} className="ml-2 text-red-500">-</button>}
//                                 </>
//                             )}
//                         </div>
//                     ))}
//                     <div className="mb-4 mt-4">
//                         <label className="block text-sm font-medium mb-1">No. of Divisions *</label>
//                         <input
//                             type="number" min="1" max="10" required value={divisionCount} 
//                             onChange={handleDivisionCountChange} className="w-full p-2 border rounded-md"
//                             disabled={isEditMode}
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-sm font-medium mb-1">Weekly Lecture Count *</label>
//                         <select required value={weeklyLectures} onChange={(e) => setWeeklyLectures(e.target.value)} className="w-full p-2 border rounded-md">
//                             <option value="" disabled>Select</option>
//                             {[...Array(10)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
//                         </select>
//                     </div>
//                     <div className="flex justify-end">
//                         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">{isEditMode ? 'Save Changes' : 'Save'}</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     ) : null;

//     return (
//         <MainLayout>
//             <div className="bg-white rounded-2xl shadow p-6">
//                 <div className="flex flex-1 flex-col p-4 sm:p-6 overflow-y-auto">
//                     <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
//                         <div className="flex flex-wrap items-center gap-4">
//                             <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="w-full sm:w-64 px-3 py-2 rounded-md border border-gray-300 text-sm" />
//                             <select value={filterStd} onChange={(e) => setFilterStd(e.target.value)} className="px-3 py-2 rounded-md border border-gray-300 text-sm">
//                                 <option value="">All Standards</option>
//                                 {STANDARD_OPTIONS.map(std => <option key={std} value={std}>{std}</option>)}
//                             </select>
//                             <select value={filterDiv} onChange={(e) => setFilterDiv(e.target.value)} className="px-3 py-2 rounded-md border border-gray-300 text-sm">
//                                 <option value="">All Divisions</option>
//                                 {DIVISION_OPTIONS.map(div => <option key={div} value={div}>{div}</option>)}
//                             </select>
//                             {selectedIds.length > 0 && <button onClick={handleDeleteSelected} className="bg-red-500 text-white px-4 py-2 rounded-md text-sm">Delete Selected ({selectedIds.length})</button>}
//                         </div>
//                         <button onClick={() => { setEditingAllotment(null); setShowModal(true); }} className="bg-blue-500 text-white px-4 py-2 rounded-md">Add</button>
//                     </div>
//                     <div className="my-4 text-center"><h2 className="text-lg sm:text-xl font-semibold">Subject Allotment</h2></div>
//                     <div className="overflow-x-auto shadow-md">
//                         <table className="min-w-full border-collapse border border-gray-300">
//                             <thead>
//                                 <tr className="bg-blue-100">
//                                     <th className="px-4 py-2 border w-10"><input type="checkbox" onChange={handleSelectAll} checked={normalizedData.length > 0 && selectedIds.length === normalizedData.length} /></th>
//                                     <th className="px-4 py-2 border">Subject</th>
//                                     <th className="px-4 py-2 border">Teacher</th>
//                                     <th className="px-4 py-2 border">Standard</th>
//                                     <th className="px-4 py-2 border">Division</th>
//                                     <th className="px-4 py-2 border">Weekly Lectures</th>
//                                     <th className="px-4 py-2 border">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {isLoading ? (<tr><td colSpan="7" className="text-center py-4">Loading...</td></tr>) : 
//                                 normalizedData.length === 0 ? (<tr><td colSpan="7" className="text-center py-4">No allotments found matching criteria.</td></tr>) : 
//                                 normalizedData.map((item, index) => (
//                                     <tr key={index} className="border-b hover:bg-gray-50 text-center">
//                                         <td className="px-4 py-2 border"><input type="checkbox" checked={selectedIds.includes(item._id)} onChange={() => handleSelectRow(item._id)} /></td>
//                                         <td className="px-4 py-2 border">{item.subjects}</td>
//                                         <td className="px-4 py-2 border">{item.teacherName}</td>
//                                         <td className="px-4 py-2 border">{item.standards}</td>
//                                         <td className="px-4 py-2 border">{item.divisions}</td>
//                                         <td className="px-4 py-2 border">{item.weeklyLectures}</td>
//                                         <td className="px-4 py-2 border">
//                                             <button className="text-blue-500 hover:underline mr-2" onClick={() => handleEdit(item)}>Edit</button>
//                                             <button className="text-red-500 hover:underline" onClick={() => handleDelete(item._id)}>Delete</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                     {ModalJSX} 
//                 </div>
//             </div>
//         </MainLayout>
//     );
// }















// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";
// import { API_BASE_URL } from "../config";

// const generateDivisions = (count) => {
//     if (count < 1) return [];
//     const divisions = [];
//     for (let i = 0; i < count; i++) {
//         divisions.push(String.fromCharCode(65 + i));
//     }
//     return divisions;
// };

// const STANDARD_OPTIONS = ["Nursery", "Junior", "Senior", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
// const DIVISION_OPTIONS = ["A", "B", "C", "D", "E"];

// export default function AcademicSubject() {
//     const [searchQuery, setSearchQuery] = useState("");
//     const [filterStd, setFilterStd] = useState(""); 
//     const [filterDiv, setFilterDiv] = useState(""); 
//     const [subjectData, setSubjectData] = useState([]); 
//     const [teachers, setTeachers] = useState([]); 
//     const [isLoading, setIsLoading] = useState(false);
//     const [selectedIds, setSelectedIds] = useState([]);

//     const [showModal, setShowModal] = useState(false);
//     const [editingAllotment, setEditingAllotment] = useState(null); 
//     const [isEditMode, setIsEditMode] = useState(false);

//     const [selectedTeacherOption, setSelectedTeacherOption] = useState(null); 
//     const [subjects, setSubjects] = useState([{ id: 1, value: '' }]); 
//     const [standards, setStandards] = useState([{ id: 1, value: '' }]); 
//     const [divisions, setDivisions] = useState([{ id: 1, value: '' }]); 
//     const [weeklyLectures, setWeeklyLectures] = useState('');
//     const [divisionCount, setDivisionCount] = useState(1);

//     const fetchAllData = useCallback(async () => {
//         setIsLoading(true);
//         try {
//             const allotmentsResponse = await axios.get(
//                 `${API_BASE_URL}api/allotments`,
//                 { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } }
//             );
//             const rawData = allotmentsResponse.data;
//             setSubjectData(Array.isArray(rawData) ? rawData : (rawData ? [rawData] : []));

//             const teachersResponse = await axios.get(
//                 `${API_BASE_URL}api/staff`,
//                 { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } }
//             );
//             setTeachers(teachersResponse.data);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             setSubjectData([]); 
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     useEffect(() => { fetchAllData(); }, [fetchAllData]);

//     const filteredTeacherOptions = useMemo(() => {
//         const selectedStdValues = standards.map(s => s.value).filter(v => v !== '');

//         // Map standards to categories for matching with "preferredgrades"
//         const getCategory = (std) => {
//             const prePrimary = ["Nursery", "Junior", "Senior"];
//             const primary = ["1", "2", "3", "4", "5"];
//             const secondary = ["6", "7", "8", "9", "10"];
            
//             if (prePrimary.includes(std)) return "pre-primary";
//             if (primary.includes(std)) return "primary";
//             if (secondary.includes(std)) return "secondary";
//             return "";
//         };

//         return teachers
//             .filter((teacher) => {
//                 if (selectedStdValues.length === 0) return true;
//                 const preferred = (teacher.role?.preferredgrades || []).map(g => g.toLowerCase());
                
//                 return selectedStdValues.every(selectedStd => {
//                     const requiredCategory = getCategory(selectedStd);
//                     // Check if teacher has the category OR the specific standard string
//                     return preferred.some(grade => 
//                         grade.includes(requiredCategory) || grade.includes(selectedStd.toLowerCase())
//                     );
//                 });
//             })
//             .map((item) => ({
//                 value: `${item._id},${item.firstname} ${item.lastname}`, 
//                 label: `${item.firstname} ${item.lastname}`,
//             }));
//     }, [teachers, standards]);

//     const resetFormState = useCallback(() => {
//         setSelectedTeacherOption(null);
//         setSubjects([{ id: 1, value: '' }]);
//         setStandards([{ id: 1, value: '' }]);
//         setDivisions([{ id: 1, value: '' }]);
//         setWeeklyLectures('');
//         setDivisionCount(1);
//     }, []);

//     useEffect(() => {
//         if (editingAllotment && editingAllotment._id) {
//             setIsEditMode(true);
//             setSubjects([{ id: 1, value: editingAllotment.subjects || '' }]);
//             setStandards([{ id: 1, value: editingAllotment.standards || '' }]);
//             setDivisions([{ id: 1, value: editingAllotment.divisions || '' }]);
//             setWeeklyLectures(String(editingAllotment.weeklyLectures || ''));
            
//             const teacherName = editingAllotment.teacherName;
//             const teacherOption = teachers
//                 .map(item => ({
//                     value: `${item._id},${item.firstname} ${item.lastname}`, 
//                     label: `${item.firstname} ${item.lastname}`,
//                 }))
//                 .find(opt => opt.label === teacherName);
//             setSelectedTeacherOption(teacherOption || null);
//         } else {
//             setIsEditMode(false);
//             resetFormState();
//         }
//     }, [editingAllotment, resetFormState, teachers]);

//     const handleAddInput = (state, setState) => setState([...state, { id: Date.now(), value: '' }]);
//     const handleRemoveInput = (state, setState, idToRemove) => state.length > 1 && setState(state.filter(item => item.id !== idToRemove));
//     const handleChangeInput = (state, setState, id, newValue) => setState(state.map(item => item.id === id ? { ...item, value: newValue } : item));

//     const handleDivisionCountChange = (e) => {
//         const count = Number(e.target.value);
//         if (count < 1) return;
//         setDivisionCount(count);
//         setDivisions(generateDivisions(count).map((div, index) => ({ id: index + 1, value: div })));
//     };

//     const normalizedData = useMemo(() => {
//         const flattened = [];
//         subjectData.forEach((allotment) => {
//             flattened.push({
//                 _id: allotment._id, 
//                 teacherName: allotment.teacherName,
//                 subjects: allotment.subjects?.[0] || '', 
//                 standards: allotment.standards?.[0] || '', 
//                 divisions: allotment.divisions?.[0] || '', 
//                 weeklyLectures: allotment.weeklyLectures,
//             });
//         });
//         return flattened.filter((item) => {
//             const matchesSearch = item.teacherName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                                  item.subjects?.toLowerCase().includes(searchQuery.toLowerCase());
//             const matchesStd = filterStd === "" || item.standards === filterStd;
//             const matchesDiv = filterDiv === "" || item.divisions === filterDiv;
//             return matchesSearch && matchesStd && matchesDiv;
//         });
//     }, [subjectData, searchQuery, filterStd, filterDiv]);

//     const handleSelectAll = (e) => setSelectedIds(e.target.checked ? normalizedData.map(item => item._id) : []);
//     const handleSelectRow = (id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);

//     const handleEdit = (itemToEdit) => { setEditingAllotment(itemToEdit); setShowModal(true); };

//     const handleDelete = async (id) => {
//         if (window.confirm("Are you sure?")) {
//             try {
//                 await axios.delete(`${API_BASE_URL}api/allotments/${id}`, { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } });
//                 fetchAllData();
//             } catch (error) { alert("Failed to delete."); }
//         }
//     };

//     const handleDeleteSelected = async () => {
//         if (window.confirm(`Delete ${selectedIds.length} items?`)) {
//             try {
//                 await Promise.all(selectedIds.map(id => axios.delete(`${API_BASE_URL}api/allotments/${id}`, { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } })));
//                 setSelectedIds([]); fetchAllData();
//             } catch (error) { alert("Failed to delete selected."); }
//         }
//     };

//     const handleSave = async (e) => {
//         e.preventDefault();
//         const finalSubjects = subjects.map(s => s.value).filter(v => v.trim() !== '');
//         const finalStandards = standards.map(s => s.value).filter(v => v.trim() !== '');
//         const finalDivisions = divisions.map(d => d.value).filter(v => v.trim() !== '');

//         if (!selectedTeacherOption || finalSubjects.length === 0 || finalStandards.length === 0 || finalDivisions.length === 0 || !weeklyLectures) {
//             alert("Fill all fields."); return;
//         }

//         const payload = {
//             teacher: selectedTeacherOption.value.split(',')[0], 
//             teacherName: selectedTeacherOption.label,
//             weeklyLectures: Number(weeklyLectures),
//             subjects: finalSubjects, standards: finalStandards, divisions: finalDivisions,
//         };
        
//         try {
//             const config = { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } };
//             if (isEditMode) {
//                 await axios.put(`${API_BASE_URL}api/allotments/${editingAllotment._id}`, payload, config);
//             } else {
//                 await axios.post(`${API_BASE_URL}api/allot-subject`, payload, config);
//             }
//             setShowModal(false); setEditingAllotment(null); resetFormState(); fetchAllData();
//         } catch (error) { alert("Error saving."); }
//     };

//     const ModalJSX = showModal ? (
//         <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(50, 50, 50, 0.5)' }}>
//             <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg overflow-y-auto max-h-[90vh]">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-semibold">{isEditMode ? 'Edit Subject Allotment' : 'Add Subject Allotment'}</h2>
//                     <button onClick={() => setShowModal(false)} className="text-gray-500">&times;</button>
//                 </div>
//                 <form onSubmit={handleSave}>
//                     <label className="block text-sm font-medium mb-1">Standard *</label>
//                     {standards.map((item) => (
//                         <div key={item.id} className="flex mb-2 items-center">
//                             <select
//                                 required value={item.value || ''} 
//                                 onChange={(e) => handleChangeInput(standards, setStandards, item.id, e.target.value)}
//                                 className="w-full p-2 border rounded-md"
//                                 disabled={isEditMode}
//                             >
//                                 <option value="" disabled>Select Standard</option>
//                                 {STANDARD_OPTIONS.map(opt => (
//                                     <option key={opt} value={opt}>{opt}</option>
//                                 ))}
//                             </select>
//                             {!isEditMode && (
//                                 <>
//                                     <button type="button" onClick={() => handleAddInput(standards, setStandards)} className="ml-2 text-green-500">+</button>
//                                     {standards.length > 1 && <button type="button" onClick={() => handleRemoveInput(standards, setStandards, item.id)} className="ml-2 text-red-500">-</button>}
//                                 </>
//                             )}
//                         </div>
//                     ))}
//                     <div className="mb-4 mt-4">
//                         <label className="block text-sm font-medium mb-1">Teachers *</label>
//                         <select
//                             required value={selectedTeacherOption ? selectedTeacherOption.value : ''}
//                             onChange={(e) => {
//                                 const option = filteredTeacherOptions.find(opt => opt.value === e.target.value);
//                                 setSelectedTeacherOption(option || null);
//                             }}
//                             className="w-full p-2 border rounded-md"
//                         >
//                             <option value="" disabled>Select Teacher</option>
//                             {filteredTeacherOptions.map((opt) => (
//                                 <option key={opt.value} value={opt.value}>{opt.label}</option>
//                             ))}
//                         </select>
//                         {standards[0]?.value && filteredTeacherOptions.length === 0 && (
//                             <p className="text-red-500 text-xs mt-1">No teachers assigned to selected Standards</p>
//                         )}
//                     </div>
//                     <label className="block text-sm font-medium mb-1">Subject *</label>
//                     {subjects.map((item) => (
//                         <div key={item.id} className="flex mb-2 items-center">
//                             <input
//                                 type="text"
//                                 required
//                                 value={item.value || ''} 
//                                 onChange={(e) => handleChangeInput(subjects, setSubjects, item.id, e.target.value)}
//                                 placeholder="Enter Subject Name"
//                                 className="w-full p-2 border rounded-md"
//                             />
//                             {!isEditMode && (
//                                 <>
//                                     <button type="button" onClick={() => handleAddInput(subjects, setSubjects)} className="ml-2 text-green-500">+</button>
//                                     {subjects.length > 1 && <button type="button" onClick={() => handleRemoveInput(subjects, setSubjects, item.id)} className="ml-2 text-red-500">-</button>}
//                                 </>
//                             )}
//                         </div>
//                     ))}
//                     <div className="mb-4 mt-4">
//                         <label className="block text-sm font-medium mb-1">No. of Divisions *</label>
//                         <input
//                             type="number" min="1" max="10" required value={divisionCount} 
//                             onChange={handleDivisionCountChange} className="w-full p-2 border rounded-md"
//                             disabled={isEditMode}
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-sm font-medium mb-1">Weekly Lecture Count *</label>
//                         <select required value={weeklyLectures || ''} onChange={(e) => setWeeklyLectures(e.target.value)} className="w-full p-2 border rounded-md">
//                             <option value="" disabled>Select</option>
//                             {[...Array(10)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
//                         </select>
//                     </div>
//                     <div className="flex justify-end">
//                         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">{isEditMode ? 'Save Changes' : 'Save'}</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     ) : null;

//     return (
//         <MainLayout>
//             <div className="bg-white rounded-2xl shadow p-6">
//                 <div className="flex flex-1 flex-col p-4 sm:p-6 overflow-y-auto">
//                     <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
//                         <div className="flex flex-wrap items-center gap-4">
//                             <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="w-full sm:w-64 px-3 py-2 rounded-md border border-gray-300 text-sm" />
//                             <select value={filterStd} onChange={(e) => setFilterStd(e.target.value)} className="px-3 py-2 rounded-md border border-gray-300 text-sm">
//                                 <option value="">All Standards</option>
//                                 {STANDARD_OPTIONS.map(std => <option key={std} value={std}>{std}</option>)}
//                             </select>
//                             <select value={filterDiv} onChange={(e) => setFilterDiv(e.target.value)} className="px-3 py-2 rounded-md border border-gray-300 text-sm">
//                                 <option value="">All Divisions</option>
//                                 {DIVISION_OPTIONS.map(div => <option key={div} value={div}>{div}</option>)}
//                             </select>
//                             {selectedIds.length > 0 && <button onClick={handleDeleteSelected} className="bg-red-500 text-white px-4 py-2 rounded-md text-sm">Delete Selected ({selectedIds.length})</button>}
//                         </div>
//                         <button onClick={() => { setEditingAllotment(null); setShowModal(true); }} className="bg-blue-500 text-white px-4 py-2 rounded-md">Add</button>
//                     </div>
//                     <div className="my-4 text-center"><h2 className="text-lg sm:text-xl font-semibold">Subject Allotment</h2></div>
//                     <div className="overflow-x-auto shadow-md">
//                         <table className="min-w-full border-collapse border border-gray-300">
//                             <thead>
//                                 <tr className="bg-blue-100">
//                                     <th className="px-4 py-2 border w-10"><input type="checkbox" onChange={handleSelectAll} checked={normalizedData.length > 0 && selectedIds.length === normalizedData.length} /></th>
//                                     <th className="px-4 py-2 border">Subject</th>
//                                     <th className="px-4 py-2 border">Teacher</th>
//                                     <th className="px-4 py-2 border">Standard</th>
//                                     <th className="px-4 py-2 border">Division</th>
//                                     <th className="px-4 py-2 border">Weekly Lectures</th>
//                                     <th className="px-4 py-2 border">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {isLoading ? (<tr><td colSpan="7" className="text-center py-4">Loading...</td></tr>) : 
//                                 normalizedData.length === 0 ? (<tr><td colSpan="7" className="text-center py-4">No allotments found matching criteria.</td></tr>) : 
//                                 normalizedData.map((item, index) => (
//                                     <tr key={index} className="border-b hover:bg-gray-50 text-center">
//                                         <td className="px-4 py-2 border"><input type="checkbox" checked={selectedIds.includes(item._id)} onChange={() => handleSelectRow(item._id)} /></td>
//                                         <td className="px-4 py-2 border">{item.subjects}</td>
//                                         <td className="px-4 py-2 border">{item.teacherName}</td>
//                                         <td className="px-4 py-2 border">{item.standards}</td>
//                                         <td className="px-4 py-2 border">{item.divisions}</td>
//                                         <td className="px-4 py-2 border">{item.weeklyLectures}</td>
//                                         <td className="px-4 py-2 border">
//                                             <button className="text-blue-500 hover:underline mr-2" onClick={() => handleEdit(item)}>Edit</button>
//                                             <button className="text-red-500 hover:underline" onClick={() => handleDelete(item._id)}>Delete</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                     {ModalJSX} 
//                 </div>
//             </div>
//         </MainLayout>
//     );
// }

// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";
// import { API_BASE_URL } from "../config";

// const STANDARD_OPTIONS = ["Nursery", "Junior", "Senior", ...Array.from({ length: 10 }, (_, i) => String(i + 1))];
// const DIVISION_OPTIONS = ["A", "B", "C", "D", "E"];

// export default function AcademicSubject() {
//     const [searchQuery, setSearchQuery] = useState("");
//     const [filterStd, setFilterStd] = useState(""); 
//     const [subjectData, setSubjectData] = useState([]); 
//     const [teachers, setTeachers] = useState([]); 
//     const [isLoading, setIsLoading] = useState(false);

//     const [showModal, setShowModal] = useState(false);
//     const [isEditMode, setIsEditMode] = useState(false);
//     const [selectedStd, setSelectedStd] = useState("");
//     const [allotmentRows, setAllotmentRows] = useState([
//         { id: Date.now(), subject: '', teacherOptions: [{ id: Date.now() + 1, teacher: null }] }
//     ]);
//     const [availableSubjectsForStd, setAvailableSubjectsForStd] = useState([]);

//     const fetchAllData = useCallback(async () => {
//         setIsLoading(true);
//         const config = { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } };
//         try {
//             const [allotRes, staffRes] = await Promise.all([
//                 axios.get(`${API_BASE_URL}api/allotments`, config),
//                 axios.get(`${API_BASE_URL}api/staff`, config)
//             ]);
//             setSubjectData(Array.isArray(allotRes.data) ? allotRes.data : []);
//             setTeachers(staffRes.data);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             setSubjectData([]); 
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     useEffect(() => { fetchAllData(); }, [fetchAllData]);

//     useEffect(() => {
//         const fetchConfiguredSubjects = async () => {
//             if (!selectedStd) return;
//             try {
//                 const res = await axios.get(`${API_BASE_URL}api/subjects/${selectedStd}`, {
//                     headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" }
//                 });
//                 const config = res.data.subjects?.[0];
                
//                 if (config && config.subjects) {
//                     const flattenedSubjects = [];
//                     config.subjects.forEach(sub => {
//                         if (sub.subSubjects && sub.subSubjects.length > 0) {
//                             flattenedSubjects.push(...sub.subSubjects);
//                         } else {
//                             flattenedSubjects.push(sub.name);
//                         }
//                     });
//                     setAvailableSubjectsForStd(flattenedSubjects);
//                 } else {
//                     setAvailableSubjectsForStd([]);
//                 }
//             } catch (err) {
//                 setAvailableSubjectsForStd([]);
//             }
//         };
//         fetchConfiguredSubjects();
//     }, [selectedStd]);

//     // const getFilteredTeacherOptions = (std) => {
//     //     const getCategory = (s) => {
//     //         if (["Nursery", "Junior", "Senior"].includes(s)) return "pre-primary";
//     //         if (["1", "2", "3", "4", "5"].includes(s)) return "primary";
//     //         if (["6", "7", "8", "9", "10"].includes(s)) return "secondary";
//     //         return "";
//     //     };
//     //     const requiredCategory = getCategory(std);
//     //     return teachers
//     //         .filter(t => (t.role?.preferredgrades || []).some(g => g.toLowerCase().includes(requiredCategory)))
//     //         .map(t => ({ value: `${t._id},${t.firstname} ${t.lastname}`, label: `${t.firstname} ${t.lastname}` }));
//     // };

//     const getFilteredTeacherOptions = (std) => {
//     const getCategory = (s) => {
//         // We use lowercase to ensure consistent comparison
//         if (["Nursery", "Junior", "Senior"].includes(s)) return "pre-primary";
//         if (["1", "2", "3", "4", "5"].includes(s)) return "primary";
//         if (["6", "7", "8", "9", "10"].includes(s)) return "secondary";
//         return "";
//     };

//     const requiredCategory = getCategory(std);

//     return teachers
//         .filter(t => {
//             const teacherGrades = t.role?.preferredgrades || [];
//             // 🚀 FIX: Use an exact match check instead of .includes() 
//             // to prevent "primary" from matching "pre-primary"
//             return teacherGrades.some(grade => grade.toLowerCase() === requiredCategory);
//         })
//         .map(t => ({ 
//             value: `${t._id},${t.firstname} ${t.middlename} ${t.lastname}`, 
//             label: `${t.firstname} ${t.middlename} ${t.lastname}` 
//         }));
// };
//     const resetFormState = () => {
//         setSelectedStd("");
//         setIsEditMode(false);
//         setAllotmentRows([{ id: Date.now(), subject: '', teacherOptions: [{ id: Date.now() + 1, teacher: null }] }]);
//         setAvailableSubjectsForStd([]);
//         setShowModal(false);
//     };

//     const handleAddSubjectRow = () => {
//         setAllotmentRows([...allotmentRows, { id: Date.now(), subject: '', teacherOptions: [{ id: Date.now() + 1, teacher: null }] }]);
//     };

//     const handleRemoveSubjectRow = (rowId) => {
//         if (allotmentRows.length > 1) {
//             setAllotmentRows(allotmentRows.filter(r => r.id !== rowId));
//         }
//     };

//     const handleAddTeacherToRow = (rowId) => {
//         setAllotmentRows(allotmentRows.map(row => 
//             row.id === rowId ? { ...row, teacherOptions: [...row.teacherOptions, { id: Date.now(), teacher: null }] } : row
//         ));
//     };

//     const handleRemoveTeacherFromRow = (rowId, teacherId) => {
//         setAllotmentRows(allotmentRows.map(row => {
//             if (row.id === rowId && row.teacherOptions.length > 1) {
//                 return { ...row, teacherOptions: row.teacherOptions.filter(t => t.id !== teacherId) };
//             }
//             return row;
//         }));
//     };

//     const handleTeacherChange = (rowId, teacherId, value) => {
//         const teacher = teachers.find(t => `${t._id},${t.firstname} ${t.middlename} ${t.lastname}` === value);
//         setAllotmentRows(allotmentRows.map(row => 
//             row.id === rowId ? {
//                 ...row,
//                 teacherOptions: row.teacherOptions.map(tOpt => tOpt.id === teacherId ? { ...tOpt, teacher: { value, label: `${teacher.firstname} ${teacher.lastname}` } } : tOpt)
//             } : row
//         ));
//     };

//     const tableGroups = useMemo(() => {
//         const stdGroups = {};
//         subjectData.forEach(item => {
//             const std = item.standards[0];
//             const sub = item.subjects[0];
//             if (!stdGroups[std]) stdGroups[std] = { name: std, subjects: {}, totalRows: 0, allIds: [] };
            
//             if (!stdGroups[std].subjects[sub]) {
//                 stdGroups[std].subjects[sub] = { name: sub, teachers: [], rawData: [] };
//                 stdGroups[std].totalRows += 1;
//             }
//             if (!stdGroups[std].subjects[sub].teachers.includes(item.teacherName)) {
//                 stdGroups[std].subjects[sub].teachers.push(item.teacherName);
//                 stdGroups[std].subjects[sub].rawData.push(item);
//             }
//             stdGroups[std].allIds.push(item._id);
//         });

//         return Object.values(stdGroups).filter(group => 
//             filterStd === "" || group.name === filterStd
//         );
//     }, [subjectData, filterStd]);

//     const handleSave = async (e) => {
//         e.preventDefault();
//         const config = { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } };
//         const displayStd = selectedStd + (isNaN(selectedStd) ? "" : " std");

//         // 🚀 NEW CONDITION: Prevent allotting to an existing standard in "Add" mode
//         if (!isEditMode) {
//             const alreadyExists = subjectData.some(item => item.standards[0] === selectedStd);
//             if (alreadyExists) {
//                 alert(`Subjects are already allotted for ${displayStd}. Please edit the existing entry.`);
//                 return;
//             }
//         }

//         try {
//             if (isEditMode) {
//                 const group = tableGroups.find(g => g.name === selectedStd);
//                 if (group) {
//                     await Promise.all(group.allIds.map(id => axios.delete(`${API_BASE_URL}api/allotments/${id}`, config)));
//                 }
//             }

//             for (const row of allotmentRows) {
//                 const selectedTeachers = row.teacherOptions.filter(t => t.teacher !== null);
//                 for (const tOpt of selectedTeachers) {
//                     const payload = {
//                         teacher: tOpt.teacher.value.split(',')[0],
//                         teacherName: tOpt.teacher.label,
//                         subjects: [row.subject],
//                         standards: [selectedStd],
//                         divisions: DIVISION_OPTIONS,
//                     };
//                     await axios.post(`${API_BASE_URL}api/allot-subject`, payload, config);
//                 }
//             }
            
//             alert(isEditMode ? `subjects successfully updated for ${displayStd}` : `subjects successfully alloted for ${displayStd}`);
//             resetFormState(); 
//             fetchAllData();
//         } catch (error) { 
//             alert("Error saving allotment."); 
//         }
//     };

//     const handleEdit = (group) => {
//         setIsEditMode(true);
//         setSelectedStd(group.name);
//         const rows = Object.values(group.subjects).map(sub => ({
//             id: Date.now() + Math.random(),
//             subject: sub.name,
//             teacherOptions: sub.rawData.map(rd => ({
//                 id: Date.now() + Math.random(),
//                 teacher: { value: `${rd.teacher},${rd.teacherName}`, label: rd.teacherName }
//             }))
//         }));
//         setAllotmentRows(rows);
//         setShowModal(true);
//     };

//     const handleDeleteGroup = async (groupName, ids) => {
//         const displayStd = groupName + (isNaN(groupName) ? "" : " std");
//         if (window.confirm(`Are you sure you want to delete all allotments for ${displayStd}?`)) {
//             const config = { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } };
//             try {
//                 await Promise.all(ids.map(id => axios.delete(`${API_BASE_URL}api/allotments/${id}`, config)));
//                 alert(`subjects successfully deleted for ${displayStd}`);
//                 fetchAllData();
//             } catch (err) { 
//                 alert("Delete failed."); 
//             }
//         }
//     };

//     const ModalJSX = showModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(50, 50, 50, 0.5)' }}>
//             <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg overflow-y-auto max-h-[90vh]">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-semibold">{isEditMode ? 'Edit Subject Allotment' : 'Add Subject Allotment'}</h2>
//                     <button onClick={resetFormState} className="text-gray-500 text-2xl">&times;</button>
//                 </div>
//                 <form onSubmit={handleSave}>
//                     <label className="block text-sm font-medium mb-1">Standard *</label>
//                     <select disabled={isEditMode} required value={selectedStd} onChange={(e) => setSelectedStd(e.target.value)} className="w-full p-2 border rounded-md mb-4 bg-gray-50">
//                         <option value="" disabled>Select Standard</option>
//                         {STANDARD_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
//                     </select>

//                     {allotmentRows.map((row) => (
//                         <div key={row.id} className="border p-3 rounded-md mb-4 bg-gray-50 relative">
//                             <button type="button" onClick={() => handleRemoveSubjectRow(row.id)} className="absolute top-1 right-2 text-red-500 font-bold text-lg">&times;</button>
//                             <label className="block text-xs font-bold mb-1">Subject / Sub-Subject</label>
//                             <select required value={row.subject} onChange={(e) => setAllotmentRows(allotmentRows.map(r => r.id === row.id ? { ...r, subject: e.target.value } : r))} className="w-full p-2 border rounded-md mb-2">
//                                 <option value="" disabled>Select</option>
//                                 {availableSubjectsForStd
//                                     .filter(s => s === row.subject || !allotmentRows.some(ar => ar.subject === s))
//                                     .map(s => <option key={s} value={s}>{s}</option>)
//                                 }
//                             </select>

//                             <label className="block text-xs font-bold mb-1">Teachers</label>
//                             {row.teacherOptions.map((tOpt) => (
//                                 <div key={tOpt.id} className="flex items-center gap-2 mb-2">
//                                     <select required value={tOpt.teacher?.value || ''} onChange={(e) => handleTeacherChange(row.id, tOpt.id, e.target.value)} className="w-full p-2 border rounded-md text-sm">
//                                         <option value="" disabled>Select Teacher</option>
//                                         {getFilteredTeacherOptions(selectedStd).map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
//                                     </select>
//                                     <button type="button" onClick={() => handleAddTeacherToRow(row.id)} className="text-blue-600 font-bold text-xl">+</button>
//                                     {row.teacherOptions.length > 1 && (
//                                         <button type="button" onClick={() => handleRemoveTeacherFromRow(row.id, tOpt.id)} className="text-red-500 font-bold text-xl">−</button>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
//                     ))}

//                     <div className="flex justify-between mt-4">
//                         <button type="button" onClick={handleAddSubjectRow} className="text-blue-600 font-semibold text-sm">+ Add More Subject</button>
//                         <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md">Save</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );

//     return (
//         <MainLayout>
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
//                 <div className="flex flex-1 flex-col p-4 sm:p-6">
//                     <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
//                         <div className="flex flex-wrap items-center gap-4">
//                             <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="w-full sm:w-64 px-3 py-2 rounded-md border border-gray-300 text-sm shadow-sm" />
//                             <select value={filterStd} onChange={(e) => setFilterStd(e.target.value)} className="px-3 py-2 rounded-md border border-gray-300 text-sm shadow-sm">
//                                 <option value="">All Standards</option>
//                                 {STANDARD_OPTIONS.map(std => <option key={std} value={std}>{std}</option>)}
//                             </select>
//                         </div>
//                         <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition-colors">Add</button>
//                     </div>
                    
//                     <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Subject Allotment</h2>
                    
//                     <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-300">
//                         <table className="min-w-full border-collapse text-center">
//                             <thead className="bg-blue-100 text-gray-700 font-bold">
//                                 <tr>
//                                     <th className="px-6 py-4 border border-gray-300 uppercase tracking-wider">Standard</th>
//                                     <th className="px-6 py-4 border border-gray-300 uppercase tracking-wider">Subjects</th>
//                                     <th className="px-6 py-4 border border-gray-300 uppercase tracking-wider">Teacher</th>
//                                     <th className="px-6 py-4 border border-gray-300 uppercase tracking-wider">Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white">
//                                 {isLoading ? (
//                                     <tr><td colSpan="4" className="py-10 text-gray-500 italic">Loading allotments...</td></tr>
//                                 ) : tableGroups.length === 0 ? (
//                                     <tr><td colSpan="4" className="py-10 text-gray-500 italic">No matching records found.</td></tr>
//                                 ) : tableGroups.map((group) => {
//                                     const subjectEntries = Object.values(group.subjects);
//                                     return subjectEntries.map((subject, subIdx) => (
//                                         <tr key={`${group.name}-${subject.name}`} className="hover:bg-gray-50 transition-colors">
//                                             {subIdx === 0 && (
//                                                 <td className="px-6 py-4 border border-gray-300 font-bold text-lg text-gray-800 bg-gray-50" rowSpan={group.totalRows}>
//                                                     {group.name}
//                                                 </td>
//                                             )}
//                                             <td className="px-6 py-4 border border-gray-300 font-medium text-gray-700">{subject.name}</td>
//                                             <td className="px-6 py-4 border border-gray-300 text-sm text-gray-600 text-left">
//                                                 <div className="flex flex-wrap gap-1">
//                                                     {subject.teachers.map((t, tIdx) => (
//                                                         <span key={tIdx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-100">
//                                                             {t}
//                                                         </span>
//                                                     ))}
//                                                 </div>
//                                             </td>
//                                             {subIdx === 0 && (
//                                                 <td className="px-6 py-4 border border-gray-300 bg-gray-50" rowSpan={group.totalRows}>
//                                                     <div className="flex flex-col items-center gap-3">
//                                                         <button onClick={() => handleEdit(group)} className="text-blue-600 font-semibold hover:underline">Edit</button>
//                                                         <button onClick={() => handleDeleteGroup(group.name, group.allIds)} className="text-red-600 font-semibold hover:underline">Delete</button>
//                                                     </div>
//                                                 </td>
//                                             )}
//                                         </tr>
//                                     ));
//                                 })}
//                             </tbody>
//                         </table>
//                     </div>
//                     {ModalJSX} 
//                 </div>
//             </div>
//         </MainLayout>
//     );
// }
import React, { useEffect, useState, useMemo, useCallback } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { API_BASE_URL } from "../config";

const STANDARD_OPTIONS = ["Nursery", "Junior", "Senior", ...Array.from({ length: 10 }, (_, i) => String(i + 1))];
const DIVISION_OPTIONS = ["A", "B", "C", "D", "E"];

export default function AcademicSubject() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStd, setFilterStd] = useState(""); 
    const [subjectData, setSubjectData] = useState([]); 
    const [teachers, setTeachers] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    // 🚀 FIXED: Declared allSubjectConfigs state to store master definitions
    const [allSubjectConfigs, setAllSubjectConfigs] = useState([]);
    const [selectedStd, setSelectedStd] = useState("");
    const [allotmentRows, setAllotmentRows] = useState([
        { id: Date.now(), subject: '', teacherOptions: [{ id: Date.now() + 1, teacher: null }] }
    ]);
    const [availableSubjectsForStd, setAvailableSubjectsForStd] = useState([]);

    const fetchAllData = useCallback(async () => {
        setIsLoading(true);
        const config = { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } };
        try {
            // 🚀 FIXED: Added API call to fetch master subject configurations
            const [allotRes, staffRes, configRes] = await Promise.all([
                axios.get(`${API_BASE_URL}api/allotments`, config),
                axios.get(`${API_BASE_URL}api/staff`, config),
                axios.get(`${API_BASE_URL}api/subjects`, config) 
            ]);
            setSubjectData(Array.isArray(allotRes.data) ? allotRes.data : []);
            setTeachers(staffRes.data);
            setAllSubjectConfigs(configRes.data); 
        } catch (error) {
            console.error("Error fetching data:", error);
            setSubjectData([]); 
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchAllData(); }, [fetchAllData]);

    useEffect(() => {
        const fetchConfiguredSubjects = async () => {
            if (!selectedStd) return;
            try {
                const res = await axios.get(`${API_BASE_URL}api/subjects/${selectedStd}`, {
                    headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" }
                });
                const config = res.data.subjects?.[0];
                
                if (config && config.subjects) {
                    const flattenedSubjects = [];
                    config.subjects.forEach(sub => {
                        if (sub.subSubjects && sub.subSubjects.length > 0) {
                            flattenedSubjects.push(...sub.subSubjects);
                        } else {
                            flattenedSubjects.push(sub.name);
                        }
                    });
                    setAvailableSubjectsForStd(flattenedSubjects);
                } else {
                    setAvailableSubjectsForStd([]);
                }
            } catch (err) {
                setAvailableSubjectsForStd([]);
            }
        };
        fetchConfiguredSubjects();
    }, [selectedStd]);

    const getFilteredTeacherOptions = (std) => {
        const getCategory = (s) => {
            if (["Nursery", "Junior", "Senior"].includes(s)) return "pre-primary";
            if (["1", "2", "3", "4", "5"].includes(s)) return "primary";
            if (["6", "7", "8", "9", "10"].includes(s)) return "secondary";
            return "";
        };

        const requiredCategory = getCategory(std);

        return teachers
            .filter(t => {
                const teacherGrades = t.role?.preferredgrades || [];
                return teacherGrades.some(grade => grade.toLowerCase() === requiredCategory);
            })
            .map(t => ({ 
                value: `${t._id},${t.firstname} ${t.middlename} ${t.lastname}`, 
                label: `${t.firstname} ${t.middlename} ${t.lastname}` 
            }));
    };

    const resetFormState = () => {
        setSelectedStd("");
        setIsEditMode(false);
        setAllotmentRows([{ id: Date.now(), subject: '', teacherOptions: [{ id: Date.now() + 1, teacher: null }] }]);
        setAvailableSubjectsForStd([]);
        setShowModal(false);
    };

    const handleAddSubjectRow = () => {
        setAllotmentRows([...allotmentRows, { id: Date.now(), subject: '', teacherOptions: [{ id: Date.now() + 1, teacher: null }] }]);
    };

    const handleRemoveSubjectRow = (rowId) => {
        if (allotmentRows.length > 1) {
            setAllotmentRows(allotmentRows.filter(r => r.id !== rowId));
        }
    };

    const handleAddTeacherToRow = (rowId) => {
        setAllotmentRows(allotmentRows.map(row => 
            row.id === rowId ? { ...row, teacherOptions: [...row.teacherOptions, { id: Date.now(), teacher: null }] } : row
        ));
    };

    const handleRemoveTeacherFromRow = (rowId, teacherId) => {
        setAllotmentRows(allotmentRows.map(row => {
            if (row.id === rowId && row.teacherOptions.length > 1) {
                return { ...row, teacherOptions: row.teacherOptions.filter(t => t.id !== teacherId) };
            }
            return row;
        }));
    };

    const handleTeacherChange = (rowId, teacherId, value) => {
        const teacher = teachers.find(t => `${t._id},${t.firstname} ${t.middlename} ${t.lastname}` === value);
        if (teacher) {
            setAllotmentRows(allotmentRows.map(row => 
                row.id === rowId ? {
                    ...row,
                    teacherOptions: row.teacherOptions.map(tOpt => tOpt.id === teacherId ? { ...tOpt, teacher: { value, label: `${teacher.firstname} ${teacher.lastname}` } } : tOpt)
                } : row
            ));
        }
    };

    const tableGroups = useMemo(() => {
        const stdGroups = {};
        
        subjectData.forEach(item => {
            const std = item.standards[0];
            let subDisplayName = item.subjects[0]; // Start with the raw name (e.g., Mensuration)
            
            // 🚀 Ensure we have config data to perform the lookup
            if (allSubjectConfigs && allSubjectConfigs.length > 0) {
                const stdConfig = allSubjectConfigs.find(c => c.standard === std);
                
                if (stdConfig && stdConfig.subjects) {
                    // Find if this allotted subject is a sub-subject of a parent
                    const parentSubject = stdConfig.subjects.find(s => 
                        s.subSubjects && s.subSubjects.includes(subDisplayName)
                    );
                    
                    if (parentSubject) {
                        // Apply the requested format
                        subDisplayName = `${parentSubject.name}(${subDisplayName})`; 
                    }
                }
            }

            if (!stdGroups[std]) stdGroups[std] = { name: std, subjects: {}, totalRows: 0, allIds: [] };
            
            // Use the formatted subDisplayName as the key
            if (!stdGroups[std].subjects[subDisplayName]) {
                stdGroups[std].subjects[subDisplayName] = { name: subDisplayName, teachers: [], rawData: [] };
                stdGroups[std].totalRows += 1;
            }
            
            if (!stdGroups[std].subjects[subDisplayName].teachers.includes(item.teacherName)) {
                stdGroups[std].subjects[subDisplayName].teachers.push(item.teacherName);
                stdGroups[std].subjects[subDisplayName].rawData.push(item);
            }
            stdGroups[std].allIds.push(item._id);
        });

        return Object.values(stdGroups).filter(group => 
            filterStd === "" || group.name === filterStd
        );
    }, [subjectData, filterStd, allSubjectConfigs]); // allSubjectConfigs must be a dependency

    const handleSave = async (e) => {
        e.preventDefault();
        const config = { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } };
        const displayStd = selectedStd + (isNaN(selectedStd) ? "" : " std");

        if (!isEditMode) {
            const alreadyExists = subjectData.some(item => item.standards[0] === selectedStd);
            if (alreadyExists) {
                alert(`Subjects are already allotted for ${displayStd}. Please edit the existing entry.`);
                return;
            }
        }

        try {
            if (isEditMode) {
                const group = tableGroups.find(g => g.name === selectedStd);
                if (group) {
                    await Promise.all(group.allIds.map(id => axios.delete(`${API_BASE_URL}api/allotments/${id}`, config)));
                }
            }

            for (const row of allotmentRows) {
                const selectedTeachers = row.teacherOptions.filter(t => t.teacher !== null);
                for (const tOpt of selectedTeachers) {
                    const payload = {
                        teacher: tOpt.teacher.value.split(',')[0],
                        teacherName: tOpt.teacher.label,
                        subjects: [row.subject],
                        standards: [selectedStd],
                        divisions: DIVISION_OPTIONS,
                    };
                    await axios.post(`${API_BASE_URL}api/allot-subject`, payload, config);
                }
            }
            
            alert(isEditMode ? `subjects successfully updated for ${displayStd}` : `subjects successfully alloted for ${displayStd}`);
            resetFormState(); 
            fetchAllData();
        } catch (error) { 
            alert("Error saving allotment."); 
        }
    };

    const handleEdit = (group) => {
        setIsEditMode(true);
        setSelectedStd(group.name);
        const rows = Object.values(group.subjects).map(sub => ({
            id: Date.now() + Math.random(),
            subject: sub.name,
            teacherOptions: sub.rawData.map(rd => ({
                id: Date.now() + Math.random(),
                teacher: { value: `${rd.teacher},${rd.teacherName}`, label: rd.teacherName }
            }))
        }));
        setAllotmentRows(rows);
        setShowModal(true);
    };

    const handleDeleteGroup = async (groupName, ids) => {
        const displayStd = groupName + (isNaN(groupName) ? "" : " std");
        if (window.confirm(`Are you sure you want to delete all allotments for ${displayStd}?`)) {
            const config = { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } };
            try {
                await Promise.all(ids.map(id => axios.delete(`${API_BASE_URL}api/allotments/${id}`, config)));
                alert(`subjects successfully deleted for ${displayStd}`);
                fetchAllData();
            } catch (err) { 
                alert("Delete failed."); 
            }
        }
    };

    const ModalJSX = showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(50, 50, 50, 0.5)' }}>
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{isEditMode ? 'Edit Subject Allotment' : 'Add Subject Allotment'}</h2>
                    <button onClick={resetFormState} className="text-gray-500 text-2xl">&times;</button>
                </div>
                <form onSubmit={handleSave}>
                    <label className="block text-sm font-medium mb-1">Standard *</label>
                    <select disabled={isEditMode} required value={selectedStd} onChange={(e) => setSelectedStd(e.target.value)} className="w-full p-2 border rounded-md mb-4 bg-gray-50">
                        <option value="" disabled>Select Standard</option>
                        {STANDARD_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>

                    {allotmentRows.map((row) => (
                        <div key={row.id} className="border p-3 rounded-md mb-4 bg-gray-50 relative">
                            <button type="button" onClick={() => handleRemoveSubjectRow(row.id)} className="absolute top-1 right-2 text-red-500 font-bold text-lg">&times;</button>
                            <label className="block text-xs font-bold mb-1">Subject / Sub-Subject</label>
                            <select required value={row.subject} onChange={(e) => setAllotmentRows(allotmentRows.map(r => r.id === row.id ? { ...r, subject: e.target.value } : r))} className="w-full p-2 border rounded-md mb-2">
                                <option value="" disabled>Select</option>
                                {availableSubjectsForStd
                                    .filter(s => s === row.subject || !allotmentRows.some(ar => ar.subject === s))
                                    .map(s => <option key={s} value={s}>{s}</option>)
                                }
                            </select>

                            <label className="block text-xs font-bold mb-1">Teachers</label>
                            {row.teacherOptions.map((tOpt) => (
                                <div key={tOpt.id} className="flex items-center gap-2 mb-2">
                                    <select required value={tOpt.teacher?.value || ''} onChange={(e) => handleTeacherChange(row.id, tOpt.id, e.target.value)} className="w-full p-2 border rounded-md text-sm">
                                        <option value="" disabled>Select Teacher</option>
                                        {getFilteredTeacherOptions(selectedStd).map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                                    </select>
                                    <button type="button" onClick={() => handleAddTeacherToRow(row.id)} className="text-blue-600 font-bold text-xl">+</button>
                                    {row.teacherOptions.length > 1 && (
                                        <button type="button" onClick={() => handleRemoveTeacherFromRow(row.id, tOpt.id)} className="text-red-500 font-bold text-xl">−</button>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}

                    <div className="flex justify-between mt-4">
                        <button type="button" onClick={handleAddSubjectRow} className="text-blue-600 font-semibold text-sm">+ Add More Subject</button>
                        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <MainLayout>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex flex-1 flex-col p-4 sm:p-6">
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-4">
                            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="w-full sm:w-64 px-3 py-2 rounded-md border border-gray-300 text-sm shadow-sm" />
                            <select value={filterStd} onChange={(e) => setFilterStd(e.target.value)} className="px-3 py-2 rounded-md border border-gray-300 text-sm shadow-sm">
                                <option value="">All Standards</option>
                                {STANDARD_OPTIONS.map(std => <option key={std} value={std}>{std}</option>)}
                            </select>
                        </div>
                        <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition-colors">Add</button>
                    </div>
                    
                    <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Subject Allotment</h2>
                    
                    <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-300">
                        <table className="min-w-full border-collapse text-center">
                            <thead className="bg-blue-100 text-gray-700 font-bold">
                                <tr>
                                    <th className="px-6 py-4 border border-gray-300 uppercase tracking-wider">Standard</th>
                                    <th className="px-6 py-4 border border-gray-300 uppercase tracking-wider">Subjects</th>
                                    <th className="px-6 py-4 border border-gray-300 uppercase tracking-wider">Teacher</th>
                                    <th className="px-6 py-4 border border-gray-300 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {isLoading ? (
                                    <tr><td colSpan="4" className="py-10 text-gray-500 italic">Loading allotments...</td></tr>
                                ) : tableGroups.length === 0 ? (
                                    <tr><td colSpan="4" className="py-10 text-gray-500 italic">No matching records found.</td></tr>
                                ) : tableGroups.map((group) => {
                                    const subjectEntries = Object.values(group.subjects);
                                    return subjectEntries.map((subject, subIdx) => (
                                        <tr key={`${group.name}-${subject.name}`} className="hover:bg-gray-50 transition-colors">
                                            {subIdx === 0 && (
                                                <td className="px-6 py-4 border border-gray-300 font-bold text-lg text-gray-800 bg-gray-50" rowSpan={group.totalRows}>
                                                    {group.name}
                                                </td>
                                            )}
                                            <td className="px-6 py-4 border border-gray-300 font-medium text-gray-700">{subject.name}</td>
                                            <td className="px-6 py-4 border border-gray-300 text-sm text-gray-600 text-left">
                                                <div className="flex flex-wrap gap-1">
                                                    {subject.teachers.map((t, tIdx) => (
                                                        <span key={tIdx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-100">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            {subIdx === 0 && (
                                                <td className="px-6 py-4 border border-gray-300 bg-gray-50" rowSpan={group.totalRows}>
                                                    <div className="flex flex-col items-center gap-3">
                                                        <button onClick={() => handleEdit(group)} className="text-blue-600 font-semibold hover:underline">Edit</button>
                                                        <button onClick={() => handleDeleteGroup(group.name, group.allIds)} className="text-red-600 font-semibold hover:underline">Delete</button>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ));
                                })}
                            </tbody>
                        </table>
                    </div>
                    {ModalJSX} 
                </div>
            </div>
        </MainLayout>
    );
}