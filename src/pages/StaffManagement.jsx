// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import MainLayout from "../layout/MainLayout";

// export default function StaffManagement() {
//   const [staffList, setStaffList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStaffs = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch("http://localhost:5000/api/staff", {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setStaffList(data);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         console.error("Error fetching staffs:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStaffs();
//   }, []);

//   const [selectedCard, setSelectedCard] = useState(null);

//   const totalStaff = staffList.length;
//   const newStaff = staffList.filter(
//     (staff) => staff.status === "Active" || staff.status === true
//   ).length;

//   const resignedStaff = staffList.filter(
//     (staff) => staff.status !== "Active" && staff.status !== true
//   ).length;

//   const cards = [
//     { title: "Total Staff", count: totalStaff, color: "blue", key: "Total" },
//     {
//       title: "Resigned Staff",
//       count: resignedStaff,
//       color: "red",
//       key: "Resigned",
//     },
//     { title: "New Staff", count: newStaff, color: "green", key: "New" },
//   ];

//   // Updated filtering logic
//   const getFilteredStaff = () => {
//     if (selectedCard === "Total") {
//       return staffList;
//     } else if (selectedCard === "New") {
//       return staffList.filter(
//         (staff) => staff.status === "Active" || staff.status === true
//       );
//     } else if (selectedCard === "Resigned") {
//       return staffList.filter(
//         (staff) => staff.status !== "Active" && staff.status !== true
//       );
//     }
//     return [];
//   };

//   const filteredStaff = getFilteredStaff();

//   if (loading) {
//     return (
//       <MainLayout>
//         <div className="bg-white rounded-2xl shadow p-6 text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading staff data...</p>
//         </div>
//       </MainLayout>
//     );
//   }

//   if (error) {
//     return (
//       <MainLayout>
//         <div className="bg-white rounded-2xl shadow p-6 text-center">
//           <div className="text-red-600 mb-4">
//             <svg
//               className="w-12 h-12 mx-auto mb-2"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
//               />
//             </svg>
//             Error loading staff data: {error}
//           </div>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Retry
//           </button>
//         </div>
//       </MainLayout>
//     );
//   }

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         {/* Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//           {cards.map((card) => (
//             <div
//               key={card.key}
//               onClick={() => setSelectedCard(card.key)}
//               className={`cursor-pointer bg-white p-6 rounded-xl shadow text-center hover:bg-gray-100 transition-colors duration-200 ${
//                 selectedCard === card.key
//                   ? "ring-2 ring-" +
//                     card.color +
//                     "-500 bg-" +
//                     card.color +
//                     "-50"
//                   : ""
//               }`}
//             >
//               <h3 className="text-lg font-semibold text-gray-700">
//                 {card.title}
//               </h3>
//               <p className={`text-2xl font-bold text-${card.color}-600`}>
//                 {card.count}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Table */}
//         {selectedCard && (
//           <div className="bg-white p-6 rounded-xl shadow">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold text-gray-800">
//                 {selectedCard} Staff List
//               </h2>
//               <div className="text-sm text-gray-500">
//                 Total: {filteredStaff.length} staff member
//                 {filteredStaff.length !== 1 ? "s" : ""}
//               </div>
//             </div>

//             {filteredStaff.length === 0 ? (
//               <div className="text-center p-8 text-gray-500">
//                 <svg
//                   className="w-16 h-16 mx-auto mb-4 text-gray-300"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//                   />
//                 </svg>
//                 <h3 className="text-lg font-medium text-gray-700 mb-2">
//                   No Staff Found
//                 </h3>
//                 <p className="text-gray-500">
//                   No staff members match the selected category.
//                 </p>
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full border border-gray-300 text-sm text-left">
//                   <thead className="bg-blue-100 text-black font-semibold">
//                     <tr>
//                       <th className="p-3 border border-gray-300">Sr No.</th>
//                       <th className="p-3 border border-gray-300">Staff Name</th>
//                       <th className="p-3 border border-gray-300">
//                         Staff Reg. No.
//                       </th>
//                       <th className="p-3 border border-gray-300">Dept</th>
//                       <th className="p-3 border border-gray-300">Gender</th>
//                       <th className="p-3 border border-gray-300">
//                         Contact No.
//                       </th>
//                       <th className="p-3 border border-gray-300">Status</th>
//                       <th className="p-3 border border-gray-300">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredStaff.map((staff, index) => (
//                       <tr
//                         key={staff._id}
//                         className="hover:bg-gray-50 transition-colors duration-150"
//                       >
//                         <td className="p-3 border border-gray-300 font-medium">
//                           {index + 1}
//                         </td>
//                         <td className="p-3 border border-gray-300">
//                           <div className="font-medium text-gray-900">
//                             {staff.firstname} {staff.middlename}{" "}
//                             {staff.lastname}
//                           </div>
//                         </td>
//                         <td className="p-3 border border-gray-300">
//                           <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
//                             {staff._id}
//                           </span>
//                         </td>
//                         <td className="p-3 border border-gray-300">
//                           <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
//                             {staff.role?.dept || "None"}
//                           </span>
//                         </td>
//                         <td className="p-3 border border-gray-300">
//                           <span className="capitalize">{staff.gender}</span>
//                         </td>
//                         <td className="p-3 border border-gray-300">
//                           <a
//                             href={`tel:${staff.phoneno}`}
//                             className="text-blue-600 hover:underline"
//                           >
//                             {staff.phoneno}
//                           </a>
//                         </td>
//                         <td className="p-3 border border-gray-300">
//                           <span
//                             className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//                               staff.status
//                                 ? "bg-green-100 text-green-800"
//                                 : "bg-red-100 text-red-800"
//                             }`}
//                           >
//                             <span
//                               className={`w-2 h-2 rounded-full mr-2 ${
//                                 staff.status ? "bg-green-500" : "bg-red-500"
//                               }`}
//                             ></span>
//                             {staff.status ? "Active" : "Inactive"}
//                           </span>
//                         </td>
//                         <td className="p-3 border border-gray-300">
//                           <Link
//                             to={`/edit-staff/${staff._id}`}
//                             className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors duration-150"
//                           >
//                             <svg
//                               className="w-4 h-4 mr-1"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                               />
//                             </svg>
//                             Edit
//                           </Link>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Initial state when no card is selected */}
//         {!selectedCard && (
//           <div className="text-center p-8 text-gray-500">
//             <svg
//               className="w-16 h-16 mx-auto mb-4 text-gray-300"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//               />
//             </svg>
//             <h3 className="text-lg font-medium text-gray-700 mb-2">
//               Select a Category
//             </h3>
//             <p className="text-gray-500">
//               Click on one of the cards above to view staff details.
//             </p>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// }

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

