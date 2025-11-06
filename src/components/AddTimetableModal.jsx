import React, { useState } from "react";
import SelectField from "./SelectField";

const AddTimetableModal = ({ isOpen, onClose }) => {
  const [standard, setStandard] = useState("");
  const [timing, setTiming] = useState("");

  const stdOptions = ["5th", "6th", "7th"];
  const timingOptions = ["08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00"];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-md p-6 w-full max-w-md shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold mb-6 text-center">Timetable Creation</h3>

        <div className="space-y-4">
          <SelectField
            label="Standard"
            options={stdOptions}
            value={standard}
            onChange={(e) => setStandard(e.target.value)}
          />
          <SelectField
            label="Timings"
            options={timingOptions}
            value={timing}
            onChange={(e) => setTiming(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // handle submit
              onClose();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTimetableModal;
