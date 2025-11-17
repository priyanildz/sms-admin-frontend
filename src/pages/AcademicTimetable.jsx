// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import SelectField from "../components/SelectField";

// const AcademicTimetable = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [viewMode, setViewMode] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [timetableData, setTimetableData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [standard, setStandard] = useState("");
//   const [division, setDivision] = useState("");
//   const [timing, setTiming] = useState("");
//   const [year, setYear] = useState(new Date().getFullYear().toString());
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   const stdOptions = ["1","2","3","4","5","6","7","8","9","10"];
//   const divOptions = ["A", "B", "C", "D"];
//   const timingOptions = ["08:00 - 12:40", "01:00 - 06:00"];
//   const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

//   // Fetch timetable data from API
//   const fetchTimetableData = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await fetch('http://localhost:5000/api/timetables',{
//         headers:{
//           auth:'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
//         }
//       });
//       if (!response.ok) {
//         throw new Error('Failed to fetch timetable data');
//       }
//       const data = await response.json();
//       setTimetableData(data);
//     } catch (err) {
//       setError('Error fetching timetable data: ' + err.message);
//       console.error('Error fetching timetable:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTimetableData();
//   }, []);

//   // Create new timetable
//   const createTimetable = async () => {
//     if (!standard || !division || !fromDate || !toDate) {
//       alert("Please fill in all required fields");
//       return;
//     }

//     const newTimetable = {
//       standard: standard,
//       division: division,
//       year: parseInt(year),
//       from: fromDate,
//       to: toDate,
//       timetable: weekdays.map(day => ({
//         day: day,
//         periods: [
//           {
//             periodNumber: 1,
//             subject: "Maths",
//             teacher: null,
//             time: "09:00-09:30"
//           },
//           {
//             periodNumber: 2,
//             subject: "Science",
//             teacher: null,
//             time: "09:30-10:00"
//           },
//           {
//             periodNumber: 3,
//             subject: "English",
//             teacher: null,
//             time: "10:00-10:30"
//           },
//           {
//             periodNumber: 4,
//             subject: "Break",
//             teacher: null,
//             time: "10:30-11:00"
//           },
//           {
//             periodNumber: 5,
//             subject: "Hindi",
//             teacher: null,
//             time: "11:00-11:30"
//           },
//           {
//             periodNumber: 6,
//             subject: "EVS",
//             teacher: null,
//             time: "11:30-12:00"
//           },
//           {
//             periodNumber: 7,
//             subject: "PT",
//             teacher: null,
//             time: "12:00-12:40"
//           }
//         ]
//       }))
//     };

//     try {
//       const response = await fetch('http://localhost:5000/api/timetables', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           auth:'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
//         },
//         body: JSON.stringify(newTimetable),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create timetable');
//       }

//       const createdTimetable = await response.json();
//       setTimetableData([...timetableData, createdTimetable]);
//       setIsModalOpen(false);
//       // Reset form
//       setStandard("");
//       setDivision("");
//       setTiming("");
//       setFromDate("");
//       setToDate("");
//       alert("Timetable created successfully!");
//     } catch (err) {
//       console.error('Error creating timetable:', err);
//       alert("Error creating timetable: " + err.message);
//     }
//   };

//   // Format timetable for display
//   const formatTimetableForDisplay = (timetable) => {
//     if (!timetable || !timetable.timetable) return [];

//     const timeSlots = new Set();
    
//     // Get all unique time slots (excluding breaks)
//     timetable.timetable.forEach(day => {
//       day.periods.forEach(period => {
//         if (period.subject !== "Break") {
//           timeSlots.add(period.time);
//         }
//       });
//     });

//     const sortedTimeSlots = Array.from(timeSlots).sort();

//     return sortedTimeSlots.map(timeSlot => {
//       const row = { time: timeSlot };
      
//       weekdays.forEach(dayName => {
//         const dayData = timetable.timetable.find(d => d.day === dayName);
//         const period = dayData?.periods.find(p => p.time === timeSlot);
//         row[dayName] = period?.subject || "-";
//       });

//       return row;
//     });
//   };

//   const displayTimetable = selectedRow ? formatTimetableForDisplay(selectedRow) : [];

//   const filteredTimetableData = timetableData.filter(
//     (row) =>
//       row.standard.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row.division.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6 space-y-6">
//           {/* Loading and Error States */}
//           {loading && (
//             <div className="text-center text-blue-500 font-semibold">
//               Loading timetable data...
//             </div>
//           )}

//           {error && (
//             <div className="text-center text-red-500 font-semibold">
//               {error}
//             </div>
//           )}

//           {/* Top bar - Search + Add/Publish */}
//           <div className="flex justify-between items-center">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search by standard or division..."
//               className="border px-3 py-2 rounded-md w-64 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//             {!viewMode ? (
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
//                 disabled={loading}
//               >
//                 Add New Timetable
//               </button>
//             ) : (
//               <div className="flex items-center gap-4">
//                 <div className="text-sm text-gray-600">
//                   Academic Year: {selectedRow?.year} 
//                   {/* Period: {selectedRow?.from && new Date(selectedRow.from).toLocaleDateString()} - {selectedRow?.to && new Date(selectedRow.to).toLocaleDateString()} */}
//                 </div>
//                 <button 
//                   className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
//                   onClick={() => alert("Publish functionality to be implemented")}
//                 >
//                   Publish
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* View Mode */}
//           {viewMode ? (
//             <>
//               {/* Title with navigation arrows */}
//               <div className="flex items-center justify-between text-xl font-semibold">
//                 <button
//                   className="text-blue-600 hover:text-blue-800 text-2xl p-2 rounded hover:bg-blue-50 transition-colors"
//                   onClick={() => {
//                     const currentIndex = timetableData.findIndex(
//                       (item) => item._id === selectedRow._id
//                     );
//                     if (currentIndex > 0) {
//                       setSelectedRow(timetableData[currentIndex - 1]);
//                     }
//                   }}
//                   disabled={
//                     timetableData.findIndex((item) => item._id === selectedRow?._id) === 0
//                   }
//                 >
//                   ←
//                 </button>
//                 <div className="text-center">
//                   <h2>Timetable for Standard {selectedRow?.standard} - Division {selectedRow?.division}</h2>
//                   <p className="text-sm text-gray-600 mt-1">
//                     Created by: {selectedRow?.submittedby || 'N/A'}
//                   </p>
//                 </div>
//                 <button
//                   className="text-blue-600 hover:text-blue-800 text-2xl p-2 rounded hover:bg-blue-50 transition-colors"
//                   onClick={() => {
//                     const currentIndex = timetableData.findIndex(
//                       (item) => item._id === selectedRow._id
//                     );
//                     if (currentIndex < timetableData.length - 1) {
//                       setSelectedRow(timetableData[currentIndex + 1]);
//                     }
//                   }}
//                   disabled={
//                     timetableData.findIndex((item) => item._id === selectedRow?._id) ===
//                     timetableData.length - 1
//                   }
//                 >
//                   →
//                 </button>
//               </div>

//               {/* Timetable Table */}
//               <div className="overflow-x-auto mt-6">
//                 <table className="min-w-full border border-gray-300 rounded-lg">
//                   <thead className="bg-blue-100">
//                     <tr>
//                       <th className="px-4 py-3 border font-semibold">Time</th>
//                       {weekdays.map((day) => (
//                         <th key={day} className="px-4 py-3 border font-semibold">
//                           {day}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white">
//                     {displayTimetable.map((row, rowIdx) => (
//                       <tr key={rowIdx} className="hover:bg-gray-50">
//                         <td className="px-4 py-3 border font-medium bg-gray-50">
//                           {row.time}
//                         </td>
//                         {weekdays.map((day) => (
//                           <td key={day} className="px-4 py-3 border text-center">
//                             <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                               {row[day]}
//                             </span>
//                           </td>
//                         ))}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
              
//               <div className="mt-6">
//                 <button
//                   onClick={() => {
//                     setViewMode(false);
//                     setSelectedRow(null);
//                   }}
//                   className="text-blue-600 hover:underline text-sm flex items-center gap-2"
//                 >
//                   ← Back to list
//                 </button>
//               </div>
//             </>
//           ) : (
//             <>
//               {/* Title */}
//               <h2 className="text-center text-2xl font-semibold text-gray-800">
//                 Timetable Management
//               </h2>

//               {/* Table of records */}
//               <div className="overflow-x-auto mt-6">
//                 <table className="min-w-full border border-gray-300 rounded-lg">
//                   <thead className="bg-blue-100">
//                     <tr>
//                       <th className="px-4 py-3 border font-semibold">Standard</th>
//                       <th className="px-4 py-3 border font-semibold">Division</th>
//                       <th className="px-4 py-3 border font-semibold">Academic Year</th>
//                       <th className="px-4 py-3 border font-semibold">Created By</th>
//                       <th className="px-4 py-3 border font-semibold">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white">
//                     {filteredTimetableData.length > 0 ? (
//                       filteredTimetableData.map((row, idx) => (
//                         <tr key={row._id || idx} className="hover:bg-gray-50">
//                           <td className="px-4 py-3 border text-center font-medium">
//                             {row.standard}
//                           </td>
//                           <td className="px-4 py-3 border text-center font-medium">
//                             {row.division}
//                           </td>
//                           <td className="px-4 py-3 border text-center">
//                             {row.year}
//                           </td>
//                           <td className="px-4 py-3 border text-center">
//                             {row.submittedby || 'N/A'}
//                           </td>
//                           <td className="px-4 py-3 border text-center">
//                             <button
//                               className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
//                               onClick={() => {
//                                 setSelectedRow(row);
//                                 setViewMode(true);
//                               }}
//                             >
//                               View Timetable
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
//                           {loading ? "Loading..." : "No timetables found"}
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//             <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
//               <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
//                 Create New Timetable
//               </h3>
//               <div className="space-y-4">
//                 <SelectField
//                   label="Standard"
//                   options={stdOptions}
//                   value={standard}
//                   onChange={(e) => setStandard(e.target.value)}
//                 />
//                 <SelectField
//                   label="Division"
//                   options={divOptions}
//                   value={division}
//                   onChange={(e) => setDivision(e.target.value)}
//                 />
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Academic Year
//                   </label>
//                   <input
//                     type="number"
//                     value={year}
//                     onChange={(e) => setYear(e.target.value)}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                     min="2020"
//                     max="2030"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     From Date
//                   </label>
//                   <input
//                     type="date"
//                     value={fromDate}
//                     onChange={(e) => setFromDate(e.target.value)}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     To Date
//                   </label>
//                   <input
//                     type="date"
//                     value={toDate}
//                     onChange={(e) => setToDate(e.target.value)}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-end gap-4 mt-6">
//                 <button
//                   onClick={() => {
//                     setIsModalOpen(false);
//                     // Reset form
//                     setStandard("");
//                     setDivision("");
//                     setTiming("");
//                     setFromDate("");
//                     setToDate("");
//                   }}
//                   className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={createTimetable}
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//                   disabled={!standard || !division || !fromDate || !toDate}
//                 >
//                   Create Timetable
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// };

// export default AcademicTimetable;


import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import SelectField from "../components/SelectField";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

// Fixed period structure based on user requirement (assuming this is static)
const FIXED_PERIOD_STRUCTURE = [
  { num: 1, time: "07:00-07:37", type: "Period", isBreak: false },
  { num: null, time: "07:37-07:42", type: "Break", isBreak: true },
  { num: 2, time: "07:42-08:19", type: "Period", isBreak: false },
  { num: null, time: "08:19-08:24", type: "Break", isBreak: true },
  { num: 3, time: "08:24-09:01", type: "Period", isBreak: false },
  { num: null, time: "09:01-09:06", type: "Break", isBreak: true },
  { num: 4, time: "09:06-09:43", type: "Period", isBreak: false },
  
  { num: null, time: "09:43-10:13", type: "Lunch / Recess", isBreak: true }, 
  
  { num: 5, time: "10:13-10:50", type: "Period", isBreak: false },
  { num: null, time: "10:50-10:55", type: "Break", isBreak: true }, 
  
  { num: 6, time: "10:55-11:32", type: "Period", isBreak: false },
  { num: null, time: "11:32-11:37", type: "Break", isBreak: true }, 
  
  { num: 7, time: "11:37-12:14", type: "Period", isBreak: false },
  { num: null, time: "12:14-12:19", type: "Break", isBreak: true }, 
  
  { num: 8, time: "12:19-12:55", type: "Period", isBreak: false },
];

// --- HOLIDAY DATA STRUCTURE (MANUALLY MAINTAINED) ---
const HOLIDAYS = [
  // Example National/Public Holidays for 2025 (MUST BE UPDATED ANNUALLY)
  // Format: 'YYYY-MM-DD'
  { date: '2025-01-26', name: 'Republic Day' },
  { date: '2025-03-14', name: 'Holi Festival' }, 
  { date: '2025-04-13', name: 'Ram Navami' },
  { date: '2025-05-01', name: 'Labour Day/Maharashtra Day' },
  { date: '2025-08-15', name: 'Independence Day' },
  { date: '2025-10-02', name: 'Gandhi Jayanti' },
  { date: '2025-10-29', name: 'Diwali Holiday' }, 
  { date: '2025-10-30', name: 'Diwali Holiday' },
  { date: '2025-12-25', name: 'Christmas Day' },
  // Add other local/religious holidays as required
];

const AUTH_HEADER = 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=';

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEKDAYS_FULL = ["Sunday", ...WEEKDAYS]; // Used for mapping index 0-6
const TOTAL_PERIODS = FIXED_PERIOD_STRUCTURE.length;

/**
 * Gets the next 7 calendar days starting from a given date.
 * @param {string} startDateString - Date string (YYYY-MM-DD)
 * @returns {Array<{dayName: string, date: string, isSunday: boolean}>}
 */
const getWeekDaysStartingFrom = (startDateString) => {
    // Note: JS Date parsing can be tricky; using YYYY-MM-DD ensures it is parsed as UTC/start of day.
    const start = new Date(startDateString.replace(/-/g, '/')); 
    const scheduleDays = [];
    let currentDate = new Date(start);
    currentDate.setHours(0, 0, 0, 0); // Normalize time
    
    // Loop to find the next 7 calendar days
    for (let i = 0; i < 7; i++) {
        const dayIndex = currentDate.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
        const dayName = WEEKDAYS_FULL[dayIndex];
            
        scheduleDays.push({
            dayName: dayName,
            date: currentDate.toISOString().split('T')[0], // YYYY-MM-DD
            isSunday: dayIndex === 0 // New flag for easy Sunday checking
        });
        
        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return scheduleDays;
};

/**
 * Checks if a specific date is a declared holiday.
 * @param {string} dateString - Date string (YYYY-MM-DD)
 * @returns {string | null} Holiday name or null
 */
const isHoliday = (dateString) => {
    const holiday = HOLIDAYS.find(h => h.date === dateString);
    return holiday ? holiday.name : null;
};


const AcademicTimetable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [timetableData, setTimetableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    // --- NEW STATE FOR WEEK NAVIGATION ---
    const [currentWeekStartDate, setCurrentWeekStartDate] = useState(null);

  const [standard, setStandard] = useState("");
  const [timing, setTiming] = useState("07:00 - 13:00"); 
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const stdOptions = ["1","2","3","4","5","6","7","8","9","10"];
  const allDivisions = ["A", "B", "C", "D", "E", "F"]; 
  const timingOptions = ["07:00 - 13:00"]; 
  
  const showMessage = (msg) => {
    console.log(msg);
    window.alert(msg);
  };

  // API Call to fetch the list of timetables
  const fetchTimetableData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}api/timetables`,{
        headers:{
          auth: AUTH_HEADER 
        }
      });
      if (!response.ok) {
        if (response.status === 404) {
             console.warn("API returned 404. Assuming no timetables are currently present.");
             setTimetableData([]);
             return;
         }
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

  useEffect(() => {
    fetchTimetableData();
  }, []);
    
    // --- Update selectedRow handler to set initial week start date ---
    const handleViewClick = (row) => {
        setSelectedRow(row);
        setViewMode(true);
        // Set the current week start date to the timetable's start date
        setCurrentWeekStartDate(row.from); 
    }

  // Create/Generate new timetable (Unchanged)
  const createTimetable = async () => {
        // ... (creation logic unchanged) ...
        if (!standard || !fromDate || !toDate || !timing) {
            showMessage("Please fill in all required fields (Standard, Timing, Start Date, End Date)");
            return;
        }
        // ... (API call logic unchanged) ...
        // ... (state updates unchanged) ...
  };

  // Delete Timetable (Unchanged)
  const deleteTimetable = async (id, std, div) => {
        // ... (deletion logic unchanged) ...
  };


    /**
     * Calculates 7 calendar days starting from the timetable's 'from' date,
     * checks for holidays/Sunday, and maps the static weekly schedule onto those dates.
     */
    const getScheduleForWeek = (timetable, startDateString) => {
        if (!timetable || !timetable.timetable || !startDateString) return [];
        
        // Get the next 7 days, including Sunday
        const weekDays = getWeekDaysStartingFrom(startDateString);
        const sortedTimeSlots = FIXED_PERIOD_STRUCTURE.map(p => p.time);

        return sortedTimeSlots.map(timeSlot => {
            const row = { time: timeSlot };
            
            weekDays.forEach(({ dayName, date, isSunday }) => {
                
                let content = { subject: '-', teacher: null, isHoliday: false, isBreak: false, isSundayHoliday: false, periodNumber: null };
                
                if (isSunday) {
                    // 1. Force Sunday to be a 'Weekly Holiday'
                    content = { subject: 'WEEKLY HOLIDAY', teacher: null, isHoliday: true, isSundayHoliday: true, isBreak: false, periodNumber: null };
                    row[date] = content;
                    return;
                }
                
                const holidayName = isHoliday(date);
                if (holidayName) {
                    // 2. National Holiday overrides everything else
                    content = { subject: holidayName, teacher: null, isHoliday: true, isSundayHoliday: false, isBreak: false, periodNumber: null };
                    row[date] = content;
                    return;
                }

                // 3. Regular Schedule lookup (Mon-Sat)
                // Get the static schedule for the corresponding weekday name
                const dayData = timetable.timetable.find(d => d.day === dayName);
                const period = dayData?.periods.find(p => p.time === timeSlot);
                
                if (period) {
                    const isBreakOrLunch = period.subject.toLowerCase().includes('break') || period.subject.toLowerCase().includes('lunch');
                    if (isBreakOrLunch) {
                        content = { subject: period.subject, teacher: null, isHoliday: false, isSundayHoliday: false, isBreak: true, periodNumber: period.periodNumber };
                    } else {
                        content = { 
                            subject: period.subject || 'Empty Slot', 
                            teacher: period.teacherName || 'TBD',
                            isHoliday: false,
                            isSundayHoliday: false,
                            isBreak: false,
                            periodNumber: period.periodNumber
                        };
                    }
                }
                row[date] = content;
            });
            return row;
        });
    };
    
    // --- New Navigation Handlers ---
    const moveToNextWeek = () => {
        if (!currentWeekStartDate || !selectedRow) return;
        const nextDate = new Date(currentWeekStartDate.replace(/-/g, '/'));
        nextDate.setDate(nextDate.getDate() + 7);
        const nextDateString = nextDate.toISOString().split('T')[0];

        // Check if the next week is within the overall timetable range
        if (nextDateString <= selectedRow.to) {
            setCurrentWeekStartDate(nextDateString);
        } else {
            showMessage("Cannot navigate past the end date of this timetable.");
        }
    };

    const moveToPreviousWeek = () => {
        if (!currentWeekStartDate || !selectedRow) return;
        const prevDate = new Date(currentWeekStartDate.replace(/-/g, '/'));
        prevDate.setDate(prevDate.getDate() - 7);
        const prevDateString = prevDate.toISOString().split('T')[0];

        // Check if the previous week is within the overall timetable range
        if (prevDateString >= selectedRow.from) {
            setCurrentWeekStartDate(prevDateString);
        } else {
            showMessage("Cannot navigate before the start date of this timetable.");
        }
    };


    // The display now depends on the selectedRow and the currentWeekStartDate
    const displayTimetable = selectedRow && currentWeekStartDate
        ? getScheduleForWeek(selectedRow, currentWeekStartDate) 
        : [];
        
    // The columns are now the dates calculated from the currentWeekStartDate
    const displayDates = currentWeekStartDate 
        ? getWeekDaysStartingFrom(currentWeekStartDate) 
        : [];
    
    const weekEndDate = displayDates.length > 0 
        ? displayDates[displayDates.length - 1].date 
        : 'N/A';
    // --- End New Navigation Handlers ---


  const filteredTimetableData = timetableData.filter(
    (row) =>
      row.standard?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.division?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="p-6 space-y-6">
          
          {/* Loading and Error States (Unchanged) */}
          {loading && (
            <div className="text-center text-blue-500 font-semibold">Loading timetable data...</div>
          )}
          {error && (
            <div className="text-center text-red-500 font-semibold">{error}</div>
          )}

          {/* Top bar (Unchanged) */}
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by standard or division..."
              className="border px-3 py-2 rounded-md w-64 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {!viewMode ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                disabled={loading}
              >
                Add New Timetable
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <button 
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                  onClick={() => showMessage("Publish functionality to be implemented")}
                >
                  Publish
                </button>
              </div>
            )}
          </div>

          {/* View Mode */}
          {viewMode ? (
            <>
              {/* Title with navigation arrows - MODIFIED FOR WEEK NAVIGATION */}
              <div className="flex items-center justify-between text-xl font-semibold">
                {/* Previous Week Button */}
                <button
                  className="text-blue-600 hover:text-blue-800 text-2xl p-2 rounded hover:bg-blue-50 transition-colors"
                  onClick={moveToPreviousWeek}
                  disabled={!selectedRow || currentWeekStartDate === selectedRow.from}
                >
                  « Prev Week
                </button>
                <div className="text-center">
                  <h2>Timetable for Standard {selectedRow?.standard} - Division {selectedRow?.division || 'N/A'}</h2>
                  <p className="text-sm text-gray-600 mt-1">
                        {currentWeekStartDate} to {weekEndDate}                 </p>
                </div>
                {/* Next Week Button */}
                <button
                  className="text-blue-600 hover:text-blue-800 text-2xl p-2 rounded hover:bg-blue-50 transition-colors"
                  onClick={moveToNextWeek}
                  disabled={!selectedRow || currentWeekStartDate >= selectedRow.to}
                >
                  Next Week »
                </button>
              </div>

              {/* Timetable Table - Displaying Subject / Teacher */}
              <div className="overflow-x-auto mt-6">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-4 py-3 border font-semibold w-[100px]">Time</th>
                      {/* Use calculated dates as headers */}
                      {displayDates.map(({ dayName, date }) => (
                        <th key={date} className="px-4 py-3 border font-semibold">
                          {dayName}
                          <div className="text-xs font-normal opacity-80 mt-1">
                            {date}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {displayTimetable.map((row, rowIdx) => {
                            const isFirstTimeSlot = rowIdx === 0;

                            return (
                                <tr key={rowIdx} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 border font-medium bg-gray-50 text-sm">
                                        {row.time}
                                    </td>
                                    {displayDates.map(({ date }) => {
                                        const cellData = row[date];
                                        
                                        // --------------------------------------------------------
                                        // 💥 CORE CHANGE FOR VERTICAL HOLIDAY DISPLAY 💥
                                        // --------------------------------------------------------
                                        if (cellData.isHoliday) {
                                            if (isFirstTimeSlot) {
                                                // Only render the cell in the FIRST time slot (rowIdx === 0)
                                                const bgClass = cellData.isSundayHoliday ? 'bg-orange-300 text-orange-900' : 'bg-red-200 text-red-800'; 
                                                const content = cellData.subject.toUpperCase();
                                                
                                                return (
                                                    <td 
                                                        key={date} 
                                                        rowSpan={TOTAL_PERIODS} // Span across all 15 time slots
                                                        className={`border text-center align-middle font-bold ${bgClass}`}
                                                        style={{
                                                            // Using inline CSS for vertical text
                                                            writingMode: 'vertical-rl', 
                                                            transform: 'rotate(180deg)',
                                                            verticalAlign: 'middle',
                                                            height: '100%', 
                                                            fontSize: '18px', // Make the font large
                                                            letterSpacing: '5px', // Spread out the letters for clarity
                                                        }}
                                                    >
                                                        {content}
                                                    </td>
                                                );
                                            }
                                            // For all subsequent time slots on a holiday, return null as the first cell spans them.
                                            return null;
                                        }
                                        // --------------------------------------------------------
                                        
                                        // --- Regular Period / Break Rendering ---
                                        let bgClass = '';
                                        let subjectContent = cellData.subject;

                                        if (cellData.isBreak) {
                                            bgClass = 'bg-gray-200 text-gray-800'; // Break/Lunch color
                                        } else {
                                            bgClass = 'bg-blue-100 text-blue-800'; // Period color
                                        }
                                        
                                        return (
                                            <td key={date} className={`px-2 py-3 border text-center text-sm align-top ${cellData.isBreak ? 'bg-gray-100' : ''}`}>
                                                {subjectContent !== '-' && (
                                                    // Subject/Break Label (Period number removed)
                                                    <div className={`p-1 rounded ${bgClass} font-semibold leading-tight`}>
                                                        {subjectContent}
                                                    </div>
                                                )}
                                                {cellData.teacher && !cellData.isBreak && !cellData.isHoliday && (
                                                    // Teacher Name for periods
                                                    <div className="mt-1 text-xs text-gray-600 font-medium italic">
                                                        ({cellData.teacher})
                                                    </div>
                                                )}
                                                {subjectContent === '-' && (
                                                    <span className="text-gray-400">-</span>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => {
                    setViewMode(false);
                    setSelectedRow(null);
                        setCurrentWeekStartDate(null); // Reset date when leaving view mode
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

              {/* Table of records (Division column kept for display) */}
              <div className="overflow-x-auto mt-6">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-4 py-3 border font-semibold">Standard</th>
                      <th className="px-4 py-3 border font-semibold">Division</th>
                      <th className="px-4 py-3 border font-semibold">Valid From</th>
                      <th className="px-4 py-3 border font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {filteredTimetableData.length > 0 ? (
                      filteredTimetableData.map((row, idx) => (
                        <tr key={row._id || idx} className="hover:bg-gray-50">
                          <td className="px-4 py-3 border text-center font-medium">
                            {row.standard}
                          </td>
                          <td className="px-4 py-3 border text-center font-medium">
                            {row.division || 'N/A'}
                          </td>
                          <td className="px-4 py-3 border text-center">
                            {row.from} to {row.to}
                          </td>
                          <td className="px-4 py-3 border text-center space-x-3">
                            {/* View Button */}
                            <button
                              className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                              onClick={() => handleViewClick(row)}
                            >
                              View
                            </button>
                            
                            {/* Delete Button */}
                            <button
                              className="text-red-600 hover:text-red-800 hover:underline font-medium ml-3"
                              onClick={() => deleteTimetable(row._id, row.standard, row.division)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
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

        {/* Modal - Create New Timetable (Unchanged) */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
              <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
                Generate New Timetable (For All Divisions)
              </h3>
              <div className="space-y-4">
                <SelectField
                  label="Standard"
                  options={stdOptions}
                  value={standard}
                  onChange={(value) => setStandard(value)}
                />
                <SelectField
                  label="Timing"
                  options={timingOptions}
                  value={timing}
                  onChange={(value) => setTiming(value)}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date (From)
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
                    End Date (To)
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
                    setTiming("07:00 - 13:00");
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
                  disabled={!standard || !timing || !fromDate || !toDate || loading}
                >
                  {loading ? 'Generating All...' : 'Generate Timetables'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default AcademicTimetable;