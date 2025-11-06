import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

const ViewEvent = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const event = state?.event || {
    name: "Unknown Event",
    date: "2025-01-01",
    manager: "N/A",
    standard: "N/A",
    division: "N/A",
    participants: [],
  };
  console.log(event);

  return (
    <MainLayout>
      <div className="p-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-5xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-blue-800 mb-3">
              Event Details
            </h2>
            <p className="text-base text-gray-600">
              View the full event summary below
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 rounded-xl p-6 shadow-lg">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Event Name</h3>
              <p className="text-xl font-semibold text-gray-900">
                {event.name}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Date</h3>
              <p className="text-xl font-semibold text-gray-900">
                {new Date(event.date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Standard</h3>
              <p className="text-xl font-semibold text-gray-900">
                {event.standard}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Division</h3>
              <p className="text-xl font-semibold text-gray-900">
                {event.division}
              </p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium text-gray-500">Managed By</h3>
              <p className="text-xl font-semibold text-gray-900">
                {event.manager}
              </p>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-5">
              👥 Participants
            </h3>
            <ul className="space-y-4">
              {event.participants.length > 0 ? (
                event.participants.map((p, index) => (
                  <li
                    key={index}
                    className="flex items-center bg-white rounded-lg border border-gray-200 pl-4 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all"
                  >
                    <span className="text-base font-medium text-gray-700">
                      {p}
                    </span>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 italic">No participants listed</p>
              )}
            </ul>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all mt-6"
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
