// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from "axios";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const SelectField = ({ label, name, options, value, onChange }) => {
//   return (
//     <div>
//       {label && (
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           {label}
//         </label>
//       )}
//       <select
//         name={name}
//         value={value || ""}
//         onChange={onChange}
//         className="border px-3 py-2 rounded w-full"
//       >
//         {options.map((option, index) => (
//           <option key={index} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// const FeesDashboard = () => {
//   const [dashboardData, setDashboardData] = useState({
//     totals: {},
//     received: {},
//     pending: {},
//     modes: {},
//   });
//   const [filters, setFilters] = useState({
//     fromDate: "",
//     toDate: "",
//     category: "All",
//   });
//   const [reminderFilters, setReminderFilters] = useState({
//     fromDate: "",
//     toDate: "",
//     category: "All",
//   });
//   const [transactions, setTransactions] = useState([]);
//   const [pieData, setPieData] = useState({
//     labels: ["Cash", "Bank Transfer", "Internet Banking", "Cheques"],
//     datasets: [
//       {
//         data: [0, 0, 0, 0],
//         backgroundColor: ["#3490dc", "#38c172", "#ffed4a", "#e3342f"],
//         borderWidth: 1,
//       },
//     ],
//   });
//   const pieOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "bottom",
//       },
//     },
//   };

//   // Fetch transactions and process dashboard data
//   const fetchTransactions = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/filter-transactions", {
//         params: {
//           fromDate: filters.fromDate,
//           toDate: filters.toDate,
//           std: filters.category !== "All" ? filters.category.replace(/\D/g, "") : "",
//           category: filters.category,
//         },
//         headers: {
//           "Content-Type": "application/json",
//           auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//         },
//       });
//       const data = response.data;

//       // Process totals, received, and pending by category
//       const totals = {};
//       const received = {};
//       const pending = {};
//       const modes = { Cash: 0, "Bank Transfer": 0, "Internet Banking": 0, Cheques: 0 };

//       data.forEach((entry) => {
//         const category = entry.std + "th"; // e.g., "5th" for Primary
//         totals[category] = (totals[category] || 0) + entry.totalFees;
//         received[category] = (received[category] || 0) + entry.totalPaid;
//         pending[category] = (pending[category] || 0) + Math.max(0, entry.totalFees - entry.totalPaid);

//         // Aggregate modes (assuming mode is added to installments in the future)
//         entry.installments.forEach((inst) => {
//           if (inst.mode) modes[inst.mode] = (modes[inst.mode] || 0) + inst.amount;
//         });
//       });

//       // Handle "All" category
//       totals["All"] = data.reduce((sum, entry) => sum + entry.totalFees, 0);
//       received["All"] = data.reduce((sum, entry) => sum + entry.totalPaid, 0);
//       pending["All"] = data.reduce((sum, entry) => sum + Math.max(0, entry.totalFees - entry.totalPaid), 0);

//       setDashboardData({ totals, received, pending });
//       setTransactions(data);

//       // Update pie chart data
//       setPieData({
//         labels: Object.keys(modes),
//         datasets: [
//           {
//             ...pieData.datasets[0],
//             data: Object.values(modes),
//           },
//         ],
//       });
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//       setDashboardData({ totals: {}, received: {}, pending: {} });
//       setTransactions([]);
//       setPieData({ ...pieData, datasets: [{ ...pieData.datasets[0], data: [0, 0, 0, 0] }] });
//     }
//   };

//   // Handle filter changes
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle reminder filter changes
//   const handleReminderFilterChange = (e) => {
//     const { name, value } = e.target;
//     setReminderFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   // Send reminder (mock endpoint)
//   const handleSendReminder = async () => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/send-reminder",
//         {
//           fromDate: reminderFilters.fromDate,
//           toDate: reminderFilters.toDate,
//           category: reminderFilters.category,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//           },
//         }
//       );
//       alert("Reminder sent successfully!");
//     } catch (error) {
//       console.error("Error sending reminder:", error);
//       alert("Error sending reminder.");
//     }
//   };

//   // Fetch data on mount and when filters change
//   useEffect(() => {
//     fetchTransactions();
//   }, [filters.fromDate, filters.toDate, filters.category]);

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6 space-y-8">
//           {/* Title */}
//           <h1 className="text-2xl font-bold text-center">Fee Dashboard</h1>

//           {/* Search + Pay Button */}
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div className="flex items-center w-full max-w-2xl">
//               <input
//                 type="text"
//                 placeholder="Search Student, Standard, Class"
//                 className="border px-4 py-2 rounded-l w-full"
//               />
//               <div className="bg-blue-500 text-white px-4 py-2 rounded-r cursor-pointer">
//                 <FontAwesomeIcon icon={faSearch} />
//               </div>
//             </div>

//             <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
//               Pay
//             </button>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full text-center border border-blue-500">
//               <thead className="bg-blue-100 text-black">
//                 <tr>
//                   <th className="border py-2">Category</th>
//                   <th className="border py-2">Total</th>
//                   <th className="border py-2">Received</th>
//                   <th className="border py-2">Pending</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white">
//                 {["All", "Primary", "Secondary"].map((category, index) => {
//                   const stdCategory = category === "All" ? category : category === "Primary" ? "5th" : "6th"; // Adjust based on your data
//                   return (
//                     <tr key={index}>
//                       <td className="border py-2">{category}</td>
//                       <td className="border py-2">
//                         {dashboardData.totals[stdCategory]
//                           ? `₹${dashboardData.totals[stdCategory].toLocaleString()}`
//                           : "-"}
//                       </td>
//                       <td className="border py-2">
//                         {dashboardData.received[stdCategory]
//                           ? `₹${dashboardData.received[stdCategory].toLocaleString()}`
//                           : "-"}
//                       </td>
//                       <td className="border py-2">
//                         {dashboardData.pending[stdCategory]
//                           ? `₹${dashboardData.pending[stdCategory].toLocaleString()}`
//                           : "-"}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {/* Modes and Reminder Section */}
//           <div className="flex flex-col md:flex-row gap-8 mt-8">
//             {/* Modes */}
//             <div className="flex-1 space-y-4">
//               <h2 className="text-center font-semibold bg-blue-500 text-white py-2 rounded">
//                 Modes
//               </h2>

//               {/* From Date & To Date in one line */}
//               <div className="flex gap-4">
//                 <div className="flex flex-col flex-1">
//                   <label>From Date</label>
//                   <input
//                     type="date"
//                     name="fromDate"
//                     value={filters.fromDate}
//                     onChange={handleFilterChange}
//                     className="border px-3 py-2 rounded"
//                   />
//                 </div>
//                 <div className="flex flex-col flex-1">
//                   <label>To Date</label>
//                   <input
//                     type="date"
//                     name="toDate"
//                     value={filters.toDate}
//                     onChange={handleFilterChange}
//                     className="border px-3 py-2 rounded"
//                   />
//                 </div>
//               </div>

//               {/* Category Dropdown */}
//               <div className="mt-4">
//                 <SelectField
//                   label="Category"
//                   name="category"
//                   options={["All", "Primary", "Secondary"]}
//                   value={filters.category}
//                   onChange={handleFilterChange}
//                 />
//               </div>

//               {/* Pie Chart */}
//               <div className="mt-6">
//                 <Pie data={pieData} options={pieOptions} />
//               </div>
//             </div>

//             {/* Vertical Line */}
//             <div className="w-[2px] bg-blue-500 hidden md:block"></div>

//             {/* Reminder */}
//             <div className="flex-1 space-y-4">
//               <h2 className="text-center font-semibold bg-blue-500 text-white py-2 rounded">
//                 Reminder
//               </h2>

//               {/* From Date & To Date in one line */}
//               <div className="flex gap-4">
//                 <div className="flex flex-col flex-1">
//                   <label>From Date</label>
//                   <input
//                     type="date"
//                     name="fromDate"
//                     value={reminderFilters.fromDate}
//                     onChange={handleReminderFilterChange}
//                     className="border px-3 py-2 rounded"
//                   />
//                 </div>
//                 <div className="flex flex-col flex-1">
//                   <label>To Date</label>
//                   <input
//                     type="date"
//                     name="toDate"
//                     value={reminderFilters.toDate}
//                     onChange={handleReminderFilterChange}
//                     className="border px-3 py-2 rounded"
//                   />
//                 </div>
//               </div>

//               {/* Category Dropdown */}
//               <div className="mt-4">
//                 <SelectField
//                   label="Category"
//                   name="category"
//                   options={["All", "Primary", "Secondary"]}
//                   value={reminderFilters.category}
//                   onChange={handleReminderFilterChange}
//                 />
//               </div>

//               {/* Send Button */}
//               <div className="flex justify-center mt-6">
//                 <button
//                   onClick={handleSendReminder}
//                   className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//                 >
//                   Send
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default FeesDashboard;






// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from "axios";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// ChartJS.register(ArcElement, Tooltip, Legend);

// const SelectField = ({ label, name, options, value, onChange }) => {
//   return (
//     <div>
//       {label && (
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           {label}
//         </label>
//       )}
//       <select
//         name={name}
//         value={value || ""}
//         onChange={onChange}
//         className="border px-3 py-2 rounded w-full"
//       >
//         {options.map((option, index) => (
//           <option key={index} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// const FeesDashboard = () => {
//   const [dashboardData, setDashboardData] = useState({
//     totals: {},
//     received: {},
//     pending: {},
//     modes: {},
//   });
//   const [filters, setFilters] = useState({
//     fromDate: "",
//     toDate: "",
//     category: "All",
//   });
//   const [reminderFilters, setReminderFilters] = useState({
//     fromDate: "",
//     toDate: "",
//     category: "All",
//   });
//   const [transactions, setTransactions] = useState([]);
//   const [pieData, setPieData] = useState({
//     labels: ["Cash", "Bank Transfer", "Internet Banking", "Cheques"],
//     datasets: [
//       {
//         data: [0, 0, 0, 0],
//         backgroundColor: ["#3490dc", "#38c172", "#ffed4a", "#e3342f"],
//         borderWidth: 1,
//       },
//     ],
//   });
//   const pieOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "bottom",
//       },
//     },
//   };
//   
//   // Fetch transactions and process dashboard data
//   const fetchTransactions = async () => {
//     try {
//       // FIX 1: Using imported API_BASE_URL
//       const response = await axios.get(`${API_BASE_URL}api/filter-transactions`, {
//           params: {
//             fromDate: filters.fromDate,
//             toDate: filters.toDate,
//             std: filters.category !== "All" ? filters.category.replace(/\D/g, "") : "",
//             category: filters.category,
//           },
//           headers: {
//             "Content-Type": "application/json",
//             auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//           },
//       });
//       const data = response.data;

