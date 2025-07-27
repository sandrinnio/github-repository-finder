import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/components$": "<rootDir>/src/components",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/interfaces$": "<rootDir>/src/interfaces",
    "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
  },
};

export default createJestConfig(customJestConfig);
