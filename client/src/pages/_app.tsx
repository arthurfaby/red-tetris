import { ThemeProvider } from "@/components/theme-provider.tsx";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner.tsx";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Outlet />
      <Toaster position="top-center" visibleToasts={2} />
    </ThemeProvider>
  );
}
