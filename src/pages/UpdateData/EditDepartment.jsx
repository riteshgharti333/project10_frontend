import React, { useState } from "react";
import { FaBuilding, FaUser, FaPhone, FaArrowLeft } from "react-icons/fa";
import BackButton from "../../components/BackButton/BackButton";

const EditDepartment = () => {
  const [formData, setFormData] = useState({
    departmentName: "",
    departmentHead: "",
    contactNumber: "",
    email: "",
    location: "",
    description: "",
    status: "Active",
  });

  const formFields = [
    {
      section: "Department Information",
      icon: <FaBuilding className="text-blue-500" />,
      fields: [
        {
          label: "Department Name",
          type: "text",
          name: "departmentName",
          placeholder: "Enter department name",
        },
        {
          label: "Department Head",
          type: "text",
          name: "departmentHead",
          placeholder: "Enter department head name",
          icon: <FaUser className="text-gray-400" />,
        },
        {
          label: "Contact Number",
          type: "tel",
          name: "contactNumber",
          placeholder: "Enter contact number",
          icon: <FaPhone className="text-gray-400" />,
        },
        {
          label: "Email",
          type: "email",
          name: "email",
          placeholder: "Enter department email",
        },
      ],
    },
    {
      section: "Additional Details",
      icon: <FaBuilding className="text-blue-500" />,
      fields: [
        {
          label: "Location",
          type: "text",
          name: "location",
          placeholder: "Enter department location",
        },
        {
          label: "Description",
          type: "textarea",
          name: "description",
          placeholder: "Enter department description",
        },
        {
          label: "Status",
          type: "select",
          name: "status",
          placeholder: "Select department status",
          options: ["Active", "Inactive"],
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

  const handleBack = () => {
    // Add back navigation logic here
    console.log("Back button clicked");
  };

  return (
    <div className="mx-auto">
      <div className="mb-8">
        <div className="flex items-center">
          <BackButton />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaBuilding className="mr-2 text-blue-500" />
              New Department
            </h2>
            <p className="text-gray-600 mt-1">
              Please enter all required details for the new department
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
                <div
                  key={fieldIndex}
                  className={`space-y-1 ${
                    field.type === "textarea" ? "md:col-span-2" : ""
                  }`}
                >
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
                  ) : field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      rows="3"
                      className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      required
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
          <button type="submit" className="btn-primary">
            Create Department
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDepartment;
