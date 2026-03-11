import React, { useEffect, useState, useMemo, useCallback } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { API_BASE_URL } from "../config";

const STANDARD_OPTIONS = [
  "Nursery",
  "Junior",
  "Senior",
  ...Array.from({ length: 10 }, (_, i) => String(i + 1)),
];
const DIVISION_OPTIONS = ["A", "B", "C", "D", "E"];

export default function AcademicSubject() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStd, setFilterStd] = useState("");
  const [subjectData, setSubjectData] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [allSubjectConfigs, setAllSubjectConfigs] = useState([]);
  const [selectedStd, setSelectedStd] = useState("");
  const [allotmentRows, setAllotmentRows] = useState([
    {
      id: Date.now(),
      subject: "",
      teacherOptions: [{ id: Date.now() + 1, teacher: null }],
    },
  ]);
  const [availableSubjectsForStd, setAvailableSubjectsForStd] = useState([]);

  const storedUsername = localStorage.getItem("username") || "System_User";
  const storedRole = localStorage.getItem("role") || "admin";
  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    const config = {
      headers: {
        auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
        username: storedUsername,
        role: storedRole,
      },
    };
    try {
      const [allotRes, staffRes, configRes] = await Promise.all([
        axios.get(`${API_BASE_URL}api/allotments`, config),
        axios.get(`${API_BASE_URL}api/staff`, config),
        axios.get(`${API_BASE_URL}api/subjects`, config),
      ]);
      setSubjectData(Array.isArray(allotRes.data) ? allotRes.data : []);
      setTeachers(staffRes.data);
      setAllSubjectConfigs(configRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSubjectData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  useEffect(() => {
    const fetchConfiguredSubjects = async () => {
      if (!selectedStd) return;
      try {
        const res = await axios.get(
          `${API_BASE_URL}api/subjects/${selectedStd}`,
          {
            headers: {
              auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
              username: storedUsername,
              role: storedRole,
            },
          },
        );
        const config = res.data.subjects?.[0];
        if (config && config.subjects) {
          const flattenedSubjects = [];
          config.subjects.forEach((sub) => {
            if (sub.subSubjects && sub.subSubjects.length > 0) {
              flattenedSubjects.push(...sub.subSubjects);
            } else {
              flattenedSubjects.push(sub.name);
            }
          });
          setAvailableSubjectsForStd(flattenedSubjects);
        } else {
          setAvailableSubjectsForStd([]);
        }
      } catch (err) {
        setAvailableSubjectsForStd([]);
      }
    };
    fetchConfiguredSubjects();
  }, [selectedStd]);

  const getFilteredTeacherOptions = (std) => {
    const getCategory = (s) => {
      if (["Nursery", "Junior", "Senior"].includes(s)) return "pre-primary";
      if (["1", "2", "3", "4", "5"].includes(s)) return "primary";
      if (["6", "7", "8", "9", "10"].includes(s)) return "secondary";
      return "";
    };
    const requiredCategory = getCategory(std);
    return teachers
      .filter((t) => {
        const teacherGrades = t.role?.preferredgrades || [];
        return teacherGrades.some(
          (grade) => grade.toLowerCase() === requiredCategory,
        );
      })
      .map((t) => ({
        value: `${t._id},${t.firstname} ${t.middlename} ${t.lastname}`,
        label: `${t.firstname} ${t.middlename} ${t.lastname}`,
      }));
  };

  const resetFormState = () => {
    setSelectedStd("");
    setIsEditMode(false);
    setIsSaving(false);
    setAllotmentRows([
      {
        id: Date.now(),
        subject: "",
        teacherOptions: [{ id: Date.now() + 1, teacher: null }],
      },
    ]);
    setAvailableSubjectsForStd([]);
    setShowModal(false);
  };

  const handleAddSubjectRow = () => {
    setAllotmentRows([
      ...allotmentRows,
      {
        id: Date.now(),
        subject: "",
        teacherOptions: [{ id: Date.now() + 1, teacher: null }],
      },
    ]);
  };

  const handleRemoveSubjectRow = (rowId) => {
    if (allotmentRows.length > 1) {
      setAllotmentRows(allotmentRows.filter((r) => r.id !== rowId));
    }
  };

  const handleAddTeacherToRow = (rowId) => {
    setAllotmentRows(
      allotmentRows.map((row) =>
        row.id === rowId
          ? {
              ...row,
              teacherOptions: [
                ...row.teacherOptions,
                { id: Date.now(), teacher: null },
              ],
            }
          : row,
      ),
    );
  };

  const handleRemoveTeacherFromRow = (rowId, teacherId) => {
    setAllotmentRows(
      allotmentRows.map((row) => {
        if (row.id === rowId && row.teacherOptions.length > 1) {
          return {
            ...row,
            teacherOptions: row.teacherOptions.filter(
              (t) => t.id !== teacherId,
            ),
          };
        }
        return row;
      }),
    );
  };

  const handleTeacherChange = (rowId, teacherId, value) => {
    const teacher = teachers.find(
      (t) => `${t._id},${t.firstname} ${t.middlename} ${t.lastname}` === value,
    );
    if (teacher) {
      const fullDisplayLabel = `${teacher.firstname} ${teacher.middlename} ${teacher.lastname}`;
      setAllotmentRows(
        allotmentRows.map((row) =>
          row.id === rowId
            ? {
                ...row,
                teacherOptions: row.teacherOptions.map((tOpt) =>
                  tOpt.id === teacherId
                    ? {
                        ...tOpt,
                        teacher: { value, label: fullDisplayLabel },
                      }
                    : tOpt,
                ),
              }
            : row,
        ),
      );
    }
  };

  // 🚀 UPDATED: Logic to group and filter by teacher name search query
  const tableGroups = useMemo(() => {
    const stdGroups = {};

    subjectData.forEach((item) => {
      const std = item.standards[0];
      const teacherName = item.teacherName || "";

      // Apply Search Query Filter immediately during iteration
      if (
        searchQuery &&
        !teacherName.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return;
      }

      let subDisplayName = item.subjects[0];
      if (allSubjectConfigs && allSubjectConfigs.length > 0) {
        const stdConfig = allSubjectConfigs.find((c) => c.standard === std);
        if (stdConfig && stdConfig.subjects) {
          const parentSubject = stdConfig.subjects.find(
            (s) => s.subSubjects && s.subSubjects.includes(subDisplayName),
          );
          if (parentSubject) {
            subDisplayName = `${parentSubject.name}(${subDisplayName})`;
          }
        }
      }

      if (!stdGroups[std])
        stdGroups[std] = { name: std, subjects: {}, totalRows: 0, allIds: [] };
      if (!stdGroups[std].subjects[subDisplayName]) {
        stdGroups[std].subjects[subDisplayName] = {
          name: subDisplayName,
          teachers: [],
          rawData: [],
        };
        stdGroups[std].totalRows += 1;
      }

      if (
        !stdGroups[std].subjects[subDisplayName].teachers.includes(teacherName)
      ) {
        stdGroups[std].subjects[subDisplayName].teachers.push(teacherName);
        stdGroups[std].subjects[subDisplayName].rawData.push(item);
      }
      stdGroups[std].allIds.push(item._id);
    });

    return Object.values(stdGroups).filter(
      (group) => filterStd === "" || group.name === filterStd,
    );
  }, [subjectData, filterStd, allSubjectConfigs, searchQuery]);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const config = {
      headers: {
        auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
        username: storedUsername,
        role: storedRole,
      },
    };
    const displayStd = selectedStd + (isNaN(selectedStd) ? "" : " std");
    if (!isEditMode) {
      const alreadyExists = subjectData.some(
        (item) => item.standards[0] === selectedStd,
      );
      if (alreadyExists) {
        alert(
          `Subjects are already allotted for ${displayStd}. Please edit the existing entry.`,
        );
        setIsSaving(false);
        return;
      }
    }
    try {
      if (isEditMode) {
        const group = tableGroups.find((g) => g.name === selectedStd);
        if (group) {
          await Promise.allSettled(
            group.allIds.map((id) =>
              axios.delete(`${API_BASE_URL}api/allotments/${id}`, config),
            ),
          );
        }
      }
      const postRequests = [];
      for (const row of allotmentRows) {
        const selectedTeachers = row.teacherOptions.filter(
          (t) => t.teacher !== null,
        );
        selectedTeachers.forEach((tOpt) => {
          postRequests.push(
            axios.post(
              `${API_BASE_URL}api/allot-subject`,
              {
                teacher: tOpt.teacher.value.split(",")[0],
                teacherName: tOpt.teacher.label,
                subjects: [row.subject],
                standards: [selectedStd],
                divisions: DIVISION_OPTIONS,
              },
              config,
            ),
          );
        });
      }
      await Promise.all(postRequests);
      alert(
        isEditMode
          ? `subjects successfully updated for ${displayStd}`
          : `subjects successfully alloted for ${displayStd}`,
      );
      resetFormState();
      fetchAllData();
    } catch (error) {
      alert("Error saving allotment.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (group) => {
    setIsEditMode(true);
    setSelectedStd(group.name);
    const rows = Object.values(group.subjects).map((sub) => ({
      id: Math.random(),
      subject: sub.name,
      teacherOptions: sub.rawData.map((rd) => {
        const masterTeacher = teachers.find((t) => t._id === rd.teacher);
        const teacherValue = masterTeacher
          ? `${masterTeacher._id},${masterTeacher.firstname} ${masterTeacher.middlename} ${masterTeacher.lastname}`
          : `${rd.teacher},${rd.teacherName}`;
        return {
          id: Math.random(),
          teacher: { value: teacherValue, label: rd.teacherName },
        };
      }),
    }));
    setAllotmentRows(rows);
    setShowModal(true);
  };

  const handleDeleteGroup = async (groupName, ids) => {
    const displayStd = groupName + (isNaN(groupName) ? "" : " std");
    if (
      window.confirm(
        `Are you sure you want to delete all allotments for ${displayStd}?`,
      )
    ) {
      const config = {
        headers: {
          auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          username: storedUsername,
          role: storedRole,
        },
      };
      try {
        await Promise.all(
          ids.map((id) =>
            axios.delete(`${API_BASE_URL}api/allotments/${id}`, config),
          ),
        );
        alert(`subjects successfully deleted for ${displayStd}`);
        fetchAllData();
      } catch (err) {
        alert("Delete failed.");
      }
    }
  };

  const ModalJSX = showModal && (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(50, 50, 50, 0.5)" }}
    >
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {isEditMode ? "Edit Subject Allotment" : "Add Subject Allotment"}
          </h2>
          <button onClick={resetFormState} className="text-gray-500 text-2xl">
            &times;
          </button>
        </div>
        <form onSubmit={handleSave}>
          <label className="block text-sm font-medium mb-1">Standard *</label>
          <select
            disabled={isEditMode}
            required
            value={selectedStd}
            onChange={(e) => setSelectedStd(e.target.value)}
            className="w-full p-2 border rounded-md mb-4 bg-gray-50"
          >
            <option value="" disabled>
              Select Standard
            </option>
            {STANDARD_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {allotmentRows.map((row) => (
            <div
              key={row.id}
              className="border p-3 rounded-md mb-4 bg-gray-50 relative"
            >
              <button
                type="button"
                onClick={() => handleRemoveSubjectRow(row.id)}
                className="absolute top-1 right-2 text-red-500 font-bold text-lg"
              >
                &times;
              </button>
              <label className="block text-xs font-bold mb-1">
                Subject / Sub-Subject
              </label>
              <select
                required
                value={row.subject}
                onChange={(e) =>
                  setAllotmentRows(
                    allotmentRows.map((r) =>
                      r.id === row.id ? { ...r, subject: e.target.value } : r,
                    ),
                  )
                }
                className="w-full p-2 border rounded-md mb-2"
              >
                <option value="" disabled>
                  Select
                </option>
                {availableSubjectsForStd
                  .filter(
                    (s) =>
                      s === row.subject ||
                      !allotmentRows.some((ar) => ar.subject === s),
                  )
                  .map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
              </select>
              <label className="block text-xs font-bold mb-1">Teachers</label>
              {row.teacherOptions.map((tOpt) => (
                <div key={tOpt.id} className="flex items-center gap-2 mb-2">
                  <select
                    required
                    value={tOpt.teacher?.value || ""}
                    onChange={(e) =>
                      handleTeacherChange(row.id, tOpt.id, e.target.value)
                    }
                    className="w-full p-2 border rounded-md text-sm"
                  >
                    <option value="" disabled>
                      Select Teacher
                    </option>
                    {getFilteredTeacherOptions(selectedStd).map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => handleAddTeacherToRow(row.id)}
                    className="text-blue-600 font-bold text-xl"
                  >
                    +
                  </button>
                  {row.teacherOptions.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveTeacherFromRow(row.id, tOpt.id)
                      }
                      className="text-red-500 font-bold text-xl"
                    >
                      −
                    </button>
                  )}
                </div>
              ))}
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleAddSubjectRow}
              className="text-blue-600 font-semibold text-sm"
            >
              + Add More Subject
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`${isSaving ? "bg-blue-300" : "bg-blue-500"} text-white px-6 py-2 rounded-md transition-all min-w-[100px]`}
            >
              {isSaving ? "Save..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="flex flex-1 flex-col p-4 sm:p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search teacher name..."
                className="w-full sm:w-64 px-3 py-2 rounded-md border border-gray-300 text-sm shadow-sm"
              />
              <select
                value={filterStd}
                onChange={(e) => setFilterStd(e.target.value)}
                className="px-3 py-2 rounded-md border border-gray-300 text-sm shadow-sm"
              >
                <option value="">All Standards</option>
                {STANDARD_OPTIONS.map((std) => (
                  <option key={std} value={std}>
                    {std}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
            Subject Allotment
          </h2>
          <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-300">
            <table className="min-w-full border-collapse text-center">
              <thead className="bg-blue-100 text-gray-700 font-bold">
                <tr>
                  <th className="px-6 py-4 border border-gray-300 uppercase tracking-wider">
                    Standard
                  </th>
                  <th className="px-6 py-4 border border-gray-300 uppercase tracking-wider">
                    Subjects
                  </th>
                  <th className="px-6 py-4 border border-gray-300 uppercase tracking-wider text-left">
                    Teacher
                  </th>
                  <th className="px-6 py-4 border border-gray-300 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {isLoading ? (
                  <tr>
                    <td colSpan="4" className="py-10 text-gray-500 italic">
                      Loading allotments...
                    </td>
                  </tr>
                ) : tableGroups.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-10 text-gray-500 italic">
                      No matching records found.
                    </td>
                  </tr>
                ) : (
                  tableGroups.map((group) => {
                    const subjectEntries = Object.values(group.subjects);
                    return subjectEntries.map((subject, subIdx) => (
                      <tr
                        key={`${group.name}-${subject.name}`}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        {subIdx === 0 && (
                          <td
                            className="px-6 py-4 border border-gray-300 font-bold text-lg text-gray-800 bg-gray-50"
                            rowSpan={group.totalRows}
                          >
                            {group.name}
                          </td>
                        )}
                        <td className="px-6 py-4 border border-gray-300 font-medium text-gray-700">
                          {subject.name}
                        </td>
                        <td className="px-6 py-4 border border-gray-300 text-sm text-gray-600 text-left">
                          <div className="flex flex-wrap gap-1">
                            {subject.teachers.map((t, tIdx) => (
                              <span
                                key={tIdx}
                                className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-100"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </td>
                        {subIdx === 0 && (
                          <td
                            className="px-6 py-4 border border-gray-300 bg-gray-50"
                            rowSpan={group.totalRows}
                          >
                            <div className="flex flex-col items-center gap-3">
                              <button
                                onClick={() => handleEdit(group)}
                                className="text-blue-600 font-semibold hover:underline"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteGroup(group.name, group.allIds)
                                }
                                className="text-red-600 font-semibold hover:underline"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ));
                  })
                )}
              </tbody>
            </table>
          </div>
          {ModalJSX}
        </div>
      </div>
    </MainLayout>
  );
}
