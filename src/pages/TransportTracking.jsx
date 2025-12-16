// import React, { useState } from "react";
// import MainLayout from "../layout/MainLayout";

// const dummyData = [
//   { route: "Route 1", from: "Stop A", to: "Stop B", vehicle: "MH12AB1234" },
//   { route: "Route 2", from: "Stop C", to: "Stop D", vehicle: "MH14XY5678" },
//   { route: "Route 3", from: "Stop E", to: "Stop F", vehicle: "MH13QW1122" },
//   { route: "Route 4", from: "Stop G", to: "Stop H", vehicle: "MH15ZX3344" },
// ];

// const TransportTracking = () => {
//   const [search, setSearch] = useState("");

//   const filteredData = dummyData.filter(
//     (item) =>
//       `${item.route} ${item.from} ${item.to} ${item.vehicle}`
//         .toLowerCase()
//         .includes(search.toLowerCase())
//   );

//   return (
//     <MainLayout>
//          <div className="bg-white rounded-2xl shadow p-6">
//       <div className="p-4 space-y-6">
//         {/* Search Bar - Left aligned */}
//         <div className="flex justify-start">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="border px-4 py-2 rounded w-full max-w-md"
//           />
//         </div>

//         {/* Title - Centered */}
//         <div className="flex justify-center">
//           <h2 className="text-2xl font-semibold">Track Vehicles</h2>
//         </div>

//         {/* Cards */}
//         <div className="space-y-4">
//           {filteredData.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white shadow-md rounded flex items-center justify-between px-4 py-3"
//             >
//               {/* Left: Circle + Route Info */}
//               <div className="flex items-center gap-4">
//                 <div className="w-14 h-14 bg-[#0E83B2] rounded-full"></div>
//                 <div>
//                   <div className="font-semibold">{item.route}</div>
//                   <div className="text-sm">
//                     From: {item.from} &nbsp;&nbsp;&nbsp; To: {item.to}
//                   </div>
//                 </div>
//               </div>

//               {/* Right: Vehicle No. + Track Link */}
//               <div className="text-right space-y-1">
//                 <div className="font-medium">
//                   Vehicle no:{" "}
//                   <span className="font-semibold">{item.vehicle}</span>
//                 </div>
//                 <div className="text-blue-600 font-semibold cursor-pointer hover:underline">
//                   Track
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default TransportTracking;











import React, { useState, useEffect, useCallback } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin, faTruckMoving, faTimes, faLocationArrow, faBusSimple } from "@fortawesome/free-solid-svg-icons"; 

// --- MODAL COMPONENT (Reused for general purpose) ---
const Modal = ({ isOpen, onClose, title, children, size = 'lg' }) => {
  if (!isOpen) return null;

  const maxWidthClass = size === 'lg' ? 'max-w-2xl' : size === 'xl' ? 'max-w-4xl' : size === 'sm' ? 'max-w-md' : 'max-w-md';

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: 'rgba(50, 50, 50, 0.5)',
      }}>
      <div className={`bg-white rounded-lg p-6 w-full ${maxWidthClass} mx-4 max-h-[90vh] overflow-y-auto shadow-2xl`}>
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};


// --- UPDATED COMPONENT: Tracking Modal (Simulated Map View) ---
const TrackingModal = ({ isOpen, onClose, vehicle }) => {
    if (!isOpen || !vehicle) return null;

    // Simulate route points and current location
    const simulatedStart = vehicle.routeName.split(',')[0].trim() || 'Start Point';
    const simulatedEnd = vehicle.routeName.split(',').pop().trim() || 'End Point';
    const simulatedCurrentLocation = '(current location)';

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            title={`Live Tracking: ${vehicle.vehicleNumber} `}
            size="xl" // Wider modal to fit the map view
        >
            <div className="space-y-6">
                
                {/* Vehicle & Staff Details Header */}
                <div className="bg-blue-50 p-4 rounded-lg space-y-2 text-sm">
                    <div className="font-semibold text-gray-800">Vehicle: <span className="font-bold">{vehicle.vehicleName} ({vehicle.vehicleNumber})</span></div>
                    <div className="text-gray-700">Driver: {vehicle.driver} {vehicle.driverContact ? `(${vehicle.driverContact})` : ''}</div>
                    <div className="text-gray-700">Routes: {vehicle.routeName}</div>
                </div>

                {/* Simulated Map Container */}
                <div className="relative w-full h-[400px] border border-gray-400 rounded-lg shadow-xl overflow-hidden bg-gray-100">
                    
                    {/* Simulated Map Background */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 text-xl font-light bg-blue-100/50">
                        <span className="mb-2">GPS Map Simulation</span>
                        <FontAwesomeIcon icon={faLocationArrow} className="text-blue-500 text-4xl animate-pulse"/>
                    </div>

                    {/* Simulated Route Pins and Vehicle Icon */}
                    <div className="absolute top-4 left-4 right-4 bg-white/90 p-3 rounded-lg shadow-md border-2 border-green-500 z-10">
                        <div className="flex justify-between items-center text-sm font-semibold">
                            <span className="flex items-center text-green-700">
                                <FontAwesomeIcon icon={faMapPin} className="text-green-500 mr-2"/>
                                START: {simulatedStart}
                            </span>
                            <span className="flex items-center text-red-700">
                                END: {simulatedEnd}
                                <FontAwesomeIcon icon={faMapPin} className="text-red-500 ml-2"/>
                            </span>
                        </div>
                    </div>

                    {/* Simulated Vehicle Indicator (Central on map) */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                        <FontAwesomeIcon icon={faBusSimple} className="text-yellow-500 text-5xl border-4 border-black rounded-full p-1 shadow-2xl"/>
                    </div>
                </div>
                
                {/* Status Footer */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Current Location:</span>
                    <span className="font-bold text-green-600 flex items-center gap-1">
                        <FontAwesomeIcon icon={faMapPin} className="text-red-500"/> {simulatedCurrentLocation}
                    </span>
                </div>
                
                <div className="flex justify-end pt-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Close Tracking
                    </button>
                </div>
            </div>
        </Modal>
    );
};

// --- HELPER FUNCTION: Get Name and Contact from ID (Reused) ---
const getNameAndContactFromId = (id, list, idKey, nameKey, contactKey) => {
    if (!id) return { name: 'Unassigned', contact: '' }; 
    const idString = id.toString();
    const item = list.find(item => item[idKey]?.toString() === idString); 
    
    let contact = '';
    if (item) {
        // Checking common contact key names
        contact = item[contactKey] || item.primarycontact || item.contactdetails || item.contactNo || '';
    }

    return {
        name: item ? item[nameKey] : 'Unassigned',
        contact: contact
    };
};

const TransportTracking = () => {
    const [search, setSearch] = useState("");
    const [routes, setRoutes] = useState([]);
    const [vehicles, setVehicles] = useState([]); 
    const [allDrivers, setAllDrivers] = useState([]); 
    const [allSupervisors, setAllSupervisors] = useState([]); 
    const [studentRoutes, setStudentRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Tracking Modal State
    const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
    const [trackingVehicle, setTrackingVehicle] = useState(null);

    const headers = { auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=" };

    // --- Data Fetching Logic (Identical to TransportRoutes) ---
    const fetchAllData = useCallback(async () => {
        setLoading(true);
        try {
            const [driversRes, supervisorsRes, routesRes, vehiclesRes, studentRoutesRes] = await Promise.all([
                axios.get(`${API_BASE_URL}api/drivers`, { headers }),
                axios.get(`${API_BASE_URL}api/vsupervisior`, { headers }),
                axios.get(`${API_BASE_URL}api/routes`, { headers }),
                axios.get(`${API_BASE_URL}api/vehicles`, { headers }),
                axios.get(`${API_BASE_URL}api/students-route`, { headers }),
            ]);
            
            setAllDrivers(driversRes.data.data || driversRes.data || []); 
            setAllSupervisors(supervisorsRes.data.data || supervisorsRes.data || []);
            setRoutes(routesRes.data || []); 
            setVehicles(vehiclesRes.data.data || []);
            setStudentRoutes(studentRoutesRes.data || []); 
            setLoading(false);

        } catch (error) {
            console.error("Error fetching transport data:", error);
            setLoading(false);
        }
    }, []);
    
    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    // --- Data Processing for Table ---
    const combinedTableData = vehicles
        .filter(v => (v.assignedRouteId && v.assignedRouteId.length > 0) || v.assignedDriverId || v.assignedSupervisorId)
        .map(vehicle => {
        
        const assignedRouteIds = Array.isArray(vehicle.assignedRouteId) ? vehicle.assignedRouteId : [];
        const assignedRouteObjects = routes.filter(r => assignedRouteIds.includes(r._id));
        const assignedRouteNames = assignedRouteObjects.map(r => r.routeName);
        
        const studentCount = studentRoutes.filter(sa => assignedRouteNames.includes(sa.routeName)).length;
        
        let routeNameDisplay = 'No Route';
        if (assignedRouteIds.length > 0) {
             routeNameDisplay = assignedRouteObjects.map(r => r.routeName).join(', ');
        }
        
        // --- Fetch Driver and Supervisor Details (Name + Contact) ---
        const driverDetails = getNameAndContactFromId(
            vehicle.assignedDriverId, 
            allDrivers, 
            '_id', 
            'driverName', 
            'contactNo'
        );
        
        const supervisorDetails = getNameAndContactFromId(
            vehicle.assignedSupervisorId, 
            allSupervisors, 
            '_id', 
            'fullName', 
            'contactNo' 
        );

        return { 
            _id: vehicle._id, 
            vehicleNumber: vehicle.vehicleno,
            vehicleName: vehicle.vehiclename, 
            vehicleType: vehicle.type,       
            status: vehicle.status,
            capacity: vehicle.capacity,
            
            driver: driverDetails.name,
            driverContact: driverDetails.contact,
            supervisor: supervisorDetails.name,
            supervisorContact: supervisorDetails.contact,
            
            routeName: routeNameDisplay, 
            studentCount,
            capacity: vehicle.capacity 
        };
    });

    const filteredData = combinedTableData.filter(
        (item) =>
            `${item.vehicleNumber} ${item.vehicleName} ${item.driver} ${item.supervisor} ${item.routeName} ${item.driverContact} ${item.supervisorContact}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // --- New Tracking Handler ---
    const handleTrackClick = (vehicleData) => {
        setTrackingVehicle(vehicleData);
        setIsTrackingModalOpen(true);
    };
    
    if (loading) {
        return (
             <MainLayout>
                <div className="bg-white rounded-2xl shadow p-6 text-center text-gray-600">
                    Loading Transport Data...
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="bg-white rounded-2xl shadow p-6">
                <div className="p-4 space-y-6">
                    {/* Search Bar - Left aligned */}
                    <div className="flex justify-start">
                        <input
                            type="text"
                            placeholder="Search route, vehicle, driver, or supervisor..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border px-4 py-2 rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Title - Centered */}
                    <div className="flex justify-center">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                            Live Vehicle Tracking
                        </h2>
                    </div>

                    {/* Table View */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 text-center rounded text-sm sm:text-base">
                            <thead className="bg-blue-100 text-black">
                                <tr>
                                    <th className="px-4 py-2 border">Vehicle Number</th>
                                    <th className="px-4 py-2 border">Vehicle Name</th>
                                    <th className="px-4 py-2 border">Vehicle Type</th>
                                    <th className="px-4 py-2 border">Status</th>
                                    <th className="px-4 py-2 border">Driver</th>
                                    <th className="px-4 py-2 border">Supervisor</th>
                                    <th className="px-4 py-2 border">Routes</th>
                                    <th className="px-4 py-2 border">No. of Students</th>
                                    <th className="px-4 py-2 border">View</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {filteredData.length > 0 ? (
                                    filteredData.map((item) => (
                                        <tr key={item._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border">{item.vehicleNumber}</td>
                                            <td className="px-4 py-2 border">{item.vehicleName || "N/A"}</td>
                                            <td className="px-4 py-2 border">{item.vehicleType || "N/A"}</td>
                                            <td className="px-4 py-2 border">
                                                 <span
                                                    className={`px-2 py-1 rounded text-xs font-medium ${
                                                        item.status?.toLowerCase() === "active"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                    }`}
                                                >
                                                    {item.status || "Unknown"}
                                                </span>
                                            </td>
                                            {/* Driver Cell */}
                                            <td className="px-4 py-2 border text-left">
                                                <div className="font-medium text-gray-800">{item.driver}</div>
                                                {item.driverContact && (
                                                    <div className="text-xs text-gray-500">
                                                        {item.driverContact}
                                                    </div>
                                                )}
                                            </td>
                                            {/* Supervisor Cell */}
                                            <td className="px-4 py-2 border text-left">
                                                <div className="font-medium text-gray-800">{item.supervisor}</div>
                                                {item.supervisorContact && (
                                                    <div className="text-xs text-gray-500">
                                                        {item.supervisorContact}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-2 border">{item.routeName}</td>
                                            <td className="px-4 py-2 border">{item.studentCount}</td>
                                            <td className="px-4 py-2 border">
                                                <div
                                                    onClick={() => handleTrackClick(item)}
                                                    className="text-blue-600 font-semibold cursor-pointer hover:underline flex items-center justify-center gap-1"
                                                >
                                                     <FontAwesomeIcon icon={faMapPin} className="text-sm"/> Track
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="py-4 text-gray-500">
                                            No assigned vehicles found matching your criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* GPS Tracking Modal */}
            <TrackingModal
                isOpen={isTrackingModalOpen}
                onClose={() => setIsTrackingModalOpen(false)}
                vehicle={trackingVehicle}
            />
        </MainLayout>
    );
};

export default TransportTracking;