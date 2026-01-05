import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { API_BASE_URL } from "../config";

const AcademicSubjectCreation = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [selectedStd, setSelectedStd] = useState("");
  const [loading, setLoading] = useState(false);

  const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
  const standards = ["Nursery", "Junior", "Senior", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}api/subjects`, {
        headers: { auth: AUTH_HEADER },
      });
      setSubjects(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching subjects:", err);
    } finally {
      setLoading(false);
    }
  };

  // New Delete Function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subject configuration?")) {
      try {
        await axios.delete(`${API_BASE_URL}api/subjects/${id}`, {
          headers: { auth: AUTH_HEADER },
        });
        alert("Deleted successfully");
        fetchSubjects(); // Refresh list
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete subject");
      }
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const filteredSubjects = selectedStd
    ? subjects.filter((s) => s.standard === selectedStd)
    : subjects;

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="p-4 space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <select
                className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={selectedStd}
                onChange={(e) => setSelectedStd(e.target.value)}
              >
                <option value="">All Standards</option>
                {standards.map((std) => (
                  <option key={std} value={std}>
                    {std}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => navigate("/academics-create-subject-form")}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-md font-medium"
            >
              Create Subject
            </button>
          </div>

          <h2 className="text-xl font-semibold text-center text-gray-800">Subjects</h2>

          <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full border-collapse">
              <thead className="bg-blue-100 text-black">
                <tr>
                  <th className="px-6 py-4 border border-gray-300 text-center font-bold uppercase tracking-wider">
                    STD
                  </th>
                  <th className="px-6 py-4 border border-gray-300 text-center font-bold uppercase tracking-wider">
                    Subject Names
                  </th>
                  <th className="px-6 py-4 border border-gray-300 text-center font-bold uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="3" className="text-center py-10 text-gray-500">Loading subjects...</td>
                  </tr>
                ) : filteredSubjects.length > 0 ? (
                  filteredSubjects.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 border border-gray-300 text-center font-medium">
                        {item.standard}
                      </td>
                      <td className="px-6 py-4 border border-gray-300 text-center">
                        {Array.isArray(item.subjectName) ? item.subjectName.join(", ") : item.subjectName}
                      </td>
                      <td className="px-6 py-4 border border-gray-300 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <button 
                            // onClick={() => navigate(`/academics-edit-subject/${item._id}`)}
                            onClick={() => navigate(`/academics-edit-subject/${item.standard}`)}
                            className="text-blue-600 hover:text-blue-800 font-medium px-2 py-1 rounded"
                          >
                            edit
                          </button>
                          {/* <span className="text-gray-300">|</span> */}
                          <button 
                            // onClick={() => navigate(`/academics-view-subject/${item._id}`)}
                            onClick={() => navigate(`/academics-view-subject/${item.standard}`)}
                            className="text-gray-600 hover:text-black font-medium px-2 py-1 rounded"
                          >
                            view
                          </button>
                          {/* <span className="text-gray-300">|</span> */}
                          <button 
                            onClick={() => handleDelete(item._id)}
                            className="text-red-600 hover:text-red-800 font-medium px-2 py-1 rounded"
                          >
                            delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-10 text-gray-500">
                      No subjects created for this standard yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AcademicSubjectCreation;