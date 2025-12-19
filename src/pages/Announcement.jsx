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



















// import React, { useState, useEffect, useCallback } from "react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";
// // --- Import the API Base URL from the config file ---
// import { API_BASE_URL } from "../config";

// const tabs = ["Inbox", "Draft", "Sent"];

// const AnnouncementPage = () => {
//   const [activeTab, setActiveTab] = useState("Inbox");
//   // State for the modal/pop-up
//   const [isModalOpen, setIsModalOpen] = useState(false); 
//   const [search, setSearch] = useState("");
//   const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
//   const [announcements, setAnnouncements] = useState([]);
  
//   // State for the Announcement Form Data
//   const [formData, setFormData] = useState({
//     title: "", // Subject field, using model 'title'
//     priority: "1", 
//     visibility: "all",
//     department: "",
//     // 🔥 CHANGE 1: Use only date part (YYYY-MM-DD)
//     schedule: new Date().toISOString().substring(0, 10), 
//     description: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);


//   // Function to fetch announcements from backend
//   const fetchAnnouncements = useCallback(async () => {
//     try {
//       const res = await axios.get(
//         `${API_BASE_URL}api/get-announcement`, // #vercel
//         {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         }
//       );
//       const data = res.data;
//       // Reverse the array to show the latest announcements first
//       setAnnouncements(data.reverse());
//       console.log(data);
//     } catch (err) {
//       console.error("Failed to fetch announcements:", err);
//     }
//   }, []);

//   // Fetch announcements on mount
//   useEffect(() => {
//     fetchAnnouncements();
//   }, [fetchAnnouncements]);

//   // Filter announcements based on active tab and search
//   const filteredData = announcements.filter((item) => {
//     // Filter by search (checking in title, description, and department)
//     const searchFilter = 
//         item.title?.toLowerCase().includes(search.toLowerCase()) ||
//         item.description?.toLowerCase().includes(search.toLowerCase()) ||
//         item.department?.toLowerCase().includes(search.toLowerCase());

//     let tabFilter = false;

//     // Logic for Inbox, Draft, and Sent
//     switch (activeTab) {
//         case "Inbox":
//             // Inbox: Only show SENT announcements specifically targeted to 'admin'
//             tabFilter = item.status === "sent" && item.visibility === "admin";
//             break;
//         case "Draft":
//             // Draft: Show announcements with status 'draft'
//             tabFilter = item.status === "draft";
//             break;
//         case "Sent":
//             // Sent: Show all SENT announcements, excluding those already in Inbox (visibility: 'admin')
//             tabFilter = item.status === "sent" && item.visibility !== "admin";
//             break;
//         default:
//             tabFilter = false;
//     }

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

//   // 🔥 CHANGE 2: Simplified formatTime to return empty string since time is removed
//   const formatTime = (dateString) => {
//     // Since we only capture date, we won't display time in the list/read views
//     return '';
//   };
  
//   // Helper function to get the correct date label based on status and visibility
//   const getDateLabel = (status, visibility) => {
//       if (status === "draft") {
//           return "Scheduled";
//       }
      
//       // Status is 'sent'
//       if (visibility === "admin") {
//           // Inbox content is status 'sent' and visibility 'admin'
//           return "Received";
//       }
      
//       // Status is 'sent' and visibility is 'all', 'students', or 'staff' (i.e., 'Sent' tab content)
//       return "Sent";
//   };


//   // Handlers for List/Read View
//   const handleAddAnnouncementClick = () => {
//     // Reset form state and open modal
//     setFormData({
//         title: "",
//         priority: "1",
//         visibility: "all",
//         department: "",
//         schedule: new Date().toISOString().substring(0, 10), // Date only
//         description: "",
//     });
//     setError(null);
//     setIsModalOpen(true);
//   };
  
//   const handleReadMore = (item) => {
//       setSelectedAnnouncement(item);
//   };
  
//   const handleBackToList = () => {
//       setSelectedAnnouncement(null);
//   };

//   // Handlers for Modal Form
//   const handleModalClose = () => {
//       setIsModalOpen(false);
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Submission handler (Send button in modal)
//   const handleSend = async () => {
//     setError(null);
//     setIsSubmitting(true);
    
