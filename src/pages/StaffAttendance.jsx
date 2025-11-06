import { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import SelectField from "../components/SelectField";

export default function StaffAttendancePage() {
  const currentMonthName = new Date().toLocaleString("default", {
    month: "long",
  });
  const [view, setView] = useState("monthly");
  const [selectedMonth, setSelectedMonth] = useState(currentMonthName);
  const [searchQuery, setSearchQuery] = useState("");
  const [daysInMonth, setDaysInMonth] = useState([]);

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

  const staffData = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alex Brown" },
    { id: 4, name: "Chris Lee" },
  ];

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleViewChange = (newView) => setView(newView);

  // Recalculate the days in the month whenever the selected month changes
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

  const renderMonthlyView = () => {
    const filteredStaff = staffData.filter((staff) =>
      staff.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <>
        {/* Month Selector */}
        <div className="mb-4">
          <SelectField
            label="Select Month"
            options={months}
            value={selectedMonth}
            onChange={(e) => {
              console.log("Selected Month:", e.target.value); // Debugging log
              setSelectedMonth(e.target.value);
            }}
          />
        </div>

        <div className="overflow-auto">
          <table className="table-auto border-collapse w-full min-w-max border border-gray-300 text-sm">
            <thead>
              <tr>
                <th className="border px-4 py-2 bg-blue-500 text-white text-center">
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
                <th className="border px-4 py-2 bg-blue-500 text-white text-center">
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
              {filteredStaff.map((staff) => (
                <tr key={staff.id}>
                  <td className="border px-4 py-2 font-medium text-center bg-gray-50">
                    {staff.name}
                    <div className="text-xs font-semibold mt-1 text-gray-500">
                      Total: 0
                    </div>
                  </td>
                  {daysInMonth.map((_, i) => (
                    <td key={i} className="border px-2 py-2 text-center h-10">
                      {/* Leave empty for marking attendance */}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const renderYearlyView = () => {
    const filteredStaff = staffData.filter((staff) =>
      staff.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="overflow-auto">
        <table className="table-auto border-collapse w-full min-w-max border border-gray-300 text-sm">
          <thead className="bg-blue-100 text-black">
            <tr className="border">
              <th className="px-4 py-2 text-center border font-bold">
                Staff Name
              </th>
              <th className="px-4 py-2 text-center boorder font-bold">Total</th>
              {months.map((month, index) => (
                <th
                  key={index}
                  className="px-4 py-2 text-center border font-bold"
                >
                  {month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredStaff.map((staff) => (
              <tr
                key={staff.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-2 text-center text-gray-700 border">
                  {staff.name}
                </td>
                <td className="px-4 py-2 text-center text-gray-700 border">
                  0
                </td>
                {months.map((_, index) => (
                  <td key={index} className="px-2 py-2 text-center border">
                    {/* Leave empty for attendance summary */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex flex-1 flex-col p-4 sm:p-6 overflow-y-auto">
          {/* Search */}
          <div className="mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search staff..."
              className="w-full sm:w-72 px-3 py-2 rounded-md border border-gray-300 text-sm"
            />
          </div>

          {/* Title */}
          <div className="my-4 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Attendance Tracker
            </h2>
          </div>

          {/* View Tabs */}
          <div className="mb-4 flex gap-2">
            <button
              className={`w-1/2 px-4 py-2 font-bold rounded ${
                view === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200"
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

          {/* Render Table */}
          {view === "monthly" ? renderMonthlyView() : renderYearlyView()}
        </div>
      </div>
    </MainLayout>
  );
}
