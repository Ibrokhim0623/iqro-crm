import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ConfigProvider } from "antd";
import ErrorBoundary from "@components/error-boundary/error-boundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 daqiqa
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <ConfigProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-center" richColors />
          <App />
        </QueryClientProvider>
      </ConfigProvider>
    </ErrorBoundary>
  </StrictMode>
);
