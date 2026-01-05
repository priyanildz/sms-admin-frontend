import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { API_BASE_URL } from "../config";

const AcademicEditSubject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedStd, setSelectedStd] = useState("");
  const [recordId, setRecordId] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([]); 
  const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

  const initialSubjectsMasterList = [
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

  const getSubOptionsByName = (name) => {
    const found = initialSubjectsMasterList.find(s => s.name === name);
    return found ? found.subOptions : [];
  };

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}api/subjects/${id}`, {
          headers: { auth: AUTH_HEADER },
        });

        if (res.data.subjects && res.data.subjects.length > 0) {
          const configData = res.data.subjects[0];
          setRecordId(configData._id);
          setSelectedStd(configData.standard || "");
          
          const existingSubjects = configData.subjects || [];
          
          // Combine existing configuration with master list
          const combinedData = initialSubjectsMasterList.map(masterSub => {
            const existing = existingSubjects.find(s => s.name === masterSub.name);
            
            if (existing) {
              return {
                name: existing.name,
                isSelected: true,
                type: existing.type || "",
                nature: existing.nature || [],
                subSubjects: existing.subSubjects || [],
                availableSubOptions: masterSub.subOptions
              };
            } else {
              return {
                name: masterSub.name,
                isSelected: false,
                type: "",
                nature: [],
                subSubjects: [],
                availableSubOptions: masterSub.subOptions
              };
            }
          });

          setFormData(combinedData);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

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
    const currentValues = updated[index][field] || [];
    updated[index][field] = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    setFormData(updated);
  };

  const handleUpdate = async () => {
    // Filter only subjects that are selected
    const selectedSubjects = formData.filter(s => s.isSelected);
    
    // Validation
    const incomplete = selectedSubjects.find(s => !s.type || s.nature.length === 0);
    if (incomplete) return alert(`Please select Type and Nature for ${incomplete.name}`);

    setLoading(true);
    try {
      await axios.put(`${API_BASE_URL}api/subjects/${recordId}`, {
        standard: selectedStd,
        subjects: selectedSubjects.map(s => ({
          name: s.name,
          type: s.type,
          nature: s.nature,
          subSubjects: s.subSubjects
        }))
      }, { headers: { auth: AUTH_HEADER } });
      
      alert("Updated successfully!");
      navigate("/academics-subject-creation");
    } catch (err) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="p-6 space-y-6">
          <h2 className="text-xl font-semibold text-center text-gray-800">Edit Subject Configuration</h2>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">STD:</label>
            <input className="border border-gray-300 px-4 py-2 rounded-md shadow-sm w-48 bg-gray-50 outline-none" value={selectedStd} readOnly />
          </div>
          <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full border-collapse">
              <thead className="bg-blue-100 text-black">
                <tr>
                  <th className="text-center px-6 py-3 border border-gray-300 font-bold uppercase tracking-wider text-xs">Subjects Name</th>
                  <th className="text-center px-6 py-3 border border-gray-300 font-bold uppercase tracking-wider text-xs">Subjects Type</th>
                  <th className="text-center px-6 py-3 border border-gray-300 font-bold uppercase tracking-wider text-xs">Subject Nature</th>
                  <th className="text-center px-6 py-3 border border-gray-300 font-bold uppercase tracking-wider text-xs">Sub subjects</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {loading ? (
                  <tr><td colSpan="4" className="text-center py-10">Loading...</td></tr>
                ) : formData.map((row, idx) => (
                  <tr key={idx} className={`border-b hover:bg-gray-50 transition-colors ${!row.isSelected ? 'bg-gray-50 opacity-80' : ''}`}>
                    <td className="px-6 py-3 border border-gray-300 font-medium">
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
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
                      <div className={`flex flex-col items-start justify-center gap-1 mx-auto w-fit ${!row.isSelected ? 'pointer-events-none' : ''}`}>
                        {["Compulsory", "Optional"].map(t => (
                          <label key={t} className="flex items-center gap-2 cursor-pointer text-xs">
                            <input type="radio" name={`type-${idx}`} checked={row.type === t} onChange={() => handleTypeChange(idx, t)} className="w-3 h-3 text-blue-600" /> {t}
                          </label>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-3 border border-gray-300">
                      <div className={`flex flex-col items-start justify-center gap-1 mx-auto w-fit ${!row.isSelected ? 'pointer-events-none' : ''}`}>
                        {["Language", "Theory", "Practical", "Activity"].map(n => (
                          <label key={n} className="flex items-center gap-2 cursor-pointer text-xs">
                            <input type="checkbox" checked={(row.nature || []).includes(n)} onChange={() => handleCheckboxChange(idx, "nature", n)} className="w-3 h-3 text-blue-600 rounded" /> {n}
                          </label>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-3 border border-gray-300">
                      <div className={`grid grid-cols-2 gap-x-4 gap-y-1 text-left w-fit mx-auto ${!row.isSelected ? 'pointer-events-none' : ''}`}>
                        {(row.availableSubOptions || []).map(sub => (
                          <label key={sub} className="flex items-center gap-2 cursor-pointer text-xs">
                            <input type="checkbox" checked={(row.subSubjects || []).includes(sub)} onChange={() => handleCheckboxChange(idx, "subSubjects", sub)} className="w-3 h-3 text-blue-600 rounded" /> {sub}
                          </label>
                        ))}
                        {row.availableSubOptions.length === 0 && <span className="text-gray-400 text-xs">-</span>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button onClick={() => navigate("/academics-subject-creation")} className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 font-medium text-sm">Back</button>
            <button onClick={handleUpdate} disabled={loading} className="px-6 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-all font-medium text-sm">Update Configuration</button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AcademicEditSubject;