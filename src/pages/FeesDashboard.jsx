import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { API_BASE_URL } from "../config";

ChartJS.register(ArcElement, Tooltip, Legend);

const SelectField = ({ label, name, options, value, onChange }) => {
  return (
    <div>

      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
               {label}
        </label>
      )}

      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        className="border px-3 py-2 rounded w-full"
      >

        {options.map((option, index) => (
          <option key={index} value={option}>
                  {option}
          </option>
        ))}

      </select>

    </div>
  );
};

const FeesDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totals: {},
    received: {},
    pending: {},
    modes: {},
  });

  const [annualFees, setAnnualFees] = useState({});
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    category: "All",
  });
  const [reminderFilters, setReminderFilters] = useState({
    fromDate: "",
    toDate: "",
    category: "All",
  });

  const [transactions, setTransactions] = useState([]);
  const [dashboardSearchTerm, setDashboardSearchTerm] = useState("");

  const [pieData, setPieData] = useState({
    labels: ["Cash", "Bank Transfer", "Internet Banking", "Cheques"],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ["#3490dc", "#38c172", "#ffed4a", "#e3342f"],
        borderWidth: 1,
      },
    ],
  });

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

  const FEE_CATEGORIES = ["All", "Pre-Primary", "Primary", "Secondary"]; // Fetch Total Fee Structure

  const fetchAnnualFees = async () => {
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await axios.get(`${API_BASE_URL}api/combined-fees`, {
        headers: {
          auth: AUTH_HEADER,
          username: storedUsername,
          role: storedRole,
        },
      });

      const fees = response.data;

      const aggregatedTotals = {
        All: fees.all || 0,
        "Pre-Primary": fees.preprimary || 0,
        Primary: fees.primary || 0,
        Secondary: fees.secondary || 0,
      };

      setAnnualFees(aggregatedTotals);
    } catch (error) {
      console.error("Error fetching annual fees:", error);
      setAnnualFees({});
    }
  }; // Fetch Transactions

  const fetchTransactions = async () => {
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await axios.get(
        `${API_BASE_URL}api/filter-transactions`,
        {
          params: {
            fromDate: filters.fromDate,
            toDate: filters.toDate,
            category: filters.category,
          },
          headers: {
            "Content-Type": "application/json",
            auth: AUTH_HEADER,
            username: storedUsername,
            role: storedRole,
          },
        },
      );

      const data = response.data;

      const receivedByStd = {};
      const modes = {
        Cash: 0,
        "Bank Transfer": 0,
        "Internet Banking": 0,
        Cheques: 0,
      };

      data.forEach((entry) => {
        const stdKey = entry.std;

        receivedByStd[stdKey] = (receivedByStd[stdKey] || 0) + entry.totalPaid;

        const from = filters.fromDate ? new Date(filters.fromDate) : null;
        const to = filters.toDate ? new Date(filters.toDate) : null;

        entry.installments.forEach((inst) => {
          const instDate = new Date(inst.date);
          const endDateInclusive = to
            ? new Date(to.getTime() + 86400000)
            : null;

          const isInRange =
            (!from || instDate >= from) &&
            (!endDateInclusive || instDate < endDateInclusive);

          if (inst.mode && isInRange) {
            modes[inst.mode] = (modes[inst.mode] || 0) + inst.amount;
          }
        });
      });

      let prePrimaryReceived = 0;
      let primaryReceived = 0;
      let secondaryReceived = 0;
      let allReceived = 0;

      const prePrimaryStandards = [
        "Nursery",
        "Junior",
        "Senior",
        "Jr KG",
        "Sr KG",
      ];

      Object.keys(receivedByStd).forEach((std) => {
        const paid = receivedByStd[std];
        allReceived += paid;

        const stdNum = parseInt(std);

        if (prePrimaryStandards.includes(std)) {
          prePrimaryReceived += paid;
        } else if (stdNum >= 1 && stdNum <= 7) {
          primaryReceived += paid;
        } else if (stdNum >= 8 && stdNum <= 10) {
          secondaryReceived += paid;
        }
      });

      const finalReceived = {
        All: allReceived,
        "Pre-Primary": prePrimaryReceived,
        Primary: primaryReceived,
        Secondary: secondaryReceived,
      };

      const pending = {
        All: Math.max(0, annualFees.All - finalReceived.All),
        "Pre-Primary": Math.max(
          0,
          annualFees["Pre-Primary"] - finalReceived["Pre-Primary"],
        ),
        Primary: Math.max(0, annualFees.Primary - finalReceived.Primary),
        Secondary: Math.max(0, annualFees.Secondary - finalReceived.Secondary),
      };

      setDashboardData({
        totals: annualFees,
        received: finalReceived,
        pending,
      });

      setTransactions(data);

      setPieData({
        labels: Object.keys(modes),
        datasets: [{ ...pieData.datasets[0], data: Object.values(modes) }],
      });
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // NEW FUNCTION: Handle search click and redirection
  const handleDashboardSearch = () => {
    const baseUrl = window.location.origin;
    const searchValue = dashboardSearchTerm.trim();
    const params = new URLSearchParams();

    if (searchValue) {
      const standardKeywords = [
        "nursery",
        "junior",
        "senior",
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

      let foundStd = null;
      let foundDiv = null;

      const parts = searchValue
        .split(/\s+|(?=\d)/)
        .map((p) => p.trim().toLowerCase())
        .filter((p) => p);

      // Try to find a standard and division explicitly
      for (const part of parts) {
        // Check if the part is a standard name/number (ignoring suffixes like st, nd, th, kg)
        const normalizedPart = part.replace(/th|st|nd|rd|kg/g, "");
        if (standardKeywords.includes(normalizedPart)) {
          foundStd = part.toUpperCase(); // Preserve original case/number for Std field
        } else if (["a", "b", "c", "d", "e"].includes(part)) {
          foundDiv = part.toUpperCase();
        }
      }

      // Prioritize explicit filtering via std/div fields if found
      if (foundStd) {
        // Use the normalized version for the 'std' parameter in payment entry, e.g., '10' or 'JUNIOR'
        params.append("std", foundStd);
      }
      if (foundDiv) {
        params.append("div", foundDiv);
      }

      // Always include the full search term for name searching/fallback
      params.append("search", searchValue);
    }

    // Redirect to the Payment Entry page with the constructed filters
    window.location.href = `${baseUrl}/payment-entry?${params.toString()}`;
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleReminderFilterChange = (e) => {
    const { name, value } = e.target;
    setReminderFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendReminder = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}api/send-reminder`,
        {
          fromDate: reminderFilters.fromDate,
          toDate: reminderFilters.toDate,
          category: reminderFilters.category,
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

      alert("Reminder sent successfully!");
    } catch (error) {
      console.error("Reminder Error:", error);
      alert("Error sending reminder.");
    }
  };

  useEffect(() => {
    fetchAnnualFees();
  }, []);

  useEffect(() => {
    if (Object.keys(annualFees).length > 0) {
      fetchTransactions();
    }
  }, [filters, annualFees]);

  return (
    <MainLayout>

      <div className="bg-white rounded-2xl shadow p-6">

        <div className="p-6 space-y-8">

          <h1 className="text-2xl font-bold text-center">Fee Dashboard</h1>  
            {/* SEARCH */}
          <div className="flex items-center justify-between flex-wrap gap-4">

            <div className="flex items-center w-full max-w-2xl">

              <input
                type="text"
                placeholder="Search Student, Standard, Class"
                value={dashboardSearchTerm}
                onChange={(e) => setDashboardSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleDashboardSearch()}
                className="border px-4 py-2 rounded-l w-full"
              />

              <div
                onClick={handleDashboardSearch}
                className="text-white px-4 py-2 rounded-r cursor-pointer bg-blue-500"
              >
                        <FontAwesomeIcon icon={faSearch} />     

              </div>

            </div>

          </div>
               {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full text-center border border-blue-500">

              <thead className="bg-blue-100 text-black">

                <tr>
                           <th className="border py-2">Category</th> 
                         <th className="border py-2">Total</th>    
                      <th className="border py-2">Received</th>      
                    <th className="border py-2">Pending</th>      

                </tr>

              </thead>

              <tbody className="bg-white">

                {FEE_CATEGORIES.map((category, index) => {
                  const categoryKey = category;
                  return (
                    <tr key={index}>

                      <td className="border py-2">{category}</td>       

                      <td className="border py-2">

                        {dashboardData.totals[categoryKey]
                          ? `₹${dashboardData.totals[categoryKey].toLocaleString()}`
                          : "₹0"}

                      </td>

                      <td className="border py-2">

                        {dashboardData.received[categoryKey]
                          ? `₹${dashboardData.received[categoryKey].toLocaleString()}`
                          : "₹0"}

                      </td>

                      <td className="border py-2">

                        {dashboardData.pending[categoryKey]
                          ? `₹${dashboardData.pending[categoryKey].toLocaleString()}`
                          : "₹0"}

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>
               {/* Modes and Reminder Section */}
          <div className="flex flex-col md:flex-row gap-8 mt-8">
                  {/* Modes */}
            <div className="flex-1 space-y-4">

              <h2 className="text-center font-semibold bg-blue-500 text-white py-2 rounded">
                        Modes
              </h2>
                     {/* From Date & To Date in one line */}
              <div className="flex gap-4">

                <div className="flex flex-col flex-1">
                           <label>From Date</label>

                  <input
                    type="date"
                    name="fromDate"
                    value={filters.fromDate}
                    onChange={handleFilterChange}
                    className="border px-3 py-2 rounded"
                  />

                </div>

                <div className="flex flex-col flex-1">
                           <label>To Date</label>

                  <input
                    type="date"
                    name="toDate"
                    value={filters.toDate}
                    onChange={handleFilterChange}
                    className="border px-3 py-2 rounded"
                  />

                </div>

              </div>
                     {/* Category Dropdown */}
              <div className="mt-4">

                <SelectField
                  label="Category"
                  name="category"
                  options={FEE_CATEGORIES} // Use updated array
                  value={filters.category}
                  onChange={handleFilterChange}
                />

              </div>
                     {/* Pie Chart */}
              <div className="mt-6">
                        <Pie data={pieData} options={pieOptions} />  

              </div>

            </div>
                  {/* Vertical Line */}
            <div className="w-[2px] bg-blue-500 hidden md:block"></div>    
             {/* Reminder */}
            <div className="flex-1 space-y-4">

              <h2 className="text-center font-semibold bg-blue-500 text-white py-2 rounded">
                        Reminder
              </h2>
                     {/* From Date & To Date in one line */}
              <div className="flex gap-4">

                <div className="flex flex-col flex-1">
                           <label>From Date</label>

                  <input
                    type="date"
                    name="fromDate"
                    value={reminderFilters.fromDate}
                    onChange={handleReminderFilterChange}
                    className="border px-3 py-2 rounded"
                  />

                </div>

                <div className="flex flex-col flex-1">
                           <label>To Date</label>

                  <input
                    type="date"
                    name="toDate"
                    value={reminderFilters.toDate}
                    onChange={handleReminderFilterChange}
                    className="border px-3 py-2 rounded"
                  />

                </div>

              </div>
                     {/* Category Dropdown */}
              <div className="mt-4">

                <SelectField
                  label="Category"
                  name="category"
                  options={FEE_CATEGORIES} // Use updated array
                  value={reminderFilters.category}
                  onChange={handleReminderFilterChange}
                />

              </div>
                     {/* Send Button */}
              <div className="flex justify-center mt-6">

                <button
                  onClick={handleSendReminder}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                           Send
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
};

export default FeesDashboard;
