import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config";

const ExamAddPaperRecheck = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [form, setForm] = useState({
    teacher: "", // Assigned Recheck Teacher ID
    standard: "",
    division: "",
    examtype: "", // Added Exam Type
    subject: "",
    papers: "",
    checkedBy: "", // Original Evaluator ID (Hidden)
    checkedByDisplay: "", // Original Evaluator Name (Visible in Input)
  });

  const AUTH_TOKEN = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
  const apiHeaders = {
    "Content-Type": "application/json",
    auth: `${AUTH_TOKEN}`,
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    if (form.standard) {
      fetchSubjects(form.standard);
    } else {
      setSubjects([]);
    }
  }, [form.standard]);

  // Automated Lookup: Fetch Original Evaluator when Class, Subject, or Exam Type changes
  useEffect(() => {
    if (form.standard && form.division && form.subject && form.examtype) {
      fetchOriginalEvaluator();
    }
  }, [form.standard, form.division, form.subject, form.examtype]);

  const fetchTeachers = async () => {
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await fetch(`${API_BASE_URL}api/staff`, {
        method: "GET",
        headers: apiHeaders,
        username: storedUsername,
        role: storedRole,
      });
      const data = await response.json();

      let staffList = [];
      if (Array.isArray(data)) {
        staffList = data;
      } else if (data.success && Array.isArray(data.data)) {
        staffList = data.data;
      }
      setTeachers(staffList);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchSubjects = async (standard) => {
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await fetch(`${API_BASE_URL}api/subjects/${standard}`, {
        method: "GET",
        headers: apiHeaders,
        username: storedUsername,
        role: storedRole,
      });
      const data = await response.json();
      if (
        data.subjects &&
        data.subjects.length > 0 &&
        data.subjects[0].subjects
      ) {
        const subjectList = data.subjects[0].subjects.map((subj) => subj.name);
        setSubjects(subjectList);
      } else {
        setSubjects([]);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setSubjects([]);
    }
  };

  const fetchOriginalEvaluator = async () => {
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await fetch(`${API_BASE_URL}api/assigned-papers`, {
        method: "GET",
        headers: apiHeaders,
        username: storedUsername,
        role: storedRole,
      });
      const result = await response.json();

      if (result.success) {
        // Match evaluation record using standard, division, subject AND examtype
        const match = result.data.find(
          (item) =>
            String(item.standard) === String(form.standard) &&
            String(item.division) === String(form.division) &&
            item.subject === form.subject &&
            item.examtype === form.examtype,
        );

        if (match && match.assignedteacher) {
          setForm((prev) => ({
            ...prev,
            checkedBy: match.assignedteacher._id,
            checkedByDisplay: `${match.assignedteacher.firstname} ${match.assignedteacher.lastname || ""}`,
          }));
        } else {
          setForm((prev) => ({
            ...prev,
            checkedBy: "",
            checkedByDisplay: "No original evaluator found for this exam",
          }));
        }
      }
    } catch (err) {
      console.error("Error fetching original evaluator:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const assignmentData = {
      assignedTo: form.teacher,
      standard: form.standard,
      division: form.division,
      examtype: form.examtype,
      subject: form.subject,
      numberOfPapers: parseInt(form.papers),
      assignedBy: "Admin",
      checkedBy: form.checkedBy,
    };

    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const res = await fetch(`${API_BASE_URL}api/assign-recheck`, {
        method: "POST",
        headers: apiHeaders,
        username: storedUsername,
        role: storedRole,
        body: JSON.stringify(assignmentData),
      });

      const result = await res.json();

      if (res.ok) {
        alert(result.message || "Rechecking assigned successfully");
        navigate("/exams-paper-recheck");
      } else {
        alert(
          `Failed to assign rechecking: ${result.message || result.error || "Unknown error"}`,
        );
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error while saving rechecking: " + err.message);
    }
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-3xl mx-auto">
        <div className="mb-6 pb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Assign Exam Paper Rechecking
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details to assign papers for rechecking.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teacher
            </label>
            <select
              name="teacher"
              value={form.teacher}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Teacher</option>
              {teachers.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.firstname} {t.lastname}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Standard
              </label>
              <select
                name="standard"
                value={form.standard}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                {[
                  "nursey",
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
                ].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Division
              </label>
              <select
                name="division"
                value={form.division}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                {["A", "B", "C", "D", "E"].map((div) => (
                  <option key={div} value={div}>
                    {div}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Exam Type
            </label>
            <select
              name="examtype"
              value={form.examtype}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Exam Type</option>
              <option value="Unit Test 1">Unit Test 1</option>
              <option value="Sem 1">Sem 1</option>
              <option value="Unit Test 2">Unit Test 2</option>
              <option value="Sem 2">Sem 2</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Subject</option>
              {subjects.map((subj, index) => (
                <option key={index} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              No. of Papers
            </label>
            <input
              type="number"
              name="papers"
              value={form.papers}
              onChange={handleChange}
              min="1"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Original Evaluator (Checked By)
            </label>
            <input
              type="text"
              name="checkedByDisplay"
              value={form.checkedByDisplay}
              readOnly
              placeholder="Auto-filled after selections"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-50 text-gray-600 outline-none"
            />
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              type="button"
              onClick={() => navigate("/exams-paper-recheck")}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default ExamAddPaperRecheck;
