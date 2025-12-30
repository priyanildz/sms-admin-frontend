// import React from "react";
// import MainLayout from "../layout/MainLayout";

// const leaveData = [
//   {
//     id: 1,
//     subject: "Subject",
//     body: "Body",
//     date: "Date",
//     day: "Day",
//     status: "Accepted",
//   },
//   {
//     id: 2,
//     subject: "Subject",
//     body: "Body",
//     date: "Date",
//     day: "Day",
//     status: "Rejected",
//   },
//   {
//     id: 3,
//     subject: "Subject",
//     body: "Body",
//     date: "Date",
//     day: "Day",
//     status: "Accepted",
//   },
// ];

// const getStatusColor = (status) => {
//   switch (status) {
//     case "Accepted":
//       return "text-[#417BA0]";
//     case "Rejected":
//       return "text-red-600";
//     default:
//       return "text-gray-500";
//   }
// };

// const MyLeaveRequest = () => {
//   return (
//     <MainLayout>
//          <div className="bg-white rounded-2xl shadow p-6">
//       <div className="px-4 py-6  mx-auto">
//         {/* Header with Apply button */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold">Leave Request</h2>
//           <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-[#336381]">
//             Apply
//           </button>
//         </div>

//         {/* Leave Cards */}
//         <div className="space-y-4">
//           {leaveData.map((leave) => (
//             <div
//               key={leave.id}
//               className="flex bg-white shadow-md border border-[#417BA0] rounded"
//             >
//               <div className="bg-blue-500 text-white w-12 flex justify-center items-center text-lg font-semibold">
//                 {leave.id}
//               </div>
//               <div className="flex-1 p-4">
//                 <div className="flex justify-between items-center">
//                   <h3 className="font-bold text-[#417BA0]">{leave.subject}</h3>
//                   <span className={`font-semibold ${getStatusColor(leave.status)}`}>
//                     {leave.status}
//                   </span>
//                 </div>
//                 <p className="text-sm">{leave.body}</p>
//                 <p className="text-sm text-gray-600">{leave.date} | {leave.day}</p>
//                 <div className="text-right mt-1">
//                   <button className="text-black hover:underline text-sm">Read More</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default MyLeaveRequest;







import React, { useState, useEffect, useCallback } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { API_BASE_URL } from "../config";

const MyLeaveRequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state to track button status
  const [formData, setFormData] = useState({
    subject: "",
    body: "",
    date: new Date().toISOString().substring(0, 10),
  });

  const fetchMyLeaves = useCallback(async () => {
    console.log("Fetching leaves for user...");
    try {
      setLoading(true);
      const storedUsername = localStorage.getItem("username"); 
      
      const res = await axios.get(`${API_BASE_URL}api/admin-getleaves`, {
        params: { username: storedUsername },
        headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" }
      });

      console.log("Leaves fetched successfully:", res.data);
      setLeaveRequests(res.data.reverse()); 
    } catch (err) {
      console.error("Failed to fetch leaves:", err.response || err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyLeaves();
  }, [fetchMyLeaves]);

  // 2. Handle Application Submission with detailed logging
  const handleApply = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked.");
    
    const storedUsername = localStorage.getItem("username");
    console.log("Current Username from localStorage:", storedUsername);

    if (!storedUsername) {
      console.error("Error: No username found in localStorage.");
      alert("Session expired. Please log in again.");
      return;
    }

    const payload = {
      ...formData,
      username: storedUsername
    };

    console.log("Sending Payload to Backend:", payload);
    console.log("Target URL:", `${API_BASE_URL}api/admin-addleave`);

    try {
      setIsSubmitting(true);
      const res = await axios.post(`${API_BASE_URL}api/admin-addleave`, payload, {
        headers: { 
          "Content-Type": "application/json",
          auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" 
        }
      });

      console.log("Server Response Status:", res.status);
      console.log("Server Response Data:", res.data);

      if (res.status === 200 || res.status === 201) {
        console.log("Leave application successful.");
        setIsModalOpen(false);
        fetchMyLeaves(); 
      }
    } catch (err) {
      console.error("POST Request Failed!");
      if (err.response) {
        // The server responded with a status code outside the range of 2xx
        console.error("Server Error Status:", err.response.status);
        console.error("Server Error Data:", err.response.data);
        alert(`Server Error: ${err.response.data.error || "Internal Server Error"}`);
      } else if (err.request) {
        // The request was made but no response was received
        console.error("No response received from server. Check if backend is running.");
        alert("Network error: Could not reach the server.");
      } else {
        console.error("Request Setup Error:", err.message);
      }
    } finally {
      setIsSubmitting(false);
      console.log("Submission process finished.");
    }
  };

  const getStatusColor = (status) => {
    if (status?.toLowerCase() === "accepted") return "text-green-600";
    if (status?.toLowerCase() === "rejected") return "text-red-600";
    return "text-amber-500"; 
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="px-4 py-6 mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">My Leave Requests</h2>
            <button 
              onClick={() => {
                console.log("Opening Apply Modal");
                setIsModalOpen(true);
              }}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              Apply
            </button>
          </div>

          {loading ? (
            <p className="text-center py-10">Loading requests...</p>
          ) : (
            <div className="space-y-4">
              {leaveRequests.length > 0 ? (
                leaveRequests.map((leave, index) => (
                  <div key={leave._id || index} className="flex bg-white shadow-md border border-[#417BA0] rounded">
                    <div className="bg-blue-500 text-white w-12 flex justify-center items-center font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-[#417BA0]">{leave.subject}</h3>
                        <span className={`font-semibold ${getStatusColor(leave.status)}`}>
                          {leave.status || "Pending"}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{leave.body}</p>
                      <p className="text-xs text-gray-500 mt-2">Requested Date: {leave.date}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No leave requests found.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(50, 50, 50, 0.5)' }}>
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Apply for Leave</h3>
            <form onSubmit={handleApply} className="space-y-4">
              <input 
                type="text" 
                placeholder="Subject" 
                className="w-full border p-2 rounded"
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                required
              />
              <textarea 
                placeholder="Reason for leave..." 
                className="w-full border p-2 rounded h-32"
                onChange={(e) => setFormData({...formData, body: e.target.value})}
                required
              />
              <input 
                type="date" 
                className="w-full border p-2 rounded"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
              <div className="flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 text-gray-600"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={`bg-blue-500 text-white px-4 py-2 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default MyLeaveRequest;