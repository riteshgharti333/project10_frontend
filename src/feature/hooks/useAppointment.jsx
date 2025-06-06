import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAppointmentAPI,
  deleteAppointmentAPI,
  getAllAppointmentsAPI,
  getAppointmentByIdAPI,
  updateAppointmentAPI,
} from "../api/appointmentApi";

export const useGetAppointments = () => {
  return useQuery({
    queryKey: ["appointment"],
    queryFn: async () => {
      const { data } = await getAllAppointmentsAPI();
      return data.data;
    },
  });
};

export const useGetAppointmentById = (id) => {
  return useQuery({
    queryKey: ["appointment", id],
    queryFn: async () => {
      const { data } = await getAppointmentByIdAPI(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAppointmentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointment"] });
    },
  });
};

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateAppointmentAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointment"] });
    },
  });
};

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAppointmentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointment"] });
    },
  });
};
