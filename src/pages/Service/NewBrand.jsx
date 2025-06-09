import React, { useState } from "react";
import { FaBox, FaImage } from "react-icons/fa";
import BackButton from "../../components/BackButton/BackButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define Zod schema
const brandSchema = z.object({
  name: z.string().min(1, "Brand name is required"),
  logo: z.instanceof(File).optional(),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

const NewBrand = () => {
  const [formData, setFormData] = useState({
    name: "",
    logo: null,
    logoPreview: "",
    description: "",
    status: "Active",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(brandSchema),
    defaultValues: formData,
  });

  const formFields = [
    {
      section: "Brand Information",
      icon: <FaBox className="text-blue-500" />,
      fields: [
        {
          label: "Brand Name",
          type: "text",
          name: "name",
          placeholder: "Enter brand name",
        },
        {
          label: "Brand Logo",
          type: "file",
          name: "logo",
          accept: "image/*",
        },
        {
          label: "Description",
          type: "textarea",
          name: "description",
          placeholder: "Enter brand description",
        },
      ],
    },
    {
      section: "Status",
      icon: <FaBox className="text-blue-500" />,
      fields: [
        {
          label: "Status",
          type: "select",
          name: "status",
          placeholder: "Select brand status",
          options: ["Active", "Inactive"],
        },
      ],
    },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          logo: file,
          logoPreview: reader.result,
        }));
        setValue("logo", file); // Set the file in react-hook-form
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    // Add form submission logic here
  };

  return (
    <div className="mx-auto">
      <div className="mb-8">
        <div className="flex items-center">
          <BackButton />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaBox className="mr-2 text-blue-500" />
              New Brand
            </h2>
            <p className="text-gray-600 mt-1">
              Please enter all required details for the new brand
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
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
                    field.type === "textarea" || field.type === "file"
                      ? "md:col-span-2"
                      : ""
                  }`}
                >
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                    <span className="text-red-500 ml-1">*</span>
                  </label>

                  {field.type === "select" ? (
                    <div className="relative">
                      <select
                        {...register(field.name)}
                        className={`block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8 ${
                          errors[field.name] ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">{field.placeholder}</option>
                        {field.options.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors[field.name] && (
                        <p className="text-red-600 text-sm">{errors[field.name].message}</p>
                      )}
                    </div>
                  ) : field.type === "textarea" ? (
                    <textarea
                      {...register(field.name)}
                      placeholder={field.placeholder}
                      rows="3"
                      className={`block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                        errors[field.name] ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  ) : field.type === "file" ? (
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FaImage className="w-8 h-8 mb-3 text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">SVG, PNG, JPG (MAX. 800x400px)</p>
                          </div>
                          <input
                            type="file"
                            accept={field.accept}
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                      {formData.logoPreview && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-700 mb-1">Logo Preview:</p>
                          <div className="w-32 h-32 border border-gray-200 rounded-lg overflow-hidden">
                            <img
                              src={formData.logoPreview}
                              alt="Brand logo preview"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      {...register(field.name)}
                      placeholder={field.placeholder}
                      className={`block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                        errors[field.name] ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  )}
                  {errors[field.name] && (
                    <p className="text-red-600 text-sm">{errors[field.name].message}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <button type="submit" className="btn-primary">
            Create Brand
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewBrand;
