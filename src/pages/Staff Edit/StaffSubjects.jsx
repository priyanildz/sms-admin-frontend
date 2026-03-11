import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from "../../config";

const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
// const API_BASE_URL = "http://localhost:5000/api"; // REMOVED LOCAL DEFINITION

export default function StaffSubjects({ staff }) {
  const staffName =
    `${staff?.firstname || ""} ${staff?.lastname || ""}`.trim() ||
    "Staff Member";
  const staffId = staff?.staffid;

  const [assignedSubjects, setAssignedSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSubjects = useCallback(async () => {
    if (!staffId) {
      setAssignedSubjects([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await axios.get(
        `${API_BASE_URL}api/staff/${staffId}/subjects`,
        {
          headers: {
            auth: AUTH_HEADER,
            username: storedUsername,
            role: storedRole,
          },
        },
      );

      // The backend now returns a flat array of {subject, standard, division}
      setAssignedSubjects(response.data || []);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      setError(errorMsg);
      setAssignedSubjects([]);
    } finally {
      setIsLoading(false);
    }
  }, [staffId]); // Fetch data whenever the staff ID changes
  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]); // Note: emptyRowCount calculation and usage has been removed.

  return (
    <div>
      <h2 className="text-2xl text-center font-semibold text-gray-800 mb-8">
        Classes & Subjects Assigned
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-2 border-blue-500">
          <thead>
            <tr className="bg-blue-100">
              <th className="border-2 border-blue-500 p-4 text-left font-semibold text-gray-800">
                Subject
              </th>

              <th className="border-2 border-blue-500 p-4 text-left font-semibold text-gray-800">
                Standard
              </th>

              <th className="border-2 border-blue-500 p-4 text-left font-semibold text-gray-800">
                Division
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan="3"
                  className="border border-blue-500 p-4 text-center text-blue-600"
                >
                  Loading assignments...
                </td>
              </tr>
            ) : error && !error.includes("Warning") ? (
              <tr>
                <td
                  colSpan="3"
                  className="border border-blue-500 p-4 text-center text-red-600"
                >
                  Error: {error}
                </td>
              </tr>
            ) : assignedSubjects.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="border border-blue-500 p-4 text-center text-gray-500"
                >
                  No subjects currently assigned.
                </td>
              </tr>
            ) : (
              // Display fetched subjects - table rows are now fully dynamic.
              assignedSubjects.map((assignment, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border border-blue-500 p-4">
                    {assignment.subject || "N/A"}
                  </td>

                  <td className="border border-blue-500 p-4">
                    {assignment.standard || "N/A"}
                  </td>

                  <td className="border border-blue-500 p-4">
                    {assignment.division || "N/A"}
                  </td>
                </tr>
              ))
            )}

            {/* Removed: Empty row generation logic */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
