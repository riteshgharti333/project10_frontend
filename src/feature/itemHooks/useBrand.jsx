import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBrandAPI,
  getAllBrandsAPI,
  getBrandByIdAPI,
  updateBrandAPI,
  deleteBrandAPI,
} from "../itemApi/brandApi";

export const useGetBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const { data } = await getAllBrandsAPI();
      return data.data;
    },
  });
};

export const useGetBrandById = (id) => {
  return useQuery({
    queryKey: ["brand", id],
    queryFn: async () => {
      const { data } = await getBrandByIdAPI(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBrandAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateBrandAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBrandAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};
