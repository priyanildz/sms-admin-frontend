// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
// const API_BASE_URL = "http://localhost:5000/api";

// // Helper function to format MongoDB ISO date string to DD MMM YYYY
// const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-GB', {
//             day: '2-digit', month: 'short', year: 'numeric', weekday: 'short'
//         }).replace(/,/g, ' |'); // Format: DD MMM YYYY | Day
//     } catch {
//         return dateString;
//     }
// };

// export default function StaffLeave({ staff }) {
//     const staffName = `${staff?.firstname || ''} ${staff?.lastname || ''}`.trim() || 'Staff Member';
//     const staffId = staff?.staffid;

//     const [leaveRequests, setLeaveRequests] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // --- Dynamic Fetching Logic ---
//     const fetchLeaveRequests = useCallback(async () => {
//         if (!staffId) {
//             console.warn("DEBUG: StaffLeave - Staff ID is missing, cannot fetch requests.");
//             setLeaveRequests([]);
//             return;
//         }

//         setIsLoading(true);
//         setError(null);
//         setLeaveRequests([]);

//         try {
//             console.log(`DEBUG: StaffLeave - Fetching ALL leave requests from /getrequests`);
            
//             // NOTE: This endpoint returns ALL requests, so we filter by staffId in the frontend.
//             const response = await axios.get(`${API_BASE_URL}/getrequests`, {
//                 headers: { 'auth': AUTH_HEADER }
//             });

//             const allRequests = response.data || [];
            
//             // FILTER STEP: Filter the list to include only requests matching the current staffId
//             const filteredRequests = allRequests.filter(
//                 request => String(request.staffid) === String(staffId)
//             );
            
//             console.log(`DEBUG: StaffLeave - Filtered down to ${filteredRequests.length} requests for ${staffId}`);
//             setLeaveRequests(filteredRequests);

//         } catch (err) {
//             const errorMsg = err.response?.data?.message || err.message;
//             console.error("❌ ERROR: StaffLeave - Failed to fetch leave requests:", errorMsg);
//             setError(errorMsg);
//             setLeaveRequests([]);
//         } finally {
//             setIsLoading(false);
//         }
//     }, [staffId]);
    
//     // Fetch data whenever the staff ID changes
//     useEffect(() => {
//         fetchLeaveRequests();
//     }, [fetchLeaveRequests]);


//     // Helper to map status string to Tailwind class (since DB status is typically lowercase or mixed case)
//     const getStatusColor = (status) => {
//         switch (status?.toLowerCase()) {
//             case 'approved':
//             case 'accepted':
//                 return 'text-green-600';
//             case 'rejected':
//                 return 'text-red-600';
//             case 'pending':
//             default:
//                 return 'text-yellow-600';
//         }
//     };
    
//     // --- Rendering ---
//     return (
//         <div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">
//                 Leave Request History 
//             </h2>
            
//             {isLoading ? (
//                 <div className="text-center p-8 text-blue-600">Loading leave history...</div>
//             ) : error ? (
//                 <div className="text-center p-8 text-red-600">Error: {error}</div>
//             ) : leaveRequests.length === 0 ? (
//                  <div className="text-center p-8 text-gray-500">No leave requests found for this staff member.</div>
//             ) : (
//                 <div className="space-y-4">
//                     {leaveRequests.map((request, index) => (
//                         <div
//                             // Use MongoDB _id for unique key if available, otherwise use index
//                             key={request._id || index} 
//                             className="flex items-center bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
//                         >
//                             <div className="bg-blue-600 text-white p-4 flex items-center justify-center w-12 h-full flex-shrink-0">
//                                 <span className="font-bold text-lg">{index + 1}</span>
//                             </div>
//                             <div className="flex-1 p-4 min-w-0">
//                                 <div className="text-blue-600 font-semibold mb-1 truncate">
//                                     {request.subject || 'No Subject'}
//                                 </div>
//                                 <div className="text-gray-600 text-sm truncate">
//                                     {request.message || request.body || 'No description provided.'}
//                                 </div>
//                                 <div className="text-xs text-gray-500">
//                                     {/* Display date range if available, falling back to submission date */}
//                                     {request.from && request.to 
//                                         ? `From: ${formatDate(request.from)} To: ${formatDate(request.to)}` 
//                                         : `Submitted: ${formatDate(request.submitted_at)}`
//                                     }
//                                 </div>
//                             </div>
//                             <div className="p-4 text-right flex flex-col justify-center items-end flex-shrink-0">
//                                 <div className={`${getStatusColor(request.status)} font-semibold mb-2`}>
//                                     {request.status ? request.status.toUpperCase() : 'PENDING'}
//                                 </div>
//                                 <button className="text-blue-600 text-sm hover:underline">
//                                     View Details
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../../config';

const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
// const API_BASE_URL = "http://localhost:5000/api"; // REMOVED LOCAL DEFINITION

// Helper function to format MongoDB ISO date string to DD MMM YYYY
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric', weekday: 'short'
        }).replace(/,/g, ' |'); // Format: DD MMM YYYY | Day
    } catch {
        return dateString;
    }
};

export default function StaffLeave({ staff }) {
    const staffName = `${staff?.firstname || ''} ${staff?.lastname || ''}`.trim() || 'Staff Member';
    const staffId = staff?.staffid;

    const [leaveRequests, setLeaveRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- Dynamic Fetching Logic ---
    const fetchLeaveRequests = useCallback(async () => {
        if (!staffId) {
            console.warn("DEBUG: StaffLeave - Staff ID is missing, cannot fetch requests.");
            setLeaveRequests([]);
            return;
        }

        setIsLoading(true);
        setError(null);
        setLeaveRequests([]);

        try {
            console.log(`DEBUG: StaffLeave - Fetching ALL leave requests from /getrequests`);
            
            // NOTE: This endpoint returns ALL requests, so we filter by staffId in the frontend.
            // FIX: Using imported API_BASE_URL
            const response = await axios.get(`${API_BASE_URL}api/getrequests`, {
                headers: { 'auth': AUTH_HEADER }
            });

            const allRequests = response.data || [];
            
            // FILTER STEP: Filter the list to include only requests matching the current staffId
            const filteredRequests = allRequests.filter(
                request => String(request.staffid) === String(staffId)
            );
            
            console.log(`DEBUG: StaffLeave - Filtered down to ${filteredRequests.length} requests for ${staffId}`);
            setLeaveRequests(filteredRequests);

        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message;
            console.error("❌ ERROR: StaffLeave - Failed to fetch leave requests:", errorMsg);
            setError(errorMsg);
            setLeaveRequests([]);
        } finally {
            setIsLoading(false);
        }
    }, [staffId]);
    
    // Fetch data whenever the staff ID changes
    useEffect(() => {
        fetchLeaveRequests();
    }, [fetchLeaveRequests]);


    // Helper to map status string to Tailwind class (since DB status is typically lowercase or mixed case)
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved':
            case 'accepted':
                return 'text-green-600';
            case 'rejected':
                return 'text-red-600';
            case 'pending':
            default:
                return 'text-yellow-600';
        }
    };
    
    // --- Rendering ---
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Leave Request History 
            </h2>
            
            {isLoading ? (
                <div className="text-center p-8 text-blue-600">Loading leave history...</div>
            ) : error ? (
                <div className="text-center p-8 text-red-600">Error: {error}</div>
            ) : leaveRequests.length === 0 ? (
                 <div className="text-center p-8 text-gray-500">No leave requests found for this staff member.</div>
            ) : (
                <div className="space-y-4">
                    {leaveRequests.map((request, index) => (
                        <div
                            // Use MongoDB _id for unique key if available, otherwise use index
                            key={request._id || index} 
                            className="flex items-center bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="bg-blue-600 text-white p-4 flex items-center justify-center w-12 h-full flex-shrink-0">
                                <span className="font-bold text-lg">{index + 1}</span>
                            </div>
                            <div className="flex-1 p-4 min-w-0">
                                <div className="text-blue-600 font-semibold mb-1 truncate">
                                    {request.subject || 'No Subject'}
                                </div>
                                <div className="text-gray-600 text-sm truncate">
                                    {request.message || request.body || 'No description provided.'}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {/* Display date range if available, falling back to submission date */}
                                    {request.from && request.to 
                                        ? `From: ${formatDate(request.from)} To: ${formatDate(request.to)}` 
                                        : `Submitted: ${formatDate(request.submitted_at)}`
                                    }
                                </div>
                            </div>
                            <div className="p-4 text-right flex flex-col justify-center items-end flex-shrink-0">
                                <div className={`${getStatusColor(request.status)} font-semibold mb-2`}>
                                    {request.status ? request.status.toUpperCase() : 'PENDING'}
                                </div>
                                <button className="text-blue-600 text-sm hover:underline">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}