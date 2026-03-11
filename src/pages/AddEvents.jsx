import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import Select, { components } from "react-select";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaTimes } from "react-icons/fa"; // Added for consistency, although unused in this form
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config";

// Custom component to hide the selected tags completely (for participants)
const CustomMultiValue = (props) => {
  // If the field is Participants, hide the tags entirely
  if (props.selectProps.name === "participants") {
    return null;
  }
  // Default rendering for Staff/Std/Div if they are multi-selected
  return <components.MultiValue {...props} />;
};

// Helper to structure student data for react-select, including class info for display
const studentToSelectOption = (student) => {
  // Check for standard/division to append class info to the label
  const className =
    student.standard && student.division
      ? ` (Std ${student.standard}-${student.division})`
      : "";
  return {
    value: student._id,
    // Include Std and Div in the label for clarity
    label: `${student.firstname} ${student.lastname || ""}`.trim() + className,
    studentId: student._id || student.id,
    // Store class details explicitly
    standard: student.standard,
    division: student.division,
  };
};

// Helper function to fetch students for ALL selected Std/Div combinations
const fetchStudentsByMultipleClasses = async (
  selectedStandard,
  selectedDivision,
  setError,
  setLoadingStudents,
  setAllStudents,
) => {
  const standards = selectedStandard.map((s) => s.value);
  const divisions = selectedDivision.map((d) => d.value);

  if (standards.length === 0 || divisions.length === 0) {
    setAllStudents([]);
    return;
  }

  setLoadingStudents(true);
  setError("");
  let allFetchedStudents = [];

  try {
    // Iterate through all combinations of selected Standard and Division
    for (const std of standards) {
      for (const div of divisions) {
        try {
          const storedUsername =
            localStorage.getItem("username") || "System_User";
          const storedRole = localStorage.getItem("role") || "admin";
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
          // Combine results from all calls
          allFetchedStudents = [...allFetchedStudents, ...res.data];
        } catch (err) {
          console.warn(`Failed to load students for Std ${std} Div ${div}.`);
        }
      }
    }

    // Remove duplicate students
    const uniqueStudents = Array.from(
      new Map(allFetchedStudents.map((s) => [s._id, s])).values(),
    );

    setAllStudents(uniqueStudents);
  } catch (err) {
    setError("Failed to load students for the selected classes.");
    setAllStudents([]);
  } finally {
    setLoadingStudents(false);
  }
};

const AddEvents = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const staffListFromNav = location.state?.staffList || [];

  // State for all selections
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [selectedManager, setSelectedManager] = useState([]); // Array for multi-select
  const [selectedStandard, setSelectedStandard] = useState([]); // Array for multi-select
  const [selectedDivision, setSelectedDivision] = useState([]); // Array for multi-select

  const [allStudents, setAllStudents] = useState([]); // All students loaded by the selected filters
  const [participantsOptions, setParticipantsOptions] = useState([]); // Options for the Select component

  // Map the staff list to use full names in the dropdown using MongoDB fields
  const staffOptions = staffListFromNav.map((staff) => {
    // Check if a pre-combined 'name' exists (from EventManagement state)
    // Otherwise, combine firstname, middlename, and lastname
    const fullName =
      staff.name ||
      [staff.firstname, staff.middlename, staff.lastname]
        .filter(Boolean)
        .join(" ");

    return {
      value: fullName,
      label: fullName || "Unnamed Staff",
    };
  });

  const [loading, setLoading] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [error, setError] = useState("");

  // Helper to extract simple string values for API calls
  const extractValues = (selectArray) => selectArray.map((item) => item.value);

  // --- NEW: Multi-Class Student Fetch Logic (Replaced old single-class useEffect) ---
  useEffect(() => {
    // Use the new multi-class fetcher
    fetchStudentsByMultipleClasses(
      selectedStandard,
      selectedDivision,
      setError,
      setLoadingStudents,
      setAllStudents,
    );
  }, [selectedStandard, selectedDivision]);

  // --- NEW: Process students for select options ---
  useEffect(() => {
    if (allStudents.length > 0) {
      // Use the helper to include class info in the label
      const options = allStudents.map(studentToSelectOption);
      setParticipantsOptions(options);
    } else {
      setParticipantsOptions([]);
    }

    // Ensure selected participants are still valid options, and remove those that are no longer available
    const availableIds = new Set(allStudents.map((s) => s._id));
    setSelectedParticipants((prev) =>
      prev.filter((p) => availableIds.has(p.value)),
    );
  }, [allStudents]);

  // The simplified formData is now just a single object for name/date/std/div
  const [eventDetails, setEventDetails] = useState({ eventName: "", date: "" });

  const handleDetailInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handler to remove participant from the list below the dropdown
  const handleRemoveParticipant = (participantIdToRemove) => {
    setSelectedParticipants((prevParticipants) =>
      prevParticipants.filter((p) => p.value !== participantIdToRemove),
    );
  };

  // Get current date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const validateForm = () => {
    const isCoreFormValid =
      eventDetails.eventName && eventDetails.date && selectedManager.length > 0;

    if (!isCoreFormValid) {
      return false;
    }

    if (eventDetails.date < today) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError(
        "Please fill all required fields (Event Name, Date, Managed By) and ensure the date is current or future.",
      );
      return;
    }
    setError("");
    setLoading(true);

    try {
      const eventData = {
        eventname: eventDetails.eventName,
        date: eventDetails.date,
        managedby: extractValues(selectedManager).join(", "), // Send comma-separated list of managers
        standard: extractValues(selectedStandard).join(", "), // Send comma-separated list of standards
        division: extractValues(selectedDivision).join(", "), // Send comma-separated list of divisions
        participants: extractValues(selectedParticipants), // Send array of student IDs
      };

      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await axios.post(
        `${API_BASE_URL}api/addevent`,
        eventData,
        {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
            username: storedUsername,
            role: storedRole,
          },
        },
      );

      if (response.status >= 400) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("Event created successfully!");
      navigate("/events");
    } catch (err) {
      console.error("Error creating event:", err);
      setError(err.message || "Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // The logic to enable participant selection is now based on whether any classes are selected
  const classesSelected =
    selectedStandard.length > 0 && selectedDivision.length > 0;
  const isParticipantsSelectable =
    classesSelected && participantsOptions.length > 0;

  return (
    <MainLayout>
      <div className="p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-8">
            Event Creation
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div>
              {/* Row 1: Event Name - Full Width */}
              <div className="mb-4">
                <label
                  htmlFor="eventName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Event Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="eventName"
                  name="eventName"
                  value={eventDetails.eventName}
                  onChange={handleDetailInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Row 2: Date and Managed By - Side by Side */}
              <div className="grid grid-cols-2 gap-6 mb-4">
                {/* Date */}
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={eventDetails.date}
                    onChange={handleDetailInputChange}
                    min={today}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Managed By DROP-DOWN (Multi-Select) */}
                <div>
                  <label
                    htmlFor="managedBy"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Managed by <span className="text-red-500">*</span>
                  </label>
                  <Select
                    options={staffOptions}
                    isMulti
                    name="managedBy"
                    value={selectedManager}
                    onChange={setSelectedManager}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Select Staff Member(s)"
                    required
                  />
                </div>
              </div>

              {/* Row 3: Std and Div (Multi-Select) */}
              <div className="grid grid-cols-2 gap-6 mb-4">
                {/* Standard Dropdown (Multi-Select) */}
                <div>
                  <label
                    htmlFor="standard"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Std
                  </label>
                  <Select
                    options={[
                      { value: "Nursery", label: "Nursery" },
                      { value: "Junior", label: "Junior" },
                      { value: "Senior", label: "Senior" },
                      ...Array.from({ length: 10 }, (_, i) => ({
                        value: (i + 1).toString(),
                        label: (i + 1).toString(),
                      })),
                    ]}
                    isMulti
                    name="standard"
                    value={selectedStandard}
                    onChange={setSelectedStandard}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Select Standard(s)"
                  />
                </div>

                {/* Division Dropdown (Multi-Select) */}
                <div>
                  <label
                    htmlFor="division"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Div
                  </label>
                  <Select
                    options={["A", "B", "C", "D", "E"].map((div) => ({
                      value: div,
                      label: div,
                    }))}
                    isMulti
                    name="division"
                    value={selectedDivision}
                    onChange={setSelectedDivision}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Select Division(s)"
                  />
                </div>
              </div>

              {/* Row 4: Participants Selection Dropdown (Multi-Select component) */}
              <div className="mb-4">
                <label
                  htmlFor="participants"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Participants
                </label>
                <div className="flex items-center space-x-0">
                  <Select
                    options={participantsOptions}
                    isMulti
                    name="participants"
                    value={selectedParticipants}
                    onChange={setSelectedParticipants}
                    components={{ MultiValue: CustomMultiValue }}
                    className="basic-multi-select flex-1 w-full"
                    classNamePrefix="select"
                    placeholder={
                      classesSelected
                        ? loadingStudents
                          ? "Loading students..."
                          : "Select participants from the loaded list"
                        : "Select at least one Std and one Div to load students"
                    }
                    isDisabled={!isParticipantsSelectable}
                    isLoading={loadingStudents}
                    maxMenuHeight={200}
                    styles={{
                      container: (base) => ({
                        ...base,
                        flex: 1,
                        minHeight: "38px",
                      }),
                    }}
                  />
                </div>
              </div>

              {/* Row 5: Participants List section - Shows names with removal button */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Selected Participants List
                </h4>
                <div className="space-y-2">
                  {selectedParticipants.map((participant) => (
                    <div
                      key={participant.value}
                      className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-lg shadow-sm"
                    >
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-500 mr-3"></div>
                        <span className="text-gray-800">
                          {participant.label}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveParticipant(participant.value)
                        }
                        className="text-red-500 p-1 hover:bg-red-100 rounded-full transition duration-150"
                        title={`Remove ${participant.label}`}
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  {selectedParticipants.length === 0 && (
                    <p className="text-sm text-gray-500 text-center pt-2">
                      No participants selected.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons at the bottom */}
            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={() => navigate("/events")}
                className="px-6 py-2 mr-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                disabled={loading || loadingStudents}
              >
                Cancel
              </button>

              <button
                type="submit"
                className={`px-6 py-2 rounded-lg text-white transition ${
                  loading || !validateForm()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
                disabled={loading || !validateForm()}
              >
                {loading ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Create Event
                  </span>
                ) : (
                  "Create Event"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default AddEvents;
