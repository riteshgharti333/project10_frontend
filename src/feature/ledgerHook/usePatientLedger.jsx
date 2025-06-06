import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPatientLedgerEntryAPI,
  getAllPatientLedgerEntriesAPI,
  getPatientLedgerEntryByIdAPI,
  getPatientBalanceAPI,
  updatePatientLedgerEntryAPI,
  deletePatientLedgerEntryAPI,
} from "../ledgerApi/patientLedgerApi";

export const useGetPatientLedgerEntries = () => {
  return useQuery({
    queryKey: ["patientLedgerEntries"],
    queryFn: async () => {
      const { data } = await getAllPatientLedgerEntriesAPI();
      return data.data;
    },
  });
};

export const useGetPatientLedgerEntryById = (id) => {
  return useQuery({
    queryKey: ["patientLedgerEntry", id],
    queryFn: async () => {
      const { data } = await getPatientLedgerEntryByIdAPI(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useGetPatientBalance = () => {
  return useQuery({
    queryKey: ["patientBalance"],
    queryFn: async () => {
      const { data } = await getPatientBalanceAPI();
      return data.data;
    },
  });
};

export const useCreatePatientLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPatientLedgerEntryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patientLedgerEntries"] });
    },
  });
};

export const useUpdatePatientLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updatePatientLedgerEntryAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patientLedgerEntries"] });
    },
  });
};

export const useDeletePatientLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePatientLedgerEntryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patientLedgerEntries"] });
    },
  });
};