//       // Process totals, received, and pending by category
//       const totals = {};
//       const received = {};
//       const pending = {};
//       const modes = { Cash: 0, "Bank Transfer": 0, "Internet Banking": 0, Cheques: 0 };

//       data.forEach((entry) => {
//         const category = entry.std + "th"; // e.g., "5th" for Primary
//         totals[category] = (totals[category] || 0) + entry.totalFees;
//         received[category] = (received[category] || 0) + entry.totalPaid;
//         pending[category] = (pending[category] || 0) + Math.max(0, entry.totalFees - entry.totalPaid);

//         // Aggregate modes (assuming mode is added to installments in the future)
//         entry.installments.forEach((inst) => {
//           if (inst.mode) modes[inst.mode] = (modes[inst.mode] || 0) + inst.amount;
//         });
//       });

//       // Handle "All" category
//       totals["All"] = data.reduce((sum, entry) => sum + entry.totalFees, 0);
//       received["All"] = data.reduce((sum, entry) => sum + entry.totalPaid, 0);
//       pending["All"] = data.reduce((sum, entry) => sum + Math.max(0, entry.totalFees - entry.totalPaid), 0);

//       setDashboardData({ totals, received, pending });
//       setTransactions(data);

//       // Update pie chart data
//       setPieData({
//         labels: Object.keys(modes),
//         datasets: [
//           {
//             ...pieData.datasets[0],
//             data: Object.values(modes),
//           },
//         ],
//       });
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//       setDashboardData({ totals: {}, received: {}, pending: {} });
//       setTransactions([]);
//       setPieData({ ...pieData, datasets: [{ ...pieData.datasets[0], data: [0, 0, 0, 0] }] });
//     }
//   };

//   // Handle filter changes
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle reminder filter changes
//   const handleReminderFilterChange = (e) => {
//     const { name, value } = e.target;
//     setReminderFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   // Send reminder (mock endpoint)
//   const handleSendReminder = async () => {
//     try {
//       // FIX 2: Using imported API_BASE_URL
//       await axios.post(
//         `${API_BASE_URL}api/send-reminder`,
//         {
//           fromDate: reminderFilters.fromDate,
//           toDate: reminderFilters.toDate,
//           category: reminderFilters.category,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//           },
//         }
//       );
//       alert("Reminder sent successfully!");
//     } catch (error) {
//       console.error("Error sending reminder:", error);
//       alert("Error sending reminder.");
//     }
//   };

//   // Fetch data on mount and when filters change
//   useEffect(() => {
//     fetchTransactions();
//   }, [filters.fromDate, filters.toDate, filters.category]);

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6 space-y-8">
//           {/* Title */}
//           <h1 className="text-2xl font-bold text-center">Fee Dashboard</h1>

//           {/* Search + Pay Button */}
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div className="flex items-center w-full max-w-2xl">
//               <input
//                 type="text"
//                 placeholder="Search Student, Standard, Class"
//                 className="border px-4 py-2 rounded-l w-full"
//               />
//               <div className="bg-blue-500 text-white px-4 py-2 rounded-r cursor-pointer">
//                 <FontAwesomeIcon icon={faSearch} />
//               </div>
//             </div>

//             <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
//               Pay
//             </button>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full text-center border border-blue-500">
//               <thead className="bg-blue-100 text-black">
//                 <tr>
//                   <th className="border py-2">Category</th>
//                   <th className="border py-2">Total</th>
//                   <th className="border py-2">Received</th>
//                   <th className="border py-2">Pending</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white">
//                 {["All", "Primary", "Secondary"].map((category, index) => {
//                   const stdCategory = category === "All" ? category : category === "Primary" ? "5th" : "6th"; // Adjust based on your data
//                   return (
//                     <tr key={index}>
//                       <td className="border py-2">{category}</td>
//                       <td className="border py-2">
//                         {dashboardData.totals[stdCategory]
//                           ? `₹${dashboardData.totals[stdCategory].toLocaleString()}`
//                           : "-"}
//                       </td>
//                       <td className="border py-2">
//                         {dashboardData.received[stdCategory]
//                           ? `₹${dashboardData.received[stdCategory].toLocaleString()}`
//                           : "-"}
//                       </td>
//                       <td className="border py-2">
//                         {dashboardData.pending[stdCategory]
//                           ? `₹${dashboardData.pending[stdCategory].toLocaleString()}`
//                           : "-"}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {/* Modes and Reminder Section */}
//           <div className="flex flex-col md:flex-row gap-8 mt-8">
//             {/* Modes */}
//             <div className="flex-1 space-y-4">
//               <h2 className="text-center font-semibold bg-blue-500 text-white py-2 rounded">
//                 Modes
//               </h2>

