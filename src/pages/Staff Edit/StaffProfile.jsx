import React, { useState, useEffect } from "react";
import { User, X } from "lucide-react";
import axios from "axios";

const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dyloa2svi/auto/upload";
const CLOUDINARY_PRESET = "sspd-student-management";

// API Endpoints for automation
const PIN_CODE_API_URL = "https://api.postalpincode.in/pincode/";
const IFSC_API_URL = "https://ifsc.razorpay.com/";

// Dropdown Options
const DEPARTMENTS = [
  "",
  "Teaching",
  "Non-Teaching",
  "Administration",
  "Transport",
  "Security",
];
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
const GRADES = ["", "Pre-primary", "Primary", "Secondary"];
// 🛑 Fixed formatting for mapping
const TRANSPORT_MODES = [
  "",
  "School Bus",
  "Personal Vehicle",
  "Public Transport",
];

const uploadToCloudinary = async (file, staffData) => {
  const uploadFormData = new FormData();
  uploadFormData.append("file", file);
  uploadFormData.append("upload_preset", CLOUDINARY_PRESET);
  uploadFormData.append("folder", `staff_images/profile_photos`);
  uploadFormData.append(
    "public_id",
    `${staffData.staffid}_${staffData.lastname}`,
  );

  try {
    const res = await axios.post(CLOUDINARY_UPLOAD_URL, uploadFormData);
    return res.data.secure_url;
  } catch (err) {
    throw new Error("Photo upload failed.");
  }
};

