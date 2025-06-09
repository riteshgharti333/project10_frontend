import React from "react";
import { FaBoxes, FaTag, FaImage } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BackButton from "../../components/BackButton/BackButton";
import { toast } from "sonner";
import LoadingButton from "../../components/LoadingButton/LoadingButton";

const productSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  productCode: z.string().min(1, "Product code is required"),
  parentCategory: z.string().min(1, "Parent category is required"),
  subCategory: z.string().min(1, "Sub category is required"),
  categoryLogo: z.instanceof(File).optional(),
  description: z.string().optional(),
  unit: z.string().min(1, "Unit is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  taxRate: z.coerce.number().min(0, "Tax rate must be positive"),
  status: z.enum(["Active", "Inactive"]).default("Active"),
});

const parentCategories = [
  "Medical Equipment",
  "Pharmaceuticals",
  "Disposables",
  "Diagnostic",
  "Surgical",
  "Furniture",
];

const subCategories = {
  "Medical Equipment": ["Patient Monitoring", "Therapeutic", "Laboratory"],
  "Pharmaceuticals": ["Drugs", "Vaccines", "Injectables"],
  "Disposables": ["Gloves", "Masks", "Syringes"],
  "Diagnostic": ["Imaging", "Test Kits", "Pathology"],
  "Surgical": ["Instruments", "Sutures", "Implants"],
  "Furniture": ["Hospital Beds", "Chairs", "Cabinets"],
};

const formFields = [
  {
    section: "Product Information",
    icon: <FaTag className="text-blue-500" />,
    fields: [
      {
        label: "Product Name",
        type: "text",
        name: "productName",
        placeholder: "Enter product name",
      },
      {
        label: "Product Code",
        type: "text",
        name: "productCode",
        placeholder: "Enter product code",
      },
      {
        label: "Parent Category",
        type: "select",
        name: "parentCategory",
        placeholder: "Select parent category",
        options: parentCategories,
      },
      {
        label: "Sub Category",
        type: "select",
        name: "subCategory",
        placeholder: "Select sub category",
        dynamicOptions: (watch) => 
          watch("parentCategory") ? subCategories[watch("parentCategory")] : [],
      },
    ],
  },
  {
    section: "Category Details",
    icon: <FaBoxes className="text-blue-500" />,
    fields: [
      {
        label: "Category Logo",
        type: "file",
        name: "categoryLogo",
        accept: "image/*",
      },
      {
        label: "Description",
        type: "textarea",
        name: "description",
        placeholder: "Enter product description",
      },
    ],
  },
  {
    section: "Pricing & Status",
    icon: <FaTag className="text-blue-500" />,
    fields: [
      {
        label: "Unit",
        type: "text",
        name: "unit",
        placeholder: "e.g., pieces, boxes",
      },
      {
        label: "Price",
        type: "number",
        name: "price",
        placeholder: "Enter product price",
      },
      {
        label: "Tax Rate (%)",
        type: "number",
        name: "taxRate",
        placeholder: "Enter tax rate",
      },
      {
        label: "Status",
        type: "select",
        name: "status",
        placeholder: "Select product status",
        options: ["Active", "Inactive"],
      },
    ],
  },
];

const NewProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
      productCode: "",
      parentCategory: "",
      subCategory: "",
      description: "",
      unit: "",
      price: 0,
      taxRate: 0,
      status: "Active",
    },
  });

  const [isPending, setIsPending] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");

  const parentCategory = watch("parentCategory");

  const onSubmit = async (data) => {
    try {
      setIsPending(true);
      // Replace with your actual API call
      // const response = await createProduct(data);
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Product created successfully");
      reset();
      setPreviewImage("");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to create product");
    } finally {
      setIsPending(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("categoryLogo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mx-auto">
      <div className="mb-8">
        <div className="flex items-center">
          <BackButton />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaTag className="mr-2 text-blue-500" />
              New Product
            </h2>
            <p className="text-gray-600 mt-1">
              Please enter all required details for the new product
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
                const options = field.dynamicOptions
                  ? field.dynamicOptions(watch)
                  : field.options || [];

                return (
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
                      {field.name !== "description" && field.name !== "categoryLogo" && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>

                    {field.type === "select" ? (
                      <div className="relative">
                        <select
                          {...register(field.name)}
                          className={`block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white pr-8 ${
                            error ? "border-red-500" : "border-gray-300"
                          } ${
                            field.dynamicOptions && !parentCategory
                              ? "bg-gray-100"
                              : ""
                          }`}
                          aria-invalid={error ? "true" : "false"}
                          disabled={field.dynamicOptions && !parentCategory}
                        >
                          <option value="">{field.placeholder}</option>
                          {options.map((option, i) => (
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
                    ) : field.type === "file" ? (
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <FaImage className="w-8 h-8 mb-3 text-gray-400" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">
                                SVG, PNG, JPG (MAX. 800x400px)
                              </p>
                            </div>
                            <input
                              type="file"
                              {...register(field.name)}
                              onChange={handleFileChange}
                              accept={field.accept}
                              className="hidden"
                            />
                          </label>
                        </div>
                        {previewImage && (
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-700 mb-1">
                              Logo Preview:
                            </p>
                            <div className="w-32 h-32 border border-gray-200 rounded-lg overflow-hidden">
                              <img
                                src={previewImage}
                                alt="Category logo preview"
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
                        className={`block w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                          error ? "border-red-500" : "border-gray-300"
                        }`}
                        aria-invalid={error ? "true" : "false"}
                      />
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
            {isPending ? "Creating..." : "Create Product"}
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;