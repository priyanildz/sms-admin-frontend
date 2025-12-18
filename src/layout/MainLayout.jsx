// import { useState, useEffect } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import {
//   backToDashboardLink,
//   mainLinks,
//   staffLinks,
//   classroomLinks,
//   academicLinks,
//   transportLinks,
//   feesLinks,
//   profileLinks,
//   examLinks
// } from "../components/SidebarLinks";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import logo from "../assets/logo.jpeg";
// import {
//   faRightFromBracket,
//   faCircleUser,
//   faBell,
//   faShareNodes,
//   faBars,
//   faChevronRight,
//   faXmark,
//   faFileExport,
// } from "@fortawesome/free-solid-svg-icons";

// export default function MainLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [currentRoute, setCurrentRoute] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     setCurrentRoute(location.pathname);
//   }, [location]);

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     navigate("/");
//   };

//   const getSidebarLinks = () => {
//     if (currentRoute.startsWith("/staff")) {
//       return staffLinks; // Return staff section links
//     }
//     if (currentRoute.startsWith("/classes")) {
//       return classroomLinks; // Return classroom section links
//     }
//     if (currentRoute.startsWith("/academics")) {
//       return academicLinks; // Return academic section links
//     }
//     if (currentRoute.startsWith("/transport")) {
//       return transportLinks; // 
//     }
//     if (currentRoute.startsWith("/fees")) {
//       return feesLinks;
//     }
//     if (currentRoute.startsWith("/notifications")) {
//       return mainLinks; // Return academic section links
//     }
//     if (currentRoute.startsWith("/export")) {
//       return mainLinks;
//     }
//     if (currentRoute.startsWith("/profile")) {
//       return profileLinks;
//     }
    
//     if (currentRoute.startsWith("/add-supervisor")) {
//       return transportLinks;
//     }

//     if (currentRoute.startsWith("/exams")) {
//       return examLinks; // Return main links for exams
//     }
//     return mainLinks; // Default to main links if it's neither
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       {/* Full-width Top Header */}
//       <header className="bg-blue-400 shadow p-4 flex flex-wrap justify-between items-center gap-y-4 w-full z-50">
//         <div className="flex items-center space-x-4">
//           {!sidebarOpen && (
//             <div className="md:hidden">
//               <FontAwesomeIcon
//                 icon={faBars}
//                 className="text-2xl text-gray-700 cursor-pointer"
//                 onClick={() => setSidebarOpen(true)}
//                 aria-label="Open Sidebar"
//               />
//             </div>
//           )}
//         </div>
//         <div className="flex flex-wrap items-center gap-4 text-black">
//           <FontAwesomeIcon
//             icon={faBell}
//             className="text-lg hover:text-white cursor-pointer"
//             aria-label="Notifications"
//             onClick={() => navigate("/notifications")}
//           />

//           <FontAwesomeIcon
//             icon={faShareNodes}
//             className="text-lg hover:text-white cursor-pointer"
//             aria-label="Share"
//             onClick={() => navigate("/share")}
//           />

//           <FontAwesomeIcon
//             icon={faFileExport}
//             className="text-lg hover:text-white cursor-pointer"
//             aria-label="Export"
//             onClick={() => navigate("/export")}
//           />

//           <FontAwesomeIcon
//             icon={faCircleUser}
//             className="text-xl hover:text-white cursor-pointer"
//             aria-label="Profile"
//             onClick={() => navigate("/profile")}
//           />

//           <button
//             onClick={handleLogout}
//             className="text-red-600 hover:text-red-800 flex items-center space-x-2"
//             aria-label="Logout"
//           >
//             <FontAwesomeIcon icon={faRightFromBracket} className="text-lg" />
//           </button>
//         </div>
//       </header>

//       {/* Main layout: sidebar and content */}
//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <aside
//           className={`bg-white text-black p-6 z-40 transition-transform duration-300 transform
//           w-64 md:w-80 space-y-8 flex flex-col overflow-y-auto
//           fixed md:relative md:translate-x-0 h-full md:h-auto
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
//         >
//           {/* Mobile Header */}
//           <div className="flex justify-between items-center md:hidden">
//             <Link to="/dashboard" className="flex items-center space-x-3">
//               <img src={logo} alt="Logo" className="h-12 w-12 rounded-full" />
//               <h2 className="text-xl font-bold text-blue-400">SSPD SMS</h2>
//             </Link>
//             <FontAwesomeIcon
//               icon={faXmark}
//               className="text-2xl text-gray-600 hover:text-red-500 cursor-pointer"
//               onClick={() => setSidebarOpen(false)}
//               aria-label="Close Sidebar"
//             />
//           </div>

//           {/* Desktop Header */}
//           <div className="hidden md:flex items-center space-x-3 mb-4">
//             <Link to="/dashboard" className="flex items-center space-x-3">
//               <img src={logo} alt="Logo" className="h-14 w-14 rounded-full" />
//               <h2 className="text-2xl md:text-3xl text-blue-400 font-bold">
//                 SSPD SMS
//               </h2>
//             </Link>
//           </div>

//           {/* Sidebar Links */}
//           <nav className="space-y-4 flex-1">
//             {getSidebarLinks().map((link, index) => (
//               <SidebarLink
//                 key={index}
//                 to={link.to}
//                 icon={link.icon}
//                 text={link.text}
//                 isActive={currentRoute === link.to}
//               />
//             ))}

//             {currentRoute !== "/dashboard" &&
//               backToDashboardLink.map(({ to, icon, text }, index) => (
//                 <SidebarLink
//                   key={index}
//                   to={to}
//                   icon={icon}
//                   text={text}
//                   showChevron={false}
//                 />
//               ))}
//           </nav>
//         </aside>

//         {/* Page Content */}
//         <main className="flex-1 p-6 overflow-y-auto mt-4 md:mt-0">
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-base sm:text-lg md:text-2xl font-bold text-gray-800">
//               {getPageTitle(currentRoute)}
//             </h1>
//             <span className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-200 shadow-sm">
//               AY: 2024–2025
//             </span>
//           </div>
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

// // Sidebar Link Component
// function SidebarLink({ to, icon, text, isActive, showChevron = true }) {
//   return (
//     <Link
//       to={to}
//       className={`flex items-center justify-between hover:bg-blue-200 p-3 rounded-md transition-colors border-b border-gray-300 ${isActive ? "bg-blue-100" : ""
//         }`}
//     >
//       <div className="flex items-center space-x-3 w-full">
//         {icon && (
//           <FontAwesomeIcon icon={icon} className="text-xl flex-shrink-0" />
//         )}
//         <span className="text-sm md:text-base font-light w-full">{text}</span>
//       </div>
//       {showChevron && (
//         <FontAwesomeIcon
//           icon={faChevronRight}
//           className="text-sm text-blue-400 flex-shrink-0 ml-2"
//         />
//       )}
//     </Link>
//   );
// }

// // Page Title Getter
// function getPageTitle(route) {
//   if (route.startsWith("/staff")) return "Staff Management";
//   if (route.startsWith("/classes")) return "Classroom Management";
//   if (route.startsWith("/students")) return "Student Management";
//   if (route.startsWith("/academics")) return "Academic Management";
//   if (route.startsWith("/fees")) return "Fees Management";
//   if (route.startsWith("/exams")) return "Exam Management";
//   if (route.startsWith("/events")) return "Event Management";
//   if (route.startsWith("/announcements")) return "Announcement Management";
//   if (route.startsWith("/transport")) return "Transport Management";
//   if (route.startsWith("/dashboard")) return "Dashboard"; // Default case for dashboard
//   if (route.startsWith("/notifications")) return "Notification";
//   if (route.startsWith("/export")) return "Export";
//   if (route.startsWith("/profile")) return "My Profile";
//   // return "Unknown Page"; // Fallback for unknown routes

  
//   return "Unknown Page"; // Fallback for unknown routes

// }



























