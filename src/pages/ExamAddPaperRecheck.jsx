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


import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

const ExamAddPaperRecheck = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    teacher: "",
    standard: "",
    division: "",
    subject: "",
    papers: "",
    checkedBy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      // FIX: Using imported API_BASE_URL
      const res = await fetch(`${API_BASE_URL}api/assign-recheck`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Rechecking Assigned Successfully");
        setTimeout(() => navigate("/exams-recheck"), 1500);
      } else {
        toast.error("Failed to assign rechecking");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Error while saving rechecking");
    }
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-3xl mx-auto">
        {/* Heading */}
        <div className="mb-6 pb-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Assign Exam Paper Rechecking
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details to assign papers for rechecking.
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
              <option value="Ms. Anita Rao">Ms. Anita Rao</option>
              <option value="Mr. Rahul Menon">Mr. Rahul Menon</option>
              <option value="Ms. Fatima Noor">Ms. Fatima Noor</option>
              <option value="Mr. Arjun Iyer">Mr. Arjun Iyer</option>
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
              <option value="6">Grade 6</option>
              <option value="7">Grade 7</option>
              <option value="8">Grade 8</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
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
              <option value="Math">Math</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
              <option value="History">History</option>
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

          {/* Checked By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Checked By
            </label>
            <select
              name="checkedBy"
              value={form.checkedBy}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Staff</option>
              <option value="Principal">Principal</option>
              <option value="Exam Head">Exam Head</option>
              <option value="Coordinator">Coordinator</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Back and Next Buttons on the same line */}
          <div className="flex justify-between items-center mt-8">
            <button
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