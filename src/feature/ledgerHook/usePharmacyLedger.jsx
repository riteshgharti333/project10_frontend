import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPharmacyLedgerEntryAPI,
  getAllPharmacyLedgerEntriesAPI,
  getPharmacyLedgerEntryByIdAPI,
  getPharmacyFinancialSummaryAPI,
  getPharmacyCategorySummaryAPI,
  updatePharmacyLedgerEntryAPI,
  deletePharmacyLedgerEntryAPI,
} from "../ledgerApi/pharmacyLedgerApi";

export const useGetPharmacyLedgerEntries = () => {
  return useQuery({
    queryKey: ["pharmacyLedgerEntries"],
    queryFn: async () => {
      const { data } = await getAllPharmacyLedgerEntriesAPI();
      return data.data;
    },
  });
};

export const useGetPharmacyLedgerEntryById = (id) => {
  return useQuery({
    queryKey: ["pharmacyLedgerEntry", id],
    queryFn: async () => {
      const { data } = await getPharmacyLedgerEntryByIdAPI(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useGetPharmacyFinancialSummary = () => {
  return useQuery({
    queryKey: ["pharmacyFinancialSummary"],
    queryFn: async () => {
      const { data } = await getPharmacyFinancialSummaryAPI();
      return data.data;
    },
  });
};

export const useGetPharmacyCategorySummary = () => {
  return useQuery({
    queryKey: ["pharmacyCategorySummary"],
    queryFn: async () => {
      const { data } = await getPharmacyCategorySummaryAPI();
      return data.data;
    },
  });
};

export const useCreatePharmacyLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPharmacyLedgerEntryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pharmacyLedgerEntries"] });
    },
  });
};

export const useUpdatePharmacyLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updatePharmacyLedgerEntryAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pharmacyLedgerEntries"] });
    },
  });
};

export const useDeletePharmacyLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePharmacyLedgerEntryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pharmacyLedgerEntries"] });
    },
  });
};
