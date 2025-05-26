import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import AdmissionEntry from "./pages/Service/AdmissionEntry";
import Dashboard from "./pages/Service/Dashboard";
import BirthRegister from "./pages/Service/BirthRegister";
import PatientRegister from "./pages/Service/PatientRegister";
import AddmissionEntriesTable from "./pages/TableData/AddmissionEntriesTable";
import BirthEntriesTable from "./pages/TableData/BirthEntriesTable";
import PatientsEntriesTable from "./pages/TableData/PatientsEntriesTable";
import DepartmentTable from "./pages/TableData/DepartmentTable";
import NewDepartment from "./pages/Service/NewDepartment";
import BedTable from "./pages/TableData/BedTable";
import NewBed from "./pages/Service/NewBed";
import BedAssignTable from "./pages/TableData/BedAssignTable";
import NewBedAssign from "./pages/Service/NewBedAssign";
import Appointment from "./pages/TableData/AppointmentTable";
import NewAppointment from "./pages/Service/NewAppointment";
import NurseTable from "./pages/TableData/NurseTable";
import NewNurse from "./pages/Service/NewNurse";
import DoctorTable from "./pages/TableData/DoctorTable";
import NewDoctor from "./pages/Service/NewDoctor";
import PharmacistTable from "./pages/TableData/PharmacistTable";
import NewPharmacist from "./pages/Service/NewPharmacist";
import PrescriptionTable from "./pages/TableData/PrescriptionTable";
import NewPrescription from "./pages/Service/NewPrescription";
import NewXray from "./pages/Service/NewXray";
import XrayReportTable from "./pages/TableData/XrayReportTable";
import AmbulancesTable from "./pages/TableData/AmbulancesTable";
import NewAmbulance from "./pages/Service/NewAmbulance";
import NewLedger from "./pages/Service/NewLedger";
import PatientLedger from "./pages/LadgerTable/PatientLedger";
import DoctorLedger from "./pages/LadgerTable/DoctorLedger";
import SupplierLedger from "./pages/LadgerTable/SupplierLedger";
import PharmacyLedger from "./pages/LadgerTable/PharmacyLedger";
import DiagnosticsLedger from "./pages/LadgerTable/DiagnosticsLedger";
import CashLedger from "./pages/LadgerTable/CashLedger";
import BankLedger from "./pages/LadgerTable/BankLedger";
import InsuranceTPALedger from "./pages/LadgerTable/InsuranceTPALedger";
import GeneralExpenseLedger from "./pages/LadgerTable/GeneralExpenseLedger";
import CreationTable from "./pages/TableData/CreationTable";
import NewBrand from "./pages/Service/NewBrand";
import ProductTable from "./pages/TableData/ProductTable";
import NewProduct from "./pages/Service/NewProduct";
import ProductEntryTable from "./pages/TableData/ProductEntryTable";
import NewProductEntry from "./pages/Service/NewProductEntry";
import AllProductTable from "./pages/TableData/AllProductTable";
import ServiceChargesUpdate from "./pages/Service/ServiceChargesUpdate";
import NewBillEntry from "./pages/Service/NewBillEntry";
import NewMoneyReceiptEntry from "./pages/Service/NewMoneyReceiptEntry";
import BillTable from "./pages/TableData/BillTable";
import MoneyReceiptTable from "./pages/TableData/MoneyReceiptTable";
import VoucharTable from "./pages/TableData/VoucharTable";
import NewVouchar from "./pages/Service/NewVouchar";
import EmployeeTable from "./pages/TableData/EmployeeTable";
import NewEmployee from "./pages/Service/NewEmployee";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Admission Entry  */}
            <Route
              path="/admission-entries"
              element={<AddmissionEntriesTable />}
            />
            <Route path="/new-admission-entry" element={<AdmissionEntry />} />

            {/* Birth Entry */}
            <Route path="/birth-entries" element={<BirthEntriesTable />} />
            <Route path="/new-birth-register" element={<BirthRegister />} />

            {/* patients */}
            <Route
              path="/patients-entries"
              element={<PatientsEntriesTable />}
            />
            <Route path="/new-patient-register" element={<PatientRegister />} />

            {/* Department */}
            <Route path="/departments" element={<DepartmentTable />} />
            <Route path="/new-department" element={<NewDepartment />} />

            {/* Bed Mster */}
            <Route path="/bed-master" element={<BedTable />} />
            <Route path="/new-bed" element={<NewBed />} />

            {/* Bed Assign */}
            <Route path="/bed-assign-management" element={<BedAssignTable />} />
            <Route path="/new-bed-assign" element={<NewBedAssign />} />

            {/* Appointments */}
            <Route path="/appointments" element={<Appointment />} />
            <Route path="/new-appointment" element={<NewAppointment />} />

            {/* Nurse */}
            <Route path="/nurses" element={<NurseTable />} />
            <Route path="/new-nurse" element={<NewNurse />} />

            {/* Doctors */}
            <Route path="/doctors" element={<DoctorTable />} />
            <Route path="/new-doctor" element={<NewDoctor />} />

            {/* Pharmacist */}
            <Route path="/pharmacists" element={<PharmacistTable />} />
            <Route path="/new-pharmacist" element={<NewPharmacist />} />

            {/* Prescription */}
            <Route path="/prescriptions" element={<PrescriptionTable />} />
            <Route path="/new-prescription" element={<NewPrescription />} />

            {/* Xray */}
            <Route path="/xray/new-xray" element={<NewXray />} />
            <Route
              path="/xray/xray-commision-report"
              element={<XrayReportTable />}
            />

            {/* Ambulance */}
            <Route path="/ambulances" element={<AmbulancesTable />} />
            <Route path="/new-ambulance" element={<NewAmbulance />} />

            {/* Ledger */}
            <Route path="/new-ledger" element={<NewLedger />} />

            {/* Ledger Tables */}
            <Route path="/ledger/patient-ledger" element={<PatientLedger />} />
            <Route path="/ledger/doctor-ledger" element={<DoctorLedger />} />
            <Route
              path="/ledger/supplier-ledger"
              element={<SupplierLedger />}
            />
            <Route
              path="/ledger/pharmacy-ledger"
              element={<PharmacyLedger />}
            />
            <Route
              path="ledger/lab-diagnostics-ledger"
              element={<DiagnosticsLedger />}
            />
            <Route path="/ledger/cash-ledger" element={<CashLedger />} />
            <Route path="/ledger/bank-ledger" element={<BankLedger />} />
            <Route
              path="/ledger/insurance-tpa-ledger"
              element={<InsuranceTPALedger />}
            />
            <Route
              path="/ledger/general-expense-ledger"
              element={<GeneralExpenseLedger />}
            />

            {/* Item Services */}
            <Route path="/company-creation" element={<CreationTable />} />
            <Route path="/new-company-creation" element={<NewBrand />} />
            <Route path="/product-category" element={<ProductTable />} />
            <Route path="/add-product-category" element={<NewProduct />} />
            <Route path="/add-product" element={<ProductEntryTable />} />
            <Route path="/new-product-entry" element={<NewProductEntry />} />
            <Route path="/all-products" element={<AllProductTable />} />
            <Route
              path="/service-charges-update"
              element={<ServiceChargesUpdate />}
            />

            {/* Transection */}
            <Route path="/bills" element={<BillTable />} />
            <Route path="/new-bill-entry" element={<NewBillEntry />} />
            <Route path="/money-receipts" element={<MoneyReceiptTable />} />
            <Route
              path="/new-money-receipt-entry"
              element={<NewMoneyReceiptEntry />}
            />
            <Route
              path="/service-charges-update"
              element={<ServiceChargesUpdate />}
            />

            <Route path="/payment-vouchars" element={<VoucharTable />} />
            <Route path="/new-vouchar" element={<NewVouchar />} />

            <Route path="/employees" element={<EmployeeTable />} />
            <Route path="/new-employee" element={<NewEmployee />} />




          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
