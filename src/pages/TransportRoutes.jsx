// import React, { useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";
// import { useEffect } from "react";

// // Modal Component
// const Modal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">{title}</h3>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 text-xl"
//           >
//             ×
//           </button>
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// };

// // Step 1: Class Selection
// const ClassSelectionStep = ({ onNext, onClose }) => {
//   const [classData, setClassData] = useState({
//     standard: "",
//     division: "",
//   });

//   const handleNext = () => {
//     if (classData.standard && classData.division) {
//       onNext(classData);
//     } else {
//       alert("Please select both standard and division");
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <div className="text-center mb-6">
//         <h4 className="text-lg font-medium text-gray-800">
//           Step 1: Select Class
//         </h4>
//         <p className="text-gray-600">
//           Choose the standard and division to view students
//         </p>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Standard
//         </label>
//         <select
//           value={classData.standard}
//           onChange={(e) =>
//             setClassData({ ...classData, standard: e.target.value })
//           }
//           className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         >
//           <option value="">Select Standard</option>
//           <option value="1">1st</option>
//           <option value="2">2nd</option>
//           <option value="3">3rd</option>
//           <option value="4">4th</option>
//           <option value="5">5th</option>
//           <option value="6">6th</option>
//           <option value="7">7th</option>
//           <option value="8">8th</option>
//           <option value="9">9th</option>
//           <option value="10">10th</option>
//         </select>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Division
//         </label>
//         <select
//           value={classData.division}
//           onChange={(e) =>
//             setClassData({ ...classData, division: e.target.value })
//           }
//           className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         >
//           <option value="">Select Division</option>
//           <option value="A">A</option>
//           <option value="B">B</option>
//           <option value="C">C</option>
//         </select>
//       </div>

//       <div className="flex justify-end space-x-3 pt-4">
//         <button
//           onClick={onClose}
//           className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleNext}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// // Step 2: Student Assignment
// const StudentAssignmentStep = ({
//   classInfo,
//   onBack,
//   onClose,
//   onSubmit,
//   routes,
// }) => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedStudents, setSelectedStudents] = useState([]);
//   const [assignmentData, setAssignmentData] = useState({
//     standard: classInfo.standard,
//     division: classInfo.division,
//     routeName: "",
//     pickupPoint: "",
//   });

//   const fetchStudents = async () => {
//     try {
//       if (classInfo.standard && classInfo.division) {
//         const res = await axios.post(
//           "https://sspd-school-portal.vercel.app/api/student",
//           { standard: classInfo.standard, division: classInfo.division },
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );

//         const transportStudents = res.data.filter(
//           (student) =>
//             student.transport &&
//             student.transport.transportstatus &&
//             student.transport.transportstatus.toLowerCase() === "yes"
//         );

//         setStudents(transportStudents);
//         setLoading(false);
//       }
//     } catch (err) {
//       console.error("Error fetching students:", err);
//       setStudents([]);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, [classInfo]);

//   useEffect(() => {
//     setAssignmentData((prev) => ({
//       ...prev,
//       standard: classInfo.standard,
//       division: classInfo.division,
//     }));
//   }, [classInfo]);

//   const handleStudentSelection = (studentId) => {
//     setSelectedStudents((prev) => {
//       if (prev.includes(studentId)) {
//         return prev.filter((id) => id !== studentId);
//       } else {
//         return [...prev, studentId];
//       }
//     });
//   };

//   const handleAssignRoute = () => {
//     if (selectedStudents.length === 0) {
//       alert("Please select at least one student");
//       return;
//     }
//     if (!assignmentData.routeName) {
//       alert("Please select a route");
//       return;
//     }
//     if (!assignmentData.pickupPoint) {
//       alert("Please enter pickup point");
//       return;
//     }

//     const assignmentInfo = {
//       standard: classInfo.standard,
//       division: classInfo.division,
//       routeName: assignmentData.routeName,
//       pickupPoint: assignmentData.pickupPoint,
//       students: selectedStudents,
//     };

//     onSubmit(assignmentInfo);
//     onClose();
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-8">
//         <div className="text-gray-600">Loading students...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <div className="text-center mb-4">
//         <h4 className="text-lg font-medium text-gray-800">
//           Step 2: Assign Route
//         </h4>
//         <p className="text-gray-600">
//           Students from {classInfo.standard} - {classInfo.division} (Transport
//           Required)
//         </p>
//       </div>

//       <div className="bg-gray-50 p-4 rounded-lg space-y-3">
//         <h5 className="font-medium text-gray-800">Route Assignment Details</h5>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Select Route
//             </label>
//             <select
//               value={assignmentData.routeName}
//               onChange={(e) => {
//                 setAssignmentData({
//                   ...assignmentData,
//                   routeName: e.target.value,
//                 });
//               }}
//               className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select Route</option>
//               {routes.map((route, index) => (
//                 <option key={index} value={route.routeName}>
//                   {route.routeName} ({route.from} to {route.to})
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Pickup Point
//             </label>
//             <input
//               type="text"
//               value={assignmentData.pickupPoint}
//               onChange={(e) =>
//                 setAssignmentData({
//                   ...assignmentData,
//                   pickupPoint: e.target.value,
//                 })
//               }
//               className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter pickup point"
//               required
//             />
//           </div>
//         </div>
//       </div>

//       <div>
//         <h5 className="font-medium text-gray-800 mb-3">
//           Select Students ({selectedStudents.length} selected)
//         </h5>

