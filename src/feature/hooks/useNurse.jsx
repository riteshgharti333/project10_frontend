import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createNurseAPI,
  deleteNurseAPI,
  getAllNursesAPI,
  getNurseByIdAPI,
  updateNurseAPI,
} from "../api/nurseApi";

export const useGetNurses = () => {
  return useQuery({
    queryKey: ["nurse"],
    queryFn: async () => {
      const { data } = await getAllNursesAPI();
      return data.data;
    },
  });
};

export const useGetNurseById = (id) => {
  return useQuery({
    queryKey: ["nurse", id],
    queryFn: async () => {
      const { data } = await getNurseByIdAPI(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useCreateNurse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNurseAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nurse"] });
    },
  });
};

export const useUpdateNurse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateNurseAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nurse"] });
    },
  });
};

export const useDeleteNurse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNurseAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nurse"] });
    },
  });
};
