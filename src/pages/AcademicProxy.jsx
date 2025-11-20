// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import MainLayout from "../layout/MainLayout";
// import SelectField from "../components/SelectField";
// import PublishProxyModal from "../components/PublishProxyModal";

// const AcademicProxy = () => {
//   const [staffSearch, setStaffSearch] = useState("");
//   const [selectedStd, setSelectedStd] = useState("");
//   const [selectedDiv, setSelectedDiv] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);

//   // Modal states
//   const [modalStd, setModalStd] = useState("");
//   const [modalDiv, setModalDiv] = useState("");
//   const [modalDate, setModalDate] = useState("");
//   const [modalLecNo, setModalLecNo] = useState("");
//   const [modalSubject, setModalSubject] = useState("");
//   const [modalFromTeacher, setModalFromTeacher] = useState("");
//   const [modalToTeacher, setModalToTeacher] = useState("");

//   // Dynamic Data
//   const [subjectOptions, setSubjectOptions] = useState([]);
//   const [teacherOptions, setTeacherOptions] = useState([]);
//   const [proxyList, setProxyList] = useState([]);

//   const days = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];

//   // 🔹 Fetch staff list from backend
//   useEffect(() => {
//     const fetchStaff = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/staff", {
//           headers: {
//             auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//           },
//         });

//         const staffArray = Array.isArray(res.data) ? res.data : [];
//         const formattedStaff = staffArray.map((s) => ({
//           label: `${s.firstname} ${s.lastname}`,
//           value: s._id,
//         }));

//         setTeacherOptions(formattedStaff);
//       } catch (err) {
//         console.error("Error fetching staff:", err);
//       }
//     };

//     fetchStaff();
//   }, []);

//   // 🔹 Fetch proxy list
//   useEffect(() => {
//     const fetchProxies = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/proxies", {
//           headers: {
//             auth: `ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=`,
//           },
//         });

//         const proxyArray = Array.isArray(res.data) ? res.data : [];
//         setProxyList(proxyArray);
//       } catch (err) {
//         console.error("Error fetching proxies:", err);
//       }
//     };

//     fetchProxies();
//   }, []);

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6 space-y-6">
//           {/* Top bar */}
//           <div className="flex justify-between items-center">
//             <input
//               type="text"
//               value={staffSearch}
//               onChange={(e) => setStaffSearch(e.target.value)}
//               placeholder="Search Staff..."
//               className="border px-3 py-2 rounded-md w-64"
//             />
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-700"
//               onClick={() => setModalOpen(true)}
//             >
//               Publish
//             </button>
//           </div>

//           {/* Dropdowns */}
//           <div className="flex gap-6">
//             <div className="w-64">
//               <select
//                 className="w-full border px-3 py-2 rounded-md"
//                 value={selectedStd}
//                 onChange={(e) => setSelectedStd(e.target.value)}
//               >
//                 <option value="">Select Standard</option>
//                 {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(
//                   (std) => (
//                     <option key={std} value={std}>
//                       {std}
//                     </option>
//                   )
//                 )}
//               </select>
//             </div>
//             <div className="w-64">
//               <select
//                 className="w-full border px-3 py-2 rounded-md"
//                 value={selectedDiv}
//                 onChange={(e) => setSelectedDiv(e.target.value)}
//               >
//                 <option value="">Select Division</option>
//                 {["A", "B", "C"].map((div) => (
//                   <option key={div} value={div}>
//                     {div}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Header */}
//           <h2 className="text-center text-2xl font-semibold">
//             Proxy Management
//           </h2>

//           {/* Table */}
//           <div className="overflow-x-auto mt-4">
//             <table className="min-w-full border border-gray-300 rounded">
//               <thead className="bg-blue-100 text-black">
//                 <tr>
//                   {days.map((day, index) => (
//                     <th key={index} className="px-4 py-2 border text-center">
//                       {day}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="bg-white">
//                 {proxyList.length > 0 ? (
//                   proxyList.map((proxy, idx) => (
//                     <tr key={idx}>
//                       {days.map((day, dIdx) => {
//                         const proxyDay = new Date(proxy.date).toLocaleDateString(
//                           "en-US",
//                           { weekday: "long" }
//                         );
//                         return (
//                           <td
//                             key={dIdx}
//                             className="px-4 py-2 border text-center"
//                           >
//                             {proxyDay === day
//                               ? `${proxy.subject} (Lec ${proxy.lecno})`
//                               : "-"}
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     {days.map((_, index) => (
//                       <td
//                         key={index}
//                         className="px-4 py-6 border text-center text-gray-500"
//                       >
//                         -
//                       </td>
//                     ))}
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Modal */}
//           <PublishProxyModal
//             isOpen={modalOpen}
//             onClose={() => setModalOpen(false)}
//             standard={modalStd}
//             setStandard={setModalStd}
//             division={modalDiv}
//             setDivision={setModalDiv}
//             date={modalDate}
//             setDate={setModalDate}
//             lecNo={modalLecNo}
//             setLecNo={setModalLecNo}
//             subject={modalSubject}
//             setSubject={setModalSubject}
//             fromTeacher={modalFromTeacher}
//             setFromTeacher={setModalFromTeacher}
//             toTeacher={modalToTeacher}
//             setToTeacher={setModalToTeacher}
//             subjectOptions={subjectOptions}
//             teacherOptions={teacherOptions}
//           />
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default AcademicProxy;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import MainLayout from "../layout/MainLayout";
// import SelectField from "../components/SelectField";
// import PublishProxyModal from "../components/PublishProxyModal";
// // --- Import the API Base URL from the config file (Assumed Import) ---
// import { API_BASE_URL } from '../config'; 

// const AcademicProxy = () => {
//   const [staffSearch, setStaffSearch] = useState("");
//   const [selectedStd, setSelectedStd] = useState("");
//   const [selectedDiv, setSelectedDiv] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);

//   // Modal states
//   const [modalStd, setModalStd] = useState("");
//   const [modalDiv, setModalDiv] = useState("");
//   const [modalDate, setModalDate] = useState("");
//   const [modalLecNo, setModalLecNo] = useState("");
//   const [modalSubject, setModalSubject] = useState("");
//   const [modalFromTeacher, setModalFromTeacher] = useState("");
//   const [modalToTeacher, setModalToTeacher] = useState("");

//   // Dynamic Data
//   const [subjectOptions, setSubjectOptions] = useState([]);
//   const [teacherOptions, setTeacherOptions] = useState([]);
//   const [proxyList, setProxyList] = useState([]);

//   const days = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];

//   const AUTH_HEADER = 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='; 

//   // 🔹 Fetch staff list from backend
//   useEffect(() => {
//     const fetchStaff = async () => {
//       try {
//         // FIX 1: Using imported API_BASE_URL
//         const res = await axios.get(`${API_BASE_URL}api/staff`, {
//           headers: {
//             auth: AUTH_HEADER,
//           },
//         });

//         const staffArray = Array.isArray(res.data) ? res.data : [];
//         const formattedStaff = staffArray.map((s) => ({
//           label: `${s.firstname} ${s.lastname}`,
//           value: s._id,
//         }));

//         setTeacherOptions(formattedStaff);
//       } catch (err) {
//         console.error("Error fetching staff:", err);
//       }
//     };

//     fetchStaff();
//   }, []);

//   // 🔹 Fetch proxy list
//   useEffect(() => {
//     const fetchProxies = async () => {
//       try {
//         // FIX 2: Using imported API_BASE_URL
//         const res = await axios.get(`${API_BASE_URL}api/proxies`, {
//           headers: {
//             auth: AUTH_HEADER,
//           },
//         });

//         const proxyArray = Array.isArray(res.data) ? res.data : [];
//         setProxyList(proxyArray);
//       } catch (err) {
//         console.error("Error fetching proxies:", err);
//       }
//     };

//     fetchProxies();
//   }, []);

//   return (
//     <MainLayout>
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="p-6 space-y-6">
//           {/* Top bar */}
//           <div className="flex justify-between items-center">
//             <input
//               type="text"
//               value={staffSearch}
//               onChange={(e) => setStaffSearch(e.target.value)}
//               placeholder="Search Staff..."
//               className="border px-3 py-2 rounded-md w-64"
//             />
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-700"
//               onClick={() => setModalOpen(true)}
//             >
//               Publish
//             </button>
//           </div>

//           {/* Dropdowns */}
//           <div className="flex gap-6">
//             <div className="w-64">
//               <select
//                 className="w-full border px-3 py-2 rounded-md"
//                 value={selectedStd}
//                 onChange={(e) => setSelectedStd(e.target.value)}
//               >
//                 <option value="">Select Standard</option>
//                 {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(
//                   (std) => (
//                     <option key={std} value={std}>
//                       {std}
//                     </option>
//                   )
//                 )}
//               </select>
//             </div>
//             <div className="w-64">
//               <select
//                 className="w-full border px-3 py-2 rounded-md"
//                 value={selectedDiv}
//                 onChange={(e) => setSelectedDiv(e.target.value)}
//               >
//                 <option value="">Select Division</option>
//                 {["A", "B", "C"].map((div) => (
//                   <option key={div} value={div}>
//                     {div}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Header */}
//           <h2 className="text-center text-2xl font-semibold">
//             Proxy Management
//           </h2>

//           {/* Table */}
//           <div className="overflow-x-auto mt-4">
//             <table className="min-w-full border border-gray-300 rounded">
//               <thead className="bg-blue-100 text-black">
//                 <tr>
//                   {days.map((day, index) => (
//                     <th key={index} className="px-4 py-2 border text-center">
//                       {day}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="bg-white">
//                 {proxyList.length > 0 ? (
//                   proxyList.map((proxy, idx) => (
//                     <tr key={idx}>
//                       {days.map((day, dIdx) => {
//                         const proxyDay = new Date(proxy.date).toLocaleDateString(
//                           "en-US",
//                           { weekday: "long" }
//                         );
//                         return (
//                           <td
//                             key={dIdx}
//                             className="px-4 py-2 border text-center"
//                           >
//                             {proxyDay === day
//                               ? `${proxy.subject} (Lec ${proxy.lecno})`
//                               : "-"}
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     {days.map((_, index) => (
//                       <td
//                         key={index}
//                         className="px-4 py-6 border text-center text-gray-500"
//                       >
//                         -
//                       </td>
//                     ))}
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Modal */}
//           <PublishProxyModal
//             isOpen={modalOpen}
//             onClose={() => setModalOpen(false)}
//             standard={modalStd}
//             setStandard={setModalStd}
//             division={modalDiv}
//             setDivision={setModalDiv}
//             date={modalDate}
//             setDate={setModalDate}
//             lecNo={modalLecNo}
//             setLecNo={setModalLecNo}
//             subject={modalSubject}
//             setSubject={setModalSubject}
//             fromTeacher={modalFromTeacher}
//             setFromTeacher={setModalFromTeacher}
//             toTeacher={modalToTeacher}
//             setToTeacher={setModalToTeacher}
//             subjectOptions={subjectOptions}
//             teacherOptions={teacherOptions}
//           />
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default AcademicProxy;


import React, { useState, useEffect } from "react";
import axios from "axios";
import MainLayout from "../layout/MainLayout";
import SelectField from "../components/SelectField";
import PublishProxyModal from "../components/PublishProxyModal";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from '../config'; 

const AcademicProxy = () => {
  const [staffSearch, setStaffSearch] = useState("");
  const [selectedStd, setSelectedStd] = useState("");
  const [selectedDiv, setSelectedDiv] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // Modal states
  const [modalStd, setModalStd] = useState("");
  const [modalDiv, setModalDiv] = useState("");
  const [modalDate, setModalDate] = useState("");
  const [modalLecNo, setModalLecNo] = useState("");
  const [modalSubject, setModalSubject] = useState("");
  const [modalFromTeacher, setModalFromTeacher] = useState("");
  const [modalToTeacher, setModalToTeacher] = useState("");

  // Dynamic Data
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [proxyList, setProxyList] = useState([]);
    
    // --- NEW STATES FOR FILTERED DROPDOWNS (Populated from /api/allotments) ---
    const [allotmentList, setAllotmentList] = useState([]); // Stores all allotments for local filtering
    const [availableStandards, setAvailableStandards] = useState([]);
    const [divisionStandardMap, setDivisionStandardMap] = useState({});
    
  const AUTH_HEADER = 'ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU='; 

  // 🔹 Reusable function to fetch proxy list
  const fetchProxies = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}api/proxies`, {
        headers: {
          auth: AUTH_HEADER,
        },
      });
      const proxyArray = Array.isArray(res.data) ? res.data : [];
      setProxyList(proxyArray);
    } catch (err) {
      console.error("Error fetching proxies:", err);
    }
  };
    
    // 🔹 Fetch Standards and Divisions from Allocations (GET /api/allotments)
    const fetchAvailableStandardsAndDivisions = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}api/allotments`, { 
                headers: { auth: AUTH_HEADER }
            });
            const allocations = Array.isArray(res.data) ? res.data : [];
            
            setAllotmentList(allocations); // Store full list for modal subject filtering
            
            const standardsSet = new Set();
            const divisionMap = {}; 

            allocations.forEach(alloc => {
                const std = alloc.standards?.[0]; 
                const div = alloc.divisions?.[0]; 
                
                if (std && div) {
                    standardsSet.add(std);
                    
                    if (!divisionMap[std]) {
                        divisionMap[std] = new Set();
                    }
                    divisionMap[std].add(div);
                }
            });

            const sortedStandards = Array.from(standardsSet).sort((a, b) => parseInt(a) - parseInt(b));
            
            // Convert Sets to sorted Arrays
            for (const std in divisionMap) {
                divisionMap[std] = Array.from(divisionMap[std]).sort();
            }

            setAvailableStandards(sortedStandards);
            setDivisionStandardMap(divisionMap); 

        } catch (err) {
            console.warn("Could not fetch available standards/divisions from allotments.");
            setAllotmentList([]);
            setAvailableStandards([]);
            setDivisionStandardMap({});
        }
    };

    // 🔹 NEW: Delete Proxy Function
    const deleteProxy = async (id) => {
        if (!window.confirm("Are you sure you want to delete this proxy entry?")) {
            return;
        }

        try {
            await axios.delete(`${API_BASE_URL}api/proxies/${id}`, {
                headers: { auth: AUTH_HEADER }
            });

            // Update local state to remove the deleted proxy
            setProxyList(prev => prev.filter(proxy => proxy._id !== id));
            alert("Proxy deleted successfully.");
        } catch (err) {
            console.error("Error deleting proxy:", err);
            alert("Failed to delete proxy entry.");
        }
    };


  // 🔹 Initial Data Fetch
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}api/staff`, {
          headers: {
            auth: AUTH_HEADER,
          },
        });

        const staffArray = Array.isArray(res.data) ? res.data : [];
        const formattedStaff = staffArray.map((s) => ({
          label: `${s.firstname} ${s.lastname}`,
          value: s._id,
        }));

        setTeacherOptions(formattedStaff);
      } catch (err) {
        console.error("Error fetching staff:", err);
      }
    };

    fetchStaff();
    fetchProxies();
    fetchAvailableStandardsAndDivisions();
  }, []);


  // --- Filter Proxy List based on search and dropdowns ---
  const filteredProxies = proxyList.filter(proxy => {
    // 1. Standard and Division Filter
    const stdMatch = !selectedStd || proxy.standard === selectedStd;
    const divMatch = !selectedDiv || proxy.division === selectedDiv;

    // 2. Staff Search Filter 
    const searchLower = staffSearch.toLowerCase();
    
    // Check if the teacher objects exist and have names (populated in controller)
    const fromTeacherName = `${proxy.fromteacher?.firstname || ''} ${proxy.fromteacher?.lastname || ''}`.toLowerCase();
    const toTeacherName = `${proxy.toteacher?.firstname || ''} ${proxy.toteacher?.lastname || ''}`.toLowerCase();

    const staffMatch = 
      !staffSearch || 
      fromTeacherName.includes(searchLower) ||
      toTeacherName.includes(searchLower);

    return stdMatch && divMatch && staffMatch;
  });
  
  // --- Handler for Modal Close and Data Refresh ---
  const handleModalClose = (refreshNeeded) => {
    setModalOpen(false);
    // Reset modal states
    setModalStd("");
    setModalDiv("");
    setModalDate("");
    setModalLecNo("");
    setModalSubject("");
    setModalFromTeacher("");
    setModalToTeacher("");
    
    // Only fetch new data if the publish was successful
    if (refreshNeeded === true) {
      fetchProxies();
    }
  };


  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="p-6 space-y-6">
          {/* Header */}
          <h2 className="text-center text-2xl font-semibold mb-4">
            Proxy Management
          </h2>
          
          {/* Top bar (Search + Publish Button) */}
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={staffSearch}
              onChange={(e) => setStaffSearch(e.target.value)}
              placeholder="Search From/To Teacher..."
              className="border px-3 py-2 rounded-md w-64"
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              onClick={() => setModalOpen(true)}
            >
              Publish New Proxy
            </button>
          </div>

          {/* Dropdowns (Filtering) */}
          <div className="flex gap-6 pt-4 pb-2">
            <div className="w-48">
              <select
                className="w-full border px-3 py-2 rounded-md"
                value={selectedStd}
                onChange={(e) => setSelectedStd(e.target.value)}
              >
                <option value="">Filter by Standard</option>
                {availableStandards.map( // Using filtered standards
                  (std) => (
                    <option key={std} value={std}>
                      Standard {std}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="w-48">
              <select
                className="w-full border px-3 py-2 rounded-md"
                value={selectedDiv}
                onChange={(e) => setSelectedDiv(e.target.value)}
              >
                <option value="">Filter by Division</option>
                {divisionStandardMap[selectedStd]?.map((div) => ( // Filter divisions by selected std
                  <option key={div} value={div}>
                    Division {div}
                  </option>
                )) || 
                    (selectedStd && <option disabled>Select a division</option>) ||
                    (<option disabled>Select a standard</option>)
                }
              </select>
            </div>
          </div>


          {/* Table - Displaying Filtered Proxies */}
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full border border-gray-300 rounded">
              <thead className="bg-blue-100 text-black">
                <tr>
                  <th className="px-4 py-2 border text-center">Date</th>
                  <th className="px-4 py-2 border text-center">Std/Div</th>
                  <th className="px-4 py-2 border text-center">Lec No.</th>
                  <th className="px-4 py-2 border text-center">Subject</th>
                  <th className="px-4 py-2 border text-center">From Teacher (Absent)</th>
                  <th className="px-4 py-2 border text-center">To Teacher (Proxy)</th>
                    <th className="px-4 py-2 border text-center">Action</th> {/* NEW HEADER */}
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredProxies.length > 0 ? (
                  filteredProxies.map((proxy, idx) => ( // Fix applied: using parentheses ( ) to return JSX
                    <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border text-center">{new Date(proxy.date).toLocaleDateString('en-GB')}</td>
                        <td className="px-4 py-2 border text-center">{`${proxy.standard}-${proxy.division}`}</td>
                        <td className="px-4 py-2 border text-center">{proxy.lecno}</td>
                        <td className="px-4 py-2 border text-center">{proxy.subject}</td>
                        <td className="px-4 py-2 border text-center font-medium text-red-700">{`${proxy.fromteacher?.firstname} ${proxy.fromteacher?.lastname}`}</td>
                        <td className="px-4 py-2 border text-center font-medium text-green-700">{`${proxy.toteacher?.firstname} ${proxy.toteacher?.lastname}`}</td>
                        <td className="px-4 py-2 border text-center">
                            <button
                                onClick={() => deleteProxy(proxy._id)}
                                className="text-red-600 hover:text-red-800 hover:underline font-medium text-sm"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-6 border text-center text-gray-500"
                    >
                      No proxy records found for the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          <PublishProxyModal
            isOpen={modalOpen}
            onClose={handleModalClose} // Passes refresh status
            standard={modalStd}
            setStandard={setModalStd}
            division={modalDiv}
            setDivision={setModalDiv}
            date={modalDate}
            setDate={setModalDate}
            lecNo={modalLecNo}
            setLecNo={setModalLecNo}
            subject={modalSubject}
            setSubject={setModalSubject}
            fromTeacher={modalFromTeacher}
            setFromTeacher={setModalFromTeacher}
            toTeacher={modalToTeacher}
            setToTeacher={setModalToTeacher}
            teacherOptions={teacherOptions}
              // Pass the filtered list and map to the modal
            stdOptions={availableStandards}
            divisionMap={divisionStandardMap} 
            allotmentList={allotmentList} // Pass the allotment list for subject filtering
            divOptions={divisionStandardMap[modalStd] || []} // Division options depend on modalStd
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default AcademicProxy;