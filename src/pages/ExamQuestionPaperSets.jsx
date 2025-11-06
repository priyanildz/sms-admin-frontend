// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { FileText, BookOpen, GraduationCap } from "lucide-react";
// import MainLayout from "../layout/MainLayout";
// import { useNavigate } from "react-router-dom";

// const ExamQuestionPaperSets = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { subject = "Subject", standard = "Standard" } = location.state || {};

//     const [selectedSet, setSelectedSet] = useState(null);
//     const [schedule, setSchedule] = useState("");
//     const [showModal, setShowModal] = useState(false);
//     const [approvedMessage, setApprovedMessage] = useState("");

//     const handleSetClick = (setNum) => {
//         setSelectedSet(setNum);
//         setSchedule("");
//         setShowModal(true);
//         setApprovedMessage("");
//     };

//     const handleApprove = () => {
//         if (!schedule) {
//             alert("Please select a schedule");
//             return;
//         }
//         setShowModal(false);
//         setApprovedMessage(`Set ${selectedSet} has been approved for ${schedule}.`);
//     };

//     return (
//         <MainLayout>
//             <div className="p-6 max-w-6xl mx-auto mt-12">
//                 <div className="bg-white rounded-2xl shadow-md p-10">
//                     <h3 className="text-xl font-semibold text-center text-blue-700 mb-8">Question Paper</h3>

//                     {/* Info Row */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
//                         <div className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-2xl shadow-md">
//                             <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
//                                 <GraduationCap size={24} />
//                             </div>
//                             <div>
//                                 <div className="text-sm text-gray-500">Standard</div>
//                                 <div className="text-lg font-semibold text-gray-800">{standard}</div>
//                             </div>
//                         </div>
//                         <div className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-2xl shadow-md">
//                             <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
//                                 <BookOpen size={24} />
//                             </div>
//                             <div>
//                                 <div className="text-sm text-gray-500">Subject</div>
//                                 <div className="text-lg font-semibold text-gray-800">{subject}</div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Sets Grid */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
//                         {[1, 2, 3].map((setNum) => (
//                             <div
//                                 key={setNum}
//                                 onClick={() => handleSetClick(setNum)}
//                                 className="w-40 h-40 bg-gradient-to-b from-blue-50 to-white border border-blue-300 rounded-full flex flex-col items-center justify-center gap-2 text-blue-700 font-semibold text-xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer hover:scale-105"
//                             >
//                                 <FileText size={36} className="text-blue-500" />
//                                 Set {setNum}
//                             </div>
//                         ))}
//                     </div>
//                     {/* Improved Back Button */}
//                     <div className="flex justify-start mt-10">
//                         <button
//                             onClick={() => navigate("/exams-question-paper")}
//                             className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-full shadow-sm transition duration-200"
//                         >
//                             {/* <ArrowLeft size={18} /> */}
//                             Back
//                         </button>
//                     </div>

//                 </div>

//                 {showModal && (
//                     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
//                         <div className="bg-white rounded-2xl shadow-xl w-[90%] sm:max-w-md p-6 relative">
//                             <h4 className="text-xl font-bold text-center text-gray-800 mb-5">
//                                 Approve Set {selectedSet}
//                             </h4>

//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                 Select Schedule
//                             </label>
//                             <input type="datetime-local" name="" id="" value={schedule} onChange={(e) => setSchedule(e.target.value)}                              
//                             className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
// />
//                             <div className="flex justify-end gap-3">
//                                 <button
//                                     onClick={() => setShowModal(false)}
//                                     className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={handleApprove}
//                                     className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//                                 >
//                                     Approve
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Approval Message */}
//                 {approvedMessage && (
//                     <div className="mt-8 text-center text-green-600 font-medium text-lg">
//                         {approvedMessage}
//                     </div>
//                 )}
//             </div>
//         </MainLayout>
//     );
// };

// export default ExamQuestionPaperSets;


import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FileText, BookOpen, GraduationCap } from "lucide-react";
import MainLayout from "../layout/MainLayout";
import { useNavigate } from "react-router-dom";
// --- Import the API Base URL from the config file (Assumed Import) ---
// Note: Keeping this import pattern consistent, although not strictly needed for this component.
import { API_BASE_URL } from '../config'; 

// const API_BASE_URL = "http://localhost:5000/api"; // REMOVED LOCAL DEFINITION

const ExamQuestionPaperSets = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { subject = "Subject", standard = "Standard" } = location.state || {};

    const [selectedSet, setSelectedSet] = useState(null);
    const [schedule, setSchedule] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [approvedMessage, setApprovedMessage] = useState("");

    const handleSetClick = (setNum) => {
        setSelectedSet(setNum);
        setSchedule("");
        setShowModal(true);
        setApprovedMessage("");
    };

    const handleApprove = () => {
        if (!schedule) {
            alert("Please select a schedule");
            return;
        }
        setShowModal(false);
        setApprovedMessage(`Set ${selectedSet} has been approved for ${schedule}.`);
    };

    return (
        <MainLayout>
            <div className="p-6 max-w-6xl mx-auto mt-12">
                <div className="bg-white rounded-2xl shadow-md p-10">
                    <h3 className="text-xl font-semibold text-center text-blue-700 mb-8">Question Paper</h3>

                    {/* Info Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
                        <div className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-2xl shadow-md">
                            <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                                <GraduationCap size={24} />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Standard</div>
                                <div className="text-lg font-semibold text-gray-800">{standard}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-2xl shadow-md">
                            <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                                <BookOpen size={24} />
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Subject</div>
                                <div className="text-lg font-semibold text-gray-800">{subject}</div>
                            </div>
                        </div>
                    </div>

                    {/* Sets Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                        {[1, 2, 3].map((setNum) => (
                            <div
                                key={setNum}
                                onClick={() => handleSetClick(setNum)}
                                className="w-40 h-40 bg-gradient-to-b from-blue-50 to-white border border-blue-300 rounded-full flex flex-col items-center justify-center gap-2 text-blue-700 font-semibold text-xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer hover:scale-105"
                            >
                                <FileText size={36} className="text-blue-500" />
                                Set {setNum}
                            </div>
                        ))}
                    </div>
                    {/* Improved Back Button */}
                    <div className="flex justify-start mt-10">
                        <button
                            onClick={() => navigate("/exams-question-paper")}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-full shadow-sm transition duration-200"
                        >
                            {/* <ArrowLeft size={18} /> */}
                            Back
                        </button>
                    </div>

                    {/* Approval Message */}
                    {approvedMessage && (
                        <div className="mt-8 text-center text-green-600 font-medium text-lg">
                            {approvedMessage}
                        </div>
                    )}
                </div>

                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
                        <div className="bg-white rounded-2xl shadow-xl w-[90%] sm:max-w-md p-6 relative">
                            <h4 className="text-xl font-bold text-center text-gray-800 mb-5">
                                Approve Set {selectedSet}
                            </h4>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Select Schedule
                            </label>
                            <input type="datetime-local" name="" id="" value={schedule} onChange={(e) => setSchedule(e.target.value)}                              
                            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
/>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleApprove}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                >
                                    Approve
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default ExamQuestionPaperSets;