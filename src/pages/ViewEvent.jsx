// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import MainLayout from "../layout/MainLayout";

// const ViewEvent = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const event = state?.event || {
//     name: "Unknown Event",
//     date: "2025-01-01",
//     manager: "N/A",
//     standard: "N/A",
//     division: "N/A",
//     participants: [],
//   };
//   console.log(event);

//   return (
//     <MainLayout>
//       <div className="p-6">
//         <div className="bg-white rounded-3xl shadow-xl p-8 max-w-5xl mx-auto space-y-8">
//           <div className="text-center">
//             <h2 className="text-3xl font-semibold text-blue-800 mb-3">
//               Event Details
//             </h2>
//             <p className="text-base text-gray-600">
//               View the full event summary below
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 rounded-xl p-6 shadow-lg">
//             <div>
//               <h3 className="text-sm font-medium text-gray-500">Event Name</h3>
//               <p className="text-xl font-semibold text-gray-900">
//                 {event.name}
//               </p>
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-500">Date</h3>
//               <p className="text-xl font-semibold text-gray-900">
//                 {new Date(event.date).toLocaleDateString()}
//               </p>
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-500">Standard</h3>
//               <p className="text-xl font-semibold text-gray-900">
//                 {event.standard}
//               </p>
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-500">Division</h3>
//               <p className="text-xl font-semibold text-gray-900">
//                 {event.division}
//               </p>
//             </div>
//             <div className="md:col-span-2">
//               <h3 className="text-sm font-medium text-gray-500">Managed By</h3>
//               <p className="text-xl font-semibold text-gray-900">
//                 {event.manager}
//               </p>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-5">
//               👥 Participants
//             </h3>
//             <ul className="space-y-4">
//               {event.participants.length > 0 ? (
//                 event.participants.map((p, index) => (
//                   <li
//                     key={index}
//                     className="flex items-center bg-white rounded-lg border border-gray-200 pl-4 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all"
//                   >
//                     <span className="text-base font-medium text-gray-700">
//                       {p}
//                     </span>
//                   </li>
//                 ))
//               ) : (
//                 <p className="text-gray-500 italic">No participants listed</p>
//               )}
//             </ul>
//           </div>

//           <div className="flex justify-end">
//             <button
//               onClick={() => navigate(-1)}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all mt-6"
//             >
//               ← Back to Events
//             </button>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default ViewEvent;












import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
// Assuming Heroicons are installed
import { UsersIcon, CalendarIcon, UserCircleIcon, AcademicCapIcon } from '@heroicons/react/24/outline'; 

const ViewEvent = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Ensure the structure includes the participantNames array (the clean strings)
  const event = state?.event || {
    name: "Unknown Event",
    date: new Date().toISOString(),
    manager: "N/A",
    standard: "N/A",
    division: "N/A",
    participants: [], 
    participantNames: [], // This array holds the clean names (strings)
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto space-y-8 border border-gray-100">
            
          {/* Header Section: EVENT DETAILS Title */}
          <div className="text-center pb-4 border-b border-blue-100">
            <h2 className="text-3xl font-extrabold text-blue-700 mb-2">
              Event Details
            </h2>
            <p className="text-lg text-gray-500">
              View the full event summary below
            </p>
          </div>

          {/* --- Event Name and Date Panel --- */}
          <div className="bg-blue-50 p-6 rounded-xl shadow-inner border-l-4 border-blue-600 grid grid-cols-2 gap-4">
            {/* Event Name */}
            <div>
              <h3 className="text-sm font-medium text-blue-600">Event Name</h3>
              <p className="text-2xl font-bold text-blue-900">
                {event.name}
              </p>
            </div>
            
            {/* Date */}
            <div className="text-right">
              <h3 className="text-sm font-medium text-blue-600">Date</h3>
              <p className="text-2xl font-bold text-blue-900">
                {new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* --- Secondary Info Grid (Managed By, Std, Div) --- */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4">
            
            {/* 1. Managed By */}
            <div className="flex flex-col space-y-1">
              <div className="flex items-center text-sm font-medium text-gray-500">
                <UserCircleIcon className="w-5 h-5 mr-2 text-green-500" />
                Managed By
              </div>
              <p className="text-xl font-semibold text-gray-900">
                {event.manager}
              </p>
            </div>

            {/* 2. Standard */}
            <div className="flex flex-col space-y-1">
              <div className="flex items-center text-sm font-medium text-gray-500">
                <AcademicCapIcon className="w-5 h-5 mr-2 text-red-500" />
                Standard
              </div>
              <p className="text-xl font-semibold text-gray-900">
                {event.standard}
              </p>
            </div>

            {/* 3. Division */}
            <div className="flex flex-col space-y-1">
              <div className="flex items-center text-sm font-medium text-gray-500">
                <UsersIcon className="w-5 h-5 mr-2 text-yellow-500" />
                Division
              </div>
              <p className="text-xl font-semibold text-gray-900">
                {event.division}
              </p>
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* --- Participants Section (Matching the desired list look) --- */}
          <div className="p-4 pt-0">
            <h3 className="flex items-center text-2xl font-semibold text-gray-700 mb-4">
              <UsersIcon className="w-6 h-6 mr-3 text-blue-600" />
              Participants ({event.participantNames.length})
            </h3>

            <div className="space-y-3">
              {event.participantNames.length > 0 ? (
                event.participantNames.map((name, index) => (
                  <li
                    key={index}
                    className="list-none flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-center">
                      {/* Blue circle placeholder */}
                      <div className="w-6 h-6 rounded-full bg-blue-500 mr-3 flex-shrink-0"></div>
                      <span className="text-base font-medium text-gray-800">{name}</span>
                    </div>
                    {/* Arrow placeholder */}
                    <span className="text-blue-500 text-xl font-bold ml-2">›</span>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 italic">No participants listed for this event.</p>
              )}
            </div>
          </div>

          {/* --- Back Button --- */}
          <div className="flex justify-end pt-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all font-medium"
            >
              ← Back to Events
            </button>
          </div>
        </div>
        
      </div>
    </MainLayout>
  );
};

export default ViewEvent;