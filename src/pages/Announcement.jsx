import React, { useState, useEffect, useCallback } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config";

const tabs = ["Inbox", "Draft", "Sent"];

const AnnouncementPage = () => {
  const [activeTab, setActiveTab] = useState("Inbox");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  // States for editing logic
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    priority: "1",
    visibility: "all",
    department: "",
    schedule: new Date().toISOString().substring(0, 10),
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnnouncements = useCallback(async () => {
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const res = await axios.get(`${API_BASE_URL}api/get-announcement`, {
        headers: {
          auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          username: storedUsername,
          role: storedRole,
        },
      });
      setAnnouncements(res.data.reverse());
    } catch (err) {
      console.error("Failed to fetch announcements:", err);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const filteredData = announcements.filter((item) => {
    const searchFilter =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase()) ||
      item.department?.toLowerCase().includes(search.toLowerCase());

    let tabFilter = false;
    switch (activeTab) {
      case "Inbox":
        tabFilter = item.status === "sent" && item.visibility === "admin";
        break;
      case "Draft":
        tabFilter = item.status === "draft";
        break;
      case "Sent":
        tabFilter = item.status === "sent" && item.visibility !== "admin";
        break;
      default:
        tabFilter = false;
    }
    return tabFilter && searchFilter;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = () => "";

  const getDateLabel = (status, visibility) => {
    if (status === "draft") return "Scheduled";
    if (visibility === "admin") return "Received";
    return "Sent";
  };

  const handleAddAnnouncementClick = () => {
    setIsEditing(false);
    setFormData({
      title: "",
      priority: "1",
      visibility: "all",
      department: "",
      schedule: new Date().toISOString().substring(0, 10),
      description: "",
    });
    setError(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditingId(item._id);
    setFormData({
      title: item.title,
      priority: item.priority,
      visibility: item.visibility,
      department: item.department,
      schedule: item.schedule
        ? item.schedule.substring(0, 10)
        : new Date().toISOString().substring(0, 10),
      description: item.description,
    });
    setError(null);
    setIsModalOpen(true);
  };

  const handleReadMore = (item) => {
    setSelectedAnnouncement(item);
  };

  const handleBackToList = () => {
    setSelectedAnnouncement(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSend = async () => {
    setError(null);
    setIsSubmitting(true);

    if (!formData.title || !formData.description) {
      setError("Subject and Announcement Details are required.");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      ...formData,
      department: formData.department || "General",
    };

    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      let response;
      const headers = {
        headers: {
          auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          username: storedUsername,
          role: storedRole,
        },
      };

      if (isEditing) {
        response = await axios.put(
          `${API_BASE_URL}api/modify-announcement/${editingId}`,
          payload,
          headers,
        );
      } else {
        response = await axios.post(
          `${API_BASE_URL}api/add-announcement`,
          payload,
          headers,
        );
      }

      if (response.status === 200) {
        fetchAnnouncements();
        handleModalClose();
      }
    } catch (err) {
      let specificError = "Failed to submit announcement.";
      if (err.response && err.response.data && err.response.data.error) {
        specificError = err.response.data.error;
      }
      setError(specificError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDraftSend = async (item) => {
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await axios.put(
        `${API_BASE_URL}api/modify-announcement/${item._id}`,
        { status: "sent" },
        {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
            username: storedUsername,
            role: storedRole,
          },
        },
      );
      if (response.status === 200) {
        fetchAnnouncements();
      }
    } catch (error) {
      console.error("Error sending draft:", error);
    }
  };

  const isListView = !selectedAnnouncement;
  const isReadView = !!selectedAnnouncement;

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow mx-2 sm:mx-4 lg:mx-6">
        <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
            {isListView && (
              <div className="relative flex-1 sm:max-w-xs lg:max-w-md">
                <input
                  type="text"
                  placeholder="Search announcements..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border px-3 sm:px-4 py-2 rounded w-full text-sm sm:text-base pr-10"
                />
              </div>
            )}
            {isReadView && (
              <button
                onClick={handleBackToList}
                className="flex items-center text-blue-600 hover:underline text-sm sm:text-base"
              >
                <span className="mr-2">←</span> Back to List
              </button>
            )}
            {isListView && (
              <button
                onClick={handleAddAnnouncementClick}
                className="bg-blue-600 text-white px-4 sm:px-5 py-2 rounded-full hover:bg-blue-700 text-sm sm:text-base whitespace-nowrap flex-shrink-0"
              >
                + Add
              </button>
            )}
          </div>

          {isListView && (
            <>
              <div className="flex bg-gray-100 rounded overflow-x-auto">
                {tabs.map((tab) => {
                  let count;
                  if (tab === "Inbox")
                    count = announcements.filter(
                      (item) =>
                        item.status === "sent" && item.visibility === "admin",
                    ).length;
                  else if (tab === "Draft")
                    count = announcements.filter(
                      (item) => item.status === "draft",
                    ).length;
                  else if (tab === "Sent")
                    count = announcements.filter(
                      (item) =>
                        item.status === "sent" && item.visibility !== "admin",
                    ).length;

                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 min-w-max px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition whitespace-nowrap ${activeTab === tab ? "bg-white shadow text-black" : "text-gray-600 hover:bg-gray-200"}`}
                    >
                      {tab} <span className="ml-1">({count || 0})</span>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-3 sm:space-y-4">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white shadow rounded p-3 sm:p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#0E83B2] rounded-full flex items-center justify-center text-white font-bold">
                            {item.priority}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-sm lg:text-lg truncate">
                              {item.title}
                            </div>
                            <div className="text-xs lg:text-sm text-gray-500 truncate">
                              {item.description.substring(0, 50)}...
                            </div>
                          </div>
                        </div>

                        <div className="text-right space-y-1 min-w-[150px] flex-shrink-0">
                          <div className="text-gray-500 font-semibold text-xs lg:text-sm">
                            {formatDate(item.schedule)}
                          </div>
                          <div className="flex gap-2 justify-end">
                            {/* 🟡 Colored Edit Button for Drafts */}
                            {item.status === "draft" && (
                              <button
                                onClick={() => handleEdit(item)}
                                className="bg-amber-500 text-white px-3 py-1 rounded-lg text-xs lg:text-sm hover:bg-amber-600"
                              >
                                Edit
                              </button>
                            )}
                            {item.status === "draft" && (
                              <button
                                onClick={() => handleDraftSend(item)}
                                className="bg-blue-400 text-white px-3 py-1 rounded-lg text-xs lg:text-sm"
                              >
                                Send
                              </button>
                            )}
                            <button
                              onClick={() => handleReadMore(item)}
                              className="text-blue-600 text-xs lg:text-sm hover:underline"
                            >
                              Read More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
                    No announcements found
                  </div>
                )}
              </div>
            </>
          )}

          {isReadView && (
            <div className="bg-white p-4 sm:p-6 rounded shadow space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#0E83B2] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {selectedAnnouncement.priority}
                </div>
                <div>
                  <div className="font-bold text-lg sm:text-xl">
                    Subject: {selectedAnnouncement.title}
                  </div>
                  <div className="text-gray-500 capitalize">
                    {selectedAnnouncement.department} Department
                  </div>
                </div>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-700 mb-3">
                  Announcement Content:
                </h3>
                <p className="whitespace-pre-wrap mb-6 text-sm">
                  {selectedAnnouncement.description}
                </p>
                <div className="text-sm">
                  <span className="font-semibold text-gray-600">
                    {getDateLabel(
                      selectedAnnouncement.status,
                      selectedAnnouncement.visibility,
                    )}{" "}
                    Date:{" "}
                  </span>
                  {formatDate(selectedAnnouncement.schedule)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl mx-4">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Announcements {isEditing ? "Edit" : "Creation"}
              </h3>
              <button
                onClick={handleModalClose}
                className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Priority Level
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  >
                    <option value="1">1 (High)</option>
                    <option value="2">2 (Medium)</option>
                    <option value="3">3 (Low)</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Visibility Options
                  </label>
                  <select
                    name="visibility"
                    value={formData.visibility}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  >
                    <option value="all">All</option>
                    <option value="students">Students</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-600 block mb-1">
                    Schedule Date
                  </label>
                  <input
                    type="date"
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 block mb-1">
                  Announcement Details
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows="6"
                  className="w-full border border-gray-300 p-2 rounded-md resize-none"
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            <div className="flex justify-end pt-3">
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Saving..."
                  : isEditing
                    ? "Update & Save"
                    : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default AnnouncementPage;
