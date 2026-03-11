import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { CalendarIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

// Component for a read-only field
const ReadOnlyField = ({
  label,
  value,
  defaultText = "N/A",
  isRequired = true,
}) => (
  <div className="flex flex-col space-y-1">
    <label className="text-sm font-medium text-gray-700">
      {label} {isRequired}
    </label>
    <div className="border border-gray-300 rounded-md p-3 bg-gray-50 text-gray-800 text-base font-medium min-h-[44px] flex items-center shadow-inner">
      <p className="w-full">{value || defaultText}</p>
    </div>
  </div>
);

// Component for the dropdown mimic
const ManagedByDropdownMimic = ({
  label,
  selectedList,
  isDropdownOpen,
  setIsDropdownOpen,
}) => {
  return (
    <div className="flex flex-col space-y-1 relative">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div
        className="relative border border-gray-300 rounded-md bg-gray-50 min-h-[44px] shadow-inner flex items-center px-3 py-2 cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="flex-1 overflow-hidden whitespace-nowrap">
          <span className="text-gray-500">Selected Staff Members</span>
        </div>
        <ChevronDownIcon
          className={`h-5 w-5 text-gray-400 transform transition-transform ml-2 flex-shrink-0 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
        />
      </div>
      {isDropdownOpen && (
        <div className="absolute z-10 w-full top-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <ul className="py-1">
            {selectedList.map((name, index) => (
              <li
                key={index}
                className={`px-3 py-2 text-sm text-gray-700 cursor-default ${index === 0 ? "bg-blue-100" : "hover:bg-gray-50"}`}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Component for the participant list
const ParticipantsListDisplay = ({ participantNames, loading }) => {
  return (
    <div className="mt-8">
      <h4 className="font-semibold text-gray-700 mb-3">
        Selected Participants List
      </h4>
      <div className="space-y-2">
        {loading ? (
          <p className="text-gray-500 italic px-3 pt-2">Loading names...</p>
        ) : participantNames.length > 0 ? (
          participantNames.map((name, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 shadow-sm"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 mr-3 flex-shrink-0"></div>
                <span className="text-base font-medium text-gray-800">
                  {name}
                </span>
              </div>
              <span className="text-blue-500 text-xl font-bold ml-2">›</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic px-3 pt-2">
            No participants selected.
          </p>
        )}
      </div>
    </div>
  );
};

const ViewEvent = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isManagedByDropdownOpen, setIsManagedByDropdownOpen] = useState(false);
  const [participantNames, setParticipantNames] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- Data Initialization & Normalization ---
  const defaultEvent = {
    name: "Unknown Event",
    date: new Date().toISOString(),
    manager: "",
    participants: [],
  };

  const rawEvent = state?.event || defaultEvent;

  // Normalize keys to ensure consistency between MongoDB response and fallback state
  const normalizedEvent = {
    name: rawEvent.eventname || rawEvent.name,
    manager: rawEvent.managedby || rawEvent.manager,
    date: rawEvent.date?.$date || rawEvent.date,
    standard: rawEvent.standard,
    division: rawEvent.division,
    participants: rawEvent.participants || [],
  };

  useEffect(() => {
    // Process participant IDs from Mongo objects or plain strings
    const participantIds = normalizedEvent.participants.map((p) => p.$oid || p);
    if (!participantIds.length) return;

    const fetchNames = async () => {
      setLoading(true);
      try {
        let allStudents = [];
        const standards = normalizedEvent.standard
          ? normalizedEvent.standard.split(",").map((s) => s.trim())
          : [];
        const divisions = normalizedEvent.division
          ? normalizedEvent.division.split(",").map((d) => d.trim())
          : [];

        const storedUsername =
          localStorage.getItem("username") || "System_User";
        const storedRole = localStorage.getItem("role") || "admin";
        // Fetch students based on event standards and divisions
        for (const std of standards) {
          for (const div of divisions) {
            const res = await axios.post(
              `${API_BASE_URL}api/student`,
              { standard: std, division: div },
              {
                headers: {
                  auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
                  username: storedUsername,
                  role: storedRole,
                },
              },
            );
            allStudents = [...allStudents, ...res.data];
          }
        }

        const names = allStudents
          .filter((s) => participantIds.includes(String(s._id)))
          .map((s) => `${s.firstname} ${s.lastname || ""}`.trim());

        setParticipantNames(names);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNames();
  }, [normalizedEvent.standard, normalizedEvent.division]); // Dependency on class filters

  const selectedManagers = normalizedEvent.manager
    ? normalizedEvent.manager
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const formattedDate = normalizedEvent.date
    ? new Date(normalizedEvent.date)
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-")
    : "N/A";

  return (
    <MainLayout>
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-auto border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-center text-gray-700">
              Event Details
            </h2>
          </div>

          <div className="space-y-6">
            <ReadOnlyField label="Event Name" value={normalizedEvent.name} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Date
                </label>
                <div className="border border-gray-300 rounded-md p-3 bg-gray-50 text-gray-800 text-base font-medium min-h-[44px] flex items-center shadow-inner">
                  <CalendarIcon className="w-5 h-5 mr-2 text-gray-500 flex-shrink-0" />
                  <p className="w-full">{formattedDate}</p>
                </div>
              </div>

              <ManagedByDropdownMimic
                label="Managed by"
                selectedList={selectedManagers}
                isDropdownOpen={isManagedByDropdownOpen}
                setIsDropdownOpen={setIsManagedByDropdownOpen}
              />
            </div>

            <ParticipantsListDisplay
              participantNames={participantNames}
              loading={loading}
            />
          </div>

          <div className="flex justify-between pt-8 space-x-4 border-t border-gray-100 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all font-medium"
            >
              Back to Events
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ViewEvent;
