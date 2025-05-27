import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import Table from "../../components/Table/Table";
import {
  bankLedgerData,
  doctorLedgerData,
  patientLedgerData,
} from "../../assets/ledgerData";

const BankLedger = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "bankName",
        header: "Bank Name",
        cell: (info) => info.getValue() || "-",
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: (info) => info.getValue() || "-",
      },
      {
        accessorKey: "amountType",
        header: "Amount Type",
        cell: (info) => {
          const value = info.getValue();
          const badgeClass =
            value === "Debit"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700";
          return (
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${badgeClass}`}
            >
              {value}
            </span>
          );
        },
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: (info) => `$${info.getValue()}`,
      },
      {
        accessorKey: "transactionId",
        header: "Transaction ID",
        cell: (info) => info.getValue() || "-",
      },
      {
        accessorKey: "remarks",
        header: "Remarks",
        cell: (info) => info.getValue() || "-",
      },
    ],
    []
  );

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          Bank Ledger
        </h2>
        <Link className="btn-primary" to={"/new-ledger"}>
          <FaPlus /> New Ledger
        </Link>
      </div>

      <Table data={bankLedgerData} columns={columns} path="bank-ledger" />
    </div>
  );
};

export default BankLedger;
