import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPatientRecordAPI,
  deletePatientRecordAPI,
  getAllPatientRecordsAPI,
  updatePatientRecordAPI,
  getPatientRecordByIdAPI,
} from "../api/patientApi";

export const useGetPatients = () => {
  return useQuery({
    queryKey: ["patient"],
    queryFn: async () => {
      const { data } = await getAllPatientRecordsAPI();
      return data.data;
    },
  });
};

export const useGetPatientById = (id) => {
  return useQuery({
    queryKey: ["patient", id],
    queryFn: async () => {
      const { data } = await getPatientRecordByIdAPI(id);
      return data.data;
    },
    enabled: !!id, 
  });
};

export const useCreatePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPatientRecordAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient"] });
    },
  });
};

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updatePatientRecordAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient"] });
    },
  });
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePatientRecordAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient"] });
    },
  });
};
