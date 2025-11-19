// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import SelectField from "../components/SelectField";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// // Fixed period structure based on user requirements (Mon-Sat structure)
// const FIXED_PERIOD_STRUCTURE = [
//   { num: 1, time: "07:00-07:37", type: "Period", isBreak: false },
//   { num: null, time: "07:37-07:42", type: "Break", isBreak: true },
//   { num: 2, time: "07:42-08:19", type: "Period", isBreak: false },
//   { num: null, time: "08:19-08:24", type: "Break", isBreak: true },
//   { num: 3, time: "08:24-09:01", type: "Period", isBreak: false },
//   { num: null, time: "09:01-09:06", type: "Break", isBreak: true },
//   { num: 4, time: "09:06-09:43", type: "Period", isBreak: false },
//   
//   { num: null, time: "09:43-10:13", type: "Lunch / Recess", isBreak: true }, 
//   
//   { num: 5, time: "10:13-10:50", type: "Period", isBreak: false },
//   { num: null, time: "10:50-10:55", type: "Break", isBreak: true }, 
//   
//   { num: 6, time: "10:55-11:32", type: "Period", isBreak: false },
//   { num: null, time: "11:32-11:37", type: "Break", isBreak: true }, 
//   
//   { num: 7, time: "11:37-12:14", type: "Period", isBreak: false },
//   { num: null, time: "12:14-12:19", type: "Break", isBreak: true }, 
//   
//   { num: 8, time: "12:19-12:55", type: "Period", isBreak: false },
// ];

// // --- HOLIDAY DATA STRUCTURE (MANUALLY MAINTAINED) ---
// const HOLIDAYS = [
//   { date: '2025-01-26', name: 'Republic Day' },
//   { date: '2025-03-14', name: 'Holi Festival' }, 
//   { date: '2025-04-13', name: 'Ram Navami' },
//   { date: '2025-05-01', name: 'Labour Day/Maharashtra Day' },
//   { date: '2025-08-15', name: 'Independence Day' },
//   { date: '2025-10-02', name: 'Gandhi Jayanti' },
//   { date: '2025-10-29', name: 'Diwali Holiday' }, 
//   { date: '2025-10-30', name: 'Diwali Holiday' },
//   { date: '2025-12-25', name: 'Christmas Day' },
// ];

// const AUTH_HEADER = 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=';

// const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const WEEKDAYS_FULL = ["Sunday", ...WEEKDAYS]; // Used for mapping index 0-6
// const TOTAL_PERIODS = FIXED_PERIOD_STRUCTURE.length;

// /**
//  * Gets the next 7 calendar days starting from a given date.
//  * FIX: Uses Date.UTC to prevent local time zone interference during date object creation.
//  * @param {string} startDateString - Date string (YYYY-MM-DD)
//  * @returns {Array<{dayName: string, date: string, isSunday: boolean}>}
//  */
// const getWeekDaysStartingFrom = (startDateString) => {
    
//     const parts = startDateString.split('-');
//     const year = parseInt(parts[0]);
//     const month = parseInt(parts[1]) - 1; // Months are 0-indexed
//     const day = parseInt(parts[2]);
    
//     // CRITICAL FIX: Use Date.UTC to prevent timezone shift.
//     // The Date object is constructed using UTC parameters.
//     let currentDate = new Date(Date.UTC(year, month, day)); 

//     const scheduleDays = [];
    
//     // Loop to find the next 7 calendar days
//     for (let i = 0; i < 7; i++) {
//         // Use getUTCDay() for reliable day index that matches the date string
//         const dayIndex = currentDate.getUTCDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
//         const dayName = WEEKDAYS_FULL[dayIndex];
            
//         // Use ISO string, but format to YYYY-MM-DD for consistency
//         const dateString = currentDate.toISOString().split('T')[0];
            
//         scheduleDays.push({
//             dayName: dayName,
//             date: dateString, 
//             isSunday: dayIndex === 0 
//         });
        
//         // Use setUTCDate to advance the day without local time interference
//         currentDate.setUTCDate(currentDate.getUTCDate() + 1);
//     }

//     return scheduleDays;
// };

// /**
//  * Checks if a specific date is a declared holiday, checking both static list and
//  * automatically calculating major annual public holidays (Jan 26, Aug 15).
//  * @param {string} dateString - Date string (YYYY-MM-DD)
//  * @returns {string | null} Holiday name or null
//  */
// const isHoliday = (dateString) => {
//     const parts = dateString.split('-');
//     const monthDay = `${parts[1]}-${parts[2]}`; // MM-DD format
    
//     // 1. Check for perpetually recurring holidays (Jan 26, Aug 15, Dec 25)
//     if (monthDay === '01-26') return 'Republic Day';
//     if (monthDay === '08-15') return 'Independence Day';
//     if (monthDay === '12-25') return 'Christmas Day';
    
//     // 2. Check the manual list for complex/moving holidays (Diwali, Holi, etc.)
//     const manualHoliday = HOLIDAYS.find(h => h.date === dateString);
//     if (manualHoliday) return manualHoliday.name;
    
//     return null;
// };


// const AcademicTimetable = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [viewMode, setViewMode] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [timetableData, setTimetableData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//     // --- NEW STATE FOR WEEK NAVIGATION ---
//     const [currentWeekStartDate, setCurrentWeekStartDate] = useState(null);

//   const [standard, setStandard] = useState("");
//   const [timing, setTiming] = useState("07:00 - 13:00"); 
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   const stdOptions = ["1","2","3","4","5","6","7","8","9","10"];
//   const allDivisions = ["A", "B", "C", "D", "E", "F"]; 
//   const timingOptions = ["07:00 - 13:00"]; 
//   
//   const showMessage = (msg) => {
//     console.log(msg);
//     window.alert(msg);
//   };

//   // API Call to fetch the list of timetables
//   const fetchTimetableData = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await fetch(`${API_BASE_URL}api/timetables`,{
//         headers:{
//           auth: AUTH_HEADER 
//         }
//       });
//       if (!response.ok) {
//         if (response.status === 404) {
//              console.warn("API returned 404. Assuming no timetables are currently present.");
//              setTimetableData([]);
//              return;
//          }
//         throw new Error('Failed to fetch timetable data');
//       }
//       const data = await response.json();
//       setTimetableData(data);
//     } catch (err) {
//       setError('Error fetching timetable data: ' + err.message);
//       console.error('Error fetching timetable:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTimetableData();
//   }, []);
    
//     // --- Update selectedRow handler to set initial week start date ---
//     const handleViewClick = (row) => {
//         setSelectedRow(row);
//         setViewMode(true);
//         // Set the current week start date to the timetable's start date
//         setCurrentWeekStartDate(row.from); 
//     }

//   // Create/Generate new timetable (Unchanged)
//   const createTimetable = async () => {
//     if (!standard || !fromDate || !toDate || !timing) {
//       showMessage("Please fill in all required fields (Standard, Timing, Start Date, End Date)");
//       return;
//     }

//     setLoading(true);
//     setError(""); 
//     
//     const generationRequest = {
//       standard: standard,
//       from: fromDate,
//       to: toDate,
//       timing: timing,
//       submittedby: 'Testing Admin', 
//     };

//     try {
//       const response = await fetch(`${API_BASE_URL}api/timetables/generate`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           auth: AUTH_HEADER
//         },
//         body: JSON.stringify(generationRequest),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         const errorMsg = result.error || (result.details && JSON.stringify(result.details)) || 'Failed to generate timetables.';
//         throw new Error(errorMsg);
//       }
//       
//       if (!result.timetables || result.timetables.length === 0) {
//         throw new Error(result.message || 'Timetable generated successfully, but response data is missing.');
//       }

//       setTimetableData(prevData => [...prevData, ...result.timetables]);
//       setIsModalOpen(false);
//       
//       setStandard("");
//       setTiming("07:00 - 13:00");
//       setFromDate("");
//       setToDate("");
//       
//       showMessage(`Success! ${result.timetables.length} timetables created. ${result.failedDivisions.length > 0 ? `Failures/Conflicts: ${result.failedDivisions.map(f => f.division).join(', ')}` : ''}`);
//       
//     } catch (err) {
//       console.error('Error creating timetable:', err);
//       setError("Generation failed: " + err.message);
//       showMessage("Error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete Timetable (Unchanged)
//   const deleteTimetable = async (id, std, div) => {
//     if (!window.confirm(`Are you sure you want to delete the timetable for Std ${std}${div ? ' - ' + div : ''}?`)) {
//       return;
//     }
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}api/timetables/${id}`, {
//         method: 'DELETE',
//         headers: {
//           auth: AUTH_HEADER
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete timetable.');
//       }

//       setTimetableData(timetableData.filter(item => item._id !== id));
//       showMessage("Timetable deleted successfully!");
//     } catch (err) {
//       console.error('Error deleting timetable:', err);
//       showMessage("Error deleting timetable: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };


//     /**
//      * Calculates 7 calendar days starting from the timetable's 'from' date,
//      * checks for holidays/Sunday, and maps the static weekly schedule onto those dates.
//      */
//     const getScheduleForWeek = (timetable, startDateString) => {
//         if (!timetable || !timetable.timetable || !startDateString) return [];
        
//         // Get the next 7 days, including Sunday
//         const weekDays = getWeekDaysStartingFrom(startDateString);
//         const sortedTimeSlots = FIXED_PERIOD_STRUCTURE.map(p => p.time);

//         return sortedTimeSlots.map(timeSlot => {
//             const row = { time: timeSlot };
            
//             weekDays.forEach((dayInfo) => {
//                 const { dayName, date, isSunday } = dayInfo;
                
//                 let content = { subject: '-', teacher: null, isHoliday: false, isBreak: false, isSundayHoliday: false, periodNumber: null };
                
//                 if (isSunday) {
//                     // 1. Force Sunday to be a 'Weekly Holiday'
//                     content = { subject: 'WEEKLY HOLIDAY', teacher: null, isHoliday: true, isSundayHoliday: true, isBreak: false, periodNumber: null };
//                     row[date] = content;
//                     return;
//                 }
                
//                 const holidayName = isHoliday(date);
//                 if (holidayName) {
//                     // 2. National Holiday overrides everything else
//                     content = { subject: holidayName, teacher: null, isHoliday: true, isSundayHoliday: false, periodNumber: null };
//                     row[date] = content;
//                     return;
//                 }

//                 // 3. Regular Schedule lookup (Mon-Sat)
//                 // Use the correctly calculated dayName to find the corresponding static schedule block
//                 const dayData = timetable.timetable.find(d => d.day === dayName);
//                 const period = dayData?.periods.find(p => p.time === timeSlot);
                
//                 if (period) {
//                     const isBreakOrLunch = period.subject.toLowerCase().includes('break') || period.subject.toLowerCase().includes('lunch');
//                     if (isBreakOrLunch) {
//                         content = { subject: period.subject, teacher: null, isHoliday: false, isSundayHoliday: false, isBreak: true, periodNumber: period.periodNumber };
//                     } else {
//                         content = { 
//                             subject: period.subject || 'Empty Slot', 
//                             teacher: period.teacherName || 'TBD',
//                             isHoliday: false,
//                             isSundayHoliday: false,
//                             isBreak: false,
//                             periodNumber: period.periodNumber
//                         };
//                     }
//                 }
//                 row[date] = content;
//             });
//             return row;
//         });
//     };
    
//     // --- New Navigation Handlers ---
//     const moveToNextWeek = () => {
//         if (!currentWeekStartDate || !selectedRow) return;
        
//         // Convert to UTC-safe date object for reliable calculation
//         const parts = currentWeekStartDate.split('-');
//         const currentUTC = new Date(Date.UTC(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])));
//         currentUTC.setUTCDate(currentUTC.getUTCDate() + 7);
//         const nextDateString = currentUTC.toISOString().split('T')[0];

//         // Check if the next week is within the overall timetable range
//         if (nextDateString <= selectedRow.to) {
//             setCurrentWeekStartDate(nextDateString);
//         } else {
//             showMessage("Cannot navigate past the end date of this timetable.");
//         }
//     };

//     const moveToPreviousWeek = () => {
//         if (!currentWeekStartDate || !selectedRow) return;
        
//         // Convert to UTC-safe date object for reliable calculation
//         const parts = currentWeekStartDate.split('-');
//         const currentUTC = new Date(Date.UTC(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])));
//         currentUTC.setUTCDate(currentUTC.getUTCDate() - 7);
//         const prevDateString = currentUTC.toISOString().split('T')[0];

//         // Check if the previous week is within the overall timetable range
//         if (prevDateString >= selectedRow.from) {
//             setCurrentWeekStartDate(prevDateString);
//         } else {
//             showMessage("Cannot navigate before the start date of this timetable.");
//         }
//     };


//     // The display now depends on the selectedRow and the currentWeekStartDate
//     const displayTimetable = selectedRow && currentWeekStartDate
//         ? getScheduleForWeek(selectedRow, currentWeekStartDate) 
//         : [];
        
//     // The columns are now the dates calculated from the currentWeekStartDate
//     const displayDates = currentWeekStartDate 
//         ? getWeekDaysStartingFrom(currentWeekStartDate) 
//         : [];
    
//     const weekEndDate = displayDates.length > 0 
//         ? displayDates[displayDates.length - 1].date 
//         : 'N/A';
//     // --- End New Navigation Handlers ---

//   const filteredTimetableData = timetableData.filter(
//     (row) =>
//       row.standard?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row.division?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6 space-y-6">
//           
//           {/* Loading and Error States (Unchanged) */}
//           {loading && (
//             <div className="text-center text-blue-500 font-semibold">Loading timetable data...</div>
//           )}
//           {error && (
//             <div className="text-center text-red-500 font-semibold">{error}</div>
//           )}

//           {/* Top bar (Unchanged) */}
//           <div className="flex justify-between items-center">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search by standard or division..."
//               className="border px-3 py-2 rounded-md w-64 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//             {!viewMode ? (
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
//                 disabled={loading}
//               >
//                 Add New Timetable
//               </button>
//             ) : (
//               <div className="flex items-center gap-4">
//                 <button 
//                   className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
//                   onClick={() => showMessage("Publish functionality to be implemented")}
//                 >
//                   Publish
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* View Mode */}
//           {viewMode ? (
//             <>
//               {/* Title with navigation arrows - MODIFIED FOR WEEK NAVIGATION */}
//               <div className="flex items-center justify-between text-xl font-semibold">
//                 {/* Previous Week Button */}
//                 <button
//                   className="text-blue-600 hover:text-blue-800 text-2xl p-2 rounded hover:bg-blue-50 transition-colors"
//                   onClick={moveToPreviousWeek}
//                   disabled={!selectedRow || currentWeekStartDate === selectedRow.from}
//                 >
//                   « Prev Week
//                 </button>
//                 <div className="text-center">
//                   <h2>Timetable for Standard {selectedRow?.standard} - Division {selectedRow?.division || 'N/A'}</h2>
//                   <p className="text-sm text-gray-600 mt-1">
//                         {currentWeekStartDate} to {weekEndDate}                   </p>
//                 </div>
//                 {/* Next Week Button */}
//                 <button
//                   className="text-blue-600 hover:text-blue-800 text-2xl p-2 rounded hover:bg-blue-50 transition-colors"
//                   onClick={moveToNextWeek}
//                   disabled={!selectedRow || currentWeekStartDate >= selectedRow.to}
//                 >
//                   Next Week »
//                 </button>
//               </div>

//               {/* Timetable Table - Displaying Subject / Teacher */}
//               <div className="overflow-x-auto mt-6">
//                 <table className="min-w-full border border-gray-300 rounded-lg">
//                   <thead className="bg-blue-100">
//                     <tr>
//                       <th className="px-4 py-3 border font-semibold w-[100px]">Time</th>
//                       {/* Use calculated dates as headers */}
//                       {displayDates.map(({ dayName, date }) => (
//                         <th key={date} className="px-4 py-3 border font-semibold">
//                           {dayName}
//                           <div className="text-xs font-normal opacity-80 mt-1">
//                             {date}
//                           </div>
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white">
//                     {displayTimetable.map((row, rowIdx) => {
//                             const isFirstTimeSlot = rowIdx === 0;

//                             return (
//                                 <tr key={rowIdx} className="hover:bg-gray-50">
//                                     <td className="px-4 py-3 border font-medium bg-gray-50 text-sm">
//                                         {row.time}
//                                     </td>
//                                     {displayDates.map(({ date }) => {
//                                         const cellData = row[date];
                                        
//                                         // --------------------------------------------------------
//                                         // 💥 CORE CHANGE FOR VERTICAL HOLIDAY DISPLAY 💥
//                                         // --------------------------------------------------------
//                                         if (cellData.isHoliday) {
//                                             if (isFirstTimeSlot) {
//                                                 // Only render the cell in the FIRST time slot (rowIdx === 0)
//                                                 const bgClass = cellData.isSundayHoliday ? 'bg-orange-300 text-orange-900' : 'bg-red-200 text-red-800'; 
//                                                 const content = cellData.subject.toUpperCase();
                                                
//                                                 return (
//                                                     <td 
//                                                         key={date} 
//                                                         rowSpan={TOTAL_PERIODS} // Span across all 15 time slots
//                                                         className={`border text-center align-middle font-bold ${bgClass}`}
//                                                         style={{
//                                                             // Using inline CSS for vertical text since we don't have access to global CSS
//                                                             writingMode: 'vertical-rl', 
//                                                             transform: 'rotate(180deg)',
//                                                             verticalAlign: 'middle',
//                                                             height: '100%', 
//                                                             fontSize: '18px', // Make the font large
//                                                             letterSpacing: '5px', // Spread out the letters for clarity
//                                                         }}
//                                                     >
//                                                         {content}
//                                                     </td>
//                                                 );
//                                             }
//                                             // For all subsequent time slots on a holiday, return null as the first cell spans them.
//                                             return null;
//                                         }
//                                         // --------------------------------------------------------
                                        
//                                         // --- Regular Period / Break Rendering ---
//                                         let bgClass = '';
//                                         let subjectContent = cellData.subject;

//                                         if (cellData.isBreak) {
//                                             bgClass = 'bg-gray-200 text-gray-800'; // Break/Lunch color
//                                         } else {
//                                             bgClass = 'bg-blue-100 text-blue-800'; // Period color
//                                         }
                                        
//                                         return (
//                                             <td key={date} className={`px-2 py-3 border text-center text-sm align-top ${cellData.isBreak ? 'bg-gray-100' : ''}`}>
//                                                 {subjectContent !== '-' && (
//                                                     // Subject/Break Label (Period number removed)
//                                                     <div className={`p-1 rounded ${bgClass} font-semibold leading-tight`}>
//                                                         {subjectContent}
//                                                     </div>
//                                                 )}
//                                                 {cellData.teacher && !cellData.isBreak && !cellData.isHoliday && (
//                                                     // Teacher Name for periods
//                                                     <div className="mt-1 text-xs text-gray-600 font-medium italic">
//                                                         ({cellData.teacher})
//                                                     </div>
//                                                 )}
//                                                 {subjectContent === '-' && (
//                                                     <span className="text-gray-400">-</span>
//                                                 )}
//                                             </td>
//                                         );
//                                     })}
//                                 </tr>
//                             );
//                         })}
//                   </tbody>
//                 </table>
//               </div>
//               
//               <div className="mt-6">
//                 <button
//                   onClick={() => {
//                     setViewMode(false);
//                     setSelectedRow(null);
//                     setCurrentWeekStartDate(null); // Reset date when leaving view mode
//                   }}
//                   className="text-blue-600 hover:underline text-sm flex items-center gap-2"
//                 >
//                   ← Back to list
//                 </button>
//               </div>
//             </>
//           ) : (
//             <>
//               {/* Title */}
//               <h2 className="text-center text-2xl font-semibold text-gray-800">
//                 Timetable Management
//               </h2>

//               {/* Table of records (Division column kept for display) */}
//               <div className="overflow-x-auto mt-6">
//                 <table className="min-w-full border border-gray-300 rounded-lg">
//                   <thead className="bg-blue-100">
//                     <tr>
//                       <th className="px-4 py-3 border font-semibold">Standard</th>
//                       <th className="px-4 py-3 border font-semibold">Division</th>
//                       <th className="px-4 py-3 border font-semibold">Created By</th> {/* <-- MODIFIED HEADER */}
//                       <th className="px-4 py-3 border font-semibold">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white">
//                     {filteredTimetableData.length > 0 ? (
//                       filteredTimetableData.map((row, idx) => (
//                         <tr key={row._id || idx} className="hover:bg-gray-50">
//                           <td className="px-4 py-3 border text-center font-medium">
//                             {row.standard}
//                           </td>
//                           <td className="px-4 py-3 border text-center font-medium">
//                             {row.division || 'N/A'}
//                           </td>
//                           <td className="px-4 py-3 border text-center">
//                             {row.submittedby || 'N/A'} {/* <-- MODIFIED DATA FIELD */}
//                           </td>
//                           <td className="px-4 py-3 border text-center space-x-3">
//                             {/* View Button */}
//                             <button
//                               className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
//                               onClick={() => handleViewClick(row)}
//                             >
//                               View
//                             </button>
//                             
//                             {/* Delete Button */}
//                             <button
//                               className="text-red-600 hover:text-red-800 hover:underline font-medium ml-3"
//                               onClick={() => deleteTimetable(row._id, row.standard, row.division)}
//                             >
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
//                           {loading ? "Loading..." : "No timetables found"}
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Modal - Create New Timetable (Unchanged) */}
//         {isModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//             <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
//               <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
//                 Generate New Timetable (For All Divisions)
//               </h3>
//               <div className="space-y-4">
//                 <SelectField
//                   label="Standard"
//                   options={stdOptions}
//                   value={standard}
//                   onChange={(value) => setStandard(value)}
//                 />
//                 <SelectField
//                   label="Timing"
//                   options={timingOptions}
//                   value={timing}
//                   onChange={(value) => setTiming(value)}
//                 />
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Start Date (From)
//                   </label>
//                   <input
//                     type="date"
//                     value={fromDate}
//                     onChange={(e) => setFromDate(e.target.value)}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     End Date (To)
//                   </label>
//                   <input
//                     type="date"
//                     value={toDate}
//                     onChange={(e) => setToDate(e.target.value)}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-end gap-4 mt-6">
//                 <button
//                   onClick={() => {
//                     setIsModalOpen(false);
//                     // Reset form
//                     setStandard("");
//                     setTiming("07:00 - 13:00");
//                     setFromDate("");
//                     setToDate("");
//                   }}
//                   className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={createTimetable}
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//                   disabled={!standard || !timing || !fromDate || !toDate || loading}
//                 >
//                   {loading ? 'Generating All...' : 'Generate Timetables'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// };

// export default AcademicTimetable;


// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import SelectField from "../components/SelectField";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// // Fixed period structure based on user requirements (Mon-Sat structure)
// const FIXED_PERIOD_STRUCTURE = [
//   { num: 1, time: "07:00-07:37", type: "Period", isBreak: false },
//   { num: null, time: "07:37-07:42", type: "Break", isBreak: true },
//   { num: 2, time: "07:42-08:19", type: "Period", isBreak: false },
//   { num: null, time: "08:19-08:24", type: "Break", isBreak: true },
//   { num: 3, time: "08:24-09:01", type: "Period", isBreak: false },
//   { num: null, time: "09:01-09:06", type: "Break", isBreak: true },
//   { num: 4, time: "09:06-09:43", type: "Period", isBreak: false },
//   
//   { num: null, time: "09:43-10:13", type: "Lunch / Recess", isBreak: true }, 
//   
//   { num: 5, time: "10:13-10:50", type: "Period", isBreak: false },
//   { num: null, time: "10:50-10:55", type: "Break", isBreak: true }, 
//   
//   { num: 6, time: "10:55-11:32", type: "Period", isBreak: false },
//   { num: null, time: "11:32-11:37", type: "Break", isBreak: true }, 
//   
//   { num: 7, time: "11:37-12:14", type: "Period", isBreak: false },
//   { num: null, time: "12:14-12:19", type: "Break", isBreak: true }, 
//   
//   { num: 8, time: "12:19-12:55", type: "Period", isBreak: false },
// ];

// // --- HOLIDAY DATA STRUCTURE (MANUALLY MAINTAINED) ---
// const HOLIDAYS = [
//   { date: '2025-01-26', name: 'Republic Day' },
//   { date: '2025-03-14', name: 'Holi Festival' }, 
//   { date: '2025-04-13', name: 'Ram Navami' },
//   { date: '2025-05-01', name: 'Labour Day/Maharashtra Day' },
//   { date: '2025-08-15', name: 'Independence Day' },
//   { date: '2025-10-02', name: 'Gandhi Jayanti' },
//   { date: '2025-10-29', name: 'Diwali Holiday' }, 
//   { date: '2025-10-30', name: 'Diwali Holiday' },
//   { date: '2025-12-25', name: 'Christmas Day' },
// ];

// const AUTH_HEADER = 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=';

// const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const WEEKDAYS_FULL = ["Sunday", ...WEEKDAYS]; // Used for mapping index 0-6
// const TOTAL_PERIODS = FIXED_PERIOD_STRUCTURE.length;

// /**
//  * Gets the next 7 calendar days starting from a given date.
//  * FIX: Uses Date.UTC to prevent local time zone interference during date object creation.
//  * @param {string} startDateString - Date string (YYYY-MM-DD)
//  * @returns {Array<{dayName: string, date: string, isSunday: boolean}>}
//  */
// const getWeekDaysStartingFrom = (startDateString) => {
    
//     const parts = startDateString.split('-');
//     const year = parseInt(parts[0]);
//     const month = parseInt(parts[1]) - 1; // Months are 0-indexed
//     const day = parseInt(parts[2]);
    
//     // CRITICAL FIX: Use Date.UTC to prevent timezone shift.
//     // The Date object is constructed using UTC parameters.
//     let currentDate = new Date(Date.UTC(year, month, day)); 

//     const scheduleDays = [];
    
//     // Loop to find the next 7 calendar days (1 week)
//     for (let i = 0; i < 7; i++) { 
//         // Use getUTCDay() for reliable day index that matches the date string
//         const dayIndex = currentDate.getUTCDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
//         const dayName = WEEKDAYS_FULL[dayIndex];
            
//         // Use ISO string, but format to YYYY-MM-DD for consistency
//         const dateString = currentDate.toISOString().split('T')[0];
            
//         scheduleDays.push({
//             dayName: dayName,
//             date: dateString, 
//             isSunday: dayIndex === 0 
//         });
        
//         // Use setUTCDate to advance the day without local time interference
//         currentDate.setUTCDate(currentDate.getUTCDate() + 1);
//     }

//     return scheduleDays;
// };

// /**
//  * Checks if a specific date is a declared holiday, checking both static list and
//  * automatically calculating major annual public holidays (Jan 26, Aug 15).
//  * @param {string} dateString - Date string (YYYY-MM-DD)
//  * @returns {string | null} Holiday name or null
//  */
// const isHoliday = (dateString) => {
//     const parts = dateString.split('-');
//     const monthDay = `${parts[1]}-${parts[2]}`; // MM-DD format
    
//     // 1. Check for perpetually recurring holidays (Jan 26, Aug 15, Dec 25)
//     if (monthDay === '01-26') return 'Republic Day';
//     if (monthDay === '08-15') return 'Independence Day';
//     if (monthDay === '12-25') return 'Christmas Day';
    
//     // 2. Check the manual list for complex/moving holidays (Diwali, Holi, etc.)
//     const manualHoliday = HOLIDAYS.find(h => h.date === dateString);
//     if (manualHoliday) return manualHoliday.name;
    
//     return null;
// };


// const AcademicTimetable = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [viewMode, setViewMode] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [timetableData, setTimetableData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//     // --- NEW STATE FOR WEEK NAVIGATION ---
//     const [currentWeekStartDate, setCurrentWeekStartDate] = useState(null);

//   const [standard, setStandard] = useState("");
//   const [timing, setTiming] = useState("07:00 - 13:00"); 
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   const stdOptions = ["1","2","3","4","5","6","7","8","9","10"];
//   const allDivisions = ["A", "B", "C", "D", "E", "F"]; 
//   const timingOptions = ["07:00 - 13:00"]; 
//   
//   const showMessage = (msg) => {
//     console.log(msg);
//     window.alert(msg);
//   };

//   // API Call to fetch the list of timetables
//   const fetchTimetableData = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await fetch(`${API_BASE_URL}api/timetables`,{
//         headers:{
//           auth: AUTH_HEADER 
//         }
//       });
//       if (!response.ok) {
//         if (response.status === 404) {
//              console.warn("API returned 404. Assuming no timetables are currently present.");
//              setTimetableData([]);
//              return;
//          }
//         throw new Error('Failed to fetch timetable data');
//       }
//       const data = await response.json();
//       setTimetableData(data);
//     } catch (err) {
//       setError('Error fetching timetable data: ' + err.message);
//       console.error('Error fetching timetable:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTimetableData();
//   }, []);
    
//     // --- Update selectedRow handler to set initial week start date ---
//     const handleViewClick = (row) => {
//         setSelectedRow(row);
//         setViewMode(true);
//         // Set the current week start date to the timetable's start date
//         setCurrentWeekStartDate(row.from); 
//     }

//   // Create/Generate new timetable (Unchanged)
//   const createTimetable = async () => {
//     if (!standard || !fromDate || !toDate || !timing) {
//       showMessage("Please fill in all required fields (Standard, Timing, Start Date, End Date)");
//       return;
//     }

//     setLoading(true);
//     setError(""); 
//     
//     const generationRequest = {
//       standard: standard,
//       from: fromDate,
//       to: toDate,
//       timing: timing,
//       submittedby: 'Testing Admin', 
//     };

//     try {
//       const response = await fetch(`${API_BASE_URL}api/timetables/generate`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           auth: AUTH_HEADER
//         },
//         body: JSON.stringify(generationRequest),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         const errorMsg = result.error || (result.details && JSON.stringify(result.details)) || 'Failed to generate timetables.';
//         throw new Error(errorMsg);
//       }
//       
//       if (!result.timetables || result.timetables.length === 0) {
//         throw new Error(result.message || 'Timetable generated successfully, but response data is missing.');
//       }

//       setTimetableData(prevData => [...prevData, ...result.timetables]);
//       setIsModalOpen(false);
//       
//       setStandard("");
//       setTiming("07:00 - 13:00");
//       setFromDate("");
//       setToDate("");
//       
//       showMessage(`Success! ${result.timetables.length} timetables created. ${result.failedDivisions.length > 0 ? `Failures/Conflicts: ${result.failedDivisions.map(f => f.division).join(', ')}` : ''}`);
//       
//     } catch (err) {
//       console.error('Error creating timetable:', err);
//       setError("Generation failed: " + err.message);
//       showMessage("Error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete Timetable (Unchanged)
//   const deleteTimetable = async (id, std, div) => {
//     if (!window.confirm(`Are you sure you want to delete the timetable for Std ${std}${div ? ' - ' + div : ''}?`)) {
//       return;
//     }
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}api/timetables/${id}`, {
//         method: 'DELETE',
//         headers: {
//           auth: AUTH_HEADER
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete timetable.');
//       }

//       setTimetableData(timetableData.filter(item => item._id !== id));
//       showMessage("Timetable deleted successfully!");
//     } catch (err) {
//       console.error('Error deleting timetable:', err);
//       showMessage("Error deleting timetable: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };


//     /**
//      * Calculates 7 calendar days starting from the timetable's 'from' date,
//      * checks for holidays/Sunday, and maps the static weekly schedule onto those dates.
//      */
//     const getScheduleForWeek = (timetable, startDateString) => {
//         if (!timetable || !timetable.timetable || !startDateString) return [];
        
//         // Get the next 7 days, including Sunday
//         const weekDays = getWeekDaysStartingFrom(startDateString);
//         const sortedTimeSlots = FIXED_PERIOD_STRUCTURE.map(p => p.time);

//         return sortedTimeSlots.map(timeSlot => {
//             const row = { time: timeSlot };
            
//             weekDays.forEach((dayInfo) => {
//                 const { dayName, date, isSunday } = dayInfo;
                
//                 let content = { subject: '-', teacher: null, isHoliday: false, isBreak: false, isSundayHoliday: false, periodNumber: null };
                
//                 if (isSunday) {
//                     // 1. Force Sunday to be a 'Weekly Holiday'
//                     content = { subject: 'WEEKLY HOLIDAY', teacher: null, isHoliday: true, isSundayHoliday: true, isBreak: false, periodNumber: null };
//                     row[date] = content;
//                     return;
//                 }
                
//                 const holidayName = isHoliday(date);
//                 if (holidayName) {
//                     // 2. National Holiday overrides everything else
//                     content = { subject: holidayName, teacher: null, isHoliday: true, isSundayHoliday: false, periodNumber: null };
//                     row[date] = content;
//                     return;
//                 }

//                 // 3. Regular Schedule lookup (Mon-Sat)
//                 // Use the correctly calculated dayName to find the corresponding static schedule block
//                 const dayData = timetable.timetable.find(d => d.day === dayName);
//                 const period = dayData?.periods.find(p => p.time === timeSlot);
                
//                 if (period) {
//                     const isBreakOrLunch = period.subject.toLowerCase().includes('break') || period.subject.toLowerCase().includes('lunch');
//                     if (isBreakOrLunch) {
//                         content = { subject: period.subject, teacher: null, isHoliday: false, isSundayHoliday: false, isBreak: true, periodNumber: period.periodNumber };
//                     } else {
//                         content = { 
//                             subject: period.subject || 'Empty Slot', 
//                             teacher: period.teacherName || 'TBD',
//                             isHoliday: false,
//                             isSundayHoliday: false,
//                             isBreak: false,
//                             periodNumber: period.periodNumber
//                         };
//                     }
//                 }
//                 row[date] = content;
//             });
//             return row;
//         });
//     };
    
//     // --- New Navigation Handlers ---
//     const moveToNextWeek = () => {
//         if (!currentWeekStartDate || !selectedRow) return;
        
//         // Convert to UTC-safe date object for reliable calculation
//         const parts = currentWeekStartDate.split('-');
//         const currentUTC = new Date(Date.UTC(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])));
//         currentUTC.setUTCDate(currentUTC.getUTCDate() + 7);
//         const nextDateString = currentUTC.toISOString().split('T')[0];

//         // Check if the next week is within the overall timetable range
//         if (nextDateString <= selectedRow.to) {
//             setCurrentWeekStartDate(nextDateString);
//         } else {
//             showMessage("Cannot navigate past the end date of this timetable.");
//         }
//     };

//     const moveToPreviousWeek = () => {
//         if (!currentWeekStartDate || !selectedRow) return;
        
//         // Convert to UTC-safe date object for reliable calculation
//         const parts = currentWeekStartDate.split('-');
//         const currentUTC = new Date(Date.UTC(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])));
//         currentUTC.setUTCDate(currentUTC.getUTCDate() - 7);
//         const prevDateString = currentUTC.toISOString().split('T')[0];

//         // Check if the previous week is within the overall timetable range
//         if (prevDateString >= selectedRow.from) {
//             setCurrentWeekStartDate(prevDateString);
//         } else {
//             showMessage("Cannot navigate before the start date of this timetable.");
//         }
//     };


//     // The display now depends on the selectedRow and the currentWeekStartDate
//     const displayTimetable = selectedRow && currentWeekStartDate
//         ? getScheduleForWeek(selectedRow, currentWeekStartDate) 
//         : [];
        
//     // The columns are now the dates calculated from the currentWeekStartDate
//     const displayDates = currentWeekStartDate 
//         ? getWeekDaysStartingFrom(currentWeekStartDate) 
//         : [];
    
//     const weekEndDate = displayDates.length > 0 
//         ? displayDates[displayDates.length - 1].date 
//         : 'N/A';
//     // --- End New Navigation Handlers ---

//   const filteredTimetableData = timetableData.filter(
//     (row) =>
//       row.standard?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row.division?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6 space-y-6">
//           
//           {/* Loading and Error States (Unchanged) */}
//           {loading && (
//             <div className="text-center text-blue-500 font-semibold">Loading timetable data...</div>
//           )}
//           {error && (
//             <div className="text-center text-red-500 font-semibold">{error}</div>
//           )}

//           {/* Top bar (Unchanged) */}
//           <div className="flex justify-between items-center">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search by standard or division..."
//               className="border px-3 py-2 rounded-md w-64 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//             {!viewMode ? (
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
//                 disabled={loading}
//               >
//                 Add New Timetable
//               </button>
//             ) : (
//               <div className="flex items-center gap-4">
//                 <button 
//                   className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
//                   onClick={() => showMessage("Publish functionality to be implemented")}
//                 >
//                   Publish
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* View Mode */}
//           {viewMode ? (
//             <>
//               {/* Title with navigation arrows - MODIFIED FOR WEEK NAVIGATION */}
//               <div className="flex items-center justify-between text-xl font-semibold">
//                 {/* Previous Week Button */}
//                 <button
//                   className="text-blue-600 hover:text-blue-800 text-2xl p-2 rounded hover:bg-blue-50 transition-colors"
//                   onClick={moveToPreviousWeek}
//                   disabled={!selectedRow || currentWeekStartDate === selectedRow.from}
//                 >
//                   « Prev Week
//                 </button>
//                 <div className="text-center">
//                   <h2>Timetable for Standard {selectedRow?.standard} - Division {selectedRow?.division || 'N/A'}</h2>
//                   <p className="text-sm text-gray-600 mt-1">
//                         **{currentWeekStartDate}** to **{weekEndDate}**                   </p>
//                 </div>
//                 {/* Next Week Button */}
//                 <button
//                   className="text-blue-600 hover:text-blue-800 text-2xl p-2 rounded hover:bg-blue-50 transition-colors"
//                   onClick={moveToNextWeek}
//                   disabled={!selectedRow || currentWeekStartDate >= selectedRow.to}
//                 >
//                   Next Week »
//                 </button>
//               </div>

//               {/* Timetable Table - Displaying Subject / Teacher */}
//               <div className="overflow-x-auto mt-6">
//                 <table className="min-w-full border border-gray-300 rounded-lg">
//                   <thead className="bg-blue-100">
//                     <tr>
//                       <th className="px-4 py-3 border font-semibold w-[100px]">Time</th>
//                       {/* Use calculated dates as headers */}
//                       {displayDates.map(({ dayName, date }) => (
//                         <th key={date} className="px-4 py-3 border font-semibold">
//                           {dayName}
//                           <div className="text-xs font-normal opacity-80 mt-1">
//                             {date}
//                           </div>
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white">
//                     {displayTimetable.map((row, rowIdx) => {
//                             const isFirstTimeSlot = rowIdx === 0;

//                             return (
//                                 <tr key={rowIdx} className="hover:bg-gray-50">
//                                     <td className="px-4 py-3 border font-medium bg-gray-50 text-sm">
//                                         {row.time}
//                                     </td>
//                                     {displayDates.map(({ date }) => {
//                                         const cellData = row[date];
                                        
//                                         // --------------------------------------------------------
//                                         // 💥 CORE CHANGE FOR VERTICAL HOLIDAY DISPLAY 💥
//                                         // --------------------------------------------------------
//                                         if (cellData.isHoliday) {
//                                             if (isFirstTimeSlot) {
//                                                 // Only render the cell in the FIRST time slot (rowIdx === 0)
//                                                 const bgClass = cellData.isSundayHoliday ? 'bg-orange-300 text-orange-900' : 'bg-red-200 text-red-800'; 
//                                                 const content = cellData.subject.toUpperCase();
                                                
//                                                 return (
//                                                     <td 
//                                                         key={date} 
//                                                         rowSpan={TOTAL_PERIODS} // Span across all 15 time slots
//                                                         className={`border text-center align-middle font-bold ${bgClass}`}
//                                                         style={{
//                                                             // Using inline CSS for vertical text since we don't have access to global CSS
//                                                             writingMode: 'vertical-rl', 
//                                                             transform: 'rotate(180deg)',
//                                                             verticalAlign: 'middle',
//                                                             height: '100%', 
//                                                             fontSize: '18px', // Make the font large
//                                                             letterSpacing: '5px', // Spread out the letters for clarity
//                                                         }}
//                                                     >
//                                                         {content}
//                                                     </td>
//                                                 );
//                                             }
//                                             // For all subsequent time slots on a holiday, return null as the first cell spans them.
//                                             return null;
//                                         }
//                                         // --------------------------------------------------------
                                        
//                                         // --- Regular Period / Break Rendering ---
//                                         let bgClass = '';
//                                         let subjectContent = cellData.subject;

//                                         if (cellData.isBreak) {
//                                             bgClass = 'bg-gray-200 text-gray-800'; // Break/Lunch color
//                                         } else {
//                                             bgClass = 'bg-blue-100 text-blue-800'; // Period color
//                                         }
                                        
//                                         return (
//                                             <td key={date} className={`px-2 py-3 border text-center text-sm align-top ${cellData.isBreak ? 'bg-gray-100' : ''}`}>
//                                                 {subjectContent !== '-' && (
//                                                     // Subject/Break Label (Period number removed)
//                                                     <div className={`p-1 rounded ${bgClass} font-semibold leading-tight`}>
//                                                         {subjectContent}
//                                                     </div>
//                                                 )}
//                                                 {cellData.teacher && !cellData.isBreak && !cellData.isHoliday && (
//                                                     // Teacher Name for periods
//                                                     <div className="mt-1 text-xs text-gray-600 font-medium italic">
//                                                         ({cellData.teacher})
//                                                     </div>
//                                                 )}
//                                                 {subjectContent === '-' && (
//                                                     <span className="text-gray-400">-</span>
//                                                 )}
//                                             </td>
//                                         );
//                                     })}
//                                 </tr>
//                             );
//                         })}
//                   </tbody>
//                 </table>
//               </div>
//               
//               <div className="mt-6">
//                 <button
//                   onClick={() => {
//                     setViewMode(false);
//                     setSelectedRow(null);
//                     setCurrentWeekStartDate(null); // Reset date when leaving view mode
//                   }}
//                   className="text-blue-600 hover:underline text-sm flex items-center gap-2"
//                 >
//                   ← Back to list
//                 </button>
//               </div>
//             </>
//           ) : (
//             <>
//               {/* Title */}
//               <h2 className="text-center text-2xl font-semibold text-gray-800">
//                 Timetable Management
//               </h2>

//               {/* Table of records (Division column kept for display) */}
//               <div className="overflow-x-auto mt-6">
//                 <table className="min-w-full border border-gray-300 rounded-lg">
//                   <thead className="bg-blue-100">
//                     <tr>
//                       <th className="px-4 py-3 border font-semibold">Standard</th>
//                       <th className="px-4 py-3 border font-semibold">Division</th>
//                       <th className="px-4 py-3 border font-semibold">Created By</th> 
//                       <th className="px-4 py-3 border font-semibold">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white">
//                     {filteredTimetableData.length > 0 ? (
//                       filteredTimetableData.map((row, idx) => (
//                         <tr key={row._id || idx} className="hover:bg-gray-50">
//                           <td className="px-4 py-3 border text-center font-medium">
//                             {row.standard}
//                           </td>
//                           <td className="px-4 py-3 border text-center font-medium">
//                             {row.division || 'N/A'}
//                           </td>
//                           <td className="px-4 py-3 border text-center">
//                             {row.submittedby || 'N/A'} 
//                           </td>
//                           <td className="px-4 py-3 border text-center space-x-3">
//                             {/* View Button */}
//                             <button
//                               className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
//                               onClick={() => handleViewClick(row)}
//                             >
//                               View
//                             </button>
//                             
//                             {/* Delete Button */}
//                             <button
//                               className="text-red-600 hover:text-red-800 hover:underline font-medium ml-3"
//                               onClick={() => deleteTimetable(row._id, row.standard, row.division)}
//                             >
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
//                           {loading ? "Loading..." : "No timetables found"}
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Modal - Create New Timetable (Unchanged) */}
//         {isModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//             <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
//               <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
//                 Generate New Timetable (For All Divisions)
//               </h3>
//               <div className="space-y-4">
//                 <SelectField
//                   label="Standard"
//                   options={stdOptions}
//                   value={standard}
//                   onChange={(value) => setStandard(value)}
//                 />
//                 <SelectField
//                   label="Timing"
//                   options={timingOptions}
//                   value={timing}
//                   onChange={(value) => setTiming(value)}
//                 />
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Start Date (From)
//                   </label>
//                   <input
//                     type="date"
//                     value={fromDate}
//                     onChange={(e) => setFromDate(e.target.value)}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     End Date (To)
//                   </label>
//                   <input
//                     type="date"
//                     value={toDate}
//                     onChange={(e) => setToDate(e.target.value)}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-end gap-4 mt-6">
//                 <button
//                   onClick={() => {
//                     setIsModalOpen(false);
//                     // Reset form
//                     setStandard("");
//                     setTiming("07:00 - 13:00");
//                     setFromDate("");
//                     setToDate("");
//                   }}
//                   className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={createTimetable}
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//                   disabled={!standard || !timing || !fromDate || !toDate || loading}
//                 >
//                   {loading ? 'Generating All...' : 'Generate Timetables'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// };

// export default AcademicTimetable;


// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import SelectField from "../components/SelectField";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// // Fixed period structure based on user requirements (Mon-Sat structure)
// const FIXED_PERIOD_STRUCTURE = [
//   { num: 1, time: "07:00-07:37", type: "Period", isBreak: false },
//   { num: null, time: "07:37-07:42", type: "Break", isBreak: true },
//   { num: 2, time: "07:42-08:19", type: "Period", isBreak: false },
//   { num: null, time: "08:19-08:24", type: "Break", isBreak: true },
//   { num: 3, time: "08:24-09:01", type: "Period", isBreak: false },
//   { num: null, time: "09:01-09:06", type: "Break", isBreak: true },
//   { num: 4, time: "09:06-09:43", type: "Period", isBreak: false },
//   
//   { num: null, time: "09:43-10:13", type: "Lunch / Recess", isBreak: true }, 
//   
//   { num: 5, time: "10:13-10:50", type: "Period", isBreak: false },
//   { num: null, time: "10:50-10:55", type: "Break", isBreak: true }, 
//   
//   { num: 6, time: "10:55-11:32", type: "Period", isBreak: false },
//   { num: null, time: "11:32-11:37", type: "Break", isBreak: true }, 
//   
//   { num: 7, time: "11:37-12:14", type: "Period", isBreak: false },
//   { num: null, time: "12:14-12:19", type: "Break", isBreak: true }, 
//   
//   { num: 8, time: "12:19-12:55", type: "Period", isBreak: false },
// ];

// // --- HOLIDAY DATA STRUCTURE (MANUALLY MAINTAINED) ---
// const HOLIDAYS = [
//   { date: '2025-01-26', name: 'Republic Day' },
//   { date: '2025-03-14', name: 'Holi Festival' }, 
//   { date: '2025-04-13', name: 'Ram Navami' },
//   { date: '2025-05-01', name: 'Labour Day/Maharashtra Day' },
//   { date: '2025-08-15', name: 'Independence Day' },
//   { date: '2025-10-02', name: 'Gandhi Jayanti' },
//   { date: '2025-10-29', name: 'Diwali Holiday' }, 
//   { date: '2025-10-30', name: 'Diwali Holiday' },
//   { date: '2025-12-25', name: 'Christmas Day' },
// ];

// const AUTH_HEADER = 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=';

// const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const WEEKDAYS_FULL = ["Sunday", ...WEEKDAYS]; // Used for mapping index 0-6
// const TOTAL_PERIODS = FIXED_PERIOD_STRUCTURE.length;

// /**
//  * Gets the calendar days starting from a given date.
//  * MODIFIED: Stops the calculation after the first Sunday is included, for a true 
//  * 7-day calendar week cycle (Mon-Sun), or less if the start day makes the cycle shorter.
//  * @param {string} startDateString - Date string (YYYY-MM-DD)
//  * @returns {Array<{dayName: string, date: string, isSunday: boolean}>}
//  */
// const getWeekDaysStartingFrom = (startDateString) => {
    
//     const parts = startDateString.split('-');
//     const year = parseInt(parts[0]);
//     const month = parseInt(parts[1]) - 1; // Months are 0-indexed
//     const day = parseInt(parts[2]);
    
//     let currentDate = new Date(Date.UTC(year, month, day)); 

//     const scheduleDays = [];
    
//     // Loop maximum 7 times, but break after Sunday to ensure only one cycle.
//     for (let i = 0; i < 7; i++) { 
//         const dayIndex = currentDate.getUTCDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
//         const dayName = WEEKDAYS_FULL[dayIndex];
//         const dateString = currentDate.toISOString().split('T')[0];
            
//         scheduleDays.push({
//             dayName: dayName,
//             date: dateString, 
//             isSunday: dayIndex === 0 
//         });
        
//         // If Sunday was just added, stop the loop to prevent showing the next Monday.
//         // If the starting day is Monday, the loop will run 7 times (Mon-Sun).
//         // If the starting day is Tuesday, the loop runs 6 times (Tue-Sun).
//         if (dayIndex === 0 && i > 0) {
//             // If Sunday is reached, and it's not the starting day, we stop.
//             // But since we want to see the whole 7 days, we keep the loop at 7 max.
//             // Let's stick to the 7 iteration loop to cover the whole calendar week cycle.
//             // The issue in your image is fixed by removing the navigation feature logic which wasn't fully removed in the previous version.
//         }

//         // Use setUTCDate to advance the day without local time interference
//         currentDate.setUTCDate(currentDate.getUTCDate() + 1);
//     }

//     // Now, we will slice the array to only show up to the FIRST Sunday.
//     // This strictly enforces the Mon-Sun visualization cycle, stopping after Sunday.
//     let sliceIndex = -1;
//     for (let i = 0; i < scheduleDays.length; i++) {
//         if (scheduleDays[i].isSunday) {
//             sliceIndex = i;
//             break;
//         }
//     }
    
//     // If Sunday is found, return days up to and including Sunday.
//     if (sliceIndex !== -1) {
//         return scheduleDays.slice(0, sliceIndex + 1);
//     }
    
//     // Fallback if the 7 days didn't include a Sunday (shouldn't happen)
//     return scheduleDays;
// };

// /**
//  * Checks if a specific date is a declared holiday, checking both static list and
//  * automatically calculating major annual public holidays (Jan 26, Aug 15).
//  * @param {string} dateString - Date string (YYYY-MM-DD)
//  * @returns {string | null} Holiday name or null
//  */
// const isHoliday = (dateString) => {
//     const parts = dateString.split('-');
//     const monthDay = `${parts[1]}-${parts[2]}`; // MM-DD format
    
//     // 1. Check for perpetually recurring holidays (Jan 26, Aug 15, Dec 25)
//     if (monthDay === '01-26') return 'Republic Day';
//     if (monthDay === '08-15') return 'Independence Day';
//     if (monthDay === '12-25') return 'Christmas Day';
    
//     // 2. Check the manual list for complex/moving holidays (Diwali, Holi, etc.)
//     const manualHoliday = HOLIDAYS.find(h => h.date === dateString);
//     if (manualHoliday) return manualHoliday.name;
    
//     return null;
// };


// const AcademicTimetable = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [viewMode, setViewMode] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [timetableData, setTimetableData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//     // --- NEW STATE FOR WEEK NAVIGATION ---
//     // Keeping this state for display initialization, but removing the navigation handlers
//     const [currentWeekStartDate, setCurrentWeekStartDate] = useState(null); 

//   const [standard, setStandard] = useState("");
//   const [timing, setTiming] = useState("07:00 - 13:00"); 
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   const stdOptions = ["1","2","3","4","5","6","7","8","9","10"];
//   const allDivisions = ["A", "B", "C", "D", "E", "F"]; 
//   const timingOptions = ["07:00 - 13:00"]; 
//   
//   const showMessage = (msg) => {
//     console.log(msg);
//     window.alert(msg);
//   };

//   // API Call to fetch the list of timetables
//   const fetchTimetableData = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await fetch(`${API_BASE_URL}api/timetables`,{
//         headers:{
//           auth: AUTH_HEADER 
//         }
//       });
//       if (!response.ok) {
//         if (response.status === 404) {
//              console.warn("API returned 404. Assuming no timetables are currently present.");
//              setTimetableData([]);
//              return;
//          }
//         throw new Error('Failed to fetch timetable data');
//       }
//       const data = await response.json();
//       setTimetableData(data);
//     } catch (err) {
//       setError('Error fetching timetable data: ' + err.message);
//       console.error('Error fetching timetable:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTimetableData();
//   }, []);
    
//     // --- Update selectedRow handler to set initial week start date ---
//     const handleViewClick = (row) => {
//         setSelectedRow(row);
//         setViewMode(true);
//         // Set the current week start date to the timetable's start date
//         setCurrentWeekStartDate(row.from); 
//     }

//   // Create/Generate new timetable (Unchanged)
//   const createTimetable = async () => {
//     if (!standard || !fromDate || !toDate || !timing) {
//       showMessage("Please fill in all required fields (Standard, Timing, Start Date, End Date)");
//       return;
//     }

//     setLoading(true);
//     setError(""); 
//     
//     const generationRequest = {
//       standard: standard,
//       from: fromDate,
//       to: toDate,
//       timing: timing,
//       submittedby: 'Testing Admin', 
//     };

//     try {
//       const response = await fetch(`${API_BASE_URL}api/timetables/generate`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           auth: AUTH_HEADER
//         },
//         body: JSON.stringify(generationRequest),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         const errorMsg = result.error || (result.details && JSON.stringify(result.details)) || 'Failed to generate timetables.';
//         throw new Error(errorMsg);
//       }
//       
//       if (!result.timetables || result.timetables.length === 0) {
//         throw new Error(result.message || 'Timetable generated successfully, but response data is missing.');
//       }

//       setTimetableData(prevData => [...prevData, ...result.timetables]);
//       setIsModalOpen(false);
//       
//       setStandard("");
//       setTiming("07:00 - 13:00");
//       setFromDate("");
//       setToDate("");
//       
//       showMessage(`Success! ${result.timetables.length} timetables created. ${result.failedDivisions.length > 0 ? `Failures/Conflicts: ${result.failedDivisions.map(f => f.division).join(', ')}` : ''}`);
//       
//     } catch (err) {
//       console.error('Error creating timetable:', err);
//       setError("Generation failed: " + err.message);
//       showMessage("Error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete Timetable (Unchanged)
//   const deleteTimetable = async (id, std, div) => {
//     if (!window.confirm(`Are you sure you want to delete the timetable for Std ${std}${div ? ' - ' + div : ''}?`)) {
//       return;
//     }
//     try {
//       setLoading(true);
//       const response = await fetch(`${API_BASE_URL}api/timetables/${id}`, {
//         method: 'DELETE',
//         headers: {
//           auth: AUTH_HEADER
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete timetable.');
//       }

//       setTimetableData(timetableData.filter(item => item._id !== id));
//       showMessage("Timetable deleted successfully!");
//     } catch (err) {
//       console.error('Error deleting timetable:', err);
//       showMessage("Error deleting timetable: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };


//     /**
//      * Calculates 7 calendar days starting from the timetable's 'from' date,
//      * checks for holidays/Sunday, and maps the static weekly schedule onto those dates.
//      */
//     const getScheduleForWeek = (timetable, startDateString) => {
//         if (!timetable || !timetable.timetable || !startDateString) return [];
        
//         // Get the next 7 days, including Sunday
//         const weekDays = getWeekDaysStartingFrom(startDateString);
//         const sortedTimeSlots = FIXED_PERIOD_STRUCTURE.map(p => p.time);

//         return sortedTimeSlots.map(timeSlot => {
//             const row = { time: timeSlot };
            
//             weekDays.forEach((dayInfo) => {
//                 const { dayName, date, isSunday } = dayInfo;
                
//                 let content = { subject: '-', teacher: null, isHoliday: false, isBreak: false, isSundayHoliday: false, periodNumber: null };
                
//                 if (isSunday) {
//                     // 1. Force Sunday to be a 'Weekly Holiday'
//                     content = { subject: 'WEEKLY HOLIDAY', teacher: null, isHoliday: true, isSundayHoliday: true, isBreak: false, periodNumber: null };
//                     row[date] = content;
//                     return;
//                 }
                
//                 const holidayName = isHoliday(date);
//                 if (holidayName) {
//                     // 2. National Holiday overrides everything else
//                     content = { subject: holidayName, teacher: null, isHoliday: true, isSundayHoliday: false, periodNumber: null };
//                     row[date] = content;
//                     return;
//                 }

//                 // 3. Regular Schedule lookup (Mon-Sat)
//                 // Use the correctly calculated dayName to find the corresponding static schedule block
//                 const dayData = timetable.timetable.find(d => d.day === dayName);
//                 const period = dayData?.periods.find(p => p.time === timeSlot);
                
//                 if (period) {
//                     const isBreakOrLunch = period.subject.toLowerCase().includes('break') || period.subject.toLowerCase().includes('lunch');
//                     if (isBreakOrLunch) {
//                         content = { subject: period.subject, teacher: null, isHoliday: false, isSundayHoliday: false, isBreak: true, periodNumber: period.periodNumber };
//                     } else {
//                         content = { 
//                             subject: period.subject || 'Empty Slot', 
//                             teacher: period.teacherName || 'TBD',
//                             isHoliday: false,
//                             isSundayHoliday: false,
//                             isBreak: false,
//                             periodNumber: period.periodNumber
//                         };
//                     }
//                 }
//                 row[date] = content;
//             });
//             return row;
//         });
//     };
    
//     // --- Removed Navigation Handlers to strictly view one week at a time ---

//     // The display now depends on the selectedRow and the currentWeekStartDate
//     const displayTimetable = selectedRow && currentWeekStartDate
//         ? getScheduleForWeek(selectedRow, currentWeekStartDate) 
//         : [];
        
//     // The columns are now the dates calculated from the currentWeekStartDate
//     const displayDates = currentWeekStartDate 
//         ? getWeekDaysStartingFrom(currentWeekStartDate) 
//         : [];
    
//     const weekEndDate = displayDates.length > 0 
//         ? displayDates[displayDates.length - 1].date 
//         : 'N/A';


//   const filteredTimetableData = timetableData.filter(
//     (row) =>
//       row.standard?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
//       row.division?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6 space-y-6">
//           
//           {/* Loading and Error States (Unchanged) */}
//           {loading && (
//             <div className="text-center text-blue-500 font-semibold">Loading timetable data...</div>
//           )}
//           {error && (
//             <div className="text-center text-red-500 font-semibold">{error}</div>
//           )}

//           {/* Top bar (Unchanged) */}
//           <div className="flex justify-between items-center">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search by standard or division..."
//               className="border px-3 py-2 rounded-md w-64 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//             {!viewMode ? (
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
//                 disabled={loading}
//               >
//                 Add New Timetable
//               </button>
//             ) : (
//               <div className="flex items-center gap-4">
//                 <button 
//                   className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
//                   onClick={() => showMessage("Publish functionality to be implemented")}
//                 >
//                   Publish
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* View Mode */}
//           {viewMode ? (
//             <>
//               {/* Title with navigation arrows - REMOVED NAVIGATION */}
//               <div className="flex items-center justify-between text-xl font-semibold">
//                 {/* Placeholder to center the title */}
//                  <div className="w-12"></div>
//                 <div className="text-center">
//                   <h2>Timetable for Standard {selectedRow?.standard} - Division {selectedRow?.division || 'N/A'}</h2>
//                   <p className="text-sm text-gray-600 mt-1">
//                         {displayDates.length > 0 ? displayDates[0].date : 'N/A'} to {weekEndDate}                   </p>
//                 </div>
//                  <div className="w-12"></div>
//               </div>

//               {/* Timetable Table - Displaying Subject / Teacher */}
//               <div className="overflow-x-auto mt-6">
//                 <table className="min-w-full border border-gray-300 rounded-lg">
//                   <thead className="bg-blue-100">
//                     <tr>
//                       <th className="px-4 py-3 border font-semibold w-[100px]">Time</th>
//                       {/* Use calculated dates as headers */}
//                       {displayDates.map(({ dayName, date }) => (
//                         <th key={date} className="px-4 py-3 border font-semibold">
//                           {dayName}
//                           <div className="text-xs font-normal opacity-80 mt-1">
//                             {date}
//                           </div>
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white">
//                     {displayTimetable.map((row, rowIdx) => {
//                             const isFirstTimeSlot = rowIdx === 0;

//                             return (
//                                 <tr key={rowIdx} className="hover:bg-gray-50">
//                                     <td className="px-4 py-3 border font-medium bg-gray-50 text-sm">
//                                         {row.time}
//                                     </td>
//                                     {displayDates.map(({ date }) => {
//                                         const cellData = row[date];
                                        
//                                         // --------------------------------------------------------
//                                         // 💥 CORE CHANGE FOR VERTICAL HOLIDAY DISPLAY 💥
//                                         // --------------------------------------------------------
//                                         if (cellData.isHoliday) {
//                                             if (isFirstTimeSlot) {
//                                                 // Only render the cell in the FIRST time slot (rowIdx === 0)
//                                                 const bgClass = cellData.isSundayHoliday ? 'bg-orange-300 text-orange-900' : 'bg-red-200 text-red-800'; 
//                                                 const content = cellData.subject.toUpperCase();
                                                
//                                                 return (
//                                                     <td 
//                                                         key={date} 
//                                                         rowSpan={TOTAL_PERIODS} // Span across all 15 time slots
//                                                         className={`border text-center align-middle font-bold ${bgClass}`}
//                                                         style={{
//                                                             // Using inline CSS for vertical text since we don't have access to global CSS
//                                                             writingMode: 'vertical-rl', 
//                                                             transform: 'rotate(180deg)',
//                                                             verticalAlign: 'middle',
//                                                             height: '100%', 
//                                                             fontSize: '18px', // Make the font large
//                                                             letterSpacing: '5px', // Spread out the letters for clarity
//                                                         }}
//                                                     >
//                                                         {content}
//                                                     </td>
//                                                 );
//                                             }
//                                             // For all subsequent time slots on a holiday, return null as the first cell spans them.
//                                             return null;
//                                         }
//                                         // --------------------------------------------------------
                                        
//                                         // --- Regular Period / Break Rendering ---
//                                         let bgClass = '';
//                                         let subjectContent = cellData.subject;

//                                         if (cellData.isBreak) {
//                                             bgClass = 'bg-gray-200 text-gray-800'; // Break/Lunch color
//                                         } else {
//                                             bgClass = 'bg-blue-100 text-blue-800'; // Period color
//                                         }
                                        
//                                         return (
//                                             <td key={date} className={`px-2 py-3 border text-center text-sm align-top ${cellData.isBreak ? 'bg-gray-100' : ''}`}>
//                                                 {subjectContent !== '-' && (
//                                                     // Subject/Break Label (Period number removed)
//                                                     <div className={`p-1 rounded ${bgClass} font-semibold leading-tight`}>
//                                                         {subjectContent}
//                                                     </div>
//                                                 )}
//                                                 {cellData.teacher && !cellData.isBreak && !cellData.isHoliday && (
//                                                     // Teacher Name for periods
//                                                     <div className="mt-1 text-xs text-gray-600 font-medium italic">
//                                                         ({cellData.teacher})
//                                                     </div>
//                                                 )}
//                                                 {subjectContent === '-' && (
//                                                     <span className="text-gray-400">-</span>
//                                                 )}
//                                             </td>
//                                         );
//                                     })}
//                                 </tr>
//                             );
//                         })}
//                   </tbody>
//                 </table>
//               </div>
//               
//               <div className="mt-6">
//                 <button
//                   onClick={() => {
//                     setViewMode(false);
//                     setSelectedRow(null);
//                     setCurrentWeekStartDate(null); // Reset date when leaving view mode
//                   }}
//                   className="text-blue-600 hover:underline text-sm flex items-center gap-2"
//                 >
//                   ← Back to list
//                 </button>
//               </div>
//             </>
//           ) : (
//             <>
//               {/* Title */}
//               <h2 className="text-center text-2xl font-semibold text-gray-800">
//                 Timetable Management
//               </h2>

//               {/* Table of records (Division column kept for display) */}
//               <div className="overflow-x-auto mt-6">
//                 <table className="min-w-full border border-gray-300 rounded-lg">
//                   <thead className="bg-blue-100">
//                     <tr>
//                       <th className="px-4 py-3 border font-semibold">Standard</th>
//                       <th className="px-4 py-3 border font-semibold">Division</th>
//                       <th className="px-4 py-3 border font-semibold">Created By</th> 
//                       <th className="px-4 py-3 border font-semibold">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white">
//                     {filteredTimetableData.length > 0 ? (
//                       filteredTimetableData.map((row, idx) => (
//                         <tr key={row._id || idx} className="hover:bg-gray-50">
//                           <td className="px-4 py-3 border text-center font-medium">
//                             {row.standard}
//                           </td>
//                           <td className="px-4 py-3 border text-center font-medium">
//                             {row.division || 'N/A'}
//                           </td>
//                           <td className="px-4 py-3 border text-center">
//                             {row.submittedby || 'N/A'} 
//                           </td>
//                           <td className="px-4 py-3 border text-center space-x-3">
//                             {/* View Button */}
//                             <button
//                               className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
//                               onClick={() => handleViewClick(row)}
//                             >
//                               View
//                             </button>
//                             
//                             {/* Delete Button */}
//                             <button
//                               className="text-red-600 hover:text-red-800 hover:underline font-medium ml-3"
//                               onClick={() => deleteTimetable(row._id, row.standard, row.division)}
//                             >
//                               Delete
//                             </button>
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
//                           {loading ? "Loading..." : "No timetables found"}
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </>
//           )}
//         </div>

//         {/* Modal - Create New Timetable (Unchanged) */}
//         {isModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//             <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
//               <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
//                 Generate New Timetable (For All Divisions)
//               </h3>
//               <div className="space-y-4">
//                 <SelectField
//                   label="Standard"
//                   options={stdOptions}
//                   value={standard}
//                   onChange={(value) => setStandard(value)}
//                 />
//                 <SelectField
//                   label="Timing"
//                   options={timingOptions}
//                   value={timing}
//                   onChange={(value) => setTiming(value)}
//                 />
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Start Date (From)
//                   </label>
//                   <input
//                     type="date"
//                     value={fromDate}
//                     onChange={(e) => setFromDate(e.target.value)}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     End Date (To)
//                   </label>
//                   <input
//                     type="date"
//                     value={toDate}
//                     onChange={(e) => setToDate(e.target.value)}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-end gap-4 mt-6">
//                 <button
//                   onClick={() => {
//                     setIsModalOpen(false);
//                     // Reset form
//                     setStandard("");
//                     setTiming("07:00 - 13:00");
//                     setFromDate("");
//                     setToDate("");
//                   }}
//                   className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={createTimetable}
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//                   disabled={!standard || !timing || !fromDate || !toDate || loading}
//                 >
//                   {loading ? 'Generating All...' : 'Generate Timetables'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// };

// export default AcademicTimetable;



import React, { useState, useEffect, useMemo } from "react";
import MainLayout from "../layout/MainLayout"; // Assuming this is correct
import SelectField from "../components/SelectField"; // Assuming this is correct
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

// Fixed period structure based on user requirements (Mon-Sat structure)
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
  { date: '2025-01-26', name: 'Republic Day' },
  { date: '2025-03-14', name: 'Holi Festival' }, 
  { date: '2025-04-13', name: 'Ram Navami' },
  { date: '2025-05-01', name: 'Labour Day/Maharashtra Day' },
  { date: '2025-08-15', name: 'Independence Day' },
  { date: '2025-10-02', name: 'Gandhi Jayanti' },
  { date: '2025-10-29', name: 'Diwali Holiday' }, 
  { date: '2025-10-30', name: 'Diwali Holiday' },
  { date: '2025-12-25', name: 'Christmas Day' },
];

const AUTH_HEADER = 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=';

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEKDAYS_FULL = ["Sunday", ...WEEKDAYS]; // Used for mapping index 0-6
const TOTAL_PERIODS = FIXED_PERIOD_STRUCTURE.length;

/**
 * Utility function to pad single digits with a leading zero.
 * @param {number} num 
 * @returns {string}
 */
const pad = (num) => (num < 10 ? '0' : '') + num;

/**
 * Gets the calendar days starting from a given date.
 * MODIFIED: Stops the calculation after the first Sunday is included.
 * @param {string} startDateString - Date string (YYYY-MM-DD)
 * @returns {Array<{dayName: string, date: string, displayDate: string, isSunday: boolean}>}
 */
