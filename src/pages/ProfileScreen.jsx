// import React, { useEffect, useState } from "react";
// import MainLayout from "../layout/MainLayout";

// const ProfileScreen = () => {
//   const [admin, setAdmin] = useState({
//     name: "",
//     dob: "",
//     email: "",
//     contactNo: "",
//     username: "",
//   });

//   useEffect(() => {
//     const storedData = localStorage.getItem("adminData");
    
//     // Check if data exists AND isn't the literal string "undefined"
//     if (storedData && storedData !== "undefined") {
//       try {
//         setAdmin(JSON.parse(storedData));
//       } catch (error) {
//         console.error("Failed to parse adminData:", error);
//       }
//     }
//   }, []);

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6 mx-4 sm:mx-6 md:mx-10 lg:mx-20 xl:mx-40">
//         <div className="flex flex-col items-center py-8 px-4 sm:px-6 md:px-10">
//           {/* Profile Card */}
//           <div className="bg-white w-full max-w-xl border border-[#417BA0] rounded-b-md shadow p-6 sm:p-10 flex flex-col items-center">
//             {/* Small Profile Icon */}
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
//               alt="Profile"
//               className="w-20 h-20 rounded-full object-cover mb-6"
//             />

//             {/* Input Fields */}
//             <div className="w-full space-y-4">
//               {[
//                 { label: "Name", value: admin.name || "" },
//                 { label: "DOB", value: admin.dob || "" },
//                 { label: "E-mail", value: admin.email || "" },
//                 { label: "Contact no.", value: admin.contactNo || "" },
//                 { label: "User Name", value: admin.username || "" },
//               ].map((field, index) => (
//                 <div
//                   key={index}
//                   className="flex flex-col sm:flex-row sm:items-center"
//                 >
//                   <label className="w-full sm:w-32 font-medium mb-1 sm:mb-0">
//                     {field.label}
//                   </label>
//                   <input
//                     type="text"
//                     value={field.value}
//                     disabled
//                     className="flex-1 border border-blue-300 rounded-full px-4 py-2 shadow-sm bg-gray-100 cursor-not-allowed focus:outline-none"
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* Logout Button */}
//             <button
//               className="mt-8 text-red-600 font-semibold hover:underline"
//               onClick={() => {
//                 localStorage.removeItem("authToken");
//                 localStorage.removeItem("adminData");
//                 window.location.href = "/";
//               }}
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default ProfileScreen;





import React, { useEffect, useState, useCallback } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { API_BASE_URL } from "../config";

const ProfileScreen = () => {
  const [admin, setAdmin] = useState({
    name: "",
    dob: "",
    email: "",
    contactNo: "",
    username: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfileData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Get the username stored during login
      const storedUsername = localStorage.getItem("username"); 

      if (!storedUsername) {
        setError("No user found. Please login again.");
        setLoading(false);
        return;
      }

      // 2. Fetch using the exact auth header from your router/announcement logic
      const res = await axios.get(`${API_BASE_URL}api/get-profile`, {
        params: { username: storedUsername }, 
        headers: { 
          auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" 
        },
      });

      if (res.data) {
        setAdmin(res.data);
      }
    } catch (err) {
      console.error("Profile Fetch Error:", err);
      // If the backend returns 404, it means the route isn't added yet
      if (err.response?.status === 404) {
        setError("Profile API endpoint not found (404). Check backend routes.");
      } else {
        setError("Failed to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("adminData");
    localStorage.removeItem("username"); // Clear username on logout
    window.location.href = "/";
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6 mx-4 sm:mx-6 md:mx-10 lg:mx-20 xl:mx-40">
        <div className="flex flex-col items-center py-8 px-4 sm:px-6 md:px-10">
          
          <div className="bg-white w-full max-w-xl border border-[#417BA0] rounded-b-md shadow p-6 sm:p-10 flex flex-col items-center">
            
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover mb-6"
            />

            {loading ? (
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-blue-500">Loading profile...</p>
              </div>
            ) : error ? (
              <div className="text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <button 
                  onClick={fetchProfileData}
                  className="bg-blue-600 text-white px-4 py-1 rounded text-sm"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="w-full space-y-4">
                {[
                  { label: "Name", value: admin.name || "Not Set" },
                  { label: "DOB", value: admin.dob || "Not Set" },
                  { label: "E-mail", value: admin.email || "Not Set" },
                  { label: "Contact no.", value: admin.contactNo || "Not Set" },
                  { label: "User Name", value: admin.username || "N/A" },
                ].map((field, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center">
                    <label className="w-full sm:w-32 font-medium mb-1 sm:mb-0 text-gray-700">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={field.value}
                      readOnly
                      className="flex-1 border border-blue-200 rounded-full px-4 py-2 shadow-sm bg-gray-50 text-gray-600 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            )}

            <button
              className="mt-8 text-red-600 font-semibold hover:underline"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfileScreen;