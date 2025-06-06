import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createDoctorAPI,
  deleteDoctorAPI,
  getAllDoctorsAPI,
  getDoctorByIdAPI,
  updateDoctorAPI,
} from "../api/doctorApi";

export const useGetDoctors = () => {
  return useQuery({
    queryKey: ["doctor"],
    queryFn: async () => {
      const { data } = await getAllDoctorsAPI();
      return data.data;
    },
  });
};

export const useGetDoctorById = (id) => {
  return useQuery({
    queryKey: ["doctor", id],
    queryFn: async () => {
      const { data } = await getDoctorByIdAPI(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useCreateDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDoctorAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor"] });
    },
  });
};

export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateDoctorAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor"] });
    },
  });
};

export const useDeleteDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDoctorAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor"] });
    },
  });
};
