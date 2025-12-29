// export default function FeesManagement() {
//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-4xl mx-auto">
//         {/* Title */}
//         <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
//           Fees Management
//         </h1>
        
//         {/* Table */}
//         <div className="bg-white border-2 border-blue-500 overflow-hidden">
//           <table className="w-full">
//             <thead>
//               <tr>
//                 <th className="border-2 border-blue-500 px-4 py-3 bg-white text-left font-semibold text-gray-800">
//                   Date
//                 </th>
//                 <th className="border-2 border-blue-500 px-4 py-3 bg-white text-left font-semibold text-gray-800">
//                   Total Fees
//                 </th>
//                 <th className="border-2 border-blue-500 px-4 py-3 bg-white text-left font-semibold text-gray-800">
//                   Installment
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* Empty rows matching the image */}
//               <tr>
//                 <td className="border-2 border-blue-500 px-4 py-6 bg-white"></td>
//                 <td className="border-2 border-blue-500 px-4 py-6 bg-white"></td>
//                 <td className="border-2 border-blue-500 px-4 py-6 bg-white"></td>
//               </tr>
//               <tr>
//                 <td className="border-2 border-blue-500 px-4 py-6 bg-white"></td>
//                 <td className="border-2 border-blue-500 px-4 py-6 bg-white"></td>
//                 <td className="border-2 border-blue-500 px-4 py-6 bg-white"></td>
//               </tr>
//               <tr>
//                 <td className="border-2 border-blue-500 px-4 py-6 bg-white"></td>
//                 <td className="border-2 border-blue-500 px-4 py-6 bg-white"></td>
//                 <td className="border-2 border-blue-500 px-4 py-6 bg-white"></td>
//               </tr>
//               <tr>
//                 <td className="border-2 border-blue-500 px-4 py-6 bg-white"></td>
//                 <td className="border-2 border-blue-500 px-4 py-6 bg-white"></td>
//                 <td className="border-2 border-blue-500 px-4 py-6 bg-white"></td>
//               </tr>
//               <tr>
//                 <td className="border-2 border-blue-500 px-4 py-6 bg-white"></td>
//                 <td className="border-2 border-blue-500 px-4 py-6 bg-white"></td>
//                 <td className="border-2 border-blue-500 px-4 py-6 bg-white"></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }












// import React, { useState } from 'react';
// import axios from 'axios';

// // --- Arrays for your dropdowns ---
// const stdOptions = Array.from({ length: 10 }, (_, i) => i + 1); // [1, 2, 3... 10]
// const divOptions = ['A', 'B', 'C', 'D', 'E'];

// // --- Auth Header (from your other components) ---
// const AUTH_HEADER = 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=';

// // --- Helper function to format date ---
// const formatDate = (dateString) => {
//     if (!dateString) return '';
//     try {
//         const date = new Date(dateString);
//         if (isNaN(date.getTime())) {
//             return dateString;
//         }
//         const day = String(date.getDate()).padStart(2, '0');
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const year = date.getFullYear();
//         return `${day}/${month}/${year}`;
//     } catch {
//         return dateString;
//     }
// };

// export default function FeesManagement() {
//     const [std, setStd] = useState('');
//     const [div, setDiv] = useState('');
//     const [installments, setInstallments] = useState([]);

//     const fetchPayments = async () => {
//         if (!std || !div) {
//             alert("Please select both a Standard and a Division.");
//             return;
//         }

//         try {
//             console.log("Fetching payments...");
//             const response = await axios.get(
//                 'http://localhost:5000/api/payment-entries',
//                 {
//                     headers: { 'auth': AUTH_HEADER }
//                 }
//             );

//             const filteredEntries = response.data.filter(entry =>
//                 String(entry.std) === std && String(entry.div) === div
//             );
//             console.log("Filtered student entries:", filteredEntries);

//             const allInstallments = filteredEntries.flatMap(entry =>
//                 entry.installments.map(installment => ({
//                     _id: installment._id || `${entry._id}-${installment.date}`,
//                     date: installment.date,
//                     totalFees: entry.totalFees,
//                     amount: installment.amount,
//                     name: entry.name
//                 }))
//             );

//             console.log("Flattened installments for table:", allInstallments);
//             setInstallments(allInstallments);

//         } catch (error) {
//             console.error("Error fetching payment data:", error);
//             setInstallments([]);
//         }
//     };

//     return (
//         <div className="p-6 bg-gray-50 min-h-screen">
//             <div className="max-w-4xl mx-auto">
//                 <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
//                     Fees Management
//                 </h1>

