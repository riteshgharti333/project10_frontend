import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import AdmissionEntry from "./pages/Service/AdmissionEntry";
import Dashboard from "./pages/Service/Dashboard";
import BirthRegister from "./pages/Service/BirthRegister";
import PatientRegister from "./pages/Service/PatientRegister";
import AddmissionEntriesTable from "./pages/TableData/AddmissionEntriesTable";
import BirthEntriesTable from "./pages/TableData/BirthEntriesTable";
import PatientsEntriesTable from "./pages/TableData/PatientsEntriesTable";

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
            <Route path="/patients-entries" element={<PatientsEntriesTable />} />
            <Route path="/new-patient-register" element={<PatientRegister />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
