import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPrescriptionAPI,
  deletePrescriptionAPI,
  getAllPrescriptionsAPI,
  getPrescriptionByIdAPI,
  updatePrescriptionAPI,
} from "../api/prescriptionApi";

export const useGetPrescriptions = () => {
  return useQuery({
    queryKey: ["prescription"],
    queryFn: async () => {
      const { data } = await getAllPrescriptionsAPI();
      return data.data;
    },
  });
};

export const useGetPrescriptionById = (id) => {
  return useQuery({
    queryKey: ["prescription", id],
    queryFn: async () => {
      const { data } = await getPrescriptionByIdAPI(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useCreatePrescription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPrescriptionAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prescription"] });
    },
  });
};

export const useUpdatePrescription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updatePrescriptionAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prescription"] });
    },
  });
};

export const useDeletePrescription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePrescriptionAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prescription"] });
    },
  });
};
