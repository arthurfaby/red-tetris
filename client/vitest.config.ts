import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      include: ["**/*.{ts,tsx}"],
      provider: "v8",
    },
  },
});
