import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProductEntryAPI,
  getAllProductEntriesAPI,
  getProductEntryByIdAPI,
  updateProductEntryAPI,
  deleteProductEntryAPI,
} from "../itemApi/subProductApi";

export const useGetProductEntries = () => {
  return useQuery({
    queryKey: ["productEntries"],
    queryFn: async () => {
      const { data } = await getAllProductEntriesAPI();
      console.log(data)
      return data.data;
    },
  });
};

export const useGetProductEntryById = (id) => {
  return useQuery({
    queryKey: ["productEntry", id],
    queryFn: async () => {
      const { data } = await getProductEntryByIdAPI(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useCreateProductEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProductEntryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productEntries"] });
    },
  });
};

export const useUpdateProductEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateProductEntryAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productEntries"] });
    },
  });
};

export const useDeleteProductEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProductEntryAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productEntries"] });
    },
  });
};