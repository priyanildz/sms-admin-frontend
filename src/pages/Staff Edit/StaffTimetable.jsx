// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
// const API_BASE_URL = "http://localhost:5000/api";

// // Days of the week displayed in the table headers
// const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday"];

// export default function StaffTimetable({ staff }) {
//     const staffName = `${staff?.firstname || ''} ${staff?.lastname || ''}`.trim() || 'Staff Member';
//     const staffId = staff?.staffid;

//     const [timetableData, setTimetableData] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // Function to fetch the staff's timetable from the API
//     const fetchTimetable = useCallback(async () => {
//         if (!staffId) {
//             console.warn("DEBUG: StaffTimetable - Staff ID is missing, cannot fetch timetable.");
//             setTimetableData([]);
//             return;
//         }

//         setIsLoading(true);
//         setError(null);
//         setTimetableData([]);

//         try {
//             console.log(`DEBUG: StaffTimetable - Fetching timetable for staff ID: ${staffId}`);
            
//             // NOTE: Assuming a dedicated backend endpoint for staff timetables.
//             // You MUST implement the GET /api/staff/:staffid/timetable route on your server.
//             const response = await axios.get(`${API_BASE_URL}/staff/${staffId}/timetable`, {
//                 headers: { 'auth': AUTH_HEADER }
//             });

//             // Assuming the backend returns an array like: 
//             // [{ time: "7:00 to 7:30", Mon: "Maths (8A)", Tue: "Science (8A)", ... }, ...]
//             const data = response.data || [];
            
//             console.log("DEBUG: StaffTimetable - Fetched timetable data:", data);
//             setTimetableData(data);

//         } catch (err) {
//             const errorMsg = err.response?.data?.message || err.message;
//             console.error("❌ ERROR: StaffTimetable - Failed to fetch timetable data:", errorMsg);
//             setError(errorMsg);
            
//             // Fallback to empty data on error
//             setTimetableData([]);
//         } finally {
//             setIsLoading(false);
//         }
//     }, [staffId]);
    
//     // Fetch data whenever the staff ID changes
//     useEffect(() => {
//         fetchTimetable();
//     }, [fetchTimetable]);

//     // Helper to extract the day's class from the row data
//     const getDayClass = (row, day) => {
//         // Map day name to property name (e.g., "Monday" -> "Mon")
//         const propName = day.substring(0, 3); 
//         return row[propName] || '';
//     };

//     return (
//         <div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                 Timetable for {staffName}
//             </h2>
//             <p className="text-gray-600 mb-6">
//                 Current week's teaching schedule.
//             </p>
            
//             <div className="overflow-x-auto">
//                 <table className="w-full border-collapse border-2 border-blue-500 min-w-[600px]">
//                     <thead>
//                         <tr className="bg-blue-100">
//                             <th className="border-2 border-blue-500 p-4 text-left font-semibold w-1/5">Timings</th>
//                             {weekdays.map(day => (
//                                 <th key={day} className="border-2 border-blue-500 p-4 text-left font-semibold w-1/5">
//                                     {day}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {isLoading ? (
//                             <tr>
//                                 <td colSpan="5" className="border border-blue-500 p-8 text-center text-blue-600">
//                                     Loading timetable...
//                                 </td>
//                             </tr>
//                         ) : error ? (
//                             <tr>
//                                 <td colSpan="5" className="border border-blue-500 p-8 text-center text-red-600">
//                                     Error loading timetable: {error}
//                                 </td>
//                             </tr>
//                         ) : timetableData.length === 0 ? (
//                             <tr>
//                                 <td colSpan="5" className="border border-blue-500 p-8 text-center text-gray-500">
//                                     No timetable found for this staff member.
//                                 </td>
//                             </tr>
//                         ) : (
//                             // Display fetched timetable data
//                             timetableData.map((row, i) => (
//                                 <tr key={i} className="hover:bg-gray-50">
//                                     <td className="border border-blue-500 p-4 font-medium bg-blue-50">
//                                         {row.time || 'N/A'}
//                                     </td>
//                                     {weekdays.map(day => (
//                                         <td key={day} className="border border-blue-500 p-4 h-12">
//                                             {getDayClass(row, day)}
//                                         </td>
//                                     ))}
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../../config';

// const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
// // const API_BASE_URL = "http://localhost:5000/api"; // REMOVED LOCAL DEFINITION

// // Days of the week displayed in the table headers
// const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// export default function StaffTimetable({ staff }) {
//     const staffName = `${staff?.firstname || ''} ${staff?.lastname || ''}`.trim() || 'Staff Member';
//     const staffId = staff?.staffid;

//     const [timetableData, setTimetableData] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // Function to fetch the staff's timetable from the API
//     const fetchTimetable = useCallback(async () => {
//         if (!staffId) {
//             console.warn("DEBUG: StaffTimetable - Staff ID is missing, cannot fetch timetable.");
//             setTimetableData([]);
//             return;
//         }

//         setIsLoading(true);
//         setError(null);
//         setTimetableData([]);

//         try {
//             console.log(`DEBUG: StaffTimetable - Fetching timetable for staff ID: ${staffId}`);
//             
//             // FIX: Using imported API_BASE_URL
//             const response = await axios.get(`${API_BASE_URL}api/staff/${staffId}/timetable`, {
//                 headers: { 'auth': AUTH_HEADER }
//             });

//             // Assuming the backend returns an array like: 
//             // [{ time: "7:00 to 7:30", Mon: "Maths (8A)", Tue: "Science (8A)", ... }, ...]
//             const data = response.data || [];
//             
//             console.log("DEBUG: StaffTimetable - Fetched timetable data:", data);
//             setTimetableData(data);

//         } catch (err) {
//             const errorMsg = err.response?.data?.message || err.message;
//             console.error("❌ ERROR: StaffTimetable - Failed to fetch timetable data:", errorMsg);
//             setError(errorMsg);
//             
//             // Fallback to empty data on error
//             setTimetableData([]);
//         } finally {
//             setIsLoading(false);
//         }
//     }, [staffId]);
//     
//     // Fetch data whenever the staff ID changes
//     useEffect(() => {
//         fetchTimetable();
//     }, [fetchTimetable]);

//     // Helper to extract the day's class from the row data
//     // Helper to extract the day's class from the row data
//     const getDayClass = (row, day) => {
//         // Map day name to property name (e.g., "Monday" -> "Mon")
//         const propName = day.substring(0, 3); 
//         const value = row[propName];
        
//         // 🚀 Return "Free Lecture" if the slot is empty or contains "-"
//         return (!value || value === '-') ? 'Free Lecture' : value;
//     };
//     return (
//         <div>
//             <h2 className="text-2xl text-center font-semibold text-gray-800 mb-8">
//                 Timetable for {staffName}
//             </h2>
// {/*             <p className="text-gray-600 mb-6">
//                 Current week's teaching schedule.
//             </p> */}
//             
//             <div className="overflow-x-auto">
//                 <table className="w-full border-collapse border-2 border-blue-500 min-w-[600px]">
//                     <thead>
//                         <tr className="bg-blue-100">
//                             <th className="border-2 border-blue-500 p-4 text-left font-semibold w-1/5">Timings</th>
//                             {weekdays.map(day => (
//                                 <th key={day} className="border-2 border-blue-500 p-4 text-left font-semibold w-1/5">
//                                     {day}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {isLoading ? (
//                             <tr>
//                                 <td colSpan="5" className="border border-blue-500 p-8 text-center text-blue-600">
//                                     Loading timetable...
//                                 </td>
//                             </tr>
//                         ) : error ? (
//                             <tr>
//                                 <td colSpan="5" className="border border-blue-500 p-8 text-center text-red-600">
//                                     Error loading timetable: {error}
//                                 </td>
//                             </tr>
//                         ) : timetableData.length === 0 ? (
//                             <tr>
//                                 <td colSpan="7" className="border border-blue-500 p-8 text-center text-gray-500">
//                                     No timetable found for this staff member.
//                                 </td>
//                             </tr>
//                         ) : (
//                             // Display fetched timetable data
//                             timetableData.map((row, i) => (
//                                 <tr key={i} className="hover:bg-gray-50">
//                                     <td className="border border-blue-500 p-4 font-medium bg-blue-50">
//                                         {row.time || 'N/A'}
//                                     </td>
//                                     {weekdays.map(day => (
//                                         <td key={day} className="border border-blue-500 p-4 h-12">
//                                             {getDayClass(row, day)}
//                                         </td>
//                                     ))}
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../../config';

const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

// Days of the week displayed in the table headers
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function StaffTimetable({ staff }) {
    const staffName = `${staff?.firstname || ''} ${staff?.lastname || ''}`.trim() || 'Staff Member';
    const staffId = staff?.staffid;

    const [timetableData, setTimetableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch the staff's timetable from the API
    const fetchTimetable = useCallback(async () => {
        if (!staffId) {
            console.warn("DEBUG: StaffTimetable - Staff ID is missing, cannot fetch timetable.");
            setTimetableData([]);
            return;
        }

        setIsLoading(true);
        setError(null);
        setTimetableData([]);

        try {
            console.log(`DEBUG: StaffTimetable - Fetching timetable for staff ID: ${staffId}`);
            
            const response = await axios.get(`${API_BASE_URL}api/staff/${staffId}/timetable`, {
                headers: { 'auth': AUTH_HEADER }
            });

            const data = response.data || [];
            console.log("DEBUG: StaffTimetable - Fetched timetable data:", data);
            setTimetableData(data);

        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message;
            console.error("❌ ERROR: StaffTimetable - Failed to fetch timetable data:", errorMsg);
            setError(errorMsg);
            setTimetableData([]);
        } finally {
            setIsLoading(false);
        }
    }, [staffId]);
    
    useEffect(() => {
        fetchTimetable();
    }, [fetchTimetable]);

    // Helper to extract the day's class from the row data
    const getDayClass = (row, day) => {
        const propName = day.substring(0, 3); 
        const value = row[propName];
        // 🚀 CHANGE: Return "Free Lecture" if the slot is empty or contains "-"
        return (!value || value === '-') ? 'Free Lecture' : value;
    };

    return (
        <div>
            <h2 className="text-2xl text-center font-semibold text-gray-800 mb-8">
                Timetable for {staffName}
            </h2>
            
            <div className="overflow-x-auto">
                {/* 🚀 CHANGE: Added 'table-fixed' to ensure all columns have the exact same width */}
                <table className="w-full border-collapse border-2 border-blue-500 min-w-[800px] table-fixed">
                    <thead>
                        <tr className="bg-blue-100">
                            <th className="border-2 border-blue-500 p-4 text-center font-semibold">Timings</th>
                            {weekdays.map(day => (
                                <th key={day} className="border-2 border-blue-500 p-4 text-center font-semibold">
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="7" className="border border-blue-500 p-8 text-center text-blue-600">
                                    Loading timetable...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan="7" className="border border-blue-500 p-8 text-center text-red-600">
                                    Error loading timetable: {error}
                                </td>
                            </tr>
                        ) : timetableData.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="border border-blue-500 p-8 text-center text-gray-500">
                                    No timetable found for this staff member.
                                </td>
                            </tr>
                        ) : (
                            timetableData.map((row, i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                    <td className="border border-blue-500 p-4 font-medium bg-blue-50 text-center">
                                        {row.time || 'N/A'}
                                    </td>
                                    {weekdays.map(day => {
                                        const cellContent = getDayClass(row, day);
                                        return (
                                            <td key={day} className="border border-blue-500 p-2 h-16 text-center break-words">
                                                {/* 🚀 Styling "Free Lecture" to be subtle/italic */}
                                                <span className={cellContent === "Free Lecture" ? "text-red-400 italic text-sm" : "text-gray-800 font-semibold"}>
                                                    {cellContent}
                                                </span>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}