import React from "react";

const EditTimetableModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[95%] max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit Timetable Entry</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Std</label>
            <input type="text" className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Div</label>
            <input type="text" className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input type="date" className="w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Lec No</label>
            <input type="number" className="w-full border rounded px-2 py-1" />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <select className="w-full border rounded px-2 py-1">
            <option value="">Select Subject</option>
            <option value="Maths">Maths</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">From Teacher</label>
          <select className="w-full border rounded px-2 py-1">
            <option value="">Select Teacher</option>
            <option value="Mr. Sharma">Mr. Sharma</option>
            <option value="Ms. Patel">Ms. Patel</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">To Teacher</label>
          <select className="w-full border rounded px-2 py-1">
            <option value="">Select Teacher</option>
            <option value="Mr. Sharma">Mr. Sharma</option>
            <option value="Ms. Patel">Ms. Patel</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditTimetableModal;
