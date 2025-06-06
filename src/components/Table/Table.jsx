import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiArrowUp,
  FiArrowDown,
  FiSearch,
} from "react-icons/fi";
import { useMemo } from "react";

const Table = ({ data, columns, filters = {}, getRowProps, path }) => {
  const navigate = useNavigate();

  // Filter data using useMemo
  const filteredData = useMemo(() => {
    const { doctor, fromDate, toDate } = filters;
    return data.filter((row) => {
      const testDate = new Date(row.testDate);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      const matchDoctor =
        !doctor || doctor === "All" || row.referredDoctor === doctor;
      const matchFrom = from ? testDate >= from : true;
      const matchTo = to ? testDate <= to : true;

      return matchDoctor && matchFrom && matchTo;
    });
  }, [data, filters]);

  // Initialize react-table
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 7 } },
  });

  const handleRowClick = (id) => {
    if (
      path &&
      [
        "admission",
        "birth",
        "patient",
        "department",
        "bed",
        "bed-assign",
        "appointment",
        "nurse",
        "docter",
        "pharmacist",
        "prescription",
        "ambulance",
        "xray",
        "brand",
        "product",
        "sub-product",
        "bill",
        "money-receipt",
        "vouchar",
        "employee"
      ].includes(path)
    ) {
      navigate(`/${path}/${id}`);
    } else if (
      path &&
      [
        "bank-ledger",
        "patient-ledger",
        "cash-ledger",
        "doctor-ledger",
        "supplier-ledger",
        "pharmacy-ledger",
        "insurance-ledger",
        "diagnostics-ledger",
        "general-ledger",
      ].includes(path)
    ) {
      navigate(`/ledger/${path}/${id}`);
    }
  };

  return (
    <div className="mt-5 max-w-[1050px] m-auto flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Table Header with Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-200">
        <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search records..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex space-x-2">
          <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Discharged</option>
          </select>
          <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
            <option>All Wards</option>
            <option>General</option>
            <option>ICU</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    style={{
                      cursor: header.column.getCanSort()
                        ? "pointer"
                        : "default",
                    }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <FiArrowUp className="ml-1" size={14} />,
                        desc: <FiArrowDown className="ml-1" size={14} />,
                      }[header.column.getIsSorted()] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => handleRowClick(row.original._id)}
                {...(getRowProps ? getRowProps(row) : {})}
                className={`hover:bg-blue-50 cursor-pointer transition-colors duration-150 ${
                  getRowProps ? getRowProps(row)?.className || "" : ""
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 text-sm py-4 whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200 bg-gray-50">
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                filteredData.length
              )}
            </span>{" "}
            of <span className="font-medium">{filteredData.length}</span>{" "}
            results
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiChevronsLeft size={16} />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiChevronLeft size={16} />
          </button>
          <span className="text-sm text-gray-700 px-2">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiChevronRight size={16} />
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiChevronsRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
