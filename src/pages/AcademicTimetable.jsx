import React, { useState, useEffect, useMemo } from "react";
import MainLayout from "../layout/MainLayout";
import SelectField from "../components/SelectField";
import { API_BASE_URL } from "../config";

const FIXED_PERIOD_STRUCTURE = [
  { num: 1, time: "08:00-08:30", type: "Period", isBreak: false },
  { num: 2, time: "08:30-09:00", type: "Period", isBreak: false },
  { num: 3, time: "09:00-09:30", type: "Period", isBreak: false },
  { num: 4, time: "09:30-10:00", type: "Period", isBreak: false },
  { num: null, time: "10:00-10:20", type: "Breakfast Break", isBreak: true }, // 20 min break after 4 lecs
  { num: 5, time: "10:20-10:50", type: "Period", isBreak: false },
  { num: 6, time: "10:50-11:20", type: "Period", isBreak: false },
  { num: 7, time: "11:20-11:50", type: "Period", isBreak: false },
  { num: 8, time: "11:50-12:20", type: "Period", isBreak: false },
];

const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
const WEEKDAYS_FULL = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const TOTAL_PERIODS = FIXED_PERIOD_STRUCTURE.length;

const AcademicTimetable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [timetableData, setTimetableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedStandardToPublish, setSelectedStandardToPublish] =
    useState("");
  const [standard, setStandard] = useState("");
  const [timing, setTiming] = useState("08:00 - 12:20");

  const stdOptions = [
    "Select Standard",
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
  const timingOptions = ["08:00 - 12:20"];

  const availableStandards = useMemo(() => {
    const data = timetableData || [];
    const standards = new Set();
    data.forEach((tt) => standards.add(tt.standard));
    const sortedStandards = Array.from(standards).sort(
      (a, b) => parseInt(a) - parseInt(b),
    );
    return ["Select Standard", ...sortedStandards];
  }, [timetableData]);

  const showMessage = (msg) => window.alert(msg);

  const fetchTimetableData = async () => {
    setLoading(true);
    setError("");
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await fetch(`${API_BASE_URL}api/timetables`, {
        headers: {
          auth: AUTH_HEADER,
          username: storedUsername,
          role: storedRole,
        },
      });
      if (!response.ok) {
        if (response.status === 404) {
          setTimetableData([]);
          return;
        }
        throw new Error(
          `Server returned ${response.status}: Failed to fetch timetable data`,
        );
      }
      const data = await response.json();
      setTimetableData(data);
    } catch (err) {
      setError("Error fetching timetable data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetableData();
  }, []);

  const handleViewClick = (row) => {
    setSelectedRow(row);
    setViewMode(true);
  };

  const createTimetable = async () => {
    if (!standard || standard === "Select Standard" || !timing) {
      showMessage(
        "Please fill in all required fields and select a valid Standard.",
      );
      return;
    }

    setLoading(true);
    setError("");

    const generationRequest = {
      standard,
      timing,
      submittedby: "Testing Admin",
    };

    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await fetch(`${API_BASE_URL}api/timetables/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: AUTH_HEADER,
          username: storedUsername,
          role: storedRole,
        },
        body: JSON.stringify(generationRequest),
      });

      const result = await response.json();

      if (!response.ok) {
        let errorMessage = result.error || "Failed to generate timetables.";
        if (result.details && Array.isArray(result.details)) {
          const detailMsgs = result.details
            .map((d) => `Div ${d.division}: ${d.error}`)
            .join("\n");
          errorMessage = `${errorMessage}\n\nReason:\n${detailMsgs}`;
        }
        throw new Error(errorMessage);
      }

      setTimetableData((prevData) => [...prevData, ...result.timetables]);
      setIsModalOpen(false);
      setStandard("");

      if (result.failedDivisions && result.failedDivisions.length > 0) {
        const failureDetails = result.failedDivisions
          .map((f) => `Div ${f.division}: ${f.error}`)
          .join("\n");
        showMessage(
          `Timetables generated with some issues:\n\n${failureDetails}`,
        );
      } else {
        showMessage(`Timetables generated successfully for the academic year.`);
      }

      fetchTimetableData();
    } catch (err) {
      setError("Generation failed: " + err.message);
      showMessage("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTimetable = async (id, std, div) => {
    if (!window.confirm(`Are you sure you want to delete Std ${std} - ${div}?`))
      return;
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}api/timetables/${id}`, {
        method: "DELETE",
        headers: {
          auth: AUTH_HEADER,
          username: storedUsername,
          role: storedRole,
        },
      });
      if (!response.ok)
        throw new Error(`Delete failed with status ${response.status}`);
      setTimetableData(timetableData.filter((item) => item._id !== id));
      showMessage("Deleted successfully!");
    } catch (err) {
      showMessage("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePublishTimetable = async () => {
    if (
      !selectedStandardToPublish ||
      selectedStandardToPublish === "Select Standard"
    ) {
      showMessage("Please select a Standard to publish.");
      return;
    }
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}api/timetables/publish/${selectedStandardToPublish}`,
        {
          method: "PUT",
          headers: {
            auth: AUTH_HEADER,
            username: storedUsername,
            role: storedRole,
          },
        },
      );
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Server error during publish.");
      showMessage(result.message || `Published successfully.`);
      fetchTimetableData();
    } catch (err) {
      showMessage(`Publishing failed: ${err.message}.`);
    } finally {
      setLoading(false);
    }
  };

  const getScheduleGrid = (timetable) => {
    if (!timetable || !timetable.timetable) return [];
    return FIXED_PERIOD_STRUCTURE.map((p) => {
      const row = { time: p.time, isRecess: p.type === "Breakfast Break" };
      WEEKDAYS_FULL.forEach((dayName) => {
        let content = {
          subject: "-",
          teacher: null,
          isBreak: false,
          isSundayHoliday: false,
        };
        if (dayName === "Sunday") {
          content = { subject: "WEEKLY HOLIDAY", isSundayHoliday: true };
        } else {
          const dayData = timetable.timetable.find((d) => d.day === dayName);
          const period = dayData?.periods.find((slot) => slot.time === p.time);
          if (period) {
            const isBreakOrLunch =
              period.subject.toLowerCase().includes("break") ||
              period.subject.toLowerCase().includes("lunch");
            content = {
              subject: period.subject || "Empty",
              teacher: period.teacherName || "TBD",
              isBreak: isBreakOrLunch,
            };
          }
        }
        row[dayName] = content;
      });
      return row;
    });
  };

  const displayTimetable = selectedRow ? getScheduleGrid(selectedRow) : [];
  const filteredTimetableData = timetableData.filter(
    (row) =>
      row.standard
        ?.toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      row.division?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <MainLayout>
      <>
        <div className="flex flex-col w-full">
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="p-6 space-y-6">
              {loading && (
                <div className="text-center text-blue-500 font-semibold italic">
                  Processing request...
                </div>
              )}
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="border px-3 py-2 rounded-md w-64 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {!viewMode && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    disabled={loading}
                  >
                    Add New Timetable
                  </button>
                )}
              </div>
              {!viewMode && (
                <div className="flex flex-col items-center mt-6 w-full">
                  <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4 w-full">
                    Timetable Management
                  </h2>
                  <div className="flex items-center gap-3 w-full justify-start">
                    <SelectField
                      label=""
                      options={availableStandards}
                      value={selectedStandardToPublish}
                      onChange={(value) => setSelectedStandardToPublish(value)}
                      placeholder="Select Standard"
                      className="!w-48"
                    />
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                      onClick={handlePublishTimetable}
                      disabled={
                        !selectedStandardToPublish ||
                        selectedStandardToPublish === "Select Standard" ||
                        loading
                      }
                    >
                      Publish
                    </button>
                  </div>
                </div>
              )}
              {viewMode ? (
                <>
                  <div className="text-center">
                    <h2 className="text-xl font-semibold">
                      Standard {selectedRow?.standard} - Division
                      {selectedRow?.division || "N/A"}
                    </h2>
                  </div>
                  <div className="overflow-x-auto mt-6">
                    <table className="min-w-full border border-gray-300 rounded-lg">
                      <thead className="bg-blue-100">
                        <tr>
                          <th className="px-4 py-3 border font-semibold w-[100px]">
                            Time
                          </th>
                          {WEEKDAYS_FULL.map((dayName) => (
                            <th
                              key={dayName}
                              className="px-4 py-3 border font-semibold"
                            >
                              {dayName}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {displayTimetable.map((row, rowIdx) => (
                          <tr key={rowIdx} className="hover:bg-gray-50">
                            <td className="px-4 py-3 border font-medium bg-gray-50 text-sm">
                              {row.time}
                            </td>

                            {/* Check if this is the Recess row to span across all days except Sunday handling */}
                            {row.isRecess ? (
                              <td
                                colSpan={WEEKDAYS_FULL.length}
                                className="px-2 py-1 border border-gray-300 text-center text font-bold bg-gray-200 text-gray-800 tracking-[10px] uppercase"
                              >
                                RECESS
                              </td>
                            ) : (
                              WEEKDAYS_FULL.map((dayName) => {
                                const cell = row[dayName];
                                if (cell.isSundayHoliday && rowIdx === 0) {
                                  return (
                                    <td
                                      key={dayName}
                                      rowSpan={TOTAL_PERIODS}
                                      className="border text-center align-middle font-bold bg-orange-300 text-orange-900"
                                      style={{
                                        writingMode: "vertical-rl",
                                        transform: "rotate(180deg)",
                                        fontSize: "18px",
                                        letterSpacing: "5px",
                                      }}
                                    >
                                      WEEKLY HOLIDAY
                                    </td>
                                  );
                                }
                                if (cell.isSundayHoliday) return null;
                                const bg = cell.isBreak
                                  ? "bg-gray-200 text-gray-800"
                                  : "bg-blue-100 text-blue-800";
                                return (
                                  <td
                                    key={dayName}
                                    className={`px-2 py-3 border text-center text-sm align-top ${cell.isBreak ? "bg-gray-100" : ""}`}
                                  >
                                    {cell.subject !== "-" && (
                                      <div
                                        className={`p-1 rounded ${bg} font-semibold leading-tight`}
                                      >
                                        {cell.subject}
                                      </div>
                                    )}
                                    {cell.teacher && !cell.isBreak && (
                                      <div className="mt-1 text-xs text-gray-600 font-medium italic">
                                        ({cell.teacher})
                                      </div>
                                    )}
                                    {cell.subject === "-" && (
                                      <span className="text-gray-400">-</span>
                                    )}
                                  </td>
                                );
                              })
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={() => {
                        setViewMode(false);
                        setSelectedRow(null);
                      }}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      ← Back to list
                    </button>
                  </div>
                </>
              ) : (
                <div className="overflow-x-auto mt-6">
                  <table className="min-w-full border border-gray-300 rounded-lg">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="px-4 py-3 border font-semibold">
                          Standard
                        </th>
                        <th className="px-4 py-3 border font-semibold">
                          Division
                        </th>
                        <th className="px-4 py-3 border font-semibold">
                          Created By
                        </th>
                        <th className="px-4 py-3 border font-semibold">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {filteredTimetableData.length > 0 ? (
                        filteredTimetableData.map((row, idx) => (
                          <tr
                            key={row._id || idx}
                            className="hover:bg-gray-50 text-center"
                          >
                            <td className="px-4 py-3 border font-medium">
                              {row.standard}
                            </td>
                            <td className="px-4 py-3 border font-medium">
                              {row.division || "N/A"}
                            </td>
                            <td className="px-4 py-3 border">
                              {row.submittedby || "N/A"}
                            </td>
                            <td className="px-4 py-3 border space-x-3">
                              <button
                                className="text-blue-600 hover:underline font-medium"
                                onClick={() => handleViewClick(row)}
                              >
                                View
                              </button>
                              <button
                                className="text-red-600 hover:underline font-medium"
                                onClick={() =>
                                  deleteTimetable(
                                    row._id,
                                    row.standard,
                                    row.division,
                                  )
                                }
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="px-4 py-8 text-center text-gray-500"
                          >
                            No timetables found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          {isModalOpen && (
            <div
              className="fixed inset-0 flex items-center justify-center z-50"
              style={{ backgroundColor: "rgba(50, 50, 50, 0.5)" }}
            >
              <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                <h3 className="text-xl font-semibold mb-6 text-center text-gray-800">
                  Generate New Timetable (For All Divisions)
                </h3>
                <div className="space-y-4">
                  <SelectField
                    label="Standard"
                    options={stdOptions}
                    value={standard}
                    onChange={(v) => setStandard(v)}
                  />
                  <SelectField
                    label="Timing"
                    options={timingOptions}
                    value={timing}
                    onChange={(v) => setTiming(v)}
                  />
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setStandard("");
                      setTiming("08:00 - 12:20");
                    }}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createTimetable}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    disabled={
                      !standard ||
                      standard === "Select Standard" ||
                      !timing ||
                      loading
                    }
                  >
                    {loading ? "Generating All..." : "Generate Timetables"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    </MainLayout>
  );
};

export default AcademicTimetable;
