// import React, { useState, useEffect } from "react";
// import { User, BookOpen, Calendar, Clock, ChevronRight } from "lucide-react";
// import { useParams, useNavigate } from "react-router-dom";
// import MainLayout from "../layout/MainLayout"; // Assuming MainLayout exists

// const EditStaff = () => {
//   const { id } = useParams(); // Get staff ID from URL
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("profile");
//   const [selectedMonth, setSelectedMonth] = useState("February 2025");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Staff form data state
//   const [staffData, setStaffData] = useState({
//     firstname: "",
//     middlename: "",
//     lastname: "",
//     dob: "",
//     maritalstatus: "",
//     bloodgroup: "",
//     gender: "",
//     phoneno: "",
//     emailaddress: "",
//     status: true,
//   });

//   // new state: active / inactive toggle
//   const [isActive, setIsActive] = useState(true);
//   const toggleActive = () => {
//     setIsActive((v) => !v);
//     setStaffData((prev) => ({ ...prev, status: !prev.status }));
//   };

//   // Fetch staff data when component mounts
//   useEffect(() => {
//     const fetchStaffData = async () => {
//       try {
//         setLoading(true);
//         // Using fetch with placeholder auth header
//         const response = await fetch(`http://localhost:5000/api/staff/${id}`, {
//           headers: { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" },
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch staff data");
//         }
//         const data = await response.json();

//         // Update form data with fetched staff information
//         setStaffData({
//           firstname: data.firstname || "",
//           middlename: data.middlename || "",
//           lastname: data.lastname || "",
//           // Format date for <input type="date"> (YYYY-MM-DD)
//           dob: data.dob ? data.dob.split("T")[0] : "",
//           maritalstatus: data.maritalstatus || "",
//           bloodgroup: data.bloodgroup || "",
//           gender: data.gender || "",
//           phoneno: data.phoneno || "",
//           emailaddress: data.emailaddress || "",
//           status: data.status !== undefined ? data.status : true,
//         });

//         setIsActive(data.status !== undefined ? data.status : true);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchStaffData();
//     }
//   }, [id]);

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setStaffData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission via browser
//     try {
//       setLoading(true);
//       const response = await fetch(`http://localhost:5000/api/edit-staff/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//         },
//         body: JSON.stringify(staffData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update staff data");
//       }

//       console.log("Staff updated successfully!"); // Replaced alert()
//       setLoading(false);
//       // Optional: re-fetch staff data here to ensure consistency if needed
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const handleHeaderClick = () => {
//     navigate("/dashboard");
//   };

//   const TabButton = ({ tabName, label, icon: Icon }) => (
//     <button
//         onClick={() => setActiveTab(tabName)}
//         className={`flex items-center space-x-2 px-6 py-3 rounded-t-lg font-medium transition-colors duration-200 ${
//             activeTab === tabName
//                 ? 'bg-white text-blue-600 border-b-2 border-blue-600'
//                 : 'text-gray-600 hover:text-blue-700 hover:bg-gray-100'
//         }`}
//     >
//         {Icon && <Icon className="w-5 h-5" />}
//         <span>{label}</span>
//     </button>
// );

//   return (
//     // Note: MainLayout component definition is assumed to be external
//     <MainLayout className="min-h-screen bg-gray-50">
//       <div className="flex flex-col lg:flex-row">
//         {/* Main Content */}
//         <div className="flex-1 p-4 lg:p-8">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                 Staff Overview
//               </h2>
//               <h3 className="text-xl font-semibold text-gray-700">
//                 Staff Registration Form
//               </h3>
//             </div>
//             <div className="flex items-center space-x-6">
//               {/* Active / Inactive Toggle */}
//               <div className="flex items-center gap-3">
//                 <span
//                   className={`text-lg font-semibold select-none ${
//                     isActive ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {isActive ? "Active" : "Inactive"}
//                 </span>

//                 <button
//                   onClick={toggleActive}
//                   aria-pressed={isActive}
//                   aria-label={isActive ? "Set as Inactive" : "Set as Active"}
//                   className="relative focus:outline-none"
//                 >
//                   <div
//                     className={`rounded-full p-[3px] ${
//                       isActive
//                         ? "border-2 border-blue-500"
//                         : "border-2 border-gray-300"
//                     }`}
//                     style={{
//                       boxShadow: isActive
//                         ? "0 0 0 4px rgba(59,130,246,0.12)"
//                         : "0 0 0 4px rgba(156,163,175,0.06)",
//                     }}
//                   >
//                     <div
//                       className={`w-20 h-10 rounded-full transition-colors duration-200 flex items-center relative ${
//                         isActive ? "bg-green-500" : "bg-gray-300"
//                       }`}
//                     >
//                       <div
//                         className={`bg-white w-8 h-8 rounded-full shadow absolute transition-transform duration-200`}
//                         style={{
//                           transform: isActive
//                             ? "translateX(44px)"
//                             : "translateX(4px)",
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Tab Navigation */}
//           <div className="flex border-b border-gray-200 mb-6">
//             <TabButton tabName="profile" label="Profile" icon={User} />
//             <TabButton tabName="attendance" label="Attendance" icon={Calendar} />
//             <TabButton tabName="subjects" label="Subjects" icon={BookOpen} />
//             <TabButton tabName="timetable" label="Timetable" icon={Clock} />
//             <TabButton tabName="leave" label="Leave Request" icon={ChevronRight} />
//             <TabButton tabName="history" label="History" icon={ChevronRight} />
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
//             {loading ? (
//               <div className="flex items-center justify-center h-64">
//                 <div className="text-lg text-gray-600">
//                   Loading staff data...
//                 </div>
//               </div>
//             ) : error ? (
//               <div className="flex items-center justify-center h-64">
//                 <div className="text-lg text-red-600">Error: {error}</div>
//               </div>
//             ) : (
//               activeTab === "profile" && (
//                 <form onSubmit={handleSubmit}>
//                   <div className="flex flex-col xl:flex-row space-y-8 xl:space-y-0 xl:space-x-8">
//                     <div className="flex-1">
//                       <div className="space-y-6">
//                         {/* Name Fields */}
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               Name <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                               type="text"
//                               name="firstname"
//                               value={staffData.firstname}
//                               onChange={handleInputChange}
//                               placeholder="First Name"
//                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                               required // Added required
//                             />
//                           </div>
//                           <div className="mt-0 md:mt-8">
//                             <input
//                               type="text"
//                               name="middlename"
//                               value={staffData.middlename}
//                               onChange={handleInputChange}
//                               placeholder="Middle Name"
//                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                             />
//                           </div>
//                           <div className="mt-0 md:mt-8">
//                             <input
//                               type="text"
//                               name="lastname"
//                               value={staffData.lastname}
//                               onChange={handleInputChange}
//                               placeholder="Last Name"
//                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                               required // Added required
//                             />
//                           </div>
//                         </div>

//                         {/* Date of Birth and Marital Status */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               Date of Birth <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                               type="date"
//                               name="dob"
//                               value={staffData.dob}
//                               onChange={handleInputChange}
//                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                               required // Added required
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               Marital Status <span className="text-red-500">*</span>
//                             </label>
//                             <select
//                               name="maritalstatus"
//                               value={staffData.maritalstatus}
//                               onChange={handleInputChange}
//                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//                               required // Added required
//                             >
//                               <option value="">Select</option>
//                               <option value="Single">Single</option>
//                               <option value="Married">Married</option>
//                               <option value="Divorced">Divorced</option>
//                               <option value="Widowed">Widowed</option>
//                             </select>
//                           </div>
//                         </div>

//                         {/* Blood Group and Gender */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               Blood Group <span className="text-red-500">*</span>
//                             </label>
//                             <select
//                               name="bloodgroup"
//                               value={staffData.bloodgroup}
//                               onChange={handleInputChange}
//                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//                               required // Added required
//                             >
//                               <option value="">Select</option>
//                               <option value="A+">A+</option>
//                               <option value="A-">A-</option>
//                               <option value="B+">B+</option>
//                               <option value="B-">B-</option>
//                               <option value="AB+">AB+</option>
//                               <option value="AB-">AB-</option>
//                               <option value="O+">O+</option>
//                               <option value="O-">O-</option>
//                             </select>
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                               Gender <span className="text-red-500">*</span>
//                             </label>
//                             <select
//                               name="gender"
//                               value={staffData.gender}
//                               onChange={handleInputChange}
//                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
//                               required // Added required
//                             >
//                               <option value="">Select</option>
//                               <option value="Male">Male</option>
//                               <option value="Female">Female</option>
//                               <option value="Other">Other</option>
//                             </select>
//                           </div>
//                         </div>

//                         {/* Contact Details */}
//                         <div className="bg-gray-50 p-4 rounded-lg">
//                           <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                             Contact Details
//                           </h3>
//                           <div className="space-y-4">
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Contact Number <span className="text-red-500">*</span>
//                               </label>
//                               <input
//                                 type="tel"
//                                 name="phoneno"
//                                 value={staffData.phoneno}
//                                 onChange={handleInputChange}
//                                 placeholder="Contact Number"
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 required // Added required
//                               />
//                             </div>
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Email Address <span className="text-red-500">*</span>
//                               </label>
//                               <input
//                                 type="email"
//                                 name="emailaddress"
//                                 value={staffData.emailaddress}
//                                 onChange={handleInputChange}
//                                 placeholder="example@gmail.com"
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 required // Added required
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Profile Picture */}
//                     <div className="w-full xl:w-64">
//                       <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
//                         <div className="w-32 h-32 mx-auto bg-white rounded-lg shadow-md flex items-center justify-center mb-4">
//                           <User className="w-16 h-16 text-gray-400" />
//                         </div>
//                         <p className="text-sm text-gray-600 mb-4">
//                           Upload Staff Photo
//                         </p>
//                         <button
//                           type="button"
//                           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                         >
//                           Choose File
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Action Buttons - Only for profile */}
//                   {activeTab === "profile" && !loading && !error && (
//                     <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-8 pt-6 border-t border-gray-200">
//                       <button
//                         type="button" // Important: set to button to prevent form submission on cancel
//                         className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit" // Changed to type="submit" to trigger form validation
//                         className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//                       >
//                         Save & Continue
//                       </button>
//                     </div>
//                   )}
//                 </form>
//               )
//             )}

//             {activeTab === "attendance" && (
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">
//                   Attendance
//                 </h2>

//                 {/* Month Selector */}
//                 <div className="mb-6">
//                   <select
//                     value={selectedMonth}
//                     onChange={(e) => setSelectedMonth(e.target.value)}
//                     className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option>February 2025</option>
//                     <option>January 2025</option>
//                     <option>December 2024</option>
//                   </select>
//                 </div>

//                 {/* Legend */}
//                 <div className="flex space-x-6 mb-6">
//                   <div className="flex items-center space-x-2">
//                     <div className="w-4 h-4 bg-blue-600 rounded"></div>
//                     <span className="text-sm text-gray-700">Present</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <div className="w-4 h-4 bg-red-600 rounded"></div>
//                     <span className="text-sm text-gray-700">Leave</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <div className="w-4 h-4 bg-yellow-400 rounded"></div>
//                     <span className="text-sm text-gray-700">Holiday</span>
//                   </div>
//                 </div>

//                 {/* Calendar */}
//                 <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-300">
//                   <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//                     {selectedMonth}
//                   </h3>

//                   <div className="grid grid-cols-8 gap-2 text-center">
//                     {/* Headers */}
//                     <div className="font-bold text-gray-600 p-3 bg-blue-200 rounded">
//                       CW
//                     </div>
//                     <div className="font-bold text-gray-600 p-3 bg-blue-200 rounded">
//                       Mo
//                     </div>
//                     <div className="font-bold text-gray-600 p-3 bg-blue-200 rounded">
//                       Tu
//                     </div>
//                     <div className="font-bold text-gray-600 p-3 bg-blue-200 rounded">
//                       We
//                     </div>
//                     <div className="font-bold text-gray-600 p-3 bg-blue-200 rounded">
//                       Th
//                     </div>
//                     <div className="font-bold text-gray-600 p-3 bg-blue-200 rounded">
//                       Fr
//                     </div>
//                     <div className="font-bold text-gray-600 p-3 bg-blue-200 rounded">
//                       Sa
//                     </div>
//                     <div className="font-bold text-gray-600 p-3 bg-blue-200 rounded">
//                       Su
//                     </div>

//                     {/* Week rows - Static data for illustration */}
//                     <div className="p-3 font-bold text-gray-600 bg-blue-200 rounded">
//                       5
//                     </div>
//                     <div className="p-3"></div>
//                     <div className="p-3"></div>
//                     <div className="p-3"></div>
//                     <div className="p-3"></div>
//                     <div className="p-3"></div>
//                     <div className="p-3 bg-white rounded font-bold text-gray-800 shadow">
//                       1
//                     </div>
//                     <div className="p-3 bg-white rounded font-bold text-gray-800 shadow">
//                       2
//                     </div>

//                     <div className="p-3 font-bold text-gray-600 bg-blue-200 rounded">
//                       6
//                     </div>
//                     <div className="p-3 bg-blue-600 text-white rounded font-bold shadow">
//                       3
//                     </div>
//                     <div className="p-3 bg-blue-600 text-white rounded font-bold shadow">
//                       4
//                     </div>
//                     <div className="p-3 bg-blue-600 text-white rounded font-bold shadow">
//                       5
//                     </div>
//                     <div className="p-3 bg-blue-600 text-white rounded font-bold shadow">
//                       6
//                     </div>
//                     <div className="p-3 bg-blue-600 text-white rounded font-bold shadow">
//                       7
//                     </div>
//                     <div className="p-3 bg-white rounded font-bold text-gray-800 shadow">
//                       8
//                     </div>
//                     <div className="p-3 bg-white rounded font-bold text-gray-800 shadow">
//                       9
//                     </div>

//                     <div className="p-3 font-bold text-gray-600 bg-blue-200 rounded">
//                       7
//                     </div>
//                     <div className="p-3 bg-blue-600 text-white rounded font-bold shadow">
//                       10
//                     </div>
//                     <div className="p-3 bg-blue-600 text-white rounded font-bold shadow">
//                       11
//                     </div>
//                     <div className="p-3 bg-blue-600 text-white rounded font-bold shadow">
//                       12
//                     </div>
//                     <div className="p-3 bg-blue-600 text-white rounded font-bold shadow">
//                       13
//                     </div>
//                     <div className="p-3 bg-red-600 text-white rounded font-bold shadow">
//                       14
//                     </div>
//                     <div className="p-3 bg-white rounded font-bold text-gray-800 shadow">
//                       15
//                     </div>
//                     <div className="p-3 bg-white rounded font-bold text-gray-800 shadow">
//                       16
//                     </div>

//                     <div className="p-3 font-bold text-gray-600 bg-blue-200 rounded">
//                       8
//                     </div>
//                     <div className="p-3 bg-blue-600 text-white rounded font-bold shadow">
//                       17
//                     </div>
//                     <div className="p-3 bg-blue-600 text-white rounded font-bold shadow">
//                       18
//                     </div>
//                     <div className="p-3 bg-blue-600 text-white rounded font-bold shadow">
//                       19
//                     </div>
//                     <div className="p-3 bg-blue-600 text-white rounded font-bold shadow">
//                       20
//                     </div>
//                     <div className="p-3 bg-blue-600 text-white rounded font-bold shadow">
//                       21
//                     </div>
//                     <div className="p-3 bg-white rounded font-bold text-gray-800 shadow">
//                       22
//                     </div>
//                     <div className="p-3 bg-white rounded font-bold text-gray-800 shadow">
//                       23
//                     </div>

//                     <div className="p-3 font-bold text-gray-600 bg-blue-200 rounded">
//                       9
//                     </div>
//                     <div className="p-3 bg-blue-600 text-white rounded font-bold shadow">
//                       24
//                     </div>
//                     <div className="p-3 bg-blue-600 text-white rounded font-bold shadow">
//                       25
//                     </div>
//                     <div className="p-3 bg-yellow-400 text-gray-800 rounded font-bold shadow">
//                       26
//                     </div>
//                     <div className="p-3 bg-blue-600 text-white rounded font-bold shadow">
//                       27
//                     </div>
//                     <div className="p-3 bg-blue-600 text-white rounded font-bold shadow">
//                       28
//                     </div>
//                     <div className="p-3"></div>
//                     <div className="p-3"></div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === "subjects" && (
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">
//                   Class & Subjects
//                 </h2>
//                 <div className="overflow-x-auto">
//                   <table className="w-full border-2 border-blue-500">
//                     <thead>
//                       <tr className="bg-blue-100">
//                         <th className="border-2 border-blue-500 p-4 text-left font-semibold">
//                           Subject
//                         </th>
//                         <th className="border-2 border-blue-500 p-4 text-left font-semibold">
//                           Standard
//                         </th>
//                         <th className="border-2 border-blue-500 p-4 text-left font-semibold">
//                           Division
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {Array.from({ length: 8 }, (_, i) => (
//                         <tr key={i} className="hover:bg-gray-50">
//                           <td className="border-2 border-blue-500 p-4 h-12"></td>
//                           <td className="border-2 border-blue-500 p-4 h-12"></td>
//                           <td className="border-2 border-blue-500 p-4 h-12"></td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}

//             {activeTab === "timetable" && (
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">
//                   Timetable
//                 </h2>
//                 <div className="overflow-x-auto">
//                   <table className="w-full border-2 border-blue-500">
//                     <thead>
//                       <tr className="bg-blue-100">
//                         <th className="border-2 border-blue-500 p-4 text-left font-semibold">
//                           Timings
//                         </th>
//                         <th className="border-2 border-blue-500 p-4 text-left font-semibold">
//                           Monday
//                         </th>
//                         <th className="border-2 border-blue-500 p-4 text-left font-semibold">
//                           Tuesday
//                         </th>
//                         <th className="border-2 border-blue-500 p-4 text-left font-semibold">
//                           Wednesday
//                         </th>
//                         <th className="border-2 border-blue-500 p-4 text-left font-semibold">
//                           Thursday
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {[
//                         "7:00 to 7:30",
//                         "7:30 to 8:00",
//                         "8:00 to 8:30",
//                         "8:30 to 9:00",
//                         "9:00 to 9:30",
//                         "9:30 to 10:00",
//                       ].map((time, i) => (
//                         <tr key={i} className="hover:bg-gray-50">
//                           <td className="border-2 border-blue-500 p-4 font-medium bg-blue-50">
//                             {time}
//                           </td>
//                           <td className="border-2 border-blue-500 p-4 h-12"></td>
//                           <td className="border-2 border-blue-500 p-4 h-12"></td>
//                           <td className="border-2 border-blue-500 p-4 h-12"></td>
//                           <td className="border-2 border-blue-500 p-4 h-12"></td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}

//             {activeTab === "leave" && (
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">
//                   Leave Request
//                 </h2>
//                 <div className="space-y-4">
//                   {[
//                     {
//                       id: 1,
//                       subject: "Medical Leave",
//                       body: "Requesting leave for medical treatment",
//                       date: "15 Feb 2025 | Monday",
//                       status: "Accepted",
//                       statusColor: "text-green-600",
//                     },
//                     {
//                       id: 2,
//                       subject: "Personal Leave",
//                       body: "Family emergency leave request",
//                       date: "10 Feb 2025 | Saturday",
//                       status: "Rejected",
//                       statusColor: "text-red-600",
//                     },
//                     {
//                       id: 3,
//                       subject: "Casual Leave",
//                       body: "Need personal time off",
//                       date: "5 Feb 2025 | Monday",
//                       status: "Accepted",
//                       statusColor: "text-green-600",
//                     },
//                   ].map((request) => (
//                     <div
//                       key={request.id}
//                       className="flex items-center bg-white border rounded-lg overflow-hidden shadow-sm"
//                     >
//                       <div className="bg-blue-600 text-white p-4 flex items-center justify-center w-12 h-16">
//                         <span className="font-bold">{request.id}</span>
//                       </div>
//                       <div className="flex-1 p-4">
//                         <div className="text-blue-600 font-semibold mb-1">
//                           {request.subject}
//                         </div>
//                         <div className="text-gray-600">{request.body}</div>
//                         <div className="text-sm text-gray-500">
//                           {request.date}
//                         </div>
//                       </div>
//                       <div className="p-4 text-right">
//                         <div
//                           className={`${request.statusColor} font-semibold mb-2`}
//                         >
//                           {request.status}
//                         </div>
//                         <button className="text-blue-600 text-sm hover:underline">
//                           Read More
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {activeTab === "history" && (
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">
//                   History
//                 </h2>
//                 <div className="bg-white border rounded-lg shadow-sm p-4">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
//                       <span className="font-semibold text-gray-800">
//                         AY 2023-2024
//                       </span>
//                     </div>
//                     <button className="text-blue-600 hover:underline font-medium">
//                       View
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default EditStaff;


// import React, { useState, useEffect, useCallback } from "react";
// import { User, BookOpen, Calendar, Clock, ChevronRight } from "lucide-react";
// import { useParams, useNavigate } from "react-router-dom";
// import MainLayout from "../layout/MainLayout"; 

// // Import the modular components (assuming 'Staff Edit' folder)
// import StaffProfile from './Staff Edit/StaffProfile';
// import StaffAttendance from './Staff Edit/StaffAttendance';
// import StaffSubjects from './Staff Edit/StaffSubjects';
// import StaffTimetable from './Staff Edit/StaffTimetable';
// import StaffLeave from './Staff Edit/StaffLeave';
// import StaffHistory from './Staff Edit/StaffHistory';

// const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
// const API_BASE_URL = "http://localhost:5000/api";

// const EditStaff = () => {
//   const { id } = useParams(); // MongoDB _id from the URL
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("profile");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Core staff data state initialized with expected fields
//   const [staffData, setStaffData] = useState({
//     _id: id, // MongoDB object ID (for fetching)
//     staffid: '', // Unique Staff ID (for updating sub-documents)
//     firstname: "", lastname: "", middlename: "", 
//     dob: "", maritalstatus: "", bloodgroup: "", gender: "", 
//     phoneno: "", emailaddress: "",
//     photo: "", // Added photo field for display
//     status: true,
//   });

//   const [isActive, setIsActive] = useState(true);
  
//   // Refactored fetch function (passed as refreshStaffData)
//   const fetchStaffData = useCallback(async () => {
//     if (!id) {
//         console.warn("DEBUG: fetchStaffData - Staff ID parameter is missing.");
//         return;
//     }
//     try {
//       setLoading(true);
//       setError(null);
//       console.log(`DEBUG: fetchStaffData - Attempting to fetch staff with MongoDB ID: ${id}`);
      
//       const response = await fetch(`${API_BASE_URL}/staff/${id}`, { 
//         headers: { auth: AUTH_HEADER },
//       });
      
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`❌ ERROR: fetchStaffData - Failed with status ${response.status}: ${errorText}`);
//         throw new Error(`Failed to fetch staff data. Status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       console.log("✅ DEBUG: fetchStaffData - Successfully fetched and received data:", data);

//       const staffIdValue = data.staffid || ''; 
//       const mongoIdValue = data._id || id; 

//       // Update local state with fetched data
//       setStaffData(prev => ({
//         ...prev,
//         ...data,
//         dob: data.dob ? data.dob.split("T")[0] : "", 
//         _id: mongoIdValue,
//         staffid: staffIdValue,
//         status: data.status !== undefined ? Boolean(data.status) : true,
//       }));

//       setIsActive(data.status !== undefined ? Boolean(data.status) : true);
      
//     } catch (err) {
//       console.error(`❌ ERROR: fetchStaffData - Exception occurred: ${err.message}`);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchStaffData(); // Initial fetch
//   }, [fetchStaffData]);

//   // Handle input changes (used by StaffProfile)
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setStaffData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle form submission (used by StaffProfile)
//   const handleSubmit = async (e, photoUrl = null) => { // Accept photoUrl from StaffProfile
//     e.preventDefault(); 
    
//     // CRITICAL: Use the staffid for the URL parameter
//     const staffToUpdateId = staffData.staffid; 
    
//     if (!staffToUpdateId) {
//         setError("Cannot save: Staff ID not found in current data state.");
//         console.error("CRITICAL: Cannot save. staffData.staffid is missing.");
//         return;
//     }
    
//     // Prepare data: send all fields, including the current status and photo URL
//     const dataToSend = {
//         ...staffData,
//         status: isActive,
//         photo: photoUrl || staffData.photo, // Use new photoUrl or existing one
//         _id: undefined // Exclude MongoDB ID from update payload
//     };
    
//     console.log("⚙️ DEBUG: handleSubmit - Attempting to save all staff data using URL ID:", staffToUpdateId);
//     try {
//       setLoading(true); 
//       const response = await fetch(`${API_BASE_URL}/edit-staff/${staffToUpdateId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           auth: AUTH_HEADER,
//         },
//         body: JSON.stringify(dataToSend),
//       });

//       if (!response.ok) {
//         const errorBody = await response.json(); 
//         const errorMessage = errorBody.message || errorBody.error || `Server responded with status ${response.status}`;
        
//         console.error(`❌ ERROR: handleSubmit - Save failed: ${errorMessage}`);
//         setError(`Error: ${errorMessage}`);
//         throw new Error(errorMessage);
//       }
      
//       // Log success and immediately re-fetch the current state from the server
//       console.log("💾 DEBUG: handleSubmit - Staff updated successfully. Calling refresh...");
//       await fetchStaffData(); 
//       setError(null); 
      
//     } catch (err) {
//       console.error(`❌ ERROR: handleSubmit - Exception during save: ${err.message}`);
//       setError(`Failed to save data: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleActive = () => {
//     const newStatus = !isActive;
//     setIsActive(newStatus);
//     setStaffData((prev) => ({ ...prev, status: newStatus })); 
//     console.log(`DEBUG: toggleActive - Status changed locally to: ${newStatus ? 'Active' : 'Inactive'}`);
//   };

//   const getCurrentComponent = () => {
//     const props = { staff: staffData, staffid: id, refreshStaffData: fetchStaffData };

//     switch (activeTab) {
//       case "profile":
//         return (
//             <StaffProfile
//                 staffData={staffData}
//                 setStaffData={setStaffData}
//                 handleSubmit={handleSubmit} 
//                 handleInputChange={handleInputChange}
//                 isActive={isActive}
//                 toggleActive={toggleActive}
//                 loading={loading}
//                 error={error}
//             />
//         );
//       case "attendance":
//         return <StaffAttendance {...props} />;
//       case "subjects":
//         return <StaffSubjects {...props} />;
//       case "timetable":
//         return <StaffTimetable {...props} />;
//       case "leave":
//         return <StaffLeave {...props} />;
//       case "history":
//         return <StaffHistory {...props} />;
//       default:
//         return <div>Select a valid tab.</div>;
//     }
//   };

//   const TabButton = ({ tabName, label, icon: Icon }) => (
//     <button
//         onClick={() => {
//             setActiveTab(tabName);
//             console.log(`DEBUG: TabButton - Changing activeTab to: ${tabName}`);
//         }}
//         className={`flex items-center space-x-2 px-6 py-3 rounded-t-lg font-medium transition-colors duration-200 ${
//             activeTab === tabName
//                 ? 'bg-white text-blue-600 border-b-2 border-blue-600'
//                 : 'text-gray-600 hover:text-blue-700 hover:bg-gray-100'
//         }`}
//     >
//         {Icon && <Icon className="w-5 h-5" />}
//         <span>{label}</span>
//     </button>
//   );


//   return (
//     <MainLayout className="min-h-screen bg-gray-50">
//       <div className="flex flex-col lg:flex-row">
//         <div className="flex-1 p-4 lg:p-8">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                 Staff Overview
//               </h2>
//               <h3 className="text-xl font-semibold text-gray-700">
//                 Staff Registration Form
//               </h3>
//             </div>
            
//             {/* Active / Inactive Toggle */}
//             <div className="flex items-center space-x-6">
//               <div className="flex items-center gap-3">
//                 <span
//                   className={`text-lg font-semibold select-none ${
//                     isActive ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {isActive ? "Active" : "Inactive"}
//                 </span>

//                 <button
//                   onClick={toggleActive}
//                   aria-pressed={isActive}
//                   aria-label={isActive ? "Set as Inactive" : "Set as Active"}
//                   className="relative focus:outline-none"
//                   disabled={loading}
//                 >
//                   <div
//                     className={`rounded-full p-[3px] ${
//                       isActive
//                         ? "border-2 border-blue-500"
//                         : "border-2 border-gray-300"
//                     }`}
//                     style={{
//                       boxShadow: isActive
//                         ? "0 0 0 4px rgba(59,130,246,0.12)"
//                         : "0 0 0 4px rgba(156,163,175,0.06)",
//                     }}
//                   >
//                     <div
//                       className={`w-20 h-10 rounded-full transition-colors duration-200 flex items-center relative ${
//                         isActive ? "bg-green-500" : "bg-gray-300"
//                       }`}
//                     >
//                       <div
//                         className={`bg-white w-8 h-8 rounded-full shadow absolute transition-transform duration-200`}
//                         style={{
//                           transform: isActive
//                             ? "translateX(44px)"
//                             : "translateX(4px)",
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="flex border-b border-gray-200 mb-6 overflow-x-auto whitespace-nowrap">
//             <TabButton tabName="profile" label="Profile" icon={User} />
//             <TabButton tabName="attendance" label="Attendance" icon={Calendar} />
//             <TabButton tabName="subjects" label="Subjects" icon={BookOpen} />
//             <TabButton tabName="timetable" label="Timetable" icon={Clock} />
//             <TabButton tabName="leave" label="Leave Request" icon={ChevronRight} />
//             <TabButton tabName="history" label="History" icon={ChevronRight} />
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
//             {loading ? (
//               <div className="flex items-center justify-center h-64">
//                 <div className="text-lg text-gray-600">
//                   Loading staff data...
//                 </div>
//               </div>
//             ) : error ? (
//               <div className="flex items-center justify-center h-64">
//                 <div className="text-lg text-red-600">Error: {error}</div>
//               </div>
//             ) : !staffData || !staffData.staffid ? (
//                <div className="flex items-center justify-center h-64">
//                  <div className="text-lg text-red-600">Error: Staff ID is invalid or missing in the database record.</div>
//                </div>
//             ) : (
//               getCurrentComponent()
//             )}
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default EditStaff;



// import React, { useState, useEffect, useCallback } from "react";
// import { User, BookOpen, Calendar, Clock, ChevronRight } from "lucide-react";
// import { useParams, useNavigate } from "react-router-dom";
// import MainLayout from "../layout/MainLayout"; 

// // Import the modular components (assuming 'Staff Edit' folder)
// import StaffProfile from './Staff Edit/StaffProfile';
// import StaffAttendance from './Staff Edit/StaffAttendance';
// import StaffSubjects from './Staff Edit/StaffSubjects';
// import StaffTimetable from './Staff Edit/StaffTimetable';
// import StaffLeave from './Staff Edit/StaffLeave';
// import StaffHistory from './Staff Edit/StaffHistory';

// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
// // const API_BASE_URL = "http://localhost:5000/api"; // REMOVED LOCAL DEFINITION

// const EditStaff = () => {
//   const { id } = useParams(); // MongoDB _id from the URL
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("profile");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Core staff data state initialized with expected fields
//   const [staffData, setStaffData] = useState({
//     _id: id, // MongoDB object ID (for fetching)
//     staffid: '', // Unique Staff ID (for updating sub-documents)
//     firstname: "", lastname: "", middlename: "", 
//     dob: "", maritalstatus: "", bloodgroup: "", gender: "", 
//     phoneno: "", emailaddress: "",
//     photo: "", // Added photo field for display
//     status: true,
//   });

//   const [isActive, setIsActive] = useState(true);
//   
//   // Refactored fetch function (passed as refreshStaffData)
//   const fetchStaffData = useCallback(async () => {
//     if (!id) {
//         console.warn("DEBUG: fetchStaffData - Staff ID parameter is missing.");
//         return;
//     }
//     try {
//       setLoading(true);
//       setError(null);
//       console.log(`DEBUG: fetchStaffData - Attempting to fetch staff with MongoDB ID: ${id}`);
//       
//       // FIX 1: Using imported API_BASE_URL
//       const response = await fetch(`${API_BASE_URL}api/staff/${id}`, { 
//         headers: { auth: AUTH_HEADER },
//       });
//       
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`❌ ERROR: fetchStaffData - Failed with status ${response.status}: ${errorText}`);
//         throw new Error(`Failed to fetch staff data. Status: ${response.status}`);
//       }
//       
//       const data = await response.json();
//       console.log("✅ DEBUG: fetchStaffData - Successfully fetched and received data:", data);

//       const staffIdValue = data.staffid || ''; 
//       const mongoIdValue = data._id || id; 

//       // Update local state with fetched data
//       setStaffData(prev => ({
//         ...prev,
//         ...data,
//         dob: data.dob ? data.dob.split("T")[0] : "", 
//         _id: mongoIdValue,
//         staffid: staffIdValue,
//         status: data.status !== undefined ? Boolean(data.status) : true,
//       }));

//       setIsActive(data.status !== undefined ? Boolean(data.status) : true);
//       
//     } catch (err) {
//       console.error(`❌ ERROR: fetchStaffData - Exception occurred: ${err.message}`);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     fetchStaffData(); // Initial fetch
//   }, [fetchStaffData]);

//   // Handle input changes (used by StaffProfile)
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setStaffData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle form submission (used by StaffProfile)
//   const handleSubmit = async (e, photoUrl = null) => { // Accept photoUrl from StaffProfile
//     e.preventDefault(); 
//     
//     // CRITICAL: Use the staffid for the URL parameter
//     const staffToUpdateId = staffData.staffid; 
//     
//     if (!staffToUpdateId) {
//         setError("Cannot save: Staff ID not found in current data state.");
//         console.error("CRITICAL: Cannot save. staffData.staffid is missing.");
//         return;
//     }
//     
//     // Prepare data: send all fields, including the current status and photo URL
//     const dataToSend = {
//         ...staffData,
//         status: isActive,
//         photo: photoUrl || staffData.photo, // Use new photoUrl or existing one
//         _id: undefined // Exclude MongoDB ID from update payload
//     };
//     
//     console.log("⚙️ DEBUG: handleSubmit - Attempting to save all staff data using URL ID:", staffToUpdateId);
//     try {
//       setLoading(true); 
//       // FIX 2: Using imported API_BASE_URL
//       const response = await fetch(`${API_BASE_URL}api/edit-staff/${staffToUpdateId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           auth: AUTH_HEADER,
//         },
//         body: JSON.stringify(dataToSend),
//       });

//       if (!response.ok) {
//         const errorBody = await response.json(); 
//         const errorMessage = errorBody.message || errorBody.error || `Server responded with status ${response.status}`;
//         
//         console.error(`❌ ERROR: handleSubmit - Save failed: ${errorMessage}`);
//         setError(`Error: ${errorMessage}`);
//         throw new Error(errorMessage);
//       }
//       
//       // Log success and immediately re-fetch the current state from the server
//       console.log("💾 DEBUG: handleSubmit - Staff updated successfully. Calling refresh...");
//       await fetchStaffData(); 
//       setError(null); 
//       
//     } catch (err) {
//       console.error(`❌ ERROR: handleSubmit - Exception during save: ${err.message}`);
//       setError(`Failed to save data: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleActive = () => {
//     const newStatus = !isActive;
//     setIsActive(newStatus);
//     setStaffData((prev) => ({ ...prev, status: newStatus })); 
//     console.log(`DEBUG: toggleActive - Status changed locally to: ${newStatus ? 'Active' : 'Inactive'}`);
//   };

//   const getCurrentComponent = () => {
//     const props = { staff: staffData, staffid: id, refreshStaffData: fetchStaffData };

//     switch (activeTab) {
//       case "profile":
//         return (
//             <StaffProfile
//                 staffData={staffData}
//                 setStaffData={setStaffData}
//                 handleSubmit={handleSubmit} 
//                 handleInputChange={handleInputChange}
//                 isActive={isActive}
//                 toggleActive={toggleActive}
//                 loading={loading}
//                 error={error}
//             />
//         );
//       case "attendance":
//         return <StaffAttendance {...props} />;
//       case "subjects":
//         return <StaffSubjects {...props} />;
//       case "timetable":
//         return <StaffTimetable {...props} />;
//       case "leave":
//         return <StaffLeave {...props} />;
//       case "history":
//         return <StaffHistory {...props} />;
//       default:
//         return <div>Select a valid tab.</div>;
//     }
//   };

//   const TabButton = ({ tabName, label, icon: Icon }) => (
//     <button
//         onClick={() => {
//             setActiveTab(tabName);
//             console.log(`DEBUG: TabButton - Changing activeTab to: ${tabName}`);
//         }}
//         className={`flex items-center space-x-2 px-6 py-3 rounded-t-lg font-medium transition-colors duration-200 ${
//             activeTab === tabName
//                 ? 'bg-white text-blue-600 border-b-2 border-blue-600'
//                 : 'text-gray-600 hover:text-blue-700 hover:bg-gray-100'
//         }`}
//     >
//         {Icon && <Icon className="w-5 h-5" />}
//         <span>{label}</span>
//     </button>
//   );


//   return (
//     <MainLayout className="min-h-screen bg-gray-50">
//       <div className="flex flex-col lg:flex-row">
//         <div className="flex-1 p-4 lg:p-8">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                 Staff Overview
//               </h2>
//               <h3 className="text-xl font-semibold text-gray-700">
//                 Staff Registration Form
//               </h3>
//             </div>
//             
//             {/* Active / Inactive Toggle */}
//             <div className="flex items-center space-x-6">
//               <div className="flex items-center gap-3">
//                 <span
//                   className={`text-lg font-semibold select-none ${
//                     isActive ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {isActive ? "Active" : "Inactive"}
//                 </span>

//                 <button
//                   onClick={toggleActive}
//                   aria-pressed={isActive}
//                   aria-label={isActive ? "Set as Inactive" : "Set as Active"}
//                   className="relative focus:outline-none"
//                   disabled={loading}
//                 >
//                   <div
//                     className={`rounded-full p-[3px] ${
//                       isActive
//                         ? "border-2 border-blue-500"
//                         : "border-2 border-gray-300"
//                         }`}
//                     style={{
//                       boxShadow: isActive
//                         ? "0 0 0 4px rgba(59,130,246,0.12)"
//                         : "0 0 0 4px rgba(156,163,175,0.06)",
//                     }}
//                   >
//                     <div
//                       className={`w-20 h-10 rounded-full transition-colors duration-200 flex items-center relative ${
//                         isActive ? "bg-green-500" : "bg-gray-300"
//                       }`}
//                     >
//                       <div
//                         className={`bg-white w-8 h-8 rounded-full shadow absolute transition-transform duration-200`}
//                         style={{
//                           transform: isActive
//                             ? "translateX(44px)"
//                             : "translateX(4px)",
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="flex border-b border-gray-200 mb-6 overflow-x-auto whitespace-nowrap">
//             <TabButton tabName="profile" label="Profile" icon={User} />
//             <TabButton tabName="attendance" label="Attendance" icon={Calendar} />
//             <TabButton tabName="subjects" label="Subjects" icon={BookOpen} />
//             <TabButton tabName="timetable" label="Timetable" icon={Clock} />
//             <TabButton tabName="leave" label="Leave Request" icon={ChevronRight} />
//             <TabButton tabName="history" label="History" icon={ChevronRight} />
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
//             {loading ? (
//               <div className="flex items-center justify-center h-64">
//                 <div className="text-lg text-gray-600">
//                   Loading staff data...
//                 </div>
//               </div>
//             ) : error ? (
//               <div className="flex items-center justify-center h-64">
//                 <div className="text-lg text-red-600">Error: {error}</div>
//               </div>
//             ) : !staffData || !staffData.staffid ? (
//                <div className="flex items-center justify-center h-64">
//                  <div className="text-lg text-red-600">Error: Staff ID is invalid or missing in the database record.</div>
//                </div>
//             ) : (
//               getCurrentComponent()
//             )}
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default EditStaff;

















// import React, { useState, useEffect, useCallback } from "react";
// import { User, BookOpen, Calendar, Clock, ChevronRight } from "lucide-react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import MainLayout from "../layout/MainLayout"; 

// import StaffProfile from './Staff Edit/StaffProfile';
// import StaffAttendance from './Staff Edit/StaffAttendance';
// import StaffSubjects from './Staff Edit/StaffSubjects';
// import StaffTimetable from './Staff Edit/StaffTimetable';
// import StaffLeave from './Staff Edit/StaffLeave';
// import StaffHistory from './Staff Edit/StaffHistory';

// import { API_BASE_URL } from '../config'; 

// const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

// const EditStaff = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const queryParams = new URLSearchParams(location.search);
//     const isViewMode = queryParams.get("mode") === "view";

//     const pageTitle = isViewMode
//         ? "Staff Profile"
//         : "Staff Registration Form";

//     const [activeTab, setActiveTab] = useState("profile");
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const [staffData, setStaffData] = useState({
//         _id: id,
//         staffid: "",
//         firstname: "",
//         lastname: "",
//         middlename: "",
//         dob: "",
//         maritalstatus: "",
//         bloodgroup: "",
//         gender: "",
//         phoneno: "",
//         emailaddress: "",
//         photo: "",
//         status: true,
//     });

//     const [isActive, setIsActive] = useState(true);

//     const fetchStaffData = useCallback(async () => {
//         if (!id) return;

//         try {
//             setLoading(true);
//             setError(null);

//             const response = await fetch(`${API_BASE_URL}api/staff/${id}`, {
//                 headers: { auth: AUTH_HEADER },
//             });

//             if (!response.ok) {
//                 throw new Error(`Failed to fetch staff data. Status: ${response.status}`);
//             }

//             const data = await response.json();

//             setStaffData((prev) => ({
//                 ...prev,
//                 ...data,
//                 dob: data.dob ? data.dob.split("T")[0] : "",
//                 _id: data._id || id,
//                 staffid: data.staffid || "",
//                 status: data.status !== undefined ? Boolean(data.status) : true,
//             }));

//             setIsActive(
//                 data.status !== undefined ? Boolean(data.status) : true
//             );
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     }, [id]);

//     useEffect(() => {
//         fetchStaffData();
//     }, [fetchStaffData]);

//     const handleInputChange = (e) => {
//         if (isViewMode) return;

//         const { name, value } = e.target;
//         setStaffData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e, photoUrl = null) => {
//         e.preventDefault();

//         if (isViewMode) {
//             alert("Cannot save: You are currently in View Mode.");
//             return;
//         }

//         if (!staffData.staffid) {
//             setError("Cannot save: Staff ID missing.");
//             return;
//         }

//         const dataToSend = {
//             ...staffData,
//             status: isActive,
//             photo: photoUrl || staffData.photo,
//             _id: undefined,
//         };

//         try {
//             setLoading(true);

//             const response = await fetch(
//                 `${API_BASE_URL}api/edit-staff/${staffData.staffid}`,
//                 {
//                     method: "PUT",
//                     headers: {
//                         "Content-Type": "application/json",
//                         auth: AUTH_HEADER,
//                     },
//                     body: JSON.stringify(dataToSend),
//                 }
//             );

//             if (!response.ok) {
//                 const body = await response.json();
//                 throw new Error(body.message || `Error ${response.status}`);
//             }

//             await fetchStaffData();
//             setError(null);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const toggleActive = () => {
//         if (isViewMode) return;

//         const newStatus = !isActive;
//         setIsActive(newStatus);
//         setStaffData((prev) => ({ ...prev, status: newStatus }));
//     };

//     const renderActionButtons = () => {
//         if (isViewMode) {
//             return (
//                 <div className="flex justify-end mt-6">
//                     <button
//                         onClick={() => navigate(-1)}
//                         className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-all duration-200"
//                     >
//                         Back to List
//                     </button>
//                 </div>
//             );
//         }
//         return null;
//     };

//     const getCurrentComponent = () => {
//         const props = {
//             staff: staffData,
//             staffid: id,
//             refreshStaffData: fetchStaffData,
//             isViewMode,
//         };

//         switch (activeTab) {
//             case "profile":
//                 return (
//                     <StaffProfile
//                         staffData={staffData}
//                         setStaffData={setStaffData}
//                         handleSubmit={handleSubmit}
//                         handleInputChange={handleInputChange}
//                         isActive={isActive}
//                         toggleActive={toggleActive}
//                         loading={loading}
//                         error={error}
//                         isViewMode={isViewMode}
//                     />
//                 );

//             case "attendance":
//                 return <StaffAttendance {...props} />;

//             case "subjects":
//                 return <StaffSubjects {...props} />;

//             case "timetable":
//                 return <StaffTimetable {...props} />;

//             case "leave":
//                 return <StaffLeave {...props} />;

//             case "history":
//                 return <StaffHistory {...props} />;

//             default:
//                 return <div>Select a valid tab.</div>;
//         }
//     };

//     const TabButton = ({ tabName, label, icon: Icon }) => (
//         <button
//             onClick={() => setActiveTab(tabName)}
//             className={`flex items-center space-x-2 px-6 py-3 rounded-t-lg font-medium transition-colors duration-200 ${
//                 activeTab === tabName
//                     ? "bg-white text-blue-600 border-b-2 border-blue-600"
//                     : "text-gray-600 hover:text-blue-700 hover:bg-gray-100"
//             }`}
//         >
//             {Icon && <Icon className="w-5 h-5" />}
//             <span>{label}</span>
//         </button>
//     );

//     return (
//         <MainLayout className="min-h-screen bg-gray-50">
//             <div className="flex flex-col lg:flex-row">
//                 <div className="flex-1 p-4 lg:p-8">

//                     {/* HEADER */}
//                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
//                         <div>
//                             {/* <h2 className="text-2xl font-bold">Staff Overview</h2> */}
//                             <h3 className="text-xl font-semibold">{pageTitle}</h3>
//                         </div>

//                         {/* STATUS TOGGLE */}
//                         <div className="flex items-center gap-3">
//                             <span
//                                 className={`text-lg font-semibold ${
//                                     isActive ? "text-green-600" : "text-red-600"
//                                 }`}
//                             >
//                                 {isActive ? "Active" : "Inactive"}
//                             </span>

//                             <button
//                                 onClick={toggleActive}
//                                 disabled={loading || isViewMode}
//                                 className="relative"
//                             >
//                                 <div
//                                     className={
//                                         "rounded-full p-[3px] " +
//                                         (isActive
//                                             ? "border-2 border-blue-500"
//                                             : "border-2 border-gray-300")
//                                     }
//                                     style={{
//                                         boxShadow: isActive
//                                             ? "0 0 0 4px rgba(59,130,246,0.12)"
//                                             : "0 0 0 4px rgba(156,163,175,0.06)"
//                                     }}
//                                 >
//                                     <div
//                                         className={`w-20 h-10 rounded-full transition-colors duration-200 flex items-center relative ${
//                                             isActive && !isViewMode
//                                                 ? "bg-green-500"
//                                                 : "bg-gray-300"
//                                         }`}
//                                     >
//                                         <div
//                                             className="bg-white w-8 h-8 rounded-full shadow absolute transition-transform duration-200"
//                                             style={{
//                                                 transform: isActive
//                                                     ? "translateX(44px)"
//                                                     : "translateX(4px)"
//                                             }}
//                                         />
//                                     </div>
//                                 </div>
//                             </button>
//                         </div>
//                     </div>

//                     {/* TABS */}
//                     <div className="flex border-b border-gray-200 mb-6 overflow-x-auto whitespace-nowrap">
//                         <TabButton tabName="profile" label="Profile" icon={User} />
//                         <TabButton tabName="attendance" label="Attendance" icon={Calendar} />
//                         <TabButton tabName="subjects" label="Subjects" icon={BookOpen} />
//                         <TabButton tabName="timetable" label="Timetable" icon={Clock} />
//                         <TabButton tabName="leave" label="Leave Request" icon={ChevronRight} />
//                         <TabButton tabName="history" label="History" icon={ChevronRight} />
//                     </div>

//                     {/* MAIN CONTENT */}
//                     <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
//                         {loading ? (
//                             <div className="text-center text-gray-600">Loading staff data...</div>
//                         ) : error ? (
//                             <div className="text-center text-red-600">{error}</div>
//                         ) : !staffData?.staffid ? (
//                             <div className="text-center text-red-600">
//                                 Error: Staff ID missing or invalid.
//                             </div>
//                         ) : (
//                             <>
//                                 {getCurrentComponent()}
//                                 {renderActionButtons()}
//                             </>
//                         )}
//                     </div>

//                 </div>
//             </div>
//         </MainLayout>
//     );
// };

// export default EditStaff;






























// import React, { useState, useEffect, useCallback } from "react";
// import { User, BookOpen, Calendar, Clock, ChevronRight } from "lucide-react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import MainLayout from "../layout/MainLayout"; 

// import StaffProfile from './Staff Edit/StaffProfile';
// import StaffAttendance from './Staff Edit/StaffAttendance';
// import StaffSubjects from './Staff Edit/StaffSubjects';
// import StaffTimetable from './Staff Edit/StaffTimetable';
// import StaffLeave from './Staff Edit/StaffLeave';
// import StaffHistory from './Staff Edit/StaffHistory';

// import { API_BASE_URL } from '../config'; 

// const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

// const EditStaff = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const queryParams = new URLSearchParams(location.search);
//     const isViewMode = queryParams.get("mode") === "view";

//     const pageTitle = isViewMode ? "Staff Profile" : "Staff Registration Form";

//     const [activeTab, setActiveTab] = useState("profile");
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const [staffData, setStaffData] = useState({
//         _id: id,
//         staffid: "",
//         firstname: "",
//         middlename: "",
//         lastname: "",
//         dob: "",
//         maritalstatus: "",
//         bloodgroup: "",
//         gender: "",
//         nationality: "",
//         category: "",
//         aadharno: "",
//         phoneno: "",
//         alternatephoneno: "",
//         emailaddress: "",
//         addressline1: "",
//         addressline2: "",
//         city: "",
//         postalcode: "",
//         district: "",
//         state: "",
//         country: "",
//         photo: "",
//         highestqualification: "",
//         yearofpassing: "",
//         specialization: "",
//         certificates: "",
//         universityname: "",
//         totalexperience: "",
//         designation: "",
//         previousemployer: "",
//         subjectstaught: "",
//         reasonforleaving: "",
//         position: "",
//         dept: "",
//         preferredgrades: "",
//         joiningdate: "",
//         bankname: "",
//         branchname: "",
//         accno: "",
//         ifccode: "",
//         panno: "",
//         transportstatus: "",
//         pickuppoint: "",
//         droppoint: "",
//         modetransport: "",
//         status: true,
//     });

//     const [isActive, setIsActive] = useState(true);

//     const fetchStaffData = useCallback(async () => {
//         if (!id) return;
//         try {
//             setLoading(true);
//             setError(null);
//             const response = await fetch(`${API_BASE_URL}api/staff/${id}`, {
//                 headers: { auth: AUTH_HEADER },
//             });
//             if (!response.ok) throw new Error(`Failed to fetch staff data. Status: ${response.status}`);
//             const data = await response.json();

//             // Ensure null values from DB are converted to empty strings for inputs
//             const sanitizedData = {};
//             Object.keys(data).forEach(key => {
//                 sanitizedData[key] = data[key] === null ? "" : data[key];
//             });

//             setStaffData((prev) => ({
//                 ...prev,
//                 ...sanitizedData,
//                 dob: sanitizedData.dob ? sanitizedData.dob.split("T")[0] : "",
//                 joiningdate: sanitizedData.joiningdate ? sanitizedData.joiningdate.split("T")[0] : "",
//                 _id: sanitizedData._id || id,
//                 status: sanitizedData.status !== undefined ? Boolean(sanitizedData.status) : true,
//             }));

//             setIsActive(sanitizedData.status !== undefined ? Boolean(sanitizedData.status) : true);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     }, [id]);

//     useEffect(() => {
//         fetchStaffData();
//     }, [fetchStaffData]);

//     const handleInputChange = (e) => {
//         if (isViewMode) return;
//         const { name, value } = e.target;
//         setStaffData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e, photoUrl = null) => {
//         e.preventDefault();
//         if (isViewMode) {
//             alert("Cannot save: You are currently in View Mode.");
//             return;
//         }

//         const dataToSend = {
//             ...staffData,
//             status: isActive,
//             photo: photoUrl || staffData.photo,
//             _id: undefined,
//         };

//         try {
//             setLoading(true);
//             const response = await fetch(`${API_BASE_URL}api/edit-staff/${staffData.staffid}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     auth: AUTH_HEADER,
//                 },
//                 body: JSON.stringify(dataToSend),
//             });
//             if (!response.ok) {
//                 const body = await response.json();
//                 throw new Error(body.message || `Error ${response.status}`);
//             }
//             await fetchStaffData();
//             setError(null);
//             alert("Changes saved successfully!");
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const toggleActive = () => {
//         if (isViewMode) return;
//         const newStatus = !isActive;
//         setIsActive(newStatus);
//         setStaffData((prev) => ({ ...prev, status: newStatus }));
//     };

//     const renderActionButtons = () => {
//         if (isViewMode) {
//             return (
//                 <div className="flex justify-end mt-6">
//                     <button
//                         onClick={() => navigate(-1)}
//                         className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-all duration-200"
//                     >
//                         Back to List
//                     </button>
//                 </div>
//             );
//         }
//         return null;
//     };

//     const getCurrentComponent = () => {
//         const props = {
//             staff: staffData,
//             staffid: id,
//             refreshStaffData: fetchStaffData,
//             isViewMode,
//         };

//         switch (activeTab) {
//             case "profile":
//                 return (
//                     <StaffProfile
//                         staffData={staffData}
//                         setStaffData={setStaffData}
//                         handleSubmit={handleSubmit}
//                         handleInputChange={handleInputChange}
//                         isActive={isActive}
//                         toggleActive={toggleActive}
//                         loading={loading}
//                         error={error}
//                         isViewMode={isViewMode}
//                     />
//                 );
//             case "attendance": return <StaffAttendance {...props} />;
//             case "subjects": return <StaffSubjects {...props} />;
//             case "timetable": return <StaffTimetable {...props} />;
//             case "leave": return <StaffLeave {...props} />;
//             case "history": return <StaffHistory {...props} />;
//             default: return <div>Select a valid tab.</div>;
//         }
//     };

//     const TabButton = ({ tabName, label, icon: Icon }) => (
//         <button
//             onClick={() => setActiveTab(tabName)}
//             className={`flex items-center space-x-2 px-6 py-3 rounded-t-lg font-medium transition-colors duration-200 ${
//                 activeTab === tabName
//                     ? "bg-white text-blue-600 border-b-2 border-blue-600"
//                     : "text-gray-600 hover:text-blue-700 hover:bg-gray-100"
//             }`}
//         >
//             {Icon && <Icon className="w-5 h-5" />}
//             <span>{label}</span>
//         </button>
//     );

//     return (
//         <MainLayout className="min-h-screen bg-gray-50">
//             <div className="flex flex-col lg:flex-row">
//                 <div className="flex-1 p-4 lg:p-8">
//                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
//                         <div>
//                             <h3 className="text-xl font-semibold">{pageTitle}</h3>
//                         </div>
//                         <div className="flex items-center gap-3">
//                             <span className={`text-lg font-semibold ${isActive ? "text-green-600" : "text-red-600"}`}>
//                                 {isActive ? "Active" : "Inactive"}
//                             </span>
//                             <button onClick={toggleActive} disabled={loading || isViewMode} className="relative">
//                                 <div className={"rounded-full p-[3px] " + (isActive ? "border-2 border-blue-500" : "border-2 border-gray-300")}
//                                      style={{ boxShadow: isActive ? "0 0 0 4px rgba(59,130,246,0.12)" : "0 0 0 4px rgba(156,163,175,0.06)" }}>
//                                     <div className={`w-20 h-10 rounded-full transition-colors duration-200 flex items-center relative ${isActive && !isViewMode ? "bg-green-500" : "bg-gray-300"}`}>
//                                         <div className="bg-white w-8 h-8 rounded-full shadow absolute transition-transform duration-200"
//                                              style={{ transform: isActive ? "translateX(44px)" : "translateX(4px)" }} />
//                                     </div>
//                                 </div>
//                             </button>
//                         </div>
//                     </div>

//                     <div className="flex border-b border-gray-200 mb-6 overflow-x-auto whitespace-nowrap">
//                         <TabButton tabName="profile" label="Profile" icon={User} />
//                         <TabButton tabName="attendance" label="Attendance" icon={Calendar} />
//                         <TabButton tabName="subjects" label="Subjects" icon={BookOpen} />
//                         <TabButton tabName="timetable" label="Timetable" icon={Clock} />
//                         <TabButton tabName="leave" label="Leave Request" icon={ChevronRight} />
//                         <TabButton tabName="history" label="History" icon={ChevronRight} />
//                     </div>

//                     <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
//                         {loading ? (
//                             <div className="text-center text-gray-600">Loading staff data...</div>
//                         ) : error ? (
//                             <div className="text-center text-red-600">{error}</div>
//                         ) : !staffData?.staffid ? (
//                             <div className="text-center text-red-600">Error: Staff ID missing or invalid.</div>
//                         ) : (
//                             <>
//                                 {getCurrentComponent()}
//                                 {renderActionButtons()}
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </MainLayout>
//     );
// };

// export default EditStaff;







// import React, { useState, useEffect, useCallback } from "react";
// import { User, BookOpen, Calendar, Clock, ChevronRight } from "lucide-react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import MainLayout from "../layout/MainLayout"; 

// import StaffProfile from './Staff Edit/StaffProfile';
// import StaffAttendance from './Staff Edit/StaffAttendance';
// import StaffSubjects from './Staff Edit/StaffSubjects';
// import StaffTimetable from './Staff Edit/StaffTimetable';
// import StaffLeave from './Staff Edit/StaffLeave';
// import StaffHistory from './Staff Edit/StaffHistory';

// import { API_BASE_URL } from '../config'; 

// const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

// const EditStaff = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const queryParams = new URLSearchParams(location.search);
//     const isViewMode = queryParams.get("mode") === "view";

//     const pageTitle = isViewMode ? "Staff Profile" : "Staff Registration Form";

//     const [activeTab, setActiveTab] = useState("profile");
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const [staffData, setStaffData] = useState({
//         _id: id,
//         staffid: "",
//         firstname: "",
//         middlename: "",
//         lastname: "",
//         dob: "",
//         maritalstatus: "",
//         bloodgroup: "",
//         gender: "",
//         nationality: "",
//         category: "",
//         aadharno: "",
//         phoneno: "",
//         alternatephoneno: "",
//         emailaddress: "",
//         addressline1: "",
//         addressline2: "",
//         city: "",
//         postalcode: "",
//         district: "",
//         state: "",
//         country: "",
//         photo: "",
//         highestqualification: "",
//         yearofpassing: "",
//         specialization: "",
//         certificates: "",
//         universityname: "",
//         totalexperience: "",
//         designation: "",
//         previousemployer: "",
//         subjectstaught: "",
//         reasonforleaving: "",
//         position: "",
//         dept: "",
//         preferredgrades: "",
//         joiningdate: "",
//         bankname: "",
//         branchname: "",
//         accno: "",
//         ifccode: "",
//         panno: "",
//         transportstatus: "",
//         pickuppoint: "",
//         droppoint: "",
//         modetransport: "",
//         status: true,
//     });

//     const [isActive, setIsActive] = useState(true);

//     const fetchStaffData = useCallback(async () => {
//         if (!id) return;
//         try {
//             setLoading(true);
//             setError(null);
//             const response = await fetch(`${API_BASE_URL}api/staff/${id}`, {
//                 headers: { auth: AUTH_HEADER },
//             });
//             if (!response.ok) throw new Error(`Failed to fetch staff data. Status: ${response.status}`);
//             const data = await response.json();

//             // Ensure null values from DB are converted to empty strings for inputs
//             const sanitizedData = {};
//             Object.keys(data).forEach(key => {
//                 sanitizedData[key] = data[key] === null ? "" : data[key];
//             });

//             setStaffData((prev) => ({
//                 ...prev,
//                 ...sanitizedData,
//                 dob: sanitizedData.dob ? sanitizedData.dob.split("T")[0] : "",
//                 joiningdate: sanitizedData.joiningdate ? sanitizedData.joiningdate.split("T")[0] : "",
//                 _id: sanitizedData._id || id,
//                 // Explicitly mapping nested/merged fields to ensure visibility
//                 designation: sanitizedData.designation || "",
//                 dept: sanitizedData.dept || "",
//                 position: sanitizedData.position || "",
//                 transportstatus: sanitizedData.transportstatus || "",
//                 status: sanitizedData.status !== undefined ? Boolean(sanitizedData.status) : true,
//             }));

//             setIsActive(sanitizedData.status !== undefined ? Boolean(sanitizedData.status) : true);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     }, [id]);

//     useEffect(() => {
//         fetchStaffData();
//     }, [fetchStaffData]);

//     const handleInputChange = (e) => {
//         if (isViewMode) return;
//         const { name, value } = e.target;
//         setStaffData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e, photoUrl = null) => {
//         e.preventDefault();
//         if (isViewMode) {
//             alert("Cannot save: You are currently in View Mode.");
//             return;
//         }

//         const dataToSend = {
//             ...staffData,
//             status: isActive,
//             photo: photoUrl || staffData.photo,
//             _id: undefined,
//         };

//         try {
//             setLoading(true);
//             const response = await fetch(`${API_BASE_URL}api/edit-staff/${staffData.staffid}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     auth: AUTH_HEADER,
//                 },
//                 body: JSON.stringify(dataToSend),
//             });
//             if (!response.ok) {
//                 const body = await response.json();
//                 throw new Error(body.message || `Error ${response.status}`);
//             }
//             await fetchStaffData();
//             setError(null);
//             alert("Changes saved successfully!");
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const toggleActive = () => {
//         if (isViewMode) return;
//         const newStatus = !isActive;
//         setIsActive(newStatus);
//         setStaffData((prev) => ({ ...prev, status: newStatus }));
//     };

//     const renderActionButtons = () => {
//         if (isViewMode) {
//             return (
//                 <div className="flex justify-end mt-6">
//                     <button
//                         onClick={() => navigate(-1)}
//                         className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-all duration-200"
//                     >
//                         Back to List
//                     </button>
//                 </div>
//             );
//         }
//         return null;
//     };

//     const getCurrentComponent = () => {
//         const props = {
//             staff: staffData,
//             staffid: id,
//             refreshStaffData: fetchStaffData,
//             isViewMode,
//         };

//         switch (activeTab) {
//             case "profile":
//                 return (
//                     <StaffProfile
//                         staffData={staffData}
//                         setStaffData={setStaffData}
//                         handleSubmit={handleSubmit}
//                         handleInputChange={handleInputChange}
//                         isActive={isActive}
//                         toggleActive={toggleActive}
//                         loading={loading}
//                         error={error}
//                         isViewMode={isViewMode}
//                     />
//                 );
//             case "attendance": return <StaffAttendance {...props} />;
//             case "subjects": return <StaffSubjects {...props} />;
//             case "timetable": return <StaffTimetable {...props} />;
//             case "leave": return <StaffLeave {...props} />;
//             case "history": return <StaffHistory {...props} />;
//             default: return <div>Select a valid tab.</div>;
//         }
//     };

//     const TabButton = ({ tabName, label, icon: Icon }) => (
//         <button
//             onClick={() => setActiveTab(tabName)}
//             className={`flex items-center space-x-2 px-6 py-3 rounded-t-lg font-medium transition-colors duration-200 ${
//                 activeTab === tabName
//                     ? "bg-white text-blue-600 border-b-2 border-blue-600"
//                     : "text-gray-600 hover:text-blue-700 hover:bg-green-100"
//             }`}
//         >
//             {Icon && <Icon className="w-5 h-5" />}
//             <span>{label}</span>
//         </button>
//     );

//     return (
//         <MainLayout className="min-h-screen bg-gray-50">
//             <div className="flex flex-col lg:flex-row">
//                 <div className="flex-1 p-4 lg:p-8">
//                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
//                         <div>
//                             <h3 className="text-xl font-semibold">{pageTitle}</h3>
//                         </div>
//                         <div className="flex items-center gap-3">
//                             <span className={`text-lg font-semibold ${isActive ? "text-green-600" : "text-red-600"}`}>
//                                 {isActive ? "Active" : "Inactive"}
//                             </span>
//                             <button onClick={toggleActive} disabled={loading || isViewMode} className="relative">
//                                 <div className={"rounded-full p-[3px] " + (isActive ? "border-2 border-blue-500" : "border-2 border-gray-300")}
//                                      style={{ boxShadow: isActive ? "0 0 0 4px rgba(59,130,246,0.12)" : "0 0 0 4px rgba(156,163,175,0.06)" }}>
//                                     <div className={`w-20 h-10 rounded-full transition-colors duration-200 flex items-center relative ${isActive && !isViewMode ? "bg-green-500" : "bg-gray-300"}`}>
//                                         <div className="bg-white w-8 h-8 rounded-full shadow absolute transition-transform duration-200"
//                                              style={{ transform: isActive ? "translateX(44px)" : "translateX(4px)" }} />
//                                     </div>
//                                 </div>
//                             </button>
//                         </div>
//                     </div>

//                     <div className="flex border-b border-gray-200 mb-6 overflow-x-auto whitespace-nowrap">
//                         <TabButton tabName="profile" label="Profile" icon={User} />
//                         <TabButton tabName="attendance" label="Attendance" icon={Calendar} />
//                         <TabButton tabName="subjects" label="Subjects" icon={BookOpen} />
//                         <TabButton tabName="timetable" label="Timetable" icon={Clock} />
//                         <TabButton tabName="leave" label="Leave Request" icon={ChevronRight} />
//                         <TabButton tabName="history" label="History" icon={ChevronRight} />
//                     </div>

//                     <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
//                         {loading ? (
//                             <div className="text-center text-gray-600">Loading staff data...</div>
//                         ) : error ? (
//                             <div className="text-center text-red-600">{error}</div>
//                         ) : !staffData?.staffid ? (
//                             <div className="text-center text-red-600">Error: Staff ID missing or invalid.</div>
//                         ) : (
//                             <>
//                                 {getCurrentComponent()}
//                                 {renderActionButtons()}
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </MainLayout>
//     );
// };

// export default EditStaff;

import React, { useState, useEffect, useCallback } from "react";
import { User, BookOpen, Calendar, Clock, ChevronRight } from "lucide-react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import MainLayout from "../layout/MainLayout"; 

import StaffProfile from './Staff Edit/StaffProfile';
import StaffAttendance from './Staff Edit/StaffAttendance';
import StaffSubjects from './Staff Edit/StaffSubjects';
import StaffTimetable from './Staff Edit/StaffTimetable';
import StaffLeave from './Staff Edit/StaffLeave';
import StaffHistory from './Staff Edit/StaffHistory';

import { API_BASE_URL } from '../config'; 

const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

const EditStaff = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const isViewMode = queryParams.get("mode") === "view";

    const pageTitle = isViewMode ? "Staff Profile" : "Edit Staff Profile";

    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [staffData, setStaffData] = useState({
        _id: id,
        staffid: "",
        firstname: "",
        middlename: "",
        lastname: "",
        dob: "",
        maritalstatus: "",
        bloodgroup: "",
        gender: "",
        nationality: "",
        category: "",
        aadharno: "",
        phoneno: "",
        alternatephoneno: "",
        emailaddress: "",
        addressline1: "",
        addressline2: "",
        city: "",
        postalcode: "",
        district: "",
        state: "",
        country: "",
        photo: "",
        highestqualification: "",
        yearofpassing: "",
        specialization: "",
        certificates: "",
        universityname: "",
        totalexperience: "",
        designation: "",
        previousemployer: "",
        subjectstaught: "",
        reasonforleaving: "",
        position: "",
        dept: "",
        preferredgrades: "",
        joiningdate: "",
        bankname: "",
        branchname: "",
        accno: "",
        ifccode: "",
        panno: "",
        transportstatus: "",
        pickuppoint: "",
        droppoint: "",
        modetransport: "",
        status: true,
    });

    const [isActive, setIsActive] = useState(true);

    const fetchStaffData = useCallback(async () => {
        if (!id) return;
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_BASE_URL}api/staff/${id}`, {
                headers: { auth: AUTH_HEADER },
            });
            if (!response.ok) throw new Error(`Failed to fetch staff data. Status: ${response.status}`);
            const data = await response.json();

            const sanitizedData = {};
            Object.keys(data).forEach(key => {
                sanitizedData[key] = data[key] === null ? "" : data[key];
            });

            setStaffData((prev) => ({
                ...prev,
                ...sanitizedData,
                dob: sanitizedData.dob ? sanitizedData.dob.split("T")[0] : "",
                joiningdate: sanitizedData.joiningdate ? sanitizedData.joiningdate.split("T")[0] : "",
                _id: sanitizedData._id || id,
                designation: sanitizedData.designation || "",
                dept: sanitizedData.dept || "",
                position: sanitizedData.position || "",
                transportstatus: sanitizedData.transportstatus || "",
                status: sanitizedData.status !== undefined ? Boolean(sanitizedData.status) : true,
            }));

            setIsActive(sanitizedData.status !== undefined ? Boolean(sanitizedData.status) : true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchStaffData();
    }, [fetchStaffData]);

    const handleInputChange = (e) => {
        if (isViewMode) return;
        const { name, value } = e.target;
        setStaffData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e, photoUrl = null) => {
        e.preventDefault();
        if (isViewMode) {
            alert("Cannot save: You are currently in View Mode.");
            return;
        }

        const dataToSend = {
            ...staffData,
            status: isActive,
            photo: photoUrl || staffData.photo,
            _id: undefined,
        };

        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}api/edit-staff/${staffData.staffid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    auth: AUTH_HEADER,
                },
                body: JSON.stringify(dataToSend),
            });
            if (!response.ok) {
                const body = await response.json();
                throw new Error(body.message || `Error ${response.status}`);
            }
            await fetchStaffData();
            setError(null);
            alert("Changes saved successfully!");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleActive = () => {
        if (isViewMode) return;
        const newStatus = !isActive;
        setIsActive(newStatus);
        setStaffData((prev) => ({ ...prev, status: newStatus }));
    };

    const renderActionButtons = () => {
        if (isViewMode) {
            return (
                <div className="flex justify-end mt-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-all duration-200"
                    >
                        Back to List
                    </button>
                </div>
            );
        }
        return null;
    };

    const getCurrentComponent = () => {
        const props = {
            staff: staffData,
            staffid: id,
            refreshStaffData: fetchStaffData,
            isViewMode,
        };

        switch (activeTab) {
            case "profile":
                return (
                    <StaffProfile
                        staffData={staffData}
                        setStaffData={setStaffData}
                        handleSubmit={handleSubmit}
                        handleInputChange={handleInputChange}
                        isActive={isActive}
                        toggleActive={toggleActive}
                        loading={loading}
                        error={error}
                        isViewMode={isViewMode}
                    />
                );
            case "attendance": return <StaffAttendance {...props} />;
            case "subjects": return <StaffSubjects {...props} />;
            case "timetable": return <StaffTimetable {...props} />;
            case "leave": return <StaffLeave {...props} />;
            case "history": return <StaffHistory {...props} />;
            default: return <div>Select a valid tab.</div>;
        }
    };

    return (
        <MainLayout 
            activeSection={activeTab} 
            onSectionChange={(id) => setActiveTab(id)} 
            className="min-h-screen bg-gray-50"
        >
            <div className="flex flex-col lg:flex-row">
                <div className="flex-1 p-4 lg:p-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                        <div>
                            <h3 className="text-2xl font-semibold">{pageTitle}</h3>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className={`text-lg font-semibold ${isActive ? "text-green-600" : "text-red-600"}`}>
                                {isActive ? "Active" : "Inactive"}
                            </span>
                            <button onClick={toggleActive} disabled={loading || isViewMode} className="relative">
                                <div className={"rounded-full p-[3px] " + (isActive ? "border-2 border-blue-500" : "border-2 border-gray-300")}
                                     style={{ boxShadow: isActive ? "0 0 0 4px rgba(59,130,246,0.12)" : "0 0 0 4px rgba(156,163,175,0.06)" }}>
                                    <div className={`w-20 h-10 rounded-full transition-colors duration-200 flex items-center relative ${isActive ? "bg-green-500" : "bg-red-500"}`}>
    <div className="bg-white w-8 h-8 rounded-full shadow absolute transition-transform duration-200"
         style={{ transform: isActive ? "translateX(44px)" : "translateX(4px)" }} />
</div>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
                        {loading ? (
                            <div className="text-center text-gray-600">Loading staff data...</div>
                        ) : error ? (
                            <div className="text-center text-red-600">{error}</div>
                        ) : !staffData?.staffid ? (
                            <div className="text-center text-red-600">Error: Staff ID missing or invalid.</div>
                        ) : (
                            <>
                                {getCurrentComponent()}
                                {renderActionButtons()}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default EditStaff;