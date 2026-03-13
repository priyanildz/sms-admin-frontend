// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from "../config";

// const ReportCard = () => {
//   const [selectedStd, setSelectedStd] = useState("");
//   const [selectedDiv, setSelectedDiv] = useState("");
//   const [students, setStudents] = useState([]);

//   const stdOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
//   const divOptions = ["A", "B", "C", "D", "E"];

//   const subjects = ["English", "Maths", "Science", "History", "Computer"];

//   // Fetch report card data from backend
//   const fetchReportCardData = async (std, div) => {
//     try {
//       const storedUsername = localStorage.getItem("username") || "System_User";
//       const storedRole = localStorage.getItem("role") || "admin";
//       const res = await fetch(`${API_BASE_URL}api/reports`, {
//         headers: {
//           auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           username: storedUsername,
//           role: storedRole,
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
//                       0,
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
//                 No report card data found for Standard {selectedStd}, Division
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
import axios from "axios";
import { API_BASE_URL } from "../config";

const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

const stdOptions = [
  "nursery",
  "Junior",
  "Senior",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
];
const divOptions = ["A", "B", "C", "D", "E"];
const semOptions = ["Unit Test 1", "Sem 1", "Unit Test 2", "Sem 2"]; // Matches "mode" in your DB screenshot

export default function ExamResults() {
  const [selectedStd, setSelectedStd] = useState("");
  const [selectedDiv, setSelectedDiv] = useState("");
  const [selectedSem, setSelectedSem] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async () => {
    if (!selectedStd || !selectedDiv || !selectedSem) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}api/exam-results`,
        {
          standard: selectedStd,
          division: selectedDiv,
          semester: selectedSem, // This maps to 'mode' in your controller
        },
        {
          headers: {
            auth: AUTH_HEADER,
          },
        },
      );

      setResults(response.data || []);
    } catch (error) {
      console.error("Error fetching exam results:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [selectedStd, selectedDiv, selectedSem]);

  const getSubjects = () => {
    if (results.length === 0) return [];
    return Object.keys(results[0]).filter(
      (key) => key !== "name" && key !== "studentId",
    );
  };

  const subjects = getSubjects();

  return (
    <MainLayout>
      <div className="p-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Standard
              </label>
              <select
                value={selectedStd}
                onChange={(e) => setSelectedStd(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="">Select</option>
                {stdOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Division
              </label>
              <select
                value={selectedDiv}
                onChange={(e) => setSelectedDiv(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="">Select</option>
                {divOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Exam Type
              </label>
              <select
                value={selectedSem}
                onChange={(e) => setSelectedSem(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="">Select</option>
                {semOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center p-8 text-blue-600 font-bold">
              Loading Results...
            </div>
          ) : results.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border rounded-xl">
                <thead className="bg-blue-100 text-left text-gray-700">
                  <tr>
                    <th className="py-2 px-4 border">Student Name</th>
                    {subjects.map((sub) => (
                      <th key={sub} className="py-2 px-4 border">
                        {sub}
                      </th>
                    ))}
                    <th className="py-2 px-4 border font-bold">Marks Obtained</th>
                    <th className="py-2 px-4 border font-bold">
                      Total (Out of {subjects.length * (selectedSem.includes("Unit Test") ? 30 : 60)})
                    </th>
                    <th className="py-2 px-4 border font-bold">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((res, i) => {
                    const total = subjects.reduce(
                      (sum, sub) => sum + Number(res[sub] || 0),
                      0,
                    );

                    // Determine max marks based on exam type
                    const maxMarksPerSub = selectedSem.includes("Unit Test") ? 30 : 60;
                    const grandTotalPossible = subjects.length * maxMarksPerSub;
                    const percentage = grandTotalPossible > 0 
                      ? ((total / grandTotalPossible) * 100).toFixed(2) 
                      : "0.00";

                    return (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border font-medium">
                          {res.name}
                        </td>
                        {subjects.map((sub) => (
                          <td key={sub} className="py-2 px-4 border">
                            {res[sub] || "-"}
                          </td>
                        ))}
                        <td className="py-2 px-4 border font-bold">{total}</td>
                        <td className="py-2 px-4 border font">{grandTotalPossible}</td>
                        <td className="py-2 px-4 border font-bold">
                          {percentage}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            selectedStd &&
            selectedDiv &&
            selectedSem && (
              <div className="text-center p-8 text-gray-500">
                No marks found for this selection.
              </div>
            )
          )}
        </div>
      </div>
    </MainLayout>
  );
}