//               {/* From Date & To Date in one line */}
//               <div className="flex gap-4">
//                 <div className="flex flex-col flex-1">
//                   <label>From Date</label>
//                   <input
//                     type="date"
//                     name="fromDate"
//                     value={filters.fromDate}
//                     onChange={handleFilterChange}
//                     className="border px-3 py-2 rounded"
//                   />
//                 </div>
//                 <div className="flex flex-col flex-1">
//                   <label>To Date</label>
//                   <input
//                     type="date"
//                     name="toDate"
//                     value={filters.toDate}
//                     onChange={handleFilterChange}
//                     className="border px-3 py-2 rounded"
//                   />
//                 </div>
//               </div>

//               {/* Category Dropdown */}
//               <div className="mt-4">
//                 <SelectField
//                   label="Category"
//                   name="category"
//                   options={["All", "Primary", "Secondary"]}
//                   value={filters.category}
//                   onChange={handleFilterChange}
//                 />
//               </div>

//               {/* Pie Chart */}
//               <div className="mt-6">
//                 <Pie data={pieData} options={pieOptions} />
//               </div>
//             </div>

//             {/* Vertical Line */}
//             <div className="w-[2px] bg-blue-500 hidden md:block"></div>

//             {/* Reminder */}
//             <div className="flex-1 space-y-4">
//               <h2 className="text-center font-semibold bg-blue-500 text-white py-2 rounded">
//                 Reminder
//               </h2>

//               {/* From Date & To Date in one line */}
//               <div className="flex gap-4">
//                 <div className="flex flex-col flex-1">
//                   <label>From Date</label>
//                   <input
//                     type="date"
//                     name="fromDate"
//                     value={reminderFilters.fromDate}
//                     onChange={handleReminderFilterChange}
//                     className="border px-3 py-2 rounded"
//                   />
//                 </div>
//                 <div className="flex flex-col flex-1">
//                   <label>To Date</label>
//                   <input
//                     type="date"
//                     name="toDate"
//                     value={reminderFilters.toDate}
//                     onChange={handleReminderFilterChange}
//                     className="border px-3 py-2 rounded"
//                   />
//                 </div>
//               </div>

//               {/* Category Dropdown */}
//               <div className="mt-4">
//                 <SelectField
//                   label="Category"
//                   name="category"
//                   options={["All", "Primary", "Secondary"]}
//                   value={reminderFilters.category}
//                   onChange={handleReminderFilterChange}
//                 />
//               </div>

//               {/* Send Button */}
//               <div className="flex justify-center mt-6">
//                 <button
//                   onClick={handleSendReminder}
//                   className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//                 >
//                   Send
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default FeesDashboard;



// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from "axios";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { API_BASE_URL } from '../config'; 

// ChartJS.register(ArcElement, Tooltip, Legend);

// const SelectField = ({ label, name, options, value, onChange }) => {
//   return (
//     <div>
//       {label && (
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           {label}
//         </label>
//       )}
//       <select
//         name={name}
//         value={value || ""}
//         onChange={onChange}
//         className="border px-3 py-2 rounded w-full"
//       >
//         {options.map((option, index) => (
//           <option key={index} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// const FeesDashboard = () => {
//   const [dashboardData, setDashboardData] = useState({
//     totals: {},
//     received: {},
//     pending: {},
//     modes: {},
//   });
//   const [filters, setFilters] = useState({
//     fromDate: "",
//     toDate: "",
//     category: "All",
//   });
//   const [reminderFilters, setReminderFilters] = useState({
//     fromDate: "",
//     toDate: "",
//     category: "All",
//   });
//   const [transactions, setTransactions] = useState([]);
//   const [pieData, setPieData] = useState({
//     labels: ["Cash", "Bank Transfer", "Internet Banking", "Cheques"],
//     datasets: [
//       {
//         data: [0, 0, 0, 0],
//         backgroundColor: ["#3490dc", "#38c172", "#ffed4a", "#e3342f"],
//         borderWidth: 1,
//       },
//     ],
//   });
//   const pieOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "bottom",
//       },
//     },
//   };

//   // NEW FUNCTION: Handles the click of the Pay button
//   const handlePayClick = () => {
//     alert("Pay button clicked. This would typically open a payment entry modal/form.");
//     // In a real application, you would implement logic here to:
//     // 1. Get the student's ID/details from the search box.
//     // 2. Open a modal/route to handle the actual payment entry.
//   };
//   
//   // Fetch transactions and process dashboard data
//   const fetchTransactions = async () => {
//     try {
//       let stdParam = "";
//       if (filters.category === "Primary") {
//           stdParam = "5"; 
//       } else if (filters.category === "Secondary") {
//           stdParam = "10"; 
//       } else if (filters.category !== "All") {
//           stdParam = filters.category.replace(/\D/g, "");
//       }

//       const response = await axios.get(`${API_BASE_URL}api/filter-transactions`, {
//           params: {
//             fromDate: filters.fromDate,
//             toDate: filters.toDate,
//             std: stdParam,
//             category: filters.category,
//           },
//           headers: {
//             "Content-Type": "application/json",
//             auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//           },
//       });
//       const data = response.data;

//       // Process totals, received, and pending by category
//       const totals = {};
//       const received = {};
//       const pending = {};
//       const modes = { Cash: 0, "Bank Transfer": 0, "Internet Banking": 0, Cheques: 0 };
      
//       let allTotals = 0;
//       let allReceived = 0;
//       let allPending = 0;

//       data.forEach((entry) => {
//         // FIX: Map std values ("5", "10") to Category Keys ("5th", "10th")
//         const categoryKey = entry.std === "5" ? "5th" : entry.std === "10" ? "10th" : entry.std; 
        
//         // Aggregate totals for the specific standard
//         totals[categoryKey] = (totals[categoryKey] || 0) + entry.totalFees;
//         received[categoryKey] = (received[categoryKey] || 0) + entry.totalPaid;
//         pending[categoryKey] = (pending[categoryKey] || 0) + Math.max(0, entry.totalFees - entry.totalPaid);

//         // Aggregate All totals
//         allTotals += entry.totalFees;
//         allReceived += entry.totalPaid;
//         allPending += Math.max(0, entry.totalFees - entry.totalPaid);

//         // Aggregate modes (FILTERED BY DATE FOR PIE CHART)
//         const from = filters.fromDate ? new Date(filters.fromDate) : null;
//         const to = filters.toDate ? new Date(filters.toDate) : null;
        
//         entry.installments.forEach((inst) => {
//             const instDate = new Date(inst.date);
//             const endDateInclusive = to ? new Date(to.getTime() + 86400000) : null; 

//             const isWithinDateRange = (!from || instDate >= from) && (!endDateInclusive || instDate < endDateInclusive);
            
//             if (inst.mode && isWithinDateRange) {
//               modes[inst.mode] = (modes[inst.mode] || 0) + inst.amount;
//             }
//         });
//       });

//       // Handle "All" category using the calculated overall totals
//       totals["All"] = allTotals;
//       received["All"] = allReceived;
//       pending["All"] = allPending;

//       setDashboardData({ totals, received, pending });
//       setTransactions(data);

//       // Update pie chart data
//       setPieData({
//         labels: Object.keys(modes),
//         datasets: [
//           {
//             ...pieData.datasets[0],
//             data: Object.values(modes),
//           },
//         ],
//       });
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//       setDashboardData({ totals: {}, received: {}, pending: {} });
//       setTransactions([]);
//       setPieData({ ...pieData, datasets: [{ ...pieData.datasets[0], data: [0, 0, 0, 0] }] });
//     }
//   };

//   // Handle filter changes
//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle reminder filter changes
//   const handleReminderFilterChange = (e) => {
//     const { name, value } = e.target;
//     setReminderFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   // Send reminder (mock endpoint)
//   const handleSendReminder = async () => {
//     try {
//       await axios.post(
//         `${API_BASE_URL}api/send-reminder`,
//         {
//           fromDate: reminderFilters.fromDate,
//           toDate: reminderFilters.toDate,
//           category: reminderFilters.category,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//           },
//         }
//       );
//       alert("Reminder sent successfully!");
//     } catch (error) {
//       console.error("Error sending reminder:", error);
//       alert("Error sending reminder.");
//     }
//   };

//   // Fetch data on mount and when filters change
//   useEffect(() => {
//     fetchTransactions();
//   }, [filters.fromDate, filters.toDate, filters.category]);

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6 space-y-8">
//           {/* Title */}
//           <h1 className="text-2xl font-bold text-center">Fee Dashboard</h1>

//           {/* Search + Pay Button */}
//           <div className="flex items-center justify-between flex-wrap gap-4">
//             <div className="flex items-center w-full max-w-2xl">
//               <input
//                 type="text"
//                 placeholder="Search Student, Standard, Class"
//                 className="border px-4 py-2 rounded-l w-full"
//               />
//               <div className="bg-blue-500 text-white px-4 py-2 rounded-r cursor-pointer">
//                 <FontAwesomeIcon icon={faSearch} />
//               </div>
//             </div>

//             {/* Functional Pay Button */}
//             <button 
//                 onClick={handlePayClick} // Added onClick handler
//                 className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//             >
//               Pay
//             </button>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full text-center border border-blue-500">
//               <thead className="bg-blue-100 text-black">
//                 <tr>
//                   <th className="border py-2">Category</th>
//                   <th className="border py-2">Total</th>
//                   <th className="border py-2">Received</th>
//                   <th className="border py-2">Pending</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white">
//                 {["All", "Primary", "Secondary"].map((category, index) => {
//                   const stdCategory = 
//                         category === "All" ? "All" : 
//                         category === "Primary" ? "5th" : 
//                         category === "Secondary" ? "10th" :
//                         ""; 
//                   return (
//                     <tr key={index}>
//                       <td className="border py-2">{category}</td>
//                       <td className="border py-2">
//                         {dashboardData.totals[stdCategory]
//                           ? `₹${dashboardData.totals[stdCategory].toLocaleString()}`
//                           : "-"}
//                       </td>
//                       <td className="border py-2">
//                         {dashboardData.received[stdCategory]
//                           ? `₹${dashboardData.received[stdCategory].toLocaleString()}`
//                           : "-"}
//                       </td>
//                       <td className="border py-2">
//                         {dashboardData.pending[stdCategory]
//                           ? `₹${dashboardData.pending[stdCategory].toLocaleString()}`
//                           : "-"}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {/* Modes and Reminder Section */}
//           <div className="flex flex-col md:flex-row gap-8 mt-8">
//             {/* Modes */}
//             <div className="flex-1 space-y-4">
//               <h2 className="text-center font-semibold bg-blue-500 text-white py-2 rounded">
//                 Modes
//               </h2>

//               {/* From Date & To Date in one line */}
//               <div className="flex gap-4">
//                 <div className="flex flex-col flex-1">
//                   <label>From Date</label>
//                   <input
//                     type="date"
//                     name="fromDate"
//                     value={filters.fromDate}
//                     onChange={handleFilterChange}
//                     className="border px-3 py-2 rounded"
//                   />
//                 </div>
//                 <div className="flex flex-col flex-1">
//                   <label>To Date</label>
//                   <input
//                     type="date"
//                     name="toDate"
//                     value={filters.toDate}
//                     onChange={handleFilterChange}
//                     className="border px-3 py-2 rounded"
//                   />
//                 </div>
//               </div>

//               {/* Category Dropdown */}
//               <div className="mt-4">
//                 <SelectField
//                   label="Category"
//                   name="category"
//                   options={["All", "Primary", "Secondary"]}
//                   value={filters.category}
//                   onChange={handleFilterChange}
//                 />
//               </div>

//               {/* Pie Chart */}
//               <div className="mt-6">
//                 <Pie data={pieData} options={pieOptions} />
//               </div>
//             </div>

//             {/* Vertical Line */}
//             <div className="w-[2px] bg-blue-500 hidden md:block"></div>

//             {/* Reminder */}
//             <div className="flex-1 space-y-4">
//               <h2 className="text-center font-semibold bg-blue-500 text-white py-2 rounded">
//                 Reminder
//               </h2>

//               {/* From Date & To Date in one line */}
//               <div className="flex gap-4">
//                 <div className="flex flex-col flex-1">
//                   <label>From Date</label>
//                   <input
//                     type="date"
//                     name="fromDate"
//                     value={reminderFilters.fromDate}
//                     onChange={handleReminderFilterChange}
//                     className="border px-3 py-2 rounded"
//                   />
//                 </div>
//                 <div className="flex flex-col flex-1">
//                   <label>To Date</label>
//                   <input
//                     type="date"
//                     name="toDate"
//                     value={reminderFilters.toDate}
//                     onChange={handleReminderFilterChange}
//                     className="border px-3 py-2 rounded"
//                   />
//                 </div>
//               </div>

//               {/* Category Dropdown */}
//               <div className="mt-4">
//                 <SelectField
//                   label="Category"
//                   name="category"
//                   options={["All", "Primary", "Secondary"]}
//                   value={reminderFilters.category}
//                   onChange={handleReminderFilterChange}
//                 />
//               </div>

//               {/* Send Button */}
//               <div className="flex justify-center mt-6">
//                 <button
//                   onClick={handleSendReminder}
//                   className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//                 >
//                   Send
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default FeesDashboard;












import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { API_BASE_URL } from '../config'; 

ChartJS.register(ArcElement, Tooltip, Legend);

