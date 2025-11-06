// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// const ExamAddSupervisors = () => {
//   const navigate = useNavigate();
//   const [timetables, setTimetables] = useState([]); // full timetable data
//   const [formData, setFormData] = useState({
//     examtype: "",
//     examdate: "",
//     timeslot: "",
//     totalavailable: "",
//   });
//   const [availableTimeslots, setAvailableTimeslots] = useState([]);

//   // Fetch timetable on mount
//   useEffect(() => {
//     const fetchTimetable = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/etimetable",{
//             headers:{
//                 auth:'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
//             }
//         });
//         const data = await response.json();
//         setTimetables(data);
//       } catch (err) {
//         console.error("Error fetching timetable:", err);
//       }
//     };
//     fetchTimetable();
//   }, []);

//   // Update examtype and timeslots when examdate changes
//   const handleDateChange = (e) => {
//     const selectedDate = e.target.value;
//     setFormData((prev) => ({
//       ...prev,
//       examdate: selectedDate,
//     }));

//     // Find timetable entry for selected date
//     const entry = timetables.find(
//       (t) => new Date(t.startdate).toDateString() === new Date(selectedDate).toDateString()
//     );

//     if (entry) {
//       setFormData((prev) => ({
//         ...prev,
//         examtype: entry.examtype,
//         timeslot: "", // reset timeslot
//       }));

//       // Generate available timeslots from timetable
//       const slots = entry.timetable.map(
//         (t) => `${t.starttime} - ${t.endtime}`
//       );
//       setAvailableTimeslots(slots);
//     } else {
//       setFormData((prev) => ({ ...prev, examtype: "", timeslot: "" }));
//       setAvailableTimeslots([]);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/api/add-supervisior", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//         },
//         body: JSON.stringify(formData),
//       });
//       const result = await response.json();
//       if (response.ok) {
//         toast.success("Supervisor Added!", { position: "top-center" });
//         navigate("/exams-supervisor-allotment");
//       } else {
//         toast.error(result.error || "Failed to add supervisor");
//       }
//     } catch (err) {
//       toast.error("Error: " + err.message);
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2">
//           Add Supervisors
//         </h2>

//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             {/* Exam Date Dropdown */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Exam Date
//               </label>
//               <select
//                 name="examdate"
//                 value={formData.examdate}
//                 onChange={handleDateChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Exam Date</option>
//                 {timetables.map((t) => (
//                   <option key={t._id} value={t.startdate}>
//                     {new Date(t.startdate).toLocaleDateString()} ({t.examtype})
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Exam Type (auto-filled) */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Exam Type
//               </label>
//               <input
//                 type="text"
//                 name="examtype"
//                 value={formData.examtype}
//                 readOnly
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
//               />
//             </div>

//             {/* Time Slot Dropdown */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Time Slot
//               </label>
//               <select
//                 name="timeslot"
//                 value={formData.timeslot}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 disabled={availableTimeslots.length === 0}
//               >
//                 <option value="">Select Time Slot</option>
//                 {availableTimeslots.map((slot, index) => (
//                   <option key={index} value={slot}>
//                     {slot}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Total Available Supervisors */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Total Available Supervisors
//               </label>
//               <select
//                 name="totalavailable"
//                 value={formData.totalavailable}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Supervisors</option>
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//                 <option value="3">3</option>
//                 <option value="4">4</option>
//               </select>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-between items-center mt-8">
//             <button
//               type="button"
//               onClick={() => navigate("/exams-supervisor-allotment")}
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
//         <ToastContainer />
//       </div>
//     </MainLayout>
//   );
// };

// export default ExamAddSupervisors;


import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

const ExamAddSupervisors = () => {
  const navigate = useNavigate();
  const [timetables, setTimetables] = useState([]); // full timetable data
  const [formData, setFormData] = useState({
    examtype: "",
    examdate: "",
    timeslot: "",
    totalavailable: "",
  });
  const [availableTimeslots, setAvailableTimeslots] = useState([]);

  // Fetch timetable on mount
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        // FIX 1: Using imported API_BASE_URL
        const response = await fetch(`${API_BASE_URL}api/etimetable`,{
            headers:{
                auth:'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
            }
        });
        const data = await response.json();
        setTimetables(data);
      } catch (err) {
        console.error("Error fetching timetable:", err);
      }
    };
    fetchTimetable();
  }, []);

  // Update examtype and timeslots when examdate changes
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setFormData((prev) => ({
      ...prev,
      examdate: selectedDate,
    }));

    // Find timetable entry for selected date
    const entry = timetables.find(
      (t) => new Date(t.startdate).toDateString() === new Date(selectedDate).toDateString()
    );

    if (entry) {
      setFormData((prev) => ({
        ...prev,
        examtype: entry.examtype,
        timeslot: "", // reset timeslot
      }));

      // Generate available timeslots from timetable
      const slots = entry.timetable.map(
        (t) => `${t.starttime} - ${t.endtime}`
      );
      setAvailableTimeslots(slots);
    } else {
      setFormData((prev) => ({ ...prev, examtype: "", timeslot: "" }));
      setAvailableTimeslots([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // FIX 2: Using imported API_BASE_URL
      const response = await fetch(`${API_BASE_URL}api/add-supervisior`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success("Supervisor Added!", { position: "top-center" });
        navigate("/exams-supervisor-allotment");
      } else {
        toast.error(result.error || "Failed to add supervisor");
      }
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2">
          Add Supervisors
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Exam Date Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Exam Date
              </label>
              <select
                name="examdate"
                value={formData.examdate}
                onChange={handleDateChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Exam Date</option>
                {timetables.map((t) => (
                  <option key={t._id} value={t.startdate}>
                    {new Date(t.startdate).toLocaleDateString()} ({t.examtype})
                  </option>
                ))}
              </select>
            </div>

            {/* Exam Type (auto-filled) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Exam Type
              </label>
              <input
                type="text"
                name="examtype"
                value={formData.examtype}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>

            {/* Time Slot Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Slot
              </label>
              <select
                name="timeslot"
                value={formData.timeslot}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={availableTimeslots.length === 0}
              >
                <option value="">Select Time Slot</option>
                {availableTimeslots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            {/* Total Available Supervisors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Available Supervisors
              </label>
              <select
                name="totalavailable"
                value={formData.totalavailable}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Supervisors</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              type="button"
              onClick={() => navigate("/exams-supervisor-allotment")}
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
        </form>
        <ToastContainer />
      </div>
    </MainLayout>
  );
};

export default ExamAddSupervisors;