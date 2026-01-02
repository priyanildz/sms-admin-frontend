// import { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import MainLayout from "../layout/MainLayout";
// import LeaveRequestCard from "../components/LeaveRequestCard";
// import axios from "axios";

// export default function StaffLeave() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [leaveRequests, setLeaveRequests] = useState([]);
//   const [filteredRequests, setFilteredRequests] = useState([]);
//   const [expandedRequestId, setExpandedRequestId] = useState(null);

//   useEffect(() => {
//     const fetchLeaveRequests = async () => {
//       try {
//         const res = await axios.get("https://sspd-school-portal.vercel.app/api/getrequests", {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         });
//         console.log("Fetched requests:", res.data);

//         const formatted = res.data.map((r) => ({
//           id: r._id,
//           firstname: r.firstname,
//           lastname: r.lastname,
//           dept: r.dept,
//           leaveDates: r.from,
//           status: r.status,
//           requestedDate: r.submitted_at,
//           subject: r.subject,
//           message: r.message || "",
//         }));

//         setLeaveRequests(formatted);
//         setFilteredRequests(formatted);
//       } catch (err) {
//         console.error("Error fetching leave requests:", err);
//       }
//     };

//     fetchLeaveRequests();
//   }, []);

//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     filterRequests(query);
//   };

//   const filterRequests = (query) => {
//     if (!query) {
//       setFilteredRequests(leaveRequests);
//     } else {
//       const filtered = leaveRequests.filter((request) => {
//         const fullName = `${request.firstname} ${request.lastname}`.toLowerCase();
//         const department = request.dept?.toLowerCase() || "";
//         const subject = request.subject?.toLowerCase() || "";
        
//         return fullName.includes(query.toLowerCase()) ||
//                department.includes(query.toLowerCase()) ||
//                subject.includes(query.toLowerCase());
//       });
//       setFilteredRequests(filtered);
//     }
//   };

//   const handleCardClick = (requestId) => {
//     console.log("Card clicked:", requestId);
//     setExpandedRequestId((prev) => (prev === requestId ? null : requestId));
//   };

//   const updateStatus = async (id, status) => {
//     console.log("🟡 updateStatus called with:", id, status); 
//     try {
//       const response = await axios.put(
//         `https://sspd-school-portal.vercel.app/api/update-req/${id}`,
//         { status },
//         {
//           headers:{
//             'auth':'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
//           }
//         }
//       );

//       console.log("✅ Status updated:", response.data);

//       setLeaveRequests((prev) =>
//         prev.map((r) => (r.id === id ? { ...r, status } : r))
//       );
//       setFilteredRequests((prev) =>
//         prev.map((r) => (r.id === id ? { ...r, status } : r))
//       );
//     } catch (err) {
//       console.error(`❌ Failed to update status to ${status}:`, err);
//     }
//   };

//   const handleAccept = (e, id) => {
//     e.stopPropagation();
//     console.log("🟢 Accept clicked", id);
//     updateStatus(id, "Approved");
//   };

//   const handleReject = (e, id) => {
//     e.stopPropagation();
//     console.log("🔴 Reject clicked", id);
//     updateStatus(id, "Rejected");
//   };

//   const handleUndo = (e, id) => {
//     e.stopPropagation();
//     updateStatus(id, "Pending");
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="flex flex-1 flex-col p-4 sm:p-6 overflow-y-auto">
//           <div className="mb-2">
//             <div className="relative w-full sm:w-72">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 placeholder="Search by name, department, or subject..."
//                 className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm"
//               />
//               <FontAwesomeIcon
//                 icon={faSearch}
//                 className="absolute top-2 right-3 text-gray-500"
//               />
//             </div>
//           </div>

//           <div className="my-4 text-center">
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//               Leave Order
//             </h2>
//           </div>

//           <div className="space-y-4">
//             {filteredRequests.length === 0 ? (
//               <p className="text-center text-sm text-gray-500">
//                 No leave requests found.
//               </p>
//             ) : (
//               filteredRequests.map((request) => (
//                 <LeaveRequestCard
//                   key={request.id}
//                   request={request}
//                   handleCardClick={handleCardClick}
//                   handleAccept={handleAccept}
//                   handleReject={handleReject}
//                   handleUndo={handleUndo}
//                   expandedRequestId={expandedRequestId}
//                 />
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// }

// import { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import MainLayout from "../layout/MainLayout";
// import LeaveRequestCard from "../components/LeaveRequestCard";
// import axios from "axios";

// // Define the base URL for your local backend API
// const LOCAL_API_BASE_URL = "http://localhost:5000/api";

// export default function StaffLeave() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [leaveRequests, setLeaveRequests] = useState([]);
//   const [filteredRequests, setFilteredRequests] = useState([]);
//   const [expandedRequestId, setExpandedRequestId] = useState(null);

//   useEffect(() => {
//     const fetchLeaveRequests = async () => {
//       try {
//         // CRITICAL FIX 1: Change from Vercel URL to local API URL
//         const res = await axios.get(`${LOCAL_API_BASE_URL}/getrequests`, {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         });
//         console.log("Fetched requests:", res.data);

//         const formatted = res.data.map((r) => ({
//           id: r._id,
//           firstname: r.firstname,
//           lastname: r.lastname,
//           dept: r.dept,
//           leaveDates: r.from,
//           status: r.status,
//           requestedDate: r.submitted_at,
//           subject: r.subject,
//           message: r.message || "",
//         }));

//         setLeaveRequests(formatted);
//         setFilteredRequests(formatted);
//       } catch (err) {
//         console.error("Error fetching leave requests:", err);
//       }
//     };

//     fetchLeaveRequests();
//   }, []);

//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     filterRequests(query);
//   };

//   const filterRequests = (query) => {
//     if (!query) {
//       setFilteredRequests(leaveRequests);
//     } else {
//       const filtered = leaveRequests.filter((request) => {
//         const fullName = `${request.firstname} ${request.lastname}`.toLowerCase();
//         const department = request.dept?.toLowerCase() || "";
//         const subject = request.subject?.toLowerCase() || "";
//         
//         return fullName.includes(query.toLowerCase()) ||
//                department.includes(query.toLowerCase()) ||
//                subject.includes(query.toLowerCase());
//       });
//       setFilteredRequests(filtered);
//     }
//   };

//   const handleCardClick = (requestId) => {
//     console.log("Card clicked:", requestId);
//     setExpandedRequestId((prev) => (prev === requestId ? null : requestId));
//   };

//   const updateStatus = async (id, status) => {
//     console.log("🟡 updateStatus called with:", id, status); 
//     try {
//       // CRITICAL FIX 2: Change from Vercel URL to local API URL
//       const response = await axios.put(
//         `${LOCAL_API_BASE_URL}/update-req/${id}`,
//         { status },
//         {
//           headers:{
//             'auth':'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
//           }
//         }
//       );

//       console.log("✅ Status updated:", response.data);

//       setLeaveRequests((prev) =>
//         prev.map((r) => (r.id === id ? { ...r, status } : r))
//       );
//       setFilteredRequests((prev) =>
//         prev.map((r) => (r.id === id ? { ...r, status } : r))
//       );
//     } catch (err) {
//       console.error(`❌ Failed to update status to ${status}:`, err);
//     }
//   };

//   const handleAccept = (e, id) => {
//     e.stopPropagation();
//     console.log("🟢 Accept clicked", id);
//     updateStatus(id, "Approved");
//   };

//   const handleReject = (e, id) => {
//     e.stopPropagation();
//     console.log("🔴 Reject clicked", id);
//     updateStatus(id, "Rejected");
//   };

//   const handleUndo = (e, id) => {
//     e.stopPropagation();
//     updateStatus(id, "Pending");
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="flex flex-1 flex-col p-4 sm:p-6 overflow-y-auto">
//           <div className="mb-2">
//             <div className="relative w-full sm:w-72">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 placeholder="Search by name, department, or subject..."
//                 className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm"
//               />
//               <FontAwesomeIcon
//                 icon={faSearch}
//                 className="absolute top-2 right-3 text-gray-500"
//               />
//             </div>
//           </div>

//           <div className="my-4 text-center">
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//               Leave Order
//               </h2>
//           </div>

//           <div className="space-y-4">
//             {filteredRequests.length === 0 ? (
//               <p className="text-center text-sm text-gray-500">
//                 No leave requests found.
//               </p>
//             ) : (
//               filteredRequests.map((request) => (
//                 <LeaveRequestCard
//                   key={request.id}
//                   request={request}
//                   handleCardClick={handleCardClick}
//                   handleAccept={handleAccept}
//                   handleReject={handleReject}
//                   handleUndo={handleUndo}
//                   expandedRequestId={expandedRequestId}
//                 />
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// }



import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MainLayout from "../layout/MainLayout";
import LeaveRequestCard from "../components/LeaveRequestCard";
import axios from "axios";
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config";

// Define the base URL for your local backend API
// const LOCAL_API_BASE_URL = "http://localhost:5000/api"; // REMOVED

export default function StaffLeave() {
  const [searchQuery, setSearchQuery] = useState("");
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [expandedRequestId, setExpandedRequestId] = useState(null);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        // FIX 1: Using imported API_BASE_URL
        const res = await axios.get(`${API_BASE_URL}api/getrequests`, {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
        });
        console.log("Fetched requests:", res.data);

        const formatted = res.data.map((r) => ({
          id: r._id,
          firstname: r.firstname,
          lastname: r.lastname,
          dept: r.dept,
          leaveDates: r.from,
          status: r.status,
          requestedDate: r.submitted_at,
          subject: r.subject,
          message: r.message || "",
        }));

        setLeaveRequests(formatted);
        setFilteredRequests(formatted);
      } catch (err) {
        console.error("Error fetching leave requests:", err);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterRequests(query);
  };

  const filterRequests = (query) => {
    if (!query) {
      setFilteredRequests(leaveRequests);
    } else {
      const filtered = leaveRequests.filter((request) => {
        const fullName = `${request.firstname} ${request.lastname}`.toLowerCase();
        const department = request.dept?.toLowerCase() || "";
        const subject = request.subject?.toLowerCase() || "";
        
        return fullName.includes(query.toLowerCase()) ||
               department.includes(query.toLowerCase()) ||
               subject.includes(query.toLowerCase());
      });
      setFilteredRequests(filtered);
    }
  };

  const handleCardClick = (requestId) => {
    console.log("Card clicked:", requestId);
    setExpandedRequestId((prev) => (prev === requestId ? null : requestId));
  };

  const updateStatus = async (id, status) => {
    console.log("🟡 updateStatus called with:", id, status); 
    try {
      // FIX 2: Using imported API_BASE_URL
      const response = await axios.put(
        `${API_BASE_URL}api/update-req/${id}`,
        { status },
        {
          headers:{
            'auth':'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
          }
        }
      );

      console.log("✅ Status updated:", response.data);

      setLeaveRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
      setFilteredRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    } catch (err) {
      console.error(`❌ Failed to update status to ${status}:`, err);
    }
  };

  const handleAccept = (e, id) => {
    e.stopPropagation();
    console.log("🟢 Accept clicked", id);
    updateStatus(id, "Approved");
  };

  const handleReject = (e, id) => {
    e.stopPropagation();
    console.log("🔴 Reject clicked", id);
    updateStatus(id, "Rejected");
  };

  const handleUndo = (e, id) => {
    e.stopPropagation();
    updateStatus(id, "Pending");
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex flex-1 flex-col p-4 sm:p-6 overflow-y-auto">
          <div className="mb-2">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by name, department, or subject..."
                className="w-80 px-3 py-2 rounded-md border border-gray-300 text-sm"
              />
{/*               <FontAwesomeIcon
                icon={faSearch}
                className="absolute top-2 left-70 text-gray-500"
              /> */}
            </div>
            </div>

          <div className="my-4 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Leave Order
              </h2>
          </div>

          <div className="space-y-4">
            {filteredRequests.length === 0 ? (
              <p className="text-center text-sm text-gray-500">
                No leave requests found.
              </p>
            ) : (
              filteredRequests.map((request) => (
                <LeaveRequestCard
                  key={request.id}
                  request={request}
                  handleCardClick={handleCardClick}
                  handleAccept={handleAccept}
                  handleReject={handleReject}
                  handleUndo={handleUndo}
                  expandedRequestId={expandedRequestId}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}