import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import SelectField from "../components/SelectField";

export default function MyAttendance() {
    const currentMonthName = new Date().toLocaleString("default", {
        month: "long",
      });
      const [view, setView] = useState("monthly");
      const [selectedMonth, setSelectedMonth] = useState(currentMonthName);
      const [daysInMonth, setDaysInMonth] = useState([]);
    
      // ✅ Dummy logged-in user object
      const loggedInUser = {
        id: 101,
        name: "John Doe",
      };
    
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

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
    return (
      <>
        {" "}
        <div className="mb-4 w-60">
          {" "}
          <SelectField
            label="Select Month"
            options={months}
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />{" "}
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
              <tr>
                <td className="border px-4 py-2 font-medium text-center bg-gray-50">
                  {loggedInUser.name}
                  <div className="text-xs font-semibold mt-1 text-gray-500">
                    Total: 0
                  </div>
                </td>
                {daysInMonth.map((_, i) => (
                  <td key={i} className="border px-2 py-2 text-center h-10">
                    {/* Placeholder for attendance: P / A */}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const renderYearlyView = () => {
    return (
      <div className="overflow-auto">
        
        <table className="table-auto border-collapse w-full min-w-max border border-gray-300 text-sm">
          
          <thead className="bg-blue-500 text-white">
            
            <tr>
              
              <th className="px-4 py-2 text-center font-bold">
                Staff Name
              </th>
              <th className="px-4 py-2 text-center font-bold">Total</th>{" "}
              {months.map((month, index) => (
                <th key={index} className="px-4 py-2 text-center font-bold">
                  
                  {month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              
              <td className="px-4 py-2 text-center text-gray-700 border">
                {loggedInUser.name}
              </td>
              <td className="px-4 py-2 text-center text-gray-700 border">0</td>{" "}
              {months.map((_, index) => (
                <td key={index} className="px-2 py-2 text-center border">
                  
                  {/* Placeholder for monthly total attendance */}{" "}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <MainLayout>
         <div className="bg-white rounded-2xl shadow p-6">
      {" "}
      <div className="flex flex-1 flex-col p-4 sm:p-6 overflow-y-auto">
        {" "}
        {/* Title */}{" "}
        <div className="my-4 text-center">
          {" "}
          <h2 className="text-xl font-semibold text-gray-800">
            My Attendance
          </h2>{" "}
        </div>
        {/* View Tabs */}
        <div className="mb-4 flex gap-2">
          <button
            className={`w-1/2 px-4 py-2 font-bold rounded ${
              view === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("monthly")}
          >
            Monthly
          </button>
          <button
            className={`w-1/2 px-4 py-2 font-bold rounded ${
              view === "yearly" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("yearly")}
          >
            Yearly
          </button>
        </div>
        {/* View Content */}
        {view === "monthly" ? renderMonthlyView() : renderYearlyView()}
      </div>
      </div>
    </MainLayout>
  );
}
