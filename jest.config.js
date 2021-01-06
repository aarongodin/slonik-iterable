module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  collectCoverage: true,
  coverageDirectory: "./coverage",
  collectCoverageFrom: ["src/**/*.{ts,js}"],
  roots: ["<rootDir>/src/"],
  testEnvironment: "node",
}
