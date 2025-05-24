const path = require("path");

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    "@pages": path.resolve(__dirname, "src/pages"),
    "@shared": path.resolve(__dirname, "src/shared"),
    "@features": path.resolve(__dirname, "src/features"),
    "@processes": path.resolve(__dirname, "src/processes"),
    "@app": path.resolve(__dirname, "src/app"),
  };
  return config;
};
