import React from "react";
import {
  FaBaby,
  FaClock,
  FaVenusMars,
  FaWeight,
  FaUser,
  FaPhone,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BackButton from "../../components/BackButton/BackButton";
import { toast } from "sonner";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import { useCreateBirthRecord } from "../../feature/hooks/useBirth";

const birthSchema = z.object({
  birthTime: z.string().min(1, "Birth time is required"),
  birthDate: z.coerce.date(),
  babySex: z.string().min(1, "Baby's sex is required"),
  babyWeight: z.number().positive("Weight must be positive"),
  fatherName: z.string().min(1, "Father's name is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  deliveryType: z.string().min(1, "Delivery type is required"),
  birthPlace: z.string().min(1, "Place of birth is required"),
  attendantName: z.string().min(1, "Attendant's name is required"),
});

const formFields = [
  {
    section: "Baby Details",
    icon: <FaBaby className="text-blue-500" />,
    fields: [
      {
        label: "Birth Date",
        type: "date",
        name: "birthDate",
        placeholder: "Select birth date",
      },
      {
        label: "Birth Time",
        type: "time",
        name: "birthTime",
        placeholder: "Select birth time",
        icon: <FaClock className="text-gray-400" />,
      },
      {
        label: "Baby's Sex",
        type: "select",
        name: "babySex",
        placeholder: "Select baby's sex",
        options: ["Male", "Female"],
      },
      {
        label: "Baby's Weight (kg)",
        type: "number",
        name: "babyWeight",
        placeholder: "Enter baby's weight",
        step: "0.01",
        icon: <FaWeight className="text-gray-400" />,
      },
    ],
  },
  {
    section: "Parent Information",
    icon: <FaUser className="text-blue-500" />,
    fields: [
      {
        label: "Father's Name",
        type: "text",
        name: "fatherName",
        placeholder: "Enter father's full name",
      },
      {
        label: "Mother's Name",
        type: "text",
        name: "motherName",
        placeholder: "Enter mother's full name",
      },
      {
        label: "Mobile Number",
        type: "tel",
        name: "mobile",
        placeholder: "Enter mobile number",
        icon: <FaPhone className="text-gray-400" />,
      },
    ],
  },
  {
    section: "Birth Information",
    icon: <FaBaby className="text-blue-500" />,
    fields: [
      {
        label: "Type of Delivery",
        type: "select",
        name: "deliveryType",
        placeholder: "Select delivery type",
        options: ["Normal", "Cesarean", "Forceps", "Vacuum"],
      },
      {
        label: "Place of Birth",
        type: "select",
        name: "birthPlace",
        placeholder: "Select birth place",
        options: ["Hospital", "Home", "Clinic", "Other"],
      },
      {
        label: "Attendant's Name",
        type: "text",
        name: "attendantName",
        placeholder: "Enter attendant's name",
      },
    ],
  },
];

const BirthRegister = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(birthSchema),
    defaultValues: {
      birthDate: "",
      birthTime: "",
      babySex: "",
      babyWeight: 0,
      fatherName: "",
      motherName: "",
      mobile: "",
      deliveryType: "",
      birthPlace: "",
      attendantName: "",
    },
  });

  const { mutateAsync, isPending } = useCreateBirthRecord();

  const onSubmit = async (formData) => {
    try {
      await mutateAsync(formData);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto">
      <div className="mb-8">
        <div className="flex items-center">
          <BackButton />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaBaby className="mr-2 text-pink-500" />
              Baby Birth Registration
            </h2>
            <p className="text-gray-600 mt-1">
              Please enter all required details for birth registration
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
                  <div key={fieldIndex} className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label}
                      <span className="text-red-500 ml-1">*</span>
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
                    ) : (
                      <div className="relative">
                        <input
                          type={field.type}
                          {...register(field.name, {
                            valueAsNumber: field.type === "number",
                          })}
                          placeholder={field.placeholder}
                          step={field.step}
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
          <LoadingButton isLoading={isPending || isSubmitting}>
            Register Birth
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default BirthRegister;
