// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";

// const FeesStructureSetup = () => {
//   const [activeTab, setActiveTab] = useState("define");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });

//   // For Define Fee Categories
//   const [feeCategories, setFeeCategories] = useState([]);
//   const [newCategory, setNewCategory] = useState("");

//   // For Assign Fees to Standards
//   const [selectedStd, setSelectedStd] = useState("");
//   const [assignFees, setAssignFees] = useState([{ category: "", amount: "" }]);

//   // API configuration
//   const API_BASE_URL = "https://sspd-school-portal.vercel.app/api";
//   const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

//   // Fetch existing categories on component mount
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${API_BASE_URL}/categories`, {
//         headers: { auth: AUTH_HEADER },
//       });
      
//       if (response.status === 200) {
//         const categoriesData = response.data[0];
//         if (categoriesData?.title) {
//           // Handle comma-separated string format
//           const categoriesArray = String(categoriesData.title)
//             .split(",")
//             .map(cat => cat.trim())
//             .filter(cat => cat);
//           setFeeCategories(categoriesArray);
//         } else if (Array.isArray(response.data)) {
//           // Handle array format
//           setFeeCategories(response.data);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       showMessage("error", "Failed to load fee categories");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showMessage = (type, text) => {
//     setMessage({ type, text });
//     setTimeout(() => setMessage({ type: "", text: "" }), 3000);
//   };

//   // Handlers for Define Fee Categories
//   const addFeeCategory = () => {
//     if (newCategory.trim()) {
//       setFeeCategories([...feeCategories, newCategory.trim()]);
//       setNewCategory("");
//     }
//   };

//   const removeFeeCategory = (index) => {
//     const updated = feeCategories.filter((_, i) => i !== index);
//     setFeeCategories(updated);
//   };

//   const handleFeeCategoryChange = (index, value) => {
//     const updated = [...feeCategories];
//     updated[index] = value;
//     setFeeCategories(updated);
//   };

//   // Handlers for Assign Fees
//   const handleAssignChange = (index, field, value) => {
//     const updated = [...assignFees];
//     updated[index][field] = value;
//     setAssignFees(updated);
//   };

//   const addAssignFeeRow = () => {
//     setAssignFees([...assignFees, { category: "", amount: "" }]);
//   };

//   const removeAssignFeeRow = (index) => {
//     if (assignFees.length > 1) {
//       const updated = assignFees.filter((_, i) => i !== index);
//       setAssignFees(updated);
//     }
//   };

//   const calculateTotal = () => {
//     return assignFees.reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
//   };

//   const validateAssignFees = () => {
//     if (!selectedStd) {
//       showMessage("error", "Please select a standard");
//       return false;
//     }
    
//     const hasEmptyFields = assignFees.some(fee => !fee.category || !fee.amount);
//     if (hasEmptyFields) {
//       showMessage("error", "Please fill all category and amount fields");
//       return false;
//     }
    
//     return true;
//   };

//   const handleSaveDefine = async () => {
//     if (feeCategories.length === 0) {
//       showMessage("error", "Please add at least one fee category");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/add-category`,
//         { categories: feeCategories },
//         {
//           headers: { auth: AUTH_HEADER },
//         }
//       );
      
//       if (response.status === 200 || response.status === 201) {
//         showMessage("success", "Fee categories saved successfully");
//       }
//     } catch (error) {
//       console.error("Error saving categories:", error);
//       showMessage("error", "Failed to save fee categories");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveAssign = async () => {
//     if (!validateAssignFees()) return;

//     setLoading(true);
//     try {
//       const totalAmount = calculateTotal();
      
//       // Format data according to your MongoDB schema
//       const payload = {
//         standard: selectedStd,
//         categories: assignFees
//           .filter(fee => fee.category && fee.amount)
//           .map(fee => ({
//             name: fee.category,
//             amount: Number(fee.amount)
//           })),
//         total: totalAmount,
//         // Optional: Calculate different fee structures based on total
//         monthlyfee: Math.round(totalAmount / 12),
//         quarterlyfee: Math.round(totalAmount / 4),
//         halfYearlyfee: Math.round(totalAmount / 2),
//         annualfee: totalAmount
//       };

//       const response = await axios.post(
//         `${API_BASE_URL}/add-fee`,
//         payload,
//         {
//           headers: { auth: AUTH_HEADER },
//         }
//       );
      
//       if (response.status === 200 || response.status === 201) {
//         showMessage("success", "Fee assignment saved successfully");
//         console.log("Saved fee structure:", payload);
        
//         // Reset form
//         setSelectedStd("");
//         setAssignFees([{ category: "", amount: "" }]);
//       }
//     } catch (error) {
//       console.error("Error saving fee assignment:", error);
//       showMessage("error", "Failed to save fee assignment");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6 space-y-8">
//           {/* Title */}
//           <h2 className="text-2xl font-bold text-center text-gray-800">
//             Fees Structure Setup
//           </h2>

//           {/* Message Display */}
//           {message.text && (
//             <div className={`p-3 rounded-lg text-center ${
//               message.type === "success" 
//                 ? "bg-green-100 text-green-700 border border-green-300" 
//                 : "bg-red-100 text-red-700 border border-red-300"
//             }`}>
//               {message.text}
//             </div>
//           )}

//           {/* Tab Buttons */}
//           <div className="flex w-full rounded-lg overflow-hidden border">
//             <button
//               onClick={() => setActiveTab("define")}
//               className={`w-1/2 py-3 text-center transition-colors ${
//                 activeTab === "define"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               Define Fee Categories
//             </button>
//             <button
//               onClick={() => setActiveTab("assign")}
//               className={`w-1/2 py-3 text-center transition-colors ${
//                 activeTab === "assign"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               Assign Fees to Standards
//             </button>
//           </div>

//           {/* Content Switcher */}
//           <div className="border rounded-lg p-6 bg-white shadow-md">
//             {activeTab === "define" ? (
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   Manage Fee Categories
//                 </h3>
                
//                 {/* Add New Category */}
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     value={newCategory}
//                     onChange={(e) => setNewCategory(e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && addFeeCategory()}
//                     placeholder="Enter fee category name"
//                     className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
//                   />
//                   <button
//                     onClick={addFeeCategory}
//                     disabled={!newCategory.trim()}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Add
//                   </button>
//                 </div>

//                 {/* Fee Structure Summary */}
//                 {calculateTotal() > 0 && (
//                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                     <h4 className="font-semibold text-blue-800 mb-3">Fee Structure Breakdown:</h4>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                       <div className="text-center">
//                         <div className="font-medium text-gray-600">Monthly</div>
//                         <div className="text-lg font-semibold text-blue-700">
//                           ₹{Math.round(calculateTotal() / 12).toLocaleString()}
//                         </div>
//                       </div>
//                       <div className="text-center">
//                         <div className="font-medium text-gray-600">Quarterly</div>
//                         <div className="text-lg font-semibold text-blue-700">
//                           ₹{Math.round(calculateTotal() / 4).toLocaleString()}
//                         </div>
//                       </div>
//                       <div className="text-center">
//                         <div className="font-medium text-gray-600">Half-Yearly</div>
//                         <div className="text-lg font-semibold text-blue-700">
//                           ₹{Math.round(calculateTotal() / 2).toLocaleString()}
//                         </div>
//                       </div>
//                       <div className="text-center">
//                         <div className="font-medium text-gray-600">Annual</div>
//                         <div className="text-lg font-semibold text-blue-700">
//                           ₹{calculateTotal().toLocaleString()}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {feeCategories.length === 0 && (
//                   <p className="text-gray-500 text-center py-4">
//                     No fee categories defined. Add a category to get started.
//                   </p>
//                 )}

//                 <div className="flex justify-end">
//                   <button
//                     onClick={handleSaveDefine}
//                     disabled={loading || feeCategories.length === 0}
//                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {loading ? "Saving..." : "Save Categories"}
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   Assign Fees to Standards
//                 </h3>

//                 {/* Standard Selection */}
//                 <div className="flex justify-center items-center gap-2">
//                   <label className="font-medium">Standard:</label>
//                   <select
//                     value={selectedStd}
//                     onChange={(e) => setSelectedStd(e.target.value)}
//                     className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
//                   >
//                     <option value="">Select Standard</option>
//                     <option value="1st">1st</option>
//                     <option value="2nd">2nd</option>
//                     <option value="3rd">3rd</option>
//                     <option value="4th">4th</option>
//                     <option value="5th">5th</option>
//                     <option value="6th">6th</option>
//                     <option value="7th">7th</option>
//                     <option value="8th">8th</option>
//                     <option value="9th">9th</option>
//                     <option value="10th">10th</option>
//                     <option value="11th">11th</option>
//                     <option value="12th">12th</option>
//                   </select>
//                 </div>

//                 {/* Fee Assignment Table */}
//                 <div className="overflow-x-auto">
//                   <table className="w-full border border-gray-300 rounded-lg">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="border border-gray-300 py-3 px-4 text-left">
//                           Fee Category
//                         </th>
//                         <th className="border border-gray-300 py-3 px-4 text-left">
//                           Amount (₹)
//                         </th>
//                         <th className="border border-gray-300 py-3 px-4 text-center">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {assignFees.map((fee, index) => (
//                         <tr key={index}>
//                           <td className="border border-gray-300 p-2">
//                             <select
//                               value={fee.category}
//                               onChange={(e) =>
//                                 handleAssignChange(index, "category", e.target.value)
//                               }
//                               className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-blue-500"
//                             >
//                               <option value="">Select Category</option>
//                               {feeCategories.map((category, catIndex) => {
//                                 const categoryName = typeof category === "string" ? category : category.title || "";
//                                 return (
//                                   <option key={catIndex} value={categoryName}>
//                                     {categoryName}
//                                   </option>
//                                 );
//                               })}
//                             </select>
//                           </td>
//                           <td className="border border-gray-300 p-2">
//                             <input
//                               type="number"
//                               value={fee.amount}
//                               onChange={(e) =>
//                                 handleAssignChange(index, "amount", e.target.value)
//                               }
//                               min="0"
//                               className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-blue-500"
//                             />
//                           </td>
//                           <td className="border border-gray-300 text-center p-2">
//                             <button
//                               onClick={addAssignFeeRow}
//                               className="text-green-600 hover:text-green-800 mx-1 text-xl font-bold"
//                               title="Add Row"
//                             >
//                               +
//                             </button>
//                             {assignFees.length > 1 && (
//                               <button
//                                 onClick={() => removeAssignFeeRow(index)}
//                                 className="text-red-600 hover:text-red-800 mx-1 text-xl font-bold"
//                                 title="Remove Row"
//                               >
//                                 −
//                               </button>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                       <tr className="bg-gray-50 font-semibold">
//                         <td className="border border-gray-300 py-2 px-4 text-right">
//                           Annual Total:
//                         </td>
//                         <td className="border border-gray-300 py-2 px-4">
//                           ₹{calculateTotal().toLocaleString()}
//                         </td>
//                         <td className="border border-gray-300"></td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>

//                 {feeCategories.length === 0 && (
//                   <p className="text-amber-600 bg-amber-50 border border-amber-200 rounded p-3 text-center">
//                     No fee categories available. Please define fee categories first.
//                   </p>
//                 )}

//                 <div className="flex justify-end">
//                   <button
//                     onClick={handleSaveAssign}
//                     disabled={loading || feeCategories.length === 0}
//                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {loading ? "Saving..." : "Save Assignment"}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default FeesStructureSetup;

// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";

// const FeesStructureSetup = () => {
//   const [activeTab, setActiveTab] = useState("define");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });

//   // For Define Fee Categories
//   const [feeCategories, setFeeCategories] = useState([]);
//   const [newCategory, setNewCategory] = useState("");

//   // For Assign Fees to Standards
//   const [selectedStd, setSelectedStd] = useState("");
//   const [assignFees, setAssignFees] = useState([{ category: "", amount: "" }]);

//   // API configuration
//   // CRITICAL FIX: Changing from Vercel URL to local API URL
//   const API_BASE_URL = "http://localhost:5000/api"; 
//   const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

//   // Fetch existing categories on component mount
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${API_BASE_URL}/categories`, {
//         headers: { auth: AUTH_HEADER },
//       });
//       
//       if (response.status === 200) {
//         const categoriesData = response.data[0];
//         if (categoriesData?.title) {
//           // Handle comma-separated string format
//           const categoriesArray = String(categoriesData.title)
//             .split(",")
//             .map(cat => cat.trim())
//             .filter(cat => cat);
//           setFeeCategories(categoriesArray);
//         } else if (Array.isArray(response.data)) {
//           // Handle array format
//           setFeeCategories(response.data);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       showMessage("error", "Failed to load fee categories");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showMessage = (type, text) => {
//     setMessage({ type, text });
//     setTimeout(() => setMessage({ type: "", text: "" }), 3000);
//   };

//   // Handlers for Define Fee Categories
//   const addFeeCategory = () => {
//     if (newCategory.trim()) {
//       setFeeCategories([...feeCategories, newCategory.trim()]);
//       setNewCategory("");
//     }
//   };

//   const removeFeeCategory = (index) => {
//     const updated = feeCategories.filter((_, i) => i !== index);
//     setFeeCategories(updated);
//   };

//   const handleFeeCategoryChange = (index, value) => {
//     const updated = [...feeCategories];
//     updated[index] = value;
//     setFeeCategories(updated);
//   };

//   // Handlers for Assign Fees
//   const handleAssignChange = (index, field, value) => {
//     const updated = [...assignFees];
//     updated[index][field] = value;
//     setAssignFees(updated);
//   };

//   const addAssignFeeRow = () => {
//     setAssignFees([...assignFees, { category: "", amount: "" }]);
//   };

//   const removeAssignFeeRow = (index) => {
//     if (assignFees.length > 1) {
//       const updated = assignFees.filter((_, i) => i !== index);
//       setAssignFees(updated);
//     }
//   };

//   const calculateTotal = () => {
//     return assignFees.reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
//   };

//   const validateAssignFees = () => {
//     if (!selectedStd) {
//       showMessage("error", "Please select a standard");
//       return false;
//     }
//     
//     const hasEmptyFields = assignFees.some(fee => !fee.category || !fee.amount);
//     if (hasEmptyFields) {
//       showMessage("error", "Please fill all category and amount fields");
//       return false;
//     }
//     
//     return true;
//   };

//   const handleSaveDefine = async () => {
//     if (feeCategories.length === 0) {
//       showMessage("error", "Please add at least one fee category");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/add-category`,
//         { categories: feeCategories },
//         {
//           headers: { auth: AUTH_HEADER },
//         }
//       );
//       
//       if (response.status === 200 || response.status === 201) {
//         showMessage("success", "Fee categories saved successfully");
//       }
//     } catch (error) {
//       console.error("Error saving categories:", error);
//       showMessage("error", "Failed to save fee categories");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveAssign = async () => {
//     if (!validateAssignFees()) return;

//     setLoading(true);
//     try {
//       const totalAmount = calculateTotal();
//       
//       // Format data according to your MongoDB schema
//       const payload = {
//         standard: selectedStd,
//         categories: assignFees
//           .filter(fee => fee.category && fee.amount)
//           .map(fee => ({
//             name: fee.category,
//             amount: Number(fee.amount)
//           })),
//         total: totalAmount,
//         // Optional: Calculate different fee structures based on total
//         monthlyfee: Math.round(totalAmount / 12),
//         quarterlyfee: Math.round(totalAmount / 4),
//         halfYearlyfee: Math.round(totalAmount / 2),
//         annualfee: totalAmount
//       };

//       const response = await axios.post(
//         `${API_BASE_URL}/add-fee`,
//         payload,
//         {
//           headers: { auth: AUTH_HEADER },
//         }
//       );
//       
//       if (response.status === 200 || response.status === 201) {
//         showMessage("success", "Fee assignment saved successfully");
//         console.log("Saved fee structure:", payload);
//         
//         // Reset form
//         setSelectedStd("");
//         setAssignFees([{ category: "", amount: "" }]);
//       }
//     } catch (error) {
//       console.error("Error saving fee assignment:", error);
//       showMessage("error", "Failed to save fee assignment");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6 space-y-8">
//           {/* Title */}
//           <h2 className="text-2xl font-bold text-center text-gray-800">
//             Fees Structure Setup
//           </h2>

//           {/* Message Display */}
//           {message.text && (
//             <div className={`p-3 rounded-lg text-center ${
//               message.type === "success" 
//                 ? "bg-green-100 text-green-700 border border-green-300" 
//                 : "bg-red-100 text-red-700 border border-red-300"
//             }`}>
//               {message.text}
//             </div>
//           )}

//           {/* Tab Buttons */}
//           <div className="flex w-full rounded-lg overflow-hidden border">
//             <button
//               onClick={() => setActiveTab("define")}
//               className={`w-1/2 py-3 text-center transition-colors ${
//                 activeTab === "define"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               Define Fee Categories
//             </button>
//             <button
//               onClick={() => setActiveTab("assign")}
//               className={`w-1/2 py-3 text-center transition-colors ${
//                 activeTab === "assign"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               Assign Fees to Standards
//             </button>
//           </div>

//           {/* Content Switcher */}
//           <div className="border rounded-lg p-6 bg-white shadow-md">
//             {activeTab === "define" ? (
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   Manage Fee Categories
//                 </h3>
//                 
//                 {/* Add New Category */}
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     value={newCategory}
//                     onChange={(e) => setNewCategory(e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && addFeeCategory()}
//                     placeholder="Enter fee category name"
//                     className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
//                   />
//                   <button
//                     onClick={addFeeCategory}
//                     disabled={!newCategory.trim()}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Add
//                   </button>
//                 </div>

//                 {/* Fee Structure Summary */}
//                 {calculateTotal() > 0 && (
//                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                     <h4 className="font-semibold text-blue-800 mb-3">Fee Structure Breakdown:</h4>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                       <div className="text-center">
//                         <div className="font-medium text-gray-600">Monthly</div>
//                         <div className="text-lg font-semibold text-blue-700">
//                           ₹{Math.round(calculateTotal() / 12).toLocaleString()}
//                         </div>
//                       </div>
//                       <div className="text-center">
//                         <div className="font-medium text-gray-600">Quarterly</div>
//                         <div className="text-lg font-semibold text-blue-700">
//                           ₹{Math.round(calculateTotal() / 4).toLocaleString()}
//                         </div>
//                       </div>
//                       <div className="text-center">
//                         <div className="font-medium text-gray-600">Half-Yearly</div>
//                         <div className="text-lg font-semibold text-blue-700">
//                           ₹{Math.round(calculateTotal() / 2).toLocaleString()}
//                         </div>
//                       </div>
//                       <div className="text-center">
//                         <div className="font-medium text-gray-600">Annual</div>
//                         <div className="text-lg font-semibold text-blue-700">
//                           ₹{calculateTotal().toLocaleString()}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {feeCategories.length === 0 && (
//                   <p className="text-gray-500 text-center py-4">
//                     No fee categories defined. Add a category to get started.
//                   </p>
//                 )}

//                 <div className="flex justify-end">
//                   <button
//                     onClick={handleSaveDefine}
//                     disabled={loading || feeCategories.length === 0}
//                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {loading ? "Saving..." : "Save Categories"}
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   Assign Fees to Standards
//                 </h3>

//                 {/* Standard Selection */}
//                 <div className="flex justify-center items-center gap-2">
//                   <label className="font-medium">Standard:</label>
//                   <select
//                     value={selectedStd}
//                     onChange={(e) => setSelectedStd(e.target.value)}
//                     className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
//                   >
//                     <option value="">Select Standard</option>
//                     <option value="1st">1st</option>
//                     <option value="2nd">2nd</option>
//                     <option value="3rd">3rd</option>
//                     <option value="4th">4th</option>
//                     <option value="5th">5th</option>
//                     <option value="6th">6th</option>
//                     <option value="7th">7th</option>
//                     <option value="8th">8th</option>
//                     <option value="9th">9th</option>
//                     <option value="10th">10th</option>
//                     <option value="11th">11th</option>
//                     <option value="12th">12th</option>
//                   </select>
//                 </div>

//                 {/* Fee Assignment Table */}
//                 <div className="overflow-x-auto">
//                   <table className="w-full border border-gray-300 rounded-lg">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="border border-gray-300 py-3 px-4 text-left">
//                           Fee Category
//                         </th>
//                         <th className="border border-gray-300 py-3 px-4 text-left">
//                           Amount (₹)
//                         </th>
//                         <th className="border border-gray-300 py-3 px-4 text-center">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {assignFees.map((fee, index) => (
//                         <tr key={index}>
//                           <td className="border border-gray-300 p-2">
//                             <select
//                               value={fee.category}
//                               onChange={(e) =>
//                                 handleAssignChange(index, "category", e.target.value)
//                               }
//                               className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-blue-500"
//                             >
//                               <option value="">Select Category</option>
//                               {feeCategories.map((category, catIndex) => {
//                                 const categoryName = typeof category === "string" ? category : category.title || "";
//                                 return (
//                                   <option key={catIndex} value={categoryName}>
//                                     {categoryName}
//                                   </option>
//                                 );
//                               })}
//                             </select>
//                           </td>
//                           <td className="border border-gray-300 p-2">
//                             <input
//                               type="number"
//                               value={fee.amount}
//                               onChange={(e) =>
//                                 handleAssignChange(index, "amount", e.target.value)
//                               }
//                               min="0"
//                               className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-blue-500"
//                             />
//                           </td>
//                           <td className="border border-gray-300 text-center p-2">
//                             <button
//                               onClick={addAssignFeeRow}
//                               className="text-green-600 hover:text-green-800 mx-1 text-xl font-bold"
//                               title="Add Row"
//                             >
//                               +
//                             </button>
//                             {assignFees.length > 1 && (
//                               <button
//                                 onClick={() => removeAssignFeeRow(index)}
//                                 className="text-red-600 hover:text-red-800 mx-1 text-xl font-bold"
//                                 title="Remove Row"
//                               >
//                                 −
//                               </button>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                       <tr className="bg-gray-50 font-semibold">
//                         <td className="border border-gray-300 py-2 px-4 text-right">
//                           Annual Total:
//                         </td>
//                         <td className="border border-gray-300 py-2 px-4">
//                           ₹{calculateTotal().toLocaleString()}
//                         </td>
//                         <td className="border border-gray-300"></td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>

//                 {feeCategories.length === 0 && (
//                   <p className="text-amber-600 bg-amber-50 border border-amber-200 rounded p-3 text-center">
//                     No fee categories available. Please define fee categories first.
//                   </p>
//                 )}

//                 <div className="flex justify-end">
//                   <button
//                     onClick={handleSaveAssign}
//                     disabled={loading || feeCategories.length === 0}
//                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {loading ? "Saving..." : "Save Assignment"}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default FeesStructureSetup;

// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";
// // --- Import the API Base URL from the config file ---
// import { API_BASE_URL } from "../config"; 

// const FeesStructureSetup = () => {
//   const [activeTab, setActiveTab] = useState("define");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });

//   // For Define Fee Categories
//   const [feeCategories, setFeeCategories] = useState([]);
//   const [newCategory, setNewCategory] = useState("");

//   // For Assign Fees to Standards
//   const [selectedStd, setSelectedStd] = useState("");
//   const [assignFees, setAssignFees] = useState([{ category: "", amount: "" }]);

//   // API configuration
//   // CRITICAL FIX: Removed local definition and using imported API_BASE_URL
//   const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

//   // Fetch existing categories on component mount
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       // FIX 1: Using imported API_BASE_URL
//       const response = await axios.get(`${API_BASE_URL}api/categories`, {
//         headers: { auth: AUTH_HEADER },
//       });
//       
//       if (response.status === 200) {
//         const categoriesData = response.data[0];
//         if (categoriesData?.title) {
//           // Handle comma-separated string format
//           const categoriesArray = String(categoriesData.title)
//             .split(",")
//             .map(cat => cat.trim())
//             .filter(cat => cat);
//           setFeeCategories(categoriesArray);
//         } else if (Array.isArray(response.data)) {
//           // Handle array format
//           setFeeCategories(response.data);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       showMessage("error", "Failed to load fee categories");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showMessage = (type, text) => {
//     setMessage({ type, text });
//     setTimeout(() => setMessage({ type: "", text: "" }), 3000);
//   };

//   // Handlers for Define Fee Categories
//   const addFeeCategory = () => {
//     if (newCategory.trim()) {
//       setFeeCategories([...feeCategories, newCategory.trim()]);
//       setNewCategory("");
//     }
//   };

//   const removeFeeCategory = (index) => {
//     const updated = feeCategories.filter((_, i) => i !== index);
//     setFeeCategories(updated);
//   };

//   const handleFeeCategoryChange = (index, value) => {
//     const updated = [...feeCategories];
//     updated[index] = value;
//     setFeeCategories(updated);
//   };

//   // Handlers for Assign Fees
//   const handleAssignChange = (index, field, value) => {
//     const updated = [...assignFees];
//     updated[index][field] = value;
//     setAssignFees(updated);
//   };

//   const addAssignFeeRow = () => {
//     setAssignFees([...assignFees, { category: "", amount: "" }]);
//   };

//   const removeAssignFeeRow = (index) => {
//     if (assignFees.length > 1) {
//       const updated = assignFees.filter((_, i) => i !== index);
//       setAssignFees(updated);
//     }
//   };

//   const calculateTotal = () => {
//     return assignFees.reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
//   };

//   const validateAssignFees = () => {
//     if (!selectedStd) {
//       showMessage("error", "Please select a standard");
//       return false;
//     }
//     
//     const hasEmptyFields = assignFees.some(fee => !fee.category || !fee.amount);
//     if (hasEmptyFields) {
//       showMessage("error", "Please fill all category and amount fields");
//       return false;
//     }
//     
//     return true;
//   };

//   const handleSaveDefine = async () => {
//     if (feeCategories.length === 0) {
//       showMessage("error", "Please add at least one fee category");
//       return;
//     }

//     setLoading(true);
//     try {
//       // FIX 2: Using imported API_BASE_URL
//       const response = await axios.post(
//         `${API_BASE_URL}api/add-category`,
//         { categories: feeCategories },
//         {
//           headers: { auth: AUTH_HEADER },
//         }
//       );
//       
//       if (response.status === 200 || response.status === 201) {
//         showMessage("success", "Fee categories saved successfully");
//       }
//     } catch (error) {
//       console.error("Error saving categories:", error);
//       showMessage("error", "Failed to save fee categories");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveAssign = async () => {
//     if (!validateAssignFees()) return;

//     setLoading(true);
//     try {
//       const totalAmount = calculateTotal();
//       
//       // Format data according to your MongoDB schema
//       const payload = {
//         standard: selectedStd,
//         categories: assignFees
//           .filter(fee => fee.category && fee.amount)
//           .map(fee => ({
//             name: fee.category,
//             amount: Number(fee.amount)
//           })),
//         total: totalAmount,
//         // Optional: Calculate different fee structures based on total
//         monthlyfee: Math.round(totalAmount / 12),
//         quarterlyfee: Math.round(totalAmount / 4),
//         halfYearlyfee: Math.round(totalAmount / 2),
//         annualfee: totalAmount
//       };

//       // FIX 3: Using imported API_BASE_URL
//       const response = await axios.post(
//         `${API_BASE_URL}api/add-fee`,
//         payload,
//         {
//           headers: { auth: AUTH_HEADER },
//         }
//       );
//       
//       if (response.status === 200 || response.status === 201) {
//         showMessage("success", "Fee assignment saved successfully");
//         console.log("Saved fee structure:", payload);
//         
//         // Reset form
//         setSelectedStd("");
//         setAssignFees([{ category: "", amount: "" }]);
//       }
//     } catch (error) {
//       console.error("Error saving fee assignment:", error);
//       showMessage("error", "Failed to save fee assignment");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6 space-y-8">
//           {/* Title */}
//           <h2 className="text-2xl font-bold text-center text-gray-800">
//             Fees Structure Setup
//           </h2>

//           {/* Message Display */}
//           {message.text && (
//             <div className={`p-3 rounded-lg text-center ${
//               message.type === "success" 
//                 ? "bg-green-100 text-green-700 border border-green-300" 
//                 : "bg-red-100 text-red-700 border border-red-300"
//             }`}>
//               {message.text}
//             </div>
//           )}

//           {/* Tab Buttons */}
//           <div className="flex w-full rounded-lg overflow-hidden border">
//             <button
//               onClick={() => setActiveTab("define")}
//               className={`w-1/2 py-3 text-center transition-colors ${
//                 activeTab === "define"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               Define Fee Categories
//             </button>
//             <button
//               onClick={() => setActiveTab("assign")}
//               className={`w-1/2 py-3 text-center transition-colors ${
//                 activeTab === "assign"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               Assign Fees to Standards
//             </button>
//           </div>

//           {/* Content Switcher */}
//           <div className="border rounded-lg p-6 bg-white shadow-md">
//             {activeTab === "define" ? (
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   Manage Fee Categories
//                 </h3>
//                 
//                 {/* Add New Category */}
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     value={newCategory}
//                     onChange={(e) => setNewCategory(e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && addFeeCategory()}
//                     placeholder="Enter fee category name"
//                     className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
//                   />
//                   <button
//                     onClick={addFeeCategory}
//                     disabled={!newCategory.trim()}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Add
//                   </button>
//                 </div>

