import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPatientRecordAPI,
  deletePatientRecordAPI,
  getAllPatientRecordsAPI,
  updatePatientRecordAPI,
  getPatientRecordByIdAPI,
} from "../api/patientApi";

import { toast } from "sonner";
import { getErrorMessage } from "../../utils/errorUtils";

export const useGetPatients = () =>
  useQuery({
    queryKey: ["patient"],
    queryFn: async () => {
      const { data } = await getAllPatientRecordsAPI();
      return data.data;
    },
    retry: 1,
    onError: (error) => toast.error(getErrorMessage(error)),
  });

export const useGetPatientById = (id) =>
  useQuery({
    queryKey: ["patient", id],
    queryFn: async () => {
      const { data } = await getPatientRecordByIdAPI(id);
      return data.data;
    },
    enabled: !!id,
    retry: 1,
    onError: (error) => toast.error(getErrorMessage(error)),
  });

export const useCreatePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPatientRecordAPI,
    onSuccess: ({ message }) => {
      toast.success(message || "Patient record created successfully");
      queryClient.invalidateQueries({ queryKey: ["patient"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updatePatientRecordAPI(id, data),
    onSuccess: ({ message }) => {
      toast.success(message || "Patient record updated successfully");
      queryClient.invalidateQueries({ queryKey: ["patient"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePatientRecordAPI,
    onSuccess: ({ message }) => {
      toast.success(message || "Patient record deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["patient"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
};
