import React, { useState, useEffect } from "react";
import { FaBed, FaUser, FaCalendarAlt, FaStickyNote, FaEdit, FaTimes, FaSave, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import BackButton from "../../components/BackButton/BackButton";
import { toast } from "sonner";
import {
  useUpdateBedAssignment,
  useDeleteBedAssignment,
  useGetBedAssignmentById,
} from "../../feature/hooks/useBedAssing";
import { useNavigate, useParams } from "react-router-dom";
import { bedAssignmentSchema } from "@hospital/schemas";
import Loader from "../../components/Loader/Loader";
import NoData from "../../components/NoData/NoData";
import {
  EditButton,
  DeleteButton,
  CancelButton,
  SaveButton,
} from "../../components/ActionButtons/ActionButtons";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

const formFields = [
  {
    section: "Bed Information",
    icon: <FaBed className="text-blue-500" />,
    fields: [
      {
        label: "Ward Number",
        type: "text",
        name: "wardNumber",
        placeholder: "Enter ward number (e.g., W001, ICU)",
        required: true,
      },
      {
        label: "Bed Number",
        type: "text",
        name: "bedNumber",
        placeholder: "Enter bed number (e.g., B001, ICU-01)",
        required: true,
      },
      {
        label: "Bed Type",
        type: "select",
        name: "bedType",
        placeholder: "Select bed type",
        options: [
          "General",
          "ICU",
          "Private",
          "Semi-Private",
          "Pediatric",
          "Emergency",
        ],
        required: true,
      },
    ],
  },
  {
    section: "Patient Information",
    icon: <FaUser className="text-blue-500" />,
    fields: [
      {
        label: "Patient Name",
        type: "text",
        name: "patientName",
        placeholder: "Enter patient's full name",
        icon: <FaUser className="text-gray-400" />,
        required: true,
      },
      {
        label: "Allocation Date",
        type: "date",
        name: "allocateDate",
        placeholder: "Select allocation date",
        icon: <FaCalendarAlt className="text-gray-400" />,
        required: true,
      },
      {
        label: "Expected Discharge Date",
        type: "date",
        name: "dischargeDate",
        placeholder: "Select expected discharge date (optional)",
        icon: <FaCalendarAlt className="text-gray-400" />,
        required: false,
      },
      {
        label: "Status",
        type: "select",
        name: "status",
        placeholder: "Select assignment status",
        options: ["Active", "Discharged", "Transferred"],
        required: true,
      },
    ],
  },
  {
    section: "Additional Details",
    icon: <FaStickyNote className="text-blue-500" />,
    fields: [
      {
        label: "Notes",
        type: "textarea",
        name: "notes",
        placeholder: "Enter any additional notes about the bed assignment (optional)",
        icon: <FaStickyNote className="text-gray-400" />,
        required: false,
      },
    ],
  },
];

const optionalFields = ["dischargeDate", "notes"];

const EditBedAssign = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data: bedAssignmentData, isLoading } = useGetBedAssignmentById(id);
  const { mutateAsync: updateBedAssignment, isPending: isUpdating } = useUpdateBedAssignment();
  const { mutateAsync: deleteBedAssignment, isPending: isDeleting } = useDeleteBedAssignment();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bedAssignmentSchema),
  });

  // Reusable function for disabled styles
  const getDisabledStyles = (isDisabled) =>
    isDisabled ? "bg-gray-100 cursor-not-allowed opacity-90" : "";

  // Set form values when data loads
  useEffect(() => {
    if (bedAssignmentData) {
      const formattedData = {
        ...bedAssignmentData,
        allocateDate: bedAssignmentData.allocateDate?.split("T")[0] || "",
        dischargeDate: bedAssignmentData.dischargeDate?.split("T")[0] || "",
      };
      reset(formattedData);
    }
  }, [bedAssignmentData, reset]);

  // Form submission
  const onSubmit = async (formData) => {
    try {
      const submissionData = {
        ...formData,
        allocateDate: new Date(formData.allocateDate),
        dischargeDate: formData.dischargeDate ? new Date(formData.dischargeDate) : undefined,
      };

      const response = await updateBedAssignment({ id, data: submissionData });
      
      if (response?.data?.success) {
        toast.success(response.data.message);
        setEditMode(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update bed assignment");
    }
  };

  const handleCancel = () => {
    reset(bedAssignmentData);
    setEditMode(false);
  };

  const handleDelete = async () => {
    try {
      const { data } = await deleteBedAssignment(id);
      if (data && data.message) {
        navigate("/bed-assign-management");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete bed assignment");
    } finally {
      setShowDeleteModal(false);
    }
  };

  if (isLoading) return <Loader />;
  if (!bedAssignmentData) return <NoData />;

  return (
    <div className="mx-auto">
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        loading={isDeleting}
      />

      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BackButton />
            <h2 className="text-2xl font-bold text-gray-800 flex items-center ml-2">
              <FaBed className="mr-2 text-blue-600" />
              {editMode ? "Edit Bed Assignment" : "View Bed Assignment"}
            </h2>
          </div>
        </div>
      </div>

      {/* Form */}
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
                const fieldValue = bedAssignmentData[field.name];

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
                          disabled={!editMode}
                          className={`block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none pr-8 ${
                            error ? "border-red-500" : "border-gray-300"
                          } ${getDisabledStyles(!editMode)}`}
                          aria-invalid={error ? "true" : "false"}
                        >
                          <option value="" disabled hidden>
                            {field.placeholder}
                          </option>
                          {field.options.map((option, i) => (
                            <option
                              key={i}
                              value={option}
                              selected={fieldValue === option}
                            >
                              {option}
                            </option>
                          ))}
                        </select>
                        {field.icon && (
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {field.icon}
                          </div>
                        )}
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
                        disabled={!editMode}
                        rows={3}
                        placeholder={field.placeholder}
                        defaultValue={fieldValue}
                        className={`block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                          field.icon ? "pl-10" : ""
                        } ${
                          error ? "border-red-500" : "border-gray-300"
                        } ${getDisabledStyles(!editMode)}`}
                        aria-invalid={error ? "true" : "false"}
                      />
                    ) : (
                      <div className="relative">
                        <input
                          type={field.type}
                          {...register(field.name)}
                          disabled={!editMode}
                          placeholder={field.placeholder}
                          defaultValue={
                            field.type === "date"
                              ? fieldValue?.split("T")[0] || ""
                              : fieldValue
                          }
                          className={`block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                            field.icon ? "pl-10" : ""
                          } ${
                            error ? "border-red-500" : "border-gray-300"
                          } ${getDisabledStyles(!editMode)}`}
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

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          {!editMode ? (
            <>
              <DeleteButton
                type="button"
                onClick={() => setShowDeleteModal(true)}
              />
              <EditButton onClick={() => setEditMode(true)} />
            </>
          ) : (
            <>
              <CancelButton onClick={handleCancel} />
              <SaveButton type="submit" isLoading={isUpdating} />
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditBedAssign;