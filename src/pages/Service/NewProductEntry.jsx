import React, { useState } from 'react';
import { FaBox, FaTrash, FaPlus } from 'react-icons/fa';
import BackButton from '../../components/BackButton/BackButton';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define Zod schemas
const materialSpecSchema = z.object({
  uom: z.string().min(1, "UOM is required"),
  description: z.string().optional(),
  alterUnit: z.string().optional(),
  alterUnitValue: z.number().optional(),
  serialUniqueNo: z.string().optional(),
});

const productSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  productName: z.string().min(1, "Product name is required"),
  shortDesc: z.string().optional(),
  hsnCode: z.string().min(1, "HSN Code is required"),
  gst: z.string().min(1, "GST is required"),
  specifications: z.array(materialSpecSchema).min(1, "At least one material specification is required"),
});

const NewProductEntry = () => {
  // Sample data for dropdowns
  const brands = ['Brand A', 'Brand B', 'Brand C', 'Brand D'];
  const categories = ['Medicines', 'Equipment', 'Disposables', 'Surgical'];
  const gstOptions = ['0%', '5%', '12%', '18%', '28%'];
  const uomOptions = ['Nos', 'Box', 'Kg', 'Ltr', 'Meter', 'Set'];
  const alterUnitOptions = ['Nos', 'Box', 'Kg', 'Ltr', 'Meter', 'Set'];

  // Main form state
  const [materials, setMaterials] = useState([
    {
      id: Date.now(),
      uom: '',
      description: '',
      alterUnit: '',
      alterUnitValue: '',
      serialUniqueNo: '',
    },
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      brand: '',
      category: '',
      productName: '',
      shortDesc: '',
      hsnCode: '',
      gst: '',
      specifications: materials,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue(name, value);
  };

  const handleMaterialChange = (id, e) => {
    const { name, value } = e.target;
    setMaterials(prev =>
      prev.map(material =>
        material.id === id ? { ...material, [name]: value } : material
      )
    );
  };

  const addMaterial = () => {
    setMaterials(prev => [
      ...prev,
      {
        id: Date.now(),
        uom: '',
        description: '',
        alterUnit: '',
        alterUnitValue: '',
        serialUniqueNo: '',
      },
    ]);
  };

  const removeMaterial = (id) => {
    if (materials.length > 1) {
      setMaterials(prev => prev.filter(material => material.id !== id));
    }
  };

  const handleSubmitForm = (data) => {
    const productEntry = {
      ...data,
      specifications: materials,
    };
    console.log('Product Entry:', productEntry);
    // Submit logic here
  };

  return (
    <div className="mx-auto">
      <div className="mb-8">
        <div className="flex items-center">
          <BackButton />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaBox className="mr-2 text-blue-500" />
              New Product Entry
            </h2>
            <p className="text-gray-600 mt-1">
              Enter product details and material specifications
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        {/* Product Information Section */}
        <div className="p-6">
          <div className="flex items-center mb-6">
            <FaBox className="text-blue-500" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">
              Product Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Brand */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Brand <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                {...register("brand")}
                onChange={handleChange}
                className={`block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.brand ? 'border-red-500' : ''}`}
                
              >
                <option value="">Select Brand</option>
                {brands.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              {errors.brand && <p className="text-red-600 text-sm">{errors.brand.message}</p>}
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Category <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                {...register("category")}
                onChange={handleChange}
                className={`block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.category ? 'border-red-500' : ''}`}
                
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-600 text-sm">{errors.category.message}</p>}
            </div>

            {/* Product Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Product Name <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                {...register("productName")}
                onChange={handleChange}
                placeholder="Enter product name"
                className={`block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.productName ? 'border-red-500' : ''}`}
                
              />
              {errors.productName && <p className="text-red-600 text-sm">{errors.productName.message}</p>}
            </div>

            {/* Short Description */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Short Description
              </label>
              <input
                type="text"
                {...register("shortDesc")}
                onChange={handleChange}
                placeholder="Enter short description"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* HSN Code */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                HSN Code <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                {...register("hsnCode")}
                onChange={handleChange}
                placeholder="Enter HSN code"
                className={`block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.hsnCode ? 'border-red-500' : ''}`}
                
              />
              {errors.hsnCode && <p className="text-red-600 text-sm">{errors.hsnCode.message}</p>}
            </div>

            {/* GST */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                GST(%) <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                {...register("gst")}
                onChange={handleChange}
                className={`block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.gst ? 'border-red-500' : ''}`}
                
              >
                <option value="">Select GST %</option>
                {gstOptions.map((gst, index) => (
                  <option key={index} value={gst}>
                    {gst}
                  </option>
                ))}
              </select>
              {errors.gst && <p className="text-red-600 text-sm">{errors.gst.message}</p>}
            </div>
          </div>
        </div>

        {/* Materials Section */}
        <div className="p-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <FaBox className="text-blue-500" />
              <h3 className="ml-2 text-lg font-semibold text-gray-800">
                Material Specifications
              </h3>
            </div>
            <button
              type="button"
              onClick={addMaterial}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <FaPlus className="mr-1" /> Add Material
            </button>
          </div>

          {materials.map((material, index) => (
            <div
              key={material.id}
              className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6 p-4 bg-gray-50 rounded-lg"
            >
              {/* UOM */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  UOM <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  name="uom"
                  value={material.uom}
                  onChange={(e) => handleMaterialChange(material.id, e)}
                  className={`block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm ${errors.specifications?.[index]?.uom ? 'border-red-500' : ''}`}
                  
                >
                  <option value="">Select</option>
                  {uomOptions.map((uom, i) => (
                    <option key={i} value={uom}>
                      {uom}
                    </option>
                  ))}
                </select>
                {errors.specifications?.[index]?.uom && <p className="text-red-600 text-sm">{errors.specifications[index].uom.message}</p>}
              </div>

              {/* Description */}
              <div className="space-y-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={material.description}
                  onChange={(e) => handleMaterialChange(material.id, e)}
                  placeholder="Description"
                  className={`block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm ${errors.specifications?.[index]?.description ? 'border-red-500' : ''}`}
                />
                {errors.specifications?.[index]?.description && <p className="text-red-600 text-sm">{errors.specifications[index].description.message}</p>}
              </div>

              {/* Alter Unit */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Alter Unit
                </label>
                <select
                  name="alterUnit"
                  value={material.alterUnit}
                  onChange={(e) => handleMaterialChange(material.id, e)}
                  className={`block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm ${errors.specifications?.[index]?.alterUnit ? 'border-red-500' : ''}`}
                >
                  <option value="">Select</option>
                  {alterUnitOptions.map((unit, i) => (
                    <option key={i} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
                {errors.specifications?.[index]?.alterUnit && <p className="text-red-600 text-sm">{errors.specifications[index].alterUnit.message}</p>}
              </div>

              {/* Alter Unit Value */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Alter Unit Value
                </label>
                <input
                  type="text"
                  name="alterUnitValue"
                  value={material.alterUnitValue}
                  onChange={(e) => handleMaterialChange(material.id, e)}
                  placeholder="Value"
                  className={`block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm ${errors.specifications?.[index]?.alterUnitValue ? 'border-red-500' : ''}`}
                />
                {errors.specifications?.[index]?.alterUnitValue && <p className="text-red-600 text-sm">{errors.specifications[index].alterUnitValue.message}</p>}
              </div>

              {/* Serial/Unique No */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Serial/Unique No
                </label>
                <div className="flex">
                  <input
                    type="text"
                    name="serialUniqueNo"
                    value={material.serialUniqueNo}
                    onChange={(e) => handleMaterialChange(material.id, e)}
                    placeholder="Serial No"
                    className={`block w-full px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500 text-sm ${errors.specifications?.[index]?.serialUniqueNo ? 'border-red-500' : ''}`}
                  />
                  {materials.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMaterial(material.id)}
                      className="px-3 py-2 bg-red-500 text-white rounded-r-lg hover:bg-red-600 focus:outline-none"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  )}
                </div>
                {errors.specifications?.[index]?.serialUniqueNo && <p className="text-red-600 text-sm">{errors.specifications[index].serialUniqueNo.message}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Form Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            type="submit"
            className="btn-primary"
          >
            Save Product Entry
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProductEntry;
