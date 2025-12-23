// import React, { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import {
//     User,
//     BookOpen,
//     DollarSign,
//     Calendar,
//     Bus,
//     Clock,
//     ChevronRight,
//     Menu,
//     X,
//     ArrowLeft
// } from 'lucide-react';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faRightFromBracket,
//     faCircleUser,
//     faBell,
//     faShareNodes,
//     faBars,
//     faChevronRight,
//     faXmark,
//     faFileExport,
// } from "@fortawesome/free-solid-svg-icons";

// // Import your components
// import StudentProfile from './Student Edit/StudentProfile';
// import StudentAcademic from './Student Edit/StudentAcademic';
// import FeesManagement from './Student Edit/StudentFees';
// import EventsActivities from './Student Edit/StudentEvent';
// import TransportManagement from './Student Edit/StudentTransport';
// import History from './Student Edit/StudentHistory';

// const EditStudent = () => {
//     const [activeSection, setActiveSection] = useState('profile');
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const menuItems = [
//         { id: 'profile', label: 'Profile Overview', icon: User, component: StudentProfile },
//         { id: 'academic', label: 'Academic Management', icon: BookOpen, component: StudentAcademic },
//         { id: 'fees', label: 'Fees Management', icon: DollarSign, component: FeesManagement },
//         { id: 'events', label: 'Events & Activities', icon: Calendar, component: EventsActivities },
//         { id: 'transport', label: 'Transport Management', icon: Bus, component: TransportManagement },
//         { id: 'history', label: 'History', icon: Clock, component: History },
//         // Item moved to the bottom of the list
//         {
//             id: 'dashboard',
//             label: 'Back to Dashboard',
//             icon: ArrowLeft,
//             action: () => navigate('/dashboard')
//         },
//     ];

//     const handleLogout = () => {
//         console.log("Logout clicked");
//     };

//     const handleMenuClick = (itemId) => {
//         const selectedItem = menuItems.find(item => item.id === itemId);

//         if (selectedItem && selectedItem.action) {
//             selectedItem.action();
//         } else {
//             setActiveSection(itemId);
//             if (window.innerWidth < 1024) {
//                 setIsSidebarOpen(false);
//             }
//         }
//     };

//     const getCurrentComponent = () => {
//         const currentItem = menuItems.find(item => item.id === activeSection);
//         if (!currentItem || !currentItem.component) {
//             return <StudentProfile studentid={id} />;
//         }
//         const Component = currentItem.component;
//         return <Component studentid={id} />;
//     };

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Header */}
//             <div className="flex flex-wrap justify-end items-center gap-4 text-black bg-blue-400 gap-y-4 p-5">
//                 <button
//                     onClick={toggleSidebar}
//                     className="lg:hidden text-white hover:text-gray-200 focus:outline-none focus:text-gray-200 items-start"
//                     aria-label="Toggle menu"
//                 >
//                     <Menu className="w-6 h-6" />
//                 </button>
//                 <div className="flex items-center gap-4">
//                     <FontAwesomeIcon
//                         icon={faBell}
//                         className="text-lg hover:text-white cursor-pointer"
//                         aria-label="Notifications"
//                         onClick={() => console.log("Notifications clicked")}
//                     />

//                     <FontAwesomeIcon
//                         icon={faShareNodes}
//                         className="text-lg hover:text-white cursor-pointer"
//                         aria-label="Share"
//                         onClick={() => console.log("Share clicked")}
//                     />

//                     <FontAwesomeIcon
//                         icon={faFileExport}
//                         className="text-lg hover:text-white cursor-pointer"
//                         aria-label="Export"
//                         onClick={() => console.log("Export clicked")}
//                     />

//                     <FontAwesomeIcon
//                         icon={faCircleUser}
//                         className="text-xl hover:text-white cursor-pointer"
//                         aria-label="Profile"
//                         onClick={() => console.log("Profile clicked")}
//                     />

//                     <button
//                         onClick={handleLogout}
//                         className="text-red-600 hover:text-red-800 flex items-center space-x-2"
//                         aria-label="Logout"
//                     >
//                         <FontAwesomeIcon icon={faRightFromBracket} className="text-lg" />
//                     </button>
//                 </div>
//             </div>

//             <div className="flex flex-col lg:flex-row relative">
//                 {isSidebarOpen && (
//                     <div
//                         className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
//                         onClick={() => setIsSidebarOpen(false)}
//                     />
//                 )}

//                 {/* Sidebar */}
//                 <div className={`
//                     fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-30
//                     w-80 bg-white shadow-lg h-screen lg:h-auto
//                     ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//                 `}>
//                     <div className="lg:hidden absolute top-4 right-4">
//                         <button
//                             onClick={toggleSidebar}
//                             className="text-gray-500 hover:text-gray-700 focus:outline-none"
//                             aria-label="Close menu"
//                         >
//                             <X className="w-6 h-6" />
//                         </button>
//                     </div>

//                     <div className="p-6 border-b border-gray-200">
//                         <div className="flex items-center space-x-3">
//                             <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center">
//                                 <img src='/src/assets/logo.jpeg' alt='SSPD logo' />
//                             </div>
//                             <div>
//                                 <h1 className="text-2xl font-bold text-blue-400">SSPD SMS</h1>
//                             </div>
//                         </div>
//                     </div>

// {/* Menu Items */}
// <nav className="p-4 space-y-2">
//     {menuItems.map((item) => {
//         const Icon = item.icon;
//         return (
//             <button
//                 key={item.id}
//                 onClick={() => handleMenuClick(item.id)}
//                 className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-colors duration-200 group ${
//                     activeSection === item.id
//                         ? 'bg-blue-100 text-blue-600'
//                         : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
//                 }`}
//             >
//                 <div className="flex items-center space-x-3">
//                     <Icon className="w-5 h-5" />
//                     <span className="font-medium">{item.label}</span>
//                 </div>
//                 <ChevronRight className={`w-4 h-4 transition-colors ${
//                     activeSection === item.id
//                         ? 'text-blue-600'
//                         : 'text-gray-400 group-hover:text-blue-600'
//                 }`} />
//             </button>
//         );
//     })}
// </nav>
//                 </div>

//                 {/* Main Content */}
//                 <div className="flex-1 p-4 lg:p-8">
//                     {getCurrentComponent()}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditStudent;

// import React, { useState, useEffect } from 'react'; // <-- Added useEffect
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios'; // <-- Added axios
// import {
//     User,
//     BookOpen,
//     DollarSign,
//     Calendar,
//     Bus,
//     Clock,
//     ChevronRight,
//     Menu,
//     X,
//     ArrowLeft
// } from 'lucide-react';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faRightFromBracket,
//     faCircleUser,
//     faBell,
//     faShareNodes,
//     faBars,
//     // faChevronRight, // Not used if using lucide-react ChevronRight
//     // faXmark, // Not used if using lucide-react X
//     faFileExport,
// } from "@fortawesome/free-solid-svg-icons";

// // Import your components
// import StudentProfile from './Student Edit/StudentProfile';
// import StudentAcademic from './Student Edit/StudentAcademic';
// import FeesManagement from './Student Edit/StudentFees';
// import EventsActivities from './Student Edit/StudentEvent';
// import TransportManagement from './Student Edit/StudentTransport';
// import History from './Student Edit/StudentHistory';

// // --- NEW: Add Auth Header and API Base URL ---
// const AUTH_HEADER = 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='; // Make sure this is correct
// const API_BASE_URL = 'http://localhost:5000/api'; // Make sure this is correct

// const EditStudent = () => {
//     const [activeSection, setActiveSection] = useState('profile');
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const { id } = useParams(); // Student ID from the URL
//     const navigate = useNavigate();

//     // --- NEW: State to hold the fetched student data ---
//     const [studentData, setStudentData] = useState(null);
//     const [isLoadingStudent, setIsLoadingStudent] = useState(true); // Added loading state

//     // --- UPDATED: Fetch student data including transport ---
//     useEffect(() => {
//         const fetchStudentData = async () => {
//             if (!id) {
//                 console.warn("Student ID parameter is missing.");
//                 setIsLoadingStudent(false);
//                 return;
//             }
//             setIsLoadingStudent(true);
//             try {
//                 const response = await axios.post(`${API_BASE_URL}/student-by-id`,
//                     { id: id },
//                     { headers: { auth: AUTH_HEADER } }
//                 );
//                 if (response.status === 200) {
//                     // --- CORRECTED: Include the transport object ---
//                     const { firstname, lastname, admission, transport } = response.data; // Destructure transport
//                     const studentInfo = {
//                         _id: response.data._id,
//                         name: `${firstname || ''} ${lastname || ''}`.trim(),
//                         std: admission?.admissionstd,
//                         div: admission?.admissiondivision,
//                         transport: transport || {} // Include the transport object
//                         // You could also just spread the whole response:
//                         // ...response.data
//                     };
//                     setStudentData(studentInfo); // Store the COMPLETE data
//                     console.log("Fetched student data for props (including transport):", studentInfo); // Check this log after the change
//                     // --- END CORRECTION ---
//                 } else {
//                      console.error("Failed to fetch student data, status:", response.status);
//                      setStudentData(null);
//                 }
//             } catch (error) {
//                 console.error("Error fetching student data in EditStudent:", error);
//                 setStudentData(null);
//             } finally {
//                 setIsLoadingStudent(false);
//             }
//         };

//         fetchStudentData();
//     }, [id]);// Re-run this effect if the 'id' parameter changes

//     const menuItems = [
//         { id: 'profile', label: 'Profile Overview', icon: User, component: StudentProfile },
//         { id: 'academic', label: 'Academic Management', icon: BookOpen, component: StudentAcademic },
//         { id: 'fees', label: 'Fees Management', icon: DollarSign, component: FeesManagement },
//         { id: 'events', label: 'Events & Activities', icon: Calendar, component: EventsActivities },
//         { id: 'transport', label: 'Transport Management', icon: Bus, component: TransportManagement },
//         { id: 'history', label: 'History', icon: Clock, component: History },
//         {
//             id: 'dashboard',
//             label: 'Back to Dashboard',
//             icon: ArrowLeft,
//             action: () => navigate('/students') // Ensure this route is correct
//         },
//     ];

//     const handleLogout = () => {
//         console.log("Logout clicked");
//         // Add actual logout logic here
//     };

//     const handleMenuClick = (itemId) => {
//         const selectedItem = menuItems.find(item => item.id === itemId);

//         if (selectedItem && selectedItem.action) {
//             selectedItem.action();
//         } else if (selectedItem) { // Check if selectedItem exists before setting state
//             setActiveSection(itemId);
//             if (window.innerWidth < 1024) { // Close sidebar on mobile
//                 setIsSidebarOpen(false);
//             }
//         }
//     };

//     // --- UPDATED: This function now passes the 'student' prop ---
//     const getCurrentComponent = () => {
//         const currentItem = menuItems.find(item => item.id === activeSection);

//         // Display loading indicator while fetching
//         if (isLoadingStudent) {
//             return <div className="text-center p-10">Loading student details...</div>;
//         }

//         // Handle case where data fetching failed but we are not on profile
//         // Allow profile rendering even if data fetch fails, as it might have its own fetch
//         if (!studentData && currentItem && currentItem.id !== 'profile') {
//             return <div className="text-red-500 text-center p-10">Failed to load student data. Cannot display this section.</div>;
//         }

//         // Get the component to render, default to StudentProfile
//         const Component = currentItem?.component || StudentProfile;

//         // Render the component, passing BOTH studentid and the fetched studentData object
//         return <Component studentid={id} student={studentData} />;
//     };

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     // --- The JSX structure below is UNCHANGED from your original code ---
//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Header */}
//             <div className="flex flex-wrap justify-end items-center gap-4 text-black bg-blue-400 gap-y-4 p-5">
//                 <button
//                     onClick={toggleSidebar}
//                     className="lg:hidden text-white hover:text-gray-200 focus:outline-none focus:text-gray-200 items-start" // Make sure 'items-start' is intended here
//                     aria-label="Toggle menu"
//                 >
//                     <Menu className="w-6 h-6" />
//                 </button>
//                 <div className="flex items-center gap-4">
//                     <FontAwesomeIcon
//                         icon={faBell}
//                         className="text-lg hover:text-white cursor-pointer"
//                         aria-label="Notifications"
//                         onClick={() => console.log("Notifications clicked")}
//                     />
//                     <FontAwesomeIcon
//                         icon={faShareNodes}
//                         className="text-lg hover:text-white cursor-pointer"
//                         aria-label="Share"
//                         onClick={() => console.log("Share clicked")}
//                     />
//                     <FontAwesomeIcon
//                         icon={faFileExport}
//                         className="text-lg hover:text-white cursor-pointer"
//                         aria-label="Export"
//                         onClick={() => console.log("Export clicked")}
//                     />
//                     <FontAwesomeIcon
//                         icon={faCircleUser}
//                         className="text-xl hover:text-white cursor-pointer"
//                         aria-label="Profile"
//                         onClick={() => console.log("Profile clicked")}
//                     />
//                     <button
//                         onClick={handleLogout}
//                         className="text-red-600 hover:text-red-800 flex items-center space-x-2"
//                         aria-label="Logout"
//                     >
//                         <FontAwesomeIcon icon={faRightFromBracket} className="text-lg" />
//                     </button>
//                 </div>
//             </div>

//             <div className="flex flex-col lg:flex-row relative">
//                 {isSidebarOpen && (
//                     <div
//                         className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
//                         onClick={() => setIsSidebarOpen(false)} // Use toggleSidebar or explicit false
//                     />
//                 )}

//                 {/* Sidebar */}
//                 <div className={`
//                     fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-30
//                     w-80 bg-white shadow-lg h-screen lg:h-auto  /* Consider adjusting height if needed */
//                     ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//                 `}>
//                     {/* Sidebar Header */}
//                     <div className="p-6 border-b border-gray-200 flex justify-between items-center"> {/* Added flex justify-between */}
//                         <div className="flex items-center space-x-3">
//                             <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center overflow-hidden"> {/* Added overflow */}
//                                 <img src='/src/assets/logo.jpeg' alt='SSPD logo' className="object-contain w-full h-full"/> {/* Ensure image fits */}
//                             </div>
//                             <div>
//                                 <h1 className="text-2xl font-bold text-blue-400">SSPD SMS</h1>
//                             </div>
//                         </div>
//                         {/* Close button for mobile */}
//                         <div className="lg:hidden">
//                              <button
//                                 onClick={toggleSidebar}
//                                 className="text-gray-500 hover:text-gray-700 focus:outline-none"
//                                 aria-label="Close menu"
//                             >
//                                 <X className="w-6 h-6" />
//                             </button>
//                         </div>
//                     </div>

//                     {/* Menu Items */}
//                     <nav className="p-4 space-y-2">
//                         {menuItems.map((item) => {
//                             const Icon = item.icon;
//                             return (
//                                 <button
//                                     key={item.id}
//                                     onClick={() => handleMenuClick(item.id)}
//                                     className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-colors duration-200 group ${
//                                         activeSection === item.id
//                                             ? 'bg-blue-100 text-blue-600'
//                                             : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
//                                     }`}
//                                 >
//                                     <div className="flex items-center space-x-3">
//                                         <Icon className="w-5 h-5" />
//                                         <span className="font-medium">{item.label}</span>
//                                     </div>
//                                     <ChevronRight className={`w-4 h-4 transition-colors ${
//                                         activeSection === item.id
//                                             ? 'text-blue-600'
//                                             : 'text-gray-400 group-hover:text-blue-600'
//                                     }`} />
//                                 </button>
//                             );
//                         })}
//                     </nav>
//                 </div>

//                 {/* Main Content */}
//                 <div className="flex-1 p-4 lg:p-8 overflow-y-auto"> {/* Added overflow-y-auto */}
//                     {getCurrentComponent()}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditStudent;

// import React, { useState, useEffect } from 'react'; // <-- Added useEffect
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios'; // <-- Added axios
// import {
//     User,
//     BookOpen,
//     DollarSign,
//     Calendar,
//     Bus,
//     Clock,
//     ChevronRight,
//     Menu,
//     X,
//     ArrowLeft
// } from 'lucide-react';

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faRightFromBracket,
//     faCircleUser,
//     faBell,
//     faShareNodes,
//     faBars,
//     // faChevronRight, // Not used if using lucide-react ChevronRight
//     // faXmark, // Not used if using lucide-react X
//     faFileExport,
// } from "@fortawesome/free-solid-svg-icons";

// // Import your components
// import StudentProfile from './Student Edit/StudentProfile';
// import StudentAcademic from './Student Edit/StudentAcademic';
// import FeesManagement from './Student Edit/StudentFees';
// import EventsActivities from './Student Edit/StudentEvent';
// import TransportManagement from './Student Edit/StudentTransport';
// import History from './Student Edit/StudentHistory';

// // --- Auth Header and API Base URL ---
// const AUTH_HEADER = 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='; // Make sure this is correct
// const API_BASE_URL = 'http://localhost:5000/api'; // Make sure this is correct

// const EditStudent = () => {
//     const [activeSection, setActiveSection] = useState('profile');
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//     const { id } = useParams(); // Student ID from the URL
//     const navigate = useNavigate();

//     // --- State to hold the fetched student data ---
//     const [studentData, setStudentData] = useState(null);
//     const [isLoadingStudent, setIsLoadingStudent] = useState(true); // Added loading state

//     // --- Function to fetch student data (Refactored) ---
//     // Defined outside useEffect so it can be passed as a prop
//     const fetchStudentData = async () => {
//         if (!id) {
//             console.warn("Student ID parameter is missing.");
//             setIsLoadingStudent(false);
//             return;
//         }
//         // Don't set loading true here if called as a refresh, only on initial load/ID change
//         // setIsLoadingStudent(true);
//         try {
//             console.log(`Fetching student data for ID: ${id}`); // Log fetch start
//             const response = await axios.post(`${API_BASE_URL}/student-by-id`,
//                 { id: id },
//                 { headers: { auth: AUTH_HEADER } }
//             );
//             if (response.status === 200) {
//                 // --- CORRECTED: Include the transport object ---
//                 const { firstname, lastname, admission, transport } = response.data; // Destructure transport
//                 const studentInfo = {
//                     _id: response.data._id,
//                     name: `${firstname || ''} ${lastname || ''}`.trim(),
//                     std: admission?.admissionstd,
//                     div: admission?.admissiondivision,
//                     transport: transport || {} // Include the transport object (or an empty one if missing)
//                     // You could also just spread the whole response:
//                     // ...response.data // Spread all properties from the fetched student data
//                 };
//                 setStudentData(studentInfo); // Store the COMPLETE data
//                 console.log("Fetched student data for props (including transport):", studentInfo);
//                 // --- END CORRECTION ---
//             } else {
//                  console.error("Failed to fetch student data, status:", response.status);
//                  setStudentData(null); // Clear on failure
//             }
//         } catch (error) {
//             console.error("Error fetching student data in EditStudent:", error);
//             setStudentData(null); // Clear on error
//         } finally {
//             // Only set loading false on initial load/ID change
//             if (isLoadingStudent) setIsLoadingStudent(false);
//         }
//     };

//     // --- useEffect now just calls the fetch function on mount/ID change ---
//     useEffect(() => {
//         setIsLoadingStudent(true); // Set loading true on initial fetch or ID change
//         fetchStudentData(); // Call on initial load or ID change
//     }, [id]); // Re-run this effect if the 'id' parameter changes

