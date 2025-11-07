// import React, { useState } from "react";
// import axios from "axios";

// const AddAnnouncement = ({ isOpen, onClose, setAnnouncements }) => {
//   if (!isOpen) return null;

//   const [formData, setFormData] = useState({
//     announcementId: Date.now(),
//     priority: "",
//     title: "",
//     visibility: "all",
//     department: "",
//     schedule: "",
//     status: "draft",
//     description:""
//   });
//   const today = new Date().toISOString().split("T")[0];
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     console.log(formData.schedule)
//   };

//   const handleAddAnnouncement = async () => {
//     try {
//       console.warn("formData: ",formData)
//       const res = await axios.post(
//         "https://sspd-school-portal.vercel.app/api/add-announcement",
//         formData,
//         {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         }
//       );
//       console.log("Response:- ",res)
//       if(res.status == 200)
//         onClose(); 
//     } catch (err) {
//       console.error("Error adding announcement:", err.message);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-opacity-40 z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
//         >
//           &times;
//         </button>

//         <h2 className="text-center text-2xl font-semibold mb-6">
//           Announcement Creation
//         </h2>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-gray-700 mb-1">Title *</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="e.g Frontend Hacks"
//               className="w-full border px-4 py-2 rounded"
//             />
//             <label className="block text-gray-700 mt-1">Description *</label>
//             <textarea
//             className="w-full border rounded px-4 py-2"
//             placeholder="Announcement Description.."
//             name="description"
//             value={formData.description}
//             required
//             onChange={handleChange}
//             />
//           </div>

//           <div className="flex gap-4">
//             <div className="w-1/2">
//               <label className="block text-gray-700 mb-1">Priority Level</label>
//               <input
//                 type="text"
//                 name="priority"
//                 value={formData.priority}
//                 onChange={handleChange}
//                 placeholder="e.g. 1"
//                 className="w-full border px-4 py-2 rounded"
//               />
//             </div>
//             <div className="w-1/2">
//               <label className="block text-gray-700 mb-1">
//                 Visibility Options *
//               </label>
//               <select
//                 type="text"
//                 name="visibility"
//                 value={formData.visibility}
//                 onChange={handleChange}
//                 className="w-full border px-4 py-2 rounded"
//               >
//                 <option value="all">All</option>
//                 <option value="admin">Admin</option>
//                 <option value="staff">Staff</option>
//                 <option value="students">Student</option>
//               </select>
//             </div>
//           </div>

//           <div className="flex gap-4">
//             <div className="w-1/2">
//               <label className="block text-gray-700 mb-1">Department</label>
//               <input
//                 type="text"
//                 name="department"
//                 value={formData.department}
//                 onChange={handleChange}
//                 placeholder="technical"
//                 className="w-full border px-4 py-2 rounded"
//               />
//             </div>
//             <div className="w-1/2">
//               <label className="block text-gray-700 mb-1">Schedule</label>
//               <input
//                 type="date"
//                 name="schedule"
//                 value={formData.schedule}
//                 onChange={handleChange}
//                 placeholder="date"
//                 min={today}
//                 className="w-full border px-4 py-2 rounded"
//               />
//               {formData.schedule < today ? 
//               <>
//               <p className="text-red-600">please enter future dates</p>
//               </>
//               :
//               <>
//               </>}
//             </div>
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">Announcement</label>
//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               rows={10}
//               className="w-full border px-4 py-3 rounded resize-none"
//             >
//               <option value="draft">Draft</option>
//               <option value="sent">Sent</option>
//             </select>
//           </div>
//         </div>

//         <div className="flex justify-end mt-6">
//           <button
//             onClick={handleAddAnnouncement}
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddAnnouncement;


import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import AddVehicleStaff from "../components/AddVehicleStaff";
import axios from "axios";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

const AddAnnouncement = ({ isOpen, onClose, setAnnouncements }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    announcementId: Date.now(),
    priority: "",
    title: "",
    visibility: "all",
    department: "",
    schedule: "",
    status: "draft",
    description:""
  });
  const today = new Date().toISOString().split("T")[0];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(formData.schedule)
  };

  const handleAddAnnouncement = async () => {
    try {
      console.warn("formData: ",formData)
      // FIX: Using imported API_BASE_URL
      const res = await axios.post(
        `${API_BASE_URL}api/add-announcement`,
        formData,
        {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
        }
      );
      console.log("Response:- ",res)
      if(res.status == 200)
        onClose(); 
    } catch (err) {
      console.error("Error adding announcement:", err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg bg-opacity-40 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-center text-2xl font-semibold mb-6">
          Announcement Creation
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g Frontend Hacks"
              className="w-full border px-4 py-2 rounded"
            />
            <label className="block text-gray-700 mt-1">Description *</label>
            <textarea
            className="w-full border rounded px-4 py-2"
            placeholder="Announcement Description.."
            name="description"
            value={formData.description}
            required
            onChange={handleChange}
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 mb-1">Priority Level</label>
              <input
                type="text"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                placeholder="e.g. 1"
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 mb-1">
                Visibility Options *
              </label>
              <select
                type="text"
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              >
                <option value="all">All</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="students">Student</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 mb-1">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="technical"
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 mb-1">Schedule</label>
              <input
                type="date"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                placeholder="date"
                min={today}
                className="w-full border px-4 py-2 rounded"
              />
              {formData.schedule < today ? 
              <>
              <p className="text-red-600">please enter future dates</p>
              </>
              :
              <>
              </>}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Announcement</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              rows={10}
              className="w-full border px-4 py-3 rounded resize-none"
            >
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleAddAnnouncement}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAnnouncement;