// import React, { useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import AddVehicleModal from "../components/AddVehicleModal";
// import { useEffect } from "react";
// import axios from 'axios'

// const TransportVehicle = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [vehicleData, setVehicleData] = useState([])
//   const [formData, setFormData] = useState({
//     vid: Date.now(), 
//     vehiclename: "",
//     capacity: "",
//     regno: "",
//     // assignedroute: "",
//     vehicleno: "",
//     status: "active",
//   });

//   const handleSave = async () => {
//   try {
//     console.log(formData)
//     const response = await axios.post('http://localhost:5000/api/add-vehicle', formData, {
//       headers: {
//         auth: 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
//       },
//     });
//     console.log(formData)
//     console.log("Vehicle saved:", response.data); 
//     setShowModal(false);
//     setFormData({
//       vehiclename: "",
//       capacity: "",
//       regno: "",
//       // assignedroute: "",
//       vehicleno: "",
//       status: "",
//     });
//   } catch (error) {
//     console.error("Error saving vehicle:", error.response?.data || error.message);
//   }
// };

//  useEffect(() => {
//   const fetchVehicles = async () => {
//     try {
//       const response = await axios.get('https://sspd-school-portal.vercel.app/api/vehicles', {
//         headers: {
//           'auth': 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
//         }
//       });
//       console.log('Received data: ', response.data);
//       setVehicleData(response.data);
//     } catch (error) {
//       console.error("Error fetching vehicles:", error);
//     }
//   };

//   fetchVehicles();
// }, []);

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6 space-y-6">
//           {/* Top */}
//           <div className="flex justify-between items-center">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="border px-3 py-2 rounded-md w-64"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button
//               onClick={() => setShowModal(true)}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Add
//             </button>
//           </div>

//           {/* Title */}
//           <h2 className="text-center text-2xl font-semibold">
//             Vehicle Management
//           </h2>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-300 rounded text-center">
//               <thead className="bg-blue-100 text-black">
//                 <tr>
//                   <th className="px-4 py-2 border">Vehicle Number</th>
//                   <th className="px-4 py-2 border">Vehicle Name</th>
//                   <th className="px-4 py-2 border">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white">
//                 {vehicleData
//                   .filter((v) =>
//                     v.vehicleno.toLowerCase().includes(searchQuery.toLowerCase())
//                   )
//                   .map((vehicle, idx) => (
//                     <tr key={idx}>
//                       <td className="px-4 py-2 border">{vehicle.vehicleno}</td>
//                       <td className="px-4 py-2 border">{vehicle.vehiclename}</td>
//                       <td className="px-4 py-2 border">{vehicle.status}</td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <AddVehicleModal
//           show={showModal}
//           onClose={() => setShowModal(false)}
//           onSave={handleSave}
//           formData={formData}
//           setFormData={setFormData}
//         />
//       </div>
//     </MainLayout>
//   );
// };

// export default TransportVehicle;

// import React, { useState } from "react";
// import MainLayout from "../layout/MainLayout";
// import AddVehicleModal from "../components/AddVehicleModal";
// import { useEffect } from "react";
// import axios from 'axios'

// // Define the base URL for your local backend API
// const LOCAL_API_BASE_URL = "http://localhost:5000/api";

// const TransportVehicle = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [vehicleData, setVehicleData] = useState([])
//   const [formData, setFormData] = useState({
//     vid: Date.now(), 
//     vehiclename: "",
//     capacity: "",
//     regno: "",
//     // assignedroute: "",
//     vehicleno: "",
//     status: "active",
//   });

//   const handleSave = async () => {
//   try {
//     console.log(formData)
//     // CRITICAL FIX 1: Submit new vehicle to local backend
//     const response = await axios.post(`${LOCAL_API_BASE_URL}/add-vehicle`, formData, {
//       headers: {
//         auth: 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
//       },
//     });
//     console.log(formData)
//     console.log("Vehicle saved:", response.data); 
//     setShowModal(false);
//     setFormData({
//       vehiclename: "",
//       capacity: "",
//       regno: "",
//       // assignedroute: "",
//       vehicleno: "",
//       status: "",
//     });
//   } catch (error) {
//     console.error("Error saving vehicle:", error.response?.data || error.message);
//   }
// };

//  useEffect(() => {
//   const fetchVehicles = async () => {
//     try {
//       // CRITICAL FIX 2: Fetch vehicles from local backend
//       const response = await axios.get(`${LOCAL_API_BASE_URL}/vehicles`, {
//         headers: {
//           'auth': 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
//         }
//       });
//       console.log('Received data: ', response.data);
//       setVehicleData(response.data);
//     } catch (error) {
//       console.error("Error fetching vehicles:", error);
//     }
//   };

//   fetchVehicles();
// }, []);

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6 space-y-6">
//           {/* Top */}
//           <div className="flex justify-between items-center">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="border px-3 py-2 rounded-md w-64"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button
//               onClick={() => setShowModal(true)}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Add
//             </button>
//           </div>

//           {/* Title */}
//           <h2 className="text-center text-2xl font-semibold">
//             Vehicle Management
//           </h2>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="min-w-full border border-gray-300 rounded text-center">
//               <thead className="bg-blue-100 text-black">
//                 <tr>
//                   <th className="px-4 py-2 border">Vehicle Number</th>
//                   <th className="px-4 py-2 border">Vehicle Name</th>
//                   <th className="px-4 py-2 border">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white">
//                 {vehicleData
//                   .filter((v) =>
//                     v.vehicleno.toLowerCase().includes(searchQuery.toLowerCase())
//                   )
//                   .map((vehicle, idx) => (
//                     <tr key={idx}>
//                       <td className="px-4 py-2 border">{vehicle.vehicleno}</td>
//                       <td className="px-4 py-2 border">{vehicle.vehiclename}</td>
//                       <td className="px-4 py-2 border">{vehicle.status}</td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <AddVehicleModal
//           show={showModal}
//           onClose={() => setShowModal(false)}
//           onSave={handleSave}
//           formData={formData}
//           setFormData={setFormData}
//         />
//       </div>
//     </MainLayout>
//   );
// };
// export default TransportVehicle;

import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import AddVehicleModal from "../components/AddVehicleModal";
import { useEffect } from "react";
import axios from 'axios'
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config";

// Define the base URL for your local backend API
// const LOCAL_API_BASE_URL = "http://localhost:5000/api"; // REMOVED

const TransportVehicle = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [vehicleData, setVehicleData] = useState([])
  const [formData, setFormData] = useState({
    vid: Date.now(), 
    vehiclename: "",
    capacity: "",
    regno: "",
    // assignedroute: "",
    vehicleno: "",
    status: "active",
  });

  const handleSave = async () => {
  try {
    console.log(formData)
    // FIX 1: Submit new vehicle using imported API_BASE_URL
    const response = await axios.post(`${API_BASE_URL}api/add-vehicle`, formData, {
      headers: {
        auth: 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
      },
    });
    console.log(formData)
    console.log("Vehicle saved:", response.data); 
    setShowModal(false);
    setFormData({
      vehiclename: "",
      capacity: "",
      regno: "",
      // assignedroute: "",
      vehicleno: "",
      status: "",
    });
  } catch (error) {
    console.error("Error saving vehicle:", error.response?.data || error.message);
  }
};

 useEffect(() => {
  const fetchVehicles = async () => {
    try {
      // FIX 2: Fetch vehicles using imported API_BASE_URL
      const response = await axios.get(`${API_BASE_URL}api/vehicles`, {
        headers: {
          'auth': 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='
        }
      });
      console.log('Received data: ', response.data);
      setVehicleData(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  fetchVehicles();
}, []);

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="p-6 space-y-6">
          {/* Top */}
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search..."
              className="border px-3 py-2 rounded-md w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          {/* Title */}
          <h2 className="text-center text-2xl font-semibold">
            Vehicle Management
          </h2>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded text-center">
              <thead className="bg-blue-100 text-black">
                <tr>
                  <th className="px-4 py-2 border">Vehicle Number</th>
                  <th className="px-4 py-2 border">Vehicle Name</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {vehicleData
                  .filter((v) =>
                    v.vehicleno.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((vehicle, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2 border">{vehicle.vehicleno}</td>
                      <td className="px-4 py-2 border">{vehicle.vehiclename}</td>
                      <td className="px-4 py-2 border">{vehicle.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <AddVehicleModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </MainLayout>
  );
};
export default TransportVehicle;