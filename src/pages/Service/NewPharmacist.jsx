import React from "react";
import { FaUser, FaPhone, FaIdCard, FaHome } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BackButton from "../../components/BackButton/BackButton";
import { toast } from "sonner";
import LoadingButton from "../../components/LoadingButton/LoadingButton";

const pharmacistSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  regNo: z.string().min(1, "Registration number is required"),
  address: z.string().min(1, "Address is required"),
  department: z.string().default("Pharmacy"),
  status: z.enum(["Active", "Inactive", "On Leave"]).default("Active"),
});

const formFields = [
  {
    section: "Pharmacist Information",
    icon: <FaUser className="text-blue-500" />,
    fields: [
      {
        label: "Full Name",
        type: "text",
        name: "name",
        placeholder: "Enter pharmacist's full name",
        icon: <FaUser className="text-gray-400" />,
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
    ],
  },
  {
    section: "Additional Details",
    icon: <FaHome className="text-blue-500" />,
    fields: [
      {
        label: "Address",
        type: "textarea",
        name: "address",
        placeholder: "Enter full address",
      },
      {
        label: "Department",
        type: "text",
        name: "department",
        placeholder: "Enter department",
        defaultValue: "Pharmacy",
        readOnly: true,
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

const NewPharmacist = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(pharmacistSchema),
    defaultValues: {
      name: "",
      mobile: "",
      regNo: "",
      address: "",
      department: "Pharmacy",
      status: "Active",
    },
  });

  const [isPending, setIsPending] = React.useState(false);

  const onSubmit = async (data) => {
    try {
      setIsPending(true);
      // Replace with your actual API call
      // const response = await createPharmacist(data);
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Pharmacist created successfully");
      reset();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to create pharmacist");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="mx-auto">
      <div className="mb-8">
        <div className="flex items-center">
          <BackButton />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaUser className="mr-2 text-blue-500" />
              Add New Pharmacist
            </h2>
            <p className="text-gray-600 mt-1">
              Please enter all required details for the new pharmacist
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
                      {!field.readOnly && <span className="text-red-500 ml-1">*</span>}
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
                          } ${error ? "border-red-500" : "border-gray-300"} ${
                            field.readOnly ? "bg-gray-100" : ""
                          }`}
                          aria-invalid={error ? "true" : "false"}
                          readOnly={field.readOnly}
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
            {isPending ? "Creating..." : "Add Pharmacist"}
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default NewPharmacist;