// import React, { useState, useEffect } from "react";
// import { X, Loader } from "lucide-react";
// import { toast } from "react-toastify";
// import SelectField from "./SelectField";

// const AddStaffRoleModal = ({ isOpen, onClose, staffId = null }) => {
//   const [formData, setFormData] = useState({
//     staff: staffId || "",
//     staffdept: "",
//     roleassigned: ""
//   });
//   const [staffList, setStaffList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetchingStaff, setFetchingStaff] = useState(false);

//   const departmentOptions = [
//     { value: "Teaching Staff", label: "Teaching Staff" },
//     { value: "Non Teaching Staff", label: "Non Teaching Staff" }
//   ];
//   const roleOptions = [
//     { value: "Teacher", label: "Teacher" },
//     { value: "Admin", label: "Admin" },
//     { value: "Principal", label: "Principal" },
//     { value: "Librarian", label: "Librarian" },
//     { value: "Accountant", label: "Accountant" },
//     { value: "Clerk", label: "Clerk" }
//   ];

//   useEffect(() => {
//     if (isOpen && !staffId) {
//       fetchStaffList();
//     }
//   }, [isOpen, staffId]);

//   const fetchStaffList = async () => {
//     try {
//       setFetchingStaff(true);
//       const response = await fetch("http://localhost:5000/api/staff", {
//         headers: {
//           auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//         },
//       });
//       if (!response.ok) {
//         throw new Error("Failed to fetch staff list");
//       }
//       const data = await response.json();
//       console.log(data);
//       setStaffList(
//         data.map((staff) => ({
//           value: staff._id,
//           label: `${staff.firstname} ${staff.lastname}`,
//         }))
//       );
//     } catch (error) {
//       toast.error(`Error: ${error.message}`);
//     } finally {
//       setFetchingStaff(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     if (
//       !formData.staff ||
//       !formData.staffdept ||
//       !formData.roleassigned
//     ) {
//       toast.error("All fields are required");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000/api/assign-role", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to assign role");
//       }

//       toast.success("Role assigned successfully");
//       setFormData({
//         staff: staffId || "",
//         staffdept: "",
//         roleassigned: ""
//       });
//       onClose();
//     } catch (error) {
//       toast.error(`Error: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50 pointer-events-none">
//       <div className="relative bg-white border border-gray-300 shadow-xl rounded-lg p-6 w-96 pointer-events-auto">
//         <button
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//           onClick={onClose}
//         >
//           <X size={18} />
//         </button>

//         <h3 className="text-lg font-semibold mb-4 text-center">
//           Assign Staff Role
//         </h3>

//         <div className="space-y-4">
//           <SelectField
//             label="Staff Name"
//             name="staff"
//             value={formData.staff}
//             options={staffList}
//             onChange={handleInputChange}
//             disabled={!!staffId || fetchingStaff}
//           />
//           <SelectField
//             label="Staff Department"
//             name="staffdept"
//             value={formData.staffdept}
//             options={departmentOptions}
//             onChange={handleInputChange}
//           />
//           <SelectField
//             label="Role Assigned"
//             name="roleassigned"
//             value={formData.roleassigned}
//             options={roleOptions}
//             onChange={handleInputChange}
//           />
//         </div>

//         <div className="mt-6 flex justify-end space-x-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={loading || fetchingStaff}
//             className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             {loading && <Loader className="w-4 h-4 animate-spin" />}
//             <span>{loading ? "Saving..." : "Save"}</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddStaffRoleModal;





// import React, { useState, useEffect } from "react";
// import { X, Loader } from "lucide-react";
// import { toast } from "react-toastify";
// import SelectField from "./SelectField";

// const AddStaffRoleModal = ({ isOpen, onClose, staffId = null }) => {
//   const [formData, setFormData] = useState({
//     staff: "",
//     staffdept: "",
//     roleassigned: ""
//   });
//   const [staffList, setStaffList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetchingStaff, setFetchingStaff] = useState(false);

//   // Moved options to be accessible in useEffect
//   const departmentOptions = [
//     { value: "Teaching Staff", label: "Teaching Staff" },
//     { value: "Non Teaching Staff", label: "Non Teaching Staff" }
//   ];
//   const roleOptions = [
//     { value: "Teacher", label: "Teacher" },
//     { value: "Admin", label: "Admin" },
//     { value: "Principal", label: "Principal" },
//     { value: "Librarian", label: "Librarian" },
//     { value: "Accountant", label: "Accountant" },
//     { value: "Clerk", label: "Clerk" }
//   ];

//   // ✅ FIX: This useEffect now correctly populates the form state on open
//   useEffect(() => {
//     if (isOpen) {
//       // Set the default selections in the state
//       setFormData({
//         staff: staffId || (staffList.length > 0 ? staffList[0].value : ""),
//         staffdept: departmentOptions.length > 0 ? departmentOptions[0].value : "",
//         roleassigned: roleOptions.length > 0 ? roleOptions[0].value : ""
//       });

//       // Fetch the staff list if it hasn't been fetched yet
//       if (!staffId && staffList.length === 0) {
//         fetchStaffList();
//       }
//     }
//   }, [isOpen, staffId, staffList]); // Added staffList to dependency array

//   const fetchStaffList = async () => {
//     try {
//       setFetchingStaff(true);
//       const response = await fetch("http://localhost:5000/api/staff", {
//         headers: {
//           auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//         },
//       });
//       if (!response.ok) {
//         throw new Error("Failed to fetch staff list");
//       }
//       const data = await response.json();
//       const mappedStaff = data.map((staff) => ({
//         value: staff._id,
//         label: `${staff.firstname} ${staff.lastname}`,
//       }));
//       setStaffList(mappedStaff);

//       // If a staffId isn't provided, default to the first staff member in the list
//       if (!staffId && mappedStaff.length > 0) {
//         setFormData(prev => ({
//           ...prev,
//           staff: mappedStaff[0].value
//         }));
//       }

//     } catch (error) {
//       toast.error(`Error: ${error.message}`);
//     } finally {
//       setFetchingStaff(false);
//     }
//   };

//   const handleSpecificInputChange = (name, value) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     // This validation will now pass on the first click
//     if (!formData.staff || !formData.staffdept || !formData.roleassigned) {
//       toast.error("All fields are required");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:5000/api/assign-role", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to assign role");
//       }

//       toast.success("Role assigned successfully");
//       onClose(); // Close the modal
//     } catch (error) {
//       toast.error(`Error: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
//       <div className="relative bg-white border border-gray-300 shadow-xl rounded-lg p-6 w-96">
//         <button
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//           onClick={onClose}
//         >
//           <X size={18} />
//         </button>
//         <h3 className="text-lg font-semibold mb-4 text-center">Assign Staff Role</h3>
//         <div className="space-y-4">
//           <SelectField
//             label="Staff Name"
//             name="staff"
//             value={formData.staff}
//             options={staffList}
//             onChange={(value) => handleSpecificInputChange('staff', value)}
//             disabled={!!staffId || fetchingStaff}
//           />
//           <SelectField
//             label="Staff Department"
//             name="staffdept"
//             value={formData.staffdept}
//             options={departmentOptions}
//             onChange={(value) => handleSpecificInputChange('staffdept', value)}
//           />
//           <SelectField
//             label="Role Assigned"
//             name="roleassigned"
//             value={formData.roleassigned}
//             options={roleOptions}
//             onChange={(value) => handleSpecificInputChange('roleassigned', value)}
//           />
//         </div>
//         <div className="mt-6 flex justify-end space-x-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={loading || fetchingStaff}
//             className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center space-x-2"
//           >
//             {loading && <Loader className="w-4 h-4 animate-spin mr-2" />}
//             <span>{loading ? "Saving..." : "Save"}</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddStaffRoleModal;


import React, { useState, useEffect } from "react";
import { X, Loader } from "lucide-react";
import { toast } from "react-toastify";
import SelectField from "./SelectField";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

const AddStaffRoleModal = ({ isOpen, onClose, staffId = null }) => {
  const [formData, setFormData] = useState({
    staff: "",
    staffdept: "",
    roleassigned: ""
  });
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingStaff, setFetchingStaff] = useState(false);

  // Moved options to be accessible in useEffect
  const departmentOptions = [
    { value: "Teaching Staff", label: "Teaching Staff" },
    { value: "Non Teaching Staff", label: "Non Teaching Staff" }
  ];
  const roleOptions = [
    { value: "Teacher", label: "Teacher" },
    { value: "Admin", label: "Admin" },
    { value: "Principal", label: "Principal" },
    { value: "Librarian", label: "Librarian" },
    { value: "Accountant", label: "Accountant" },
    { value: "Clerk", label: "Clerk" }
  ];

  // ✅ FIX: This useEffect now correctly populates the form state on open
  useEffect(() => {
    if (isOpen) {
      // Set the default selections in the state
      setFormData({
        staff: staffId || (staffList.length > 0 ? staffList[0].value : ""),
        staffdept: departmentOptions.length > 0 ? departmentOptions[0].value : "",
        roleassigned: roleOptions.length > 0 ? roleOptions[0].value : ""
      });

      // Fetch the staff list if it hasn't been fetched yet
      if (!staffId && staffList.length === 0) {
        fetchStaffList();
      }
    }
  }, [isOpen, staffId, staffList]); // Added staffList to dependency array

  const fetchStaffList = async () => {
    try {
      setFetchingStaff(true);
      // FIX 1: Using imported API_BASE_URL
      const response = await fetch(`${API_BASE_URL}api/staff`, {
        headers: {
          auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch staff list");
      }
      const data = await response.json();
      const mappedStaff = data.map((staff) => ({
        value: staff._id,
        label: `${staff.firstname} ${staff.lastname}`,
      }));
      setStaffList(mappedStaff);

      // If a staffId isn't provided, default to the first staff member in the list
      if (!staffId && mappedStaff.length > 0) {
        setFormData(prev => ({
          ...prev,
          staff: mappedStaff[0].value
        }));
      }

    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setFetchingStaff(false);
    }
  };

  const handleSpecificInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // This validation will now pass on the first click
    if (!formData.staff || !formData.staffdept || !formData.roleassigned) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      // FIX 2: Using imported API_BASE_URL
      const response = await fetch(`${API_BASE_URL}api/assign-role`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to assign role");
      }

      toast.success("Role assigned successfully");
      onClose(); // Close the modal
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50"
style={{
        backgroundColor: 'rgba(50, 50, 50, 0.5)',
      }}
>
      <div className="relative bg-white border border-gray-300 shadow-xl rounded-lg p-6 w-96">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={18} />
        </button>
        <h3 className="text-lg font-semibold mb-4 text-center">Assign Staff Role</h3>
        <div className="space-y-4">
          <SelectField
            label="Staff Name"
            name="staff"
            value={formData.staff}
            options={staffList}
            onChange={(value) => handleSpecificInputChange('staff', value)}
            disabled={!!staffId || fetchingStaff}
          />
          <SelectField
            label="Staff Department"
            name="staffdept"
            value={formData.staffdept}
            options={departmentOptions}
            onChange={(value) => handleSpecificInputChange('staffdept', value)}
          />
          <SelectField
            label="Role Assigned"
            name="roleassigned"
            value={formData.roleassigned}
            options={roleOptions}
            onChange={(value) => handleSpecificInputChange('roleassigned', value)}
          />
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || fetchingStaff}
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center space-x-2"
          >
            {loading && <Loader className="w-4 h-4 animate-spin mr-2" />}
            <span>{loading ? "Saving..." : "Save"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStaffRoleModal;