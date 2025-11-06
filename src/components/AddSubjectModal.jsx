import React, { useEffect, useState } from "react";
import { X } from "lucide-react"; // Assuming you're using lucide-react for the close icon
import axios from "axios";

const AddSubjectModal = ({ isOpen, onClose, teacherOptions }) => {
  const [teacherName, setTeacher] = useState("");
  const [subjects, setSubject] = useState("");
  const [standards, setStandard] = useState("");
  const [divisions, setDivision] = useState("");
  const [weeklyLectures, setWeeklyLectures] = useState("");

  const weeklyLectureOptions = Array.from({ length: 5 }, (_, i) => ({
    value: `${i + 1}`,
    label: `${i + 1}`,
  }));
  if (!isOpen) return null;
  const [teacher, teachername] = teacherName.split(",");
  const formData = {
    teacher,
    teacherName: teachername,
    subjects: subjects.split(",").map((s) => s.trim()), // convert to array
    standards: standards.split(",").map((s) => s.trim()), // convert to array
    divisions: divisions.split(",").map((s) => s.trim()), // convert to array
    weeklyLectures: Number(weeklyLectures), // ensure number
  };

  console.log("form data", formData);

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/allot-subject",
        formData,
        {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
        }
      );
      if (response.status == 200) {
        window.location.href = "/academics-subject-allotment";
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed backdrop-blur-sm inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="relative bg-white border border-gray-300 shadow-xl rounded-lg p-6 w-full max-w-xl pointer-events-auto">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-semibold text-center mb-4">
          Add Subject Allotment
        </h2>

        {/* Fields */}
        <div className="space-y-4">
          {/* Teacher Dropdown */}
          <div>
            <label className="block text-sm font-medium">Teacher Name *</label>
            <select
              value={teacherName}
              onChange={(e) => setTeacher(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Teacher</option>
              {teacherOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Input */}
          <div>
            <label className="block text-sm font-medium">Subject *</label>
            <input
              type="text"
              value={subjects}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter Subject"
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Standard Input */}
          <div>
            <label className="block text-sm font-medium">Standard *</label>
            <input
              type="text"
              value={standards}
              onChange={(e) => setStandard(e.target.value)}
              placeholder="e.g. 5th, 6th"
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Division Input */}
          <div>
            <label className="block text-sm font-medium">
              Division (per Standard) *
            </label>
            <input
              type="text"
              value={divisions}
              onChange={(e) => setDivision(e.target.value)}
              placeholder="e.g. A, B"
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Weekly Lectures Dropdown */}
          <div>
            <label className="block text-sm font-medium">
              Weekly Lectures *
            </label>
            <select
              value={weeklyLectures}
              onChange={(e) => setWeeklyLectures(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Weekly Lectures</option>
              {weeklyLectureOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {
              handleSave(), onClose(); // Close the modal after save
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubjectModal;
