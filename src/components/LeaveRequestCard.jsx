import React from "react";

const LeaveRequestCard = ({
  request,
  handleCardClick,
  handleAccept,
  handleReject,
  handleUndo,
  expandedRequestId,
}) => {
  // Use consistent ID - prefer _id if that's what's in your data
  const requestId = request._id || request.id;
  const isExpanded = expandedRequestId === requestId;
  const isFinalized =
    request.status === "Approved" || request.status === "Rejected";

  const handleCardClickInternal = (e) => {
    // Prevent event if clicking on buttons
    if (e.target.tagName === 'BUTTON') {
      return;
    }
    handleCardClick(requestId);
  };

  return (
    <div
      key={requestId}
      className="bg-white p-4 sm:p-6 rounded-md shadow-md hover:shadow-lg transition-all cursor-pointer"
      onClick={handleCardClickInternal}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        {/* Profile & Info */}
        <div className="">
          <div>
            <p>
              Name: {request.firstname} {request.lastname}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              Dept: {request.dept ? request.dept : "None"}
            </p>
          </div>
          <div className="">
            <p className="text-sm text-gray-600">Subject: {request.subject}</p>
          </div>
        </div>

        {/* Actions & Status */}
        <div className="flex justify-start sm:justify-end items-center gap-4">
          {request.status === "pending" ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAccept(e, requestId);
                }}
                className="text-green-500 hover:text-green-700 text-sm"
              >
                Accept
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleReject(e, requestId);
                }}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Reject
              </button>
            </>
          ):(<p></p>)}

          <p className="text-sm font-semibold">
            Status:{" "}
            <span
              className={`${
                request.status === "Approved"
                  ? "text-green-600"
                  : request.status === "Rejected"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              {request.status}
            </span>
          </p>
        </div>
      </div>

      {/* Expanded Message */}
      {isExpanded && (
        <div className="mt-4 bg-gray-100 p-4 rounded-md">
          <h3 className="font-semibold text-gray-800">Leave Request Details</h3>
          <div className="mt-2 text-sm">
            <p>Respected Sir/Madam,</p>
            <p className="mt-2">
              {request.message ? (
                <>{request.message}</>
              ) : (
                <>
                  I am <strong>{request.firstname}</strong>. I am not feeling well
                  and will not be able to attend classes from{" "}
                  <strong>{request.from}{" "}to{" "}{request.to}</strong>. I kindly request that
                  you grant me leave for the mentioned dates. I will make sure
                  to cover any missed lessons.
                </>
              )}
            </p>
            <p className="mt-4">Thanking you,</p>
            <p>Your faithfully,</p>
            <p>{request.name}</p>
            <p>{request.classSection}</p>
            <p className="mt-4 text-gray-600">
              Request Submitted On:{" "}
              <strong>
                {new Date(request.requestedDate).toLocaleDateString("en-GB")}
              </strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveRequestCard;