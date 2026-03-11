import React, { useState, useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import axios from "axios";
// --- Import the API Base URL from the config file ---
import { API_BASE_URL } from "../config";

// --- NEW DROPDOWN OPTIONS ---
const DEPARTMENTS = [
  "",
  "Teaching",
  "Non-Teaching",
  "Administration",
  "Transport",
  "Security",
];
// UPDATED: Category options as requested
const GRADES = ["", "Pre-primary", "Primary", "Secondary"];
const POSITIONS = [
  "",
  "Principal",
  "Vice-Principal",
  "HOD",
  "Teacher",
  "Librarian",
  "IT Staff",
  "Bus Driver",
  "Cleaner",
];
const DESIGNATIONS = [...POSITIONS];

// --- Configuration Assumptions ---
const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

// --- API Endpoints ---
const PIN_CODE_API_URL = "https://api.postalpincode.in/pincode/"; // Used for Postal Code lookup
const IFSC_API_URL = "https://ifsc.razorpay.com/"; // Unauthenticated endpoint for IFSC lookup

// Generate staff ID automatically
const generateStaffId = () => {
  const timestamp = Date.now().toString().slice(-6);
  const randomNum = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, "0");
  return `STF${timestamp}${randomNum}`;
};

export default function StaffRegistration() {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isDeclared, setIsDeclared] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState("");
  // State to track if city/state fields were auto-populated via PIN code
  const [isAddressAutoPopulated, setIsAddressAutoPopulated] = useState(false);
  // State to track if bank details were auto-populated via IFSC code
  const [isBankAutoPopulated, setIsBankAutoPopulated] = useState(false);

  // Get today's date in YYYY-MM-DD format for date restrictions
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    staffid: generateStaffId(),
    firstname: "",
    middlename: "",
    lastname: "",
    dob: "",
    maritalstatus: "",
    bloodgroup: "",
    gender: "",
    nationality: "",
    category: "",
    aadharno: "",
    phoneno: "",
    alternatephoneno: "",
    emailaddress: "",
    password: "teacher@123",
    addressline1: "",
    addressline2: "",
    city: "", // Auto-populated
    postalcode: "",
    district: "", // Auto-populated
    state: "", // Auto-populated
    country: "",
    photo: "",
    // Educational fields are now mandatory
    highestqualification: "", // MANDATORY
    yearofpassing: "", // MANDATORY
    specialization: "",
    certificates: "",
    universityname: "", // MANDATORY
    totalexperience: "",
    designation: "",
    previousemployer: "",
    subjectstaught: "",
    reasonforleaving: "",
    position: "",
    dept: "",
    preferredgrades: "",
    joiningdate: "", // FIX: Initialized to empty string
    // Bank fields are now mandatory
    bankname: "", // MANDATORY, Auto-populated
    branchname: "", // MANDATORY, Auto-populated
    accno: "", // MANDATORY
    ifccode: "", // MANDATORY, Trigger auto-populate
    panno: "", // **MANDATORY**
    transportstatus: "",
    pickuppoint: "",
    droppoint: "",
    modetransport: "",
    status: true, // Default to Active
    documentsurl: [],
  });

  // --------------------------------------------------------
  // 🆕 API LOOKUP FUNCTIONS (Postal Code and IFSC)
  // --------------------------------------------------------

  // Function to fetch bank details using IFSC code (Razorpay API)
  const fetchBankDetailsByIFSC = async (ifsc) => {
    setErrors((prev) => ({ ...prev, ifccode: "Fetching bank details..." }));
    try {
      const response = await axios.get(`${IFSC_API_URL}${ifsc}`);

      // Razorpay API returns a 404 for invalid IFSC, but sometimes 200 with error info.
      // Check if the response object has a BANK property (indicating success)
      if (response.data && response.data.BANK) {
        // Update form data with auto-populated fields
        setFormData((prev) => ({
          ...prev,
          bankname: response.data.BANK,
          branchname: response.data.BRANCH,
        }));
        setIsBankAutoPopulated(true);
        setErrors((prev) => ({ ...prev, ifccode: "" })); // Clear loading/previous error
      } else {
        // Handle API success but invalid code (e.g., API returns { "error": true, ... })
        setErrors((prev) => ({
          ...prev,
          ifccode: "Invalid IFSC Code. Bank not found.",
        }));
        setIsBankAutoPopulated(false);
      }
    } catch (error) {
      // Handle network error or 404 from API
      const errorMessage =
        error.response?.status === 404
          ? "Invalid IFSC Code. Bank not found."
          : "Error fetching bank data.";
      setErrors((prev) => ({ ...prev, ifccode: errorMessage }));
      setIsBankAutoPopulated(false);
    }
  };

  // Function to fetch address details using PIN code (Postalpincode API)
  const fetchAddressByPin = async (pincode) => {
    setErrors((prev) => ({ ...prev, postalcode: "Fetching address..." }));
    try {
      const response = await axios.get(`${PIN_CODE_API_URL}${pincode}`);

      if (
        response.data &&
        response.data[0].Status === "Success" &&
        response.data[0].PostOffice.length > 0
      ) {
        const postOffice = response.data[0].PostOffice[0];

        // Update form data with auto-populated fields
        setFormData((prev) => ({
          ...prev,
          city: postOffice.Region || postOffice.Name, // Using Block/Name for City
          district: postOffice.District,
          state: postOffice.State,
          country: "India",
        }));
        setIsAddressAutoPopulated(true);
        setErrors((prev) => ({ ...prev, postalcode: "" })); // Clear loading/previous error
      } else {
        setErrors((prev) => ({
          ...prev,
          postalcode: "Invalid PIN Code. Address not found.",
        }));
        setIsAddressAutoPopulated(false);
      }
    } catch (error) {
      console.error("Error fetching PIN code data:", error);
      setErrors((prev) => ({
        ...prev,
        postalcode: "Error contacting address service.",
      }));
      setIsAddressAutoPopulated(false);
    }
  };

  // --------------------------------------------------------
  // VALIDATION AND CHANGE HANDLERS
  // --------------------------------------------------------

  // New validation function for individual fields
  const validateField = (field, value) => {
    let errorMsg = "";
    switch (field) {
      // Required text fields
      case "firstname":
      case "lastname":
      case "addressline1":
      case "city":
      case "postalcode":
      case "district":
      case "state":
      case "country":
        if (!value.trim()) errorMsg = "This field is required";
        break;

      // --- MANDATORY FIELDS (Educational) ---
      case "highestqualification":
      case "universityname":
        if (!value.trim()) errorMsg = "This educational detail is mandatory";
        break;

      case "yearofpassing":
        if (!value.trim()) errorMsg = "This educational detail is mandatory";
        else if (!/^\d{4}$/.test(value))
          errorMsg = "Year must be exactly 4 digits (e.g., 1999)";
        break;

      // --- MANDATORY FIELDS (Bank) ---
      case "bankname":
      case "branchname":
      case "accno":
        if (!value.trim()) errorMsg = "This detail is mandatory";
        break;

      case "panno": // PAN mandatory with fixed format
        if (!value.trim()) errorMsg = "This detail is mandatory";
        else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.toUpperCase()))
          errorMsg = "Invalid PAN format (e.g., ABCDE1234F)";
        break;

      // Required select/dropdown fields
      case "gender":
      case "nationality":
      case "category":
      case "maritalstatus":
      case "bloodgroup":
      case "position":
      case "designation":
      case "dept":
      case "transportstatus":
        if (!value || value === "") errorMsg = "Please select an option";
        break;

      // Date of Birth validation
      case "dob": {
        if (!value) {
          errorMsg = "Date of birth is required";
          break;
        }
        const selectedDate = new Date(value);
        const today = new Date();
        if (selectedDate > today) {
          errorMsg = "Date of birth cannot be in the future";
          break;
        }
        const age = today.getFullYear() - selectedDate.getFullYear();
        const monthDiff = today.getMonth() - selectedDate.getMonth();
        const dayDiff = today.getDate() < selectedDate.getDate();
        const actualAge =
          monthDiff < 0 || (monthDiff === 0 && dayDiff) ? age - 1 : age;
        if (actualAge < 18) {
          errorMsg = "Staff member must be at least 18 years old";
        }
        break;
      }

      // Email validation
      case "emailaddress":
        if (!value.trim()) errorMsg = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(value))
          errorMsg = "Please enter a valid email address";
        break;

      // Phone number validation
      case "phoneno":
        if (!value.trim()) errorMsg = "Phone number is required";
        else if (!/^\d{10}$/.test(value))
          errorMsg = "Phone number must be 10 digits";
        break;

      case "alternatephoneno":
        if (value.trim() && !/^\d{10}$/.test(value))
          errorMsg = "Phone number must be 10 digits";
        break;

      // Aadhaar number validation (now required)
      case "aadharno":
        if (!value.trim()) errorMsg = "Aadhaar number is required";
        else if (!/^\d{12}$/.test(value))
          errorMsg = "Aadhaar number must be 12 digits";
        break;

      // IFSC code validation (merged logic to fix duplicate case issue)
      case "ifccode":
        if (!value.trim()) errorMsg = "IFSC code is mandatory";
        else if (value && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value.toUpperCase()))
          errorMsg = "Invalid IFSC code format";
        break;

      // Transport fields validation (only mandatory if status is 'Yes')
      case "pickuppoint":
      case "droppoint":
      case "modetransport":
        if (formData.transportstatus === "Yes" && !value.trim()) {
          errorMsg =
            "This transport detail is required when transport is needed.";
        }
        break;

      // Joining Date validation
      case "joiningdate": {
        if (!value) {
          errorMsg = "Joining date is required";
          break;
        }
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time for comparison
        if (selectedDate < today) {
          errorMsg = "Joining date must be today or a future date";
        }
        break;
      }

      default:
        errorMsg = "";
    }
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    return errorMsg === ""; // Return true if valid, false if invalid
  };

  // Refactored form validation for submission
  const validateForm = () => {
    const requiredFields = [
      "firstname",
      "lastname",
      "dob",
      "gender",
      "nationality",
      "category",
      "maritalstatus",
      "bloodgroup",
      "phoneno",
      "emailaddress",
      "addressline1",
      "city",
      "postalcode",
      "district",
      "state",
      "country",
      "aadharno",
      "highestqualification",
      "yearofpassing",
      "universityname",
      "bankname",
      "branchname",
      "accno",
      "ifccode",
      "panno",
      "position",
      "dept",
      "transportstatus",
      "joiningdate",
    ];

    // Add conditional fields if transport is required
    if (formData.transportstatus === "Yes") {
      requiredFields.push("pickuppoint", "droppoint", "modetransport");
    }

    let isValid = true;
    requiredFields.forEach((field) => {
      // Skip address field validation ONLY if auto-populated via PIN code
      const isAddressField =
        field === "city" ||
        field === "district" ||
        field === "state" ||
        field === "country";
      if (isAddressField && isAddressAutoPopulated && formData[field]) {
        return;
      }
      // Skip bank field validation ONLY if auto-populated via IFSC code
      const isBankField = field === "bankname" || field === "branchname";
      if (isBankField && isBankAutoPopulated && formData[field]) {
        return;
      }

      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });
    return isValid;
  };

  // Updated handleChange to handle auto-population and conditional logic
  const handleChange = (field, value) => {
    let newFormData = { ...formData, [field]: value };

    // ----------------------------------------------------------------------
    // --- 1. Handle Postal Code Auto-Population Logic (Triggers API call) ---
    // ----------------------------------------------------------------------
    if (field === "postalcode") {
      // Clear dependent address fields on change
      newFormData = {
        ...newFormData,
        city: "",
        district: "",
        state: "",
        country: "",
      };
      setIsAddressAutoPopulated(false);
      // Trigger API call if length is exactly 6 and looks valid
      if (value.length === 6 && /^\d{6}$/.test(value)) {
        fetchAddressByPin(value);
      }
    }

    // ----------------------------------------------------------------------
    // --- 2. Handle IFSC Auto-Population Logic (Triggers API call) ---
    // ----------------------------------------------------------------------
    if (field === "ifccode") {
      // Clear dependent bank fields on change
      newFormData.bankname = "";
      newFormData.branchname = "";
      setIsBankAutoPopulated(false);

      // IFSC code validation regex: 4 letters, 0 (5th char), 6 alphanumeric
      if (
        value.length === 11 &&
        /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value.toUpperCase())
      ) {
        fetchBankDetailsByIFSC(value);
      }
    }

    // ----------------------------------------------------------------------
    // --- 3. Handle Transport Conditional Removal ---
    // ----------------------------------------------------------------------
    if (field === "transportstatus" && value === "No") {
      // Clear non-required transport fields
      newFormData.pickuppoint = "";
      newFormData.droppoint = "";
      newFormData.modetransport = "";
      // Clear errors for conditional fields
      setErrors((prev) => ({
        ...prev,
        pickuppoint: "",
        droppoint: "",
        modetransport: "",
      }));
    }

    setFormData(newFormData);

    // Trigger validation
    validateField(field, value);
  };

  const uploadToCloudinary = async (file, docType, customName) => {
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("upload_preset", "sspd-student-management");
    uploadFormData.append("folder", `staff_documents/${docType}`);
    uploadFormData.append("public_id", `${customName}_${Date.now()}`); // Added timestamp to prevent Cloudinary overwrite/access issues

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dyloa2svi/auto/upload",
        uploadFormData,
        { timeout: 600000000 }, // Extended timeout to 60s for mobile network reliability
      );
      return res.data.secure_url;
    } catch (err) {
      console.error("Upload error:", err);
      throw err;
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Image file size should be less than 5MB");
        return;
      }

      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    const selectedDocType = e.target.getAttribute("data-doc-type");

    if (!selectedDocType) {
      alert("Please select a document type first");
      return;
    }

    const validFiles = files.filter((file) => {
      const isValidType =
        file.type === "application/pdf" || file.type.startsWith("image/");
      if (!isValidType) {
        alert(
          `${file.name} is not a valid file type. Please upload PDF or image files only.`,
        );
        return false;
      }

      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum file size is 10MB.`);
        return false;
      }

      return true;
    });

    if (validFiles.length === 0) return;

    const newDocuments = validFiles.map((file) => ({
      name: file.name,
      type: selectedDocType,
      file: file,
    }));

    // Filter out old documents of the same type to ensure only the latest selection exists
    setDocuments((prev) => [
      ...prev.filter((doc) => doc.type !== selectedDocType),
      ...newDocuments,
    ]);

    e.target.value = "";
  };

  const handleStatusToggle = () => {
    const newStatus = !formData.status;
    handleChange("status", newStatus);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("Please fill in all required fields correctly");
      return;
    }

    // NEW REQUIREMENT: At least 2 documents must be uploaded
    if (documents.length < 2) {
      alert("Please upload at least 2 documents (e.g., Aadhaar and Resume)");
      return;
    }

    if (!isDeclared) {
      alert("Please accept the terms and conditions");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create a clean copy of the data to be submitted
      const submissionData = { ...formData };

      Object.keys(submissionData).forEach((key) => {
        if (submissionData[key] === "" || submissionData[key] === null) {
          delete submissionData[key];
        }
      });

      // FIRE ALL UPLOADS IN PARALLEL 🚀
      // This prevents sequential timeouts on mobile browsers
      const uploadPromises = [];

      if (photo) {
        uploadPromises.push(
          uploadToCloudinary(
            photo,
            "photos",
            `${formData.firstname}_${formData.lastname}`,
          ).then((url) => {
            submissionData.photo = url;
          }),
        );
      }

      if (documents.length > 0) {
        const docPromises = documents.map((doc) =>
          uploadToCloudinary(
            doc.file,
            doc.type,
            `${formData.firstname}_${formData.lastname}_${doc.type}`,
          ).then((url) => ({
            url,
            type: doc.type,
            name: doc.name,
          })),
        );
        uploadPromises.push(
          Promise.all(docPromises).then((urls) => {
            submissionData.documentsurl = urls;
          }),
        );
      }

      // Wait for all Cloudinary uploads to finish before hitting the backend
      await Promise.all(uploadPromises);

      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await axios.post(
        `${API_BASE_URL}api/addstaff`,
        submissionData,
        {
          headers: {
            "Content-Type": "application/json",
            auth: AUTH_HEADER,
            username: storedUsername,
            role: storedRole,
          },
          timeout: 3000000, // Give the backend 30s to process the complex registration
        },
      );

      if (response.status === 200 || response.status === 201) {
        setFormSubmitted(true);
        alert("Staff registration successful!");
      }
    } catch (err) {
      console.error("Error submitting form:", err);

      // Improved Error Reporting
      if (err.response) {
        const errorMsg =
          err.response.data.error ||
          err.response.data.message ||
          "Registration failed.";
        alert(`Server Error: ${errorMsg}`);

        // If it's a duplicate key error, we should generate a NEW Staff ID for the next attempt
        if (err.response.status === 409) {
          setFormData((prev) => ({ ...prev, staffid: generateStaffId() }));
        }
      } else if (
        err.code === "ECONNABORTED" ||
        err.message === "Network Error"
      ) {
        alert(
          "Upload Timeout: Connection was slow. Please try again with a smaller photo or better network.",
        );
      } else {
        alert("Network error or server not reachable.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLabel = (type) => {
    switch (type) {
      case "photo":
        return "Staff Photo";
      case "aadhaar":
        return "Aadhaar Card";
      case "resume":
        return "Resume/CV";
      case "certificates":
        return "Educational Certificates";
      case "experience":
        return "Experience Letters";
      default:
        return "";
    }
  };

  if (formSubmitted) {
    return (
      <MainLayout>
        <div className="p-8 text-center">
          <div className="bg-white rounded-2xl shadow p-12 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              Staff Registered Successfully!
            </h2>
            <p className="text-gray-700 text-lg">
              Staff ID: {formData.staffid || "Generated automatically"}
            </p>
            <p className="text-gray-700 text-lg">
              Status: {formData.status ? "Active" : "Inactive"}
            </p>
            <p className="text-gray-700 text-lg">
              The staff member's information has been saved to the system.
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-8">
        <div className="bg-white rounded-2xl shadow p-6">
          <h4 className="text-2xl font-semibold mb-6 text-center">
            Staff Registration
          </h4>

          {/* Staff Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6 mb-6">
            <div className="rounded-lg p-6 shadow-lg bg-white w-full">
              <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
                <h4 className="text-xl font-semibold">Staff Details</h4>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <InputField
                    label="First Name *"
                    value={formData.firstname}
                    onChange={(val) => handleChange("firstname", val)}
                  />
                  {errors.firstname && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstname}
                    </p>
                  )}
                </div>
                <InputField
                  label="Middle Name"
                  value={formData.middlename}
                  onChange={(val) => handleChange("middlename", val)}
                />
                <div>
                  <InputField
                    label="Last Name *"
                    value={formData.lastname}
                    onChange={(val) => handleChange("lastname", val)}
                  />
                  {errors.lastname && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastname}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <InputField
                    label="Date of Birth *"
                    type="date"
                    value={formData.dob}
                    onChange={(val) => handleChange("dob", val)}
                    max={getTodayDate()}
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
                  )}
                </div>
                <div>
                  <SelectField
                    label="Marital Status *"
                    options={["", "Single", "Married", "Divorced", "Widowed"]}
                    value={formData.maritalstatus}
                    onChange={(val) => handleChange("maritalstatus", val)}
                  />
                  {errors.maritalstatus && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.maritalstatus}
                    </p>
                  )}
                </div>
                <div>
                  <SelectField
                    label="Blood Group *"
                    options={[
                      "",
                      "A+",
                      "A-",
                      "B+",
                      "B-",
                      "O+",
                      "O-",
                      "AB+",
                      "AB-",
                    ]}
                    value={formData.bloodgroup}
                    onChange={(val) => handleChange("bloodgroup", val)}
                  />
                  {errors.bloodgroup && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.bloodgroup}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <SelectField
                    label="Gender *"
                    options={["", "Male", "Female", "Other"]}
                    value={formData.gender}
                    onChange={(val) => handleChange("gender", val)}
                  />
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                  )}
                </div>
                <div>
                  <SelectField
                    label="Nationality *"
                    options={["", "Indian", "Other"]}
                    value={formData.nationality}
                    onChange={(val) => handleChange("nationality", val)}
                  />
                  {errors.nationality && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.nationality}
                    </p>
                  )}
                </div>
                <div>
                  <SelectField
                    label="Category *"
                    options={["", "General", "OBC", "SC", "ST", "Other"]}
                    value={formData.category}
                    onChange={(val) => handleChange("category", val)}
                  />
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <InputField
                    label="Aadhar Number *"
                    value={formData.aadharno}
                    onChange={(val) => handleChange("aadharno", val)}
                  />
                  {errors.aadharno && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.aadharno}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Photo Upload Section with Status Toggle */}
            <div className="w-full flex flex-col items-center justify-between p-6 rounded-lg shadow-lg bg-white self-start">
              <div className="w-full h-48 bg-gray-200 rounded mb-2 flex items-center justify-center relative overflow-hidden shadow-inner">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <span className="text-sm text-gray-500">Photo Preview</span>
                )}
              </div>
              <label className="bg-blue-400 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded cursor-pointer shadow-md mb-2">
                Choose Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
              {photo && (
                <span className="text-xs text-gray-600 mb-4 max-w-[200px] truncate text-center">
                  {photo.name}
                </span>
              )}

              {/* Status Toggle */}
              <div className="w-full border-t pt-4 mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                  Staff Status
                </label>
                <div className="flex items-center justify-center">
                  <span
                    className={`text-sm font-medium mr-3 ${
                      !formData.status ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    Resigned
                  </span>
                  <button
                    type="button"
                    onClick={handleStatusToggle}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      formData.status ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
                        formData.status ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span
                    className={`text-sm font-medium ml-3 ${
                      formData.status ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    Active
                  </span>
                </div>
                <div className="text-center mt-2">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      formData.status
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {formData.status ? "Active" : "Resigned"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">Contact Details</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <InputField
                  label="Phone Number (Primary) *"
                  value={formData.phoneno}
                  onChange={(val) => handleChange("phoneno", val)}
                />
                {errors.phoneno && (
                  <p className="text-red-500 text-xs mt-1">{errors.phoneno}</p>
                )}
              </div>
              <div>
                <InputField
                  label="Alternate Phone Number"
                  value={formData.alternatephoneno}
                  onChange={(val) => handleChange("alternatephoneno", val)}
                />
                {errors.alternatephoneno && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.alternatephoneno}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <div>
                <InputField
                  label="Email Address *"
                  type="email"
                  value={formData.emailaddress}
                  onChange={(val) => handleChange("emailaddress", val)}
                />
                {errors.emailaddress && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emailaddress}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">Address Information</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
              <div>
                <InputField
                  label="Address Line 1 *"
                  value={formData.addressline1}
                  onChange={(val) => handleChange("addressline1", val)}
                />
                {errors.addressline1 && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.addressline1}
                  </p>
                )}
              </div>
              <InputField
                label="Address Line 2"
                value={formData.addressline2}
                onChange={(val) => handleChange("addressline2", val)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <InputField
                  label="Postal Code *"
                  value={formData.postalcode}
                  onChange={(val) => handleChange("postalcode", val)}
                />
                {errors.postalcode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.postalcode}
                  </p>
                )}
              </div>
              <div>
                <InputField
                  label="City *"
                  value={formData.city}
                  onChange={(val) => handleChange("city", val)}
                  readOnly={isAddressAutoPopulated}
                  className={isAddressAutoPopulated ? "bg-gray-100" : ""}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <InputField
                  label="District *"
                  value={formData.district}
                  onChange={(val) => handleChange("district", val)}
                  readOnly={isAddressAutoPopulated}
                  className={isAddressAutoPopulated ? "bg-gray-100" : ""}
                />
                {errors.district && (
                  <p className="text-red-500 text-xs mt-1">{errors.district}</p>
                )}
              </div>
              <div>
                <InputField
                  label="State *"
                  value={formData.state}
                  onChange={(val) => handleChange("state", val)}
                  readOnly={isAddressAutoPopulated}
                  className={isAddressAutoPopulated ? "bg-gray-100" : ""}
                />
                {errors.state && (
                  <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <div>
                <InputField
                  label="Country *"
                  value={formData.country}
                  onChange={(val) => handleChange("country", val)}
                  readOnly={isAddressAutoPopulated}
                  className={isAddressAutoPopulated ? "bg-gray-100" : ""}
                />
                {errors.country && (
                  <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                )}
              </div>
            </div>
          </div>

          {/* Educational Qualification */}
          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">
                Educational Qualification
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <InputField
                  label="Highest Qualification *"
                  value={formData.highestqualification}
                  onChange={(val) => handleChange("highestqualification", val)}
                />
                {errors.highestqualification && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.highestqualification}
                  </p>
                )}
              </div>

              <div>
                <InputField
                  label="Year of Passing *"
                  value={formData.yearofpassing}
                  onChange={(val) => handleChange("yearofpassing", val)}
                />
                {errors.yearofpassing && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.yearofpassing}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-6 mt-6">
              <InputField
                label="Specialization/Subject Expertise"
                value={formData.specialization}
                onChange={(val) => handleChange("specialization", val)}
              />
              <InputField
                label="Additional Certificates"
                value={formData.certificates}
                onChange={(val) => handleChange("certificates", val)}
              />
              <div>
                <InputField
                  label="University Name *"
                  value={formData.universityname}
                  onChange={(val) => handleChange("universityname", val)}
                />
                {errors.universityname && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.universityname}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">Professional Experience</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <InputField
                label="Total Experience (in years)"
                value={formData.totalexperience}
                onChange={(val) => handleChange("totalexperience", val)}
              />

              <div>
                <SelectField
                  label="Designation *"
                  options={DESIGNATIONS}
                  value={formData.designation}
                  onChange={(val) => handleChange("designation", val)}
                />
                {errors.designation && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.designation}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-6 mt-6">
              <InputField
                label="Previous Employer Name"
                value={formData.previousemployer}
                onChange={(val) => handleChange("previousemployer", val)}
              />
              <InputField
                label="Subjects Taught"
                value={formData.subjectstaught}
                onChange={(val) => handleChange("subjectstaught", val)}
              />
              <InputField
                label="Reason for Leaving Previous Job"
                value={formData.reasonforleaving}
                onChange={(val) => handleChange("reasonforleaving", val)}
              />
            </div>
          </div>

          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">
                Role & Department Details
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <SelectField
                  label="Position Applied For *"
                  options={POSITIONS}
                  value={formData.position}
                  onChange={(val) => handleChange("position", val)}
                />
                {errors.position && (
                  <p className="text-red-500 text-xs mt-1">{errors.position}</p>
                )}
              </div>

              <div>
                <SelectField
                  label="Department *"
                  options={DEPARTMENTS}
                  value={formData.dept}
                  onChange={(val) => handleChange("dept", val)}
                />
                {errors.dept && (
                  <p className="text-red-500 text-xs mt-1">{errors.dept}</p>
                )}
              </div>
            </div>
            <div className="space-y-6 mt-6">
              <SelectField
                label="Preferred Grade Category *"
                options={GRADES}
                value={formData.preferredgrades}
                onChange={(val) => handleChange("preferredgrades", val)}
              />
              <div>
                <InputField
                  label="Joining Date *"
                  type="date"
                  value={formData.joiningdate}
                  onChange={(val) => handleChange("joiningdate", val)}
                  min={getTodayDate()}
                />
                {errors.joiningdate && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.joiningdate}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bank & Salary Details - MANDATORY SECTION */}
          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">Bank & Salary Details *</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <InputField
                  label="Bank Name *"
                  value={formData.bankname}
                  onChange={(val) => handleChange("bankname", val)}
                  readOnly={isBankAutoPopulated}
                  className={isBankAutoPopulated ? "bg-gray-100" : ""}
                />
                {errors.bankname && (
                  <p className="text-red-500 text-xs mt-1">{errors.bankname}</p>
                )}
              </div>

              <div>
                <InputField
                  label="Branch Name *"
                  value={formData.branchname}
                  onChange={(val) => handleChange("branchname", val)}
                  readOnly={isBankAutoPopulated}
                  className={isBankAutoPopulated ? "bg-gray-100" : ""}
                />
                {errors.branchname && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.branchname}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <InputField
                  label="Account Number *"
                  value={formData.accno}
                  onChange={(val) => handleChange("accno", val)}
                />
                {errors.accno && (
                  <p className="text-red-500 text-xs mt-1">{errors.accno}</p>
                )}
              </div>

              <div>
                <InputField
                  label="IFSC Code *"
                  value={formData.ifccode}
                  onChange={(val) => handleChange("ifccode", val)}
                />
                {errors.ifccode && (
                  <p className="text-red-500 text-xs mt-1">{errors.ifccode}</p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <div>
                <InputField
                  label="PAN Number *"
                  value={formData.panno}
                  onChange={(val) => handleChange("panno", val)}
                />
                {errors.panno && (
                  <p className="text-red-500 text-xs mt-1">{errors.panno}</p>
                )}
              </div>
            </div>
          </div>

          {/* Transport Details */}
          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">Transport Details</h4>
            </div>
            <div className="space-y-6 mt-6">
              <div>
                <SelectField
                  label="Transport Required? *"
                  options={["", "Yes", "No"]}
                  value={formData.transportstatus}
                  onChange={(val) => handleChange("transportstatus", val)}
                />
                {errors.transportstatus && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.transportstatus}
                  </p>
                )}
              </div>

              {formData.transportstatus === "Yes" && (
                <>
                  <div>
                    <InputField
                      label="Pickup Point *"
                      value={formData.pickuppoint}
                      onChange={(val) => handleChange("pickuppoint", val)}
                    />
                    {errors.pickuppoint && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.pickuppoint}
                      </p>
                    )}
                  </div>

                  <div>
                    <InputField
                      label="Drop Point *"
                      value={formData.droppoint}
                      onChange={(val) => handleChange("droppoint", val)}
                    />
                    {errors.droppoint && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.droppoint}
                      </p>
                    )}
                  </div>

                  <div>
                    <SelectField
                      label="Mode of Transport *"
                      options={[
                        "",
                        "School Bus",
                        "Personal Vehicle",
                        "Public Transport",
                      ]}
                      value={formData.modetransport}
                      onChange={(val) => handleChange("modetransport", val)}
                    />
                    {errors.modetransport && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.modetransport}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Document Upload */}
          <div className="rounded-lg p-6 shadow-lg bg-white mb-6">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">
                Upload Documents (Minimum 2 required)
              </h4>
            </div>

            <div className="space-y-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Document Type *
                </label>
                <select
                  className="block w-full border border-gray-300 rounded px-3 py-2"
                  value={selectedDoc}
                  onChange={(e) => setSelectedDoc(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="resume">Resume/CV</option>
                  <option value="aadhaar">Aadhaar Card</option>
                  <option value="certificates">Educational Certificates</option>
                  <option value="experience">Experience Letters</option>
                </select>
              </div>

              {selectedDoc && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload {getLabel(selectedDoc)}
                  </label>
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    multiple
                    onChange={handleDocumentUpload}
                    data-doc-type={selectedDoc}
                    className="block w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              )}
              {documents.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    Uploaded Documents:
                  </h5>
                  <div className="space-y-2">
                    {documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded"
                      >
                        <div className="flex items-center gap-2">
                          <span>📄</span>
                          <span className="text-sm">{doc.name}</span>
                          <span className="text-xs text-gray-500">
                            ({doc.type})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Declaration */}
          <div className="rounded-lg p-6 shadow-lg bg-white mb-8">
            <div className="-mt-6 -mx-6 bg-blue-400 text-white px-4 py-2 rounded-t">
              <h4 className="text-xl font-semibold">Declaration</h4>
            </div>
            <p className="text-sm text-gray-700 mt-6 mb-4">
              I hereby declare that the information provided above is accurate
              and true to the best of my knowledge. I agree to abide by the
              school's policies and code of conduct.
            </p>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="declaration"
                className="mr-2"
                checked={isDeclared}
                onChange={(e) => setIsDeclared(e.target.checked)}
              />
              <label htmlFor="declaration" className="text-sm text-gray-700">
                I agree to the terms and conditions
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={!isDeclared || isSubmitting}
              className={`px-8 py-3 text-white font-semibold rounded-lg ${
                isDeclared && !isSubmitting
                  ? "bg-blue-500 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              } transition-all duration-200`}
            >
              {isSubmitting ? "Submitting..." : "Submit Registration"}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
