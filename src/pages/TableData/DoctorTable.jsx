import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import Table from "../../components/Table/Table";
import { doctorData } from "../../assets/tableData";

const DoctorTable = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Doctor Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "mobile",
        header: "Mobile No.",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "regNo",
        header: "Registration No.",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "qualification",
        header: "Qualification",
        cell: (info) => info.getValue(),
      },
    //   {
    //     accessorKey: "designation",
    //     header: "Designation",
    //     cell: (info) => info.getValue(),
    //   },
    //   {
    //     accessorKey: "department",
    //     header: "Department",
    //     cell: (info) => info.getValue(),
    //   },
      {
        accessorKey: "specialization",
        header: "Specialization",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const value = info.getValue();
          let badgeClass = "";
          switch (value) {
            case "Active":
              badgeClass = "bg-green-100 text-green-700";
              break;
            case "Inactive":
              badgeClass = "bg-red-100 text-red-700";
              break;
            case "On Leave":
              badgeClass = "bg-orange-100 text-orange-700";
              break;
          }
          return (
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${badgeClass}`}
            >
              {value}
            </span>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          Docters
        </h2>
        <Link className="btn-primary" to={"/new-doctor"}>
          <FaPlus /> New Doctor
        </Link>
      </div>

      <Table data={doctorData} columns={columns} />
    </div>
  );
};

export default DoctorTable;
