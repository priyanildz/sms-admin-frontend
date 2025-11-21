// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const ViewTestResults = () => {
//   const navigate = useNavigate();
//   const { id } = useParams(); // get term-result ID from URL
//   const [test, setTest] = useState(null);

//   useEffect(() => {
//     const getTest = async () => {
//       try {
//         const response = await axios.get(`https://sspd-school-portal.vercel.app/api/term-result/${id}`, {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         });
//         if (response.status === 200) {
//           setTest(response.data);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     if (id) getTest();
//   }, [id]);

//     // Format date for display
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   return (
//     <MainLayout>
//       <div className="p-4 sm:p-6">
//         <div className="bg-white rounded-2xl shadow-md p-6 space-y-8">
//           {test ? (
//             <>
//               {/* Test Metadata Section */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="flex flex-col">
//                   <label className="text-sm font-semibold text-gray-700 mb-1">Std</label>
//                   <input
//                     type="text"
//                     value={test.standard}
//                     readOnly
//                     disabled
//                     className="border border-gray-300 bg-blue-100 rounded-lg px-4 py-2 text-sm cursor-default focus:outline-none"
//                   />
//                 </div>

//                 <div className="flex flex-col">
//                   <label className="text-sm font-semibold text-gray-700 mb-1">Div</label>
//                   <input
//                     type="text"
//                     value={test.division}
//                     readOnly
//                     disabled
//                     className="border border-gray-300 bg-blue-100 rounded-lg px-4 py-2 text-sm cursor-default focus:outline-none"
//                   />
//                 </div>

//                 <div className="flex flex-col">
//                   <label className="text-sm font-semibold text-gray-700 mb-1">Date</label>
//                   <input
//                     value={formatDate(test.date)} 
//                     readOnly
//                     disabled
//                     className="border border-gray-300 bg-blue-100 rounded-lg px-4 py-2 text-sm cursor-default focus:outline-none"
//                   />
//                 </div>

//                 <div className="flex flex-col">
//                   <label className="text-sm font-semibold text-gray-700 mb-1">Subject</label>
//                   <input
//                     type="text"
//                     value={test.subject}
//                     readOnly
//                     disabled
//                     className="border border-gray-300 bg-blue-100 rounded-lg px-4 py-2 text-sm cursor-default focus:outline-none"
//                   />
//                 </div>

//                 <div className="flex flex-col">
//                   <label className="text-sm font-semibold text-gray-700 mb-1">Topic</label>
//                   <input
//                     type="text"
//                     value={test.topic}
//                     readOnly
//                     disabled
//                     className="border border-gray-300 bg-blue-100 rounded-lg px-4 py-2 text-sm cursor-default focus:outline-none"
//                   />
//                 </div>

//                 <div className="flex flex-col">
//                   <label className="text-sm font-semibold text-gray-700 mb-1">Teacher</label>
//                   <input
//                     type="text"
//                     value={test.staffDetails.firstname || "N/A"} // Assuming you have this field
//                     readOnly
//                     disabled
//                     className="border border-gray-300 bg-blue-100 rounded-lg px-4 py-2 text-sm cursor-default focus:outline-none"
//                   />
//                 </div>
//               </div>

//               {/* Student Table */}
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
//                   Tests Record
//                 </h2>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full bg-white overflow-hidden text-left">
//                     <thead>
//                       <tr className="bg-blue-100 text-gray-700 text-sm">
//                         <th className="py-2 px-4 border">Student Name</th>
//                         <th className="py-2 px-4 border">Marks Obtained</th>
//                         <th className="py-2 px-4 border">Total Marks</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {test.studentData.map((student, index) => (
//                         <tr key={index} className="text-gray-700 text-left">
//                           <td className="py-2 px-4 border">{student.name}</td>
//                           <td className="py-2 px-4 border">{student.marksObtained ?? "-"}</td>
//                           <td className="py-2 px-4 border">{test.totalmarks}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* Back Button */}
//               <div className="flex justify-start mt-4">
//                 <button
//                   onClick={() => navigate("/classes-test-results")}
//                   className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
//                 >
//                   Back
//                 </button>
//               </div>
//             </>
//           ) : (
//             <p className="text-center text-gray-600">Loading test data...</p>
//           )}
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default ViewTestResults;

// import React, { useState, useEffect } from "react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// // Define the base URL for your local backend API
// const LOCAL_API_BASE_URL = "http://localhost:5000/api";

// const ViewTestResults = () => {
//   const navigate = useNavigate();
//   const { id } = useParams(); // get term-result ID from URL
//   const [test, setTest] = useState(null);

//   useEffect(() => {
//     const getTest = async () => {
//       try {
//         // CRITICAL FIX: Change from Vercel URL to local API URL
//         const response = await axios.get(`${LOCAL_API_BASE_URL}/term-result/${id}`, {
//           headers: {
//             auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
//           },
//         });
//         if (response.status === 200) {
//           setTest(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching test results:", error);
//       }
//     };

//     if (id) getTest();
//   }, [id]);

//     // Format date for display
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   return (
//     <MainLayout>
//       <div className="p-4 sm:p-6">
//         <div className="bg-white rounded-2xl shadow-md p-6 space-y-8">
//           {test ? (
//             <>
//               {/* Test Metadata Section */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="flex flex-col">
//                   <label className="text-sm font-semibold text-gray-700 mb-1">Std</label>
//                   <input
//                     type="text"
//                     value={test.standard}
//                     readOnly
//                     disabled
//                     className="border border-gray-300 bg-blue-100 rounded-lg px-4 py-2 text-sm cursor-default focus:outline-none"
//                   />
//                 </div>

//                 <div className="flex flex-col">
//                   <label className="text-sm font-semibold text-gray-700 mb-1">Div</label>
//                   <input
//                     type="text"
//                     value={test.division}
//                     readOnly
//                     disabled
//                     className="border border-gray-300 bg-blue-100 rounded-lg px-4 py-2 text-sm cursor-default focus:outline-none"
//                   />
//                 </div>

//                 <div className="flex flex-col">
//                   <label className="text-sm font-semibold text-gray-700 mb-1">Date</label>
//                   <input
//                     value={formatDate(test.date)} 
//                     readOnly
//                     disabled
//                     className="border border-gray-300 bg-blue-100 rounded-lg px-4 py-2 text-sm cursor-default focus:outline-none"
//                   />
//                 </div>

//                 <div className="flex flex-col">
//                   <label className="text-sm font-semibold text-gray-700 mb-1">Subject</label>
//                   <input
//                     type="text"
//                     value={test.subject}
//                     readOnly
//                     disabled
//                     className="border border-gray-300 bg-blue-100 rounded-lg px-4 py-2 text-sm cursor-default focus:outline-none"
//                   />
//                 </div>

//                 <div className="flex flex-col">
//                   <label className="text-sm font-semibold text-gray-700 mb-1">Topic</label>
//                   <input
//                     type="text"
//                     value={test.topic}
//                     readOnly
//                     disabled
//                     className="border border-gray-300 bg-blue-100 rounded-lg px-4 py-2 text-sm cursor-default focus:outline-none"
//                   />
//                 </div>

//                 <div className="flex flex-col">
//                   <label className="text-sm font-semibold text-gray-700 mb-1">Teacher</label>
//                   <input
//                     type="text"
//                     value={test.staffDetails.firstname || "N/A"} // Assuming you have this field
//                     readOnly
//                     disabled
//                     className="border border-gray-300 bg-blue-100 rounded-lg px-4 py-2 text-sm cursor-default focus:outline-none"
//                   />
//                 </div>
//               </div>

//               {/* Student Table */}
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
//                   Tests Record
//                 </h2>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full bg-white overflow-hidden text-left">
//                     <thead>
//                       <tr className="bg-blue-100 text-gray-700 text-sm">
//                         <th className="py-2 px-4 border">Student Name</th>
//                         <th className="py-2 px-4 border">Marks Obtained</th>
//                         <th className="py-2 px-4 border">Total Marks</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {test.studentData.map((student, index) => (
//                         <tr key={index} className="text-gray-700 text-left">
//                           <td className="py-2 px-4 border">{student.name}</td>
//                           <td className="py-2 px-4 border">{student.marksObtained ?? "-"}</td>
//                           <td className="py-2 px-4 border">{test.totalmarks}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* Back Button */}
//               <div className="flex justify-start mt-4">
//                 <button
//                   onClick={() => navigate("/classes-test-results")}
//                   className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
//                 >
//                   Back
//                 </button>
//               </div>
//             </>
//           ) : (
//             <p className="text-center text-gray-600">Loading test data...</p>
//           )}
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default ViewTestResults;

import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config";

const ViewTestResults = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // get term-result ID from URL
  const [test, setTest] = useState(null);

  useEffect(() => {
    const getTest = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}api/term-result/${id}`, {
          headers: {
            auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          },
        });
        if (response.status === 200) {
          setTest(response.data);
        }
      } catch (error) {
        console.error("Error fetching test results:", error);
      }
    };

    if (id) getTest();
  }, [id]);

    // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-8">
          {test ? (
            <>
              {/* Test Metadata Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-1">Std</label>
                  <input
                    type="text"
                    value={test.standard}
                    readOnly
                    disabled
                    className="border border-gray-300 bg-blue-100 rounded-lg px-4 py-2 text-sm cursor-default focus:outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-1">Div</label>
                  <input
                    type="text"
                    value={test.division}
                    readOnly
                    disabled
                    className="border border-gray-300 bg-blue-100 rounded-lg px-4 py-2 text-sm cursor-default focus:outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-1">Date</label>
                  <input
                    value={formatDate(test.date)} 
                    readOnly
                    disabled
                    className="border border-gray-300 bg-blue-100 rounded-lg px-4 py-2 text-sm cursor-default focus:outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={test.subject}
                    readOnly
                    disabled
                    className="border border-gray-300 bg-blue-100 rounded-lg px-4 py-2 text-sm cursor-default focus:outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-1">Topic</label>
                  <input
                    type="text"
                    value={test.topic}
                    readOnly
                    disabled
                    className="border border-gray-300 bg-blue-100 rounded-lg px-4 py-2 text-sm cursor-default focus:outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-1">Teacher</label>
                  <input
                    type="text"
                    value={test.staffDetails.firstname || "N/A"} // Assuming you have this field
                    readOnly
                    disabled
                    className="border border-gray-300 bg-blue-100 rounded-lg px-4 py-2 text-sm cursor-default focus:outline-none"
                  />
                </div>
              </div>

              {/* Student Table */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                  Tests Record
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white overflow-hidden text-left">
                    <thead>
                      <tr className="bg-blue-100 text-gray-700 text-sm">
                        <th className="py-2 px-4 border">Student Name</th>
                        <th className="py-2 px-4 border">Marks Obtained</th>
                        <th className="py-2 px-4 border">Total Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* FIX APPLIED: Use optional chaining to safely map over studentData */}
                      {test.studentData?.map((student, index) => (
                        <tr key={index} className="text-gray-700 text-left">
                          <td className="py-2 px-4 border">{student.name}</td>
                          <td className="py-2 px-4 border">{student.marksObtained ?? "-"}</td>
                          <td className="py-2 px-4 border">{test.totalmarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Back Button */}
              <div className="flex justify-start mt-4">
                <button
                  onClick={() => navigate("/classes-test-results")}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-full shadow"
                >
                  Back
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-600">Loading test data...</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ViewTestResults;