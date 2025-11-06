// // EventManagement.js
// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { FaSearch } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const EventManagement = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchEventData = async () => {
//       try {
//         const response = await axios.get("https://sspd-school-portal.vercel.app/api/events", {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         });
//         console.log(response.data);
//         setEvents(response.data);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };

//     fetchEventData();
//   }, []);

//   const filteredEvents = events.filter((event) =>
//     event.eventname.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleAddEvent = async () => {
//     navigate("/events-add");
//   };

//   return (
//     <MainLayout>
//       <div className="p-6">
//         <div className="bg-white rounded-2xl shadow-md p-8 space-y-8">
//           {/* Search bar and Add button */}
//           <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
//             <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-300 w-full sm:w-96 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500">
//               <input
//                 type="text"
//                 placeholder="Search Events..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 pr-2"
//               />
//               <FaSearch className="text-gray-400 ml-2 mr-3" />
//             </div>

//             <button
//               className="flex items-center bg-blue-600 text-white font-medium py-2 px-5 rounded-full shadow-md hover:bg-blue-700 transition-all duration-150"
//               onClick={handleAddEvent}
//             >
//               + Add
//             </button>
//           </div>

//           {/* Event List Title */}
//           <div className="text-xl font-bold text-center text-gray-700">
//             Event List
//           </div>

//           {/* Event Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {filteredEvents.length > 0 ? (
//               filteredEvents.map((event, index) => (
//                 <div
//                   key={index}
//                   className="border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition-all bg-gray-50"
//                 >
//                   <div className="flex flex-col justify-between h-full">
//                     <div>
//                       <div className="text-lg font-semibold text-gray-800 mb-1">
//                         Event Title: {event.eventname}
//                       </div>
//                       <div className="text-sm text-gray-800 mb-1">
//                         <span>Standard: {event.standard}</span>
//                         <span> Division: {event.division} </span>
//                       </div>
//                       <div className="text-sm text-gray-500 mb-4">
//                         Event Date: {new Date(event.date).toLocaleDateString()}
//                       </div>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <div className="text-sm text-gray-600">
//                         Managed by{" "}
//                         <span className="font-medium">{event.managedby}</span>
//                       </div>
//                       <button
//                         className="text-blue-600 hover:underline text-sm font-medium"
//                         onClick={() =>
//                           navigate("/events-view", {
//                             state: {
//                               event: {
//                                 name: event.eventname,
//                                 date: event.date,
//                                 manager: event.managedby,
//                                 standard: event.standard,
//                                 division: event.division,
//                                 participants: event.participants || []
//                               },
//                             },
//                           })
//                         }
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center text-gray-500 col-span-2">
//                 No events found.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default EventManagement;

// // =====================================================
// // ViewEvent.js
// // =====================================================

// import React, { useEffect, useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import { FaSearch } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // Define the base URL for your local backend API
// const LOCAL_API_BASE_URL = "http://localhost:5000/api";

// const EventManagement = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchEventData = async () => {
//       try {
//         const response = await axios.get(`${LOCAL_API_BASE_URL}/events`, {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         });
//         console.log(response.data);
//         setEvents(response.data);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };

//     fetchEventData();
//   }, []);

//   const filteredEvents = events.filter((event) =>
//     event.eventname.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleAddEvent = async () => {
//     navigate("/events-add");
//   };

//   return (
//     <MainLayout>
//       <div className="p-6">
//         <div className="bg-white rounded-2xl shadow-md p-8 space-y-8">
//           {/* Search bar and Add button */}
//           <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
//             <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-300 w-full sm:w-96 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500">
//               <input
//                 type="text"
//                 placeholder="Search Events..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 pr-2"
//               />
//               <FaSearch className="text-gray-400 ml-2 mr-3" />
//             </div>

//             <button
//               className="flex items-center bg-blue-600 text-white font-medium py-2 px-5 rounded-full shadow-md hover:bg-blue-700 transition-all duration-150"
//               onClick={handleAddEvent}
//             >
//               + Add
//             </button>
//           </div>

//           {/* Event List Title */}
//           <div className="text-xl font-bold text-center text-gray-700">
//             Event List
//           </div>

//           {/* Event Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {filteredEvents.length > 0 ? (
//               filteredEvents.map((event, index) => (
//                 <div
//                   key={index}
//                   className="border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition-all bg-gray-50"
//                 >
//                   <div className="flex flex-col justify-between h-full">
//                     <div>
//                       <div className="text-lg font-semibold text-gray-800 mb-1">
//                         Event Title: {event.eventname}
//                     </div>
//                       <div className="text-sm text-gray-800 mb-1">
//                         <span>Standard: {event.standard}</span>
//                         <span> Division: {event.division} </span>
//                       </div>
//                       <div className="text-sm text-gray-500 mb-4">
//                         Event Date: {new Date(event.date).toLocaleDateString()}
//                     </div>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <div className="text-sm text-gray-600">
//                         Managed by{" "}
//                         <span className="font-medium">{event.managedby}</span>
//                       </div>
//                       <button
//                         className="text-blue-600 hover:underline text-sm font-medium"
//                         onClick={() =>
//                           navigate("/events-view", {
//                             state: {
//                               event: {
//                                 name: event.eventname,
//                                 date: event.date,
//                                 manager: event.managedby,
//                                 standard: event.standard,
//                                 division: event.division,
//                                 participants: event.participants || []
//                               },
//                             },
//                           })
//                         }
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center text-gray-500 col-span-2">
//                 No events found.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default EventManagement;

import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config";

// Define the base URL for your local backend API
// const LOCAL_API_BASE_URL = "http://localhost:5000/api"; // REMOVED

const EventManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        // FIX: Using imported API_BASE_URL
        const response = await axios.get(`${API_BASE_URL}api/events`, {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
        });
        console.log(response.data);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEventData();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.eventname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddEvent = async () => {
    navigate("/events-add");
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="bg-white rounded-2xl shadow-md p-8 space-y-8">
          {/* Search bar and Add button */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-300 w-full sm:w-96 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type="text"
                placeholder="Search Events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 pr-2"
              />
              <FaSearch className="text-gray-400 ml-2 mr-3" />
            </div>

            <button
              className="flex items-center bg-blue-600 text-white font-medium py-2 px-5 rounded-full shadow-md hover:bg-blue-700 transition-all duration-150"
              onClick={handleAddEvent}
            >
              + Add
            </button>
          </div>

          {/* Event List Title */}
          <div className="text-xl font-bold text-center text-gray-700">
            Event List
          </div>

          {/* Event Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition-all bg-gray-50"
                >
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <div className="text-lg font-semibold text-gray-800 mb-1">
                        Event Title: {event.eventname}
                    </div>
                      <div className="text-sm text-gray-800 mb-1">
                        <span>Standard: {event.standard}</span>
                        <span> Division: {event.division} </span>
                      </div>
                      <div className="text-sm text-gray-500 mb-4">
                        Event Date: {new Date(event.date).toLocaleDateString()}
                    </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        Managed by{" "}
                        <span className="font-medium">{event.managedby}</span>
                      </div>
                      <button
                        className="text-blue-600 hover:underline text-sm font-medium"
                        onClick={() =>
                          navigate("/events-view", {
                            state: {
                              event: {
                                name: event.eventname,
                                date: event.date,
                                manager: event.managedby,
                                standard: event.standard,
                                division: event.division,
                                participants: event.participants || []
                              },
                            },
                          })
                        }
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 col-span-2">
                No events found.
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventManagement;