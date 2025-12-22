// import React, { useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate } from "react-router-dom";

// const ExamAddPaperRecheck = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     teacher: "",
//     standard: "",
//     division: "",
//     subject: "",
//     papers: "",
//     checkedBy: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/assign-recheck", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         toast.success("Rechecking Assigned Successfully");
//         setTimeout(() => navigate("/exams-recheck"), 1500);
//       } else {
//         toast.error("Failed to assign rechecking");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       toast.error("Error while saving rechecking");
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow-md p-8 max-w-3xl mx-auto">
//         {/* Heading */}
//         <div className="mb-6 pb-4">
//           <h1 className="text-2xl font-semibold text-gray-800">
//             Assign Exam Paper Rechecking
//           </h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Fill in the details to assign papers for rechecking.
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
//               <option value="Ms. Anita Rao">Ms. Anita Rao</option>
//               <option value="Mr. Rahul Menon">Mr. Rahul Menon</option>
//               <option value="Ms. Fatima Noor">Ms. Fatima Noor</option>
//               <option value="Mr. Arjun Iyer">Mr. Arjun Iyer</option>
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
//               <option value="6">Grade 6</option>
//               <option value="7">Grade 7</option>
//               <option value="8">Grade 8</option>
//               <option value="9">Grade 9</option>
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
//               <option value="Math">Math</option>
//               <option value="Science">Science</option>
//               <option value="English">English</option>
//               <option value="History">History</option>
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

//           {/* Checked By */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Checked By
//             </label>
//             <select
//               name="checkedBy"
//               value={form.checkedBy}
//               onChange={handleChange}
//               className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select Staff</option>
//               <option value="Principal">Principal</option>
//               <option value="Exam Head">Exam Head</option>
//               <option value="Coordinator">Coordinator</option>
//               <option value="Admin">Admin</option>
//             </select>
//           </div>

//           {/* Back and Next Buttons on the same line */}
//           <div className="flex justify-between items-center mt-8">
//             <button
//               onClick={() => navigate("/exams-paper-recheck")}
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

// export default ExamAddPaperRecheck;


// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate } from "react-router-dom";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// const ExamAddPaperRecheck = () => {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     teacher: "",
//     standard: "",
//     division: "",
//     subject: "",
//     papers: "",
//     checkedBy: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     try {
//       // FIX: Using imported API_BASE_URL
//       const res = await fetch(`${API_BASE_URL}api/assign-recheck`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         toast.success("Rechecking Assigned Successfully");
//         setTimeout(() => navigate("/exams-recheck"), 1500);
//       } else {
//         toast.error("Failed to assign rechecking");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       toast.error("Error while saving rechecking");
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow-md p-8 max-w-3xl mx-auto">
//         {/* Heading */}
//         <div className="mb-6 pb-4">
//           <h1 className="text-2xl font-semibold text-gray-800">
//             Assign Exam Paper Rechecking
//           </h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Fill in the details to assign papers for rechecking.
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
//               <option value="Ms. Anita Rao">Ms. Anita Rao</option>
//               <option value="Mr. Rahul Menon">Mr. Rahul Menon</option>
//               <option value="Ms. Fatima Noor">Ms. Fatima Noor</option>
//               <option value="Mr. Arjun Iyer">Mr. Arjun Iyer</option>
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
//               <option value="Math">Math</option>
//               <option value="Science">Science</option>
//               <option value="English">English</option>
//               <option value="History">History</option>
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

//           {/* Checked By */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Checked By
//             </label>
//             <select
//               name="checkedBy"
//               value={form.checkedBy}
//               onChange={handleChange}
//               className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select Staff</option>
//               <option value="Principal">Principal</option>
//               <option value="Exam Head">Exam Head</option>
//               <option value="Coordinator">Coordinator</option>
//               <option value="Admin">Admin</option>
//             </select>
//           </div>

//           {/* Back and Next Buttons on the same line */}
//           <div className="flex justify-between items-center mt-8">
//             <button
//               onClick={() => navigate("/exams-paper-recheck")}
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

// export default ExamAddPaperRecheck;






// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate } from "react-router-dom";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// const ExamAddPaperRecheck = () => {
//   const navigate = useNavigate();
//   const [teachers, setTeachers] = useState([]);
//   const [subjects, setSubjects] = useState([]); // Array of subject names
//   const [staffs, setStaffs] = useState([]); // Used for Checked By dropdown (Admin, Coordinator, etc.)

//   const [form, setForm] = useState({
//     teacher: "", // Assigned Teacher ID
//     standard: "",
//     division: "",
//     subject: "",
//     papers: "",
//     checkedBy: "", // Checking Staff ID/Role
//   });
//   
//   const AUTH_TOKEN = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
//   const apiHeaders = { "Content-Type": "application/json", auth: `${AUTH_TOKEN}` };

