const path = require("path");
const nodeExternals = require("webpack-node-externals");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

/**
 * Used to map the env flag to the mode.
 * @param env String passed by CLI.
 * @returns {string} the current compiling Mode
 */
const translateEnvToMode = (env) => {
  if (env === "production") {
    return "production";
  }
  return "development";
};

/**
 * Constructs the app config {@link https://webpack.js.org/configuration/}
 */
module.exports = env => {
  return {
    target: "electron-renderer",
    mode: translateEnvToMode(env),
    node: {
      __dirname: false,
      __filename: false
    },
    externals: [nodeExternals()],
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin({ clearConsole: env === "development" })
    ]
  };
};
