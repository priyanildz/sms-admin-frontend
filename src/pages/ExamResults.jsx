import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from "../config";

const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

// --- Arrays for your dropdowns ---
const stdOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const divOptions = ["A", "B", "C", "D", "E"];
const semOptions = ["1", "2"];

export default function ExamResults() {
  const [selectedStd, setSelectedStd] = useState("");
  const [selectedDiv, setSelectedDiv] = useState("");
  const [selectedSem, setSelectedSem] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state

  // Dynamic data fetching function
  const fetchResults = async () => {
    if (!selectedStd || !selectedDiv || !selectedSem) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await axios.post(
        `${API_BASE_URL}api/exam-results`,
        {
          standard: selectedStd,
          division: selectedDiv,
          semester: selectedSem,
        },
        {
          headers: {
            "Content-Type": "application/json",
            auth: AUTH_HEADER,
            username: storedUsername,
            role: storedRole,
          },
        },
      );

      // Assuming the API returns an array of student objects with scores (e.g., {name: "Alice", English: 78})
      setResults(response.data || []);
    } catch (error) {
      console.error("Error fetching exam results:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Call the dynamic fetch function whenever filters change
    fetchResults();
  }, [selectedStd, selectedDiv, selectedSem]);

  // Helper to dynamically determine subjects based on fetched data
  const getSubjects = () => {
    if (results.length === 0) return [];
    // Take the keys from the first result object, excluding metadata fields
    const firstStudent = results[0];
    return Object.keys(firstStudent).filter(
      (key) =>
        key !== "name" &&
        key !== "id" &&
        key !== "_id" &&
        key !== "total" &&
        key !== "percentage",
    );
  };

  const subjects = getSubjects();

  // RENDER LOGIC: Calculates Total and Percentage for each row
  const renderTableBody = () => {
    return results.map((student, index) => {
      const scores = subjects.map((subject) => student[subject] || 0);
      const total = scores.reduce((sum, score) => sum + score, 0);
      const maxTotal = subjects.length * 100; // Assuming 100 marks max per subject
      const percentage =
        maxTotal > 0 ? ((total / maxTotal) * 100).toFixed(2) : 0;

      return (
        <tr key={student.id || index} className="hover:bg-gray-50">
          <td className="py-2 px-4 border font-medium text-gray-800">
            {student.name}
          </td>
          {subjects.map((subject) => (
            <td key={subject} className="py-2 px-4 border">
              {student[subject] || 0}
            </td>
          ))}
          <td className="py-2 px-4 border font-semibold bg-gray-50">{total}</td>
          <td className="py-2 px-4 border font-semibold bg-blue-50">
            {percentage}%
          </td>
        </tr>
      );
    });
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Standard
              </label>
              <select
                value={selectedStd}
                onChange={(e) => setSelectedStd(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              >
                <option value="">Select</option>
                {stdOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Division
              </label>
              <select
                value={selectedDiv}
                onChange={(e) => setSelectedDiv(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              >
                <option value="">Select</option>
                {divOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Semester
              </label>
              <select
                value={selectedSem}
                onChange={(e) => setSelectedSem(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              >
                <option value="">Select</option>
                {semOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(!selectedStd || !selectedDiv || !selectedSem) && (
            <div className="text-center text-red-500 font-semibold mb-6">
              Please select both Standard, Division and Semester to proceed.
            </div>
          )}

          {loading ? (
            <div className="text-center p-8 text-blue-600">
              Loading results...
            </div>
          ) : results.length > 0 ? (
            <div className="overflow-x-auto">
              <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">
                Semester-{selectedSem} Results
              </h2>
              <table className="min-w-full border rounded-xl table-auto text-sm">
                <thead className="bg-blue-100 text-left text-gray-700">
                  <tr>
                    <th className="py-2 px-4 border">Name</th>
                    {subjects.map((subject) => (
                      <th key={subject} className="py-2 px-4 border">
                        {subject}
                      </th>
                    ))}
                    <th className="py-2 px-4 border">Total</th>
                    <th className="py-2 px-4 border">Percentage</th>
                  </tr>
                </thead>
                <tbody>{renderTableBody()}</tbody>
              </table>
            </div>
          ) : (
            selectedStd &&
            selectedDiv &&
            selectedSem && (
              <div className="text-gray-500 text-sm mt-4 text-center p-8 border rounded-xl bg-gray-50">
                No results found for Standard {selectedStd}, Division{" "}
                {selectedDiv}, Semester {selectedSem}
              </div>
            )
          )}
        </div>
      </div>
    </MainLayout>
  );
}
