import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPharmacistAPI,
  deletePharmacistAPI,
  getAllPharmacistsAPI,
  getPharmacistByIdAPI,
  updatePharmacistAPI,
} from "../api/pharmacistApi";

export const useGetPharmacists = () => {
  return useQuery({
    queryKey: ["pharmacist"],
    queryFn: async () => {
      const { data } = await getAllPharmacistsAPI();
      return data.data;
    },
  });
};

export const useGetPharmacistById = (id) => {
  return useQuery({
    queryKey: ["pharmacist", id],
    queryFn: async () => {
      const { data } = await getPharmacistByIdAPI(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useCreatePharmacist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPharmacistAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pharmacist"] });
    },
  });
};

export const useUpdatePharmacist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updatePharmacistAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pharmacist"] });
    },
  });
};

export const useDeletePharmacist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePharmacistAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pharmacist"] });
    },
  });
};
