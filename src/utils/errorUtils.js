export const getErrorMessage = (error) => {
  if (typeof error === "string") return error;
  return (
    error?.response?.data?.message ||
    error?.message ||
    "An unknown error occurred"
  );
};