//                 {/* Fee Structure Summary */}
//                 {calculateTotal() > 0 && (
//                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                     <h4 className="font-semibold text-blue-800 mb-3">Fee Structure Breakdown:</h4>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                       <div className="text-center">
//                         <div className="font-medium text-gray-600">Monthly</div>
//                         <div className="text-lg font-semibold text-blue-700">
//                           ₹{Math.round(calculateTotal() / 12).toLocaleString()}
//                         </div>
//                       </div>
//                       <div className="text-center">
//                         <div className="font-medium text-gray-600">Quarterly</div>
//                         <div className="text-lg font-semibold text-blue-700">
//                           ₹{Math.round(calculateTotal() / 4).toLocaleString()}
//                         </div>
//                       </div>
//                       <div className="text-center">
//                         <div className="font-medium text-gray-600">Half-Yearly</div>
//                         <div className="text-lg font-semibold text-blue-700">
//                           ₹{Math.round(calculateTotal() / 2).toLocaleString()}
//                         </div>
//                       </div>
//                       <div className="text-center">
//                         <div className="font-medium text-gray-600">Annual</div>
//                         <div className="text-lg font-semibold text-blue-700">
//                           ₹{calculateTotal().toLocaleString()}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {feeCategories.length === 0 && (
//                   <p className="text-gray-500 text-center py-4">
//                     No fee categories defined. Add a category to get started.
//                   </p>
//                 )}

//                 <div className="flex justify-end">
//                   <button
//                     onClick={handleSaveDefine}
//                     disabled={loading || feeCategories.length === 0}
//                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {loading ? "Saving..." : "Save Categories"}
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   Assign Fees to Standards
//                 </h3>

//                 {/* Standard Selection */}
//                 <div className="flex justify-center items-center gap-2">
//                   <label className="font-medium">Standard:</label>
//                   <select
//                     value={selectedStd}
//                     onChange={(e) => setSelectedStd(e.target.value)}
//                     className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
//                   >
//                     <option value="">Select Standard</option>
//                     <option value="1st">1st</option>
//                     <option value="2nd">2nd</option>
//                     <option value="3rd">3rd</option>
//                     <option value="4th">4th</option>
//                     <option value="5th">5th</option>
//                     <option value="6th">6th</option>
//                     <option value="7th">7th</option>
//                     <option value="8th">8th</option>
//                     <option value="9th">9th</option>
//                     <option value="10th">10th</option>
//                     <option value="11th">11th</option>
//                     <option value="12th">12th</option>
//                   </select>
//                 </div>

//                 {/* Fee Assignment Table */}
//                 <div className="overflow-x-auto">
//                   <table className="w-full border border-gray-300 rounded-lg">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="border border-gray-300 py-3 px-4 text-left">
//                           Fee Category
//                         </th>
//                         <th className="border border-gray-300 py-3 px-4 text-left">
//                           Amount (₹)
//                         </th>
//                         <th className="border border-gray-300 py-3 px-4 text-center">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {assignFees.map((fee, index) => (
//                         <tr key={index}>
//                           <td className="border border-gray-300 p-2">
//                             <select
//                               value={fee.category}
//                               onChange={(e) =>
//                                 handleAssignChange(index, "category", e.target.value)
//                               }
//                               className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-blue-500"
//                             >
//                               <option value="">Select Category</option>
//                               {feeCategories.map((category, catIndex) => {
//                                 const categoryName = typeof category === "string" ? category : category.title || "";
//                                 return (
//                                   <option key={catIndex} value={categoryName}>
//                                     {categoryName}
//                                   </option>
//                                 );
//                               })}
//                             </select>
//                           </td>
//                           <td className="border border-gray-300 p-2">
//                             <input
//                               type="number"
//                               value={fee.amount}
//                               onChange={(e) =>
//                                 handleAssignChange(index, "amount", e.target.value)
//                               }
//                               min="0"
//                               className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-blue-500"
//                             />
//                           </td>
//                           <td className="border border-gray-300 text-center p-2">
//                             <button
//                               onClick={addAssignFeeRow}
//                               className="text-green-600 hover:text-green-800 mx-1 text-xl font-bold"
//                               title="Add Row"
//                             >
//                               +
//                             </button>
//                             {assignFees.length > 1 && (
//                               <button
//                                 onClick={() => removeAssignFeeRow(index)}
//                                 className="text-red-600 hover:text-red-800 mx-1 text-xl font-bold"
//                                 title="Remove Row"
//                               >
//                                 −
//                               </button>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                       <tr className="bg-gray-50 font-semibold">
//                         <td className="border border-gray-300 py-2 px-4 text-right">
//                           Annual Total:
//                         </td>
//                         <td className="border border-gray-300 py-2 px-4">
//                           ₹{calculateTotal().toLocaleString()}
//                         </td>
//                         <td className="border border-gray-300"></td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>

//                 {feeCategories.length === 0 && (
//                   <p className="text-amber-600 bg-amber-50 border border-amber-200 rounded p-3 text-center">
//                     No fee categories available. Please define fee categories first.
//                   </p>
//                 )}

//                 <div className="flex justify-end">
//                   <button
//                     onClick={handleSaveAssign}
//                     disabled={loading || feeCategories.length === 0}
//                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {loading ? "Saving..." : "Save Assignment"}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default FeesStructureSetup;




// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";
// // --- Import the API Base URL from the config file ---
// import { API_BASE_URL } from "../config"; 

// const FeesStructureSetup = () => {
//   const [activeTab, setActiveTab] = useState("define");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });

//   // For Define Fee Categories
//   const [feeCategories, setFeeCategories] = useState([]);
//   const [newCategory, setNewCategory] = useState("");

//   // For Assign Fees to Standards
//   const [selectedStd, setSelectedStd] = useState("");
//   const [assignFees, setAssignFees] = useState([{ category: "", amount: "" }]);

//   // API configuration
//   // CRITICAL FIX: Removed local definition and using imported API_BASE_URL
//   const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

//   // Fetch existing categories on component mount
//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       // FIX 1: Using imported API_BASE_URL
//       const response = await axios.get(`${API_BASE_URL}api/categories`, {
//         headers: { auth: AUTH_HEADER },
//       });
//       
//       if (response.status === 200) {
//         const categoriesData = response.data[0];
//         if (categoriesData?.title) {
//           // Handle comma-separated string format
//           const categoriesArray = String(categoriesData.title)
//             .split(",")
//             .map(cat => cat.trim())
//             .filter(cat => cat);
//           setFeeCategories(categoriesArray);
//         } else if (Array.isArray(response.data)) {
//           // Handle array format (assuming the array elements are strings or have a 'title' property if they are objects, but treating as strings here based on usage)
//             const cleanedCategories = response.data.map(cat => typeof cat === 'string' ? cat : (cat.title || '')).filter(c => c);
//           setFeeCategories(cleanedCategories);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       showMessage("error", "Failed to load fee categories");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showMessage = (type, text) => {
//     setMessage({ type, text });
//     setTimeout(() => setMessage({ type: "", text: "" }), 3000);
//   };

//   // Handlers for Define Fee Categories
//   const addFeeCategory = () => {
//     if (newCategory.trim()) {
//       // Check for duplicates before adding
//       if (!feeCategories.map(cat => cat.toLowerCase()).includes(newCategory.trim().toLowerCase())) {
//         setFeeCategories([...feeCategories, newCategory.trim()]);
//         setNewCategory("");
//       } else {
//         showMessage("error", "Category already exists!");
//       }
//     }
//   };

//   const removeFeeCategory = (index) => {
//     const updated = feeCategories.filter((_, i) => i !== index);
//     setFeeCategories(updated);
//   };

//   const handleFeeCategoryChange = (index, value) => {
//     const updated = [...feeCategories];
//     updated[index] = value;
//     setFeeCategories(updated);
//   };

//   // Handlers for Assign Fees
//   const handleAssignChange = (index, field, value) => {
//     const updated = [...assignFees];
//     updated[index][field] = value;
//     setAssignFees(updated);
//   };

//   const addAssignFeeRow = () => {
//     setAssignFees([...assignFees, { category: "", amount: "" }]);
//   };

