// import React, { useState } from "react";
// import { X } from "lucide-react";
// import axios from "axios";

// const AddBlockModal = ({ isOpen, onClose, formData, setFormData, onBlockAdded }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState({});

//   if (!isOpen) return null;

//   const standardOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
//   const divisionOptions = ["A", "B", "C", "D", "E"];
//   const timingOptions = [
//     "8:00-9:00",
//     "9:00-10:00", 
//     "10:00-11:00", 
//     "11:00-12:00",
//     "12:00-1:00",
//     "1:00-2:00",
//     "2:00-3:00",
//     "3:00-4:00"
//   ];

//   const handleChange = (field) => (e) => {
//     setFormData({ ...formData, [field]: e.target.value });
//     // Clear error for this field when user starts typing
//     if (errors[field]) {
//       setErrors({ ...errors, [field]: null });
//     }
//   };

//   // Validate form data
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.standard?.trim()) {
//       newErrors.standard = "Standard is required";
//     }

//     if (!formData.division?.trim()) {
//       newErrors.division = "Division is required";
//     }

//     if (!formData.timing?.trim()) {
//       newErrors.timing = "Timing is required";
//     }

//     if (!formData.teacher?.trim()) {
//       newErrors.teacher = "Teacher name is required";
//     }

//     if (!formData.capacity || parseInt(formData.capacity) < 1) {
//       newErrors.capacity = "Valid capacity is required";
//     }

//     if (!formData.blockNo?.trim()) {
//       newErrors.blockNo = "Block number is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const resetForm = () => {
//     setFormData({
//       standard: "",
//       division: "",
//       timing: "",
//       teacher: "",
//       capacity: "",
//       blockNo: ""
//     });
//     setErrors({});
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);
    
//     try {
//       console.log('Submitting form data:', formData);
      
//       // Prepare data for API - match your backend expected format
//       const apiData = {
//         standard: formData.standard,
//         division: formData.division,
//         blockNo: formData.blockNo,
//         timing: formData.timing,
//         capacity: parseInt(formData.capacity),
//         teacherAssigned: formData.teacher, // Note: backend expects teacherAssigned
//         studentsAllocated: 0, // Default value
//         isActive: true
//       };

//       const response = await axios.post(
//         'http://localhost:5000/api/add-academicblock', 
//         apiData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'auth': 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
//           }
//         }
//       );

//       if (response.status === 200 || response.status === 201) {
//         alert('Block added successfully!');
//         resetForm();
        
//         // Notify parent component to refresh data
//         if (onBlockAdded) {
//           onBlockAdded(response.data);
//         }
        
//         // Close modal
//         onClose();
//       }
      
//     } catch (error) {
//       console.error('Error submitting form:', error);
      
