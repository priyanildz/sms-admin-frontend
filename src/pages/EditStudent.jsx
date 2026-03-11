import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import MainLayout from "../layout/MainLayout";

// Import your components
import StudentProfile from "./Student Edit/StudentProfile";
import StudentAcademic from "./Student Edit/StudentAcademic";
import FeesManagement from "./Student Edit/StudentFees";
import EventsActivities from "./Student Edit/StudentEvent";
import TransportManagement from "./Student Edit/StudentTransport";
import History from "./Student Edit/StudentHistory";

import { API_BASE_URL } from "../config";

const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

const EditStudent = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isViewMode = queryParams.get("mode") === "view";

  const [studentData, setStudentData] = useState(null);
  const [isLoadingStudent, setIsLoadingStudent] = useState(true);
  const [isActive, setIsActive] = useState(true);

  const fetchStudentData = async () => {
    if (!id) {
      setIsLoadingStudent(false);
      return;
    }
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await axios.post(
        `${API_BASE_URL}api/student-by-id`,
        { id: id },
        {
          headers: {
            auth: AUTH_HEADER,
            username: storedUsername,
            role: storedRole,
          },
        },
      );
      if (response.status === 200) {
        const data = response.data;
        const studentInfo = {
          _id: data._id,
          name: `${data.firstname || ""} ${data.lastname || ""}`.trim(),
          std: data.admission?.admissionstd,
          div: data.admission?.admissiondivision,
          transport: data.transport || {},
          academicHistory: data.academicHistory || null,
          status: data.status,
        };
        setStudentData(studentInfo);
        setIsActive(data.status !== undefined ? Boolean(data.status) : true);
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    } finally {
      setIsLoadingStudent(false);
    }
  };

  useEffect(() => {
    setIsLoadingStudent(true);
    fetchStudentData();
  }, [id]);

  const toggleActive = async () => {
    if (isViewMode) return;
    const newStatus = !isActive;
    setIsActive(newStatus);
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      await axios.put(
        `${API_BASE_URL}api/edit-student/${id}`,
        { status: newStatus },
        {
          headers: {
            auth: AUTH_HEADER,
            username: storedUsername,
            role: storedRole,
          },
        },
      );
      // We don't call fetchStudentData here to avoid "Loading..." flicker,
      // but the local state is now correct.
    } catch (error) {
      setIsActive(!newStatus);
    }
  };

  const sectionComponents = {
    profile: StudentProfile,
    academic: StudentAcademic,
    fees: FeesManagement,
    events: EventsActivities,
    transport: TransportManagement,
    history: History,
  };

  const getCurrentComponent = () => {
    if (isLoadingStudent)
      return <div className="text-center p-10">Loading...</div>;

    const Component = sectionComponents[activeSection] || StudentProfile;

    return (
      <Component
        studentid={id}
        student={studentData}
        refreshStudentData={fetchStudentData}
        isViewMode={isViewMode}
        externalStatus={isActive} // Sync status to child
      />
    );
  };

  return (
    <MainLayout
      activeSection={activeSection}
      onSectionChange={(id) => setActiveSection(id)}
    >
      <div className="h-full w-full p-6">
        {/* Header Title and Toggle moved outside the white box */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h3 className="text-2xl font-semibold">
              {isViewMode ? "Student Profile" : "Edit Student Profile"}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`text-lg font-semibold ${isActive ? "text-green-600" : "text-red-600"}`}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
            <button
              onClick={toggleActive}
              disabled={isLoadingStudent || isViewMode}
              className="relative"
            >
              <div
                className={
                  "rounded-full p-[3px] " +
                  (isActive
                    ? "border-2 border-blue-500"
                    : "border-2 border-gray-300")
                }
                style={{
                  boxShadow: isActive
                    ? "0 0 0 4px rgba(59,130,246,0.12)"
                    : "0 0 0 4px rgba(156,163,175,0.06)",
                }}
              >
                <div
                  className={`w-20 h-10 rounded-full transition-colors duration-200 flex items-center relative ${isActive ? "bg-green-500" : "bg-gray-300"}`}
                >
                  <div
                    className="bg-white w-8 h-8 rounded-full shadow absolute transition-transform duration-200"
                    style={{
                      transform: isActive
                        ? "translateX(44px)"
                        : "translateX(4px)",
                    }}
                  />
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 lg:p-8">
          {getCurrentComponent()}
        </div>
      </div>
    </MainLayout>
  );
};

export default EditStudent;
