// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const PublishTimetable = ({ handleCancelPublish }) => {
//   const [formData, setFormData] = useState({
//     standard: "",
//     division: "",
//     subjects: [],
//     allotments: {}, // { subject: teacherId }
//     days: [],
//   });
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [allotmentOptions, setAllotmentOptions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // fetch subjects based on standard
//   useEffect(() => {
//     const fetchSubjects = async () => {
//       if (!formData.standard) {
//         setFormData((prev) => ({ ...prev, subjects: [], allotments: {} }));
//         return;
//       }

//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/subjects/${formData.standard}`,
//           { headers: { auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=` } }
//         );
//         const subjectNames = response.data.subjects[0]?.subjectname || [];
//         setFormData((prev) => ({
//           ...prev,
//           subjects: subjectNames,
//           allotments: {}, // Reset allotments when subjects change
//         }));
//         setError(null);
//       } catch (err) {
//         setError(
//           "Failed to fetch subjects: " +
//             (err.response?.data?.error || err.message)
//         );
//         setFormData((prev) => ({ ...prev, subjects: [], allotments: {} }));
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubjects();
//   }, [formData.standard]);

//   // fetch allotments based on standard + division
//   useEffect(() => {
//     const fetchAllotments = async () => {
//       if (!formData.standard || !formData.division) {
//         setAllotmentOptions([]);
//         return;
//       }

//       setLoading(true);
//       try {
//         const res = await axios.get("http://localhost:5000/api/allotments", {
//           headers: { auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=` },
//         });
//         setAllotmentOptions(res.data || []);
//         setError(null);
//       } catch (err) {
//         console.error("Failed to fetch allotments", err);
//         setError("Failed to fetch teacher allotments");
//         setAllotmentOptions([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllotments();
//   }, [formData.standard, formData.division]);

//   // input handling
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     // Clear success/error messages when user starts typing
//     if (success) setSuccess(null);
//     if (error) setError(null);
//   };

//   // change teacher allotment for subject
//   const handleAllotmentsChange = (e, subject) => {
//     const { value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       allotments: {
//         ...prev.allotments,
//         [subject]: value,
//       },
//     }));
//   };

//   const handleArrayInput = (e, field) => {
//     const values = e.target.value
//       .split(",")
//       .map((item) => item.trim())
//       .filter(Boolean);
//     setFormData((prev) => ({ ...prev, [field]: values }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);
//     setLoading(true);

//     try {
//       if (!formData.standard?.trim() || !formData.division?.trim()) {
//         throw new Error("Standard and Division are required.");
//       }
//       if (formData.subjects.length === 0) {
//         throw new Error("No subjects found for this standard.");
//       }
//       if (formData.days.length === 0) {
//         throw new Error("Days are required.");
//       }
//       const unassignedSubjects = formData.subjects.filter(
//         (s) => !formData.allotments[s]
//       );
//       if (unassignedSubjects.length > 0) {
//         throw new Error(
//           `Assign teachers for: ${unassignedSubjects.join(", ")}`
//         );
//       }

//       // Prepare timetable
//       const totalPeriods = formData.timings.length;
//       const totalSubjects = formData.subjects.length;
//       const timetable = formData.days.map((day, dayIndex) => ({
//         day,
//         periods: formData.timings.map((time, index) => {
//           let subIndex = (index + dayIndex) % totalSubjects;
//           const subject = formData.subjects[subIndex];
//           return {
//             periodNumber: index + 1,
//             time,
//             subject,
//             teacher: formData.allotments[subject] || null,
//           };
//         }),
//       }));

//       // Build final payload
//       const payload = {
//         standard: formData.standard.trim(),
//         division: formData.division.trim(),
//         classteacher: formData.classteacher || null, // allow selection if needed
//         submittedby: "admin123", // or dynamically set
//         from: formData.from || new Date().toISOString().split("T")[0],
//         to: formData.to || new Date().toISOString().split("T")[0],
//         timetable,
//       };

//       console.log("Payload:", payload);

//       const response = await axios.post(
//         "http://localhost:5000/api/timetables/generate",
//         payload,
//         {
//           headers: {
//             auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setSuccess(
//         `Timetable generated successfully for Standard ${formData.standard}${formData.division}!`
//       );
//       // Reset form
//       setFormData({
//         standard: "",
//         division: "",
//         subjects: [],
//         allotments: {},
//         days: [],
//         timings: [],
//       });
//     } catch (err) {
//       setError(err.message || "Failed to generate timetable");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="my-4 p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
//       <h3 className="text-xl font-semibold text-gray-800 mb-6">
//         Publish New Timetable
//       </h3>

//       {error && (
//         <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
//           <p className="text-red-700 text-sm">{error}</p>
//         </div>
//       )}

//       {success && (
//         <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
//           <p className="text-blue-700 text-sm">{success}</p>
//         </div>
//       )}

//       {loading && (
//         <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
//           <p className="text-blue-700 text-sm">Generating timetable...</p>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Standard */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Standard *
//             </label>
//             <input
//               type="text"
//               name="standard"
//               value={formData.standard}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="e.g., 6"
//               required
//             />
//           </div>

//           {/* Division */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Division *
//             </label>
//             <input
//               type="text"
//               name="division"
//               value={formData.division}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="e.g., A"
//               required
//             />
//           </div>
//         </div>

//         {/* Subjects Display */}
//         {formData.subjects.length > 0 && (
//           <div className="p-4 bg-gray-50 rounded-md">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Subjects for Standard {formData.standard}
//             </label>
//             <div className="flex flex-wrap gap-2">
//               {formData.subjects.map((subject, index) => (
//                 <span
//                   key={index}
//                   className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
//                 >
//                   {subject}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Teacher Allotments */}
//         {formData.subjects.length > 0 && allotmentOptions.length > 0 && (
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-3">
//               Assign Teachers to Subjects *
//             </label>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {formData.subjects.map((subject) => {
//                 const filteredTeachers = allotmentOptions.filter(
//                   (a) =>
//                     a.subjects.some(
//                       (s) =>
//                         s.toLowerCase().includes(subject.toLowerCase()) ||
//                         subject.toLowerCase().includes(s.toLowerCase())
//                     ) &&
//                     a.standards.includes(formData.standard) &&
//                     a.divisions.includes(formData.division)
//                 );

//                 return (
//                   <div key={subject}>
//                     <label className="block text-sm text-gray-600 mb-1">
//                       {subject}
//                     </label>
//                     <select
//                       value={formData.allotments[subject] || ""}
//                       onChange={(e) => handleAllotmentsChange(e, subject)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       required
//                     >
//                       <option value="">Select Teacher</option>
//                       {filteredTeachers.map((t) => (
//                         <option key={t._id || t.teacher} value={t.teacher}>
//                           {t.teacherName}
//                         </option>
//                       ))}
//                     </select>
//                     {filteredTeachers.length === 0 && (
//                       <p className="text-xs text-red-500 mt-1">
//                         No teachers available for this subject
//                       </p>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* Days */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Days (comma-separated) *
//           </label>
//           <input
//             type="text"
//             onChange={(e) => handleArrayInput(e, "days")}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             placeholder="e.g., Monday,Tuesday,Wednesday,Thursday,Friday"
//             required
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             Use full day names (Monday, Tuesday, etc.)
//           </p>
//         </div>

//         {/* Buttons */}
//         <div className="flex flex-wrap gap-3 pt-4">
//           <button
//             type="submit"
//             disabled={loading}
//             className={`px-6 py-2 font-medium rounded-md transition-colors ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             } text-white`}
//           >
//             {loading ? "Publishing..." : "Confirm Publish"}
//           </button>
//           <button
//             type="button"
//             onClick={handleCancelPublish}
//             disabled={loading}
//             className="px-6 py-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PublishTimetable;


import React, { useState, useEffect } from "react";
import axios from "axios";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

const PublishTimetable = ({ handleCancelPublish }) => {
  const [formData, setFormData] = useState({
    standard: "",
    division: "",
    subjects: [],
    allotments: {}, // { subject: teacherId }
    days: [],
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [allotmentOptions, setAllotmentOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const AUTH_HEADER = `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`;

  // fetch subjects based on standard
  useEffect(() => {
    const fetchSubjects = async () => {
      if (!formData.standard) {
        setFormData((prev) => ({ ...prev, subjects: [], allotments: {} }));
        return;
      }

      setLoading(true);
      try {
        // FIX 1: Using imported API_BASE_URL
        const response = await axios.get(
          `${API_BASE_URL}api/subjects/${formData.standard}`,
          { headers: { auth: AUTH_HEADER } }
        );
        const subjectNames = response.data.subjects[0]?.subjectname || [];
        setFormData((prev) => ({
          ...prev,
          subjects: subjectNames,
          allotments: {}, // Reset allotments when subjects change
        }));
        setError(null);
      } catch (err) {
        setError(
          "Failed to fetch subjects: " +
            (err.response?.data?.error || err.message)
        );
        setFormData((prev) => ({ ...prev, subjects: [], allotments: {} }));
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [formData.standard]);

  // fetch allotments based on standard + division
  useEffect(() => {
    const fetchAllotments = async () => {
      if (!formData.standard || !formData.division) {
        setAllotmentOptions([]);
        return;
      }

      setLoading(true);
      try {
        // FIX 2: Using imported API_BASE_URL
        const res = await axios.get(`${API_BASE_URL}api/allotments`, {
          headers: { auth: AUTH_HEADER },
        });
        setAllotmentOptions(res.data || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch allotments", err);
        setError("Failed to fetch teacher allotments");
        setAllotmentOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllotments();
  }, [formData.standard, formData.division]);

  // input handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear success/error messages when user starts typing
    if (success) setSuccess(null);
    if (error) setError(null);
  };

  // change teacher allotment for subject
  const handleAllotmentsChange = (e, subject) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      allotments: {
        ...prev.allotments,
        [subject]: value,
      },
    }));
  };

  const handleArrayInput = (e, field) => {
    const values = e.target.value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    setFormData((prev) => ({ ...prev, [field]: values }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (!formData.standard?.trim() || !formData.division?.trim()) {
        throw new Error("Standard and Division are required.");
      }
      if (formData.subjects.length === 0) {
        throw new Error("No subjects found for this standard.");
      }
      if (formData.days.length === 0) {
        throw new Error("Days are required.");
      }
      const unassignedSubjects = formData.subjects.filter(
        (s) => !formData.allotments[s]
      );
      if (unassignedSubjects.length > 0) {
        throw new Error(
          `Assign teachers for: ${unassignedSubjects.join(", ")}`
        );
      }

      // Prepare timetable
      const totalPeriods = formData.timings.length;
      const totalSubjects = formData.subjects.length;
      const timetable = formData.days.map((day, dayIndex) => ({
        day,
        periods: formData.timings.map((time, index) => {
          let subIndex = (index + dayIndex) % totalSubjects;
          const subject = formData.subjects[subIndex];
          return {
            periodNumber: index + 1,
            time,
            subject,
            teacher: formData.allotments[subject] || null,
          };
        }),
      }));

      // Build final payload
      const payload = {
        standard: formData.standard.trim(),
        division: formData.division.trim(),
        classteacher: formData.classteacher || null, // allow selection if needed
        submittedby: "admin123", // or dynamically set
        from: formData.from || new Date().toISOString().split("T")[0],
        to: formData.to || new Date().toISOString().split("T")[0],
        timetable,
      };

      console.log("Payload:", payload);

      // FIX 3: Using imported API_BASE_URL
      const response = await axios.post(
        `${API_BASE_URL}api/timetables/generate`,
        payload,
        {
          headers: {
            auth: AUTH_HEADER,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(
        `Timetable generated successfully for Standard ${formData.standard}${formData.division}!`
      );
      // Reset form
      setFormData({
        standard: "",
        division: "",
        subjects: [],
        allotments: {},
        days: [],
        timings: [],
      });
    } catch (err) {
      setError(err.message || "Failed to generate timetable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-4 p-6 bg-white border border-gray-300 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Publish New Timetable
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-700 text-sm">{success}</p>
        </div>
      )}

      {loading && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-700 text-sm">Generating timetable...</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Standard */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Standard *
            </label>
            <input
              type="text"
              name="standard"
              value={formData.standard}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 6"
              required
            />
          </div>

          {/* Division */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Division *
            </label>
            <input
              type="text"
              name="division"
              value={formData.division}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., A"
              required
            />
          </div>
        </div>

        {/* Subjects Display */}
        {formData.subjects.length > 0 && (
          <div className="p-4 bg-gray-50 rounded-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subjects for Standard {formData.standard}
            </label>
            <div className="flex flex-wrap gap-2">
              {formData.subjects.map((subject, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Teacher Allotments */}
        {formData.subjects.length > 0 && allotmentOptions.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Assign Teachers to Subjects *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.subjects.map((subject) => {
                const filteredTeachers = allotmentOptions.filter(
                  (a) =>
                    a.subjects.some(
                      (s) =>
                        s.toLowerCase().includes(subject.toLowerCase()) ||
                        subject.toLowerCase().includes(s.toLowerCase())
                    ) &&
                    a.standards.includes(formData.standard) &&
                    a.divisions.includes(formData.division)
                );

                return (
                  <div key={subject}>
                    <label className="block text-sm text-gray-600 mb-1">
                      {subject}
                    </label>
                    <select
                      value={formData.allotments[subject] || ""}
                      onChange={(e) => handleAllotmentsChange(e, subject)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Teacher</option>
                      {filteredTeachers.map((t) => (
                        <option key={t._id || t.teacher} value={t.teacher}>
                          {t.teacherName}
                        </option>
                      ))}
                    </select>
                    {filteredTeachers.length === 0 && (
                      <p className="text-xs text-red-500 mt-1">
                        No teachers available for this subject
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Days */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Days (comma-separated) *
          </label>
          <input
            type="text"
            onChange={(e) => handleArrayInput(e, "days")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Monday,Tuesday,Wednesday,Thursday,Friday"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Use full day names (Monday, Tuesday, etc.)
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 font-medium rounded-md transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            } text-white`}
          >
            {loading ? "Publishing..." : "Confirm Publish"}
          </button>
          <button
            type="button"
            onClick={handleCancelPublish}
            disabled={loading}
            className="px-6 py-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PublishTimetable;