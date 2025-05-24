import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import Table from "../../components/Table/Table";
import { departmentData, vehicleData } from "../../assets/tableData";

const AmbulancesTable = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "modelName",
        header: "Model Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "cardBrand",
        header: "Card Brand",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "registerNo",
        header: "Register No.",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "driverName",
        header: "Driver Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "driverContact",
        header: "Driver Contact",
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
          Ambulances
        </h2>
        <Link className="btn-primary" to={"/new-ambulance"}>
          <FaPlus /> New Ambulance
        </Link>
      </div>

      <Table data={vehicleData} columns={columns} />
    </div>
  );
};

export default AmbulancesTable;
