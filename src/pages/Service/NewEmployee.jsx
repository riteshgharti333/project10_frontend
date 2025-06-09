import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaUserCircle,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaVenusMars,
  FaHeart,
  FaIdCard,
  FaTint,
  FaBuilding,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner"; // Assuming you use sonner for toasts

import BackButton from "../../components/BackButton/BackButton";
// Create or import these components as needed
// import { useCreateEmployee } from "../../feature/hooks/useEmployees";
// import LoadingButton from "../../components/LoadingButton/LoadingButton";

// --- Mock Components for Demonstration ---
// Replace these with your actual components.
const useCreateEmployee = () => ({
  mutateAsync: async (data) => {
    console.log("Submitting to API:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Simulate a successful response
    return { success: true, message: "Employee created successfully!" };
    // To test error case:
    // throw new Error("Failed to create employee on the server.");
  },
  isPending: false, // You'd get this from your query hook
});

const LoadingButton = ({ isLoading, children, ...props }) => (
  <button
    {...props}
    disabled={isLoading}
    className="btn-primary disabled:bg-blue-400 disabled:cursor-not-allowed"
  >
    {isLoading ? "Saving..." : children}
  </button>
);
// --- End Mock Components ---

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const employeeSchema = z.object({
  employeeName: z.string().min(1, "Employee name is required"),
  fathersName: z.string().min(1, "Father's name is required"),
  photo: z
    .any()
    .refine((files) => files?.length === 1, "Photo is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 2MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, and .png formats are supported."
    ),
  dateOfRegistration: z.string().min(1, "Date of registration is required"),
  contactNo: z.string().regex(/^\d{10}$/, "Contact number must be 10 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["Male", "Female"], {
    errorMap: () => ({ message: "Please select a gender" }),
  }),
  maritalStatus: z.enum(["Married", "Unmarried"]).optional(),
  aadharNo: z.string().regex(/^[0-9]{12}$/, "Aadhar number must be 12 digits"),
  voterId: z.string().optional(),
  bloodGroup: z.string().optional(),
  department: z.string().min(1, "Department is required"),
});

