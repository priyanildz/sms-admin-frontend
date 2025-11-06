// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const ExamPaperEval = () => {
//     const navigate = useNavigate();
//     const [paperEvalData, setPaperEvalData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Fetch assigned papers on component mount
//     useEffect(() => {
//         fetchAssignedPapers();
//     }, []);

//     const fetchAssignedPapers = async () => {
//         try {
//             setLoading(true);
//             const response = await fetch('http://localhost:5000/api/assigned-papers',{
//                 headers:{
//                     auth:'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
//                 }
//             });
//             const result = await response.json();
            
//             if (result.success) {
//                 setPaperEvalData(result.data);
//             } else {
//                 setError('Failed to fetch assignments');
//             }
//         } catch (err) {
//             setError('Error fetching data: ' + err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const assignPapers = () => {
//         navigate("/exams-assign-papers");
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this assignment?')) {
//             try {
//                 const response = await fetch(`/api/assigned-paper/${id}`, {
//                     method: 'DELETE'
//                 });
//                 const result = await response.json();
                
//                 if (result.success) {
//                     // Refresh the data
//                     fetchAssignedPapers();
//                 } else {
//                     alert('Failed to delete assignment');
//                 }
//             } catch (err) {
//                 alert('Error deleting assignment: ' + err.message);
//             }
//         }
//     };

//     if (loading) {
//         return (
//             <MainLayout>
//                 <div className="bg-white rounded-2xl shadow p-6">
//                     <div className="flex items-center justify-center h-64">
//                         <div className="text-gray-500">Loading...</div>
//                     </div>
//                 </div>
//             </MainLayout>
//         );
//     }

//     if (error) {
//         return (
//             <MainLayout>
//                 <div className="bg-white rounded-2xl shadow p-6">
//                     <div className="flex items-center justify-center h-64">
//                         <div className="text-red-500">{error}</div>
//                     </div>
//                 </div>
//             </MainLayout>
//         );
//     }

//     return (
//         <MainLayout>
//             <div className="bg-white rounded-2xl shadow p-6">
//                 {/* Page Heading */}
//                 <div className="flex items-center justify-between mb-6">
//                     <h1 className="text-xl font-semibold text-gray-800">
//                         Exam Paper Evaluation
//                     </h1>
//                     <button
//                         onClick={assignPapers}
//                         className="bg-blue-700 text-white text-sm px-5 py-2 rounded-md hover:bg-blue-800 transition-all"
//                     >
//                         + Add Assignment
//                     </button>
//                 </div>

//                 {/* Evaluation Table */}
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full text-sm border rounded-xl">
//                         <thead className="bg-blue-100 text-gray-700 text-left">
//                             <tr>
//                                 <th className="py-3 px-4 border">Teacher Name</th>
//                                 <th className="py-3 px-4 border">Standard</th>
//                                 <th className="py-3 px-4 border">Division</th>
//                                 <th className="py-3 px-4 border">Subject</th>
//                                 <th className="py-3 px-4 border">No. of Papers</th>
//                                 <th className="py-3 px-4 border">Assigned By</th>
//                                 <th className="py-3 px-4 border">Date Assigned</th>
//                                 {/* <th className="py-3 px-4 border">Actions</th> */}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {paperEvalData.length > 0 ? (
//                                 paperEvalData.map((entry) => (
//                                     <tr key={entry._id} className="hover:bg-gray-50 transition-all">
//                                         <td className="py-2 px-4 border">
//                                             {entry.assignedteacher?.firstname || 'N/A'}
//                                         </td>
//                                         <td className="py-2 px-4 border">{entry.standard}</td>
//                                         <td className="py-2 px-4 border">{entry.division}</td>
//                                         <td className="py-2 px-4 border">{entry.subject}</td>
//                                         <td className="py-2 px-4 border text-center">{entry.numberOfPapers}</td>
//                                         <td className="py-2 px-4 border">{entry.assignedby || 'admin'}</td>
//                                         <td className="py-2 px-4 border">
//                                             {new Date(entry.createdAt).toLocaleDateString()}
//                                         </td>
//                                         {/* <td className="py-2 px-4 border"> */}
//                                             {/* <div className="flex space-x-2">
//                                                 <button
//                                                     onClick={() => navigate(`/edit-paper-assignment/${entry._id}`)}
//                                                     className="text-blue-600 hover:text-blue-800 text-xs"
//                                                 >
//                                                     Edit
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleDelete(entry._id)}
//                                                     className="text-red-600 hover:text-red-800 text-xs"
//                                                 >
//                                                     Delete
//                                                 </button>
//                                             </div> */}
//                                         {/* </td> */}
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="8" className="text-center py-6 text-gray-500 border">
//                                         No paper evaluations available.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </MainLayout>
//     );
// };

// export default ExamPaperEval;

import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

const ExamPaperEval = () => {
    const navigate = useNavigate();
    const [paperEvalData, setPaperEvalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch assigned papers on component mount
    useEffect(() => {
        fetchAssignedPapers();
    }, []);

    const fetchAssignedPapers = async () => {
        try {
            setLoading(true);
            // FIX 1: Using imported API_BASE_URL
            const response = await fetch(`${API_BASE_URL}api/assigned-papers`,{
                headers:{
                    auth:'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
                }
            });
            const result = await response.json();
            
            if (result.success) {
                setPaperEvalData(result.data);
            } else {
                setError('Failed to fetch assignments');
            }
        } catch (err) {
            setError('Error fetching data: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const assignPapers = () => {
        navigate("/exams-assign-papers");
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this assignment?')) {
            try {
                // FIX 2: Using imported API_BASE_URL
                const response = await fetch(`${API_BASE_URL}api/assigned-paper/${id}`, {
                    method: 'DELETE'
                });
                const result = await response.json();
                
                if (result.success) {
                    // Refresh the data
                    fetchAssignedPapers();
                } else {
                    alert('Failed to delete assignment');
                }
            } catch (err) {
                alert('Error deleting assignment: ' + err.message);
            }
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="bg-white rounded-2xl shadow p-6">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-gray-500">Loading...</div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout>
                <div className="bg-white rounded-2xl shadow p-6">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-red-500">{error}</div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="bg-white rounded-2xl shadow p-6">
                {/* Page Heading */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-semibold text-gray-800">
                        Exam Paper Evaluation
                    </h1>
                    <button
                        onClick={assignPapers}
                        className="bg-blue-700 text-white text-sm px-5 py-2 rounded-md hover:bg-blue-800 transition-all"
                    >
                        + Add Assignment
                    </button>
                </div>

                {/* Evaluation Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border rounded-xl">
                        <thead className="bg-blue-100 text-gray-700 text-left">
                            <tr>
                                <th className="py-3 px-4 border">Teacher Name</th>
                                <th className="py-3 px-4 border">Standard</th>
                                <th className="py-3 px-4 border">Division</th>
                                <th className="py-3 px-4 border">Subject</th>
                                <th className="py-3 px-4 border">No. of Papers</th>
                                <th className="py-3 px-4 border">Assigned By</th>
                                <th className="py-3 px-4 border">Date Assigned</th>
                                {/* <th className="py-3 px-4 border">Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {paperEvalData.length > 0 ? (
                                paperEvalData.map((entry) => (
                                    <tr key={entry._id} className="hover:bg-gray-50 transition-all">
                                        <td className="py-2 px-4 border">
                                            {entry.assignedteacher?.firstname || 'N/A'}
                                        </td>
                                        <td className="py-2 px-4 border">{entry.standard}</td>
                                        <td className="py-2 px-4 border">{entry.division}</td>
                                        <td className="py-2 px-4 border">{entry.subject}</td>
                                        <td className="py-2 px-4 border text-center">{entry.numberOfPapers}</td>
                                        <td className="py-2 px-4 border">{entry.assignedby || 'admin'}</td>
                                        <td className="py-2 px-4 border">
                                            {new Date(entry.createdAt).toLocaleDateString()}
                                        </td>
                                        {/* <td className="py-2 px-4 border"> */}
                                            {/* <div className="flex space-x-2">
                                                <button
                                                    onClick={() => navigate(`/edit-paper-assignment/${entry._id}`)}
                                                    className="text-blue-600 hover:text-blue-800 text-xs"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(entry._id)}
                                                    className="text-red-600 hover:text-red-800 text-xs"
                                                >
                                                    Delete
                                                </button>
                                            </div> */}
                                        {/* </td> */}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-6 text-gray-500 border">
                                        No paper evaluations available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
};

export default ExamPaperEval;