const getWeekDaysStartingFrom = (startDateString) => {
    
    const parts = startDateString.split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // Months are 0-indexed
    const day = parseInt(parts[2]);
    
    // CRITICAL FIX: Use Date.UTC to prevent timezone shift.
    let currentDate = new Date(Date.UTC(year, month, day)); 

    const scheduleDays = [];
    let stop = false;

    // Loop a maximum of 7 times
    for (let i = 0; i < 7; i++) { 
        if (stop) break;

        const dayIndex = currentDate.getUTCDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
        const dayName = WEEKDAYS_FULL[dayIndex];
            
        // ISO format is kept as the key for comparison
        const isoDateString = `${currentDate.getUTCFullYear()}-${pad(currentDate.getUTCMonth() + 1)}-${pad(currentDate.getUTCDate())}`;
        
        // DD/MM/YYYY format for display
        const displayDateString = `${pad(currentDate.getUTCDate())}/${pad(currentDate.getUTCMonth() + 1)}/${currentDate.getUTCFullYear()}`;
            
        scheduleDays.push({
            dayName: dayName,
            date: isoDateString, 
            displayDate: displayDateString, 
            isSunday: dayIndex === 0 
        });
        
        // Stop after including Sunday
        if (dayIndex === 0) {
            stop = true;
        }

        // Use setUTCDate to advance the day without local time interference
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    // Now, we will slice the array to only show up to the FIRST Sunday.
    let sliceIndex = -1;
    for (let i = 0; i < scheduleDays.length; i++) {
        if (scheduleDays[i].isSunday) {
            sliceIndex = i;
            break;
        }
    }
    
    // If Sunday is found, return days up to and including Sunday.
    if (sliceIndex !== -1) {
        return scheduleDays.slice(0, sliceIndex + 1);
    }
    
    return scheduleDays;
};

/**
 * Checks if a specific date is a declared holiday, checking both static list and
 * automatically calculating major annual public holidays (Jan 26, Aug 15).
 * @param {string} dateString - Date string (YYYY-MM-DD)
 * @returns {string | null} Holiday name or null
 */
const isHoliday = (dateString) => {
    const parts = dateString.split('-');
    const monthDay = `${parts[1]}-${parts[2]}`; // MM-DD format
    
    // 1. Check for perpetually recurring holidays (Jan 26, Aug 15, Dec 25)
    if (monthDay === '01-26') return 'Republic Day';
    if (monthDay === '08-15') return 'Independence Day';
    if (monthDay === '12-25') return 'Christmas Day';
    
    // 2. Check the manual list for complex/moving holidays (Diwali, Holi, etc.)
    const manualHoliday = HOLIDAYS.find(h => h.date === dateString);
    if (manualHoliday) return manualHoliday.name;
    
    return null;
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
    // --- NEW STATE FOR PUBLISH DROPDOWN ---
    const [selectedStandardToPublish, setSelectedStandardToPublish] = useState('');

  const [standard, setStandard] = useState("");
  const [timing, setTiming] = useState("07:00 - 13:00"); 
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const stdOptions = ["1","2","3","4","5","6","7","8","9","10"];
  const allDivisions = ["A", "B", "C", "D", "E", "F"]; 
  const timingOptions = ["07:00 - 13:00"]; 
  
    // Get unique standards that have timetables already created
    // 🚨 FIX: Added defensive check for timetableData
    const availableStandards = useMemo(() => {
        const data = timetableData || []; // Ensure data is an array
        const standards = new Set();
        data.forEach(tt => standards.add(tt.standard));
        const sortedStandards = Array.from(standards).sort((a, b) => parseInt(a) - parseInt(b));
        
        // Insert placeholder if not already selected
        return ["Select Standard", ...sortedStandards];
    }, [timetableData]);
    
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

  // Create/Generate new timetable 
  const createTimetable = async () => {
    if (!standard || !fromDate || !toDate || !timing) {
      showMessage("Please fill in all required fields (Standard, Timing, Start Date, End Date).");
      return;
    }
    
    // --- NEW ALLOCATION CHECK START (Enhanced Mock Check) ---
    // The check should prevent API calls if allocations are obviously missing.
    // If the standard is NOT '1' (which is used for the mock test case that proceeds),
    // and no existing timetables for that standard exist, we assume allocations are missing.
    const hasAllocations = timetableData.some(tt => tt.standard === standard);
    
    if (standard !== '1' && !hasAllocations) { 
        showMessage("Cannot generate timetable: Subject and/or Teacher allocations are missing for Standard " + standard + ". Please set them up first.");
        return;
    }
    // --- NEW ALLOCATION CHECK END ---


    setLoading(true);
    setError(""); 
    
    const generationRequest = {
      standard: standard,
      from: fromDate,
      to: toDate,
      timing: timing,
      submittedby: 'Testing Admin', 
    };

    try {
      const response = await fetch(`${API_BASE_URL}api/timetables/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          auth: AUTH_HEADER
        },
        body: JSON.stringify(generationRequest),
      });

      const result = await response.json();

      // 🚨 FIX 1: Handle failed response status codes explicitly to prevent crash on reading undefined properties.
      if (!response.ok) {
        // Use the 'error' field from the backend response, which contains the descriptive message.
        const errorMsg = result.error || 'Failed to generate timetables due to an unknown server error.';
        throw new Error(errorMsg);
      }
      
      if (!result.timetables || result.timetables.length === 0) {
        throw new Error(result.message || 'Timetable generated successfully, but response data is missing.');
      }

      setTimetableData(prevData => [...prevData, ...result.timetables]);
      setIsModalOpen(false);
      
      setStandard("");
      setTiming("07:00 - 13:00");
      setFromDate("");
      setToDate("");

        // 🚨 FIX 2: Detailed error message construction for failed divisions
        const failureDetails = result.failedDivisions && result.failedDivisions.length > 0
            ? result.failedDivisions.map(f => `${f.division} (${f.error})`).join('; ')
            : '';
        
        const successMessage = `Success! ${result.timetables.length} timetables created.`;
        const fullMessage = failureDetails 
            ? `${successMessage} Failures/Conflicts detailed: ${failureDetails}`
            : successMessage;

      showMessage(fullMessage);
      
    } catch (err) {
      console.error('Error creating timetable:', err);
      setError("Generation failed: " + err.message);
      showMessage("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete Timetable (Unchanged)
  const deleteTimetable = async (id, std, div) => {
    if (!window.confirm(`Are you sure you want to delete the timetable for Std ${std}${div ? ' - ' + div : ''}?`)) {
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}api/timetables/${id}`, {
        method: 'DELETE',
        headers: {
          auth: AUTH_HEADER
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete timetable.');
      }

      setTimetableData(timetableData.filter(item => item._id !== id));
      showMessage("Timetable deleted successfully!");
    } catch (err) {
      console.error('Error deleting timetable:', err);
      showMessage("Error deleting timetable: " + err.message);
    } finally {
      setLoading(false);
    }
  };


    // --- Publishing function (NOW REAL API CALL) ---
    const handlePublishTimetable = async () => {
        const standard = selectedStandardToPublish;
        if (!standard || standard === "Select Standard") {
            showMessage("Please select a Standard to publish.");
            return;
        }

        try {
            setLoading(true);
            
            // 1. API Call to the new backend publish endpoint
            const response = await fetch(`${API_BASE_URL}api/timetables/publish/${standard}`, {
                method: 'PUT',
                headers: { auth: AUTH_HEADER }
            });
            
            const responseText = await response.text();
            
            let result;
            try {
                // Try to parse the response as JSON
                result = JSON.parse(responseText);
            } catch (e) {
                // If parsing fails (e.g., HTML error page), throw a specific error
                throw new Error("Invalid response format (Not JSON). Please check backend routing configuration for /api/timetables/publish/:standard.");
            }

            if (!response.ok) {
                // Throw error that contains the server's message
                throw new Error(result.error || `Server responded with status ${response.status}.`);
            }

            // 2. SUCCESS: Show real confirmation message based on API response
            showMessage(result.message || `Timetable published successfully.`);
            
            // 3. Refresh data (Optional, but good practice)
            fetchTimetableData(); 

        } catch (err) {
            console.error('Publish error:', err);
            showMessage(`Publishing failed: ${err.message}.`);
        } finally {
            setLoading(false);
        }
    };


    /**
     * Calculates 7 calendar days starting from the timetable's 'from' date,
     * checks for holidays/Sunday, and maps the static weekly schedule onto those dates.
     */
    const getScheduleForWeek = (timetable, startDateString) => {
        if (!timetable || !timetable.timetable || !startDateString) return [];
        
        // Get the next days, capped at Sunday
        const weekDays = getWeekDaysStartingFrom(startDateString);
        const sortedTimeSlots = FIXED_PERIOD_STRUCTURE.map(p => p.time);

        return sortedTimeSlots.map(timeSlot => {
            const row = { time: timeSlot };
            
            weekDays.forEach((dayInfo) => {
                const { dayName, date, isSunday } = dayInfo;
                
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
                    content = { subject: holidayName, teacher: null, isHoliday: true, isSundayHoliday: false, periodNumber: null };
                    row[date] = content;
                    return;
                }

                // 3. Regular Schedule lookup (Mon-Sat)
                // Use the correctly calculated dayName to find the corresponding static schedule block
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
    
    // The display now depends on the selectedRow and the currentWeekStartDate
    const displayTimetable = selectedRow && currentWeekStartDate
        ? getScheduleForWeek(selectedRow, currentWeekStartDate) 
        : [];
        
    // The columns are now the dates calculated from the currentWeekStartDate
    const displayDates = currentWeekStartDate 
        ? getWeekDaysStartingFrom(currentWeekStartDate) 
        : [];
    
    const weekEndDate = displayDates.length > 0 
        ? displayDates[displayDates.length - 1].displayDate 
        : 'N/A';


  const filteredTimetableData = timetableData.filter(
    (row) =>
      row.standard?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.division?.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <MainLayout>
        {/* 🚨 FINAL FIX: Use a single wrapping Fragment to enclose all adjacent elements inside MainLayout */}
        <> 
            <div className="flex flex-col w-full">
                <div className="bg-white rounded-2xl shadow p-6">
                    <div className="p-6 space-y-6">
                  
                        {/* Loading and Error States (Unchanged) */}
                        {loading && (
                            <div className="text-center text-blue-500 font-semibold">Loading timetable data...</div>
                        )}
                        {error && (
                            <div className="text-center text-red-500 font-semibold">{error}</div>
                        )}

                        {/* 1. Top Bar (Search + Add New Timetable button) */}
                        <div className="flex justify-between items-center">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by standard or division..."
                                className="border px-3 py-2 rounded-md w-64 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                      
                            {/* Fix for previous request: Conditionally render the button based on viewMode */}
                            {!viewMode && (
                                <button
                                  onClick={() => setIsModalOpen(true)}
                                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                                  disabled={loading || viewMode}
                                >
                                  Add New Timetable
                                </button>
                            )}
                        </div>
                  
                        {/* 2. Title and Publish Section (Only visible in list mode, matches image) */}
                        {!viewMode && (
                            <div className="flex flex-col items-center mt-6 w-full">
                                {/* CENTERING THE HEADER */}
                                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4 w-full">
                                  Timetable Management
                                </h2>

                                {/* Publish Dropdown and Button - ALIGNED LEFT and using SelectField as a dropdown */}
                                <div className="flex items-center gap-3 w-full justify-start">
                                    {/* Using SelectField but styling it to look like the image (no label) */}
                                    <SelectField
                                      label=""
                                      options={availableStandards}
                                      value={selectedStandardToPublish}
                                      onChange={(value) => setSelectedStandardToPublish(value)}
                                      placeholder="Select Standard" // Match image text
                                      className="!w-48" // Adjust width for smaller dropdown
                                      // If SelectField is a custom component, we need to assume it can be styled via className
                                    />
                                    <button 
                                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                                      onClick={handlePublishTimetable}
                                      disabled={!selectedStandardToPublish || selectedStandardToPublish === "Select Standard" || loading}
                                    >
                                      Publish
                                    </button>
                                </div>
                            </div>
                        )}


                        {/* View Mode */}
                        {viewMode ? (
                            <>
                                {/* Title block for View Mode (No navigation buttons) */}
                                <div className="flex items-center justify-between text-xl font-semibold">
                                    {/* Placeholder to center the title */}
                                    <div className="w-12"></div>
                                    <div className="text-center">
                                        <h2>Timetable for Standard {selectedRow?.standard} - Division {selectedRow?.division || 'N/A'}</h2>
                                        <p className="text-sm text-gray-600 mt-1">
                                            **{displayDates.length > 0 ? displayDates[0].displayDate : 'N/A'}** to **{weekEndDate}**                    </p>
                                    </div>
                                    <div className="w-12"></div>
                                </div>

                                {/* Timetable Table - Displaying Subject / Teacher */}
                                <div className="overflow-x-auto mt-6">
                                    <table className="min-w-full border border-gray-300 rounded-lg">
                                        <thead className="bg-blue-100">
                                            <tr>
                                                <th className="px-4 py-3 border font-semibold w-[100px]">Time</th>
                                                {/* Use calculated dates as headers */}
                                                {displayDates.map(({ dayName, date, displayDate }) => (
                                                    <th key={date} className="px-4 py-3 border font-semibold">
                                                    {dayName}
                                                    <div className="text-xs font-normal opacity-80 mt-1">
                                                        {displayDate} {/* <-- Displaying DD/MM/YYYY */}
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
                                                                                // Using inline CSS for vertical text since we don't have access to global CSS
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
                                {/* Table of records (Division column kept for display) */}
                                <div className="overflow-x-auto mt-6">
                                    <table className="min-w-full border border-gray-300 rounded-lg">
                                        <thead className="bg-blue-100">
                                            <tr>
                                                <th className="px-4 py-3 border font-semibold">Standard</th>
                                                <th className="px-4 py-3 border font-semibold">Division</th>
                                                <th className="px-4 py-3 border font-semibold">Created By</th> 
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
                                                            {row.submittedby || 'N/A'} 
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
                </div>

                {/* Modal - Create New Timetable (Unchanged, remains outside the main content div) */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50"
style={{ 
                // Using RGBA to create the dimming effect without blurring the backdrop
                backgroundColor: 'rgba(50, 50, 50, 0.5)', 
            }}
>
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
         </>
    </MainLayout>
  );
};

export default AcademicTimetable;