const NewEmployee = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      dateOfRegistration: new Date().toISOString().split("T")[0],
      employeeName: "",
      fathersName: "",
      contactNo: "",
      dateOfBirth: "",
      email: "",
      gender: undefined,
      maritalStatus: undefined,
      aadharNo: "",
      voterId: "",
      bloodGroup: "",
      department: "",
    },
  });

  const { mutateAsync, isPending } = useCreateEmployee();

  const [previewPhoto, setPreviewPhoto] = useState(null);
  const photoFile = watch("photo");

  useEffect(() => {
    if (photoFile && photoFile.length > 0) {
      const file = photoFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewPhoto(null);
    }
  }, [photoFile]);

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const departments = [
    "General Medicine",
    "Pediatrics",
    "Orthopedics",
    "Gynecology",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
  ];

  const onSubmit = async (data) => {
    // The photo is a FileList, the backend will likely expect a file upload (FormData)
    const formData = new FormData();
    Object.keys(data).forEach(key => {
        if (key === 'photo') {
            formData.append(key, data[key][0]); // Append the file itself
        } else {
            formData.append(key, data[key]);
        }
    });

    try {
      const response = await mutateAsync(formData); // Pass FormData to your mutation
      if (response.success) {
        toast.success(response.message);
        // reset(); // Optionally reset form on success
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create employee");
    }
  };

  const getInputClass = (fieldName) =>
    `block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
      errors[fieldName] ? "border-red-500" : "border-gray-300"
    }`;


  return (
    <div className="">
      <div className="mb-8">
        <div className="flex items-center">
          <BackButton />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaUser className="mr-2 text-blue-600" />
              New Employee Registration
            </h2>
            <p className="text-gray-600 mt-1">
              Please fill all required employee details
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-center mb-6">
            <FaUser className="text-blue-500" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">
              Basic Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Photo Upload */}
            <div className="space-y-1 md:col-span-2 flex items-start">
              <div className="mr-4">
                <div className="w-24 h-24 rounded-full bg-gray-200 border border-gray-300 overflow-hidden flex items-center justify-center">
                  {previewPhoto ? (
                    <img
                      src={previewPhoto}
                      alt="Employee Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-gray-400 text-4xl" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Photo
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="file"
                  {...register("photo")}
                  accept="image/*"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                <p className="mt-1 text-xs text-gray-500">JPG, PNG up to 2MB</p>
                {errors.photo && <p className="text-red-600 text-sm mt-1">{errors.photo.message}</p>}
              </div>
            </div>

            {/* Employee Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Employee Name<span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("employeeName")}
                  placeholder="Enter employee name"
                  className={`${getInputClass("employeeName")} pl-10`}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
              </div>
              {errors.employeeName && <p className="text-red-600 text-sm mt-1">{errors.employeeName.message}</p>}
            </div>

            {/* Father's Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Father's Name<span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("fathersName")}
                  placeholder="Enter father's name"
                  className={`${getInputClass("fathersName")} pl-10`}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
              </div>
              {errors.fathersName && <p className="text-red-600 text-sm mt-1">{errors.fathersName.message}</p>}
            </div>

            {/* Date of Registration */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Date of Registration<span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  {...register("dateOfRegistration")}
                  className={`${getInputClass("dateOfRegistration")} pl-10`}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
              </div>
              {errors.dateOfRegistration && <p className="text-red-600 text-sm mt-1">{errors.dateOfRegistration.message}</p>}
            </div>

            {/* Contact No */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Contact No<span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  {...register("contactNo")}
                  placeholder="Enter 10-digit contact number"
                  className={`${getInputClass("contactNo")} pl-10`}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="text-gray-400" />
                </div>
              </div>
              {errors.contactNo && <p className="text-red-600 text-sm mt-1">{errors.contactNo.message}</p>}
            </div>

            {/* Date of Birth */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth<span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  {...register("dateOfBirth")}
                  className={`${getInputClass("dateOfBirth")} pl-10`}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
              </div>
              {errors.dateOfBirth && <p className="text-red-600 text-sm mt-1">{errors.dateOfBirth.message}</p>}
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Email Address<span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter email address"
                  className={`${getInputClass("email")} pl-10`}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
              </div>
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Gender */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Gender<span className="text-red-500 ml-1">*</span>
              </label>
              <div className="flex space-x-4 pt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register("gender")}
                    value="Male"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register("gender")}
                    value="Female"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Female</span>
                </label>
              </div>
              {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender.message}</p>}
            </div>

            {/* Marital Status */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Marital Status
              </label>
              <div className="flex space-x-4 pt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register("maritalStatus")}
                    value="Married"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Married</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register("maritalStatus")}
                    value="Unmarried"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Unmarried</span>
                </label>
              </div>
               {errors.maritalStatus && <p className="text-red-600 text-sm mt-1">{errors.maritalStatus.message}</p>}
            </div>

            {/* Aadhar No */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Aadhar No<span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("aadharNo")}
                  placeholder="Enter 12-digit Aadhar number"
                  className={`${getInputClass("aadharNo")} pl-10`}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaIdCard className="text-gray-400" />
                </div>
              </div>
              {errors.aadharNo && <p className="text-red-600 text-sm mt-1">{errors.aadharNo.message}</p>}
            </div>

            {/* Voter ID */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Voter ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("voterId")}
                  placeholder="Enter Voter ID"
                  className={`${getInputClass("voterId")} pl-10`}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaIdCard className="text-gray-400" />
                </div>
              </div>
              {errors.voterId && <p className="text-red-600 text-sm mt-1">{errors.voterId.message}</p>}
            </div>

            {/* Blood Group */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Blood Group
              </label>
              <div className="relative">
                <select
                  {...register("bloodGroup")}
                  className={`${getInputClass("bloodGroup")} appearance-none bg-white pr-8 pl-10`}
                >
                  <option value="">Select blood group</option>
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaTint className="text-gray-400" />
                </div>
              </div>
              {errors.bloodGroup && <p className="text-red-600 text-sm mt-1">{errors.bloodGroup.message}</p>}
            </div>
            
            {/* Department */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Department<span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <select
                  {...register("department")}
                  className={`${getInputClass("department")} appearance-none bg-white pr-8 pl-10`}
                >
                  <option value="">Select department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBuilding className="text-gray-400" />
                </div>
              </div>
              {errors.department && <p className="text-red-600 text-sm mt-1">{errors.department.message}</p>}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <LoadingButton type="submit" isLoading={isPending}>
            Save Employee
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default NewEmployee;