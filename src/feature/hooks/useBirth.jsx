import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBirthRecordAPI,
  deleteBirthRecordAPI,
  getAllBirthRecordsAPI,
  updateBirthRecordAPI,
} from "../api/birthApi";

export const useGetBirthRecords = () => {
  return useQuery({
    queryKey: ["birth"],
    queryFn: async () => {
      const { data } = await getAllBirthRecordsAPI();
      return data.data;
    },
  });
};

export const useCreateBirthRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBirthRecordAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["birth"] });
    },
  });
};

export const useUpdateBirthRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateBirthRecordAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["birth"] });
    },
  });
};

export const useDeleteBirthRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBirthRecordAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["birth"] });
    },
  });
};
