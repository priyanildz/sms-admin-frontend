import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { API_BASE_URL } from "../config";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Updated constants to show individual grades in the dropdown
const GRADES_OPTIONS = [
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
const POSITIONS = [
  "",
  "Principal",
  "Vice-Principal",
  "HOD",
  "Teacher",
  "Librarian",
  "IT Staff",
  "Bus Driver",
  "Cleaner",
];

export default function StaffManagement() {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const storedUsername =
          localStorage.getItem("username") || "System_User";
        const storedRole = localStorage.getItem("role") || "admin";
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}api/staff`, {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
            username: storedUsername,
            role: storedRole,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStaffList(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching staffs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffs();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCard, searchQuery, positionFilter, gradeFilter]);

  const totalStaff = staffList.length;
  const newStaff = staffList.filter(
    (staff) => staff.status === "Active" || staff.status === true,
  ).length;

  const resignedStaff = staffList.filter(
    (staff) => staff.status !== "Active" && staff.status !== true,
  ).length;

  const cards = [
    { title: "Total Staff", count: totalStaff, color: "blue", key: "Total" },
    {
      title: "Resigned Staff",
      count: resignedStaff,
      color: "red",
      key: "Resigned",
    },
    { title: "New Staff", count: newStaff, color: "green", key: "New" },
  ];

  const getFilteredStaff = () => {
    let filtered = staffList;

    if (selectedCard === "New") {
      filtered = filtered.filter(
        (staff) => staff.status === "Active" || staff.status === true,
      );
    } else if (selectedCard === "Resigned") {
      filtered = filtered.filter(
        (staff) => staff.status !== "Active" && staff.status !== true,
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((staff) => {
        const fullName =
          `${staff.firstname || ""} ${staff.middlename || ""} ${staff.lastname || ""}`.toLowerCase();
        const staffId = staff.staffid ? staff.staffid.toLowerCase() : "";
        return fullName.includes(query) || staffId.includes(query);
      });
    }

    if (positionFilter) {
      filtered = filtered.filter(
        (staff) =>
          staff.role?.position?.toLowerCase() === positionFilter.toLowerCase(),
      );
    }

    if (gradeFilter) {
      filtered = filtered.filter((staff) => {
        // This is the value coming from your backend (e.g., "Primary")
        const staffBackendCategory =
          staff.role?.preferredgrades?.toString().toLowerCase() || "";

        // Logic to map the selected individual grade to the backend category
        if (
          ["nursery", "junior", "senior"].includes(gradeFilter.toLowerCase())
        ) {
          return staffBackendCategory === "pre-primary";
        }
        if (["1", "2", "3", "4", "5"].includes(gradeFilter)) {
          return staffBackendCategory === "primary";
        }
        if (["6", "7", "8", "9", "10"].includes(gradeFilter)) {
          return staffBackendCategory === "secondary";
        }
        return false;
      });
    }

    return filtered;
  };

  const filteredStaff = getFilteredStaff();

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredStaff.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredStaff.length / rowsPerPage);

  if (loading) {
    return (
      <MainLayout>
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading staff data...</p>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <div className="text-red-600 mb-4">
            Error loading staff data: {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        {/* Search & Filters */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Search staff by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-3 py-2 rounded-md border border-gray-300 text-sm"
          />

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="">Filter by Position</option>
              {POSITIONS.filter((p) => p !== "").map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="">Filter by Grade</option>
              {GRADES_OPTIONS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {cards.map((card) => (
            <div
              key={card.key}
              onClick={() => setSelectedCard(card.key)}
              className={`cursor-pointer bg-white p-6 rounded-xl shadow text-center hover:bg-gray-100 transition 
                ${selectedCard === card.key ? `ring-2 ring-${card.color}-500 bg-${card.color}-50` : ""}`}
            >
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className={`text-2xl font-bold text-${card.color}-600`}>
                {card.count}
              </p>
            </div>
          ))}
        </div>

        {selectedCard ? (
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {selectedCard} Staff List
              </h2>
              <div className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-blue-200">
                Total Found: {filteredStaff.length}
              </div>
            </div>

            {filteredStaff.length === 0 ? (
              <div className="text-center p-8 text-gray-500">
                <h3 className="text-lg font-medium">No Staff Found</h3>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 text-sm">
                    <thead className="bg-blue-100 font-semibold">
                      <tr>
                        <th className="p-3 border">Sr No.</th>
                        <th className="p-3 border">Staff Name</th>
                        <th className="p-3 border">Staff Reg. No.</th>
                        <th className="p-3 border">Dept</th>
                        <th className="p-3 border">Gender</th>
                        <th className="p-3 border">Contact No</th>
                        <th className="p-3 border">Status</th>
                        <th className="p-3 border">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRows.map((staff, index) => (
                        <tr key={staff._id} className="hover:bg-gray-50">
                          <td className="p-3 border">
                            {indexOfFirstRow + index + 1}
                          </td>
                          <td className="p-3 border">
                            {staff.firstname} {staff.middlename}{" "}
                            {staff.lastname}
                          </td>
                          <td className="p-3 border">{staff.staffid}</td>
                          <td className="p-3 border">
                            {staff.role?.dept || "None"}
                          </td>
                          <td className="p-3 border capitalize">
                            {staff.gender}
                          </td>
                          <td className="p-3 border">{staff.phoneno}</td>
                          <td className="p-3 border">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium 
                              ${staff.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                            >
                              {staff.status ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="p-3 border">
                            <Link
                              to={`/edit-staff/${staff._id}?mode=view`}
                              className="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 mr-2"
                            >
                              View
                            </Link>
                            <Link
                              to={`/edit-staff/${staff._id}`}
                              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                            >
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6 px-2">
                    <p className="text-sm text-gray-600">
                      Showing {indexOfFirstRow + 1} to{" "}
                      {Math.min(indexOfLastRow, filteredStaff.length)} of{" "}
                      {filteredStaff.length} entries
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
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages),
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                      >
                        <FaChevronRight className="text-gray-600 text-xs" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="text-center p-8 text-gray-500">
            <h3 className="text-lg font-medium">Select a Category</h3>
            <p>Click on a card to view the staff details.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