//         <div className="max-h-64 overflow-y-auto border border-gray-200 rounded">
//           {students.map((student) => (
//             <div
//               key={student._id}
//               className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50"
//             >
//               <input
//                 type="checkbox"
//                 id={`student-${student._id}`}
//                 checked={selectedStudents.includes(student._id)}
//                 onChange={() => handleStudentSelection(student._id)}
//                 className="mr-3"
//               />
//               <label
//                 htmlFor={`student-${student._id}`}
//                 className="flex-1 cursor-pointer"
//               >
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <div className="font-medium">{student.firstname}</div>
//                     <div className="text-sm text-gray-600">
//                       Contact: {student.parent?.primarycontact || "N/A"}
//                     </div>
//                   </div>
//                 </div>
//               </label>
//             </div>
//           ))}
//         </div>

//         {students.length === 0 && (
//           <div className="text-center py-8 text-gray-600">
//             No students with transport requirement found in {classInfo.standard}{" "}
//             - {classInfo.division}
//           </div>
//         )}
//       </div>

//       <div className="flex justify-between pt-4">
//         <button
//           onClick={onBack}
//           className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
//         >
//           Back
//         </button>
//         <button
//           onClick={onClose}
//           className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
//         >
//           Cancel
//         </button>
//         <div className="space-x-3">
//           <button
//             onClick={handleAssignRoute}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             disabled={selectedStudents.length === 0}
//           >
//             Assign Route ({selectedStudents.length})
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AddStudentModal = ({ onClose, onSubmit, routes }) => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [classInfo, setClassInfo] = useState(null);

//   const handleClassSelection = (classData) => {
//     setClassInfo(classData);
//     setCurrentStep(2);
//   };

//   const handleBack = () => {
//     setCurrentStep(1);
//     setClassInfo(null);
//   };

//   return (
//     <>
//       {currentStep === 1 && (
//         <ClassSelectionStep onNext={handleClassSelection} onClose={onClose} />
//       )}
//       {currentStep === 2 && (
//         <StudentAssignmentStep
//           classInfo={classInfo}
//           onBack={handleBack}
//           onClose={onClose}
//           onSubmit={onSubmit}
//           routes={routes}
//         />
//       )}
//     </>
//   );
// };

// const AddRouteModal = ({ onClose, onSubmit }) => {
//   const [routeData, setRouteData] = useState({
//     routeName: "",
//     from: "",
//     to: "",
//     vehicleNumber: "",
//   });

//   const [vehicles, setVehicles] = useState([]);

//   useEffect(() => {
//     const fetchVehicles = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/vehicles",
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//        console.log('vehicle response',response.data); 
//         setVehicles(response.data); // assuming response is an array of vehicles
//       } catch (error) {
//         console.error("Error fetching vehicles:", error);
//       }
//     };

//     fetchVehicles();
//   }, []);

//   const handleRoute = async () => {
//     try {
//       const response = await axios.post(
//         "https://sspd-school-portal.vercel.app/api/add-route",
//         routeData,
//         {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         }
//       );

//       if (response.status === 500) throw new Error("Failed to add route");

//       const newRoute = await response.data;
//       console.log("Route added:", newRoute);
//       alert("Route added successfully!");
//       onClose();
//       window.location.reload();
//     } catch (error) {
//       console.error(error);
//       alert("Error adding route. Please try again.");
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {/* Route Name */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Route Name
//         </label>
//         <input
//           type="text"
//           value={routeData.routeName}
//           onChange={(e) =>
//             setRouteData({ ...routeData, routeName: e.target.value })
//           }
//           className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />
//       </div>

//       {/* From */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           From
//         </label>
//         <input
//           type="text"
//           value={routeData.from}
//           onChange={(e) => setRouteData({ ...routeData, from: e.target.value })}
//           className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />
//       </div>

//       {/* To */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           To
//         </label>
//         <input
//           type="text"
//           value={routeData.to}
//           onChange={(e) => setRouteData({ ...routeData, to: e.target.value })}
//           className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />
//       </div>

//       {/* Vehicle Number Dropdown */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Vehicle Number
//         </label>
//         <select
//           value={routeData.vehicleNumber}
//           onChange={(e) =>
//             setRouteData({ ...routeData, vehicleNumber: e.target.value })
//           }
//           className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         >
//           <option value="">-- Select Vehicle --</option>
//           {vehicles.map((vehicle) => (
//             <option key={vehicle._id} value={vehicle.vehicleno}>
//               {vehicle.vehicleno}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-end space-x-3 pt-4">
//         <button
//           onClick={onClose}
//           className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleRoute}
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           Add Route
//         </button>
//       </div>
//     </div>
//   );
// };

// const TransportRoutes = () => {
//   const [routes, setRoutes] = useState([]);
//   const [search, setSearch] = useState("");
//   const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
//   const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchRoutes = async () => {
//       try {
//         const response = await axios.get(
//           "https://sspd-school-portal.vercel.app/api/routes",
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         if (response.status === 200) setRoutes(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchRoutes();
//   }, []);

//   const [studentRoute, setStudentRoute] = useState([]);
//   useEffect(() => {
//     const fetchStudentRoutes = async () => {
//       try {
//         const response = await axios.get(
//           "https://sspd-school-portal.vercel.app/api/students-route",
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         if (response.status === 200) setStudentRoute(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchStudentRoutes();
//   }, []);

//   const filteredData = routes.filter((item) =>
//     `${item.routeName} ${item.from} ${item.to} ${item.vehicleNumber}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   const filteredStudentsData = studentRoute.filter((item) =>
//     `${item.routeName} ${item.pickupPoint} ${item.standard} ${item.division}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   const handleAddStudent = async (assignmentData) => {
//     try {
//       const response = await axios.post(
//         "https://sspd-school-portal.vercel.app/api/add-student-route",
//         assignmentData,
//         {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200 || response.status === 201) {
//         alert("Students assigned successfully!");
//         setTimeout(()=>{
//           window.location.reload();
//         }, 3000)
//       }
//     } catch (error) {
//       console.error("Error assigning students:", error);
//       alert("Error assigning students. Please try again.");
//     }
//   };

//   const handleAddRoute = (routeData) => {
//     console.log("Adding route:", routeData);
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-4 space-y-6">
//           <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
//             <div className="flex w-full lg:w-auto justify-start">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="border px-4 py-2 rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto justify-end">
//               <button
//                 onClick={() => setIsStudentModalOpen(true)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
//               >
//                 Assign Student
//               </button>
//               <button
//                 onClick={() => setIsRouteModalOpen(true)}
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
//               >
//                 Add Route
//               </button>
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <h2 className="text-2xl font-semibold">Route Schedule</h2>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-300 text-center rounded text-sm sm:text-base">
//               <thead className="bg-blue-100 text-black">
//                 <tr>
//                   <th className="px-4 py-2 border">Vehicle Number</th>
//                   <th className="px-4 py-2 border">Vehicle Type</th>
//                   <th className="px-4 py-2 border">Status</th>
//                   {/* <th className="px-4 py-2 border">Driver</th>
//                   <th className="px-4 py-2 border">Supervisor</th> */}
//                   <th className="px-4 py-2 border">Route Name</th>
//                   <th className="px-4 py-2 border">Capacity</th>
//                   <th className="px-4 py-2 border">Edit</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white">
//                 {filteredData.map((row, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="px-4 py-2 border">{row.vehicleNumber}</td>
//                     <td className="px-4 py-2 border">
//                       {row.vehicle?.vehiclename || "N/A"}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       <span
//                         className={`px-2 py-1 rounded text-xs ${
//                           row.vehicle?.status === "Active"
//                             ? "bg-green-100 text-green-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {row.vehicle?.status || "Unknown"}
//                       </span>
//                     </td>
//                     {/* <td className="px-4 py-2 border">
//                       {row.driverr?.driverName || "None"}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       {row.driverr?.supervisorName || "None"}
//                     </td> */}
//                     <td className="px-4 py-2 border">{row.routeName}</td>
//                     <td className="px-4 py-2 border">
//                       {row.vehicle?.capacity || "N/A"}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       <button className="text-blue-600 hover:underline">
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <div className="flex justify-center">
//           <h2 className="text-2xl font-semibold mb-3">Student Assigned</h2>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300 text-center rounded text-sm sm:text-base">
//             <thead className="bg-blue-100 text-black">
//               <tr>
//                 <th className="px-4 py-2 border">Standard</th>
//                 <th className="px-4 py-2 border">Division</th>
//                 <th className="px-4 py-2 border">Route Name</th>
//                 <th className="px-4 py-2 border">Pick up Point</th>
//                 <th className="px-4 py-2 border">Edit</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white">
//               {filteredStudentsData.map((row, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="px-4 py-2 border">{row.standard}</td>
//                   <td className="px-4 py-2 border">{row.division || "N/A"}</td>
//                   <td className="px-4 py-2 border">
//                     <span className={`px-2 py-1 rounded text-xs`}>
//                       {row.routeName || "Unknown"}
//                     </span>
//                   </td>
//                   <td className="px-4 py-2 border">{row.pickupPoint}</td>
//                   <td className="px-4 py-2 border">
//                     <button className="text-blue-600 hover:underline">
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <Modal
//         isOpen={isStudentModalOpen}
//         onClose={() => setIsStudentModalOpen(false)}
//         title="Assign Students to Route"
//       >
//         <AddStudentModal
//           onClose={() => setIsStudentModalOpen(false)}
//           onSubmit={handleAddStudent}
//           routes={routes}
//         />
//       </Modal>

//       <Modal
//         isOpen={isRouteModalOpen}
//         onClose={() => setIsRouteModalOpen(false)}
//         title="Add New Route"
//       >
//         <AddRouteModal
//           onClose={() => setIsRouteModalOpen(false)}
//           onSubmit={handleAddRoute}
//         />
//       </Modal>
//     </MainLayout>
//   );
// };

// export default TransportRoutes;

// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import axios from "axios";

// // Define the base URL for your local backend API
// const LOCAL_API_BASE_URL = "http://localhost:5000/api";

// // Modal Component (Re-defined for clarity, assuming it exists elsewhere)
// const Modal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">{title}</h3>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 text-xl"
//           >
//             ×
//           </button>
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// };

// // Step 1: Class Selection
// const ClassSelectionStep = ({ onNext, onClose }) => {
//   const [classData, setClassData] = useState({
//     standard: "",
//     division: "",
//   });

//   const handleNext = () => {
//     if (classData.standard && classData.division) {
//       onNext(classData);
//     } else {
//       alert("Please select both standard and division");
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <div className="text-center mb-6">
//         <h4 className="text-lg font-medium text-gray-800">
//           Step 1: Select Class
//         </h4>
//         <p className="text-gray-600">
//           Choose the standard and division to view students
//         </p>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Standard
//         </label>
//         <select
//           value={classData.standard}
//           onChange={(e) =>
//             setClassData({ ...classData, standard: e.target.value })
//           }
//           className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         >
//           <option value="">Select Standard</option>
//           <option value="1">1st</option>
//           <option value="2">2nd</option>
//           <option value="3">3rd</option>
//           <option value="4">4th</option>
//           <option value="5">5th</option>
//           <option value="6">6th</option>
//           <option value="7">7th</option>
//           <option value="8">8th</option>
//           <option value="9">9th</option>
//           <option value="10">10th</option>
//         </select>
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Division
//         </label>
//         <select
//           value={classData.division}
//           onChange={(e) =>
//             setClassData({ ...classData, division: e.target.value })
//           }
//           className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         >
//           <option value="">Select Division</option>
//           <option value="A">A</option>
//           <option value="B">B</option>
//           <option value="C">C</option>
//         </select>
//       </div>

//       <div className="flex justify-end space-x-3 pt-4">
//         <button
//           onClick={onClose}
//           className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleNext}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// // Step 2: Student Assignment
// const StudentAssignmentStep = ({
//   classInfo,
//   onBack,
//   onClose,
//   onSubmit,
//   routes,
// }) => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedStudents, setSelectedStudents] = useState([]);
//   const [assignmentData, setAssignmentData] = useState({
//     standard: classInfo.standard,
//     division: classInfo.division,
//     routeName: "",
//     pickupPoint: "",
//   });

//   const fetchStudents = async () => {
//     try {
//       if (classInfo.standard && classInfo.division) {
//         const res = await axios.post(
//           // CRITICAL FIX 1: Use local API URL
//           `${LOCAL_API_BASE_URL}/student`,
//           { standard: classInfo.standard, division: classInfo.division },
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );

//         const transportStudents = res.data.filter(
//           (student) =>
//             student.transport &&
//             student.transport.transportstatus &&
//             student.transport.transportstatus.toLowerCase() === "yes"
//         );

//         setStudents(transportStudents);
//         setLoading(false);
//       }
//     } catch (err) {
//       console.error("Error fetching students:", err);
//       setStudents([]);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, [classInfo]);

//   useEffect(() => {
//     setAssignmentData((prev) => ({
//       ...prev,
//       standard: classInfo.standard,
//       division: classInfo.division,
//     }));
//   }, [classInfo]);

//   const handleStudentSelection = (studentId) => {
//     setSelectedStudents((prev) => {
//       if (prev.includes(studentId)) {
//         return prev.filter((id) => id !== studentId);
//       } else {
//         return [...prev, studentId];
//       }
//     });
//   };

//   const handleAssignRoute = () => {
//     if (selectedStudents.length === 0) {
//       alert("Please select at least one student");
//       return;
//     }
//     if (!assignmentData.routeName) {
//       alert("Please select a route");
//       return;
//     }
//     if (!assignmentData.pickupPoint) {
//       alert("Please enter pickup point");
//       return;
//     }

//     const assignmentInfo = {
//       standard: classInfo.standard,
//       division: classInfo.division,
//       routeName: assignmentData.routeName,
//       pickupPoint: assignmentData.pickupPoint,
//       students: selectedStudents,
//     };

//     onSubmit(assignmentInfo);
//     onClose();
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-8">
//         <div className="text-gray-600">Loading students...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       <div className="text-center mb-4">
//         <h4 className="text-lg font-medium text-gray-800">
//           Step 2: Assign Route
//         </h4>
//         <p className="text-gray-600">
//           Students from {classInfo.standard} - {classInfo.division} (Transport
//           Required)
//         </p>
//       </div>

//       <div className="bg-gray-50 p-4 rounded-lg space-y-3">
//         <h5 className="font-medium text-gray-800">Route Assignment Details</h5>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Select Route
//             </label>
//             <select
//               value={assignmentData.routeName}
//               onChange={(e) => {
//                 setAssignmentData({
//                   ...assignmentData,
//                   routeName: e.target.value,
//                 });
//               }}
//               className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             >
//               <option value="">Select Route</option>
//               {routes.map((route, index) => (
//                 <option key={index} value={route.routeName}>
//                   {route.routeName} ({route.from} to {route.to})
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Pickup Point
//             </label>
//             <input
//               type="text"
//               value={assignmentData.pickupPoint}
//               onChange={(e) =>
//                 setAssignmentData({
//                   ...assignmentData,
//                   pickupPoint: e.target.value,
//                 })
//               }
//               className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter pickup point"
//               required
//             />
//           </div>
//         </div>
//       </div>

//       <div>
//         <h5 className="font-medium text-gray-800 mb-3">
//           Select Students ({selectedStudents.length} selected)
//         </h5>

//         <div className="max-h-64 overflow-y-auto border border-gray-200 rounded">
//           {students.map((student) => (
//             <div
//               key={student._id}
//               className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50"
//             >
//               <input
//                 type="checkbox"
//                 id={`student-${student._id}`}
//                 checked={selectedStudents.includes(student._id)}
//                 onChange={() => handleStudentSelection(student._id)}
//                 className="mr-3"
//               />
//               <label
//                 htmlFor={`student-${student._id}`}
//                 className="flex-1 cursor-pointer"
//               >
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <div className="font-medium">{student.firstname}</div>
//                     <div className="text-sm text-gray-600">
//                       Contact: {student.parent?.primarycontact || "N/A"}
//                     </div>
//                   </div>
//                 </div>
//               </label>
//             </div>
//           ))}
//         </div>

//         {students.length === 0 && (
//           <div className="text-center py-8 text-gray-600">
//             No students with transport requirement found in {classInfo.standard}{" "}
//             - {classInfo.division}
//           </div>
//         )}
//       </div>

//       <div className="flex justify-between pt-4">
//         <button
//           onClick={onBack}
//           className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
//         >
//           Back
//         </button>
//         <button
//           onClick={onClose}
//           className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
//         >
//           Cancel
//         </button>
//         <div className="space-x-3">
//           <button
//             onClick={handleAssignRoute}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             disabled={selectedStudents.length === 0}
//           >
//             Assign Route ({selectedStudents.length})
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AddStudentModal = ({ onClose, onSubmit, routes }) => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [classInfo, setClassInfo] = useState(null);

//   const handleClassSelection = (classData) => {
//     setClassInfo(classData);
//     setCurrentStep(2);
//   };

//   const handleBack = () => {
//     setCurrentStep(1);
//     setClassInfo(null);
//   };

//   return (
//     <>
//       {currentStep === 1 && (
//         <ClassSelectionStep onNext={handleClassSelection} onClose={onClose} />
//       )}
//       {currentStep === 2 && (
//         <StudentAssignmentStep
//           classInfo={classInfo}
//           onBack={handleBack}
//           onClose={onClose}
//           onSubmit={onSubmit}
//           routes={routes}
//         />
//       )}
//     </>
//   );
// };

// const AddRouteModal = ({ onClose, onSubmit }) => {
//   const [routeData, setRouteData] = useState({
//     routeName: "",
//     from: "",
//     to: "",
//     vehicleNumber: "",
//   });

//   const [vehicles, setVehicles] = useState([]);

//   useEffect(() => {
//     const fetchVehicles = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/vehicles",
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//        console.log('vehicle response',response.data); 
//         setVehicles(response.data); // assuming response is an array of vehicles
//       } catch (error) {
//         console.error("Error fetching vehicles:", error);
//       }
//     };

//     fetchVehicles();
//   }, []);

//   const handleRoute = async () => {
//     try {
//       const response = await axios.post(
//         // CRITICAL FIX 2: Use local API URL
//         `${LOCAL_API_BASE_URL}/add-route`,
//         routeData,
//         {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         }
//       );

//       if (response.status === 500) throw new Error("Failed to add route");

//       const newRoute = await response.data;
//       console.log("Route added:", newRoute);
//       alert("Route added successfully!");
//       onClose();
//       window.location.reload();
//     } catch (error) {
//       console.error("Error adding route:", error);
//       alert("Error adding route. Please try again.");
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {/* Route Name */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Route Name
//         </label>
//         <input
//           type="text"
//           value={routeData.routeName}
//           onChange={(e) =>
//             setRouteData({ ...routeData, routeName: e.target.value })
//           }
//           className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />
//       </div>

//       {/* From */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           From
//         </label>
//         <input
//           type="text"
//           value={routeData.from}
//           onChange={(e) => setRouteData({ ...routeData, from: e.target.value })}
//           className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />
//       </div>

//       {/* To */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           To
//         </label>
//         <input
//           type="text"
//           value={routeData.to}
//           onChange={(e) => setRouteData({ ...routeData, to: e.target.value })}
//           className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />
//       </div>

//       {/* Vehicle Number Dropdown */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Vehicle Number
//         </label>
//         <select
//           value={routeData.vehicleNumber}
//           onChange={(e) =>
//             setRouteData({ ...routeData, vehicleNumber: e.target.value })
//           }
//           className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         >
//           <option value="">-- Select Vehicle --</option>
//           {vehicles.map((vehicle) => (
//             <option key={vehicle._id} value={vehicle.vehicleno}>
//               {vehicle.vehicleno}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-end space-x-3 pt-4">
//         <button
//           onClick={onClose}
//           className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleRoute}
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           Add Route
//         </button>
//       </div>
//     </div>
//   );
// };

// const TransportRoutes = () => {
//   const [routes, setRoutes] = useState([]);
//   const [search, setSearch] = useState("");
//   const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
//   const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchRoutes = async () => {
//       try {
//         const response = await axios.get(
//           // CRITICAL FIX 3: Use local API URL
//           `${LOCAL_API_BASE_URL}/routes`,
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         if (response.status === 200) setRoutes(response.data);
//       } catch (error) {
//         console.error("Error fetching routes:", error);
//       }
//     };
//     fetchRoutes();
//   }, []);

//   const [studentRoute, setStudentRoute] = useState([]);
//   useEffect(() => {
//     const fetchStudentRoutes = async () => {
//       try {
//         const response = await axios.get(
//           // CRITICAL FIX 4: Use local API URL
//           `${LOCAL_API_BASE_URL}/students-route`,
//           {
//             headers: {
//               auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             },
//           }
//         );
//         if (response.status === 200) setStudentRoute(response.data);
//       } catch (error) {
//         console.error("Error fetching student routes:", error);
//       }
//     };
//     fetchStudentRoutes();
//   }, []);

//   const filteredData = routes.filter((item) =>
//     `${item.routeName} ${item.from} ${item.to} ${item.vehicleNumber}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   const filteredStudentsData = studentRoute.filter((item) =>
//     `${item.routeName} ${item.pickupPoint} ${item.standard} ${item.division}`
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   const handleAddStudent = async (assignmentData) => {
//     try {
//       const response = await axios.post(
//         // CRITICAL FIX 5: Use local API URL
//         `${LOCAL_API_BASE_URL}/add-student-route`,
//         assignmentData,
//         {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200 || response.status === 201) {
//         alert("Students assigned successfully!");
//         setTimeout(()=>{
//           window.location.reload();
//         }, 3000)
//       }
//     } catch (error) {
//       console.error("Error assigning students:", error);
//       alert("Error assigning students. Please try again.");
//     }
//   };

//   const handleAddRoute = (routeData) => {
//     console.log("Adding route:", routeData);
//   };

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-4 space-y-6">
//           <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
//             <div className="flex w-full lg:w-auto justify-start">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="border px-4 py-2 rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto justify-end">
//               <button
//                 onClick={() => setIsStudentModalOpen(true)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
//               >
//                 Assign Student
//               </button>
//               <button
//                 onClick={() => setIsRouteModalOpen(true)}
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
//               >
//                 Add Route
//               </button>
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <h2 className="text-2xl font-semibold">Route Schedule</h2>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-300 text-center rounded text-sm sm:text-base">
//               <thead className="bg-blue-100 text-black">
//                 <tr>
//                   <th className="px-4 py-2 border">Vehicle Number</th>
//                   <th className="px-4 py-2 border">Vehicle Type</th>
//                   <th className="px-4 py-2 border">Status</th>
//                   {/* <th className="px-4 py-2 border">Driver</th>
//                   <th className="px-4 py-2 border">Supervisor</th> */}
//                   <th className="px-4 py-2 border">Route Name</th>
//                   <th className="px-4 py-2 border">Capacity</th>
//                   <th className="px-4 py-2 border">Edit</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white">
//                 {filteredData.map((row, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="px-4 py-2 border">{row.vehicleNumber}</td>
//                     <td className="px-4 py-2 border">
//                       {row.vehicle?.vehiclename || "N/A"}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       <span
//                         className={`px-2 py-1 rounded text-xs ${
//                           row.vehicle?.status === "Active"
//                             ? "bg-green-100 text-green-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {row.vehicle?.status || "Unknown"}
//                       </span>
//                     </td>
//                     {/* <td className="px-4 py-2 border">
//                       {row.driverr?.driverName || "None"}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       {row.driverr?.supervisorName || "None"}
//                     </td> */}
//                     <td className="px-4 py-2 border">{row.routeName}</td>
//                     <td className="px-4 py-2 border">
//                       {row.vehicle?.capacity || "N/A"}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       <button className="text-blue-600 hover:underline">
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <div className="flex justify-center">
//           <h2 className="text-2xl font-semibold mb-3">Student Assigned</h2>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300 text-center rounded text-sm sm:text-base">
//             <thead className="bg-blue-100 text-black">
//               <tr>
//                 <th className="px-4 py-2 border">Standard</th>
//                 <th className="px-4 py-2 border">Division</th>
//                 <th className="px-4 py-2 border">Route Name</th>
//                 <th className="px-4 py-2 border">Pick up Point</th>
//                 <th className="px-4 py-2 border">Edit</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white">
//               {filteredStudentsData.map((row, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="px-4 py-2 border">{row.standard}</td>
//                   <td className="px-4 py-2 border">{row.division || "N/A"}</td>
//                   <td className="px-4 py-2 border">
//                     <span className={`px-2 py-1 rounded text-xs`}>
//                       {row.routeName || "Unknown"}
//                     </span>
//                   </td>
//                   <td className="px-4 py-2 border">{row.pickupPoint}</td>
//                   <td className="px-4 py-2 border">
//                     <button className="text-blue-600 hover:underline">
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <Modal
//         isOpen={isStudentModalOpen}
//         onClose={() => setIsStudentModalOpen(false)}
//         title="Assign Students to Route"
//       >
//         <AddStudentModal
//           onClose={() => setIsStudentModalOpen(false)}
//           onSubmit={handleAddStudent}
//           routes={routes}
//         />
//       </Modal>

//       <Modal
//         isOpen={isRouteModalOpen}
//         onClose={() => setIsRouteModalOpen(false)}
//         title="Add New Route"
//       >
//         <AddRouteModal
//           onClose={() => setIsRouteModalOpen(false)}
//           onSubmit={handleAddRoute}
//         />
//       </Modal>
//     </MainLayout>
//   );
// };

// export default TransportRoutes;

import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config";

// Define the base URL for your local backend API
// const LOCAL_API_BASE_URL = "http://localhost:5000/api"; // REMOVED

// Modal Component (Re-defined for clarity, assuming it exists elsewhere)
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50"

            style={{ 
                // Using RGBA to create the dimming effect without blurring the backdrop
                backgroundColor: 'rgba(50, 50, 50, 0.5)', 
            }}>
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Step 1: Class Selection
const ClassSelectionStep = ({ onNext, onClose }) => {
  const [classData, setClassData] = useState({
    standard: "",
    division: "",
  });

  const handleNext = () => {
    if (classData.standard && classData.division) {
      onNext(classData);
    } else {
      alert("Please select both standard and division");
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h4 className="text-lg font-medium text-gray-800">
          Step 1: Select Class
        </h4>
        <p className="text-gray-600">
          Choose the standard and division to view students
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Standard
        </label>
        <select
          value={classData.standard}
          onChange={(e) =>
            setClassData({ ...classData, standard: e.target.value })
          }
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Standard</option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
          <option value="4">4th</option>
          <option value="5">5th</option>
          <option value="6">6th</option>
          <option value="7">7th</option>
          <option value="8">8th</option>
          <option value="9">9th</option>
          <option value="10">10th</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Division
        </label>
        <select
          value={classData.division}
          onChange={(e) =>
            setClassData({ ...classData, division: e.target.value })
          }
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Division</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Step 2: Student Assignment
const StudentAssignmentStep = ({
  classInfo,
  onBack,
  onClose,
  onSubmit,
  routes,
}) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [assignmentData, setAssignmentData] = useState({
    standard: classInfo.standard,
    division: classInfo.division,
    routeName: "",
    pickupPoint: "",
  });

  const fetchStudents = async () => {
    try {
      if (classInfo.standard && classInfo.division) {
        // FIX 1: Using imported API_BASE_URL
        const res = await axios.post(
          `${API_BASE_URL}api/student`,
          { standard: classInfo.standard, division: classInfo.division },
          {
            headers: {
              auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
            },
          }
        );

        const transportStudents = res.data.filter(
          (student) =>
            student.transport &&
            student.transport.transportstatus &&
            student.transport.transportstatus.toLowerCase() === "yes"
        );

        setStudents(transportStudents);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      setStudents([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [classInfo]);

  useEffect(() => {
    setAssignmentData((prev) => ({
      ...prev,
      standard: classInfo.standard,
      division: classInfo.division,
    }));
  }, [classInfo]);

  const handleStudentSelection = (studentId) => {
    setSelectedStudents((prev) => {
      if (prev.includes(studentId)) {
        return prev.filter((id) => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  const handleAssignRoute = () => {
    if (selectedStudents.length === 0) {
      alert("Please select at least one student");
      return;
    }
    if (!assignmentData.routeName) {
      alert("Please select a route");
      return;
    }
    if (!assignmentData.pickupPoint) {
      alert("Please enter pickup point");
      return;
    }

    const assignmentInfo = {
      standard: classInfo.standard,
      division: classInfo.division,
      routeName: assignmentData.routeName,
      pickupPoint: assignmentData.pickupPoint,
      students: selectedStudents,
    };

    onSubmit(assignmentInfo);
    onClose();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-600">Loading students...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h4 className="text-lg font-medium text-gray-800">
          Step 2: Assign Route
        </h4>
        <p className="text-gray-600">
          Students from {classInfo.standard} - {classInfo.division} (Transport
          Required)
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
        <h5 className="font-medium text-gray-800">Route Assignment Details</h5>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Route
            </label>
            <select
              value={assignmentData.routeName}
              onChange={(e) => {
                setAssignmentData({
                  ...assignmentData,
                  routeName: e.target.value,
                });
              }}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Route</option>
              {routes.map((route, index) => (
                <option key={index} value={route.routeName}>
                  {route.routeName} ({route.from} to {route.to})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Point
            </label>
            <input
              type="text"
              value={assignmentData.pickupPoint}
              onChange={(e) =>
                setAssignmentData({
                  ...assignmentData,
                  pickupPoint: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter pickup point"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <h5 className="font-medium text-gray-800 mb-3">
          Select Students ({selectedStudents.length} selected)
        </h5>

        <div className="max-h-64 overflow-y-auto border border-gray-200 rounded">
          {students.map((student) => (
            <div
              key={student._id}
              className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50"
            >
              <input
                type="checkbox"
                id={`student-${student._id}`}
                checked={selectedStudents.includes(student._id)}
                onChange={() => handleStudentSelection(student._id)}
                className="mr-3"
              />
              <label
                htmlFor={`student-${student._id}`}
                className="flex-1 cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{student.firstname}</div>
                    <div className="text-sm text-gray-600">
                      Contact: {student.parent?.primarycontact || "N/A"}
                    </div>
                  </div>
                </div>
              </label>
            </div>
          ))}
        </div>

        {students.length === 0 && (
          <div className="text-center py-8 text-gray-600">
            No students with transport requirement found in {classInfo.standard}{" "}
            - {classInfo.division}
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <div className="space-x-3">
          <button
            onClick={handleAssignRoute}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={selectedStudents.length === 0}
          >
            Assign Route ({selectedStudents.length})
          </button>
        </div>
      </div>
    </div>
  );
};

const AddStudentModal = ({ onClose, onSubmit, routes }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [classInfo, setClassInfo] = useState(null);

  const handleClassSelection = (classData) => {
    setClassInfo(classData);
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
    setClassInfo(null);
  };

  return (
    <>
      {currentStep === 1 && (
        <ClassSelectionStep onNext={handleClassSelection} onClose={onClose} />
      )}
      {currentStep === 2 && (
        <StudentAssignmentStep
          classInfo={classInfo}
          onBack={handleBack}
          onClose={onClose}
          onSubmit={onSubmit}
          routes={routes}
        />
      )}
    </>
  );
};

const AddRouteModal = ({ onClose, onSubmit }) => {
  const [routeData, setRouteData] = useState({
    routeName: "",
    from: "",
    to: "",
    vehicleNumber: "",
  });

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        // FIX 2: Using imported API_BASE_URL
        const response = await axios.get(
          `${API_BASE_URL}api/vehicles`,
          {
            headers: {
              auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
            },
          }
        );
       console.log('vehicle response',response.data); 
        setVehicles(response.data); // assuming response is an array of vehicles
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  const handleRoute = async () => {
    try {
      // FIX 3: Using imported API_BASE_URL
      const response = await axios.post(
        `${API_BASE_URL}api/add-route`,
        routeData,
        {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
        }
      );

      if (response.status === 500) throw new Error("Failed to add route");

      const newRoute = await response.data;
      console.log("Route added:", newRoute);
      alert("Route added successfully!");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error adding route:", error);
      alert("Error adding route. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      {/* Route Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Route Name
        </label>
        <input
          type="text"
          value={routeData.routeName}
          onChange={(e) =>
            setRouteData({ ...routeData, routeName: e.target.value })
          }
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* From */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          From
        </label>
        <input
          type="text"
          value={routeData.from}
          onChange={(e) => setRouteData({ ...routeData, from: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* To */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          To
        </label>
        <input
          type="text"
          value={routeData.to}
          onChange={(e) => setRouteData({ ...routeData, to: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Vehicle Number Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Vehicle Number
        </label>
        <select
          value={routeData.vehicleNumber}
          onChange={(e) =>
            setRouteData({ ...routeData, vehicleNumber: e.target.value })
          }
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">-- Select Vehicle --</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle._id} value={vehicle.vehicleno}>
              {vehicle.vehicleno}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={handleRoute}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Route
        </button>
      </div>
    </div>
  );
};

const TransportRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const [search, setSearch] = useState("");
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        // FIX 4: Using imported API_BASE_URL
        const response = await axios.get(
          `${API_BASE_URL}api/routes`,
          {
            headers: {
              auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
            },
          }
        );
        if (response.status === 200) setRoutes(response.data);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };
    fetchRoutes();
  }, []);

  const [studentRoute, setStudentRoute] = useState([]);
  useEffect(() => {
    const fetchStudentRoutes = async () => {
      try {
        // FIX 5: Using imported API_BASE_URL
        const response = await axios.get(
          `${API_BASE_URL}api/students-route`,
          {
            headers: {
              auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
            },
          }
        );
        if (response.status === 200) setStudentRoute(response.data);
      } catch (error) {
        console.error("Error fetching student routes:", error);
      }
    };
    fetchStudentRoutes();
  }, []);

  const filteredData = routes.filter((item) =>
    `${item.routeName} ${item.from} ${item.to} ${item.vehicleNumber}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredStudentsData = studentRoute.filter((item) =>
    `${item.routeName} ${item.pickupPoint} ${item.standard} ${item.division}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleAddStudent = async (assignmentData) => {
    try {
      // FIX 6: Using imported API_BASE_URL
      const response = await axios.post(
        `${API_BASE_URL}api/add-student-route`,
        assignmentData,
        {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Students assigned successfully!");
        setTimeout(()=>{
          window.location.reload();
        }, 3000)
      }
    } catch (error) {
      console.error("Error assigning students:", error);
      alert("Error assigning students. Please try again.");
    }
  };

  const handleAddRoute = (routeData) => {
    console.log("Adding route:", routeData);
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="p-4 space-y-6">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex w-full lg:w-auto justify-start">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-4 py-2 rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto justify-end">
              <button
                onClick={() => setIsStudentModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Assign Student
              </button>
              <button
                onClick={() => setIsRouteModalOpen(true)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
              >
                Add Route
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <h2 className="text-2xl font-semibold">Route Schedule</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-center rounded text-sm sm:text-base">
              <thead className="bg-blue-100 text-black">
                <tr>
                  <th className="px-4 py-2 border">Vehicle Number</th>
                  <th className="px-4 py-2 border">Vehicle Type</th>
                  <th className="px-4 py-2 border">Status</th>
                  {/* <th className="px-4 py-2 border">Driver</th>
                  <th className="px-4 py-2 border">Supervisor</th> */}
                  <th className="px-4 py-2 border">Route Name</th>
                  <th className="px-4 py-2 border">Capacity</th>
                  <th className="px-4 py-2 border">Edit</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{row.vehicleNumber}</td>
                    <td className="px-4 py-2 border">
                      {row.vehicle?.vehiclename || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          row.vehicle?.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {row.vehicle?.status || "Unknown"}
                      </span>
                    </td>
                    {/* <td className="px-4 py-2 border">
                      {row.driverr?.driverName || "None"}
                    </td>
                    <td className="px-4 py-2 border">
                      {row.driverr?.supervisorName || "None"}
                    </td> */}
                    <td className="px-4 py-2 border">{row.routeName}</td>
                    <td className="px-4 py-2 border">
                      {row.vehicle?.capacity || "N/A"}
                    </td>
                    <td className="px-4 py-2 border">
                      <button className="text-blue-600 hover:underline">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center">
          <h2 className="text-2xl font-semibold mb-3">Student Assigned</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-center rounded text-sm sm:text-base">
            <thead className="bg-blue-100 text-black">
              <tr>
                <th className="px-4 py-2 border">Standard</th>
                <th className="px-4 py-2 border">Division</th>
                <th className="px-4 py-2 border">Route Name</th>
                <th className="px-4 py-2 border">Pick up Point</th>
                <th className="px-4 py-2 border">Edit</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredStudentsData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{row.standard}</td>
                  <td className="px-4 py-2 border">{row.division || "N/A"}</td>
                  <td className="px-4 py-2 border">
                    <span className={`px-2 py-1 rounded text-xs`}>
                      {row.routeName || "Unknown"}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">{row.pickupPoint}</td>
                  <td className="px-4 py-2 border">
                    <button className="text-blue-600 hover:underline">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        title="Assign Students to Route"
      >
        <AddStudentModal
          onClose={() => setIsStudentModalOpen(false)}
          onSubmit={handleAddStudent}
          routes={routes}
        />
      </Modal>

      <Modal
        isOpen={isRouteModalOpen}
        onClose={() => setIsRouteModalOpen(false)}
        title="Add New Route"
      >
        <AddRouteModal
          onClose={() => setIsRouteModalOpen(false)}
          onSubmit={handleAddRoute}
        />
      </Modal>
    </MainLayout>
  );
};

export default TransportRoutes;