// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import MainLayout from "../layout/MainLayout";

// const InstallmentManagement = () => {
//   const [feesData, setFeesData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/combined-fees", {
//           headers: {
//             "Content-Type": "application/json",
//             auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//           },
//         });
//         setFeesData(res.data);
//       } catch (err) {
//         console.error("Error fetching fees:", err);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6 space-y-8">
//           {/* Title */}
//           <h1 className="text-2xl font-bold text-center">
//             Installments Management
//           </h1>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full text-center border border-blue-500">
//               <thead className="bg-blue-100 text-black">
//                 <tr>
//                   <th className="border py-2">Standard</th>
//                   <th className="border py-2">Yearly</th>
//                   <th className="border py-2">Half Yearly</th>
//                   <th className="border py-2">Quarterly</th>
//                   <th className="border py-2">Monthly</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white">
//                 {/* Commented Pre Primary for now */}
//                 {/* <tr>
//                   <td className="border py-2">Pre Primary</td>
//                   <td className="border py-2"></td>
//                   <td className="border py-2"></td>
//                   <td className="border py-2"></td>
//                   <td className="border py-2"></td>
//                 </tr> */}

//                 {/* Primary */}
//                 {feesData && (
//                   <tr>
//                     <td className="border py-2">Primary (1-7)</td>
//                     <td className="border py-2">
//                       {feesData.primary.totalAmount}
//                     </td>
//                     <td className="border py-2">
//                       {feesData.primary.totalAmount / 2}
//                     </td>
//                     <td className="border py-2">
//                       {feesData.primary.totalAmount / 4}
//                     </td>
//                     <td className="border py-2">
//                       {feesData.primary.totalAmount / 12}
//                     </td>
//                   </tr>
//                 )}

//                 {/* Secondary */}
//                 {feesData && (
//                   <tr>
//                     <td className="border py-2">Secondary (8-10)</td>
//                     <td className="border py-2">
//                       {feesData.secondary.totalAmount}
//                     </td>
//                     <td className="border py-2">
//                       {feesData.secondary.totalAmount / 2}
//                     </td>
//                     <td className="border py-2">
//                       {feesData.secondary.totalAmount / 4}
//                     </td>
//                     <td className="border py-2">
//                       {feesData.secondary.totalAmount / 12}
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default InstallmentManagement;






// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import MainLayout from "../layout/MainLayout";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// const InstallmentManagement = () => {
//   const [feesData, setFeesData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`${API_BASE_URL}api/combined-fees`, {
//           headers: {
//             "Content-Type": "application/json",
//             auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//           },
//         });
//         // Assuming response.data is { all: N, primary: P, secondary: S, preprimary: PP }
//         setFeesData(res.data);
//       } catch (err) {
//         console.error("Error fetching fees:", err);
//       }
//     };

//     fetchData();
//   }, []);
  
//   // Helper function to format currency and handle missing data
//   const formatCurrency = (amount) => {
//       const num = Number(amount);
//       if (isNaN(num) || num === 0) return '₹0';
//       return `₹${Math.round(num).toLocaleString()}`;
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6 space-y-8">
//           {/* Title */}
//           <h1 className="text-2xl font-bold text-center">
//             Installments Management
//           </h1>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full text-center border border-blue-500">
//               <thead className="bg-blue-100 text-black">
//                 <tr>
//                   <th className="border py-2">Standard</th>
//                   <th className="border py-2">Yearly</th>
//                   <th className="border py-2">Half Yearly</th>
//                   <th className="border py-2">Quarterly</th>
//                   <th className="border py-2">Monthly</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white">
//                 {feesData && (
//                     // FIX: Added Pre Primary row
//                   <tr>
//                     <td className="border py-2">Pre Primary</td>
//                     <td className="border py-2">
//                         {formatCurrency(feesData.preprimary)}
//                     </td>
//                     <td className="border py-2">
//                       {formatCurrency(feesData.preprimary / 2)}
//                     </td>
//                     <td className="border py-2">
//                       {formatCurrency(feesData.preprimary / 4)}
//                     </td>
//                     <td className="border py-2">
//                       {formatCurrency(feesData.preprimary / 12)}
//                     </td>
//                   </tr>
//                 )}
                
