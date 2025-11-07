// import React, { useState, useEffect, useCallback } from "react";
// import { User } from "lucide-react";
// import axios from 'axios';

// const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
// const API_BASE_URL = "http://localhost:5000/api";

// // --- Helper Functions ---

// // Converts "Month YYYY" string to month name and year number
// const getMonthYearFromState = (monthYearStr) => {
//     const parts = monthYearStr.split(' ');
//     if (parts.length === 2) {
//         return { month: parts[0], year: parts[1] };
//     }
//     return { month: '', year: '' };
// };

// // Generates a list of month/year options in CHRONOLOGICAL ORDER (Oldest to Newest)
// const generateMonthOptions = (count = 6) => {
//     const options = [];
//     let currentDate = new Date();
    
//     // 1. Determine the starting month: current date minus (count - 1) months.
//     // This correctly sets the date object to the oldest month needed.
//     let startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - (count - 1), 1);

//     for (let i = 0; i < count; i++) {
//         const month = startDate.toLocaleString('default', { month: 'long' });
//         const year = startDate.getFullYear();
//         options.push(`${month} ${year}`);
        
//         // 2. Move forward by one month for the next iteration
//         startDate.setMonth(startDate.getMonth() + 1);
//     }
    
//     // The list is now guaranteed to be chronological: [Oldest, ..., Newest]
//     return options;
// };

// // --- Component ---

// export default function StaffAttendance({ staff }) {
//     const staffName = `${staff?.firstname || ''} ${staff?.lastname || ''}`.trim() || 'Staff Member';
//     const staffId = staff?.staffid;
    
//     // Generate options and set default month
//     const monthOptions = generateMonthOptions(6);
//     // Set the default to the MOST RECENT month, which is the LAST element in the chronological array
//     const initialMonthYear = monthOptions[monthOptions.length - 1] || new Date().toLocaleString('default', { month: 'long', year: 'numeric' }); 

//     const [selectedMonthYear, setSelectedMonthYear] = useState(initialMonthYear);
//     const [attendanceRecords, setAttendanceRecords] = useState({}); 
//     const [isLoading, setIsLoading] = useState(false);

//     // Legend updated to your requested simplified statuses
//     const attendanceLegend = [
//         { status: 'Present', color: "bg-blue-600" },
//         { status: 'Absent/Leave', color: "bg-red-600" }, 
//         { status: 'Holiday', color: "bg-yellow-400" },
//     ];

//     // Helper to map status to Tailwind classes
//     const getDayClass = (dateNum, status) => {
//         if (dateNum === '' || dateNum === null) return 'bg-gray-100/50';

//         switch (status) {
//             case 'Present':
//                 return 'bg-blue-600 text-white shadow'; 
//             case 'Absent':
//             case 'Leave': // Maps 'Leave' (if present in DB) to the 'Absent/Leave' style
//                 return 'bg-red-600 text-white shadow'; 
//             case 'Holiday':
//             case 'H':
//                 return 'bg-yellow-400 text-gray-800 shadow'; 
//             default:
//                 // Default style for unrecorded days
//                 return 'bg-white rounded font-bold text-gray-800 shadow'; 
//         }
//     };

//     // Function to fetch data from the backend
//     const fetchAttendance = useCallback(async () => {
//         if (!staffId) {
//             console.warn("DEBUG: Attendance - Staff ID is missing, cannot fetch attendance.");
//             setAttendanceRecords({});
//             return;
//         }

//         setIsLoading(true);
//         setAttendanceRecords({}); 
        
//         const { month, year } = getMonthYearFromState(selectedMonthYear);

//         try {
//             console.log(`DEBUG: Attendance - Fetching records for staff ${staffId}, Month: ${month}, Year: ${year}`);
            
//             // Uses the route /api/staff/:staffid/attendance
//             const response = await axios.get(`${API_BASE_URL}/staff/${staffId}/attendance`, {
//                 params: { month: month, year: year },
//                 headers: { 'auth': AUTH_HEADER }
//             });

//             // Process the fetched list of records into a map {dayOfMonth: status}
//             const attendanceMap = response.data.reduce((acc, record) => {
//                 const date = new Date(record.date);
//                 const dayOfMonth = date.getDate(); 
//                 acc[dayOfMonth] = record.status;
//                 return acc;
//             }, {});

