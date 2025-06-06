import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createMoneyReceiptAPI,
  getAllMoneyReceiptsAPI,
  getMoneyReceiptByIdAPI,
  updateMoneyReceiptAPI,
  deleteMoneyReceiptAPI,
} from "../transectionApi/moneyReceiptApi";

export const useGetMoneyReceipts = () => {
  return useQuery({
    queryKey: ["moneyReceipts"],
    queryFn: async () => {
      const { data } = await getAllMoneyReceiptsAPI();
      return data.data;
    },
  });
};

export const useGetMoneyReceiptById = (id) => {
  return useQuery({
    queryKey: ["moneyReceipt", id],
    queryFn: async () => {
      const { data } = await getMoneyReceiptByIdAPI(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useCreateMoneyReceipt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMoneyReceiptAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["moneyReceipts"] });
    },
  });
};

export const useUpdateMoneyReceipt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateMoneyReceiptAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["moneyReceipts"] });
    },
  });
};

export const useDeleteMoneyReceipt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMoneyReceiptAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["moneyReceipts"] });
    },
  });
};
