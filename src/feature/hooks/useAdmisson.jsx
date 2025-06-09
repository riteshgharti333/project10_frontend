import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAdmissionAPI,
  deleteAdmissionAPI,
  getAllAdmissionAPI,
  updateAdmissionAPI,
} from "../api/admissionApi";

import { toast } from "sonner";
import { getErrorMessage } from "../../utils/errorUtils";

export const useGetAdmissions = () =>
  useQuery({
    queryKey: ["admission"],
    queryFn: async () => {
      const { data } = await getAllAdmissionAPI();
      return data?.data;
    },
    retry: 1,
    onError: (error) => toast.error(getErrorMessage(error)),
  });

export const useCreateAdmission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newAdmissionData) => {
      const response = await createAdmissionAPI(newAdmissionData);
      return response.data;
    },
    onSuccess: ({ message }) => {
      toast.success(message || "Admission created successfully");
      queryClient.invalidateQueries({ queryKey: ["admission"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};

export const useUpdateAdmission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateAdmissionAPI(id, data),
    onSuccess: ({ message }) => {
      toast.success(message || "Admission updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admission"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};

export const useDeleteAdmission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAdmissionAPI,
    onSuccess: ({ message }) => {
      toast.success(message || "Admission deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admission"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};
