import React from "react";
import MainLayout from "../layout/MainLayout";

const leaveData = [
  {
    id: 1,
    subject: "Subject",
    body: "Body",
    date: "Date",
    day: "Day",
    status: "Accepted",
  },
  {
    id: 2,
    subject: "Subject",
    body: "Body",
    date: "Date",
    day: "Day",
    status: "Rejected",
  },
  {
    id: 3,
    subject: "Subject",
    body: "Body",
    date: "Date",
    day: "Day",
    status: "Accepted",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Accepted":
      return "text-[#417BA0]";
    case "Rejected":
      return "text-red-600";
    default:
      return "text-gray-500";
  }
};

const MyLeaveRequest = () => {
  return (
    <MainLayout>
         <div className="bg-white rounded-2xl shadow p-6">
      <div className="px-4 py-6  mx-auto">
        {/* Header with Apply button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Leave Request</h2>
          <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-[#336381]">
            Apply
          </button>
        </div>

        {/* Leave Cards */}
        <div className="space-y-4">
          {leaveData.map((leave) => (
            <div
              key={leave.id}
              className="flex bg-white shadow-md border border-[#417BA0] rounded"
            >
              <div className="bg-blue-500 text-white w-12 flex justify-center items-center text-lg font-semibold">
                {leave.id}
              </div>
              <div className="flex-1 p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-[#417BA0]">{leave.subject}</h3>
                  <span className={`font-semibold ${getStatusColor(leave.status)}`}>
                    {leave.status}
                  </span>
                </div>
                <p className="text-sm">{leave.body}</p>
                <p className="text-sm text-gray-600">{leave.date} | {leave.day}</p>
                <div className="text-right mt-1">
                  <button className="text-black hover:underline text-sm">Read More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </MainLayout>
  );
};

export default MyLeaveRequest;
