// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ExamAddAssignBlocks = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     standard: "",
//     division: "",
//     examType: "",
//     startDate: "",
//     endDate: "",
//     startTime: "",
//     endTime: "",
//   });

//   const [examDetails, setExamDetails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [timetables, setTimetables] = useState([]);
//   const [filteredTimetables, setFilteredTimetables] = useState([]);

//   // Fetch timetable data on mount
//   useEffect(() => {
//     const fetchTimetable = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/etimetable", {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch timetable");
//         }
//         const data = await response.json();
//         console.log(data);
//         setTimetables(data);
//         setExamDetails(data); // Assuming timetables contain exam details
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching timetable:", err);
//         toast.error("Failed to load timetable data");
//         setLoading(false);
//       }
//     };
//     fetchTimetable();
//   }, []);

//   // Filter timetables based on standard and division
//   useEffect(() => {
//     if (formData.standard && formData.division) {
//       const filtered = timetables.filter(
//         (t) => t.standard === formData.standard && t.division === formData.division
//       );
//       setFilteredTimetables(filtered);

//       // Auto-select first available examType, startDate, and endDate if available
//       if (filtered.length > 0) {
//         setFormData((prev) => ({
//           ...prev,
//           examType: filtered[0].examType || "",
//           startDate: filtered[0].startdate || "",
//           endDate: filtered[0].enddate || "",
//         }));
//       } else {
//         setFormData((prev) => ({
//           ...prev,
//           examType: "",
//           startDate: "",
//           endDate: "",
//         }));
//         toast.warn(
//           "No timetable data found for selected standard and division"
//         );
//       }
//     } else {
//       setFilteredTimetables([]);
//       setFormData((prev) => ({
//         ...prev,
//         examType: "",
//         startDate: "",
//         endDate: "",
//       }));
//     }
//   }, [formData.standard, formData.division, timetables]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     // Validation
//     if (
//       !formData.standard ||
//       !formData.division ||
//       !formData.examType ||
//       !formData.startDate ||
//       !formData.endDate ||
//       !formData.startTime ||
//       !formData.endTime
//     ) {
//       toast.error("Please fill in all fields");
//       return;
//     }

//     // Validate date range
//     if (new Date(formData.startDate) > new Date(formData.endDate)) {
//       toast.error("End date must be after start date");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/assign-eblock", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         toast.success("Block Assigned Successfully");
//         setTimeout(() => navigate("/exams-assign-blocks"), 1500);
//       } else {
//         const errorData = await res.json();
//         toast.error(errorData.message || "Failed to assign block");
//       }
//     } catch (err) {
//       console.error("Error assigning block:", err);
//       toast.error("Error while saving block");
//     }
//   };

//   // Get unique standards and divisions from exam details

//   const getUniqueExamTypes = () => {
//     const examTypes = filteredTimetables
//       .map((exam) => exam.examType)
//       .filter(Boolean);
//     return [...new Set(examTypes)];
//   };

//   if (loading) {
//     return (
//       <MainLayout>
//         <div className="bg-white rounded-2xl shadow p-8 max-w-2xl mx-auto">
//           <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//             <p className="mt-4 text-gray-600">Loading exam details...</p>
//           </div>
//         </div>
//       </MainLayout>
//     );
//   }

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-8 max-w-2xl mx-auto">
//         <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
//           Add Exam Block
//         </h2>

//         {examDetails.length > 0 && (
//           <div className="mb-4 p-3 bg-blue-50 rounded-md">
//             <p className="text-sm text-blue-700">
//               Found {examDetails.length} exam record(s) in the timetable
//             </p>
//           </div>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-gray-700 mb-1">Standard</label>
//             <select
//               name="standard"
//               value={formData.standard}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md"
//             >
//               <option value="">Select Standard</option>
//               <option value="Grade 1">1</option>
//               <option value="Grade 2">2</option>
//               <option value="Grade 3">3</option>
//               <option value="Grade 4">4</option>
//               <option value="Grade 5">5</option>
//               <option value="Grade 6">6</option>
//               <option value="Grade 7">7</option>
//               <option value="Grade 8">8</option>
//               <option value="Grade 9">9</option>
//               <option value="Grade 10">10</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">Division</label>
//             <select
//               name="division"
//               value={formData.division}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md"
//             >
//               <option value="">Select Division</option>
//               <option value="A">A</option>
//               <option value="B">B</option>
//               <option value="C">C</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Exam Type
//             </label>
//             <select
//               name="examType"
//               value={formData.examType}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md"
//               disabled={!formData.standard || !formData.division}
//             >
//               <option value="">Select Exam Type</option>
//               {getUniqueExamTypes().map((examType) => (
//                 <option key={examType} value={examType}>
//                   {examType}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">Start Date</label>
//             <input
//               type="text"
//               name="startDate"
//               value={formData.startDate}
//               className="w-full p-2 border rounded-md bg-gray-100"
//               readOnly
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">End Date</label>
//             <input
//               type="text"
//               name="endDate"
//               value={formData.endDate}
//               className="w-full p-2 border rounded-md bg-gray-100"
//               readOnly
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">Start Time</label>
//             <input
//               type="time"
//               name="startTime"
//               value={formData.startTime}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">End Time</label>
//             <input
//               type="time"
//               name="endTime"
//               value={formData.endTime}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-md"
//             />
//           </div>
//         </div>

//         <div className="flex justify-between items-center mt-8">
//           <button
//             onClick={() => navigate("/exams-assign-blocks")}
//             className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
//           >
//             Back
//           </button>

//           <button
//             type="submit"
//             onClick={handleSubmit}
//             className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
//           >
//             Confirm
//           </button>
//         </div>

//         <ToastContainer position="top-center" autoClose={1200} />
//       </div>
//     </MainLayout>
//   );
// };

// export default ExamAddAssignBlocks;

import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

const ExamAddAssignBlocks = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    standard: "",
    division: "",
    examType: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });

  const [examDetails, setExamDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timetables, setTimetables] = useState([]);
  const [filteredTimetables, setFilteredTimetables] = useState([]);

  // Fetch timetable data on mount
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        // FIX 1: Using imported API_BASE_URL
        const response = await fetch(`${API_BASE_URL}api/etimetable`, {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch timetable");
        }
        const data = await response.json();
        console.log(data);
        setTimetables(data);
        setExamDetails(data); // Assuming timetables contain exam details
        setLoading(false);
      } catch (err) {
        console.error("Error fetching timetable:", err);
        toast.error("Failed to load timetable data");
        setLoading(false);
      }
    };
    fetchTimetable();
  }, []);

  // Filter timetables based on standard and division
  useEffect(() => {
    if (formData.standard && formData.division) {
      const filtered = timetables.filter(
        (t) => t.standard === formData.standard && t.division === formData.division
      );
      setFilteredTimetables(filtered);

      // Auto-select first available examType, startDate, and endDate if available
      if (filtered.length > 0) {
        setFormData((prev) => ({
          ...prev,
          examType: filtered[0].examType || "",
          startDate: filtered[0].startdate || "",
          endDate: filtered[0].enddate || "",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          examType: "",
          startDate: "",
          endDate: "",
        }));
        toast.warn(
          "No timetable data found for selected standard and division"
        );
      }
    } else {
      setFilteredTimetables([]);
      setFormData((prev) => ({
        ...prev,
        examType: "",
        startDate: "",
        endDate: "",
      }));
    }
  }, [formData.standard, formData.division, timetables]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (
      !formData.standard ||
      !formData.division ||
      !formData.examType ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.startTime ||
      !formData.endTime
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    // Validate date range
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      toast.error("End date must be after start date");
      return;
    }

    try {
      // FIX 2: Using imported API_BASE_URL
      const res = await fetch(`${API_BASE_URL}api/assign-eblock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Block Assigned Successfully");
        setTimeout(() => navigate("/exams-assign-blocks"), 1500);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to assign block");
      }
    } catch (err) {
      console.error("Error assigning block:", err);
      toast.error("Error while saving block");
    }
  };

  // Get unique standards and divisions from exam details

  const getUniqueExamTypes = () => {
    const examTypes = filteredTimetables
      .map((exam) => exam.examType)
      .filter(Boolean);
    return [...new Set(examTypes)];
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="bg-white rounded-2xl shadow p-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading exam details...</p>
        </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Add Exam Block
        </h2>

        {examDetails.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-700">
              Found {examDetails.length} exam record(s) in the timetable
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-1">Standard</label>
            <select
              name="standard"
              value={formData.standard}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Standard</option>
              <option value="Grade 1">1</option>
              <option value="Grade 2">2</option>
              <option value="Grade 3">3</option>
              <option value="Grade 4">4</option>
              <option value="Grade 5">5</option>
              <option value="Grade 6">6</option>
              <option value="Grade 7">7</option>
              <option value="Grade 8">8</option>
              <option value="Grade 9">9</option>
              <option value="Grade 10">10</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Division</label>
            <select
              name="division"
              value={formData.division}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Division</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Exam Type
            </label>
            <select
              name="examType"
              value={formData.examType}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              disabled={!formData.standard || !formData.division}
            >
              <option value="">Select Exam Type</option>
              {getUniqueExamTypes().map((examType) => (
                <option key={examType} value={examType}>
                  {examType}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Start Date</label>
            <input
              type="text"
              name="startDate"
              value={formData.startDate}
              className="w-full p-2 border rounded-md bg-gray-100"
              readOnly
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">End Date</label>
            <input
              type="text"
              name="endDate"
              value={formData.endDate}
              className="w-full p-2 border rounded-md bg-gray-100"
              readOnly
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">End Time</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => navigate("/exams-assign-blocks")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
          >
            Back
          </button>

          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
          >
            Confirm
          </button>
        </div>

        <ToastContainer position="top-center" autoClose={1200} />
      </div>
    </MainLayout>
  );
};

export default ExamAddAssignBlocks;