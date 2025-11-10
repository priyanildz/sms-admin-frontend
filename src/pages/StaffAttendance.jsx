import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import MainLayout from "../layout/MainLayout";
// Assuming SelectField is available, although we replace it with a standard <select> 
// to ensure function consistency without knowing its internal implementation.
import SelectField from "../components/SelectField"; 
// Assuming API_BASE_URL is imported from "../config"
import { API_BASE_URL } from "../config"; 

// --- Configuration Assumptions (Ensure these match your actual config/Vercel settings) ---
const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
// --- End Configuration Assumptions ---

export default function StaffAttendancePage() {
    const currentYear = new Date().getFullYear();
    const currentMonthName = new Date().toLocaleString("default", { month: "long" });
    const currentDay = new Date().getDate();

    const [view, setView] = useState("monthly");
    const [selectedMonth, setSelectedMonth] = useState(currentMonthName);
    const [selectedYear, setSelectedYear] = useState(currentYear); 
    const [searchQuery, setSearchQuery] = useState("");
    const [daysInMonth, setDaysInMonth] = useState([]);

    // --- REAL DATA STATES ---
    const [staffList, setStaffList] = useState([]); 
    const [isLoadingStaff, setIsLoadingStaff] = useState(false);
    const [error, setError] = useState(null); 
    
    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August",
        "September", "October", "November", "December",
    ];
    
    // Helper function to normalize a Date object to YYYY-MM-DD string
    const normalizeDate = (date) => {
        const d = new Date(date);
        d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    };

    // --- FETCH ALL STAFF LIST ---
    const fetchStaffList = useCallback(async () => {
        setIsLoadingStaff(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}api/staff`, { 
                headers: { 'auth': AUTH_HEADER }
            });
            const staffData = response.data.map(staff => ({
                id: staff._id, 
                staffid: staff.staffid, 
                name: `${staff.firstname || ''} ${staff.lastname || ''}`.trim(),
                role: staff.role?.position || 'N/A'
            }));
            setStaffList(staffData);
        } catch (error) {
            console.error("Error fetching staff list:", error);
            const status = error.response?.status || 'N/A';
            setError(`Failed to load staff list. Server returned status ${status}.`);
            setStaffList([]); 
        } finally {
            setIsLoadingStaff(false);
        }
    }, []);
    
    // --- Initial Load ---
    useEffect(() => {
        fetchStaffList();
    }, [fetchStaffList]);

    const handleSearchChange = (e) => setSearchQuery(e.target.value);
    const handleViewChange = (newView) => setView(newView);

    // Recalculate the days in the month whenever the selected month changes
    useEffect(() => {
        const monthIndex = months.indexOf(selectedMonth);
        const year = new Date().getFullYear();
        
        // Safety check: only proceed if a valid month is selected
        if (monthIndex === -1) {
            setDaysInMonth([]);
            return;
        }

        const daysInCurrentMonth = new Date(year, monthIndex + 1, 0).getDate();
        const currentMonthIndex = new Date().getMonth();

        const days = Array.from({ length: daysInCurrentMonth }, (_, i) => {
            const dateObj = new Date(selectedYear, monthIndex, i + 1);
            return {
                date: i + 1,
                day: dateObj.toLocaleDateString("en-US", { weekday: "short" }),
                isToday: i + 1 === currentDay && monthIndex === currentMonthIndex,
                isoDate: normalizeDate(dateObj) 
            };
        });

        setDaysInMonth(days);
    }, [selectedMonth, selectedYear, currentDay, months]); // Added dependencies

    const renderMonthlyView = () => {
        const filteredStaff = staffList.filter((staff) =>
            staff.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (isLoadingStaff) {
            return <div className="text-center py-10 text-blue-600">Loading staff list...</div>;
        }
        if (error) {
            return <div className="text-center py-10 text-red-600 font-bold">{error}</div>;
        }

        return (
            <div className="overflow-auto">
                <table className="table-auto border-collapse w-full min-w-max border border-gray-300 text-sm">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2 bg-blue-500 text-white text-center min-w-[150px] sticky left-0 z-20">
                                Day
                            </th>
                            {daysInMonth.map((d, i) => (
                                <th
                                    key={i}
                                    className={`border px-2 py-1 text-center ${
                                        d.isToday
                                            ? "bg-yellow-300"
                                            : "bg-blue-100 text-gray-700"
                                    }`}
                                >
                                    {d.day}
                                </th>
                            ))}
                        </tr>
                        <tr>
                            <th className="border px-4 py-2 bg-blue-500 text-white text-center sticky left-0 z-20">
                                Date
                            </th>
                            {daysInMonth.map((d, i) => (
                                <th key={i} className="border px-2 py-1 text-center">
                                    {d.date}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStaff.length === 0 && !isLoadingStaff ? (
                            <tr>
                                <td colSpan={daysInMonth.length + 1} className="text-center py-10 text-gray-500">
                                    No staff members found.
                                </td>
                            </tr>
                        ) : (
                            filteredStaff.map((staff) => (
                                <tr key={staff.id}>
                                    <td className="border px-4 py-2 font-medium text-center bg-gray-50 sticky left-0 z-10">
                                        {staff.name}
                                        <div className="text-xs font-semibold mt-1 text-gray-500">
                                            Total: 0
                                        </div>
                                    </td>
                                    {/* Attendance cells left empty for now */}
                                    {daysInMonth.map((_, i) => (
                                        <td key={i} className="border px-2 py-2 text-center h-10">
                                            {/* Attendance status will go here */}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderYearlyView = () => {
        // Reuse the staff list, but display placeholders for monthly counts
        const filteredStaff = staffList.filter((staff) =>
            staff.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <div className="overflow-auto">
                {isLoadingStaff ? (
                    <div className="text-center py-10 text-blue-600">Loading staff list...</div>
                ) : (
                    <table className="table-auto border-collapse w-full min-w-max border border-gray-300 text-sm">
                        <thead className="bg-blue-100 text-black">
                            <tr className="border">
                                <th className="px-4 py-2 text-center border font-bold sticky left-0 z-10">
                                    Staff Name
                                </th>
                                <th className="px-4 py-2 text-center boorder font-bold">Total</th>
                                {months.map((month, index) => (
                                    <th
                                        key={index}
                                        className="px-4 py-2 text-center border font-bold"
                                    >
                                        {month}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {filteredStaff.map((staff) => (
                                <tr
                                    key={staff.id}
                                    className="border-b border-gray-200 hover:bg-gray-50"
                                >
                                    <td className="px-4 py-2 text-center text-gray-700 border sticky left-0 z-10">
                                        {staff.name}
                                    </td>
                                    <td className="px-4 py-2 text-center text-gray-700 border font-bold">
                                        0
                                    </td>
                                    {months.map((_, index) => (
                                        <td key={index} className="px-2 py-2 text-center border">
                                            -
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    };

    return (
        <MainLayout>
            <div className="bg-white rounded-2xl shadow p-6">
                <div className="flex flex-1 flex-col p-4 sm:p-6 overflow-y-auto">
                    {/* Search */}
                    <div className="mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search staff..."
                            className="w-full sm:w-72 px-3 py-2 rounded-md border border-gray-300 text-sm"
                        />
                    </div>

                    {/* Title */}
                    <div className="my-4 text-center">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Attendance Tracker
                        </h2>
                    </div>

                    {/* View Tabs */}
                    <div className="mb-4 flex gap-0 border rounded-lg overflow-hidden">
                        <button
                            className={`flex-1 px-4 py-2 font-bold ${
                                view === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                            onClick={() => handleViewChange("monthly")}
                        >
                            Monthly
                        </button>
                        <button
                            className={`flex-1 px-4 py-2 font-bold ${
                                view === "yearly" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                            }`}
                            onClick={() => handleViewChange("yearly")}
                        >
                            Yearly
                        </button>
                    </div>
                    
                    {/* NEW: Month Select field for Monthly View (Matching Image) */}
                    {view === "monthly" && (
                        <div className="mb-4">
                            <label htmlFor="month-select" className="block text-xs font-medium text-gray-500 mb-1">
                                Select Month
                            </label>
                            {/* Using standard <select> element for proper functionality */}
                            <select
                                id="month-select"
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                {months.map((month) => (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    
                    {/* Render Table */}
                    {view === "monthly" ? renderMonthlyView() : renderYearlyView()}
                </div>
            </div>
        </MainLayout>
    );
}


// import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import MainLayout from "../layout/MainLayout";
// // SelectField is assumed to be imported but not strictly used here
// import SelectField from "../components/SelectField"; 
// import { API_BASE_URL } from "../config"; 

// // --- Configuration Assumptions ---
// const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
// // --- End Configuration Assumptions ---

// export default function StaffAttendancePage() {
//     const currentYear = new Date().getFullYear();
//     const currentMonthName = new Date().toLocaleString("default", { month: "long" });
//     const currentDay = new Date().getDate();

//     const [view, setView] = useState("monthly");
//     const [selectedMonth, setSelectedMonth] = useState(currentMonthName);
//     const [selectedYear, setSelectedYear] = useState(currentYear); 
//     const [searchQuery, setSearchQuery] = useState("");
//     const [daysInMonth, setDaysInMonth] = useState([]);

//     // --- REAL DATA STATES ---
//     const [staffList, setStaffList] = useState([]); 
//     const [isLoadingStaff, setIsLoadingStaff] = useState(false);
    
//     // NEW STATE: Stores attendance keyed by staff ID.
//     // { "STAFFID-001": { "ISO_DATE": {status: 'P', ...}, ... }, ... }
//     const [attendanceData, setAttendanceData] = useState({}); 
//     const [isLoadingAttendance, setIsLoadingAttendance] = useState(false);

//     const [error, setError] = useState(null); 
    
//     const months = [
//         "January", "February", "March", "April", "May", "June", "July", "August",
//         "September", "October", "November", "December",
//     ];
    
//     // Helper function to normalize a Date object to YYYY-MM-DD string
//     const normalizeDate = (date) => {
//         const d = new Date(date);
//         d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
//         // Return a key like '2025-03-01' which can be used to index attendanceData
//         return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
//     };

//     // --- 1. FETCH ALL STAFF LIST ---
//     const fetchStaffList = useCallback(async () => {
//         setIsLoadingStaff(true);
//         setError(null);
//         try {
//             const response = await axios.get(`${API_BASE_URL}api/staff`, { 
//                 headers: { 'auth': AUTH_HEADER }
//             });
//             const staffData = response.data.map(staff => ({
//                 id: staff._id, 
//                 staffid: staff.staffid, // CRITICAL: This is used for attendance fetch
//                 name: `${staff.firstname || ''} ${staff.lastname || ''}`.trim(),
//                 role: staff.role?.position || 'N/A'
//             }));
//             setStaffList(staffData);
//         } catch (error) {
//             console.error("Error fetching staff list:", error);
//             const status = error.response?.status || 'N/A';
//             setError(`Failed to load staff list. Server returned status ${status}.`);
//             setStaffList([]); 
//         } finally {
//             setIsLoadingStaff(false);
//         }
//     }, []);

//     // --- 2. FETCH ATTENDANCE FOR THE SELECTED MONTH (The multi-call logic) ---
//     const fetchAttendanceForSelectedMonth = useCallback(async () => {
//         if (staffList.length === 0 || view !== 'monthly') return;

//         setIsLoadingAttendance(true);
//         setError(null);

//         // Map to store combined attendance data: { staffId: { dateKey: {status, ...} } }
//         const newAttendanceData = {};
        
//         const fetchPromises = staffList.map(async (staff) => {
//             try {
//                 // CALL 1: Fetch attendance for individual staff member
//                 const response = await axios.get(
//                     `${API_BASE_URL}api/staff/${staff.staffid}/attendance`, 
//                     {
//                         params: { month: selectedMonth, year: selectedYear },
//                         headers: { 'auth': AUTH_HEADER }
//                     }
//                 );
                
//                 // Aggregate the results for this staff member
//                 newAttendanceData[staff.staffid] = response.data.reduce((acc, record) => {
//                     // Normalize date object from MongoDB to string key (e.g., "2025-03-10")
//                     const dateKey = normalizeDate(record.date);
//                     acc[dateKey] = { status: record.status, checkInTime: record.checkInTime };
//                     return acc;
//                 }, {});

//             } catch (err) {
//                 console.warn(`Could not fetch attendance for staff ${staff.staffid}:`, err.message);
//                 // On individual failure, we just skip that staff's data, but let others load.
//                 newAttendanceData[staff.staffid] = {};
//             }
//         });

//         await Promise.all(fetchPromises);
        
//         setAttendanceData(newAttendanceData);
//         setIsLoadingAttendance(false);
//     }, [staffList, selectedMonth, selectedYear, view]);


//     // --- Effect 1: Initial Load Staff List ---
//     useEffect(() => {
//         fetchStaffList();
//     }, [fetchStaffList]);

//     // --- Effect 2: Recalculate Days & Fetch Attendance whenever month/year/staffList changes ---
//     useEffect(() => {
//         const monthIndex = months.indexOf(selectedMonth);
//         const year = new Date().getFullYear();
        
//         if (monthIndex === -1) {
//             setDaysInMonth([]);
//             return;
//         }

//         const daysInCurrentMonth = new Date(year, monthIndex + 1, 0).getDate();
//         const currentMonthIndex = new Date().getMonth();

//         const days = Array.from({ length: daysInCurrentMonth }, (_, i) => {
//             const dateObj = new Date(selectedYear, monthIndex, i + 1);
//             return {
//                 date: i + 1,
//                 day: dateObj.toLocaleDateString("en-US", { weekday: "short" }),
//                 isToday: i + 1 === currentDay && monthIndex === currentMonthIndex,
//                 // The isoDate here must match the key used in attendanceData (normalizeDate)
//                 isoDate: normalizeDate(dateObj) 
//             };
//         });

//         setDaysInMonth(days);
        
//         // Trigger the attendance fetch
//         fetchAttendanceForSelectedMonth(); 
        
//     }, [selectedMonth, selectedYear, currentDay, months, fetchAttendanceForSelectedMonth]);
    
//     // Helper function to get the status for a given staff and date
//     const getAttendanceStatus = (staffId, isoDate) => {
//         const staffAttendance = attendanceData[staffId];
//         if (staffAttendance && staffAttendance[isoDate]) {
//             // Return 'P' for Present, 'A' for Absent, or whatever markers you use
//             return staffAttendance[isoDate].status[0] || '—'; 
//         }
//         return '—'; // Default marker for not recorded/not found
//     };


//     const renderMonthlyView = () => {
//         const filteredStaff = staffList.filter((staff) =>
//             staff.name.toLowerCase().includes(searchQuery.toLowerCase())
//         );
        
//         const loading = isLoadingStaff || isLoadingAttendance;
        
//         if (loading) {
//             return <div className="text-center py-10 text-blue-600">Loading {isLoadingStaff ? 'staff list' : 'attendance data'}...</div>;
//         }
//         if (error) {
//             return <div className="text-center py-10 text-red-600 font-bold">{error}</div>;
//         }

//         return (
//             <div className="overflow-auto">
//                 <table className="table-auto border-collapse w-full min-w-max border border-gray-300 text-sm">
//                     <thead>
//                         {/* Day Row */}
//                         <tr>
//                             <th className="border px-4 py-2 bg-blue-500 text-white text-center min-w-[150px] sticky left-0 z-20">Day</th>
//                             {daysInMonth.map((d, i) => (
//                                 <th
//                                     key={i}
//                                     className={`border px-2 py-1 text-center ${
//                                         d.isToday ? "bg-yellow-300" : "bg-blue-100 text-gray-700"
//                                     }`}
//                                 >
//                                     {d.day}
//                                 </th>
//                             ))}
//                         </tr>
//                         {/* Date Row */}
//                         <tr>
//                             <th className="border px-4 py-2 bg-blue-500 text-white text-center sticky left-0 z-20">Date</th>
//                             {daysInMonth.map((d, i) => (
//                                 <th key={i} className="border px-2 py-1 text-center">
//                                     {d.date}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredStaff.length === 0 ? (
//                             <tr>
//                                 <td colSpan={daysInMonth.length + 1} className="text-center py-10 text-gray-500">
//                                     No staff members found.
//                                 </td>
//                             </tr>
//                         ) : (
//                             filteredStaff.map((staff) => (
//                                 <tr key={staff.id}>
//                                     <td className="border px-4 py-2 font-medium text-center bg-gray-50 sticky left-0 z-10">
//                                         {staff.name}
//                                         <div className="text-xs font-semibold mt-1 text-gray-500">
//                                             Total: 0 {/* This logic needs complex calculation, kept as '0' for now */}
//                                         </div>
//                                     </td>
                                    
//                                     {/* Attendance cells */}
//                                     {daysInMonth.map((d, i) => (
//                                         <td key={i} className="border px-2 py-2 text-center h-10">
//                                             <span className="font-bold">
//                                                 {getAttendanceStatus(staff.staffid, d.isoDate)}
//                                             </span>
//                                         </td>
//                                     ))}
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         );
//     };

//     const renderYearlyView = () => {
//         // ... (existing renderYearlyView logic remains the same)
//         const filteredStaff = staffList.filter((staff) =>
//             staff.name.toLowerCase().includes(searchQuery.toLowerCase())
//         );

//         return (
//             <div className="overflow-auto">
//                 {isLoadingStaff ? (
//                     <div className="text-center py-10 text-blue-600">Loading staff list...</div>
//                 ) : (
//                     <table className="table-auto border-collapse w-full min-w-max border border-gray-300 text-sm">
//                         <thead className="bg-blue-100 text-black">
//                             <tr className="border">
//                                 <th className="px-4 py-2 text-center border font-bold sticky left-0 z-10">
//                                     Staff Name
//                                 </th>
//                                 <th className="px-4 py-2 text-center boorder font-bold">Total</th>
//                                 {months.map((month, index) => (
//                                     <th
//                                         key={index}
//                                         className="px-4 py-2 text-center border font-bold"
//                                     >
//                                         {month}
//                                     </th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white">
//                             {filteredStaff.map((staff) => (
//                                 <tr
//                                     key={staff.id}
//                                     className="border-b border-gray-200 hover:bg-gray-50"
//                                 >
//                                     <td className="px-4 py-2 text-center text-gray-700 border sticky left-0 z-10">
//                                         {staff.name}
//                                     </td>
//                                     <td className="px-4 py-2 text-center text-gray-700 border font-bold">
//                                         0
//                                     </td>
//                                     {months.map((_, index) => (
//                                         <td key={index} className="px-2 py-2 text-center border">
//                                             -
//                                         </td>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         );
//     };

//     return (
//         <MainLayout>
//             <div className="bg-white rounded-2xl shadow p-6">
//                 <div className="flex flex-1 flex-col p-4 sm:p-6 overflow-y-auto">
//                     {/* Search (kept outside for full component view) */}
//                     <div className="mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
//                         <input
//                             type="text"
//                             value={searchQuery}
//                             onChange={handleSearchChange}
//                             placeholder="Search staff..."
//                             className="w-full sm:w-72 px-3 py-2 rounded-md border border-gray-300 text-sm"
//                         />
//                     </div>

//                     {/* Title */}
//                     <div className="my-4 text-center">
//                         <h2 className="text-xl font-semibold text-gray-800">
//                             Attendance Tracker
//                         </h2>
//                     </div>

//                     {/* View Tabs */}
//                     <div className="mb-4 flex gap-0 border rounded-lg overflow-hidden">
//                         <button
//                             className={`flex-1 px-4 py-2 font-bold ${
//                                 view === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
//                             }`}
//                             onClick={() => handleViewChange("monthly")}
//                         >
//                             Monthly
//                         </button>
//                         <button
//                             className={`flex-1 px-4 py-2 font-bold ${
//                                 view === "yearly" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
//                             }`}
//                             onClick={() => handleViewChange("yearly")}
//                         >
//                             Yearly
//                         </button>
//                     </div>
                    
//                     {/* Month Select field for Monthly View */}
//                     {view === "monthly" && (
//                         <div className="mb-4">
//                             <label htmlFor="month-select" className="block text-xs font-medium text-gray-500 mb-1">
//                                 Select Month
//                             </label>
//                             <select
//                                 id="month-select"
//                                 value={selectedMonth}
//                                 onChange={(e) => setSelectedMonth(e.target.value)}
//                                 className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                 disabled={isLoadingAttendance} // Disable selection while fetching
//                             >
//                                 {months.map((month) => (
//                                     <option key={month} value={month}>
//                                         {month}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                     )}
                    
//                     {/* Render Table */}
//                     {view === "monthly" ? renderMonthlyView() : renderYearlyView()}
//                 </div>
//             </div>
//         </MainLayout>
//     );
// }

// // NOTE: You must ensure your API at /api/staff/:staffid/attendance 
// // correctly accepts month and year as query parameters for this to work.