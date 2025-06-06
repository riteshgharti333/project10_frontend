import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCashLedgerEntryAPI,
  getAllCashLedgerEntriesAPI,
  getCashLedgerEntryByIdAPI,
  getCashBalanceAPI,
  updateCashLedgerEntryAPI,
  deleteCashLedgerEntryAPI,
} from "../ledgerApi/cashLedgerApi";

export const useGetCashLedgerEntries = () => {
  return useQuery({
    queryKey: ["cashLedgerEntries"],
    queryFn: async () => {
      const { data } = await getAllCashLedgerEntriesAPI();
      return data.data;
    },
  });
};

export const useGetCashLedgerEntryById = (id) => {
  return useQuery({
    queryKey: ["cashLedgerEntry", id],
    queryFn: async () => {
      const { data } = await getCashLedgerEntryByIdAPI(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useGetCashBalance = () => {
  return useQuery({
    queryKey: ["cashBalance"],
    queryFn: async () => {
      const { data } = await getCashBalanceAPI();
      return data.data;
    },
  });
};

export const useCreateCashLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCashLedgerEntryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cashLedgerEntries"] });
    },
  });
};

export const useUpdateCashLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateCashLedgerEntryAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cashLedgerEntries"] });
    },
  });
};

export const useDeleteCashLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCashLedgerEntryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cashLedgerEntries"] });
    },
  });
};
