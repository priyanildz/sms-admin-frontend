// import React, { useState, useEffect, useMemo } from "react";
// import MainLayout from "../layout/MainLayout";
// import { API_BASE_URL } from '../config'; 

// // Static data for dropdowns
// const STANDARDS = Array.from({ length: 10 }, (_, i) => String(i + 1));
// const DIVISIONS = ["A", "B", "C", "D", "E"];
// const AUTH_TOKEN = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU="; 

// // =========================================================================
// // ClassAssignmentFormModal Component (The Pop-up Content)
// // =========================================================================
// const ClassAssignmentFormModal = ({ staffs, staffError, API_BASE_URL, AUTH_TOKEN, assignments, fetchAssignments, closeModal }) => {
//     const [formData, setFormData] = useState({
//         standard: "",
//         division: "",
//         staffid: "",
//         studentcount: 0, 
//         student_ids: {},
//     });
//     const [message, setMessage] = useState("");
//     const [isError, setIsError] = useState(false);
//     const [loading, setLoading] = useState(false);

//     // 1. Check for CLASS CONFLICT (Standard + Division already exists)
//     const isClassConflict = useMemo(() => {
//         if (!formData.standard || !formData.division) return false;
        
//         return assignments.some(assignment => 
//             assignment.standard === formData.standard && 
//             assignment.division === formData.division
//         );
//     }, [formData.standard, formData.division, assignments]);
    
//     // 2. Check for TEACHER CONFLICT (Staff ID already assigned to another class)
//     const isTeacherConflict = useMemo(() => {
//         if (!formData.staffid) return false;
        
//         return assignments.some(assignment => 
//             assignment.staffid === formData.staffid
//         );
//     }, [formData.staffid, assignments]);


//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//         setMessage(""); // Clear message on new input
//         setIsError(false);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         // --- PRE-SUBMISSION VALIDATION ---
//         if (isClassConflict) {
//             setIsError(true);
//             setMessage(`Assignment conflict: Standard ${formData.standard} Division ${formData.division} is already assigned to a class teacher.`);
//             return;
//         }
        
//         if (isTeacherConflict) {
//             setIsError(true);
//             setMessage(`Teacher conflict: This staff member is already assigned as the class teacher for another class.`);
//             return;
//         }

//         setMessage("");
//         setIsError(false);
//         setLoading(true);

//         try {
//             const response = await fetch(`${API_BASE_URL}api/add-classroom`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "auth": AUTH_TOKEN,
//                 },
//                 body: JSON.stringify(formData),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 // Backend conflict detection for safety (e.g., MongoDB unique index error)
//                 if (data.error && data.error.includes("Duplicate key")) {
//                     throw new Error(`The class ${formData.standard}-${formData.division} already exists in the database. Please reload and check the table.`);
//                 }
//                 if (response.status === 403) {
//                     throw new Error("Authentication Failed. Check Auth Token.");
//                 }
//                 throw new Error(data.error || data.message || `Failed to create classroom. Status: ${response.status}`);
//             }

//             setMessage(data.message || "Classroom assigned successfully!");
            
//             // Clear form and refresh parent table
//             setFormData({ standard: "", division: "", staffid: "", studentcount: 0, student_ids: {} });
//             await fetchAssignments();

//             // Optionally close the modal after a short delay
//             setTimeout(closeModal, 1500);

//         } catch (error) {
//             setIsError(true);
//             setMessage(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };
    
//     const staffDropdownDisabled = staffError || staffs.length === 0;

//     // Determine overall disabled status for the button
//     const isButtonDisabled = loading || staffDropdownDisabled || isClassConflict || isTeacherConflict || !formData.staffid;
    
//     // Helper to get the teacher's name for conflict display
//     const getTeacherName = (staffid) => {
//         const staff = staffs.find(s => s._id === staffid);
//         return staff ? `${staff.firstname} ${staff.lastname}` : 'Teacher';
//     };


