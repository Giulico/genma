"use strict";
const path = require("path");

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const rootPath = path.resolve(__dirname, "..");

module.exports = {
  entry: {
    app: path.join(rootPath, "src/js/app.js"),
  },
  output: {
    path: path.join(rootPath, "dist/js"),
    filename: "[name].js",
  },
  stats: "normal",
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
    ],
  },
};
