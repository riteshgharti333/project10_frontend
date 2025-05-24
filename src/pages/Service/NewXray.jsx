import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaUser,
  FaUserMd,
  FaFileAlt,
  FaVenusMars,
  FaMoneyBillAlt,
} from "react-icons/fa";
import BackButton from "../../components/BackButton/BackButton";

const NewXray = () => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    billDate: today,
    patientMobile: "",
    patientName: "",
    patientAddress: "",
    referredDoctor: "",
    testDate: "",
    reportDate: "",
    age: "",
    patientSex: "Male",
    examDescription: "",
    department: "",
    billAmount: "",
    discount: "0",
    netBillAmount: "",
    doctorEarning: "",
    commissionPercent: "",
  });

  const departments = [
    "Radiology",
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "General",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Calculate net bill amount when bill amount or discount changes
    if (name === "billAmount" || name === "discount") {
      const bill = parseFloat(formData.billAmount) || 0;
      const discount = parseFloat(formData.discount) || 0;
      const netAmount = bill - (bill * discount) / 100;
      setFormData((prev) => ({
        ...prev,
        netBillAmount: netAmount.toFixed(2),
        doctorEarning: (
          (netAmount * (parseFloat(prev.commissionPercent) || 0)) /
          100
        ).toFixed(2),
      }));
    }

    // Calculate doctor earning when commission percent changes
    if (name === "commissionPercent") {
      const netAmount = parseFloat(formData.netBillAmount) || 0;
      setFormData((prev) => ({
        ...prev,
        doctorEarning: ((netAmount * parseFloat(value)) / 100).toFixed(2),
      }));
    }
  };

  const handleSexChange = (sex) => {
    setFormData((prev) => ({
      ...prev,
      patientSex: sex,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add form submission logic here
  };

  return (
    <div className="mx-auto">
      <div className="mb-8">
        <div className="flex items-center">
          <BackButton />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaFileAlt className="mr-2 text-blue-500" />
              New X-ray Report
            </h2>
            <p className="text-gray-600 mt-1">
              Please enter all required details for the X-ray report
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-center mb-6">
            <FaFileAlt className="text-blue-500" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">
              Patient Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Bill Date
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="billDate"
                  value={formData.billDate}
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
                Patient Mobile
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="patientMobile"
                  value={formData.patientMobile}
                  onChange={handleChange}
                  placeholder="Enter patient mobile number"
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
                Patient Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="Enter patient name"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Patient Sex
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="patientSex"
                    checked={formData.patientSex === "Male"}
                    onChange={() => handleSexChange("Male")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="patientSex"
                    checked={formData.patientSex === "Female"}
                    onChange={() => handleSexChange("Female")}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Age
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter patient age"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Referred Doctor
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="referredDoctor"
                  value={formData.referredDoctor}
                  onChange={handleChange}
                  placeholder="Enter doctor name"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUserMd className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Test Date
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="testDate"
                  value={formData.testDate}
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
                Report Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="reportDate"
                  value={formData.reportDate}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Patient Address
              </label>
              <textarea
                name="patientAddress"
                value={formData.patientAddress}
                onChange={handleChange}
                placeholder="Enter patient address"
                rows="2"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Exam / Description
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                name="examDescription"
                value={formData.examDescription}
                onChange={handleChange}
                placeholder="Enter exam description"
                rows="3"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Department
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500  bg-white pr-8"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100">
          <div className="flex items-center mb-6">
            <FaMoneyBillAlt className="text-blue-500" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">
              Billing Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Bill Amount
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="billAmount"
                  value={formData.billAmount}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10"
                  step="0.01"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">₹</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Discount (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  placeholder="0"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pr-10"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">%</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Net Bill Amount
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="netBillAmount"
                  value={formData.netBillAmount}
                  readOnly
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 pl-10"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">₹</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Commission %
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="commissionPercent"
                  value={formData.commissionPercent}
                  onChange={handleChange}
                  placeholder="0"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pr-10"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">%</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Doctor Earning
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="doctorEarning"
                  value={formData.doctorEarning}
                  readOnly
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 pl-10"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">₹</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <button type="submit" className="btn-primary">
            Save X-ray Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewXray;
