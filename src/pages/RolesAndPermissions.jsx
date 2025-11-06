// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { toast } from "react-toastify";
// import MainLayout from "../layout/MainLayout";
// import AddStaffRoleModal from "../components/AddStaffRole";

// export default function RolesAndPermissions() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [rolesData, setRolesData] = useState([]);
//   const [filteredRoles, setFilteredRoles] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // 🔹 Map staffId → "Firstname Lastname"
//   const [staffMap, setStaffMap] = useState({});

//   useEffect(() => {
//     fetchRoles();
//     fetchStaff(); // also fetch staff list to map IDs to names
//   }, []);

//   const fetchRoles = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("http://localhost:5000/api/roles", {
//         headers: {
//           auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//         },
//       });
//       if (!response.ok) {
//         throw new Error("Failed to fetch roles");
//       }
//       const data = await response.json();
//       setRolesData(data);
//       setFilteredRoles(data);
//     } catch (error) {
//       toast.error(`Error: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Fetch staff and create a map of staffId → name
//   const fetchStaff = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/staff", {
//         headers: {
//           auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//         },
//       });
//       if (!response.ok) {
//         throw new Error("Failed to fetch staff");
//       }
//       const data = await response.json();
//       const map = {};
//       data.forEach((s) => {
//         map[s._id] = `${s.firstname} ${s.lastname}`;
//       });
//       setStaffMap(map);
//     } catch (error) {
//       toast.error(`Error: ${error.message}`);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//     filterRoles(e.target.value);
//   };

//   const filterRoles = (query) => {
//     if (!query) {
//       setFilteredRoles(rolesData);
//     } else {
//       setFilteredRoles(
//         rolesData.filter((role) =>
//           (staffMap[role.staff] || "").toLowerCase().includes(query.toLowerCase())
//         )
//       );
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="flex flex-1 flex-col p-4 sm:p-6 overflow-y-auto">
//           {/* Search and Add Button */}
//           <div className="mb-4 flex items-center justify-between">
//             <div className="relative w-full sm:w-72">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 placeholder="Search staff..."
//                 className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm"
//               />
//               <FontAwesomeIcon
//                 icon={faSearch}
//                 className="absolute top-2 right-3 text-gray-500"
//               />
//             </div>
//             <button
//               onClick={() => setShowModal(true)}
//               className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//             >
//               Add
//             </button>
//           </div>

//           {/* Header */}
//           <div className="my-4 text-center">
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//               Roles and Permissions
//             </h2>
//           </div>

//           {/* Table */}
//           {loading ? (
//             <div className="text-center">
//               <p>Loading roles...</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full table-auto border-collapse border border-gray-300">
//                 <thead>
//                   <tr className="bg-blue-100 text-black">
//                     <th className="px-4 py-2 border text-center font-bold">Staff Name</th>
//                     <th className="px-4 py-2 border text-center font-bold">Department</th>
//                     <th className="px-4 py-2 border text-center font-bold">Role Assigned</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white">
//                   {filteredRoles.map((role) => (
//                     <tr key={role._id} className="border-b border hover:bg-gray-50">
//                       <td className="px-4 py-2 text-sm border-l border-r text-center">
//                         {staffMap[role.staff] || role.staff}
//                       </td>
//                       <td className="px-4 py-2 text-sm border-l border-r text-center">
//                         {role.staffdept}
//                       </td>
//                       <td className="px-4 py-2 text-sm border-l border-r text-center">
//                         {role.roleassigned}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* Modal */}
//           <AddStaffRoleModal
//             isOpen={showModal}
//             onClose={() => {
//               setShowModal(false);
//               fetchRoles(); // Refresh roles after adding
//             }}
//           />
//         </div>
//       </div>
//     </MainLayout>
//   );
// }

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import MainLayout from "../layout/MainLayout";
import AddStaffRoleModal from "../components/AddStaffRole";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

export default function RolesAndPermissions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [rolesData, setRolesData] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 Map staffId → "Firstname Lastname"
  const [staffMap, setStaffMap] = useState({});

  const AUTH_HEADER = `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`;

  useEffect(() => {
    fetchRoles();
    fetchStaff(); // also fetch staff list to map IDs to names
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      // FIX 1: Using imported API_BASE_URL
      const response = await fetch(`${API_BASE_URL}api/roles`, {
        headers: {
          auth: AUTH_HEADER,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch roles");
      }
      const data = await response.json();
      setRolesData(data);
      setFilteredRoles(data);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch staff and create a map of staffId → name
  const fetchStaff = async () => {
    try {
      // FIX 2: Using imported API_BASE_URL
      const response = await fetch(`${API_BASE_URL}api/staff`, {
        headers: {
          auth: AUTH_HEADER,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch staff");
      }
      const data = await response.json();
      const map = {};
      data.forEach((s) => {
        map[s._id] = `${s.firstname} ${s.lastname}`;
      });
      setStaffMap(map);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterRoles(e.target.value);
  };

  const filterRoles = (query) => {
    if (!query) {
      setFilteredRoles(rolesData);
    } else {
      setFilteredRoles(
        rolesData.filter((role) =>
          (staffMap[role.staff] || "").toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex flex-1 flex-col p-4 sm:p-6 overflow-y-auto">
          {/* Search and Add Button */}
          <div className="mb-4 flex items-center justify-between">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search staff..."
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute top-2 right-3 text-gray-500"
              />
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>

          {/* Header */}
          <div className="my-4 text-center">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Roles and Permissions
            </h2>
          </div>

          {/* Table */}
          {loading ? (
            <div className="text-center">
              <p>Loading roles...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-100 text-black">
                    <th className="px-4 py-2 border text-center font-bold">Staff Name</th>
                    <th className="px-4 py-2 border text-center font-bold">Department</th>
                    <th className="px-4 py-2 border text-center font-bold">Role Assigned</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {filteredRoles.map((role) => (
                    <tr key={role._id} className="border-b border hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm border-l border-r text-center">
                        {staffMap[role.staff] || role.staff}
                      </td>
                      <td className="px-4 py-2 text-sm border-l border-r text-center">
                        {role.staffdept}
                      </td>
                      <td className="px-4 py-2 text-sm border-l border-r text-center">
                        {role.roleassigned}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Modal */}
          <AddStaffRoleModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              fetchRoles(); // Refresh roles after adding
            }}
          />
        </div>
      </div>
    </MainLayout>
  );
}