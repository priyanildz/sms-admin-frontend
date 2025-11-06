// import React, { useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import AddVehicleStaff from "../components/AddVehicleStaff";
// import { useEffect } from "react";
// import axios from "axios";

// const TransportStaff = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [driverData, setDriverData] = useState([]);
//   useEffect(() => {
//     const fetchDrivers = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/drivers", {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         });
//         setDriverData(response.data);
//         console.log("driver data", response.data);
//         console.log("received data at transport staff", response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchDrivers();
//   }, []);

//   console.log("driver data", driverData);
//   const filteredData = driverData.filter(
//     (row) =>
//       row.vehicles?.vehicleno
//         ?.toLowerCase()
//         .includes(searchQuery.toLowerCase()) ||
//       row.vehicles?.vehiclename
//         ?.toLowerCase()
//         .includes(searchQuery.toLowerCase()) ||
//       row.vehicles?.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row.driverName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row.supervisorName?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-4 sm:p-6 space-y-6">
//           {/* Search + Add Button */}
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="border px-3 py-2 rounded-md w-full sm:w-64"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <div className="space-x-3">
//               <button
//                 onClick={() => (window.location.href = "/add-supervisor")}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 sm:w-auto"
//               >
//                 Register & Supervisor 
//               </button>
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
//               >
//                 Add
//               </button>
//             </div>
//           </div>

//           {/* Title */}
//           <h2 className="text-center text-xl sm:text-2xl font-semibold">
//             Driver & Supervisor Management
//           </h2>

//           {/* Table */}
//           <div className="overflow-x-auto mt-4">
//             <table className="min-w-full border border-gray-300 text-center rounded text-sm sm:text-base">
//               <thead className="bg-blue-100 text-black">
//                 <tr>
//                   <th className="px-4 py-2 border">Vehicle Number</th>
//                   <th className="px-4 py-2 border">Vehicle Type</th>
//                   <th className="px-4 py-2 border">Status</th>
//                   <th className="px-4 py-2 border">Driver</th>
//                   <th className="px-4 py-2 border">Supervisor</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white">
//                 {filteredData.map((row, index) => (
//                   <tr key={index}>
//                     <td className="px-4 py-2 border">
//                       {row.vehicles?.vehicleno || "N/A"}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       {row.vehicles?.vehiclename || "N/A"}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       {row.vehicles?.status || "N/A"}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       {row.driverName || "N/A"}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       {row.supervisorName || "N/A"}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Modal */}
//           <AddVehicleStaff
//             isOpen={isModalOpen}
//             onClose={() => setIsModalOpen(false)}
//           />
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default TransportStaff;

import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import AddVehicleStaff from "../components/AddVehicleStaff";
import axios from "axios";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

export default function TransportStaff() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [driverData, setDriverData] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        // FIX: Using imported API_BASE_URL
        const response = await axios.get(`${API_BASE_URL}api/drivers`, {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
        });
        setDriverData(response.data);
        console.log("driver data", response.data);
        console.log("received data at transport staff", response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDrivers();
  }, []);

  console.log("driver data", driverData);
  const filteredData = driverData.filter(
    (row) =>
      row.vehicles?.vehicleno
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      row.vehicles?.vehiclename
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      row.vehicles?.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.driverName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.supervisorName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="p-4 sm:p-6 space-y-6">
          {/* Search + Add Button */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-">
            <input
              type="text"
              placeholder="Search..."
              className="border px-3 py-2 rounded-md w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="space-x-3">
              <button
                onClick={() => (window.location.href = "/add-supervisor")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 sm:w-auto"
              >
                Register & Supervisor 
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
              >
                Add
              </button>
            </div>
           </div>

          {/* Title */}
          <h2 className="text-center text-xl sm:text-2xl font-semibold">
            Driver & Supervisor Management
          </h2>

          {/* Table */}
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full border border-gray-300 text-center rounded text-sm sm:text-base">
              <thead className="bg-blue-100 text-black">
                <tr>
                  <th className="px-4 py-2 border">Vehicle Number</th>
                  <th className="px-4 py-2 border">Vehicle Type</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Driver</th>
                  <th className="px-4 py-2 border">Supervisor</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredData.map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">
                      {row.vehicles?.vehicleno || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      {row.vehicles?.vehiclename || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      {row.vehicles?.status || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      {row.driverName || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      {row.supervisorName || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          <AddVehicleStaff
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </MainLayout>
  );
};

// export default TransportStaff;