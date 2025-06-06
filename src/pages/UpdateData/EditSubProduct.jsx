import React, { useState } from "react";
import { FaBox, FaTrash, FaPlus, FaArrowLeft } from "react-icons/fa";
import BackButton from "../../components/BackButton/BackButton";

const EditSubProduct = () => {
  // Sample data for dropdowns
  const brands = ["Brand A", "Brand B", "Brand C", "Brand D"];
  const categories = ["Medicines", "Equipment", "Disposables", "Surgical"];
  const gstOptions = ["0%", "5%", "12%", "18%", "28%"];
  const uomOptions = ["Nos", "Box", "Kg", "Ltr", "Meter", "Set"];
  const alterUnitOptions = ["Nos", "Box", "Kg", "Ltr", "Meter", "Set"];

  // Main form state
  const [formData, setFormData] = useState({
    brand: "",
    category: "",
    productName: "",
    shortDesc: "",
    hsnCode: "",
    gst: "",
  });

  // Material section state
  const [materials, setMaterials] = useState([
    {
      id: Date.now(),
      uom: "",
      description: "",
      alterUnit: "",
      alterUnitValue: "",
      serialNo: "",
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMaterialChange = (id, e) => {
    const { name, value } = e.target;
    setMaterials((prev) =>
      prev.map((material) =>
        material.id === id ? { ...material, [name]: value } : material
      )
    );
  };

  const addMaterial = () => {
    setMaterials((prev) => [
      ...prev,
      {
        id: Date.now(),
        uom: "",
        description: "",
        alterUnit: "",
        alterUnitValue: "",
        serialNo: "",
      },
    ]);
  };

  const removeMaterial = (id) => {
    if (materials.length > 1) {
      setMaterials((prev) => prev.filter((material) => material.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productEntry = {
      ...formData,
      materials,
    };
    console.log("Product Entry:", productEntry);
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
        onSubmit={handleSubmit}
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
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Brand</option>
                {brands.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Category <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Product Name <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Enter product name"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Short Description */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Short Description
              </label>
              <input
                type="text"
                name="shortDesc"
                value={formData.shortDesc}
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
                name="hsnCode"
                value={formData.hsnCode}
                onChange={handleChange}
                placeholder="Enter HSN code"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* GST */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                GST(%) <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="gst"
                value={formData.gst}
                onChange={handleChange}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select GST %</option>
                {gstOptions.map((gst, index) => (
                  <option key={index} value={gst}>
                    {gst}
                  </option>
                ))}
              </select>
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
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                >
                  <option value="">Select</option>
                  {uomOptions.map((uom, i) => (
                    <option key={i} value={uom}>
                      {uom}
                    </option>
                  ))}
                </select>
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
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
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
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">Select</option>
                  {alterUnitOptions.map((unit, i) => (
                    <option key={i} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
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
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>

              {/* Serial/Unique No */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Serial/Unique No
                </label>
                <div className="flex">
                  <input
                    type="text"
                    name="serialNo"
                    value={material.serialNo}
                    onChange={(e) => handleMaterialChange(material.id, e)}
                    placeholder="Serial No"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
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
              </div>
            </div>
          ))}
        </div>

        {/* Form Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
          <button type="submit" className="btn-primary">
            Save Product Entry
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSubProduct;
