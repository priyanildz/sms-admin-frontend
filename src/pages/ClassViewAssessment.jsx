import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from "../config";
import {
  FaCalendarAlt,
  FaUpload,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronLeft,
} from "react-icons/fa";

// --- REAL MOCK DATA (Replaced with internal data for filtering logic) ---
const ALL_STUDENTS_DATA = [
  {
    firstname: "Seth",
    lastname: "Morris",
    admission: { admissionstd: "10", admissiondivision: "A" },
    _id: "69061911852df401a37301da",
  },
  {
    firstname: "Test3",
    lastname: "Student3",
    admission: { admissionstd: "10", admissiondivision: "A" },
    _id: "6909f1064b7806bd11051a8b",
  },
  {
    firstname: "Aman",
    lastname: "jhsdf",
    admission: { admissionstd: "5", admissiondivision: "" },
    _id: "6909fc78d847ace792c5c1e0",
  },
  {
    firstname: "Khushi",
    lastname: "Agarwal",
    admission: { admissionstd: "2", admissiondivision: "F" },
    _id: "690c995427870801804fdc4c",
  },
  {
    firstname: "Sneha",
    lastname: "Rajput",
    admission: { admissionstd: "10", admissiondivision: "" },
    _id: "69145f1c1eebe6627d6819bd",
  },
  {
    firstname: "Adhrit",
    lastname: "Singh",
    admission: { admissionstd: "10", admissiondivision: "A" },
    _id: "6921d182fcb537683e5633e1",
  },
];

const getStudentListForClass = (standard, division) => {
  // This logic simulates fetching the correct student list based on class context
  return ALL_STUDENTS_DATA.filter(
    (student) =>
      student.admission.admissionstd === standard &&
      student.admission.admissiondivision === division,
  ).map((student, index) => ({
    id: student._id,
    name: `${student.firstname} ${student.lastname}`,
    uploaded: index % 2 === 0,
  }));
};

// --- New Submission Status Modal Component ---
const SubmissionStatusModal = ({ show, onClose, title, students }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        // Using RGBA to create the dimming effect without blurring the backdrop
        backgroundColor: "rgba(50, 50, 50, 0.5)",
      }}
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
          {title} Status
        </h3>
        <div className="max-h-80 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.length === 0 ? (
                <tr>
                  <td
                    colSpan="2"
                    className="px-3 py-4 text-center text-sm text-gray-500"
                  >
                    No students found for this class.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id}>
                    <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-center">
                      {student.uploaded ? (
                        <FaCheckCircle
                          className="text-green-500 inline w-5 h-5"
                          title="Uploaded"
                        />
                      ) : (
                        <FaTimesCircle
                          className="text-red-500 inline w-5 h-5"
                          title="Not Uploaded"
                        />
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
const ClassViewAssessment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const assessmentData = location.state?.assessmentData;
  // Get standard and division from the filter data passed from the list page
  const classStandard =
    location.state?.filters?.standard || assessmentData?.standard;
  const classDivision =
    location.state?.filters?.division || assessmentData?.division;

  const initialMode = location.state?.mode || "add";

  const [mode, setMode] = useState(initialMode);
  const isViewMode = true; // Forced to true for view only

  const [classworkData, setClassworkData] = useState({
    date: "",
    teacherName: "",
    subjectCovered: "",
    topicCovered: "",
    keyPoints: "",
    classActivity: "",
  });

  const [homeworkData, setHomeworkData] = useState({
    homeworkDescription: "",
    submissionDeadline: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [studentList, setStudentList] = useState([]); // Real student data state

  const AUTH_HEADER = "ZjVGZPUtYW1hX2anZHJvaWRfMjAyMzY0MjU=";

  useEffect(() => {
    if (!assessmentData) return;

    const formatDate = (dateValue) => {
      if (!dateValue) return "";
      // Handle MongoDB format {$date: ...} or string
      const dateStr = dateValue.$date || dateValue;
      try {
        const date = new Date(dateStr);
        return date.toISOString().split("T")[0];
      } catch {
        return dateStr;
      }
    };

    setClassworkData({
      date: formatDate(assessmentData.date),
      teacherName: assessmentData.teacherName || "",
      subjectCovered: assessmentData.subjectCovered || "",
      topicCovered: assessmentData.topicCovered || "",
      keyPoints: assessmentData.keyPoints || "",
      classActivity: assessmentData.classActivity || "",
    });

    setHomeworkData({
      // Mapping 'homework' from JSON to 'homeworkDescription' state
      homeworkDescription:
        assessmentData.homework || assessmentData.homeworkDescription || "",
      submissionDeadline: assessmentData.submissionDeadline || "",
    });
  }, [assessmentData]);

  const handleClassworkChange = (field, value) => {
    if (isViewMode) return;
    setClassworkData((prev) => ({ ...prev, [field]: value }));
  };

  const handleHomeworkChange = (field, value) => {
    if (isViewMode) return;
    setHomeworkData((prev) => ({ ...prev, [field]: value }));
  };

  // const openStatusModal = (title) => {
  //   let students = [];

  //   // If actual submissions exist in the fetched data, use them
  //   if (assessmentData?.submissions && assessmentData.submissions.length > 0) {
  //       students = assessmentData.submissions.map((sub, index) => ({
  //           id: sub.rollNo || index,
  //           name: sub.studentName,
  //           uploaded: sub.status === "S" // 'S' usually denotes submitted
  //       }));
  //   } else {
  //       // Fallback to internal filtering logic
  //       students = getStudentListForClass(classStandard, classDivision);
  //   }

  //   setStudentList(students);
  //   setModalTitle(title);
  //   setShowModal(true);
  // };

  const openStatusModal = (title) => {
    let students = [];

    // Identify which data array to use based on the button clicked
    const isActivity = title === "Class Activity";
    const targetData = isActivity
      ? assessmentData?.activitySubmissions
      : assessmentData?.submissions;

    // If actual submissions exist in the fetched data, use them
    if (targetData && targetData.length > 0) {
      students = targetData.map((sub, index) => ({
        id: sub.rollNo || index,
        name: sub.studentName,
        uploaded: sub.status === "S", // 'S' denotes submitted
      }));
    } else {
      // Fallback to internal filtering logic
      students = getStudentListForClass(classStandard, classDivision);
    }

    setStudentList(students);
    setModalTitle(title);
    setShowModal(true);
  };

  const handleSaveAssessment = async () => {
    // Disabled for view mode
  };

  // --- Universal Field Renderer (Adapted for sketch styling) ---
  const FieldRenderer = ({
    label,
    field,
    type = "text",
    placeholder = "",
    isTextarea = false,
    isSelect = false,
    isHomework = false,
    options = [],
  }) => {
    const stateData = isHomework ? homeworkData : classworkData;
    const stateHandler = isHomework
      ? handleHomeworkChange
      : handleClassworkChange;

    const currentValue = stateData[field];
    const displayValue =
      currentValue === "N/A" || currentValue === "Select" ? "" : currentValue;

    // --- Determine rendering element ---
    let inputElement;

    if (isTextarea) {
      // Textarea element
      inputElement = (
        <textarea
          className="border border-gray-400 rounded-md p-2 w-full h-32 bg-gray-50 focus:outline-none"
          value={displayValue}
          readOnly={isViewMode}
          placeholder={placeholder}
        />
      );
    } else if (isSelect) {
      // Select element
      inputElement = (
        <div className="relative">
          <select
            className="border border-gray-400 rounded-md p-2 w-full h-10 appearance-none bg-gray-50 focus:outline-none pr-8"
            value={displayValue}
            disabled={isViewMode}
          >
            <option value="">Select</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      );
    } else if (type === "date") {
      // Date input element
      inputElement = (
        <div className="relative">
          <input
            type="date"
            className="border border-gray-400 rounded-md p-2 w-full h-10 appearance-none bg-gray-50 focus:outline-none pr-10"
            value={displayValue}
            readOnly={isViewMode}
          />
          <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      );
    } else {
      // Default text input element
      inputElement = (
        <input
          type={type}
          className="border border-gray-400 rounded-md p-2 w-full h-10 bg-gray-50 focus:outline-none"
          placeholder={placeholder}
          value={displayValue}
          readOnly={isViewMode}
        />
      );
    }

    return (
      <div className="flex flex-col">
        <label className="text-gray-700 mb-1">{label}:</label>
        {inputElement}
      </div>
    );
  };

  return (
    <MainLayout>
      <SubmissionStatusModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={modalTitle}
        students={studentList}
      />
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-5xl mx-auto border-2 border-gray-300">
          {/* CLASSWORK SECTION */}
          <div className="flex justify-center my-6">
            <div className="bg-blue-100 text-blue-700 px-8 py-2 rounded-full border border-blue-400 font-semibold shadow-md text-lg">
              Classwork
            </div>
          </div>

          {/* NEW SECTION: Standard (Sub) and Division (Div) */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Standard (Sub):</label>
              <input
                type="text"
                readOnly
                className="border border-gray-400 bg-gray-50 rounded-md p-2 w-full h-10 focus:outline-none text-gray-600"
                value={classStandard || ""}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Division (Div):</label>
              <input
                type="text"
                readOnly
                className="border border-gray-400 bg-gray-50 rounded-md p-2 w-full h-10 focus:outline-none text-gray-600"
                value={classDivision || ""}
              />
            </div>
          </div>

          {/* Date & Teacher */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Date:</label>
              <div className="relative">
                <input
                  type="date"
                  readOnly
                  className="border border-gray-400 bg-gray-50 rounded-md p-2 w-full h-10 focus:outline-none pr-10"
                  value={classworkData.date}
                />
                <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Teacher:</label>
              <input
                type="text"
                readOnly
                className="border border-gray-400 bg-gray-50 rounded-md p-2 w-full h-10 focus:outline-none"
                value={classworkData.teacherName}
              />
            </div>
          </div>

          {/* Subject Covered & Topics/Chapters Covered */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
            <FieldRenderer
              label="Subject Covered"
              field="subjectCovered"
              isSelect={true}
              options={["Mathematics", "Science", "History", "English"]}
            />
            <FieldRenderer
              label="Topics/Chapters Covered"
              field="topicCovered"
              type="text"
            />
          </div>

          {/* Key Points or Summary */}
          <div className="flex flex-col w-full mb-8">
            <FieldRenderer
              label="Key Points or Summary"
              field="keyPoints"
              isTextarea={true}
            />
          </div>

          {/* Class Activity */}
          <div className="flex flex-col w-full mb-10">
            <label className="text-gray-700 mb-1">Class Activity:</label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                className="border border-gray-400 bg-gray-50 rounded-md p-2 flex-1 h-10 focus:outline-none"
                value={classworkData.classActivity}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  openStatusModal("Class Activity");
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-1 hover:bg-blue-700 transition"
              >
                <FaUpload className="w-4 h-4" /> View Status
              </button>
            </div>
          </div>

          {/* HOMEWORK SECTION */}
          <div className="flex justify-center my-6">
            <div className="bg-blue-100 text-blue-700 px-8 py-2 rounded-full border border-blue-400 font-semibold shadow-md text-lg">
              Home Work
            </div>
          </div>

          <div className="flex flex-col w-full mb-2">
            <FieldRenderer
              label="Homework Description"
              field="homeworkDescription"
              isTextarea={true}
              isHomework={true}
            />
          </div>

          <div className="flex justify-end w-full mb-8">
            <button
              onClick={(e) => {
                e.preventDefault();
                openStatusModal("Homework");
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-1 hover:bg-blue-700 transition"
            >
              <FaUpload className="w-4 h-4" /> View Status
            </button>
          </div>

          <div className="flex flex-col w-full mb-10">
            <FieldRenderer
              label="Submission Deadline"
              field="submissionDeadline"
              type="text"
              isHomework={true}
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-start items-center pt-4">
            <button
              onClick={() => navigate("/classes-assessment")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md shadow flex items-center gap-2"
            >
              <FaChevronLeft /> Back
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ClassViewAssessment;
