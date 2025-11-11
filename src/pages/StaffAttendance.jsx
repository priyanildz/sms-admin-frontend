import React, { useState, useEffect, useCallback } from "react"; 
import axios from "axios";
import MainLayout from "../layout/MainLayout";
// Assuming API_BASE_URL is imported from "../config"
import { API_BASE_URL } from "../config"; 

// Externalize the months array to ensure it's a stable constant reference
const months = [
    "January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December",
];

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
    
    const [attendanceData, setAttendanceData] = useState({});
    const [isLoadingAttendance, setIsLoadingAttendance] = useState(false);
    
    // Yearly Summary Data structure: { staffid: { January: 20, Total: 200 } }
    const [yearlyAttendanceSummary, setYearlyAttendanceSummary] = useState({});
    
    // Helper function to consistently generate the YYYY-MM-DD date key
    const normalizeDate = (date) => {
        const d = new Date(date);
        
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
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

    // --- FETCH ATTENDANCE DATA (Monthly View) ---
    const fetchAttendance = useCallback(async (staffIds, monthName, year) => {
        if (staffIds.length === 0 || view !== 'monthly') return;
        
        setIsLoadingAttendance(true);
        const fetchedData = {}; 

        await Promise.all(
            staffIds.map(async (staff) => {
                try {
                    const response = await axios.get(
                        `${API_BASE_URL}api/staff/${staff.staffid}/attendance?month=${monthName}&year=${year}`,
                        { headers: { 'auth': AUTH_HEADER } }
                    );

                    const recordsByDate = response.data.reduce((acc, record) => {
                        const dateKey = normalizeDate(record.date); 
                        acc[dateKey] = record;
                        return acc;
                    }, {});
                    
                    fetchedData[staff.staffid] = recordsByDate;

                } catch (err) {
                    console.error(`Error fetching attendance for staff ${staff.staffid} in ${monthName}:`, err);
                    fetchedData[staff.staffid] = {}; 
                }
            })
        );
        
        setAttendanceData(prevData => ({
            ...prevData,
            ...fetchedData,
        }));
        
        setIsLoadingAttendance(false);
    }, [view]);

    // --- FETCH YEARLY SUMMARY DATA (FRONTEND CALCULATION) ---
    const fetchYearlySummary = useCallback(async (staffIds, year) => {
        if (staffIds.length === 0 || view !== 'yearly') return;

        setIsLoadingAttendance(true);
        const yearlySummary = {};

        await Promise.all(
            staffIds.map(async (staff) => {
                let totalYearlyPresent = 0;
                const monthlyData = {};
                
                // Fetch attendance for all 12 months for the current staff member
                await Promise.all(
                    months.map(async (month) => {
                        try {
                            // Uses existing monthly endpoint
                            const response = await axios.get(
                                `${API_BASE_URL}api/staff/${staff.staffid}/attendance?month=${month}&year=${year}`,
                                { headers: { 'auth': AUTH_HEADER } }
                            );

                            // Calculate Present ('P') days for the current month
                            const presentCount = response.data.filter(
                                (record) => record.status === 'Present'
                            ).length;

                            monthlyData[month] = presentCount;
                            totalYearlyPresent += presentCount;
                            
                        } catch (err) {
                            console.error(`Error fetching attendance for staff ${staff.staffid} in ${month} for yearly summary:`, err);
                            monthlyData[month] = 0; // Default to 0 on error
                        }
                    })
                );

                yearlySummary[staff.staffid] = { 
                    ...monthlyData, 
                    Total: totalYearlyPresent 
                };
            })
        );
        
        setYearlyAttendanceSummary(yearlySummary);
        setIsLoadingAttendance(false);
    }, [view]);

    // --- Initial Load ---
    useEffect(() => {
        fetchStaffList();
    }, [fetchStaffList]);

    const handleSearchChange = (e) => setSearchQuery(e.target.value);
    const handleViewChange = (newView) => setView(newView);

    // Recalculate the days in the month whenever the selected month changes
    useEffect(() => {
        const monthIndex = months.indexOf(selectedMonth);
        const year = currentYear; 
        
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
    }, [selectedMonth, selectedYear, currentDay, currentYear]);

    // Effect to fetch monthly attendance
    useEffect(() => {
        if (view === 'monthly' && staffList.length > 0 && selectedMonth) {
            const staffIdsToFetch = staffList.map(s => ({ staffid: s.staffid }));
            fetchAttendance(staffIdsToFetch, selectedMonth, selectedYear);
        }
    }, [view, staffList.length, selectedMonth, selectedYear, fetchAttendance]); 

    // Effect to fetch yearly summary (runs only for yearly view)
    useEffect(() => {
        if (view === 'yearly' && staffList.length > 0) {
            const staffIdsToFetch = staffList.map(s => ({ staffid: s.staffid }));
            fetchYearlySummary(staffIdsToFetch, selectedYear);
        }
    }, [view, staffList.length, selectedYear, fetchYearlySummary]);

    // --- Render Monthly View (UPDATED for Darker Borders) ---
    const renderMonthlyView = () => {
        const filteredStaff = staffList.filter((staff) =>
            staff.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (isLoadingStaff || (isLoadingAttendance && view === 'monthly')) {
            return <div className="text-center py-10 text-blue-600">Loading staff list and attendance data...</div>;
        }
        if (error) {
            return <div className="text-center py-10 text-red-600 font-bold">{error}</div>;
        }
        
        const statusMap = {
            'Present': { text: 'P', class: 'bg-green-100 text-green-700 font-bold' },
            'Absent': { text: 'A', class: 'bg-red-100 text-red-700 font-bold' },
            'Leave': { text: 'L', class: 'bg-yellow-100 text-yellow-700 font-bold' },
            'Holiday': { text: 'H', class: 'bg-indigo-100 text-indigo-700' },
            'Weekend': { text: 'W', class: 'bg-gray-200 text-gray-500' },
            'Default': { text: '-', class: 'bg-white text-gray-400' }, 
        };

        return (
            <div className="overflow-auto">
                {/* Change border-gray-300 to border-gray-800 */}
                <table className="table-auto border-collapse w-full min-w-max border border-gray-800 text-sm">
                    <thead>
                        <tr>
                            {/* Change border to border-gray-800 */}
                            <th className="border border-gray-800 px-4 py-2 bg-blue-500 text-white text-center min-w-[150px] sticky left-0 z-20">
                                Day
                            </th>
                            {daysInMonth.map((d, i) => (
                                <th
                                    key={i}
                                    // Change border to border-gray-800
                                    className={`border border-gray-800 px-2 py-1 text-center ${
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
                            {/* Change border to border-gray-800 */}
                            <th className="border border-gray-800 px-4 py-2 bg-blue-500 text-white text-center sticky left-0 z-20">
                                Date
                            </th>
                            {daysInMonth.map((d, i) => (
                                // Change border to border-gray-800
                                <th key={i} className="border border-gray-800 px-2 py-1 text-center">
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
                            filteredStaff.map((staff) => {
                                const staffRecords = attendanceData[staff.staffid] || {};
                                const totalPresent = Object.values(staffRecords).filter(
                                    (record) => record.status === 'Present'
                                ).length;

                                return (
                                    <tr key={staff.id}>
                                        {/* Change border to border-gray-800 */}
                                        <td className="border border-gray-800 px-4 py-2 font-medium text-center bg-gray-50 sticky left-0 z-10">
                                            {staff.name}
                                            <div className="text-xs font-semibold mt-1 text-gray-500">
                                                Total: {totalPresent}
                                            </div>
                                        </td>
                                        {daysInMonth.map((dayObj, i) => {
                                            const record = staffRecords[dayObj.isoDate];
                                            const status = record?.status;
                                            const displayInfo = statusMap[status] || statusMap['Default'];

                                            return (
                                                // Change border to border-gray-800
                                                <td 
                                                    key={i} 
                                                    className={`border border-gray-800 px-2 py-2 text-center h-10 ${displayInfo.class}`}
                                                >
                                                    {displayInfo.text}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        );
    };

    // --- Render Yearly View (UPDATED for Sticky Column & Darker Borders) ---
    const renderYearlyView = () => {
        const filteredStaff = staffList.filter((staff) =>
            staff.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (isLoadingStaff || (isLoadingAttendance && view === 'yearly')) {
             return <div className="text-center py-10 text-blue-600">Calculating yearly attendance totals...</div>;
        }

        return (
            <div className="overflow-auto">
                {/* Change border-gray-300 to border-gray-800 */}
                <table className="table-auto border-collapse w-full min-w-max border border-gray-800 text-sm">
                    <thead className="bg-blue-100 text-black">
                        <tr className="border">
                            {/* Staff Name Header: Sticky. Change border to border-gray-800 */}
                            <th className="px-4 py-2 text-center border border-gray-800 font-bold min-w-[150px] sticky left-0 z-10 bg-blue-100">
                                Staff Name
                            </th>
                            {/* Change border to border-gray-800 */}
                            <th className="px-4 py-2 text-center border border-gray-800 font-bold min-w-[80px]">Total</th>
                            {months.map((month, index) => (
                                <th
                                    key={index}
                                    // Change border to border-gray-800
                                    className="px-4 py-2 text-center border border-gray-800 font-bold min-w-[80px]"
                                >
                                    {month}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {filteredStaff.map((staff) => {
                            const summary = yearlyAttendanceSummary[staff.staffid] || {};
                            const yearlyTotal = summary.Total !== undefined ? summary.Total : 0; 

                            return (
                                <tr
                                    key={staff.id}
                                    className="border-b border-gray-200 hover:bg-gray-50"
                                >
                                    {/* Staff Name Cell: Sticky. Change border to border-gray-800 */}
                                    <td className="px-4 py-2 text-center text-gray-700 border border-gray-800 sticky left-0 z-10 font-medium bg-white">
                                        {staff.name}
                                    </td>
                                    
                                    {/* Display Total Present in Year. Change border to border-gray-800 */}
                                    <td className="px-4 py-2 text-center text-gray-800 border border-gray-800 font-bold bg-gray-200">
                                        {yearlyTotal}
                                    </td>
                                    {months.map((month, index) => {
                                        // Display Total Present for the Month
                                        const monthlyCount = summary[month] !== undefined ? summary[month] : 0;
                                        return (
                                            // Change border to border-gray-800
                                            <td key={index} className="px-2 py-2 text-center border border-gray-800">
                                                {monthlyCount}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
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
                    
                    {/* Month Select field for Monthly View (Only show for Monthly View) */}
                    {view === "monthly" && (
                        <div className="mb-4">
                            <label htmlFor="month-select" className="block text-xs font-medium text-gray-500 mb-1">
                                Select Month
                            </label>
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