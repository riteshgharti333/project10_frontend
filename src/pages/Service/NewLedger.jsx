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
  FaCalendarAlt,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner"; // Assuming sonner for toasts

import BackButton from "../../components/BackButton/BackButton";
// import LoadingButton from "../../components/LoadingButton/LoadingButton";

// --- Mock Component for Demonstration ---
const LoadingButton = ({ isLoading, children, ...props }) => (
  <button
    {...props}
    disabled={isLoading}
    className="px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
  >
    {isLoading ? "Saving..." : children}
  </button>
);
// --- End Mock Component ---

// --- Zod Schemas for Each Ledger Type ---

const patientLedgerSchema = z.object({
  patientName: z.string().min(1, "Patient name is required"),
  date: z.coerce.date(),
  description: z.string().min(1, "Description is required"),
  amountType: z.enum(["Debit", "Credit"]),
  amount: z.coerce.number().positive("Amount must be a positive number"),
  paymentMode: z.string().min(1, "Payment mode is required"),
  transactionId: z.string().optional(),
  remarks: z.string().optional(),
});

const doctorLedgerSchema = z.object({
  doctorName: z.string().min(1, "Doctor name is required"),
  date: z.coerce.date(),
  description: z.string().min(1, "Description is required"),
  amountType: z.enum(["Debit", "Credit"]),
  amount: z.coerce.number().positive("Amount must be a positive number"),
  paymentMode: z.string().min(1, "Payment mode is required"),
  transactionId: z.string().optional(),
  remarks: z.string().optional(),
});

const supplierLedgerSchema = z.object({
  supplierName: z.string().min(1, "Supplier name is required"),
  date: z.coerce.date(),
  invoiceNo: z.string().min(1, "Invoice number is required"),
  description: z.string().min(1, "Description is required"),
  amountType: z.enum(["Debit", "Credit"]),
  amount: z.coerce.number().positive("Amount must be a positive number"),
  paymentMode: z.string().optional(),
  transactionId: z.string().optional(),
  billFile: z.any().optional(),
  remarks: z.string().optional(),
});

const pharmacyLedgerSchema = z.object({
  date: z.coerce.date(),
  medicineName: z.string().min(1, "Medicine name/category is required"),
  description: z.string().min(1, "Description is required"),
  amountType: z.enum(["Debit", "Credit"]),
  amount: z.coerce.number().positive("Amount must be a positive number"),
  paymentMode: z.string().min(1, "Payment mode is required"),
  remarks: z.string().optional(),
});

const labLedgerSchema = z.object({
  patientName: z.string().min(1, "Patient name is required"),
  date: z.coerce.date(),
  testName: z.string().min(1, "Test name is required"),
  description: z.string().optional(),
  amount: z.coerce.number().positive("Amount must be a positive number"),
  paymentMode: z.string().min(1, "Payment mode is required"),
  reportFile: z.any().optional(),
  remarks: z.string().optional(),
});

const cashLedgerSchema = z.object({
  date: z.coerce.date(),
  purpose: z.string().min(1, "Purpose is required"),
  amountType: z.enum(["Debit", "Credit"]),
  amount: z.coerce.number().positive("Amount must be a positive number"),
  remarks: z.string().optional(),
});

const bankLedgerSchema = z.object({
  bankName: z.string().min(1, "Bank name is required"),
  date: z.coerce.date(),
  description: z.string().min(1, "Description is required"),
  amountType: z.enum(["Debit", "Credit"]),
  amount: z.coerce.number().positive("Amount must be a positive number"),
  transactionId: z.string().optional(),
  remarks: z.string().optional(),
});

const insuranceLedgerSchema = z.object({
  patientName: z.string().min(1, "Patient name is required"),
  tpaCompany: z.string().min(1, "TPA/Insurance Company is required"),
  claimAmount: z.coerce.number().positive("Claim amount must be positive"),
  approvedAmount: z.coerce.number().min(0).optional(),
  settledAmount: z.coerce.number().min(0).optional(),
  status: z.enum(["Pending", "Approved", "Rejected"]),
  remarks: z.string().optional(),
});

const expenseLedgerSchema = z.object({
  expenseCategory: z.string().min(1, "Expense category is required"),
  date: z.coerce.date(),
  description: z.string().min(1, "Description is required"),
  amount: z.coerce.number().positive("Amount must be a positive number"),
  paymentMode: z.string().min(1, "Payment mode is required"),
  transactionId: z.string().optional(),
  remarks: z.string().optional(),
});

const schemas = {
  Patient: patientLedgerSchema,
  Doctor: doctorLedgerSchema,
  Supplier: supplierLedgerSchema,
  Pharmacy: pharmacyLedgerSchema,
  Lab: labLedgerSchema,
  Cash: cashLedgerSchema,
  Bank: bankLedgerSchema,
  Insurance: insuranceLedgerSchema,
  Expense: expenseLedgerSchema,
};

// --- Main Component ---
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

  const renderForm = () => {
    switch (selectedLedger) {
      case "Patient":
        return <PatientLedgerForm key={selectedLedger} />;
      case "Doctor":
        return <DoctorLedgerForm key={selectedLedger} />;
      case "Supplier":
        return <SupplierLedgerForm key={selectedLedger} />;
      case "Pharmacy":
        return <PharmacyLedgerForm key={selectedLedger} />;
      case "Lab":
        return <LabLedgerForm key={selectedLedger} />;
      case "Cash":
        return <CashLedgerForm key={selectedLedger} />;
      case "Bank":
        return <BankLedgerForm key={selectedLedger} />;
      case "Insurance":
        return <InsuranceLedgerForm key={selectedLedger} />;
      case "Expense":
        return <ExpenseLedgerForm key={selectedLedger} />;
      default:
        return null;
    }
  };

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
          Ledger Type<span className="text-red-500 ml-1">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ledgerTypes.map((ledger) => (
            <button
              key={ledger.value}
              onClick={() => setSelectedLedger(ledger.value)}
              className={`flex items-center justify-center text-center cursor-pointer p-4 border rounded-lg transition-colors ${
                selectedLedger === ledger.value
                  ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <span className="mr-3 text-lg">{ledger.icon}</span>
              {ledger.label}
            </button>
          ))}
        </div>
      </div>

      {renderForm()}
    </div>
  );
};

// --- Child Form Components ---

const PatientLedgerForm = () => {
  return (
    <BaseLedgerForm schema={schemas.Patient} formConfig={patientFormConfig} />
  );
};
const DoctorLedgerForm = () => {
  return (
    <BaseLedgerForm schema={schemas.Doctor} formConfig={doctorFormConfig} />
  );
};
const SupplierLedgerForm = () => {
  return (
    <BaseLedgerForm schema={schemas.Supplier} formConfig={supplierFormConfig} />
  );
};
const PharmacyLedgerForm = () => {
  return (
    <BaseLedgerForm schema={schemas.Pharmacy} formConfig={pharmacyFormConfig} />
  );
};
const LabLedgerForm = () => {
  return <BaseLedgerForm schema={schemas.Lab} formConfig={labFormConfig} />;
};
const CashLedgerForm = () => {
  return <BaseLedgerForm schema={schemas.Cash} formConfig={cashFormConfig} />;
};
const BankLedgerForm = () => {
  return <BaseLedgerForm schema={schemas.Bank} formConfig={bankFormConfig} />;
};
const InsuranceLedgerForm = () => {
  return (
    <BaseLedgerForm
      schema={schemas.Insurance}
      formConfig={insuranceFormConfig}
    />
  );
};
const ExpenseLedgerForm = () => {
  return (
    <BaseLedgerForm schema={schemas.Expense} formConfig={expenseFormConfig} />
  );
};

// --- Form Configurations ---
// (Moved outside components for clarity)

const patientFormConfig = {
  formTitle: "Patient Ledger",
  formIcon: <FaUser />,
  fields: [
    {
      name: "patientName",
      label: "Patient Name",
      type: "text",
      icon: <FaUser />,
      required: true,
    },
    {
      name: "date",
      label: "Date",
      type: "date",
      icon: <FaCalendarAlt />,
      required: true,
    },
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
  ],
  defaultValues: {
    patientName: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    amountType: "Debit",
    amount: "",
    paymentMode: "Cash",
    transactionId: "",
    remarks: "",
  },
};

const doctorFormConfig = {
  formTitle: "Doctor Ledger",
  formIcon: <FaUserMd />,
  fields: [
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
    { name: "transactionId", label: "Transaction ID", type: "text" },
    { name: "remarks", label: "Remarks", type: "textarea" },
  ],
  defaultValues: {
    doctorName: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    amountType: "Debit",
    amount: "",
    paymentMode: "Bank",
    transactionId: "",
    remarks: "",
  },
};

const supplierFormConfig = {
  formTitle: "Supplier Ledger",
  formIcon: <FaTruck />,
  fields: [
    {
      name: "supplierName",
      label: "Supplier Name",
      type: "text",
      icon: <FaTruck />,
      required: true,
    },
    { name: "date", label: "Date", type: "date", required: true },
    { name: "invoiceNo", label: "Invoice No.", type: "text", required: true },
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
    },
    { name: "transactionId", label: "Transaction ID", type: "text" },
    { name: "billFile", label: "Attach Bill", type: "file" },
    { name: "remarks", label: "Remarks", type: "textarea" },
  ],
  defaultValues: {
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
  },
};

const pharmacyFormConfig = {
  formTitle: "Pharmacy Ledger",
  formIcon: <FaPills />,
  fields: [
    { name: "date", label: "Date", type: "date", required: true },
    {
      name: "medicineName",
      label: "Medicine Name/Category",
      type: "text",
      icon: <FaPills />,
      required: true,
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
  ],
  defaultValues: {
    date: new Date().toISOString().split("T")[0],
    medicineName: "",
    description: "",
    amountType: "Debit",
    amount: "",
    paymentMode: "Cash",
    remarks: "",
  },
};

const labFormConfig = {
  formTitle: "Lab/Diagnostics Ledger",
  formIcon: <FaFlask />,
  fields: [
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
  ],
  defaultValues: {
    patientName: "",
    date: new Date().toISOString().split("T")[0],
    testName: "",
    description: "",
    amount: "",
    paymentMode: "Cash",
    reportFile: null,
    remarks: "",
  },
};

const cashFormConfig = {
  formTitle: "Cash Ledger",
  formIcon: <FaMoneyBillAlt />,
  fields: [
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
  ],
  defaultValues: {
    date: new Date().toISOString().split("T")[0],
    purpose: "",
    amountType: "Debit",
    amount: "",
    remarks: "",
  },
};

const bankFormConfig = {
  formTitle: "Bank Ledger",
  formIcon: <FaBuilding />,
  fields: [
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
    { name: "transactionId", label: "Transaction ID", type: "text" },
    { name: "remarks", label: "Remarks", type: "textarea" },
  ],
  defaultValues: {
    bankName: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    amountType: "Debit",
    amount: "",
    transactionId: "",
    remarks: "",
  },
};

const insuranceFormConfig = {
  formTitle: "Insurance/TPA Ledger",
  formIcon: <FaFileMedical />,
  fields: [
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
  ],
  defaultValues: {
    patientName: "",
    tpaCompany: "",
    claimAmount: "",
    approvedAmount: "",
    settledAmount: "",
    status: "Pending",
    remarks: "",
  },
};

const expenseFormConfig = {
  formTitle: "General Expense Ledger",
  formIcon: <FaFileInvoice />,
  fields: [
    {
      name: "expenseCategory",
      label: "Expense Category",
      type: "select",
      options: [
        "Utilities",
        "Salaries",
        "Maintenance",
        "Office Supplies",
        "Medical Supplies",
        "Rent",
        "Others",
      ],
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
  ],
  defaultValues: {
    expenseCategory: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
    amount: "",
    paymentMode: "Cash",
    transactionId: "",
    remarks: "",
  },
};

// --- The Reusable Base Form Component ---
const BaseLedgerForm = ({ schema, formConfig }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: formConfig.defaultValues,
  });

  const onSubmit = (data) => {
    console.log(`Submitting ${formConfig.formTitle}:`, data);
    toast.success(`${formConfig.formTitle} entry saved successfully!`);
    // Here you would call your API mutation
    // e.g., await createLedgerEntry(data);
  };

  return (
    <LedgerFormUI
      fields={formConfig.fields}
      formTitle={formConfig.formTitle}
      formIcon={formConfig.formIcon}
      // Pass react-hook-form props down
      register={register}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      isSubmitting={isSubmitting}
    />
  );
};

// --- Reusable UI Component (Almost unchanged, but now stateless) ---
const LedgerFormUI = ({
  fields,
  formTitle,
  formIcon,
  register,
  errors,
  onSubmit,
  isSubmitting,
}) => {
  const getInputClass = (fieldName) =>
    `block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
      errors[fieldName] ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <form
      onSubmit={onSubmit}
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
          {fields.map((field) => (
            <div
              key={field.name}
              className={`space-y-1 ${
                field.type === "textarea" ? "md:col-span-2" : ""
              }`}
            >
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === "select" ? (
                <select
                  {...register(field.name)}
                  className={`${getInputClass(
                    field.name
                  )} appearance-none bg-white pr-8`}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  {...register(field.name)}
                  placeholder={field.placeholder}
                  rows="3"
                  className={getInputClass(field.name)}
                />
              ) : field.type === "file" ? (
                <input
                  type="file"
                  {...register(field.name)}
                  className={getInputClass(field.name)}
                />
              ) : (
                <div className="relative">
                  <input
                    type={field.type}
                    {...register(field.name)}
                    placeholder={field.placeholder}
                    className={`${getInputClass(field.name)} ${
                      field.icon ? "pl-10" : ""
                    }`}
                  />
                  {field.icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {field.icon}
                    </div>
                  )}
                </div>
              )}
              {errors[field.name] && (
                <p className="text-red-600 text-sm mt-1">
                  {errors[field.name].message}
                </p>
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
        <LoadingButton type="submit" isLoading={isSubmitting}>
          Save Ledger
        </LoadingButton>
      </div>
    </form>
  );
};

export default NewLedger;
