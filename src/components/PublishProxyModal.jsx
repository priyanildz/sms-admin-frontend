import React, { useState, useEffect } from "react";
import axios from "axios";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from "../config";

const PublishProxyModal = ({
  isOpen,
  onClose,
  standard,
  setStandard,
  division,
  setDivision,
  date,
  setDate,
  lecNo,
  setLecNo,
  subject,
  setSubject,
  fromTeacher,
  setFromTeacher,
  toTeacher,
  setToTeacher,
  teacherOptions,
  // --- PROPS FOR FILTERED DROPDOWNS ---
  stdOptions, // Array of standards from allotments
  divisionMap, // Map for all available divisions per standard
  divOptions, // Division options for the currently selected standard
  allotmentList, // Full list of allocations to filter subjects
  fullTimetableData, // NEW: Full data used for client-side conflict check
}) => {
  if (!isOpen) return null;

  const AUTH_HEADER = `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`;
  const [subjectOptionsState, setSubjectOptionsState] = useState([]);

  // --- CONFLICT STATES ---
  const [availableProxyTeachers, setAvailableProxyTeachers] =
    useState(teacherOptions);
  const [isConflict, setIsConflict] = useState(false);
  const [isCheckingConflict, setIsCheckingConflict] = useState(false);
  // ----------------------

  // --- Standard/Division/Subject logic remains unchanged ---
  useEffect(() => {
    if (isOpen && !standard && stdOptions.length > 0) {
      setStandard(stdOptions[0]);
    }

    if (!isOpen) {
      setDivision("");
      // Reset conflict states when closing
      setIsConflict(false);
      setIsCheckingConflict(false);
    }
  }, [isOpen, standard, stdOptions, setStandard]);

  useEffect(() => {
    if (!standard || !division) {
      setSubjectOptionsState([]);
      setSubject("");
      return;
    }
    const matchingAllotments = allotmentList.filter(
      (alloc) =>
        alloc.standards?.[0] === standard && alloc.divisions?.[0] === division,
    );
    const subjectsSet = new Set();
    matchingAllotments.forEach((alloc) => {
      alloc.subjects?.forEach((sub) => {
        if (sub) subjectsSet.add(sub);
      });
    });
    const uniqueSubjects = Array.from(subjectsSet).sort();
    setSubjectOptionsState(
      uniqueSubjects.map((sub) => ({ label: sub, value: sub })),
    );
    if (subject && !uniqueSubjects.includes(subject)) {
      setSubject("");
    }
  }, [standard, division, allotmentList, subject, setSubject]);
  // --- End Standard/Division/Subject logic ---

  // --- CRITICAL FIX: LIVE DROPDOWN FILTERING AND CONFLICT CHECK (Client-side) ---
  useEffect(() => {
    // Run check only if date, lecture number, and timetable data are available
    if (
      !date ||
      !lecNo ||
      fullTimetableData.length === 0 ||
      !teacherOptions.length
    ) {
      setAvailableProxyTeachers(teacherOptions); // Reset to full list
      setIsConflict(false);
      return;
    }

    const checkAvailabilityAndFilter = () => {
      setIsCheckingConflict(true);
      setIsConflict(false);

      const availableTeachers = [];
      const busyTeacherIds = new Set();
      const requestedLecNo = parseInt(lecNo);

      const selectedDate = new Date(date);
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const dayName = days[selectedDate.getUTCDay()];

      // --- 1. Identify ALL busy teachers for the specific time slot ---
      fullTimetableData.forEach((classTimetable) => {
        // Find the schedule for the required day
        const daySchedule = classTimetable.timetable.find(
          (tt) => tt.day === dayName,
        );

        if (daySchedule) {
          // Find the specific period slot
          const period = daySchedule.periods.find(
            (p) => p.periodNumber === requestedLecNo,
          );

          // If a subject is scheduled and a teacher ID is present
          if (
            period &&
            period.teacher &&
            period.subject &&
            period.subject !== "BREAK" &&
            period.subject !== "LUNCH" &&
            period.subject !== "FREE"
          ) {
            busyTeacherIds.add(period.teacher); // Use the raw teacher ID from the timetable data
          }
        }
      });

      // --- 2. Filter available teachers ---
      teacherOptions.forEach((teacher) => {
        if (!busyTeacherIds.has(teacher.value)) {
          availableTeachers.push(teacher);
        }
      });

      // --- 3. Update Filtered Dropdown ---
      setAvailableProxyTeachers(availableTeachers);

      // --- 4. Check for Conflict on currently selected To Teacher ---
      if (toTeacher && busyTeacherIds.has(toTeacher)) {
        setIsConflict(true);
      } else {
        setIsConflict(false);
      }

      setIsCheckingConflict(false);
    };

    // Delay the check slightly to wait for the user to finish typing Lec No/Date
    const timeoutId = setTimeout(checkAvailabilityAndFilter, 300);
    return () => clearTimeout(timeoutId); // Cleanup previous checks
  }, [date, lecNo, fullTimetableData, teacherOptions.length, toTeacher]);
  // --- END LIVE FILTERING FIX ---

  // --- Validation Check ---
  const validateInputs = () => {
    if (
      !standard ||
      !division ||
      !date ||
      !lecNo ||
      !subject ||
      !fromTeacher ||
      !toTeacher
    ) {
      alert(
        "Please fill in all required fields (Standard, Division, Date, Lecture No, Subject, From Teacher, To Teacher).",
      );
      return false;
    }
    if (fromTeacher === toTeacher) {
      alert("The 'From Teacher' and 'To Teacher' must be different.");
      return false;
    }
    if (isConflict) {
      alert(
        "Cannot publish: The selected 'To Teacher' is already scheduled for a class at this time.",
      );
      return false;
    }
    return true;
  };
  const handlePublish = async () => {
    const storedUsername = localStorage.getItem("username") || "System_User";
    const storedRole = localStorage.getItem("role") || "admin";
    if (!validateInputs()) {
      return;
    }
    try {
      const payload = {
        standard,
        division,
        date,
        lecno: lecNo,
        subject,
        fromteacher: fromTeacher,
        toteacher: toTeacher,
      };

      await axios.post(`${API_BASE_URL}api/add-proxy`, payload, {
        headers: {
          auth: AUTH_HEADER,
          username: storedUsername,
          role: storedRole,
        },
      });
      alert("Proxy published successfully");
      onClose(true);
    } catch (error) {
      console.error("Error publishing proxy:", error);
      alert(
        `Failed to publish proxy ❌. Error: ${error.response?.data?.error || "Server error"}`,
      );
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        // Using RGBA to create the dimming effect without blurring the backdrop
        backgroundColor: "rgba(50, 50, 50, 0.5)",
      }}
    >
      <div className="bg-white rounded-md p-6 w-full max-w-md shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Proxy Creation
        </h3>
        {/* Standard + Division */}
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Standard <span className="text-red-500">*</span>
            </label>

            <select
              value={standard}
              onChange={(e) => {
                setStandard(e.target.value);
                setDivision(""); // Reset division when standard changes
                setSubject(""); // Reset subject when standard changes
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Standard</option>

              {stdOptions.map((std) => (
                <option key={std} value={std}>
                  {std}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Division <span className="text-red-500">*</span>
            </label>

            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled={!standard || divOptions.length === 0}
            >
              <option value="">
                {!standard
                  ? "Select Standard first"
                  : divOptions.length === 0
                    ? "No Divisions Allotted"
                    : "Select Division"}
              </option>

              {divOptions.map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Date <span className="text-red-500">*</span>
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        {/* Lec No */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Lec No <span className="text-red-500">*</span>
          </label>

          <input
            type="number"
            value={lecNo || ""}
            onChange={(e) => setLecNo(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        {/* Subject */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Subject <span className="text-red-500">*</span>
          </label>

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            disabled={
              !standard || !division || subjectOptionsState.length === 0
            }
          >
            <option value="">
              {!standard || !division
                ? "Select Standard and Division first"
                : subjectOptionsState.length > 0
                  ? "Select Subject"
                  : "No Subjects Allotted for this Std/Div"}
            </option>

            {subjectOptionsState.map((s, idx) => (
              <option key={idx} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        {/* From Teacher */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            From Teacher <span className="text-red-500">*</span>
          </label>

          <select
            value={fromTeacher}
            onChange={(e) => setFromTeacher(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Teacher</option>
            {teacherOptions.map((t, idx) => (
              <option key={idx} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        {/* To Teacher (Proxy) with Conflict Check */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            To Teacher (Proxy)
            <span className="text-red-500">*</span>
          </label>

          <select
            value={toTeacher}
            onChange={(e) => setToTeacher(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Teacher</option>
            {availableProxyTeachers.map((t, idx) => (
              <option key={idx} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {isCheckingConflict && (
            <p className="text-sm text-yellow-600 mt-1">
              Checking availability...
            </p>
          )}
          {isConflict && (
            <p className="text-sm text-red-600 font-semibold mt-1">
              ⚠️ CONFLICT: Teacher is busy at Lec No. {lecNo} on this date.
            </p>
          )}
        </div>
        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handlePublish}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={
              !standard ||
              !division ||
              !date ||
              !lecNo ||
              !subject ||
              !fromTeacher ||
              !toTeacher ||
              isConflict ||
              isCheckingConflict
            }
          >
            {isCheckingConflict ? "Checking..." : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublishProxyModal;
