// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate } from "react-router-dom";

// const ExamAddPaperEval = () => {
//   const navigate = useNavigate();
//   const [teachers, setTeachers] = useState([]);
//   const [subjects, setSubjects] = useState([]);

//   const [form, setForm] = useState({
//     teacher: "",
//     standard: "",
//     division: "",
//     subject: "",
//     papers: "",
//   });

//   const API_BASE_URL = "http://localhost:5000/api";
//   const AUTH_TOKEN = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

//   const apiHeaders = {
//     "Content-Type": "application/json",
//     auth: `${AUTH_TOKEN}`,
//   };

//   useEffect(() => {
//     fetchTeachers();
//   }, []);

//   useEffect(() => {
//     if (form.standard) {
//       fetchSubjects(form.standard);
//     }
//   }, [form.standard]);

//   const fetchTeachers = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/staff`, {
//         method: "GET",
//         headers: apiHeaders,
//       });
//       const data = await response.json();
//       console.log(data);
//       setTeachers(data.success ? data.data : data);
//     } catch (error) {
//       console.error("Error fetching teachers:", error);
//     }
//   };

//   const fetchSubjects = async (standard) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/subjects/${standard}`, {
//         method: "GET",
//         headers: apiHeaders,
//       });
//       const data = await response.json();
//       console.log("Subjects API Response:", data);

//       // ✅ make sure subjects state is always an array of subject strings
//       if (data.subjects && data.subjects.length > 0) {
//         setSubjects(data.subjects[0].subjectname);
//       } else {
//         setSubjects([]);
//       }
//     } catch (error) {
//       console.error("Error fetching subjects:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const assignmentData = {
//       assignedteacher: form.teacher,
//       standard: form.standard,
//       division: form.division,
//       subject: form.subject,
//       numberOfPapers: parseInt(form.papers),
//       assignedby: "admin",
//     };

//     console.log(assignmentData)

//     try {
//       const response = await fetch(`${API_BASE_URL}/assign-paper`, {
//         method: "POST",
//         headers: apiHeaders,
//         body: JSON.stringify(assignmentData),
//       });

//       const result = await response.json();
//       if (result.success) {
//         alert("Paper assignment created successfully!");
//         navigate("/exams-paper-evaluation");
//       } else {
//         alert("Error creating assignment: " + result.message);
//       }
//     } catch (error) {
//       alert("Error creating assignment: " + error.message);
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow-md p-8 max-w-3xl mx-auto">
//         {/* Heading */}
//         <div className="mb-6 pb-4">
//           <h1 className="text-2xl font-semibold text-gray-800">
//             Assign Exam Paper Evaluation
//           </h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Fill in the details to assign papers for evaluation.
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Teacher */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Teacher
//             </label>
//             <select
//               name="teacher"
//               value={form.teacher}
//               onChange={handleChange}
//               className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select Teacher</option>
//               {teachers.map((teacher) => (
//                 <option key={teacher._id} value={teacher._id}>
//                   {teacher.firstname} {teacher.lastname}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Standard */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Standard
//             </label>
//             <select
//               name="standard"
//               value={form.standard}
//               onChange={handleChange}
//               className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select Standard</option>
//               <option value="1">Grade 1</option>
//               <option value="2">Grade 2</option>
//               <option value="3">Grade 3</option>
//               <option value="4">Grade 4</option>
//               <option value="5">Grade 5</option>
//               <option value="6">Grade 6</option>
//               <option value="7">Grade 7</option>
//               <option value="8">Grade 8</option>
//               <option value="9">Grade 9</option>
//               <option value="10">Grade 10</option>
//             </select>
//           </div>

//           {/* Division */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Division
//             </label>
//             <select
//               name="division"
//               value={form.division}
//               onChange={handleChange}
//               className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select Division</option>
//               <option value="A">A</option>
//               <option value="B">B</option>
//               <option value="C">C</option>
//             </select>
//           </div>

//           {/* Subject */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Subject
//             </label>
//             <select
//               name="subject"
//               value={form.subject}
//               onChange={handleChange}
//               className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select Subject</option>
//               {subjects.map((subj, index) => (
//                 <option key={index} value={subj}>
//                   {subj}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Number of Papers */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               No. of Papers
//             </label>
//             <input
//               type="number"
//               name="papers"
//               value={form.papers}
//               onChange={handleChange}
//               min="1"
//               className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* Back and Next Buttons on the same line */}
//           <div className="flex justify-between items-center mt-8">
//             <button
//               onClick={() => navigate("/exams-paper-eval")}
//               className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
//             >
//               Back
//             </button>

//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
//             >
//               Confirm
//             </button>
//           </div>
//         </form>
//       </div>
//     </MainLayout>
//   );
// };

// export default ExamAddPaperEval;







// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// const ExamAddPaperEval = () => {
//   const navigate = useNavigate();
//   const [teachers, setTeachers] = useState([]);
//   const [subjects, setSubjects] = useState([]);

//   const [form, setForm] = useState({
//     teacher: "",
//     standard: "",
//     division: "",
//     subject: "",
//     papers: "",
//   });

//   // const API_BASE_URL = "http://localhost:5000/api"; // REMOVED LOCAL DEFINITION
//   const AUTH_TOKEN = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

//   const apiHeaders = {
//     "Content-Type": "application/json",
//     auth: `${AUTH_TOKEN}`,
//   };

//   useEffect(() => {
//     fetchTeachers();
//   }, []);

//   useEffect(() => {
//     if (form.standard) {
//       fetchSubjects(form.standard);
//     }
//   }, [form.standard]);

//   const fetchTeachers = async () => {
//     try {
//       // FIX 1: Using imported API_BASE_URL
//       const response = await fetch(`${API_BASE_URL}api/staff`, {
//         method: "GET",
//         headers: apiHeaders,
//       });
//       const data = await response.json();
//       console.log(data);
//       setTeachers(data.success ? data.data : data);
//     } catch (error) {
//       console.error("Error fetching teachers:", error);
//     }
//   };

//   const fetchSubjects = async (standard) => {
//     try {
//       // FIX 2: Using imported API_BASE_URL
//       const response = await fetch(`${API_BASE_URL}api/subjects/${standard}`, {
//         method: "GET",
//         headers: apiHeaders,
//       });
//       const data = await response.json();
//       console.log("Subjects API Response:", data);

//       // ✅ make sure subjects state is always an array of subject strings
//       if (data.subjects && data.subjects.length > 0) {
//         setSubjects(data.subjects[0].subjectname);
//       } else {
//         setSubjects([]);
//       }
//     } catch (error) {
//       console.error("Error fetching subjects:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const assignmentData = {
//       assignedteacher: form.teacher,
//       standard: form.standard,
//       division: form.division,
//       subject: form.subject,
//       numberOfPapers: parseInt(form.papers),
//       assignedby: "admin",
//     };

//     console.log(assignmentData)

//     try {
//       // FIX 3: Using imported API_BASE_URL
//       const response = await fetch(`${API_BASE_URL}api/assign-paper`, {
//         method: "POST",
//         headers: apiHeaders,
//         body: JSON.stringify(assignmentData),
//       });

//       const result = await response.json();
//       if (result.success) {
//         alert("Paper assignment created successfully!");
//         navigate("/exams-paper-evaluation");
//       } else {
//         alert("Error creating assignment: " + result.message);
//       }
//     } catch (error) {
//       alert("Error creating assignment: " + error.message);
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow-md p-8 max-w-3xl mx-auto">
//         {/* Heading */}
//         <div className="mb-6 pb-4">
//           <h1 className="text-2xl font-semibold text-gray-800">
//             Assign Exam Paper Evaluation
//           </h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Fill in the details to assign papers for evaluation.
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Teacher */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Teacher
//             </label>
//             <select
//               name="teacher"
//               value={form.teacher}
//               onChange={handleChange}
//               className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select Teacher</option>
//               {teachers.map((teacher) => (
//                 <option key={teacher._id} value={teacher._id}>
//                   {teacher.firstname} {teacher.lastname}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Standard */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Standard
//             </label>
//             <select
//               name="standard"
//               value={form.standard}
//               onChange={handleChange}
//               className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select Standard</option>
//               <option value="1">Grade 1</option>
//               <option value="2">Grade 2</option>
//               <option value="3">Grade 3</option>
//               <option value="4">Grade 4</option>
//               <option value="5">Grade 5</option>
//               <option value="6">Grade 6</option>
//               <option value="7">Grade 7</option>
//               <option value="8">Grade 8</option>
//               <option value="9">Grade 9</option>
//               <option value="10">Grade 10</option>
//             </select>
//           </div>

//           {/* Division */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Division
//             </label>
//             <select
//               name="division"
//               value={form.division}
//               onChange={handleChange}
//               className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select Division</option>
//               <option value="A">A</option>
//               <option value="B">B</option>
//               <option value="C">C</option>
//             </select>
//           </div>

