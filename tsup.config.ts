import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["library/index.ts"],
  outDir: "clumsy-math",
  splitting: false,
  clean: true,
  minify: true,
  dts: true,
});
