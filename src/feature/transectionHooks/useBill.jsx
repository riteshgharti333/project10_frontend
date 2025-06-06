import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBillAPI,
  getAllBillsAPI,
  getBillByIdAPI,
  updateBillAPI,
  deleteBillAPI,
} from "../transectionApi/billApi";

export const useGetBills = () => {
  return useQuery({
    queryKey: ["bills"],
    queryFn: async () => {
      const { data } = await getAllBillsAPI();
      return data.data;
    },
  });
};

export const useGetBillById = (id) => {
  return useQuery({
    queryKey: ["bill", id],
    queryFn: async () => {
      const { data } = await getBillByIdAPI(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useCreateBill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBillAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
  });
};

export const useUpdateBill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateBillAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
  });
};

export const useDeleteBill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBillAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bills"] });
    },
  });
};
