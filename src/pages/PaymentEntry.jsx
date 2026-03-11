import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Assuming this SelectField component is defined elsewhere and works correctly
// import SelectField from "../components/SelectField";
import axios from "axios";
// --- Import the API Base URL from the config file (Assumed Import) ---
import { API_BASE_URL } from "../config";

// Re-defining SelectField locally since its import path is outside this file
const SelectField = ({ label, name, options, value, onChange }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        className="border px-3 py-2 rounded w-full"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
    </div>
  );
};

// Standard options including Pre-Primary
const standardOptions = [
  { label: "Select Standard", value: "" },
  { label: "Nursery", value: "Nursery" },
  { label: "Junior KG", value: "Junior" },
  { label: "Senior KG", value: "Senior" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
];

const divisionOptions = [
  { label: "Select Division", value: "" },
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D" },
  { label: "E", value: "E" },
];

// FIX: Payment Modes based on the provided dashboard image legend
const paymentModeOptions = [
  { label: "Online Payment", value: "Online" },
  { label: "Cash", value: "Cash" },
  { label: "Bank Transfer", value: "Bank Transfer" },
  { label: "Internet Banking", value: "Internet Banking" },
  { label: "Cheques", value: "Cheques" },
];

// FIX: Custom sort order for academic standards
const ACADEMIC_ORDER = {
  NURSERY: 1,
  "JUNIOR KG": 2, // Assuming Junior KG maps to Junior
  "SENIOR KG": 3, // Assuming Senior KG maps to Senior
  JUNIOR: 2,
  SENIOR: 3,
  1: 4,
  2: 5,
  3: 6,
  4: 7,
  5: 8,
  6: 9,
  7: 10,
  8: 11,
  9: 12,
  10: 13,
};

const academicSort = (a, b) => {
  const stdA = (a.std || "").toUpperCase();
  const stdB = (b.std || "").toUpperCase();

  // Map to a numeric order. Default to a high number for unknown standards.
  const orderA = ACADEMIC_ORDER[stdA] || 99;
  const orderB = ACADEMIC_ORDER[stdB] || 99;

  if (orderA !== orderB) {
    return orderA - orderB;
  }

  // Secondary sort by division
  const divA = a.div || "";
  const divB = b.div || "";
  return divA.localeCompare(divB);
};

const PaymentEntry = () => {
  // FIX 1: Read initial values from URL query parameters
  const query = new URLSearchParams(window.location.search);

  const [selectedStd, setSelectedStd] = useState(query.get("std") || "");
  const [selectedDiv, setSelectedDiv] = useState(query.get("div") || "");
  const [searchTerm, setSearchTerm] = useState(query.get("search") || "");

  const [paymentEntries, setPaymentEntries] = useState([]);
  const [studentFeeList, setStudentFeeList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    installmentType: "Custom",
    amount: 0,
    mode: "Cash",
  });
  const [feesData, setFeesData] = useState({});
  // NEW STATE: Store raw fees objects to access category breakdown
  const [rawFeesList, setRawFeesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

  const normalizeStd = (std) => {
    if (!std) return "";
    if (["Nursery", "Junior", "Senior"].includes(std)) {
      return std;
    }
    const num = String(std).replace(/\D/g, "");
    return num || std;
  };

  // Fetch ALL Fees Data
  const fetchFeesData = async () => {
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await axios.get(`${API_BASE_URL}api/fees`, {
        headers: {
          "Content-Type": "application/json",
          auth: AUTH_HEADER,
          username: storedUsername,
          role: storedRole,
        },
      });

      if (Array.isArray(response.data)) {
        setRawFeesList(response.data); // Store raw list for category details
        const feesMap = response.data.reduce((acc, fee) => {
          acc[normalizeStd(fee.standard)] = fee.annualfee;
          return acc;
        }, {});
        setFeesData(feesMap);
      }
    } catch (error) {
      console.error("Error fetching fees data:", error);
      setFeesData({});
    }
  };

  // 1. Initial/On-Change Fetch: Fetch All Fee Structures on mount
  useEffect(() => {
    fetchFeesData();
  }, []);

  // 2. Data Fetch: Trigger student list update whenever filters or fee data changes
  useEffect(() => {
    // Only fetch student data if the fee structure data has been initialized
    if (feesData !== null) {
      fetchStudentFeeData();
    }
  }, [selectedStd, selectedDiv, searchTerm, feesData]);

  const fetchStudentFeeData = async () => {
    setIsLoading(true);

    // --- 1. Student Query Parameters (for filtering students by Std/Div only) ---
    const studentQueryParams = {};
    if (selectedStd) studentQueryParams.std = selectedStd;
    if (selectedDiv) studentQueryParams.div = selectedDiv;

    // --- 2. Payment Entry Query Parameters (Payments are filtered by Std/Div) ---
    const paymentQueryParams = {};
    if (selectedStd) paymentQueryParams.std = normalizeStd(selectedStd);
    if (selectedDiv) paymentQueryParams.div = selectedDiv;

    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      // --- A. Fetch Students (Filtered by Student Query Params) ---
      const studentsResponse = await axios.get(`${API_BASE_URL}api/students`, {
        params: studentQueryParams,
        headers: {
          auth: AUTH_HEADER,
          username: storedUsername,
          role: storedRole,
        },
      });

      let students = studentsResponse.data;

      // --- FIX: Client-Side Search Filtering for Flexible Search ---
      const lowerSearchTerm = searchTerm.toLowerCase().trim();
      if (lowerSearchTerm) {
        students = students.filter((student) => {
          const fullName =
            `${student.firstname} ${student.lastname}`.toLowerCase();
          const firstName = (student.firstname || "").toLowerCase();
          const lastName = (student.lastname || "").toLowerCase();

          return (
            fullName.includes(lowerSearchTerm) ||
            firstName.includes(lowerSearchTerm) ||
            lastName.includes(lowerSearchTerm)
          );
        });
      }

      // --- B. Fetch Payment Entries for the current standard/division context ---
      let rawPaymentEntries = [];

      if (Object.keys(paymentQueryParams).length > 0 || !selectedStd) {
        const paymentResponse = await axios.get(
          `${API_BASE_URL}api/payment-entries`,
          {
            params: paymentQueryParams,
            headers: {
              auth: AUTH_HEADER,
              username: storedUsername,
              role: storedRole,
            },
          },
        );
        rawPaymentEntries = paymentResponse.data;
      } else {
        rawPaymentEntries = [];
      }

      setPaymentEntries(rawPaymentEntries);

      const paymentMap = rawPaymentEntries.reduce((acc, entry) => {
        acc[entry.name] = entry;
        return acc;
      }, {});

      // --- C. Merge Data ---
      let mergedList = students.map((student) => {
        const studentName = `${student.firstname} ${student.lastname}`;
        const studentStdKey = normalizeStd(student.admission.admissionstd);

        const payment = paymentMap[studentName] || {
          installments: [],
          totalFees: 0,
          status: "Unpaid",
          installmentPlan: "N/A",
        };

        const annualFeeDue = feesData[studentStdKey] || 0;

        const paidAmount = calculatePaidAmount(payment.installments);

        return {
          _id: student._id,
          name: studentName,
          std: student.admission.admissionstd,
          div: student.admission.admissiondivision,
          installments: payment.installments,
          totalFeesDue: annualFeeDue,
          totalPaid: paidAmount,
          remaining: Math.max(0, annualFeeDue - paidAmount),
          status: getPaymentStatus({ paidAmount, totalFeesDue: annualFeeDue }),
          installmentType: payment.installmentPlan || "N/A",
        };
      });

      mergedList.sort(academicSort);

      setStudentFeeList(mergedList);
    } catch (error) {
      console.error("Error fetching student/fee data:", error);
      setStudentFeeList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const calculatePaidAmount = (installments) => {
    if (!installments || !Array.isArray(installments)) return 0;
    return installments.reduce((sum, inst) => sum + (inst.amount || 0), 0);
  };

  const calculateRemainingAmount = (entry) => {
    return Math.max(0, (entry.totalFeesDue || 0) - (entry.totalPaid || 0));
  };

  const getPaymentStatus = (entry) => {
    const totalFees = entry.totalFeesDue || 0;
    const paidAmount = entry.totalPaid || 0;

    if (totalFees === 0) return "N/A";

    if (paidAmount === 0) return "Unpaid";
    if (paidAmount >= totalFees) return "Paid";
    return "Partial";
  };

  // --- FIX: Logic to Download Receipt with Category Details ---
  const downloadReceipt = (entry) => {
    const receiptWindow = window.open("", "_blank");
    const today = new Date().toLocaleDateString();

    // Find the specific fee structure for this student's standard to get categories
    const studentStdKey = normalizeStd(entry.std);
    const feeStructure = rawFeesList.find(
      (f) => normalizeStd(f.standard) === studentStdKey,
    );

    const categoriesHtml =
      feeStructure && feeStructure.categories
        ? feeStructure.categories
            .map(
              (cat) => `
            <tr>
                <td colspan="3" style="border:1px solid #ddd; padding:8px; font-size: 0.9em;">${cat.name}</td>
                <td style="border:1px solid #ddd; padding:8px; text-align:right; font-size: 0.9em;">₹${cat.amount.toLocaleString()}</td>
            </tr>
        `,
            )
            .join("")
        : '<tr><td colspan="4" style="text-align:center;">No category details available</td></tr>';

    const installmentsHtml = entry.installments
      .map(
        (inst, i) => `
            <tr>
                <td style="border:1px solid #ddd; padding:8px;">${i + 1}</td>
                <td style="border:1px solid #ddd; padding:8px;">${new Date(inst.date).toLocaleDateString()}</td>
                <td style="border:1px solid #ddd; padding:8px;">${inst.mode || "N/A"}</td>
                <td style="border:1px solid #ddd; padding:8px; text-align:right;">₹${inst.amount.toLocaleString()}</td>
            </tr>
        `,
      )
      .join("");

    receiptWindow.document.write(`
            <html>
                <head>
                    <title>Fee Receipt - ${entry.name}</title>
                    <style>
                        body { font-family: sans-serif; padding: 40px; color: #333; line-height: 1.4; }
                        .header { text-align: center; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-bottom: 20px; }
                        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                        th { background:#3b82f6; color:white; padding:10px; text-align:left; }
                        .total-row { font-weight: bold; background: #f9f9f9; }
                        .section-title { font-weight: bold; margin-top: 25px; border-bottom: 1px solid #eee; padding-bottom: 5px; color: #3b82f6; }
                        .footer { margin-top: 50px; text-align: right; font-style: italic; font-size: 0.8em; }
                        @media print { .no-print { display: none; } }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1 style="margin:0;">SSPD SCHOOL</h1>
                        <p style="margin:5px 0;">Official Fee Payment Receipt</p>
                    </div>
                    <div class="info-grid">
                        <div><strong>Student Name:</strong> ${entry.name}</div>
                        <div><strong>Receipt Date:</strong> ${today}</div>
                        <div><strong>Standard:</strong> ${entry.std}</div>
                        <div><strong>Division:</strong> ${entry.div}</div>
                    </div>

                    <div class="section-title">Fee Breakdown (Categories)</div>
                    <table>
                        <thead>
                            <tr>
                                <th colspan="3">Category Name</th>
                                <th style="text-align:right;">Amount Due</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${categoriesHtml}
                            <tr class="total-row">
                                <td colspan="3" style="border:1px solid #ddd; padding:10px; text-align:right;">Total Annual Fee:</td>
                                <td style="border:1px solid #ddd; padding:10px; text-align:right;">₹${entry.totalFeesDue.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="section-title">Payment History (Installments)</div>
                    <table>
                        <thead>
                            <tr>
                                <th style="width:40px;">Sr.</th>
                                <th>Date</th>
                                <th>Mode</th>
                                <th style="text-align:right;">Amount Paid</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${installmentsHtml}
                            <tr class="total-row">
                                <td colspan="3" style="border:1px solid #ddd; padding:10px; text-align:right;">Total Amount Received:</td>
                                <td style="border:1px solid #ddd; padding:10px; text-align:right; color:green;">₹${entry.totalPaid.toLocaleString()}</td>
                            </tr>
                            <tr class="total-row">
                                <td colspan="3" style="border:1px solid #ddd; padding:10px; text-align:right;">Outstanding Balance:</td>
                                <td style="border:1px solid #ddd; padding:10px; text-align:right; color:red;">₹${entry.remaining.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="footer">
                        <p>This is a computer-generated document and does not require a physical signature.</p>
                    </div>
                    <div class="no-print" style="text-align:center; margin-top:30px;">
                        <button onclick="window.print()" style="padding:12px 30px; background:#3b82f6; color:white; border:none; cursor:pointer; border-radius:5px; font-weight:bold; font-size:16px;">Print / Save as PDF</button>
                    </div>
                </body>
            </html>
        `);
    receiptWindow.document.close();
  };

  const handleActionClick = (entry) => {
    const currentEntry =
      studentFeeList.find((e) => e._id === entry._id) || entry;
    const status = getPaymentStatus(currentEntry);

    if (status === "Paid") {
      downloadReceipt(currentEntry);
    } else if (status === "N/A") {
      alert(
        `Cannot process payment: Fee structure for Standard ${currentEntry.std} not found.`,
      );
    } else {
      // FIX: Set payment date to current date only
      const today = new Date().toISOString().split("T")[0];
      const remainingAmount = calculateRemainingAmount(currentEntry);

      setFormData({
        date: today,
        installmentType: "Custom",
        amount: remainingAmount || 0,
        mode: "Cash",
      });
      setSelectedEntry(currentEntry);
      setModalOpen(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "installmentType") {
      let newAmount = formData.amount;
      const annual = selectedEntry.totalFeesDue;
      const remaining = calculateRemainingAmount(selectedEntry);

      switch (value) {
        case "Monthly":
          newAmount = annual / 12;
          break;
        case "Quarterly":
          newAmount = annual / 4;
          break;
        case "Half Yearly":
          newAmount = annual / 2;
          break;
        case "Yearly":
          newAmount = annual;
          break;
        default:
          newAmount = 0;
      }

      if (value !== "Custom") {
        newAmount = Math.min(newAmount, remaining);
      }

      setFormData((prev) => ({
        ...prev,
        installmentType: value,
        amount: Math.round(newAmount),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleModalSubmit = async () => {
    if (!selectedEntry || !formData.date || formData.amount <= 0) {
      alert("Please fill in the required fields with a valid amount.");
      return;
    }

    const remainingAmount = calculateRemainingAmount(selectedEntry);

    if (formData.amount > remainingAmount) {
      alert(
        `Amount cannot exceed remaining balance of ₹${remainingAmount.toLocaleString()}`,
      );
      return;
    }

    const existingPaymentEntry = paymentEntries.find(
      (e) => e.name === selectedEntry.name,
    );
    const paymentEntryId = existingPaymentEntry?._id;

    const apiEndpoint = paymentEntryId
      ? `${API_BASE_URL}api/update-payment-entry/${paymentEntryId}`
      : `${API_BASE_URL}api/add-payment-entry`;

    const method = paymentEntryId ? "put" : "post";

    const payload = {
      date: formData.date,
      amount: Number(formData.amount),
      mode: formData.mode,
      installmentPlan: formData.installmentType,
      ...(method === "post" && {
        name: selectedEntry.name,
        std: selectedEntry.std,
        div: selectedEntry.div,
        totalFees: selectedEntry.totalFeesDue,
      }),
    };

    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      await axios({
        method: method,
        url: apiEndpoint,
        data: payload,
        headers: {
          "Content-Type": "application/json",
          auth: AUTH_HEADER,
          username: storedUsername,
          role: storedRole,
        },
      });
      alert("Payment entry updated successfully!");
      handleModalClose();
      fetchStudentFeeData();
    } catch (error) {
      console.error(`Error ${method}ting payment entry:`, error);
      alert("Error processing payment. Please try again.");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedEntry(null);
    setFormData({
      date: "",
      installmentType: "Custom",
      amount: 0,
      mode: "Online",
    });
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center text-gray-500 py-8">
          <p className="text-lg">Loading student and fee data...</p>
        </div>
      );
    }

    const filtersAreEmpty = !selectedStd && !selectedDiv && !searchTerm;

    if (studentFeeList.length === 0) {
      if (filtersAreEmpty) {
        return (
          <div className="text-center text-gray-500 py-8">
            <p className="text-lg">
              Please select a Standard and Division, or enter a Search Term to
              view student fees.
            </p>
          </div>
        );
      } else {
        return (
          <div className="text-center text-gray-500 py-8">
            <p className="text-lg">
              No students found matching the current filters.
            </p>
          </div>
        );
      }
    }

    return renderTable();
  };

  const renderTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border">
        <thead className="bg-blue-100 text-black">
          <tr>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Std</th>
            <th className="border px-4 py-2 text-left">Div</th>
            <th className="border px-4 py-2 text-left">Installment Dates</th>
            <th className="border px-4 py-2 text-left">Installment Amounts</th>
            <th className="border px-4 py-2 text-left">Next Due Date</th>
            <th className="border px-4 py-2 text-left">Total Fees Due</th>
            <th className="border px-4 py-2 text-left">Paid Amount</th>
            <th className="border px-4 py-2 text-left">Remaining</th>
            <th className="border px-4 py-2 text-left">Installment Type</th>
            <th className="border px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {studentFeeList.map((entry, index) => {
            const status = getPaymentStatus(entry);

            const calculateNextDueDate = (entry) => {
              const currentStatus = getPaymentStatus(entry);
              if (currentStatus === "Paid" || currentStatus === "N/A")
                return "N/A";

              if (!entry.installments || entry.installments.length === 0)
                return "N/A";

              const rawEntry = paymentEntries.find(
                (p) => p.name === entry.name,
              );
              const plan = rawEntry?.installmentPlan || "Monthly";

              if (plan === "Yearly" || plan === "Full Payment") return "N/A";

              const baseDate = new Date(
                entry.installments[entry.installments.length - 1].date,
              );

              let nextDate = new Date(baseDate);
              if (plan === "Monthly" || plan === "Custom") {
                nextDate.setMonth(nextDate.getMonth() + 1);
              } else if (plan === "Quarterly") {
                nextDate.setMonth(nextDate.getMonth() + 3);
              } else if (plan === "Half Yearly") {
                nextDate.setMonth(nextDate.getMonth() + 6);
              } else {
                return "N/A";
              }

              return nextDate.toLocaleDateString();
            };

            return (
              <tr
                key={entry._id || index}
                className="hover:bg-gray-50 align-top"
              >
                <td className="border px-4 py-2">
                  {/* FIX: Student Name is no longer a clickable button */}
                  <span className="text-gray-800">{entry.name}</span>
                </td>
                <td className="border px-4 py-2">{entry.std}</td>
                <td className="border px-4 py-2">{entry.div}</td>
                <td className="border px-4 py-2">
                  {entry.installments && entry.installments.length > 0 ? (
                    entry.installments.map((installment, i) => (
                      <div key={i} className="text-sm">
                        {new Date(installment.date).toLocaleDateString()}
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {entry.installments && entry.installments.length > 0 ? (
                    entry.installments.map((installment, i) => (
                      <div key={i} className="text-sm">
                        ₹{(installment.amount || 0).toLocaleString()}
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400">₹0</span>
                  )}
                </td>
                <td className="border px-4 py-2 text-black-600 font-semibold">
                  {calculateNextDueDate(entry)}
                </td>
                <td className="border px-4 py-2 font-semibold">
                  ₹{entry.totalFeesDue.toLocaleString()}
                </td>
                <td className="border px-4 py-2 text-green-600 font-semibold">
                  ₹{entry.totalPaid.toLocaleString()}
                </td>
                <td className="border px-4 py-2 text-red-600 font-semibold">
                  ₹{entry.remaining.toLocaleString()}
                </td>
                <td className="border px-4 py-2">
                  <span className="font-semibold px-2 py-1 rounded text-xs bg-gray-100 text-gray-800">
                    {entry.installmentType}
                  </span>
                </td>
                <td className="border px-4 py-2">
                  {status === "Paid" ? (
                    <button
                      onClick={() => handleActionClick(entry)}
                      className="px-3 py-1 rounded text-sm bg-green-500 text-white hover:bg-green-600"
                    >
                      Download
                    </button>
                  ) : status === "Partial" ? (
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => handleActionClick(entry)}
                        className="px-3 py-1 rounded text-sm bg-blue-500 text-white hover:bg-blue-600"
                      >
                        Pay
                      </button>
                      <button
                        onClick={() => downloadReceipt(entry)}
                        className="px-3 py-1 rounded text-sm bg-green-500 text-white hover:bg-green-600"
                      >
                        Receipt
                      </button>
                    </div>
                  ) : status === "N/A" ? (
                    <span className="text-sm text-gray-500">No Fee Data</span>
                  ) : (
                    <button
                      onClick={() => handleActionClick(entry)}
                      className="px-3 py-1 rounded text-sm bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="p-6 space-y-8">
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search Student"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border px-4 py-2 rounded-l"
              />
              <div
                className={`text-white px-4 py-2 rounded-r cursor-pointer bg-blue-500`}
              >
                <FontAwesomeIcon icon={faSearch} />
              </div>
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <label className="whitespace-nowrap">Std:</label>
                <SelectField
                  label=""
                  options={standardOptions}
                  onChange={(e) => setSelectedStd(e.target.value)}
                  value={selectedStd}
                />

                <SelectField
                  label=""
                  options={divisionOptions}
                  onChange={(e) => setSelectedDiv(e.target.value)}
                  value={selectedDiv}
                />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold">Payment Entry</h2>

          {selectedStd && feesData[normalizeStd(selectedStd)] > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Fee Structure for Standard {selectedStd}
              </h3>
              <p className="text-blue-700">
                Total Annual Fees Due: ₹
                {feesData[normalizeStd(selectedStd)].toLocaleString()}
              </p>
            </div>
          )}

          {renderContent()}
        </div>

        {/* Modal */}
        {modalOpen && selectedEntry && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: "rgba(50, 50, 50, 0.5)" }}
          >
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
              <div className="max-h-[75vh] overflow-y-auto pr-2">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  Payment Details
                </h3>

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Payment Summary
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Total Fees:</span>
                      <span className="font-semibold">
                        ₹{selectedEntry.totalFeesDue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Paid Amount:</span>
                      <span className="font-semibold text-green-600">
                        ₹{selectedEntry.totalPaid.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-1">
                      <span>Remaining:</span>
                      <span className="font-semibold text-red-600">
                        ₹{selectedEntry.remaining.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Student Name
                    </label>
                    <input
                      type="text"
                      value={selectedEntry.name}
                      readOnly
                      className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100 text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Payment Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      readOnly
                      required
                      className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Installment Type
                    </label>
                    <select
                      name="installmentType"
                      value={formData.installmentType}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Custom">Custom</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Half Yearly">Half Yearly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Amount (₹) *
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      readOnly={formData.installmentType !== "Custom"}
                      min="1"
                      max={selectedEntry.remaining}
                      className={`mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md ${formData.installmentType !== "Custom" ? "bg-gray-100" : "focus:ring-2 focus:ring-blue-500"}`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Payment Mode
                    </label>
                    <select
                      name="mode"
                      value={formData.mode}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {paymentModeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleModalSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
                  disabled={
                    !formData.date ||
                    formData.amount <= 0 ||
                    formData.amount > selectedEntry.remaining
                  }
                >
                  Submit Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default PaymentEntry;