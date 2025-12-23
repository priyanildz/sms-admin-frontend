import {
  faUserGraduate,
  faUsers,
  faChalkboardTeacher,
  faBook,
  faMoneyBillWave,
  faClipboardList,
  faCalendarAlt,
  faBullhorn,
  faBus,
  faArrowLeft,
  faUserPlus,
  faCalendarCheck,
  faUmbrellaBeach,
  faChalkboardUser,
  faClock,
  faUserShield,
  faCheckCircle,
  faClipboard,
  faBookOpen,
  faUserEdit,
  faUserClock,
  faThLarge,
  faMapMarkedAlt,
  faTachometerAlt,
  faCogs,
  faTasks,
  faMoneyCheckAlt,
  faWallet,
  faUser,
  faRedoAlt,
  faFileAlt,
  faArrowUp
} from "@fortawesome/free-solid-svg-icons";

// Main Links for Sidebar
export const mainLinks = [
  { to: "/students", icon: faUserGraduate, text: "Student Management" },
  { to: "/staff", icon: faUsers, text: "Staff Management" },
  { to: "/classes", icon: faChalkboardTeacher, text: "Classroom Management" },
  { to: "/academics", icon: faBook, text: "Academic Management" },
  { to: "/fees", icon: faMoneyBillWave, text: "Fees Management" },
  { to: "/exams", icon: faClipboardList, text: "Exam Management" },
  { to: "/events", icon: faCalendarAlt, text: "Event Management" },
  { to: "/announcements", icon: faBullhorn, text: "Announcement Management" },
  { to: "/transport", icon: faBus, text: "Transport Management" },
];

// Edit Student Links for Sidebar
export const editStudentLinks = [
  { id: "profile", text: "Profile Overview", icon: faUser },
  { id: "academic", text: "Academic Management", icon: faBookOpen },
  { id: "fees", text: "Fees Management", icon: faMoneyBillWave },
  { id: "events", text: "Events & Activities", icon: faCalendarAlt },
  { id: "transport", text: "Transport Management", icon: faBus },
  { id: "history", text: "History", icon: faClock },
  { id: "dashboard", text: "Back to Dashboard", icon: faArrowLeft, isNavigation: true },
];

// Staff Links for Sidebar
export const staffLinks = [
  { to: "/staff", text: "Staff List", icon: faUsers },
  { to: "/staff-registration", text: "Registration", icon: faUserPlus },
  { to: "/staff-attendance", text: "Attendance", icon: faCalendarCheck },
  { to: "/staff-leave", text: "Leave", icon: faUmbrellaBeach },
  { to: "/staff-timetable", text: "Timetable", icon: faClock },
  { to: "/staff-roles-permissions", text: "Role & Permission", icon: faUserShield },
  {
    to: "/staff-class-assign", 
    icon: faChalkboardUser, 
    text: "Class Assign", 
  },
];

// Link to return to the dashboard
export const backToDashboardLink = [
  { to: "/dashboard", icon: faArrowLeft, text: "Back to Dashboard" },
];

// Classroom-specific links
export const classroomLinks = [
  { to: "/classes", text: "Student List", icon: faUserGraduate },
  { to: "/classes-timetable", text: "Timetable", icon: faCalendarAlt },
  { to: "/classes-assessment", text: "Assessment", icon: faBullhorn },
  { to: "/classes-attendance", text: "Attendance", icon: faCheckCircle },
  { to: "/classes-test-results", text: "Test Results", icon: faClipboardList },
  { to: "/classes-exam-results", text: "Exam Results", icon: faBook },
  { to: "/classes-syllabus-tracker", text: "Syllabus Tracker", icon: faClipboard },
];

// Academic Links
export const academicLinks = [
  { to: "/academics", text: "Attendance", icon: faClipboardList },
  { to: "/academics-syllabus", text: "Syllabus", icon: faBookOpen },
  { to: "/academics-subject-allotment", text: "Subject Allotment", icon: faUserEdit },
  { to: "/academics-timetable-creation", text: "Timetable Creation", icon: faCalendarAlt },
  { to: "/academics-proxy-management", text: "Proxy Management", icon: faUserClock },
  // { to: "/academics-block-allotment", text: "Block Allotment", icon: faThLarge },
];

// Transport Links for Sidebar
export const transportLinks = [
  { to: "/transport", text: "Vehicle Management", icon: faBus },
  { to: "/transport-staff", text: "Drivers & Supervisors", icon: faUserShield },
  { to: "/transport-assign", text: "Vehicle Assignment", icon: faTasks },
  { to: "/transport-routes", text: "Routes & Student Assign", icon: faClipboardList },
  { to: "/transport-gps-tracking", text: "Live GPS Tracking", icon: faMapMarkedAlt },
];

// Fees Links
export const feesLinks = [
  { to: "/fees", text: "Fees Dashboard", icon: faTachometerAlt },
  { to: "/fees-structure", text: "Fees Structure Setup", icon: faCogs },
  { to: "/fees-installments", text: "Installments Management", icon: faTasks },
  { to: "/fees-payment-entry", text: "Payment Entry", icon: faMoneyCheckAlt },
  { to: "/fees-collection", text: "Collection", icon: faWallet },
];

// Profile Links
export const profileLinks = [
  { to: "/profile", text: "My Profile", icon: faUser },
  { to: "/profile-leave-request", text: "Leave Request", icon: faCalendarAlt },
  { to: "/profile-attendance", text: "Attendance", icon: faCheckCircle },
];

// Exam Links
export const examLinks = [
  { to: "/exams", text: "Exam Timetable", icon: faCalendarAlt },
  { to: "/exams-question-paper", text: "Question Papers", icon: faBookOpen },
  // { to: "/exams-assign-blocks", text: "Assign Blocks", icon: faClipboard },
  // { to: "/exams-supervisor-allotment", text: "Supervisor Allotment", icon: faTasks },
  { to: "/exams-paper-eval", text: "Paper Evaluation", icon: faCheckCircle },
  { to: "/exams-paper-recheck", text: "Recheck Requests", icon: faRedoAlt },
  { to: "/exams-report-card", text: "Report Cards", icon: faFileAlt },
  { to: "/exams-promote-students", text: "Promote Students", icon: faArrowUp },
];
