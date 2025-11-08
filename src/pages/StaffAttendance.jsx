import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import MainLayout from "../layout/MainLayout";
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
    const [staffList, setStaffList] = useState([]); // This replaces staffData
    const [isLoadingStaff, setIsLoadingStaff] = useState(false);
    const [error, setError] = useState(null); 
    
    // NOTE: Removing complex attendance states and functions for now, focusing only on the list.
    // We will re-introduce the simplified attendance logic later.

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
            // Corrected URL: /api/staff (assuming it's directly exposed under /api)
            // If your API is structured as /api/staff/staff, you must adjust this back.
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
            setStaffList([]); // Ensure list is empty on failure
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
    }, [selectedMonth]);

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
            <>
                {/* Month Selector */}
                <div className="mb-4">
                    <SelectField
                        label="Select Month"
                        options={months}
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    />
                </div>

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
            </>
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
                    <div className="mb-4 flex gap-2">
                        <button
                            className={`w-1/2 px-4 py-2 font-bold rounded ${
                                view === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                            onClick={() => handleViewChange("monthly")}
                        >
                            Monthly
                        </button>
                        <button
                            className={`w-1/2 px-4 py-2 font-bold rounded ${
                                view === "yearly" ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                            onClick={() => handleViewChange("yearly")}
                        >
                            Yearly
                        </button>
                    </div>

                    {/* Render Table */}
                    {view === "monthly" ? renderMonthlyView() : renderYearlyView()}
                </div>
            </div>
        </MainLayout>
    );
}