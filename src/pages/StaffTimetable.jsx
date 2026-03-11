import React, { useState, useEffect, useMemo } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import { API_BASE_URL } from "../config";

Modal.setAppElement("#root");

export default function StaffTimetable() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubject, setFilterSubject] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [timetableData, setTimetableData] = useState([]);
  const [teachersData, setTeachersData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTimetable, setSelectedTimetable] = useState(null);
  const [selectedTimetableInfo, setSelectedTimetableInfo] = useState(null);
  const [retry, setRetry] = useState(0);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const AUTH_HEADER = `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const storedUsername =
          localStorage.getItem("username") || "System_User";
        const storedRole = localStorage.getItem("role") || "admin";
        const timetableResponse = await axios.get(
          `${API_BASE_URL}api/timetables`,
          {
            headers: {
              auth: AUTH_HEADER,
              username: storedUsername,
              role: storedRole,
            },
          },
        );
        setTimetableData(timetableResponse.data);

        const teachersResponse = await axios.get(`${API_BASE_URL}api/staff`, {
          headers: {
            auth: AUTH_HEADER,
            username: storedUsername,
            role: storedRole,
          },
        });
        const teachersMap = {};
        teachersResponse.data.forEach((t) => {
          teachersMap[t._id] = t;
        });
        setTeachersData(teachersMap);
      } catch (err) {
        setError(
          err.response && err.response.status === 404
            ? "Failed to fetch data: Resource Not Found (404)."
            : "Failed to fetch data: " + err.message,
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [retry]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleViewTimetable = (item) => {
    navigate(`/view-teacher-timetable/${item.teacherId}`);
  };

  const closeModal = () => {
    setSelectedTimetable(null);
    setSelectedTimetableInfo(null);
  };

  const getTeacherName = (teacherId) => {
    if (!teacherId) return "Not Assigned";
    const teacher = teachersData[teacherId];
    if (!teacher) return "Unknown";
    return teacher.firstname || teacher.fullname?.split(" ")[0] || "Unknown";
  };

  const getSubjectForDayAndPeriod = (day, periodNumber) => {
    if (!selectedTimetable) return { subject: "", teacher: "" };
    const dayData = selectedTimetable.find((d) => d.day === day);
    if (!dayData) return { subject: "", teacher: "" };
    const period = dayData.periods.find((p) => p.periodNumber === periodNumber);
    if (!period) return { subject: "", teacher: "" };
    return {
      subject: period.subject || "",
      teacher: getTeacherName(period.teacher),
    };
  };

  const getAllPeriods = () => {
    if (!selectedTimetable) return [];
    const periodsSet = new Set();
    selectedTimetable.forEach((day) =>
      day.periods.forEach((p) => periodsSet.add(p.periodNumber)),
    );
    return Array.from(periodsSet).sort((a, b) => a - b);
  };

  const getTimeForPeriod = (periodNumber) => {
    for (let day of daysOfWeek) {
      const dayData = selectedTimetable.find((d) => d.day === day);
      if (!dayData) continue;
      const period = dayData.periods.find(
        (p) => p.periodNumber === periodNumber,
      );
      if (period?.time) return period.time;
    }
    return "N/A";
  };

  const teachersList = Object.values(teachersData);

  // 🚀 Process data to get subjects and filter based on Allotment, Category, Subject, and Search
  const filteredData = useMemo(() => {
    return teachersList
      .map((teacher) => {
        const subjects = [];
        timetableData.forEach((tt) => {
          tt.timetable.forEach((day) => {
            day.periods.forEach((p) => {
              if (
                p.teacher === teacher._id &&
                p.subject !== "Empty" &&
                p.subject !== "Class Teacher Period"
              ) {
                subjects.push(p.subject);
              }
            });
          });
        });

        const uniqueSubjects = [...new Set(subjects)];

        return {
          teacherId: teacher._id,
          name: `${teacher.firstname} ${teacher.lastname}`,
          category: teacher?.role?.preferredgrades?.join(", ") || "N/A",
          subjectList: uniqueSubjects,
          subjectString: uniqueSubjects.join(", ") || "N/A",
        };
      })
      .filter((item) => {
        const hasAllotment = item.subjectList.length > 0;
        const matchesSearch = item.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesCategory =
          filterCategory === "" || item.category.includes(filterCategory);
        const matchesSubject =
          filterSubject === "" || item.subjectList.includes(filterSubject);

        return (
          hasAllotment && matchesSearch && matchesCategory && matchesSubject
        );
      });
  }, [teachersList, timetableData, searchQuery, filterCategory, filterSubject]);

  // Extract unique subjects and categories for dropdowns
  const uniqueCategories = [
    ...new Set(teachersList.flatMap((t) => t.role?.preferredgrades || [])),
  ];
  const allAssignedSubjects = [
    ...new Set(
      timetableData.flatMap((tt) =>
        tt.timetable.flatMap((d) =>
          d.periods
            .filter(
              (p) =>
                p.subject !== "Empty" && p.subject !== "Class Teacher Period",
            )
            .map((p) => p.subject),
        ),
      ),
    ),
  ];

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex flex-col flex-1 p-4 sm:p-6 overflow-y-auto">
          {!isPublishing && (
            <div className="mb-4 flex flex-wrap items-center gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search Name..."
                className="w-full sm:w-64 px-3 py-2 rounded-md border border-gray-300 text-sm"
              />

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 rounded-md border border-gray-300 text-sm bg-white min-w-[150px]"
              >
                <option value="">All Categories</option>
                {uniqueCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="px-3 py-2 rounded-md border border-gray-300 text-sm bg-white min-w-[150px]"
              >
                <option value="">All Subjects</option>
                {allAssignedSubjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>

              <button
                disabled
                className="ml-auto px-4 py-2 bg-gray-400 text-white rounded-md cursor-not-allowed"
              >
                Edit
              </button>
            </div>
          )}

          <div className="my-4 text-center">
            <h2 className="text-xl font-semibold text-gray-800">Timetable</h2>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}
          {loading && (
            <div className="text-gray-500 mb-4 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          <div className="overflow-auto border border-gray-200">
            <table className="min-w-full table-auto text-sm sm:text-base">
              <thead className="bg-blue-100 text-black">
                <tr>
                  <th className="border px-2 sm:px-4 py-2 text-center">Name</th>
                  <th className="border px-2 sm:px-4 py-2 text-center">
                    Category
                  </th>
                  <th className="border px-2 sm:px-4 py-2 text-center">
                    Subject
                  </th>
                  <th className="border px-2 sm:px-4 py-2 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredData.map((item) => (
                  <tr
                    key={item.teacherId}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-2 border sm:px-4 py-2 text-center">
                      {item.name}
                    </td>
                    <td className="px-2 border sm:px-4 py-2 text-center">
                      {item.category}
                    </td>
                    <td className="px-2 border sm:px-4 py-2 text-center">
                      {item.subjectString}
                    </td>
                    <td className="px-2 border sm:px-4 py-2 text-center">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => handleViewTimetable(item)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && !loading && (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-gray-500">
                      No teachers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
