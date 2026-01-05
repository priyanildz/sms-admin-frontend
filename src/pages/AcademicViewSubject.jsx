import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { API_BASE_URL } from "../config";

const AcademicViewSubject = () => {
  const { id } = useParams(); // This is the standard name (e.g., "Nursery")
  const navigate = useNavigate();
  const [selectedStd, setSelectedStd] = useState("");
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

  const getSubOptionsByName = (name) => {
    const mapping = {
      "Mathematics": ["Numbers", "Arithmetic", "Algebra", "Geometry", "Mensuration", "Statistics"],
      "Science": ["Physics", "Chemistry", "Biology"],
      "Social Science": ["History", "Civics", "Political Science", "Geography"]
    };
    return mapping[name] || [];
  };

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}api/subjects/${id}`, {
          headers: { auth: AUTH_HEADER },
        });

        // Unwrap the array: { subjects: [ { standard, subjects: [...] } ] }
        if (res.data.subjects && res.data.subjects.length > 0) {
          const configData = res.data.subjects[0];
          setSelectedStd(configData.standard || "");
          
          if (configData.subjects) {
            setFormData(configData.subjects.map(s => ({
              name: s.name || "",
              type: s.type || "",
              nature: s.nature || [],
              subSubjects: s.subSubjects || [],
              availableSubOptions: getSubOptionsByName(s.name)
            })));
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="p-6 space-y-6">
          <h2 className="text-xl font-semibold text-center text-gray-800">View Subject Configuration</h2>
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
                ) : formData.length > 0 ? (
                  formData.map((row, idx) => (
                    <tr key={idx} className="border-b transition-colors">
                      <td className="text-center px-6 py-3 border border-gray-300 font-medium text-sm">{row.name}</td>
                      <td className="px-6 py-3 border border-gray-300 text-center">
                        <div className="flex flex-col items-start gap-1 mx-auto w-fit">
                          {["Compulsory", "Optional"].map(t => (
                            <label key={t} className="flex items-center gap-2 text-xs opacity-80 cursor-default">
                              <input type="radio" checked={row.type === t} disabled className="w-3 h-3" /> {t}
                            </label>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-3 border border-gray-300 text-center">
                        <div className="flex flex-col items-start gap-1 mx-auto w-fit">
                          {["Language", "Theory", "Practical", "Activity"].map(n => (
                            <label key={n} className="flex items-center gap-2 text-xs opacity-80 cursor-default">
                              <input type="checkbox" checked={(row.nature || []).includes(n)} disabled className="w-3 h-3" /> {n}
                            </label>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-3 border border-gray-300 text-center">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-left w-fit mx-auto">
                          {(row.availableSubOptions || []).map(sub => (
                            <label key={sub} className="flex items-center gap-2 text-xs opacity-80 cursor-default">
                              <input type="checkbox" checked={(row.subSubjects || []).includes(sub)} disabled className="w-3 h-3" /> {sub}
                            </label>
                          ))}
                          {row.availableSubOptions.length === 0 && <span className="text-gray-400 text-xs">-</span>}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4" className="text-center py-10 text-gray-400">No subject data found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <button onClick={() => navigate("/academics-subject-creation")} className="px-6 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 font-medium text-sm">Back</button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AcademicViewSubject;