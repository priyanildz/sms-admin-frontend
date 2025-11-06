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

const AcademicTimetable = () => {
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

  const stdOptions = ["1","2","3","4","5","6","7","8","9","10"];
  const divOptions = ["A", "B", "C", "D"];
  const timingOptions = ["08:00 - 12:40", "01:00 - 06:00"];
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Fetch timetable data from API
  const fetchTimetableData = async () => {
    setLoading(true);
    setError("");
    try {
      // FIX 1: Using imported API_BASE_URL
      const response = await fetch(`${API_BASE_URL}api/timetables`,{
        headers:{
          auth:'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
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
      timetable: weekdays.map(day => ({
        day: day,
        periods: [
          {
            periodNumber: 1,
            subject: "Maths",
            teacher: null,
            time: "09:00-09:30"
          },
          {
            periodNumber: 2,
            subject: "Science",
            teacher: null,
            time: "09:30-10:00"
          },
          {
            periodNumber: 3,
            subject: "English",
            teacher: null,
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
            teacher: null,
            time: "11:00-11:30"
          },
          {
            periodNumber: 6,
            subject: "EVS",
            teacher: null,
            time: "11:30-12:00"
          },
          {
            periodNumber: 7,
            subject: "PT",
            teacher: null,
            time: "12:00-12:40"
          }
        ]
      }))
    };

    try {
      // FIX 2: Using imported API_BASE_URL
      const response = await fetch(`${API_BASE_URL}api/timetables`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          auth:'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
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
    
    // Get all unique time slots (excluding breaks)
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    timetable.timetable.forEach(day => {
      day.periods.forEach(period => {
        if (period.subject !== "Break") {
          timeSlots.add(period.time);
        }
      });
    });

    const sortedTimeSlots = Array.from(timeSlots).sort();

    return sortedTimeSlots.map(timeSlot => {
      const row = { time: timeSlot };
      
      daysOfWeek.forEach(dayName => {
        const dayData = timetable.timetable.find(d => d.day === dayName);
        const period = dayData?.periods.find(p => p.time === timeSlot);
        row[dayName] = period?.subject || "-";
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

          {/* Top bar - Search + Add/Publish */}
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
                <div className="text-sm text-gray-600">
                  Academic Year: {selectedRow?.year} 
                  {/* Period: {selectedRow?.from && new Date(selectedRow.from).toLocaleDateString()} - {selectedRow?.to && new Date(selectedRow.to).toLocaleDateString()} */}
                </div>
                <button 
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                  onClick={() => alert("Publish functionality to be implemented")}
                >
                  Publish
                </button>
              </div>
            )}
          </div>

          {/* View Mode */}
          {viewMode ? (
            <>
              {/* Title with navigation arrows */}
              <div className="flex items-center justify-between text-xl font-semibold">
                <button
                  className="text-blue-600 hover:text-blue-800 text-2xl p-2 rounded hover:bg-blue-50 transition-colors"
                  onClick={() => {
                    const currentIndex = timetableData.findIndex(
                      (item) => item._id === selectedRow._id
                    );
                    if (currentIndex > 0) {
                      setSelectedRow(timetableData[currentIndex - 1]);
                    }
                  }}
                  disabled={
                    timetableData.findIndex((item) => item._id === selectedRow?._id) === 0
                  }
                >
                  ←
                </button>
                <div className="text-center">
                  <h2>Timetable for Standard {selectedRow?.standard} - Division {selectedRow?.division}</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Created by: {selectedRow?.submittedby || 'N/A'}
                  </p>
                </div>
                <button
                  className="text-blue-600 hover:text-blue-800 text-2xl p-2 rounded hover:bg-blue-50 transition-colors"
                  onClick={() => {
                    const currentIndex = timetableData.findIndex(
                      (item) => item._id === selectedRow._id
                    );
                    if (currentIndex < timetableData.length - 1) {
                      setSelectedRow(timetableData[currentIndex + 1]);
                    }
                  }}
                  disabled={
                    timetableData.findIndex((item) => item._id === selectedRow?._id) ===
                    timetableData.length - 1
                  }
                >
                  →
                </button>
              </div>

              {/* Timetable Table */}
              <div className="overflow-x-auto mt-6">
                <table className="min-w-full border border-gray-300 rounded-lg">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-4 py-3 border font-semibold">Time</th>
                      {weekdays.map((day) => (
                        <th key={day} className="px-4 py-3 border font-semibold">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {displayTimetable.map((row, rowIdx) => (
                      <tr key={rowIdx} className="hover:bg-gray-50">
                        <td className="px-4 py-3 border font-medium bg-gray-50">
                          {row.time}
                        </td>
                        {weekdays.map((day) => (
                          <td key={day} className="px-4 py-3 border text-center">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {row[day]}
                            </span>
                          </td>
                        ))}
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
                      <th className="px-4 py-3 border font-semibold">Standard</th>
                      <th className="px-4 py-3 border font-semibold">Division</th>
                      <th className="px-4 py-3 border font-semibold">Academic Year</th>
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
                            {row.division}
                          </td>
                          <td className="px-4 py-3 border text-center">
                            {row.year}
                          </td>
                          <td className="px-4 py-3 border text-center">
                            {row.submittedby || 'N/A'}
                          </td>
                          <td className="px-4 py-3 border text-center">
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
                        <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
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

export default AcademicTimetable;