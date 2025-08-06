const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.spec.ts"],
  transform: {
    ...tsJestTransformCfg,
  },
  setupFiles: ["<rootDir>/src/tests/jest.setup.js"],
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@infra/(.*)$': '<rootDir>/src/infra/$1',
    '^@controllers/(.*)$': '<rootDir>/src/app/controllers/$1',
    '^@routes/(.*)$': '<rootDir>/src/app/routes/$1',
    '^@server/(.*)$': '<rootDir>/src/infra/server/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@tests/(.*)$': '<rootDir>/src/tests/$1'

  }
};