import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createExpenseEntryAPI,
  getAllExpenseEntriesAPI,
  getExpenseEntryByIdAPI,
  getExpenseSummaryAPI,
  updateExpenseEntryAPI,
  deleteExpenseEntryAPI,
} from "../ledgerApi/expenseLedgerApi";

export const useGetExpenseEntries = () => {
  return useQuery({
    queryKey: ["expenseLedgerEntries"],
    queryFn: async () => {
      const { data } = await getAllExpenseEntriesAPI();
      return data.data;
    },
  });
};

export const useGetExpenseEntryById = (id) => {
  return useQuery({
    queryKey: ["expenseLedgerEntry", id],
    queryFn: async () => {
      const { data } = await getExpenseEntryByIdAPI(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useGetExpenseSummary = () => {
  return useQuery({
    queryKey: ["expenseSummary"],
    queryFn: async () => {
      const { data } = await getExpenseSummaryAPI();
      return data.data;
    },
  });
};

export const useCreateExpenseEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExpenseEntryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenseLedgerEntries"] });
    },
  });
};

export const useUpdateExpenseEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateExpenseEntryAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenseLedgerEntries"] });
    },
  });
};

export const useDeleteExpenseEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExpenseEntryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenseLedgerEntries"] });
    },
  });
};
