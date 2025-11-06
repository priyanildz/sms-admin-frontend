// import React, { useEffect, useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate } from "react-router-dom";

// const ExamSupervisorAllotment = () => {
//   const navigate = useNavigate();
//   const [supervisorData, setSupervisorData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchSupervisors();
//   }, []);

//   const fetchSupervisors = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/get-supervisior",{
//         headers:{
//             auth:'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
//         }
//       });
//       const data = await response.json();
//       setSupervisorData(data);
//     } catch (err) {
//       console.error("Error fetching supervisors:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAdd = () => {
//     navigate("/exams-add-supervisors");
//   };

//   if (loading) {
//     return (
//       <MainLayout>
//         <div className="p-6 text-center">Loading...</div>
//       </MainLayout>
//     );
//   }

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         {/* Header */}
//         <div className="flex justify-end mb-4">
//           <button
//             onClick={handleAdd}
//             className="bg-blue-700 text-white px-4 py-1 rounded-md hover:bg-blue-800"
//           >
//             + Add
//           </button>
//         </div>

//         {/* Supervisors Table */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full border rounded-xl">
//             <thead className="bg-blue-100 text-left text-black text-md">
//               <tr>
//                 <th className="py-2 px-4 border">Exam Type</th>
//                 <th className="py-2 px-4 border">Exam Date</th>
//                 <th className="py-2 px-4 border">Time Slot</th>
//                 <th className="py-2 px-4 border">Total Available Supervisors</th>
//               </tr>
//             </thead>
//             <tbody>
//               {supervisorData.length > 0 ? (
//                 supervisorData.map((sup) => (
//                   <tr key={sup._id} className="hover:bg-gray-50">
//                     <td className="py-2 px-4 border">{sup.examtype}</td>
//                     <td className="py-2 px-4 border">{sup.examdate}</td>
//                     <td className="py-2 px-4 border">{sup.timeslot}</td>
//                     <td className="py-2 px-4 border">{sup.totalavailable}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="text-center py-6 text-gray-500 border">
//                     No supervisor records available.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default ExamSupervisorAllotment;


import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

const ExamSupervisorAllotment = () => {
  const navigate = useNavigate();
  const [supervisorData, setSupervisorData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSupervisors();
  }, []);

  const fetchSupervisors = async () => {
    try {
        // FIX: Using imported API_BASE_URL
        const response = await fetch(`${API_BASE_URL}api/get-supervisior`,{
            headers:{
                auth:'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
            }
        });
        const data = await response.json();
        setSupervisorData(data);
    } catch (err) {
      console.error("Error fetching supervisors:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    navigate("/exams-add-supervisors");
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="p-6 text-center">Loading...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        {/* Header */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleAdd}
            className="bg-blue-700 text-white px-4 py-1 rounded-md hover:bg-blue-800"
          >
            + Add
          </button>
        </div>

        {/* Supervisors Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-xl">
            <thead className="bg-blue-100 text-left text-black text-md">
              <tr>
                <th className="py-2 px-4 border">Exam Type</th>
                <th className="py-2 px-4 border">Exam Date</th>
                <th className="py-2 px-4 border">Time Slot</th>
                <th className="py-2 px-4 border">Total Available Supervisors</th>
              </tr>
            </thead>
            <tbody>
              {supervisorData.length > 0 ? (
                supervisorData.map((sup) => (
                  <tr key={sup._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border">{sup.examtype}</td>
                    <td className="py-2 px-4 border">{sup.examdate}</td>
                    <td className="py-2 px-4 border">{sup.timeslot}</td>
                    <td className="py-2 px-4 border">{sup.totalavailable}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500 border">
                    No supervisor records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default ExamSupervisorAllotment;