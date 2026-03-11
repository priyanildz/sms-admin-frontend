import { useEffect, useState, useCallback } from "react";
import MainLayout from "../layout/MainLayout";
import SelectField from "../components/SelectField";
import axios from "axios";
import { API_BASE_URL } from "../config";

export default function MyAttendance() {
  const [view, setView] = useState("monthly");
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString("default", { month: "long" }),
  );
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const fetchAttendance = useCallback(async () => {
    setLoading(true);
    try {
      const username = localStorage.getItem("username");
      const monthIndex = months.indexOf(selectedMonth);
      const year = new Date().getFullYear();
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const res = await axios.get(`${API_BASE_URL}api/admin-attendance`, {
        params: { username, year, month: monthIndex },
        headers: {
          auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          username: storedUsername,
          role: storedRole,
        },
      });
      setAttendanceData(res.data);
    } catch (err) {
      console.error("Error fetching attendance", err);
    } finally {
      setLoading(false);
    }
  }, [selectedMonth]);

  useEffect(() => {
    fetchAttendance();
    const monthIndex = months.indexOf(selectedMonth);
    const year = new Date().getFullYear();
    const daysCount = new Date(year, monthIndex + 1, 0).getDate();

    const days = Array.from({ length: daysCount }, (_, i) => {
      const dateObj = new Date(year, monthIndex, i + 1);
      return {
        date: i + 1,
        day: dateObj.toLocaleDateString("en-US", { weekday: "short" }),
        fullDate: dateObj.toISOString().split("T")[0],
      };
    });
    setDaysInMonth(days);
  }, [selectedMonth, fetchAttendance]);

  const getDayStatus = (fullDate) => {
    const record = attendanceData.find(
      (d) => d.date.split("T")[0] === fullDate,
    );
    return record ? record.status : "-";
  };

  const renderMonthlyView = () => (
    <>
      <div className="mb-4 w-60">
        <SelectField
          label="Select Month"
          options={months}
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </div>
      <div className="overflow-auto border rounded-lg">
        <table className="table-auto border-collapse w-full min-w-max text-sm">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border px-4 py-2">Day</th>
              {daysInMonth.map((d, i) => (
                <th
                  key={i}
                  className="border px-2 py-1 text-center font-normal"
                >
                  {d.day}
                </th>
              ))}
            </tr>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Date</th>
              {daysInMonth.map((d, i) => (
                <th
                  key={i}
                  className={`border px-2 py-1 text-center ${new Date().getDate() === d.date && selectedMonth === months[new Date().getMonth()] ? "bg-yellow-200" : ""}`}
                >
                  {d.date}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 font-medium bg-gray-50 text-center">
                {localStorage.getItem("username")}
                <div className="text-[10px] text-blue-600">
                  P: {attendanceData.filter((d) => d.status === "P").length}
                </div>
              </td>
              {daysInMonth.map((d, i) => (
                <td
                  key={i}
                  className={`border px-2 py-2 text-center font-bold ${getDayStatus(d.fullDate) === "A" ? "text-red-500" : "text-green-600"}`}
                >
                  {getDayStatus(d.fullDate)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6 min-h-[500px]">
        <div className="my-4 text-center">
          <h2 className="text-xl font-semibold text-gray-800">My Attendance</h2>
        </div>
        <div className="mb-4 flex gap-2">
          <button
            className={`w-1/2 px-4 py-2 font-bold rounded ${view === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setView("monthly")}
          >
            Monthly
          </button>
          <button
            className={`w-1/2 px-4 py-2 font-bold rounded ${view === "yearly" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setView("yearly")}
          >
            Yearly
          </button>
        </div>
        {loading ? (
          <div className="text-center py-10">Updating...</div>
        ) : view === "monthly" ? (
          renderMonthlyView()
        ) : (
          <div className="text-center py-10 text-gray-400">
            Yearly summary view coming soon...
          </div>
        )}
      </div>
    </MainLayout>
  );
}
