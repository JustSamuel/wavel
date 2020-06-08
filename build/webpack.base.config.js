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
    resolve: {
      alias: {
        // Creates env variable representing current mode.
        env: path.resolve(__dirname, `../config/env_${env}.json`)
      }
    },
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
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        }
      ],
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin({ clearConsole: env === "development" })
    ]
  };
};