//           {/* Subject */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Subject
//             </label>
//             <select
//               name="subject"
//               value={form.subject}
//               onChange={handleChange}
//               className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select Subject</option>
//               {subjects.map((subj, index) => (
//                 <option key={index} value={subj}>
//                   {subj}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Number of Papers */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               No. of Papers
//             </label>
//             <input
//               type="number"
//               name="papers"
//               value={form.papers}
//               onChange={handleChange}
//               min="1"
//               className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {/* Back and Next Buttons on the same line */}
//           <div className="flex justify-between items-center mt-8">
//             <button
//               onClick={() => navigate("/exams-paper-eval")}
//               className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
//             >
//               Back
//             </button>

//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
//             >
//               Confirm
//             </button>
//           </div>
//         </form>
//       </div>
//     </MainLayout>
//   );
// };

// export default ExamAddPaperEval;




import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

const ExamAddPaperEval = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [form, setForm] = useState({
    teacher: "",
    standard: "",
    division: "",
    subject: "",
    papers: "",
  });

  // const API_BASE_URL = "http://localhost:5000/api"; // REMOVED LOCAL DEFINITION
  const AUTH_TOKEN = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

  const apiHeaders = {
    "Content-Type": "application/json",
    auth: `${AUTH_TOKEN}`,
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    if (form.standard) {
      fetchSubjects(form.standard);
    }
  }, [form.standard]);

  const fetchTeachers = async () => {
    try {
      // FIX 1: Using imported API_BASE_URL
      const response = await fetch(`${API_BASE_URL}api/staff`, {
        method: "GET",
        headers: apiHeaders,
      });
      const data = await response.json();
      console.log(data);
      setTeachers(data.success ? data.data : data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchSubjects = async (standard) => {
    try {
      // FIX 2: Using imported API_BASE_URL
      const response = await fetch(`${API_BASE_URL}api/subjects/${standard}`, {
        method: "GET",
        headers: apiHeaders,
      });
      const data = await response.json();
      console.log("Subjects API Response:", data);

      // ✅ make sure subjects state is always an array of subject strings
      if (data.subjects && data.subjects.length > 0) {
        setSubjects(data.subjects[0].subjectname);
      } else {
        setSubjects([]);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const assignmentData = {
      assignedteacher: form.teacher,
      standard: form.standard,
      division: form.division,
      subject: form.subject,
      numberOfPapers: parseInt(form.papers),
      assignedby: "admin",
    };

    console.log(assignmentData)

    try {
      // FIX 3: Using imported API_BASE_URL
      const response = await fetch(`${API_BASE_URL}api/assign-paper`, {
        method: "POST",
        headers: apiHeaders,
        body: JSON.stringify(assignmentData),
      });

      const result = await response.json();
      // Check for server success field (fixed in controller)
      if (result.success) {
        alert("Paper assignment created successfully!");
        navigate("/exams-paper-eval");
      } else {
        // Updated to handle both 'message' and 'error' fields
        alert("Error creating assignment: " + (result.message || result.error));
      }
    } catch (error) {
      alert("Error creating assignment: " + error.message);
    }
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-3xl mx-auto">
        {/* Heading */}
        <div className="mb-6 pb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Assign Exam Paper Evaluation
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details to assign papers for evaluation.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Teacher */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teacher
            </label>
            <select
              name="teacher"
              value={form.teacher}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {/* CHANGE: Displaying full name (firstname + lastname) */}
                  {teacher.firstname} {teacher.lastname}
                </option>
              ))}
            </select>
          </div>

          {/* Standard */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Standard
            </label>
            <select
              name="standard"
              value={form.standard}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Standard</option>
              {/* CHANGE: Displaying only numbers 1 through 10 */}
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          {/* Division */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Division
            </label>
            <select
              name="division"
              value={form.division}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Division</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Subject</option>
              {subjects.map((subj, index) => (
                <option key={index} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>

          {/* Number of Papers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              No. of Papers
            </label>
            <input
              type="number"
              name="papers"
              value={form.papers}
              onChange={handleChange}
              min="1"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Back and Next Buttons on the same line */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => navigate("/exams-paper-eval")}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
            >
              Back
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
            >
              Confirm
            </button>
          </div>
        </form>
        {/* Custom Alert Box (Placeholder for alert() removal if needed later)
        {alertMessage && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-xl">
                    <p className="text-gray-700">{alertMessage}</p>
                    <button 
                        onClick={() => setAlertMessage(null)} 
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        OK
                    </button>
                </div>
            </div>
        )} 
        */}
      </div>
    </MainLayout>
  );
};

export default ExamAddPaperEval;