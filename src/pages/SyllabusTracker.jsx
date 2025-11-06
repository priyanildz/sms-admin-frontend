// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { FaChalkboardTeacher } from 'react-icons/fa';

// const SyllabusTracker = () => {
//     const [selectedStd, setSelectedStd] = useState("");
//     const [selectedDiv, setSelectedDiv] = useState("");
//     const [syllabus, setSyllabus] = useState([]);
//     const [teacherName, setTeacherName] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [apiData, setApiData] = useState([]);

//     const stdOptions = ["1", "2", "3", "4", "5"];
//     const divOptions = ["A", "B", "C", "D"];

//     // Fetch data from API
//     const fetchSyllabusData = async () => {
//         setLoading(true);
//         setError("");
//         try {
//             const response = await fetch('https://sspd-school-portal.vercel.app/api/getCurrentSyllabus', {
//                 method: 'GET',
//                 headers: {
//                     'auth': 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=',
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             setApiData(data);
//         } catch (err) {
//             setError(`Failed to fetch data: ${err.message}`);
//             console.error('Error fetching syllabus data:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Load data on component mount
//     useEffect(() => {
//         fetchSyllabusData();
//     }, []);

//     // Filter and set syllabus data based on selected standard and division
//     useEffect(() => {
//         if (selectedStd && selectedDiv && apiData.length > 0) {
//             // Filter data for selected standard and division
//             const filteredData = apiData.filter(
//                 item => item.std === selectedStd && item.div === selectedDiv
//             );

//             if (filteredData.length > 0) {
//                 // Set teacher name from first matching record
//                 setTeacherName(filteredData[0].class_teacher);
                
//                 // Transform data for table display
//                 const syllabusForTable = filteredData.map(item => ({
//                     subject: item.subject,
//                     pending: item.pending,
//                     total: item.total
//                 }));
                
//                 setSyllabus(syllabusForTable);
//             } else {
//                 setTeacherName("N/A");
//                 setSyllabus([]);
//             }
//         } else {
//             setTeacherName("");
//             setSyllabus([]);
//         }
//     }, [selectedStd, selectedDiv, apiData]);

//     // Get unique standard options from API data
//     const getAvailableStandards = () => {
//         if (apiData.length === 0) return stdOptions;
//         const uniqueStds = [...new Set(apiData.map(item => item.std))];
//         return uniqueStds.sort();
//     };

//     // Get unique division options for selected standard
//     const getAvailableDivisions = () => {
//         if (!selectedStd || apiData.length === 0) return divOptions;
//         const filteredByStd = apiData.filter(item => item.std === selectedStd);
//         const uniqueDivs = [...new Set(filteredByStd.map(item => item.div))];
//         return uniqueDivs.sort();
//     };

//     return (
//         <MainLayout>
//             <div className="p-6">
//                 <div className="bg-white rounded-2xl shadow p-6">
//                     {/* Loading state */}
//                     {loading && (
//                         <div className="text-center text-blue-500 mb-4">
//                             Loading syllabus data...
//                         </div>
//                     )}

//                     {/* Error state */}
//                     {error && (
//                         <div className="text-center text-red-500 mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
//                             {error}
//                             <button 
//                                 onClick={fetchSyllabusData}
//                                 className="ml-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
//                             >
//                                 Retry
//                             </button>
//                         </div>
//                     )}

//                     <div className="flex flex-col sm:flex-row gap-4 mb-6">
//                         <div className="flex flex-col w-full">
//                             <label className="text-sm font-semibold text-gray-700 mb-2">Standard</label>
//                             <select
//                                 value={selectedStd}
//                                 onChange={(e) => {
//                                     setSelectedStd(e.target.value);
//                                     setSelectedDiv(""); // Reset division when standard changes
//                                 }}
//                                 className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//                                 disabled={loading || apiData.length === 0}
//                             >
//                                 <option value="">Select</option>
//                                 {getAvailableStandards().map((option) => (
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
//                                 disabled={loading || !selectedStd || apiData.length === 0}
//                             >
//                                 <option value="">Select</option>
//                                 {getAvailableDivisions().map((option) => (
//                                     <option key={option} value={option}>{option}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     {selectedStd && selectedDiv ? (
//                         <div className="mb-4 flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
//                             <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full">
//                                 <FaChalkboardTeacher className="w-5 h-5" />
//                             </div>
//                             <div>
//                                 <p className="text-sm text-gray-500">Class Teacher</p>
//                                 <p className="text-base font-medium text-gray-800">{teacherName}</p>
//                             </div>
//                         </div>
//                     ) : (
//                         !loading && apiData.length > 0 && (
//                             <div className="text-center text-red-500 font-semibold mb-6">
//                                 Please select both Standard and Division to proceed.
//                             </div>
//                         )
//                     )}

//                     {syllabus.length > 0 ? (
//                         <div className="overflow-x-auto">
//                             <table className="min-w-full border rounded-xl">
//                                 <thead className="bg-blue-100 text-left text-sm text-gray-700">
//                                     <tr>
//                                         <th className="py-2 px-4 border">Subject</th>
//                                         <th className="py-2 px-4 border">Pending Topics</th>
//                                         <th className="py-2 px-4 border">Total Topics</th>
//                                         <th className="py-2 px-4 border">Progress</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {syllabus.map((row, index) => {
//                                         const completed = row.total - row.pending;
//                                         const progressPercentage = row.total > 0 ? ((completed / row.total) * 100).toFixed(1) : 0;
                                        
//                                         return (
//                                             <tr key={index} className="hover:bg-gray-50">
//                                                 <td className="py-2 px-4 border font-medium">{row.subject}</td>
//                                                 <td className="py-2 px-4 border">
//                                                     <span className={`px-2 py-1 rounded-full text-xs ${
//                                                         row.pending === 0 
//                                                             ? 'bg-green-100 text-green-800' 
//                                                             : 'bg-red-100 text-red-800'
//                                                     }`}>
//                                                         {row.pending}
//                                                     </span>
//                                                 </td>
//                                                 <td className="py-2 px-4 border">{row.total}</td>
//                                                 <td className="py-2 px-4 border">
//                                                     <div className="flex items-center gap-2">
//                                                         <div className="flex-1 bg-gray-200 rounded-full h-2">
//                                                             <div 
//                                                                 className="bg-blue-500 h-2 rounded-full transition-all"
//                                                                 style={{ width: `${progressPercentage}%` }}
//                                                             ></div>
//                                                         </div>
//                                                         <span className="text-xs text-gray-600 min-w-[40px]">
//                                                             {progressPercentage}%
//                                                         </span>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         );
//                                     })}
//                                 </tbody>
//                             </table>
//                         </div>
//                     ) : (
//                         selectedStd && selectedDiv && !loading && (
//                             <div className="text-gray-500 text-sm mt-4 text-center p-4 bg-gray-50 rounded-lg">
//                                 No syllabus data found for Standard {selectedStd}, Division {selectedDiv}.
//                             </div>
//                         )
//                     )}
//                 </div>
//             </div>
//         </MainLayout>
//     );
// };

// export default SyllabusTracker;

// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { FaChalkboardTeacher } from 'react-icons/fa';

// // Define the base URL for your local backend API
// const LOCAL_API_BASE_URL = "http://localhost:5000/api";

// const SyllabusTracker = () => {
//     const [selectedStd, setSelectedStd] = useState("");
//     const [selectedDiv, setSelectedDiv] = useState("");
//     const [syllabus, setSyllabus] = useState([]);
//     const [teacherName, setTeacherName] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [apiData, setApiData] = useState([]);

//     const stdOptions = ["1", "2", "3", "4", "5"];
//     const divOptions = ["A", "B", "C", "D"];

//     // Fetch data from API
//     const fetchSyllabusData = async () => {
//         setLoading(true);
//         setError("");
//         try {
//             const response = await fetch(`${LOCAL_API_BASE_URL}/getCurrentSyllabus`, {
//                 method: 'GET',
//                 headers: {
//                     'auth': 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=',
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             setApiData(data);
//         } catch (err) {
//             setError(`Failed to fetch data: ${err.message}`);
//             console.error('Error fetching syllabus data:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Load data on component mount
//     useEffect(() => {
//         fetchSyllabusData();
//     }, []);

//     // Filter and set syllabus data based on selected standard and division
//     useEffect(() => {
//         if (selectedStd && selectedDiv && apiData.length > 0) {
//             // Filter data for selected standard and division
//             const filteredData = apiData.filter(
//                 item => item.std === selectedStd && item.div === selectedDiv
//             );

//             if (filteredData.length > 0) {
//                 // Set teacher name from first matching record
//                 setTeacherName(filteredData[0].class_teacher);
//                 
//                 // Transform data for table display
//                 const syllabusForTable = filteredData.map(item => ({
//                     subject: item.subject,
//                     pending: item.pending,
//                     total: item.total
//                 }));
//                 
//                 setSyllabus(syllabusForTable);
//             } else {
//                 setTeacherName("N/A");
//                 setSyllabus([]);
//             }
//         } else {
//             setTeacherName("");
//             setSyllabus([]);
//         }
//     }, [selectedStd, selectedDiv, apiData]);

//     // Get unique standard options from API data
//     const getAvailableStandards = () => {
//         if (apiData.length === 0) return stdOptions;
//         const uniqueStds = [...new Set(apiData.map(item => item.std))];
//         return uniqueStds.sort();
//     };

//     // Get unique division options for selected standard
//     const getAvailableDivisions = () => {
//         if (!selectedStd || apiData.length === 0) return divOptions;
//         const filteredByStd = apiData.filter(item => item.std === selectedStd);
//         const uniqueDivs = [...new Set(filteredByStd.map(item => item.div))];
//         return uniqueDivs.sort();
//     };

//     return (
//         <MainLayout>
//             <div className="p-6">
//                 <div className="bg-white rounded-2xl shadow p-6">
//                     {/* Loading state */}
//                     {loading && (
//                         <div className="text-center text-blue-500 mb-4">
//                             Loading syllabus data...
//                         </div>
//                     )}

//                     {/* Error state */}
//                     {error && (
//                         <div className="text-center text-red-500 mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
//                             {error}
//                             <button 
//                                 onClick={fetchSyllabusData}
//                                 className="ml-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
//                             >
//                                 Retry
//                             </button>
//                         </div>
//                     )}

//                     <div className="flex flex-col sm:flex-row gap-4 mb-6">
//                         <div className="flex flex-col w-full">
//                             <label className="text-sm font-semibold text-gray-700 mb-2">Standard</label>
//                             <select
//                                 value={selectedStd}
//                                 onChange={(e) => {
//                                     setSelectedStd(e.target.value);
//                                     setSelectedDiv(""); // Reset division when standard changes
//                                 }}
//                                 className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//                                 disabled={loading || apiData.length === 0}
//                             >
//                                 <option value="">Select</option>
//                                 {getAvailableStandards().map((option) => (
//                                     <option key={option} value={option}>{option}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="flex flex-col w-full">
//                             <label className="text-sm font-semibold text-gray-700 mb-2">Division</label>
//                             <select
//                                 value={selectedDiv}
//                                 onChange={(e) => setSelectedDiv(e.target.value)}
//                                 className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//                                 disabled={loading || !selectedStd || apiData.length === 0}
//                             >
//                                 <option value="">Select</option>
//                                 {getAvailableDivisions().map((option) => (
//                                     <option key={option} value={option}>{option}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     {selectedStd && selectedDiv ? (
//                         <div className="mb-4 flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
//                             <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full">
//                                 <FaChalkboardTeacher className="w-5 h-5" />
//                             </div>
//                             <div>
//                                 <p className="text-sm text-gray-500">Class Teacher</p>
//                                 <p className="text-base font-medium text-gray-800">{teacherName}</p>
//                             </div>
//                         </div>
//                     ) : (
//                         !loading && apiData.length > 0 && (
//                             <div className="text-center text-red-500 font-semibold mb-6">
//                                 Please select both Standard and Division to proceed.
//                             </div>
//                         )
//                     )}

//                     {syllabus.length > 0 ? (
//                         <div className="overflow-x-auto">
//                             <table className="min-w-full border rounded-xl">
//                                 <thead className="bg-blue-100 text-left text-sm text-gray-700">
//                                     <tr>
//                                         <th className="py-2 px-4 border">Subject</th>
//                                         <th className="py-2 px-4 border">Pending Topics</th>
//                                         <th className="py-2 px-4 border">Total Topics</th>
//                                         <th className="py-2 px-4 border">Progress</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {syllabus.map((row, index) => {
//                                         const completed = row.total - row.pending;
//                                         const progressPercentage = row.total > 0 ? ((completed / row.total) * 100).toFixed(1) : 0;
//                                         
//                                         return (
//                                             <tr key={index} className="hover:bg-gray-50">
//                                                 <td className="py-2 px-4 border font-medium">{row.subject}</td>
//                                                 <td className="py-2 px-4 border">
//                                                     <span className={`px-2 py-1 rounded-full text-xs ${
//                                                         row.pending === 0 
//                                                             ? 'bg-green-100 text-green-800' 
//                                                             : 'bg-red-100 text-red-800'
//                                                     }`}>
//                                                         {row.pending}
//                                                     </span>
//                                                 </td>
//                                                 <td className="py-2 px-4 border">{row.total}</td>
//                                                 <td className="py-2 px-4 border">
//                                                     <div className="flex items-center gap-2">
//                                                         <div className="flex-1 bg-gray-200 rounded-full h-2">
//                                                             <div 
//                                                                 className="bg-blue-500 h-2 rounded-full transition-all"
//                                                                 style={{ width: `${progressPercentage}%` }}
//                                                             ></div>
//                                                         </div>
//                                                         <span className="text-xs text-gray-600 min-w-[40px]">
//                                                             {progressPercentage}%
//                                                         </span>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         );
//                                     })}
//                                 </tbody>
//                             </table>
//                         </div>
//                     ) : (
//                         selectedStd && selectedDiv && !loading && (
//                             <div className="text-gray-500 text-sm mt-4 text-center p-4 bg-gray-50 rounded-lg">
//                                 No syllabus data found for Standard {selectedStd}, Division {selectedDiv}.
//                             </div>
//                         )
//                     )}
//                 </div>
//             </div>
//         </MainLayout>
//     );
// };

// export default SyllabusTracker;

import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { FaChalkboardTeacher } from 'react-icons/fa';
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config";

// Define the base URL for your local backend API
// const LOCAL_API_BASE_URL = "http://localhost:5000/api"; // REMOVED

const SyllabusTracker = () => {
    const [selectedStd, setSelectedStd] = useState("");
    const [selectedDiv, setSelectedDiv] = useState("");
    const [syllabus, setSyllabus] = useState([]);
    const [teacherName, setTeacherName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [apiData, setApiData] = useState([]);

    const stdOptions = ["1", "2", "3", "4", "5"];
    const divOptions = ["A", "B", "C", "D"];

    // Fetch data from API
    const fetchSyllabusData = async () => {
        setLoading(true);
        setError("");
        try {
            // FIX: Using imported API_BASE_URL
            const response = await fetch(`${API_BASE_URL}api/getCurrentSyllabus`, {
                method: 'GET',
                headers: {
                    'auth': 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setApiData(data);
        } catch (err) {
            setError(`Failed to fetch data: ${err.message}`);
            console.error('Error fetching syllabus data:', err);
        } finally {
            setLoading(false);
        }
    };

    // Load data on component mount
    useEffect(() => {
        fetchSyllabusData();
    }, []);

    // Filter and set syllabus data based on selected standard and division
    useEffect(() => {
        if (selectedStd && selectedDiv && apiData.length > 0) {
            // Filter data for selected standard and division
            const filteredData = apiData.filter(
                item => item.std === selectedStd && item.div === selectedDiv
            );

            if (filteredData.length > 0) {
                // Set teacher name from first matching record
                setTeacherName(filteredData[0].class_teacher);
                
                // Transform data for table display
                const syllabusForTable = filteredData.map(item => ({
                    subject: item.subject,
                    pending: item.pending,
                    total: item.total
                }));
                
                setSyllabus(syllabusForTable);
            } else {
                setTeacherName("N/A");
                setSyllabus([]);
            }
        } else {
            setTeacherName("");
            setSyllabus([]);
        }
    }, [selectedStd, selectedDiv, apiData]);

    // Get unique standard options from API data
    const getAvailableStandards = () => {
        if (apiData.length === 0) return stdOptions;
        const uniqueStds = [...new Set(apiData.map(item => item.std))];
        return uniqueStds.sort();
    };

    // Get unique division options for selected standard
    const getAvailableDivisions = () => {
        if (!selectedStd || apiData.length === 0) return divOptions;
        const filteredByStd = apiData.filter(item => item.std === selectedStd);
        const uniqueDivs = [...new Set(filteredByStd.map(item => item.div))];
        return uniqueDivs.sort();
    };

    return (
        <MainLayout>
            <div className="p-6">
                <div className="bg-white rounded-2xl shadow p-6">
                    {/* Loading state */}
                    {loading && (
                        <div className="text-center text-blue-500 mb-4">
                            Loading syllabus data...
                        </div>
                    )}

                    {/* Error state */}
                    {error && (
                        <div className="text-center text-red-500 mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            {error}
                            <button 
                                onClick={fetchSyllabusData}
                                className="ml-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex flex-col w-full">
                            <label className="text-sm font-semibold text-gray-700 mb-2">Standard</label>
                            <select
                                value={selectedStd}
                                onChange={(e) => {
                                    setSelectedStd(e.target.value);
                                    setSelectedDiv(""); // Reset division when standard changes
                                }}
                                className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                disabled={loading || apiData.length === 0}
                            >
                                <option value="">Select</option>
                                {getAvailableStandards().map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-sm font-semibold text-gray-700 mb-2">Division</label>
                            <select
                                value={selectedDiv}
                                onChange={(e) => setSelectedDiv(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                disabled={loading || !selectedStd || apiData.length === 0}
                            >
                                <option value="">Select</option>
                                {getAvailableDivisions().map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {selectedStd && selectedDiv ? (
                        <div className="mb-4 flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
                            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full">
                                <FaChalkboardTeacher className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Class Teacher</p>
                                <p className="text-base font-medium text-gray-800">{teacherName}</p>
                            </div>
                        </div>
                    ) : (
                        !loading && apiData.length > 0 && (
                            <div className="text-center text-red-500 font-semibold mb-6">
                                Please select both Standard and Division to proceed.
                            </div>
                        )
                    )}

                    {syllabus.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border rounded-xl">
                                <thead className="bg-blue-100 text-left text-sm text-gray-700">
                                    <tr>
                                        <th className="py-2 px-4 border">Subject</th>
                                        <th className="py-2 px-4 border">Pending Topics</th>
                                        <th className="py-2 px-4 border">Total Topics</th>
                                        <th className="py-2 px-4 border">Progress</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {syllabus.map((row, index) => {
                                        const completed = row.total - row.pending;
                                        const progressPercentage = row.total > 0 ? ((completed / row.total) * 100).toFixed(1) : 0;
                                        
                                        return (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="py-2 px-4 border font-medium">{row.subject}</td>
                                                <td className="py-2 px-4 border">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                                        row.pending === 0 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {row.pending}
                                                    </span>
                                                </td>
                                                <td className="py-2 px-4 border">{row.total}</td>
                                                <td className="py-2 px-4 border">
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                                                            <div 
                                                                className="bg-blue-500 h-2 rounded-full transition-all"
                                                                style={{ width: `${progressPercentage}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-xs text-gray-600 min-w-[40px]">
                                                            {progressPercentage}%
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        selectedStd && selectedDiv && !loading && (
                            <div className="text-gray-500 text-sm mt-4 text-center p-4 bg-gray-50 rounded-lg">
                                No syllabus data found for Standard {selectedStd}, Division {selectedDiv}.
                            </div>
                        )
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default SyllabusTracker;