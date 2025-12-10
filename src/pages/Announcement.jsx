// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";
// import AddAnnouncement from "../components/AddAnnouncement";

// const tabs = ["Inbox", "Draft", "Sent"];

// const AnnouncementPage = () => {
//   const [activeTab, setActiveTab] = useState("Inbox");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
//   const [announcements, setAnnouncements] = useState([]);

//   // Fetch announcements from backend
//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const res = await axios.get(
//           "https://sspd-school-portal.vercel.app/api/get-announcement",
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         const data = res.data;
//         setAnnouncements(data);
//         console.log(data);
//       } catch (err) {
//         console.error("Failed to fetch announcements:", err);
//       }
//     };

//     fetchAnnouncements();
//   }, []);

//   // Filter announcements based on active tab and search
//   const filteredData = announcements.filter((item) => {
//     // Filter by tab (status)
//     const tabFilter =
//       item.status?.toLowerCase() === activeTab.toLowerCase() ||
//       (activeTab === "Inbox" && item.status === "published");

//     // Filter by search
//     const searchFilter = item.title
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     return tabFilter && searchFilter;
//   });

//   // Format date for display
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   // Format time for display
//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const handleAddAnnouncement = () => {
//     setIsModalOpen(true);
//   };

//   const handleDraft = async (item) => {
//     try {
//       const response = await axios.put(
//         `https://sspd-school-portal.vercel.app/api/modify-announcement/${item._id}`,
//         {}, 
//         {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         }
//       );
//       if (response.status == 200) {
//         console.log("updated successfully");
//         window.location.reload();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow mx-2 sm:mx-4 lg:mx-6">
//         <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
//           {!selectedAnnouncement ? (
//             <>
//               {/* Search + Add - Responsive Layout */}
//               <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
//                 <input
//                   type="text"
//                   placeholder="Search announcements..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className="border px-3 sm:px-4 py-2 rounded w-full sm:max-w-xs lg:max-w-md text-sm sm:text-base"
//                 />
//                 <button
//                   onClick={handleAddAnnouncement}
//                   className="bg-blue-600 text-white px-4 sm:px-5 py-2 rounded-full hover:bg-blue-700 text-sm sm:text-base whitespace-nowrap flex-shrink-0"
//                 >
//                   <span className="hidden sm:inline">+ Add</span>
//                   <span className="sm:hidden">+</span>
//                 </button>
//               </div>

//               {/* Tabs - Responsive with scroll on mobile */}
//               <div className="flex bg-gray-100 rounded overflow-x-auto">
//                 {tabs.map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`flex-1 min-w-max px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition whitespace-nowrap ${
//                       activeTab === tab
//                         ? "bg-white shadow text-black"
//                         : "text-gray-600 hover:bg-gray-200"
//                     }`}
//                   >
//                     <span className="hidden sm:inline">{tab}</span>
//                     <span className="sm:hidden">
//                       {tab.charAt(0).toUpperCase()}
//                     </span>
//                     <span className="ml-1">
//                       (
//                       {
//                         announcements.filter(
//                           (item) =>
//                             item.status?.toLowerCase() === tab.toLowerCase() ||
//                             (tab === "Inbox" && item.status === "published")
//                         ).length
//                       }
//                       )
//                     </span>
//                   </button>
//                 ))}
//               </div>

//               {/* Cards - Responsive Layout */}
//               <div className="space-y-3 sm:space-y-4">
//                 {filteredData.length > 0 ? (
//                   filteredData.map((item) => (
//                     <div
//                       key={item._id}
//                       className="bg-white shadow rounded p-3 sm:p-4 hover:shadow-md transition-shadow"
//                     >
//                       {/* Mobile Layout - Stacked */}
//                       <div className="flex flex-col sm:hidden space-y-3">
//                         <div className="flex items-center gap-3">
//                           <div className="w-10 h-10 bg-[#0E83B2] rounded-full flex items-center justify-center text-white font-bold text-sm">
//                             {item.priority}
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <div className="font-semibold text-sm truncate">
//                               {item.title}
//                             </div>
//                             <div className="text-xs text-gray-500 truncate">
//                               {item.department}
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-center justify-between">
//                           <div className="text-xs text-gray-500">
//                             <div>{formatDate(item.schedule)}</div>
//                             <div>{formatTime(item.schedule)}</div>
//                           </div>
//                           <div className="flex gap-2">
//                             <button
//                               onClick={() => handleDraft(item)}
//                               className="bg-blue-400 text-white px-2 py-1 rounded text-xs"
//                             >
//                               Send
//                             </button>
//                             <button
//                               onClick={() => setSelectedAnnouncement(item)}
//                               className="text-blue-600 text-xs hover:underline"
//                             >
//                               More
//                             </button>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Desktop/Tablet Layout - Horizontal */}
//                       <div className="hidden sm:flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                           <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#0E83B2] rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-base">
//                             {item.priority}
//                           </div>
//                           <div className="min-w-0 flex-1">
//                             <div className="font-semibold text-sm lg:text-lg truncate">
//                               {item.title}
//                             </div>
//                             <div className="text-xs lg:text-sm text-gray-500 truncate">
//                               {item.department}
//                             </div>
//                           </div>
//                         </div>

//                         <div className="text-right space-y-1 min-w-[100px] lg:min-w-[120px] flex-shrink-0">
//                           <div className="text-gray-500 font-semibold text-xs lg:text-sm">
//                             {formatDate(item.schedule)}
//                           </div>
//                           <div className="text-gray-400 text-xs">
//                             {formatTime(item.schedule)}
//                           </div>
//                           <div className="flex gap-2 justify-end">
//                             <button
//                               onClick={() => handleDraft(item)}
//                               className="bg-blue-400 text-white px-2 py-1 rounded-lg text-xs lg:text-sm"
//                             >
//                               Send
//                             </button>
//                             <button
//                               onClick={() => setSelectedAnnouncement(item)}
//                               className="text-blue-600 text-xs lg:text-sm hover:underline"
//                             >
//                               More
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
//                     No announcements found for {activeTab.toLowerCase()}
//                   </div>
//                 )}
//               </div>
//             </>
//           ) : (
//             // Read More Section - Responsive
//             <div className="bg-white p-4 sm:p-6 rounded shadow space-y-4">
//               <button
//                 onClick={() => setSelectedAnnouncement(null)}
//                 className="flex items-center text-blue-600 hover:underline mb-4 text-sm sm:text-base"
//               >
//                 <span className="mr-2">←</span> Back
//               </button>

//               {/* Header - Responsive Layout */}
//               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//                 <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#0E83B2] rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold flex-shrink-0">
//                   {selectedAnnouncement.priority}
//                 </div>
//                 <div className="min-w-0 flex-1">
//                   <div className="font-bold text-lg sm:text-xl mb-1">
//                     {selectedAnnouncement.title}
//                   </div>
//                   <div className="text-gray-500 capitalize text-sm sm:text-base">
//                     {selectedAnnouncement.department} Department
//                   </div>
//                   <div className="text-xs sm:text-sm text-gray-400 mt-1">
//                     Visibility: {selectedAnnouncement.visibility} • Status:{" "}
//                     {selectedAnnouncement.status}
//                   </div>
//                 </div>
//               </div>

//               {/* Details - Responsive Grid */}
//               <div className="border-t pt-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <span className="font-semibold text-gray-600 text-sm sm:text-base">
//                       Scheduled:
//                     </span>
//                     <div className="text-sm sm:text-base">
//                       {formatDate(selectedAnnouncement.schedule)} at{" "}
//                       {formatTime(selectedAnnouncement.schedule)}
//                     </div>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-gray-600 text-sm sm:text-base">
//                       Priority:
//                     </span>
//                     <div className="flex items-center gap-2 text-sm sm:text-base">
//                       <span className="text-lg">
//                         {selectedAnnouncement.priority}
//                       </span>
//                       <span className="text-sm text-gray-500">
//                         (
//                         {selectedAnnouncement.priority === 1
//                           ? "High"
//                           : selectedAnnouncement.priority === 2
//                           ? "Medium"
//                           : "Low"}
//                         )
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-4 text-xs sm:text-sm text-gray-400">
//                   Created: {formatDate(selectedAnnouncement.createdAt)} at{" "}
//                   {formatTime(selectedAnnouncement.createdAt)}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* Modal */}
//       <AddAnnouncement
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         setAnnouncements={setAnnouncements}
//       />
//     </MainLayout>
//   );
// };

// export default AnnouncementPage;

// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";
// import AddAnnouncement from "../components/AddAnnouncement";

// // Define the base URL for your local backend API
// const LOCAL_API_BASE_URL = "http://localhost:5000/api"; // #vercel

// const tabs = ["Inbox", "Draft", "Sent"];

// const AnnouncementPage = () => {
//   const [activeTab, setActiveTab] = useState("Inbox");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
//   const [announcements, setAnnouncements] = useState([]);

//   // Fetch announcements from backend
//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const res = await axios.get(
//           // CRITICAL FIX 1: Using local API URL
//           `${LOCAL_API_BASE_URL}/get-announcement`, // #vercel
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         const data = res.data;
//         setAnnouncements(data);
//         console.log(data);
//       } catch (err) {
//         console.error("Failed to fetch announcements:", err);
//       }
//     };

//     fetchAnnouncements();
//   }, []);

//   // Filter announcements based on active tab and search
//   const filteredData = announcements.filter((item) => {
//     // Filter by tab (status)
//     const tabFilter =
//       item.status?.toLowerCase() === activeTab.toLowerCase() ||
//       (activeTab === "Inbox" && item.status === "published");

//     // Filter by search
//     const searchFilter = item.title
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     return tabFilter && searchFilter;
//   });

//   // Format date for display
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   // Format time for display
//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const handleAddAnnouncement = () => {
//     setIsModalOpen(true);
//   };

//   const handleDraft = async (item) => {
//     try {
//       const response = await axios.put(
//         // CRITICAL FIX 2: Using local API URL
//         `${LOCAL_API_BASE_URL}/modify-announcement/${item._id}`, // #vercel
//         {}, 
//         {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         }
//       );
//       if (response.status == 200) {
//         console.log("updated successfully");
//         window.location.reload();
//       }
//     } catch (error) {
//       console.error("Error drafting announcement:", error);
//     }
//   };

//   return (
//     <MainLayout>
//       {/* 🟢 FIX: Content now correctly starts with a single div to encapsulate the page content */}
//       <div className="bg-white rounded-2xl shadow mx-2 sm:mx-4 lg:mx-6">
//         <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
//           {!selectedAnnouncement ? (
//             <>
//               {/* Search + Add - Responsive Layout */}
//               <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
//                 <input
//                   type="text"
//                   placeholder="Search announcements..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className="border px-3 sm:px-4 py-2 rounded w-full sm:max-w-xs lg:max-w-md text-sm sm:text-base"
//                 />
//                 <button
//                   onClick={handleAddAnnouncement}
//                   className="bg-blue-600 text-white px-4 sm:px-5 py-2 rounded-full hover:bg-blue-700 text-sm sm:text-base whitespace-nowrap flex-shrink-0"
//                 >
//                   <span className="hidden sm:inline">+ Add</span>
//                   <span className="sm:hidden">+</span>
//                 </button>
//               </div>

//               {/* Tabs - Responsive with scroll on mobile */}
//               <div className="flex bg-gray-100 rounded overflow-x-auto">
//                 {tabs.map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`flex-1 min-w-max px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition whitespace-nowrap ${
//                       activeTab === tab
//                         ? "bg-white shadow text-black"
//                         : "text-gray-600 hover:bg-gray-200"
//                     }`}
//                   >
//                     <span className="hidden sm:inline">{tab}</span>
//                     <span className="sm:hidden">
//                       {tab.charAt(0).toUpperCase()}
//                     </span>
//                     <span className="ml-1">
//                       (
//                       {
//                         announcements.filter(
//                           (item) =>
//                             item.status?.toLowerCase() === tab.toLowerCase() ||
//                             (tab === "Inbox" && item.status === "published")
//                         ).length
//                       }
//                       )
//                     </span>
//                   </button>
//                 ))}
//                 </div>

//                 {/* Cards - Responsive Layout */}
//                 <div className="space-y-3 sm:space-y-4">
//                   {filteredData.length > 0 ? (
//                     filteredData.map((item) => (
//                       <div
//                         key={item._id}
//                         className="bg-white shadow rounded p-3 sm:p-4 hover:shadow-md transition-shadow"
//                       >
//                         {/* Mobile Layout - Stacked */}
//                         <div className="flex flex-col sm:hidden space-y-3">
//                           <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 bg-[#0E83B2] rounded-full flex items-center justify-center text-white font-bold text-sm">
//                               {item.priority}
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <div className="font-semibold text-sm truncate">
//                                 {item.title}
//                               </div>
//                               <div className="text-xs text-gray-500 truncate">
//                                 {item.department}
//                               </div>
//                             </div>
//                           </div>
//                           
//                           <div className="flex items-center justify-between">
//                             <div className="text-xs text-gray-500">
//                               <div>{formatDate(item.schedule)}</div>
//                               <div>{formatTime(item.schedule)}</div>
//                             </div>
//                             <div className="flex gap-2">
//                               <button
//                                 onClick={() => handleDraft(item)}
//                                 className="bg-blue-400 text-white px-2 py-1 rounded text-xs"
//                               >
//                                 Send
//                               </button>
//                               <button
//                                 onClick={() => setSelectedAnnouncement(item)}
//                                 className="text-blue-600 text-xs hover:underline"
//                               >
//                                 More
//                               </button>
//                             </div>
//                         </div>
//                       </div>

//                       {/* Desktop/Tablet Layout - Horizontal */}
//                       <div className="hidden sm:flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                           <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#0E83B2] rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-base">
//                             {item.priority}
//                           </div>
//                           <div className="min-w-0 flex-1">
//                             <div className="font-semibold text-sm lg:text-lg truncate">
//                               {item.title}
//                             </div>
//                             <div className="text-xs lg:text-sm text-gray-500 truncate">
//                               {item.department}
//                             </div>
//                           </div>
//                         </div>

//                         <div className="text-right space-y-1 min-w-[100px] lg:min-w-[120px] flex-shrink-0">
//                           <div className="text-gray-500 font-semibold text-xs lg:text-sm">
//                             {formatDate(item.schedule)}
//                           </div>
//                           <div className="text-gray-400 text-xs">
//                             {formatTime(item.schedule)}
//                           </div>
//                           <div className="flex gap-2 justify-end">
//                             <button
//                               onClick={() => handleDraft(item)}
//                               className="bg-blue-400 text-white px-2 py-1 rounded-lg text-xs lg:text-sm"
//                             >
//                               Send
//                             </button>
//                             <button
//                               onClick={() => setSelectedAnnouncement(item)}
//                               className="text-blue-600 text-xs lg:text-sm hover:underline"
//                             >
//                               More
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
//                     No announcements found for {activeTab.toLowerCase()}
//                   </div>
//                 )}
//               </div>
//             </>
//           ) : (
//             // Read More Section - Responsive
//             <div className="bg-white p-4 sm:p-6 rounded shadow space-y-4">
//               <button
//                 onClick={() => setSelectedAnnouncement(null)}
//                 className="flex items-center text-blue-600 hover:underline mb-4 text-sm sm:text-base"
//               >
//                 <span className="mr-2">←</span> Back
//               </button>

//               {/* Header - Responsive Layout */}
//               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//                 <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#0E83B2] rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold flex-shrink-0">
//                   {selectedAnnouncement.priority}
//                 </div>
//                 <div className="min-w-0 flex-1">
//                   <div className="font-bold text-lg sm:text-xl mb-1">
//                     {selectedAnnouncement.title}
//                   </div>
//                   <div className="text-gray-500 capitalize text-sm sm:text-base">
//                     {selectedAnnouncement.department} Department
//                   </div>
//                   <div className="text-xs sm:text-sm text-gray-400 mt-1">
//                     Visibility: {selectedAnnouncement.visibility} • Status:{" "}
//                     {selectedAnnouncement.status}
//                   </div>
//                 </div>
//               </div>

//               {/* Details - Responsive Grid */}
//               <div className="border-t pt-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <span className="font-semibold text-gray-600 text-sm sm:text-base">
//                       Scheduled:
//                     </span>
//                     <div className="text-sm sm:text-base">
//                       {formatDate(selectedAnnouncement.schedule)} at{" "}
//                       {formatTime(selectedAnnouncement.schedule)}
//                     </div>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-gray-600 text-sm sm:text-base">
//                       Priority:
//                     </span>
//                     <div className="flex items-center gap-2 text-sm sm:text-base">
//                       <span className="text-lg">
//                         {selectedAnnouncement.priority}
//                       </span>
//                       <span className="text-sm text-gray-500">
//                         (
//                         {selectedAnnouncement.priority === 1
//                           ? "High"
//                           : selectedAnnouncement.priority === 2
//                           ? "Medium"
//                           : "Low"}
//                         )
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-4 text-xs sm:text-sm text-gray-400">
//                   Created: {formatDate(selectedAnnouncement.createdAt)} at{" "}
//                   {formatTime(selectedAnnouncement.createdAt)}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//         
//         {/* Modal */}
//         <AddAnnouncement
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           setAnnouncements={setAnnouncements}
//         />
//       </div>
//     </MainLayout>
//   );
// };

// export default AnnouncementPage;
























// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";
// import AddAnnouncement from "../components/AddAnnouncement";
// // --- Import the API Base URL from the config file ---
// import { API_BASE_URL } from "../config"; 

// // Define the base URL for your local backend API
// // const LOCAL_API_BASE_URL = "http://localhost:5000/api"; // #vercel -> REMOVED

// const tabs = ["Inbox", "Draft", "Sent"];

// const AnnouncementPage = () => {
//   const [activeTab, setActiveTab] = useState("Inbox");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
//   const [announcements, setAnnouncements] = useState([]);

//   // Fetch announcements from backend
//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const res = await axios.get(
//           // FIX 1: Using imported API_BASE_URL
//           `${API_BASE_URL}api/get-announcement`, // #vercel
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         const data = res.data;
//         setAnnouncements(data);
//         console.log(data);
//       } catch (err) {
//         console.error("Failed to fetch announcements:", err);
//       }
//     };

//     fetchAnnouncements();
//   }, []);

//   // Filter announcements based on active tab and search
//   const filteredData = announcements.filter((item) => {
//     // Filter by tab (status)
//     const tabFilter =
//       item.status?.toLowerCase() === activeTab.toLowerCase() ||
//       (activeTab === "Inbox" && item.status === "published");

//     // Filter by search
//     const searchFilter = item.title
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     return tabFilter && searchFilter;
//   });

//   // Format date for display
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   // Format time for display
//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const handleAddAnnouncement = () => {
//     setIsModalOpen(true);
//   };

//   const handleDraft = async (item) => {
//     try {
//       const response = await axios.put(
//         // FIX 2: Using imported API_BASE_URL
//         `${API_BASE_URL}api/modify-announcement/${item._id}`, // #vercel
//         {}, 
//         {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         }
//       );
//       if (response.status == 200) {
//         console.log("updated successfully");
//         window.location.reload();
//       }
//     } catch (error) {
//       console.error("Error drafting announcement:", error);
//     }
//   };

//   return (
//     <MainLayout>
//       {/* 🟢 FIX: Content now correctly starts with a single div to encapsulate the page content */}
//       <div className="bg-white rounded-2xl shadow mx-2 sm:mx-4 lg:mx-6">
//         <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
//           {!selectedAnnouncement ? (
//             <>
//               {/* Search + Add - Responsive Layout */}
//               <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
//                 <input
//                   type="text"
//                   placeholder="Search announcements..."
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className="border px-3 sm:px-4 py-2 rounded w-full sm:max-w-xs lg:max-w-md text-sm sm:text-base"
//                 />
//                 <button
//                   onClick={handleAddAnnouncement}
//                   className="bg-blue-600 text-white px-4 sm:px-5 py-2 rounded-full hover:bg-blue-700 text-sm sm:text-base whitespace-nowrap flex-shrink-0"
//                 >
//                   <span className="hidden sm:inline">+ Add</span>
//                   <span className="sm:hidden">+</span>
//                 </button>
//               </div>

//               {/* Tabs - Responsive with scroll on mobile */}
//               <div className="flex bg-gray-100 rounded overflow-x-auto">
//                 {tabs.map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`flex-1 min-w-max px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition whitespace-nowrap ${
//                       activeTab === tab
//                         ? "bg-white shadow text-black"
//                         : "text-gray-600 hover:bg-gray-200"
//                     }`}
//                   >
//                     <span className="hidden sm:inline">{tab}</span>
//                     <span className="sm:hidden">
//                       {tab.charAt(0).toUpperCase()}
//                     </span>
//                     <span className="ml-1">
//                       (
//                       {
//                         announcements.filter(
//                           (item) =>
//                             item.status?.toLowerCase() === tab.toLowerCase() ||
//                             (tab === "Inbox" && item.status === "published")
//                         ).length
//                       }
//                       )
//                     </span>
//                   </button>
//                 ))}
//                 </div>

//                 {/* Cards - Responsive Layout */}
//                 <div className="space-y-3 sm:space-y-4">
//                   {filteredData.length > 0 ? (
//                     filteredData.map((item) => (
//                       <div
//                         key={item._id}
//                         className="bg-white shadow rounded p-3 sm:p-4 hover:shadow-md transition-shadow"
//                       >
//                         {/* Mobile Layout - Stacked */}
//                         <div className="flex flex-col sm:hidden space-y-3">
//                           <div className="flex items-center gap-3">
//                             <div className="w-10 h-10 bg-[#0E83B2] rounded-full flex items-center justify-center text-white font-bold text-sm">
//                               {item.priority}
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <div className="font-semibold text-sm truncate">
//                                 {item.title}
//                               </div>
//                               <div className="text-xs text-gray-500 truncate">
//                                 {item.department}
//                               </div>
//                             </div>
//                           </div>
//                           
//                           <div className="flex items-center justify-between">
//                             <div className="text-xs text-gray-500">
//                               <div>{formatDate(item.schedule)}</div>
//                               <div>{formatTime(item.schedule)}</div>
//                             </div>
//                             <div className="flex gap-2">
//                               <button
//                                 onClick={() => handleDraft(item)}
//                                 className="bg-blue-400 text-white px-2 py-1 rounded text-xs"
//                               >
//                                 Send
//                               </button>
//                               <button
//                                 onClick={() => setSelectedAnnouncement(item)}
//                                 className="text-blue-600 text-xs hover:underline"
//                               >
//                                 More
//                               </button>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Desktop/Tablet Layout - Horizontal */}
//                         <div className="hidden sm:flex items-center justify-between">
//                           <div className="flex items-center gap-4">
//                             <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#0E83B2] rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-base">
//                               {item.priority}
//                             </div>
//                             <div className="min-w-0 flex-1">
//                               <div className="font-semibold text-sm lg:text-lg truncate">
//                                 {item.title}
//                               </div>
//                               <div className="text-xs lg:text-sm text-gray-500 truncate">
//                                 {item.department}
//                               </div>
//                             </div>
//                           </div>

//                           <div className="text-right space-y-1 min-w-[100px] lg:min-w-[120px] flex-shrink-0">
//                             <div className="text-gray-500 font-semibold text-xs lg:text-sm">
//                               {formatDate(item.schedule)}
//                             </div>
//                             <div className="text-gray-400 text-xs">
//                               {formatTime(item.schedule)}
//                             </div>
//                             <div className="flex gap-2 justify-end">
//                               <button
//                                 onClick={() => handleDraft(item)}
//                                 className="bg-blue-400 text-white px-2 py-1 rounded-lg text-xs lg:text-sm"
//                               >
//                                 Send
//                               </button>
//                               <button
//                                 onClick={() => setSelectedAnnouncement(item)}
//                                 className="text-blue-600 text-xs lg:text-sm hover:underline"
//                               >
//                                 More
//                               </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
//                     No announcements found for {activeTab.toLowerCase()}
//                   </div>
//                 )}
//               </div>
//             </>
//           ) : (
//             // Read More Section - Responsive
//             <div className="bg-white p-4 sm:p-6 rounded shadow space-y-4">
//               <button
//                 onClick={() => setSelectedAnnouncement(null)}
//                 className="flex items-center text-blue-600 hover:underline mb-4 text-sm sm:text-base"
//               >
//                 <span className="mr-2">←</span> Back
//               </button>

//               {/* Header - Responsive Layout */}
//               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//                 <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#0E83B2] rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold flex-shrink-0">
//                   {selectedAnnouncement.priority}
//                 </div>
//                 <div className="min-w-0 flex-1">
//                   <div className="font-bold text-lg sm:text-xl mb-1">
//                     {selectedAnnouncement.title}
//                   </div>
//                   <div className="text-gray-500 capitalize text-sm sm:text-base">
//                     {selectedAnnouncement.department} Department
//                   </div>
//                   <div className="text-xs sm:text-sm text-gray-400 mt-1">
//                     Visibility: {selectedAnnouncement.visibility} • Status:{" "}
//                     {selectedAnnouncement.status}
//                   </div>
//                 </div>
//               </div>

//               {/* Details - Responsive Grid */}
//               <div className="border-t pt-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     <span className="font-semibold text-gray-600 text-sm sm:text-base">
//                       Scheduled:
//                     </span>
//                     <div className="text-sm sm:text-base">
//                       {formatDate(selectedAnnouncement.schedule)} at{" "}
//                       {formatTime(selectedAnnouncement.schedule)}
//                     </div>
//                   </div>
//                   <div>
//                     <span className="font-semibold text-gray-600 text-sm sm:text-base">
//                       Priority:
//                     </span>
//                     <div className="flex items-center gap-2 text-sm sm:text-base">
//                       <span className="text-lg">
//                         {selectedAnnouncement.priority}
//                       </span>
//                       <span className="text-sm text-gray-500">
//                         (
//                         {selectedAnnouncement.priority === 1
//                           ? "High"
//                           : selectedAnnouncement.priority === 2
//                           ? "Medium"
//                           : "Low"}
//                         )
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-4 text-xs sm:text-sm text-gray-400">
//                   Created: {formatDate(selectedAnnouncement.createdAt)} at{" "}
//                   {formatTime(selectedAnnouncement.createdAt)}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//         
//         {/* Modal */}
//         <AddAnnouncement
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           setAnnouncements={setAnnouncements}
//         />
//       </div>
//     </MainLayout>
//   );
// };

// export default AnnouncementPage;









import React, { useState, useEffect, useCallback } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import AddAnnouncement from "../components/AddAnnouncement";
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config";

const tabs = ["Inbox", "Draft", "Sent"];

const AnnouncementPage = () => {
  const [activeTab, setActiveTab] = useState("Inbox");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  // Function to fetch announcements from backend
  const fetchAnnouncements = useCallback(async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}api/get-announcement`, // #vercel
        {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
        }
      );
      const data = res.data;
      // Reverse the array to show the latest announcements first
      setAnnouncements(data.reverse());
      console.log(data);
    } catch (err) {
      console.error("Failed to fetch announcements:", err);
    }
  }, []);

  // Fetch announcements on mount
  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  // Filter announcements based on active tab and search
  const filteredData = announcements.filter((item) => {
    // Filter by search (checking in title, description, and department)
    const searchFilter = 
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase()) ||
        item.department?.toLowerCase().includes(search.toLowerCase());

    let tabFilter = false;

    // 🔥 UPDATED LOGIC for Inbox, Draft, and Sent
    switch (activeTab) {
        case "Inbox":
            // Inbox: Only show SENT announcements specifically targeted to 'admin'
            tabFilter = item.status === "sent" && item.visibility === "admin";
            break;
        case "Draft":
            // Draft: Show announcements with status 'draft'
            tabFilter = item.status === "draft";
            break;
        case "Sent":
            // Sent: Show all SENT announcements, excluding those already in Inbox (visibility: 'admin')
            tabFilter = item.status === "sent" && item.visibility !== "admin";
            break;
        default:
            tabFilter = false;
    }

    return tabFilter && searchFilter;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format time for display
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleAddAnnouncement = () => {
    setIsModalOpen(true);
  };

  // Updated to call fetchAnnouncements for refresh
  const handleDraft = async (item) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}api/modify-announcement/${item._id}`, // #vercel
        {},
        {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
        }
      );
      if (response.status === 200) {
        console.log("updated successfully");
        // Re-fetch data to update the UI without full page reload
        fetchAnnouncements(); 
      }
    } catch (error) {
      console.error("Error drafting announcement:", error);
    }
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow mx-2 sm:mx-4 lg:mx-6">
        <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
          {!selectedAnnouncement ? (
            <>
              {/* Search + Add - Responsive Layout */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                <input
                  type="text"
                  placeholder="Search announcements..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border px-3 sm:px-4 py-2 rounded w-full sm:max-w-xs lg:max-w-md text-sm sm:text-base"
                />
                <button
                  onClick={handleAddAnnouncement}
                  className="bg-blue-600 text-white px-4 sm:px-5 py-2 rounded-full hover:bg-blue-700 text-sm sm:text-base whitespace-nowrap flex-shrink-0"
                >
                  <span className="hidden sm:inline">+ Add</span>
                  <span className="sm:hidden">+</span>
                </button>
              </div>

              {/* Tabs - Responsive with scroll on mobile */}
              <div className="flex bg-gray-100 rounded overflow-x-auto">
                {tabs.map((tab) => {
                  let count;
                  if (tab === "Inbox") {
                    // Inbox: sent and visibility 'admin'
                    count = announcements.filter(item => item.status === "sent" && item.visibility === "admin").length;
                  } else if (tab === "Draft") {
                    // Draft: status 'draft'
                    count = announcements.filter(item => item.status === "draft").length;
                  } else if (tab === "Sent") {
                    // Sent: status 'sent' BUT visibility IS NOT 'admin'
                    count = announcements.filter(item => item.status === "sent" && item.visibility !== "admin").length;
                  }
                  
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 min-w-max px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition whitespace-nowrap ${
                        activeTab === tab
                          ? "bg-white shadow text-black"
                          : "text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <span className="hidden sm:inline">{tab}</span>
                      <span className="sm:hidden">
                        {tab.charAt(0).toUpperCase()}
                      </span>
                      <span className="ml-1">
                        ({count || 0})
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Cards - Responsive Layout */}
              <div className="space-y-3 sm:space-y-4">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white shadow rounded p-3 sm:p-4 hover:shadow-md transition-shadow"
                    >
                      {/* Mobile Layout - Stacked */}
                      <div className="flex flex-col sm:hidden space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#0E83B2] rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {item.priority}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm truncate">
                              {item.title}
                            </div>
                            {/* Display announcement hint instead of department */}
                            <div className="text-xs text-gray-500 truncate">
                              {item.description.substring(0, 30)}...
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            <div>{formatDate(item.schedule)}</div>
                            <div>{formatTime(item.schedule)}</div>
                          </div>
                          <div className="flex gap-2">
                            {/* Show Send button only in Draft tab */}
                            {item.status?.toLowerCase() === 'draft' && (
                              <button
                                onClick={() => handleDraft(item)}
                                className="bg-blue-400 text-white px-2 py-1 rounded text-xs"
                              >
                                Send
                              </button>
                            )}
                            <button
                              onClick={() => setSelectedAnnouncement(item)}
                              className="text-blue-600 text-xs hover:underline"
                            >
                              {/* "Read More" text */}
                              Read More
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Desktop/Tablet Layout - Horizontal */}
                      <div className="hidden sm:flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#0E83B2] rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-base">
                            {item.priority}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-sm lg:text-lg truncate">
                              {item.title}
                            </div>
                            {/* Display announcement hint instead of department */}
                            <div className="text-xs lg:text-sm text-gray-500 truncate">
                              {item.description.substring(0, 50)}...
                            </div>
                          </div>
                        </div>

                        <div className="text-right space-y-1 min-w-[100px] lg:min-w-[120px] flex-shrink-0">
                          <div className="text-gray-500 font-semibold text-xs lg:text-sm">
                            {formatDate(item.schedule)}
                          </div>
                          <div className="text-gray-400 text-xs">
                            {formatTime(item.schedule)}
                          </div>
                          <div className="flex gap-2 justify-end">
                            {/* Show Send button only in Draft tab */}
                            {item.status?.toLowerCase() === 'draft' && (
                              <button
                                onClick={() => handleDraft(item)}
                                className="bg-blue-400 text-white px-2 py-1 rounded-lg text-xs lg:text-sm"
                              >
                                Send
                              </button>
                            )}
                            <button
                              onClick={() => setSelectedAnnouncement(item)}
                              className="text-blue-600 text-xs lg:text-sm hover:underline"
                            >
                              {/* "Read More" text */}
                              Read More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
                    No announcements found for {activeTab.toLowerCase()}
                  </div>
                )}
              </div>
            </>
          ) : (
            // Read More Section - Responsive
            <div className="bg-white p-4 sm:p-6 rounded shadow space-y-4">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="flex items-center text-blue-600 hover:underline mb-4 text-sm sm:text-base"
              >
                <span className="mr-2">←</span> Back
              </button>

              {/* Header - Responsive Layout */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#0E83B2] rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold flex-shrink-0">
                  {selectedAnnouncement.priority}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-lg sm:text-xl mb-1">
                    {selectedAnnouncement.title}
                  </div>
                  <div className="text-gray-500 capitalize text-sm sm:text-base">
                    {selectedAnnouncement.department} Department
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 mt-1">
                    Visibility: {selectedAnnouncement.visibility} • Status:{" "}
                    {selectedAnnouncement.status}
                  </div>
                </div>
              </div>

              {/* Details - Responsive Grid and Description */}
              <div className="border-t pt-4">
                {/* Announcement Description (Main Content) */}
                <h3 className="font-semibold text-gray-700 text-base sm:text-lg mb-3">
                    Announcement Content:
                </h3>
                <p className="whitespace-pre-wrap mb-6 text-sm sm:text-base">
                    {selectedAnnouncement.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="font-semibold text-gray-600 text-sm sm:text-base">
                      Scheduled:
                    </span>
                    <div className="text-sm sm:text-base">
                      {formatDate(selectedAnnouncement.schedule)} at{" "}
                      {formatTime(selectedAnnouncement.schedule)}
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600 text-sm sm:text-base">
                      Priority:
                    </span>
                    <div className="flex items-center gap-2 text-sm sm:text-base">
                      <span className="text-lg">
                        {selectedAnnouncement.priority}
                      </span>
                      <span className="text-sm text-gray-500">
                        (
                        {selectedAnnouncement.priority === "1"
                          ? "High"
                          : selectedAnnouncement.priority === "2"
                          ? "Medium"
                          : "Low"}
                        )
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs sm:text-sm text-gray-400">
                  Created: {formatDate(selectedAnnouncement.createdAt)} at{" "}
                  {formatTime(selectedAnnouncement.createdAt)}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Modal - Pass fetchAnnouncements as onSuccess prop */}
        <AddAnnouncement
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          setAnnouncements={setAnnouncements} 
          onSuccess={fetchAnnouncements} 
        />
      </div>
    </MainLayout>
  );
};

export default AnnouncementPage;