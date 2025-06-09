import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBirthRecordAPI,
  deleteBirthRecordAPI,
  getAllBirthRecordsAPI,
  updateBirthRecordAPI,
} from "../api/birthApi";

import { toast } from "sonner";
import { getErrorMessage } from "../../utils/errorUtils";

export const useGetBirthRecords = () =>
  useQuery({
    queryKey: ["birth"],
    queryFn: async () => {
      const { data } = await getAllBirthRecordsAPI();
      return data.data;
    },
    retry: 1,
    onError: (error) => toast.error(getErrorMessage(error)),
  });

export const useCreateBirthRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBirthRecordAPI,
    onSuccess: ({ message }) => {
      toast.success(message || "Birth record created successfully");
      queryClient.invalidateQueries({ queryKey: ["birth"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useUpdateBirthRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateBirthRecordAPI(id, data),
    onSuccess: ({ message }) => {
      toast.success(message || "Birth record updated successfully");
      queryClient.invalidateQueries({ queryKey: ["birth"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useDeleteBirthRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBirthRecordAPI,
    onSuccess: ({ message }) => {
      toast.success(message || "Birth record deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["birth"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
