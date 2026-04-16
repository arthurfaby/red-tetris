import type {ReactNode} from "react";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {StrictMode} from "react";
import {Outlet} from "react-router";

export default function App({ children }: { children: ReactNode }) {
    return (
        <StrictMode>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Outlet />
            </ThemeProvider>
        </StrictMode>
    )
}