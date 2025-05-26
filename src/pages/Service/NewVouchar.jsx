import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaListAlt,
  FaUserTie,
  FaMoneyBillWave,
  FaExchangeAlt,
} from "react-icons/fa";
import BackButton from "../../components/BackButton/BackButton";

const NewVoucher = () => {
  const [formData, setFormData] = useState({
    voucherDate: new Date().toISOString().split("T")[0],
    paymentFor: "",
    voucherType: "",
    vendorName: "",
    paymentDate: "",
    amount: "",
    paymentMode: "",
  });

  const voucherTypes = ["Payment", "Receipt", "Contra", "Journal"];
  const paymentModes = [
    "Cash",
    "Cheque",
    "Bank Transfer",
    "Online Payment",
    "DD",
  ];
  const vendors = ["Vendor A", "Vendor B", "Vendor C", "Vendor D"];

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
              <FaFileInvoiceDollar className="mr-2 text-blue-600" />
              New Voucher Entry
            </h2>
            <p className="text-gray-600 mt-1">
              Please fill all required voucher details
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        {/* Voucher Information Section */}
        <div className="p-6">
          <div className="flex items-center mb-6">
            <FaFileInvoiceDollar className="text-blue-500" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">
              Voucher Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Voucher Date
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="voucherDate"
                  value={formData.voucherDate}
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
                Payment For
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="paymentFor"
                  value={formData.paymentFor}
                  onChange={handleChange}
                  placeholder="Enter payment purpose"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaListAlt className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Voucher Type
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <select
                  name="voucherType"
                  value={formData.voucherType}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8"
                  required
                >
                  <option value="">Select voucher type</option>
                  {voucherTypes.map((type, i) => (
                    <option key={i} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaExchangeAlt className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Vendor Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <select
                  name="vendorName"
                  value={formData.vendorName}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8"
                  required
                >
                  <option value="">Select vendor</option>
                  {vendors.map((vendor, i) => (
                    <option key={i} value={vendor}>
                      {vendor}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaUserTie className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Payment Date
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="paymentDate"
                  value={formData.paymentDate}
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
                Amount
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMoneyBillWave className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Payment Mode
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <select
                  name="paymentMode"
                  value={formData.paymentMode}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8"
                  required
                >
                  <option value="">Select payment mode</option>
                  {paymentModes.map((mode, i) => (
                    <option key={i} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaMoneyBillWave className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <button type="submit" className="btn-primary">
            Save Voucher
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewVoucher;
