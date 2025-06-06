import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBankLedgerEntryAPI,
  getAllBankLedgerEntriesAPI,
  getBankLedgerEntryByIdAPI,
  getBankBalanceAPI,
  updateBankLedgerEntryAPI,
  deleteBankLedgerEntryAPI,
} from "../ledgerApi/bankLedgerApi";

export const useGetBankLedgerEntries = () => {
  return useQuery({
    queryKey: ["bankLedgerEntries"],
    queryFn: async () => {
      const { data } = await getAllBankLedgerEntriesAPI();
      return data.data;
    },
  });
};

export const useGetBankLedgerEntryById = (id) => {
  return useQuery({
    queryKey: ["bankLedgerEntry", id],
    queryFn: async () => {
      const { data } = await getBankLedgerEntryByIdAPI(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useGetBankBalance = () => {
  return useQuery({
    queryKey: ["bankBalance"],
    queryFn: async () => {
      const { data } = await getBankBalanceAPI();
      return data.data;
    },
  });
};

export const useCreateBankLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBankLedgerEntryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bankLedgerEntries"] });
    },
  });
};

export const useUpdateBankLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateBankLedgerEntryAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bankLedgerEntries"] });
    },
  });
};

export const useDeleteBankLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBankLedgerEntryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bankLedgerEntries"] });
    },
  });
};
