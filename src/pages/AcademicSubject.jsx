// import React, { useEffect, useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import AddSubjectModal from "../components/AddSubjectModal";
// import axios from "axios";

// export default function AcademicSubject() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [subjectData, setSubjectData] = useState([]);

//   const [teachers, setTeachers] = useState([]);
//   useEffect(() => {
//     const fetchallots = async () => {
//       try {
//         const response = await axios.get(
//           "https://sspd-school-portal.vercel.app/api/allotments",
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         setSubjectData(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchallots();
//   }, []);

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const response = await axios.get(
//           "https://sspd-school-portal.vercel.app/api/staff",
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         setTeachers(response.data);
//         // console.log(teachers)
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchTeachers();
//   }, []);

//   const teacherOptions = teachers.map((item) => ({
//     value: `${item._id},${item.firstname} ${item.lastname}`, // ek string bana do
//     label: `${item.firstname} ${item.lastname}`,
//   }));

//   // console.log(teacherOptions)
//   // Filter subjects based on search query
//   const filteredData = subjectData.filter((item) =>
//     item.teacherName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="flex flex-1 flex-col p-4 sm:p-6 overflow-y-auto">
//           {/* Search & Add */}
//           <div className="mb-4 flex items-center justify-between">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search subject..."
//               className="w-full sm:w-72 px-3 py-2 rounded-md border border-gray-300 text-sm"
//             />
//             <button
//               onClick={() => setShowModal(true)}
//               className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-4"
//             >
//               Add
//             </button>
//           </div>

//           {/* Header */}
//           <div className="my-4 text-center">
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//               Subject Allotment
//             </h2>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto shadow-md">
//             <table className="min-w-full border-collapse border border-gray-300">
//               <thead>
//                 <tr className="bg-blue-100 text-black">
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Subject
//                   </th>
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Teacher
//                   </th>
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Standards
//                   </th>
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Division
//                   </th>
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Weekly Lectures
//                   </th>
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//                 <tbody>
//                   {filteredData.map((item, index) => (
//                     <tr
//                       key={index}
//                       className="border-b border-gray-200 hover:bg-gray-50"
//                     >
//                       {/* Subjects */}
//                       <td className="px-4 py-2 text-sm text-gray-700 border text-center">
//                         {Array.isArray(item.subjects)
//                           ? item.subjects.join(", ")
//                           : item.subjects}
//                       </td>

//                       {/* Teacher Name */}
//                       <td className="px-4 py-2 text-sm text-gray-700 border text-center">
//                         {item.teacherName}
//                       </td>

//                       {/* Standards */}
//                       <td className="px-4 py-2 text-sm text-gray-700 border text-center">
//                         {Array.isArray(item.standards)
//                           ? item.standards.join(", ")
//                           : item.standards}
//                       </td>

//                       {/* Divisions */}
//                       <td className="px-4 py-2 text-sm text-gray-700 border text-center">
//                         {Array.isArray(item.divisions)
//                           ? item.divisions.join(", ")
//                           : item.divisions}
//                       </td>

//                       {/* Weekly Lectures */}
//                       <td className="px-4 py-2 text-sm text-gray-700 border text-center">
//                         {item.weeklyLectures}
//                       </td>

//                       {/* Actions */}
//                       <td className="px-4 py-2 text-sm border text-center">
//                         <button className="text-blue-500 hover:underline mr-2">
//                           Edit
//                         </button>
//                         <button className="text-red-500 hover:underline">
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//             </table>
//           </div>

//           {/* Add Subject Modal */}
//           <AddSubjectModal
//             isOpen={showModal}
//             onClose={() => setShowModal(false)}
//             teacherOptions={teacherOptions}
//           />
//         </div>
//       </div>
//     </MainLayout>
//   );
// }

// import React, { useEffect, useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import AddSubjectModal from "../components/AddSubjectModal";
// import axios from "axios";

// export default function AcademicSubject() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [subjectData, setSubjectData] = useState([]);

//   const [teachers, setTeachers] = useState([]);
//   useEffect(() => {
//     const fetchallots = async () => {
//       try {
//         const response = await axios.get(
//           // CRITICAL FIX 1: CHANGE to localhost
//           "http://localhost:5000/api/allotments", 
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         setSubjectData(response.data);
//       } catch (error) {
//         console.error("Error fetching subject allotments from local server:", error);
//       }
//     };
//     fetchallots();
//   }, []);

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const response = await axios.get(
//           // CRITICAL FIX 2: CHANGE to localhost
//           "http://localhost:5000/api/staff",
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         setTeachers(response.data);
//       } catch (error) {
//         console.error("Error fetching teachers from local server:", error);
//       }
//     };
//     fetchTeachers();
//   }, []);

//   const teacherOptions = teachers.map((item) => ({
//     value: `${item._id},${item.firstname} ${item.lastname}`, // ek string bana do
//     label: `${item.firstname} ${item.lastname}`,
//   }));

//   // Filter subjects based on search query
//   const filteredData = subjectData.filter((item) =>
//     item.teacherName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="flex flex-1 flex-col p-4 sm:p-6 overflow-y-auto">
//           {/* Search & Add */}
//           <div className="mb-4 flex items-center justify-between">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search subject..."
//               className="w-full sm:w-72 px-3 py-2 rounded-md border border-gray-300 text-sm"
//             />
//             <button
//               onClick={() => setShowModal(true)}
//               className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-4"
//             >
//               Add
//             </button>
//           </div>

//           {/* Header */}
//           <div className="my-4 text-center">
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//               Subject Allotment
//             </h2>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto shadow-md">
//             <table className="min-w-full border-collapse border border-gray-300">
//               <thead>
//                 <tr className="bg-blue-100 text-black">
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Subject
//                   </th>
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Teacher
//                   </th>
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Standards
//                   </th>
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Division
//                   </th>
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Weekly Lectures
//                   </th>
//                   <th className="px-4 py-2 text-center font-bold border ">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//                 <tbody>
//                   {filteredData.map((item, index) => (
//                     <tr
//                       key={index}
//                       className="border-b border-gray-200 hover:bg-gray-50"
//                     >
//                       {/* Subjects */}
//                       <td className="px-4 py-2 text-sm text-gray-700 border text-center">
//                         {Array.isArray(item.subjects)
//                           ? item.subjects.join(", ")
//                           : item.subjects}
//                       </td>

//                       {/* Teacher Name */}
//                       <td className="px-4 py-2 text-sm text-gray-700 border text-center">
//                         {item.teacherName}
//                       </td>

//                       {/* Standards */}
//                       <td className="px-4 py-2 text-sm text-gray-700 border text-center">
//                         {Array.isArray(item.standards)
//                           ? item.standards.join(", ")
//                           : item.standards}
//                       </td>

//                       {/* Divisions */}
//                       <td className="px-4 py-2 text-sm text-gray-700 border text-center">
//                         {Array.isArray(item.divisions)
//                           ? item.divisions.join(", ")
//                           : item.divisions}
//                       </td>

//                       {/* Weekly Lectures */}
//                       <td className="px-4 py-2 text-sm text-gray-700 border text-center">
//                         {item.weeklyLectures}
//                       </td>

//                       {/* Actions */}
//                       <td className="px-4 py-2 text-sm border text-center">
//                         <button className="text-blue-500 hover:underline mr-2">
//                           Edit
//                         </button>
//                         <button className="text-red-500 hover:underline">
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//             </table>
//           </div>

//           {/* Add Subject Modal */}
//           <AddSubjectModal
//             isOpen={showModal}
//             onClose={() => setShowModal(false)}
//             teacherOptions={teacherOptions}
//           />
//         </div>
//       </div>
//     </MainLayout>
//   );
// }

import React, { useEffect, useState, useMemo } from "react";
import MainLayout from "../layout/MainLayout";
import AddSubjectModal from "../components/AddSubjectModal"; 
import axios from "axios";
import { API_BASE_URL } from "../config";

export default function AcademicSubject() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [subjectData, setSubjectData] = useState([]); // Raw data from API
  const [teachers, setTeachers] = useState([]); // Teacher data for dropdown
  const [editingAllotment, setEditingAllotment] = useState(null); // Data for the row being edited

  // Function to fetch all allotments and teachers
  const fetchAllData = async () => {
    try {
      // 1. Fetch Allotments
      const allotmentsResponse = await axios.get(
        `${API_BASE_URL}api/allotments`,
        {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
        }
      );
      
      // 🚀 FIX: Ensure data is an array before setting state
      const rawData = allotmentsResponse.data;
      // If the API returns a single object, wrap it in an array; otherwise, use the array directly.
      const processedData = Array.isArray(rawData) ? rawData : (rawData ? [rawData] : []);
      
      setSubjectData(processedData);

      // 2. Fetch Teachers
      const teachersResponse = await axios.get(
        `${API_BASE_URL}api/staff`,
        {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
        }
      );
      setTeachers(teachersResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Optionally, set subjectData to an empty array on error to prevent UI issues
      setSubjectData([]); 
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);


  // Prepare teacher options for the modal dropdown
  const teacherOptions = useMemo(() => {
    return teachers.map((item) => ({
      value: `${item._id},${item.firstname} ${item.lastname}`, 
      label: `${item.firstname} ${item.lastname}`,
    }));
  }, [teachers]);

  // --- 1. DATA NORMALIZATION and FLATTENING ---
  // This function processes the raw data to create one row per unique assignment (Subject, Standard, Division).
  const normalizedData = useMemo(() => {
    const flattened = [];

    subjectData.forEach((allotment) => {
      // Ensure fields are treated as arrays for iteration
      const subjects = Array.isArray(allotment.subjects) ? allotment.subjects : [allotment.subjects];
      const standards = Array.isArray(allotment.standards) ? allotment.standards : [allotment.standards];
      const divisions = Array.isArray(allotment.divisions) ? allotment.divisions : [allotment.divisions];
      
      // Iterate over all combinations
      subjects.forEach(subject => {
        standards.forEach(std => {
          divisions.forEach(div => {
            flattened.push({
              // Unique ID for actions (based on the original allotment ID)
              _id: allotment._id, 
              teacherIdName: allotment.teacherIdName, // e.g., "id,name"
              teacherName: allotment.teacherName,
              subjects: subject, // Single subject for this row
              standards: std,     // Single standard for this row
              divisions: div,     // Single division for this row
              weeklyLectures: allotment.weeklyLectures,
              // This will create distinct rows even if the parent allotment was consolidated
            });
          });
        });
      });
    });

    // Apply search filter
    return flattened.filter((item) =>
      item.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subjects.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [subjectData, searchQuery]);

  // --- 2. EDIT AND DELETE HANDLERS ---

  const handleEdit = (itemToEdit) => {
    // Prepare the item for editing in the modal
    setEditingAllotment(itemToEdit); 
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subject allotment?")) {
      try {
        await axios.delete(
          `${API_BASE_URL}api/allotments/${id}`, 
          {
            headers: {
              auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
            },
          }
        );
        // Refresh data after successful deletion
        fetchAllData(); 
      } catch (error) {
        console.error("Error deleting subject allotment:", error);
        alert("Failed to delete allotment.");
      }
    }
  };
  
  const handleCloseModal = (refreshNeeded) => {
    setShowModal(false);
    setEditingAllotment(null); // Clear editing state
    if (refreshNeeded) {
      fetchAllData(); // Re-fetch data if an add/edit was successful
    }
  };


  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex flex-1 flex-col p-4 sm:p-6 overflow-y-auto">
          {/* Search & Add */}
          <div className="mb-4 flex items-center justify-between">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search teacher or subject..."
              className="w-full sm:w-72 px-3 py-2 rounded-md border border-gray-300 text-sm"
            />
            <button
              onClick={() => handleEdit(null)} // Pass null to signify ADD mode
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-4"
            >
              Add
            </button>
          </div>

          {/* Header */}
          <div className="my-4 text-center">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Subject Allotment
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto shadow-md">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-100 text-black">
                  <th className="px-4 py-2 text-center font-bold border ">Subject</th>
                  <th className="px-4 py-2 text-center font-bold border ">Teacher</th>
                  <th className="px-4 py-2 text-center font-bold border ">Standard</th>
                  <th className="px-4 py-2 text-center font-bold border ">Division</th>
                  <th className="px-4 py-2 text-center font-bold border ">Weekly Lectures</th>
                  <th className="px-4 py-2 text-center font-bold border ">Actions</th>
                </tr>
              </thead>
                <tbody>
                  {/* Use normalizedData for rendering */}
                  {normalizedData.map((item, index) => (
                    <tr
                      // Use index for key since multiple normalized rows might share the same _id
                      key={index} 
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      {/* Subjects (Now always a single value per row) */}
                      <td className="px-4 py-2 text-sm text-gray-700 border text-center">
                        {item.subjects} 
                      </td>

                      {/* Teacher Name */}
                      <td className="px-4 py-2 text-sm text-gray-700 border text-center">
                        {item.teacherName}
                      </td>

                      {/* Standards (Now always a single value per row) */}
                      <td className="px-4 py-2 text-sm text-gray-700 border text-center">
                        {item.standards}
                      </td>

                      {/* Divisions (Now always a single value per row) */}
                      <td className="px-4 py-2 text-sm text-gray-700 border text-center">
                        {item.divisions}
                      </td>

                      {/* Weekly Lectures */}
                      <td className="px-4 py-2 text-sm text-gray-700 border text-center">
                        {item.weeklyLectures}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-2 text-sm border text-center">
                        <button 
                          className="text-blue-500 hover:underline mr-2"
                          onClick={() => handleEdit(item)} // Pass the specific row data
                        >
                          Edit
                        </button>
                        <button 
                          className="text-red-500 hover:underline"
                          onClick={() => handleDelete(item._id)} // Use the original allotment ID
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </div>

          {/* Add/Edit Subject Modal */}
          <AddSubjectModal
            isOpen={showModal}
            onClose={handleCloseModal}
            teacherOptions={teacherOptions}
            editingData={editingAllotment} // Pass the data being edited
          />
        </div>
      </div>
    </MainLayout>
  );
}