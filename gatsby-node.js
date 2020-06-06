const path = require("path");
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "~src":        path.resolve(__dirname, "src"),
        "~components": path.resolve(__dirname, "src/components"),
        "~helpers":    path.resolve(__dirname, "src/helpers"),
        "~pages":      path.resolve(__dirname, "src/pages"),
        "~styles":     path.resolve(__dirname, "src/styles"),
        "~data":       path.resolve(__dirname, "src/data"),
      }
    }
  });
};