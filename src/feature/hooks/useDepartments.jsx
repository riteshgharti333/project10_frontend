import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllDepartmentsAPI,
  getDepartmentByIdAPI,
  createDepartmentAPI,
  updateDepartmentAPI,
  deleteDepartmentAPI,
} from "../api/departmentApi";

import { toast } from "sonner";
import { getErrorMessage } from "../../utils/errorUtils";

export const useGetDepartments = () =>
  useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const { data } = await getAllDepartmentsAPI();
      return data.data;
    },
    retry: 1,
    onError: (error) => toast.error(getErrorMessage(error)),
  });

export const useGetDepartment = (id) =>
  useQuery({
    queryKey: ["departments", id],
    queryFn: async () => {
      if (!id) throw new Error("Department ID is required");
      const { data } = await getDepartmentByIdAPI(id);
      return data.data;
    },
    enabled: Boolean(id),
    retry: 1,
    onError: (error) => toast.error(getErrorMessage(error)),
  });

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDepartmentAPI,
    onSuccess: ({ message }) => {
      toast.success(message || "Department created successfully");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateDepartmentAPI(id, data),
    onSuccess: ({ message }) => {
      toast.success(message || "Department updated successfully");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDepartmentAPI,
    onSuccess: ({ message }) => {
      toast.success(message || "Department deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
