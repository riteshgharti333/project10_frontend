import axiosInstance from "../../utils/axiosInstance";

export const createPatientRecordAPI = (data) =>
  axiosInstance.post("/ledger/patient-ledger", data);

export const getAllPatientRecordsAPI = () =>
  axiosInstance.get("/ledger/patient-ledger");

export const getPatientRecordByIdAPI = (id) =>
  axiosInstance.get(`/ledger/patient-ledger/${id}`);

export const updatePatientRecordAPI = (id, data) =>
  axiosInstance.patch(`/ledger/patient-ledger/${id}`, data);

export const deletePatientRecordAPI = (id) =>
  axiosInstance.delete(`/ledger/patient-ledger/${id}`);
