// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";

// const AcademicSyllabus = () => {
//   const [selectedStd, setSelectedStd] = useState("");
//   const [syllabusData, setSyllabusData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch syllabus data from API
//   const fetchSyllabusData = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:5000/api/getCurrentSyllabus',{
//         headers:{
//           auth:'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
//         }
//       });
//       if (!response.ok) {
//         throw new Error('Failed to fetch syllabus data');
//       }
//       const data = await response.json();
//       setSyllabusData(data);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching syllabus data:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSyllabusData();
//   }, []);

//   // Get unique standards for dropdown
//   const getUniqueStandards = () => {
//     const standards = [...new Set(syllabusData.map(item => item.std))];
//     return standards.sort((a, b) => parseInt(a) - parseInt(b));
//   };

//   // Filter and group data by standard and subject
//   const getFilteredData = () => {
//     let filtered = syllabusData;
    
//     if (selectedStd) {
//       filtered = syllabusData.filter(item => item.std === selectedStd);
//     }

//     // Group by subject and aggregate division data
//     const groupedData = filtered.reduce((acc, item) => {
//       const key = `${item.subject}`;
//       if (!acc[key]) {
//         acc[key] = {
//           subject: item.subject,
//           std: item.std,
//           total: item.total,
//           divisions: {},
//           completed: {}
//         };
//       }
      
//       // Store data for each division
//       acc[key].divisions[item.div] = {
//         pending: item.pending,
//         completed: item.total - item.pending,
//         teacher: item.class_teacher
//       };
      
//       return acc;
//     }, {});

//     return Object.values(groupedData);
//   };

//   const filteredData = getFilteredData();
//   const uniqueStandards = getUniqueStandards();
  
//   // Get all unique divisions from filtered data
//   const getAllDivisions = () => {
//     const divisions = new Set();
//     filteredData.forEach(subject => {
//       Object.keys(subject.divisions).forEach(div => divisions.add(div));
//     });
//     return Array.from(divisions).sort();
//   };

//   const allDivisions = getAllDivisions();

//   if (loading) {
//     return (
//       <MainLayout>
//         <div className="bg-white rounded-2xl shadow p-6">
//           <div className="flex justify-center items-center h-64">
//             <div className="text-lg text-gray-600">Loading syllabus data...</div>
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
//           </div>
//         </div>
//       </MainLayout>
//     );
//   }

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6 space-y-6">
//           {/* Filters Row */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
//             <label className="text-sm font-medium text-gray-700 sm:mr-2">
//               STD
//             </label>
//             <div className="w-full sm:w-1/3">
//               <select
//                 value={selectedStd}
//                 onChange={(e) => setSelectedStd(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="">All Standards</option>
//                 {uniqueStandards.map(std => (
//                   <option key={std} value={std}>
//                     Standard {std}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Syllabus Tracking Heading */}
//           <h2 className="text-xl font-semibold text-center text-gray-800 mt-4">
//             Syllabus Tracking
//           </h2>

//           {/* Syllabus Table */}
//           {filteredData.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="min-w-full border rounded-md">
//                 <thead className="bg-blue-100 text-black">
//                   <tr>
//                     <th className="text-left px-6 py-3 border">Subject</th>
//                     <th className="text-left px-6 py-3 border">Total Chapters</th>
//                     {allDivisions.map(div => (
//                       <th key={div} className="text-center px-6 py-3 border">
//                         Division {div}
//                         <br />
//                         <span className="text-xs text-gray-600">(Completed/Pending)</span>
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white">
//                   {filteredData.map((item, index) => (
//                     <tr key={index} className="border-b hover:bg-gray-50">
//                       <td className="px-6 py-3 border-r font-medium">{item.subject}</td>
//                       <td className="px-6 py-3 border-r text-center">{item.total}</td>
//                       {allDivisions.map(div => (
//                         <td key={div} className="px-6 py-3 border-r text-center">
//                           {item.divisions[div] ? (
//                             <div className="space-y-1">
//                               <div className="text-sm">
//                                 <span className="text-green-600 font-semibold">
//                                   {item.divisions[div].completed}
//                                 </span>
//                                 /
//                                 <span className="text-red-600 font-semibold">
//                                   {item.divisions[div].pending}
//                                 </span>
//                               </div>
//                               <div className="text-xs text-gray-500">
//                                 {item.divisions[div].teacher}
//                               </div>
//                             </div>
//                           ) : (
//                             <span className="text-gray-400">-</span>
//                           )}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="text-center py-8 text-gray-500">
//               No syllabus data available for the selected criteria.
//             </div>
//           )}

//           {/* Summary Statistics */}
//           {filteredData.length > 0 && (
//             <div className="mt-6 bg-gray-50 rounded-lg p-4">
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">Summary</h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-blue-600">
//                     {filteredData.length}
//                   </div>
//                   <div className="text-sm text-gray-600">Total Subjects</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-green-600">
//                     {filteredData.reduce((acc, subject) => {
//                       const completed = Object.values(subject.divisions).reduce(
//                         (sum, div) => sum + div.completed, 0
//                       );
//                       return acc + completed;
//                     }, 0)}
//                   </div>
//                   <div className="text-sm text-gray-600">Total Completed</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-red-600">
//                     {filteredData.reduce((acc, subject) => {
//                       const pending = Object.values(subject.divisions).reduce(
//                         (sum, div) => sum + div.pending, 0
//                       );
//                       return acc + pending;
//                     }, 0)}
//                   </div>
//                   <div className="text-sm text-gray-600">Total Pending</div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default AcademicSyllabus;

import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config';

const AcademicSyllabus = () => {
  const [selectedStd, setSelectedStd] = useState("");
  const [syllabusData, setSyllabusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch syllabus data from API
  const fetchSyllabusData = async () => {
    try {
      setLoading(true);
      // FIX: Using imported API_BASE_URL
      const response = await fetch(`${API_BASE_URL}api/getCurrentSyllabus`,{
        headers:{
          auth:'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch syllabus data');
      }
      const data = await response.json();
      setSyllabusData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching syllabus data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSyllabusData();
  }, []);

  // Get unique standards for dropdown
  const getUniqueStandards = () => {
    const standards = [...new Set(syllabusData.map(item => item.std))];
    return standards.sort((a, b) => parseInt(a) - parseInt(b));
  };

  // Filter and group data by standard and subject
  const getFilteredData = () => {
    let filtered = syllabusData;
    
    if (selectedStd) {
      filtered = syllabusData.filter(item => item.std === selectedStd);
    }

    // Group by subject and aggregate division data
    const groupedData = filtered.reduce((acc, item) => {
      const key = `${item.subject}`;
      if (!acc[key]) {
        acc[key] = {
          subject: item.subject,
          std: item.std,
          total: item.total,
          divisions: {},
          completed: {}
        };
      }
      
      // Store data for each division
      acc[key].divisions[item.div] = {
        pending: item.pending,
        completed: item.total - item.pending,
        teacher: item.class_teacher
      };
      
      return acc;
    }, {});

    return Object.values(groupedData);
  };

  const filteredData = getFilteredData();
  const uniqueStandards = getUniqueStandards();
  
  // Get all unique divisions from filtered data
  const getAllDivisions = () => {
    const divisions = new Set();
    filteredData.forEach(subject => {
      Object.keys(subject.divisions).forEach(div => divisions.add(div));
    });
    return Array.from(divisions).sort();
  };

  const allDivisions = getAllDivisions();

  if (loading) {
    return (
      <MainLayout>
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Loading syllabus data...</div>
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
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="p-6 space-y-6">
          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <label className="text-sm font-medium text-gray-700 sm:mr-2">
              STD
            </label>
            <div className="w-full sm:w-1/3">
              <select
                value={selectedStd}
                onChange={(e) => setSelectedStd(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Standards</option>
                {uniqueStandards.map(std => (
                  <option key={std} value={std}>
                    Standard {std}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Syllabus Tracking Heading */}
          <h2 className="text-xl font-semibold text-center text-gray-800 mt-4">
            Syllabus Tracking
          </h2>

          {/* Syllabus Table */}
          {filteredData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-md">
                <thead className="bg-blue-100 text-black">
                  <tr>
                    <th className="text-left px-6 py-3 border">Subject</th>
                    <th className="text-left px-6 py-3 border">Total Chapters</th>
                    {allDivisions.map(div => (
                      <th key={div} className="text-center px-6 py-3 border">
                        Division {div}
                        <br />
                        <span className="text-xs text-gray-600">(Completed/Pending)</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {filteredData.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-3 border-r font-medium">{item.subject}</td>
                      <td className="px-6 py-3 border-r text-center">{item.total}</td>
                      {allDivisions.map(div => (
                        <td key={div} className="px-6 py-3 border-r text-center">
                          {item.divisions[div] ? (
                            <div className="space-y-1">
                              <div className="text-sm">
                                <span className="text-green-600 font-semibold">
                                  {item.divisions[div].completed}
                                </span>
                                /
                                <span className="text-red-600 font-semibold">
                                  {item.divisions[div].pending}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500">
                                {item.divisions[div].teacher}
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No syllabus data available for the selected criteria.
            </div>
          )}

          {/* Summary Statistics */}
          {filteredData.length > 0 && (
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {filteredData.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Subjects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {filteredData.reduce((acc, subject) => {
                      const completed = Object.values(subject.divisions).reduce(
                        (sum, div) => sum + div.completed, 0
                      );
                      return acc + completed;
                    }, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {filteredData.reduce((acc, subject) => {
                      const pending = Object.values(subject.divisions).reduce(
                        (sum, div) => sum + div.pending, 0
                      );
                      return acc + pending;
                    }, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Total Pending</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default AcademicSyllabus;