//             console.log("DEBUG: Attendance - Processed attendance records:", attendanceMap);
//             setAttendanceRecords(attendanceMap);

//         } catch (error) {
//             console.error("❌ ERROR: Attendance - Failed to fetch attendance data.", error);
//             setAttendanceRecords({});
//         } finally {
//             setIsLoading(false);
//         }
//     }, [staffId, selectedMonthYear]);

//     useEffect(() => {
//         fetchAttendance(); 
//     }, [fetchAttendance]);


//     // --- Calendar Generation Logic (UNCHANGED) ---
//     const renderCalendar = () => {
//         const { month: monthStr, year: yearStr } = getMonthYearFromState(selectedMonthYear);
//         const yearInt = parseInt(yearStr);
        
//         if (isNaN(yearInt)) return <div className="text-center text-gray-500 col-span-full">Select a valid month and year.</div>;

//         // Date object for the 1st of the month
//         const date = new Date(yearInt, new Date(`${monthStr} 1, 2000`).getMonth(), 1);
//         const monthIndex = date.getMonth();

//         const firstDayOfMonth = date.getDay(); // 0 (Sun) - 6 (Sat)
//         const daysInMonth = new Date(yearInt, monthIndex + 1, 0).getDate();
        
//         const calendarCells = [];
        
//         // 1. Fill initial padding days (empty cells before the 1st)
//         let startDayIndex = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1; 

//         for (let i = 0; i < startDayIndex; i++) {
//             calendarCells.push('');
//         }
        
//         // 2. Fill days of the month
//         for (let i = 1; i <= daysInMonth; i++) {
//             calendarCells.push(i);
//         }
        
//         const calendarGrid = [];
//         let week = [];
//         let cw = 0; 
        
//         const weekHeaders = ['CW', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
        
//         // Add headers to the grid
//         calendarGrid.push(
//             <React.Fragment key="header">
//                 {weekHeaders.map(day => (
//                     <div key={day} className="font-bold text-gray-600 p-2 bg-blue-200 rounded">
//                         {day}
//                     </div>
//                 ))}
//             </React.Fragment>
//         );

//         // Process cells into rows (weeks)
//         for (let i = 0; i < calendarCells.length; i++) {
//             if (week.length === 0) { 
//                 cw = Math.floor(i / 7) + 1;
//                 week.push(
//                     <div key={`cw-${cw}`} className="p-3 font-bold text-gray-600 bg-blue-200 rounded">
//                         {cw}
//                     </div>
//                 );
//             }
            
//             const cell = calendarCells[i];
//             const dateNum = (typeof cell === 'number') ? cell : null;
//             const status = dateNum ? attendanceRecords[dateNum] : null;

//             week.push(
//                 <div
//                     key={`day-${i}`}
//                     className={`p-3 rounded font-bold transition-colors ${getDayClass(dateNum, status)}`}
//                 >
//                     {dateNum}
//                 </div>
//             );

//             if (week.length === 8 || i === calendarCells.length - 1) { 
//                 while (week.length < 8) {
//                     week.push(<div key={`pad-${week.length}`} className="p-3 bg-gray-100/50"></div>);
//                 }
//                 calendarGrid.push(week);
//                 week = [];
//             }
//         }

//         return calendarGrid.flat();
//     };

//     return (
//         <div>
//             {/* <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                 Attendance for {staffName}
//             </h2> */}
            
//             {/* Month Selector */}
//             <div className="mb-6">
//                 <select
//                     value={selectedMonthYear}
//                     onChange={(e) => setSelectedMonthYear(e.target.value)}
//                     className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 >
//                     {monthOptions.map(option => (
//                         <option key={option} value={option}>{option}</option>
//                     ))}
//                 </select>
//             </div>

//             {/* Legend */}
//             <div className="flex flex-wrap space-x-6 mb-6">
//                 {attendanceLegend.map(item => (
//                     <div key={item.status} className="flex items-center space-x-2 my-1">
//                         <div className={`w-4 h-4 ${item.color} rounded`}></div>
//                         <span className="text-sm text-gray-700">{item.status}</span>
//                     </div>
//                 ))}
//             </div>

//             {/* Calendar */}
//             <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-300">
//                 <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//                     {selectedMonthYear}
//                 </h3>

//                 {isLoading ? (
//                     <div className="text-center p-8 text-blue-600 col-span-full">Loading attendance data...</div>
//                 ) : (
//                     <div className="grid grid-cols-8 gap-2 text-center text-sm md:text-base">
//                         {Object.keys(attendanceRecords).length === 0 && !isLoading ? (
//                             <div className="text-center p-8 text-gray-500 col-span-full">No attendance records found for this month.</div>
//                         ) : (
//                             renderCalendar()
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

import React, { useState, useEffect, useCallback } from "react";
import { User } from "lucide-react";
import axios from 'axios';
// --- CRITICAL FIX: Corrected import path and removed .js extension ---
import { API_BASE_URL } from "../../config"; 

const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
// -----------------------------------------------------

// --- Helper Functions ---

// Converts "Month YYYY" string to month name and year number
const getMonthYearFromState = (monthYearStr) => {
    const parts = monthYearStr.split(' ');
    if (parts.length === 2) {
        return { month: parts[0], year: parts[1] };
    }
    return { month: '', year: '' };
};

// Generates a list of month/year options in CHRONOLOGICAL ORDER (Oldest to Newest)
const generateMonthOptions = (count = 6) => {
    const options = [];
    let currentDate = new Date();
    
    // 1. Determine the starting month: current date minus (count - 1) months.
    let startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - (count - 1), 1);

    for (let i = 0; i < count; i++) {
        const month = startDate.toLocaleString('default', { month: 'long' });
        const year = startDate.getFullYear();
        options.push(`${month} ${year}`);
        
        // 2. Move forward by one month for the next iteration
        startDate.setMonth(startDate.getMonth() + 1);
    }
    
    // The list is now guaranteed to be chronological: [Oldest, ..., Newest]
    return options;
};

// --- Component ---

export default function StaffAttendance({ staff }) {
    const staffName = `${staff?.firstname || ''} ${staff?.lastname || ''}`.trim() || 'Staff Member';
    const staffId = staff?.staffid;
    
    // Generate options and set default month
    const monthOptions = generateMonthOptions(6);
    // Set the default to the MOST RECENT month, which is the LAST element in the chronological array
    const initialMonthYear = monthOptions[monthOptions.length - 1] || new Date().toLocaleString('default', { month: 'long', year: 'numeric' }); 

    const [selectedMonthYear, setSelectedMonthYear] = useState(initialMonthYear);
    const [attendanceRecords, setAttendanceRecords] = useState({}); 
    const [isLoading, setIsLoading] = useState(false);

    // Legend updated to your requested simplified statuses
    const attendanceLegend = [
        { status: 'Present', color: "bg-blue-600" },
        { status: 'Absent/Leave', color: "bg-red-600" }, 
        { status: 'Holiday', color: "bg-yellow-400" },
    ];

    // Helper to map status to Tailwind classes
    const getDayClass = (dateNum, status) => {
        if (dateNum === '' || dateNum === null) return 'bg-gray-100/50';

        switch (status) {
            case 'Present':
                return 'bg-blue-600 text-white shadow'; 
            case 'Absent':
            case 'Leave': // Maps 'Leave' (if present in DB) to the 'Absent/Leave' style
                return 'bg-red-600 text-white shadow'; 
            case 'Holiday':
            case 'H':
                return 'bg-yellow-400 text-gray-800 shadow'; 
            default:
                // Default style for unrecorded days
                return 'bg-white rounded font-bold text-gray-800 shadow'; 
        }
    };

    // Function to fetch data from the backend
    const fetchAttendance = useCallback(async () => {
        if (!staffId) {
            console.warn("DEBUG: Attendance - Staff ID is missing, cannot fetch attendance.");
            setAttendanceRecords({});
            return;
        }

        setIsLoading(true);
        setAttendanceRecords({}); 
        
        const { month, year } = getMonthYearFromState(selectedMonthYear);

        try {
            console.log(`DEBUG: Attendance - Fetching records for staff ${staffId}, Month: ${month}, Year: ${year}`);
            
            // Using the imported API_BASE_URL
            const response = await axios.get(`${API_BASE_URL}api/staff/${staffId}/attendance`, {
                params: { month: month, year: year },
                headers: { 'auth': AUTH_HEADER }
            });

            // Process the fetched list of records into a map {dayOfMonth: status}
            const attendanceMap = response.data.reduce((acc, record) => {
                const date = new Date(record.date);
                const dayOfMonth = date.getDate(); 
                acc[dayOfMonth] = record.status;
                return acc;
            }, {});

            console.log("DEBUG: Attendance - Processed attendance records:", attendanceMap);
            setAttendanceRecords(attendanceMap);

        } catch (error) {
            console.error("❌ ERROR: Attendance - Failed to fetch attendance data.", error);
            setAttendanceRecords({});
        } finally {
            setIsLoading(false);
        }
    }, [staffId, selectedMonthYear]);

    useEffect(() => {
        fetchAttendance(); 
    }, [fetchAttendance]);


    // --- Calendar Generation Logic (UNCHANGED) ---
    const renderCalendar = () => {
        const { month: monthStr, year: yearStr } = getMonthYearFromState(selectedMonthYear);
        const yearInt = parseInt(yearStr);
        
        if (isNaN(yearInt)) return <div className="text-center text-gray-500 col-span-full">Select a valid month and year.</div>;

        // Date object for the 1st of the month
        const date = new Date(yearInt, new Date(`${monthStr} 1, 2000`).getMonth(), 1);
        const monthIndex = date.getMonth();

        const firstDayOfMonth = date.getDay(); // 0 (Sun) - 6 (Sat)
        const daysInMonth = new Date(yearInt, monthIndex + 1, 0).getDate();
        
        const calendarCells = [];
        
        // 1. Fill initial padding days (empty cells before the 1st)
        let startDayIndex = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1; 

        for (let i = 0; i < startDayIndex; i++) {
            calendarCells.push('');
        }
        
        // 2. Fill days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            calendarCells.push(i);
        }
        
        const calendarGrid = [];
        let week = [];
        let cw = 0; 
        
        const weekHeaders = ['CW', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
        
        // Add headers to the grid
        calendarGrid.push(
            <React.Fragment key="header">
                {weekHeaders.map(day => (
                    <div key={day} className="font-bold text-gray-600 p-2 bg-blue-200 rounded">
                        {day}
                    </div>
                ))}
            </React.Fragment>
        );

        // Process cells into rows (weeks)
        for (let i = 0; i < calendarCells.length; i++) {
            if (week.length === 0) { 
                cw = Math.floor(i / 7) + 1;
                week.push(
                    <div key={`cw-${cw}`} className="p-3 font-bold text-gray-600 bg-blue-200 rounded">
                        {cw}
                    </div>
                );
            }
            
            const cell = calendarCells[i];
            const dateNum = (typeof cell === 'number') ? cell : null;
            const status = dateNum ? attendanceRecords[dateNum] : null;

            week.push(
                <div
                    key={`day-${i}`}
                    className={`p-3 rounded font-bold transition-colors ${getDayClass(dateNum, status)}`}
                >
                    {dateNum}
                </div>
            );

            if (week.length === 8 || i === calendarCells.length - 1) { 
                // Pad the last week if it's incomplete
                while (week.length < 8) {
                    week.push(<div key={`pad-${week.length}`} className="p-3 bg-gray-100/50"></div>);
                }
                calendarGrid.push(week);
                week = [];
            }
        }

        return calendarGrid.flat();
    };

    return (
        <div>
            {/* Month Selector */}
            <div className="mb-6">
                <select
                    value={selectedMonthYear}
                    onChange={(e) => setSelectedMonthYear(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                    {monthOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap space-x-6 mb-6">
                {attendanceLegend.map(item => (
                    <div key={item.status} className="flex items-center space-x-2 my-1">
                        <div className={`w-4 h-4 ${item.color} rounded`}></div>
                        <span className="text-sm text-gray-700">{item.status}</span>
                    </div>
                ))}
            </div>

            {/* Calendar */}
            <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-300">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    {selectedMonthYear}
                </h3>

                {isLoading ? (
                    <div className="text-center p-8 text-blue-600 col-span-full">Loading attendance data...</div>
                ) : (
                    <div className="grid grid-cols-8 gap-2 text-center text-sm md:text-base">
                        {Object.keys(attendanceRecords).length === 0 && !Object.keys(attendanceRecords).length && !isLoading ? (
                            <div className="text-center p-8 text-gray-500 col-span-full">No attendance records found for this month.</div>
                        ) : (
                            renderCalendar()
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}