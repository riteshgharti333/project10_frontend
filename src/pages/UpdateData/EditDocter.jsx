
import React, { useState } from "react";
import {
  FaUserMd,
  FaPhone,
  FaIdCard,
  FaGraduationCap,
  FaBriefcase,
  FaArrowLeft,
} from "react-icons/fa";
import BackButton from "../../components/BackButton/BackButton";

const EditDocter = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    regNo: "",
    qualification: "",
    designation: "",
    department: "",
    specialization: "",
    status: "Active",
  });

  const formFields = [
    {
      section: "Doctor Information",
      icon: <FaUserMd className="text-blue-500" />,
      fields: [
        {
          label: "Full Name",
          type: "text",
          name: "name",
          placeholder: "Enter doctor's full name",
          icon: <FaUserMd className="text-gray-400" />,
        },
        {
          label: "Mobile Number",
          type: "tel",
          name: "mobile",
          placeholder: "Enter mobile number",
          icon: <FaPhone className="text-gray-400" />,
        },
        {
          label: "Registration No",
          type: "text",
          name: "regNo",
          placeholder: "Enter registration number",
          icon: <FaIdCard className="text-gray-400" />,
        },
        {
          label: "Qualification",
          type: "text",
          name: "qualification",
          placeholder: "Enter qualification",
          icon: <FaGraduationCap className="text-gray-400" />,
        },
      ],
    },
    {
      section: "Professional Details",
      icon: <FaBriefcase className="text-blue-500" />,
      fields: [
        {
          label: "Designation",
          type: "text",
          name: "designation",
          placeholder: "Enter designation",
          icon: <FaBriefcase className="text-gray-400" />,
        },
        {
          label: "Department",
          type: "select",
          name: "department",
          placeholder: "Select department",
          options: [
            "Cardiology",
            "Neurology",
            "Pediatrics",
            "Orthopedics",
            "General Medicine",
          ],
        },
        {
          label: "Specialization",
          type: "text",
          name: "specialization",
          placeholder: "Enter specialization",
        },
        {
          label: "Status",
          type: "select",
          name: "status",
          placeholder: "Select status",
          options: ["Active", "Inactive", "On Leave"],
        },
      ],
    },
  ];

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
    <div className="mx-auto">
      <div className="mb-8">
        <div className="flex items-center">
          <BackButton />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaUserMd className="mr-2 text-blue-500" />
              Add New Doctor
            </h2>
            <p className="text-gray-600 mt-1">
              Please enter all required details for the new doctor
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        {formFields.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className={`p-6 ${
              sectionIndex !== 0 ? "border-t border-gray-100" : ""
            }`}
          >
            <div className="flex items-center mb-6">
              {section.icon}
              <h3 className="ml-2 text-lg font-semibold text-gray-800">
                {section.section}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.fields.map((field, fieldIndex) => (
                <div key={fieldIndex} className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  {field.type === "select" ? (
                    <div className="relative">
                      <select
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8"
                        required
                      >
                        <option value="">{field.placeholder}</option>
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
                        required
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
        ))}

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
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDocter
