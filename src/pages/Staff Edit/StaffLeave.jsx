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































// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../../config';

// const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
// // const API_BASE_URL = "http://localhost:5000/api"; // REMOVED LOCAL DEFINITION

// // Helper function to format MongoDB ISO date string to DD MMM YYYY
// const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-GB', {
//             day: '2-digit', month: 'short', year: 'numeric', weekday: 'short'
//         }).replace(/,/g, ' |'); // Format: DD MMM YYYY | Day
//     } catch {
//         return dateString;
//     }
// };

// export default function StaffLeave({ staff }) {
//     const staffName = `${staff?.firstname || ''} ${staff?.lastname || ''}`.trim() || 'Staff Member';
//     const staffId = staff?.staffid;

//     const [leaveRequests, setLeaveRequests] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // --- Dynamic Fetching Logic ---
//     const fetchLeaveRequests = useCallback(async () => {
//         if (!staffId) {
//             console.warn("DEBUG: StaffLeave - Staff ID is missing, cannot fetch requests.");
//             setLeaveRequests([]);
//             return;
//         }

//         setIsLoading(true);
//         setError(null);
//         setLeaveRequests([]);

//         try {
//             console.log(`DEBUG: StaffLeave - Fetching ALL leave requests from /getrequests`);
//             
//             // NOTE: This endpoint returns ALL requests, so we filter by staffId in the frontend.
//             // FIX: Using imported API_BASE_URL
//             const response = await axios.get(`${API_BASE_URL}api/getrequests`, {
//                 headers: { 'auth': AUTH_HEADER }
//             });

//             const allRequests = response.data || [];
//             
//             // FILTER STEP: Filter the list to include only requests matching the current staffId
//             const filteredRequests = allRequests.filter(
//                 request => String(request.staffid) === String(staffId)
//             );
//             
//             console.log(`DEBUG: StaffLeave - Filtered down to ${filteredRequests.length} requests for ${staffId}`);
//             setLeaveRequests(filteredRequests);

//         } catch (err) {
//             const errorMsg = err.response?.data?.message || err.message;
//             console.error("❌ ERROR: StaffLeave - Failed to fetch leave requests:", errorMsg);
//             setError(errorMsg);
//             setLeaveRequests([]);
//         } finally {
//             setIsLoading(false);
//         }
//     }, [staffId]);
//     
//     // Fetch data whenever the staff ID changes
//     useEffect(() => {
//         fetchLeaveRequests();
//     }, [fetchLeaveRequests]);


//     // Helper to map status string to Tailwind class (since DB status is typically lowercase or mixed case)
//     const getStatusColor = (status) => {
//         switch (status?.toLowerCase()) {
//             case 'approved':
//             case 'accepted':
//                 return 'text-green-600';
//             case 'rejected':
//                 return 'text-red-600';
//             case 'pending':
//             default:
//                 return 'text-yellow-600';
//         }
//     };
//     
//     // --- Rendering ---
//     return (
//         <div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">
//                 Leave Request History 
//             </h2>
//             
//             {isLoading ? (
//                 <div className="text-center p-8 text-blue-600">Loading leave history...</div>
//             ) : error ? (
//                 <div className="text-center p-8 text-red-600">Error: {error}</div>
//             ) : leaveRequests.length === 0 ? (
//                  <div className="text-center p-8 text-gray-500">No leave requests found for this staff member.</div>
//             ) : (
//                 <div className="space-y-4">
//                     {leaveRequests.map((request, index) => (
//                         <div
//                             // Use MongoDB _id for unique key if available, otherwise use index
//                             key={request._id || index} 
//                             className="flex items-center bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
//                         >
//                             <div className="bg-blue-600 text-white p-4 flex items-center justify-center w-12 h-full flex-shrink-0">
//                                 <span className="font-bold text-lg">{index + 1}</span>
//                             </div>
//                             <div className="flex-1 p-4 min-w-0">
//                                 <div className="text-blue-600 font-semibold mb-1 truncate">
//                                     {request.subject || 'No Subject'}
//                                 </div>
//                                 <div className="text-gray-600 text-sm truncate">
//                                     {request.message || request.body || 'No description provided.'}
//                                 </div>
//                                 <div className="text-xs text-gray-500">
//                                     {/* Display date range if available, falling back to submission date */}
//                                     {request.from && request.to 
//                                         ? `From: ${formatDate(request.from)} To: ${formatDate(request.to)}` 
//                                         : `Submitted: ${formatDate(request.submitted_at)}`
//                                     }
//                                 </div>
//                             </div>
//                             <div className="p-4 text-right flex flex-col justify-center items-end flex-shrink-0">
//                                 <div className={`${getStatusColor(request.status)} font-semibold mb-2`}>
//                                     {request.status ? request.status.toUpperCase() : 'PENDING'}
//                                 </div>
//                                 <button className="text-blue-600 text-sm hover:underline">
//                                     View Details
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }



















// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../../config';

// const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
// // const API_BASE_URL = "http://localhost:5000/api"; // REMOVED LOCAL DEFINITION

// // Helper function to format MongoDB ISO date string to DD MMM YYYY
// const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-GB', {
//             day: '2-digit', month: 'short', year: 'numeric', weekday: 'short'
//         }).replace(/,/g, ' |'); // Format: DD MMM YYYY | Day
//     } catch {
//         return dateString;
//     }
// };

// export default function StaffLeave({ staff }) {
//     const staffName = `${staff?.firstname || ''} ${staff?.lastname || ''}`.trim() || 'Staff Member';
//     const staffId = staff?.staffid;

//     const [leaveRequests, setLeaveRequests] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // --- Dynamic Fetching Logic ---
//     const fetchLeaveRequests = useCallback(async () => {
//         if (!staffId) {
//             console.warn("DEBUG: StaffLeave - Staff ID is missing, cannot fetch requests.");
//             setLeaveRequests([]);
//             return;
//         }

//         setIsLoading(true);
//         setError(null);
//         setLeaveRequests([]);

//         try {
//             console.log(`DEBUG: StaffLeave - Fetching ALL leave requests from /getrequests`);
//             
//             // NOTE: This endpoint returns ALL requests, so we filter by staffId in the frontend.
//             // FIX: Using imported API_BASE_URL
//             const response = await axios.get(`${API_BASE_URL}api/getrequests`, {
//                 headers: { 'auth': AUTH_HEADER }
//             });

//             const allRequests = response.data || [];
//             
//             // FILTER STEP: Filter the list to include only requests matching the current staffId
//             const filteredRequests = allRequests.filter(
//                 request => String(request.staffid) === String(staffId)
//             );
//             
//             console.log(`DEBUG: StaffLeave - Filtered down to ${filteredRequests.length} requests for ${staffId}`);
//             setLeaveRequests(filteredRequests);

//         } catch (err) {
//             const errorMsg = err.response?.data?.message || err.message;
//             console.error("❌ ERROR: StaffLeave - Failed to fetch leave requests:", errorMsg);
//             setError(errorMsg);
//             setLeaveRequests([]);
//         } finally {
//             setIsLoading(false);
//         }
//     }, [staffId]);
//     
//     // Fetch data whenever the staff ID changes
//     useEffect(() => {
//         fetchLeaveRequests();
//     }, [fetchLeaveRequests]);


//     // Helper to map status string to Tailwind class (since DB status is typically lowercase or mixed case)
//     const getStatusColor = (status) => {
//         switch (status?.toLowerCase()) {
//             case 'approved':
//             case 'accepted':
//                 return 'text-green-600';
//             case 'rejected':
//                 return 'text-red-600';
//             case 'pending':
//             default:
//                 return 'text-yellow-600';
//         }
//     };

//     // --- NEW: Handle View Details ---
//     const handleViewDetails = (request) => {
//         const title = request.subject ? request.subject.toUpperCase() : 'LEAVE REQUEST DETAILS';
//         const dates = request.from && request.to 
//             ? `From: ${formatDate(request.from)}\nTo: ${formatDate(request.to)}` 
//             : 'Dates: N/A';
//         const submission = request.submitted_at 
//             ? `Submitted On: ${formatDate(request.submitted_at)}` 
//             : 'Submission Date: N/A';
            
//         const detailedMessage = 
//             `${title}\n` +
//             `==============================\n` +
//             `Staff ID: ${request.staffid}\n` +
//             `Status: ${request.status.toUpperCase()}\n` +
//             `${dates}\n` +
//             `${submission}\n\n` +
//             `Message:\n${request.message || 'No detailed message.'}`;

//         alert(detailedMessage);
//     };
//     // --- END: Handle View Details ---
    
//     // --- Rendering ---
//     return (
//         <div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">
//                 Leave Request History 
//             </h2>
//             
//             {isLoading ? (
//                 <div className="text-center p-8 text-blue-600">Loading leave history...</div>
//             ) : error ? (
//                 <div className="text-center p-8 text-red-600">Error: {error}</div>
//             ) : leaveRequests.length === 0 ? (
//                  <div className="text-center p-8 text-gray-500">No leave requests found for this staff member.</div>
//             ) : (
//                 <div className="space-y-4">
//                     {leaveRequests.map((request, index) => (
//                         <div
//                             // Use MongoDB _id for unique key if available, otherwise use index
//                             key={request._id || index} 
//                             className="flex items-center bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
//                         >
//                             <div className="bg-blue-600 text-white p-4 flex items-center justify-center w-12 h-full flex-shrink-0">
//                                 <span className="font-bold text-lg">{index + 1}</span>
//                             </div>
//                             <div className="flex-1 p-4 min-w-0">
//                                 <div className="text-blue-600 font-semibold mb-1 truncate">
//                                     {request.subject || 'No Subject'}
//                                 </div>
//                                 <div className="text-gray-600 text-sm truncate">
//                                     {request.message || request.body || 'No description provided.'}
//                                 </div>
//                                 <div className="text-xs text-gray-500">
//                                     {/* Display date range if available, falling back to submission date */}
//                                     {request.from && request.to 
//                                         ? `From: ${formatDate(request.from)} To: ${formatDate(request.to)}` 
//                                         : `Submitted: ${formatDate(request.submitted_at)}`
//                                     }
//                                 </div>
//                             </div>
//                             <div className="p-4 text-right flex flex-col justify-center items-end flex-shrink-0">
//                                 <div className={`${getStatusColor(request.status)} font-semibold mb-2`}>
//                                     {request.status ? request.status.toUpperCase() : 'PENDING'}
//                                 </div>
//                                 {/* NEW: Add onClick handler to show details */}
//                                 <button 
//                                     onClick={() => handleViewDetails(request)} 
//                                     className="text-blue-600 text-sm hover:underline"
//                                 >
//                                     View Details
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }













import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../../config';

const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU="; // Updated placeholder to ensure it's not reused for auth
// const API_BASE_URL = "http://localhost:5000/api"; // REMOVED LOCAL DEFINITION

// Helper function to format MongoDB ISO date string to DD MMM YYYY
const formatDate = (dateString, includeWeekday = false) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit', 
            month: 'short', 
            year: 'numeric', 
            weekday: includeWeekday ? 'short' : undefined
        }).replace(/,/g, ' |'); // Format: DD MMM YYYY | Day (if includeWeekday is true)
    } catch {
        return dateString;
    }
};

