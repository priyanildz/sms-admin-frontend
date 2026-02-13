// import React, { useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useEffect } from "react";
// import axios from "axios";

// const ClassTestResults = () => {
//   const navigate = useNavigate();

//   const [selectedStd, setSelectedStd] = useState("");
//   const [allTests, setAllTests] = useState([]); // for filtering
//   const [selectedDiv, setSelectedDiv] = useState("");
//   const [term, setTerm] = useState("");
//   const [startDate, setStartDate] = useState(null);
//   // const [endDate, setEndDate] = useState(null);

//   const stdOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
//   const divOptions = ["A", "B", "C"];
//   const [tests, setTests] = useState([]);

//   useEffect(() => {
//     const getTests = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/term-results",
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         console.log(response.data);
//         if (response.status === 200) {
//           setAllTests(response.data);
//           setTests(response.data);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     getTests();
//   }, []);
//   const handleSubmit = () => {
//     console.log("Submitted:", {
//       selectedStd,
//       selectedDiv,
//       term,
//       startDate,
//       // endDate,
//     });

//     let filtered = [...allTests];

//     if (selectedStd) {
//       filtered = filtered.filter((test) => test.standard === selectedStd);
//     }

//     if (selectedDiv) {
//       filtered = filtered.filter((test) => test.division === selectedDiv);
//     }

//     if (term) {
//       filtered = filtered.filter((test) =>
//         test.subject.toLowerCase().includes(term.toLowerCase())
//       );
//     }

//     if (startDate) {
//       filtered = filtered.filter((test) => new Date(test.date) >= startDate);
//     }

//     // if (endDate) {
//     //   filtered = filtered.filter((test) => new Date(test.date) <= endDate);
//     // }

//     setTests(filtered);
//   };

//   const handleViewTest = (test) => {
//     navigate(`/classes-test-result-details/${test._id}`);
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   return (
//     <MainLayout>
//       <div className="p-4 sm:p-6">
//         <div className="bg-white rounded-2xl shadow-md p-6 space-y-8">
//           {/* Filters Section */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-gray-600 mb-1">
//                 Standard
//               </label>
//               <select
//                 value={selectedStd}
//                 onChange={(e) => setSelectedStd(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//               >
//                 <option value="">Select</option>
//                 {stdOptions.map((std) => (
//                   <option key={std} value={std}>
//                     {std}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-gray-600 mb-1">
//                 Division
//               </label>
//               <select
//                 value={selectedDiv}
//                 onChange={(e) => setSelectedDiv(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//               >
//                 <option value="">Select</option>
//                 {divOptions.map((div) => (
//                   <option key={div} value={div}>
//                     {div}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-gray-600 mb-1">
//                 Subject
//               </label>
//               <input
//                 type="text"
//                 value={term}
//                 onChange={(e) => setTerm(e.target.value)}
//                 placeholder="Enter Subject"
//                 className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-gray-600 mb-1">
//                 From
//               </label>
//               <DatePicker
//                 selected={startDate}
//                 onChange={(date) => setStartDate(date)}
//                 className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 dateFormat="yyyy-MM-dd"
//                 placeholderText="Start Date"
//               />
//             </div>

//             {/* <div className="flex flex-col">
//               <label className="text-sm font-semibold text-gray-600 mb-1">
//                 To
//               </label>
//               <DatePicker
//                 selected={endDate}
//                 onChange={(date) => setEndDate(date)}
//                 className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 dateFormat="yyyy-MM-dd"
//                 placeholderText="End Date"
//               />
//             </div> */}

//             <div className="flex items-end">
//               <button
//                 onClick={handleSubmit}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow-md transition-all"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>

//           {/* Tests Record Table */}
//           <div>
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">
//               Tests Record
//             </h2>
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-white overflow-hidden text-left">
//                 <thead>
//                   <tr className="bg-blue-100 text-gray-700 text-sm">
//                     <th className="py-2 px-4 border">Date</th>
//                     <th className="py-2 px-4 border">Subject</th>
//                     <th className="py-2 px-4 border">Topic Name</th>
//                     <th className="py-2 px-4 border">Total Marks</th>
//                     <th className="py-2 px-4 border">
//                       No. of Students Appeared
//                     </th>
//                     <th className="py-2 px-4 border">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {tests.map((test, index) => (
//                     <tr key={index} className="text-gray-700 text-left">
//                       <td className="py-2 px-4 border">
//                         {formatDate(test.date)}
//                       </td>
//                       <td className="py-2 px-4 border">{test.subject}</td>
//                       <td className="py-2 px-4 border">{test.topic}</td>
//                       <td className="py-2 px-4 border">{test.totalmarks}</td>
//                       <td className="py-2 px-4 border">
//                         {test.studentsAppeared}
//                       </td>
//                       <td className="py-2 px-4 border">
//                         <button
//                           onClick={() => handleViewTest(test)}
//                           className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
//                         >
//                           View
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default ClassTestResults;



// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// const ClassTestResults = () => {
//   const navigate = useNavigate();

//   const [selectedStd, setSelectedStd] = useState("");
//   const [allTests, setAllTests] = useState([]); // for filtering
//   const [selectedDiv, setSelectedDiv] = useState("");
//   
//   // UI/Logic Change 1: Replaced 'term' (subject input) with 'selectedTerm' (dropdown)
//   const [selectedTerm, setSelectedTerm] = useState(""); 
//   
//   // UI/Logic Change 2: Used two states for date range filtering
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null); 

//   const stdOptions = ["Nursery", "Junior", "Senior","1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
//   const divOptions = ["A", "B", "C", "D", "E"];
//   const termOptions = ["Term 1", "Term 2", "Final"]; // Added mock options for Term
//   const [tests, setTests] = useState([]);

//   useEffect(() => {
//     const getTests = async () => {
//       try {
//         // FIX: Using imported API_BASE_URL
//         const response = await axios.get(
//           `${API_BASE_URL}api/term-results`,
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         console.log(response.data);
//         if (response.status === 200) {
//           setAllTests(response.data);
//           setTests(response.data);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     getTests();
//   }, []);
//     
//   // Logic Change 3: Updated handleSubmit to use new filters
//   const handleSubmit = () => {
//     console.log("Submitted:", {
//       selectedStd,
//       selectedDiv,
//       selectedTerm,
//       startDate,
//       endDate,
//     });

//     let filtered = [...allTests];

//     if (selectedStd) {
//       filtered = filtered.filter((test) => test.standard === selectedStd);
//     }

//     if (selectedDiv) {
//       filtered = filtered.filter((test) => test.division === selectedDiv);
//     }

//     // Filter by Term (using test.title as a proxy for term, as schema doesn't have a 'term' field)
//     if (selectedTerm) {
//       filtered = filtered.filter((test) =>
//         test.title && test.title.toLowerCase().includes(selectedTerm.toLowerCase())
//       );
//     }

//     // Filter by Date Range (From Date)
//     if (startDate) {
//       filtered = filtered.filter((test) => new Date(test.date) >= startDate);
//     }
//     
//     // Filter by Date Range (To Date)
//     if (endDate) {
//       // Ensure the filter checks up to the end of the selected day
//       filtered = filtered.filter((test) => new Date(test.date) <= endDate);
//     }

//     setTests(filtered);
//   };

//   const handleViewTest = (test) => {
//     // FIX: Updated path to match the route defined in App.jsx
//     navigate(`/classes-test-result-details/${test._id}`);
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   return (
//     <MainLayout>
//       <div className="p-4 sm:p-6">
//         <div className="bg-white rounded-2xl shadow-md p-6 space-y-8">
//           {/* Filters Section */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-gray-600 mb-1">
//                 Standard
//               </label>
//               <select
//                 value={selectedStd}
//                 onChange={(e) => setSelectedStd(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//               >
//                 <option value="">Select</option>
//                 {stdOptions.map((std) => (
//                   <option key={std} value={std}>
//                     {std}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-gray-600 mb-1">
//                 Division
//               </label>
//               <select
//                 value={selectedDiv}
//                 onChange={(e) => setSelectedDiv(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//               >
//                 <option value="">Select</option>
//                 {divOptions.map((div) => (
//                   <option key={div} value={div}>
//                     {div}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* UI Filter Change 1: Added Term Select (Replaces Subject Input) */}
//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-gray-600 mb-1">
//                 Term
//               </label>
//               <select
//                 value={selectedTerm}
//                 onChange={(e) => setSelectedTerm(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//               >
//                 <option value="">Select</option>
//                 {termOptions.map((term) => (
//                   <option key={term} value={term}>
//                     {term}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             
//             {/* UI Filter Change 2: Replaced old Subject/Term input with From Date picker */}
//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-gray-600 mb-1">
//                 From Date
//               </label>
//               <DatePicker
//                 selected={startDate}
//                 onChange={(date) => setStartDate(date)}
//                 className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 dateFormat="yyyy-MM-dd"
//                 placeholderText="Start Date"
//               />
//             </div>
//             
//             {/* UI Filter Change 3: Added To Date Picker */}
//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-gray-600 mb-1">
//                 To Date
//               </label>
//               <DatePicker
//                 selected={endDate}
//                 onChange={(date) => setEndDate(date)}
//                 className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 dateFormat="yyyy-MM-dd"
//                 placeholderText="End Date"
//               />
//             </div>
//             
//             <div className="flex items-end">
//               <button
//                 onClick={handleSubmit}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow-md transition-all"
//               >
//                 Submit
//               </button>
//             </div>
//             
//              {/* Retained placeholder columns to maintain the grid structure */}
//             <div className="hidden md:block"></div> 
//             <div className="hidden md:block"></div> 
//             <div className="hidden md:block"></div> 

//           </div>

//           {/* Tests Record Table */}
//           <div>
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">
//               Tests Record
//             </h2>
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-white overflow-hidden text-left">
//                 <thead>
//                   <tr className="bg-blue-100 text-gray-700 text-sm">
//                     <th className="py-2 px-4 border">Date</th>
//                     <th className="py-2 px-4 border">Subject</th>
//                     <th className="py-2 px-4 border">Topic Name</th>
//                     <th className="py-2 px-4 border">Total Marks</th>
//                     <th className="py-2 px-4 border">
//                       No. of Students Appeared
//                     </th>
//                     <th className="py-2 px-4 border">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {tests.map((test, index) => (
//                     <tr key={index} className="text-gray-700 text-left">
//                       <td className="py-2 px-4 border">
//                         {formatDate(test.date)}
//                       </td>
//                       <td className="py-2 px-4 border">{test.subject}</td>
//                       <td className="py-2 px-4 border">{test.topic}</td>
//                       <td className="py-2 px-4 border">{test.totalmarks}</td>
//                       <td className="py-2 px-4 border">
//                         {test.studentsAppeared}
//                       </td>
//                       <td className="py-2 px-4 border">
//                         <button
//                           onClick={() => handleViewTest(test)}
//                           className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
//                         >
//                           View
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default ClassTestResults;

// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// const ClassTestResults = () => {
//   const navigate = useNavigate();

//   const [selectedStd, setSelectedStd] = useState("");
//   const [allTests, setAllTests] = useState([]); // for filtering
//   const [selectedDiv, setSelectedDiv] = useState("");
  
//   // UI/Logic Change 1: Replaced 'term' (subject input) with 'selectedTerm' (dropdown)
//   const [selectedTerm, setSelectedTerm] = useState(""); 
  
//   // UI/Logic Change 2: Used two states for date range filtering
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null); 

//   const stdOptions = ["Nursery", "Junior", "Senior","1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
//   const divOptions = ["A", "B", "C", "D", "E"];
//   const termOptions = ["Term 1", "Term 2", "Final"]; // Added mock options for Term
//   const [tests, setTests] = useState([]);

//   useEffect(() => {
//     const getTests = async () => {
//       try {
//         // FIX: Using imported API_BASE_URL
//         const response = await axios.get(
//           `${API_BASE_URL}api/term-results`,
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         console.log(response.data);
//         if (response.status === 200) {
//           setAllTests(response.data);
//           setTests(response.data);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     getTests();
//   }, []);
    
//   // Logic Change 3: Updated handleSubmit to use new filters
//   const handleSubmit = () => {
//     console.log("Submitted:", {
//       selectedStd,
//       selectedDiv,
//       selectedTerm,
//       startDate,
//       endDate,
//     });

//     let filtered = [...allTests];

//     if (selectedStd) {
//       filtered = filtered.filter((test) => test.standard === selectedStd);
//     }

//     if (selectedDiv) {
//       filtered = filtered.filter((test) => test.division === selectedDiv);
//     }

//     // Filter by Term (using test.title as a proxy for term, as schema doesn't have a 'term' field)
//     if (selectedTerm) {
//       filtered = filtered.filter((test) =>
//         test.title && test.title.toLowerCase().includes(selectedTerm.toLowerCase())
//       );
//     }

//     // Filter by Date Range (From Date)
//     if (startDate) {
//       filtered = filtered.filter((test) => new Date(test.date) >= startDate);
//     }
    
//     // Filter by Date Range (To Date)
//     if (endDate) {
//       // Ensure the filter checks up to the end of the selected day
//       filtered = filtered.filter((test) => new Date(test.date) <= endDate);
//     }

//     setTests(filtered);
//   };

