// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { FaChalkboardTeacher } from 'react-icons/fa';

// const ClassTimeTable = () => {
//     const [selectedStd, setSelectedStd] = useState("");
//     const [selectedDiv, setSelectedDiv] = useState("");
//     const [timetableData, setTimetableData] = useState([]);
//     const [filteredTimetable, setFilteredTimetable] = useState(null);
//     const [teacherName, setTeacherName] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     const stdOptions = ["1", "2", "3", "4", "5","6","7","8","9","10"];
//     const divOptions = ["A", "B", "C"];

//     // Fetch timetable data from API
//     useEffect(() => {
//         const fetchTimetableData = async () => {
//             setLoading(true);
//             setError("");
//             try {
//                 const response = await fetch('http://localhost:5000/api/timetables',{
//                     headers:{
//                         auth:'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
//                     }
//                 });
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch timetable data');
//                 }
//                 const data = await response.json();
//                 setTimetableData(data);
//             } catch (err) {
//                 setError('Error fetching timetable data: ' + err.message);
//                 console.error('Error fetching timetable:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchTimetableData();
//     }, []);

//     // Filter timetable based on selected standard and division
//     useEffect(() => {
//         if (selectedStd && selectedDiv && timetableData.length > 0) {
//             const matchedTimetable = timetableData.find(
//                 (tt) => tt.standard === selectedStd && tt.division === selectedDiv
//             );
            
//             if (matchedTimetable) {
//                 setFilteredTimetable(matchedTimetable);
//                 // You might need to fetch teacher name separately or it might be in the data
//                 // For now, using class teacher ID or a placeholder
//                 // setTeacherName(`Teacher ID: ${matchedTimetable.classteacher || 'N/A'}`);
//             } else {
//                 setFilteredTimetable(null);
//                 setTeacherName("");
//             }
//         } else {
//             setFilteredTimetable(null);
//             setTeacherName("");
//         }
//     }, [selectedStd, selectedDiv, timetableData]);

//     // Convert API timetable format to display format
//     const formatTimetableForDisplay = (timetable) => {
//         if (!timetable || !timetable.timetable) return [];

//         const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
//         const timeSlots = new Set();

//         // Get all unique time slots
//         timetable.timetable.forEach(day => {
//             day.periods.forEach(period => {
//                 if (period.subject !== "Break") {
//                     timeSlots.add(period.time);
//                 }
//             });
//         });

//         const sortedTimeSlots = Array.from(timeSlots).sort();

//         return sortedTimeSlots.map(timeSlot => {
//             const row = { time: timeSlot };
            
//             daysOfWeek.forEach(dayName => {
//                 const dayData = timetable.timetable.find(d => d.day === dayName);
//                 const period = dayData?.periods.find(p => p.time === timeSlot);
//                 row[dayName] = period?.subject || "-";
//             });

//             return row;
//         });
//     };

//     const displayTimetable = filteredTimetable ? formatTimetableForDisplay(filteredTimetable) : [];

//     return (
//         <MainLayout>
//             <div className="p-6">
//                 <div className="bg-white rounded-2xl shadow p-6">
//                     {/* Loading indicator */}
//                     {loading && (
//                         <div className="text-center text-blue-500 font-semibold mb-6">
//                             Loading timetable data...
//                         </div>
//                     )}

//                     {/* Error message */}
//                     {error && (
//                         <div className="text-center text-red-500 font-semibold mb-6">
//                             {error}
//                         </div>
//                     )}

//                     {/* Dropdowns */}
//                     <div className="flex flex-col sm:flex-row gap-4 mb-6">
//                         <div className="flex flex-col w-full">
//                             <label className="text-sm font-semibold text-gray-700 mb-2">Standard</label>
//                             <select
//                                 value={selectedStd}
//                                 onChange={(e) => setSelectedStd(e.target.value)}
//                                 className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//                                 disabled={loading}
//                             >
//                                 <option value="">Select</option>
//                                 {stdOptions.map((option) => (
//                                     <option key={option} value={option}>{option}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="flex flex-col w-full">
//                             <label className="text-sm font-semibold text-gray-700 mb-2">Division</label>
//                             <select
//                                 value={selectedDiv}
//                                 onChange={(e) => setSelectedDiv(e.target.value)}
//                                 className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//                                 disabled={loading}
//                             >
//                                 <option value="">Select</option>
//                                 {divOptions.map((option) => (
//                                     <option key={option} value={option}>{option}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     {/* Show message if either Std or Div is not selected */}
//                     {(!selectedStd || !selectedDiv) && !loading && (
//                         <div className="text-center text-red-500 font-semibold mb-6">
//                             Please select both Standard and Division to proceed.
//                         </div>
//                     )}

//                     {/* Class teacher info */}
//                     {selectedStd && selectedDiv && filteredTimetable && (
//                         <div className="mb-4 flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
//                             <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full">
//                                 <FaChalkboardTeacher className="w-5 h-5" />
//                             </div>
//                             <div>
//                                 <p className="text-sm text-gray-500">Class Teacher</p>
//                                 <p className="text-base font-medium text-gray-800">{teacherName}</p>
//                             </div>
//                             <div className="ml-auto">
//                                 <p className="text-sm text-gray-500">Academic Year</p>
//                                 <p className="text-base font-medium text-gray-800">{filteredTimetable.year}</p>
//                             </div>
//                         </div>
//                     )}

//                     {/* Timetable Table */}
//                     {displayTimetable.length > 0 ? (
//                         <div className="overflow-x-auto">
//                             <table className="min-w-full border rounded-xl">
//                                 <thead className="bg-blue-100 text-left text-sm text-gray-700">
//                                     <tr>
//                                         <th className="py-2 px-4 border font-semibold">Time</th>
//                                         <th className="py-2 px-4 border font-semibold">Monday</th>
//                                         <th className="py-2 px-4 border font-semibold">Tuesday</th>
//                                         <th className="py-2 px-4 border font-semibold">Wednesday</th>
//                                         <th className="py-2 px-4 border font-semibold">Thursday</th>
//                                         <th className="py-2 px-4 border font-semibold">Friday</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {displayTimetable.map((row, index) => (
//                                         <tr key={index} className="hover:bg-gray-50">
//                                             <td className="py-3 px-4 border font-medium text-gray-700 bg-gray-50">{row.time}</td>
//                                             <td className="py-3 px-4 border text-center">
//                                                 <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                                                     {row.Monday}
//                                                 </span>
//                                             </td>
//                                             <td className="py-3 px-4 border text-center">
//                                                 <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
//                                                     {row.Tuesday}
//                                                 </span>
//                                             </td>
//                                             <td className="py-3 px-4 border text-center">
//                                                 <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
//                                                     {row.Wednesday}
//                                                 </span>
//                                             </td>
//                                             <td className="py-3 px-4 border text-center">
//                                                 <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
//                                                     {row.Thursday}
//                                                 </span>
//                                             </td>
//                                             <td className="py-3 px-4 border text-center">
//                                                 <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">
//                                                     {row.Friday}
//                                                 </span>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     ) : (
//                         selectedStd && selectedDiv && !loading && (
//                             <div className="text-center text-gray-500 text-sm mt-4 p-8 bg-gray-50 rounded-lg">
//                                 <p className="text-lg mb-2">📚</p>
//                                 <p>No timetable found for Standard {selectedStd}, Division {selectedDiv}</p>
//                             </div>
//                         )
//                     )}
//                 </div>
//             </div>
//         </MainLayout>
//     );
// };

// export default ClassTimeTable;




import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import SelectField from "../components/SelectField";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 
import { FaCalendarAlt } from 'react-icons/fa'; // Added for date icon

// Helper to get the date for a given weekday, assuming Monday is the start date (24/11/2025 as a reference)
const getDayDate = (dayName, year) => {
    // We'll use a fixed reference date (e.g., Monday 24/11/2025) and calculate the rest of the week
    // NOTE: This assumes the API data covers a standard Mon-Sun week structure.
    const referenceDate = new Date(`11/24/${year}`); // Monday
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const dayIndex = days.indexOf(dayName);

    if (dayIndex !== -1) {
        const date = new Date(referenceDate);
        date.setDate(referenceDate.getDate() + dayIndex);
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    }
    return '';
};

const ClassTimeTable = () => { // Component renamed to ClassTimeTable
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [timetableData, setTimetableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [standard, setStandard] = useState("");
    const [division, setDivision] = useState("");
    const [timing, setTiming] = useState("");
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    // 🆕 NEW STATE for fetched Class Teacher Name
    const [classTeacherName, setClassTeacherName] = useState("Loading...");

    const stdOptions = ["1","2","3","4","5","6","7","8","9","10"];
    const divOptions = ["A", "B", "C", "D"];
    const timingOptions = ["08:00 - 12:40", "01:00 - 06:00"];
    
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const AUTH_TOKEN = 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=';

    // Fetch timetable data from API
    const fetchTimetableData = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch(`${API_BASE_URL}api/timetables`,{
                headers:{
                    auth:AUTH_TOKEN
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch timetable data');
            }
            const data = await response.json();
            setTimetableData(data);
        } catch (err) {
            setError('Error fetching timetable data: ' + err.message);
            console.error('Error fetching timetable:', err);
        } finally {
            setLoading(false);
        }
    };
    
    // 🆕 NEW EFFECT: Fetch Class Teacher Name when a row is selected
    useEffect(() => {
        if (selectedRow) {
            const fetchTeacherName = async () => {
                setClassTeacherName("Loading...");
                
                const standard = selectedRow.standard;
                const division = selectedRow.division;

                if (!standard || !division) {
                    setClassTeacherName("N/A (Class details missing)");
                    return;
                }

                try {
                    // Use the new, robust endpoint based on Standard and Division
                    const response = await fetch(`${API_BASE_URL}api/class-teacher/${standard}/${division}`, {
                        headers: {
                            auth: AUTH_TOKEN,
                        },
                    });
                    
                    if (!response.ok) {
                        throw new Error(`Status ${response.status}`);
                    }
                    
                    const teacherData = await response.json();
                    
                    // Set the name from the response
                    setClassTeacherName(teacherData.name || "N/A (Name missing)");

                } catch (err) {
                    console.error("Error fetching class teacher name:", err);
                    setClassTeacherName("Error fetching name");
                }
            };

            fetchTeacherName();
        }
    }, [selectedRow]); // Dependency on selectedRow


    useEffect(() => {
        fetchTimetableData();
    }, []);

    // Create new timetable
    const createTimetable = async () => {
        if (!standard || !division || !fromDate || !toDate) {
            alert("Please fill in all required fields");
            return;
        }

        const newTimetable = {
            standard: standard,
            division: division,
            year: parseInt(year),
            from: fromDate,
            to: toDate,
            timetable: weekdays.map(day => {
                if (day === "Saturday" || day === "Sunday") {
                    // Send empty periods for Sat/Sun to API when creating new
                    return { day: day, periods: [] };
                }
                return {
                    day: day,
                    periods: [
                        {
                            periodNumber: 1,
                            subject: "Maths",
                            teacher: "Teacher 1", // Retained mock name in creation only
                            time: "09:00-09:30"
                        },
                        {
                            periodNumber: 2,
                            subject: "Science",
                            teacher: "Teacher 2",
                            time: "09:30-10:00"
                        },
                        {
                            periodNumber: 3,
                            subject: "English",
                            teacher: "Teacher 3",
                            time: "10:00-10:30"
                        },
                        {
                            periodNumber: 4,
                            subject: "Break",
                            teacher: null,
                            time: "10:30-11:00"
                        },
                        {
                            periodNumber: 5,
                            subject: "Hindi",
                            teacher: "Teacher 4",
                            time: "11:00-11:30"
                        },
                        {
                            periodNumber: 6,
                            subject: "EVS",
                            teacher: "Teacher 5",
                            time: "11:30-12:00"
                        },
                        {
                            periodNumber: 7,
                            subject: "PT",
                            teacher: "Teacher 6",
                            time: "12:00-12:40"
                        }
                    ]
                }
            })
        };

        try {
            const response = await fetch(`${API_BASE_URL}api/timetables`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    auth:AUTH_TOKEN
                },
                body: JSON.stringify(newTimetable),
            });

            if (!response.ok) {
                throw new Error('Failed to create timetable');
            }

            const createdTimetable = await response.json();
            setTimetableData([...timetableData, createdTimetable]);
            setIsModalOpen(false);
            // Reset form
            setStandard("");
            setDivision("");
            setTiming("");
            setFromDate("");
            setToDate("");
            alert("Timetable created successfully!");
        } catch (err) {
            console.error('Error creating timetable:', err);
            alert("Error creating timetable: " + err.message);
        }
    };

    // Format timetable for display
    const formatTimetableForDisplay = (timetable) => {
        if (!timetable || !timetable.timetable) return [];

        const timeSlots = new Set();
        
        timetable.timetable.forEach(day => {
            day.periods.forEach(period => {
                timeSlots.add(period.time);
            });
        });

        const sortedTimeSlots = Array.from(timeSlots).sort();

        return sortedTimeSlots.map(timeSlot => {
            const row = { time: timeSlot };
            
            weekdays.forEach(dayName => {
                const dayData = timetable.timetable.find(d => d.day === dayName);
                const period = dayData?.periods.find(p => p.time === timeSlot);
                
                // FIX: Prioritize teacherName from API, fallback to raw 'teacher' (ID)
                row[dayName] = { 
                    subject: period?.subject || "-",
                    teacher: period?.teacherName || period?.teacher || null 
                };
            });

            return row;
        });
    };

    const displayTimetable = selectedRow ? formatTimetableForDisplay(selectedRow) : [];

    const filteredTimetableData = timetableData.filter(
        (row) =>
            row.standard.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.division.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Helper function to determine cell background based on subject type
    const getCellClasses = (subject) => {
        if (subject === "Break") return "bg-gray-100 text-gray-700"; // Lighter gray for breaks
        if (subject === "Lunch") return "bg-yellow-200 text-yellow-800";
        if (subject === "-") return "bg-red-50 text-red-600"; // Muted red background for empty slots
        return "bg-blue-100 text-blue-800"; // Periods
    };

    return (
        <MainLayout>
            <div className="bg-white rounded-2xl shadow p-6">
                <div className="p-6 space-y-6">
                    {/* Loading and Error States */}
                    {loading && (
                        <div className="text-center text-blue-500 font-semibold">
                            Loading timetable data...
                        </div>
                    )}

                    {error && (
                        <div className="text-center text-red-500 font-semibold">
                            {error}
                        </div>
                    )}

                    {/* Top bar - Search ONLY */}
                    <div className="flex justify-between items-center">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by standard or division..."
                            className="border px-3 py-2 rounded-md w-64 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    {/* View Mode */}
                    {viewMode ? (
                        <>
                            {/* Title and Class Teacher Info (FIXED ALIGNMENT) */}
                            <div className="flex flex-col items-center justify-between text-xl font-semibold mb-4">
                                
                                {/* 1. Timetable Title */}
                                <div className="flex items-center justify-center w-full">
                                    <h2 className="mx-4">Timetable for Standard {selectedRow?.standard} - Division {selectedRow?.division}</h2>
                                </div>

                                {/* 2. Class Teacher (Aligned right, with curves) */}
                                <div className="flex justify-end w-full mt-2"> {/* New line below title */}
                                    <div className="flex items-center text-sm">
                                        <span className="font-semibold mr-2 text-base text-gray-700">Class Teacher</span>
                                        <div className="border border-black px-3 py-1 shadow-sm text-base rounded-lg"> {/* Added rounded-lg */}
                                            {/* 🚨 USE NEW STATE FOR TEACHER NAME 🚨 */}
                                            {classTeacherName || 'N/A'}
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Timetable Table */}
                            <div className="overflow-x-auto mt-6">
                                <table className="min-w-full border border-gray-300 rounded-lg">
                                    <thead className="bg-blue-100">
                                        <tr>
                                            <th className="px-4 py-3 border border-gray-300 font-semibold">Time</th>
                                            {weekdays.map((day) => (
                                                <th 
                                                    key={day} 
                                                    className={`px-4 py-3 border border-gray-300 font-semibold ${day === 'Sunday' ? 'bg-amber-400 text-gray-800' : 'bg-blue-100'}`}
                                                >
                                                    <div>{day}</div>
                                                    <div className="text-xs font-normal mt-1 flex items-center justify-center gap-1">
                                                        <FaCalendarAlt className="w-3 h-3"/> {getDayDate(day, selectedRow?.year || new Date().getFullYear().toString())}
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {displayTimetable.map((row, rowIdx) => (
                                            <tr key={rowIdx} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 border border-gray-300 font-medium bg-gray-50">
                                                    {row.time}
                                                </td>
                                                
                                                {weekdays.map((day) => {
                                                    const period = row[day];
                                                    const subject = period.subject;
                                                    const teacherValue = period.teacher; // Name or ID
                                                    const isHoliday = day === 'Sunday';

                                                    if (isHoliday) {
                                                        if (rowIdx === 0) {
                                                            return (
                                                                <td 
                                                                    key={day} 
                                                                    rowSpan={displayTimetable.length} 
                                                                    className="px-4 py-3 border border-gray-300 text-center align-middle bg-amber-400 text-gray-800 font-bold"
                                                                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', verticalAlign: 'middle', height: '100%', fontSize: '18px', letterSpacing: '5px' }}
                                                                >
                                                                    WEEKLY HOLIDAY
                                                                </td>
                                                            );
                                                        }
                                                        return null;
                                                    }

                                                    let bgClass = 'bg-white';
                                                    
                                                    if (subject === "Break" || subject === "Lunch") {
                                                        bgClass = 'bg-gray-100'; 
                                                    } else if (subject === "-") {
                                                        bgClass = 'bg-white'; 
                                                    }
                                                    

                                                    return (
                                                        <td key={day} className={`px-2 py-3 border border-gray-300 text-center text-sm align-top ${bgClass}`}>
                                                            {subject !== '-' && (
                                                                <div className={`p-1 rounded ${getCellClasses(subject)} font-semibold leading-tight`}>
                                                                    {subject}
                                                                </div>
                                                            )}
                                                                {/* Displaying Teacher Name (if available) or ID (if name is null) */}
                                                            {teacherValue && subject !== 'Break' && subject !== 'Lunch' && subject !== '-' && (
                                                                <div className="mt-1 text-xs text-gray-600 font-medium italic">
                                                                    ({teacherValue})
                                                                </div>
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="mt-6">
                                <button
                                    onClick={() => {
                                        setViewMode(false);
                                        setSelectedRow(null);
                                    }}
                                    className="text-blue-600 hover:underline text-sm flex items-center gap-2"
                                >
                                    ← Back to list
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Title */}
                            <h2 className="text-center text-2xl font-semibold text-gray-800">
                                Timetable Management
                            </h2>

                            {/* Table of records */}
                            <div className="overflow-x-auto mt-6">
                                <table className="min-w-full border border-gray-300 rounded-lg">
                                    <thead className="bg-blue-100">
                                        <tr>
                                            <th className="px-4 py-3 border border-gray-300 font-semibold">Standard</th>
                                            <th className="px-4 py-3 border border-gray-300 font-semibold">Division</th>
                                            {/* REMOVED: Academic Year Column */}
                                            <th className="px-4 py-3 border border-gray-300 font-semibold">Created By</th>
                                            <th className="px-4 py-3 border border-gray-300 font-semibold">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {filteredTimetableData.length > 0 ? (
                                            filteredTimetableData.map((row, idx) => (
                                                <tr key={row._id || idx} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 border border-gray-300 text-center font-medium">
                                                        {row.standard}
                                                    </td>
                                                    <td className="px-4 py-3 border border-gray-300 text-center font-medium">
                                                        {row.division}
                                                    </td>
                                                    <td className="px-4 py-3 border border-gray-300 text-center">
                                                        {row.submittedby || 'N/A'}
                                                    </td>
                                                    <td className="px-4 py-3 border border-gray-300 text-center">
                                                        <button
                                                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                                                            onClick={() => {
                                                                setSelectedRow(row);
                                                                setViewMode(true);
                                                            }}
                                                        >
                                                            View Timetable
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-4 py-8 border border-gray-300 text-center text-gray-500">
                                                    {loading ? "Loading..." : "No timetables found"}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                            <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
                                Create New Timetable
                            </h3>
                            <div className="space-y-4">
                                <SelectField
                                    label="Standard"
                                    options={stdOptions}
                                    value={standard}
                                    onChange={(e) => setStandard(e.target.value)}
                                />
                                <SelectField
                                    label="Division"
                                    options={divOptions}
                                    value={division}
                                    onChange={(e) => setDivision(e.target.value)}
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Academic Year
                                    </label>
                                    <input
                                        type="number"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        min="2020"
                                        max="2030"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        From Date
                                    </label>
                                    <input
                                        type="date"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        To Date
                                    </label>
                                    <input
                                        type="date"
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        // Reset form
                                        setStandard("");
                                        setDivision("");
                                        setTiming("");
                                        setFromDate("");
                                        setToDate("");
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={createTimetable}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                    disabled={!standard || !division || !fromDate || !toDate}
                                >
                                    Create Timetable
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default ClassTimeTable;