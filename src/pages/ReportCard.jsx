// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";

// const ReportCard = () => {
//   const [selectedStd, setSelectedStd] = useState("");
//   const [selectedDiv, setSelectedDiv] = useState("");
//   const [students, setStudents] = useState([]);

//   const stdOptions = ["1", "2", "3", "4", "5"];
//   const divOptions = ["A", "B", "C"];

//   const subjects = ["English", "Maths", "Science", "History", "Computer"];

//   // Fetch report card data from backend
//   const fetchReportCardData = async (std, div) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/reports", {
//         headers: {
//           auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//         },
//       }); // 🔹 your backend API
//       const data = await res.json();

//       // Format backend data into frontend structure
//       const formatted = data.map((item, index) => ({
//         rollNo: index + 1, // you can replace with item.rollno if available
//         name: item.name,
//         marks: {
//           English: item.marksheet.english,
//           Maths: item.marksheet.math,
//           Science: item.marksheet.science,
//           History: item.marksheet.history,
//           Computer: item.marksheet.computer,
//         },
//       }));

//       return formatted;
//     } catch (err) {
//       console.error("Error fetching report cards:", err);
//       return [];
//     }
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       if (selectedStd && selectedDiv) {
//         const data = await fetchReportCardData(selectedStd, selectedDiv);
//         setStudents(data);
//       } else {
//         setStudents([]);
//       }
//     };
//     loadData();
//   }, [selectedStd, selectedDiv]);

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
//                 {stdOptions.map((std) => (
//                   <option key={std} value={std}>
//                     {std}
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
//                 {divOptions.map((div) => (
//                   <option key={div} value={div}>
//                     {div}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Validation Message */}
//           {(!selectedStd || !selectedDiv) && (
//             <div className="text-center text-red-500 font-semibold mb-6">
//               Please select both Standard and Division to view report cards.
//             </div>
//           )}

//           {/* Report Card Table */}
//           {students.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="min-w-full border rounded-xl">
//                 <thead className="bg-blue-100 text-left text-sm text-gray-700">
//                   <tr>
//                     <th className="py-2 px-4 border">Roll No.</th>
//                     <th className="py-2 px-4 border">Name</th>
//                     {subjects.map((subject) => (
//                       <th key={subject} className="py-2 px-4 border">
//                         {subject}
//                       </th>
//                     ))}
//                     <th className="py-2 px-4 border">Total</th>
//                     <th className="py-2 px-4 border">Percentage</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.map((student, index) => {
//                     const total = Object.values(student.marks).reduce(
//                       (sum, mark) => sum + (mark || 0),
//                       0
//                     );
//                     const percentage = (total / (subjects.length * 100)) * 100;
//                     return (
//                       <tr key={index} className="hover:bg-gray-50">
//                         <td className="py-2 px-4 border">{student.rollNo}</td>
//                         <td className="py-2 px-4 border">{student.name}</td>
//                         {subjects.map((subject) => (
//                           <td key={subject} className="py-2 px-4 border">
//                             {student.marks[subject] ?? "-"}
//                           </td>
//                         ))}
//                         <td className="py-2 px-4 border">{total}</td>
//                         <td className="py-2 px-4 border">
//                           {percentage.toFixed(2)}%
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             selectedStd &&
//             selectedDiv && (
//               <div className="text-gray-500 text-sm mt-4">
//                 No report card data found for Standard {selectedStd}, Division{" "}
//                 {selectedDiv}.
//               </div>
//             )
//           )}
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default ReportCard;


import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

const ReportCard = () => {
  const [selectedStd, setSelectedStd] = useState("");
  const [selectedDiv, setSelectedDiv] = useState("");
  const [students, setStudents] = useState([]);

  const stdOptions = ["1", "2", "3", "4", "5"];
  const divOptions = ["A", "B", "C"];

  const subjects = ["English", "Maths", "Science", "History", "Computer"];

  // Fetch report card data from backend
  const fetchReportCardData = async (std, div) => {
    try {
        // FIX: Using imported API_BASE_URL
        const res = await fetch(`${API_BASE_URL}api/reports`, {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
        }); // 🔹 your backend API
        const data = await res.json();

      // Format backend data into frontend structure
      const formatted = data.map((item, index) => ({
        rollNo: index + 1, // you can replace with item.rollno if available
        name: item.name,
        marks: {
          English: item.marksheet.english,
          Maths: item.marksheet.math,
          Science: item.marksheet.science,
          History: item.marksheet.history,
          Computer: item.marksheet.computer,
        },
      }));

      return formatted;
    } catch (err) {
      console.error("Error fetching report cards:", err);
      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (selectedStd && selectedDiv) {
        const data = await fetchReportCardData(selectedStd, selectedDiv);
        setStudents(data);
      } else {
        setStudents([]);
      }
    };
    loadData();
  }, [selectedStd, selectedDiv]);

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
                {stdOptions.map((std) => (
                  <option key={std} value={std}>
                    {std}
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
                {divOptions.map((div) => (
                  <option key={div} value={div}>
                    {div}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Validation Message */}
          {(!selectedStd || !selectedDiv) && (
            <div className="text-center text-red-500 font-semibold mb-6">
              Please select both Standard and Division to view report cards.
            </div>
          )}

          {/* Report Card Table */}
          {students.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-xl">
                <thead className="bg-blue-100 text-left text-sm text-gray-700">
                  <tr>
                    <th className="py-2 px-4 border">Roll No.</th>
                    <th className="py-2 px-4 border">Name</th>
                    {subjects.map((subject) => (
                      <th key={subject} className="py-2 px-4 border">
                        {subject}
                      </th>
                    ))}
                    <th className="py-2 px-4 border">Total</th>
                    <th className="py-2 px-4 border">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => {
                    const total = Object.values(student.marks).reduce(
                      (sum, mark) => sum + (mark || 0),
                      0
                    );
                    const percentage = (total / (subjects.length * 100)) * 100;
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border">{student.rollNo}</td>
                        <td className="py-2 px-4 border">{student.name}</td>
                        {subjects.map((subject) => (
                          <td key={subject} className="py-2 px-4 border">
                            {student.marks[subject] ?? "-"}
                          </td>
                        ))}
                        <td className="py-2 px-4 border">{total}</td>
                        <td className="py-2 px-4 border">
                          {percentage.toFixed(2)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            selectedStd &&
            selectedDiv && (
              <div className="text-gray-500 text-sm mt-4">
                No report card data found for Standard {selectedStd}, Division{" "}
                {selectedDiv}.
              </div>
            )
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ReportCard;