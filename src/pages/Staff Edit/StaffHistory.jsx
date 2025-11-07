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


import React, { useState, useEffect } from "react";
import { Clock, X } from "lucide-react"; // Imported X for close button
import axios from "axios";
import { API_BASE_URL } from "../../config";

const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

// --- Modal Component (Defined inside or above StaffHistory) ---
const HistoryDetailModal = ({ isOpen, onClose, event }) => {
    if (!isOpen || !event) return null;
    
    // Convert details object into displayable lines
    const detailsArray = event.details 
        ? Object.entries(event.details).map(([key, value]) => {
              // Simple formatting cleanup for display
              const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
              let displayValue = value;
              
              if (key === 'joiningdate' || key === 'date') {
                  // Format dates if they are ISO strings
                  displayValue = value ? new Date(value).toLocaleDateString() : 'N/A';
              } else if (Array.isArray(value)) {
                  displayValue = value.join(', ');
              } else if (typeof value === 'object' && value !== null) {
                  // Skip nested objects like MongoDB's _id or __v
                  return null;
              }

              if (key === 'staffid' || key === '__v' || key === '_id') return null; // Hide internal keys

              return (
                  <div key={key} className="flex justify-between py-1 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-gray-600">{label}:</span>
                      <span className="text-gray-800 font-semibold">{displayValue || 'N/A'}</span>
                  </div>
              );
          }).filter(item => item !== null)
        : [];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{event.label} Details</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                {detailsArray.length > 0 ? (
                    <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                        {detailsArray}
                    </div>
                ) : (
                    <p className="text-gray-500">No specific details available for this event.</p>
                )}
                
                <div className="mt-6 flex justify-end">
                    <button 
                        onClick={onClose} 
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};


export default function StaffHistory({ staff }) {
  const staffName =
    `${staff?.firstname || ""} ${staff?.lastname || ""}`.trim() ||
    "Staff Member";
  const staffId = staff?.staffid;

  const [historyEvents, setHistoryEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for Modal Management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); 
  
  const handleDetailsClick = (event) => {
      setSelectedEvent(event);
      setIsModalOpen(true);
  };
  
  const closeModal = () => {
      setIsModalOpen(false);
      setSelectedEvent(null);
  };
  

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
        // Using the working path: /api/staff/...
        const response = await axios.get(
          `${API_BASE_URL}api/staff/${staffId}/history`,
          {
            headers: { auth: AUTH_HEADER },
          }
        );

        // Assuming the API returns an array of objects
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
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Service History for {staffName}
      </h2>
      <div className="bg-white border rounded-lg shadow-sm p-4 divide-y divide-gray-200">
        {isLoading && (
          <div className="p-4 text-center text-blue-600">
            Loading service history...
          </div>
        )}

        {error && (
          <div className="p-4 text-center text-red-600 bg-red-50">{error}</div>
        )}

        {!isLoading && !error && historyEvents.length > 0
          ? historyEvents.map((event, i) => (
              <div
                key={event.id || i}
                className="py-3 flex items-start justify-between"
              >
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-gray-800 block">
                      {event.label || "Unknown Event"}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(event.date)}
                    </span>
                  </div>
                </div>
                <button 
                    onClick={() => handleDetailsClick(event)} // Handle click
                    className="text-blue-600 hover:underline font-medium text-sm flex-shrink-0"
                >
                  Details
                </button>
              </div>
            ))
          : !isLoading &&
            !error && (
              <div className="p-4 text-center text-gray-500">
                No service history found.
              </div>
            )}
      </div>
      
      {/* History Detail Modal Render */}
      <HistoryDetailModal 
          isOpen={isModalOpen}
          onClose={closeModal}
          event={selectedEvent}
      />
    </div>
  );
}