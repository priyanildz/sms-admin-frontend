import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config";

// Helper function to strip the staff ID from old, saved database values for display
const cleanStaffName = (managedByValue) => {
  if (!managedByValue) return "";
  const match = managedByValue.match(/(.+?)\s+\(STF\d+\)$/);
  if (match && match[1]) {
    return match[1].trim();
  }
  return managedByValue;
};

// Helper to safely extract names from data that may or may not be populated
const getParticipantNames = (participants) => {
  if (!participants || !Array.isArray(participants)) return [];

  return participants
    .map((p) => {
      // Check if the item is an object (Mongoose populated data)
      if (typeof p === "object" && p !== null && p.firstname) {
        return `${p.firstname} ${p.lastname || ""}`.trim();
      }
      // Fallback: Return the ID string
      return p;
    })
    .filter((name) => name.length > 0);
};

const EventManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [staffList, setStaffList] = useState([]);

  // Function to fetch all events (Needed to refresh the list after delete)
  const fetchEventData = async () => {
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await axios.get(`${API_BASE_URL}api/events`, {
        headers: {
          auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          username: storedUsername,
          role: storedRole,
        },
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

    const fetchStaffData = async () => {
      try {
        const storedUsername =
          localStorage.getItem("username") || "System_User";
        const storedRole = localStorage.getItem("role") || "admin";
        const response = await axios.get(`${API_BASE_URL}api/staff`, {
          headers: {
            auth: AUTH_HEADER,
            username: storedUsername,
            role: storedRole,
          },
        });

        // 💡 FIX 1: Ensure staff names are clean here for the dropdown options in EditEvents
        const formattedStaff = response.data.map((staff) => ({
          staffid: staff.staffid,
          name: `${staff.firstname} ${staff.middlename} ${staff.lastname}`.trim(),
        }));
        setStaffList(formattedStaff);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };

    fetchEventData();
    fetchStaffData();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.eventname.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleAddEvent = async () => {
    navigate("/events-add", { state: { staffList } });
  };

  // Navigates to the Edit Page, passing the full event object
  const handleEdit = (event) => {
    navigate(`/events-edit/${event._id}`, {
      state: {
        event: event,
        staffList: staffList, // Pass staff data needed for the dropdown
      },
    });
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="bg-white rounded-2xl shadow-md p-8 space-y-8">
          {/* Search bar and Add button */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-300 w-full sm:w-96 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type="text"
                placeholder="Search Events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 pr-2"
              />
              <FaSearch className="text-gray-400 ml-2 mr-3" />
            </div>

            <button
              className="flex items-center bg-blue-600 text-white font-medium py-2 px-5 rounded-full shadow-md hover:bg-blue-700 transition-all duration-150"
              onClick={handleAddEvent}
            >
              + Add
            </button>
          </div>

          {/* Event List Title */}
          <div className="text-xl font-bold text-center text-gray-700">
            Event List
          </div>

          {/* Event Cards - Increased width by changing grid-cols to 1 (full width) */}
          <div className="grid grid-cols-1 gap-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition-all bg-white-100"
                >
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      {/* Title and Managed By on the same line */}
                      <div className="flex justify-between items-start mb-1">
                        <div className="text-lg font-semibold text-gray-800">
                          {event.eventname}
                        </div>
                        <div className="text-xs text-gray-600 font-medium whitespace-nowrap pt-1">
                          Managed by{" "}
                          <span className="text-blue-600">
                            {cleanStaffName(event.managedby)}
                          </span>
                        </div>
                      </div>

                      {/* Event Date */}
                      <div className="text-sm text-gray-500 mb-4">
                        Event Date: {new Date(event.date).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Action Buttons at the bottom */}
                    <div className="flex justify-end items-center border-t pt-4 space-x-3">
                      {/* 💡 EDIT BUTTON */}
                      <button
                        className="text-yellow-600 hover:underline text-sm font-medium"
                        onClick={() => handleEdit(event)}
                      >
                        Edit
                      </button>

                      {/* View Details Button */}
                      <button
                        className="text-blue-600 hover:underline text-sm font-medium"
                        onClick={() =>
                          navigate("/events-view", {
                            state: {
                              event: {
                                name: event.eventname,
                                date: event.date,
                                manager: cleanStaffName(event.managedby),
                                standard: event.standard,
                                division: event.division,
                                participants: event.participants || [],
                                participantNames: getParticipantNames(
                                  event.participants,
                                ),
                              },
                            },
                          })
                        }
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 col-span-2">
                No events found.
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventManagement;
