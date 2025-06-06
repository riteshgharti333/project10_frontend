import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAmbulanceAPI,
  deleteAmbulanceAPI,
  getAllAmbulancesAPI,
  getAmbulanceByIdAPI,
  updateAmbulanceAPI,
} from "../api/ambulanceApi";

export const useGetAmbulances = () => {
  return useQuery({
    queryKey: ["ambulance"],
    queryFn: async () => {
      const { data } = await getAllAmbulancesAPI();
      return data.data;
    },
  });
};

export const useGetAmbulanceById = (id) => {
  return useQuery({
    queryKey: ["ambulance", id],
    queryFn: async () => {
      const { data } = await getAmbulanceByIdAPI(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useCreateAmbulance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAmbulanceAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ambulance"] });
    },
  });
};

export const useUpdateAmbulance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateAmbulanceAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ambulance"] });
    },
  });
};

export const useDeleteAmbulance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAmbulanceAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ambulance"] });
    },
  });
};
