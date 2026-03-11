import React, { useState, useEffect, useCallback } from "react";
import { User, BookOpen, Calendar, Clock, ChevronRight } from "lucide-react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

import StaffProfile from "./Staff Edit/StaffProfile";
import StaffAttendance from "./Staff Edit/StaffAttendance";
import StaffSubjects from "./Staff Edit/StaffSubjects";
import StaffTimetable from "./Staff Edit/StaffTimetable";
import StaffLeave from "./Staff Edit/StaffLeave";
import StaffHistory from "./Staff Edit/StaffHistory";

import { API_BASE_URL } from "../config";

const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

const EditStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const isViewMode = queryParams.get("mode") === "view";

  const pageTitle = isViewMode ? "Staff Profile" : "Edit Staff Profile";

  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [staffData, setStaffData] = useState({
    _id: id,
    staffid: "",
    firstname: "",
    middlename: "",
    lastname: "",
    dob: "",
    maritalstatus: "",
    bloodgroup: "",
    gender: "",
    nationality: "",
    category: "",
    aadharno: "",
    phoneno: "",
    alternatephoneno: "",
    emailaddress: "",
    addressline1: "",
    addressline2: "",
    city: "",
    postalcode: "",
    district: "",
    state: "",
    country: "",
    photo: "",
    highestqualification: "",
    yearofpassing: "",
    specialization: "",
    certificates: "",
    universityname: "",
    totalexperience: "",
    designation: "",
    previousemployer: "",
    subjectstaught: "",
    reasonforleaving: "",
    position: "",
    dept: "",
    preferredgrades: "",
    joiningdate: "",
    bankname: "",
    branchname: "",
    accno: "",
    ifccode: "",
    panno: "",
    transportstatus: "",
    pickuppoint: "",
    droppoint: "",
    modetransport: "",
    status: true,
  });

  const [isActive, setIsActive] = useState(true);

  const fetchStaffData = useCallback(async () => {
    if (!id) return;
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}api/staff/${id}`, {
        headers: {
          auth: AUTH_HEADER,
          username: storedUsername,
          role: storedRole,
        },
      });
      if (!response.ok)
        throw new Error(
          `Failed to fetch staff data. Status: ${response.status}`,
        );
      const data = await response.json();

      const sanitizedData = {};
      //       Object.keys(data).forEach(key => {
      //         sanitizedData[key] = data[key] === null ? "" : data[key];
      //       });
      Object.keys(data).forEach((key) => {
        if (data[key] === null) {
          sanitizedData[key] = "";
        } else if (Array.isArray(data[key])) {
          // Convert arrays to a single string for the <select> components
          sanitizedData[key] = data[key].length > 0 ? data[key][0] : "";
        } else {
          sanitizedData[key] = data[key];
        }
      });

      setStaffData((prev) => ({
        ...prev,
        ...sanitizedData,
        dob: sanitizedData.dob ? sanitizedData.dob.split("T")[0] : "",
        joiningdate: sanitizedData.joiningdate
          ? sanitizedData.joiningdate.split("T")[0]
          : "",
        _id: sanitizedData._id || id,
        designation: sanitizedData.designation || "",
        dept: sanitizedData.dept || "",
        position: sanitizedData.position || "",
        transportstatus: sanitizedData.transportstatus || "",
        status:
          sanitizedData.status !== undefined
            ? Boolean(sanitizedData.status)
            : true,
      }));

      setIsActive(
        sanitizedData.status !== undefined
          ? Boolean(sanitizedData.status)
          : true,
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchStaffData();
  }, [fetchStaffData]);

  const handleInputChange = (e) => {
    if (isViewMode) return;
    const { name, value } = e.target;
    setStaffData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e, photoUrl = null) => {
    e.preventDefault();
    if (isViewMode) {
      alert("Cannot save: You are currently in View Mode.");
      return;
    }

    const dataToSend = {
      ...staffData,
      status: isActive,
      photo: photoUrl || staffData.photo,
      _id: undefined,
    };

    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}api/edit-staff/${staffData.staffid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            auth: AUTH_HEADER,
            username: storedUsername,
            role: storedRole,
          },
          body: JSON.stringify(dataToSend),
        },
      );
      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.message || `Error ${response.status}`);
      }
      await fetchStaffData();
      setError(null);
      alert("Changes saved successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = () => {
    if (isViewMode) return;
    const newStatus = !isActive;
    setIsActive(newStatus);
    setStaffData((prev) => ({ ...prev, status: newStatus }));
  };

  const renderActionButtons = () => {
    if (isViewMode) {
      return (
        <div className="flex justify-end mt-6">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-all duration-200"
          >
            Back to List
          </button>
        </div>
      );
    }
    return null;
  };

  const getCurrentComponent = () => {
    const props = {
      staff: staffData,
      staffid: id,
      refreshStaffData: fetchStaffData,
      isViewMode,
    };

    switch (activeTab) {
      case "profile":
        return (
          <StaffProfile
            staffData={staffData}
            setStaffData={setStaffData}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            isActive={isActive}
            toggleActive={toggleActive}
            loading={loading}
            error={error}
            isViewMode={isViewMode}
          />
        );
      case "attendance":
        return <StaffAttendance {...props} />;
      case "subjects":
        return <StaffSubjects {...props} />;
      case "timetable":
        return <StaffTimetable {...props} />;
      case "leave":
        return <StaffLeave {...props} />;
      case "history":
        return <StaffHistory {...props} />;
      default:
        return <div>Select a valid tab.</div>;
    }
  };

  return (
    <MainLayout
      activeSection={activeTab}
      onSectionChange={(id) => setActiveTab(id)}
      className="min-h-screen bg-gray-50"
    >
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 p-4 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h3 className="text-2xl font-semibold">{pageTitle}</h3>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-lg font-semibold ${isActive ? "text-green-600" : "text-red-600"}`}
              >
                {isActive ? "Active" : "Inactive"}
              </span>
              <button
                onClick={toggleActive}
                disabled={loading || isViewMode}
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
                    className={`w-20 h-10 rounded-full transition-colors duration-200 flex items-center relative ${isActive ? "bg-green-500" : "bg-red-500"}`}
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

          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
            {loading ? (
              <div className="text-center text-gray-600">
                Loading staff data...
              </div>
            ) : error ? (
              <div className="text-center text-red-600">{error}</div>
            ) : !staffData?.staffid ? (
              <div className="text-center text-red-600">
                Error: Staff ID missing or invalid.
              </div>
            ) : (
              <>
                {getCurrentComponent()}
                {renderActionButtons()}
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditStaff;