import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  backToDashboardLink,
  mainLinks,
  staffLinks,
  classroomLinks,
  academicLinks,
  transportLinks,
  feesLinks,
  profileLinks,
  examLinks
} from "../components/SidebarLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/logo.jpeg";
import {
  faRightFromBracket,
  faCircleUser,
  faBell,
  faShareNodes,
  faBars,
  faChevronRight,
  faXmark,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const getSidebarLinks = () => {
    if (currentRoute.startsWith("/staff")) return staffLinks;
    if (currentRoute.startsWith("/classes")) return classroomLinks;
    if (currentRoute.startsWith("/academics")) return academicLinks;
    if (currentRoute.startsWith("/transport")) return transportLinks;
    if (currentRoute.startsWith("/fees")) return feesLinks;
    if (currentRoute.startsWith("/notifications")) return mainLinks;
    if (currentRoute.startsWith("/export")) return mainLinks;
    if (currentRoute.startsWith("/profile")) return profileLinks;
    if (currentRoute.startsWith("/add-supervisor")) return transportLinks;
    if (currentRoute.startsWith("/exams")) return examLinks;
    return mainLinks;
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
      {/* Full-width Top Header */}
      <header className="bg-blue-400 shadow p-4 flex flex-wrap justify-between items-center gap-y-4 w-full z-50 flex-shrink-0">
        <div className="flex items-center space-x-4">
          {!sidebarOpen && (
            <div className="md:hidden">
              <FontAwesomeIcon
                icon={faBars}
                className="text-2xl text-gray-700 cursor-pointer"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open Sidebar"
              />
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-black">
          <FontAwesomeIcon
            icon={faBell}
            className="text-lg hover:text-white cursor-pointer"
            aria-label="Notifications"
            onClick={() => navigate("/notifications")}
          />
          <FontAwesomeIcon
            icon={faShareNodes}
            className="text-lg hover:text-white cursor-pointer"
            aria-label="Share"
            onClick={() => navigate("/share")}
          />
          <FontAwesomeIcon
            icon={faFileExport}
            className="text-lg hover:text-white cursor-pointer"
            aria-label="Export"
            onClick={() => navigate("/export")}
          />
          <FontAwesomeIcon
            icon={faCircleUser}
            className="text-xl hover:text-white cursor-pointer"
            aria-label="Profile"
            onClick={() => navigate("/profile")}
          />
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 flex items-center space-x-2"
            aria-label="Logout"
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="text-lg" />
          </button>
        </div>
      </header>

      {/* Main layout: sidebar and content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-white text-black p-6 z-40 transition-transform duration-300 transform
          w-64 md:w-80 space-y-8 flex flex-col overflow-y-auto
          fixed md:relative md:translate-x-0 h-full
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
          style={{ 
            msOverflowStyle: 'none', 
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* Internal CSS to hide scrollbar specifically for this aside */}
          <style>{`
            aside::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {/* Mobile Header */}
          <div className="flex justify-between items-center md:hidden">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <img src={logo} alt="Logo" className="h-12 w-12 rounded-full" />
              <h2 className="text-xl font-bold text-blue-400">SSPD SMS</h2>
            </Link>
            <FontAwesomeIcon
              icon={faXmark}
              className="text-2xl text-gray-600 hover:text-red-500 cursor-pointer"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close Sidebar"
            />
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex items-center space-x-3 mb-4">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <img src={logo} alt="Logo" className="h-14 w-14 rounded-full" />
              <h2 className="text-2xl md:text-3xl text-blue-400 font-bold">
                SSPD SMS
              </h2>
            </Link>
          </div>

          {/* Sidebar Links */}
          <nav className="space-y-4 flex-1">
            {getSidebarLinks().map((link, index) => (
              <SidebarLink
                key={index}
                to={link.to}
                icon={link.icon}
                text={link.text}
                isActive={currentRoute === link.to}
              />
            ))}

            {currentRoute !== "/dashboard" &&
              backToDashboardLink.map(({ to, icon, text }, index) => (
                <SidebarLink
                  key={index}
                  to={to}
                  icon={icon}
                  text={text}
                  showChevron={false}
                />
              ))}
          </nav>
        </aside>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto mt-4 md:mt-0">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-base sm:text-lg md:text-2xl font-bold text-gray-800">
              {getPageTitle(currentRoute)}
            </h1>
            <span className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-200 shadow-sm">
              AY: 2024–2025
            </span>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ to, icon, text, isActive, showChevron = true }) {
  return (
    <Link
      to={to}
      className={`flex items-center justify-between hover:bg-blue-200 p-3 rounded-md transition-colors border-b border-gray-300 ${
        isActive ? "bg-blue-100" : ""
      }`}
    >
      <div className="flex items-center space-x-3 w-full">
        {icon && (
          <FontAwesomeIcon icon={icon} className="text-xl flex-shrink-0" />
        )}
        <span className="text-sm md:text-base font-light w-full">{text}</span>
      </div>
      {showChevron && (
        <FontAwesomeIcon
          icon={faChevronRight}
          className="text-sm text-blue-400 flex-shrink-0 ml-2"
        />
      )}
    </Link>
  );
}

function getPageTitle(route) {
  if (route.startsWith("/staff")) return "Staff Management";
  if (route.startsWith("/classes")) return "Classroom Management";
  if (route.startsWith("/students")) return "Student Management";
  if (route.startsWith("/academics")) return "Academic Management";
  if (route.startsWith("/fees")) return "Fees Management";
  if (route.startsWith("/exams")) return "Exam Management";
  if (route.startsWith("/events")) return "Event Management";
  if (route.startsWith("/announcements")) return "Announcement Management";
  if (route.startsWith("/transport")) return "Transport Management";
  if (route.startsWith("/dashboard")) return "Dashboard";
  if (route.startsWith("/notifications")) return "Notification";
  if (route.startsWith("/export")) return "Export";
  if (route.startsWith("/profile")) return "My Profile";
  
  return "Unknown Page";
}