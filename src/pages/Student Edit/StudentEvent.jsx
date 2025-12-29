// export default function EventsActivities() {
//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-4xl mx-auto">
//         {/* Title */}
//         <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
//           Events & Activities
//         </h1>
        
//         {/* Table */}
//         <div className="bg-white border-2 border-blue-500 overflow-hidden overflow-x-auto">
//           <table className="w-full min-w-96">
//             <thead>
//               <tr>
//                 <th className="border-2 border-blue-500 px-2 sm:px-4 py-3 bg-white text-left font-semibold text-gray-800 text-sm sm:text-base">
//                   Date
//                 </th>
//                 <th className="border-2 border-blue-500 px-2 sm:px-4 py-3 bg-white text-left font-semibold text-gray-800 text-sm sm:text-base">
//                   Event Name
//                 </th>
//                 <th className="border-2 border-blue-500 px-2 sm:px-4 py-3 bg-white text-left font-semibold text-gray-800 text-sm sm:text-base">
//                   Certificate
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* Empty rows matching the image */}
//               <tr>
//                 <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 sm:py-6 bg-white"></td>
//                 <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 sm:py-6 bg-white"></td>
//                 <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 sm:py-6 bg-white"></td>
//               </tr>
//               <tr>
//                 <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 sm:py-6 bg-white"></td>
//                 <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 sm:py-6 bg-white"></td>
//                 <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 sm:py-6 bg-white"></td>
//               </tr>
//               <tr>
//                 <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 sm:py-6 bg-white"></td>
//                 <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 sm:py-6 bg-white"></td>
//                 <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 sm:py-6 bg-white"></td>
//               </tr>
//               <tr>
//                 <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 sm:py-6 bg-white"></td>
//                 <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 sm:py-6 bg-white"></td>
//                 <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 sm:py-6 bg-white"></td>
//               </tr>
//               <tr>
//                 <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 sm:py-6 bg-white"></td>
//                 <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 sm:py-6 bg-white"></td>
//                 <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 sm:py-6 bg-white"></td>
//               </tr>
//               <tr>
//                 <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 sm:py-6 bg-white"></td>
//                 <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 sm:py-6 bg-white"></td>
//                 <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 sm:py-6 bg-white"></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }











import React, { useState, useEffect } from 'react'; // Import hooks
import axios from 'axios'; // Import axios
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../../config';

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

// --- Accept student prop (though not used for filtering *yet*) ---
export default function EventsActivities({ student }) {
    // State for events list and loading indicator
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // --- Function to fetch events ---
    const fetchEvents = async () => {
        setIsLoading(true);
        setEvents([]); // Clear previous results

        try {
            console.log("Fetching events...");
            const response = await axios.get(
                // FIX: Using imported API_BASE_URL
                `${API_BASE_URL}api/events`, // Endpoint from your router
                { headers: { 'auth': AUTH_HEADER } }
            );

            console.log("Fetched events data:", response.data);

            // --- Filtering Logic (Optional - Add later if needed) ---
            // If you need to filter events based on the student prop:
            // let filteredEvents = response.data;
            // if (student && student.std && student.div) {
            //    filteredEvents = response.data.filter(event =>
            //       (event.targetAudience === 'All' || event.targetStd === student.std)
            //       // Add more specific filtering based on your event data structure
            //    );
            // }
            // setEvents(filteredEvents);

            // For now, display all events
            setEvents(response.data);

        } catch (error) {
            console.error("Error fetching events data:", error);
            setEvents([]); // Clear data on error
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    // --- useEffect to fetch data when the component mounts ---
    useEffect(() => {
        fetchEvents(); // Fetch events automatically
    }, []); // Empty dependency array means this runs only once on mount

    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Title */}
                <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
                    Events & Activities
                </h1>

                {/* Optional: Display student name if editing
                {student && (
                     <div className="text-center mb-8">
                        <h2 className="text-xl font-semibold text-gray-700">
                            Viewing events relevant to: {student.name || 'Selected Student'}
                        </h2>
                    </div>
                )} */}

                {/* Table */}
                <div className="bg-white border-2 border-blue-500 overflow-hidden overflow-x-auto">
                    <table className="w-full min-w-96"> {/* min-w-* ensures table doesn't collapse too much */}
                        <thead>
                            <tr>
                                <th className="border-2 border-blue-500 px-2 sm:px-4 py-3 bg-white text-left font-semibold text-gray-800 text-sm sm:text-base">
                                    Date
                                </th>
                                <th className="border-2 border-blue-500 px-2 sm:px-4 py-3 bg-white text-left font-semibold text-gray-800 text-sm sm:text-base">
                                    Event Name
                                </th>
                                <th className="border-2 border-blue-500 px-2 sm:px-4 py-3 bg-white text-left font-semibold text-gray-800 text-sm sm:text-base">
                                    Certificate {/* Assuming 'certificate' field exists */}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                // Show loading state
                                <tr>
                                    <td colSpan="3" className="border-2 border-blue-500 px-4 py-6 bg-white text-center text-gray-500">
                                        Loading events...
                                    </td>
                                </tr>
                            ) : events.length === 0 ? (
                                // Show no data message
                                <tr>
                                    <td colSpan="3" className="border-2 border-blue-500 px-4 py-6 bg-white text-center text-gray-500">
                                        No events found.
                                    </td>
                                </tr>
                            ) : (
                                // Map and display events
                                events.map((event) => (
                                    <tr key={event._id}> {/* Use a unique key like event._id */}
                                        <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 bg-white text-sm sm:text-base">
                                            {/* *** Check API: Use the correct date field *** */}
                                            {formatDate(event.date)}
                                        </td>
                                        <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 bg-white text-sm sm:text-base">
                                            {/* *** Check API: Use the correct event name field *** */}
                                            {event.eventname || event.name || 'Unknown Event'}
                                        </td>
                                        <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 bg-white text-sm sm:text-base">
                                            {/* Example for a boolean field: */}
                                            {event.certificate ? 'Issued' : 'N/A'}

                                            {/* Example for a URL string field: */}
                                            {/* {event.certificateUrl ? <a href={event.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View</a> : 'N/A'} */}
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