import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const onError = (error) => {
  console.log("🔥 Global query error", error);
  if (error?.response?.data?.message) {
    toast.error(error.response.data.message);
  } else if (error?.request) {
    console.log("Network error: Please check your internet connection.");
  } else {
     console.log(error?.message || "Something went wrong.");
  }
};


const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: 1, onError },
    mutations: { retry: 0, onError },
  },
});

export default queryClient;