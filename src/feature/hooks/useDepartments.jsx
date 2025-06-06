import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllDepartmentsAPI,
  getDepartmentByIdAPI,
  createDepartmentAPI,
  updateDepartmentAPI,
  deleteDepartmentAPI,
} from "../api/departmentApi";

export const useGetDepartments = () => {
  return useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const {data} = await getAllDepartmentsAPI();
      return data.data;
    },
  });
};

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDepartmentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateDepartmentAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDepartmentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};
