import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import Table from "../../components/Table/Table";
import { dummyPatients } from "../../assets/tableData";

const AddmissionEntriesTable = () => {


const columns = useMemo(
  () => [
    {
      accessorKey: "patientName",
      header: "Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "patientAge",
      header: "Age",
      cell: (info) => `${info.getValue()} yrs`,
    },
    {
      accessorKey: "patientSex",
      header: "Sex",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "regNo",
      header: "Reg. No",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "wardNo",
      header: "Ward",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "bedNo",
      header: "Bed",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "doctorName",
      header: "Doctor",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "admissionDate",
      header: "Admission Date",
      cell: (info) => {
        const date = new Date(info.getValue());
        return isNaN(date)
          ? info.getValue() // fallback if value is not parsable
          : date.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });
      },
    },
    {
      accessorKey: "admissionTime",
      header: "Time",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "dischargeDate",
      header: "Discharge",
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
      accessorKey: "bloodGroup",
      header: "Blood",
      cell: (info) => info.getValue(),
    },
  ],
  []
);


  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          Addmission Entries
        </h2>
        <Link className="btn-primary" to={"/new-admission-entry"}>
          <FaPlus /> Enter Patient Admission
        </Link>
      </div>

      <Table data={dummyPatients} columns={columns} />


    </div>
  );
};

export default AddmissionEntriesTable;
