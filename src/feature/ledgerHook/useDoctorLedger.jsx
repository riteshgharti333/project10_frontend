import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createDoctorLedgerEntryAPI,
  getAllDoctorLedgerEntriesAPI,
  getDoctorLedgerEntryByIdAPI,
  getDoctorBalanceAPI,
  updateDoctorLedgerEntryAPI,
  deleteDoctorLedgerEntryAPI,
} from "../ledgerApi/doctorLedgerApi";

export const useGetDoctorLedgerEntries = () => {
  return useQuery({
    queryKey: ["doctorLedgerEntries"],
    queryFn: async () => {
      const { data } = await getAllDoctorLedgerEntriesAPI();
      return data.data;
    },
  });
};

export const useGetDoctorLedgerEntryById = (id) => {
  return useQuery({
    queryKey: ["doctorLedgerEntry", id],
    queryFn: async () => {
      const { data } = await getDoctorLedgerEntryByIdAPI(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useGetDoctorBalance = () => {
  return useQuery({
    queryKey: ["doctorBalance"],
    queryFn: async () => {
      const { data } = await getDoctorBalanceAPI();
      return data.data;
    },
  });
};

export const useCreateDoctorLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDoctorLedgerEntryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctorLedgerEntries"] });
    },
  });
};

export const useUpdateDoctorLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateDoctorLedgerEntryAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctorLedgerEntries"] });
    },
  });
};

export const useDeleteDoctorLedgerEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDoctorLedgerEntryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctorLedgerEntries"] });
    },
  });
};
