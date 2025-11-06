import React from "react";
import MainLayout from "../layout/MainLayout";

const notifications = [
  {
    id: 1,
    text: "Student John Doe (Standard 10) has been successfully enrolled",
  },
  {
    id: 2,
    text: "Leave request submitted by Mr. Roy (April 18–20) – Pending approval.",
  },
  {
    id: 3,
    text: "New exam timetable published for Standard 8 to 12",
  },
];

const NotificationScreen = () => {
  return (
    <MainLayout>
         <div className="bg-white rounded-2xl shadow p-6">
      <div className="p-6">
        <div className="bg-[#417BA0] text-white text-center py-3 text-xl font-semibold rounded-t-md">
          Notification
        </div>
        <div className="bg-white shadow-md rounded-b-md border border-[#417BA0] p-0">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center border-b last:border-none border-[#417BA0] p-4 hover:bg-gray-50"
            >
              <div className="w-12 h-12 bg-[#417BA0] rounded-full mr-4 flex-shrink-0" />
              <div className="text-black text-sm sm:text-base">
                {notification.text}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </MainLayout>
  );
};

export default NotificationScreen;
