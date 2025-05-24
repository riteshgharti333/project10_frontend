import React, { useState } from "react";
import {
  FaUser,
  FaUserMd,
  FaTruck,
  FaPills,
  FaFlask,
  FaMoneyBillAlt,
  FaBuilding,
  FaFileInvoice,
  FaFileMedical,
} from "react-icons/fa";
import BackButton from "../../components/BackButton/BackButton";

const NewLedger = () => {
  const [selectedLedger, setSelectedLedger] = useState("Patient");

  const ledgerTypes = [
    { value: "Patient", label: "Patient Ledger", icon: <FaUser /> },
    { value: "Doctor", label: "Doctor Ledger", icon: <FaUserMd /> },
    { value: "Supplier", label: "Supplier Ledger", icon: <FaTruck /> },
    { value: "Pharmacy", label: "Pharmacy Ledger", icon: <FaPills /> },
    { value: "Lab", label: "Lab Ledger", icon: <FaFlask /> },
    { value: "Cash", label: "Cash Ledger", icon: <FaMoneyBillAlt /> },
    { value: "Bank", label: "Bank Ledger", icon: <FaBuilding /> },
    { value: "Insurance", label: "Insurance Ledger", icon: <FaFileMedical /> },
    { value: "Expense", label: "Expense Ledger", icon: <FaFileInvoice /> },
  ];

  return (
    <div className="mx-auto">
      <div className="mb-8">
        <div className="flex items-center">
          <BackButton />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaFileInvoice className="mr-2 text-blue-500" />
              New Ledger Entry
            </h2>
            <p className="text-gray-600 mt-1">
              Select ledger type and enter transaction details
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ledger Type
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ledgerTypes.map((ledger) => (
            <button
              key={ledger.value}
              onClick={() => setSelectedLedger(ledger.value)}
              className={`flex items-center cursor-pointer p-4 border rounded-lg transition-colors ${
                selectedLedger === ledger.value
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <span className="mr-2">{ledger.icon}</span>
              {ledger.label}
            </button>
          ))}
        </div>
      </div>

      {selectedLedger === "Patient" && <PatientLedgerForm />}
      {selectedLedger === "Doctor" && <DoctorLedgerForm />}
      {selectedLedger === "Supplier" && <SupplierLedgerForm />}
      {selectedLedger === "Pharmacy" && <PharmacyLedgerForm />}
      {selectedLedger === "Lab" && <LabLedgerForm />}
      {selectedLedger === "Cash" && <CashLedgerForm />}
      {selectedLedger === "Bank" && <BankLedgerForm />}
      {selectedLedger === "Insurance" && <InsuranceLedgerForm />}
      {selectedLedger === "Expense" && <ExpenseLedgerForm />}
    </div>
  );
};

// Patient Ledger Form
const PatientLedgerForm = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    amountType: "Debit",
    amount: "",
    paymentMode: "Cash",
    transactionId: "",
    remarks: "",
  });

  return (
    <LedgerForm
      formData={formData}
      setFormData={setFormData}
      fields={[
        {
          name: "patientName",
          label: "Patient Name",
          type: "text",
          icon: <FaUser />,
          required: true,
        },
        { name: "date", label: "Date", type: "date", required: true },
        {
          name: "description",
          label: "Description",
          type: "text",
          placeholder: "X-ray, OPD fees etc.",
          required: true,
        },
        {
          name: "amountType",
          label: "Amount Type",
          type: "select",
          options: ["Debit", "Credit"],
          required: true,
        },
        { name: "amount", label: "Amount", type: "number", required: true },
        {
          name: "paymentMode",
          label: "Payment Mode",
          type: "select",
          options: ["Cash", "Card", "UPI", "Insurance"],
          required: true,
        },
        { name: "transactionId", label: "Transaction ID", type: "text" },
        { name: "remarks", label: "Remarks", type: "textarea" },
      ]}
      formTitle="Patient Ledger"
      formIcon={<FaUser />}
    />
  );
};

// Doctor Ledger Form
const DoctorLedgerForm = () => {
  const [formData, setFormData] = useState({
    doctorName: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    amountType: "Debit",
    amount: "",
    paymentMode: "Bank",
    transactionId: "",
    remarks: "",
  });

  return (
    <LedgerForm
      formData={formData}
      setFormData={setFormData}
      fields={[
        {
          name: "doctorName",
          label: "Doctor Name",
          type: "text",
          icon: <FaUserMd />,
          required: true,
        },
        { name: "date", label: "Date", type: "date", required: true },
        {
          name: "description",
          label: "Description",
          type: "text",
          placeholder: "Consultation share, Salary payment etc.",
          required: true,
        },
        {
          name: "amountType",
          label: "Amount Type",
          type: "select",
          options: ["Debit", "Credit"],
          required: true,
        },
        { name: "amount", label: "Amount", type: "number", required: true },
        {
          name: "paymentMode",
          label: "Payment Mode",
          type: "select",
          options: ["Bank", "UPI", "Cash"],
          required: true,
        },
        {
          name: "transactionId",
          label: "Transaction ID",
          type: "text",
          required: true,
        },
        { name: "remarks", label: "Remarks", type: "textarea" },
      ]}
      formTitle="Doctor Ledger"
      formIcon={<FaUserMd />}
    />
  );
};

// Supplier Ledger Form
const SupplierLedgerForm = () => {
  const [formData, setFormData] = useState({
    supplierName: "",
    date: new Date().toISOString().split("T")[0],
    invoiceNo: "",
    description: "",
    amountType: "Debit",
    amount: "",
    paymentMode: "Bank",
    transactionId: "",
    billFile: null,
    remarks: "",
  });

  return (
    <LedgerForm
      formData={formData}
      setFormData={setFormData}
      fields={[
        {
          name: "supplierName",
          label: "Supplier Name",
          type: "text",
          icon: <FaTruck />,
          required: true,
        },
        { name: "date", label: "Date", type: "date", required: true },
        {
          name: "invoiceNo",
          label: "Invoice No.",
          type: "text",
          required: true,
        },
        {
          name: "description",
          label: "Description",
          type: "text",
          placeholder: "Gloves order, Medicine refund etc.",
          required: true,
        },
        {
          name: "amountType",
          label: "Amount Type",
          type: "select",
          options: ["Debit", "Credit"],
          required: true,
        },
        { name: "amount", label: "Amount", type: "number", required: true },
        {
          name: "paymentMode",
          label: "Payment Mode",
          type: "select",
          options: ["Bank", "UPI", "Cheque", "Cash"],
          required: true,
        },
        { name: "transactionId", label: "Transaction ID", type: "text" },
        { name: "billFile", label: "Attach Bill", type: "file" },
        { name: "remarks", label: "Remarks", type: "textarea" },
      ]}
      formTitle="Supplier Ledger"
      formIcon={<FaTruck />}
    />
  );
};

// Pharmacy Ledger Form
const PharmacyLedgerForm = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    medicineName: "",
    description: "",
    amountType: "Debit",
    amount: "",
    paymentMode: "Cash",
    remarks: "",
  });

  return (
    <LedgerForm
      formData={formData}
      setFormData={setFormData}
      fields={[
        { name: "date", label: "Date", type: "date", required: true },
        {
          name: "medicineName",
          label: "Medicine Name/Category",
          type: "text",
          icon: <FaPills />,
        },
        {
          name: "description",
          label: "Description",
          type: "text",
          placeholder: "Patient sale, Restocking etc.",
          required: true,
        },
        {
          name: "amountType",
          label: "Amount Type",
          type: "select",
          options: ["Debit", "Credit"],
          required: true,
        },
        { name: "amount", label: "Amount", type: "number", required: true },
        {
          name: "paymentMode",
          label: "Payment Mode",
          type: "select",
          options: ["Cash", "Card", "UPI"],
          required: true,
        },
        { name: "remarks", label: "Remarks", type: "textarea" },
      ]}
      formTitle="Pharmacy Ledger"
      formIcon={<FaPills />}
    />
  );
};

// Lab Ledger Form
const LabLedgerForm = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    date: new Date().toISOString().split("T")[0],
    testName: "",
    description: "",
    amount: "",
    paymentMode: "Cash",
    reportFile: null,
    remarks: "",
  });

  return (
    <LedgerForm
      formData={formData}
      setFormData={setFormData}
      fields={[
        {
          name: "patientName",
          label: "Patient Name",
          type: "text",
          icon: <FaUser />,
          required: true,
        },
        { name: "date", label: "Date", type: "date", required: true },
        { name: "testName", label: "Test Name", type: "text", required: true },
        {
          name: "description",
          label: "Description",
          type: "text",
          placeholder: "MRI, X-Ray, Blood test etc.",
        },
        { name: "amount", label: "Amount", type: "number", required: true },
        {
          name: "paymentMode",
          label: "Payment Mode",
          type: "select",
          options: ["Cash", "Card", "UPI", "Insurance"],
          required: true,
        },
        { name: "reportFile", label: "Attach Report", type: "file" },
        { name: "remarks", label: "Remarks", type: "textarea" },
      ]}
      formTitle="Lab/Diagnostics Ledger"
      formIcon={<FaFlask />}
    />
  );
};

// Cash Ledger Form
const CashLedgerForm = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    purpose: "",
    amountType: "Debit",
    amount: "",
    remarks: "",
  });

  return (
    <LedgerForm
      formData={formData}
      setFormData={setFormData}
      fields={[
        { name: "date", label: "Date", type: "date", required: true },
        {
          name: "purpose",
          label: "Purpose",
          type: "text",
          placeholder: "Cash received from OPD, Cash expense etc.",
          required: true,
        },
        {
          name: "amountType",
          label: "Amount Type",
          type: "select",
          options: ["Debit", "Credit"],
          required: true,
        },
        { name: "amount", label: "Amount", type: "number", required: true },
        { name: "remarks", label: "Remarks", type: "textarea" },
      ]}
      formTitle="Cash Ledger"
      formIcon={<FaMoneyBillAlt />}
    />
  );
};

// Bank Ledger Form
const BankLedgerForm = () => {
  const [formData, setFormData] = useState({
    bankName: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    amountType: "Debit",
    amount: "",
    transactionId: "",
    remarks: "",
  });

  return (
    <LedgerForm
      formData={formData}
      setFormData={setFormData}
      fields={[
        { name: "bankName", label: "Bank Name", type: "text", required: true },
        { name: "date", label: "Date", type: "date", required: true },
        {
          name: "description",
          label: "Description",
          type: "text",
          placeholder: "Doctor payment, Supplier payment etc.",
          required: true,
        },
        {
          name: "amountType",
          label: "Amount Type",
          type: "select",
          options: ["Debit", "Credit"],
          required: true,
        },
        { name: "amount", label: "Amount", type: "number", required: true },
        {
          name: "transactionId",
          label: "Transaction ID",
          type: "text",
          required: true,
        },
        { name: "remarks", label: "Remarks", type: "textarea" },
      ]}
      formTitle="Bank Ledger"
      formIcon={<FaBuilding />}
    />
  );
};

// Insurance Ledger Form
const InsuranceLedgerForm = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    tpaCompany: "",
    claimAmount: "",
    approvedAmount: "",
    settledAmount: "",
    status: "Pending",
    remarks: "",
  });

  return (
    <LedgerForm
      formData={formData}
      setFormData={setFormData}
      fields={[
        {
          name: "patientName",
          label: "Patient Name",
          type: "text",
          icon: <FaUser />,
          required: true,
        },
        {
          name: "tpaCompany",
          label: "TPA/Insurance Company",
          type: "text",
          required: true,
        },
        {
          name: "claimAmount",
          label: "Claim Amount",
          type: "number",
          required: true,
        },
        { name: "approvedAmount", label: "Approved Amount", type: "number" },
        { name: "settledAmount", label: "Settled Amount", type: "number" },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: ["Pending", "Approved", "Rejected"],
          required: true,
        },
        { name: "remarks", label: "Remarks", type: "textarea" },
      ]}
      formTitle="Insurance/TPA Ledger"
      formIcon={<FaFileMedical />}
    />
  );
};

// Expense Ledger Form
const ExpenseLedgerForm = () => {
  const [formData, setFormData] = useState({
    expenseCategory: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    amount: "",
    paymentMode: "Cash",
    transactionId: "",
    remarks: "",
  });

  const expenseCategories = [
    "Utilities",
    "Salaries",
    "Maintenance",
    "Office Supplies",
    "Medical Supplies",
    "Rent",
    "Others",
  ];

  return (
    <LedgerForm
      formData={formData}
      setFormData={setFormData}
      fields={[
        {
          name: "expenseCategory",
          label: "Expense Category",
          type: "select",
          options: expenseCategories,
          required: true,
        },
        { name: "date", label: "Date", type: "date", required: true },
        {
          name: "description",
          label: "Description",
          type: "text",
          placeholder: "Electricity bill for May etc.",
          required: true,
        },
        { name: "amount", label: "Amount", type: "number", required: true },
        {
          name: "paymentMode",
          label: "Payment Mode",
          type: "select",
          options: ["Cash", "Bank", "UPI", "Cheque"],
          required: true,
        },
        { name: "transactionId", label: "Transaction ID", type: "text" },
        { name: "remarks", label: "Remarks", type: "textarea" },
      ]}
      formTitle="General Expense Ledger"
      formIcon={<FaFileInvoice />}
    />
  );
};

// Reusable Ledger Form Component
const LedgerForm = ({ formData, setFormData, fields, formTitle, formIcon }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add form submission logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8"
    >
      <div className="p-6">
        <div className="flex items-center mb-6">
          {formIcon}
          <h3 className="ml-2 text-lg font-semibold text-gray-800">
            {formTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field, index) => (
            <div
              key={index}
              className={`space-y-1 ${
                field.type === "textarea" ? "md:col-span-2" : ""
              }`}
            >
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === "select" ? (
                <div className="relative">
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8"
                    required={field.required}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
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
              ) : field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  rows="3"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required={field.required}
                />
              ) : field.type === "file" ? (
                <input
                  type="file"
                  name={field.name}
                  onChange={handleFileChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <div className="relative">
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={`block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      field.icon ? "pl-10" : ""
                    }`}
                    required={field.required}
                  />
                  {field.icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {field.icon}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mr-3"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Ledger
        </button>
      </div>
    </form>
  );
};

export default NewLedger;
