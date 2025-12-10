// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from "axios";

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

// const FeesCollection = () => {
//   const [showTable, setShowTable] = useState(false);
//   const [transactions, setTransactions] = useState([]);
//   const [filters, setFilters] = useState({
//     duration: "",
//     fromDate: "",
//     toDate: "",
//     category: "",
//     standard: "",
//     division: "",
//     mode: "",
//   });

//   // Fetch filtered transactions
//   const fetchTransactions = async () => {
//     try {
//       console.log("Fetching transactions with filters:", filters);
//       const response = await axios.get(
//         "http://localhost:5000/api/filter-transactions",
//         {
//           params: {
//             duration: filters.duration,
//             fromDate: filters.fromDate,
//             toDate: filters.toDate,
//             category: filters.category,
//             std: filters.standard,
//             div: filters.division,
//             mode: filters.mode,
//           },
//           headers: {
//             "Content-Type": "application/json",
//             auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//           },
//         }
//       );
//       console.log("Fetched transactions:", response.data);
//       setTransactions(response.data);
//       setShowTable(true);
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//       setTransactions({});
//       setShowTable(false);
//     }
//   };

//   const handleApply = () => {
//     fetchTransactions();
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6 space-y-8">
//           {/* Search Bar */}
//           <div className="flex items-center w-full max-w-2xl">
//             <input
//               type="text"
//               placeholder="Search Student, Standard, Class"
//               className="border px-4 py-2 rounded-l w-full"
//             />
//             <div className="bg-blue-500 text-white px-4 py-2 rounded-r cursor-pointer">
//               <FontAwesomeIcon icon={faSearch} />
//             </div>
//           </div>

//           {/* Filters Section */}
//           <div className="border p-6 rounded-lg shadow-md">
//             {/* Row 1: Duration, From Date, To Date, Category */}
//             <div className="flex flex-wrap items-center gap-6 mb-6">
//               <div className="flex items-center gap-2">
//                 <label className="whitespace-nowrap">Duration</label>
//                 <SelectField
//                   label=""
//                   name="duration"
//                   options={["", "Monthly", "Quarterly", "Yearly"]}
//                   value={filters.duration}
//                   onChange={handleFilterChange}
//                 />
//               </div>
//               <div className="flex items-center gap-2">
//                 <label className="whitespace-nowrap">From Date</label>
//                 <input
//                   type="date"
//                   name="fromDate"
//                   value={filters.fromDate}
//                   onChange={handleFilterChange}
//                   className="border px-3 py-2 rounded w-[180px]"
//                 />
//               </div>
//               <div className="flex items-center gap-2">
//                 <label className="whitespace-nowrap">To Date</label>
//                 <input
//                   type="date"
//                   name="toDate"
//                   value={filters.toDate}
//                   onChange={handleFilterChange}
//                   className="border px-3 py-2 rounded w-[180px]"
//                 />
//               </div>
//               <div className="flex items-center gap-2">
//                 <label className="whitespace-nowrap">Category</label>
//                 <SelectField
//                   label=""
//                   name="category"
//                   options={["", "All", "Primary", "Secondary"]}
//                   value={filters.category}
//                   onChange={handleFilterChange}
//                 />
//               </div>
//             </div>

//             {/* Row 2: Standard, Division */}
//             <div className="flex flex-wrap items-center gap-6 mb-6">
//               <div className="flex items-center gap-2">
//                 <label className="whitespace-nowrap">Standard</label>
//                 <SelectField
//                   label=""
//                   name="standard"
//                   options={[
//                     "",
//                     "1",
//                     "2",
//                     "3",
//                     "4",
//                     "5",
//                     "6",
//                     "7",
//                     "8",
//                     "9",
//                     "10",
//                   ]}
//                   value={filters.standard}
//                   onChange={handleFilterChange}
//                 />
//               </div>
//               <div className="flex items-center gap-2">
//                 <label className="whitespace-nowrap">Division</label>
//                 <SelectField
//                   label=""
//                   name="division"
//                   options={["", "A", "B", "C"]}
//                   value={filters.division}
//                   onChange={handleFilterChange}
//                 />
//               </div>

//               <div className="flex items-center gap-2 ">
//                 <label className="whitespace-nowrap">Mode</label>
//                 <SelectField
//                   label=""
//                   name="mode"
//                   options={[
//                     "",
//                     "Cash",
//                     "UPI",
//                     "Cheque",
//                     "Bank Transfer",
//                     "Internet Banking",
//                   ]}
//                   value={filters.mode}
//                   onChange={handleFilterChange}
//                 />
//               </div>
//             </div>

//             {/* Apply Button */}
//             <div className="flex justify-end">
//               <button
//                 onClick={handleApply}
//                 className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700"
//               >
//                 Apply
//               </button>
//             </div>
//           </div>

//           {/* Table Section */}
//           {showTable && (
//             <div className="mt-8 border overflow-x-auto shadow-md">
//               <table className="min-w-full table-auto border">
//                 <thead className="bg-blue-100 text-black">
//                   <tr>
//                     <th className="px-6 py-4 border text-left">Date</th>
//                     <th className="px-6 py-4 border text-left">Student Name</th>
//                     <th className="px-6 py-4 border text-left">Standard</th>
//                     <th className="px-6 py-4 border text-left">Division</th>
//                     <th className="px-6 py-4 border text-left">Total Fees</th>
//                     <th className="px-6 py-4 border text-left">Paid</th>
//                     <th className="px-6 py-4 border text-left">Pending</th>
//                     <th className="px-6 py-4 border text-left">Payment Mode</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white">
//                   {transactions.length > 0 ? (
//                     transactions.map((item, index) => (
//                       <tr key={index} className="border-t">
//                         <td className="px-6 py-4 border">
//                           {item.installments.length > 0
//                             ? new Date(
//                                 item.installments[0].date
//                               ).toLocaleDateString()
//                             : "-"}
//                         </td>
//                         <td className="px-6 py-4 border">{item.name}</td>
//                         <td className="px-6 py-4 border">{item.std}</td>
//                         <td className="px-6 py-4 border">{item.div}</td>
//                         <td className="px-6 py-4 border">{item.totalFees}</td>
//                         {/* total paid change hoga */}
//                         <td className="px-6 py-4 border">{item.totalFees}</td>
//                         <td className="px-6 py-4 border">
//                           {item.totalFees - item.totalPaid}
//                         </td>
//                         <td className="px-6 py-4 border">
//                           {item.installments.length > 0
//                             ? item.installments[0].mode || "Cash"
//                             : "-"}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan="8"
//                         className="px-6 py-4 text-center border text-gray-500"
//                       >
//                         No transactions found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default FeesCollection;





// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from "axios";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

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

// const FeesCollection = () => {
//   const [showTable, setShowTable] = useState(false);
//   const [transactions, setTransactions] = useState([]);
//   const [filters, setFilters] = useState({
//     duration: "",
//     fromDate: "",
//     toDate: "",
//     category: "",
//     standard: "",
//     division: "",
//     mode: "",
//   });

//   // Fetch filtered transactions
//   const fetchTransactions = async () => {
//     try {
//       console.log("Fetching transactions with filters:", filters);
//       // FIX: Using imported API_BASE_URL
//       const response = await axios.get(
//         `${API_BASE_URL}api/filter-transactions`,
//         {
//           params: {
//             duration: filters.duration,
//             fromDate: filters.fromDate,
//             toDate: filters.toDate,
//             category: filters.category,
//             std: filters.standard,
//             div: filters.division,
//             mode: filters.mode,
//           },
//           headers: {
//             "Content-Type": "application/json",
//             auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//           },
//         }
//       );
//       console.log("Fetched transactions:", response.data);
//       setTransactions(response.data);
//       setShowTable(true);
//     } catch (error) {
//       console.error("Error fetching transactions:", error);
//       setTransactions({});
//       setShowTable(false);
//     }
//   };

//   const handleApply = () => {
//     fetchTransactions();
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6 space-y-8">
//           {/* Search Bar */}
//           <div className="flex items-center w-full max-w-2xl">
//             <input
//               type="text"
//               placeholder="Search Student, Standard, Class"
//               className="border px-4 py-2 rounded-l w-full"
//             />
//             <div className="bg-blue-500 text-white px-4 py-2 rounded-r cursor-pointer">
//               <FontAwesomeIcon icon={faSearch} />
//             </div>
//           </div>

//           {/* Filters Section */}
//           <div className="border p-6 rounded-lg shadow-md">
//             {/* Row 1: Duration, From Date, To Date, Category */}
//             <div className="flex flex-wrap items-center gap-6 mb-6">
//               <div className="flex items-center gap-2">
//                 <label className="whitespace-nowrap">Duration</label>
//                 <SelectField
//                   label=""
//                   name="duration"
//                   options={["", "Monthly", "Quarterly", "Yearly"]}
//                   value={filters.duration}
//                   onChange={handleFilterChange}
//                 />
//               </div>
//               <div className="flex items-center gap-2">
//                 <label className="whitespace-nowrap">From Date</label>
//                 <input
//                   type="date"
//                   name="fromDate"
//                   value={filters.fromDate}
//                   onChange={handleFilterChange}
//                   className="border px-3 py-2 rounded w-[180px]"
//                 />
//               </div>
//               <div className="flex items-center gap-2">
//                 <label className="whitespace-nowrap">To Date</label>
//                 <input
//                   type="date"
//                   name="toDate"
//                   value={filters.toDate}
//                   onChange={handleFilterChange}
//                   className="border px-3 py-2 rounded w-[180px]"
//                 />
//               </div>
//               <div className="flex items-center gap-2">
//                 <label className="whitespace-nowrap">Category</label>
//                 <SelectField
//                   label=""
//                   name="category"
//                   options={["", "All", "Primary", "Secondary"]}
//                   value={filters.category}
//                   onChange={handleFilterChange}
//                 />
//               </div>
//             </div>

//             {/* Row 2: Standard, Division */}
//             <div className="flex flex-wrap items-center gap-6 mb-6">
//               <div className="flex items-center gap-2">
//                 <label className="whitespace-nowrap">Standard</label>
//                 <SelectField
//                   label=""
//                   name="standard"
//                   options={[
//                     "",
//                     "1",
//                     "2",
//                     "3",
//                     "4",
//                     "5",
//                     "6",
//                     "7",
//                     "8",
//                     "9",
//                     "10",
//                   ]}
//                   value={filters.standard}
//                   onChange={handleFilterChange}
//                 />
//               </div>
//               <div className="flex items-center gap-2">
//                 <label className="whitespace-nowrap">Division</label>
//                 <SelectField
//                   label=""
//                   name="division"
//                   options={["", "A", "B", "C"]}
//                   value={filters.division}
//                   onChange={handleFilterChange}
//                 />
//               </div>

//               <div className="flex items-center gap-2 ">
//                 <label className="whitespace-nowrap">Mode</label>
//                 <SelectField
//                   label=""
//                   name="mode"
//                   options={[
//                     "",
//                     "Cash",
//                     "UPI",
//                     "Cheque",
//                     "Bank Transfer",
//                     "Internet Banking",
//                   ]}
//                   value={filters.mode}
//                   onChange={handleFilterChange}
//                 />
//               </div>
//             </div>

//             {/* Apply Button */}
//             <div className="flex justify-end">
//               <button
//                 onClick={handleApply}
//                 className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700"
//               >
//                 Apply
//               </button>
//             </div>
//           </div>

//           {/* Table Section */}
//           {showTable && (
//             <div className="mt-8 border overflow-x-auto shadow-md">
//               <table className="min-w-full table-auto border">
//                 <thead className="bg-blue-100 text-black">
//                   <tr>
//                     <th className="px-6 py-4 border text-left">Date</th>
//                     <th className="px-6 py-4 border text-left">Student Name</th>
//                     <th className="px-6 py-4 border text-left">Standard</th>
//                     <th className="px-6 py-4 border text-left">Division</th>
//                     <th className="px-6 py-4 border text-left">Total Fees</th>
//                     <th className="px-6 py-4 border text-left">Paid</th>
//                     <th className="px-6 py-4 border text-left">Pending</th>
//                     <th className="px-6 py-4 border text-left">Payment Mode</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white">
//                   {transactions.length > 0 ? (
//                     transactions.map((item, index) => (
//                       <tr key={index} className="border-t">
//                         <td className="px-6 py-4 border">
//                           {item.installments.length > 0
//                             ? new Date(
//                                 item.installments[0].date
//                               ).toLocaleDateString()
//                             : "-"}
//                         </td>
//                         <td className="px-6 py-4 border">{item.name}</td>
//                         <td className="px-6 py-4 border">{item.std}</td>
//                         <td className="px-6 py-4 border">{item.div}</td>
//                         <td className="px-6 py-4 border">{item.totalFees}</td>
//                         {/* total paid change hoga */}
//                         <td className="px-6 py-4 border">{item.totalFees}</td>
//                         <td className="px-6 py-4 border">
//                           {item.totalFees - item.totalPaid}
//                         </td>
//                         <td className="px-6 py-4 border">
//                           {item.installments.length > 0
//                             ? item.installments[0].mode || "Cash"
//                             : "-"}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan="8"
//                         className="px-6 py-4 text-center border text-gray-500"
//                       >
//                         No transactions found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default FeesCollection;









import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

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

// Helper function to find the latest installment date
const getLatestDate = (installments) => {
    if (!installments || installments.length === 0) return 0;
    
    // Sort installments by date descending and return the latest date
    const sortedInstallments = [...installments].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return new Date(sortedInstallments[0].date).getTime();
};


const FeesCollection = () => {
  const [showTable, setShowTable] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filters, setFilters] = useState({
    duration: "",
    fromDate: "",
    toDate: "",
    category: "",
    standard: "",
    division: "",
    mode: "",
  });

  const AUTH_HEADER = `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`;

  const fetchTransactions = async () => {
    // --- FIX: Removed confusing client-side Category-to-Standard translation.
    // The backend logic is already robust enough to handle the 'category' filter 
    // and the specific 'std' filter simultaneously.
    let standardFilter = filters.standard; 
    
    // No redundant client-side logic here. Just use the selected filters.
    

    try {
      const response = await axios.get(
        `${API_BASE_URL}api/filter-transactions`,
        {
          params: {
            duration: filters.duration,
            fromDate: filters.fromDate,
            toDate: filters.toDate,
            category: filters.category, // Send the category directly
            std: standardFilter, // Send the specific standard directly
            div: filters.division, 
            mode: filters.mode,    
            search: searchTerm,    
          },
          headers: {
            "Content-Type": "application/json",
            auth: AUTH_HEADER,
          },
        }
      );

    // FIX: Sort transactions by the latest installment date (descending)
    const sortedTransactions = response.data.sort((a, b) => {
        return getLatestDate(b.installments) - getLatestDate(a.installments);
    });

    setTransactions(sortedTransactions);
    setShowTable(true);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
      setShowTable(false);
    }
  };

  const handleApply = () => {
    fetchTransactions();
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="p-6 space-y-8">
          {/* Search Bar */}
          <div className="flex items-center w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search Student, Standard, Class"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-4 py-2 rounded-l w-full"
            />
            <div 
              onClick={handleApply}
              className="bg-blue-500 text-white px-4 py-2 rounded-r cursor-pointer"
            >
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>

          {/* Filters Section */}
          <div className="border p-6 rounded-lg shadow-md">
            {/* Row 1 */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <label className="whitespace-nowrap">Duration</label>
                <SelectField
                  label=""
                  name="duration"
                  options={["", "Monthly", "Quarterly", "Yearly"]}
                  value={filters.duration}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="whitespace-nowrap">From Date</label>
                <input
                  type="date"
                  name="fromDate"
                  value={filters.fromDate}
                  onChange={handleFilterChange}
                  className="border px-3 py-2 rounded w-[180px]"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="whitespace-nowrap">To Date</label>
                <input
                  type="date"
                  name="toDate"
                  value={filters.toDate}
                  onChange={handleFilterChange}
                  className="border px-3 py-2 rounded w-[180px]"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="whitespace-nowrap">Category</label>
                <SelectField
                  label=""
                  name="category"
                  options={["", "All", "Pre-Primary", "Primary", "Secondary"]}
                  value={filters.category}
                  onChange={handleFilterChange}
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <label className="whitespace-nowrap">Standard</label>
                <SelectField
                  label=""
                  name="standard"
                  options={[
                    "", "Nursery", "Junior", "Senior",
                    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"
                  ]}
                  value={filters.standard}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="whitespace-nowrap">Division</label>
                <SelectField
                  label=""
                  name="division"
                  options={["", "A", "B", "C", "D", "E"]}
                  value={filters.division}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="whitespace-nowrap">Mode</label>
                <SelectField
                  label=""
                  name="mode"
                  options={[
                    "",
                    "Cash",
                    "UPI",
                    "Cheque",
                    "Bank Transfer",
                    "Internet Banking",
                  ]}
                  value={filters.mode}
                  onChange={handleFilterChange}
                />
              </div>
              
            </div>

            {/* Apply Button */}
            <div className="flex justify-end">
              <button
                onClick={handleApply}
                className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Table */}
          {showTable && (
            <div className="mt-8 border overflow-x-auto shadow-md">
              <table className="min-w-full table-auto border">
                <thead className="bg-blue-100 text-black">
                  <tr>
                    <th className="px-6 py-4 border text-left">Date</th>
                    <th className="px-6 py-4 border text-left">Student Name</th>
                    <th className="px-6 py-4 border text-left">Standard</th>
                    <th className="px-6 py-4 border text-left">Division</th>
                    <th className="px-6 py-4 border text-left">Total Fees</th>
                    <th className="px-6 py-4 border text-left">Paid</th>
                    <th className="px-6 py-4 border text-left">Pending</th>
                    <th className="px-6 py-4 border text-left">Payment Mode</th>
                  </tr>
                </thead>

                <tbody className="bg-white">
  {transactions.length > 0 ? (
    transactions.map((item, index) => {
      const totalFees = Number(item.totalFees || 0);
      const totalPaid = Number(item.totalPaid || 0);
      const pendingAmount = Math.max(0, totalFees - totalPaid);

      return (
        <tr key={index} className="border-t">
          <td className="px-6 py-4 border">
            {item.installments.length > 0
              ? new Date(item.installments[0].date).toLocaleDateString()
              : "-"}
          </td>

          <td className="px-6 py-4 border">{item.name}</td>
          <td className="px-6 py-4 border">{item.std}</td>
          <td className="px-6 py-4 border">{item.div}</td>

          <td className="px-6 py-4 border">
            ₹{totalFees.toLocaleString()}
          </td>

          <td className="px-6 py-4 border">
            ₹{totalPaid.toLocaleString()}
          </td>

          <td className="px-6 py-4 border">
            ₹{pendingAmount.toLocaleString()}
          </td>

          <td className="px-6 py-4 border">
            {item.installments.length > 0
              ? item.installments[0].mode || "-"
              : "-"}
          </td>
        </tr>
      );
    })
  ) : (
  	<tr>
      <td
        colSpan="8"
        className="px-6 py-4 text-center border text-gray-500"
      >
        No transactions found.
      </td>
    </tr>
  )}
</tbody>


                </table>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default FeesCollection;