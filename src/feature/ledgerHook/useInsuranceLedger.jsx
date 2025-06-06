import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createInsuranceLedgerEntryAPI,
  getAllInsuranceLedgerEntriesAPI,
  getInsuranceLedgerEntryByIdAPI,
  getInsuranceSummaryAPI,
  updateInsuranceLedgerEntryAPI,
  deleteInsuranceLedgerEntryAPI,
} from "../ledgerApi/insuranceLedgerApi";

export const useGetInsuranceLedgerEntries = () => {
  return useQuery({
    queryKey: ["insuranceLedgerEntries"],
    queryFn: async () => {
      const { data } = await getAllInsuranceLedgerEntriesAPI();
      return data.data;
    },
  });
};

export const useGetInsuranceLedgerEntryById = (id) => {
  return useQuery({
    queryKey: ["insuranceLedgerEntry", id],
    queryFn: async () => {
      const { data } = await getInsuranceLedgerEntryByIdAPI(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useGetInsuranceSummary = () => {
  return useQuery({
    queryKey: ["insuranceSummary"],
    queryFn: async () => {
      const { data } = await getInsuranceSummaryAPI();
      return data.data;
    },
  });
};

export const useCreateInsuranceLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createInsuranceLedgerEntryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insuranceLedgerEntries"] });
    },
  });
};

export const useUpdateInsuranceLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateInsuranceLedgerEntryAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insuranceLedgerEntries"] });
    },
  });
};

export const useDeleteInsuranceLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteInsuranceLedgerEntryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insuranceLedgerEntries"] });
    },
  });
};
