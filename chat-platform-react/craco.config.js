const { resolve } = require("path");

module.exports = {
  webpack: {
    alias: {
      "@__assets__": resolve(__dirname, "src/__assets__"),
      "@-store": resolve(__dirname, "src/store"),
      "@-styles": resolve(__dirname, "src/styles"),
      "@-components": resolve(__dirname, "src/components"),
      "@-hooks": resolve(__dirname, "src/hooks"),
      "@-guards": resolve(__dirname, "src/guards"),
      "@-utils": resolve(__dirname, "src/utils"),
    },
  },
};
