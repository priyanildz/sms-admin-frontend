// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate } from "react-router-dom";

// const ExamAssignBlocks = () => {
//   const navigate = useNavigate();
//   const [examBlocks, setExamBlocks] = useState([]);
//   const [selectedBlock, setSelectedBlock] = useState(null);
//   const [showDetails, setShowDetails] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/eblock", {
//       headers: {
//         auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//       },
//     }) // change baseURL if needed
//       .then((res) => res.json())
//       .then((data) => {
//         setExamBlocks(data);
//       })
//       .catch((err) => {
//         console.error("Error fetching exam blocks:", err);
//       });
//   }, []);

//   const createBlock = () => {
//     navigate("/exams-add-assign-blocks");
//   };

//   const handleView = (block) => {
//     setSelectedBlock(block);
//     setShowDetails(true);
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         {/* Header */}
//         <div className="flex justify-end mb-4">
//           <button
//             onClick={createBlock}
//             className="bg-blue-700 text-white px-4 py-1 rounded-md hover:bg-blue-800"
//           >
//             + Add
//           </button>
//         </div>

//         {/* Exam Blocks Table */}
//         <div className="overflow-x-auto mb-8">
//           <table className="min-w-full border rounded-xl">
//             <thead className="bg-blue-100 text-left text-black text-md">
//               <tr>
//                 <th className="py-2 px-4 border">Block No</th>
//                 <th className="py-2 px-4 border">Standard</th>
//                 <th className="py-2 px-4 border">Exam Type</th>
//                 <th className="py-2 px-4 border">Date</th>
//                 <th className="py-2 px-4 border">Time</th>
//                 <th className="py-2 px-4 border">View</th>
//               </tr>
//             </thead>
//             <tbody>
//               {examBlocks.length > 0 ? (
//                 examBlocks.map((block, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="py-2 px-4 border">{block.blockNo}</td>
//                     <td className="py-2 px-4 border">{block.standard}</td>
//                     <td className="py-2 px-4 border">{block.examType}</td>
//                     <td className="py-2 px-4 border">
//                       {block.startDate} → {block.endDate}
//                     </td>
//                     <td className="py-2 px-4 border">
//                       {block.startTime} - {block.endTime}
//                     </td>
//                     <td className="py-2 px-4 border">
//                       <button
//                         onClick={() => handleView(block)}
//                         className="text-blue-600 hover:text-blue-800"
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="6"
//                     className="text-center py-6 text-gray-500 border"
//                   >
//                     No exam blocks available.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Block Details View */}
//         {selectedBlock && showDetails && (
//           <div className="mt-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold text-gray-800">
//                 Block Details - No: {selectedBlock.blockNo}
//               </h2>
//               <button
//                 onClick={() => setShowDetails(false)}
//                 className="text-sm bg-red-100 hover:bg-red-200 text-red-600 px-4 py-1.5 rounded-md transition duration-200"
//               >
//                 Hide
//               </button>
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
//                 <h3 className="text-lg font-semibold text-blue-700 mb-3">
//                   {selectedBlock.standard}
//                 </h3>
//                 <p>
//                   <b>Exam:</b> {selectedBlock.examType}
//                 </p>
//                 <p>
//                   <b>Start:</b> {selectedBlock.startDate}{" "}
//                   {selectedBlock.startTime}
//                 </p>
//                 <p>
//                   <b>End:</b> {selectedBlock.endDate} {selectedBlock.endTime}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// };

// export default ExamAssignBlocks;

import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

const ExamAssignBlocks = () => {
  const navigate = useNavigate();
  const [examBlocks, setExamBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [showDetails, setShowDetails] = useState(true);

  useEffect(() => {
    // FIX: Using imported API_BASE_URL
    fetch(`${API_BASE_URL}api/eblock`, {
      headers: {
        auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
      },
    }) // change baseURL if needed
      .then((res) => res.json())
      .then((data) => {
        setExamBlocks(data);
      })
      .catch((err) => {
        console.error("Error fetching exam blocks:", err);
      });
  }, []);

  const createBlock = () => {
    navigate("/exams-add-assign-blocks");
  };

  const handleView = (block) => {
    setSelectedBlock(block);
    setShowDetails(true);
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        {/* Header */}
        <div className="flex justify-end mb-4">
          <button
            onClick={createBlock}
            className="bg-blue-700 text-white px-4 py-1 rounded-md hover:bg-blue-800"
          >
            + Add
          </button>
        </div>

        {/* Exam Blocks Table */}
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full border rounded-xl">
            <thead className="bg-blue-100 text-left text-black text-md">
              <tr>
                <th className="py-2 px-4 border">Block No</th>
                <th className="py-2 px-4 border">Standard</th>
                <th className="py-2 px-4 border">Exam Type</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Time</th>
                <th className="py-2 px-4 border">View</th>
              </tr>
            </thead>
            <tbody>
              {examBlocks.length > 0 ? (
                examBlocks.map((block, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border">{block.blockNo}</td>
                    <td className="py-2 px-4 border">{block.standard}</td>
                    <td className="py-2 px-4 border">{block.examType}</td>
                    <td className="py-2 px-4 border">
                      {block.startDate} → {block.endDate}
                    </td>
                    <td className="py-2 px-4 border">
                      {block.startTime} - {block.endTime}
                    </td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => handleView(block)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500 border"
                  >
                    No exam blocks available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Block Details View */}
        {selectedBlock && showDetails && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Block Details - No: {selectedBlock.blockNo}
              </h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-sm bg-red-100 hover:bg-red-200 text-red-600 px-4 py-1.5 rounded-md transition duration-200"
              >
                Hide
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
                <h3 className="text-lg font-semibold text-blue-700 mb-3">
                  {selectedBlock.standard}
                </h3>
                <p>
                  <b>Exam:</b> {selectedBlock.examType}
                </p>
                <p>
                  <b>Start:</b> {selectedBlock.startDate}{" "}
                  {selectedBlock.startTime}
                </p>
                <p>
                  <b>End:</b> {selectedBlock.endDate} {selectedBlock.endTime}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ExamAssignBlocks;