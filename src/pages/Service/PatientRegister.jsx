import React, { useState } from "react";
import {
  FaUser,
  FaPhone,
  FaBed,
  FaIdCard,
  FaVenusMars,
  FaHome,
  FaNotesMedical,
} from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import BackButton from "../../components/BackButton/BackButton";

const PatientRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    mobile: "",
    bed: "",
    gender: "",
    address: "",
    aadhaar: "",
    medicalHistory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
              <FaUser className="mr-2 text-blue-500 text-2xl" />
              Patient Registration
            </h2>
            <p className="text-gray-600 mt-1">Please enter patient details</p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter patient's full name"
                  className="block w-full px-4 py-2 pl-12 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                min="0"
                max="120"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  className="block w-full px-4 py-2 pl-12 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Gender <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 pl-12 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <FaVenusMars className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Bed Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="bed"
                  value={formData.bed}
                  onChange={handleChange}
                  placeholder="Enter bed number"
                  className="block w-full px-4 py-2 pl-12 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <FaBed className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Aadhaar Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="aadhaar"
                  value={formData.aadhaar}
                  onChange={handleChange}
                  placeholder="Enter Aadhaar number"
                  className="block w-full px-4 py-2 pl-12 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <FaIdCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              </div>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="relative">
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter full address"
                  rows={2}
                  className="block w-full px-4 py-2 pl-12 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <FaHome className="absolute left-4 top-4 text-gray-400 text-xl" />
              </div>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Medical History
              </label>
              <div className="relative">
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  placeholder="Enter any known medical conditions"
                  rows={3}
                  className="block w-full px-4 py-2 pl-12 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <FaNotesMedical className="absolute left-4 top-4 text-gray-400 text-xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <button type="submit" className="btn-primary">
            Register Patient
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientRegister;
