import React, { useState, useEffect } from "react";
import SelectField from "./SelectField";
import axios from "axios";

const VehicleStaffModal = ({ isOpen, onClose }) => {
  const [drivers, setDrivers] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [vehicleNo, setVehicleNo] = useState([]);

  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedSupervisor, setSelectedSupervisor] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const driversRes = await axios.get("http://localhost:5000/api/drivers", {
        headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" },
      });

      const driverNames = [
        ...new Set(driversRes.data.map((item) => item.driverName)),
      ].filter(Boolean);

      const supervisorNames = [
        ...new Set(driversRes.data.map((item) => item.supervisorName)),
      ].filter(Boolean);

      const vehiclesRes = await axios.get("http://localhost:5000/api/vehicles", {
        headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" },
      });

      const vehicleNos = [
        ...new Set(vehiclesRes.data.map((item) => item.vehicleno)),
      ].filter(Boolean);

      setDrivers(driverNames);
      setSupervisors(supervisorNames);
      setVehicleNo(vehicleNos);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data");
      setDrivers([]);
      setSupervisors([]);
      setVehicleNo([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = {
        vid: selectedVehicle,
        driverName: selectedDriver,
        supervisorName: selectedSupervisor,
      };
      console.log('payload: ', payload)
      await axios.post("http://localhost:5000/api/add-driver", payload, {
        headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" },
      });

      alert("Driver/Supervisor assigned successfully!");
      onClose();
    } catch (err) {
      console.error("Error submitting data:", err);
      setError("Failed to submit data");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50">
      <div className="bg-white rounded-md p-6 w-full max-w-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Add Driver / Supervisor
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Vehicle No Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle No
            </label>
            <SelectField
              options={vehicleNo}
              value={selectedVehicle}
              onChange={setSelectedVehicle}
              placeholder={loading ? "Loading vehicle nos..." : "Select Vehicle No"}
              disabled={loading}
            />
          </div>

          {/* Driver Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Driver
            </label>
            <SelectField
              options={drivers}
              value={selectedDriver}
              onChange={setSelectedDriver}
              placeholder={loading ? "Loading drivers..." : "Select Driver"}
              disabled={loading}
            />
          </div>

          {/* Supervisor Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Supervisor
            </label>
            <SelectField
              options={supervisors}
              value={selectedSupervisor}
              onChange={setSelectedSupervisor}
              placeholder={loading ? "Loading supervisors..." : "Select Supervisor"}
              disabled={loading}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleStaffModal;