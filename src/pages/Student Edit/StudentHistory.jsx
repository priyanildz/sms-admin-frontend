import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

// Renamed from 'History' to 'StudentHistory' for clarity
export default function StudentHistory({ student }) {
  // We expect student to be the full student object fetched by EditStudent

  const [historyItem, setHistoryItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  // --- Core Logic Change: Check for academicHistory object ---
  useEffect(() => {
    setIsLoading(true);

    if (student && student.academicHistory && student.academicHistory.year) {
      const hist = student.academicHistory;
      setHistoryItem({
        id: hist.year,
        code: `AY - ${hist.year}`,
        year: hist.year,
        standard: hist.standard,
        division: hist.division,
      });
    } else {
      console.log("No valid academicHistory object found on the student.");
      setHistoryItem(null);
    }

    setIsLoading(false);
  }, [student]);
  // Rerun when the student prop changes

  // --- Modal Handlers (UNCHANGED, but included for completeness) ---
  const handleView = (item) => {
    if (!item) return;
    setModalData(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <h1 className="text-xl md:text-2xl font-medium text-center py-4 px-4 text-gray-800 border-b border-gray-200">
            Academic History 
          </h1>

          <div className="divide-y divide-gray-200">
            {/* 1. Loading State */}
            {isLoading ? (
              <div className="p-8 text-center text-gray-500">
                Loading history...
              </div>
            ) : /* 2. No Data State (The one that was showing in your screenshot) */
            !historyItem ? (
              <div className="p-8 text-center text-gray-500">
                No academic history found for this student.
              </div>
            ) : (
              /* 3. Display Data State */
              <div
                key={historyItem.id}
                className="p-4 md:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <div className="text-base md:text-lg font-medium text-gray-800">
                      {historyItem.code}
                    </div>
                    {/* <div className="text-sm md:text-base text-gray-500">
                      (Std: {historyItem.standard || "N/A"}, Div:{" "}
                      {historyItem.division || "N/A"})
                    </div> */}
                  </div>
                </div>
                <button
                  onClick={() => handleView(historyItem)}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm md:text-base transition-colors px-3 py-1 rounded hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  View
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Component */}
      {isModalOpen && modalData && (
        <div
          // ✅ UPDATED: removed dark overlay, only pure blur
          className="fixed inset-0 backdrop-blur-md bg-transparent flex justify-center items-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Academic Year Details
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-600">
                  Academic Year:
                </span>
                <span className="ml-2 text-gray-800">
                  {modalData.year || "N/A"}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Standard:</span>
                <span className="ml-2 text-gray-800">
                  {modalData.standard || "N/A"}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Division:</span>
                <span className="ml-2 text-gray-800">
                  {modalData.division || "N/A"}
                </span>
              </div>
            </div>

            {/* Modal Footer (Optional Close Button) */}
            <div className="mt-6 text-right">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
