import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBedAssignmentAPI,
  deleteBedAssignmentAPI,
  getAllBedAssignmentsAPI,
  getBedAssignmentByIdAPI,
  updateBedAssignmentAPI,
  dischargePatientAPI,
} from "../api/bedAssignApi";

export const useGetBedAssignments = () => {
  return useQuery({
    queryKey: ["bed-assign"],
    queryFn: async () => {
      const { data } = await getAllBedAssignmentsAPI();
      return data.data;
    },
  });
};

export const useGetBedAssignmentById = (id) => {
  return useQuery({
    queryKey: ["bed-assign", id],
    queryFn: async () => {
      const { data } = await getBedAssignmentByIdAPI(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useCreateBedAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBedAssignmentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bed-assign"] });
    },
  });
};

export const useUpdateBedAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateBedAssignmentAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bed-assign"] });
    },
  });
};

export const useDeleteBedAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBedAssignmentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bed-assign"] });
    },
  });
};

export const useDischargePatient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dischargePatientAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bed-assign"] });
    },
  });
};