export default function StaffProfile({
  staffData,
  setStaffData,
  handleSubmit,
  handleInputChange,
  isActive,
  toggleActive,
  loading,
  error,
  isViewMode,
}) {
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [localLoading, setLocalLoading] = useState(false);
  const [localErrors, setLocalErrors] = useState({});

  useEffect(() => {
    if (staffData?.photo && !photoFile) setPhotoPreview(staffData.photo);
  }, [staffData, photoFile]);

  // --------------------------------------------------------
  // API LOOKUP FUNCTIONS
  // --------------------------------------------------------
  const fetchAddressByPin = async (pincode) => {
    try {
      const response = await axios.get(`${PIN_CODE_API_URL}${pincode}`);
      if (response.data && response.data[0].Status === "Success") {
        const postOffice = response.data[0].PostOffice[0];
        setStaffData((prev) => ({
          ...prev,
          city: postOffice.Region || postOffice.Name,
          district: postOffice.District,
          state: postOffice.State,
          country: "India",
        }));
      }
    } catch (err) {
      console.error("PIN lookup failed", err);
    }
  };

  const fetchBankDetailsByIFSC = async (ifsc) => {
    try {
      const response = await axios.get(`${IFSC_API_URL}${ifsc}`);
      if (response.data && response.data.BANK) {
        setStaffData((prev) => ({
          ...prev,
          bankname: response.data.BANK,
          branchname: response.data.BRANCH,
        }));
      }
    } catch (err) {
      console.error("IFSC lookup failed", err);
    }
  };

  // --------------------------------------------------------
  // VALIDATION LOGIC
  // --------------------------------------------------------
  const validateField = (name, value) => {
    let errorMsg = "";
    switch (name) {
      case "firstname":
      case "lastname":
      case "addressline1":
        if (!value.trim()) errorMsg = "This field is required";
        break;
      case "phoneno":
        if (!/^\d{10}$/.test(value))
          errorMsg = "Phone number must be 10 digits";
        break;
      case "alternatephoneno":
        if (value && value.trim() && !/^\d{10}$/.test(value))
          errorMsg = "Phone number must be 10 digits";
        break;
      case "aadharno":
        if (!/^\d{12}$/.test(value))
          errorMsg = "Aadhaar number must be 12 digits";
        break;
      case "emailaddress":
        if (!/^\S+@\S+\.\S+$/.test(value)) errorMsg = "Invalid email format";
        break;
      case "panno":
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.toUpperCase()))
          errorMsg = "Invalid PAN format";
        break;
      case "ifccode":
        if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value.toUpperCase()))
          errorMsg = "Invalid IFSC format";
        break;
      default:
        break;
    }
    setLocalErrors((prev) => ({ ...prev, [name]: errorMsg }));
    return errorMsg;
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    handleInputChange(e);
    validateField(name, value);

    if (name === "postalcode" && value.length === 6) {
      fetchAddressByPin(value);
    }
    if (name === "ifccode" && value.length === 11) {
      fetchBankDetailsByIFSC(value);
    }
  };

  const handleFileChange = (e) => {
    if (isViewMode) return;
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const fieldsToValidate = [
      "firstname",
      "lastname",
      "phoneno",
      "alternatephoneno",
      "aadharno",
      "emailaddress",
      "ifccode",
      "panno",
    ];
    let hasErrors = false;
    fieldsToValidate.forEach((field) => {
      if (validateField(field, staffData[field] || "")) hasErrors = true;
    });

    if (hasErrors) {
      alert("Please correct the errors before saving.");
      return;
    }

    setLocalLoading(true);
    let photoUrl = staffData.photo;
    if (photoFile) {
      try {
        photoUrl = await uploadToCloudinary(photoFile, staffData);
      } catch (err) {
        alert(err.message);
        setLocalLoading(false);
        return;
      }
    }
    await handleSubmit(e, photoUrl);
    setLocalLoading(false);
  };

  const SectionTitle = ({ title }) => (
    <div className="-mx-8 -mt-8   bg-blue-500 text-white px-6 py-2 rounded-t mb-6 mt-8 first:-mt-8">
      <h4 className="text-lg font-semibold uppercase tracking-wider">
        {title}
      </h4>
    </div>
  );

  const ErrorMsg = ({ name }) =>
    localErrors[name] ? (
      <p className="text-red-500 text-xs mt-1">{localErrors[name]}</p>
    ) : null;

  // 🆕 Helper to format Title Case for View visibility
  const toTitleCase = (str) => {
    if (!str) return "";
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
    );
  };

  if (!staffData)
    return (
      <div className="text-center p-8 text-red-500">Loading component...</div>
    );

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="flex flex-col xl:flex-row space-y-8 xl:space-y-0 xl:space-x-8">
        <div className="flex-1">
          {/* 1. STAFF DETAILS */}
          <div className="rounded-lg p-8 border border-gray-200 mb-6 bg-white shadow-sm">
            <SectionTitle title="Staff Details" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={staffData.firstname || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled={isViewMode}
                  required
                />
                <ErrorMsg name="firstname" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middlename"
                  value={staffData.middlename || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled={isViewMode}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={staffData.lastname || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled={isViewMode}
                  required
                />
                <ErrorMsg name="lastname" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dob"
                  value={staffData.dob || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled={isViewMode}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={staffData.gender || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white"
                  disabled={isViewMode}
                  required
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Marital Status *
                </label>
                <select
                  name="maritalstatus"
                  value={staffData.maritalstatus || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white"
                  disabled={isViewMode}
                  required
                >
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Blood Group *
                </label>
                <select
                  name="bloodgroup"
                  value={staffData.bloodgroup || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white"
                  disabled={isViewMode}
                >
                  <option value="">Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Nationality
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={staffData.nationality || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={staffData.category || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Aadhar Number *
                </label>
                <input
                  type="text"
                  name="aadharno"
                  value={staffData.aadharno || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                  required
                />
                <ErrorMsg name="aadharno" />
              </div>
            </div>
          </div>

          {/* 2. CONTACT DETAILS */}
          <div className="rounded-lg p-8 border border-gray-200 mb-6 bg-white shadow-sm">
            <SectionTitle title="Contact Details" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Phone Number (Primary) *
                </label>
                <input
                  type="tel"
                  name="phoneno"
                  value={staffData.phoneno || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                  required
                />
                <ErrorMsg name="phoneno" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Alternate Phone Number
                </label>
                <input
                  type="tel"
                  name="alternatephoneno"
                  value={staffData.alternatephoneno || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                />
                <ErrorMsg name="alternatephoneno" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="emailaddress"
                  value={staffData.emailaddress || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                  required
                />
                <ErrorMsg name="emailaddress" />
              </div>
            </div>
          </div>

          {/* 3. ADDRESS INFORMATION */}
          <div className="rounded-lg p-8 border border-gray-200 mb-6 bg-white shadow-sm">
            <SectionTitle title="Address Information" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  name="addressline1"
                  value={staffData.addressline1 || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                  required
                />
                <ErrorMsg name="addressline1" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="addressline2"
                  value={staffData.addressline2 || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Postal Code *
                </label>
                <input
                  type="text"
                  name="postalcode"
                  value={staffData.postalcode || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={staffData.city || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  value={staffData.district || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={staffData.state || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                  required
                />
              </div>
            </div>
          </div>

          {/* 4. EDUCATIONAL QUALIFICATION */}
          <div className="rounded-lg p-8 border border-gray-200 mb-6 bg-white shadow-sm">
            <SectionTitle title="Educational Qualification" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Highest Qualification *
                </label>
                <input
                  type="text"
                  name="highestqualification"
                  value={staffData.highestqualification || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Year of Passing *
                </label>
                <input
                  type="text"
                  name="yearofpassing"
                  value={staffData.yearofpassing || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  University Name *
                </label>
                <input
                  type="text"
                  name="universityname"
                  value={staffData.universityname || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Specialization
                </label>
                <input
                  type="text"
                  name="specialization"
                  value={staffData.specialization || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                />
              </div>
            </div>
          </div>

          {/* 5. PROFESSIONAL EXPERIENCE */}
          <div className="rounded-lg p-8 border border-gray-200 mb-6 bg-white shadow-sm">
            <SectionTitle title="Professional Experience" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Total Experience (Years)
                </label>
                <input
                  type="text"
                  name="totalexperience"
                  value={staffData.totalexperience || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Designation
                </label>
                <select
                  name="designation"
                  value={staffData.designation || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white"
                  disabled={isViewMode}
                >
                  {POSITIONS.map((p) => (
                    <option key={p} value={p}>
                      {p || "Select"}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Previous Employer
                </label>
                <input
                  type="text"
                  name="previousemployer"
                  value={staffData.previousemployer || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Subjects Taught
                </label>
                <input
                  type="text"
                  name="subjectstaught"
                  value={staffData.subjectstaught || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                />
              </div>
            </div>
          </div>

          {/* 6. ROLE & DEPARTMENT DETAILS */}
          <div className="rounded-lg p-8 border border-gray-200 mb-6 bg-white shadow-sm">
            <SectionTitle title="Role & Department Details" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Position Applied For *
                </label>
                <select
                  name="position"
                  value={staffData.position || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white"
                  disabled={isViewMode}
                  required
                >
                  {POSITIONS.map((p) => (
                    <option key={p} value={p}>
                      {p || "Select"}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Department *
                </label>
                <select
                  name="dept"
                  value={staffData.dept || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white"
                  disabled={isViewMode}
                  required
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d || "Select"}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Preferred Grades
                </label>
                <select
                  name="preferredgrades"
                  value={staffData.preferredgrades || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white"
                  disabled={isViewMode}
                >
                  {GRADES.map((g) => (
                    <option key={g} value={g}>
                      {g || "Select"}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Joining Date *
                </label>
                <input
                  type="date"
                  name="joiningdate"
                  value={staffData.joiningdate || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                  required
                />
              </div>
            </div>
          </div>

          {/* 7. BANK & SALARY DETAILS */}
          <div className="rounded-lg p-8 border border-gray-200 mb-6 bg-white shadow-sm">
            <SectionTitle title="Bank & Salary Details" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Bank Name *
                </label>
                <input
                  type="text"
                  name="bankname"
                  value={staffData.bankname || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Branch Name *
                </label>
                <input
                  type="text"
                  name="branchname"
                  value={staffData.branchname || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Account Number *
                </label>
                <input
                  type="text"
                  name="accno"
                  value={staffData.accno || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  IFSC Code *
                </label>
                <input
                  type="text"
                  name="ifccode"
                  value={staffData.ifccode || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                  required
                />
                <ErrorMsg name="ifccode" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  PAN Number *
                </label>
                <input
                  type="text"
                  name="panno"
                  value={staffData.panno || ""}
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  disabled={isViewMode}
                  required
                />
                <ErrorMsg name="panno" />
              </div>
            </div>
          </div>

          {/* 8. TRANSPORT DETAILS */}
          <div className="rounded-lg p-8 border border-gray-200 mb-6 bg-white shadow-sm">
            <SectionTitle title="Transport Details" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Transport Required? *
                </label>
                <select
                  name="transportstatus"
                  // 🛑 Standardizing value for matching
                  value={
                    staffData.transportstatus?.toLowerCase() === "yes"
                      ? "Yes"
                      : staffData.transportstatus?.toLowerCase() === "no"
                        ? "No"
                        : ""
                  }
                  onChange={onInputChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white"
                  disabled={isViewMode}
                  required
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              {(staffData.transportstatus?.toLowerCase() === "yes" ||
                staffData.transportstatus === "Yes") && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Pickup Point *
                    </label>
                    <input
                      type="text"
                      name="pickuppoint"
                      value={staffData.pickuppoint || ""}
                      onChange={onInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                      disabled={isViewMode}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Drop Point *
                    </label>
                    <input
                      type="text"
                      name="droppoint"
                      value={staffData.droppoint || ""}
                      onChange={onInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                      disabled={isViewMode}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Mode of Transport *
                    </label>
                    <select
                      name="modetransport"
                      // 🛑 Format value to Title Case for visibility in View mode
                      value={toTitleCase(staffData.modetransport)}
                      onChange={onInputChange}
                      className="w-full px-4 py-2 border rounded-lg bg-white"
                      disabled={isViewMode}
                      required
                    >
                      {TRANSPORT_MODES.map((mode) => (
                        <option key={mode} value={mode}>
                          {mode || "Select"}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* PHOTO PREVIEW (RIGHT) */}
        <div className="w-full xl:w-64">
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center sticky top-8">
            <div className="w-32 h-32 mx-auto bg-white rounded-full shadow-md border-4 border-blue-200 overflow-hidden flex items-center justify-center mb-4">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <User className="w-16 h-16 text-gray-400" />
              )}
            </div>
            {!isViewMode && (
              <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block text-sm font-medium">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={localLoading}
                />
              </label>
            )}
            <div className="mt-4 text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              ID: {staffData.staffid}
            </div>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      {!isViewMode && (
        <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-all"
            onClick={() => window.location.reload()}
            disabled={localLoading}
          >
            Discard Changes
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-lg shadow-blue-200 disabled:opacity-50 transition-all"
            disabled={localLoading || loading}
          >
            {localLoading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      )}
    </form>
  );
}