import React from "react";
import { FaBed, FaBuilding, FaInfoCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BackButton from "../../components/BackButton/BackButton";
import { toast } from "sonner";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import { useCreateBed } from "../../feature/hooks/useBed";

const bedSchema = z.object({
  bedNumber: z.string().min(1, "Bed number is required"),
  wardNumber: z.string().min(1, "Ward number is required"),
  status: z.enum(["Available", "Occupied", "Maintenance"]).default("Available"),
  description: z.string().optional(),
});

const formFields = [
  {
    section: "Bed Information",
    icon: <FaBed className="text-blue-500" />,
    fields: [
      {
        label: "Bed Number",
        type: "text",
        name: "bedNumber",
        placeholder: "Enter bed number (e.g., B001, ICU-01)",
        required: true,
      },
      {
        label: "Ward Number",
        type: "text",
        name: "wardNumber",
        placeholder: "Enter ward number (e.g., W001, ICU)",
        icon: <FaBuilding className="text-gray-400" />,
        required: true,
      },
      {
        label: "Status",
        type: "select",
        name: "status",
        placeholder: "Select bed status",
        options: ["Available", "Occupied", "Maintenance"],
        required: true,
      },
    ],
  },
  {
    section: "Additional Details",
    icon: <FaInfoCircle className="text-blue-500" />,
    fields: [
      {
        label: "Description",
        type: "textarea",
        name: "description",
        placeholder: "Enter any additional details about the bed (optional)",
        required: false,
      },
    ],
  },
];

const NewBed = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bedSchema),
    defaultValues: {
      bedNumber: "",
      wardNumber: "",
      status: "Available",
      description: "",
    },
  });

  const { mutateAsync, isPending } = useCreateBed();

  const onSubmit = async (data) => {
    try {
      // Clean up the data - remove empty description if not provided
      const cleanedData = {
        ...data,
        description: data.description?.trim() || undefined,
      };

      const response = await mutateAsync(cleanedData);
      const { success, message, data: createdBed } = response;

      if (success) {
        toast.success(message || "Bed added successfully");
        reset(); // Reset form after successful submission
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to add bed"
      );
    }
  };

  return (
    <div className="mx-auto">
      <div className="mb-8">
        <div className="flex items-center">
          <BackButton />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaBed className="mr-2 text-blue-500" />
              Add New Bed
            </h2>
            <p className="text-gray-600 mt-1">
              Please enter all required details for the new bed
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
              {section.fields.map((field, fieldIndex) => {
                const error = errors[field.name];
                return (
                  <div
                    key={fieldIndex}
                    className={`space-y-1 ${
                      field.type === "textarea" ? "md:col-span-2" : ""
                    }`}
                  >
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label}
                      {field.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>

                    {field.type === "select" ? (
                      <div className="relative">
                        <select
                          {...register(field.name)}
                          className={`block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8 ${
                            error ? "border-red-500" : "border-gray-300"
                          }`}
                          aria-invalid={error ? "true" : "false"}
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
                        {...register(field.name)}
                        rows={3}
                        placeholder={field.placeholder}
                        className={`block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                          error ? "border-red-500" : "border-gray-300"
                        }`}
                        aria-invalid={error ? "true" : "false"}
                      />
                    ) : (
                      <div className="relative">
                        <input
                          type={field.type}
                          {...register(field.name)}
                          placeholder={field.placeholder}
                          className={`block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                            field.icon ? "pl-10" : ""
                          } ${error ? "border-red-500" : "border-gray-300"}`}
                          aria-invalid={error ? "true" : "false"}
                        />
                        {field.icon && (
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {field.icon}
                          </div>
                        )}
                      </div>
                    )}

                    {error && (
                      <p className="text-red-600 text-sm mt-1" role="alert">
                        {error.message}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <LoadingButton isLoading={isPending} type="submit">
            {isPending ? "Adding..." : "Add Bed"}
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default NewBed;