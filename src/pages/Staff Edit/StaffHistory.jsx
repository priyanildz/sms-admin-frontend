// import React from 'react';
// import { Clock } from 'lucide-react';

// // Static history data for illustration
// const historyEvents = [
//     { id: 1, label: "Joined as Primary Teacher", date: "June 2023" },
//     { id: 2, label: "Completed mandatory training (AY 2023-24)", date: "Jan 2024" },
//     { id: 3, label: "Promoted to Senior Teacher", date: "June 2024" },
// ];

// export default function StaffHistory({ staff }) {
//     const staffName = `${staff?.firstname || ''} ${staff?.lastname || ''}`.trim() || 'Staff Member';

//     return (
//         <div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">
//                 Service History for {staffName}
//             </h2>
//             <div className="bg-white border rounded-lg shadow-sm p-4 divide-y divide-gray-200">
//                 {historyEvents.map((event, i) => (
//                     <div key={event.id} className="py-3 flex items-start justify-between">
//                         <div className="flex items-center space-x-3">
//                             <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
//                             <div>
//                                 <span className="font-semibold text-gray-800 block">
//                                     {event.label}
//                                 </span>
//                                 <span className="text-sm text-gray-500">{event.date}</span>
//                             </div>
//                         </div>
//                         <button className="text-blue-600 hover:underline font-medium text-sm flex-shrink-0">
//                             Details
//                         </button>
//                     </div>
//                 ))}

//                 {historyEvents.length === 0 && (
//                     <div className="p-4 text-center text-gray-500">No service history found.</div>
//                 )}
//             </div>
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import axios from 'axios';
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../../config';

// Note: You must ensure API_BASE_URL is imported from your actual config file.

// Static data removed

const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

export default function StaffHistory({ staff }) {
    const staffName = `${staff?.firstname || ''} ${staff?.lastname || ''}`.trim() || 'Staff Member';
    const staffId = staff?.staffid;

    const [historyEvents, setHistoryEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch history data from the backend
    useEffect(() => {
        if (!staffId) {
            setError("Staff ID is missing. Cannot fetch history.");
            setIsLoading(false);
            return;
        }

        const fetchHistory = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Assuming the backend has a route like /api/staff/:staffid/history
                const response = await axios.get(`${API_BASE_URL}api/staff/${staffId}/history`, {
                    headers: { 'auth': AUTH_HEADER }
                });

                // Assuming the API returns an array of objects like: 
                // { id: 1, label: "Joined as Primary Teacher", date: "2023-06-15T..." }
                setHistoryEvents(response.data);

            } catch (err) {
                console.error("Error fetching service history:", err);
                setError("Failed to load service history.");
                setHistoryEvents([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, [staffId]);
    
    // Helper function to format date if the API returns a full ISO date
    const formatDate = (isoDate) => {
        if (!isoDate) return "N/A";
        // Simple format "Month YYYY"
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    };


    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Service History for {staffName}
            </h2>
            <div className="bg-white border rounded-lg shadow-sm p-4 divide-y divide-gray-200">
                
                {isLoading && (
                    <div className="p-4 text-center text-blue-600">Loading service history...</div>
                )}

                {error && (
                    <div className="p-4 text-center text-red-600 bg-red-50">{error}</div>
                )}

                {!isLoading && !error && historyEvents.length > 0 ? (
                    historyEvents.map((event, i) => (
                        <div key={event.id || i} className="py-3 flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                                <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                                <div>
                                    <span className="font-semibold text-gray-800 block">
                                        {event.label || 'Unknown Event'}
                                    </span>
                                    {/* Assuming event.date is an ISO string or similar */}
                                    <span className="text-sm text-gray-500">{formatDate(event.date)}</span>
                                </div>
                            </div>
                            <button className="text-blue-600 hover:underline font-medium text-sm flex-shrink-0">
                                Details
                            </button>
                        </div>
                    ))
                ) : (
                    !isLoading && !error && (
                        <div className="p-4 text-center text-gray-500">No service history found.</div>
                    )
                )}
            </div>
        </div>
    );
}