import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import Table from "../../components/Table/Table";
import { appointmentData } from "../../assets/tableData";

const AppointmentTable = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "appointmentDate",
        header: "Appointment Date",
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
        accessorKey: "appointmentTime",
        header: "Appointment Time",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "doctorName",
        header: "Doctor",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "department",
        header: "Department",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          Appointments
        </h2>
        <Link className="btn-primary" to={"/new-appointment"}>
          <FaPlus /> New Appointment
        </Link>
      </div>

      <Table data={appointmentData} columns={columns} />
    </div>
  );
};

export default AppointmentTable;
