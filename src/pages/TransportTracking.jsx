import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";

const dummyData = [
  { route: "Route 1", from: "Stop A", to: "Stop B", vehicle: "MH12AB1234" },
  { route: "Route 2", from: "Stop C", to: "Stop D", vehicle: "MH14XY5678" },
  { route: "Route 3", from: "Stop E", to: "Stop F", vehicle: "MH13QW1122" },
  { route: "Route 4", from: "Stop G", to: "Stop H", vehicle: "MH15ZX3344" },
];

const TransportTracking = () => {
  const [search, setSearch] = useState("");

  const filteredData = dummyData.filter(
    (item) =>
      `${item.route} ${item.from} ${item.to} ${item.vehicle}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <MainLayout>
         <div className="bg-white rounded-2xl shadow p-6">
      <div className="p-4 space-y-6">
        {/* Search Bar - Left aligned */}
        <div className="flex justify-start">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded w-full max-w-md"
          />
        </div>

        {/* Title - Centered */}
        <div className="flex justify-center">
          <h2 className="text-2xl font-semibold">Track Vehicles</h2>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded flex items-center justify-between px-4 py-3"
            >
              {/* Left: Circle + Route Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#0E83B2] rounded-full"></div>
                <div>
                  <div className="font-semibold">{item.route}</div>
                  <div className="text-sm">
                    From: {item.from} &nbsp;&nbsp;&nbsp; To: {item.to}
                  </div>
                </div>
              </div>

              {/* Right: Vehicle No. + Track Link */}
              <div className="text-right space-y-1">
                <div className="font-medium">
                  Vehicle no:{" "}
                  <span className="font-semibold">{item.vehicle}</span>
                </div>
                <div className="text-blue-600 font-semibold cursor-pointer hover:underline">
                  Track
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

export default TransportTracking;