export default function StaffManagement() {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        setLoading(true);
        // FIX: Using imported API_BASE_URL
        const response = await fetch(`${API_BASE_URL}api/staff`, {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStaffList(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching staffs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffs();
  }, []);

  const [selectedCard, setSelectedCard] = useState(null);

  const totalStaff = staffList.length;
  const newStaff = staffList.filter(
    (staff) => staff.status === "Active" || staff.status === true
  ).length;

  const resignedStaff = staffList.filter(
    (staff) => staff.status !== "Active" && staff.status !== true
  ).length;

  const cards = [
    { title: "Total Staff", count: totalStaff, color: "blue", key: "Total" },
    {
      title: "Resigned Staff",
      count: resignedStaff,
      color: "red",
      key: "Resigned",
    },
    { title: "New Staff", count: newStaff, color: "green", key: "New" },
  ];

  // Updated filtering logic
  const getFilteredStaff = () => {
    if (selectedCard === "Total") {
      return staffList;
    } else if (selectedCard === "New") {
      return staffList.filter(
        (staff) => staff.status === "Active" || staff.status === true
      );
    } else if (selectedCard === "Resigned") {
      return staffList.filter(
        (staff) => staff.status !== "Active" && staff.status !== true
      );
    }
    return [];
  };

  const filteredStaff = getFilteredStaff();

  if (loading) {
    return (
      <MainLayout>
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading staff data...</p>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <div className="text-red-600 mb-4">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            Error loading staff data: {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {cards.map((card) => (
            <div
              key={card.key}
              onClick={() => setSelectedCard(card.key)}
              className={`cursor-pointer bg-white p-6 rounded-xl shadow text-center hover:bg-gray-100 transition-colors duration-200 ${
                selectedCard === card.key
                  ? "ring-2 ring-" +
                    card.color +
                    "-500 bg-" +
                    card.color +
                    "-50"
                  : ""
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-700">
                {card.title}
              </h3>
              <p className={`text-2xl font-bold text-${card.color}-600`}>
                {card.count}
              </p>
            </div>
          ))}
        </div>

        {/* Table */}
        {selectedCard && (
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedCard} Staff List
              </h2>
              <div className="text-sm text-gray-500">
                Total: {filteredStaff.length} staff member
                {filteredStaff.length !== 1 ? "s" : ""}
              </div>
            </div>

            {filteredStaff.length === 0 ? (
              <div className="text-center p-8 text-gray-500">
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  No Staff Found
                </h3>
                <p className="text-gray-500">
                  No staff members match the selected category.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-sm text-left">
                  <thead className="bg-blue-100 text-black font-semibold">
                    <tr>
                      <th className="p-3 border border-gray-300">Sr No.</th>
                      <th className="p-3 border border-gray-300">Staff Name</th>
                      <th className="p-3 border border-gray-300">
                        Staff Reg. No.
                      </th>
                      <th className="p-3 border border-gray-300">Dept</th>
                      <th className="p-3 border border-gray-300">Gender</th>
                      <th className="p-3 border border-gray-300">
                        Contact No.
                      </th>
                      <th className="p-3 border border-gray-300">Status</th>
                      <th className="p-3 border border-gray-300">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStaff.map((staff, index) => (
                      <tr
                        key={staff._id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="p-3 border border-gray-300 font-medium">
                          {index + 1}
                        </td>
                        <td className="p-3 border border-gray-300">
                          <div className="font-medium text-gray-900">
                            {staff.firstname} {staff.middlename}{" "}
                            {staff.lastname}
                          </div>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                            {staff._id}
                          </span>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                            {staff.role?.dept || "None"}
                          </span>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <span className="capitalize">{staff.gender}</span>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <a
                            href={`tel:${staff.phoneno}`}
                            className="text-blue-600 hover:underline"
                          >
                            {staff.phoneno}
                          </a>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              staff.status
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full mr-2 ${
                                staff.status ? "bg-green-500" : "bg-red-500"
                              }`}
                            ></span>
                            {staff.status ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="p-3 border border-gray-300">
                          <Link
                            to={`/edit-staff/${staff._id}`}
                            className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-colors duration-150"
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Initial state when no card is selected */}
        {!selectedCard && (
          <div className="text-center p-8 text-gray-500">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Select a Category
            </h3>
            <p className="text-gray-500">
              Click on one of the cards above to view staff details.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}