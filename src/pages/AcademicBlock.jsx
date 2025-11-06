// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import AddBlockModal from "../components/AddBlockModal"; // adjust path as needed

// const AcademicBlock = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     standard: "",
//     division: "",
//     timing: "",
//     teacher: "",
//     capacity: "",
//     blockNo: "",
//   });

//   // Fetch blocks data from API
//   const fetchBlocks = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         "http://localhost:5000/api/academic-blocks",
//         {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch blocks data");
//       }
//       const blocksData = await response.json();
//       setData(blocksData);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//       console.error("Error fetching blocks:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add new block
//   const handleAddBlock = async (blockData) => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/add-academicblock",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//           body: JSON.stringify({
//             standard: blockData.standard,
//             division: blockData.division,
//             timing: blockData.timing,
//             teacherAssigned: blockData.teacher,
//             capacity: parseInt(blockData.capacity) || 30,
//             blockNo: blockData.blockNo || `B${data.length + 1}`,
//             studentsAllocated: 0,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to add block");
//       }

//       const newBlock = await response.json();

//       // Refresh the data after successful addition
//       await fetchBlocks();

//       // Reset form and close modal
//       setFormData({
//         standard: "",
//         division: "",
//         timing: "",
//         teacher: "",
//         capacity: "",
//         blockNo: "",
//       });
//       setIsModalOpen(false);

//       // Show success message (optional)
//       alert("Block added successfully!");
//     } catch (err) {
//       console.error("Error adding block:", err);
//       alert("Failed to add block. Please try again.");
//     }
//   };

//   useEffect(() => {
//     fetchBlocks();
//   }, []);

//   // Filter data based on search term
//   const filteredData = data.filter(
//     (item) =>
//       item.standard?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.division?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.blockNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.teacherAssigned?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <MainLayout>
//         <div className="bg-white rounded-2xl shadow p-6">
//           <div className="flex justify-center items-center h-64">
//             <div className="text-lg text-gray-600">Loading blocks data...</div>
//           </div>
//         </div>
//       </MainLayout>
//     );
//   }

//   if (error) {
//     return (
//       <MainLayout>
//         <div className="bg-white rounded-2xl shadow p-6">
//           <div className="flex justify-center items-center h-64">
//             <div className="text-lg text-red-600">Error: {error}</div>
//             <button
//               onClick={fetchBlocks}
//               className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Retry
//             </button>
//           </div>
//         </div>
//       </MainLayout>
//     );
//   }

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6">
//           {/* Top bar: Search + Add Button */}
//           <div className="flex justify-between items-center mb-4">
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="border px-3 py-2 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
//               onClick={() => setIsModalOpen(true)}
//             >
//               Add
//             </button>
//           </div>

//           {/* Academic Year Display */}
//           <div className="text-right mb-4">
//             <span className="text-gray-600">AY: 2024-2025</span>
//           </div>

//           {/* Centered header */}
//           <h2 className="text-center text-2xl font-semibold mb-6">
//             Block Allotment
//           </h2>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-200 rounded">
//               <thead className="bg-blue-100 text-black">
//                 <tr>
//                   <th className="px-4 py-2 border text-left">Standard</th>
//                   <th className="px-4 py-2 border text-left">Division</th>
//                   <th className="px-4 py-2 border text-left">Block No</th>
//                   <th className="px-4 py-2 border text-left">Capacity</th>
//                   <th className="px-4 py-2 border text-left">
//                     Students Allocated
//                   </th>
//                   <th className="px-4 py-2 border text-left">
//                     Teacher Assigned
//                   </th>
//                   <th className="px-4 py-2 border text-left">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white">
//                 {filteredData.length > 0 ? (
//                   filteredData.map((item, index) => (
//                     <tr key={item._id || index} className="hover:bg-gray-50">
//                       <td className="px-4 py-2 border text-center">
//                         {item.standard}
//                       </td>
//                       <td className="px-4 py-2 border text-center">
//                         {item.division}
//                       </td>
//                       <td className="px-4 py-2 border text-center">
//                         {item.blockNo}
//                       </td>
//                       <td className="px-4 py-2 border text-center">
//                         {item.capacity}
//                       </td>
//                       <td className="px-4 py-2 border text-center">
//                         <span
//                           className={
//                             item.studentsAllocated >= item.capacity
//                               ? "text-red-600 font-semibold"
//                               : "text-green-600"
//                           }
//                         >
//                           {item.studentsAllocated}
//                         </span>
//                       </td>
//                       <td className="px-4 py-2 border text-center">
//                         {item.teacherAssigned}
//                       </td>
//                       <td className="px-4 py-2 border text-center">
//                         <button className="text-blue-600 hover:underline">
//                           Edit
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="7"
//                       className="px-4 py-6 text-center text-gray-500"
//                     >
//                       No results found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Summary Stats */}
//           {data.length > 0 && (
//             <div className="mt-6 bg-gray-50 rounded-lg p-4">
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
//                 <div>
//                   <div className="text-2xl font-bold text-blue-600">
//                     {data.length}
//                   </div>
//                   <div className="text-sm text-gray-600">Total Blocks</div>
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold text-green-600">
//                     {data.reduce(
//                       (sum, block) => sum + (block.capacity || 0),
//                       0
//                     )}
//                   </div>
//                   <div className="text-sm text-gray-600">Total Capacity</div>
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold text-orange-600">
//                     {data.reduce(
//                       (sum, block) => sum + (block.studentsAllocated || 0),
//                       0
//                     )}
//                   </div>
//                   <div className="text-sm text-gray-600">
//                     Students Allocated
//                   </div>
//                 </div>
//                 <div>
//                   <div className="text-2xl font-bold text-purple-600">
//                     {data.reduce(
//                       (sum, block) =>
//                         sum +
//                         (block.capacity || 0) -
//                         (block.studentsAllocated || 0),
//                       0
//                     )}
//                   </div>
//                   <div className="text-sm text-gray-600">Available Seats</div>
//                 </div>
//               </div>
//             </div>
//           )}

//           <AddBlockModal
//             isOpen={isModalOpen}
//             onClose={() => setIsModalOpen(false)}
//             formData={formData}
//             setFormData={setFormData}
//             onSubmit={handleAddBlock}
//           />
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default AcademicBlock;


import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import AddBlockModal from "../components/AddBlockModal"; // adjust path as needed
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

const AcademicBlock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    standard: "",
    division: "",
    timing: "",
    teacher: "",
    capacity: "",
    blockNo: "",
  });

  const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU="; 

  // Fetch blocks data from API
  const fetchBlocks = async () => {
    try {
      setLoading(true);
      // FIX 1: Using imported API_BASE_URL
      const response = await fetch(
        `${API_BASE_URL}api/academic-blocks`,
        {
          headers: {
            auth: AUTH_HEADER,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch blocks data");
      }
      const blocksData = await response.json();
      setData(blocksData);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching blocks:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add new block
  const handleAddBlock = async (blockData) => {
    try {
      // FIX 2: Using imported API_BASE_URL
      const response = await fetch(
        `${API_BASE_URL}api/add-academicblock`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            auth: AUTH_HEADER,
          },
          body: JSON.stringify({
            standard: blockData.standard,
            division: blockData.division,
            timing: blockData.timing,
            teacherAssigned: blockData.teacher,
            capacity: parseInt(blockData.capacity) || 30,
            blockNo: blockData.blockNo || `B${data.length + 1}`,
            studentsAllocated: 0,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add block");
      }

      const newBlock = await response.json();

      // Refresh the data after successful addition
      await fetchBlocks();

      // Reset form and close modal
      setFormData({
        standard: "",
        division: "",
        timing: "",
        teacher: "",
        capacity: "",
        blockNo: "",
      });
      setIsModalOpen(false);

      // Show success message (optional)
      alert("Block added successfully!");
    } catch (err) {
      console.error("Error adding block:", err);
      alert("Failed to add block. Please try again.");
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  // Filter data based on search term
  const filteredData = data.filter(
    (item) =>
      item.standard?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.division?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.blockNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.teacherAssigned?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <MainLayout>
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Loading blocks data...</div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-600">Error: {error}</div>
            <button
              onClick={fetchBlocks}
              className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Retry
            </button>
            </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="p-6">
          {/* Top bar: Search + Add Button */}
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-3 py-2 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              Add
            </button>
          </div>

          {/* Academic Year Display */}
          <div className="text-right mb-4">
            <span className="text-gray-600">AY: 2024-2025</span>
          </div>

          {/* Centered header */}
          <h2 className="text-center text-2xl font-semibold mb-6">
            Block Allotment
          </h2>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded">
              <thead className="bg-blue-100 text-black">
                <tr>
                  <th className="px-4 py-2 border text-left">Standard</th>
                  <th className="px-4 py-2 border text-left">Division</th>
                  <th className="px-4 py-2 border text-left">Block No</th>
                  <th className="px-4 py-2 border text-left">Capacity</th>
                  <th className="px-4 py-2 border text-left">
                    Students Allocated
                  </th>
                  <th className="px-4 py-2 border text-left">
                    Teacher Assigned
                  </th>
                  <th className="px-4 py-2 border text-left">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={item._id || index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border text-center">
                        {item.standard}
                      </td>
                      <td className="px-4 py-2 border text-center">
                        {item.division}
                      </td>
                      <td className="px-4 py-2 border text-center">
                        {item.blockNo}
                      </td>
                      <td className="px-4 py-2 border text-center">
                        {item.capacity}
                      </td>
                      <td className="px-4 py-2 border text-center">
                        <span
                          className={
                            item.studentsAllocated >= item.capacity
                              ? "text-red-600 font-semibold"
                              : "text-green-600"
                          }
                        >
                          {item.studentsAllocated}
                        </span>
                      </td>
                      <td className="px-4 py-2 border text-center">
                        {item.teacherAssigned}
                      </td>
                      <td className="px-4 py-2 border text-center">
                        <button className="text-blue-600 hover:underline">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Summary Stats */}
          {data.length > 0 && (
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {data.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Blocks</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {data.reduce(
                      (sum, block) => sum + (block.capacity || 0),
                      0
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Total Capacity</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {data.reduce(
                      (sum, block) => sum + (block.studentsAllocated || 0),
                      0
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    Students Allocated
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {data.reduce(
                      (sum, block) =>
                        sum +
                        (block.capacity || 0) -
                        (block.studentsAllocated || 0),
                      0
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Available Seats</div>
                </div>
              </div>
            </div>
          )}

          <AddBlockModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleAddBlock}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default AcademicBlock;