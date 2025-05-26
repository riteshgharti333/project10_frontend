import React, { useState } from "react";
import {
  FaUser,
  FaUserCircle,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaVenusMars,
  FaHeart,
  FaIdCard,
  FaTint,
  FaBuilding,
} from "react-icons/fa";
import BackButton from "../../components/BackButton/BackButton";

const NewEmployee = () => {
  const [formData, setFormData] = useState({
    employeeName: "",
    fathersName: "",
    photo: null,
    previewPhoto: null,
    dateOfRegistration: new Date().toISOString().split("T")[0],
    contactNo: "",
    dateOfBirth: "",
    email: "",
    gender: "",
    maritalStatus: "",
    aadharNo: "",
    voterId: "",
    bloodGroup: "",
    department: "",
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const departments = [
    "General Medicine",
    "Pediatrics",
    "Orthopedics",
    "Gynecology",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: file,
          previewPhoto: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add form submission logic here
  };

  return (
    <div className="">
      <div className="mb-8">
        <div className="flex items-center">
          <BackButton />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaUser className="mr-2 text-blue-600" />
              New Employee Registration
            </h2>
            <p className="text-gray-600 mt-1">
              Please fill all required employee details
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        {/* Employee Basic Information Section */}
        <div className="p-6">
          <div className="flex items-center mb-6">
            <FaUser className="text-blue-500" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">
              Basic Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Photo Upload */}
            <div className="space-y-1 md:col-span-2 flex items-start">
              <div className="mr-4">
                <div className="w-24 h-24 rounded-full bg-gray-200 border border-gray-300 overflow-hidden flex items-center justify-center">
                  {formData.previewPhoto ? (
                    <img
                      src={formData.previewPhoto}
                      alt="Employee Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-gray-400 text-4xl" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Photo
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="file"
                  name="photo"
                  onChange={handlePhotoChange}
                  accept="image/*"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">JPG, PNG up to 2MB</p>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Employee Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleChange}
                  placeholder="Enter employee name"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Father's Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="fathersName"
                  value={formData.fathersName}
                  onChange={handleChange}
                  placeholder="Enter father's name"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Date of Registration
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="dateOfRegistration"
                  value={formData.dateOfRegistration}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Contact No
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Gender
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    required
                  />
                  <span className="ml-2 text-gray-700">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Female</span>
                </label>
              </div>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none opacity-0">
                <FaVenusMars className="text-gray-400" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Marital Status
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="maritalStatus"
                    value="Married"
                    checked={formData.maritalStatus === "Married"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Married</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="maritalStatus"
                    value="Unmarried"
                    checked={formData.maritalStatus === "Unmarried"}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Unmarried</span>
                </label>
              </div>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none opacity-0">
                <FaHeart className="text-gray-400" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Aadhar No
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="aadharNo"
                  value={formData.aadharNo}
                  onChange={handleChange}
                  placeholder="Enter Aadhar number"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaIdCard className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Voter ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="voterId"
                  value={formData.voterId}
                  onChange={handleChange}
                  placeholder="Enter Voter ID"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaIdCard className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Blood Group
              </label>
              <div className="relative">
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8 pl-10"
                >
                  <option value="">Select blood group</option>
                  {bloodGroups.map((group, i) => (
                    <option key={i} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaTint className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Department
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8 pl-10"
                  required
                >
                  <option value="">Select department</option>
                  {departments.map((dept, i) => (
                    <option key={i} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBuilding className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <button type="submit" className="btn-primary">
            Save Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewEmployee;
