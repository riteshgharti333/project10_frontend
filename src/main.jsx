
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./utils/queryClient.js";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";


import "./index.css";

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <App />
    </StrictMode>
  </QueryClientProvider>
);