//   // 1. Fetch Teachers on mount
//   useEffect(() => {
//     fetchTeachers();
//   }, []);

//   // 2. Fetch Subjects when Standard changes
//   useEffect(() => {
//     if (form.standard) {
//       fetchSubjects(form.standard);
//     } else {
//       setSubjects([]); // Clear subjects if no standard is selected
//     }
//   }, [form.standard]);

//   const fetchTeachers = async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}api/staff`, {
//         method: "GET",
//         headers: apiHeaders,
//       });
//       const data = await response.json();
//       
//       let staffList = [];

//       // FIX: Check if data is an array (direct return) OR if it's wrapped in { success: true, data: [...] }
//       if (Array.isArray(data)) {
//           // Case 1: API returns a direct array of staff objects (as indicated by your console log)
//           staffList = data;
//       } else if (data.success && Array.isArray(data.data)) {
//           // Case 2: API returns a success wrapper
//           staffList = data.data;
//       } else {
//           // Handle API failure or unexpected format
//           console.error("API Error fetching staff:", data.message || data);
//           return;
//       }

//       setTeachers(staffList);
//       setStaffs(staffList); 
      
//     } catch (error) {
//       console.error("Error fetching teachers:", error);
//     }
//   };

//   const fetchSubjects = async (standard) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}api/subjects/${standard}`, {
//         method: "GET",
//         headers: apiHeaders,
//       });
//       const data = await response.json();
//       
//       // Assuming API response structure is { subjects: [{ subjectname: ["Maths", "Science"] }] }
//       if (data.subjects && data.subjects.length > 0 && data.subjects[0].subjectname) {
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
//   
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     
//     const assignmentData = {
//       assignedTo: form.teacher, // Renamed to match the field used in the backend controller (assignedTo)
//       standard: form.standard,
//       division: form.division,
//       subject: form.subject,
//       numberOfPapers: parseInt(form.papers),
//       assignedBy: "Admin", // Assuming logged-in admin
//       checkedBy: form.checkedBy,
//     };

//     try {
//       // FIX: Using imported API_BASE_URL and correcting variable name from formData to assignmentData
//       const res = await fetch(`${API_BASE_URL}api/assign-recheck`, {
//         method: "POST",
//         headers: apiHeaders,
//         body: JSON.stringify(assignmentData),
//       });
//       
//       const result = await res.json();

//       if (res.ok && result.message) {
//         alert(`${result.message}`);
//         navigate("/exams-paper-recheck"); // Corrected path to match router and previous use
//       } else {
//         alert(`Failed to assign rechecking: ${result.message || 'Unknown error'}`);
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       alert("Error while saving rechecking: " + err.message);
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow-md p-8 max-w-3xl mx-auto">
//         {/* Heading */}
//         <div className="mb-6 pb-4">
//           <h1 className="text-2xl font-semibold text-gray-800">
//             Assign Exam Paper Rechecking
//           </h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Fill in the details to assign papers for rechecking.
//           </p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Teacher (Assigned To) */}
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
//               {/* Dynamic standards list generation is complex, retaining static but expanded list */}
//               {Array.from({ length: 10 }, (_, i) => i + 1).map(grade => (
//                 <option key={grade} value={String(grade)}>
//                   {grade}
//                 </option>
//               ))}
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
//               <option value="D">D</option>
//               <option value="E">E</option>
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

//           {/* Checked By (Staff List) */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Checked By
//             </label>
//             <select
//               name="checkedBy"
//               value={form.checkedBy}
//               onChange={handleChange}
//               className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select Staff</option>
//               {staffs.map((staff) => (
//                 <option key={staff._id} value={staff._id}>
//                   {staff.firstname} {staff.lastname}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Back and Next Buttons on the same line */}
//           <div className="flex justify-between items-center mt-8">
//             <button
//               onClick={() => navigate("/exams-paper-recheck")}
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

// export default ExamAddPaperRecheck;






















import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from '../config'; 

const ExamAddPaperRecheck = () => {
    const navigate = useNavigate();
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]); 
    const [form, setForm] = useState({
        teacher: "", // Assigned Recheck Teacher ID
        standard: "",
        division: "",
        subject: "",
        papers: "",
        checkedBy: "", // Original Evaluator ID (Hidden)
        checkedByDisplay: "", // Original Evaluator Name (Visible in Input)
    });

    const AUTH_TOKEN = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
    const apiHeaders = { "Content-Type": "application/json", auth: `${AUTH_TOKEN}` };

    // 1. Fetch Teachers on mount
    useEffect(() => {
        fetchTeachers();
    }, []);

    // 2. Fetch Subjects when Standard changes
    useEffect(() => {
        if (form.standard) {
            fetchSubjects(form.standard);
        } else {
            setSubjects([]); 
        }
    }, [form.standard]);

    // 3. Automated Lookup: Fetch Original Evaluator when Class/Subject details change
    useEffect(() => {
        if (form.standard && form.division && form.subject) {
            fetchOriginalEvaluator();
        }
    }, [form.standard, form.division, form.subject]);

    const fetchTeachers = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}api/staff`, {
                method: "GET",
                headers: apiHeaders,
            });
            const data = await response.json();
            
            let staffList = [];
            if (Array.isArray(data)) {
                staffList = data;
            } else if (data.success && Array.isArray(data.data)) {
                staffList = data.data;
            }
            setTeachers(staffList);
        } catch (error) {
            console.error("Error fetching teachers:", error);
        }
    };

    const fetchSubjects = async (standard) => {
        try {
            const response = await fetch(`${API_BASE_URL}api/subjects/${standard}`, {
                method: "GET",
                headers: apiHeaders,
            });
            const data = await response.json();
            if (data.subjects && data.subjects.length > 0 && data.subjects[0].subjectname) {
                setSubjects(data.subjects[0].subjectname);
            } else {
                setSubjects([]);
            }
        } catch (error) {
            console.error("Error fetching subjects:", error);
        }
    };

    const fetchOriginalEvaluator = async () => {
        try {
            // We fetch the paper evaluation list to find the original allotement
            const response = await fetch(`${API_BASE_URL}api/assigned-papers`, {
                method: "GET",
                headers: apiHeaders,
            });
            const result = await response.json();
            
            if (result.success) {
                // Find matching evaluation record
                const match = result.data.find(item => 
                    String(item.standard) === String(form.standard) && 
                    String(item.division) === String(form.division) && 
                    item.subject === form.subject
                );

                if (match && match.assignedteacher) {
                    setForm(prev => ({
                        ...prev,
                        checkedBy: match.assignedteacher._id,
                        checkedByDisplay: `${match.assignedteacher.firstname} ${match.assignedteacher.lastname || ""}`
                    }));
                } else {
                    setForm(prev => ({
                        ...prev,
                        checkedBy: "",
                        checkedByDisplay: "No original evaluator found"
                    }));
                }
            }
        } catch (err) {
            console.error("Error fetching original evaluator:", err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const assignmentData = {
            assignedTo: form.teacher, 
            standard: form.standard,
            division: form.division,
            subject: form.subject,
            numberOfPapers: parseInt(form.papers),
            assignedBy: "Admin", 
            checkedBy: form.checkedBy, // This is the ID found by the auto-lookup
        };

        try {
            const res = await fetch(`${API_BASE_URL}api/assign-recheck`, {
                method: "POST",
                headers: apiHeaders,
                body: JSON.stringify(assignmentData),
            });
            
            const result = await res.json();

            if (res.ok) {
                alert(result.message || "Rechecking assigned successfully");
                navigate("/exams-paper-recheck"); 
            } else {
                alert(`Failed to assign rechecking: ${result.message || result.error || 'Unknown error'}`);
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Error while saving rechecking: " + err.message);
        }
    };

    return (
        <MainLayout>
            <div className="bg-white rounded-2xl shadow-md p-8 max-w-3xl mx-auto">
                <div className="mb-6 pb-4">
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Assign Exam Paper Rechecking
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Fill in the details to assign papers for rechecking.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Teacher Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teacher</label>
                        <select
                            name="teacher"
                            value={form.teacher}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Teacher</option>
                            {teachers.map((t) => (
                                <option key={t._id} value={t._id}>{t.firstname} {t.lastname}</option>
                            ))}
                        </select>
                    </div>

                    {/* Standard Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Standard</label>
                        <select
                            name="standard"
                            value={form.standard}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Standard</option>
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(grade => (
                                <option key={grade} value={String(grade)}>{grade}</option>
                            ))}
                        </select>
                    </div>

                    {/* Division Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
                        <select
                            name="division"
                            value={form.division}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Division</option>
                            {["A", "B", "C", "D", "E"].map(div => (
                                <option key={div} value={div}>{div}</option>
                            ))}
                        </select>
                    </div>

                    {/* Subject Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <select
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Subject</option>
                            {subjects.map((subj, index) => (
                                <option key={index} value={subj}>{subj}</option>
                            ))}
                        </select>
                    </div>

                    {/* Number of Papers Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">No. of Papers</label>
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

                    {/* Checked By (Automated Display Input) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Checked By</label>
                        <input
                            type="text"
                            name="checkedByDisplay"
                            value={form.checkedByDisplay}
                            readOnly
                            placeholder="Select Standard, Div, and Subject to auto-fill"
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-50 text-gray-600 outline-none"
                        />
                    </div>

                    <div className="flex justify-between items-center mt-8">
                        <button
                            type="button"
                            onClick={() => navigate("/exams-paper-recheck")}
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
            </div>
        </MainLayout>
    );
};

export default ExamAddPaperRecheck;