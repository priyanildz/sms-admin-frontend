import React, { useState, useEffect } from "react";
import { User, X } from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "../../config";

const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return dateString;
  }
};

const dateToISOString = (dateString) => {
  if (!dateString || dateString.length !== 10) return dateString;
  const parts = dateString.split("/");
  if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
  return dateString;
};

const flattenObjectForMongoose = (obj, parentKey = "", res = {}) => {
  for (const key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      obj[key] !== undefined
    ) {
      const propName = parentKey ? `${parentKey}.${key}` : key;
      const value = obj[key];
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        !(value instanceof Date) &&
        !propName.includes("__")
      ) {
        flattenObjectForMongoose(value, propName, res);
      } else if (
        propName !== "_id" &&
        propName !== "__v" &&
        propName !== "createdAt" &&
        propName !== "updatedAt"
      ) {
        res[propName] = value;
      }
    }
  }
  return res;
};

const StudentProfile = ({ studentid, isViewMode, externalStatus }) => {
  const [activeTab, setActiveTab] = useState("student");
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const AUTH_HEADER = "ZjVGZPUtYW1hX2FuZHJvaWRfMjAyMzY0MjU=";

  // Sync status from parent toggle to form data
  useEffect(() => {
    if (formData && externalStatus !== undefined) {
      setFormData((prev) => ({ ...prev, status: externalStatus }));
    }
  }, [externalStatus]);

  const fetchAddressByPin = async (pincode) => {
    if (!/^\d{6}$/.test(pincode)) return;
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`,
      );
      if (response.data && response.data[0].Status === "Success") {
        const postOffice = response.data[0].PostOffice[0];
        setFormData((prev) => ({
          ...prev,
          address: {
            ...prev.address,
            city: postOffice.Block || postOffice.Name,
            district: postOffice.District,
            state: postOffice.State,
            country: "India",
          },
        }));
        setErrors((prev) => ({ ...prev, "address.postalcode": "" }));
      } else {
        setErrors((prev) => ({
          ...prev,
          "address.postalcode": "Invalid PIN Code",
        }));
      }
    } catch (error) {
      console.error("Error fetching PIN code data:", error);
    }
  };

  const validateField = (name, value) => {
    let errorMsg = "";
    const requiredFields = [
      "firstname",
      "lastname",
      "dob",
      "birthplace",
      "bloodgroup",
      "gender",
      "nationality",
      "category",
      "aadharno",
      "parent.fathername",
      "parent.mothername",
      "parent.primarycontact",
      "address.addressline1",
      "address.city",
      "address.postalcode",
      "address.state",
      "admission.admissionstd",
      "admission.academicyear",
      "transport.transportstatus",
    ];

    if (
      requiredFields.includes(name) &&
      (!value || String(value).trim() === "" || value === "Select")
    ) {
      errorMsg = "This field is required";
    } else {
      switch (name) {
        case "dob":
          if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value))
            errorMsg = "Date must be in DD/MM/YYYY format";
          break;
        case "aadharno":
          if (!/^\d{12}$/.test(value))
            errorMsg = "Aadhar number must be 12 digits";
          break;
        case "parent.primarycontact":
        case "parent.alternatecontact":
          if (value && !/^\d{10}$/.test(value))
            errorMsg = "Contact number must be 10 digits";
          break;
        case "address.postalcode":
          if (!/^\d{6}$/.test(value)) errorMsg = "PIN code must be 6 digits";
          break;
        default:
          errorMsg = "";
      }
    }
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    return errorMsg === "";
  };

  const validateForm = () => {
    const requiredFields = [
      "firstname",
      "lastname",
      "dob",
      "birthplace",
      "bloodgroup",
      "gender",
      "nationality",
      "category",
      "aadharno",
      "parent.fathername",
      "parent.mothername",
      "parent.primarycontact",
      "address.addressline1",
      "address.city",
      "address.postalcode",
      "address.state",
      "admission.admissionstd",
      "admission.academicyear",
      "transport.transportstatus",
    ];
    let isValid = true;
    requiredFields.forEach((field) => {
      const parts = field.split(".");
      let value = formData;
      parts.forEach((part) => {
        value = value ? value[part] : "";
      });
      if (!validateField(field, value)) isValid = false;
    });
    return isValid;
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setNotification({
          type: "error",
          message: "Please select a valid image file",
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setNotification({
          type: "error",
          message: "Image file size should be less than 5MB",
        });
        return;
      }
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const uploadToCloudinary = async (file) => {
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("upload_preset", "sspd-student-management");
    uploadFormData.append("folder", `student_images/profile_photos`);
    uploadFormData.append(
      "public_id",
      `${formData.firstname}_${formData.lastname}_${formData._id}`,
    );

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dyloa2svi/auto/upload",
        uploadFormData,
      );
      return res.data.secure_url;
    } catch (err) {
      setNotification({
        type: "error",
        message: `Photo upload failed: ${err.message}`,
      });
      throw err;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "parent.annualincome") {
      if (value !== "" && !/^\d+$/.test(value)) return;
    }
    validateField(name, value);
    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: { ...(prev ? prev[section] : {}), [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (name === "address.postalcode" && value.length === 6) {
      fetchAddressByPin(value);
    }
  };

  const handleSave = async (error) => {
    if (!formData) return;
    setNotification({ type: "", message: "" });
    if (!validateForm()) {
      setNotification({
        type: "error",
        message: "Please fix the errors in the form before saving.",
      });
      return;
    }
    setLoading(true);
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      let photoUrl = formData.photo;
      if (photo) photoUrl = await uploadToCloudinary(photo);
      const dataToSave = {
        ...formData,
        dob: dateToISOString(formData.dob),
        admission: {
          ...formData.admission,
          admissiondate: dateToISOString(formData.admission.admissiondate),
        },
        photo: photoUrl,
        status: formData.status, // This is now synced with the external toggle
      };
      const flattenedUpdate = flattenObjectForMongoose(dataToSave);
      const response = await axios.put(
        `${API_BASE_URL}api/edit-student/${formData._id}`,
        flattenedUpdate,
        {
          headers: {
            auth: AUTH_HEADER,
            "Content-Type": "application/json",
            username: storedUsername,
            role: storedRole,
          },
        },
      );
      if (response.status === 200) {
        setNotification({
          type: "success",
          message: "Student profile updated successfully!",
        });
        setErrors({});
        setPhoto(null);
        setPhotoPreview(null);
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "An unknown error occurred.";
      setNotification({
        type: "error",
        message: `Failed to save: ${errorMsg}`,
      });
    } finally {
      setLoading(false);
      fecthStudent();
    }
  };

  const fecthStudent = async () => {
    setLoading(true);
    try {
      const storedUsername = localStorage.getItem("username") || "System_User";
      const storedRole = localStorage.getItem("role") || "admin";
      const response = await axios.post(
        `${API_BASE_URL}api/student-by-id`,
        { id: studentid },
        {
          headers: {
            auth: AUTH_HEADER,
            username: storedUsername,
            role: storedRole,
          },
        },
      );
      if (response.status === 200) {
        const studentData = response.data;
        studentData.dob = formatDate(studentData.dob);
        studentData.parent = studentData.parent || {};
        studentData.address = studentData.address || {};
        studentData.admission = studentData.admission || {};
        studentData.transport = studentData.transport || {};
        if (studentData.admission.admissiondate)
          studentData.admission.admissiondate = formatDate(
            studentData.admission.admissiondate,
          );
        setFormData(studentData);
      }
    } catch (error) {
      setFormData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (studentid) fecthStudent();
  }, [studentid]);

  if (loading || !formData) {
    return (
      <div className="h-full w-full p-6 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading student profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-2 px-1 sm:px-1 md:px-2 bg-white-50 w-full max-w-7xl">
      <div className="flex flex-wrap gap-1 mb-6 px-2">
        {["student", "parent", "address", "admission", "transport"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 rounded-lg font-medium capitalize ${activeTab === tab ? "bg-blue-100 text-blue-700 border-b-2 border-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
            >
              {tab} Details
            </button>
          ),
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(e);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      >
        {notification.message && (
          <div
            className={`p-4 mb-6 rounded-lg flex justify-between items-center ${notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            <p>{notification.message}</p>
            <button
              type="button"
              onClick={() => setNotification({ type: "", message: "" })}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="flex flex-col xl:flex-row space-y-8 xl:space-y-0 xl:space-x-8">
          <div className="flex-1">
            {activeTab === "student" && (
              <div className="space-y-6">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-t-lg font-semibold uppercase">
                  STUDENT DETAILS
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.firstname}
                      onChange={handleChange}
                      disabled={isViewMode}
                    />
                    {errors.firstname && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.firstname}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      name="middlename"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.middlename || ""}
                      onChange={handleChange}
                      disabled={isViewMode}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.lastname}
                      onChange={handleChange}
                      disabled={isViewMode}
                    />
                    {errors.lastname && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.lastname}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      DOB (DD/MM/YYYY) *
                    </label>
                    <input
                      type="text"
                      name="dob"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.dob}
                      onChange={handleChange}
                      disabled={true}
                    />
                    {errors.dob && (
                      <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Birth Place *
                    </label>
                    <input
                      type="text"
                      name="birthplace"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.birthplace || ""}
                      onChange={handleChange}
                      disabled={isViewMode}
                    />
                    {errors.birthplace && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.birthplace}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blood Group *
                    </label>
                    <select
                      name="bloodgroup"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.bloodgroup}
                      onChange={handleChange}
                      disabled={isViewMode}
                    >
                      <option value="">Select</option>
                      {["a+", "a-", "b+", "b-", "ab+", "ab-", "o+", "o-"].map(
                        (bg) => (
                          <option key={bg} value={bg}>
                            {bg.toUpperCase()}
                          </option>
                        ),
                      )}
                    </select>
                    {errors.bloodgroup && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.bloodgroup}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.gender}
                      onChange={handleChange}
                      disabled={isViewMode}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                    {errors.gender && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.gender}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nationality *
                    </label>
                    <select
                      name="nationality"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.nationality || ""}
                      onChange={handleChange}
                      disabled={isViewMode}
                    >
                      <option value="">Select Nationality</option>
                      <option value="Indian">Indian</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.nationality && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.nationality}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.category || ""}
                      onChange={handleChange}
                      disabled={isViewMode}
                    >
                      <option value="">Select Category</option>
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Aadhar No *
                    </label>
                    <input
                      type="text"
                      name="aadharno"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.aadharno}
                      onChange={handleChange}
                      disabled={isViewMode}
                    />
                    {errors.aadharno && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.aadharno}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "parent" && (
              <div className="space-y-6">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-t-lg font-semibold uppercase">
                  PARENT DETAILS
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Father's Name *
                    </label>
                    <input
                      type="text"
                      name="parent.fathername"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.parent.fathername || ""}
                      onChange={handleChange}
                      disabled={isViewMode}
                    />
                    {errors["parent.fathername"] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors["parent.fathername"]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mother's Name *
                    </label>
                    <input
                      type="text"
                      name="parent.mothername"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.parent.mothername || ""}
                      onChange={handleChange}
                      disabled={isViewMode}
                    />
                    {errors["parent.mothername"] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors["parent.mothername"]}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guardian's Name
                    </label>
                    <input
                      type="text"
                      name="parent.guardianname"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.parent.guardianname || ""}
                      onChange={handleChange}
                      disabled={isViewMode}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Relationship with Student
                    </label>
                    <select
                      name="parent.relationwithstudent"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.parent.relationwithstudent || ""}
                      onChange={handleChange}
                      disabled={isViewMode}
                    >
                      <option value="">Select Relationship</option>
                      <option value="father">Father</option>
                      <option value="mother">Mother</option>
                      <option value="guardian">Guardian</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Contact *
                    </label>
                    <input
                      type="text"
                      name="parent.primarycontact"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.parent.primarycontact || ""}
                      onChange={handleChange}
                      disabled={isViewMode}
                    />
                    {errors["parent.primarycontact"] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors["parent.primarycontact"]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alternate Contact
                    </label>
                    <input
                      type="text"
                      name="parent.alternatecontact"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.parent.alternatecontact || ""}
                      onChange={handleChange}
                      disabled={isViewMode}
                    />
                    {errors["parent.alternatecontact"] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors["parent.alternatecontact"]}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="parent.emailaddress"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.parent.emailaddress || ""}
                      onChange={handleChange}
                      disabled={isViewMode}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Occupation
                    </label>
                    <input
                      type="text"
                      name="parent.occupation"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.parent.occupation || ""}
                      onChange={handleChange}
                      disabled={isViewMode}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Income
                    </label>
                    <input
                      type="text"
                      name="parent.annualincome"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.parent.annualincome || ""}
                      onChange={handleChange}
                      disabled={isViewMode}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "address" && (
              <div className="space-y-6">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-t-lg font-semibold uppercase">
                  ADDRESS DETAILS
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      name="address.addressline1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.address.addressline1 || ""}
                      onChange={handleChange}
                      disabled={isViewMode}
                    />
                    {errors["address.addressline1"] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors["address.addressline1"]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      name="address.addressline2"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.address.addressline2 || ""}
                      onChange={handleChange}
                      disabled={isViewMode}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="address.postalcode"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.address.postalcode || ""}
                      onChange={handleChange}
                      disabled={isViewMode}
                    />
                    {errors["address.postalcode"] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors["address.postalcode"]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="address.city"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      value={formData.address.city || ""}
                      onChange={handleChange}
                      disabled={true}
                    />
                    {errors["address.city"] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors["address.city"]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      District
                    </label>
                    <input
                      type="text"
                      name="address.district"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      value={formData.address.district || ""}
                      onChange={handleChange}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="address.state"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      value={formData.address.state || ""}
                      onChange={handleChange}
                      disabled={true}
                    />
                    {errors["address.state"] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors["address.state"]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="address.country"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      value={formData.address.country || ""}
                      onChange={handleChange}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "admission" && (
              <div className="space-y-6">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-t-lg font-semibold uppercase">
                  ADMISSION DETAILS
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Standard *
                    </label>
                    <input
                      type="text"
                      name="admission.admissionstd"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.admission.admissionstd || ""}
                      onChange={handleChange}
                      disabled={isViewMode}
                    />
                    {errors["admission.admissionstd"] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors["admission.admissionstd"]}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Academic Year *
                    </label>
                    <input
                      type="text"
                      name="admission.academicyear"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.admission.academicyear || ""}
                      onChange={handleChange}
                      disabled={isViewMode}
                    />
                    {errors["admission.academicyear"] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors["admission.academicyear"]}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admission Date
                    </label>
                    <input
                      type="text"
                      name="admission.admissiondate"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.admission.admissiondate || ""}
                      onChange={handleChange}
                      disabled={isViewMode}
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admission Type
                    </label>
                    <select
                      name="admission.admissiontype"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      value={formData.admission.admissiontype || ""}
                      onChange={handleChange}
                      disabled={isViewMode}
                    >
                      <option value="">Select Type</option>
                      <option value="regular">Regular</option>
                      <option value="transfer">Transfer</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admission No
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      value={formData.admission.admissionno || ""}
                      disabled={true}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GR No
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      value={formData.admission.grno || ""}
                      disabled={true}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Division
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      value={formData.admission.admissiondivision || ""}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "transport" && (
              <div className="space-y-6">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-t-lg font-semibold uppercase">
                  TRANSPORT DETAILS
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transport Status *
                  </label>
                  <select
                    name="transport.transportstatus"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    value={formData.transport.transportstatus || ""}
                    onChange={handleChange}
                    disabled={isViewMode}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  {errors["transport.transportstatus"] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors["transport.transportstatus"]}
                    </p>
                  )}
                </div>
                {formData.transport?.transportstatus === "yes" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pickup Point
                        </label>
                        <input
                          type="text"
                          name="transport.pickuppoint"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                          value={formData.transport.pickuppoint || ""}
                          onChange={handleChange}
                          disabled={isViewMode}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Drop Point
                        </label>
                        <input
                          type="text"
                          name="transport.droppoint"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                          value={formData.transport.droppoint || ""}
                          onChange={handleChange}
                          disabled={isViewMode}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mode of Transport
                      </label>
                      <select
                        name="transport.modetransport"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        value={formData.transport.modetransport || ""}
                        onChange={handleChange}
                        disabled={isViewMode}
                      >
                        <option value="">Select Mode</option>
                        <option value="bus">Bus</option>
                        <option value="van">Van</option>
                        <option value="rickshaw">Rickshaw</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="w-full xl:w-64">
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center shadow-inner">
              <div className="w-32 h-32 mx-auto bg-white rounded-xl shadow-md flex items-center justify-center mb-4 border-4 border-blue-200 overflow-hidden">
                {photoPreview || formData.photo ? (
                  <img
                    src={photoPreview || formData.photo}
                    alt="profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <User className="w-16 h-16 text-gray-400" />
                )}
              </div>
              {!isViewMode && (
                <>
                  <p className="text-sm text-gray-600 mb-4">
                    Upload Student Photo
                  </p>
                  <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md inline-block">
                    Choose File
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                      disabled={isViewMode}
                    />
                  </label>
                </>
              )}
            </div>
          </div>
        </div>

        {!isViewMode && (
          <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={fecthStudent}
              disabled={loading}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              type="button"
            >
              Discard
            </button>
            <button
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              type="submit"
            >
              {loading ? "Saving..." : "Update Profile"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default StudentProfile;
