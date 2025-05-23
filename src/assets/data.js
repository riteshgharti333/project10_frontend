import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiFileText,
  FiPieChart,
  FiSettings,
  FiUser,
} from "react-icons/fi";
import {
  MdLocalHospital,
  MdMedication,
  MdMedicalServices,
} from "react-icons/md";
import { FaRegSquarePlus } from "react-icons/fa6";
import { LuBaby } from "react-icons/lu";

export const sidebarData = [
  {
    title: "Dashboard",
    icon: FiHome,
    link: "/dashboard",
  },
  {
    title: "Admission Entry",
    icon: FaRegSquarePlus,
    link: "/admission-entries",
  },
  {
    title: "Birth Register",
    icon: LuBaby,
    link: "/birth-entries",
  },
  {
    title: "Patients Register",
    icon: FiUsers,
    link: "/patients-entries",
  },
  // {
  //   title: "Patients",
  //   icon: FiUsers,
  //   subItems: [
  //     { title: "Registration", link: "/patients/registration" },
  //     { title: "Records", link: "/patients/records" },
  //     { title: "Appointments", link: "/patients/appointments" },
  //   ],
  // },
  // {
  //   title: "Doctors",
  //   icon: MdMedicalServices,
  //   subItems: [
  //     { title: "Schedule", link: "/doctors/schedule" },
  //     { title: "Specializations", link: "/doctors/specializations" },
  //     { title: "Availability", link: "/doctors/availability" },
  //   ],
  // },
  // {
  //   title: "Appointments",
  //   icon: FiCalendar,
  //   subItems: [
  //     { title: "New Appointment", link: "/appointments/new" },
  //     { title: "Calendar", link: "/appointments/calendar" },
  //     { title: "Follow-ups", link: "/appointments/follow-ups" },
  //   ],
  // },
  // {
  //   title: "Pharmacy",
  //   icon: MdMedication,
  //   subItems: [
  //     { title: "Inventory", link: "/pharmacy/inventory" },
  //     { title: "Prescriptions", link: "/pharmacy/prescriptions" },
  //     { title: "Suppliers", link: "/pharmacy/suppliers" },
  //   ],
  // },
  // {
  //   title: "Billing",
  //   icon: FiFileText,
  //   subItems: [
  //     { title: "Invoices", link: "/billing/invoices" },
  //     { title: "Payments", link: "/billing/payments" },
  //     { title: "Insurance", link: "/billing/insurance" },
  //   ],
  // },
  // {
  //   title: "Reports",
  //   icon: FiPieChart,
  //   subItems: [
  //     { title: "Patient Stats", link: "/reports/patient-stats" },
  //     { title: "Financial", link: "/reports/financial" },
  //     { title: "Inventory", link: "/reports/inventory" },
  //   ],
  // },
  // {
  //   title: "Emergency",
  //   icon: MdLocalHospital,
  //   subItems: [
  //     { title: "Cases", link: "/emergency/cases" },
  //     { title: "Protocols", link: "/emergency/protocols" },
  //     { title: "Contacts", link: "/emergency/contacts" },
  //   ],
  // },
  // {
  //   title: "Staff",
  //   icon: FiUser,
  //   link: "/staff",
  // },
  // {
  //   title: "Settings",
  //   icon: FiSettings,
  //   link: "/settings",
  // },
];

////////////////////////////

import {
  FaUserInjured,
  FaProcedures,
  FaIdCard,
  FaUserShield,
  FaPhone,
  FaHome,
  FaWeight,
  FaRulerVertical,
  FaBook,
  FaBriefcase,
  FaUserMd,
} from "react-icons/fa";

// export const formFields = [
//   {
//     section: "Admission Details",
//     icon: <FaProcedures className="text-blue-500" />,
//     fields: [
//       {
//         label: "Admission Date",
//         type: "date",
//         name: "admissionDate",
//         placeholder: "Select admission date",
//       },
//       {
//         label: "Admission Time",
//         type: "time",
//         name: "admissionTime",
//         placeholder: "Select admission time",
//       },
//       {
//         label: "Date of Discharge",
//         type: "date",
//         name: "dischargeDate",
//         placeholder: "Select discharge date",
//       },
//       {
//         label: "GS / RS Reg No",
//         type: "text",
//         name: "regNo",
//         placeholder: "Enter GS/RS registration number",
//         icon: <FaIdCard className="text-gray-400" />,
//       },
//       {
//         label: "Ward No",
//         type: "select",
//         name: "wardNo",
//         placeholder: "Select ward number",
//         options: ["Ward 1", "Ward 2", "Ward 3", "ICU", "Emergency"],
//       },
//       {
//         label: "Bed No",
//         type: "text",
//         name: "bedNo",
//         placeholder: "Enter bed number",
//       },
//       {
//         label: "Blood Group",
//         type: "select",
//         name: "bloodGroup",
//         placeholder: "Select blood group",
//         options: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
//       },
//     ],
//   },
//   {
//     section: "Patient Identification",
//     icon: <FaUserInjured className="text-blue-500" />,
//     fields: [
//       {
//         label: "Aadhaar No",
//         type: "text",
//         name: "aadhaarNo",
//         placeholder: "Enter Aadhaar number",
//         icon: <FaIdCard className="text-gray-400" />,
//       },
//       {
//         label: "URN No",
//         type: "text",
//         name: "urnNo",
//         placeholder: "Enter URN number",
//         icon: <FaIdCard className="text-gray-400" />,
//       },
//       {
//         label: "Patient Name",
//         type: "text",
//         name: "patientName",
//         placeholder: "Enter patient name",
//       },
//       {
//         label: "Patient Age",
//         type: "number",
//         name: "patientAge",
//         placeholder: "Enter patient age",
//       },
//       {
//         label: "Patient Sex",
//         type: "select",
//         name: "patientSex",
//         placeholder: "Select sex",
//         options: ["Male", "Female", "Other"],
//       },
//     ],
//   },
//   {
//     section: "Guardian Details",
//     icon: <FaUserShield className="text-blue-500" />,
//     fields: [
//       {
//         label: "Guardian Type",
//         type: "select",
//         name: "guardianType",
//         placeholder: "Select guardian type",
//         options: ["Father", "Mother", "Spouse", "Other"],
//       },
//       {
//         label: "Guardian Name",
//         type: "text",
//         name: "guardianName",
//         placeholder: "Enter guardian name",
//       },
//       {
//         label: "Phone No",
//         type: "tel",
//         name: "phoneNo",
//         placeholder: "Enter phone number",
//         icon: <FaPhone className="text-gray-400" />,
//       },
//     ],
//   },
//   {
//     section: "Additional Information",
//     icon: <FaHome className="text-blue-500" />,
//     fields: [
//       {
//         label: "Patient Address",
//         type: "textarea",
//         name: "patientAddress",
//         placeholder: "Enter patient address",
//       },
//       {
//         label: "Body Weight (kg)",
//         type: "number",
//         name: "bodyWeight",
//         placeholder: "Enter body weight",
//         icon: <FaWeight className="text-gray-400" />,
//       },
//       {
//         label: "Body Height (cm)",
//         type: "number",
//         name: "bodyHeight",
//         placeholder: "Enter body height",
//         icon: <FaRulerVertical className="text-gray-400" />,
//       },
//       {
//         label: "Literacy",
//         type: "text",
//         name: "literacy",
//         placeholder: "Enter literacy level",
//         icon: <FaBook className="text-gray-400" />,
//       },
//       {
//         label: "Occupation",
//         type: "text",
//         name: "occupation",
//         placeholder: "Enter occupation",
//         icon: <FaBriefcase className="text-gray-400" />,
//       },
//     ],
//   },
//   {
//     section: "Medical Information",
//     icon: <FaUserMd className="text-blue-500" />,
//     fields: [
//       {
//         label: "Admission Under Doctor Name",
//         type: "select",
//         name: "doctorName",
//         placeholder: "Select doctor",
//         options: ["Dr. Sharma", "Dr. Mehta", "Dr. Gupta", "Dr. Roy"],
//       },
//       {
//         label: "Delivery",
//         type: "checkbox",
//         name: "delivery",
//         text: "Check if admission is for delivery",
//       },
//     ],
//   },
// ];

////////////////////////////////

///////////////////////////////

export const patientFormFields = [
  {
    label: "Full Name",
    name: "name",
    type: "text",
    placeholder: "Enter patient's full name",
    required: true,
    icon: "FaUser",
  },
  {
    label: "Age",
    name: "age",
    type: "number",
    placeholder: "Enter age",
    min: 0,
    max: 120,
    required: true,
  },
  {
    label: "Mobile Number",
    name: "mobile",
    type: "tel",
    placeholder: "Enter mobile number",
    required: true,
    icon: "FaPhone",
  },
  {
    label: "Gender",
    name: "gender",
    type: "select",
    placeholder: "Select gender",
    required: true,
    options: ["Male", "Female", "Other"],
    icon: "FaVenusMars",
  },
  {
    label: "Bed Number",
    name: "bed",
    type: "text",
    placeholder: "Enter bed number",
    icon: "FaBed",
  },
  {
    label: "Aadhaar Number",
    name: "aadhaar",
    type: "text",
    placeholder: "Enter Aadhaar number",
    icon: "FaIdCard",
  },
  {
    label: "Address",
    name: "address",
    type: "textarea",
    placeholder: "Enter full address",
    rows: 2,
    icon: "FaHome",
  },
  {
    label: "Medical History",
    name: "medicalHistory",
    type: "textarea",
    placeholder: "Enter any known medical conditions",
    rows: 3,
    icon: "FaNotesMedical",
  },
];