//     return (
//         <div className="fixed inset-0 flex items-center justify-center z-500"
//         style={{ 
//                 // Using RGBA to create the dimming effect without blurring the backdrop
//                 backgroundColor: 'rgba(50, 50, 50, 0.5)', 
//             }}
//         >
//             <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg mx-4">
//                 <div className="flex justify-between items-center mb-6 border-b pb-3">
//                     <h2 className="text-xl font-bold text-gray-800">Assign New Classroom</h2>
//                     <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 text-2xl leading-none">
//                         &times;
//                     </button>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     {/* Standard Dropdown */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Standard</label>
//                         <select name="standard" value={formData.standard} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500">
//                             <option value="" disabled>Select Standard</option>
//                             {STANDARDS.map((std) => (<option key={std} value={std}>{std}</option>))}
//                         </select>
//                     </div>

//                     {/* Division Dropdown */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Division</label>
//                         <select name="division" value={formData.division} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500">
//                             <option value="" disabled>Select Division</option>
//                             {DIVISIONS.map((div) => (<option key={div} value={div}>{div}</option>))}
//                         </select>
//                         {/* Class Conflict Notification */}
//                         {isClassConflict && (
//                             <p className="mt-2 text-sm text-red-600 font-medium">
//                                 Standard {formData.standard} Division {formData.division} is already assigned!
//                             </p>
//                         )}
//                     </div>

//                     {/* Class Teacher Dropdown */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Class Teacher</label>
//                         <select name="staffid" value={formData.staffid} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" disabled={staffDropdownDisabled}>
//                             <option value="">
//                                 {staffError ? "Error Loading Staff" : staffs.length === 0 ? "No Staff Available" : "Select Class Teacher"}
//                             </option>
//                             {staffs.map(staff => (
//                                 <option key={staff._id} value={staff._id} disabled={assignments.some(a => a.staffid === staff._id)}>
//                                     {staff.firstname} {staff.lastname} 
//                                     {assignments.some(a => a.staffid === staff._id) && " (Already Assigned)"}
//                                 </option>
//                             ))}
//                         </select>
//                         {staffError && <p className="text-red-500 text-xs mt-1">Error: {staffError}</p>}
//                         {/* Teacher Conflict Notification */}
//                         {isTeacherConflict && (
//                              <p className="mt-2 text-sm text-red-600 font-medium">
//                                 {getTeacherName(formData.staffid)} is already assigned as a Class Teacher!
//                             </p>
//                         )}
//                     </div>

//                     <button 
//                         type="submit" 
//                         disabled={isButtonDisabled} 
//                         className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
//                             isButtonDisabled
//                                 ? 'bg-blue-300' 
//                                 : 'bg-blue-600 hover:bg-blue-700'
//                         } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
//                     >
//                         {loading ? 'Submitting...' : isClassConflict ? 'Class Conflict' : isTeacherConflict ? 'Teacher Conflict' : 'Assign Classroom'}
//                     </button>
//                 </form>

//                 {message && (
//                     <div className={`mt-4 p-3 rounded-md ${isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
//                         {message}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };


// // =========================================================================
// // Main ClassAssign Component (The Page View)
// // =========================================================================
// export default function ClassAssign() {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     // States for Staff Data (Dropdown)
//     const [staffs, setStaffs] = useState([]); 
//     const [staffLoading, setStaffLoading] = useState(true);
//     const [staffError, setStaffError] = useState(null);

//     // States for Classroom Assignments (Table)
//     const [assignments, setAssignments] = useState([]); 
//     const [assignmentsLoading, setAssignmentsLoading] = useState(true);
//     const [assignmentsError, setAssignmentsError] = useState(null);

//     // --- Helper to map staff ID to name for the table ---
//     const getStaffName = (staffid) => {
//         const staff = staffs.find(s => s._id === staffid);
//         return staff ? `${staff.firstname} ${staff.lastname}` : 'N/A';
//     };
    
//     // --- Function to fetch existing assignments ---
//     const fetchAssignments = async () => {
//         try {
//             setAssignmentsLoading(true);
//             const response = await fetch(`${API_BASE_URL}api/classrooms`, {
//                 headers: {
//                     auth: AUTH_TOKEN,
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error(`Failed to fetch assignments. Status: ${response.status}`);
//             }
            
//             const data = await response.json();
//             setAssignments(data);
//             setAssignmentsError(null);
//         } catch (err) {
//             console.error("Error fetching assignments:", err);
//             setAssignmentsError(err.message);
//             setAssignments([]);
//         } finally {
//             setAssignmentsLoading(false);
//         }
//     };

//     // --- Function to fetch staff list ---
//     const fetchStaffs = async () => {
//         try {
//             setStaffLoading(true);
//             const response = await fetch(`${API_BASE_URL}api/staff`, {
//                 headers: {
//                     auth: AUTH_TOKEN,
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error(`Failed to fetch staff list. Status: ${response.status}`);
//             }

//             const data = await response.json();
//             setStaffs(data);
//             setStaffError(null); 
//         } catch (err) {
//             console.error("Error fetching staffs:", err);
//             setStaffError(err.message);
//             setStaffs([]);
//         } finally {
//             setStaffLoading(false);
//         }
//     };

//     // --- Action Handlers ---
//     const handleEdit = (assignmentId) => {
//         alert(`Edit feature is not yet fully implemented. Ready to edit assignment ID: ${assignmentId}`);
//         // TODO: Implement actual logic: 
//         // 1. Fetch assignment details. 
//         // 2. Open an Edit Modal pre-populated with data.
//         // 3. Call PUT /api/classrooms/:id endpoint on save.
//     };

//     const handleDelete = async (assignmentId) => {
//         if (!window.confirm("Are you sure you want to delete this class assignment?")) {
//             return;
//         }

//         try {
//             // 🚨 FIX: ACTUAL DELETE API CALL 🚨
//             const response = await fetch(`${API_BASE_URL}api/classrooms/${assignmentId}`, {
//                 method: 'DELETE',
//                 headers: { 
//                     auth: AUTH_TOKEN 
//                 },
//             });

//             if (!response.ok) {
//                 // Attempt to get a detailed error message from the backend response body
//                 let errorDetail = await response.text();
//                 try {
//                     const data = JSON.parse(errorDetail);
//                     errorDetail = data.message || data.error || errorDetail;
//                 } catch (e) {
//                     // If not JSON, use the raw text
//                 }
//                 throw new Error(`Failed to delete assignment. Status ${response.status}: ${errorDetail}`);
//             }

//             // Successfully deleted: Refresh the table data
//             await fetchAssignments();
            
//             // Display the success message
//             alert("Assignment deleted successfully!");

//         } catch (error) {
//             console.error("Delete Error:", error);
//             alert(`Failed to delete assignment: ${error.message}`);
//         }
//     };
//     // --- End Action Handlers ---


//     // --- Fetch Data on Component Mount ---
//     useEffect(() => {
//         fetchStaffs();
//         fetchAssignments(); 
//     }, []);

//     // --- Loading State Check ---
//     if (staffLoading && assignmentsLoading) {
//         return (
//             <MainLayout>
//                 <div className="bg-white rounded-2xl shadow p-6 text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//                     <p className="text-gray-600">Loading initial data...</p>
//                 </div>
//             </MainLayout>
//         );
//     }
    
//     // --- Error State Check (Staff is critical for the form) ---
//     if (staffError) {
//         return (
//             <MainLayout>
//                 <div className="bg-white rounded-2xl shadow p-6 text-center text-red-600">
//                     <h3 className="text-xl font-bold mb-2">Critical Error: Cannot Load Staff Data</h3>
//                     <p>The assignment form cannot function without the staff list.</p>
//                     <p className="text-sm text-gray-500 mt-2">Error: {staffError}</p>
//                     <button
//                         onClick={fetchStaffs}
//                         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                     >
//                         Try Reloading Staff List
//                     </button>
//                 </div>
//             </MainLayout>
//         );
//     }


//     // --- Main Render ---
//     return (
//         <MainLayout>
//             <div className="bg-white rounded-2xl shadow p-6">
//                 <div className="flex justify-between items-center mb-4 border-b pb-4">
//                     <h2 className="text-2xl font-bold text-gray-800">Classrooms Assigned</h2>
                    
//                     {/* Button to open Modal */}
//                     <button 
//                         onClick={() => setIsModalOpen(true)}
//                         className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150"
//                         disabled={staffs.length === 0}
//                     >
//                         <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
//                         Assign Class
//                     </button>
//                 </div>

//                 {/* --- Table Section (Page View) --- */}
//                 {assignmentsLoading ? (
//                     <div className="text-center p-8">
//                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
//                          Loading assignments...
//                     </div>
//                 ) : assignmentsError ? (
//                     <div className="text-red-600 text-center p-8">Error fetching assignments: {assignmentsError}</div>
//                 ) : assignments.length === 0 ? (
//                     <div className="text-gray-500 text-center p-8">No classrooms have been assigned yet. Click "Assign Class" to start.</div>
//                 ) : (
//                     <div className="overflow-x-auto border border-gray-300 rounded-lg"> 
//                         <table className="min-w-full table-collapse text-sm"> 
                            
//                             {/* Updated Header Style with Column Borders */}
//                             <thead className="bg-blue-100 text-gray-800">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left text-sm font-semibold tracking-wider border border-gray-300">Standard</th>
//                                     <th className="px-6 py-3 text-left text-sm font-semibold tracking-wider border border-gray-300">Division</th>
//                                     <th className="px-6 py-3 text-left text-sm font-semibold tracking-wider border border-gray-300">Class Teacher</th>
//                                     <th className="px-6 py-3 text-left text-sm font-semibold tracking-wider border border-gray-300">Student Count</th>
//                                     <th className="px-6 py-3 text-left text-sm font-semibold tracking-wider border border-gray-300">Actions</th>
//                                 </tr>
//                             </thead>
                            
//                             {/* Updated Body Style with Row/Column Borders */}
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {assignments.map((assignment) => (
//                                     <tr key={assignment._id} className="hover:bg-blue-50">
//                                         <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 border border-gray-300">{assignment.standard}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-gray-700 border border-gray-300">{assignment.division}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-gray-700 border border-gray-300">
//                                             <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
//                                                 {getStaffName(assignment.staffid)}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-gray-700 border border-gray-300">{assignment.studentcount}</td>
                                        
//                                         {/* Actions Column */}
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border border-gray-300">
//                                             <div className="flex items-center space-x-2">
//                                                 <button
//                                                     onClick={() => handleEdit(assignment._id)}
//                                                     className="text-indigo-600 hover:text-indigo-900 px-2 py-1 rounded-md bg-indigo-50 hover:bg-indigo-100 transition-colors"
//                                                     aria-label={`Edit assignment for ${assignment.standard}-${assignment.division}`}
//                                                 >
//                                                     Edit
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleDelete(assignment._id)}
//                                                     className="text-red-600 hover:text-red-900 px-2 py-1 rounded-md bg-red-50 hover:bg-red-100 transition-colors"
//                                                     aria-label={`Delete assignment for ${assignment.standard}-${assignment.division}`}
//                                                 >
//                                                     Delete
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>

//             {/* MODAL RENDERED CONDITIONALLY */}
//             {isModalOpen && (
//                 <ClassAssignmentFormModal
//                     staffs={staffs}
//                     staffError={staffError}
//                     API_BASE_URL={API_BASE_URL}
//                     AUTH_TOKEN={AUTH_TOKEN}
//                     assignments={assignments} 
//                     fetchAssignments={fetchAssignments}
//                     closeModal={() => setIsModalOpen(false)}
//                 />
//             )}
//         </MainLayout>
//     );
// }





















import React, { useState, useEffect, useMemo } from "react";
import MainLayout from "../layout/MainLayout";
import { API_BASE_URL } from '../config'; 

// Static data for dropdowns
const STANDARDS = Array.from({ length: 10 }, (_, i) => String(i + 1));
const DIVISIONS = ["A", "B", "C", "D", "E"];
const AUTH_TOKEN = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU="; 

// =========================================================================
// ClassAssignmentFormModal Component (The Pop-up Content)
// =========================================================================
const ClassAssignmentFormModal = ({ staffs, staffError, API_BASE_URL, AUTH_TOKEN, assignments, fetchAssignments, closeModal, editData }) => {
    const [formData, setFormData] = useState({
        standard: editData?.standard || "",
        division: editData?.division || "",
        staffid: editData?.staffid || "",
        studentcount: editData?.studentcount || 0, 
        student_ids: editData?.student_ids || {},
    });
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);

    // Conflict check logic (only for NEW assignments, skip for editing the same record)
    const isClassConflict = useMemo(() => {
        if (!formData.standard || !formData.division || editData) return false;
        return assignments.some(assignment => 
            assignment.standard === formData.standard && 
            assignment.division === formData.division
        );
    }, [formData.standard, formData.division, assignments, editData]);
    
    const isTeacherConflict = useMemo(() => {
        if (!formData.staffid || editData) return false;
        return assignments.some(assignment => 
            assignment.staffid === formData.staffid
        );
    }, [formData.staffid, assignments, editData]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setMessage(""); 
        setIsError(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isClassConflict || isTeacherConflict) return;

        setMessage("");
        setIsError(false);
        setLoading(true);

        try {
            // Determine if we are updating or adding
            const method = editData ? "PUT" : "POST";
            const endpoint = editData ? `api/classrooms/${editData._id}` : `api/add-classroom`;

            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "auth": AUTH_TOKEN,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 403) throw new Error("Authentication Failed.");
                throw new Error(data.error || data.message || `Operation failed.`);
            }

            setMessage(editData ? "Updated successfully!" : "Assigned successfully!");
            await fetchAssignments();
            setTimeout(closeModal, 1500);

        } catch (error) {
            setIsError(true);
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const staffDropdownDisabled = staffError || staffs.length === 0;
    const isButtonDisabled = loading || staffDropdownDisabled || isClassConflict || isTeacherConflict || !formData.staffid;
    
    const getTeacherName = (staffid) => {
        const staff = staffs.find(s => s._id === staffid);
        return staff ? `${staff.firstname} ${staff.lastname}` : 'Teacher';
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center z-[500]"
        style={{ backgroundColor: 'rgba(50, 50, 50, 0.5)' }}
        >
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg mx-4">
                <div className="flex justify-between items-center mb-6 border-b pb-3">
                    <h2 className="text-xl font-bold text-gray-800">{editData ? "Edit Classroom" : "Assign New Classroom"}</h2>
                    <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 text-2xl leading-none">
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Standard</label>
                        <select name="standard" value={formData.standard} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="" disabled>Select Standard</option>
                            {STANDARDS.map((std) => (<option key={std} value={std}>{std}</option>))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Division</label>
                        <select name="division" value={formData.division} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="" disabled>Select Division</option>
                            {DIVISIONS.map((div) => (<option key={div} value={div}>{div}</option>))}
                        </select>
                        {isClassConflict && (
                            <p className="mt-2 text-sm text-red-600 font-medium">
                                Standard {formData.standard} Division {formData.division} is already assigned!
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Class Teacher</label>
                        <select name="staffid" value={formData.staffid} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" disabled={staffDropdownDisabled}>
                            <option value="">
                                {staffError ? "Error Loading Staff" : staffs.length === 0 ? "No Staff Available" : "Select Class Teacher"}
                            </option>
                            {staffs.map(staff => (
                                <option key={staff._id} value={staff._id} disabled={!editData && assignments.some(a => a.staffid === staff._id)}>
                                    {staff.firstname} {staff.lastname} 
                                    {!editData && assignments.some(a => a.staffid === staff._id) && " (Already Assigned)"}
                                </option>
                            ))}
                        </select>
                        {isTeacherConflict && (
                             <p className="mt-2 text-sm text-red-600 font-medium">
                                {getTeacherName(formData.staffid)} is already assigned as a Class Teacher!
                            </p>
                        )}
                    </div>

                    <button type="submit" disabled={isButtonDisabled} className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                            isButtonDisabled ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                        {loading ? 'Submitting...' : editData ? 'Update Classroom' : 'Assign Classroom'}
                    </button>
                </form>

                {message && (
                    <div className={`mt-4 p-3 rounded-md ${isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};


export default function ClassAssign() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAssignment, setEditingAssignment] = useState(null); // 🆕 Track edit target

    const [staffs, setStaffs] = useState([]); 
    const [staffLoading, setStaffLoading] = useState(true);
    const [staffError, setStaffError] = useState(null);

    const [assignments, setAssignments] = useState([]); 
    const [assignmentsLoading, setAssignmentsLoading] = useState(true);
    const [assignmentsError, setAssignmentsError] = useState(null);

    const getStaffName = (staffid) => {
        const staff = staffs.find(s => s._id === staffid);
        return staff ? `${staff.firstname} ${staff.lastname}` : 'N/A';
    };
    
    const fetchAssignments = async () => {
        try {
            setAssignmentsLoading(true);
            const response = await fetch(`${API_BASE_URL}api/classrooms`, {
                headers: { auth: AUTH_TOKEN },
            });
            if (!response.ok) throw new Error(`Failed to fetch assignments.`);
            const data = await response.json();
            setAssignments(data);
        } catch (err) {
            setAssignmentsError(err.message);
        } finally {
            setAssignmentsLoading(false);
        }
    };

    const fetchStaffs = async () => {
        try {
            setStaffLoading(true);
            const response = await fetch(`${API_BASE_URL}api/staff`, {
                headers: { auth: AUTH_TOKEN },
            });
            if (!response.ok) throw new Error(`Failed to fetch staff list.`);
            const data = await response.json();
            setStaffs(data);
        } catch (err) {
            setStaffError(err.message);
        } finally {
            setStaffLoading(false);
        }
    };

    // 🆕 Updated handleEdit
    const handleEdit = (assignment) => {
        setEditingAssignment(assignment);
        setIsModalOpen(true);
    };

    const handleDelete = async (assignmentId) => {
        if (!window.confirm("Are you sure you want to delete this class assignment?")) return;
        try {
            const response = await fetch(`${API_BASE_URL}api/classrooms/${assignmentId}`, {
                method: 'DELETE',
                headers: { auth: AUTH_TOKEN },
            });
            if (!response.ok) throw new Error(`Failed to delete.`);
            await fetchAssignments();
            alert("Deleted successfully!");
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchStaffs();
        fetchAssignments(); 
    }, []);

    if (staffLoading && assignmentsLoading) {
        return (
            <MainLayout>
                <div className="bg-white rounded-2xl shadow p-6 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading initial data...</p>
                </div>
            </MainLayout>
        );
    }
    
    if (staffError) {
        return (
            <MainLayout>
                <div className="bg-white rounded-2xl shadow p-6 text-center text-red-600">
                    <h3 className="text-xl font-bold mb-2">Critical Error: Cannot Load Staff Data</h3>
                    <button onClick={fetchStaffs} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Retry</button>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="bg-white rounded-2xl shadow p-6">
                <div className="flex justify-between items-center mb-4 border-b pb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Classrooms Assigned</h2>
                    <button onClick={() => { setEditingAssignment(null); setIsModalOpen(true); }} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150" disabled={staffs.length === 0}>
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Assign Class
                    </button>
                </div>

                {assignmentsLoading ? (
                    <div className="text-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>Loading assignments...</div>
                ) : assignmentsError ? (
                    <div className="text-red-600 text-center p-8">Error: {assignmentsError}</div>
                ) : assignments.length === 0 ? (
                    <div className="text-gray-500 text-center p-8">No classrooms assigned.</div>
                ) : (
                    <div className="overflow-x-auto border border-gray-300 rounded-lg"> 
                        <table className="min-w-full table-collapse text-sm"> 
                            <thead className="bg-blue-100 text-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold border border-gray-300">Standard</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold border border-gray-300">Division</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold border border-gray-300">Class Teacher</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold border border-gray-300">Student Count</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold border border-gray-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {assignments.map((assignment) => (
                                    <tr key={assignment._id} className="hover:bg-blue-50">
                                        <td className="px-6 py-4 border border-gray-300">{assignment.standard}</td>
                                        <td className="px-6 py-4 border border-gray-300">{assignment.division}</td>
                                        <td className="px-6 py-4 border border-gray-300">
                                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">{getStaffName(assignment.staffid)}</span>
                                        </td>
                                        <td className="px-6 py-4 border border-gray-300">{assignment.studentcount}</td>
                                        <td className="px-6 py-4 border border-gray-300">
                                            <div className="flex items-center space-x-2">
                                                <button onClick={() => handleEdit(assignment)} className="text-indigo-600 hover:text-indigo-900 px-2 py-1 rounded-md bg-indigo-50 hover:bg-indigo-100">Edit</button>
                                                <button onClick={() => handleDelete(assignment._id)} className="text-red-600 hover:text-red-900 px-2 py-1 rounded-md bg-red-50 hover:bg-red-100">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <ClassAssignmentFormModal
                    staffs={staffs}
                    staffError={staffError}
                    API_BASE_URL={API_BASE_URL}
                    AUTH_TOKEN={AUTH_TOKEN}
                    assignments={assignments} 
                    fetchAssignments={fetchAssignments}
                    closeModal={() => { setIsModalOpen(false); setEditingAssignment(null); }}
                    editData={editingAssignment} // 🆕 Pass record to modal
                />
            )}
        </MainLayout>
    );
}