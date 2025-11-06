// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";

// const ClassroomManagement = () => {
//   const [selectedStd, setSelectedStd] = useState("");
//   const [selectedDiv, setSelectedDiv] = useState("");
//   const [students, setStudents] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const stdOptions = ["1", "2", "3", "4", "5","6","7","8","9","10"];
//   const divOptions = ["A", "B", "C"];

//   useEffect(() => {
//     const loadStudentData = async () => {
//       try {
//         if (selectedStd && selectedDiv) {
//           const response = await axios.post(
//             "https://sspd-school-portal.vercel.app/api/student",
//             { standard: selectedStd, division: selectedDiv },
//             {
//               headers: {
//                 auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//               },
//             }
//           );
//           if (response.status === 200) {
//             setStudents(response.data);
//           }
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     loadStudentData();
//   }, [selectedStd, selectedDiv]);

//   // Format date for display
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const handleViewDetails = (student) => {
//     setSelectedStudent(student);
//     setIsModalOpen(true);
//   };

//   return (
//     <MainLayout>
//       <div className="p-6">
//         <div className="bg-white rounded-2xl shadow p-6">
//           {/* Dropdowns */}
//           <div className="flex flex-col sm:flex-row gap-4 mb-6">
//             <div className="flex flex-col w-full">
//               <label className="text-sm font-semibold text-gray-700 mb-2">
//                 Standard
//               </label>
//               <select
//                 value={selectedStd}
//                 onChange={(e) => setSelectedStd(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//               >
//                 <option value="">Select</option>
//                 {stdOptions.map((option, index) => (
//                   <option key={index} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex flex-col w-full">
//               <label className="text-sm font-semibold text-gray-700 mb-2">
//                 Division
//               </label>
//               <select
//                 value={selectedDiv}
//                 onChange={(e) => setSelectedDiv(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//               >
//                 <option value="">Select</option>
//                 {divOptions.map((option, index) => (
//                   <option key={index} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Show message if either Std or Div is not selected */}
//           {(!selectedStd || !selectedDiv) && (
//             <div className="text-center text-red-500 font-semibold mb-6">
//               Please select both Standard and Division to proceed.
//             </div>
//           )}
//           {/* Student Table */}
//           {students.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="min-w-full border rounded-xl">
//                 <thead className="bg-blue-100 text-left text-sm text-gray-700">
//                   <tr>
//                     <th className="py-2 px-4 border">Name</th>
//                     <th className="py-2 px-4 border">Date of Birth</th>
//                     <th className="py-2 px-4 border">Gender</th>
//                     <th className="py-2 px-4 border">Contact</th>
//                     <th className="px-4 py-2 border">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.map((student, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="py-2 px-4 border">
//                         {student.firstname} {student.middlename}{" "}
//                         {student.lastname}{" "}
//                       </td>
//                       <td className="py-2 px-4 border">
//                         {formatDate(student.dob)}
//                       </td>
//                       <td className="py-2 px-4 border">{student.gender}</td>
//                       <td className="py-2 px-4 border">
//                         {student.parent.primarycontact}
//                       </td>
//                       <td className="px-4 py-2 border">
//                         <button
//                           onClick={() => handleViewDetails(student)}
//                           className="text-blue-500 hover:underline"
//                         >
//                           View Details
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             selectedStd &&
//             selectedDiv && (
//               <div className="text-gray-500 text-sm mt-4">
//                 No students found for Standard {selectedStd}, Division{" "}
//                 {selectedDiv}
//               </div>
//             )
//           )}
//         </div>
//       </div>
//       {isModalOpen && selectedStudent && (
//         <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
//             <button
//               className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-lg"
//               onClick={() => setIsModalOpen(false)}
//             >
//               ✕
//             </button>
//             <h2 className="text-xl font-semibold mb-4">Student Details</h2>
//             <p>
//               <strong>Name:</strong> {selectedStudent.firstname}{" "}
//               {selectedStudent.middlename} {selectedStudent.lastname}
//             </p>
//             <p>
//               <strong>DOB:</strong> {formatDate(selectedStudent.dob)}
//             </p>
//              <p>
//               <strong>Blood Group:</strong> {(selectedStudent.bloodgroup)}
//             </p>
//             <p>
//               <strong>Gender:</strong> {selectedStudent.gender}
//             </p>
//              <p>
//               <strong>Aadhar No:</strong> {(selectedStudent.aadharno)}
//             </p>
//             <p>
//               <strong>Primary Contact:</strong>{" "}
//               {selectedStudent.parent?.primarycontact}
//             </p>
//             <p>
//               <strong>Father Name:</strong>{" "}
//               {selectedStudent.parent?.fathername}
//             </p>
//             <p>
//               <strong>Mother Name:</strong>{" "}
//               {selectedStudent.parent?.mothername}
//             </p>
//              <p>
//               <strong>Gr no:</strong> {(selectedStudent.admission.grno)}
//             </p>
//             <p>
//               <strong>Address:</strong> {selectedStudent.address.addressline1} {selectedStudent.address.addressline2}, {selectedStudent.address.city}
//             </p>
//              <p>
//               <strong>Transport Status:</strong> {(selectedStudent.transport.transportstatus)}
//             </p>
//           </div>
//         </div>
//       )}
//     </MainLayout>
//   );
// };

// export default ClassroomManagement;

// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";

// // Define the base URL for your local backend API
// const LOCAL_API_BASE_URL = "http://localhost:5000/api";

// const ClassroomManagement = () => {
//   const [selectedStd, setSelectedStd] = useState("");
//   const [selectedDiv, setSelectedDiv] = useState("");
//   const [students, setStudents] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const stdOptions = ["1", "2", "3", "4", "5","6","7","8","9","10"];
//   const divOptions = ["A", "B", "C"];

//   useEffect(() => {
//     const loadStudentData = async () => {
//       try {
//         if (selectedStd && selectedDiv) {
//           const response = await axios.post(
//             // CRITICAL FIX: Change from Vercel URL to local API URL
//             `${LOCAL_API_BASE_URL}/student`,
//             { standard: selectedStd, division: selectedDiv },
//             {
//               headers: {
//                 auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//               },
//             }
//           );
//           if (response.status === 200) {
//             setStudents(response.data);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching students by class:", error);
//         // If the error is a 500, it might be due to no students found or connection issues.
//         setStudents([]); // Clear list on error
//       }
//     };

//     loadStudentData();
//   }, [selectedStd, selectedDiv]);

//   // Format date for display
//   const formatDate = (dateString) => {
//     // Safely handle null/undefined dates
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   // Helper function to safely read nested properties and protect rendering
//   const safeRead = (obj, path, defaultValue = 'N/A') => {
//     const value = path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined && acc[part] !== null ? acc[part] : undefined), obj);
//     return value !== undefined ? value : defaultValue;
//   };

//   const handleViewDetails = (student) => {
//     setSelectedStudent(student);
//     setIsModalOpen(true);
//   };

//   return (
//     <MainLayout>
//       <div className="p-6">
//         <div className="bg-white rounded-2xl shadow p-6">
//           {/* Dropdowns */}
//           <div className="flex flex-col sm:flex-row gap-4 mb-6">
//             <div className="flex flex-col w-full">
//               <label className="text-sm font-semibold text-gray-700 mb-2">
//                 Standard
//               </label>
//               <select
//                 value={selectedStd}
//                 onChange={(e) => setSelectedStd(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//               >
//                 <option value="">Select</option>
//                 {stdOptions.map((option, index) => (
//                   <option key={index} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex flex-col w-full">
//               <label className="text-sm font-semibold text-gray-700 mb-2">
//                 Division
//               </label>
//               <select
//                 value={selectedDiv}
//                 onChange={(e) => setSelectedDiv(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//               >
//                 <option value="">Select</option>
//                 {divOptions.map((option, index) => (
//                   <option key={index} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Show message if either Std or Div is not selected */}
//           {(!selectedStd || !selectedDiv) && (
//             <div className="text-center text-red-500 font-semibold mb-6">
//               Please select both Standard and Division to proceed.
//             </div>
//           )}
//           {/* Student Table */}
//           {students.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="min-w-full border rounded-xl">
//                 <thead className="bg-blue-100 text-left text-sm text-gray-700">
//                   <tr>
//                     <th className="py-2 px-4 border">Name</th>
//                     <th className="py-2 px-4 border">Date of Birth</th>
//                     <th className="py-2 px-4 border">Gender</th>
//                     <th className="py-2 px-4 border">Contact</th>
//                     <th className="px-4 py-2 border">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.map((student, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="py-2 px-4 border">
//                         {safeRead(student, 'firstname')} {safeRead(student, 'middlename')}{" "}
//                         {safeRead(student, 'lastname')}{" "}
//                       </td>
//                       <td className="py-2 px-4 border">
//                         {formatDate(safeRead(student, 'dob', null))}
//                       </td>
//                       <td className="py-2 px-4 border">{safeRead(student, 'gender')}</td>
//                       <td className="py-2 px-4 border">
//                         {safeRead(student, 'parent.primarycontact')}
//                       </td>
//                       <td className="px-4 py-2 border">
//                         <button
//                           onClick={() => handleViewDetails(student)}
//                           className="text-blue-500 hover:underline"
//                         >
//                           View Details
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             selectedStd &&
//             selectedDiv && (
//               <div className="text-gray-500 text-sm mt-4">
//                 No students found for Standard {selectedStd}, Division{" "}
//                 {selectedDiv}
//               </div>
//             )
//           )}
//         </div>
//       </div>
//       {isModalOpen && selectedStudent && (
//         <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
//             <button
//               className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-lg"
//               onClick={() => setIsModalOpen(false)}
//             >
//               ✕
//             </button>
//             <h2 className="text-xl font-semibold mb-4">Student Details</h2>
//             <p>
//               <strong>Name:</strong> {safeRead(selectedStudent, 'firstname')}{" "}
//               {safeRead(selectedStudent, 'middlename')} {safeRead(selectedStudent, 'lastname')}
//             </p>
//             <p>
//               <strong>DOB:</strong> {formatDate(safeRead(selectedStudent, 'dob', null))}
//             </p>
//              <p>
//               <strong>Blood Group:</strong> {safeRead(selectedStudent, 'bloodgroup')}
//             </p>
//             <p>
//               <strong>Gender:</strong> {safeRead(selectedStudent, 'gender')}
//             </p>
//              <p>
//               <strong>Aadhar No:</strong> {safeRead(selectedStudent, 'aadharno')}
//             </p>
//             <p>
//               <strong>Primary Contact:</strong>{" "}
//               {safeRead(selectedStudent, 'parent.primarycontact')}
//             </p>
//             <p>
//               <strong>Father Name:</strong>{" "}
//               {safeRead(selectedStudent, 'parent.fathername')}
//             </p>
//             <p>
//               <strong>Mother Name:</strong>{" "}
//               {safeRead(selectedStudent, 'parent.mothername')}
//             </p>
//              <p>
//               <strong>Gr no:</strong> {safeRead(selectedStudent, 'admission.grno')}
//             </p>
//             <p>
//               <strong>Address:</strong> {safeRead(selectedStudent, 'address.addressline1')} {safeRead(selectedStudent, 'address.addressline2')}, {safeRead(selectedStudent, 'address.city')}
//             </p>
//              <p>
//               <strong>Transport Status:</strong> {safeRead(selectedStudent, 'transport.transportstatus')}
//             </p>
//           </div>
//         </div>
//       )}
//     </MainLayout>
//   );
// };

// export default ClassroomManagement;

import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config"; 

// Define the base URL for your local backend API
// const LOCAL_API_BASE_URL = "http://localhost:5000/api"; // REMOVED

const ClassroomManagement = () => {
  const [selectedStd, setSelectedStd] = useState("");
  const [selectedDiv, setSelectedDiv] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stdOptions = ["1", "2", "3", "4", "5","6","7","8","9","10"];
  const divOptions = ["A", "B", "C"];

  useEffect(() => {
    const loadStudentData = async () => {
      try {
        if (selectedStd && selectedDiv) {
          const response = await axios.post(
            // FIX: Using imported API_BASE_URL
            `${API_BASE_URL}api/student`,
            { standard: selectedStd, division: selectedDiv },
            {
              headers: {
                auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
              },
            }
          );
          if (response.status === 200) {
            setStudents(response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching students by class:", error);
        // If the error is a 500, it might be due to no students found or connection issues.
        setStudents([]); // Clear list on error
      }
    };

    loadStudentData();
  }, [selectedStd, selectedDiv]);

  // Format date for display
  const formatDate = (dateString) => {
    // Safely handle null/undefined dates
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Helper function to safely read nested properties and protect rendering
  const safeRead = (obj, path, defaultValue = 'N/A') => {
    const value = path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined && acc[part] !== null ? acc[part] : undefined), obj);
    return value !== undefined ? value : defaultValue;
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="bg-white rounded-2xl shadow p-6">
          {/* Dropdowns */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex flex-col w-full">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Standard
              </label>
              <select
                value={selectedStd}
                onChange={(e) => setSelectedStd(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              >
                <option value="">Select</option>
                {stdOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col w-full">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Division
              </label>
              <select
                value={selectedDiv}
                onChange={(e) => setSelectedDiv(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              >
                <option value="">Select</option>
                {divOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Show message if either Std or Div is not selected */}
          {(!selectedStd || !selectedDiv) && (
            <div className="text-center text-red-500 font-semibold mb-6">
              Please select both Standard and Division to proceed.
            </div>
          )}
          {/* Student Table */}
          {students.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-xl">
                <thead className="bg-blue-100 text-left text-sm text-gray-700">
                  <tr>
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">Date of Birth</th>
                    <th className="py-2 px-4 border">Gender</th>
                    <th className="py-2 px-4 border">Contact</th>
                    <th className="px-4 py-2 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border">
                        {safeRead(student, 'firstname')} {safeRead(student, 'middlename')}{" "}
                        {safeRead(student, 'lastname')}{" "}
                      </td>
                      <td className="py-2 px-4 border">
                        {formatDate(safeRead(student, 'dob', null))}
                      </td>
                      <td className="py-2 px-4 border">{safeRead(student, 'gender')}</td>
                      <td className="py-2 px-4 border">
                        {safeRead(student, 'parent.primarycontact')}
                      </td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => handleViewDetails(student)}
                          className="text-blue-500 hover:underline"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            selectedStd &&
            selectedDiv && (
              <div className="text-gray-500 text-sm mt-4">
                No students found for Standard {selectedStd}, Division{" "}
                {selectedDiv}
              </div>
            )
          )}
        </div>
      </div>
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
            <button
              className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-lg"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">Student Details</h2>
            <p>
              <strong>Name:</strong> {safeRead(selectedStudent, 'firstname')}{" "}
              {safeRead(selectedStudent, 'middlename')} {safeRead(selectedStudent, 'lastname')}
            </p>
            <p>
              <strong>DOB:</strong> {formatDate(safeRead(selectedStudent, 'dob', null))}
            </p>
             <p>
              <strong>Blood Group:</strong> {safeRead(selectedStudent, 'bloodgroup')}
            </p>
            <p>
              <strong>Gender:</strong> {safeRead(selectedStudent, 'gender')}
            </p>
             <p>
              <strong>Aadhar No:</strong> {safeRead(selectedStudent, 'aadharno')}
            </p>
            <p>
              <strong>Primary Contact:</strong>{" "}
              {safeRead(selectedStudent, 'parent.primarycontact')}
            </p>
            <p>
              <strong>Father Name:</strong>{" "}
              {safeRead(selectedStudent, 'parent.fathername')}
            </p>
            <p>
              <strong>Mother Name:</strong>{" "}
              {safeRead(selectedStudent, 'parent.mothername')}
            </p>
             <p>
              <strong>Gr no:</strong> {safeRead(selectedStudent, 'admission.grno')}
            </p>
            <p>
              <strong>Address:</strong> {safeRead(selectedStudent, 'address.addressline1')} {safeRead(selectedStudent, 'address.addressline2')}, {safeRead(selectedStudent, 'address.city')}
            </p>
             <p>
              <strong>Transport Status:</strong> {safeRead(selectedStudent, 'transport.transportstatus')}
            </p>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default ClassroomManagement;