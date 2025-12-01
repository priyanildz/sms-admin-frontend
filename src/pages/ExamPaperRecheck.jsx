// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate } from "react-router-dom";

// const ExamPaperRecheck = () => {
//   const navigate = useNavigate();
//   const [rechecks, setRechecks] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/recheck", {
//       headers: {
//         auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//       },
//     }) // adjust baseURL
//       .then((res) => res.json())
//       .then((data) => setRechecks(data))
//       .catch((err) => console.error("Error fetching rechecks:", err));
//   }, []);

//   const assignRecheck = () => {
//     navigate("/exams-assign-recheck");
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         {/* Page Heading */}
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-xl font-semibold text-gray-800">
//             Exam Paper Rechecking
//           </h1>
//           <button
//             onClick={assignRecheck}
//             className="bg-blue-700 text-white text-sm px-5 py-2 rounded-md hover:bg-blue-800 transition-all"
//           >
//             + Add
//           </button>
//         </div>

//         {/* Rechecking Table */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm border rounded-xl">
//             <thead className="bg-blue-100 text-gray-700 text-left">
//               <tr>
//                 <th className="py-3 px-4 border">Tr Name</th>
//                 <th className="py-3 px-4 border">Standard</th>
//                 <th className="py-3 px-4 border">Division</th>
//                 <th className="py-3 px-4 border">Subject</th>
//                 <th className="py-3 px-4 border">No. of Papers</th>
//                 <th className="py-3 px-4 border">Assigned By</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rechecks.length > 0 ? (
//                 rechecks.map((entry, index) => (
//                   <tr key={index} className="hover:bg-gray-50 transition-all">
//                     <td className="py-2 px-4 border">
//                       {entry.assignedTo?.name || "Unknown"}
//                     </td>
//                     <td className="py-2 px-4 border">{entry.standard}</td>
//                     <td className="py-2 px-4 border">{entry.division}</td>
//                     <td className="py-2 px-4 border">{entry.subject}</td>
//                     <td className="py-2 px-4 border">{entry.numberOfPapers}</td>
//                     <td className="py-2 px-4 border">{entry.assignedBy}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="6"
//                     className="text-center py-6 text-gray-500 border"
//                   >
//                     No paper rechecking records available.
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

// export default ExamPaperRecheck;







// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate } from "react-router-dom";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// const ExamPaperRecheck = () => {
//   const navigate = useNavigate();
//   const [rechecks, setRechecks] = useState([]);

//   useEffect(() => {
//     // FIX: Using imported API_BASE_URL
//     fetch(`${API_BASE_URL}api/recheck`, {
//       headers: {
//         auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//       },
//     }) // adjust baseURL
//       .then((res) => res.json())
//       .then((data) => setRechecks(data))
//       .catch((err) => console.error("Error fetching rechecks:", err));
//   }, []);

//   const assignRecheck = () => {
//     navigate("/exams-assign-recheck");
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         {/* Page Heading */}
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-xl font-semibold text-gray-800">
//             Exam Paper Rechecking
//           </h1>
//           <button
//             onClick={assignRecheck}
//             className="bg-blue-700 text-white text-sm px-5 py-2 rounded-md hover:bg-blue-800 transition-all"
//           >
//             + Add
//           </button>
//         </div>

//         {/* Rechecking Table */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm border rounded-xl">
//             <thead className="bg-blue-100 text-gray-700 text-left">
//               <tr>
//                 <th className="py-3 px-4 border">Tr Name</th>
//                 <th className="py-3 px-4 border">Standard</th>
//                 <th className="py-3 px-4 border">Division</th>
//                 <th className="py-3 px-4 border">Subject</th>
//                 <th className="py-3 px-4 border">No. of Papers</th>
//                 <th className="py-3 px-4 border">Assigned By</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rechecks.length > 0 ? (
//                 rechecks.map((entry, index) => (
//                   <tr key={index} className="hover:bg-gray-50 transition-all">
//                     <td className="py-2 px-4 border">
//                       {entry.assignedTo?.name || "Unknown"}
//                     </td>
//                     <td className="py-2 px-4 border">{entry.standard}</td>
//                     <td className="py-2 px-4 border">{entry.division}</td>
//                     <td className="py-2 px-4 border">{entry.subject}</td>
//                     <td className="py-2 px-4 border">{entry.numberOfPapers}</td>
//                     <td className="py-2 px-4 border">{entry.assignedBy}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="6"
//                     className="text-center py-6 text-gray-500 border"
//                   >
//                     No paper rechecking records available.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default ExamPaperRecheck;






import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

const ExamPaperRecheck = () => {
  const navigate = useNavigate();
  const [rechecks, setRechecks] = useState([]);

  const AUTH_TOKEN = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
  const apiHeaders = { auth: AUTH_TOKEN };

  useEffect(() => {
    fetchRecheckData();
  }, []);

  const fetchRecheckData = () => {
    fetch(`${API_BASE_URL}api/recheck`, { headers: apiHeaders })
      .then((res) => res.json())
      .then((data) => setRechecks(data))
      .catch((err) => console.error("Error fetching rechecks:", err));
  };

  // -------------------------------------------
  // SAFE DELETE HANDLER (NO JSON PARSE ERRORS)
  // -------------------------------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recheck assignment?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}api/recheck/${id}`, {
        method: "DELETE",
        headers: {
          ...apiHeaders,
          Accept: "application/json",
        },
      });

      // Step 1: read raw text (can be JSON or HTML)
      const raw = await response.text();

      // Step 2: try parsing JSON safely
      let parsed = null;
      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        try {
          parsed = JSON.parse(raw);
        } catch (_) {
          parsed = null;
        }
      } else {
        try {
          parsed = JSON.parse(raw);
        } catch (_) {
          parsed = null;
        }
      }

      if (response.ok) {
        alert("Recheck assignment deleted successfully.");
        fetchRecheckData();
      } else {
        const serverMessage =
          (parsed && (parsed.message || parsed.error)) ||
          raw ||
          `HTTP ${response.status}`;

        console.error("Delete failed:", {
          status: response.status,
          statusText: response.statusText,
          raw,
          parsed,
        });

        alert(`Failed to delete assignment: ${serverMessage}`);
      }
    } catch (err) {
      console.error("Network/JS Delete Error:", err);
      alert("Error deleting recheck assignment: " + err.message);
    }
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">

        {/* Page Heading */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            Exam Paper Rechecking
          </h1>
          <button
            onClick={navigate.bind(null, "/exams-assign-recheck")}
            className="bg-blue-700 text-white text-sm px-5 py-2 rounded-md hover:bg-blue-800 transition-all"
          >
            + Add
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border rounded-xl">
            <thead className="bg-blue-100 text-gray-700 text-left">
              <tr>
                <th className="py-3 px-4 border">Teacher Name</th>
                <th className="py-3 px-4 border">Standard</th>
                <th className="py-3 px-4 border">Division</th>
                <th className="py-3 px-4 border">Subject</th>
                <th className="py-3 px-4 border">No. of Papers</th>
                <th className="py-3 px-4 border">Assigned By</th>
                <th className="py-3 px-4 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {rechecks.length > 0 ? (
                rechecks.map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-all">
                    <td className="py-2 px-4 border">
                      {entry.assignedTo
                        ? `${entry.assignedTo.firstname} ${entry.assignedTo.lastname}`
                        : "Unknown"}
                    </td>
                    <td className="py-2 px-4 border">{entry.standard}</td>
                    <td className="py-2 px-4 border">{entry.division}</td>
                    <td className="py-2 px-4 border">{entry.subject}</td>
                    <td className="py-2 px-4 border">{entry.numberOfPapers}</td>
                    <td className="py-2 px-4 border">{entry.assignedBy}</td>

                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => handleDelete(entry._id)}
                        className="text-red-500 hover:text-red-700 text-xs font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  {/* No data message row */}
                  <td colSpan="7" className="text-center py-6 text-gray-500 border">
                    No paper rechecking records available.
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

export default ExamPaperRecheck;