//   const handleViewTest = (test) => {
//     // FIX: Updated path to match the route defined in App.jsx
//     navigate(`/classes-test-result-details/${test._id}`);
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   return (
//     <MainLayout>
//       <div className="p-4 sm:p-6">
//         <div className="bg-white rounded-2xl shadow-md p-6 space-y-8">
//           {/* Filters Section */}
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-gray-600 mb-1">
//                 Standard
//               </label>
//               <select
//                 value={selectedStd}
//                 onChange={(e) => setSelectedStd(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//               >
//                 <option value="">Select</option>
//                 {stdOptions.map((std) => (
//                   <option key={std} value={std}>
//                     {std}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-gray-600 mb-1">
//                 Division
//               </label>
//               <select
//                 value={selectedDiv}
//                 onChange={(e) => setSelectedDiv(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//               >
//                 <option value="">Select</option>
//                 {divOptions.map((div) => (
//                   <option key={div} value={div}>
//                     {div}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* UI Filter Change 1: Added Term Select (Replaces Subject Input) */}
//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-gray-600 mb-1">
//                 Term
//               </label>
//               <select
//                 value={selectedTerm}
//                 onChange={(e) => setSelectedTerm(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//               >
//                 <option value="">Select</option>
//                 {termOptions.map((term) => (
//                   <option key={term} value={term}>
//                     {term}
//                   </option>
//                 ))}
//               </select>
//             </div>
            
//             {/* UI Filter Change 2: Replaced old Subject/Term input with From Date picker */}
//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-gray-600 mb-1">
//                 From Date
//               </label>
//               <DatePicker
//                 selected={startDate}
//                 onChange={(date) => setStartDate(date)}
//                 className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 dateFormat="yyyy-MM-dd"
//                 placeholderText="Start Date"
//               />
//             </div>
            
//             {/* UI Filter Change 3: Added To Date Picker */}
//             <div className="flex flex-col">
//               <label className="text-sm font-semibold text-gray-600 mb-1">
//                 To Date
//               </label>
//               <DatePicker
//                 selected={endDate}
//                 onChange={(date) => setEndDate(date)}
//                 className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 dateFormat="yyyy-MM-dd"
//                 placeholderText="End Date"
//               />
//             </div>
            
//             <div className="flex items-end">
//               <button
//                 onClick={handleSubmit}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow-md transition-all"
//               >
//                 Submit
//               </button>
//             </div>
            
//              {/* Retained placeholder columns to maintain the grid structure */}
//             <div className="hidden md:block"></div> 
//             <div className="hidden md:block"></div> 
//             <div className="hidden md:block"></div> 

//           </div>

//           {/* Tests Record Table */}
//           <div>
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">
//               Tests Record
//             </h2>
//             <div className="overflow-x-auto">
//               <table className="min-w-full bg-white overflow-hidden text-left">
//                 <thead>
//                   <tr className="bg-blue-100 text-gray-700 text-sm">
//                     <th className="py-2 px-4 border">Date</th>
//                     <th className="py-2 px-4 border">Subject</th>
//                     <th className="py-2 px-4 border">Topic Name</th>
//                     <th className="py-2 px-4 border">Marks Obtained</th>
//                     <th className="py-2 px-4 border">Total Marks</th>
//                     <th className="py-2 px-4 border">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {tests.map((test, index) => (
//                     <tr key={index} className="text-gray-700 text-left">
//                       <td className="py-2 px-4 border">
//                         {formatDate(test.date)}
//                       </td>
//                       <td className="py-2 px-4 border">{test.subject}</td>
//                       <td className="py-2 px-4 border">{test.topic}</td>
//                       <td className="py-2 px-4 border">
//                         {/* Logic to show marks from the studentData array */}
//                         {test.studentData && test.studentData.length > 0 
//                           ? test.studentData[0].marks 
//                           : "-"}
//                       </td>
//                       <td className="py-2 px-4 border">{test.totalmarks}</td>
//                       <td className="py-2 px-4 border">
//                         <button
//                           onClick={() => handleViewTest(test)}
//                           className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
//                         >
//                           View
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default ClassTestResults;

import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

const ClassTestResults = () => {
  const navigate = useNavigate();

  const [selectedStd, setSelectedStd] = useState("");
  const [allTests, setAllTests] = useState([]); // for filtering
  const [selectedDiv, setSelectedDiv] = useState("");
  
  // UI/Logic Change 1: Replaced 'term' (subject input) with 'selectedTerm' (dropdown)
  const [selectedTerm, setSelectedTerm] = useState(""); 
  
  // UI/Logic Change 2: Used two states for date range filtering
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null); 

  const stdOptions = ["Nursery", "Junior", "Senior","1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const divOptions = ["A", "B", "C", "D", "E"];
  const termOptions = ["Term 1", "Term 2", "Final"]; // Added mock options for Term
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const getTests = async () => {
      try {
        // FIX: Using imported API_BASE_URL
        const response = await axios.get(
          `${API_BASE_URL}api/term-results`,
          {
            headers: {
              auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
            },
          }
        );
        console.log(response.data);
        if (response.status === 200) {
          setAllTests(response.data);
          setTests(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getTests();
  }, []);
    
  // Logic Change 3: Updated handleSubmit to use new filters
  const handleSubmit = () => {
    console.log("Submitted:", {
      selectedStd,
      selectedDiv,
      selectedTerm,
      startDate,
      endDate,
    });

    let filtered = [...allTests];

    if (selectedStd) {
      filtered = filtered.filter((test) => test.standard === selectedStd);
    }

    if (selectedDiv) {
      filtered = filtered.filter((test) => test.division === selectedDiv);
    }

    // Filter by Term (using test.title as a proxy for term, as schema doesn't have a 'term' field)
    if (selectedTerm) {
      filtered = filtered.filter((test) =>
        test.title && test.title.toLowerCase().includes(selectedTerm.toLowerCase())
      );
    }

    // Filter by Date Range (From Date)
    if (startDate) {
      filtered = filtered.filter((test) => new Date(test.date) >= startDate);
    }
    
    // Filter by Date Range (To Date)
    if (endDate) {
      // Ensure the filter checks up to the end of the selected day
      filtered = filtered.filter((test) => new Date(test.date) <= endDate);
    }

    setTests(filtered);
  };

  const handleViewTest = (test) => {
    // FIX: Updated path to match the route defined in App.jsx
    navigate(`/classes-test-result-details/${test._id}`);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-8">
          {/* Filters Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600 mb-1">
                Standard
              </label>
              <select
                value={selectedStd}
                onChange={(e) => setSelectedStd(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              >
                <option value="">Select</option>
                {stdOptions.map((std) => (
                  <option key={std} value={std}>
                    {std}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600 mb-1">
                Division
              </label>
              <select
                value={selectedDiv}
                onChange={(e) => setSelectedDiv(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              >
                <option value="">Select</option>
                {divOptions.map((div) => (
                  <option key={div} value={div}>
                    {div}
                  </option>
                ))}
              </select>
            </div>

            {/* UI Filter Change 1: Added Term Select (Replaces Subject Input) */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600 mb-1">
                Term
              </label>
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              >
                <option value="">Select</option>
                {termOptions.map((term) => (
                  <option key={term} value={term}>
                    {term}
                  </option>
                ))}
              </select>
            </div>
            
            {/* UI Filter Change 2: Replaced old Subject/Term input with From Date picker */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600 mb-1">
                From Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                dateFormat="yyyy-MM-dd"
                placeholderText="Start Date"
              />
            </div>
            
            {/* UI Filter Change 3: Added To Date Picker */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600 mb-1">
                To Date
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                dateFormat="yyyy-MM-dd"
                placeholderText="End Date"
              />
            </div>
            
            <div className="flex items-end">
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow-md transition-all"
              >
                Submit
              </button>
            </div>
            
             {/* Retained placeholder columns to maintain the grid structure */}
            <div className="hidden md:block"></div> 
            <div className="hidden md:block"></div> 
            <div className="hidden md:block"></div> 

          </div>

          {/* Tests Record Table */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Tests Record
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white overflow-hidden text-left">
                <thead>
                  <tr className="bg-blue-100 text-gray-700 text-sm">
                    <th className="py-2 px-4 border">Date</th>
                    <th className="py-2 px-4 border">Subject</th>
                    <th className="py-2 px-4 border">Topic Name</th>
                    <th className="py-2 px-4 border">Total Marks</th>
                    <th className="py-2 px-4 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map((test, index) => (
                    <tr key={index} className="text-gray-700 text-left">
                      <td className="py-2 px-4 border">
                        {formatDate(test.date)}
                      </td>
                      <td className="py-2 px-4 border">{test.subject}</td>
                      <td className="py-2 px-4 border">{test.topic}</td>
                      <td className="py-2 px-4 border">{test.totalmarks}</td>
                      <td className="py-2 px-4 border">
                        <button
                          onClick={() => handleViewTest(test)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ClassTestResults;