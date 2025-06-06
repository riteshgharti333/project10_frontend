import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBedRecordAPI,
  deleteBedRecordAPI,
  getAllBedRecordsAPI,
  getBedRecordByIdAPI,
  updateBedRecordAPI,
} from "../api/bedApi";

export const useGetBeds = () => {
  return useQuery({
    queryKey: ["bed"],
    queryFn: async () => {
      const { data } = await getAllBedRecordsAPI();
      return data.data;
    },
  });
};

export const useGetBedById = (id) => {
  return useQuery({
    queryKey: ["bed", id],
    queryFn: async () => {
      const { data } = await getBedRecordByIdAPI(id);
      return data.data;
    },
    enabled: !!id, // prevents query from running without id
  });
};

export const useCreateBed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBedRecordAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bed"] });
    },
  });
};

export const useUpdateBed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateBedRecordAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bed"] });
    },
  });
};

export const useDeleteBed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBedRecordAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bed"] });
    },
  });
};
