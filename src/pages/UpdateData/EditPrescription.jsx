import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaUserMd,
  FaUser,
  FaFileAlt,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import BackButton from "../../components/BackButton/BackButton";

const EditPrescription = () => {
  const [formData, setFormData] = useState({
    prescriptionDate: "",
    doctorId: "",
    patientId: "",
    prescriptionFile: null,
    medicines: [{ id: Date.now(), name: "", description: "", duration: "" }],
  });

  const [doctors] = useState([
    { id: "1", name: "Dr. Smith" },
    { id: "2", name: "Dr. Johnson" },
    { id: "3", name: "Dr. Williams" },
  ]);

  const [patients] = useState([
    { id: "101", name: "John Doe" },
    { id: "102", name: "Jane Smith" },
    { id: "103", name: "Robert Johnson" },
  ]);

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
      prescriptionFile: e.target.files[0],
    }));
  };

  const handleMedicineChange = (id, e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      medicines: prev.medicines.map((med) =>
        med.id === id ? { ...med, [name]: value } : med
      ),
    }));
  };

  const addMedicine = () => {
    setFormData((prev) => ({
      ...prev,
      medicines: [
        ...prev.medicines,
        { id: Date.now(), name: "", description: "" },
      ],
    }));
  };

  const removeMedicine = (id) => {
    setFormData((prev) => ({
      ...prev,
      medicines: prev.medicines.filter((med) => med.id !== id),
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
              New Prescription
            </h2>
            <p className="text-gray-600 mt-1">
              Please enter all required details for the prescription
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
              Prescription Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Prescription Date
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="prescriptionDate"
                  value={formData.prescriptionDate}
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
                Doctor
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <select
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8"
                  required
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaUserMd className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Patient
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <select
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8"
                  required
                >
                  <option value="">Select Patient</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Prescription Document
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="prescriptionFile"
                  onChange={handleFileChange}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  accept=".pdf,.jpg,.png,.doc,.docx"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <FaFileAlt className="text-blue-500" />
              <h3 className="ml-2 text-lg font-semibold text-gray-800">
                Medicines
              </h3>
            </div>
            <button
              type="button"
              onClick={addMedicine}
              className="flex items-center px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <FaPlus className="mr-1" /> Add Medicine
            </button>
          </div>

          <div className="space-y-4">
            {formData.medicines.map((medicine, index) => (
              <div
                key={medicine.id}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 items-top"
              >
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Medicine Name {index + 1}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={medicine.name}
                    onChange={(e) => handleMedicineChange(medicine.id, e)}
                    placeholder="Enter medicine name"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={medicine.description}
                    onChange={(e) => handleMedicineChange(medicine.id, e)}
                    placeholder="Enter medicine description"
                    rows="2"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeMedicine(medicine.id)}
                    className="p-2 text-red-600 cursor-pointer hover:text-red-800"
                    // disabled={formData.medicines.length === 1}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <button type="submit" className="btn-primary">
            Save Prescription
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPrescription;
