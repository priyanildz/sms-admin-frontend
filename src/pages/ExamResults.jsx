// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";

// const ExamResults = () => {
//     const [selectedStd, setSelectedStd] = useState("");
//     const [selectedDiv, setSelectedDiv] = useState("");
//     const [selectedSem, setSelectedSem] = useState("");
//     const [results, setResults] = useState([]);

//     const stdOptions = ["1", "2", "3", "4", "5"];
//     const divOptions = ["A", "B", "C", "D"];
//     const semOptions = ["1", "2"];

//     const resultsData = {
//         "1": {
//             A: {
//                 "1": [
//                     { name: "Alice", English: 78, Maths: 88, Science: 74, History: 82 },
//                     { name: "Bob", English: 65, Maths: 72, Science: 70, History: 68 },
//                 ],
//                 "2": [
//                     { name: "Alice", English: 82, Maths: 89, Science: 80, History: 84 },
//                     { name: "Bob", English: 69, Maths: 75, Science: 73, History: 70 },
//                 ]
//             },
//             D: {
//                 "1": [
//                     { name: "Eve", English: 80, Maths: 85, Science: 78, History: 76 },
//                     { name: "David", English: 74, Maths: 79, Science: 82, History: 70 },
//                 ],
//                 "2": [
//                     { name: "Eve", English: 83, Maths: 88, Science: 81, History: 79 },
//                     { name: "David", English: 77, Maths: 80, Science: 79, History: 72 },
//                 ]
//             }
//         },
//         "2": {
//             B: {
//                 "1": [
//                     { name: "Chris", English: 85, Maths: 90, Science: 88, History: 86 },
//                     { name: "Nina", English: 75, Maths: 78, Science: 72, History: 74 },
//                 ],
//                 "2": [
//                     { name: "Chris", English: 88, Maths: 92, Science: 90, History: 89 },
//                     { name: "Nina", English: 79, Maths: 81, Science: 75, History: 77 },
//                 ]
//             }
//         },
//         "3": {
//             C: {
//                 "1": [
//                     { name: "Sam", English: 68, Maths: 72, Science: 70, History: 69 },
//                     { name: "Lily", English: 90, Maths: 94, Science: 91, History: 92 },
//                 ],
//                 "2": [
//                     { name: "Sam", English: 70, Maths: 75, Science: 73, History: 71 },
//                     { name: "Lily", English: 93, Maths: 96, Science: 95, History: 94 },
//                 ]
//             }
//         },
//         "4": {
//             A: {
//                 "1": [
//                     { name: "Tom", English: 82, Maths: 85, Science: 84, History: 83 },
//                     { name: "Jerry", English: 78, Maths: 80, Science: 79, History: 77 },
//                 ]
//             }
//         },
//         "5": {
//             D: {
//                 "2": [
//                     { name: "Sophie", English: 89, Maths: 92, Science: 91, History: 90 },
//                     { name: "Leo", English: 76, Maths: 80, Science: 78, History: 74 },
//                 ]
//             }
//         }
//     };


//     useEffect(() => {
//         if (selectedStd && selectedDiv && selectedSem) {
//             setResults(resultsData[selectedStd]?.[selectedDiv]?.[selectedSem] || []);
//         } else {
//             setResults([]);
//         }
//     }, [selectedStd, selectedDiv, selectedSem]);

//     return (
//         <MainLayout>
//             <div className="p-6">
//                 <div className="bg-white rounded-2xl shadow p-6">
//                     <div className="grid sm:grid-cols-3 gap-4 mb-6">
//                         <div className="flex flex-col">
//                             <label className="text-sm font-semibold text-gray-700 mb-2">Standard</label>
//                             <select
//                                 value={selectedStd}
//                                 onChange={(e) => setSelectedStd(e.target.value)}
//                                 className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//                             >
//                                 <option value="">Select</option>
//                                 {stdOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
//                             </select>
//                         </div>
//                         <div className="flex flex-col">
//                             <label className="text-sm font-semibold text-gray-700 mb-2">Division</label>
//                             <select
//                                 value={selectedDiv}
//                                 onChange={(e) => setSelectedDiv(e.target.value)}
//                                 className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//                             >
//                                 <option value="">Select</option>
//                                 {divOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
//                             </select>
//                         </div>
//                         <div className="flex flex-col">
//                             <label className="text-sm font-semibold text-gray-700 mb-2">Semester</label>
//                             <select
//                                 value={selectedSem}
//                                 onChange={(e) => setSelectedSem(e.target.value)}
//                                 className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//                             >
//                                 <option value="">Select</option>
//                                 {semOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
//                             </select>
//                         </div>
//                     </div>

//                     {/* Show message if either Std or Div is not selected */}
//                     {(!selectedStd || !selectedDiv) && (
//                         <div className="text-center text-red-500 font-semibold mb-6">
//                             Please select both Standard, Division and Semester to proceed.
//                         </div>
//                     )}

//                     {results.length > 0 && (
//                         <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">
//                             Semester-{selectedSem}
//                         </h2>
//                     )}

//                     {results.length > 0 ? (
//                         <div className="overflow-x-auto">
//                             <table className="min-w-full border rounded-xl">
//                                 <thead className="bg-blue-100 text-left text-sm text-gray-700">
//                                     <tr>
//                                         <th className="py-2 px-4 border">Name</th>
//                                         <th className="py-2 px-4 border">English</th>
//                                         <th className="py-2 px-4 border">Maths</th>
//                                         <th className="py-2 px-4 border">Science</th>
//                                         <th className="py-2 px-4 border">History</th>
//                                         <th className="py-2 px-4 border">Total</th>
//                                         <th className="py-2 px-4 border">Percentage</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {results.map((student, index) => {
//                                         const total = student.English + student.Maths + student.Science + student.History;
//                                         const percentage = ((total / 400) * 100).toFixed(2);
//                                         return (
//                                             <tr key={index} className="hover:bg-gray-50">
//                                                 <td className="py-2 px-4 border">{student.name}</td>
//                                                 <td className="py-2 px-4 border">{student.English}</td>
//                                                 <td className="py-2 px-4 border">{student.Maths}</td>
//                                                 <td className="py-2 px-4 border">{student.Science}</td>
//                                                 <td className="py-2 px-4 border">{student.History}</td>
//                                                 <td className="py-2 px-4 border">{total}</td>
//                                                 <td className="py-2 px-4 border">{percentage}%</td>
//                                             </tr>
//                                         );
//                                     })}
//                                 </tbody>
//                             </table>
//                         </div>
//                     ) : (
//                         selectedStd && selectedDiv && selectedSem && (
//                             <div className="text-gray-500 text-sm mt-4">
//                                 No results found for Standard {selectedStd}, Division {selectedDiv}, Semester {selectedSem}
//                             </div>
//                         )
//                     )}
//                 </div>
//             </div>
//         </MainLayout>
//     );
// };

// export default ExamResults;




import React, { useState, useEffect } from "react"; 
import MainLayout from "../layout/MainLayout";
import axios from 'axios';
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

const AUTH_HEADER = 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='; 

// --- Arrays for your dropdowns ---
const stdOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const divOptions = ["A", "B", "C", "D", "E"];
const semOptions = ["1", "2"];

export default function ExamResults() {
    const [selectedStd, setSelectedStd] = useState("");
    const [selectedDiv, setSelectedDiv] = useState("");
    const [selectedSem, setSelectedSem] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false); // Added loading state

    // Dynamic data fetching function
    const fetchResults = async () => {
        if (!selectedStd || !selectedDiv || !selectedSem) {
            setResults([]);
            return;
        }

        setLoading(true);

        try {
            // Assuming an API endpoint exists to get filtered exam results
            // FIX: Using imported API_BASE_URL
            const response = await axios.post(`${API_BASE_URL}api/exam-results`, {
                standard: selectedStd,
                division: selectedDiv,
                semester: selectedSem
            }, {
                headers: { 
                    'Content-Type': 'application/json',
                    'auth': AUTH_HEADER 
                }
            });
            
            // Assuming the API returns an array of student objects with scores (e.g., {name: "Alice", English: 78})
            setResults(response.data || []);

        } catch (error) {
            console.error("Error fetching exam results:", error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        // Call the dynamic fetch function whenever filters change
        fetchResults(); 
    }, [selectedStd, selectedDiv, selectedSem]);


    // Helper to dynamically determine subjects based on fetched data
    const getSubjects = () => {
        if (results.length === 0) return [];
        // Take the keys from the first result object, excluding metadata fields
        const firstStudent = results[0];
        return Object.keys(firstStudent).filter(key => 
            key !== 'name' && key !== 'id' && key !== '_id' && key !== 'total' && key !== 'percentage'
        );
    };

    const subjects = getSubjects();

    // RENDER LOGIC: Calculates Total and Percentage for each row
    const renderTableBody = () => {
        return results.map((student, index) => {
            const scores = subjects.map(subject => student[subject] || 0);
            const total = scores.reduce((sum, score) => sum + score, 0);
            const maxTotal = subjects.length * 100; // Assuming 100 marks max per subject
            const percentage = maxTotal > 0 ? ((total / maxTotal) * 100).toFixed(2) : 0;
            
            return (
                <tr key={student.id || index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border font-medium text-gray-800">{student.name}</td>
                    {subjects.map(subject => (
                        <td key={subject} className="py-2 px-4 border">{student[subject] || 0}</td>
                    ))}
                    <td className="py-2 px-4 border font-semibold bg-gray-50">{total}</td>
                    <td className="py-2 px-4 border font-semibold bg-blue-50">{percentage}%</td>
                </tr>
            );
        });
    };
    
    return (
        <MainLayout>
            <div className="p-6">
                <div className="bg-white rounded-2xl shadow p-6">
                    <div className="grid sm:grid-cols-3 gap-4 mb-6">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">Standard</label>
                            <select
                                value={selectedStd}
                                onChange={(e) => setSelectedStd(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            >
                                <option value="">Select</option>
                                {stdOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">Division</label>
                            <select
                                value={selectedDiv}
                                onChange={(e) => setSelectedDiv(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            >
                                <option value="">Select</option>
                                {divOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-700 mb-2">Semester</label>
                            <select
                                value={selectedSem}
                                onChange={(e) => setSelectedSem(e.target.value)}
                                className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                            >
                                <option value="">Select</option>
                                {semOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>
                    </div>

                    {(!selectedStd || !selectedDiv || !selectedSem) && (
                        <div className="text-center text-red-500 font-semibold mb-6">
                            Please select both Standard, Division and Semester to proceed.
                        </div>
                    )}
                    
                    {loading ? (
                        <div className="text-center p-8 text-blue-600">Loading results...</div>
                    ) : (
                        results.length > 0 ? (
                            <div className="overflow-x-auto">
                                <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">
                                    Semester-{selectedSem} Results
                                </h2>
                                <table className="min-w-full border rounded-xl table-auto text-sm">
                                    <thead className="bg-blue-100 text-left text-gray-700">
                                        <tr>
                                            <th className="py-2 px-4 border">Name</th>
                                            {subjects.map(subject => (
                                                <th key={subject} className="py-2 px-4 border">{subject}</th>
                                            ))}
                                            <th className="py-2 px-4 border">Total</th>
                                            <th className="py-2 px-4 border">Percentage</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderTableBody()}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            selectedStd && selectedDiv && selectedSem && (
                                <div className="text-gray-500 text-sm mt-4 text-center p-8 border rounded-xl bg-gray-50">
                                    No results found for Standard {selectedStd}, Division {selectedDiv}, Semester {selectedSem}
                                </div>
                            )
                        )
                    )}
                </div>
            </div>
        </MainLayout>
    );
}




// import React, { useState, useEffect } from "react"; 
// import MainLayout from "../layout/MainLayout";
// import axios from 'axios';
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// const AUTH_HEADER = 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='; 

// // --- STATIC MOCK DATA SET ---
// // This data simulates the structure expected from a successful API response
// const MOCK_RESULTS_DATA = [
//     { name: "Alice Jhanvi", Maths: 92, Science: 85, English: 78, History: 65, Hindi: 90 },
//     { name: "Bob Aman", Maths: 75, Science: 90, English: 88, History: 72, Hindi: 81 },
//     { name: "Charlie Singh", Maths: 88, Science: 79, English: 95, History: 80, Hindi: 77 },
//     { name: "Diana Priya", Maths: 60, Science: 65, English: 70, History: 68, Hindi: 72 },
// ];
// // --- END STATIC MOCK DATA ---


// const stdOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
// const divOptions = ["A", "B", "C", "D", "E"];
// const semOptions = ["1", "2"];

// export default function ExamResults() {
//     const [selectedStd, setSelectedStd] = useState("");
//     const [selectedDiv, setSelectedDiv] = useState("");
//     const [selectedSem, setSelectedSem] = useState("");
//     const [results, setResults] = useState([]);
//     const [loading, setLoading] = useState(false); // Added loading state

//     // Dynamic data fetching function - NOW USES MOCK DATA
//     const fetchResults = async () => {
//         if (!selectedStd || !selectedDiv || !selectedSem) {
//             setResults([]);
//             return;
//         }

//         setLoading(true);

//         try {
//             // --- TEMPORARY MOCK LOGIC ---
//             // Simulate API latency
//             await new Promise(resolve => setTimeout(resolve, 500)); 
            
//             // In a real app, you would pass filters to the API:
//             /*
//             const response = await axios.post(`${API_BASE_URL}api/exam-results`, {
//                 standard: selectedStd,
//                 division: selectedDiv,
//                 semester: selectedSem
//             }, { headers: { 'Content-Type': 'application/json', 'auth': AUTH_HEADER } });
//             setResults(response.data || []);
//             */
            
//             // Use static mock data when all filters are selected
//             setResults(MOCK_RESULTS_DATA);
//             // --- END TEMPORARY MOCK LOGIC ---

//         } catch (error) {
//             console.error("Error fetching exam results:", error);
//             setResults([]);
//         } finally {
//             setLoading(false);
//         }
//     };


//     useEffect(() => {
//         // Call the dynamic fetch function whenever filters change
//         fetchResults(); 
//     }, [selectedStd, selectedDiv, selectedSem]);


//     // Helper to dynamically determine subjects based on fetched data
//     const getSubjects = () => {
//         if (results.length === 0) return [];
//         // Take the keys from the first result object, excluding metadata fields
//         const firstStudent = results[0];
//         return Object.keys(firstStudent).filter(key => 
//             key !== 'name' && key !== 'id' && key !== '_id' && key !== 'total' && key !== 'percentage'
//         );
//     };

//     const subjects = getSubjects();

//     // RENDER LOGIC: Calculates Total and Percentage for each row
//     const renderTableBody = () => {
//         return results.map((student, index) => {
//             const scores = subjects.map(subject => student[subject] || 0);
//             const total = scores.reduce((sum, score) => sum + score, 0);
//             // Max possible score based on number of subjects * 100
//             const maxTotal = subjects.length * 100; 
//             const percentage = maxTotal > 0 ? ((total / maxTotal) * 100).toFixed(2) : 0;
//             
//             return (
//                 <tr key={student.id || index} className="hover:bg-gray-50">
//                     <td className="py-2 px-4 border font-medium text-gray-800">{student.name}</td>
//                     {subjects.map(subject => (
//                         <td key={subject} className="py-2 px-4 border">{student[subject] || 0}</td>
//                     ))}
//                     <td className="py-2 px-4 border font-semibold bg-gray-50">{total}</td>
//                     <td className="py-2 px-4 border font-semibold bg-blue-50">{percentage}%</td>
//                 </tr>
//             );
//         });
//     };
//     
//     return (
//         <MainLayout>
//             <div className="p-6">
//                 <div className="bg-white rounded-2xl shadow p-6">
//                     <div className="grid sm:grid-cols-3 gap-4 mb-6">
//                         <div className="flex flex-col">
//                             <label className="text-sm font-semibold text-gray-700 mb-2">Standard</label>
//                             <select
//                                 value={selectedStd}
//                                 onChange={(e) => setSelectedStd(e.target.value)}
//                                 className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//                             >
//                                 <option value="">Select</option>
//                                 {stdOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
//                             </select>
//                         </div>
//                         <div className="flex flex-col">
//                             <label className="text-sm font-semibold text-gray-700 mb-2">Division</label>
//                             <select
//                                 value={selectedDiv}
//                                 onChange={(e) => setSelectedDiv(e.target.value)}
//                                 className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//                             >
//                                 <option value="">Select</option>
//                                 {divOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
//                             </select>
//                         </div>
//                         <div className="flex flex-col">
//                             <label className="text-sm font-semibold text-gray-700 mb-2">Semester</label>
//                             <select
//                                 value={selectedSem}
//                                 onChange={(e) => setSelectedSem(e.target.value)}
//                                 className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
//                             >
//                                 <option value="">Select</option>
//                                 {semOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
//                             </select>
//                         </div>
//                     </div>

//                     {(!selectedStd || !selectedDiv || !selectedSem) && (
//                         <div className="text-center text-red-500 font-semibold mb-6">
//                             Please select both Standard, Division and Semester to proceed.
//                         </div>
//                     )}
//                     
//                     {loading ? (
//                         <div className="text-center p-8 text-blue-600">Loading results...</div>
//                     ) : (
//                         results.length > 0 ? (
//                             <div className="overflow-x-auto">
//                                 <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">
//                                     Semester-{selectedSem} Results
//                                 </h2>
//                                 <table className="min-w-full border rounded-xl table-auto text-sm">
//                                     <thead className="bg-blue-100 text-left text-gray-700">
//                                         <tr>
//                                             <th className="py-2 px-4 border">Name</th>
//                                             {subjects.map(subject => (
//                                                 <th key={subject} className="py-2 px-4 border">{subject}</th>
//                                             ))}
//                                             <th className="py-2 px-4 border">Total</th>
//                                             <th className="py-2 px-4 border">Percentage</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {renderTableBody()}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         ) : (
//                             selectedStd && selectedDiv && selectedSem && (
//                                 <div className="text-gray-500 text-sm mt-4 text-center p-8 border rounded-xl bg-gray-50">
//                                     No results found for Standard {selectedStd}, Division {selectedDiv}, Semester {selectedSem}
//                                 </div>
//                             )
//                         )
//                     )}
//                 </div>
//             </div>
//         </MainLayout>
//     );
// }