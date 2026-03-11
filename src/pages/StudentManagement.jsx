import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from "../config";

// --- Updated Filter Constants ---
const AVAILABLE_STANDARDS = [
  "All",
  "Nursery",
  "Junior",
  "Senior",
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
];
const AVAILABLE_DIVISIONS = ["All", "A", "B", "C", "D", "E"];
const AVAILABLE_STATUSES = ["All", "Active", "Inactive (LC)"];

export default function StudentManagement() {
  const [studentList, setStudentList] = useState([]);
  const [lcList, setLCList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // State for Filters
  const [selectedStd, setSelectedStd] = useState("All");
  const [selectedDiv, setSelectedDiv] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  // Fetch students data from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if (selectedStd !== "All") {
          params.append("std", selectedStd);
        }
        if (selectedDiv !== "All") {
          params.append("div", selectedDiv);
        }

        const storedUsername =
          localStorage.getItem("username") || "System_User";
        const storedRole = localStorage.getItem("role") || "admin";
        const response = await fetch(
          `${API_BASE_URL}api/students?${params.toString()}`,
          {
            headers: {
              auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",

              username: storedUsername,
              role: storedRole,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStudentList(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching students:", err);
      }
    };

    const fetchLCStudents = async () => {
      try {
        const storedUsername =
          localStorage.getItem("username") || "System_User";
        const storedRole = localStorage.getItem("role") || "admin";
        const response = await axios.get(`${API_BASE_URL}api/lcstudent`, {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
            username: storedUsername,
            role: storedRole,
          },
        });
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = response.data;
        setLCList(Array.isArray(data) ? data : []);
        setError(null);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching LC students:", error);
      }
    };

    Promise.all([fetchStudents(), fetchLCStudents()])
      .catch((err) => console.error("One or more initial fetches failed:", err))
      .finally(() => setLoading(false));
  }, [selectedStd, selectedDiv]);

  // Reset to page 1 whenever filters or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStd, selectedDiv, selectedStatus, selectedCard, searchQuery]);

  const activeStudents = studentList;
  const newAdmissions = activeStudents.length;
  const totalStudents = activeStudents.length + lcList.length;
  const lcStudents = lcList.length;

  const cards = [
    {
      title: "Total Students",
      count: totalStudents,
      color: "blue",
      key: "Total",
    },
    {
      title: "LC Students",
      count: lcStudents,
      color: "red",
      key: "LC Students",
    },
    {
      title: "New Admission",
      count: newAdmissions,
      color: "green",
      key: "New Admission",
    },
  ];

  const combinedAllStudents = [...activeStudents, ...lcList];

  const filteredStudents = (() => {
    const query = searchQuery.toLowerCase();

    const filterByName = (student) => {
      const fullName =
        `${student.firstname || ""} ${student.middlename || ""} ${student.lastname || ""}`.toLowerCase();
      const grNo = (student.admission?.grno || "").toLowerCase();
      const admissionNo = (student.admission?.admissionno || "").toLowerCase();
      return (
        fullName.includes(query) ||
        grNo.includes(query) ||
        admissionNo.includes(query)
      );
    };

    let listToFilter = [];

    if (selectedCard === "Total") {
      listToFilter = combinedAllStudents;
    } else if (selectedCard === "New Admission") {
      listToFilter = activeStudents;
    } else if (selectedCard === "LC Students") {
      listToFilter = lcList;
    }

    return listToFilter.filter((student) => {
      const isCurrentlyActive = student.status !== false;
      if (selectedStatus === "Active" && !isCurrentlyActive) return false;
      if (selectedStatus === "Inactive (LC)" && isCurrentlyActive) return false;
      if (
        selectedStd !== "All" &&
        String(student.admission?.admissionstd) !== String(selectedStd)
      )
        return false;
      if (
        selectedDiv !== "All" &&
        student.admission?.admissiondivision?.toUpperCase() !==
          selectedDiv.toUpperCase()
      )
        return false;
      return filterByName(student);
    });
  })();

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredStudents.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

  const getTableHeaders = () => {
    if (selectedCard === "Total") {
      return [
        "Admission no.",
        "Students Name",
        "GR No.",
        "Std",
        "Div",
        "Gender",
        "Contact no.",
        "Status",
        "Action",
      ];
    } else if (selectedCard === "LC Students") {
      return [
        "LC no.",
        "Students Name",
        "GR No.",
        "Std",
        "Div",
        "Gender",
        "Contact no.",
        "Status",
        "Action",
      ];
    } else if (selectedCard === "New Admission") {
      return [
        "Admission no.",
        "Students Name",
        "Std",
        "Div",
        "Gender",
        "Contact no.",
        "Status",
        "Action",
      ];
    }
    return [];
  };

  const capitalizeName = (name) => {
    if (!name || typeof name !== "string") return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const renderTableRow = (student) => {
    const safeRead = (path, defaultValue = "") => {
      const parts = path.split(".");
      let current = student;
      for (const part of parts) {
        if (!current) return defaultValue;
        current = current[part];
      }
      return current ?? defaultValue;
    };

    const isLCStudent = safeRead("status") === false;

    // Reusable Data Cells
    const studentNameCell = (
      <td className="p-2 border">
        {capitalizeName(safeRead("firstname"))}{" "}
        {capitalizeName(safeRead("middlename"))}{" "}
        {capitalizeName(safeRead("lastname"))}
      </td>
    );
    const grNoCell = (
      <td className="p-2 border">{safeRead("admission.grno").toUpperCase()}</td>
    );
    const commonCells = (
      <>
        <td className="p-2 border">{safeRead("admission.admissionstd")}</td>
        <td className="p-2 border">
          {safeRead("admission.admissiondivision").toUpperCase()}
        </td>
        <td className="p-2 border">{safeRead("gender")}</td>
        <td className="p-2 border">{safeRead("parent.primarycontact")}</td>
        <td className="p-2 border">
          {isLCStudent ? "Inactive (LC)" : "Active"}
        </td>
        <td className="p-3 border">
          <Link
            to={`edit-student/${safeRead("_id")}?mode=view`}
            className="text-gray-600 hover:text-blue-800 hover:underline mr-3"
          >
            View
          </Link>
          <Link
            to={`edit-student/${safeRead("_id")}`}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Edit
          </Link>
        </td>
      </>
    );

    return (
      <tr key={student._id || student.id} className="hover:bg-gray-50">
        {selectedCard === "Total" && (
          <>
            <td className="p-2 border">{safeRead("admission.admissionno")}</td>
            {studentNameCell}
            {grNoCell}
          </>
        )}
        {selectedCard === "LC Students" && (
          <>
            <td className="p-2 border">
              {safeRead("lcno") || safeRead("admission.admissionno")}
            </td>
            {studentNameCell}
            {grNoCell}
          </>
        )}
        {selectedCard === "New Admission" && (
          <>
            <td className="p-2 border">{safeRead("admission.admissionno")}</td>
            {studentNameCell}
          </>
        )}
        {commonCells}
      </tr>
    );
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="h-full w-full p-6 bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading students...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="h-full w-full p-6 bg-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-300 w-full md:w-96 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500">
            <input
              type="text"
              placeholder="Search by Name/GR/Admission No..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 pr-2"
            />
            <FaSearch className="text-gray-400 ml-2 mr-3" />
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={selectedStd}
              onChange={(e) => setSelectedStd(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm"
            >
              <option value="All">Select Standard</option>
              {AVAILABLE_STANDARDS.filter((s) => s !== "All").map((std) => (
                <option key={std} value={std}>
                  {std}
                </option>
              ))}
            </select>

            <select
              value={selectedDiv}
              onChange={(e) => setSelectedDiv(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm"
            >
              <option value="All">Select Division</option>
              {AVAILABLE_DIVISIONS.filter((d) => d !== "All").map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm"
            >
              {AVAILABLE_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <Link to="/students-admission">
              <button className="flex items-center bg-blue-600 text-white font-medium py-2 px-5 rounded-full shadow-md hover:bg-blue-700 transition-all duration-150 whitespace-nowrap">
                + Add
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {cards.map((card) => (
            <div
              key={card.key}
              onClick={() => setSelectedCard(card.key)}
              className={`cursor-pointer bg-white p-6 rounded-xl shadow text-center hover:bg-gray-100 ${selectedCard === card.key ? "ring-2 ring-blue-500" : ""}`}
            >
              <h3 className="text-lg font-semibold text-gray-700">
                {card.title}
              </h3>
              <p className={`text-2xl font-bold text-${card.color}-600`}>
                {card.count}
              </p>
            </div>
          ))}
        </div>

        {selectedCard ? (
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedCard} Student List
              </h2>
              {/* Updated Filter Result Count Display */}
              <div className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-blue-200">
                Total Student
                {selectedStd !== "All" ? ` (Std ${selectedStd})` : ""}
                {selectedDiv !== "All" ? ` (Div ${selectedDiv})` : ""}:{" "}
                {filteredStudents.length}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 font-semibold">
                  <tr>
                    {getTableHeaders().map((heading, index) => (
                      <th key={index} className="p-2 border">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((student) => renderTableRow(student))}
                  {currentRows.length === 0 && (
                    <tr>
                      <td
                        colSpan={getTableHeaders().length}
                        className="text-center p-4 text-gray-500"
                      >
                        No students found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 px-2">
                <p className="text-sm text-gray-600">
                  Showing {indexOfFirstRow + 1} to{" "}
                  {Math.min(indexOfLastRow, filteredStudents.length)} of{" "}
                  {filteredStudents.length} entries
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    <FaChevronLeft className="text-gray-600 text-xs" />
                  </button>
                  <span className="text-sm font-medium text-gray-700 px-3">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    <FaChevronRight className="text-gray-600 text-xs" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow">
            <h3 className="text-xl font-medium text-gray-600">
              Select a Category
            </h3>
            <p className="text-gray-400 mt-2">
              Click on a card to view the student details.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
