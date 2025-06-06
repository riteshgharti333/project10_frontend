import axiosInstance from "../../utils/axiosInstance";

export const createBirthRecordAPI = (data) =>
  axiosInstance.post("/birth", data);

export const getAllBirthRecordsAPI = () =>
  axiosInstance.get("/birth");

export const getBirthRecordByIdAPI = (id) =>
  axiosInstance.get(`/birth/${id}`);

export const updateBirthRecordAPI = (id, data) =>
  axiosInstance.patch(`/birth/${id}`, data); // PATCH because your route uses patch

export const deleteBirthRecordAPI = (id) =>
  axiosInstance.delete(`/birth/${id}`);
