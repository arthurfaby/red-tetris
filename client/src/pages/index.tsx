import App from "@/App.tsx";
import {StrictMode} from "react";
import {ThemeProvider} from "@/components/theme-provider.tsx";

export default function Index({ children }: { children: React.ReactNode }) {
    return (
         <App />
    )
}