const SelectField = ({ label, name, options, value, onChange }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        className="border px-3 py-2 rounded w-full"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

const FeesDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totals: {},
    received: {},
    pending: {},
    modes: {},
  });
    // NEW STATE: Store Annual Fee Structure per Category (Total Fees DUE)
    const [annualFees, setAnnualFees] = useState({});

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    category: "All",
  });
  const [reminderFilters, setReminderFilters] = useState({
    fromDate: "",
    toDate: "",
    category: "All",
  });
  const [transactions, setTransactions] = useState([]);
  const [pieData, setPieData] = useState({
    labels: ["Cash", "Bank Transfer", "Internet Banking", "Cheques"],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ["#3490dc", "#38c172", "#ffed4a", "#e3342f"],
        borderWidth: 1,
      },
    ],
  });
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };
  
  // API AUTH HEADER
  const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";


  // FIX: Fetch aggregated Fee Structure Totals (Total Fees DUE)
  const fetchAnnualFees = async () => {
    try {
      // Use the combined-fees endpoint to get Total Fees DUE
      const response = await axios.get(`${API_BASE_URL}api/combined-fees`, {
        headers: { auth: AUTH_HEADER },
      });

      const feesByGroup = response.data; // e.g., { primary: 10000, secondary: 5000, all: 15000 }
      
      const aggregatedTotals = {
          'All': feesByGroup.all || 0,
          'Primary': feesByGroup.primary || 0,
          'Secondary': feesByGroup.secondary || 0,
      };

      setAnnualFees(aggregatedTotals); // Set the total fees DUE by category
    } catch (error) {
      console.error("Error fetching annual fees:", error);
      setAnnualFees({});
    }
  };

  // NEW FUNCTION: Handles the click of the Pay button
  const handlePayClick = () => {
    alert("Pay button clicked. This would typically open a payment entry modal/form.");
    // In a real application, you would implement logic here to:
    // 1. Get the student's ID/details from the search box.
    // 2. Open a modal/route to handle the actual payment entry.
  };
  
  // FIX: Update fetchTransactions to use total fees DUE from annualFees state
  const fetchTransactions = async () => {
    try {
      // stdParam logic simplified as aggregation is done on frontend
      let stdParam = "";
      if (filters.category !== "All" && filters.category !== "Primary" && filters.category !== "Secondary") {
          stdParam = filters.category.replace(/\D/g, "");
      }

      // 1. Fetch Transactions (Total Fees RECEIVED)
      const response = await axios.get(`${API_BASE_URL}api/filter-transactions`, {
          params: {
            fromDate: filters.fromDate,
            toDate: filters.toDate,
            // Removing std filter as we need all entries for Primary/Secondary aggregation
            // std: stdParam, 
            category: filters.category,
          },
          headers: {
            "Content-Type": "application/json",
            auth: AUTH_HEADER,
          },
      });
      const data = response.data;

      // 2. Process received and mode totals
      const receivedByStd = {};
      const modes = { Cash: 0, "Bank Transfer": 0, "Internet Banking": 0, Cheques: 0 };
      
      data.forEach((entry) => {
          const stdKey = entry.std; // std number string
          receivedByStd[stdKey] = (receivedByStd[stdKey] || 0) + entry.totalPaid;
            
          // Aggregate modes (FILTERED BY DATE FOR PIE CHART)
          const from = filters.fromDate ? new Date(filters.fromDate) : null;
          const to = filters.toDate ? new Date(filters.toDate) : null;
            
          entry.installments.forEach((inst) => {
              const instDate = new Date(inst.date);
              const endDateInclusive = to ? new Date(to.getTime() + 86400000) : null; 

              const isWithinDateRange = (!from || instDate >= from) && (!endDateInclusive || instDate < endDateInclusive);
                
              if (inst.mode && isWithinDateRange) {
                modes[inst.mode] = (modes[inst.mode] || 0) + inst.amount;
              }
          });
      });

        // 3. Aggregate Received for Primary/Secondary/All using standards found in transactions
        let primaryReceived = 0;
        let secondaryReceived = 0;
        let allReceived = 0;
        
        Object.keys(receivedByStd).forEach(stdNumStr => {
            const paid = receivedByStd[stdNumStr];
            allReceived += paid;
            
            const stdNum = parseInt(stdNumStr);
            if (stdNum >= 1 && stdNum <= 7) {
                primaryReceived += paid;
            } else if (stdNum >= 8 && stdNum <= 10) {
                secondaryReceived += paid;
            }
        });
        
        const finalReceived = {
            'All': allReceived,
            'Primary': primaryReceived,
            'Secondary': secondaryReceived,
        };

        // 4. Calculate Pending: Totals Due (from annualFees state) - Received
        const pending = {
            'All': Math.max(0, annualFees['All'] - finalReceived['All']),
            'Primary': Math.max(0, annualFees['Primary'] - finalReceived['Primary']),
            'Secondary': Math.max(0, annualFees['Secondary'] - finalReceived['Secondary']),
        };
        
        // 5. Update state
        setDashboardData({ totals: annualFees, received: finalReceived, pending });
        setTransactions(data);

        // Update pie chart data
        setPieData({
            labels: Object.keys(modes),
            datasets: [
                {
                    ...pieData.datasets[0],
                    data: Object.values(modes),
                },
            ],
        });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        setDashboardData({ totals: {}, received: {}, pending: {} });
        setTransactions([]);
        setPieData({ ...pieData, datasets: [{ ...pieData.datasets[0], data: [0, 0, 0, 0] }] });
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Handle reminder filter changes
  const handleReminderFilterChange = (e) => {
    const { name, value } = e.target;
    setReminderFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Send reminder (mock endpoint)
  const handleSendReminder = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}api/send-reminder`,
        {
          fromDate: reminderFilters.fromDate,
          toDate: reminderFilters.toDate,
          category: reminderFilters.category,
        },
        {
          headers: {
            "Content-Type": "application/json",
            auth: AUTH_HEADER,
          },
        }
      );
      alert("Reminder sent successfully!");
    } catch (error) {
      console.error("Error sending reminder:", error);
      alert("Error sending reminder.");
    }
  };

  // Fetch data on mount and when filters change
  useEffect(() => {
    fetchAnnualFees(); // Fetch annual fee structure first
  }, []);
  
  useEffect(() => {
    // Only fetch transactions if we have the annual fee data
    if (Object.keys(annualFees).length > 0) { 
        fetchTransactions(); 
    }
  }, [filters.fromDate, filters.toDate, filters.category, annualFees]); // Dependency on annualFees ensures correct calculation

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="p-6 space-y-8">
          {/* Title */}
          <h1 className="text-2xl font-bold text-center">Fee Dashboard</h1>

          {/* Search + Pay Button */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center w-full max-w-2xl">
              <input
                type="text"
                placeholder="Search Student, Standard, Class"
                className="border px-4 py-2 rounded-l w-full"
              />
              <div className="bg-blue-500 text-white px-4 py-2 rounded-r cursor-pointer">
                <FontAwesomeIcon icon={faSearch} />
              </div>
            </div>

            {/* Functional Pay Button */}
            <button 
                onClick={handlePayClick} // Added onClick handler
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Pay
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-center border border-blue-500">
              <thead className="bg-blue-100 text-black">
                <tr>
                  <th className="border py-2">Category</th>
                  <th className="border py-2">Total</th>
                  <th className="border py-2">Received</th>
                  <th className="border py-2">Pending</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {["All", "Primary", "Secondary"].map((category, index) => {
                  const categoryKey = category; 
                  return (
                    <tr key={index}>
                      <td className="border py-2">{category}</td>
                      <td className="border py-2">
                        {dashboardData.totals[categoryKey]
                          ? `₹${dashboardData.totals[categoryKey].toLocaleString()}`
                          : "₹0"}
                      </td>
                      <td className="border py-2">
                        {dashboardData.received[categoryKey]
                          ? `₹${dashboardData.received[categoryKey].toLocaleString()}`
                          : "₹0"}
                      </td>
                      <td className="border py-2">
                        {dashboardData.pending[categoryKey]
                          ? `₹${dashboardData.pending[categoryKey].toLocaleString()}`
                          : "₹0"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Modes and Reminder Section */}
          <div className="flex flex-col md:flex-row gap-8 mt-8">
            {/* Modes */}
            <div className="flex-1 space-y-4">
              <h2 className="text-center font-semibold bg-blue-500 text-white py-2 rounded">
                Modes
              </h2>

              {/* From Date & To Date in one line */}
              <div className="flex gap-4">
                <div className="flex flex-col flex-1">
                  <label>From Date</label>
                  <input
                    type="date"
                    name="fromDate"
                    value={filters.fromDate}
                    onChange={handleFilterChange}
                    className="border px-3 py-2 rounded"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label>To Date</label>
                  <input
                    type="date"
                    name="toDate"
                    value={filters.toDate}
                    onChange={handleFilterChange}
                    className="border px-3 py-2 rounded"
                  />
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="mt-4">
                <SelectField
                  label="Category"
                  name="category"
                  options={["All", "Primary", "Secondary"]}
                  value={filters.category}
                  onChange={handleFilterChange}
                />
              </div>

              {/* Pie Chart */}
              <div className="mt-6">
                <Pie data={pieData} options={pieOptions} />
              </div>
            </div>

            {/* Vertical Line */}
            <div className="w-[2px] bg-blue-500 hidden md:block"></div>

            {/* Reminder */}
            <div className="flex-1 space-y-4">
              <h2 className="text-center font-semibold bg-blue-500 text-white py-2 rounded">
                Reminder
              </h2>

              {/* From Date & To Date in one line */}
              <div className="flex gap-4">
                <div className="flex flex-col flex-1">
                  <label>From Date</label>
                  <input
                    type="date"
                    name="fromDate"
                    value={reminderFilters.fromDate}
                    onChange={handleReminderFilterChange}
                    className="border px-3 py-2 rounded"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label>To Date</label>
                  <input
                    type="date"
                    name="toDate"
                    value={reminderFilters.toDate}
                    onChange={handleReminderFilterChange}
                    className="border px-3 py-2 rounded"
                  />
                </div>
              </div>

              {/* Category Dropdown */}
              <div className="mt-4">
                <SelectField
                  label="Category"
                  name="category"
                  options={["All", "Primary", "Secondary"]}
                  value={reminderFilters.category}
                  onChange={handleReminderFilterChange}
                />
              </div>

              {/* Send Button */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleSendReminder}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FeesDashboard;