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


import React, { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../layout/MainLayout";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

const InstallmentManagement = () => {
  const [feesData, setFeesData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // FIX: Using imported API_BASE_URL
        const res = await axios.get(`${API_BASE_URL}api/combined-fees`, {
          headers: {
            "Content-Type": "application/json",
            auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
          },
        });
        setFeesData(res.data);
      } catch (err) {
        console.error("Error fetching fees:", err);
      }
    };

    fetchData();
  }, []);

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
                {/* Commented Pre Primary for now */}
                {/* <tr>
                  <td className="border py-2">Pre Primary</td>
                  <td className="border py-2"></td>
                  <td className="border py-2"></td>
                  <td className="border py-2"></td>
                  <td className="border py-2"></td>
                </tr> */}

                {/* Primary */}
                {feesData && (
                  <tr>
                    <td className="border py-2">Primary (1-7)</td>
                    <td className="border py-2">
                      {feesData.primary.totalAmount}
                    </td>
                    <td className="border py-2">
                      {feesData.primary.totalAmount / 2}
                    </td>
                    <td className="border py-2">
                      {feesData.primary.totalAmount / 4}
                    </td>
                    <td className="border py-2">
                      {feesData.primary.totalAmount / 12}
                    </td>
                  </tr>
                )}

                {/* Secondary */}
                {feesData && (
                  <tr>
                    <td className="border py-2">Secondary (8-10)</td>
                    <td className="border py-2">
                      {feesData.secondary.totalAmount}
                    </td>
                    <td className="border py-2">
                      {feesData.secondary.totalAmount / 2}
                    </td>
                    <td className="border py-2">
                      {feesData.secondary.totalAmount / 4}
                    </td>
                    <td className="border py-2">
                      {feesData.secondary.totalAmount / 12}
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