import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    coverage: {
      include: ["**/*.{ts,tsx}"],
      exclude: ["**/*.spec.{ts,tsx}"],
      provider: "v8",
    },
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});
