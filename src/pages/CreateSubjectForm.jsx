import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { API_BASE_URL } from "../config";

const CreateSubjectForm = () => {
  const navigate = useNavigate();
  const [selectedStd, setSelectedStd] = useState("");
  const [loading, setLoading] = useState(false);

  const initialSubjects = [
    { name: "English", subOptions: [] },
    { name: "Hindi", subOptions: [] },
    { name: "Marathi", subOptions: [] },
    { name: "Sanskrit", subOptions: [] },
    { name: "Mathematics", subOptions: ["Numbers", "Arithmetic", "Algebra", "Geometry", "Mensuration", "Statistics"] },
    { name: "Science", subOptions: ["Physics", "Chemistry", "Biology"] },
    { name: "Social Science", subOptions: ["History", "Civics", "Political Science", "Geography"] },
    { name: "Computer", subOptions: [] },
    { name: "Drawing", subOptions: [] },
    { name: "Physical Education", subOptions: [] },
  ];

  const [formData, setFormData] = useState(
    initialSubjects.map(sub => ({
      name: sub.name,
      isSelected: false, 
      type: "", 
      nature: [], 
      subSubjects: [], 
      availableSubOptions: sub.subOptions
    }))
  );

  const handleSubjectSelect = (index) => {
    const updated = [...formData];
    updated[index].isSelected = !updated[index].isSelected;
    setFormData(updated);
  };

  const handleTypeChange = (index, value) => {
    const updated = [...formData];
    updated[index].type = value;
    setFormData(updated);
  };

  const handleCheckboxChange = (index, field, value) => {
    const updated = [...formData];
    const currentValues = updated[index][field];
    if (currentValues.includes(value)) {
      updated[index][field] = currentValues.filter(v => v !== value);
    } else {
      updated[index][field] = [...currentValues, value];
    }
    setFormData(updated);
  };

  const handleSave = async () => {
    if (!selectedStd) return alert("Please select a Standard first.");
    
    const selectedSubjects = formData.filter(s => s.isSelected);
    if (selectedSubjects.length === 0) return alert("Please select at least one subject.");

    // Validation: Ensure all selected subjects have a Type and Nature
    const incomplete = selectedSubjects.find(s => !s.type || s.nature.length === 0);
    if (incomplete) return alert(`Please select Type and Nature for ${incomplete.name}`);

    setLoading(true);
    const AUTH_CONFIG = { headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" } };

    try {
      // 1. Check if Standard already exists to prevent duplicates
      const checkRes = await axios.get(`${API_BASE_URL}api/subjects`, AUTH_CONFIG);
      const existing = checkRes.data.find(s => s.standard === selectedStd);
      
      if (existing) {
        setLoading(false);
        return alert(`Subjects for Standard ${selectedStd} already exist. Please use Edit instead.`);
      }

      // 2. Prepare payload matching the updated backend requirements
      const payload = {
        standard: selectedStd,
        subjects: selectedSubjects.map(s => ({
          name: s.name,
          type: s.type,
          nature: s.nature,
          subSubjects: s.subSubjects
        }))
      };

      await axios.post(`${API_BASE_URL}api/add-subject`, payload, AUTH_CONFIG);
      
      alert("Subjects saved successfully!");
      navigate("/academics-subject-creation");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error saving subjects. Ensure backend models are updated.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="p-6 space-y-6">
          <h2 className="text-xl font-semibold text-center text-gray-800">Create Subject</h2>
          
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">STD:</label>
              <select 
                className="border border-gray-300 px-4 py-2 rounded-md shadow-sm w-48"
                value={selectedStd}
                onChange={(e) => setSelectedStd(e.target.value)}
              >
                <option value="">Select STD</option>
                {["Nursery", "Junior", "Senior", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(std => (
                  <option key={std} value={std}>{std}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full border-collapse">
              <thead className="bg-blue-100 text-black">
                <tr>
                  <th className="text-center px-6 py-3 border border-gray-300">Subjects Name</th>
                  <th className="text-center px-6 py-3 border border-gray-300">Subjects Type</th>
                  <th className="text-center px-6 py-3 border border-gray-300">Subject Nature</th>
                  <th className="text-center px-6 py-3 border border-gray-300">Sub subjects</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {formData.map((row, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 border border-gray-300 font-medium">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={row.isSelected}
                          onChange={() => handleSubjectSelect(idx)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        {row.name}
                      </label>
                    </td>
                    
                    <td className="px-6 py-3 border border-gray-300">
                      <div className="flex flex-col items-start justify-center gap-1 mx-auto w-fit">
                        {["Compulsory", "Optional"].map(t => (
                          <label key={t} className={`flex items-center gap-2 cursor-pointer text-sm ${!row.isSelected ? 'opacity-50 pointer-events-none' : ''}`}>
                            <input 
                              type="radio" 
                              name={`type-${idx}`} 
                              value={t} 
                              checked={row.type === t}
                              onChange={() => handleTypeChange(idx, t)}
                              className="w-4 h-4 text-blue-600"
                            /> {t}
                          </label>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-3 border border-gray-300">
                      <div className="flex flex-col items-start justify-center gap-1 mx-auto w-fit">
                        {["Language", "Theory", "Practical", "Activity"].map(n => (
                          <label key={n} className={`flex items-center gap-2 cursor-pointer text-sm ${!row.isSelected ? 'opacity-50 pointer-events-none' : ''}`}>
                            <input 
                              type="checkbox" 
                              checked={row.nature.includes(n)}
                              onChange={() => handleCheckboxChange(idx, "nature", n)}
                              className="w-4 h-4 text-blue-600 rounded"
                            /> {n}
                          </label>
                        ))}
                      </div>
                    </td>

                    <td className="px-6 py-3 border border-gray-300">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-left w-fit mx-auto">
                        {row.availableSubOptions.map(sub => (
                          <label key={sub} className={`flex items-center gap-2 cursor-pointer text-sm ${!row.isSelected ? 'opacity-50 pointer-events-none' : ''}`}>
                            <input 
                              type="checkbox" 
                              checked={row.subSubjects.includes(sub)}
                              onChange={() => handleCheckboxChange(idx, "subSubjects", sub)}
                              className="w-4 h-4 text-blue-600 rounded"
                            /> {sub}
                          </label>
                        ))}
                        {row.availableSubOptions.length === 0 && <span className="text-gray-400">-</span>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-4">
            <button 
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-all font-medium disabled:bg-gray-400"
            >
              {loading ? "Saving..." : "Save Subjects"}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateSubjectForm;