import React, { useState } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { API_BASE_URL } from "../config"; // 🔥 FIX 1: Import correct base URL
import { useNavigate } from "react-router-dom";

// --- Constants for Upload & Documents ---
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dyloa2svi/auto/upload";
const CLOUDINARY_UPLOAD_PRESET = "sspd-student-management";

const IFSC_API_URL = "https://ifsc.razorpay.com/";

const STAFF_DOCUMENT_OPTIONS = [
  "Select Document Type",
  "Aadhaar Card",
  "Resume",
];

// TypeScript interfaces
interface FormData {
  photo: File | null;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  maritalStatus: string;
  bloodGroup: string;
  gender: string;
  nationality: string;
  category: string;
  aadhaarNo: string; // Used in frontend state
  email: string;
  contactNo: string;
  alternateContactNo: string;
  totalExperience: string;
  previousEmployer: string;
  bankName: string;
  branchName: string;
  accountNumber: string;
  ifscCode: string;
  panNumber: string;
  licenseNo: string;
  designation: "Driver" | "Supervisor" | "";
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  city: string;
  district: string;
  state: string;
  country: string;
  isDeclared: boolean;
}

interface FormErrors {
  [key: string]: string | null;
  aadhaarNo: string | null; // Mapped from backend 'aadhaarNumber'
  documentUpload: string | null;
  photo: string | null;
}

interface PendingDocuments {
  [key: string]: File | undefined;
}

// Changed component name from AddStaff to AddSupervisor
const AddSupervisor: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    photo: null,
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    maritalStatus: "",
    bloodGroup: "",
    gender: "",
    nationality: "",
    category: "",
    aadhaarNo: "",
    email: "",
    contactNo: "",
    alternateContactNo: "",
    totalExperience: "",
    previousEmployer: "",
    bankName: "",
    branchName: "",
    accountNumber: "",
    ifscCode: "",
    panNumber: "",
    licenseNo: "",
    designation: "", // Initialize designation to empty string
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    city: "",
    district: "",
    state: "",
    country: "India",
    isDeclared: false,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({
    aadhaarNo: null,
    documentUpload: null,
    photo: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPincodeLoading, setIsPincodeLoading] = useState(false);
  const [isBankAutoPopulated, setIsBankAutoPopulated] = useState(false);
  const [isStaffActive, setIsStaffActive] = useState(true);

  const [pendingDocuments, setPendingDocuments] = useState<PendingDocuments>(
    {},
  );
  const [currentDocType, setCurrentDocType] = useState(
    STAFF_DOCUMENT_OPTIONS[0],
  );

  // Helper Component for Error Messages
  const ErrorMessage = ({ error }: { error: string | null }) =>
    error ? <div className="text-red-500 text-xs mt-1">{error}</div> : null;

  // -------------------------------
  // Cloudinary Upload Helper
  // -------------------------------
  const uploadToCloudinary = async (
    file: File,
    folder: string,
    name: string,
  ): Promise<string> => {
    const data = new globalThis.FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    data.append("folder", folder);
    data.append("public_id", name);

    const res = await axios.post(CLOUDINARY_UPLOAD_URL, data);
    return res.data.secure_url;
  };

  const fetchBankDetailsByIFSC = async (ifsc: string) => {
    setErrors((prev) => ({ ...prev, ifscCode: "Fetching bank details..." }));
    setIsBankAutoPopulated(false);

    try {
      const response = await axios.get(`${IFSC_API_URL}${ifsc}`);

      // Razorpay API returns 200 even for failures, success means having BANK data
      if (response.data && response.data.BANK) {
        setFormData((prev) => ({
          ...prev,
          bankName: response.data.BANK,
          branchName: response.data.BRANCH,
        }));
        setIsBankAutoPopulated(true);
        setErrors((prev) => ({
          ...prev,
          ifscCode: null,
          bankName: null,
          branchName: null,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          ifscCode: "Invalid IFSC Code. Bank not found.",
        }));
        setFormData((prev) => ({ ...prev, bankName: "", branchName: "" }));
      }
    } catch (error) {
      console.error("Error fetching IFSC data:", error);
      setErrors((prev) => ({
        ...prev,
        ifscCode: "Error contacting bank service.",
      }));
    }
  };

  // -------------------------------
  // Address Lookup API
  // -------------------------------
  const fetchAddressByPincode = async (pincode: string) => {
    if (!/^\d{6}$/.test(pincode)) {
      setErrors((prev) => ({
        ...prev,
        postalCode: "Pincode must be 6 digits.",
      }));
      return;
    }

    setIsPincodeLoading(true);
    setErrors((prev) => ({ ...prev, postalCode: null }));

    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`,
      );
      const data = response.data;

      if (
        data &&
        data[0] &&
        data[0].Status === "Success" &&
        data[0].PostOffice.length > 0
      ) {
        const postOffice = data[0].PostOffice[0];

        setFormData((prev) => ({
          ...prev,
          city: postOffice.Block || postOffice.District,
          district: postOffice.District,
          state: postOffice.State,
        }));
        setErrors((prev) => ({
          ...prev,
          city: null,
          district: null,
          state: null,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          postalCode: "Invalid Pincode or service unavailable.",
        }));
        setFormData((prev) => ({ ...prev, city: "", district: "", state: "" }));
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, postalCode: "Pincode service failed." }));
    } finally {
      setIsPincodeLoading(false);
    }
  };

  // -------------------------------
  // Validation Logic (Individual Field)
  // -------------------------------
  const validateField = (
    name: keyof FormData,
    value: string | File | boolean | null,
  ): boolean => {
    let errorMsg: string | null = null;
    const stringValue = typeof value === "string" ? value : "";

    const isRequired = [
      "firstName",
      "lastName",
      "dob",
      "maritalStatus",
      "bloodGroup",
      "gender",
      "nationality",
      "category",
      "aadhaarNo",
      "email",
      "contactNo",
      "bankName",
      "branchName",
      "accountNumber",
      "ifscCode",
      "panNumber",
      "addressLine1",
      "postalCode",
      "city",
      "state",
      "country",
      "designation",
      "totalExperience",
      "previousEmployer",
    ].includes(name);

    if (name === "isDeclared" && value === false) {
      errorMsg = "You must agree to the terms and conditions.";
    }
    // Explicitly enforce email requirement
    else if (name === "email" && !stringValue.trim()) {
      errorMsg = "Email is required.";
    } else if (
      isRequired &&
      !stringValue.trim() &&
      name !== "addressLine2" &&
      name !== "middleName" &&
      name !== "alternateContactNo"
    ) {
      errorMsg = "Required.";
    } else {
      switch (name) {
        case "dob": // <--- MODIFIED DOB VALIDATION FOR AGE
          if (stringValue.trim()) {
            const today = new Date();
            const dobDate = new Date(stringValue);

            // Check if DOB is in the future
            if (dobDate > today) {
              errorMsg = "Date of Birth cannot be in the future.";
              break;
            }

            // Calculate age
            let age = today.getFullYear() - dobDate.getFullYear();
            const m = today.getMonth() - dobDate.getMonth();

            // Adjust age if birth month/day has not yet passed this year
            if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
              age--;
            }

            if (age < 18) {
              errorMsg = "Staff must be at least 18 years old.";
            }
          } else if (isRequired) {
            errorMsg = "Required.";
          }
          break;
        case "contactNo":
        case "alternateContactNo":
          if (stringValue.trim() && !/^\d{10}$/.test(stringValue))
            errorMsg = "Must be 10 digits.";
          break;
        case "aadhaarNo":
          if (stringValue.trim() && !/^\d{12}$/.test(stringValue))
            errorMsg = "Must be 12 digits.";
          break;
        case "email":
          if (
            stringValue.trim() &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stringValue)
          )
            errorMsg = "Invalid email format.";
          break;
        case "licenseNo":
          if (formData.designation === "Driver" && !stringValue.trim())
            errorMsg = "Required for Drivers.";
          break;
        case "postalCode":
          if (stringValue.trim() && !/^\d{6}$/.test(stringValue))
            errorMsg = "Must be 6 digits.";
          break;
        case "panNumber":
          if (
            stringValue.trim() &&
            !/^[A-Z]{5}\d{4}[A-Z]{1}$/i.test(stringValue)
          )
            errorMsg = "Invalid PAN format.";
          break;
        case "ifscCode":
          if (stringValue.trim() && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(stringValue))
            errorMsg = "Invalid IFSC format.";
          break;
        case "accountNumber":
          if (stringValue.trim() && !/^\d{9,18}$/.test(stringValue))
            errorMsg = "Invalid account number.";
          break;
        case "totalExperience":
          if (stringValue.trim() && !/^\d+(\.\d{1,2})?$/.test(stringValue))
            errorMsg = "Must be a number (e.g., 5 or 5.5).";
          break;
        default:
          break;
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    return errorMsg === null;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    let checked = false;
    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      checked = e.target.checked;
    }

    const key = name as keyof FormData;

    setErrors((prev) => ({ ...prev, [key]: null }));

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [key]: checked }));
      validateField(key, checked);
    } else {
      if (key === "designation" && value === "Supervisor") {
        setFormData((prev) => ({
          ...prev,
          licenseNo: "",
          [key]: value as "Supervisor",
        }));
        setErrors((prev) => ({ ...prev, licenseNo: null }));
      } else if (key === "designation" && value === "Driver") {
        setFormData((prev) => ({ ...prev, [key]: value as "Driver" }));
      } else {
        setFormData((prev) => ({ ...prev, [key]: value }));
      }

      if (key === "postalCode" && value.length === 6) {
        fetchAddressByPincode(value);
      } else if (key === "postalCode" && value.length !== 6) {
        setErrors((prev) => ({ ...prev, postalCode: null }));
      }
      if (key === "ifscCode") {
        // Clear dependent bank fields manually before lookup
        setFormData((prev) => ({ ...prev, bankName: "", branchName: "" }));
        setIsBankAutoPopulated(false);

        // Check if IFSC format is correct (4 letters, 0, 6 alphanumeric)
        if (
          value.length === 11 &&
          /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value.toUpperCase())
        ) {
          fetchBankDetailsByIFSC(value.toUpperCase());
        }
      }

      validateField(key, value);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024 || !file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          photo: "Invalid file or size > 5MB. Must be an image.",
        }));
        e.target.value = "";
        setFormData((prev) => ({ ...prev, photo: null }));
        setPhotoPreview(null);
        return;
      }
      setFormData((prev) => ({ ...prev, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, photo: null }));
    } else {
      setFormData((prev) => ({ ...prev, photo: null }));
      setPhotoPreview(null);
    }
  };

  const handleDocumentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const docType = currentDocType;

    if (file) {
      const validTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (file.size > 10 * 1024 * 1024 || !validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          documentUpload: "Document must be PDF/Image and less than 10MB.",
        }));
        e.target.value = "";
        return;
      }

      setPendingDocuments((prev) => ({ ...prev, [docType]: file }));
      setErrors((prev) => ({ ...prev, documentUpload: null }));
    } else {
      setPendingDocuments((prev) => {
        const newDocs: PendingDocuments = { ...prev };
        delete newDocs[docType];
        return newDocs;
      });
    }
  };

  // -------------------------------
  // Validation Logic (Full Form)
  // -------------------------------
  const validateForm = (): boolean => {
    let isValid = true;
    let tempErrors: FormErrors = {
      aadhaarNo: null,
      documentUpload: null,
      photo: null,
    };

    // 0. Initial quick checks
    if (!formData.designation) {
      tempErrors.designation = "Please select a designation.";
      isValid = false;
    }

    // 1. Validate all form fields
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const value = formData[key];
      const stringValue = typeof value === "string" ? value : "";
      const isRequired = [
        "firstName",
        "lastName",
        "dob",
        "maritalStatus",
        "bloodGroup",
        "gender",
        "nationality",
        "category",
        "aadhaarNo",
        "email",
        "contactNo",
        "bankName",
        "branchName",
        "accountNumber",
        "ifscCode",
        "panNumber",
        "addressLine1",
        "postalCode",
        "city",
        "state",
        "country",
        "designation",
        "totalExperience",
        "previousEmployer",
      ].includes(key);

      let msg: string | null = null;

      if (key === "isDeclared" && value === false) {
        msg = "You must agree to the terms and conditions.";
      }
      // Explicitly enforce email requirement
      else if (key === "email" && !stringValue.trim()) {
        msg = "Email is required.";
      } else if (
        isRequired &&
        !stringValue.trim() &&
        key !== "addressLine2" &&
        key !== "middleName" &&
        key !== "alternateContactNo"
      ) {
        msg = "Required.";
      }

      // Run detailed field validation (replicates validateField logic to get message)
      if (msg === null) {
        switch (key) {
          case "contactNo":
          case "alternateContactNo":
            if (stringValue.trim() && !/^\d{10}$/.test(stringValue))
              msg = "Must be 10 digits.";
            break;
          case "aadhaarNo":
            if (stringValue.trim() && !/^\d{12}$/.test(stringValue))
              msg = "Must be 12 digits.";
            break;
          case "email":
            if (
              stringValue.trim() &&
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stringValue)
            )
              msg = "Invalid email format.";
            break;
          case "licenseNo":
            if (formData.designation === "Driver" && !stringValue.trim())
              msg = "Required for Drivers.";
            break;
          case "postalCode":
            if (stringValue.trim() && !/^\d{6}$/.test(stringValue))
              msg = "Must be 6 digits.";
            break;
          case "panNumber":
            if (
              stringValue.trim() &&
              !/^[A-Z]{5}\d{4}[A-Z]{1}$/i.test(stringValue)
            )
              msg = "Invalid PAN format.";
            break;
          case "ifscCode":
            if (
              stringValue.trim() &&
              !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(stringValue)
            )
              msg = "Invalid IFSC format.";
            break;
          case "accountNumber":
            if (stringValue.trim() && !/^\d{9,18}$/.test(stringValue))
              msg = "Invalid account number.";
            break;
          case "totalExperience":
            if (stringValue.trim() && !/^\d+(\.\d{1,2})?$/.test(stringValue))
              msg = "Must be a number (e.g., 5 or 5.5).";
            break;
          default:
            break;
        }
      }

      if (msg) {
        tempErrors = { ...tempErrors, [key]: msg };
        isValid = false;
      }
    });

    // 2. Validate Photo
    if (!formData.photo) {
      tempErrors.photo = "Photo is required.";
      isValid = false;
    }

    // 3. Validate Documents
    const requiredDocs = ["Aadhaar Card", "Resume"];
    const missingDocs = requiredDocs.filter(
      (docName) => !pendingDocuments[docName],
    );
    if (missingDocs.length > 0) {
      tempErrors.documentUpload = `Missing required documents: ${missingDocs.join(", ")}.`;
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // -------------------------------
  // Submission Handler
  // -------------------------------
  const handleSubmit = async () => {
    // 🔥 FIX 4: Guard clause for designation
    if (!formData.designation) {
      alert("Please select a designation (Driver or Supervisor).");
      setErrors((prev) => ({
        ...prev,
        designation: "Designation is required.",
      }));
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    let photoUrl = null;
    let aadhaarFileUrl = null;
    let resumeFileUrl = null;

    try {
      // 1️⃣ Upload files to Cloudinary
      const timestamp = Date.now();
      const staffIdForCloudinary = `${formData.designation.toLowerCase()}_${timestamp}_${formData.lastName}`;
      const uploadPromises: Promise<void>[] = [];

      // Photo upload
      if (formData.photo) {
        uploadPromises.push(
          uploadToCloudinary(
            formData.photo,
            "staff_photos",
            `${staffIdForCloudinary}_photo`,
          ).then((url) => (photoUrl = url)),
        );
      }

      // Aadhaar upload
      const aadhaarFile = pendingDocuments["Aadhaar Card"];
      if (aadhaarFile) {
        uploadPromises.push(
          uploadToCloudinary(
            aadhaarFile,
            "staff_documents",
            `${staffIdForCloudinary}_aadhaar`,
          ).then((url) => (aadhaarFileUrl = url)),
        );
      }

      // Resume upload
      const resumeFile = pendingDocuments["Resume"];
      if (resumeFile) {
        uploadPromises.push(
          uploadToCloudinary(
            resumeFile,
            "staff_documents",
            `${staffIdForCloudinary}_resume`,
          ).then((url) => (resumeFileUrl = url)),
        );
      }

      await Promise.all(uploadPromises);

      if (!photoUrl) throw new Error("Photo upload failed.");
      if (!aadhaarFileUrl) throw new Error("Aadhaar file upload failed.");
      if (!resumeFileUrl) throw new Error("Resume file upload failed.");

      // 2️⃣ Prepare Payload for Backend API
      const completeAddress = [
        formData.addressLine1,
        formData.addressLine2,
        `${formData.city}, ${formData.district}, ${formData.state}`,
        `${formData.postalCode}, ${formData.country}`,
      ]
        .filter(Boolean)
        .join(", ");

      const fullName =
        `${formData.firstName} ${formData.middleName} ${formData.lastName}`
          .trim()
          .replace(/\s+/g, " ");

      const payload = {
        // Name & Designation
        fullName,
        designation: formData.designation,

        // Personal Details (Split)
        firstName: formData.firstName,
        middleName: formData.middleName,
        lastName: formData.lastName,
        dob: formData.dob,
        maritalStatus: formData.maritalStatus,
        bloodGroup: formData.bloodGroup,
        gender: formData.gender,
        nationality: formData.nationality,
        category: formData.category,

        // Contact & ID
        contactNumber: formData.contactNo,
        alternateContactNumber: formData.alternateContactNo || null,
        email: formData.email,
        aadhaarNumber: formData.aadhaarNo, // Backend field name
        licenseNumber:
          formData.designation === "Driver" ? formData.licenseNo : null,
        vid:
          formData.designation === "Driver"
            ? `DUMMY_VID_${timestamp}`
            : undefined, // Placeholder

        // Address & Status
        completeAddress,
        status: isStaffActive ? "Active" : "Resigned",

        // Experience
        totalExperience: formData.totalExperience,
        previousEmployer: formData.previousEmployer,

        // Bank
        bankName: formData.bankName,
        branchName: formData.branchName,
        accountNumber: formData.accountNumber,
        ifscCode: formData.ifscCode,
        panNumber: formData.panNumber,

        // File URLs
        photoUrl,
        aadhaarFileUrl,
        resumeFileUrl,

        // Note: The backend must use 'fullName' as 'driverName' if designation is 'Driver' (Backend fix)
      };

      // **********************************************
      // 🔥 ADDED LOG: Display the payload before sending
      // **********************************************
      console.log("FINAL PAYLOAD SENT TO SERVER:", payload);

      // 3️⃣ API call
      // FIX 5: Use the single correct endpoint for both Driver and Supervisor
      const apiEndpoint = `${API_BASE_URL}api/add-vsupervisior`;

      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await axios.post(apiEndpoint, payload, {
        headers: {
          auth: "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=",
          "Content-Type": "application/json",

          username: storedUsername,
          role: storedRole,
        },
      });

      if (response.status === 201) {
        alert(`${formData.designation} registered successfully!`);
        handleReset();
        // navigate("/transport-staff");
      } else {
        throw new Error(
          response.data?.message ||
            `Failed to register ${formData.designation}`,
        );
      }
    } catch (error) {
      console.error(`Error submitting ${formData.designation} form:`, error);

      const axiosError = axios.isAxiosError(error) ? error : null;
      let errorMessage = "An unknown error occurred.";
      let tempErrors: FormErrors = errors;

      if (axiosError?.response?.data?.errors) {
        // Backend Mongoose Validation Errors
        const serverErrors = axiosError.response.data.errors;

        // Map Mongoose errors back to frontend state keys
        Object.keys(serverErrors).forEach((key) => {
          let frontendKey: string = key;

          // Handle specific key mismatches
          if (key === "aadhaarNumber") frontendKey = "aadhaarNo"; // FIX 2

          if (
            frontendKey in formData ||
            ["aadhaarNo", "documentUpload", "photo"].includes(frontendKey)
          ) {
            tempErrors = {
              ...tempErrors,
              [frontendKey]: serverErrors[key].message || serverErrors[key],
            };
          }
        });

        const specificErrors = Object.entries(serverErrors)
          .map(([key, value]: [string, any]) => {
            // Display user-friendly key for output
            const displayKey = key === "driverName" ? "Full Name" : key;
            return `${displayKey}: ${value.message || value}`;
          })
          .join("\n- ");
        errorMessage = `Validation Errors from server:\n- ${specificErrors}`;
      } else if (axiosError?.response?.data?.message) {
        errorMessage = axiosError.response.data.message;
      } else if (error instanceof Error) {
        // This covers frontend errors like "Photo upload failed." and network errors
        errorMessage = error.message;
      }

      setErrors(tempErrors); // Display validation errors
      alert(`Error registering ${formData.designation}: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      photo: null,
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      maritalStatus: "",
      bloodGroup: "",
      gender: "",
      nationality: "",
      category: "",
      aadhaarNo: "",
      email: "",
      contactNo: "",
      alternateContactNo: "",
      totalExperience: "",
      previousEmployer: "",
      bankName: "",
      branchName: "",
      accountNumber: "",
      ifscCode: "",
      panNumber: "",
      licenseNo: "",
      designation: "",
      addressLine1: "",
      addressLine2: "",
      postalCode: "",
      city: "",
      district: "",
      state: "",
      country: "India",
      isDeclared: false,
    });
    setPhotoPreview(null);
    setErrors({ aadhaarNo: null, documentUpload: null, photo: null });
    setIsStaffActive(true);
    setPendingDocuments({});
    setCurrentDocType(STAFF_DOCUMENT_OPTIONS[0]);
  };

  const isLicenseDisabled =
    formData.designation === "Supervisor" || formData.designation === "";
  const hasDesignation = formData.designation !== "";

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-8">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-700 text-center mb-8">
            Staff Registration
          </h2>

          <div className="space-y-8">
            {/* -------------------- 1. TOP GRID: Staff Details (Left 3/4) and Photo/Status (Right 1/4) -------------------- */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* LEFT COLUMN (lg:col-span-3): Staff Details Box */}
              <div className="lg:col-span-3">
                <div className="border border-gray-300 rounded-lg shadow-sm">
                  <div className="bg-blue-400 p-3 rounded-t-lg">
                    <h3 className="text-xl font-semibold text-white">
                      Staff Details
                    </h3>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                    {/* Name Split */}
                    {["firstName", "middleName", "lastName"].map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {field.charAt(0).toUpperCase() +
                            field.slice(1).replace("Name", " Name")}{" "}
                          {field !== "middleName" && (
                            <span className="text-red-500">*</span>
                          )}
                        </label>
                        <input
                          type="text"
                          name={field}
                          value={formData[field as keyof FormData] as string}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-400 ${errors[field] ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                          placeholder={`Enter ${field.replace("Name", "")} name`}
                        />
                        <ErrorMessage error={errors[field]} />
                      </div>
                    ))}

                    {/* Designation */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Designation <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-400 appearance-none ${errors.designation ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                      >
                        <option value="" disabled>
                          Select designation
                        </option>
                        <option value="Driver">Driver</option>
                        <option value="Supervisor">Supervisor</option>
                      </select>
                      <ErrorMessage error={errors.designation} />
                    </div>

                    {/* DOB */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-400 ${errors.dob ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                      />
                      <ErrorMessage error={errors.dob} />
                    </div>

                    {/* Marital Status */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Marital Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-400 appearance-none ${errors.maritalStatus ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                      >
                        <option value="" disabled>
                          Select Status
                        </option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widow">Widow</option>
                      </select>
                      <ErrorMessage error={errors.maritalStatus} />
                    </div>

                    {/* Blood Group */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Blood Group <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-400 appearance-none ${errors.bloodGroup ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                      >
                        <option value="" disabled>
                          Select Blood Group
                        </option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                      <ErrorMessage error={errors.bloodGroup} />
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-400 appearance-none ${errors.gender ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                      >
                        <option value="" disabled>
                          Select Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <ErrorMessage error={errors.gender} />
                    </div>

                    {/* Nationality */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nationality <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none ${errors.nationality ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                      >
                        <option value="" disabled>
                          Select Nationality
                        </option>
                        <option value="Indian">Indian</option>
                        <option value="Other">Other</option>
                      </select>
                      <ErrorMessage error={errors.nationality} />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none ${errors.category ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                      >
                        <option value="" disabled>
                          Select Category
                        </option>
                        <option value="General">General</option>
                        <option value="OBC">OBC</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                        <option value="Other">Other</option>
                      </select>
                      <ErrorMessage error={errors.category} />
                    </div>

                    {/* Aadhaar Number */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Aadhaar Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="aadhaarNo"
                        value={formData.aadhaarNo}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.aadhaarNo ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                        placeholder="Enter 12-digit Aadhaar number"
                        maxLength={12}
                      />
                      <ErrorMessage error={errors.aadhaarNo} />
                    </div>

                    {/* License Number (Conditional) */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        License Number{" "}
                        {formData.designation === "Driver" ? (
                          <span className="text-red-500">*</span>
                        ) : (
                          ""
                        )}
                      </label>
                      <input
                        type="text"
                        name="licenseNo"
                        value={formData.licenseNo}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.licenseNo ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"} ${isLicenseDisabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
                        placeholder={
                          isLicenseDisabled
                            ? "N/A for Supervisors"
                            : "Enter driving license number"
                        }
                        disabled={isLicenseDisabled}
                      />
                      <ErrorMessage error={errors.licenseNo} />
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN (lg:col-span-1): Photo/Status */}
              <div className="lg:col-span-1 space-y-4 pt-10 lg:pt-0">
                <div className="sticky top-6">
                  {/* Image Upload Container */}
                  <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
                    {/* Header (Red Background) */}
                    <div className="bg-blue-400 p-3">
                      <h4 className="text-xl px-15 items-center font-semibold text-white">
                        Staff Photo
                      </h4>
                    </div>

                    <div className="p-4 flex flex-col items-center space-y-4">
                      {/* Photo Preview Box */}
                      <div
                        className={`w-50 h-50 bg-gray-100 rounded flex items-center justify-center border-2 ${errors.photo ? "border-red-500" : "border-gray-200"} overflow-hidden`}
                      >
                        {photoPreview ? (
                          <img
                            src={photoPreview}
                            alt="Staff Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center text-gray-500 text-sm">
                            Photo Preview
                          </div>
                        )}
                      </div>

                      {/* Choose Photo Button/Input */}
                      <label className="w-full block">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="sr-only"
                        />
                        <div className="py-2 px-6 bg-blue-400 text-white hover:bg-blue-700 transition-colors font-semibold cursor-pointer text-center rounded-lg shadow-md">
                          Choose Photo
                        </div>
                      </label>
                      <ErrorMessage error={errors.photo} />

                      {/* Status Toggle */}
                      <div className="flex items-center justify-center pt-4 border-t w-full">
                        <span
                          className={`text-sm font-bold transition-colors ${!isStaffActive ? "text-red-600" : "text-gray-400"} mr-2`}
                        >
                          Resigned
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isStaffActive}
                            onChange={(e) => setIsStaffActive(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                        </label>
                        <span
                          className={`text-sm font-bold transition-colors ${isStaffActive ? "text-green-600" : "text-gray-400"} ml-2`}
                        >
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* -------------------- END TOP GRID -------------------- */}

            {/* Contact Details Box (FULL WIDTH) */}
            <div className="border border-gray-300 rounded-lg shadow-sm">
              <div className="bg-blue-400 p-3 rounded-t-lg">
                <h3 className="text-xl font-semibold text-white">
                  Contact Details
                </h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                {/* Email Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                    placeholder="name@example.com"
                  />
                  <ErrorMessage error={errors.email} />
                </div>

                {/* Contact Number (Primary) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Number (Primary){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.contactNo ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                  />
                  <ErrorMessage error={errors.contactNo} />
                </div>

                {/* Alternate Contact Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Alternate Contact Number
                  </label>
                  <input
                    type="tel"
                    name="alternateContactNo"
                    value={formData.alternateContactNo}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.alternateContactNo ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                    placeholder="Enter alternate contact (optional)"
                    maxLength={10}
                  />
                  <ErrorMessage error={errors.alternateContactNo} />
                </div>
              </div>
            </div>

            {/* Experience Details Box (FULL WIDTH) */}
            <div className="border border-gray-300 rounded-lg shadow-sm">
              <div className="bg-blue-400 p-3 rounded-t-lg">
                <h3 className="text-xl font-semibold text-white">
                  Experience Details
                </h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {/* Total Experience */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Experience (Years){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="totalExperience"
                    value={formData.totalExperience}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.totalExperience ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                    placeholder="e.g. 5.5"
                  />
                  <ErrorMessage error={errors.totalExperience} />
                </div>

                {/* Previous Employer Details */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Previous Employer Details{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="previousEmployer"
                    value={formData.previousEmployer}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.previousEmployer ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                    placeholder="Name of previous company or N/A"
                  />
                  <ErrorMessage error={errors.previousEmployer} />
                </div>
              </div>
            </div>

            {/* Address Details Box (FULL WIDTH) */}
            <div className="border border-gray-300 rounded-lg shadow-sm">
              <div className="bg-blue-400 p-3 rounded-t-lg">
                <h3 className="text-xl font-semibold text-white">
                  Address Details
                </h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {/* Address Line 1 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address Line 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.addressLine1 ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                    placeholder="House No, Building, Street"
                  />
                  <ErrorMessage error={errors.addressLine1} />
                </div>

                {/* Address Line 2 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300 hover:border-gray-400`}
                    placeholder="Area, Landmark (Optional)"
                  />
                </div>

                {/* Postal Code (with Lookup) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Postal Code <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.postalCode ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                      placeholder="Enter 6-digit Pincode"
                      maxLength={6}
                      disabled={isPincodeLoading}
                    />
                    {isPincodeLoading && (
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </span>
                    )}
                  </div>
                  <ErrorMessage error={errors.postalCode} />
                </div>

                {/* City (Auto-populated) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg ${errors.city ? "border-red-500 bg-red-50" : "border-gray-300"} bg-gray-100 text-gray-700`}
                    placeholder="Auto-populated"
                    disabled={true}
                  />
                  <ErrorMessage error={errors.city} />
                </div>

                {/* State (Auto-populated) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg ${errors.state ? "border-red-500 bg-red-50" : "border-gray-300"} bg-gray-100 text-gray-700`}
                    placeholder="Auto-populated"
                    disabled={true}
                  />
                  <ErrorMessage error={errors.state} />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg border-gray-300 bg-gray-100 text-gray-700`}
                    placeholder="India"
                    disabled={true}
                  />
                </div>
              </div>
            </div>

            {/* -------------------- 5. Bank Salary Details Box -------------------- */}
            <div className="border border-gray-300 rounded-lg shadow-sm">
              <div className="bg-blue-400 p-3 rounded-t-lg">
                <h3 className="text-xl font-semibold text-white">
                  Bank & Salary Details
                </h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                {/* Bank Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bank Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.bankName ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                    placeholder="e.g. State Bank of India"
                  />
                  <ErrorMessage error={errors.bankName} />
                </div>

                {/* Branch Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Branch Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="branchName"
                    value={formData.branchName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.branchName ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                    placeholder="e.g. Vapi Branch"
                  />
                  <ErrorMessage error={errors.branchName} />
                </div>

                {/* Account Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Account Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.accountNumber ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                    placeholder="Enter A/C Number"
                  />
                  <ErrorMessage error={errors.accountNumber} />
                </div>

                {/* IFSC Code */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    IFSC Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.ifscCode ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                    placeholder="e.g. SBIN0001234"
                    maxLength={11}
                  />
                  <ErrorMessage error={errors.ifscCode} />
                </div>

                {/* PAN Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    PAN Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.panNumber ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"}`}
                    placeholder="e.g. ABCDE1234F"
                    maxLength={10}
                  />
                  <ErrorMessage error={errors.panNumber} />
                </div>
              </div>
            </div>

            {/* -------------------- 6. Document Upload Box (FULL WIDTH) -------------------- */}
            <div className="border border-gray-300 rounded-lg shadow-sm">
              <div className="bg-blue-400 p-3 rounded-t-lg">
                <h3 className="text-xl font-semibold text-white">
                  Upload Documents
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end bg-white-50 rounded-lg">
                  {/* Document Type Dropdown */}
                  <div>
                    <label className="mb-1 text-sm font-semibold text-gray-700">
                      Select Document Type *
                    </label>
                    <select
                      className="border px-4 py-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none border-gray-300"
                      value={currentDocType}
                      onChange={(e) => setCurrentDocType(e.target.value)}
                    >
                      {STAFF_DOCUMENT_OPTIONS.map((opt) => (
                        <option
                          key={opt}
                          value={opt}
                          disabled={opt === STAFF_DOCUMENT_OPTIONS[0]}
                        >
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* File Input (Only visible if a document type is selected) */}
                  {currentDocType !== STAFF_DOCUMENT_OPTIONS[0] && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Upload {currentDocType}
                      </label>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={handleDocumentFileChange}
                        key={currentDocType}
                        className="mt-1 block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                          file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-800
                          hover:file:bg-blue-200"
                      />
                      {pendingDocuments[currentDocType] && (
                        <p className="text-xs text-blue-600 mt-1">
                          File selected:{" "}
                          {pendingDocuments[currentDocType]!.name}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* List of Uploaded Documents (Pending) */}
                <div className="mt-6">
                  <h5 className="text-md font-semibold text-gray-800 mb-2">
                    Files Selected:
                  </h5>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {STAFF_DOCUMENT_OPTIONS.filter(
                      (type) => type !== STAFF_DOCUMENT_OPTIONS[0],
                    ).map((docType) => {
                      const file = pendingDocuments[docType];
                      const isRequired = ["Aadhaar Card", "Resume"].includes(
                        docType,
                      );
                      return (
                        <li
                          key={docType}
                          className={`flex justify-between items-center p-3 border rounded-lg ${file ? "bg-blue-50 border-blue-400" : isRequired ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"}`}
                        >
                          <span>
                            <strong className="font-medium">
                              {docType}
                              {isRequired ? " *" : ""}:
                            </strong>
                            {file ? ` ${file.name}` : " No file selected"}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <ErrorMessage error={errors.documentUpload} />
                </div>
              </div>
            </div>

            {/* -------------------- 7. Declaration Section -------------------- */}
            <div className="border border-gray-300 rounded-lg shadow-sm">
              <div className="bg-blue-400 p-3 rounded-t-lg">
                <h3 className="text-xl font-semibold text-white">
                  Declaration
                </h3>
              </div>
              <label className="flex items-start cursor-pointer p-6">
                <input
                  type="checkbox"
                  name="isDeclared"
                  checked={formData.isDeclared}
                  onChange={handleInputChange}
                  className="mt-1 mr-3 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <p className="text-sm text-gray-700 leading-relaxed">
                  I hereby declare that the information provided above is
                  accurate and true to the best of my knowledge. I agree to
                  abide by the school's policies and code of conduct.
                  <br />I agree to the terms and conditions
                </p>
              </label>
              <ErrorMessage error={errors.isDeclared} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200 mt-8">
            <button
              type="button"
              onClick={handleReset}
              disabled={isSubmitting}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 transition-all font-semibold"
            >
              Reset Form
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !hasDesignation || !formData.isDeclared}
              className="px-8 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                `Register ${formData.designation || "Staff"}`
              )}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AddSupervisor;
