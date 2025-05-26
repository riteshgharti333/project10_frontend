import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import Table from "../../components/Table/Table";
import { brandData, nurseData } from "../../assets/tableData";

const CreationTable = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Department Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "description",
        header: "Description",
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
            case "Under Maintenance":
              badgeClass = "bg-yellow-100 text-yellow-700";
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
          Companies
        </h2>
        <Link className="btn-primary" to={"/new-company-creation"}>
          <FaPlus /> Add Brand
        </Link>
      </div>

      <Table data={brandData} columns={columns} />
    </div>
  );
};

export default CreationTable;