//     const menuItems = [
//         { id: 'profile', label: 'Profile Overview', icon: User, component: StudentProfile },
//         { id: 'academic', label: 'Academic Management', icon: BookOpen, component: StudentAcademic },
//         { id: 'fees', label: 'Fees Management', icon: DollarSign, component: FeesManagement },
//         { id: 'events', label: 'Events & Activities', icon: Calendar, component: EventsActivities },
//         { id: 'transport', label: 'Transport Management', icon: Bus, component: TransportManagement },
//         { id: 'history', label: 'History', icon: Clock, component: History },
//         {
//             id: 'dashboard',
//             label: 'Back to Dashboard',
//             icon: ArrowLeft,
//             action: () => navigate('/students') // Ensure this route is correct
//         },
//     ];

//     const handleLogout = () => {
//         console.log("Logout clicked");
//         // Add actual logout logic here
//     };

//     const handleMenuClick = (itemId) => {
//         const selectedItem = menuItems.find(item => item.id === itemId);

//         if (selectedItem && selectedItem.action) {
//             selectedItem.action();
//         } else if (selectedItem) { // Check if selectedItem exists before setting state
//             setActiveSection(itemId);
//             if (window.innerWidth < 1024) { // Close sidebar on mobile
//                 setIsSidebarOpen(false);
//             }
//         }
//     };

//     // --- UPDATED: Pass fetchStudentData as refreshStudentData prop ---
//     const getCurrentComponent = () => {
//         const currentItem = menuItems.find(item => item.id === activeSection);

//         // Display loading indicator while fetching
//         if (isLoadingStudent) {
//             return <div className="text-center p-10">Loading student details...</div>;
//         }

//         // Handle case where data fetching failed
//         if (!studentData && currentItem && currentItem.id !== 'profile') {
//             return <div className="text-red-500 text-center p-10">Failed to load student data. Cannot display this section.</div>;
//         }

//         // Get the component to render, default to StudentProfile
//         const Component = currentItem?.component || StudentProfile;

//         // Render the component, passing BOTH studentid, studentData object, and the refresh function
//         return <Component studentid={id} student={studentData} refreshStudentData={fetchStudentData} />;
//     };

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     // --- The JSX structure below is UNCHANGED from your original code ---
//     return (
//         <div className="min-h-screen bg-gray-50 flex flex-col"> {/* Use flex-col */}
//             {/* Header */}
//             <div className="flex flex-wrap justify-between lg:justify-end items-center gap-4 text-black bg-blue-400 gap-y-4 p-5 sticky top-0 z-10"> {/* Make header sticky */}
//                 <button
//                     onClick={toggleSidebar}
//                     className="lg:hidden text-white hover:text-gray-200 focus:outline-none focus:text-gray-200" // Removed items-start
//                     aria-label="Toggle menu"
//                 >
//                     <Menu className="w-6 h-6" />
//                 </button>
//                 <div className="flex items-center gap-4">
//                     <FontAwesomeIcon icon={faBell} className="text-lg hover:text-white cursor-pointer" aria-label="Notifications" onClick={() => console.log("Notifications clicked")}/>
//                     <FontAwesomeIcon icon={faShareNodes} className="text-lg hover:text-white cursor-pointer" aria-label="Share" onClick={() => console.log("Share clicked")}/>
//                     <FontAwesomeIcon icon={faFileExport} className="text-lg hover:text-white cursor-pointer" aria-label="Export" onClick={() => console.log("Export clicked")}/>
//                     <FontAwesomeIcon icon={faCircleUser} className="text-xl hover:text-white cursor-pointer" aria-label="Profile" onClick={() => console.log("Profile clicked")}/>
//                     <button onClick={handleLogout} className="text-red-600 hover:text-red-800 flex items-center space-x-2" aria-label="Logout">
//                         <FontAwesomeIcon icon={faRightFromBracket} className="text-lg" />
//                     </button>
//                 </div>
//             </div>

//             <div className="flex flex-1 relative overflow-hidden"> {/* Flex layout for sidebar + content */}
//                 {/* Overlay for mobile */}
//                 {isSidebarOpen && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={toggleSidebar}/>
//                 )}

//                 {/* Sidebar */}
//                 <div className={`
//                     fixed lg:static lg:translate-x-0 transition-transform duration-300 ease-in-out z-30
//                     w-80 bg-white shadow-lg h-full /* Full height within flex container */
//                     overflow-y-auto /* Allow sidebar scrolling if needed */
//                     ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//                 `}>
//                      <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white z-10"> {/* Sticky logo/close */}
//                         <div className="flex items-center space-x-3">
//                             <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center overflow-hidden">
//                                 <img src='/src/assets/logo.jpeg' alt='SSPD logo' className="object-contain h-full w-full"/>
//                             </div>
//                             <div>
//                                 <h1 className="text-2xl font-bold text-blue-400">SSPD SMS</h1>
//                             </div>
//                         </div>
//                         <div className="lg:hidden">
//                             <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Close menu">
//                                 <X className="w-6 h-6" />
//                             </button>
//                         </div>
//                     </div>

//                     {/* Menu Items */}
//                     <nav className="p-4 space-y-2">
//                         {menuItems.map((item) => {
//                             const Icon = item.icon;
//                             return (
//                                 <button
//                                     key={item.id}
//                                     onClick={() => handleMenuClick(item.id)}
//                                     className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-colors duration-200 group ${
//                                         activeSection === item.id
//                                             ? 'bg-blue-100 text-blue-600'
//                                             : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
//                                     }`}
//                                 >
//                                     <div className="flex items-center space-x-3">
//                                         <Icon className="w-5 h-5" />
//                                         <span className="font-medium">{item.label}</span>
//                                     </div>
//                                     <ChevronRight className={`w-4 h-4 transition-colors ${
//                                         activeSection === item.id
//                                             ? 'text-blue-600'
//                                             : 'text-gray-400 group-hover:text-blue-600'
//                                     }`} />
//                                 </button>
//                             );
//                         })}
//                     </nav>
//                 </div>

//                 {/* Main Content */}
//                 <div className="flex-1 p-4 lg:p-8 overflow-y-auto"> {/* Allow main content scrolling */}
//                     {getCurrentComponent()}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditStudent;





// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation } from "react-router-dom"; // 🟢 ADDED useLocation
// import axios from "axios"; 
// import {
//   User,
//   BookOpen,
//   DollarSign,
//   Calendar,
//   Bus,
//   Clock,
//   ChevronRight,
//   Menu,
//   X,
//   ArrowLeft,
// } from "lucide-react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faRightFromBracket,
//   faCircleUser,
//   faBell,
//   faShareNodes,
//   faBars,
//   faFileExport,
// } from "@fortawesome/free-solid-svg-icons";

// // Import your components
// import StudentProfile from "./Student Edit/StudentProfile";
// import StudentAcademic from "./Student Edit/StudentAcademic";
// import FeesManagement from "./Student Edit/StudentFees";
// import EventsActivities from "./Student Edit/StudentEvent";
// import TransportManagement from "./Student Edit/StudentTransport";
// import History from "./Student Edit/StudentHistory";

// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// // --- Auth Header and API Base URL ---
// const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
// // const API_BASE_URL = "http://localhost:5000/api"; // REMOVED LOCAL DEFINITION

// const EditStudent = () => {
//   const [activeSection, setActiveSection] = useState("profile");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const { id } = useParams(); // Student ID from the URL
//   const navigate = useNavigate();
//   // 🟢🟢 START OF VIEW MODE LOGIC 🟢🟢
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const isViewMode = queryParams.get('mode') === 'view';
//   // 🟢🟢 END OF VIEW MODE LOGIC 🟢🟢

//   // --- State to hold the fetched student data ---
//   const [studentData, setStudentData] = useState(null);
//   const [isLoadingStudent, setIsLoadingStudent] = useState(true); // Added loading state

//   // --- Function to fetch student data (Refactored) ---
//   const fetchStudentData = async () => {
//     if (!id) {
//       console.warn("Student ID parameter is missing.");
//       setIsLoadingStudent(false);
//       return;
//     }
//     // Don't set loading true here if called as a refresh
//     // setIsLoadingStudent(true);
//     try {
//       console.log(`Fetching student data for ID: ${id}`);
//       // FIX: Using imported API_BASE_URL
//       const response = await axios.post(
//         `${API_BASE_URL}api/student-by-id`,
//         { id: id },
//         { headers: { auth: AUTH_HEADER } }
//       );
//       console.log(
//         "<<< RAW API Response in EditStudent:",
//         JSON.stringify(response.data, null, 2)
//       );
//       if (response.status === 200) {
//         const data = response.data;
//         const studentInfo = {
//           _id: data._id,
//           name: `${data.firstname || ""} ${data.lastname || ""}`.trim(),
//           std: data.admission?.admissionstd,
//           div: data.admission?.admissiondivision,
//           transport: data.transport || {}, // Include the transport object
//           academicHistory: data.academicHistory || null, // ✅ Added this line
//         };
//         setStudentData(studentInfo);
//         console.log(
//           "Fetched student data for props (including transport & academicHistory):",
//           studentInfo
//         );
//       } else {
//         console.error("Failed to fetch student data, status:", response.status);
//         setStudentData(null);
//       }
//     } catch (error) {
//       console.error("Error fetching student data in EditStudent:", error);
//       setStudentData(null);
//     } finally {
//       if (isLoadingStudent) setIsLoadingStudent(false);
//     }
//   };

//   // --- useEffect to call fetch function on mount/ID change ---
//   useEffect(() => {
//     setIsLoadingStudent(true);
//     fetchStudentData();
//   }, [id]);

//   const menuItems = [
//     {
//       id: "profile",
//       label: "Profile Overview",
//       icon: User,
//       component: StudentProfile,
//     },
//     {
//       id: "academic",
//       label: "Academic Management",
//       icon: BookOpen,
//       component: StudentAcademic,
//     },
//     {
//       id: "fees",
//       label: "Fees Management",
//       icon: DollarSign,
//       component: FeesManagement,
//     },
//     {
//       id: "events",
//       label: "Events & Activities",
//       icon: Calendar,
//       component: EventsActivities,
//     },
//     {
//       id: "transport",
//       label: "Transport Management",
//       icon: Bus,
//       component: TransportManagement,
//     },
//     { id: "history", label: "History", icon: Clock, component: History },
//     {
//       id: "dashboard",
//       label: "Back to Dashboard",
//       icon: ArrowLeft,
//       action: () => navigate("/students"), // Ensure this route is correct
//     },
//   ];

//   const handleLogout = () => {
//     console.log("Logout clicked");
//     // Add actual logout logic here
//   };

//   const handleMenuClick = (itemId) => {
//     const selectedItem = menuItems.find((item) => item.id === itemId);
//     if (selectedItem && selectedItem.action) {
//       selectedItem.action();
//     } else if (selectedItem) {
//       setActiveSection(itemId);
//       if (window.innerWidth < 1024) {
//         setIsSidebarOpen(false);
//       }
//     }
//   };

//   // --- Passes student data and refresh function to children ---
//   const getCurrentComponent = () => {
//     const currentItem = menuItems.find((item) => item.id === activeSection);
//     if (isLoadingStudent) {
//       return <div className="text-center p-10">Loading student details...</div>;
//     }
//     if (!studentData && currentItem && currentItem.id !== "profile") {
//       return (
//         <div className="text-red-500 text-center p-10">
//           Failed to load student data. Cannot display this section.
//         </div>
//       );
//     }
//     // Default to StudentProfile if component not found in menuItems or activeSection is invalid
//     const Component = currentItem?.component || StudentProfile;
//     // Pass isViewMode to all children, along with student data and refresh function
//     return (
//       <Component
//         studentid={id}
//         student={studentData}
//         refreshStudentData={fetchStudentData}
//         isViewMode={isViewMode} // 🟢 PASSING THE VIEW MODE FLAG
//       />
//     );
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   // --- JSX Structure from your FIRST code block ---
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       {/* Using layout from your first code block */}
//       <div className="flex flex-wrap justify-end items-center gap-4 text-black bg-blue-400 gap-y-4 p-5">
//         <button
//           onClick={toggleSidebar}
//           className="lg:hidden text-white hover:text-gray-200 focus:outline-none focus:text-gray-200 items-start" // items-start from your code
//           aria-label="Toggle menu"
//         >
//           <Menu className="w-6 h-6" />
//         </button>
//         <div className="flex items-center gap-4">
//           <FontAwesomeIcon
//             icon={faBell}
//             className="text-lg hover:text-white cursor-pointer"
//             aria-label="Notifications"
//             onClick={() => console.log("Notifications clicked")}
//           />
//           <FontAwesomeIcon
//             icon={faShareNodes}
//             className="text-lg hover:text-white cursor-pointer"
//             aria-label="Share"
//             onClick={() => console.log("Share clicked")}
//           />
//           <FontAwesomeIcon
//             icon={faFileExport}
//             className="text-lg hover:text-white cursor-pointer"
//             aria-label="Export"
//             onClick={() => console.log("Export clicked")}
//           />
//           <FontAwesomeIcon
//             icon={faCircleUser}
//             className="text-xl hover:text-white cursor-pointer"
//             aria-label="Profile"
//             onClick={() => console.log("Profile clicked")}
//           />
//           <button
//             onClick={handleLogout}
//             className="text-red-600 hover:text-red-800 flex items-center space-x-2"
//             aria-label="Logout"
//           >
//             <FontAwesomeIcon icon={faRightFromBracket} className="text-lg" />
//           </button>
//         </div>
//         {/* 🟢 Display View Mode Status in Header (Optional but helpful) */}
// {/*         {isViewMode && <div className="ml-4 px-3 py-1 bg-gray-700 text-white text-xs font-semibold rounded-full">VIEW ONLY</div>} */}
//       </div>

//       {/* Layout container from your first code block */}
//       <div className="flex flex-col lg:flex-row relative">
//         {/* Mobile Overlay */}
//         {isSidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
//             onClick={() => setIsSidebarOpen(false)} // Explicitly close
//           />
//         )}

//         {/* Sidebar */}
//         {/* Using layout structure and classes from your first code block */}
//         <div
//           className={`
//                     fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-30
//                     w-80 bg-white shadow-lg h-screen lg:h-auto  /* h-auto from your first block */
//                     ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
//                 `}
//         >
//           {/* Mobile Close Button */}
//           <div className="lg:hidden absolute top-4 right-4">
//             <button
//               onClick={toggleSidebar}
//               className="text-gray-500 hover:text-gray-700 focus:outline-none"
//               aria-label="Close menu"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           {/* Sidebar Header */}
//           <div className="p-6 border-b border-gray-200">
//             {" "}
//             {/* Header div from your first block */}
//             <div className="flex items-center space-x-3">
//               <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center">
//                 {" "}
//                 {/* Logo container */}
//                 <img src="/src/assets/logo.jpeg" alt="SSPD logo" />
//               </div>
//               <div>
//                 {" "}
//                 {/* Title container */}
//                 <h1 className="text-2xl font-bold text-blue-400">SSPD SMS</h1>
//               </div>
//             </div>
//           </div>

//           {/* Menu Items */}
//           <nav className="p-4 space-y-2">
//             {" "}
//             {/* Nav structure from your first block */}
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <button
//                   key={item.id}
//                   onClick={() => handleMenuClick(item.id)}
//                   className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-colors duration-200 group ${
//                     activeSection === item.id
//                       ? "bg-blue-100 text-blue-600"
//                       : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
//                   }`}
//                 >
//                   <div className="flex items-center space-x-3">
//                     <Icon className="w-5 h-5" />
//                     <span className="font-medium">{item.label}</span>
//                   </div>
//                   <ChevronRight
//                     className={`w-4 h-4 transition-colors ${
//                       activeSection === item.id
//                         ? "text-blue-600"
//                         : "text-gray-400 group-hover:text-blue-600"
//                     }`}
//                   />
//                 </button>
//               );
//             })}
//           </nav>
//         </div>

//         {/* Main Content */}
//         {/* Using layout structure from your first block */}
//         <div className="flex-1 p-4 lg:p-8">{getCurrentComponent()}</div>
//       </div>
//     </div>
//   );
// };

// export default EditStudent;





















import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { Menu, X, ChevronRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faCircleUser,
  faBell,
  faShareNodes,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";

// Import your sub-components
import StudentProfile from "./Student Edit/StudentProfile";
import StudentAcademic from "./Student Edit/StudentAcademic";
import FeesManagement from "./Student Edit/StudentFees";
import EventsActivities from "./Student Edit/StudentEvent";
import TransportManagement from "./Student Edit/StudentTransport";
import History from "./Student Edit/StudentHistory";

// --- Configuration and Links ---
import { API_BASE_URL } from '../config'; 
import {editStudentLinks} from "../components/SidebarLinks";

const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

const EditStudent = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // View mode logic
  const queryParams = new URLSearchParams(location.search);
  const isViewMode = queryParams.get('mode') === 'view';

  // State
  const [studentData, setStudentData] = useState(null);
  const [isLoadingStudent, setIsLoadingStudent] = useState(true);

  // Map IDs from sidebarLinks.jsx to actual Component imports
  const componentMap = {
    profile: StudentProfile,
    academic: StudentAcademic,
    fees: FeesManagement,
    events: EventsActivities,
    transport: TransportManagement,
    history: History,
  };

  const fetchStudentData = async () => {
    if (!id) {
      setIsLoadingStudent(false);
      return;
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}api/student-by-id`,
        { id: id },
        { headers: { auth: AUTH_HEADER } }
      );
      
      if (response.status === 200) {
        const data = response.data;
        setStudentData({
          _id: data._id,
          name: `${data.firstname || ""} ${data.lastname || ""}`.trim(),
          std: data.admission?.admissionstd,
          div: data.admission?.admissiondivision,
          transport: data.transport || {},
          academicHistory: data.academicHistory || null,
        });
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setIsLoadingStudent(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, [id]);

  const handleMenuClick = (item) => {
    if (item.id === "dashboard") {
      navigate("/students");
    } else {
      setActiveSection(item.id);
    }
    
    // Close sidebar on mobile after click
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const getCurrentComponent = () => {
    if (isLoadingStudent) {
      return <div className="text-center p-10">Loading student details...</div>;
    }
    
    const Component = componentMap[activeSection] || StudentProfile;
    
    return (
      <Component
        studentid={id}
        student={studentData}
        refreshStudentData={fetchStudentData}
        isViewMode={isViewMode}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-end items-center gap-4 text-black bg-blue-400 p-5">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden text-white mr-auto focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-4">
          <FontAwesomeIcon icon={faBell} className="text-lg hover:text-white cursor-pointer" />
          <FontAwesomeIcon icon={faShareNodes} className="text-lg hover:text-white cursor-pointer" />
          <FontAwesomeIcon icon={faFileExport} className="text-lg hover:text-white cursor-pointer" />
          <FontAwesomeIcon icon={faCircleUser} className="text-xl hover:text-white cursor-pointer" />
          <button className="text-red-600 hover:text-red-800">
            <FontAwesomeIcon icon={faRightFromBracket} className="text-lg" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row relative">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
            fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-30
            w-80 bg-white shadow-lg h-screen lg:h-auto
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center overflow-hidden">
                <img src="/src/assets/logo.jpeg" alt="Logo" className="object-cover" />
              </div>
              <h1 className="text-2xl font-bold text-blue-400">SSPD SMS</h1>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="p-4 space-y-2">
            {editStudentLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 group ${
                  activeSection === item.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <FontAwesomeIcon 
                    icon={item.icon} 
                    className={`w-5 h-5 ${activeSection === item.id ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600"}`} 
                  />
                  <span className="font-medium">{item.text}</span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-colors ${
                    activeSection === item.id
                      ? "text-blue-600"
                      : "text-gray-300 group-hover:text-blue-600"
                  }`}
                />
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 lg:p-8">
          {getCurrentComponent()}
        </div>
      </div>
    </div>
  );
};

export default EditStudent;