// --- Custom Leave Request Details Popup Component (Based on image_9ea572.png) ---
const LeaveDetailsPopup = ({ request, onClose }) => {
    if (!request) return null;
    
    // Format dates for display in the popup body
    const fromDateDisplay = formatDate(request.from, true);
    const toDateDisplay = formatDate(request.to, true);
    const submittedDateDisplay = formatDate(request.submitted_at);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50"
        style={{ 
                // Using RGBA to create the dimming effect without blurring the backdrop
                backgroundColor: 'rgba(50, 50, 50, 0.5)', 
            }}
        >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                <div className="p-6 border-b">
                    <h3 className="text-xl font-bold text-gray-800">Leave Request Details</h3>
                </div>
                <div className="p-6">
                    {/* Top block (Matching image_9ea572.png format) */}
                    <div className="text-sm space-y-4">
                        <p className="whitespace-pre-line text-gray-700">
                            <p><strong>Subject:</strong> {request.subject || 'N/A'}</p>
                            <br />
                            Respectfully Sir/Madam,
                            <br /><br />
                            {request.message || request.body || 'No detailed message provided.'}
                            <br /><br />
                            Thanking you,
                            <br />
                            Your faithfully,
                        </p>
                        <p className="text-xs text-gray-500">
                            Request Submitted On: {submittedDateDisplay}
                        </p>
                    </div>
                    
                    {/* Metadata block (For completeness, if needed below the message) */}
                    <div className="mt-4 pt-4 border-t border-gray-100 text-xs space-y-1 text-gray-600">
                        <p><strong>Status:</strong> <span className={`font-bold ${getStatusColor(request.status)}`}>{request.status?.toUpperCase() || 'PENDING'}</span></p>
                        <p><strong>Leave Period:</strong> {fromDateDisplay} to {toDateDisplay}</p>
                    </div>

                </div>
                <div className="p-4 border-t flex justify-end">
                    <button 
                        onClick={onClose} 
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

// Helper to map status string to Tailwind class (moved out for use in Popup too)
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


export default function StaffLeave({ staff }) {
    const staffName = `${staff?.firstname || ''} ${staff?.lastname || ''}`.trim() || 'Staff Member';
    const staffId = staff?.staffid;

    const [leaveRequests, setLeaveRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // NEW State for Details Popup
    const [selectedRequest, setSelectedRequest] = useState(null);


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


    // --- NEW: Action Handlers (PLACEHOLDER FUNCTIONS) ---

    // This button logic is typically for an Admin view, but implemented here as requested.
    const handleAcceptReject = async (requestId, newStatus) => {
        // Find the request by ID (using map index as ID fallback)
        const requestToUpdate = leaveRequests.find(r => r._id === requestId);
        if (!requestToUpdate) return;

        // Optimistic UI Update (optional, but faster for user feedback)
        setLeaveRequests(prevRequests => prevRequests.map(req => 
            req._id === requestId ? { ...req, status: 'PROCESSING' } : req
        ));
        
        console.log(`Action: ${newStatus.toUpperCase()} Request ID: ${requestId}`);
        alert(`Request ${requestToUpdate.subject} is marked as ${newStatus.toUpperCase()}. (Backend endpoint placeholder executed)`);

        // Placeholder for real API call (You would use an endpoint like api/updaterequest/:id)
        // try {
        //     await axios.put(`${API_BASE_URL}api/updaterequest/${requestId}`, 
        //         { status: newStatus },
        //         { headers: { 'auth': AUTH_HEADER } }
        //     );
        // } catch (error) {
        //     console.error(`Failed to update request status:`, error);
        //     alert(`Failed to ${newStatus} the request.`);
        // }
        
        // Re-fetch data to reflect the actual status change from the server
        fetchLeaveRequests();
    };

    // --- NEW: Handle View Details using State ---
    const handleViewDetails = (request) => {
        setSelectedRequest(request);
    };
    const handleCloseDetails = () => {
        setSelectedRequest(null);
    };
    // --- END: Handle View Details ---
    
    // --- Rendering ---
    return (
        <div>
            {/* Render Popup if a request is selected */}
            <LeaveDetailsPopup 
                request={selectedRequest} 
                onClose={handleCloseDetails} 
            />

            <h2 className="text-2xl text-center font-semibold text-gray-800 mb-8">
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
                    {leaveRequests.map((request, index) => {
                        const statusLower = request.status?.toLowerCase();
                        const isPending = statusLower === 'pending';
                        
                        return (
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
                                        ? `From: ${formatDate(request.from, true)} To: ${formatDate(request.to, true)}` 
                                        : `Submitted: ${formatDate(request.submitted_at)}`
                                    }
                                </div>
                            </div>
                            
                                {/* Status and Action Buttons */}
                            <div className="p-4 text-right flex flex-col justify-center items-end flex-shrink-0 space-y-1">
                                <div className={`${getStatusColor(request.status)} font-semibold mb-1`}>
                                    {request.status ? request.status.toUpperCase() : 'PENDING'}
                                </div>
                                
                                {/* NEW: Accept/Reject Buttons */}
                                {isPending && (
                                    <div className="flex space-x-2">
                                        <button 
                                            onClick={() => handleAcceptReject(request._id, 'accepted')} 
                                            className="px-4 py-2 bg-green-300 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition"
                                            title="Accept Leave Request"
                                        >
                                            Accept
                                        </button>
                                        <button 
                                            onClick={() => handleAcceptReject(request._id, 'rejected')} 
                                            className="px-4 py-2 bg-red-300 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition"
                                            title="Reject Leave Request"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                                
                                {/* View Details Button */}
                                <button 
                                    onClick={() => handleViewDetails(request)} 
                                    className="text-blue-600 text-sm hover:underline"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    )})}
                </div>
            )}
        </div>
    );
}