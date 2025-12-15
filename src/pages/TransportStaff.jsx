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











// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import AddVehicleStaff from "../components/AddVehicleStaff";
// import axios from "axios";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// export default function TransportStaff() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [driverData, setDriverData] = useState([]);

//   useEffect(() => {
//     const fetchDrivers = async () => {
//       try {
//         // FIX: Using imported API_BASE_URL
//         const response = await axios.get(`${API_BASE_URL}api/drivers`, {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         });
//         setDriverData(response.data);
//         console.log("driver data", response.data);
//         console.log("received data at transport staff", response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchDrivers();
//   }, []);

//   console.log("driver data", driverData);
//   const filteredData = driverData.filter(
//     (row) =>
//       row.vehicles?.vehicleno
//         ?.toLowerCase()
//         .includes(searchQuery.toLowerCase()) ||
//       row.vehicles?.vehiclename
//         ?.toLowerCase()
//         .includes(searchQuery.toLowerCase()) ||
//       row.vehicles?.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row.driverName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row.supervisorName?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-4 sm:p-6 space-y-6">
//           {/* Search + Add Button */}
//           <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="border px-3 py-2 rounded-md w-full sm:w-64"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <div className="space-x-3">
//               <button
//                 onClick={() => (window.location.href = "/add-supervisor")}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 sm:w-auto"
//               >
//                 Register & Supervisor 
//               </button>
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
//               >
//                 Add
//               </button>
//             </div>
//            </div>

//           {/* Title */}
//           <h2 className="text-center text-xl sm:text-2xl font-semibold">
//             Driver & Supervisor Management
//           </h2>

//           {/* Table */}
//           <div className="overflow-x-auto mt-4">
//             <table className="min-w-full border border-gray-300 text-center rounded text-sm sm:text-base">
//               <thead className="bg-blue-100 text-black">
//                 <tr>
//                   <th className="px-4 py-2 border">Vehicle Number</th>
//                   <th className="px-4 py-2 border">Vehicle Type</th>
//                   <th className="px-4 py-2 border">Status</th>
//                   <th className="px-4 py-2 border">Driver</th>
//                   <th className="px-4 py-2 border">Supervisor</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white">
//                 {filteredData.map((row, index) => (
//                   <tr key={index}>
//                     <td className="px-4 py-2 border">
//                       {row.vehicles?.vehicleno || "N/A"}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       {row.vehicles?.vehiclename || "N/A"}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       {row.vehicles?.status || "N/A"}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       {row.driverName || "N/A"}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       {row.supervisorName || "N/A"}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Modal */}
//           <AddVehicleStaff
//             isOpen={isModalOpen}
//             onClose={() => setIsModalOpen(false)}
//           />
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// // export default TransportStaff;






import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

// Import FontAwesomeIcons for the action column
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons"; 


// Helper component for rendering a single staff table
const StaffTable = ({ title, staffList, onActionClick }) => (
    <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-center">{title} List</h3>
        <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-center rounded text-sm sm:text-base">
                <thead className="bg-blue-100 text-black">
                    <tr>
                        <th className="px-4 py-2 border">Sr No</th>
                        <th className="px-4 py-2 border">Staff Name</th>
                        <th className="px-4 py-2 border">Role</th>
                        <th className="px-4 py-2 border">Gender</th>
                        <th className="px-4 py-2 border">Contact Number</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {staffList.length > 0 ? (
                        staffList.map((staff, index) => (
                        <tr key={staff._id || index}>
                            <td className="px-4 py-2 border">{index + 1}</td>
                            {/* Display fields (using fullName, contactNumber, etc.) */}
                            <td className="px-4 py-2 border">{staff.fullName || staff.driverName || "N/A"}</td>
                            <td className="px-4 py-2 border">{staff.designation || (title === 'Driver' ? 'Driver' : 'N/A')}</td>
                            <td className="px-4 py-2 border">{staff.gender || "N/A"}</td>
                            <td className="px-4 py-2 border">{staff.contactNumber || staff.contactNo || "N/A"}</td>
                            <td className="px-4 py-2 border">
                                <span className={`font-semibold ${staff.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                                    {staff.status || "N/A"}
                                </span>
                            </td>
                            <td className="px-4 py-2 border space-x-2"> 
                                {/* View Button: Navigates to the Edit/View Page */}
                                <button 
                                    title="View"
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={() => onActionClick(staff)}
                                >
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                                {/* Edit Button: Navigates to the Edit/View Page */}
                                <button 
                                    title="Edit"
                                    className="text-yellow-600 hover:text-yellow-800"
                                    onClick={() => onActionClick(staff)}
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="py-4 text-gray-500">
                                No {title.toLowerCase()} records found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);


export default function TransportStaff() {
  const [searchQuery, setSearchQuery] = useState("");
  const [staffData, setStaffData] = useState([]); // Holds all transport staff

    const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchTransportStaff = async () => {
      try {
        const headers = { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" };

        // 1. Fetch Supervisor data (from vehicle-supervisior collection)
        const supervisorsResponse = await axios.get(`${API_BASE_URL}api/vsupervisior`, { headers });
        const fetchedSupervisors = supervisorsResponse.data.data || [];
        
        // 2. Fetch Driver data (from drivers collection)
        const driversResponse = await axios.get(`${API_BASE_URL}api/drivers`, { headers });
        const fetchedDrivers = driversResponse.data || [];

        // 3. Combine and normalize the list
        const combinedStaff = [
            // Supervisors
            ...fetchedSupervisors.filter(s => s.designation === 'Supervisor'),
            // Drivers
            ...fetchedDrivers.map(d => ({ 
                ...d, 
                designation: d.designation || 'Driver',
                fullName: d.fullName || d.driverName 
            })).filter(d => d.designation === 'Driver')
        ];
        
        setStaffData(combinedStaff); 
      } catch (error) {
        console.error("Error fetching transport staff:", error);
      }
    };
    fetchTransportStaff();
  }, []);

  // Handler for View/Edit buttons: navigates to the dedicated page
  const handleActionClick = (staff) => {
      if (staff._id) {
          // FIX: Use the clear frontend route path for navigation
          navigate(`/transport-staff/edit/${staff._id}`); 
      } else {
          alert("Error: Staff ID is missing.");
      }
  };


  // Filter function for both lists based on searchQuery
  const filterStaff = (staffList) => {
    const search = searchQuery.toLowerCase();
    return staffList.filter(
        (staff) => {
            const fullName = staff.fullName || staff.driverName || "";
            const contact = staff.contactNumber || staff.contactNo || "";
            const designation = staff.designation || "";

            return (
                fullName.toLowerCase().includes(search) ||
                designation.toLowerCase().includes(search) ||
                staff.gender?.toLowerCase().includes(search) ||
                contact.toLowerCase().includes(search)
            );
        }
    );
  };
  
  const filteredList = filterStaff(staffData);
  const driversList = filteredList.filter(staff => staff.designation === 'Driver');
  const supervisorsList = filteredList.filter(staff => staff.designation === 'Supervisor');


  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="p-4 sm:p-6 space-y-6">
          {/* Search + Register Button */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <input
              type="text"
              placeholder="Search Staff (Name, Role, Contact...)"
              className="border px-3 py-2 rounded-md w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="space-x-3">
              {/* Button: Register Driver/Supervisor (Goes to the form page) */}
              <button
                onClick={() => (window.location.href = "/add-supervisor")}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 sm:w-auto"
              >
                Register 
              </button>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center text-xl sm:text-2xl font-semibold mb-8">
            Driver & Supervisor Staff List
          </h2>

          {/* Driver Table (Top Table) */}
          <StaffTable title="Driver" staffList={driversList} onActionClick={handleActionClick} />

          {/* Supervisor Table (Bottom Table) */}
          <StaffTable title="Supervisor" staffList={supervisorsList} onActionClick={handleActionClick} />

        </div>
        {/* The dedicated edit page component is NOT rendered here */}
      </div>
    </MainLayout>
  );
};