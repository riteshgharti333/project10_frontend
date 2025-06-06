import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createXrayReportAPI,
  getAllXrayReportsAPI,
  getXrayReportByIdAPI,
  getXrayFinancialSummaryAPI,
  getXrayDoctorWiseSummaryAPI,
  updateXrayReportAPI,
  deleteXrayReportAPI,
} from "../api/xrayApi";

export const useGetXrayReports = () => {
  return useQuery({
    queryKey: ["xrayReports"],
    queryFn: async () => {
      const { data } = await getAllXrayReportsAPI();
      return data.data;
    },
  });
};

export const useGetXrayReportById = (id) => {
  return useQuery({
    queryKey: ["xrayReport", id],
    queryFn: async () => {
      const { data } = await getXrayReportByIdAPI(id);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useGetXrayFinancialSummary = () => {
  return useQuery({
    queryKey: ["xrayFinancialSummary"],
    queryFn: async () => {
      const { data } = await getXrayFinancialSummaryAPI();
      return data.data;
    },
  });
};

export const useGetXrayDoctorWiseSummary = () => {
  return useQuery({
    queryKey: ["xrayDoctorWiseSummary"],
    queryFn: async () => {
      const { data } = await getXrayDoctorWiseSummaryAPI();
      return data.data;
    },
  });
};

export const useCreateXrayReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createXrayReportAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["xrayReports"] });
    },
  });
};

export const useUpdateXrayReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateXrayReportAPI(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["xrayReports"] });
    },
  });
};

export const useDeleteXrayReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteXrayReportAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["xrayReports"] });
    },
  });
};
