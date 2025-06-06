import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createDiagnosticsLedgerEntryAPI,
  getAllDiagnosticsLedgerEntriesAPI,
  getDiagnosticsLedgerEntryByIdAPI,
  getDiagnosticsTotalRecordAPI,
  updateDiagnosticsLedgerEntryAPI,
  deleteDiagnosticsLedgerEntryAPI,
} from "../ledgerApi/diagnosticsLedgerApi";

export const useGetDiagnosticsLedgerEntries = () => {
  return useQuery({
    queryKey: ["diagnosticsLedgerEntries"],
    queryFn: async () => {
      const { data } = await getAllDiagnosticsLedgerEntriesAPI();
      return data.data;
    },
  });
};

export const useGetDiagnosticsLedgerEntryById = (id) => {
  return useQuery({
    queryKey: ["diagnosticsLedgerEntry", id],
    queryFn: async () => {
      const { data } = await getDiagnosticsLedgerEntryByIdAPI(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useGetDiagnosticsTotalRecord = () => {
  return useQuery({
    queryKey: ["diagnosticsTotalRecord"],
    queryFn: async () => {
      const { data } = await getDiagnosticsTotalRecordAPI();
      return data.data;
    },
  });
};

export const useCreateDiagnosticsLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDiagnosticsLedgerEntryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diagnosticsLedgerEntries"] });
    },
  });
};

export const useUpdateDiagnosticsLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateDiagnosticsLedgerEntryAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diagnosticsLedgerEntries"] });
    },
  });
};

export const useDeleteDiagnosticsLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDiagnosticsLedgerEntryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diagnosticsLedgerEntries"] });
    },
  });
};
