import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";

const ProfileScreen = () => {
  const [admin, setAdmin] = useState({
    name: "",
    dob: "",
    email: "",
    contactNo: "",
    username: "",
  });

  useEffect(() => {
    const storedData = localStorage.getItem("adminData");
    if (storedData) {
      setAdmin(JSON.parse(storedData));
    }
  }, []);

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6 mx-4 sm:mx-6 md:mx-10 lg:mx-20 xl:mx-40">
        <div className="flex flex-col items-center py-8 px-4 sm:px-6 md:px-10">
          {/* Profile Card */}
          <div className="bg-white w-full max-w-xl border border-[#417BA0] rounded-b-md shadow p-6 sm:p-10 flex flex-col items-center">
            {/* Small Profile Icon */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover mb-6"
            />

            {/* Input Fields */}
            <div className="w-full space-y-4">
              {[
                { label: "Name", value: admin.name || "" },
                { label: "DOB", value: admin.dob || "" },
                { label: "E-mail", value: admin.email || "" },
                { label: "Contact no.", value: admin.contactNo || "" },
                { label: "User Name", value: admin.username || "" },
              ].map((field, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center"
                >
                  <label className="w-full sm:w-32 font-medium mb-1 sm:mb-0">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={field.value}
                    disabled
                    className="flex-1 border border-blue-300 rounded-full px-4 py-2 shadow-sm bg-gray-100 cursor-not-allowed focus:outline-none"
                  />
                </div>
              ))}
            </div>

            {/* Logout Button */}
            <button
              className="mt-8 text-red-600 font-semibold hover:underline"
              onClick={() => {
                localStorage.removeItem("authToken");
                localStorage.removeItem("adminData");
                window.location.href = "/";
              }}
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
