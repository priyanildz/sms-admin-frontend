import React from "react";

const AddVehicleModal = ({ show, onClose, onSave, formData, setFormData }) => {
  if (!show) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50"
    
            style={{ 
                // Using RGBA to create the dimming effect without blurring the backdrop
                backgroundColor: 'rgba(50, 50, 50, 0.5)', 
            }}>
      <div className="bg-white rounded-md shadow-md w-full max-w-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Add Vehicle</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Vehicle Type *
            </label>
            <select
              className="border p-2 rounded-lg"
              value={formData.vehiclename}
              onChange={handleChange}
              name="vehiclename"
            >
              <option value="bus">Bus</option>
              <option value="van">Van</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Capacity *
            </label>
            <input
              name="capacity"
              type="text"
              placeholder="e.g 7"
              className="border px-3 py-2 rounded-md"
              value={formData.capacity}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Registration Contact Number *
            </label>
            <input
              name="regno"
              type="text"
              placeholder="e.g 9320x xxxxx"
              className="border px-3 py-2 rounded-md"
              value={formData.regno}
              onChange={handleChange}
            />
          </div>

          {/* <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">Assign Route</label>
            <input
              name="assignedroute"
              type="text"
              className="border px-3 py-2 rounded-md"
              value={formData.assignedroute}
              onChange={handleChange}
            />
          </div> */}

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Vehicle No *
            </label>
            <input
              name="vehicleno"
              type="text"
              placeholder="e.g MH12AB1234"
              className="border px-3 py-2 rounded-md"
              value={formData.vehicleno}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              Status *
            </label>
            <select
              className="border p-2 rounded-lg"
              value={formData.status}
              onChange={handleChange}
              name="status"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVehicleModal;