//   const removeAssignFeeRow = (index) => {
//     if (assignFees.length > 1) {
//       const updated = assignFees.filter((_, i) => i !== index);
//       setAssignFees(updated);
//     }
//   };

//   const calculateTotal = () => {
//     return assignFees.reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
//   };

//   const validateAssignFees = () => {
//     if (!selectedStd) {
//       showMessage("error", "Please select a standard");
//       return false;
//     }
//     
//     const hasEmptyFields = assignFees.some(fee => !fee.category || !fee.amount);
//     if (hasEmptyFields) {
//       showMessage("error", "Please fill all category and amount fields");
//       return false;
//     }
//     
//     return true;
//   };

//   const handleSaveDefine = async () => {
//     if (feeCategories.length === 0) {
//       showMessage("error", "Please add at least one fee category");
//       return;
//     }

//     setLoading(true);
//     try {
//       // FIX 2: Using imported API_BASE_URL
//       const response = await axios.post(
//         `${API_BASE_URL}api/add-category`,
//         { categories: feeCategories },
//         {
//           headers: { auth: AUTH_HEADER },
//         }
//       );
//       
//       if (response.status === 200 || response.status === 201) {
//         showMessage("success", "Fee categories saved successfully");
//         fetchCategories(); // Re-fetch to ensure the state is updated from DB if structure changes
//       }
//     } catch (error) {
//       console.error("Error saving categories:", error);
//       showMessage("error", "Failed to save fee categories");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSaveAssign = async () => {
//     if (!validateAssignFees()) return;

//     setLoading(true);
//     try {
//       const totalAmount = calculateTotal();
//       
//       // Format data according to your MongoDB schema
//       const payload = {
//         standard: selectedStd,
//         // FIX for 400 Error: Added required 'title' field to satisfy the Fee model schema
//         title: `Annual Fee Structure for ${selectedStd}`, 
//         categories: assignFees
//           .filter(fee => fee.category && fee.amount)
//           .map(fee => ({
//             name: fee.category,
//             amount: Number(fee.amount)
//           })),
//         total: totalAmount,
//         // Optional: Calculate different fee structures based on total
//         monthlyfee: Math.round(totalAmount / 12),
//         quarterlyfee: Math.round(totalAmount / 4),
//         halfYearlyfee: Math.round(totalAmount / 2),
//         annualfee: totalAmount
//       };

//       // FIX 3: Using imported API_BASE_URL
//       const response = await axios.post(
//         `${API_BASE_URL}api/add-fee`,
//         payload,
//         {
//           headers: { auth: AUTH_HEADER },
//         }
//       );
//       
//       if (response.status === 200 || response.status === 201) {
//         showMessage("success", "Fee assignment saved successfully");
//         console.log("Saved fee structure:", payload);
//         
//         // Reset form
//         setSelectedStd("");
//         setAssignFees([{ category: "", amount: "" }]);
//       }
//     } catch (error) {
//       console.error("Error saving fee assignment:", error);
//       showMessage("error", "Failed to save fee assignment");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6 space-y-8">
//           {/* Title */}
//           <h2 className="text-2xl font-bold text-center text-gray-800">
//             Fees Structure Setup
//           </h2>

//           {/* Message Display */}
//           {message.text && (
//             <div className={`p-3 rounded-lg text-center ${
//               message.type === "success" 
//                 ? "bg-green-100 text-green-700 border border-green-300" 
//                 : "bg-red-100 text-red-700 border border-red-300"
//             }`}>
//               {message.text}
//             </div>
//           )}

//           {/* Tab Buttons */}
//           <div className="flex w-full rounded-lg overflow-hidden border">
//             <button
//               onClick={() => setActiveTab("define")}
//               className={`w-1/2 py-3 text-center transition-colors ${
//                 activeTab === "define"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               Define Fee Categories
//             </button>
//             <button
//               onClick={() => setActiveTab("assign")}
//               className={`w-1/2 py-3 text-center transition-colors ${
//                 activeTab === "assign"
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               Assign Fees to Standards
//             </button>
//           </div>

//           {/* Content Switcher */}
//           <div className="border rounded-lg p-6 bg-white shadow-md">
//             {activeTab === "define" ? (
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   Manage Fee Categories
//                 </h3>
//                 
//                 {/* Add New Category */}
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     value={newCategory}
//                     onChange={(e) => setNewCategory(e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && addFeeCategory()}
//                     placeholder="Enter fee category name"
//                     className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
//                   />
//                   <button
//                     onClick={addFeeCategory}
//                     disabled={!newCategory.trim()}
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Add
//                   </button>
//                 </div>

//                 {/* List of Defined Categories (FIXED UI) */}
//                 {feeCategories.length > 0 ? (
//                     <div className="border border-gray-200 rounded-lg p-3 max-h-60 overflow-y-auto">
//                         {feeCategories.map((category, index) => (
//                             <div 
//                                 key={index} 
//                                 className="flex justify-between items-center py-2 px-3 border-b last:border-b-0"
//                             >
//                                 <span className="text-gray-700">{category}</span>
//                                 <button
//                                     onClick={() => removeFeeCategory(index)}
//                                     className="text-red-500 hover:text-red-700 font-bold"
//                                     title="Remove Category"
//                                 >
//                                     &times;
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <p className="text-gray-500 text-center py-4">
//                         No fee categories defined. Add a category to get started.
//                     </p>
//                 )}
//                 
//                 {/* Fee Structure Summary (From original code) */}
//                 {calculateTotal() > 0 && (
//                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                     <h4 className="font-semibold text-blue-800 mb-3">Fee Structure Breakdown:</h4>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                       <div className="text-center">
//                         <div className="font-medium text-gray-600">Monthly</div>
//                         <div className="text-lg font-semibold text-blue-700">
//                           ₹{Math.round(calculateTotal() / 12).toLocaleString()}
//                         </div>
//                       </div>
//                       <div className="text-center">
//                         <div className="font-medium text-gray-600">Quarterly</div>
//                         <div className="text-lg font-semibold text-blue-700">
//                           ₹{Math.round(calculateTotal() / 4).toLocaleString()}
//                         </div>
//                       </div>
//                       <div className="text-center">
//                         <div className="font-medium text-gray-600">Half-Yearly</div>
//                         <div className="text-lg font-semibold text-blue-700">
//                           ₹{Math.round(calculateTotal() / 2).toLocaleString()}
//                         </div>
//                       </div>
//                       <div className="text-center">
//                         <div className="font-medium text-gray-600">Annual</div>
//                         <div className="text-lg font-semibold text-blue-700">
//                           ₹{calculateTotal().toLocaleString()}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex justify-end">
//                   <button
//                     onClick={handleSaveDefine}
//                     disabled={loading || feeCategories.length === 0}
//                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {loading ? "Saving..." : "Save Categories"}
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 <h3 className="text-lg font-semibold text-gray-700">
//                   Assign Fees to Standards
//                 </h3>

//                 {/* Standard Selection */}
//                 <div className="flex justify-center items-center gap-2">
//                   <label className="font-medium">Standard:</label>
//                   <select
//                     value={selectedStd}
//                     onChange={(e) => setSelectedStd(e.target.value)}
//                     className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
//                   >
//                     <option value="">Select Standard</option>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     <option value="4">4</option>
//                     <option value="5">5</option>
//                     <option value="6">6</option>
//                     <option value="7">7</option>
//                     <option value="8">8</option>
//                     <option value="9">9</option>
//                     <option value="10">10</option>
//                   </select>
//                 </div>

//                 {/* Fee Assignment Table */}
//                 <div className="overflow-x-auto">
//                   <table className="w-full border border-gray-300 rounded-lg">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="border border-gray-300 py-3 px-4 text-left">
//                           Fee Category
//                         </th>
//                         <th className="border border-gray-300 py-3 px-4 text-left">
//                           Amount (₹)
//                         </th>
//                         <th className="border border-gray-300 py-3 px-4 text-center">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {assignFees.map((fee, index) => (
//                         <tr key={index}>
//                           <td className="border border-gray-300 p-2">
//                             <select
//                               value={fee.category}
//                               onChange={(e) =>
//                                 handleAssignChange(index, "category", e.target.value)
//                               }
//                               className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-blue-500"
//                             >
//                               <option value="">Select Category</option>
//                               {feeCategories.map((category, catIndex) => {
//                                 const categoryName = typeof category === "string" ? category : category.title || "";
//                                 return (
//                                   <option key={catIndex} value={categoryName}>
//                                     {categoryName}
//                                   </option>
//                                 );
//                               })}
//                             </select>
//                           </td>
//                           <td className="border border-gray-300 p-2">
//                             <input
//                               type="number"
//                               value={fee.amount}
//                               onChange={(e) =>
//                                 handleAssignChange(index, "amount", e.target.value)
//                               }
//                               min="0"
//                               className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-blue-500"
//                             />
//                           </td>
//                           <td className="border border-gray-300 text-center p-2">
//                             <button
//                               onClick={addAssignFeeRow}
//                               className="text-green-600 hover:text-green-800 mx-1 text-xl font-bold"
//                               title="Add Row"
//                             >
//                               +
//                             </button>
//                             {assignFees.length > 1 && (
//                               <button
//                                 onClick={() => removeAssignFeeRow(index)}
//                                 className="text-red-600 hover:text-red-800 mx-1 text-xl font-bold"
//                                 title="Remove Row"
//                               >
//                                 −
//                               </button>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                       <tr className="bg-gray-50 font-semibold">
//                         <td className="border border-gray-300 py-2 px-4 text-right">
//                           Annual Total:
//                         </td>
//                         <td className="border border-gray-300 py-2 px-4">
//                           ₹{calculateTotal().toLocaleString()}
//                         </td>
//                         <td className="border border-gray-300"></td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>

//                 {feeCategories.length === 0 && (
//                   <p className="text-amber-600 bg-amber-50 border border-amber-200 rounded p-3 text-center">
//                     No fee categories available. Please define fee categories first.
//                   </p>
//                 )}

//                 <div className="flex justify-end">
//                   <button
//                     onClick={handleSaveAssign}
//                     disabled={loading || feeCategories.length === 0}
//                     className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {loading ? "Saving..." : "Save Assignment"}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default FeesStructureSetup;





import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config"; 

const FeesStructureSetup = () => {
  const [activeTab, setActiveTab] = useState("define");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // For Define Fee Categories
  const [feeCategories, setFeeCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  // For Assign Fees to Standards
  const [selectedStd, setSelectedStd] = useState("");
  const [assignFees, setAssignFees] = useState([{ category: "", amount: "" }]);

  // NEW STATE: To hold all saved fee structures (for display)
  const [savedFeeStructures, setSavedFeeStructures] = useState([]);

  // API configuration
  // CRITICAL FIX: Removed local definition and using imported API_BASE_URL
  const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

  // Fetch existing categories on component mount
  useEffect(() => {
    fetchCategories();
    fetchSavedFeeStructures(); // FETCH SAVED STRUCTURES ON MOUNT
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      // FIX 1: Using imported API_BASE_URL
      const response = await axios.get(`${API_BASE_URL}api/categories`, {
        headers: { auth: AUTH_HEADER },
      });
      
      if (response.status === 200) {
        const categoriesData = response.data[0];
        if (categoriesData?.title) {
          // Handle comma-separated string format
          const categoriesArray = String(categoriesData.title)
            .split(",")
            .map(cat => cat.trim())
            .filter(cat => cat);
          setFeeCategories(categoriesArray);
        } else if (Array.isArray(response.data)) {
          // Handle array format
          const cleanedCategories = response.data.map(cat => typeof cat === 'string' ? cat : (cat.title || '')).filter(c => c);
          setFeeCategories(cleanedCategories);
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      showMessage("error", "Failed to load fee categories");
    } finally {
      setLoading(false);
    }
  };
  
  // NEW FUNCTION: Fetch all existing fee structures
  const fetchSavedFeeStructures = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}api/fees`, {
            headers: { auth: AUTH_HEADER },
        });
        if (response.status === 200) {
            setSavedFeeStructures(response.data);
        }
    } catch (error) {
        console.error("Error fetching fee structures:", error);
        showMessage("error", "Failed to load saved fee structures");
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  // Handlers for Define Fee Categories
  const addFeeCategory = () => {
    if (newCategory.trim()) {
      // Check for duplicates before adding
      if (!feeCategories.map(cat => cat.toLowerCase()).includes(newCategory.trim().toLowerCase())) {
        setFeeCategories([...feeCategories, newCategory.trim()]);
        setNewCategory("");
      } else {
        showMessage("error", "Category already exists!");
      }
    }
  };

  const removeFeeCategory = (index) => {
    const updated = feeCategories.filter((_, i) => i !== index);
    setFeeCategories(updated);
  };

  const handleFeeCategoryChange = (index, value) => {
    const updated = [...feeCategories];
    updated[index] = value;
    setFeeCategories(updated);
  };

  // Handlers for Assign Fees
  const handleAssignChange = (index, field, value) => {
    const updated = [...assignFees];
    updated[index][field] = value;
    setAssignFees(updated);
  };

  const addAssignFeeRow = () => {
    setAssignFees([...assignFees, { category: "", amount: "" }]);
  };

  const removeAssignFeeRow = (index) => {
    if (assignFees.length > 1) {
      const updated = assignFees.filter((_, i) => i !== index);
      setAssignFees(updated);
    }
  };

  const calculateTotal = () => {
    return assignFees.reduce((sum, fee) => sum + Number(fee.amount || 0), 0);
  };

  const validateAssignFees = () => {
    if (!selectedStd) {
      showMessage("error", "Please select a standard");
      return false;
    }
    
    const hasEmptyFields = assignFees.some(fee => !fee.category || !fee.amount);
    if (hasEmptyFields) {
      showMessage("error", "Please fill all category and amount fields");
      return false;
    }
    
    return true;
  };

  const handleSaveDefine = async () => {
    if (feeCategories.length === 0) {
      showMessage("error", "Please add at least one fee category");
      return;
    }

    setLoading(true);
    try {
      // FIX 2: Using imported API_BASE_URL
      const response = await axios.post(
        `${API_BASE_URL}api/add-category`,
        { categories: feeCategories },
        {
          headers: { auth: AUTH_HEADER },
        }
      );
      
      if (response.status === 200 || response.status === 201) {
        showMessage("success", "Fee categories saved successfully");
        fetchCategories(); // Re-fetch to ensure the state is updated from DB if structure changes
      }
    } catch (error) {
      console.error("Error saving categories:", error);
      showMessage("error", "Failed to save fee categories");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAssign = async () => {
    if (!validateAssignFees()) return;

    setLoading(true);
    try {
      const totalAmount = calculateTotal();
      
      // Format data according to your MongoDB schema
      const payload = {
        standard: selectedStd,
        title: `Annual Fee Structure for ${selectedStd}`,
        categories: assignFees
          .filter(fee => fee.category && fee.amount)
          .map(fee => ({
            name: fee.category,
            amount: Number(fee.amount)
          })),
        total: totalAmount,
        // Optional: Calculate different fee structures based on total
        monthlyfee: Math.round(totalAmount / 12),
        quarterlyfee: Math.round(totalAmount / 4),
        halfYearlyfee: Math.round(totalAmount / 2),
        annualfee: totalAmount
      };

      // FIX 3: Using imported API_BASE_URL
      const response = await axios.post(
        `${API_BASE_URL}api/add-fee`,
        payload,
        {
          headers: { auth: AUTH_HEADER },
        }
      );
      
      if (response.status === 200 || response.status === 201) {
        showMessage("success", "Fee assignment saved successfully");
        console.log("Saved fee structure:", payload);
        fetchSavedFeeStructures(); // RE-FETCH TO DISPLAY THE NEWLY SAVED STRUCTURE
        
        // Reset form
        setSelectedStd("");
        setAssignFees([{ category: "", amount: "" }]);
      }
    } catch (error) {
      console.error("Error saving fee assignment:", error);
      showMessage("error", "Failed to save fee assignment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="p-6 space-y-8">
          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Fees Structure Setup
          </h2>

          {/* Message Display */}
          {message.text && (
            <div className={`p-3 rounded-lg text-center ${
              message.type === "success" 
                ? "bg-green-100 text-green-700 border border-green-300" 
                : "bg-red-100 text-red-700 border border-red-300"
            }`}>
              {message.text}
            </div>
          )}

          {/* Tab Buttons */}
          <div className="flex w-full rounded-lg overflow-hidden border">
            <button
              onClick={() => setActiveTab("define")}
              className={`w-1/2 py-3 text-center transition-colors ${
                activeTab === "define"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Define Fee Categories
            </button>
            <button
              onClick={() => setActiveTab("assign")}
              className={`w-1/2 py-3 text-center transition-colors ${
                activeTab === "assign"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Assign Fees to Standards
            </button>
          </div>

          {/* Content Switcher */}
          <div className="border rounded-lg p-6 bg-white shadow-md">
            {activeTab === "define" ? (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-700">
                  Manage Fee Categories
                </h3>
                
                {/* Add New Category */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addFeeCategory()}
                    placeholder="Enter fee category name"
                    className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={addFeeCategory}
                    disabled={!newCategory.trim()}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                </div>

                {/* List of Defined Categories */}
                {feeCategories.length > 0 ? (
                    <div className="border border-gray-200 rounded-lg p-3 max-h-60 overflow-y-auto">
                        {feeCategories.map((category, index) => (
                            <div 
                                key={index} 
                                className="flex justify-between items-center py-2 px-3 border-b last:border-b-0"
                            >
                                <span className="text-gray-700">{category}</span>
                                <button
                                    onClick={() => removeFeeCategory(index)}
                                    className="text-red-500 hover:text-red-700 font-bold"
                                    title="Remove Category"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center py-4">
                        No fee categories defined. Add a category to get started.
                    </p>
                )}
                
                {/* Fee Structure Summary */}
                {calculateTotal() > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-3">Fee Structure Breakdown:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-medium text-gray-600">Monthly</div>
                        <div className="text-lg font-semibold text-blue-700">
                          ₹{Math.round(calculateTotal() / 12).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-600">Quarterly</div>
                        <div className="text-lg font-semibold text-blue-700">
                          ₹{Math.round(calculateTotal() / 4).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-600">Half-Yearly</div>
                        <div className="text-lg font-semibold text-blue-700">
                          ₹{Math.round(calculateTotal() / 2).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-gray-600">Annual</div>
                        <div className="text-lg font-semibold text-blue-700">
                          ₹{calculateTotal().toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveDefine}
                    disabled={loading || feeCategories.length === 0}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Saving..." : "Save Categories"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-700">
                  Assign Fees to Standards
                </h3>

                {/* Standard Selection */}
                <div className="flex justify-center items-center gap-2">
                  <label className="font-medium">Standard:</label>
                  <select
                    value={selectedStd}
                    onChange={(e) => setSelectedStd(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select Standard</option>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     <option value="4">4</option>
//                     <option value="5">5</option>
//                     <option value="6">6</option>
//                     <option value="7">7</option>
//                     <option value="8">8</option>
//                     <option value="9">9</option>
//                     <option value="10">10</option>
                  </select>
                </div>

                {/* Fee Assignment Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 py-3 px-4 text-left">
                          Fee Category
                        </th>
                        <th className="border border-gray-300 py-3 px-4 text-left">
                          Amount (₹)
                        </th>
                        <th className="border border-gray-300 py-3 px-4 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignFees.map((fee, index) => (
                        <tr key={index}>
                          <td className="border border-gray-300 p-2">
                            <select
                              value={fee.category}
                              onChange={(e) =>
                                handleAssignChange(index, "category", e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-blue-500"
                            >
                              <option value="">Select Category</option>
                              {feeCategories.map((category, catIndex) => {
                                const categoryName = typeof category === "string" ? category : category.title || "";
                                return (
                                  <option key={catIndex} value={categoryName}>
                                    {categoryName}
                                  </option>
                                );
                              })}
                            </select>
                          </td>
                          <td className="border border-gray-300 p-2">
                            <input
                              type="number"
                              value={fee.amount}
                              onChange={(e) =>
                                handleAssignChange(index, "amount", e.target.value)
                              }
                              min="0"
                              className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-blue-500"
                            />
                          </td>
                          <td className="border border-gray-300 text-center p-2">
                            <button
                              onClick={addAssignFeeRow}
                              className="text-green-600 hover:text-green-800 mx-1 text-xl font-bold"
                              title="Add Row"
                            >
                              +
                            </button>
                            {assignFees.length > 1 && (
                              <button
                                onClick={() => removeAssignFeeRow(index)}
                                className="text-red-600 hover:text-red-800 mx-1 text-xl font-bold"
                                title="Remove Row"
                              >
                                −
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50 font-semibold">
                        <td className="border border-gray-300 py-2 px-4 text-right">
                          Annual Total:
                        </td>
                        <td className="border border-gray-300 py-2 px-4">
                          ₹{calculateTotal().toLocaleString()}
                        </td>
                        <td className="border border-gray-300"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {feeCategories.length === 0 && (
                  <p className="text-amber-600 bg-amber-50 border border-amber-200 rounded p-3 text-center">
                    No fee categories available. Please define fee categories first.
                  </p>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveAssign}
                    disabled={loading || feeCategories.length === 0}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Saving..." : "Save Assignment"}
                  </button>
                </div>
                
                {/* NEW BLOCK: Display Saved Fee Structures */}
                <h3 className="text-xl font-bold text-gray-800 pt-8 border-t mt-8">
                    Assigned Fee Structures
                </h3>
                
                <div className="overflow-x-auto">
                    {savedFeeStructures.length > 0 ? (
                        <table className="w-full border border-gray-300 rounded-lg text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="border py-2 px-3 text-left">Standard</th>
                                    <th className="border py-2 px-3 text-left">Annual Fee</th>
                                    <th className="border py-2 px-3 text-left">Categories</th>
                                    {/* <th className="border py-2 px-3 text-center">Actions</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {savedFeeStructures.map((structure) => (
                                    <tr key={structure._id}>
                                        <td className="border py-2 px-3 font-semibold">{structure.standard}</td>
                                        <td className="border py-2 px-3">
                                            ₹{structure.annualfee ? structure.annualfee.toLocaleString() : structure.total.toLocaleString()}
                                        </td>
                                        <td className="border py-2 px-3 text-xs">
                                            {structure.categories.map(c => `${c.name} (₹${c.amount.toLocaleString()})`).join(', ')}
                                        </td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-gray-500 text-center py-4">
                            No fee structures have been assigned yet.
                        </p>
                    )}
                </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FeesStructureSetup;