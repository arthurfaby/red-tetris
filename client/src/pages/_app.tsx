import { ThemeProvider } from "@/components/theme-provider.tsx";
import { StrictMode } from "react";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner.tsx";

export default function App() {
  return (
    <StrictMode>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Outlet />
        <Toaster />
      </ThemeProvider>
    </StrictMode>
  );
}