//                 {/* Primary */}
//                 {feesData && (
//                   <tr>
//                     <td className="border py-2">Primary (1-7)</td>
//                     <td className="border py-2">
//                         {/* FIX: Access feesData.primary directly */}
//                       {formatCurrency(feesData.primary)}
//                     </td>
//                     <td className="border py-2">
//                         {/* FIX: Access feesData.primary directly */}
//                       {formatCurrency(feesData.primary / 2)}
//                     </td>
//                     <td className="border py-2">
//                         {/* FIX: Access feesData.primary directly */}
//                       {formatCurrency(feesData.primary / 4)}
//                     </td>
//                     <td className="border py-2">
//                         {/* FIX: Access feesData.primary directly */}
//                       {formatCurrency(feesData.primary / 12)}
//                     </td>
//                   </tr>
//                 )}

//                 {/* Secondary */}
//                 {feesData && (
//                   <tr>
//                     <td className="border py-2">Secondary (8-10)</td>
//                     <td className="border py-2">
//                         {/* FIX: Access feesData.secondary directly */}
//                       {formatCurrency(feesData.secondary)}
//                     </td>
//                     <td className="border py-2">
//                         {/* FIX: Access feesData.secondary directly */}
//                       {formatCurrency(feesData.secondary / 2)}
//                     </td>
//                     <td className="border py-2">
//                         {/* FIX: Access feesData.secondary directly */}
//                       {formatCurrency(feesData.secondary / 4)}
//                     </td>
//                     <td className="border py-2">
//                         {/* FIX: Access feesData.secondary directly */}
//                       {formatCurrency(feesData.secondary / 12)}
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default InstallmentManagement;
















import React, { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../layout/MainLayout";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

const InstallmentManagement = () => {
  const [feesList, setFeesList] = useState([]);

  // FIX: Custom sort order for academic standards
  const ACADEMIC_ORDER = {
    "NURSERY": 1,
    "JUNIOR": 2,
    "SENIOR": 3,
    "1": 4, "2": 5, "3": 6, "4": 7, "5": 8,
    "6": 9, "7": 10, "8": 11, "9": 12, "10": 13
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // FIX: Call /api/fees to get individual standards instead of combined totals
        const res = await axios.get(`${API_BASE_URL}api/fees`, {
          headers: {
            "Content-Type": "application/json",
            auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
          },
        });
        
        // FIX: Sort the data based on ACADEMIC_ORDER
        const sortedData = Array.isArray(res.data) ? res.data.sort((a, b) => {
           const orderA = ACADEMIC_ORDER[a.standard.toUpperCase()] || 99;
           const orderB = ACADEMIC_ORDER[b.standard.toUpperCase()] || 99;
           return orderA - orderB;
        }) : [];

        setFeesList(sortedData);
      } catch (err) {
        console.error("Error fetching fees:", err);
      }
    };

    fetchData();
  }, []);
  
  // Helper function to format currency and handle missing data
  const formatCurrency = (amount) => {
      const num = Number(amount);
      if (isNaN(num) || num === 0) return '₹0';
      return `₹${Math.round(num).toLocaleString()}`;
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="p-6 space-y-8">
          {/* Title */}
          <h1 className="text-2xl font-bold text-center">
            Installments Management
          </h1>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-center border border-blue-500">
              <thead className="bg-blue-100 text-black">
                <tr>
                  <th className="border py-2">Standard</th>
                  <th className="border py-2">Yearly</th>
                  <th className="border py-2">Half Yearly</th>
                  <th className="border py-2">Quarterly</th>
                  <th className="border py-2">Monthly</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {/* FIX: Dynamically map over the feesList to show every individual standard */}
                {feesList.length > 0 ? (
                  feesList.map((item, index) => (
                    <tr key={index}>
                      <td className="border py-2 font-medium">{item.standard}</td>
                      <td className="border py-2">
                        {formatCurrency(item.annualfee)}
                      </td>
                      <td className="border py-2">
                        {formatCurrency(item.annualfee / 2)}
                      </td>
                      <td className="border py-2">
                        {formatCurrency(item.annualfee / 4)}
                      </td>
                      <td className="border py-2">
                        {formatCurrency(item.annualfee / 12)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="border py-4 text-gray-500 italic">
                      Loading standards and installments...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default InstallmentManagement;