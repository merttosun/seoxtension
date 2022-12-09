const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
//const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");

module.exports = {
  entry: {
    popup: path.join(srcDir, "popup/index.tsx"),
    eventPage: path.join(srcDir, "eventPage.ts"),
    content: path.join(srcDir, "content.ts"),
  },
  output: {
    path: path.join(__dirname, "../dist/js"),
    filename: "[name].js",
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
      {
        exclude: /node_modules/,
        test: /\.(scss|css)$/,
        use: [
          {
            loader: "style-loader", // Creates style nodes from JS strings
          },
          {
            loader: "css-loader", // Translates CSS into CommonJS
          },
          {
            loader: "sass-loader", // Compiles Sass to CSS
          },
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      }
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
