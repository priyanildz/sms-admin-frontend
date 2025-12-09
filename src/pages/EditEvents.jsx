// pages/EditEvents.jsx

import React, { useState, useEffect, useMemo } from "react";
import MainLayout from "../layout/MainLayout";
import Select, { components } from "react-select";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { FaTimes } from "react-icons/fa"; 
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config";

// Custom component to hide the selected tags completely (for participants)
const CustomMultiValue = (props) => {
    // Hide tags only for the 'participants' field
    if (props.selectProps.name === 'participants') {
        return null; 
    }
    // For ManagedBy/Std/Div, use default rendering if tags are allowed, or return null for consistency
    return null;
};

// Helper function to strip the staff ID from stored values (e.g., "Name (ID)")
const cleanStaffName = (managedByValue) => {
    if (!managedByValue) return "";
    // Regex to capture everything before the opening parenthesis
    const match = managedByValue.match(/(.+?)\s+\([^)]+\)$/);
    if (match && match[1]) {
        return match[1].trim();
    }
    return managedByValue; 
};

// Helper to convert a comma-separated string from the database (e.g., "5,Junior") 
// into an array of { value: '5', label: '5' } objects for react-select.
const stringToArrayOfSelectOptions = (valueString) => {
    if (!valueString) return [];
    // Split by comma, trim whitespace, and filter empty strings
    const values = valueString.split(',').map(s => s.trim()).filter(s => s.length > 0);
    
    return values.map(v => ({ 
        value: v, 
        label: cleanStaffName(v) 
    }));
};

// Helper function to fetch students for ALL selected Std/Div combinations
const fetchStudentsByMultipleClasses = async (selectedStandard, selectedDivision, setError, setLoadingStudents, setAllStudents) => {
    const standards = selectedStandard.map(s => s.value);
    const divisions = selectedDivision.map(d => d.value);

    if (standards.length === 0 || divisions.length === 0) {
        setAllStudents([]);
        return;
    }

    setLoadingStudents(true);
    setError("");
    let allFetchedStudents = [];

    try {
        for (const std of standards) {
            for (const div of divisions) {
                try {
                    const res = await axios.post(
                        `${API_BASE_URL}api/student`,
                        { standard: std, division: div },
                        { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } }
                    );
                    allFetchedStudents = [...allFetchedStudents, ...res.data];
                } catch (err) {
                    console.warn(`Failed to load students for Std ${std} Div ${div}.`);
                }
            }
        }
        
        const uniqueStudents = Array.from(new Map(allFetchedStudents.map(s => [s._id, s])).values());
        
        setAllStudents(uniqueStudents);
    } catch (err) {
        setError("Failed to load students for the selected classes.");
        setAllStudents([]);
    } finally {
        setLoadingStudents(false);
    }
};

// Helper to structure student data for react-select, including class info for display
const studentToSelectOption = (student) => {
    const className = student.standard && student.division ? ` (Std ${student.standard}-${student.division})` : '';
    return {
        value: student._id,
        label: `${student.firstname} ${student.lastname || ""}`.trim() + className,
        studentId: student._id || student.id,
        // Store class details explicitly to make sure selected list is complete
        standard: student.standard, 
        division: student.division,
    };
};

// This function now relies on originalEvent data to pre-select students
const getInitialSelectedParticipants = (originalEvent, allStudents) => {
    if (!originalEvent.participants || allStudents.length === 0) return [];

    return originalEvent.participants.map(pId => {
        const idToMatch = typeof pId === 'object' && pId !== null ? pId._id : pId;
        const student = allStudents.find(s => s._id === idToMatch);
        
        if (student) {
            // Use the comprehensive helper to structure the selected object
            return studentToSelectOption(student);
        }
        return null;
    }).filter(p => p !== null);
};


const EditEvents = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    
    const originalEvent = location.state?.event || {}; 
    const staffListFromNav = location.state?.staffList || [];

    // --- STATE INITIALIZATION WITH PRE-FILLED MULTI-SELECT ARRAYS ---
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [selectedManager, setSelectedManager] = useState(stringToArrayOfSelectOptions(originalEvent.managedby));
    const [selectedStandard, setSelectedStandard] = useState(stringToArrayOfSelectOptions(originalEvent.standard));
    const [selectedDivision, setSelectedDivision] = useState(stringToArrayOfSelectOptions(originalEvent.division));
    
    const [allStudents, setAllStudents] = useState([]); // All students loaded by the selected filters
    const [participantsOptions, setParticipantsOptions] = useState([]); // Options merged for the Select component
    
    const staffOptions = staffListFromNav.map(staff => ({
        value: staff.name,
        label: staff.name
    }));

    const [formData, setFormData] = useState({
        eventname: originalEvent.eventname || "", 
        date: originalEvent.date ? new Date(originalEvent.date).toISOString().split("T")[0] : "",
    });
    
    const [loading, setLoading] = useState(false);
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [error, setError] = useState("");
    
    const extractValues = (selectArray) => selectArray.map(item => item.value);

    // --- HANDLERS ---
    const handleRemoveParticipant = (participantIdToRemove) => {
        setSelectedParticipants(prevParticipants => 
            prevParticipants.filter(p => p.value !== participantIdToRemove)
        );
    };

    // 1. Fetch students when selected classes change
    useEffect(() => {
        fetchStudentsByMultipleClasses(selectedStandard, selectedDivision, setError, setLoadingStudents, setAllStudents);
    }, [selectedStandard, selectedDivision]);


    // 2. Process students for select options and handle persistence of selections
    useEffect(() => {
        const newAvailableOptions = allStudents.map(studentToSelectOption);
        
        // Map existing selected IDs to easily check if they are still available
        const currentSelectedIds = new Set(selectedParticipants.map(p => p.value));
        const newAvailableIds = new Set(newAvailableOptions.map(p => p.value));
        
        // Identify selected students that are NO LONGER in the newly loaded list
        const missingSelectedStudents = selectedParticipants.filter(p => !newAvailableIds.has(p.value));

        // Combine the newly available options with the missing selected students to form the full options list
        // This ensures the labels for previously selected students (now 'missing') remain intact in the selection input
        const mergedOptions = [...newAvailableOptions, ...missingSelectedStudents].filter((v, i, a) => 
            a.findIndex(t => (t.value === v.value)) === i
        );

        setParticipantsOptions(mergedOptions);

        // --- Handle Initial Load / Selection Persistence ---
        if (allStudents.length > 0 && originalEvent.participants && selectedParticipants.length === 0) {
            // Initial load: Pre-select participants that match the event's participant list
            const initialSelections = getInitialSelectedParticipants(originalEvent, allStudents);
            setSelectedParticipants(initialSelections);
        } else if (classesSelected) {
             // Handle state persistence when classes change:
             // Update selected participants list with the new, clean options (important to avoid old structure errors)
            const updatedSelected = selectedParticipants.map(p => 
                mergedOptions.find(m => m.value === p.value) || p
            ).filter(p => p !== null);
            
            setSelectedParticipants(updatedSelected);
        } else {
             // If classes are cleared, wipe the available options but keep the selected list
             // This is usually handled by the input filters but setting it explicitly helps.
             if (selectedStandard.length === 0 || selectedDivision.length === 0) {
                 // Clear available options, but the selected state remains.
                 setParticipantsOptions([]);
             }
        }
        
    }, [allStudents, originalEvent.participants, selectedStandard, selectedDivision]);


    // --- FORM HANDLERS ---
    const handleDetailInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const today = new Date().toISOString().split("T")[0];
        
        const isFormValid = (
            formData.eventname &&
            formData.date &&
            selectedManager.length > 0 
        );

        if (!isFormValid || formData.date < today) {
            return false;
        }
        return true;
    };

    // --- UPDATE (PUT) HANDLER ---
    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setError("Please fill all required fields (Name, Date, Manager) and ensure the date is current or future.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            // Send comma-separated strings for multi-select fields
            const eventData = {
                eventname: formData.eventname,
                date: formData.date,
                managedby: extractValues(selectedManager).join(', '), 
                standard: extractValues(selectedStandard).join(', '), 
                division: extractValues(selectedDivision).join(', '),
                participants: extractValues(selectedParticipants),
            };

            const response = await axios.put(
                `${API_BASE_URL}api/events/${originalEvent._id}`,
                eventData,
                { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } }
            );

            if (response.status >= 400) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            alert("Event updated successfully!");
            navigate("/events");

        } catch (err) {
            console.error("Error updating event:", err);
            setError(err.message || "Failed to update event. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    
    // --- DELETE HANDLER ---
    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to permanently delete event "${originalEvent.eventname}"?`)) {
            return;
        }
        
        setLoading(true);
        setError("");
        
        try {
            await axios.delete(
                `${API_BASE_URL}api/events/${originalEvent._id}`,
                { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } }
            );
            
            alert("Event deleted successfully!");
            navigate("/events");
        } catch (err) {
            console.error("Error deleting event:", err);
            setError(err.message || "Failed to delete event.");
        } finally {
            setLoading(false);
        }
    };

    const classesSelected = selectedStandard.length > 0 && selectedDivision.length > 0;
    const isParticipantsSelectable = classesSelected && participantsOptions.length > 0;
    const today = new Date().toISOString().split("T")[0];


    return (
        <MainLayout>
            <div className="p-6">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-red-600 mb-8">
                        {originalEvent.eventname}
                    </h2>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleUpdate}>
                        {/* --- FORM STRUCTURE --- */}
                        <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                            
                            {/* Row 1: Event Name */}
                            <div className="mb-4">
                                <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Event Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="eventName"
                                    name="eventname"
                                    value={formData.eventname}
                                    onChange={handleDetailInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    required
                                />
                            </div>

                            {/* Row 2: Date and Managed By (Multi-Select) */}
                            <div className="grid grid-cols-2 gap-6 mb-4">
                                {/* Date */}
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                                        Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleDetailInputChange}
                                        min={today}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        required
                                    />
                                </div>

                                {/* Managed By DROP-DOWN (Multi-Select) */}
                                <div>
                                    <label htmlFor="managedBy" className="block text-sm font-medium text-gray-700 mb-1">
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
                                    />
                                </div>
                            </div>

                            {/* Row 3: Std and Div (Multi-Select) */}
                            <div className="grid grid-cols-2 gap-6 mb-4">
                                {/* Standard Dropdown (Multi-Select) */}
                                <div>
                                    <label htmlFor="standard" className="block text-sm font-medium text-gray-700 mb-1">
                                        Std 
                                    </label>
                                    <Select
                                        options={[
                                            { value: "Nursery", label: "Nursery" },
                                            { value: "Junior", label: "Junior" },
                                            { value: "Senior", label: "Senior" },
                                            ...Array.from({ length: 10 }, (_, i) => ({ value: (i + 1).toString(), label: (i + 1).toString() }))
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
                                    <label htmlFor="division" className="block text-sm font-medium text-gray-700 mb-1">
                                        Div
                                    </label>
                                    <Select
                                        options={["A", "B", "C", "D", "E"].map(div => ({ value: div, label: div }))}
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
                            
                            {/* Row 4: Participants Selection */}
                            <div className="mb-4">
                                <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-1">
                                    Participants
                                </label>
                                <div className="flex items-center space-x-0">
                                    <Select
                                        options={participantsOptions}
                                        isMulti
                                        name="participants"
                                        value={selectedParticipants}
                                        onChange={setSelectedParticipants}
                                        // Use the CustomMultiValue component to hide names in the input box
                                        components={{ MultiValue: CustomMultiValue }}
                                        className="basic-multi-select flex-1 w-full"
                                        classNamePrefix="select"
                                        placeholder={
                                            classesSelected ? 
                                            (loadingStudents ? "Loading students..." : "Select participants from the loaded list") : 
                                            "Select at least one Std and one Div to load students"
                                        }
                                        isDisabled={!isParticipantsSelectable}
                                        isLoading={loadingStudents}
                                    />
                                </div>
                            </div>

                            {/* Participants List section - NOW WITH REMOVAL BUTTONS AND CLASS INFO */}
                            <div className="mt-6">
                                <h4 className="font-semibold text-gray-700 mb-2">Selected Participants List</h4>
                                <div className="space-y-2">
                                    {selectedParticipants.map(participant => (
                                        <div key={participant.value} className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-full bg-blue-500 mr-3"></div>
                                                <span className="text-gray-800">{participant.label}</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveParticipant(participant.value)}
                                                className="text-red-500 p-1 hover:bg-red-100 rounded-full transition duration-150"
                                                title={`Remove ${participant.label}`}
                                            >
                                                <FaTimes className="w-4 h-4" /> 
                                            </button>
                                        </div>
                                    ))}
                                    {selectedParticipants.length === 0 && (
                                        <p className="text-sm text-gray-500 text-center pt-2">No participants selected.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons at the bottom: Delete and Update */}
                        <div className="flex justify-between mt-8">
                            
                            <div className="flex space-x-4">
                                {/* 1. DELETE Button */}
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={loading}
                                    className="px-6 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 transition"
                                >
                                    {loading ? "Deleting..." : "Delete Event"}
                                </button>

                                {/* 2. BACK/CANCEL Button */}
                                <button
                                    type="button"
                                    onClick={() => navigate("/events")}
                                    disabled={loading || loadingStudents}
                                    className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                                >
                                    Back to Events
                                </button>
                            </div>
                            
                            {/* 3. UPDATE Button */}
                            <button
                                type="submit"
                                disabled={loading || !validateForm()}
                                className={`px-6 py-2 rounded-lg text-white transition ${
                                    loading || !validateForm() ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                                }`}
                            >
                                {loading ? "Updating..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
};

export default EditEvents;