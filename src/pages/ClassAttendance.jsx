import { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import SelectField from "../components/SelectField";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from "../config";

export default function ClassAttendancePage() {
  const currentMonthName = new Date().toLocaleString("default", {
    month: "long",
  });
  const [view, setView] = useState("monthly");
  const [selectedMonth, setSelectedMonth] = useState(currentMonthName);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStd, setSelectedStd] = useState("");
  const [selectedDiv, setSelectedDiv] = useState("");
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [students, setStudents] = useState([]); // 👈 fetched from API
  const [loading, setLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const stdOptions = [
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
  const divOptions = ["A", "B", "C", "D", "E"];

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleViewChange = (newView) => setView(newView);

  // Generate month days
  useEffect(() => {
    const monthIndex = months.indexOf(selectedMonth);
    const year = new Date().getFullYear();
    const daysInCurrentMonth = new Date(year, monthIndex + 1, 0).getDate();

    const days = Array.from({ length: daysInCurrentMonth }, (_, i) => {
      const dateObj = new Date(year, monthIndex, i + 1);
      return {
        date: i + 1,
        day: dateObj.toLocaleDateString("en-US", { weekday: "short" }),
      };
    });

    setDaysInMonth(days);
  }, [selectedMonth]);

  // Fetch attendance when Std/Div/Month change
  const renderYearlyView = (data) => {
    const year = new Date().getFullYear();

    // student-wise yearly data
    const merged = {};

    data.forEach((entry) => {
      const d = new Date(entry.date);
      if (d.getFullYear() !== year) return; // only this year

      entry.students.forEach((s) => {
        if (!merged[s.studentid]) {
          merged[s.studentid] = {
            id: s.studentid,
            name: s.studentname,
            months: Array(12).fill(0), // total presents per month
            total: 0,
          };
        }
        if (s.remark === "P") {
          merged[s.studentid].months[d.getMonth()] += 1;
          merged[s.studentid].total += 1;
        }
      });
    });

    const yearlyStudents = Object.values(merged).filter((student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
      <div className="overflow-auto">
        <table className="table-auto border-collapse w-full min-w-max border border-gray-300 text-sm">
          <thead>
            <tr>
              <th className="border px-4 py-2 bg-blue-400 text-center">
                Student
              </th>
              {months.map((m, i) => (
                <th
                  key={i}
                  className="border px-2 py-1 text-center bg-blue-100 text-gray-700"
                >
                  {m.slice(0, 3)}
                </th>
              ))}
              <th className="border px-4 py-2 bg-green-300 text-center">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {yearlyStudents.map((student) => (
              <tr key={student.id}>
                <td className="border px-4 py-2 font-medium text-center bg-gray-50">
                  {student.name}
                </td>
                {student.months.map((count, i) => (
                  <td key={i} className="border px-2 py-2 text-center">
                    {count}
                  </td>
                ))}
                <td className="border px-4 py-2 text-center font-bold bg-green-100">
                  {student.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  useEffect(() => {
    if (!selectedStd || !selectedDiv || !selectedMonth) return;

    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const storedUsername =
          localStorage.getItem("username") || "System_User";
        const storedRole = localStorage.getItem("role") || "admin";
        // FIX: Using imported API_BASE_URL
        const res = await fetch(`${API_BASE_URL}api/all-attendance`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
            username: storedUsername,
            role: storedRole,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch attendance");
        const data = await res.json();
        setAttendanceData(data); // store full data

        // 👇 ye monthly students ke liye
        const monthIndex = months.indexOf(selectedMonth);
        const year = new Date().getFullYear();

        const monthData = data.filter((entry) => {
          const d = new Date(entry.date);
          return (
            entry.std === selectedStd &&
            entry.div === selectedDiv &&
            d.getMonth() === monthIndex &&
            d.getFullYear() === year
          );
        });

        // Merge into student-wise structure
        const merged = {};

        monthData.forEach((entry) => {
          const d = new Date(entry.date).getDate(); // day of month
          entry.students.forEach((s) => {
            if (!merged[s.studentid]) {
              merged[s.studentid] = {
                id: s.studentid,
                name: s.studentname,
                attendance: {},
                total: 0,
              };
            }
            merged[s.studentid].attendance[d] = s.remark;
            if (s.remark === "P") {
              merged[s.studentid].total += 1;
            }
          });
        });

        setStudents(Object.values(merged));
      } catch (err) {
        console.error(err);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [selectedStd, selectedDiv, selectedMonth]);

  const renderMonthlyView = () => {
    const filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
      <>
        <div className="gap-4 mb-4">
          <label htmlFor="" className="mr-4">
            Select Month
          </label>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Select</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-center">Loading attendance...</p>
        ) : (
          <div className="overflow-auto">
            <table className="table-auto border-collapse w-full min-w-max border border-gray-300 text-sm">
              <thead>
                <tr>
                  <th className="border px-4 py-2 bg-blue-400 text-center">
                    Day
                  </th>
                  {daysInMonth.map((d, i) => (
                    <th
                      key={i}
                      className={`border px-2 py-1 text-center ${
                        i === new Date().getDate() - 1
                          ? "bg-yellow-300"
                          : "bg-blue-100 text-gray-700"
                      }`}
                    >
                      {d.day}
                    </th>
                  ))}
                </tr>
                <tr>
                  <th className="border px-4 py-2 bg-blue-400 text-center">
                    Date
                  </th>
                  {daysInMonth.map((d, i) => (
                    <th key={i} className="border px-2 py-1 text-center">
                      {d.date}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="border px-4 py-2 font-medium text-center bg-gray-50">
                      {student.name}
                      <div className="text-xs font-semibold mt-1 text-gray-500">
                        Total: {student.total || 0}
                      </div>
                    </td>
                    {daysInMonth.map((d, i) => (
                      <td key={i} className="border px-2 py-2 text-center h-10">
                        {student.attendance?.[d.date] || "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    );
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="bg-white rounded-2xl shadow p-6">
          {/* Std & Div dropdowns */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex flex-col w-full">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Standard
              </label>
              <select
                value={selectedStd}
                onChange={(e) => setSelectedStd(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="">Select</option>
                {stdOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label className="text-sm font-semibold text-gray-700 mb-2">
                Division
              </label>
              <select
                value={selectedDiv}
                onChange={(e) => setSelectedDiv(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="">Select</option>
                {divOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {!selectedStd || !selectedDiv ? (
            <div className="text-center text-red-500 font-semibold mb-6">
              Please select both Standard and Division to proceed.
            </div>
          ) : (
            <>
              <div className="mb-4 flex gap-2">
                <button
                  className={`w-1/2 px-4 py-2 font-bold rounded ${
                    view === "monthly"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleViewChange("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`w-1/2 px-4 py-2 font-bold rounded ${
                    view === "yearly" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => handleViewChange("yearly")}
                >
                  Yearly
                </button>
              </div>

              {view === "monthly"
                ? renderMonthlyView()
                : renderYearlyView(attendanceData)}
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
