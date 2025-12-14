import type { Config } from "jest";
import baseConfig from "../jest.base.config.js";

const config: Config = {
  ...baseConfig,
  roots: ["<rootDir>/src"],
};

export default config;
