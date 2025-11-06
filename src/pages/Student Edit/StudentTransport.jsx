// import React, { useState } from 'react';

// const TransportManagement = () => {
//   const [formData, setFormData] = useState({
//     busNumber: '',
//     busRoute: '',
//     pickupLocation: '',
//     dropLocation: '',
//     driverName: '',
//     supervisorName: '',
//     contactDetails: ''
//   });

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-t-lg border-2 border-blue-500">
//           <h1 className="text-xl md:text-2xl font-semibold text-center py-4 px-4 text-gray-800">
//             Transport Management
//           </h1>
//         </div>
        
//         {/* Form Table */}
//         <div className="bg-white border-l-2 border-r-2 border-b-2 border-blue-500 rounded-b-lg overflow-hidden">
//           <div className="divide-y-2 divide-blue-500">
            
//             {/* Bus Number */}
//             <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//               <div className="p-4 md:p-6 bg-gray-50">
//                 <label className="text-base md:text-lg font-medium text-gray-700">
//                   Bus number
//                 </label>
//               </div>
//               <div className="p-4 md:p-6">
//                 <input
//                   type="text"
//                   value={formData.busNumber}
//                   onChange={(e) => handleInputChange('busNumber', e.target.value)}
//                   className="w-full border-0 outline-none text-base md:text-lg bg-transparent"
//                   placeholder="Enter bus number"
//                 />
//               </div>
//             </div>

//             {/* Bus Route */}
//             <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//               <div className="p-4 md:p-6 bg-gray-50">
//                 <label className="text-base md:text-lg font-medium text-gray-700">
//                   Bus Route
//                 </label>
//               </div>
//               <div className="p-4 md:p-6">
//                 <input
//                   type="text"
//                   value={formData.busRoute}
//                   onChange={(e) => handleInputChange('busRoute', e.target.value)}
//                   className="w-full border-0 outline-none text-base md:text-lg bg-transparent"
//                   placeholder="Enter bus route"
//                 />
//               </div>
//             </div>

//             {/* Pickup Location */}
//             <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//               <div className="p-4 md:p-6 bg-gray-50">
//                 <label className="text-base md:text-lg font-medium text-gray-700">
//                   Pickup Location
//                 </label>
//               </div>
//               <div className="p-4 md:p-6">
//                 <input
//                   type="text"
//                   value={formData.pickupLocation}
//                   onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
//                   className="w-full border-0 outline-none text-base md:text-lg bg-transparent"
//                   placeholder="Enter pickup location"
//                 />
//               </div>
//             </div>

//             {/* Drop Location */}
//             <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//               <div className="p-4 md:p-6 bg-gray-50">
//                 <label className="text-base md:text-lg font-medium text-gray-700">
//                   Drop Location
//                 </label>
//               </div>
//               <div className="p-4 md:p-6">
//                 <input
//                   type="text"
//                   value={formData.dropLocation}
//                   onChange={(e) => handleInputChange('dropLocation', e.target.value)}
//                   className="w-full border-0 outline-none text-base md:text-lg bg-transparent"
//                   placeholder="Enter drop location"
//                 />
//               </div>
//             </div>

//             {/* Driver Name */}
//             <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//               <div className="p-4 md:p-6 bg-gray-50">
//                 <label className="text-base md:text-lg font-medium text-gray-700">
//                   Driver Name
//                 </label>
//               </div>
//               <div className="p-4 md:p-6">
//                 <input
//                   type="text"
//                   value={formData.driverName}
//                   onChange={(e) => handleInputChange('driverName', e.target.value)}
//                   className="w-full border-0 outline-none text-base md:text-lg bg-transparent"
//                   placeholder="Enter driver name"
//                 />
//               </div>
//             </div>

//             {/* Supervisor Name */}
//             <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//               <div className="p-4 md:p-6 bg-gray-50">
//                 <label className="text-base md:text-lg font-medium text-gray-700">
//                   Supervisor Name
//                 </label>
//               </div>
//               <div className="p-4 md:p-6">
//                 <input
//                   type="text"
//                   value={formData.supervisorName}
//                   onChange={(e) => handleInputChange('supervisorName', e.target.value)}
//                   className="w-full border-0 outline-none text-base md:text-lg bg-transparent"
//                   placeholder="Enter supervisor name"
//                 />
//               </div>
//             </div>

//             {/* Contact Details */}
//             <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//               <div className="p-4 md:p-6 bg-gray-50">
//                 <label className="text-base md:text-lg font-medium text-gray-700">
//                   Contact Details
//                 </label>
//               </div>
//               <div className="p-4 md:p-6">
//                 <input
//                   type="text"
//                   value={formData.contactDetails}
//                   onChange={(e) => handleInputChange('contactDetails', e.target.value)}
//                   className="w-full border-0 outline-none text-base md:text-lg bg-transparent"
//                   placeholder="Enter contact details"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
//           <button className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors">
//             Save Details
//           </button>
//           <button className="px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors">
//             Reset Form
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransportManagement;




















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// // --- Auth Header & API URL ---
// const AUTH_HEADER = 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='; 
// const API_BASE_URL = 'http://localhost:5000/api'; 

// // --- Accept studentid and student props ---
// export default function TransportManagement({ studentid, student, refreshStudentData }) {

//     // --- State reflects ALL fields in the transport object ---
//     const [transportData, setTransportData] = useState({
//         transportid: '', 
//         transportstatus: '',
//         pickuppoint: '',
//         droppoint: '',
//         modetransport: '',
//         // --- CORRECTED NEW FIELDS ---
//         busnumber: '',
//         busroute: '',
//         drivername: '',
//         supervisorname: '',
//         contactdetails: '', // ⬅️ ADDED BACK the field that was successfully saving data
//     });

//     const [isLoading, setIsLoading] = useState(false);
//     const [notification, setNotification] = useState({ type: '', message: '' });

//     // --- useEffect to populate form when student data is available ---
//     useEffect(() => {
//         if (student && student.transport) {
//             console.log("Student prop found in Transport, populating form:", student.transport);
            
//             const fetchedTransport = student.transport;
            
//             // Map ALL known fields from the fetched object into state
//             setTransportData({
//                 transportid: fetchedTransport.transportid || '',
//                 transportstatus: fetchedTransport.transportstatus || '',
//                 pickuppoint: fetchedTransport.pickuppoint || '',
//                 droppoint: fetchedTransport.droppoint || '',
//                 modetransport: fetchedTransport.modetransport || '',
//                 // Map existing fields
//                 busnumber: fetchedTransport.busnumber || '',
//                 busroute: fetchedTransport.busroute || '',
//                 drivername: fetchedTransport.drivername || '',
//                 supervisorname: fetchedTransport.supervisorname || '',
//                 contactdetails: fetchedTransport.contactdetails || '', // ⬅️ MAPPING NEW FIELD
//             });
//         } else if (student) {
//              console.log("Student prop found, but student.transport object is missing or empty.");
//              // Reset to defaults if transport is missing
//              setTransportData({
//                 transportid: '', transportstatus: '', pickuppoint: '', droppoint: '', modetransport: '',
//                 busnumber: '', busroute: '', drivername: '', supervisorname: '', contactdetails: '',
//              });
//         }
//     }, [student]);

//     // --- Handle input changes (Generic handler) ---
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setTransportData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//         if (notification.message) setNotification({ type: '', message: '' });
//     };

//     // --- Handle saving the transport details ---
//     const handleSave = async (e) => {
//         e.preventDefault();
//         if (!student || !student._id) {
//             setNotification({ type: 'error', message: 'Cannot save. Student data not available.' });
//             return;
//         }
//         if (!transportData.transportstatus) {
//             setNotification({ type: 'error', message: 'Transport Status is required.' });
//             return;
//         }

//         // --- Frontend validation for Bus mode required fields ---
//         const isBus = transportData.transportstatus === 'yes' && transportData.modetransport === 'bus';
//         if (isBus) {
//              if (!transportData.busnumber) return setNotification({ type: 'error', message: 'Bus Number is required for Bus transport.' });
//              if (!transportData.drivername) return setNotification({ type: 'error', message: 'Driver Name is required for Bus transport.' });
//         }
//         // --- End validation ---


//         setIsLoading(true);
//         setNotification({ type: '', message: '' });
        
//         // Payload must send the entire nested object to ensure ALL keys are updated/preserved
//         const updatePayload = {
//             transport: {
//                 ...transportData,
//                 // Ensure transportid is present if it exists
//                 transportid: transportData.transportid || student.transport?.transportid, 
//             }
//         };

//         console.log("Attempting to save transport data:", updatePayload);
//         try {
//             const response = await axios.put(
//                 `${API_BASE_URL}/edit-student/${student._id}`,
//                 updatePayload, // Send the nested object: { transport: {...} }
//                 { headers: { auth: AUTH_HEADER, 'Content-Type': 'application/json' } }
//             );
//             if (response.status === 200) {
//                 setNotification({ type: 'success', message: 'Transport details saved successfully!' });
//                 if (refreshStudentData) {
//                     console.log("Save successful, calling refreshStudentData...");
//                     refreshStudentData(); // Refresh parent component data
//                 }
//             } else {
//                 setNotification({ type: 'error', message: `Save failed: Server status ${response.status}` });
//             }
//         } catch (error) {
//             console.error("Error saving transport data:", error);
//             const errorMsg = error.response?.data?.message || "An unknown error occurred.";
//             setNotification({ type: 'error', message: `Save failed: ${errorMsg}` });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // --- Handle resetting the form to original data ---
//     const handleReset = () => {
//         if (student && student.transport) {
//             const fetchedTransport = student.transport;
//             setTransportData({
//                 transportid: fetchedTransport.transportid || '',
//                 transportstatus: fetchedTransport.transportstatus || '',
//                 pickuppoint: fetchedTransport.pickuppoint || '',
//                 droppoint: fetchedTransport.droppoint || '',
//                 modetransport: fetchedTransport.modetransport || '',
//                 busnumber: fetchedTransport.busnumber || '',
//                 busroute: fetchedTransport.busroute || '',
//                 drivername: fetchedTransport.drivername || '',
//                 supervisorname: fetchedTransport.supervisorname || '',
//                 contactdetails: fetchedTransport.contactdetails || '', // ⬅️ MAPPING NEW FIELD
//             });
//         } else {
//              setTransportData({
//                 transportid: '', transportstatus: '', pickuppoint: '', droppoint: '', modetransport: '',
//                 busnumber: '', busroute: '', drivername: '', supervisorname: '', contactdetails: '',
//              });
//         }
//         setNotification({ type: '', message: '' });
//         console.log('🔄 Form reset.');
//     };

//      // --- Check if bus details should be visible ---
//     const isBusTransport = transportData.transportstatus === 'yes' && transportData.modetransport === 'bus';


//     if (!student) {
//         return (
//             <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center items-center">
//                  <p className="text-gray-600">Loading student transport data...</p>
//             </div>
//         );
//     }

//     // --- Render the component ---
//     return (
//         <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//             <div className="max-w-4xl mx-auto">

//                 {/* --- Notification Area --- */}
//                  {notification.message && (
//                     <div className={`p-3 mb-4 rounded-lg text-center ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                         {notification.message}
//                     </div>
//                 )}

//                 {/* Header */}
//                 <div className="bg-white rounded-t-lg border-2 border-blue-500">
//                     <h1 className="text-xl md:text-2xl font-semibold text-center py-4 px-4 text-gray-800">
//                         Transport Management
//                     </h1>
//                 </div>

//                 {/* Form Table */}
//                 <div className="bg-white border-l-2 border-r-2 border-b-2 border-blue-500 rounded-b-lg overflow-hidden">
//                     <div className="divide-y-2 divide-blue-500">

//                         {/* 1. Transport Status */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//                             <div className="p-4 md:p-6 bg-gray-50 flex items-center">
//                                 <label className="text-base md:text-lg font-medium text-gray-700">
//                                     Transport Status <span className="text-red-500">*</span>
//                                 </label>
//                             </div>
//                             <div className="p-4 md:p-6">
//                                 <select
//                                     value={transportData.transportstatus}
//                                     onChange={handleInputChange}
//                                     name="transportstatus" 
//                                     className="w-full text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                 >
//                                     <option value="">Select Status</option>
//                                     <option value="yes">Yes</option>
//                                     <option value="no">No</option>
//                                 </select>
//                             </div>
//                         </div>

//                         {/* 2. Mode of Transport */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//                             <div className="p-4 md:p-6 bg-gray-50 flex items-center">
//                                 <label className="text-base md:text-lg font-medium text-gray-700">
//                                     Mode of Transport
//                                 </label>
//                             </div>
//                             <div className="p-4 md:p-6">
//                                 <select
//                                     value={transportData.modetransport}
//                                     onChange={handleInputChange}
//                                     name="modetransport" 
//                                     className="w-full text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                 >
//                                     <option value="">Select Mode</option>
//                                     <option value="bus">Bus</option>
//                                     <option value="van">Van</option>
//                                     <option value="rickshaw">Rickshaw</option>
//                                     <option value="self">Self</option>
//                                     <option value="other">Other</option>
//                                 </select>
//                             </div>
//                         </div>

//                         {/* 3. Pickup Location */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//                             <div className="p-4 md:p-6 bg-gray-50 flex items-center">
//                                 <label className="text-base md:text-lg font-medium text-gray-700">
//                                     Pickup Location
//                                 </label>
//                             </div>
//                             <div className="p-4 md:p-6">
//                                 <input
//                                     type="text"
//                                     value={transportData.pickuppoint}
//                                     onChange={handleInputChange}
//                                     name="pickuppoint" 
//                                     className="w-full border-0 outline-none text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2"
//                                     placeholder="Enter pickup location"
//                                 />
//                             </div>
//                         </div>

//                         {/* 4. Drop Location */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//                             <div className="p-4 md:p-6 bg-gray-50 flex items-center">
//                                 <label className="text-base md:text-lg font-medium text-gray-700">
//                                     Drop Location
//                                 </label>
//                             </div>
//                             <div className="p-4 md:p-6">
//                                 <input
//                                     type="text"
//                                     value={transportData.droppoint}
//                                     onChange={handleInputChange}
//                                     name="droppoint" 
//                                     className="w-full border-0 outline-none text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2"
//                                     placeholder="Enter drop location"
//                                 />
//                             </div>
//                         </div>

//                         {/* --- NEW FIELDS: Conditionally displayed for Bus (Contact details added back) --- */}
//                         {isBusTransport && (
//                             <>
//                                 {/* 5. Bus Number */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//                                     <div className="p-4 md:p-6 bg-gray-50 flex items-center">
//                                         <label className="text-base md:text-lg font-medium text-gray-700">
//                                             Bus Number <span className="text-red-500">*</span>
//                                         </label>
//                                     </div>
//                                     <div className="p-4 md:p-6">
//                                         <input
//                                             type="text"
//                                             name="busnumber"
//                                             value={transportData.busnumber}
//                                             onChange={handleInputChange}
//                                             className="w-full border-0 outline-none text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2"
//                                             placeholder="Enter Bus Number"
//                                             required 
//                                         />
//                                     </div>
//                                 </div>
//                                 {/* 6. Bus Route */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//                                     <div className="p-4 md:p-6 bg-gray-50 flex items-center">
//                                         <label className="text-base md:text-lg font-medium text-gray-700">
//                                             Bus Route
//                                         </label>
//                                     </div>
//                                     <div className="p-4 md:p-6">
//                                         <input
//                                             type="text"
//                                             name="busroute"
//                                             value={transportData.busroute}
//                                             onChange={handleInputChange}
//                                             className="w-full border-0 outline-none text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2"
//                                             placeholder="Enter Bus Route details"
//                                         />
//                                     </div>
//                                 </div>
//                                 {/* 7. Driver Name */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//                                     <div className="p-4 md:p-6 bg-gray-50 flex items-center">
//                                         <label className="text-base md:text-lg font-medium text-gray-700">
//                                             Driver Name <span className="text-red-500">*</span>
//                                         </label>
//                                     </div>
//                                     <div className="p-4 md:p-6">
//                                         <input
//                                             type="text"
//                                             name="drivername"
//                                             value={transportData.drivername}
//                                             onChange={handleInputChange}
//                                             className="w-full border-0 outline-none text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2"
//                                             placeholder="Enter Driver's Name"
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                                 {/* 8. Supervisor Name */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//                                     <div className="p-4 md:p-6 bg-gray-50 flex items-center">
//                                         <label className="text-base md:text-lg font-medium text-gray-700">
//                                             Supervisor Name
//                                         </label>
//                                     </div>
//                                     <div className="p-4 md:p-6">
//                                         <input
//                                             type="text"
//                                             name="supervisorname"
//                                             value={transportData.supervisorname}
//                                             onChange={handleInputChange}
//                                             className="w-full border-0 outline-none text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2"
//                                             placeholder="Enter Supervisor's Name"
//                                         />
//                                     </div>
//                                 </div>
//                                 {/* 9. Contact Details (The generic field seen in successful DB saves) */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//                                     <div className="p-4 md:p-6 bg-gray-50 flex items-center">
//                                         <label className="text-base md:text-lg font-medium text-gray-700">
//                                             Supervisor Contact Details 
//                                         </label>
//                                     </div>
//                                     <div className="p-4 md:p-6">
//                                         <input
//                                             type="text"
//                                             name="contactdetails"
//                                             value={transportData.contactdetails}
//                                             onChange={handleInputChange}
//                                             maxLength="10"
//                                             className="w-full border-0 outline-none text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2"
//                                             placeholder="Enter 10-digit number"
//                                         />
//                                     </div>
//                                 </div>
//                             </>
//                         )}
//                         {/* --- END NEW FIELDS --- */}

//                     </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
//                     <button
//                         onClick={handleSave}
//                         disabled={isLoading}
//                         className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
//                     >
//                         {isLoading ? 'Saving...' : 'Save Details'}
//                     </button>
//                     <button
//                         onClick={handleReset}
//                         type="button"
//                         disabled={isLoading}
//                         className="px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
//                     >
//                         Reset Form
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// // --- Auth Header & API URL ---
// const AUTH_HEADER = 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='; 
// const API_BASE_URL = 'http://localhost:5000/api'; 

// // 🟢 ACCEPTING isViewMode PROP
// export default function TransportManagement({ studentid, student, refreshStudentData, isViewMode }) {

//     // --- State reflects ALL fields in the transport object ---
//     const [transportData, setTransportData] = useState({
//         transportid: '', 
//         transportstatus: '',
//         pickuppoint: '',
//         droppoint: '',
//         modetransport: '',
//         // --- CORRECTED NEW FIELDS ---
//         busnumber: '',
//         busroute: '',
//         drivername: '',
//         supervisorname: '',
//         contactdetails: '', // ⬅️ ADDED BACK the field that was successfully saving data
//     });

//     const [isLoading, setIsLoading] = useState(false);
//     const [notification, setNotification] = useState({ type: '', message: '' });

//     // --- useEffect to populate form when student data is available ---
//     useEffect(() => {
//         if (student && student.transport) {
//             console.log("Student prop found in Transport, populating form:", student.transport);
//             
//             const fetchedTransport = student.transport;
//             
//             // Map ALL known fields from the fetched object into state
//             setTransportData({
//                 transportid: fetchedTransport.transportid || '',
//                 transportstatus: fetchedTransport.transportstatus || '',
//                 pickuppoint: fetchedTransport.pickuppoint || '',
//                 droppoint: fetchedTransport.droppoint || '',
//                 modetransport: fetchedTransport.modetransport || '',
//                 // Map existing fields
//                 busnumber: fetchedTransport.busnumber || '',
//                 busroute: fetchedTransport.busroute || '',
//                 drivername: fetchedTransport.drivername || '',
//                 supervisorname: fetchedTransport.supervisorname || '',
//                 contactdetails: fetchedTransport.contactdetails || '', // ⬅️ MAPPING NEW FIELD
//             });
//         } else if (student) {
//              console.log("Student prop found, but student.transport object is missing or empty.");
//              // Reset to defaults if transport is missing
//              setTransportData({
//                 transportid: '', transportstatus: '', pickuppoint: '', droppoint: '', modetransport: '',
//                 busnumber: '', busroute: '', drivername: '', supervisorname: '', contactdetails: '',
//              });
//         }
//     }, [student]);

//     // --- Handle input changes (Generic handler) ---
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setTransportData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//         if (notification.message) setNotification({ type: '', message: '' });
//     };

//     // --- Handle saving the transport details ---
//     const handleSave = async (e) => {
//         e.preventDefault();
//         if (isViewMode) return; // 🛑 PREVENT SAVE IN VIEW MODE

//         if (!student || !student._id) {
//             setNotification({ type: 'error', message: 'Cannot save. Student data not available.' });
//             return;
//         }
//         if (!transportData.transportstatus) {
//             setNotification({ type: 'error', message: 'Transport Status is required.' });
//             return;
//         }

//         // --- Frontend validation for Bus mode required fields ---
//         const isBus = transportData.transportstatus === 'yes' && transportData.modetransport === 'bus';
//         if (isBus) {
//              if (!transportData.busnumber) return setNotification({ type: 'error', message: 'Bus Number is required for Bus transport.' });
//              if (!transportData.drivername) return setNotification({ type: 'error', message: 'Driver Name is required for Bus transport.' });
//         }
//         // --- End validation ---


//         setIsLoading(true);
//         setNotification({ type: '', message: '' });
//         
//         // Payload must send the entire nested object to ensure ALL keys are updated/preserved
//         const updatePayload = {
//             transport: {
//                 ...transportData,
//                 // Ensure transportid is present if it exists
//                 transportid: transportData.transportid || student.transport?.transportid, 
//             }
//         };

//         console.log("Attempting to save transport data:", updatePayload);
//         try {
//             const response = await axios.put(
//                 `${API_BASE_URL}/edit-student/${student._id}`,
//                 updatePayload, // Send the nested object: { transport: {...} }
//                 { headers: { auth: AUTH_HEADER, 'Content-Type': 'application/json' } }
//             );
//             if (response.status === 200) {
//                 setNotification({ type: 'success', message: 'Transport details saved successfully!' });
//                 if (refreshStudentData) {
//                     console.log("Save successful, calling refreshStudentData...");
//                     refreshStudentData(); // Refresh parent component data
//                 }
//             } else {
//                 setNotification({ type: 'error', message: `Save failed: Server status ${response.status}` });
//             }
//         } catch (error) {
//             console.error("Error saving transport data:", error);
//             const errorMsg = error.response?.data?.message || "An unknown error occurred.";
//             setNotification({ type: 'error', message: `Save failed: ${errorMsg}` });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // --- Handle resetting the form to original data ---
//     const handleReset = () => {
//         if (student && student.transport) {
//             const fetchedTransport = student.transport;
//             setTransportData({
//                 transportid: fetchedTransport.transportid || '',
//                 transportstatus: fetchedTransport.transportstatus || '',
//                 pickuppoint: fetchedTransport.pickuppoint || '',
//                 droppoint: fetchedTransport.droppoint || '',
//                 modetransport: fetchedTransport.modetransport || '',
//                 busnumber: fetchedTransport.busnumber || '',
//                 busroute: fetchedTransport.busroute || '',
//                 drivername: fetchedTransport.drivername || '',
//                 supervisorname: fetchedTransport.supervisorname || '',
//                 contactdetails: fetchedTransport.contactdetails || '', // ⬅️ MAPPING NEW FIELD
//             });
//         } else {
//              setTransportData({
//                 transportid: '', transportstatus: '', pickuppoint: '', droppoint: '', modetransport: '',
//                 busnumber: '', busroute: '', drivername: '', supervisorname: '', contactdetails: '',
//              });
//         }
//         setNotification({ type: '', message: '' });
//         console.log('🔄 Form reset.');
//     };

//      // --- Check if bus details should be visible ---
//     const isBusTransport = transportData.transportstatus === 'yes' && transportData.modetransport === 'bus';


//     if (!student) {
//         return (
//             <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center items-center">
//                  <p className="text-gray-600">Loading student transport data...</p>
//             </div>
//         );
//     }

//     // --- Render the component ---
//     return (
//         <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//             <div className="max-w-4xl mx-auto">

//                 {/* --- Notification Area --- */}
//                  {notification.message && (
//                     <div className={`p-3 mb-4 rounded-lg text-center ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                         {notification.message}
//                     </div>
//                 )}

//                 {/* Header */}
//                 <div className="bg-white rounded-t-lg border-2 border-blue-500">
//                     <h1 className="text-xl md:text-2xl font-semibold text-center py-4 px-4 text-gray-800">
//                         Transport Management
//                     </h1>
//                 </div>

//                 {/* Form Table */}
//                 <div className="bg-white border-l-2 border-r-2 border-b-2 border-blue-500 rounded-b-lg overflow-hidden">
//                     <div className="divide-y-2 divide-blue-500">

//                         {/* 1. Transport Status */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//                             <div className="p-4 md:p-6 bg-gray-50 flex items-center">
//                                 <label className="text-base md:text-lg font-medium text-gray-700">
//                                     Transport Status <span className="text-red-500">*</span>
//                                 </label>
//                             </div>
//                             <div className="p-4 md:p-6">
//                                 <select
//                                     value={transportData.transportstatus}
//                                     onChange={handleInputChange}
//                                     name="transportstatus" 
//                                     className="w-full text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                     disabled={isViewMode}
//                                 >
//                                     <option value="">Select Status</option>
//                                     <option value="yes">Yes</option>
//                                     <option value="no">No</option>
//                                 </select>
//                             </div>
//                             
//                         </div>

//                         {/* 2. Mode of Transport */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//                             <div className="p-4 md:p-6 bg-gray-50 flex items-center">
//                                 <label className="text-base md:text-lg font-medium text-gray-700">
//                                     Mode of Transport
//                                 </label>
//                             </div>
//                             <div className="p-4 md:p-6">
//                                 <select
//                                     value={transportData.modetransport}
//                                     onChange={handleInputChange}
//                                     name="modetransport" 
//                                     className="w-full text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                     disabled={isViewMode} // 🟢 DISABLED IN VIEW MODE
//                                 >
//                                     <option value="">Select Mode</option>
//                                     <option value="bus">Bus</option>
//                                     <option value="van">Van</option>
//                                     <option value="rickshaw">Rickshaw</option>
//                                     <option value="self">Self</option>
//                                     <option value="other">Other</option>
//                                 </select>
//                             </div>
//                         </div>

//                         {/* 3. Pickup Location */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//                             <div className="p-4 md:p-6 bg-gray-50 flex items-center">
//                                 <label className="text-base md:text-lg font-medium text-gray-700">
//                                     Pickup Location
//                                 </label>
//                             </div>
//                             <div className="p-4 md:p-6">
//                                 <input
//                                     type="text"
//                                     value={transportData.pickuppoint}
//                                     onChange={handleInputChange}
//                                     name="pickuppoint" 
//                                     className="w-full border-0 outline-none text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2"
//                                     placeholder="Enter pickup location"
//                                     disabled={isViewMode} // 🟢 DISABLED IN VIEW MODE
//                                 />
//                             </div>
//                         </div>

//                         {/* 4. Drop Location */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//                             <div className="p-4 md:p-6 bg-gray-50 flex items-center">
//                                 <label className="text-base md:text-lg font-medium text-gray-700">
//                                     Drop Location
//                                 </label>
//                             </div>
//                             <div className="p-4 md:p-6">
//                                 <input
//                                     type="text"
//                                     value={transportData.droppoint}
//                                     onChange={handleInputChange}
//                                     name="droppoint" 
//                                     className="w-full border-0 outline-none text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2"
//                                     placeholder="Enter drop location"
//                                     disabled={isViewMode} // 🟢 DISABLED IN VIEW MODE
//                                 />
//                             </div>
//                         </div>

//                         {/* --- NEW FIELDS: Conditionally displayed for Bus (Contact details added back) --- */}
//                         {isBusTransport && (
//                             <React.Fragment> 
//                                 {/* 5. Bus Number */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//                                     <div className="p-4 md:p-6 bg-gray-50 flex items-center">
//                                         <label className="text-base md:text-lg font-medium text-gray-700">
//                                             Bus Number <span className="text-red-500">*</span>
//                                         </label>
//                                     </div>
//                                     <div className="p-4 md:p-6">
//                                         <input
//                                             type="text"
//                                             name="busnumber"
//                                             value={transportData.busnumber}
//                                             onChange={handleInputChange}
//                                             className="w-full border-0 outline-none text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2"
//                                             placeholder="Enter Bus Number"
//                                             disabled={isViewMode} // 🟢 DISABLED IN VIEW MODE
//                                             required 
//                                         />
//                                     </div>
//                                 </div>
//                                 {/* 6. Bus Route */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//                                     <div className="p-4 md:p-6 bg-gray-50 flex items-center">
//                                         <label className="text-base md:text-lg font-medium text-gray-700">
//                                             Bus Route
//                                         </label>
//                                     </div>
//                                     <div className="p-4 md:p-6">
//                                         <input
//                                             type="text"
//                                             name="busroute"
//                                             value={transportData.busroute}
//                                             onChange={handleInputChange}
//                                             className="w-full border-0 outline-none text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2"
//                                             placeholder="Enter Bus Route details"
//                                             disabled={isViewMode} // 🟢 DISABLED IN VIEW MODE
//                                         />
//                                     </div>
//                                 </div>
//                                 {/* 7. Driver Name */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//                                     <div className="p-4 md:p-6 bg-gray-50 flex items-center">
//                                         <label className="text-base md:text-lg font-medium text-gray-700">
//                                             Driver Name <span className="text-red-500">*</span>
//                                         </label>
//                                     </div>
//                                     <div className="p-4 md:p-6">
//                                         <input
//                                             type="text"
//                                             name="drivername"
//                                             value={transportData.drivername}
//                                             onChange={handleInputChange}
//                                             className="w-full border-0 outline-none text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2"
//                                             placeholder="Enter Driver's Name"
//                                             disabled={isViewMode} // 🟢 DISABLED IN VIEW MODE
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                                 {/* 8. Supervisor Name */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//                                     <div className="p-4 md:p-6 bg-gray-50 flex items-center">
//                                         <label className="text-base md:text-lg font-medium text-gray-700">
//                                             Supervisor Name
//                                         </label>
//                                     </div>
//                                     <div className="p-4 md:p-6">
//                                         <input
//                                             type="text"
//                                             name="supervisorname"
//                                             value={transportData.supervisorname}
//                                             onChange={handleInputChange}
//                                             className="w-full border-0 outline-none text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2"
//                                             placeholder="Enter Supervisor's Name"
//                                             disabled={isViewMode} // 🟢 DISABLED IN VIEW MODE
//                                         />
//                                     </div>
//                                 </div>
//                                 {/* 9. Contact Details (The generic field seen in successful DB saves) */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
//                                     <div className="p-4 md:p-6 bg-gray-50 flex items-center">
//                                         <label className="text-base md:text-lg font-medium text-gray-700">
//                                             Supervisor Contact Details 
//                                         </label>
//                                     </div>
//                                     <div className="p-4 md:p-6">
//                                         <input
//                                             type="text"
//                                             name="contactdetails"
//                                             value={transportData.contactdetails}
//                                             onChange={handleInputChange}
//                                             maxLength="10"
//                                             className="w-full border-0 outline-none text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2"
//                                             placeholder="Enter 10-digit number"
//                                             disabled={isViewMode} // 🟢 DISABLED IN VIEW MODE
//                                         />
//                                     </div>
//                                 </div>
//                             </React.Fragment>
//                         )}
//                         {/* --- END NEW FIELDS --- */}

//                     </div>
//                 </div>

//                 {/* Action Buttons */}
//                 {!isViewMode && ( // 🟢 HIDING BUTTONS IN VIEW MODE
//                     <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
//                         <button
//                             onClick={handleSave}
//                             disabled={isLoading}
//                             className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
//                         >
//                             {isLoading ? 'Saving...' : 'Save Details'}
//                         </button>
//                         <button
//                             onClick={handleReset}
//                             type="button"
//                             disabled={isLoading}
//                             className="px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
//                         >
//                             Reset Form
//                         </button>
//                     </div>
//                 )}
//                 </div>
//             </div>
// //         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../../config';


// --- Auth Header ---
const AUTH_HEADER = 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='; 
// const API_BASE_URL = 'http://localhost:5000/api'; // REMOVED LOCAL DEFINITION

// 🟢 ACCEPTING isViewMode PROP
export default function TransportManagement({ studentid, student, refreshStudentData, isViewMode }) {

    // --- State reflects ALL fields in the transport object ---
    const [transportData, setTransportData] = useState({
        transportid: '', 
        transportstatus: '',
        pickuppoint: '',
        droppoint: '',
        modetransport: '',
        // --- CORRECTED NEW FIELDS ---
        busnumber: '',
        busroute: '',
        drivername: '',
        supervisorname: '',
        contactdetails: '', // ⬅️ ADDED BACK the field that was successfully saving data
    });

    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({ type: '', message: '' });

    // --- useEffect to populate form when student data is available ---
    useEffect(() => {
        if (student && student.transport) {
            console.log("Student prop found in Transport, populating form:", student.transport);
            
            const fetchedTransport = student.transport;
            
            // Map ALL known fields from the fetched object into state
            setTransportData({
                transportid: fetchedTransport.transportid || '',
                transportstatus: fetchedTransport.transportstatus || '',
                pickuppoint: fetchedTransport.pickuppoint || '',
                droppoint: fetchedTransport.droppoint || '',
                modetransport: fetchedTransport.modetransport || '',
                // Map existing fields
                busnumber: fetchedTransport.busnumber || '',
                busroute: fetchedTransport.busroute || '',
                drivername: fetchedTransport.drivername || '',
                supervisorname: fetchedTransport.supervisorname || '',
                contactdetails: fetchedTransport.contactdetails || '', // ⬅️ MAPPING NEW FIELD
            });
        } else if (student) {
             console.log("Student prop found, but student.transport object is missing or empty.");
             // Reset to defaults if transport is missing
             setTransportData({
                transportid: '', transportstatus: '', pickuppoint: '', droppoint: '', modetransport: '',
                busnumber: '', busroute: '', drivername: '', supervisorname: '', contactdetails: '',
             });
        }
    }, [student]);

    // --- Handle input changes (Generic handler) ---
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTransportData(prev => ({
            ...prev,
            [name]: value
        }));
        if (notification.message) setNotification({ type: '', message: '' });
    };

    // --- Handle saving the transport details ---
    const handleSave = async (e) => {
        e.preventDefault();
        if (isViewMode) return; // 🛑 PREVENT SAVE IN VIEW MODE

        if (!student || !student._id) {
            setNotification({ type: 'error', message: 'Cannot save. Student data not available.' });
            return;
        }
        if (!transportData.transportstatus) {
            setNotification({ type: 'error', message: 'Transport Status is required.' });
            return;
        }

        // --- Frontend validation for Bus mode required fields ---
        const isBus = transportData.transportstatus === 'yes' && transportData.modetransport === 'bus';
        if (isBus) {
             if (!transportData.busnumber) return setNotification({ type: 'error', message: 'Bus Number is required for Bus transport.' });
             if (!transportData.drivername) return setNotification({ type: 'error', message: 'Driver Name is required for Bus transport.' });
        }
        // --- End validation ---


        setIsLoading(true);
        setNotification({ type: '', message: '' });
        
        // Payload must send the entire nested object to ensure ALL keys are updated/preserved
        const updatePayload = {
            transport: {
                ...transportData,
                // Ensure transportid is present if it exists
                transportid: transportData.transportid || student.transport?.transportid, 
            }
        };

        console.log("Attempting to save transport data:", updatePayload);
        try {
            // FIX 1: Using imported API_BASE_URL
            const response = await axios.put(
                `${API_BASE_URL}api/edit-student/${student._id}`,
                updatePayload, // Send the nested object: { transport: {...} }
                { headers: { auth: AUTH_HEADER, 'Content-Type': 'application/json' } }
            );
            if (response.status === 200) {
                setNotification({ type: 'success', message: 'Transport details saved successfully!' });
                if (refreshStudentData) {
                    console.log("Save successful, calling refreshStudentData...");
                    refreshStudentData(); // Refresh parent component data
                }
            } else {
                setNotification({ type: 'error', message: `Save failed: Server status ${response.status}` });
            }
        } catch (error) {
            console.error("Error saving transport data:", error);
            const errorMsg = error.response?.data?.message || "An unknown error occurred.";
            setNotification({ type: 'error', message: `Save failed: ${errorMsg}` });
        } finally {
            setIsLoading(false);
        }
    };

    // --- Handle resetting the form to original data ---
    const handleReset = () => {
        if (student && student.transport) {
            const fetchedTransport = student.transport;
            setTransportData({
                transportid: fetchedTransport.transportid || '',
                transportstatus: fetchedTransport.transportstatus || '',
                pickuppoint: fetchedTransport.pickuppoint || '',
                droppoint: fetchedTransport.droppoint || '',
                modetransport: fetchedTransport.modetransport || '',
                busnumber: fetchedTransport.busnumber || '',
                busroute: fetchedTransport.busroute || '',
                drivername: fetchedTransport.drivername || '',
                supervisorname: fetchedTransport.supervisorname || '',
                contactdetails: fetchedTransport.contactdetails || '', // ⬅️ MAPPING NEW FIELD
            });
        } else {
             setTransportData({
                transportid: '', transportstatus: '', pickuppoint: '', droppoint: '', modetransport: '',
                busnumber: '', busroute: '', drivername: '', supervisorname: '', contactdetails: '',
             });
        }
        setNotification({ type: '', message: '' });
        console.log('🔄 Form reset.');
    };

     // --- Check if bus details should be visible ---
    const isBusTransport = transportData.transportstatus === 'yes' && transportData.modetransport === 'bus';


    if (!student) {
        return (
            <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex justify-center items-center">
                 <p className="text-gray-600">Loading student transport data...</p>
            </div>
        );
    }

    // --- Render the component ---
    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">

                {/* --- Notification Area --- */}
                 {notification.message && (
                    <div className={`p-3 mb-4 rounded-lg text-center ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {notification.message}
                    </div>
                )}

                {/* Header */}
                <div className="bg-white rounded-t-lg border-2 border-blue-500">
                    <h1 className="text-xl md:text-2xl font-semibold text-center py-4 px-4 text-gray-800">
                        Transport Management
                    </h1>
                </div>

                {/* Form Table */}
                <div className="bg-white border-l-2 border-r-2 border-b-2 border-blue-500 rounded-b-lg overflow-hidden">
                    <div className="divide-y-2 divide-blue-500">

                        {/* 1. Transport Status */}
                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
                            <div className="p-4 md:p-6 bg-gray-50 flex items-center">
                                <label className="text-base md:text-lg font-medium text-gray-700">
                                    Transport Status <span className="text-red-500">*</span>
                                </label>
                            </div>
                            <div className="p-4 md:p-6">
                                <select
                                    value={transportData.transportstatus}
                                    onChange={handleInputChange}
                                    name="transportstatus" 
                                    className="w-full text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    disabled={isViewMode}
                                >
                                    <option value="">Select Status</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            
                        </div>

                        {/* 2. Mode of Transport */}
                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
                            <div className="p-4 md:p-6 bg-gray-50 flex items-center">
                                <label className="text-base md:text-lg font-medium text-gray-700">
                                    Mode of Transport
                                </label>
                            </div>
                            <div className="p-4 md:p-6">
                                <select
                                    value={transportData.modetransport}
                                    onChange={handleInputChange}
                                    name="modetransport" 
                                    className="w-full text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    disabled={isViewMode} // 🟢 DISABLED IN VIEW MODE
                                >
                                    <option value="">Select Mode</option>
                                    <option value="bus">Bus</option>
                                    <option value="van">Van</option>
                                    <option value="rickshaw">Rickshaw</option>
                                    <option value="self">Self</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* 3. Pickup Location */}
                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
                            <div className="p-4 md:p-6 bg-gray-50 flex items-center">
                                <label className="text-base md:text-lg font-medium text-gray-700">
                                    Pickup Location
                                </label>
                            </div>
                            <div className="p-4 md:p-6">
                                <input
                                    type="text"
                                    value={transportData.pickuppoint}
                                    onChange={handleInputChange}
                                    name="pickuppoint" 
                                    className="w-full border-0 outline-none text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2"
                                    placeholder="Enter pickup location"
                                    disabled={isViewMode} // 🟢 DISABLED IN VIEW MODE
                                />
                            </div>
                        </div>

                        {/* 4. Drop Location */}
                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
                            <div className="p-4 md:p-6 bg-gray-50 flex items-center">
                                <label className="text-base md:text-lg font-medium text-gray-700">
                                    Drop Location
                                </label>
                            </div>
                            <div className="p-4 md:p-6">
                                <input
                                    type="text"
                                    value={transportData.droppoint}
                                    onChange={handleInputChange}
                                    name="droppoint" 
                                    className="w-full border-0 outline-none text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2"
                                    placeholder="Enter drop location"
                                    disabled={isViewMode} // 🟢 DISABLED IN VIEW MODE
                                />
                            </div>
                        </div>

                        {/* --- NEW FIELDS: Conditionally displayed for Bus (Contact details added back) --- */}
                        {isBusTransport && (
                            <React.Fragment> 
                                {/* 5. Bus Number */}
                                <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
                                    <div className="p-4 md:p-6 bg-gray-50 flex items-center">
                                        <label className="text-base md:text-lg font-medium text-gray-700">
                                            Bus Number <span className="text-red-500">*</span>
                                        </label>
                                    </div>
                                    <div className="p-4 md:p-6">
                                        <input
                                            type="text"
                                            name="busnumber"
                                            value={transportData.busnumber}
                                            onChange={handleInputChange}
                                            className="w-full border-0 outline-none text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2"
                                            placeholder="Enter Bus Number"
                                            disabled={isViewMode} // 🟢 DISABLED IN VIEW MODE
                                            required 
                                        />
                                    </div>
                                </div>
                                {/* 6. Bus Route */}
                                <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
                                    <div className="p-4 md:p-6 bg-gray-50 flex items-center">
                                        <label className="text-base md:text-lg font-medium text-gray-700">
                                            Bus Route
                                        </label>
                                    </div>
                                    <div className="p-4 md:p-6">
                                        <input
                                            type="text"
                                            name="busroute"
                                            value={transportData.busroute}
                                            onChange={handleInputChange}
                                            className="w-full border-0 outline-none text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2"
                                            placeholder="Enter Bus Route details"
                                            disabled={isViewMode} // 🟢 DISABLED IN VIEW MODE
                                        />
                                    </div>
                                </div>
                                {/* 7. Driver Name */}
                                <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
                                    <div className="p-4 md:p-6 bg-gray-50 flex items-center">
                                        <label className="text-base md:text-lg font-medium text-gray-700">
                                            Driver Name <span className="text-red-500">*</span>
                                        </label>
                                    </div>
                                    <div className="p-4 md:p-6">
                                        <input
                                            type="text"
                                            name="drivername"
                                            value={transportData.drivername}
                                            onChange={handleInputChange}
                                            className="w-full border-0 outline-none text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2"
                                            placeholder="Enter Driver's Name"
                                            disabled={isViewMode} // 🟢 DISABLED IN VIEW MODE
                                            required
                                        />
                                    </div>
                                </div>
                                {/* 8. Supervisor Name */}
                                <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
                                    <div className="p-4 md:p-6 bg-gray-50 flex items-center">
                                        <label className="text-base md:text-lg font-medium text-gray-700">
                                            Supervisor Name
                                        </label>
                                    </div>
                                    <div className="p-4 md:p-6">
                                        <input
                                            type="text"
                                            name="supervisorname"
                                            value={transportData.supervisorname}
                                            onChange={handleInputChange}
                                            className="w-full border-0 outline-none text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2"
                                            placeholder="Enter Supervisor's Name"
                                            disabled={isViewMode} // 🟢 DISABLED IN VIEW MODE
                                        />
                                    </div>
                                </div>
                                {/* 9. Contact Details (The generic field seen in successful DB saves) */}
                                <div className="grid grid-cols-1 md:grid-cols-2 divide-y-2 md:divide-y-0 md:divide-x-2 divide-blue-500">
                                    <div className="p-4 md:p-6 bg-gray-50 flex items-center">
                                        <label className="text-base md:text-lg font-medium text-gray-700">
                                            Supervisor Contact Details 
                                        </label>
                                    </div>
                                    <div className="p-4 md:p-6">
                                        <input
                                            type="text"
                                            name="contactdetails"
                                            value={transportData.contactdetails}
                                            onChange={handleInputChange}
                                            maxLength="10"
                                            className="w-full border-0 outline-none text-base md:text-lg bg-transparent border border-gray-300 rounded px-3 py-2"
                                            placeholder="Enter 10-digit number"
                                            disabled={isViewMode} // 🟢 DISABLED IN VIEW MODE
                                        />
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                        {/* --- END NEW FIELDS --- */}

                    </div>
                </div>

                {/* Action Buttons */}
                {!isViewMode && ( // 🟢 HIDING BUTTONS IN VIEW MODE
                    <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : 'Save Details'}
                        </button>
                        <button
                            onClick={handleReset}
                            type="button"
                            disabled={isLoading}
                            className="px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                        >
                            Reset Form
                        </button>
                    </div>
                )}
                </div>
            </div>
//         </div>
    );
}