import { defineConfig } from "vitest/config";

const config = defineConfig({
  test: {
    globals: true,
    environment: "node",
    restoreMocks: true,
    passWithNoTests: true,
  },
});

export default config;
