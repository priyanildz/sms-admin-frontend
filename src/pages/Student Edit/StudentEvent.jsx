import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";

const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return dateString;
  }
};

export default function EventsActivities({ student }) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await axios.get(`${API_BASE_URL}api/events`, {
        headers: {
          auth: AUTH_HEADER,
          username: storedUsername,
          role: storedRole,
        },
      });

      // --- FILTERING LOGIC START ---
      // Only show events where the current student's ID is in the participants array
      if (student && student._id) {
        const filteredEvents = response.data.filter((event) => {
          // Check if participants array exists and includes the student's ID
          // We check against both the object (if populated) and the string ID
          return (
            event.participants &&
            event.participants.some((p) =>
              typeof p === "string" ? p === student._id : p._id === student._id,
            )
          );
        });
        setEvents(filteredEvents);
      } else {
        setEvents([]); // If no student context, show nothing
      }
      // --- FILTERING LOGIC END ---
    } catch (error) {
      console.error("Error fetching events data:", error);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [student]); // Added student as a dependency

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-center mt-8 mb-8 text-gray-800">
          Events & Activities
        </h1>

        <div className="bg-white border-2 border-blue-500 overflow-hidden overflow-x-auto">
          <table className="w-full min-w-96">
            <thead>
              <tr>
                <th className="border-2 border-blue-500 px-2 sm:px-4 py-3 bg-white text-left font-semibold text-gray-800 text-sm sm:text-base">
                  Date
                </th>
                <th className="border-2 border-blue-500 px-2 sm:px-4 py-3 bg-white text-left font-semibold text-gray-800 text-sm sm:text-base">
                  Event Name
                </th>
                <th className="border-2 border-blue-500 px-2 sm:px-4 py-3 bg-white text-left font-semibold text-gray-800 text-sm sm:text-base">
                  Certificate
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan="3"
                    className="border-2 border-blue-500 px-4 py-6 bg-white text-center text-gray-500"
                  >
                    Loading events...
                  </td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="border-2 border-blue-500 px-4 py-6 bg-white text-center text-gray-500"
                  >
                    No events found for this student.
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr key={event._id}>
                    <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 bg-white text-sm sm:text-base">
                      {formatDate(event.date)}
                    </td>
                    <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 bg-white text-sm sm:text-base">
                      {event.eventname || event.name || "Unknown Event"}
                    </td>
                    <td className="border-2 border-blue-500 px-2 sm:px-4 py-4 bg-white text-sm sm:text-base">
                      {event.certificate ? "Issued" : "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
