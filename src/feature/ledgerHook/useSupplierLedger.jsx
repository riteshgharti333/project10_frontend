import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createSupplierLedgerEntryAPI,
  getAllSupplierLedgerEntriesAPI,
  getSupplierLedgerEntryByIdAPI,
  getSupplierOutstandingBalanceAPI,
  getSupplierSummaryReportAPI,
  updateSupplierLedgerEntryAPI,
  deleteSupplierLedgerEntryAPI,
} from "../ledgerApi/supplierLedgerApi";

export const useGetSupplierLedgerEntries = () => {
  return useQuery({
    queryKey: ["supplierLedgerEntries"],
    queryFn: async () => {
      const { data } = await getAllSupplierLedgerEntriesAPI();
      return data.data;
    },
  });
};

export const useGetSupplierLedgerEntryById = (id) => {
  return useQuery({
    queryKey: ["supplierLedgerEntry", id],
    queryFn: async () => {
      const { data } = await getSupplierLedgerEntryByIdAPI(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useGetSupplierOutstandingBalance = () => {
  return useQuery({
    queryKey: ["supplierOutstandingBalance"],
    queryFn: async () => {
      const { data } = await getSupplierOutstandingBalanceAPI();
      return data.data;
    },
  });
};

export const useGetSupplierSummaryReport = () => {
  return useQuery({
    queryKey: ["supplierSummaryReport"],
    queryFn: async () => {
      const { data } = await getSupplierSummaryReportAPI();
      return data.data;
    },
  });
};

export const useCreateSupplierLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSupplierLedgerEntryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplierLedgerEntries"] });
    },
  });
};

export const useUpdateSupplierLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateSupplierLedgerEntryAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplierLedgerEntries"] });
    },
  });
};

export const useDeleteSupplierLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSupplierLedgerEntryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplierLedgerEntries"] });
    },
  });
};
