import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { createAdmissionAPI, deleteAdmissionAPI, getAllAdmissionAPI, updateAdmissionAPI } from "../api/admissionApi";

export const useGetAmissions = () => {
  return useQuery({
    queryKey: ["admission"],
    queryFn: async () => {
      const {data} = await getAllAdmissionAPI();

      return data?.data;
    },
  });
};

export const useCreateAdmission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAdmissionAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admission"] });
    },
  });
};

export const useUpdateAdmission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateAdmissionAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admission"] });
    },
  });
};

export const useDeleteAdmission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAdmissionAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admission"] });
    },
  });
};
