// import React, { useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import SelectField from "../components/SelectField";

// const AcademicAttendance = () => {
//   const [selectedStd, setSelectedStd] = useState("");
//   const [selectedDiv, setSelectedDiv] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchAttendance = async () => {
//     if (!selectedStd || !selectedDiv || !selectedDate) {
//       alert("Please select STD, Division and Date");
//       return;
//     }

//     try {
//       setLoading(true);
//       console.log("Fetching attendance for:", selectedStd, selectedDiv, selectedDate);
//       const response = await fetch("http://localhost:5000/api/attendance", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//         },
//         body: JSON.stringify({
//           std: selectedStd,
//           div: selectedDiv,
//           date: selectedDate,
//         }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         const present = data.students.filter((s) => s.remark === "P").length;
//         const absent = data.students.filter((s) => s.remark === "A").length;
//         const total = data.students.length;

//         setAttendanceData([
//           {
//             division: data.div,
//             present,
//             absent,
//             total,
//           },
//         ]);
//       } else {
//         setAttendanceData([]);
//         alert(data.message || "No attendance found!");
//       }
//     } catch (error) {
//       console.error("Error fetching attendance:", error);
//       alert("Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6 space-y-6">
//           {/* Filters Row */}
//           <div className="flex flex-wrap items-center gap-6">
//             {/* STD */}
//             <div className="flex items-center gap-2 w-1/4">
//               <label className="text-sm font-medium text-gray-700">STD:</label>
//               <select
//                 value={selectedStd}
//                 onChange={(e) => setSelectedStd(e.target.value)}
//                 className="border border-gray-300 px-4 py-2 rounded-md shadow-sm w-full"
//               >
//                 <option value="">Select STD</option>
//                 {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((std) => (
//                   <option key={std} value={std}>
//                     {std}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Division */}
//             <div className="flex items-center gap-2 w-1/4">
//               <label className="text-sm font-medium text-gray-700">Div:</label>
//               <select
//                 value={selectedDiv}
//                 onChange={(e) => setSelectedDiv(e.target.value)}
//                 className="border border-gray-300 px-4 py-2 rounded-md shadow-sm w-full"
//               >
//                 <option value="">Select Division</option>
//                 <option value="A">A</option>
//                 <option value="B">B</option>
//                 <option value="C">C</option>
//               </select>
//             </div>

//             {/* Date */}
//             <div className="flex items-center gap-2 w-1/4">
//               <label className="text-sm font-medium text-gray-700">Date:</label>
//               <input
//                 type="date"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 className="border border-gray-300 px-4 py-2 rounded-md shadow-sm w-full"
//               />
//             </div>

//             {/* Button */}
//             <div className="w-1/4">
//               <button
//                 onClick={fetchAttendance}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 w-full"
//               >
//                 {loading ? "Loading..." : "Fetch"}
//               </button>
//             </div>
//           </div>

//           <h2 className="text-xl font-semibold text-center text-gray-800">
//             Students Attendance
//           </h2>

//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-200 rounded-md">
//               <thead className="bg-blue-100 text-black">
//                 <tr>
//                   <th className="text-left px-6 py-3 border">Division</th>
//                   <th className="text-left px-6 py-3 border">
//                     Present Students
//                   </th>
//                   <th className="text-left px-6 py-3 border">
//                     Absent Students
//                   </th>
//                   <th className="text-left px-6 py-3 border">Total Students</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white">
//                 {attendanceData.length > 0 ? (
//                   attendanceData.map((item, index) => (
//                     <tr key={index} className="border-b hover:bg-gray-50">
//                       <td className="px-6 py-3 border">{item.division}</td>
//                       <td className="px-6 py-3 border">{item.present}</td>
//                       <td className="px-6 py-3 border">{item.absent}</td>
//                       <td className="px-6 py-3 border">{item.total}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="text-center py-4">
//                       No Data Found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default AcademicAttendance;



import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
// Assuming SelectField is not strictly necessary as we are using native <select>
// import SelectField from "../components/SelectField"; 
import { API_BASE_URL } from '../config'; 

const AcademicAttendance = () => {
    const [selectedStd, setSelectedStd] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Define all divisions that need to be checked
    const DIVISIONS_TO_CHECK = ["A", "B", "C", "D"];

    // --- Core Fetching Logic: Fetches ALL Divisions ---
    const fetchAttendance = async () => {
        if (!selectedStd || !selectedDate) {
            alert("Please select STD and Date");
            return;
        }

        setLoading(true);
        setAttendanceData([]); // Clear previous data
        const results = [];
        const authHeader = `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`;
        
        try {
            // 🚀 STEP 1: Iterate through each potential division and fetch data
            for (const div of DIVISIONS_TO_CHECK) {
                console.log(`Fetching attendance for: STD ${selectedStd}, DIV ${div}, Date ${selectedDate}`);
                
                // Using standard fetch and POST method
                const response = await fetch(`${API_BASE_URL}api/attendance`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        auth: authHeader,
                    },
                    body: JSON.stringify({
                        std: selectedStd,
                        // Crucially, we pass the current division in the loop
                        div: div, 
                        date: selectedDate,
                    }),
                });

                const data = await response.json();
                
                if (response.ok && data.students && data.students.length > 0) {
                    // 🚀 STEP 2: Aggregate data for the current division
                    const present = data.students.filter((s) => s.remark === "P").length;
                    const absent = data.students.filter((s) => s.remark === "A").length;
                    const total = data.students.length;

                    results.push({
                        division: div, // Use the successful division name
                        present,
                        absent,
                        total,
                    });
                } 
                // Note: We ignore 404/failure for a division (e.g., if "D" doesn't exist)
                // and continue to the next one.
            }

            // 🚀 STEP 3: Update the state with all compiled results
            if (results.length > 0) {
                setAttendanceData(results);
            } else {
                alert("No attendance data found for any division on this date.");
            }

        } catch (error) {
            console.error("Error fetching attendance:", error);
            alert("Something went wrong while fetching data!");
        } finally {
            setLoading(false);
        }
    };

    // Helper function to format the date for display
    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            return new Date(dateString).toLocaleDateString('en-GB', {
                day: '2-digit', month: '2-digit', year: 'numeric'
            });
        } catch {
            return dateString;
        }
    };

    return (
        <MainLayout>
            <div className="bg-white rounded-2xl shadow p-6">
                <div className="p-6 space-y-6">
                    {/* Filters Row */}
                    <div className="flex flex-wrap items-center gap-6">
                        
                        {/* STD Select */}
                        <div className="flex items-center gap-2 w-1/4">
                            <label className="text-sm font-medium text-gray-700">STD:</label>
                            <select
                                value={selectedStd}
                                onChange={(e) => setSelectedStd(e.target.value)}
                                className="border border-gray-300 px-4 py-2 rounded-md shadow-sm w-full"
                            >
                                <option value="">Select STD</option>
                                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((std) => (
                                    <option key={std} value={std}>
                                        {std}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date Input */}
                        <div className="flex items-center gap-2 w-1/4">
                            <label className="text-sm font-medium text-gray-700">Date:</label>
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="border border-gray-300 px-4 py-2 rounded-md shadow-sm w-full"
                            />
                        </div>

                        {/* Button */}
                        <div className="w-1/4">
                            <button
                                onClick={fetchAttendance}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 w-full"
                                disabled={loading || !selectedStd || !selectedDate}
                            >
                                {loading ? "Loading..." : "Fetch"} 
                            </button>
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold text-center text-gray-800">
                        Students Attendance 
                    </h2>

                    <div className="overflow-x-auto shadow-md rounded-lg">
                        <table className="min-w-full border-collapse">
                            <thead className="bg-blue-100 text-black">
                                <tr>
                                    <th className="text-center px-6 py-3 border border-gray-300">Divisions</th>
                                    <th className="text-center px-6 py-3 border border-gray-300">Present Student</th>
                                    <th className="text-center px-6 py-3 border border-gray-300">Absent Student</th>
                                    <th className="text-center px-6 py-3 border border-gray-300">Total Student</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {attendanceData.length > 0 ? (
                                    attendanceData.map((item, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="text-center px-6 py-3 border border-gray-300">{item.division}</td>
                                            <td className="text-center px-6 py-3 border border-gray-300">{item.present}</td>
                                            <td className="text-center px-6 py-3 border border-gray-300">{item.absent}</td>
                                            <td className="text-center px-6 py-3 border border-gray-300">{item.total}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-4 text-gray-500">
                                            {loading ? "Waiting for results..." : "No Attendance Data Found"}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default AcademicAttendance;