//     // Check required fields before sending
//     if (!formData.title || !formData.description) {
//       setError("Subject and Announcement Details are required.");
//       setIsSubmitting(false);
//       return;
//     }

//     // Construct the payload (Backend determines status based on schedule and generates ID)
//     const payload = {
//         ...formData,
//         department: formData.department || 'General',
//     };

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}api/add-announcement`, 
//         payload,
//         {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         }
//       );

//       if (response.status === 200) {
//         fetchAnnouncements(); // Refresh the list
//         handleModalClose(); // Close the modal
//       }
//     } catch (err) {
//       console.error("Failed to add announcement:", err);
      
//       // Attempt to extract a more specific error message from server
//       let specificError = "Failed to submit announcement. Please check all fields and try again.";
//       if (err.response && err.response.data && err.response.data.error) {
//           specificError = err.response.data.error;
//       }
//       setError(specificError);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Updated draft handler (for Draft tab 'Send' button)
//   const handleDraft = async (item) => {
//     try {
//       const response = await axios.put(
//         `${API_BASE_URL}api/modify-announcement/${item._id}`, // #vercel
//         {},
//         {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         }
//       );
//       if (response.status === 200) {
//         console.log("updated successfully");
//         fetchAnnouncements(); 
//       }
//     } catch (error) {
//       console.error("Error drafting announcement:", error);
//     }
//   };

//   // Determine current view state
//   const isListView = !selectedAnnouncement;
//   const isReadView = !!selectedAnnouncement;

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow mx-2 sm:mx-4 lg:mx-6">
//         <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
          
//           {/* Header Row (Search + Add / Back to List) */}
//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            
//             {/* Show Search Bar only in List View */}
//             {isListView && (
//                 <div className="relative flex-1 sm:max-w-xs lg:max-w-md">
//                     <input
//                         type="text"
//                         placeholder="Search announcements..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className="border px-3 sm:px-4 py-2 rounded w-full text-sm sm:text-base pr-10"
//                     />
//                     <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
//                 </div>
//             )}

//             {/* Show Back button in Read View */}
//             {isReadView && (
//                 <button
//                     onClick={handleBackToList}
//                     className="flex items-center text-blue-600 hover:underline text-sm sm:text-base"
//                 >
//                     <span className="mr-2">←</span> Back to List
//                 </button>
//             )}

//             {/* Show Add button only in List View */}
//             {isListView && (
//                 <button
//                     onClick={handleAddAnnouncementClick}
//                     className="bg-blue-600 text-white px-4 sm:px-5 py-2 rounded-full hover:bg-blue-700 text-sm sm:text-base whitespace-nowrap flex-shrink-0"
//                 >
//                     + Add
//                 </button>
//             )}
//           </div>
          
//           {/* Main Content Area: List View */}
//           {isListView && (
//             <>
//               {/* Tabs - Responsive with scroll on mobile */}
//               <div className="flex bg-gray-100 rounded overflow-x-auto">
//                 {tabs.map((tab) => {
//                   let count;
//                   if (tab === "Inbox") {
//                     count = announcements.filter(item => item.status === "sent" && item.visibility === "admin").length;
//                   } else if (tab === "Draft") {
//                     count = announcements.filter(item => item.status === "draft").length;
//                   } else if (tab === "Sent") {
//                     count = announcements.filter(item => item.status === "sent" && item.visibility !== "admin").length;
//                   }
                  
//                   return (
//                     <button
//                       key={tab}
//                       onClick={() => setActiveTab(tab)}
//                       className={`flex-1 min-w-max px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition whitespace-nowrap ${
//                         activeTab === tab
//                           ? "bg-white shadow text-black"
//                           : "text-gray-600 hover:bg-gray-200"
//                       }`}
//                     >
//                       <span className="hidden sm:inline">{tab}</span>
//                       <span className="sm:hidden">
//                         {tab.charAt(0).toUpperCase()}
//                       </span>
//                       <span className="ml-1">
//                         ({count || 0})
//                       </span>
//                     </button>
//                   );
//                 })}
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
//                               {item.description.substring(0, 30)}...
//                             </div>
//                           </div>
//                         </div>

//                         <div className="flex items-center justify-between">
//                           <div className="text-xs text-gray-500">
//                             {/* Display Date Only */}
//                             <div>{formatDate(item.schedule)}</div>
//                           </div>
//                           <div className="flex gap-2">
//                             {item.status?.toLowerCase() === 'draft' && (
//                               <button
//                                 onClick={() => handleDraft(item)}
//                                 className="bg-blue-400 text-white px-2 py-1 rounded text-xs"
//                               >
//                                 Send
//                               </button>
//                             )}
//                             <button
//                               onClick={() => handleReadMore(item)}
//                               className="text-blue-600 text-xs hover:underline"
//                             >
//                               Read More
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
//                               {item.description.substring(0, 50)}...
//                             </div>
//                           </div>
//                         </div>

//                         <div className="text-right space-y-1 min-w-[100px] lg:min-w-[120px] flex-shrink-0">
//                           <div className="text-gray-500 font-semibold text-xs lg:text-sm">
//                             {/* Display Date Only */}
//                             {formatDate(item.schedule)}
//                           </div>
//                           <div className="text-gray-400 text-xs">
//                             {/* Display Time Only (will be empty) */}
//                             {formatTime(item.schedule)}
//                           </div>
//                           <div className="flex gap-2 justify-end">
//                             {item.status?.toLowerCase() === 'draft' && (
//                               <button
//                                 onClick={() => handleDraft(item)}
//                                 className="bg-blue-400 text-white px-2 py-1 rounded-lg text-xs lg:text-sm"
//                               >
//                                 Send
//                               </button>
//                             )}
//                             <button
//                               onClick={() => handleReadMore(item)}
//                               className="text-blue-600 text-xs lg:text-sm hover:underline"
//                             >
//                               Read More
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
//           )}

//           {/* Read More View */}
//           {isReadView && (
//             <div className="bg-white p-4 sm:p-6 rounded shadow space-y-4">
              
//               {/* Header - Responsive Layout */}
//               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//                 <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#0E83B2] rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold flex-shrink-0">
//                   {selectedAnnouncement.priority}
//                 </div>
//                 <div className="min-w-0 flex-1">
//                   <div className="font-bold text-lg sm:text-xl mb-1">
//                     Subject: {selectedAnnouncement.title}
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

//               {/* Details - Responsive Grid and Description */}
//               <div className="border-t pt-4">
//                 {/* Announcement Description (Main Content) */}
//                 <h3 className="font-semibold text-gray-700 text-base sm:text-lg mb-3">
//                     Announcement Content:
//                 </h3>
//                 <p className="whitespace-pre-wrap mb-6 text-sm sm:text-base">
//                     {selectedAnnouncement.description}
//                 </p>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//                   <div>
//                     {/* DYNAMIC DATE LABEL IMPLEMENTATION */}
//                     <span className="font-semibold text-gray-600 text-sm sm:text-base">
//                       {getDateLabel(selectedAnnouncement.status, selectedAnnouncement.visibility)} Date:
//                     </span>
//                     <div className="text-sm sm:text-base">
//                       {/* Display Date Only */}
//                       {formatDate(selectedAnnouncement.schedule)} 
//                       {/* Removed 'at {formatTime(selectedAnnouncement.schedule)}' */}
//                     </div>
//                   </div>
//                   <div>
                    
                   
//                   </div>
//                 </div>

//                 <div className="mt-4 text-xs sm:text-sm text-gray-400">
//                   Created: {formatDate(selectedAnnouncement.createdAt)} at{" "}
//                   {/* Removed 'at {formatTime(selectedAnnouncement.createdAt)}' */}
//                   {/* Keeping time display here for completeness, using original formatTime if needed, but since we decided to simplify it: */}
//                   {formatTime(selectedAnnouncement.createdAt)}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* 🟢 ANNOUNCEMENT CREATION POP-UP (Modal) - UI INTEGRATED BELOW */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50"
        
//             style={{ 
//                 // Using RGBA to create the dimming effect without blurring the backdrop
//                 backgroundColor: 'rgba(50, 50, 50, 0.5)', 
//             }}>
//           <div className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl mx-4">
            
//             {/* Modal Header */}
//             <div className="flex justify-between items-center border-b pb-3 mb-4">
//               <h3 className="text-xl font-semibold text-gray-800">
//                 Announcements Creation
//               </h3>
//               <button 
//                 onClick={handleModalClose} 
//                 className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
//                 disabled={isSubmitting}
//               >
//                 &times;
//               </button>
//             </div>

//             {/* Form Content matching the Image Layout */}
//             <div className="space-y-4">
              
//               {/* Row 1: Subject (Full Width) */}
//               <div className="flex flex-col">
//                 <label className="text-sm font-medium text-gray-600 mb-1">
//                   Subject
//                 </label>
//                 <input
//                   type="text"
//                   name="title" // Corresponds to model 'title'
//                   value={formData.title}
//                   onChange={handleFormChange}
//                   className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Announcement Subject"
//                 />
//               </div>

//               {/* Row 2: Priority Level and Visibility Options (Side-by-Side) */}
//               <div className="flex space-x-4">
//                 {/* Priority Level */}
//                 <div className="flex-1">
//                   <label className="text-sm font-medium text-gray-600 block mb-1">
//                     Priority Level
//                   </label>
//                   <select
//                     name="priority"
//                     value={formData.priority}
//                     onChange={handleFormChange}
//                     className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
//                   >
//                     <option value="1">1 (High)</option>
//                     <option value="2">2 (Medium)</option>
//                     <option value="3">3 (Low)</option>
//                   </select>
//                 </div>
                
//                 {/* Visibility Options */}
//                 <div className="flex-1">
//                   <label className="text-sm font-medium text-gray-600 block mb-1">
//                     Visibility Options
//                   </label>
//                   <select
//                     name="visibility"
//                     value={formData.visibility}
//                     onChange={handleFormChange}
//                     className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
//                   >
//                     <option value="all">All</option>
//                     <option value="students">Students</option>
//                     <option value="staff">Staff</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 </div>
//               </div>
              
//               {/* Row 3: Department and Schedule (Side-by-Side) */}
//               <div className="flex space-x-4">
//                 {/* Department */}
//                 <div className="flex-1">
//                   <label className="text-sm font-medium text-gray-600 block mb-1">
//                     Department
//                   </label>
//                   <input
//                     type="text"
//                     name="department"
//                     value={formData.department}
//                     onChange={handleFormChange}
//                     className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
//                     placeholder="e.g., Staffing / General"
//                   />
//                 </div>
                
//                 {/* Schedule */}
//                 <div className="flex-1">
//                   <label className="text-sm font-medium text-gray-600 block mb-1">
//                     Schedule
//                   </label>
//                   <input
//                     // 🔥 CHANGE 3: Changed input type to 'date'
//                     type="date"
//                     name="schedule"
//                     value={formData.schedule}
//                     onChange={handleFormChange}
//                     className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
//                   />
//                 </div>
//               </div>

//               {/* Row 4: Description (Large Text Area - Full Width) */}
//               <div className="flex flex-col">
//                 <label className="text-sm font-medium text-gray-600 block mb-1">
//                     Announcement Details
//                 </label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleFormChange}
//                   rows="6"
//                   className="w-full border border-gray-300 p-2 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none"
//                   placeholder="Enter the full announcement text here..."
//                 />
//               </div>

//             </div>

//             {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            
//             {/* Footer/Action Buttons (Send button in the bottom right) */}
//             <div className="flex justify-end pt-3">
//               <button
//                 onClick={handleSend} // Submits, status determined by backend
//                 className={`bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition ${
//                   isSubmitting ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? "Sending..." : "Send"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </MainLayout>
//   );
// };

// export default AnnouncementPage;













import React, { useState, useEffect, useCallback } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config";

const tabs = ["Inbox", "Draft", "Sent"];

const AnnouncementPage = () => {
  const [activeTab, setActiveTab] = useState("Inbox");
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [search, setSearch] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  
  // States for editing logic
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "", 
    priority: "1", 
    visibility: "all",
    department: "",
    schedule: new Date().toISOString().substring(0, 10), 
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnnouncements = useCallback(async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}api/get-announcement`,
        {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
        }
      );
      setAnnouncements(res.data.reverse());
    } catch (err) {
      console.error("Failed to fetch announcements:", err);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const filteredData = announcements.filter((item) => {
    const searchFilter = 
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase()) ||
        item.department?.toLowerCase().includes(search.toLowerCase());

    let tabFilter = false;
    switch (activeTab) {
        case "Inbox":
            tabFilter = item.status === "sent" && item.visibility === "admin";
            break;
        case "Draft":
            tabFilter = item.status === "draft";
            break;
        case "Sent":
            tabFilter = item.status === "sent" && item.visibility !== "admin";
            break;
        default:
            tabFilter = false;
    }
    return tabFilter && searchFilter;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = () => '';
  
  const getDateLabel = (status, visibility) => {
      if (status === "draft") return "Scheduled";
      if (visibility === "admin") return "Received";
      return "Sent";
  };

  const handleAddAnnouncementClick = () => {
    setIsEditing(false);
    setFormData({
        title: "",
        priority: "1",
        visibility: "all",
        department: "",
        schedule: new Date().toISOString().substring(0, 10),
        description: "",
    });
    setError(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditingId(item._id);
    setFormData({
        title: item.title,
        priority: item.priority,
        visibility: item.visibility,
        department: item.department,
        schedule: item.schedule ? item.schedule.substring(0, 10) : new Date().toISOString().substring(0, 10),
        description: item.description,
    });
    setError(null);
    setIsModalOpen(true);
  };
  
  const handleReadMore = (item) => {
      setSelectedAnnouncement(item);
  };
  
  const handleBackToList = () => {
      setSelectedAnnouncement(null);
  };

  const handleModalClose = () => {
      setIsModalOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSend = async () => {
    setError(null);
    setIsSubmitting(true);
    
    if (!formData.title || !formData.description) {
      setError("Subject and Announcement Details are required.");
      setIsSubmitting(false);
      return;
    }

    const payload = {
        ...formData,
        department: formData.department || 'General',
    };

    try {
      let response;
      const headers = { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } };

      if (isEditing) {
        response = await axios.put(`${API_BASE_URL}api/modify-announcement/${editingId}`, payload, headers);
      } else {
        response = await axios.post(`${API_BASE_URL}api/add-announcement`, payload, headers);
      }

      if (response.status === 200) {
        fetchAnnouncements();
        handleModalClose();
      }
    } catch (err) {
      let specificError = "Failed to submit announcement.";
      if (err.response && err.response.data && err.response.data.error) {
          specificError = err.response.data.error;
      }
      setError(specificError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDraftSend = async (item) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}api/modify-announcement/${item._id}`,
        { status: "sent" },
        {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
        }
      );
      if (response.status === 200) {
        fetchAnnouncements(); 
      }
    } catch (error) {
      console.error("Error sending draft:", error);
    }
  };

  const isListView = !selectedAnnouncement;
  const isReadView = !!selectedAnnouncement;

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow mx-2 sm:mx-4 lg:mx-6">
        <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            {isListView && (
                <div className="relative flex-1 sm:max-w-xs lg:max-w-md">
                    <input
                        type="text"
                        placeholder="Search announcements..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border px-3 sm:px-4 py-2 rounded w-full text-sm sm:text-base pr-10"
                    />
                </div>
            )}
            {isReadView && <button onClick={handleBackToList} className="flex items-center text-blue-600 hover:underline text-sm sm:text-base"><span className="mr-2">←</span> Back to List</button>}
            {isListView && <button onClick={handleAddAnnouncementClick} className="bg-blue-600 text-white px-4 sm:px-5 py-2 rounded-full hover:bg-blue-700 text-sm sm:text-base whitespace-nowrap flex-shrink-0">+ Add</button>}
          </div>
          
          {isListView && (
            <>
              <div className="flex bg-gray-100 rounded overflow-x-auto">
                {tabs.map((tab) => {
                  let count;
                  if (tab === "Inbox") count = announcements.filter(item => item.status === "sent" && item.visibility === "admin").length;
                  else if (tab === "Draft") count = announcements.filter(item => item.status === "draft").length;
                  else if (tab === "Sent") count = announcements.filter(item => item.status === "sent" && item.visibility !== "admin").length;
                  
                  return (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 min-w-max px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition whitespace-nowrap ${activeTab === tab ? "bg-white shadow text-black" : "text-gray-600 hover:bg-gray-200"}`}>
                      {tab} <span className="ml-1">({count || 0})</span>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-3 sm:space-y-4">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <div key={item._id} className="bg-white shadow rounded p-3 sm:p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#0E83B2] rounded-full flex items-center justify-center text-white font-bold">{item.priority}</div>
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-sm lg:text-lg truncate">{item.title}</div>
                            <div className="text-xs lg:text-sm text-gray-500 truncate">{item.description.substring(0, 50)}...</div>
                          </div>
                        </div>

                        <div className="text-right space-y-1 min-w-[150px] flex-shrink-0">
                          <div className="text-gray-500 font-semibold text-xs lg:text-sm">{formatDate(item.schedule)}</div>
                          <div className="flex gap-2 justify-end">
                            {/* 🟡 Colored Edit Button for Drafts */}
                            {item.status === 'draft' && (
                              <button 
                                onClick={() => handleEdit(item)} 
                                className="bg-amber-500 text-white px-3 py-1 rounded-lg text-xs lg:text-sm hover:bg-amber-600"
                              >
                                Edit
                              </button>
                            )}
                            {item.status === 'draft' && (
                                <button onClick={() => handleDraftSend(item)} className="bg-blue-400 text-white px-3 py-1 rounded-lg text-xs lg:text-sm">Send</button>
                            )}
                            <button onClick={() => handleReadMore(item)} className="text-blue-600 text-xs lg:text-sm hover:underline">Read More</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">No announcements found</div>
                )}
              </div>
            </>
          )}

          {isReadView && (
            <div className="bg-white p-4 sm:p-6 rounded shadow space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#0E83B2] rounded-full flex items-center justify-center text-white text-xl font-bold">{selectedAnnouncement.priority}</div>
                <div>
                  <div className="font-bold text-lg sm:text-xl">Subject: {selectedAnnouncement.title}</div>
                  <div className="text-gray-500 capitalize">{selectedAnnouncement.department} Department</div>
                </div>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-700 mb-3">Announcement Content:</h3>
                <p className="whitespace-pre-wrap mb-6 text-sm">{selectedAnnouncement.description}</p>
                <div className="text-sm">
                    <span className="font-semibold text-gray-600">{getDateLabel(selectedAnnouncement.status, selectedAnnouncement.visibility)} Date: </span>
                    {formatDate(selectedAnnouncement.schedule)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl mx-4">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Announcements {isEditing ? "Edit" : "Creation"}</h3>
              <button onClick={handleModalClose} className="text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">Subject</label>
                <input type="text" name="title" value={formData.title} onChange={handleFormChange} className="w-full border border-gray-300 p-2 rounded-md" />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600 block mb-1">Priority Level</label>
                  <select name="priority" value={formData.priority} onChange={handleFormChange} className="w-full border border-gray-300 p-2 rounded-md">
                    <option value="1">1 (High)</option>
                    <option value="2">2 (Medium)</option>
                    <option value="3">3 (Low)</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600 block mb-1">Visibility Options</label>
                  <select name="visibility" value={formData.visibility} onChange={handleFormChange} className="w-full border border-gray-300 p-2 rounded-md">
                    <option value="all">All</option>
                    <option value="students">Students</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600 block mb-1">Department</label>
                  <input type="text" name="department" value={formData.department} onChange={handleFormChange} className="w-full border border-gray-300 p-2 rounded-md" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600 block mb-1">Schedule Date</label>
                  <input type="date" name="schedule" value={formData.schedule} onChange={handleFormChange} className="w-full border border-gray-300 p-2 rounded-md" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">Announcement Details</label>
                <textarea name="description" value={formData.description} onChange={handleFormChange} rows="6" className="w-full border border-gray-300 p-2 rounded-md resize-none" />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            <div className="flex justify-end pt-3">
              <button onClick={handleSend} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : isEditing ? "Update & Save" : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default AnnouncementPage;