//       // Handle different types of errors
//       if (error.response) {
//         // Server responded with error status
//         const message = error.response.data?.message || 'Failed to add block';
//         alert(`Error: ${message}`);
//       } else if (error.request) {
//         // Network error
//         alert('Network error. Please check your connection.');
//       } else {
//         // Other error
//         alert('An unexpected error occurred. Please try again.');
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleClose = () => {
//     if (!isSubmitting) {
//       resetForm();
//       onClose();
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
//       <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 m-4 max-h-[90vh] overflow-y-auto">
//         <button
//           onClick={handleClose}
//           disabled={isSubmitting}
//           className="absolute top-3 right-3 text-gray-500 hover:text-black disabled:opacity-50 z-10"
//         >
//           <X />
//         </button>
        
//         <h2 className="text-xl font-semibold mb-4 text-center">Assign Block</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Standard *</label>
//             <select
//               value={formData.standard || ""}
//               onChange={handleChange("standard")}
//               className={`mt-1 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 errors.standard ? 'border-red-500' : 'border-gray-300'
//               }`}
//               disabled={isSubmitting}
//             >
//               <option value="">Select Standard</option>
//               {standardOptions.map((s) => (
//                 <option key={s} value={s}>Standard {s}</option>
//               ))}
//             </select>
//             {errors.standard && (
//               <p className="text-red-500 text-xs mt-1">{errors.standard}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Division *</label>
//             <select
//               value={formData.division || ""}
//               onChange={handleChange("division")}
//               className={`mt-1 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 errors.division ? 'border-red-500' : 'border-gray-300'
//               }`}
//               disabled={isSubmitting}
//             >
//               <option value="">Select Division</option>
//               {divisionOptions.map((d) => (
//                 <option key={d} value={d}>Division {d}</option>
//               ))}
//             </select>
//             {errors.division && (
//               <p className="text-red-500 text-xs mt-1">{errors.division}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Block No *</label>
//             <input
//               type="text"
//               placeholder="Enter block number (e.g., B1, B2)"
//               value={formData.blockNo || ""}
//               onChange={handleChange("blockNo")}
//               className={`mt-1 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 errors.blockNo ? 'border-red-500' : 'border-gray-300'
//               }`}
//               disabled={isSubmitting}
//             />
//             {errors.blockNo && (
//               <p className="text-red-500 text-xs mt-1">{errors.blockNo}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Capacity *</label>
//             <input
//               type="number"
//               placeholder="Enter capacity (e.g., 30)"
//               value={formData.capacity || ""}
//               onChange={handleChange("capacity")}
//               min="1"
//               max="100"
//               className={`mt-1 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 errors.capacity ? 'border-red-500' : 'border-gray-300'
//               }`}
//               disabled={isSubmitting}
//             />
//             {errors.capacity && (
//               <p className="text-red-500 text-xs mt-1">{errors.capacity}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Timings *</label>
//             <select
//               value={formData.timing || ""}
//               onChange={handleChange("timing")}
//               className={`mt-1 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 errors.timing ? 'border-red-500' : 'border-gray-300'
//               }`}
//               disabled={isSubmitting}
//             >
//               <option value="">Select Timing</option>
//               {timingOptions.map((t) => (
//                 <option key={t} value={t}>{t}</option>
//               ))}
//             </select>
//             {errors.timing && (
//               <p className="text-red-500 text-xs mt-1">{errors.timing}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Assign Teacher *</label>
//             <input
//               type="text"
//               placeholder="Enter teacher name"
//               value={formData.teacher || ""}
//               onChange={handleChange("teacher")}
//               className={`mt-1 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                 errors.teacher ? 'border-red-500' : 'border-gray-300'
//               }`}
//               disabled={isSubmitting}
//             />
//             {errors.teacher && (
//               <p className="text-red-500 text-xs mt-1">{errors.teacher}</p>
//             )}
//           </div>

//           <div className="mt-6 flex justify-end gap-3">
//             <button
//               type="button"
//               onClick={handleClose}
//               disabled={isSubmitting}
//               className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               {isSubmitting ? "Submitting..." : "Submit"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddBlockModal;


import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

const AddBlockModal = ({ isOpen, onClose, formData, setFormData, onBlockAdded }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const AUTH_HEADER = 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=';

  const standardOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const divisionOptions = ["A", "B", "C", "D", "E"];
  const timingOptions = [
    "8:00-9:00",
    "9:00-10:00", 
    "10:00-11:00", 
    "11:00-12:00",
    "12:00-1:00",
    "1:00-2:00",
    "2:00-3:00",
    "3:00-4:00"
  ];

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};

    if (!formData.standard?.trim()) {
      newErrors.standard = "Standard is required";
    }

    if (!formData.division?.trim()) {
      newErrors.division = "Division is required";
    }

    if (!formData.timing?.trim()) {
      newErrors.timing = "Timing is required";
    }

    if (!formData.teacher?.trim()) {
      newErrors.teacher = "Teacher name is required";
    }

    if (!formData.capacity || parseInt(formData.capacity) < 1) {
      newErrors.capacity = "Valid capacity is required";
    }

    if (!formData.blockNo?.trim()) {
      newErrors.blockNo = "Block number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      standard: "",
      division: "",
      timing: "",
      teacher: "",
      capacity: "",
      blockNo: ""
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Submitting form data:', formData);
      
      // Prepare data for API - match your backend expected format
      const apiData = {
        standard: formData.standard,
        division: formData.division,
        blockNo: formData.blockNo,
        timing: formData.timing,
        capacity: parseInt(formData.capacity),
        teacherAssigned: formData.teacher, // Note: backend expects teacherAssigned
        studentsAllocated: 0, // Default value
        isActive: true
      };

      // FIX: Using imported API_BASE_URL
      const response = await axios.post(
        `${API_BASE_URL}api/add-academicblock`, 
        apiData,
        {
          headers: {
            'Content-Type': 'application/json',
            'auth': AUTH_HEADER
          }
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert('Block added successfully!');
        resetForm();
        
        // Notify parent component to refresh data
        if (onBlockAdded) {
          onBlockAdded(response.data);
        }
        
        // Close modal
        onClose();
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        const message = error.response.data?.message || 'Failed to add block';
        alert(`Error: ${message}`);
      } else if (error.request) {
        // Network error
        alert('Network error. Please check your connection.');
      } else {
        // Other error
        alert('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 m-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          disabled={isSubmitting}
          className="absolute top-3 right-3 text-gray-500 hover:text-black disabled:opacity-50 z-10"
        >
          <X />
        </button>
        
        <h2 className="text-xl font-semibold mb-4 text-center">Assign Block</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Standard *</label>
            <select
              value={formData.standard || ""}
              onChange={handleChange("standard")}
              className={`mt-1 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.standard ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            >
              <option value="">Select Standard</option>
              {standardOptions.map((s) => (
                <option key={s} value={s}>Standard {s}</option>
              ))}
            </select>
            {errors.standard && (
              <p className="text-red-500 text-xs mt-1">{errors.standard}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Division *</label>
            <select
              value={formData.division || ""}
              onChange={handleChange("division")}
              className={`mt-1 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.division ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            >
              <option value="">Select Division</option>
              {divisionOptions.map((d) => (
                <option key={d} value={d}>Division {d}</option>
              ))}
            </select>
            {errors.division && (
              <p className="text-red-500 text-xs mt-1">{errors.division}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Block No *</label>
            <input
              type="text"
              placeholder="Enter block number (e.g., B1, B2)"
              value={formData.blockNo || ""}
              onChange={handleChange("blockNo")}
              className={`mt-1 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.blockNo ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {errors.blockNo && (
              <p className="text-red-500 text-xs mt-1">{errors.blockNo}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Capacity *</label>
            <input
              type="number"
              placeholder="Enter capacity (e.g., 30)"
              value={formData.capacity || ""}
              onChange={handleChange("capacity")}
              min="1"
              max="100"
              className={`mt-1 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.capacity ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {errors.capacity && (
              <p className="text-red-500 text-xs mt-1">{errors.capacity}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Timings *</label>
            <select
              value={formData.timing || ""}
              onChange={handleChange("timing")}
              className={`mt-1 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.timing ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            >
              <option value="">Select Timing</option>
              {timingOptions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            {errors.timing && (
              <p className="text-red-500 text-xs mt-1">{errors.timing}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Assign Teacher *</label>
            <input
              type="text"
              placeholder="Enter teacher name"
              value={formData.teacher || ""}
              onChange={handleChange("teacher")}
              className={`mt-1 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.teacher ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {errors.teacher && (
              <p className="text-red-500 text-xs mt-1">{errors.teacher}</p>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlockModal;