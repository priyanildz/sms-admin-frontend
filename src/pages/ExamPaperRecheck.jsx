import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

const ExamPaperRecheck = () => {
  const navigate = useNavigate();
  const [rechecks, setRechecks] = useState([]);

  const AUTH_TOKEN = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
  const apiHeaders = { auth: AUTH_TOKEN };

  useEffect(() => {
    fetchRecheckData();
  }, []);

  const fetchRecheckData = () => {
    fetch(`${API_BASE_URL}api/recheck`, { headers: apiHeaders })
      .then((res) => res.json())
      .then((data) => setRechecks(data))
      .catch((err) => console.error("Error fetching rechecks:", err));
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this recheck assignment?",
      )
    )
      return;

    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await fetch(`${API_BASE_URL}api/recheck/${id}`, {
        method: "DELETE",
        headers: {
          ...apiHeaders,
          Accept: "application/json",
          username: storedUsername,
          role: storedRole,
        },
      });

      const raw = await response.text();
      let parsed = null;
      try {
        parsed = JSON.parse(raw);
      } catch (_) {}

      if (response.ok) {
        alert("Recheck assignment deleted successfully.");
        fetchRecheckData();
      } else {
        alert(`Failed to delete assignment: ${parsed?.message || raw}`);
      }
    } catch (err) {
      alert("Error deleting recheck assignment: " + err.message);
    }
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-800">
            Exam Paper Rechecking
          </h1>
          <button
            onClick={() => navigate("/exams-assign-recheck")}
            className="bg-blue-700 text-white text-sm px-5 py-2 rounded-md hover:bg-blue-800 transition-all"
          >
            + Add
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border rounded-xl">
            <thead className="bg-blue-100 text-gray-700 text-left">
              <tr>
                <th className="py-3 px-4 border">Teacher Name</th>
                <th className="py-3 px-4 border">Standard</th>
                <th className="py-3 px-4 border">Division</th>
                <th className="py-3 px-4 border">Exam Type</th>
                <th className="py-3 px-4 border">Subject</th>
                <th className="py-3 px-4 border">No. of Papers</th>
                <th className="py-3 px-4 border">Status</th>
                <th className="py-3 px-4 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {rechecks.length > 0 ? (
                rechecks.map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-all">
                    <td className="py-2 px-4 border">
                      {entry.assignedTo
                        ? `${entry.assignedTo.firstname} ${entry.assignedTo.lastname}`
                        : "Unknown"}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {entry.standard}
                    </td>
                    <td className="py-2 px-4 border text-center">
                      {entry.division}
                    </td>
                    <td className="py-2 px-4 border">
                      {entry.examtype || "N/A"}
                    </td>
                    <td className="py-2 px-4 border">{entry.subject}</td>
                    <td className="py-2 px-4 border text-center">
                      {entry.numberOfPapers}
                    </td>
                    {/* STATUS COLUMN */}
                    <td className="py-2 px-4 border font-semibold text-center">
                      <span
                        className={
                          entry.status === "Completed"
                            ? "text-green-600"
                            : "text-amber-500"
                        }
                      >
                        {entry.status || "Pending"}
                      </span>
                    </td>
                    <td className="py-2 px-4 border text-center">
                      <button
                        onClick={() => handleDelete(entry._id)}
                        className="text-red-500 hover:text-red-700 text-xs font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-6 text-gray-500 border"
                  >
                    No paper rechecking records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  );
};

export default ExamPaperRecheck;
