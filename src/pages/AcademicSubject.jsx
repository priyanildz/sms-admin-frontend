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


import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import AddSubjectModal from "../components/AddSubjectModal";
import axios from "axios";
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config"; 

export default function AcademicSubject() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [subjectData, setSubjectData] = useState([]);

  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    const fetchallots = async () => {
      try {
        const response = await axios.get(
          // FIX 1: Using API_BASE_URL for allotments
          `${API_BASE_URL}api/allotments`, 
          {
            headers: {
              auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
            },
          }
        );
        setSubjectData(response.data);
      } catch (error) {
        console.error("Error fetching subject allotments from server:", error);
      }
    };
    fetchallots();
  }, []);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(
          // FIX 2: Using API_BASE_URL for staff
          `${API_BASE_URL}api/staff`,
          {
            headers: {
              auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
            },
          }
        );
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers from server:", error);
      }
    };
    fetchTeachers();
  }, []);

  const teacherOptions = teachers.map((item) => ({
    value: `${item._id},${item.firstname} ${item.lastname}`, // ek string bana do
    label: `${item.firstname} ${item.lastname}`,
  }));

  // Filter subjects based on search query
  const filteredData = subjectData.filter((item) =>
    item.teacherName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              placeholder="Search subject..."
              className="w-full sm:w-72 px-3 py-2 rounded-md border border-gray-300 text-sm"
            />
            <button
              onClick={() => setShowModal(true)}
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
                  <th className="px-4 py-2 text-center font-bold border ">
                    Subject
                  </th>
                  <th className="px-4 py-2 text-center font-bold border ">
                    Teacher
                  </th>
                  <th className="px-4 py-2 text-center font-bold border ">
                    Standards
                  </th>
                  <th className="px-4 py-2 text-center font-bold border ">
                    Division
                  </th>
                  <th className="px-4 py-2 text-center font-bold border ">
                    Weekly Lectures
                  </th>
                  <th className="px-4 py-2 text-center font-bold border ">
                    Actions
                  </th>
                </tr>
              </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      {/* Subjects */}
                      <td className="px-4 py-2 text-sm text-gray-700 border text-center">
                        {Array.isArray(item.subjects)
                          ? item.subjects.join(", ")
                          : item.subjects}
                      </td>

                      {/* Teacher Name */}
                      <td className="px-4 py-2 text-sm text-gray-700 border text-center">
                        {item.teacherName}
                      </td>

                      {/* Standards */}
                      <td className="px-4 py-2 text-sm text-gray-700 border text-center">
                        {Array.isArray(item.standards)
                          ? item.standards.join(", ")
                          : item.standards}
                      </td>

                      {/* Divisions */}
                      <td className="px-4 py-2 text-sm text-gray-700 border text-center">
                        {Array.isArray(item.divisions)
                          ? item.divisions.join(", ")
                          : item.divisions}
                      </td>

                      {/* Weekly Lectures */}
                      <td className="px-4 py-2 text-sm text-gray-700 border text-center">
                        {item.weeklyLectures}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-2 text-sm border text-center">
                        <button className="text-blue-500 hover:underline mr-2">
                          Edit
                        </button>
                        <button className="text-red-500 hover:underline">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </div>

          {/* Add Subject Modal */}
          <AddSubjectModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            teacherOptions={teacherOptions}
          />
        </div>
      </div>
    </MainLayout>
  );
}