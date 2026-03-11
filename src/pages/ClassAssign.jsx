import React, { useState, useEffect, useMemo } from "react";
import MainLayout from "../layout/MainLayout";
import { API_BASE_URL } from "../config";

const STANDARDS = [
  "Nursery",
  "Junior",
  "Senior",
  ...Array.from({ length: 10 }, (_, i) => String(i + 1)),
];
const DIVISIONS = ["A", "B", "C", "D", "E"];
const AUTH_TOKEN = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

// =========================================================================
// ClassAssignmentFormModal Component (Used for Manual Editing)
// =========================================================================
const ClassAssignmentFormModal = ({
  staffs,
  API_BASE_URL,
  AUTH_TOKEN,
  fetchAssignments,
  closeModal,
  editData,
}) => {
  const [formData, setFormData] = useState({
    standard: editData?.standard || "",
    division: editData?.division || "",
    staffid: editData?.staffid || "",
    studentcount: editData?.studentcount || 0,
    student_ids: editData?.student_ids || {},
  });
  const [eligibleTeachers, setEligibleTeachers] = useState([]);
  const [loadingTeachers, setLoadingTeachers] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch eligible core teachers for the dropdown
  useEffect(() => {
    const fetchEligible = async () => {
      if (!formData.standard) return;
      setLoadingTeachers(true);
      try {
        const storedUsername =
          localStorage.getItem("username") || "System_User";
        const storedRole = localStorage.getItem("role") || "admin";
        const res = await fetch(
          `${API_BASE_URL}api/eligible-teachers/${formData.standard}`,
          {
            headers: {
              auth: AUTH_TOKEN,
              username: storedUsername,
              role: storedRole,
            },
          },
        );
        const data = await res.json();

        let list = data;
        // Ensure current teacher stays in the list so they aren't "lost" during edit
        if (editData && editData.staffid) {
          const currentTeacher = staffs.find((s) => s._id === editData.staffid);
          if (currentTeacher && !list.some((s) => s._id === editData.staffid)) {
            list = [currentTeacher, ...list];
          }
        }
        setEligibleTeachers(list);
      } catch (err) {
        console.error("Failed to fetch eligible teachers", err);
      } finally {
        setLoadingTeachers(false);
      }
    };
    fetchEligible();
  }, [formData.standard, editData, API_BASE_URL, AUTH_TOKEN, staffs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    setSubmitting(true);

    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await fetch(
        `${API_BASE_URL}api/classrooms/${editData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            auth: AUTH_TOKEN,
            username: storedUsername,
            role: storedRole,
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Update failed.`);

      setMessage("Updated successfully!");
      await fetchAssignments();
      setTimeout(closeModal, 1000);
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[500]"
      style={{ backgroundColor: "rgba(50, 50, 50, 0.5)" }}
    >
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg mx-4">
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-xl font-bold text-gray-800">
            Change Class Teacher
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-800 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Standard
              </label>
              <input
                type="text"
                value={formData.standard}
                disabled
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-50 text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Division
              </label>
              <input
                type="text"
                value={formData.division}
                disabled
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-50 text-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Class Teacher (Core Staff Only)
            </label>
            <select
              name="staffid"
              value={formData.staffid}
              onChange={(e) =>
                setFormData({ ...formData, staffid: e.target.value })
              }
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">
                {loadingTeachers
                  ? "Loading core teachers..."
                  : "Select Class Teacher"}
              </option>
              {eligibleTeachers.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.firstname} {t.lastname}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting || !formData.staffid}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${submitting ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {submitting ? "Updating..." : "Save Changes"}
          </button>
        </form>
        {message && (
          <div
            className={`mt-4 p-3 rounded-md ${isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default function ClassAssign() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [staffs, setStaffs] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [standardFilter, setStandardFilter] = useState("");
  const [divisionFilter, setDivisionFilter] = useState("");

  const getStaffName = (staffid) => {
    const staff = staffs.find((s) => s._id === staffid);
    return staff ? `${staff.firstname} ${staff.lastname}` : "N/A";
  };

  const fetchAssignments = async () => {
    setIsLoading(true);
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await fetch(`${API_BASE_URL}api/classrooms`, {
        headers: {
          auth: AUTH_TOKEN,
          username: storedUsername,
          role: storedRole,
        },
      });
      const data = await response.json();
      setAssignments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStaffs = async () => {
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await fetch(`${API_BASE_URL}api/staff`, {
        headers: {
          auth: AUTH_TOKEN,
          username: storedUsername,
          role: storedRole,
        },
      });
      const data = await response.json();
      setStaffs(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStaffs();
    fetchAssignments();
  }, []);

  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to remove this classroom record?")
    )
      return;
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await fetch(`${API_BASE_URL}api/classrooms/${id}`, {
        method: "DELETE",
        headers: {
          auth: AUTH_TOKEN,
          username: storedUsername,
          role: storedRole,
        },
      });
      if (!response.ok) throw new Error("Delete failed.");
      fetchAssignments();
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredAssignments = useMemo(() => {
    return assignments.filter((assignment) => {
      const staffName = getStaffName(assignment.staffid).toLowerCase();
      const matchesSearch =
        staffName.includes(searchQuery.toLowerCase()) ||
        assignment.standard
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesStandard =
        standardFilter === "" || assignment.standard === standardFilter;
      const matchesDivision =
        divisionFilter === "" || assignment.division === divisionFilter;

      return matchesSearch && matchesStandard && matchesDivision;
    });
  }, [assignments, searchQuery, standardFilter, divisionFilter, staffs]);

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="w-full md:w-auto">
            <input
              type="text"
              placeholder="Search teacher or standard..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-full md:w-80"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={standardFilter}
              onChange={(e) => setStandardFilter(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-full md:w-32"
            >
              <option value="">All Standards</option>
              {STANDARDS.map((std) => (
                <option key={std} value={std}>
                  {std}
                </option>
              ))}
            </select>
            <select
              value={divisionFilter}
              onChange={(e) => setDivisionFilter(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-full md:w-32"
            >
              <option value="">All Divisions</option>
              {DIVISIONS.map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Classrooms Assigned
          </h2>
        </div>

        <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
          <table className="min-w-full table-collapse text-sm">
            <thead className="bg-blue-50 text-gray-700 font-bold border-b">
              <tr>
                <th className="px-6 py-4 text-left">Standard</th>
                <th className="px-6 py-4 text-left">Division</th>
                <th className="px-6 py-4 text-left">Class Teacher</th>
                <th className="px-6 py-4 text-left">Student Count</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-gray-400"
                  >
                    Loading assignments...
                  </td>
                </tr>
              ) : (
                filteredAssignments.map((assignment) => (
                  <tr
                    key={assignment._id}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {assignment.standard}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {assignment.division}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-200">
                        {getStaffName(assignment.staffid)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {assignment.studentcount}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center space-x-3">
                        <button
                          onClick={() => {
                            setEditingAssignment(assignment);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-800 font-semibold text-xs uppercase tracking-wider"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(assignment._id)}
                          className="text-red-500 hover:text-red-700 font-semibold text-xs uppercase tracking-wider"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              {!isLoading && filteredAssignments.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-gray-500 italic"
                  >
                    No classroom assignments found. Ensure core subjects are
                    allotted first.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <ClassAssignmentFormModal
          staffs={staffs}
          API_BASE_URL={API_BASE_URL}
          AUTH_TOKEN={AUTH_TOKEN}
          fetchAssignments={fetchAssignments}
          closeModal={() => setIsModalOpen(false)}
          editData={editingAssignment}
        />
      )}
    </MainLayout>
  );
}
