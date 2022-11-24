const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
//const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");

module.exports = {
  entry: {
    popup: path.join(srcDir, "popup.tsx"),
    index: path.join(srcDir, "index.tsx"),
    options: path.join(srcDir, "options.ts"),
    background: path.join(srcDir, "background.ts"),
    content: path.join(srcDir, "content.ts"),
    functions: path.join(srcDir, "functions.ts"),
    App: path.join(srcDir, "App.tsx"),
  },
  output: {
    path: path.join(__dirname, "../dist/js"),
    filename: "[name].js",
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks(chunk) {
        return chunk.name !== "background";
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: ".", to: "../", context: "public" }],
      options: {},
    }),
  ],
};