//                 {/* --- Container for Dropdowns --- */}
//                 <div className="flex gap-8 mb-8 justify-center items-center">
//                     <div className="flex items-center gap-3">
//                         <label className="text-gray-700 font-medium">Std</label>
//                         <select
//                             value={std}
//                             onChange={(e) => setStd(e.target.value)}
//                             className="border border-gray-400 px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         >
//                             <option value="">Select Std</option>
//                             {stdOptions.map(option => (
//                                 <option key={option} value={option}>{option}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="flex items-center gap-3">
//                         <label className="text-gray-700 font-medium">Div</label>
//                         <select
//                             value={div}
//                             onChange={(e) => setDiv(e.target.value)}
//                             className="border border-gray-400 px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         >
//                             <option value="">Select Div</option>
//                             {divOptions.map(option => (
//                                 <option key={option} value={option}>{option}</option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>

//                 {/* --- NEW: Separate Container for the Button --- */}
//                 <div className="text-center mb-8">
//                     <button
//                         onClick={fetchPayments}
//                         className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-6 py-2 rounded-full border border-blue-300 transition-colors duration-200"
//                     >
//                         Fetch Payments
//                     </button>
//                 </div>

//                 {/* --- Table --- */}
//                 <div className="bg-white border-2 border-blue-500 overflow-hidden">
//                     <table className="w-full">
//                         <thead>
//                             <tr>
//                                 <th className="border-2 border-blue-500 px-4 py-3 bg-white text-left font-semibold text-gray-800">
//                                     Date
//                                 </th>
//                                 <th className="border-2 border-blue-500 px-4 py-3 bg-white text-left font-semibold text-gray-800">
//                                     Total Fees
//                                 </th>
//                                 <th className="border-2 border-blue-500 px-4 py-3 bg-white text-left font-semibold text-gray-800">
//                                     Installment
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {installments.length === 0 ? (
//                                 <tr>
//                                     <td colSpan="3" className="border-2 border-blue-500 px-4 py-6 bg-white text-center text-gray-500">
//                                         No payment data found for this selection.
//                                     </td>
//                                 </tr>
//                             ) : (
//                                 installments.map((installment) => (
//                                     <tr key={installment._id}>
//                                         <td className="border-2 border-blue-500 px-4 py-4 bg-white">
//                                             {formatDate(installment.date)}
//                                         </td>
//                                         <td className="border-2 border-blue-500 px-4 py-4 bg-white">
//                                             {installment.totalFees}
//                                         </td>
//                                         <td className="border-2 border-blue-500 px-4 py-4 bg-white">
//                                             {installment.amount}
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }








import React, { useState, useEffect } from 'react'; // Import hooks
import axios from 'axios'; // Import axios
// --- FIX: Cleared up the duplicated and incomplete import lines. ---
import { API_BASE_URL } from '../../config';

// --- Arrays for your dropdowns (only used if no student prop) ---
const stdOptions = Array.from({ length: 10 }, (_, i) => i + 1); // [1, 2, 3... 10]
const divOptions = ['A', 'B', 'C', 'D', 'E'];

// --- Auth Header ---
const AUTH_HEADER = 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=';

// --- Helper function to format date ---
const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    } catch {
        return dateString;
    }
};

// --- Accept 'student' as a prop ---
export default function FeesManagement({ student }) { // Accept student prop here
    // State for manual dropdowns
    const [std, setStd] = useState('');
    const [div, setDiv] = useState('');

    // State for installments and loading indicator
    const [installments, setInstallments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // --- fetchPayments function now accepts parameters ---
    const fetchPayments = async (stdToFetch, divToFetch, studentName = null) => {
        // Basic check if using dropdowns
        if (!student && (!stdToFetch || !divToFetch)) {
             alert("Please select both a Standard and a Division.");
             return;
        }

        setIsLoading(true); // Start loading
        setInstallments([]); // Clear previous results

        try {
            console.log("Fetching payments for:", { std: stdToFetch, div: divToFetch, name: studentName });

            // Fetch ALL payment entries
            // FIX: Using imported API_BASE_URL
            const response = await axios.get(
                `${API_BASE_URL}api/payment-entries`,
                { headers: { 'auth': AUTH_HEADER } }
            );

            let filteredEntries = response.data;

            // 1. Filter by std/div if provided (either from prop or dropdown)
            if (stdToFetch && divToFetch) {
                filteredEntries = filteredEntries.filter(entry =>
                    String(entry.std) === String(stdToFetch) && String(entry.div) === String(divToFetch)
                );
            }

            // 2. If a specific student name is provided (from the prop), filter further
            if (studentName) {
                filteredEntries = filteredEntries.filter(entry => entry.name === studentName);
            }

            console.log("Filtered student entries:", filteredEntries);

            // Flatten the installments
            const allInstallments = filteredEntries.flatMap(entry =>
                entry.installments.map(installment => ({
                    _id: installment._id || `${entry._id}-${installment.date}`,
                    date: installment.date,
                    totalFees: entry.totalFees,
                    amount: installment.amount,
                    name: entry.name // Keep name for potential future display
                }))
            );

            console.log("Flattened installments for table:", allInstallments);
            setInstallments(allInstallments);

        } catch (error) {
            console.error("Error fetching payment data:", error);
            setInstallments([]); // Clear data on error
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    // --- useEffect to fetch data automatically if 'student' prop exists ---
    useEffect(() => {
        if (student && student.std && student.div) {
            console.log("Student prop found, fetching automatically:", student);
            // Fetch using the student's std, div, and name from the prop
            fetchPayments(student.std, student.div, student.name);
        } else {
             console.log("No student prop, waiting for manual fetch.");
             setInstallments([]); // Clear installments if no student prop initially
        }
    }, [student]); // Dependency array: re-run if the 'student' prop changes

    // --- Handler for the manual fetch button ---
    const handleManualFetch = () => {
        fetchPayments(std, div); // Fetch using state values from dropdowns
    };

    return (
        <div className=" min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
                    Fees Management
                </h1>

                {/* --- Conditionally show dropdowns or student info boxes --- */}
                {!student ? (
                    // --- Show dropdowns and button if NO student prop ---
                    <>
                        <div className="flex gap-8 mb-8 justify-center items-center">
                            {/* Std Dropdown */}
                            <div className="flex items-center gap-3">
                                <label className="text-gray-700 font-medium">Std</label>
                                <select
                                    value={std}
                                    onChange={(e) => setStd(e.target.value)}
                                    className="border border-gray-400 px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded"
                                >
                                    <option value="">Select Std</option>
                                    {stdOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Div Dropdown */}
                            <div className="flex items-center gap-3">
                                <label className="text-gray-700 font-medium">Div</label>
                                <select
                                    value={div}
                                    onChange={(e) => setDiv(e.target.value)}
                                    className="border border-gray-400 px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded"
                                >
                                    <option value="">Select Div</option>
                                    {divOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {/* Fetch Button */}
                        <div className="text-center mb-8">
                            <button
                                onClick={handleManualFetch}
                                className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-6 py-2 rounded-full border border-blue-300 transition-colors duration-200"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Fetching...' : 'Fetch Payments'}
                            </button>
                        </div>
                    </>
                ) : (
                     // --- Show student info in boxes if student prop IS present ---
                    <div className="flex flex-col items-center gap-4 mb-8"> {/* Use flex-col for centering */}
                        {/* Student Name Display */}
                        <div className="flex items-center gap-3 w-full max-w-sm"> {/* Limit width */}
                            <label className="text-gray-700 font-medium w-20 text-right">Name</label>
                            <div className="flex-1 border border-gray-300 bg-gray-100 px-3 py-2 rounded text-gray-700">
                                {student.name || 'N/A'}
                            </div>
                        </div>
                        {/* Std and Div Display */}
                        <div className="flex gap-8 justify-center items-center w-full max-w-sm"> {/* Limit width */}
                             <div className="flex items-center gap-3 flex-1">
                                <label className="text-gray-700 font-medium">Std</label>
                                <div className="border border-gray-300 bg-gray-100 px-3 py-2 w-full rounded text-gray-700"> {/* Use w-full */}
                                    {student.std || 'N/A'}
                                </div>
                            </div>
                             <div className="flex items-center gap-3 flex-1">
                                <label className="text-gray-700 font-medium">Div</label>
                                <div className="border border-gray-300 bg-gray-100 px-3 py-2 w-full rounded text-gray-700"> {/* Use w-full */}
                                    {student.div || 'N/A'}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- Table --- */}
                <div className="bg-white border-2 border-blue-500 overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="border-2 border-blue-500 px-4 py-3 bg-white text-left font-semibold text-gray-800">Date</th>
                                <th className="border-2 border-blue-500 px-4 py-3 bg-white text-left font-semibold text-gray-800">Total Fees</th>
                                <th className="border-2 border-blue-500 px-4 py-3 bg-white text-left font-semibold text-gray-800">Installment Paid</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="3" className="border-2 border-blue-500 px-4 py-6 bg-white text-center text-gray-500">
                                        Loading payment data...
                                    </td>
                                </tr>
                            ) : installments.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="border-2 border-blue-500 px-4 py-6 bg-white text-center text-gray-500">
                                        No payment data found for this selection.
                                    </td>
                                </tr>
                            ) : (
                                installments.map((installment) => (
                                    <tr key={installment._id}>
                                        <td className="border-2 border-blue-500 px-4 py-4 bg-white">
                                            {formatDate(installment.date)}
                                        </td>
                                        <td className="border-2 border-blue-500 px-4 py-4 bg-white">
                                            {installment.totalFees}
                                        </td>
                                        <td className="border-2 border-blue-500 px-4 py-4 bg-white">
                                            {installment.amount}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}