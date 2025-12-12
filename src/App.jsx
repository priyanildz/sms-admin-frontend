// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
// import Dashboard from "./pages/Dashboard";
// import StaffManagement from "./pages/StaffManagement";
// import StaffRegistration from "./pages/StaffRegistration";
// import StaffLeaveRequest from "./pages/StaffLeaveRequest";
// import RolesAndPermissions from "./pages/RolesAndPermissions";
// import StudentManagement from "./pages/StudentManagement";
// import StaffAttendancePage from "./pages/StaffAttendance";
// import StaffTimetable from "./pages/StaffTimetable";
// import ClassAssign from "./pages/ClassAssign";
// import AcademicAttendance from "./pages/AcademicAttendance";
// import AcademicSyllabus from "./pages/AcademicSyllabus";
// import AcademicSubject from "./pages/AcademicSubject";
// import AcademicBlock from "./pages/AcademicBlock";
// import AcademicProxy from "./pages/AcademicProxy";
// import AcademicTimetable from "./pages/AcademicTimetable";
// import ClassroomManagement from "./pages/ClassroomManagement";
// import ClassTimeTable from "./pages/ClassTimeTable";
// import SyllabusTracker from "./pages/SyllabusTracker";
// import ExamResults from "./pages/ExamResults";
// import ClassAttendance from "./pages/ClassAttendance";
// import ClassAssessment from "./pages/ClassAssessment";
// import ClassViewAssessment from "./pages/ClassViewAssessment";
// import ClassTestResults from "./pages/ClassTestResults";
// import ViewTestResults from "./pages/ViewTestResults";
// import TransportVehicle from "./pages/TransportVehicle";
// import TransportStaff from "./pages/TransportStaff";
// import TransportRoutes from "./pages/TransportRoutes";
// import TransportTracking from "./pages/TransportTracking";
// import AnnouncementPage from "./pages/Announcement";
// import FeesDashboard from "./pages/FeesDashboard";
// import InstallmentManagement from "./pages/InstallmentManagement";
// import FeesCollection from "./pages/FeesCollection";
// import PaymentEntry from "./pages/PaymentEntry";
// import FeesStructureSetup from "./pages/FeesStructureSetup";
// import NotificationScreen from "./pages/NotificationScreen";
// import ExportScreen from "./pages/ExportScreen";
// import ProfileScreen from "./pages/ProfileScreen";
// import MyLeaveRequest from "./pages/MyLeaveRequest";
// import MyAttendance from "./pages/MyAttendance";
// import StudentAdmission from "./pages/StudentAdmission";

// import EventManagement from "./pages/EventManagement";
// import AddEvents from "./pages/AddEvents";
// import ViewEvent from "./pages/ViewEvent";
// import ExamManagement from "./pages/ExamManagement";
// import CreateTimetable from "./pages/CreateTimetable";
// import ExamQuestionPaper from "./pages/ExamQuestionPaper";
// import ExamQuestionPaperSets from "./pages/ExamQuestionPaperSets";
// import ExamAssignBlocks from "./pages/ExamAssignBlocks";
// import ExamAddAssignBlocks from "./pages/ExamAddAssignBlocks";
// import ExamSupervisorAllotment from "./pages/ExamSupervisorAllotment";
// import ExamAddSupervisors from "./pages/ExamAddSupervisors";
// import ExamPaperEval from "./pages/ExamPaperEval";
// import ExamAddPaperEval from "./pages/ExamAddPaperEval";
// import ExamPaperRecheck from "./pages/ExamPaperRecheck";
// import ExamAddPaperRecheck from "./pages/ExamAddPaperRecheck";
// import ReportCard from "./pages/ReportCard";
// import PromoteStudent from "./pages/PromoteStudent";
// import AddAnnouncement from "./components/AddAnnouncement"
// import EditStaff from "./pages/EditStaff";
// import EditStudent from "./pages/EditStudent";
// import AddSupervisor from "./pages/AddSupervisor";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/dashboard" element={<Dashboard /> } />
//         <Route path="/staff" element={<StaffManagement />} />
//         <Route path="/staff-registration" element={<StaffRegistration />} />
//         <Route path="/staff-leave" element={<StaffLeaveRequest />} />
//         <Route path="/staff-roles-permissions" element={<RolesAndPermissions />} />
//         <Route path="/staff-attendance" element={<StaffAttendancePage />} />
//         <Route path="/staff-timetable" element={<StaffTimetable />} />


//         {/* New Route for Class Assign */}
//         <Route path="/staff-class-assign" element={<ClassAssign />} /> 
        
//         <Route path="/staff-registration" element={<StaffRegistration />} />



//         <Route path="/students" element={<StudentManagement />} />
//         <Route path="/classes" element={<ClassroomManagement />} />
//         <Route path="/classes-timetable" element={<ClassTimeTable />} />
//         <Route path="/classes-syllabus-tracker" element={<SyllabusTracker />} />
//         <Route path="/classes-exam-results" element={<ExamResults />} />
//         <Route path="/classes-attendance" element={<ClassAttendance />} />
//         <Route path="/classes-assessment" element={<ClassAssessment />} />
//         <Route path="/classes-assessment-view" element={<ClassViewAssessment />} />
//         <Route path="/classes-test-results" element={<ClassTestResults />} />
//         <Route path="/classes-test-result-details/:id" element={<ViewTestResults />} />
//         <Route path="/academics" element={<AcademicAttendance />} />
//         <Route path="/academics-syllabus" element={<AcademicSyllabus />} />
//         <Route path="/academics-subject-allotment" element={<AcademicSubject />} />
//         <Route path="/academics-timetable-creation" element={<AcademicTimetable />} />
//         <Route path="/academics-proxy-management" element={<AcademicProxy />} />
//         <Route path="/academics-block-allotment" element={<AcademicBlock />} />
//         <Route path="/transport" element={<TransportVehicle />} />
//         <Route path="/transport-staff" element={<TransportStaff />} />
//         <Route path="/transport-routes" element={<TransportRoutes />} />
//         <Route path="/transport-gps-tracking" element={<TransportTracking />} />
//         <Route path="/announcements" element={<AnnouncementPage />} />
//         <Route path="/add-announcement" element={<AddAnnouncement/>}/>
//         <Route path="/fees" element={<FeesDashboard />} />
//         <Route path="/fees-installments" element={<InstallmentManagement />} />
//         <Route path="/fees-collection" element={<FeesCollection />} />
//         <Route path="/fees-payment-entry" element={<PaymentEntry />} />
//         <Route path="/fees-structure" element={<FeesStructureSetup />} />
//         <Route path="/notifications" element={<NotificationScreen />} />
//         <Route path="/export" element={<ExportScreen />} />
//         <Route path="/profile" element={<ProfileScreen />} />
//         <Route path="/profile-leave-request" element={<MyLeaveRequest />} />
//         <Route path="/profile-attendance" element={<MyAttendance />} />
//         <Route path="/students-admission" element={<StudentAdmission />} />
      
//         <Route path="/events" element={<EventManagement />} />
//         <Route path="/events-add" element={<AddEvents />} />
//         <Route path="/events-view" element={<ViewEvent />} />
//         <Route path="/exams" element={<ExamManagement />} />
//         <Route path="/exams-create-timetable" element={<CreateTimetable />} />
//         <Route path="/exams-question-paper" element={<ExamQuestionPaper />} />
//         <Route path="/exams-question-paper-sets" element={<ExamQuestionPaperSets />} />
//         <Route path="/exams-assign-blocks" element={<ExamAssignBlocks />} />
//         <Route path="/exams-add-assign-blocks" element={<ExamAddAssignBlocks />} />
//         <Route path="/exams-supervisor-allotment" element={<ExamSupervisorAllotment />} />
//         <Route path="/exams-add-supervisors" element={<ExamAddSupervisors />} />
//         <Route path="/exams-paper-eval" element={<ExamPaperEval />} />
//         <Route path="/exams-assign-papers" element={<ExamAddPaperEval />} />
//         <Route path="/exams-paper-recheck" element={<ExamPaperRecheck />} />
//         <Route path="/exams-assign-recheck" element={<ExamAddPaperRecheck />} />
//         <Route path="/exams-report-card" element={<ReportCard />} />
//         <Route path="/exams-promote-students" element={<PromoteStudent />} />
//         <Route path="/edit-staff/:id" element={<EditStaff />} />
//         <Route path="/students/edit-student/:id" element={<EditStudent/>}/>
//         <Route path="/add-supervisor" element={<AddSupervisor />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;








import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import StaffManagement from "./pages/StaffManagement";
import StaffRegistration from "./pages/StaffRegistration";
import StaffLeaveRequest from "./pages/StaffLeaveRequest";
import RolesAndPermissions from "./pages/RolesAndPermissions";
import StudentManagement from "./pages/StudentManagement";
import StaffAttendancePage from "./pages/StaffAttendance";
import StaffTimetable from "./pages/StaffTimetable";
import ClassAssign from "./pages/ClassAssign";
import AcademicAttendance from "./pages/AcademicAttendance";
import AcademicSyllabus from "./pages/AcademicSyllabus";
import AcademicSubject from "./pages/AcademicSubject";
import AcademicBlock from "./pages/AcademicBlock";
import AcademicProxy from "./pages/AcademicProxy";
import AcademicTimetable from "./pages/AcademicTimetable";
import ClassroomManagement from "./pages/ClassroomManagement";
import ClassTimeTable from "./pages/ClassTimeTable";
import SyllabusTracker from "./pages/SyllabusTracker";
import ExamResults from "./pages/ExamResults";
import ClassAttendance from "./pages/ClassAttendance";
import ClassAssessment from "./pages/ClassAssessment";
// Assuming you kept the filename as ClassViewAssessment but it contains the new logic
import ClassViewAssessment from "./pages/ClassViewAssessment"; 
import ClassTestResults from "./pages/ClassTestResults";
import ViewTestResults from "./pages/ViewTestResults";
import TransportVehicle from "./pages/TransportVehicle";
import TransportStaff from "./pages/TransportStaff";
import TransportRoutes from "./pages/TransportRoutes";
import TransportTracking from "./pages/TransportTracking";
import AnnouncementPage from "./pages/Announcement";
import FeesDashboard from "./pages/FeesDashboard";
import InstallmentManagement from "./pages/InstallmentManagement";
import FeesCollection from "./pages/FeesCollection";
import PaymentEntry from "./pages/PaymentEntry";
import FeesStructureSetup from "./pages/FeesStructureSetup";
import NotificationScreen from "./pages/NotificationScreen";
import ExportScreen from "./pages/ExportScreen";
import ProfileScreen from "./pages/ProfileScreen";
import MyLeaveRequest from "./pages/MyLeaveRequest";
import MyAttendance from "./pages/MyAttendance";
import StudentAdmission from "./pages/StudentAdmission";
import EventManagement from "./pages/EventManagement";
import AddEvents from "./pages/AddEvents";
import ViewEvent from "./pages/ViewEvent";
import EditEvents from "./pages/EditEvents";
import ExamManagement from "./pages/ExamManagement";
import CreateTimetable from "./pages/CreateTimetable";
import ExamQuestionPaper from "./pages/ExamQuestionPaper";
import ExamQuestionPaperSets from "./pages/ExamQuestionPaperSets";
import ExamAssignBlocks from "./pages/ExamAssignBlocks";
import ExamAddAssignBlocks from "./pages/ExamAddAssignBlocks";
import ExamSupervisorAllotment from "./pages/ExamSupervisorAllotment";
import ExamAddSupervisors from "./pages/ExamAddSupervisors";
import ExamPaperEval from "./pages/ExamPaperEval";
import ExamAddPaperEval from "./pages/ExamAddPaperEval";
import ExamPaperRecheck from "./pages/ExamPaperRecheck";
import ExamAddPaperRecheck from "./pages/ExamAddPaperRecheck";
import ReportCard from "./pages/ReportCard";
import PromoteStudent from "./pages/PromoteStudent";
import AddAnnouncement from "./components/AddAnnouncement"
import EditStaff from "./pages/EditStaff";
import EditStudent from "./pages/EditStudent";
import AddSupervisor from "./pages/AddSupervisor";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard /> } />
        <Route path="/staff" element={<StaffManagement />} />
        <Route path="/staff-registration" element={<StaffRegistration />} />
        <Route path="/staff-leave" element={<StaffLeaveRequest />} />
        <Route path="/staff-roles-permissions" element={<RolesAndPermissions />} />
        <Route path="/staff-attendance" element={<StaffAttendancePage />} />
        <Route path="/staff-timetable" element={<StaffTimetable />} />
        <Route path="/staff-class-assign" element={<ClassAssign />} /> 
        <Route path="/staff-registration" element={<StaffRegistration />} />
        <Route path="/students" element={<StudentManagement />} />
        <Route path="/classes" element={<ClassroomManagement />} />
        <Route path="/classes-timetable" element={<ClassTimeTable />} />
        <Route path="/classes-syllabus-tracker" element={<SyllabusTracker />} />
        <Route path="/classes-exam-results" element={<ExamResults />} />
        <Route path="/classes-attendance" element={<ClassAttendance />} />
        <Route path="/classes-assessment" element={<ClassAssessment />} />
        
        {/* FIX: Changed route path to match navigation call in ClassAssessment.js */}
        <Route path="/classes-assessment-detail" element={<ClassViewAssessment />} /> 
        {/* You may want to remove the old route if it's no longer used:
        <Route path="/classes-assessment-view" element={<ClassViewAssessment />} /> 
        */}
        
        <Route path="/classes-test-results" element={<ClassTestResults />} />
        <Route path="/classes-test-result-details/:id" element={<ViewTestResults />} />
        <Route path="/academics" element={<AcademicAttendance />} />
        <Route path="/academics-syllabus" element={<AcademicSyllabus />} />
        <Route path="/academics-subject-allotment" element={<AcademicSubject />} />
        <Route path="/academics-timetable-creation" element={<AcademicTimetable />} />
        <Route path="/academics-proxy-management" element={<AcademicProxy />} />
        <Route path="/academics-block-allotment" element={<AcademicBlock />} />
        <Route path="/transport" element={<TransportVehicle />} />
        <Route path="/transport-staff" element={<TransportStaff />} />
        <Route path="/transport-routes" element={<TransportRoutes />} />
        <Route path="/transport-gps-tracking" element={<TransportTracking />} />
        <Route path="/announcements" element={<AnnouncementPage />} />
        <Route path="/add-announcement" element={<AddAnnouncement/>}/>
        <Route path="/fees" element={<FeesDashboard />} />
        <Route path="/fees-installments" element={<InstallmentManagement />} />
        <Route path="/fees-collection" element={<FeesCollection />} />

        {/* FIX: Correcting the route path to match the Dashboard's search navigation */}
        <Route path="/payment-entry" element={<PaymentEntry />} />

        <Route path="/fees-payment-entry" element={<PaymentEntry />} />
        <Route path="/fees-structure" element={<FeesStructureSetup />} />
        <Route path="/notifications" element={<NotificationScreen />} />
        <Route path="/export" element={<ExportScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/profile-leave-request" element={<MyLeaveRequest />} />
        <Route path="/profile-attendance" element={<MyAttendance />} />
        <Route path="/students-admission" element={<StudentAdmission />} />
        <Route path="/events" element={<EventManagement />} />
        <Route path="/events-add" element={<AddEvents />} />
        <Route path="/events-view" element={<ViewEvent />} />
        {/* 💡 FIX: ADD THE NEW EDIT ROUTE HERE */}
    <Route path="/events-edit/:id" element={<EditEvents />} />
        <Route path="/exams" element={<ExamManagement />} />
        <Route path="/exams-create-timetable" element={<CreateTimetable />} />
        <Route path="/exams-question-paper" element={<ExamQuestionPaper />} />
        <Route path="/exams-question-paper-sets" element={<ExamQuestionPaperSets />} />
        <Route path="/exams-assign-blocks" element={<ExamAssignBlocks />} />
        <Route path="/exams-add-assign-blocks" element={<ExamAddAssignBlocks />} />
        <Route path="/exams-supervisor-allotment" element={<ExamSupervisorAllotment />} />
        <Route path="/exams-add-supervisors" element={<ExamAddSupervisors />} />
        <Route path="/exams-paper-eval" element={<ExamPaperEval />} />
        <Route path="/exams-assign-papers" element={<ExamAddPaperEval />} />
        <Route path="/exams-paper-recheck" element={<ExamPaperRecheck />} />
        <Route path="/exams-assign-recheck" element={<ExamAddPaperRecheck />} />
        <Route path="/exams-report-card" element={<ReportCard />} />
        <Route path="/exams-promote-students" element={<PromoteStudent />} />
        <Route path="/edit-staff/:id" element={<EditStaff />} />
        
        <Route path="/students/edit-student/:id" element={<EditStudent/>}/>
        <Route path="/add-supervisor" element={<AddSupervisor />} />
      </Routes>
    </Router>
  );
}

export default App;