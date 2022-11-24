const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
//const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");

module.exports = {
    entry: {
        popup: path.join(srcDir, 'popup.ts'),
        options: path.join(srcDir, 'options.ts'),
        background: path.join(srcDir, 'background.ts'),
        content: path.join(srcDir, 'content.ts'),
    },
    output: {
        path: path.join(__dirname, "../dist/js"),
        filename: "[name].js",
    },
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks(chunk) {
                return chunk.name !== 'background';
            }
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                use: "ts-loader",
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                  },
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: ".", to: "../", context: "public" }],
            options: {},
        }),
    ],

};
