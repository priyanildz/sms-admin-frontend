import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import SelectField from "../components/SelectField";
import { API_BASE_URL } from "../config";
import { FaCalendarAlt } from "react-icons/fa";

const getDayDate = (dayName, year) => {
  const referenceDate = new Date(`11/24/${year}`);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const dayIndex = days.indexOf(dayName);

  if (dayIndex !== -1) {
    const date = new Date(referenceDate);
    date.setDate(referenceDate.getDate() + dayIndex);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
  }
  return "";
};

const ClassTimeTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [timetableData, setTimetableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Selection States initialized to "Select" as per image_0e44fe.png
  const [selectedStandard, setSelectedStandard] = useState("Select");
  const [selectedDivision, setSelectedDivision] = useState("Select");

  const [classTeacherName, setClassTeacherName] = useState("");
  const [currentTimetable, setCurrentTimetable] = useState(null);

  const stdOptions = [
    "Select",
    "Nursery",
    "Junior",
    "Senior",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];
  const divOptions = ["Select", "A", "B", "C", "D", "E"];
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const AUTH_TOKEN = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

  const fetchTimetableData = async () => {
    setLoading(true);
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await fetch(`${API_BASE_URL}api/timetables`, {
        headers: {
          auth: AUTH_TOKEN,
          username: storedUsername,
          role: storedRole,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setTimetableData(data);
    } catch (err) {
      console.error("Error fetching timetable:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetableData();
  }, []);

  // Effect to update the view when Std or Div changes
  useEffect(() => {
    if (selectedStandard !== "Select" && selectedDivision !== "Select") {
      const foundTT = timetableData.find(
        (tt) =>
          tt.standard === selectedStandard && tt.division === selectedDivision,
      );

      if (foundTT) {
        setCurrentTimetable(foundTT);
        fetchTeacherName(selectedStandard, selectedDivision);
      } else {
        setCurrentTimetable(null);
        setClassTeacherName("No Timetable Found");
      }
    } else {
      setCurrentTimetable(null);
    }
  }, [selectedStandard, selectedDivision, timetableData]);

  const fetchTeacherName = async (std, div) => {
    setClassTeacherName("Loading...");
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await fetch(
        `${API_BASE_URL}api/class-teacher/${std}/${div}`,
        {
          headers: {
            auth: AUTH_TOKEN,
            username: storedUsername,
            role: storedRole,
          },
        },
      );
      const teacherData = await response.json();
      setClassTeacherName(teacherData.name || "N/A");
    } catch (err) {
      setClassTeacherName("Error fetching name");
    }
  };

  const formatTimetableForDisplay = (timetable) => {
    if (!timetable || !timetable.timetable) return [];
    const timeSlots = new Set();
    timetable.timetable.forEach((day) => {
      day.periods.forEach((period) => {
        timeSlots.add(period.time);
      });
    });
    const sortedTimeSlots = Array.from(timeSlots).sort();
    return sortedTimeSlots.map((timeSlot) => {
      const row = { time: timeSlot };
      weekdays.forEach((dayName) => {
        const dayData = timetable.timetable.find((d) => d.day === dayName);
        const period = dayData?.periods.find((p) => p.time === timeSlot);
        row[dayName] = period?.subject || "-";
      });
      return row;
    });
  };

  const displayRows = currentTimetable
    ? formatTimetableForDisplay(currentTimetable)
    : [];

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="p-6 space-y-6">
          {/* 1. Selection Row as per image_0e44e0.png */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Standard
              </label>
              <select
                value={selectedStandard}
                onChange={(e) => setSelectedStandard(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {stdOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Division
              </label>
              <select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {divOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 2. Validation Message as per image_0e44e0.png */}
          {(selectedStandard === "Select" || selectedDivision === "Select") && (
            <div className="text-center py-4">
              <p className="text-red-500 font-medium">
                Please select both Standard and Division to proceed.
              </p>
            </div>
          )}

          {/* 3. Conditional Content (Teacher Box & Table) as per image_0e44da.png */}
          {selectedStandard !== "Select" && selectedDivision !== "Select" && (
            <>
              {/* Class Teacher Box */}
              <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-4 bg-white shadow-sm mb-6 max-w-400">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a7 7 0 00-7 7v1h12v-1a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Class Teacher</p>
                  <p className="font-bold text-gray-800">{classTeacherName}</p>
                </div>
              </div>

              {/* Timetable Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-blue-50">
                    <tr>
                      <th className="px-4 py-3 border border-gray-300 text-left font-bold text-gray-700">
                        Time
                      </th>
                      {weekdays.map((day) => (
                        <th
                          key={day}
                          className="px-4 py-3 border border-gray-300 text-left font-bold text-gray-700"
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {displayRows.map((row, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 border border-gray-300 font-medium text-gray-600">
                          {row.time}
                        </td>
                        {weekdays.map((day) => (
                          <td
                            key={day}
                            className="px-4 py-3 border border-gray-300 text-gray-800"
                          >
                            {row[day]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ClassTimeTable;
