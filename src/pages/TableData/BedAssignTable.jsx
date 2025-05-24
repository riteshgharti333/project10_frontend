import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import Table from "../../components/Table/Table";
import { allocatedBedData, departmentData } from "../../assets/tableData";

const BedAssignTable = () => {
 
    const columns = useMemo(
  () => [
    {
      accessorKey: "wardNumber",
      header: "Ward Number",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "bedNumber",
      header: "Bed Number",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "bedType",
      header: "Bed Type",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "patientName",
      header: "Patient Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "allocateDate",
      header: "Allocate Date",
      cell: (info) => {
        const date = new Date(info.getValue());
        return isNaN(date)
          ? info.getValue()
          : date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });
      },
    },
    {
      accessorKey: "dischargeDate",
      header: "Discharge Date",
      cell: (info) => {
        const date = new Date(info.getValue());
        return isNaN(date)
          ? info.getValue()
          : date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            info.getValue() === "Occupied"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-700"
          }`}
        >
          {info.getValue()}
        </span>
      ),
    },
  ],
  []
);


  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          Bed Patient Assign
        </h2>
        <Link className="btn-primary" to={"/new-bed-assign"}>
          <FaPlus /> New Bed Patient Assign
        </Link>
      </div>

      <Table data={allocatedBedData} columns={columns} />
    </div>
  );
};

export default BedAssignTable;
