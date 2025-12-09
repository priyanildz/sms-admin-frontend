// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import SelectField from "../components/SelectField";
// import axios from "axios";

// const PaymentEntry = () => {
//   const [selectedStd, setSelectedStd] = useState("");
//   const [selectedDiv, setSelectedDiv] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [paymentEntries, setPaymentEntries] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedEntry, setSelectedEntry] = useState(null);
//   const [formData, setFormData] = useState({
//     date: "",
//     installmentType: "Partial",
//     amount: 0,
//     mode: "Online",
//   });
//   const [feesData, setFeesData] = useState({});

//   // Only fetch data when both standard and division are selected
//   useEffect(() => {
//     if (selectedStd && selectedDiv) {
//       fetchPaymentEntries();
//     } else {
//       setPaymentEntries([]); // Clear entries when filters are not complete
//     }
//   }, [selectedStd, selectedDiv, searchTerm]);

//   useEffect(() => {
//     console.log("Selected Std changed:", selectedStd);
//     if (selectedStd) {
//       fetchFeesData();
//     } else {
//       setFeesData({}); // Clear fees data when no standard is selected
//     }
//   }, [selectedStd]);

//   const fetchPaymentEntries = async () => {
//     // Only proceed if both filters are selected
//     if (!selectedStd || !selectedDiv) {
//       return;
//     }

//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/payment-entries",
//         {
//           params: { std: selectedStd, div: selectedDiv, search: searchTerm },
//           headers: {
//             "Content-Type": "application/json",
//             auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//           },
//         }
//       );
//       setPaymentEntries(response.data);
//     } catch (error) {
//       console.error("Error fetching payment entries:", error);
//     }
//   };

//   const fetchFeesData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/fees", {
//         headers: {
//           "Content-Type": "application/json",
//           auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//         },
//       });

//       let feesMap = {};
//       console.log("Raw fees data:", response.data);

//       if (Array.isArray(response.data)) {
//         feesMap = response.data.reduce((acc, fee) => {
//           acc[normalizeStd(fee.standard)] = fee.total;
//           return acc;
//         }, {});
//       } else if (response.data && typeof response.data === "object") {
//         // Handle both `{ fees: {...} }` and `{1:26000, 2:100000,...}`
//         if (response.data.fees) {
//           feesMap = response.data.fees;
//         } else {
//           Object.keys(response.data).forEach((key) => {
//             feesMap[normalizeStd(key)] = response.data[key];
//           });
//         }
//       }

//       console.log("Fees data received:", feesMap);
//       setFeesData(feesMap);
//     } catch (error) {
//       console.error("Error fetching fees data:", error);
//       setFeesData({
//         5: 30000,
//         6: 28000,
//         7: 35000,
//         8: 40000,
//       });
//     }
//   };

//   // helper
//   const normalizeStd = (std) => std.replace(/\D/g, ""); // "5th" → "5"

//   // Calculate total paid amount from installments
//   const calculatePaidAmount = (installments) => {
//     if (!installments || !Array.isArray(installments)) return 0;
//     return installments.reduce((sum, inst) => sum + (inst.amount || 0), 0);
//   };

//   // Calculate remaining amount
//   const calculateRemainingAmount = (entry) => {
//     const totalFees = feesData[normalizeStd(entry.std)] || entry.totalFees || 0;
//     const paidAmount = calculatePaidAmount(entry.installments);
//     return Math.max(0, totalFees - paidAmount);
//   };

//   // Get payment status based on amounts
//   const getPaymentStatus = (entry) => {
//     const totalFees = feesData[normalizeStd(entry.std)] || entry.totalFees || 0;
//     const paidAmount = calculatePaidAmount(entry.installments);
    
//     if (paidAmount === 0) return "Unpaid";
//     if (paidAmount >= totalFees) return "Paid";
//     return "Partial";
//   };

//   const handleNameClick = (studentName) => {
//     alert(`Clicked on ${studentName}`);
//   };

//   const handleActionClick = (entry) => {
//     const status = getPaymentStatus(entry);
    
//     if (status === "Paid") {
//       // Handle download for paid entries
//       alert(`Downloading receipt for ${entry.name}`);
//       // Alternatively, implement actual download logic here
//     } else {
//       // Open modal for unpaid/partial entries and autofill form
//       const today = new Date().toISOString().split("T")[0];
//       const remainingAmount = calculateRemainingAmount(entry);
      
//       setFormData({
//         date: today,
//         installmentType: status === "Unpaid" ? "Partial" : "Partial",
//         amount: remainingAmount || 0,
//         mode: "Online",
//       });
//       setSelectedEntry(entry);
//       setModalOpen(true);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name === "installmentType") {
//       // Auto-fill amount based on installment type
//       if (value === "Full" && selectedEntry) {
//         const remainingAmount = calculateRemainingAmount(selectedEntry);
//         setFormData((prev) => ({ 
//           ...prev, 
//           [name]: value, 
//           amount: remainingAmount 
//         }));
//       } else {
//         setFormData((prev) => ({ ...prev, [name]: value }));
//       }
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleModalSubmit = async () => {
//     if (selectedEntry && formData.date && formData.amount > 0) {
//       const remainingAmount = calculateRemainingAmount(selectedEntry);
      
//       // Validate amount doesn't exceed remaining balance
//       if (formData.amount > remainingAmount) {
//         alert(`Amount cannot exceed remaining balance of ₹${remainingAmount.toLocaleString()}`);
//         return;
//       }

//       try {
//         await axios.put(
//           `http://localhost:5000/api/update-payment-entry/${selectedEntry._id}`,
//           {
//             date: formData.date,
//             installmentType: formData.installmentType,
//             amount: formData.amount,
//             mode: formData.mode,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//             },
//           }
//         );
//         alert("Payment entry updated successfully!");
//         setModalOpen(false);
//         fetchPaymentEntries();
//       } catch (error) {
//         console.error("Error updating payment entry:", error);
//         alert("Error updating payment entry. Please try again.");
//       }
//     } else {
//       alert("Please fill in the required fields.");
//     }
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//     setSelectedEntry(null);
//     setFormData({
//       date: "",
//       installmentType: "Partial",
//       amount: 0,
//       mode: "Online",
//     });
//   };

//   // Function to render the selection prompt
//   const renderSelectionPrompt = () => {
//     if (!selectedStd && !selectedDiv) {
//       return (
//         <div className="text-center text-gray-500 py-8">
//           <p className="text-lg">Please select both Standard and Division to view payment entries.</p>
//         </div>
//       );
//     } else if (!selectedStd) {
//       return (
//         <div className="text-center text-gray-500 py-8">
//           <p className="text-lg">Please select a Standard to view payment entries.</p>
//         </div>
//       );
//     } else if (!selectedDiv) {
//       return (
//         <div className="text-center text-gray-500 py-8">
//           <p className="text-lg">Please select a Division to view payment entries.</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6 space-y-8">
//           {/* Top Bar */}
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 placeholder="Search Student"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="border px-4 py-2 rounded-l"
//                 disabled={!selectedStd || !selectedDiv} // Disable search if filters not selected
//               />
//               <div className={`text-white px-4 py-2 rounded-r cursor-pointer ${
//                 !selectedStd || !selectedDiv ? 'bg-gray-400' : 'bg-blue-500'
//               }`}>
//                 <FontAwesomeIcon icon={faSearch} />
//               </div>
//             </div>
//             <div className="flex items-center gap-6 flex-wrap">
//               <div className="flex items-center gap-2">
//                 <label className="whitespace-nowrap">Std:</label>
//                 <SelectField
//                   label=""
//                   options={[
//                     { label: "Select Standard", value: "" },
//                     { label: "1st", value: "1" },
//                     { label: "2nd", value: "2" },
//                     { label: "3rd", value: "3" },
//                     { label: "4th", value: "4" },
//                     { label: "5th", value: "5" },
//                     { label: "6th", value: "6" },
//                     { label: "7th", value: "7" },
//                     { label: "8th", value: "8" },
//                     { label: "9th", value: "9" },
//                     { label: "10th", value: "10" },
//                   ]}
//                   onChange={(e) => setSelectedStd(e.target.value)}
//                   value={selectedStd}
//                 />

//                 <SelectField
//                   label=""
//                   options={[
//                     { label: "Select Division", value: "" },
//                     { label: "A", value: "A" },
//                     { label: "B", value: "B" },
//                     { label: "C", value: "C" },
//                   ]}
//                   onChange={(e) => setSelectedDiv(e.target.value)}
//                   value={selectedDiv}
//                 />
//               </div>
//             </div>
//           </div>

//           <h2 className="text-2xl font-bold">Payment Entry</h2>

//           {/* Show fees breakdown only when standard is selected */}
//           {selectedStd && feesData[normalizeStd(selectedStd)] && (
//             <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
//               <h3 className="text-lg font-semibold text-blue-800 mb-2">
//                 Fee Structure for Standard {selectedStd}
//               </h3>
//               <p className="text-blue-700">
//                 Total Fees: ₹{feesData[normalizeStd(selectedStd)].toLocaleString()}
//               </p>
//             </div>
//           )}

//           {/* Conditional rendering based on filter selection */}
//           {!selectedStd || !selectedDiv ? (
//             renderSelectionPrompt()
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse border">
//                 <thead className="bg-blue-100 text-black">
//                   <tr>
//                     <th className="border px-4 py-2 text-left">Name</th>
//                     <th className="border px-4 py-2 text-left">Std</th>
//                     <th className="border px-4 py-2 text-left">Div</th>
//                     <th className="border px-4 py-2 text-left">Installment Dates</th>
//                     <th className="border px-4 py-2 text-left">Installment Amounts</th>
//                     <th className="border px-4 py-2 text-left">Total Fees</th>
//                     <th className="border px-4 py-2 text-left">Paid Amount</th>
//                     <th className="border px-4 py-2 text-left">Remaining</th>
//                     <th className="border px-4 py-2 text-left">Status</th>
//                     <th className="border px-4 py-2 text-left">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white">
//                   {paymentEntries.length > 0 ? (
//                     paymentEntries.map((entry, index) => {
//                       const totalFees = feesData[normalizeStd(entry.std)] || entry.totalFees || 0;
//                       const paidAmount = calculatePaidAmount(entry.installments);
//                       const remainingAmount = calculateRemainingAmount(entry);
//                       const status = getPaymentStatus(entry);
                      
//                       return (
//                         <tr
//                           key={entry._id || index}
//                           className="hover:bg-gray-50 align-top"
//                         >
//                           <td className="border px-4 py-2">
//                             <button
//                               onClick={() => handleNameClick(entry.name)}
//                               className="text-blue-600 hover:underline"
//                             >
//                               {entry.name}
//                             </button>
//                           </td>
//                           <td className="border px-4 py-2">{entry.std}</td>
//                           <td className="border px-4 py-2">{entry.div}</td>
//                           <td className="border px-4 py-2">
//                             {entry.installments && entry.installments.length > 0 ? (
//                               entry.installments.map((installment, i) => (
//                                 <div key={i} className="text-sm">
//                                   {new Date(installment.date).toLocaleDateString()}
//                                 </div>
//                               ))
//                             ) : (
//                               <span className="text-gray-400">No payments</span>
//                             )}
//                           </td>
//                           <td className="border px-4 py-2">
//                             {entry.installments && entry.installments.length > 0 ? (
//                               entry.installments.map((installment, i) => (
//                                 <div key={i} className="text-sm">
//                                   ₹{(installment.amount || 0).toLocaleString()}
//                                 </div>
//                               ))
//                             ) : (
//                               <span className="text-gray-400">₹0</span>
//                             )}
//                           </td>
//                           <td className="border px-4 py-2 font-semibold">
//                             ₹{totalFees.toLocaleString()}
//                           </td>
//                           <td className="border px-4 py-2 text-green-600 font-semibold">
//                             ₹{paidAmount.toLocaleString()}
//                           </td>
//                           <td className="border px-4 py-2 text-red-600 font-semibold">
//                             ₹{remainingAmount.toLocaleString()}
//                           </td>
//                           <td className="border px-4 py-2">
//                             <span
//                               className={`font-semibold px-2 py-1 rounded text-xs ${
//                                 status === "Paid"
//                                   ? "bg-green-100 text-green-800"
//                                   : status === "Partial"
//                                   ? "bg-yellow-100 text-yellow-800"
//                                   : "bg-red-100 text-red-800"
//                               }`}
//                             >
//                               {status}
//                             </span>
//                           </td>
//                           <td className="border px-4 py-2">
//                             <button
//                               onClick={() => handleActionClick(entry)}
//                               disabled={status === "Paid"}
//                               className={`px-3 py-1 rounded text-sm ${
//                                 status === "Paid"
//                                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                                   : "bg-blue-500 text-white hover:bg-blue-600"
//                               }`}
//                             >
//                               {status === "Paid" ? "Completed" : "Pay"}
//                             </button>
//                           </td>
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       <td colSpan="10" className="text-center text-gray-500 py-4">
//                         No students found for Standard {selectedStd} Division {selectedDiv}.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {modalOpen && selectedEntry && (
//           <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
//               <h3 className="text-xl font-bold mb-4 text-gray-800">
//                 Payment Details
//               </h3>
              
//               {/* Payment Summary */}
//               <div className="bg-gray-50 p-4 rounded-lg mb-4">
//                 <h4 className="font-semibold text-gray-800 mb-2">Payment Summary</h4>
//                 <div className="space-y-1 text-sm">
//                   <div className="flex justify-between">
//                     <span>Total Fees:</span>
//                     <span className="font-semibold">
//                       ₹{(feesData[normalizeStd(selectedEntry.std)] || selectedEntry.totalFees || 0).toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Paid Amount:</span>
//                     <span className="font-semibold text-green-600">
//                       ₹{calculatePaidAmount(selectedEntry.installments).toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="flex justify-between border-t pt-1">
//                     <span>Remaining:</span>
//                     <span className="font-semibold text-red-600">
//                       ₹{calculateRemainingAmount(selectedEntry).toLocaleString()}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <form className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Student Name
//                   </label>
//                   <input
//                     type="text"
//                     value={selectedEntry.name}
//                     readOnly
//                     className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100 text-gray-700"
//                   />
//                 </div>
//                 <div className="flex gap-4">
//                   <div className="flex-1">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Standard
//                     </label>
//                     <input
//                       type="text"
//                       value={selectedEntry.std}
//                       readOnly
//                       className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100 text-gray-700"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Division
//                     </label>
//                     <input
//                       type="text"
//                       value={selectedEntry.div}
//                       readOnly
//                       className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100 text-gray-700"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Payment Date *
//                   </label>
//                   <input
//                     type="date"
//                     name="date"
//                     value={formData.date}
//                     onChange={handleInputChange}
//                     required
//                     className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Installment Type
//                   </label>
//                   <select
//                     name="installmentType"
//                     value={formData.installmentType}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="Partial">Partial Payment</option>
//                     <option value="Full">Full Payment (Remaining Amount)</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Amount (₹) *
//                   </label>
//                   <input
//                     type="number"
//                     name="amount"
//                     value={formData.amount}
//                     onChange={handleInputChange}
//                     min="1"
//                     max={calculateRemainingAmount(selectedEntry)}
//                     step="0.01"
//                     required
//                     className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                   <p className="mt-1 text-xs text-gray-500">
//                     Maximum allowed: ₹{calculateRemainingAmount(selectedEntry).toLocaleString()}
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Payment Mode
//                   </label>
//                   <select
//                     name="mode"
//                     value={formData.mode}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="Online">Online Payment</option>
//                     <option value="Cash">Cash</option>
//                     <option value="UPI">UPI</option>
//                     <option value="Cheque">Cheque</option>
//                     <option value="Bank Transfer">Bank Transfer</option>
//                   </select>
//                 </div>
//               </form>
//               <div className="mt-6 flex justify-end gap-3">
//                 <button
//                   type="button"
//                   onClick={handleModalClose}
//                   className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleModalSubmit}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   disabled={!formData.date || formData.amount <= 0 || formData.amount > calculateRemainingAmount(selectedEntry)}
//                 >
//                   Submit Payment
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// };

// export default PaymentEntry;







// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import SelectField from "../components/SelectField";
// import axios from "axios";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// const PaymentEntry = () => {
//   const [selectedStd, setSelectedStd] = useState("");
//   const [selectedDiv, setSelectedDiv] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [paymentEntries, setPaymentEntries] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedEntry, setSelectedEntry] = useState(null);
//   const [formData, setFormData] = useState({
//     date: "",
//     installmentType: "Partial",
//     amount: 0,
//     mode: "Online",
//   });
//   const [feesData, setFeesData] = useState({});

//   // Only fetch data when both standard and division are selected
//   useEffect(() => {
//     if (selectedStd && selectedDiv) {
//       fetchPaymentEntries();
//     } else {
//       setPaymentEntries([]); // Clear entries when filters are not complete
//     }
//   }, [selectedStd, selectedDiv, searchTerm]);

//   useEffect(() => {
//     console.log("Selected Std changed:", selectedStd);
//     if (selectedStd) {
//       fetchFeesData();
//     } else {
//       setFeesData({}); // Clear fees data when no standard is selected
//     }
//   }, [selectedStd]);

//   const fetchPaymentEntries = async () => {
//     // Only proceed if both filters are selected
//     if (!selectedStd || !selectedDiv) {
//       return;
//     }

//     try {
//       // FIX 1: Using imported API_BASE_URL
//       const response = await axios.get(
//         `${API_BASE_URL}api/payment-entries`,
//         {
//           params: { std: selectedStd, div: selectedDiv, search: searchTerm },
//           headers: {
//             "Content-Type": "application/json",
//             auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//           },
//         }
//       );
//       console.log("Fetched transactions:", response.data);
//       setPaymentEntries(response.data);
//     } catch (error) {
//       console.error("Error fetching payment entries:", error);
//     }
//   };

//   const fetchFeesData = async () => {
//     try {
//       // FIX 2: Using imported API_BASE_URL
//       const response = await axios.get(`${API_BASE_URL}api/fees`, {
//         headers: {
//           "Content-Type": "application/json",
//           auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//         },
//       });

//       let feesMap = {};
//       console.log("Raw fees data:", response.data);

//       if (Array.isArray(response.data)) {
//         feesMap = response.data.reduce((acc, fee) => {
//           acc[normalizeStd(fee.standard)] = fee.total;
//           return acc;
//         }, {});
//       } else if (response.data && typeof response.data === "object") {
//         // Handle both `{ fees: {...} }` and `{1:26000, 2:100000,...}`
//         if (response.data.fees) {
//           feesMap = response.data.fees;
//         } else {
//           Object.keys(response.data).forEach((key) => {
//             feesMap[normalizeStd(key)] = response.data[key];
//           });
//         }
//       }

//       console.log("Fees data received:", feesMap);
//       setFeesData(feesMap);
//     } catch (error) {
//       console.error("Error fetching fees data:", error);
//       setFeesData({
//         5: 30000,
//         6: 28000,
//         7: 35000,
//         8: 40000,
//       });
//     }
//   };

//   // helper
//   const normalizeStd = (std) => String(std).replace(/\D/g, ""); // "5th" → "5"

//   // Calculate total paid amount from installments
//   const calculatePaidAmount = (installments) => {
//     if (!installments || !Array.isArray(installments)) return 0;
//     return installments.reduce((sum, inst) => sum + (inst.amount || 0), 0);
//   };

//   // Calculate remaining amount
//   const calculateRemainingAmount = (entry) => {
//     const totalFees = feesData[normalizeStd(entry.std)] || entry.totalFees || 0;
//     const paidAmount = calculatePaidAmount(entry.installments);
//     return Math.max(0, totalFees - paidAmount);
//   };

//   // Get payment status based on amounts
//   const getPaymentStatus = (entry) => {
//     const totalFees = feesData[normalizeStd(entry.std)] || entry.totalFees || 0;
//     const paidAmount = calculatePaidAmount(entry.installments);
//     
//     if (paidAmount === 0) return "Unpaid";
//     if (paidAmount >= totalFees) return "Paid";
//     return "Partial";
//   };

//   const handleNameClick = (studentName) => {
//     alert(`Clicked on ${studentName}`);
//   };

//   const handleActionClick = (entry) => {
//     const status = getPaymentStatus(entry);
//     
//     if (status === "Paid") {
//       // Handle download for paid entries
//       alert(`Downloading receipt for ${entry.name}`);
//       // Alternatively, implement actual download logic here
//     } else {
//       // Open modal for unpaid/partial entries and autofill form
//       const today = new Date().toISOString().split("T")[0];
//       const remainingAmount = calculateRemainingAmount(entry);
//       
//       setFormData({
//         date: today,
//         installmentType: status === "Unpaid" ? "Partial" : "Partial",
//         amount: remainingAmount || 0,
//         mode: "Online",
//       });
//       setSelectedEntry(entry);
//       setModalOpen(true);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     
//     if (name === "installmentType") {
//       // Auto-fill amount based on installment type
//       if (value === "Full" && selectedEntry) {
//         const remainingAmount = calculateRemainingAmount(selectedEntry);
//         setFormData((prev) => ({ 
//           ...prev, 
//           [name]: value, 
//           amount: remainingAmount 
//         }));
//       } else {
//         setFormData((prev) => ({ ...prev, [name]: value }));
//       }
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleModalSubmit = async () => {
//     if (selectedEntry && formData.date && formData.amount > 0) {
//       const remainingAmount = calculateRemainingAmount(selectedEntry);
//       
//       // Validate amount doesn't exceed remaining balance
//       if (formData.amount > remainingAmount) {
//         alert(`Amount cannot exceed remaining balance of ₹${remainingAmount.toLocaleString()}`);
//         return;
//       }

//       try {
//         // FIX 3: Using imported API_BASE_URL
//         await axios.put(
//           `${API_BASE_URL}api/update-payment-entry/${selectedEntry._id}`,
//           {
//             date: formData.date,
//             installmentType: formData.installmentType,
//             amount: formData.amount,
//             mode: formData.mode,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//             },
//           }
//         );
//         alert("Payment entry updated successfully!");
//         setModalOpen(false);
//         fetchPaymentEntries();
//       } catch (error) {
//         console.error("Error updating payment entry:", error);
//         alert("Error updating payment entry. Please try again.");
//       }
//     } else {
//       alert("Please fill in the required fields.");
//     }
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//     setSelectedEntry(null);
//     setFormData({
//       date: "",
//       installmentType: "Partial",
//       amount: 0,
//       mode: "Online",
//     });
//   };

//   // Function to render the selection prompt
//   const renderSelectionPrompt = () => {
//     if (!selectedStd && !selectedDiv) {
//       return (
//         <div className="text-center text-gray-500 py-8">
//           <p className="text-lg">Please select both Standard and Division to view payment entries.</p>
//         </div>
//       );
//     } else if (!selectedStd) {
//       return (
//         <div className="text-center text-gray-500 py-8">
//           <p className="text-lg">Please select a Standard to view payment entries.</p>
//         </div>
//       );
//     } else if (!selectedDiv) {
//       return (
//         <div className="text-center text-gray-500 py-8">
//           <p className="text-lg">Please select a Division to view payment entries.</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6 space-y-8">
//           {/* Top Bar */}
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 placeholder="Search Student"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="border px-4 py-2 rounded-l"
//                 disabled={!selectedStd || !selectedDiv} // Disable search if filters not selected
//               />
//               <div className={`text-white px-4 py-2 rounded-r cursor-pointer ${
//                 !selectedStd || !selectedDiv ? 'bg-gray-400' : 'bg-blue-500'
//               }`}>
//                 <FontAwesomeIcon icon={faSearch} />
//               </div>
//             </div>
//             <div className="flex items-center gap-6 flex-wrap">
//               <div className="flex items-center gap-2">
//                 <label className="whitespace-nowrap">Std:</label>
//                 <SelectField
//                   label=""
//                   options={[
//                     { label: "Select Standard", value: "" },
//                     { label: "1st", value: "1" },
//                     { label: "2nd", value: "2" },
//                     { label: "3rd", value: "3" },
//                     { label: "4th", value: "4" },
//                     { label: "5th", value: "5" },
//                     { label: "6th", value: "6" },
//                     { label: "7th", value: "7" },
//                     { label: "8th", value: "8" },
//                     { label: "9th", value: "9" },
//                     { label: "10th", value: "10" },
//                   ]}
//                   onChange={(e) => setSelectedStd(e.target.value)}
//                   value={selectedStd}
//                 />

//                 <SelectField
//                   label=""
//                   options={[
//                     { label: "Select Division", value: "" },
//                     { label: "A", value: "A" },
//                     { label: "B", value: "B" },
//                     { label: "C", value: "C" },
//                   ]}
//                   onChange={(e) => setSelectedDiv(e.target.value)}
//                   value={selectedDiv}
//                 />
//               </div>
//             </div>
//           </div>

//           <h2 className="text-2xl font-bold">Payment Entry</h2>

//           {/* Show fees breakdown only when standard is selected */}
//           {selectedStd && feesData[normalizeStd(selectedStd)] && (
//             <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
//               <h3 className="text-lg font-semibold text-blue-800 mb-2">
//                 Fee Structure for Standard {selectedStd}
//               </h3>
//               <p className="text-blue-700">
//                 Total Fees: ₹{feesData[normalizeStd(selectedStd)].toLocaleString()}
//               </p>
//             </div>
//           )}

//           {/* Conditional rendering based on filter selection */}
//           {!selectedStd || !selectedDiv ? (
//             renderSelectionPrompt()
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse border">
//                 <thead className="bg-blue-100 text-black">
//                   <tr>
//                     <th className="border px-4 py-2 text-left">Name</th>
//                     <th className="border px-4 py-2 text-left">Std</th>
//                     <th className="border px-4 py-2 text-left">Div</th>
//                     <th className="border px-4 py-2 text-left">Installment Dates</th>
//                     <th className="border px-4 py-2 text-left">Installment Amounts</th>
//                     <th className="border px-4 py-2 text-left">Total Fees</th>
//                     <th className="border px-4 py-2 text-left">Paid Amount</th>
//                     <th className="border px-4 py-2 text-left">Remaining</th>
//                     <th className="border px-4 py-2 text-left">Status</th>
//                     <th className="border px-4 py-2 text-left">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white">
//                   {paymentEntries.length > 0 ? (
//                     paymentEntries.map((entry, index) => {
//                       const totalFees = feesData[normalizeStd(entry.std)] || entry.totalFees || 0;
//                       const paidAmount = calculatePaidAmount(entry.installments);
//                       const remainingAmount = calculateRemainingAmount(entry);
//                       const status = getPaymentStatus(entry);
//                       
//                       return (
//                         <tr
//                           key={entry._id || index}
//                           className="hover:bg-gray-50 align-top"
//                         >
//                           <td className="border px-4 py-2">
//                             <button
//                               onClick={() => handleNameClick(entry.name)}
//                               className="text-blue-600 hover:underline"
//                             >
//                               {entry.name}
//                             </button>
//                           </td>
//                           <td className="border px-4 py-2">{entry.std}</td>
//                           <td className="border px-4 py-2">{entry.div}</td>
//                           <td className="border px-4 py-2">
//                             {entry.installments && entry.installments.length > 0 ? (
//                               entry.installments.map((installment, i) => (
//                                 <div key={i} className="text-sm">
//                                   {new Date(installment.date).toLocaleDateString()}
//                                 </div>
//                               ))
//                             ) : (
//                               <span className="text-gray-400">No payments</span>
//                             )}
//                           </td>
//                           <td className="border px-4 py-2">
//                             {entry.installments && entry.installments.length > 0 ? (
//                               entry.installments.map((installment, i) => (
//                                 <div key={i} className="text-sm">
//                                   ₹{(installment.amount || 0).toLocaleString()}
//                                 </div>
//                               ))
//                             ) : (
//                               <span className="text-gray-400">₹0</span>
//                             )}
//                           </td>
//                           <td className="border px-4 py-2 font-semibold">
//                             ₹{totalFees.toLocaleString()}
//                           </td>
//                           <td className="border px-4 py-2 text-green-600 font-semibold">
//                             ₹{paidAmount.toLocaleString()}
//                           </td>
//                           <td className="border px-4 py-2 text-red-600 font-semibold">
//                             ₹{remainingAmount.toLocaleString()}
//                           </td>
//                           <td className="border px-4 py-2">
//                             <span
//                               className={`font-semibold px-2 py-1 rounded text-xs ${
//                                 status === "Paid"
//                                   ? "bg-green-100 text-green-800"
//                                   : status === "Partial"
//                                   ? "bg-yellow-100 text-yellow-800"
//                                   : "bg-red-100 text-red-800"
//                               }`}
//                             >
//                               {status}
//                             </span>
//                           </td>
//                           <td className="border px-4 py-2">
//                             <button
//                               onClick={() => handleActionClick(entry)}
//                               disabled={status === "Paid"}
//                               className={`px-3 py-1 rounded text-sm ${
//                                 status === "Paid"
//                                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                                   : "bg-blue-500 text-white hover:bg-blue-600"
//                               }`}
//                             >
//                               {status === "Paid" ? "Completed" : "Pay"}
//                             </button>
//                           </td>
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       <td colSpan="10" className="text-center text-gray-500 py-4">
//                         No students found for Standard {selectedStd} Division {selectedDiv}.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {modalOpen && selectedEntry && (
//           <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
//               <h3 className="text-xl font-bold mb-4 text-gray-800">
//                 Payment Details
//               </h3>
//               
//               {/* Payment Summary */}
//               <div className="bg-gray-50 p-4 rounded-lg mb-4">
//                 <h4 className="font-semibold text-gray-800 mb-2">Payment Summary</h4>
//                 <div className="space-y-1 text-sm">
//                   <div className="flex justify-between">
//                     <span>Total Fees:</span>
//                     <span className="font-semibold">
//                       ₹{(feesData[normalizeStd(selectedEntry.std)] || selectedEntry.totalFees || 0).toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Paid Amount:</span>
//                     <span className="font-semibold text-green-600">
//                       ₹{calculatePaidAmount(selectedEntry.installments).toLocaleString()}
//                     </span>
//                   </div>
//                   <div className="flex justify-between border-t pt-1">
//                     <span>Remaining:</span>
//                     <span className="font-semibold text-red-600">
//                       ₹{calculateRemainingAmount(selectedEntry).toLocaleString()}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <form className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Student Name
//                   </label>
//                   <input
//                     type="text"
//                     value={selectedEntry.name}
//                     readOnly
//                     className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100 text-gray-700"
//                   />
//                 </div>
//                 <div className="flex gap-4">
//                   <div className="flex-1">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Standard
//                     </label>
//                     <input
//                       type="text"
//                       value={selectedEntry.std}
//                       readOnly
//                       className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100 text-gray-700"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <label className="block text-sm font-medium text-gray-700">
//                       Division
//                     </label>
//                     <input
//                       type="text"
//                       value={selectedEntry.div}
//                       readOnly
//                       className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100 text-gray-700"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Payment Date *
//                   </label>
//                   <input
//                     type="date"
//                     name="date"
//                     value={formData.date}
//                     onChange={handleInputChange}
//                     required
//                     className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Installment Type
//                   </label>
//                   <select
//                     name="installmentType"
//                     value={formData.installmentType}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="Partial">Partial Payment</option>
//                     <option value="Full">Full Payment (Remaining Amount)</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Amount (₹) *
//                   </label>
//                   <input
//                     type="number"
//                     name="amount"
//                     value={formData.amount}
//                     onChange={handleInputChange}
//                     min="1"
//                     max={calculateRemainingAmount(selectedEntry)}
//                     step="0.01"
//                     required
//                     className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                   <p className="mt-1 text-xs text-gray-500">
//                     Maximum allowed: ₹{calculateRemainingAmount(selectedEntry).toLocaleString()}
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Payment Mode
//                   </label>
//                   <select
//                     name="mode"
//                     value={formData.mode}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="Online">Online Payment</option>
//                     <option value="Cash">Cash</option>
//                     <option value="UPI">UPI</option>
//                     <option value="Cheque">Cheque</option>
//                     <option value="Bank Transfer">Bank Transfer</option>
//                   </select>
//                 </div>
//               </form>
//               <div className="mt-6 flex justify-end gap-3">
//                 <button
//                   type="button"
//                   onClick={handleModalClose}
//                   className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleModalSubmit}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   disabled={!formData.date || formData.amount <= 0 || formData.amount > calculateRemainingAmount(selectedEntry)}
//                 >
//                   Submit Payment
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// };

// export default PaymentEntry;







// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // Assuming this SelectField component is defined elsewhere and works correctly
// // import SelectField from "../components/SelectField"; 
// import axios from "axios";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// // Re-defining SelectField locally since its import path is outside this file
// const SelectField = ({ label, name, options, value, onChange }) => {
//     return (
//         <div>
//             {label && (
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                     {label}
//                 </label>
//             )}
//             <select
//                 name={name}
//                 value={value || ""}
//                 onChange={onChange}
//                 className="border px-3 py-2 rounded w-full"
//             >
//                 {options.map((option, index) => (
//                     <option key={index} value={option.value || option}>
//                         {option.label || option}
//                     </option>
//                 ))}
//             </select>
//         </div>
//     );
// };

// // Standard options including Pre-Primary
// const standardOptions = [
//     { label: "Select Standard", value: "" },
//     { label: "Nursery", value: "Nursery" },
//     { label: "Junior KG", value: "Junior" },
//     { label: "Senior KG", value: "Senior" },
//     { label: "1", value: "1" },
//     { label: "2", value: "2" },
//     { label: "3", value: "3" },
//     { label: "4", value: "4" },
//     { label: "5", value: "5" },
//     { label: "6", value: "6" },
//     { label: "7", value: "7" },
//     { label: "8", value: "8" },
//     { label: "9", value: "9" },
//     { label: "10", value: "10" },
// ];

// const divisionOptions = [
//     { label: "Select Division", value: "" },
//     { label: "A", value: "A" },
//     { label: "B", value: "B" },
//     { label: "C", value: "C" },
// ];


// const PaymentEntry = () => {
//   const [selectedStd, setSelectedStd] = useState("");
//   const [selectedDiv, setSelectedDiv] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [paymentEntries, setPaymentEntries] = useState([]); 
//   const [studentFeeList, setStudentFeeList] = useState([]); 
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedEntry, setSelectedEntry] = useState(null);
//   const [formData, setFormData] = useState({
//     date: "",
//     installmentType: "Partial",
//     amount: 0,
//     mode: "Online",
//   });
//   const [feesData, setFeesData] = useState({}); 
//   const [isLoading, setIsLoading] = useState(false); 

//   const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

//   const normalizeStd = (std) => {
//         if (!std) return '';
//         if (["Nursery", "Junior", "Senior"].includes(std)) {
//             return std;
//         }
//         const num = String(std).replace(/\D/g, ""); 
//         return num || std; 
//     }

//     // Fetch ALL Fees Data
//     const fetchFeesData = async () => {
//         try {
//             const response = await axios.get(`${API_BASE_URL}api/fees`, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     auth: AUTH_HEADER,
//                 },
//             });

//             let feesMap = {};
//             if (Array.isArray(response.data)) {
//                 feesMap = response.data.reduce((acc, fee) => {
//                     acc[normalizeStd(fee.standard)] = fee.annualfee;
//                     return acc;
//                 }, {});
//             }
//             setFeesData(feesMap);
//         } catch (error) {
//             console.error("Error fetching fees data:", error);
//             setFeesData({});
//         }
//     };

//     // 1. Initial/On-Change Fetch: Fetch All Fee Structures on mount
//     useEffect(() => {
//         fetchFeesData();
//     }, []); 

//     // 2. Data Fetch: Trigger student list update whenever filters or fee data changes
//     useEffect(() => {
//         // Only fetch student data if the fee structure data has been initialized
//         if (feesData !== null) { 
//             fetchStudentFeeData();
//         }
//     }, [selectedStd, selectedDiv, searchTerm, feesData]);


//     const fetchStudentFeeData = async () => {
//         setIsLoading(true); 
//         
//         // --- 1. Student Query Parameters (for filtering students by Std/Div/Search) ---
//         const studentQueryParams = {};
//         if (selectedStd) studentQueryParams.std = selectedStd;
//         if (selectedDiv) studentQueryParams.div = selectedDiv;
//         if (searchTerm) studentQueryParams.search = searchTerm;
//         
//         // --- 2. Payment Entry Query Parameters (Payments are filtered by Std/Div) ---
//         const paymentQueryParams = {};
//         if (selectedStd) paymentQueryParams.std = normalizeStd(selectedStd);
//         if (selectedDiv) paymentQueryParams.div = selectedDiv;
//         
//         try {
//             // --- A. Fetch Students (Filtered by Student Query Params) ---
//             const studentsResponse = await axios.get(`${API_BASE_URL}api/students`, {
//                 params: studentQueryParams,
//                 headers: { auth: AUTH_HEADER },
//             });

//             const students = studentsResponse.data;

//             // --- B. Fetch Payment Entries for the current standard/division context ---
//             let rawPaymentEntries = [];
//             
//             // Fetch ALL payments if no standard is selected, to map against ALL students
//             // Since this can be huge, we only filter payments if std is provided, 
//             // otherwise, we assume payment entries must be matched by student name anyway.
//             // If the backend /payment-entries endpoint supports fetching all payments 
//             // without filters (which it should), we rely on that.
//             if (Object.keys(paymentQueryParams).length > 0 || !selectedStd) { 
//                 const paymentResponse = await axios.get(`${API_BASE_URL}api/payment-entries`, {
//                     params: paymentQueryParams,
//                     headers: { auth: AUTH_HEADER },
//                 });
//                 rawPaymentEntries = paymentResponse.data;
//             } else {
//                 rawPaymentEntries = [];
//             }
//             
//             setPaymentEntries(rawPaymentEntries); 

//             // Create a map of payments for quick lookup by student name
//             const paymentMap = rawPaymentEntries.reduce((acc, entry) => {
//                 acc[entry.name] = entry; 
//                 return acc;
//             }, {});


//             // --- C. Merge Data ---
//             const mergedList = students.map(student => {
//                 const studentName = `${student.firstname} ${student.lastname}`;
//                 const studentStdKey = normalizeStd(student.admission.admissionstd);
//                 
//                 const payment = paymentMap[studentName] || { installments: [], totalFees: 0, status: "Unpaid" };
//                 
//                 const annualFeeDue = feesData[studentStdKey] || 0;
//                 
//                 const paidAmount = calculatePaidAmount(payment.installments);
//                 
//                 return {
//                     _id: student._id,
//                     name: studentName,
//                     std: student.admission.admissionstd,
//                     div: student.admission.admissiondivision,
//                     installments: payment.installments,
//                     totalFeesDue: annualFeeDue, 
//                     totalPaid: paidAmount,
//                     remaining: Math.max(0, annualFeeDue - paidAmount),
//                     status: getPaymentStatus({ paidAmount, totalFeesDue: annualFeeDue }),
//                 };
//             });

//             setStudentFeeList(mergedList);

//         } catch (error) {
//             console.error("Error fetching student/fee data:", error);
//             setStudentFeeList([]);
//         } finally {
//             setIsLoading(false); 
//         }
//     };


//     const calculatePaidAmount = (installments) => {
//         if (!installments || !Array.isArray(installments)) return 0;
//         return installments.reduce((sum, inst) => sum + (inst.amount || 0), 0);
//     };

//     const calculateRemainingAmount = (entry) => {
//         return Math.max(0, (entry.totalFeesDue || 0) - (entry.totalPaid || 0));
//     };

//     const getPaymentStatus = (entry) => {
//         const totalFees = entry.totalFeesDue || 0;
//         const paidAmount = entry.totalPaid || 0;
//         
//         if (totalFees === 0) return "N/A";
//         
//         if (paidAmount === 0) return "Unpaid";
//         if (paidAmount >= totalFees) return "Paid";
//         return "Partial";
//     };

//     const handleNameClick = (studentName) => {
//         alert(`Showing student profile for ${studentName}`);
//     };

//     const handleActionClick = (entry) => {
//         const currentEntry = studentFeeList.find(e => e._id === entry._id) || entry;
//         const status = getPaymentStatus(currentEntry);
//         
//         if (status === "Paid") {
//             alert(`Downloading receipt for ${currentEntry.name}`);
//         } else if (status === "N/A") {
//              alert(`Cannot process payment: Fee structure for Standard ${currentEntry.std} not found.`);
//         } else {
//             const today = new Date().toISOString().split("T")[0];
//             const remainingAmount = calculateRemainingAmount(currentEntry);
//             
//             setFormData({
//                 date: today,
//                 installmentType: remainingAmount > 0 ? "Partial" : "Full",
//                 amount: remainingAmount || 0,
//                 mode: "Online",
//             });
//             setSelectedEntry(currentEntry);
//             setModalOpen(true);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         const currentRemaining = calculateRemainingAmount(selectedEntry);
//         
//         if (name === "installmentType") {
//             if (value === "Full" && selectedEntry) {
//                 setFormData((prev) => ({ 
//                     ...prev, 
//                     [name]: value, 
//                     amount: currentRemaining 
//                 }));
//             } else {
//                 setFormData((prev) => ({ ...prev, [name]: value }));
//             }
//         } else {
//             setFormData((prev) => ({ ...prev, [name]: value }));
//         }
//     };

//     const handleModalSubmit = async () => {
//         if (!selectedEntry || !formData.date || formData.amount <= 0) {
//             alert("Please fill in the required fields with a valid amount.");
//             return;
//         }
//         
//         const remainingAmount = calculateRemainingAmount(selectedEntry);
//         
//         if (formData.amount > remainingAmount) {
//             alert(`Amount cannot exceed remaining balance of ₹${remainingAmount.toLocaleString()}`);
//             return;
//         }

//         const existingPaymentEntry = paymentEntries.find(e => e.name === selectedEntry.name);
//         const paymentEntryId = existingPaymentEntry?._id;
//         
//         const apiEndpoint = paymentEntryId
//             ? `${API_BASE_URL}api/update-payment-entry/${paymentEntryId}`
//             : `${API_BASE_URL}api/add-payment-entry`;
//         
//         const method = paymentEntryId ? 'put' : 'post';

//         const payload = {
//             date: formData.date,
//             amount: Number(formData.amount),
//             mode: formData.mode,
//             ...(method === 'post' && { 
//                 name: selectedEntry.name,
//                 std: selectedEntry.std,
//                 div: selectedEntry.div,
//                 totalFees: selectedEntry.totalFeesDue 
//             }),
//         };


//         try {
//             await axios({
//                 method: method,
//                 url: apiEndpoint,
//                 data: payload,
//                 headers: {
//                     "Content-Type": "application/json",
//                     auth: AUTH_HEADER,
//                 },
//             });
//             alert("Payment entry updated successfully!");
//             handleModalClose();
//             fetchStudentFeeData(); // Refresh the combined list
//         } catch (error) {
//             console.error(`Error ${method}ting payment entry:`, error);
//             alert("Error processing payment. Please try again.");
//         }
//     };

//     const handleModalClose = () => {
//         setModalOpen(false);
//         setSelectedEntry(null);
//         setFormData({
//             date: "",
//             installmentType: "Partial",
//             amount: 0,
//             mode: "Online",
//         });
//     };

//     // Render logic to show data or prompts
//     const renderContent = () => {
//         if (isLoading) {
//             return (
//                 <div className="text-center text-gray-500 py-8">
//                     <p className="text-lg">Loading student and fee data...</p>
//                 </div>
//             );
//         }
//         
//         const filtersAreEmpty = !selectedStd && !selectedDiv && !searchTerm;

//         if (studentFeeList.length === 0) {
//             if (filtersAreEmpty) {
//                 // Show prompt if no filters are applied and no data has loaded yet
//                 return (
//                     <div className="text-center text-gray-500 py-8">
//                         <p className="text-lg">
//                             Please select a Standard and Division, or enter a Search Term to view all students.
//                         </p>
//                     </div>
//                 );
//             } else {
//                 // Filters or search term set, but no results found
//                 return (
//                     <div className="text-center text-gray-500 py-8">
//                         <p className="text-lg">No students found matching the current filters.</p>
//                     </div>
//                 );
//             }
//         }

//         // Students found (either all or filtered)
//         return renderTable();
//     };

//     const renderTable = () => (
//         <div className="overflow-x-auto">
//             <table className="w-full border-collapse border">
//                 <thead className="bg-blue-100 text-black">
//                     <tr>
//                         <th className="border px-4 py-2 text-left">Name</th>
//                         <th className="border px-4 py-2 text-left">Std</th>
//                         <th className="border px-4 py-2 text-left">Div</th>
//                         <th className="border px-4 py-2 text-left">Installment Dates</th>
//                         <th className="border px-4 py-2 text-left">Installment Amounts</th>
//                         <th className="border px-4 py-2 text-left">Total Fees Due</th>
//                         <th className="border px-4 py-2 text-left">Paid Amount</th>
//                         <th className="border px-4 py-2 text-left">Remaining</th>
//                         <th className="border px-4 py-2 text-left">Status</th>
//                         <th className="border px-4 py-2 text-left">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody className="bg-white">
//                     {studentFeeList.map((entry, index) => {
//                         const status = getPaymentStatus(entry);
//                         
//                         return (
//                             <tr
//                                 key={entry._id || index}
//                                 className="hover:bg-gray-50 align-top"
//                             >
//                                 <td className="border px-4 py-2">
//                                     <button
//                                         onClick={() => handleNameClick(entry.name)}
//                                         className="text-blue-600 hover:underline"
//                                     >
//                                         {entry.name}
//                                     </button>
//                                 </td>
//                                 <td className="border px-4 py-2">{entry.std}</td>
//                                 <td className="border px-4 py-2">{entry.div}</td>
//                                 <td className="border px-4 py-2">
//                                     {entry.installments && entry.installments.length > 0 ? (
//                                         entry.installments.map((installment, i) => (
//                                             <div key={i} className="text-sm">
//                                                 {new Date(installment.date).toLocaleDateString()}
//                                             </div>
//                                         ))
//                                     ) : (
//                                         <span className="text-gray-400">N/A</span>
//                                     )}
//                                 </td>
//                                 <td className="border px-4 py-2">
//                                     {entry.installments && entry.installments.length > 0 ? (
//                                         entry.installments.map((installment, i) => (
//                                             <div key={i} className="text-sm">
//                                                 ₹{(installment.amount || 0).toLocaleString()}
//                                             </div>
//                                         ))
//                                     ) : (
//                                         <span className="text-gray-400">₹0</span>
//                                     )}
//                                 </td>
//                                 <td className="border px-4 py-2 font-semibold">
//                                     ₹{entry.totalFeesDue.toLocaleString()}
//                                 </td>
//                                 <td className="border px-4 py-2 text-green-600 font-semibold">
//                                     ₹{entry.totalPaid.toLocaleString()}
//                                 </td>
//                                 <td className="border px-4 py-2 text-red-600 font-semibold">
//                                     ₹{entry.remaining.toLocaleString()}
//                                 </td>
//                                 <td className="border px-4 py-2">
//                                     <span
//                                         className={`font-semibold px-2 py-1 rounded text-xs ${
//                                             status === "Paid"
//                                                 ? "bg-green-100 text-green-800"
//                                                 : status === "Partial"
//                                                 ? "bg-yellow-100 text-yellow-800"
//                                                 : status === "N/A"
//                                                 ? "bg-gray-100 text-gray-800"
//                                                 : "bg-red-100 text-red-800"
//                                         }`}
//                                     >
//                                         {status}
//                                     </span>
//                                 </td>
//                                 <td className="border px-4 py-2">
//                                     {status === "Paid" ? (
//                                         <button
//                                             onClick={() => handleActionClick(entry)}
//                                             className="px-3 py-1 rounded text-sm bg-green-500 text-white hover:bg-green-600"
//                                         >
//                                             Download
//                                         </button>
//                                     ) : status === "N/A" ? (
//                                         <span className="text-sm text-gray-500">N/A</span>
//                                     ) : (
//                                         <button
//                                             onClick={() => handleActionClick(entry)}
//                                             className="px-3 py-1 rounded text-sm bg-blue-500 text-white hover:bg-blue-600"
//                                         >
//                                             Pay
//                                         </button>
//                                     )}
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>
//         </div>
//     );


//     return (
//         <MainLayout>
//             <div className="bg-white rounded-2xl shadow p-6">
//                 <div className="p-6 space-y-8">
//                     {/* Top Bar */}
//                     <div className="flex flex-wrap items-center justify-between gap-4">
//                         <div className="flex items-center">
//                             <input
//                                 type="text"
//                                 placeholder="Search Student"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="border px-4 py-2 rounded-l"
//                             />
//                             <div className={`text-white px-4 py-2 rounded-r cursor-pointer bg-blue-500`}>
//                                 <FontAwesomeIcon icon={faSearch} />
//                             </div>
//                         </div>
//                         <div className="flex items-center gap-6 flex-wrap">
//                             <div className="flex items-center gap-2">
//                                 <label className="whitespace-nowrap">Std:</label>
//                                 <SelectField
//                                     label=""
//                                     options={standardOptions} 
//                                     onChange={(e) => setSelectedStd(e.target.value)}
//                                     value={selectedStd}
//                                 />

//                                 <SelectField
//                                     label=""
//                                     options={divisionOptions}
//                                     onChange={(e) => setSelectedDiv(e.target.value)}
//                                     value={selectedDiv}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <h2 className="text-2xl font-bold">Payment Entry</h2>

//                     {/* Show fees breakdown only when standard is selected and fee data is available */}
//                     {selectedStd && feesData[normalizeStd(selectedStd)] > 0 && (
//                         <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
//                             <h3 className="text-lg font-semibold text-blue-800 mb-2">
//                                 Fee Structure for Standard {selectedStd}
//                             </h3>
//                             <p className="text-blue-700">
//                                 Total Annual Fees Due: ₹{feesData[normalizeStd(selectedStd)].toLocaleString()}
//                             </p>
//                         </div>
//                     )}

//                     {/* Conditional rendering based on filter selection/loading */}
//                     {renderContent()}

//                 </div>

//                 {/* Modal */}
//                 {modalOpen && selectedEntry && (
//                     <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
//                         <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
//                             {/* FIX 5: Added max-h-screen-75 and overflow-y-auto to enable scrolling */}
//                             <div className="max-h-[75vh] overflow-y-auto pr-2"> 
//                             <h3 className="text-xl font-bold mb-4 text-gray-800">
//                                 Payment Details
//                             </h3>
//                             
//                             {/* Payment Summary */}
//                             <div className="bg-gray-50 p-4 rounded-lg mb-4">
//                                 <h4 className="font-semibold text-gray-800 mb-2">Payment Summary</h4>
//                                 <div className="space-y-1 text-sm">
//                                     <div className="flex justify-between">
//                                         <span>Total Fees:</span>
//                                         <span className="font-semibold">
//                                             ₹{selectedEntry.totalFeesDue.toLocaleString()}
//                                         </span>
//                                     </div>
//                                     <div className="flex justify-between">
//                                         <span>Paid Amount:</span>
//                                         <span className="font-semibold text-green-600">
//                                             ₹{selectedEntry.totalPaid.toLocaleString()}
//                                         </span>
//                                     </div>
//                                     <div className="flex justify-between border-t pt-1">
//                                         <span>Remaining:</span>
//                                         <span className="font-semibold text-red-600">
//                                             ₹{selectedEntry.remaining.toLocaleString()}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>

//                             <form className="space-y-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">
//                                         Student Name
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={selectedEntry.name}
//                                         readOnly
//                                         className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100 text-gray-700"
//                                     />
//                                 </div>
//                                 <div className="flex gap-4">
//                                     <div className="flex-1">
//                                         <label className="block text-sm font-medium text-gray-700">
//                                             Standard
//                                         </label>
//                                         <input
//                                             type="text"
//                                             value={selectedEntry.std}
//                                             readOnly
//                                             className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100 text-gray-700"
//                                         />
//                                     </div>
//                                     <div className="flex-1">
//                                         <label className="block text-sm font-medium text-gray-700">
//                                             Division
//                                         </label>
//                                         <input
//                                             type="text"
//                                             value={selectedEntry.div}
//                                             readOnly
//                                             className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100 text-gray-700"
//                                         />
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">
//                                         Payment Date *
//                                     </label>
//                                     <input
//                                         type="date"
//                                         name="date"
//                                         value={formData.date}
//                                         onChange={handleInputChange}
//                                         required
//                                         className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">
//                                         Installment Type
//                                     </label>
//                                     <select
//                                         name="installmentType"
//                                         value={formData.installmentType}
//                                         onChange={handleInputChange}
//                                         className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                     >
//                                         <option value="Partial">Partial Payment</option>
//                                         <option value="Full">Full Payment (Remaining Amount)</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">
//                                         Amount (₹) *
//                                     </label>
//                                     <input
//                                         type="number"
//                                         name="amount"
//                                         value={formData.amount}
//                                         onChange={handleInputChange}
//                                         min="1"
//                                         max={selectedEntry.remaining}
//                                         step="0.01"
//                                         required
//                                         className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                     />
//                                     <p className="mt-1 text-xs text-gray-500">
//                                         Maximum allowed: ₹{selectedEntry.remaining.toLocaleString()}
//                                     </p>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">
//                                         Payment Mode
//                                     </label>
//                                     <select
//                                         name="mode"
//                                         value={formData.mode}
//                                         onChange={handleInputChange}
//                                         className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                     >
//                                         <option value="Online">Online Payment</option>
//                                         <option value="Cash">Cash</option>
//                                         <option value="UPI">UPI</option>
//                                         <option value="Cheque">Cheque</option>
//                                         <option value="Bank Transfer">Bank Transfer</option>
//                                     </select>
//                                 </div>
//                             </form>
//                             </div> {/* End scrollable area */}

//                             <div className="mt-6 flex justify-end gap-3">
//                                 <button
//                                     type="button"
//                                     onClick={handleModalClose}
//                                     className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={handleModalSubmit}
//                                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                                     disabled={!formData.date || formData.amount <= 0 || formData.amount > selectedEntry.remaining}
//                                 >
//                                     Submit Payment
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </MainLayout>
//     );
// };

// export default PaymentEntry;










// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // Assuming this SelectField component is defined elsewhere and works correctly
// // import SelectField from "../components/SelectField"; 
// import axios from "axios";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// // Re-defining SelectField locally since its import path is outside this file
// const SelectField = ({ label, name, options, value, onChange }) => {
//     return (
//         <div>
//             {label && (
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                     {label}
//                 </label>
//             )}
//             <select
//                 name={name}
//                 value={value || ""}
//                 onChange={onChange}
//                 className="border px-3 py-2 rounded w-full"
//             >
//                 {options.map((option, index) => (
//                     <option key={index} value={option.value || option}>
//                         {option.label || option}
//                     </option>
//                 ))}
//             </select>
//         </div>
//     );
// };

// // Standard options including Pre-Primary
// const standardOptions = [
//     { label: "Select Standard", value: "" },
//     { label: "Nursery", value: "Nursery" },
//     { label: "Junior KG", value: "Junior" },
//     { label: "Senior KG", value: "Senior" },
//     { label: "1", value: "1" },
//     { label: "2", value: "2" },
//     { label: "3", value: "3" },
//     { label: "4", value: "4" },
//     { label: "5", value: "5" },
//     { label: "6", value: "6" },
//     { label: "7", value: "7" },
//     { label: "8", value: "8" },
//     { label: "9", value: "9" },
//     { label: "10", value: "10" },
// ];

// const divisionOptions = [
//     { label: "Select Division", value: "" },
//     { label: "A", value: "A" },
//     { label: "B", value: "B" },
//     { label: "C", value: "C" },
// ];

// // FIX: Payment Modes based on the provided dashboard image legend
// const paymentModeOptions = [
//     { label: "Online Payment", value: "Online" },
//     { label: "Cash", value: "Cash" },
//     { label: "Bank Transfer", value: "Bank Transfer" },
//     { label: "Internet Banking", value: "Internet Banking" },
//     { label: "Cheques", value: "Cheques" },
// ];


// const PaymentEntry = () => {
//     // FIX 1: Read initial values from URL query parameters
//     const query = new URLSearchParams(window.location.search);
    
//     const [selectedStd, setSelectedStd] = useState(query.get('std') || "");
//     const [selectedDiv, setSelectedDiv] = useState(query.get('div') || "");
//     const [searchTerm, setSearchTerm] = useState(query.get('search') || "");
    
//     const [paymentEntries, setPaymentEntries] = useState([]); 
//     const [studentFeeList, setStudentFeeList] = useState([]); 
//     const [modalOpen, setModalOpen] = useState(false);
//     const [selectedEntry, setSelectedEntry] = useState(null);
//     const [formData, setFormData] = useState({
//         date: "",
//         installmentType: "Partial",
//         amount: 0,
//         mode: "Cash", // Default to Cash, one of the new options
//     });
//     const [feesData, setFeesData] = useState({}); 
//     const [isLoading, setIsLoading] = useState(false); 

//   const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

//   const normalizeStd = (std) => {
//         if (!std) return '';
//         if (["Nursery", "Junior", "Senior"].includes(std)) {
//             return std;
//         }
//         const num = String(std).replace(/\D/g, ""); 
//         return num || std; 
//     }

//     // Fetch ALL Fees Data
//     const fetchFeesData = async () => {
//         try {
//             const response = await axios.get(`${API_BASE_URL}api/fees`, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     auth: AUTH_HEADER,
//                 },
//             });

//             let feesMap = {};
//             if (Array.isArray(response.data)) {
//                 feesMap = response.data.reduce((acc, fee) => {
//                     acc[normalizeStd(fee.standard)] = fee.annualfee;
//                     return acc;
//                 }, {});
//             }
//             setFeesData(feesMap);
//         } catch (error) {
//             console.error("Error fetching fees data:", error);
//             setFeesData({});
//         }
//     };

//     // 1. Initial/On-Change Fetch: Fetch All Fee Structures on mount
//     useEffect(() => {
//         fetchFeesData();
//     }, []); 

//     // 2. Data Fetch: Trigger student list update whenever filters or fee data changes
//     useEffect(() => {
//         // Only fetch student data if the fee structure data has been initialized
//         if (feesData !== null) { 
//             fetchStudentFeeData();
//         }
//     }, [selectedStd, selectedDiv, searchTerm, feesData]);


//     const fetchStudentFeeData = async () => {
//         setIsLoading(true); 
//         
//         // --- 1. Student Query Parameters (for filtering students by Std/Div/Search) ---
//         const studentQueryParams = {};
//         if (selectedStd) studentQueryParams.std = selectedStd;
//         if (selectedDiv) studentQueryParams.div = selectedDiv;
//         if (searchTerm) studentQueryParams.search = searchTerm;
//         
//         // --- 2. Payment Entry Query Parameters (Payments are filtered by Std/Div) ---
//         const paymentQueryParams = {};
//         if (selectedStd) paymentQueryParams.std = normalizeStd(selectedStd);
//         if (selectedDiv) paymentQueryParams.div = selectedDiv;
//         
//         try {
//             // --- A. Fetch Students (Filtered by Student Query Params) ---
//             const studentsResponse = await axios.get(`${API_BASE_URL}api/students`, {
//                 params: studentQueryParams,
//                 headers: { auth: AUTH_HEADER },
//             });

//             const students = studentsResponse.data;

//             // --- B. Fetch Payment Entries for the current standard/division context ---
//             let rawPaymentEntries = [];
//             
//             // Fetch ALL payments if no standard is selected, to map against ALL students
//             if (Object.keys(paymentQueryParams).length > 0 || !selectedStd) { 
//                 const paymentResponse = await axios.get(`${API_BASE_URL}api/payment-entries`, {
//                     params: paymentQueryParams,
//                     headers: { auth: AUTH_HEADER },
//                 });
//                 rawPaymentEntries = paymentResponse.data;
//             } else {
//                 rawPaymentEntries = [];
//             }
//             
//             setPaymentEntries(rawPaymentEntries); 

//             // Create a map of payments for quick lookup by student name
//             const paymentMap = rawPaymentEntries.reduce((acc, entry) => {
//                 acc[entry.name] = entry; 
//                 return acc;
//             }, {});


//             // --- C. Merge Data ---
//             const mergedList = students.map(student => {
//                 const studentName = `${student.firstname} ${student.lastname}`;
//                 const studentStdKey = normalizeStd(student.admission.admissionstd);
//                 
//                 const payment = paymentMap[studentName] || { installments: [], totalFees: 0, status: "Unpaid" };
//                 
//                 const annualFeeDue = feesData[studentStdKey] || 0;
//                 
//                 const paidAmount = calculatePaidAmount(payment.installments);
//                 
//                 return {
//                     _id: student._id,
//                     name: studentName,
//                     std: student.admission.admissionstd,
//                     div: student.admission.admissiondivision,
//                     installments: payment.installments,
//                     totalFeesDue: annualFeeDue, 
//                     totalPaid: paidAmount,
//                     remaining: Math.max(0, annualFeeDue - paidAmount),
//                     status: getPaymentStatus({ paidAmount, totalFeesDue: annualFeeDue }),
//                 };
//             });

//             setStudentFeeList(mergedList);

//         } catch (error) {
//             console.error("Error fetching student/fee data:", error);
//             setStudentFeeList([]);
//         } finally {
//             setIsLoading(false); 
//         }
//     };


//     const calculatePaidAmount = (installments) => {
//         if (!installments || !Array.isArray(installments)) return 0;
//         return installments.reduce((sum, inst) => sum + (inst.amount || 0), 0);
//     };

//     const calculateRemainingAmount = (entry) => {
//         return Math.max(0, (entry.totalFeesDue || 0) - (entry.totalPaid || 0));
//     };

//     const getPaymentStatus = (entry) => {
//         const totalFees = entry.totalFeesDue || 0;
//         const paidAmount = entry.totalPaid || 0;
//         
//         if (totalFees === 0) return "N/A";
//         
//         if (paidAmount === 0) return "Unpaid";
//         if (paidAmount >= totalFees) return "Paid";
//         return "Partial";
//     };

//     const handleNameClick = (studentName) => {
//         alert(`Showing student profile for ${studentName}`);
//     };

//     const handleActionClick = (entry) => {
//         const currentEntry = studentFeeList.find(e => e._id === entry._id) || entry;
//         const status = getPaymentStatus(currentEntry);
//         
//         if (status === "Paid") {
//             alert(`Downloading receipt for ${currentEntry.name}`);
//         } else if (status === "N/A") {
//              alert(`Cannot process payment: Fee structure for Standard ${currentEntry.std} not found.`);
//         } else {
//             const today = new Date().toISOString().split("T")[0];
//             const remainingAmount = calculateRemainingAmount(currentEntry);
//             
//             setFormData({
//                 date: today,
//                 installmentType: remainingAmount > 0 ? "Partial" : "Full",
//                 amount: remainingAmount || 0,
//                 mode: "Cash", // Default to Cash, one of the new options
//             });
//             setSelectedEntry(currentEntry);
//             setModalOpen(true);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         const currentRemaining = calculateRemainingAmount(selectedEntry);
//         
//         if (name === "installmentType") {
//             if (value === "Full" && selectedEntry) {
//                 setFormData((prev) => ({ 
//                     ...prev, 
//                     [name]: value, 
//                     amount: currentRemaining 
//                 }));
//             } else {
//                 setFormData((prev) => ({ ...prev, [name]: value }));
//             }
//         } else {
//             setFormData((prev) => ({ ...prev, [name]: value }));
//         }
//     };

//     const handleModalSubmit = async () => {
//         if (!selectedEntry || !formData.date || formData.amount <= 0) {
//             alert("Please fill in the required fields with a valid amount.");
//             return;
//         }
//         
//         const remainingAmount = calculateRemainingAmount(selectedEntry);
//         
//         if (formData.amount > remainingAmount) {
//             alert(`Amount cannot exceed remaining balance of ₹${remainingAmount.toLocaleString()}`);
//             return;
//         }

//         const existingPaymentEntry = paymentEntries.find(e => e.name === selectedEntry.name);
//         const paymentEntryId = existingPaymentEntry?._id;
//         
//         const apiEndpoint = paymentEntryId
//             ? `${API_BASE_URL}api/update-payment-entry/${paymentEntryId}`
//             : `${API_BASE_URL}api/add-payment-entry`;
//         
//         const method = paymentEntryId ? 'put' : 'post';

//         const payload = {
//             date: formData.date,
//             amount: Number(formData.amount),
//             mode: formData.mode,
//             ...(method === 'post' && { 
//                 name: selectedEntry.name,
//                 std: selectedEntry.std,
//                 div: selectedEntry.div,
//                 totalFees: selectedEntry.totalFeesDue 
//             }),
//         };


//         try {
//             await axios({
//                 method: method,
//                 url: apiEndpoint,
//                 data: payload,
//                 headers: {
//                     "Content-Type": "application/json",
//                     auth: AUTH_HEADER,
//                 },
//             });
//             alert("Payment entry updated successfully!");
//             handleModalClose();
//             fetchStudentFeeData(); // Refresh the combined list
//         } catch (error) {
//             console.error(`Error ${method}ting payment entry:`, error);
//             alert("Error processing payment. Please try again.");
//         }
//     };

//     const handleModalClose = () => {
//         setModalOpen(false);
//         setSelectedEntry(null);
//         setFormData({
//             date: "",
//             installmentType: "Partial",
//             amount: 0,
//             mode: "Online",
//         });
//     };

//     // Render logic to show data or prompts
//     const renderContent = () => {
//         if (isLoading) {
//             return (
//                 <div className="text-center text-gray-500 py-8">
//                     <p className="text-lg">Loading student and fee data...</p>
//                 </div>
//             );
//         }
//         
//         const filtersAreEmpty = !selectedStd && !selectedDiv && !searchTerm;

//         if (studentFeeList.length === 0) {
//             if (filtersAreEmpty) {
//                 // Show prompt if no filters are applied and no data has loaded yet
//                 return (
//                     <div className="text-center text-gray-500 py-8">
//                         <p className="text-lg">
//                             Please select a Standard and Division, or enter a Search Term to view all students.
//                         </p>
//                     </div>
//                 );
//             } else {
//                 // Filters or search term set, but no results found
//                 return (
//                     <div className="text-center text-gray-500 py-8">
//                         <p className="text-lg">No students found matching the current filters.</p>
//                     </div>
//                 );
//             }
//         }

//         // Students found (either all or filtered)
//         return renderTable();
//     };

//     const renderTable = () => (
//         <div className="overflow-x-auto">
//             <table className="w-full border-collapse border">
//                 <thead className="bg-blue-100 text-black">
//                     <tr>
//                         <th className="border px-4 py-2 text-left">Name</th>
//                         <th className="border px-4 py-2 text-left">Std</th>
//                         <th className="border px-4 py-2 text-left">Div</th>
//                         <th className="border px-4 py-2 text-left">Installment Dates</th>
//                         <th className="border px-4 py-2 text-left">Installment Amounts</th>
//                         <th className="border px-4 py-2 text-left">Total Fees Due</th>
//                         <th className="border px-4 py-2 text-left">Paid Amount</th>
//                         <th className="border px-4 py-2 text-left">Remaining</th>
//                         <th className="border px-4 py-2 text-left">Status</th>
//                         <th className="border px-4 py-2 text-left">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody className="bg-white">
//                     {studentFeeList.map((entry, index) => {
//                         const status = getPaymentStatus(entry);
//                         
//                         return (
//                             <tr
//                                 key={entry._id || index}
//                                 className="hover:bg-gray-50 align-top"
//                             >
//                                 <td className="border px-4 py-2">
//                                     <button
//                                         onClick={() => handleNameClick(entry.name)}
//                                         className="text-blue-600 hover:underline"
//                                     >
//                                         {entry.name}
//                                     </button>
//                                 </td>
//                                 <td className="border px-4 py-2">{entry.std}</td>
//                                 <td className="border px-4 py-2">{entry.div}</td>
//                                 <td className="border px-4 py-2">
//                                     {entry.installments && entry.installments.length > 0 ? (
//                                         entry.installments.map((installment, i) => (
//                                             <div key={i} className="text-sm">
//                                                 {new Date(installment.date).toLocaleDateString()}
//                                             </div>
//                                         ))
//                                     ) : (
//                                         <span className="text-gray-400">N/A</span>
//                                     )}
//                                 </td>
//                                 <td className="border px-4 py-2">
//                                     {entry.installments && entry.installments.length > 0 ? (
//                                         entry.installments.map((installment, i) => (
//                                             <div key={i} className="text-sm">
//                                                 ₹{(installment.amount || 0).toLocaleString()}
//                                             </div>
//                                         ))
//                                     ) : (
//                                         <span className="text-gray-400">₹0</span>
//                                     )}
//                                 </td>
//                                 <td className="border px-4 py-2 font-semibold">
//                                     ₹{entry.totalFeesDue.toLocaleString()}
//                                 </td>
//                                 <td className="border px-4 py-2 text-green-600 font-semibold">
//                                     ₹{entry.totalPaid.toLocaleString()}
//                                 </td>
//                                 <td className="border px-4 py-2 text-red-600 font-semibold">
//                                     ₹{entry.remaining.toLocaleString()}
//                                 </td>
//                                 <td className="border px-4 py-2">
//                                     <span
//                                         className={`font-semibold px-2 py-1 rounded text-xs ${
//                                             status === "Paid"
//                                                 ? "bg-green-100 text-green-800"
//                                                 : status === "Partial"
//                                                 ? "bg-yellow-100 text-yellow-800"
//                                                 : status === "N/A"
//                                                 ? "bg-gray-100 text-gray-800"
//                                                 : "bg-red-100 text-red-800"
//                                         }`}
//                                     >
//                                         {status}
//                                     </span>
//                                 </td>
//                                 <td className="border px-4 py-2">
//                                     {status === "Paid" ? (
//                                         <button
//                                             onClick={() => handleActionClick(entry)}
//                                             className="px-3 py-1 rounded text-sm bg-green-500 text-white hover:bg-green-600"
//                                         >
//                                             Download
//                                         </button>
//                                     ) : status === "N/A" ? (
//                                         <span className="text-sm text-gray-500">No Fee Data</span>
//                                     ) : (
//                                         <button
//                                             onClick={() => handleActionClick(entry)}
//                                             className="px-3 py-1 rounded text-sm bg-blue-500 text-white hover:bg-blue-600"
//                                         >
//                                             Pay
//                                         </button>
//                                     )}
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//                 </table>
//                 </div>
//     );


//     return (
//         <MainLayout>
//             <div className="bg-white rounded-2xl shadow p-6">
//                 <div className="p-6 space-y-8">
//                     {/* Top Bar */}
//                     <div className="flex flex-wrap items-center justify-between gap-4">
//                         <div className="flex items-center">
//                             <input
//                                 type="text"
//                                 placeholder="Search Student"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="border px-4 py-2 rounded-l"
//                             />
//                             <div className={`text-white px-4 py-2 rounded-r cursor-pointer bg-blue-500`}>
//                                 <FontAwesomeIcon icon={faSearch} />
//                             </div>
//                         </div>
//                         <div className="flex items-center gap-6 flex-wrap">
//                             <div className="flex items-center gap-2">
//                                 <label className="whitespace-nowrap">Std:</label>
//                                 <SelectField
//                                     label=""
//                                     options={standardOptions} 
//                                     onChange={(e) => setSelectedStd(e.target.value)}
//                                     value={selectedStd}
//                                 />

//                                 <SelectField
//                                     label=""
//                                     options={divisionOptions}
//                                     onChange={(e) => setSelectedDiv(e.target.value)}
//                                     value={selectedDiv}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <h2 className="text-2xl font-bold">Payment Entry</h2>

//                     {/* Show fees breakdown only when standard is selected and fee data is available */}
//                     {selectedStd && feesData[normalizeStd(selectedStd)] > 0 && (
//                         <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
//                             <h3 className="text-lg font-semibold text-blue-800 mb-2">
//                                 Fee Structure for Standard {selectedStd}
//                             </h3>
//                             <p className="text-blue-700">
//                                 Total Annual Fees Due: ₹{feesData[normalizeStd(selectedStd)].toLocaleString()}
//                             </p>
//                         </div>
//                     )}

//                     {/* Conditional rendering based on filter selection/loading */}
//                     {renderContent()}

//                 </div>

//                 {/* Modal */}
//                 {modalOpen && selectedEntry && (
//                     <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
//                         <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
//                             {/* FIX 5: Added max-h-screen-75 and overflow-y-auto to enable scrolling */}
//                             <div className="max-h-[75vh] overflow-y-auto pr-2"> 
//                             <h3 className="text-xl font-bold mb-4 text-gray-800">
//                                 Payment Details
//                             </h3>
//                             
//                             {/* Payment Summary */}
//                             <div className="bg-gray-50 p-4 rounded-lg mb-4">
//                                 <h4 className="font-semibold text-gray-800 mb-2">Payment Summary</h4>
//                                 <div className="space-y-1 text-sm">
//                                     <div className="flex justify-between">
//                                         <span>Total Fees:</span>
//                                         <span className="font-semibold">
//                                             ₹{selectedEntry.totalFeesDue.toLocaleString()}
//                                         </span>
//                                     </div>
//                                     <div className="flex justify-between">
//                                         <span>Paid Amount:</span>
//                                         <span className="font-semibold text-green-600">
//                                             ₹{selectedEntry.totalPaid.toLocaleString()}
//                                         </span>
//                                     </div>
//                                     <div className="flex justify-between border-t pt-1">
//                                         <span>Remaining:</span>
//                                         <span className="font-semibold text-red-600">
//                                             ₹{selectedEntry.remaining.toLocaleString()}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>

//                             <form className="space-y-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">
//                                         Student Name
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={selectedEntry.name}
//                                         readOnly
//                                         className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100 text-gray-700"
//                                     />
//                                 </div>
//                                 <div className="flex gap-4">
//                                     <div className="flex-1">
//                                         <label className="block text-sm font-medium text-gray-700">
//                                             Standard
//                                         </label>
//                                         <input
//                                             type="text"
//                                             value={selectedEntry.std}
//                                             readOnly
//                                             className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100 text-gray-700"
//                                         />
//                                     </div>
//                                     <div className="flex-1">
//                                         <label className="block text-sm font-medium text-gray-700">
//                                             Division
//                                         </label>
//                                         <input
//                                             type="text"
//                                             value={selectedEntry.div}
//                                             readOnly
//                                             className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100 text-gray-700"
//                                         />
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">
//                                         Payment Date *
//                                     </label>
//                                     <input
//                                         type="date"
//                                         name="date"
//                                         value={formData.date}
//                                         onChange={handleInputChange}
//                                         required
//                                         className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">
//                                         Installment Type
//                                     </label>
//                                     <select
//                                         name="installmentType"
//                                         value={formData.installmentType}
//                                         onChange={handleInputChange}
//                                         className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                     >
//                                         <option value="Partial">Partial Payment</option>
//                                         <option value="Full">Full Payment (Remaining Amount)</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">
//                                         Amount (₹) *
//                                     </label>
//                                     <input
//                                         type="number"
//                                         name="amount"
//                                         value={formData.amount}
//                                         onChange={handleInputChange}
//                                         min="1"
//                                         max={selectedEntry.remaining}
//                                         step="0.01"
//                                         required
//                                         className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                     />
//                                     <p className="mt-1 text-xs text-gray-500">
//                                         Maximum allowed: ₹{selectedEntry.remaining.toLocaleString()}
//                                     </p>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">
//                                         Payment Mode
//                                     </label>
//                                     <select
//                                         name="mode"
//                                         value={formData.mode}
//                                         onChange={handleInputChange}
//                                         className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                     >
//                                         {paymentModeOptions.map((option) => (
//                                           <option key={option.value} value={option.value}>
//                                             {option.label}
//                                           </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </form>
//                             </div> {/* End scrollable area */}

//                             <div className="mt-6 flex justify-end gap-3">
//                                 <button
//                                     type="button"
//                                     onClick={handleModalClose}
//                                     className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={handleModalSubmit}
//                                     className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                                     disabled={!formData.date || formData.amount <= 0 || formData.amount > selectedEntry.remaining}
//                                 >
//                                     Submit Payment
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </MainLayout>
//     );
// };

// export default PaymentEntry;



import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Assuming this SelectField component is defined elsewhere and works correctly
// import SelectField from "../components/SelectField"; 
import axios from "axios";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

// Re-defining SelectField locally since its import path is outside this file
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
                    <option key={index} value={option.value || option}>
                        {option.label || option}
                    </option>
                ))}
            </select>
        </div>
    );
};

// Standard options including Pre-Primary
const standardOptions = [
    { label: "Select Standard", value: "" },
    { label: "Nursery", value: "Nursery" },
    { label: "Junior KG", value: "Junior" },
    { label: "Senior KG", value: "Senior" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
];

const divisionOptions = [
    { label: "Select Division", value: "" },
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
];

// FIX: Payment Modes based on the provided dashboard image legend
const paymentModeOptions = [
    { label: "Online Payment", value: "Online" },
    { label: "Cash", value: "Cash" },
    { label: "Bank Transfer", value: "Bank Transfer" },
    { label: "Internet Banking", value: "Internet Banking" },
    { label: "Cheques", value: "Cheques" },
];


const PaymentEntry = () => {
    // FIX 1: Read initial values from URL query parameters
    const query = new URLSearchParams(window.location.search);
    
    const [selectedStd, setSelectedStd] = useState(query.get('std') || "");
    const [selectedDiv, setSelectedDiv] = useState(query.get('div') || "");
    const [searchTerm, setSearchTerm] = useState(query.get('search') || "");
    
    const [paymentEntries, setPaymentEntries] = useState([]); 
    const [studentFeeList, setStudentFeeList] = useState([]); 
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [formData, setFormData] = useState({
        date: "",
        installmentType: "Partial",
        amount: 0,
        mode: "Cash", // Default to Cash, one of the new options
    });
    const [feesData, setFeesData] = useState({}); 
    const [isLoading, setIsLoading] = useState(false); 

  const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

  const normalizeStd = (std) => {
        if (!std) return '';
        if (["Nursery", "Junior", "Senior"].includes(std)) {
            return std;
        }
        const num = String(std).replace(/\D/g, ""); 
        return num || std; 
    }

    // Fetch ALL Fees Data
    const fetchFeesData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}api/fees`, {
                headers: {
                    "Content-Type": "application/json",
                    auth: AUTH_HEADER,
                },
            });

            let feesMap = {};
            if (Array.isArray(response.data)) {
                feesMap = response.data.reduce((acc, fee) => {
                    acc[normalizeStd(fee.standard)] = fee.annualfee;
                    return acc;
                }, {});
            }
            setFeesData(feesMap);
        } catch (error) {
            console.error("Error fetching fees data:", error);
            setFeesData({});
        }
    };

    // 1. Initial/On-Change Fetch: Fetch All Fee Structures on mount
    useEffect(() => {
        fetchFeesData();
    }, []); 

    // 2. Data Fetch: Trigger student list update whenever filters or fee data changes
    useEffect(() => {
        // Only fetch student data if the fee structure data has been initialized
        if (feesData !== null) { 
            fetchStudentFeeData();
        }
    }, [selectedStd, selectedDiv, searchTerm, feesData]);


    const fetchStudentFeeData = async () => {
        setIsLoading(true); 
        
        // --- 1. Student Query Parameters (for filtering students by Std/Div only) ---
        const studentQueryParams = {};
        if (selectedStd) studentQueryParams.std = selectedStd;
        if (selectedDiv) studentQueryParams.div = selectedDiv;
        // Do NOT pass 'search' term here, as we filter client-side for flexibility
        
        // --- 2. Payment Entry Query Parameters (Payments are filtered by Std/Div) ---
        const paymentQueryParams = {};
        if (selectedStd) paymentQueryParams.std = normalizeStd(selectedStd);
        if (selectedDiv) paymentQueryParams.div = selectedDiv;
        
        try {
            // --- A. Fetch Students (Filtered by Student Query Params) ---
            const studentsResponse = await axios.get(`${API_BASE_URL}api/students`, {
                params: studentQueryParams,
                headers: { auth: AUTH_HEADER },
            });

            let students = studentsResponse.data;

            // --- FIX: Client-Side Search Filtering for Flexible Search ---
            const lowerSearchTerm = searchTerm.toLowerCase().trim();
            if (lowerSearchTerm) {
                students = students.filter(student => {
                    // Combine first name and last name for full name search
                    const fullName = `${student.firstname} ${student.lastname}`.toLowerCase();
                    const firstName = (student.firstname || '').toLowerCase();
                    const lastName = (student.lastname || '').toLowerCase();
                    
                    // Check if search term is in first name, last name, or full name
                    return fullName.includes(lowerSearchTerm) || 
                           firstName.includes(lowerSearchTerm) ||
                           lastName.includes(lowerSearchTerm);
                });
            }
            // --- END FIX ---


            // --- B. Fetch Payment Entries for the current standard/division context ---
            let rawPaymentEntries = [];
            
            // Fetch ALL payments if no standard is selected, to map against ALL students
            if (Object.keys(paymentQueryParams).length > 0 || !selectedStd) { 
                const paymentResponse = await axios.get(`${API_BASE_URL}api/payment-entries`, {
                    params: paymentQueryParams,
                    headers: { auth: AUTH_HEADER },
                });
                rawPaymentEntries = paymentResponse.data;
            } else {
                rawPaymentEntries = [];
            }
            
            setPaymentEntries(rawPaymentEntries); 

            // Create a map of payments for quick lookup by student name
            const paymentMap = rawPaymentEntries.reduce((acc, entry) => {
                acc[entry.name] = entry; 
                return acc;
            }, {});


            // --- C. Merge Data ---
            const mergedList = students.map(student => {
                const studentName = `${student.firstname} ${student.lastname}`;
                const studentStdKey = normalizeStd(student.admission.admissionstd);
                
                const payment = paymentMap[studentName] || { installments: [], totalFees: 0, status: "Unpaid" };
                
                const annualFeeDue = feesData[studentStdKey] || 0;
                
                const paidAmount = calculatePaidAmount(payment.installments);
                
                return {
                    _id: student._id,
                    name: studentName,
                    std: student.admission.admissionstd,
                    div: student.admission.admissiondivision,
                    installments: payment.installments,
                    totalFeesDue: annualFeeDue, 
                    totalPaid: paidAmount,
                    remaining: Math.max(0, annualFeeDue - paidAmount),
                    status: getPaymentStatus({ paidAmount, totalFeesDue: annualFeeDue }),
                };
            });

            setStudentFeeList(mergedList);

        } catch (error) {
            console.error("Error fetching student/fee data:", error);
            setStudentFeeList([]);
        } finally {
            setIsLoading(false); 
        }
    };


    const calculatePaidAmount = (installments) => {
        if (!installments || !Array.isArray(installments)) return 0;
        return installments.reduce((sum, inst) => sum + (inst.amount || 0), 0);
    };

    const calculateRemainingAmount = (entry) => {
        return Math.max(0, (entry.totalFeesDue || 0) - (entry.totalPaid || 0));
    };

    const getPaymentStatus = (entry) => {
        const totalFees = entry.totalFeesDue || 0;
        const paidAmount = entry.totalPaid || 0;
        
        if (totalFees === 0) return "N/A";
        
        if (paidAmount === 0) return "Unpaid";
        if (paidAmount >= totalFees) return "Paid";
        return "Partial";
    };

    const handleNameClick = (studentName) => {
        alert(`Showing student profile for ${studentName}`);
    };

    const handleActionClick = (entry) => {
        const currentEntry = studentFeeList.find(e => e._id === entry._id) || entry;
        const status = getPaymentStatus(currentEntry);
        
        if (status === "Paid") {
            alert(`Downloading receipt for ${currentEntry.name}`);
        } else if (status === "N/A") {
             alert(`Cannot process payment: Fee structure for Standard ${currentEntry.std} not found.`);
        } else {
            const today = new Date().toISOString().split("T")[0];
            const remainingAmount = calculateRemainingAmount(currentEntry);
            
            setFormData({
                date: today,
                installmentType: remainingAmount > 0 ? "Partial" : "Full",
                amount: remainingAmount || 0,
                mode: "Cash", // Default to Cash, one of the new options
            });
            setSelectedEntry(currentEntry);
            setModalOpen(true);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const currentRemaining = calculateRemainingAmount(selectedEntry);
        
        if (name === "installmentType") {
            if (value === "Full" && selectedEntry) {
                setFormData((prev) => ({ 
                    ...prev, 
                    [name]: value, 
                    amount: currentRemaining 
                }));
            } else {
                setFormData((prev) => ({ ...prev, [name]: value }));
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleModalSubmit = async () => {
        if (!selectedEntry || !formData.date || formData.amount <= 0) {
            alert("Please fill in the required fields with a valid amount.");
            return;
        }
        
        const remainingAmount = calculateRemainingAmount(selectedEntry);
        
        if (formData.amount > remainingAmount) {
            alert(`Amount cannot exceed remaining balance of ₹${remainingAmount.toLocaleString()}`);
            return;
        }

        const existingPaymentEntry = paymentEntries.find(e => e.name === selectedEntry.name);
        const paymentEntryId = existingPaymentEntry?._id;
        
        const apiEndpoint = paymentEntryId
            ? `${API_BASE_URL}api/update-payment-entry/${paymentEntryId}`
            : `${API_BASE_URL}api/add-payment-entry`;
        
        const method = paymentEntryId ? 'put' : 'post';

        const payload = {
            date: formData.date,
            amount: Number(formData.amount),
            mode: formData.mode,
            ...(method === 'post' && { 
                name: selectedEntry.name,
                std: selectedEntry.std,
                div: selectedEntry.div,
                totalFees: selectedEntry.totalFeesDue 
            }),
        };


        try {
            await axios({
                method: method,
                url: apiEndpoint,
                data: payload,
                headers: {
                    "Content-Type": "application/json",
                    auth: AUTH_HEADER,
                },
            });
            alert("Payment entry updated successfully!");
            handleModalClose();
            fetchStudentFeeData(); // Refresh the combined list
        } catch (error) {
            console.error(`Error ${method}ting payment entry:`, error);
            alert("Error processing payment. Please try again.");
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedEntry(null);
        setFormData({
            date: "",
            installmentType: "Partial",
            amount: 0,
            mode: "Online",
        });
    };

    // Render logic to show data or prompts
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="text-center text-gray-500 py-8">
                    <p className="text-lg">Loading student and fee data...</p>
                </div>
            );
        }
        
        // The filters are considered active if any field has a value, including the search term
        const filtersAreEmpty = !selectedStd && !selectedDiv && !searchTerm; 

        if (studentFeeList.length === 0) {
            if (filtersAreEmpty) {
                // Show prompt if no filters are applied and no data has loaded yet
                return (
                    <div className="text-center text-gray-500 py-8">
                        <p className="text-lg">
                            Please select a Standard and Division, or enter a Search Term to view student fees.
                        </p>
                    </div>
                );
            } else {
                // Filters or search term set, but no results found
                return (
                    <div className="text-center text-gray-500 py-8">
                        <p className="text-lg">No students found matching the current filters.</p>
                    </div>
                );
            }
        }

        // Students found (either all or filtered)
        return renderTable();
    };

    const renderTable = () => (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse border">
                <thead className="bg-blue-100 text-black">
                    <tr>
                        <th className="border px-4 py-2 text-left">Name</th>
                        <th className="border px-4 py-2 text-left">Std</th>
                        <th className="border px-4 py-2 text-left">Div</th>
                        <th className="border px-4 py-2 text-left">Installment Dates</th>
                        <th className="border px-4 py-2 text-left">Installment Amounts</th>
                        <th className="border px-4 py-2 text-left">Total Fees Due</th>
                        <th className="border px-4 py-2 text-left">Paid Amount</th>
                        <th className="border px-4 py-2 text-left">Remaining</th>
                        <th className="border px-4 py-2 text-left">Status</th>
                        <th className="border px-4 py-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {studentFeeList.map((entry, index) => {
                        const status = getPaymentStatus(entry);
                        
                        return (
                            <tr
                                key={entry._id || index}
                                className="hover:bg-gray-50 align-top"
                            >
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleNameClick(entry.name)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {entry.name}
                                    </button>
                                </td>
                                <td className="border px-4 py-2">{entry.std}</td>
                                <td className="border px-4 py-2">{entry.div}</td>
                                <td className="border px-4 py-2">
                                    {entry.installments && entry.installments.length > 0 ? (
                                        entry.installments.map((installment, i) => (
                                            <div key={i} className="text-sm">
                                                {new Date(installment.date).toLocaleDateString()}
                                            </div>
                                        ))
                                    ) : (
                                        <span className="text-gray-400">N/A</span>
                                    )}
                                </td>
                                <td className="border px-4 py-2">
                                    {entry.installments && entry.installments.length > 0 ? (
                                        entry.installments.map((installment, i) => (
                                            <div key={i} className="text-sm">
                                                ₹{(installment.amount || 0).toLocaleString()}
                                            </div>
                                        ))
                                    ) : (
                                        <span className="text-gray-400">₹0</span>
                                    )}
                                </td>
                                <td className="border px-4 py-2 font-semibold">
                                    ₹{entry.totalFeesDue.toLocaleString()}
                                </td>
                                <td className="border px-4 py-2 text-green-600 font-semibold">
                                    ₹{entry.totalPaid.toLocaleString()}
                                </td>
                                <td className="border px-4 py-2 text-red-600 font-semibold">
                                    ₹{entry.remaining.toLocaleString()}
                                </td>
                                <td className="border px-4 py-2">
                                    <span
                                        className={`font-semibold px-2 py-1 rounded text-xs ${
                                            status === "Paid"
                                                ? "bg-green-100 text-green-800"
                                                : status === "Partial"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : status === "N/A"
                                                ? "bg-gray-100 text-gray-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {status}
                                    </span>
                                </td>
                                <td className="border px-4 py-2">
                                    {status === "Paid" ? (
                                        <button
                                            onClick={() => handleActionClick(entry)}
                                            className="px-3 py-1 rounded text-sm bg-green-500 text-white hover:bg-green-600"
                                        >
                                            Download
                                        </button>
                                    ) : status === "N/A" ? (
                                        <span className="text-sm text-gray-500">No Fee Data</span>
                                    ) : (
                                        <button
                                            onClick={() => handleActionClick(entry)}
                                            className="px-3 py-1 rounded text-sm bg-blue-500 text-white hover:bg-blue-600"
                                        >
                                            Pay
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                </table>
                </div>
    );


    return (
        <MainLayout>
            <div className="bg-white rounded-2xl shadow p-6">
                <div className="p-6 space-y-8">
                    {/* Top Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Search Student"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border px-4 py-2 rounded-l"
                            />
                            <div className={`text-white px-4 py-2 rounded-r cursor-pointer bg-blue-500`}>
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                        </div>
                        <div className="flex items-center gap-6 flex-wrap">
                            <div className="flex items-center gap-2">
                                <label className="whitespace-nowrap">Std:</label>
                                <SelectField
                                    label=""
                                    options={standardOptions} 
                                    onChange={(e) => setSelectedStd(e.target.value)}
                                    value={selectedStd}
                                />

                                <SelectField
                                    label=""
                                    options={divisionOptions}
                                    onChange={(e) => setSelectedDiv(e.target.value)}
                                    value={selectedDiv}
                                />
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold">Payment Entry</h2>

                    {/* Show fees breakdown only when standard is selected and fee data is available */}
                    {selectedStd && feesData[normalizeStd(selectedStd)] > 0 && (
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h3 className="text-lg font-semibold text-blue-800 mb-2">
                                Fee Structure for Standard {selectedStd}
                            </h3>
                            <p className="text-blue-700">
                                Total Annual Fees Due: ₹{feesData[normalizeStd(selectedStd)].toLocaleString()}
                            </p>
                        </div>
                    )}

                    {/* Conditional rendering based on filter selection/loading */}
                    {renderContent()}

                </div>

                {/* Modal */}
                {modalOpen && selectedEntry && (
                    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
                            {/* FIX 5: Added max-h-screen-75 and overflow-y-auto to enable scrolling */}
                            <div className="max-h-[75vh] overflow-y-auto pr-2"> 
                            <h3 className="text-xl font-bold mb-4 text-gray-800">
                                Payment Details
                            </h3>
                            
                            {/* Payment Summary */}
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                <h4 className="font-semibold text-gray-800 mb-2">Payment Summary</h4>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span>Total Fees:</span>
                                        <span className="font-semibold">
                                            ₹{selectedEntry.totalFeesDue.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Paid Amount:</span>
                                        <span className="font-semibold text-green-600">
                                            ₹{selectedEntry.totalPaid.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-t pt-1">
                                        <span>Remaining:</span>
                                        <span className="font-semibold text-red-600">
                                            ₹{selectedEntry.remaining.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Student Name
                                    </label>
                                    <input
                                        type="text"
                                        value={selectedEntry.name}
                                        readOnly
                                        className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100 text-gray-700"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Standard
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedEntry.std}
                                            readOnly
                                            className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100 text-gray-700"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Division
                                        </label>
                                        <input
                                            type="text"
                                            value={selectedEntry.div}
                                            readOnly
                                            className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100 text-gray-700"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Payment Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Installment Type
                                    </label>
                                    <select
                                        name="installmentType"
                                        value={formData.installmentType}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="Partial">Partial Payment</option>
                                        <option value="Full">Full Payment (Remaining Amount)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Amount (₹) *
                                    </label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleInputChange}
                                        min="1"
                                        max={selectedEntry.remaining}
                                        step="0.01"
                                        required
                                        className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        Maximum allowed: ₹{selectedEntry.remaining.toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Payment Mode
                                    </label>
                                    <select
                                        name="mode"
                                        value={formData.mode}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        {paymentModeOptions.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label}
                                          </option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                            </div> {/* End scrollable area */}

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={handleModalClose}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleModalSubmit}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!formData.date || formData.amount <= 0 || formData.amount > selectedEntry.remaining}
                                >
                                    Submit Payment
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default PaymentEntry;