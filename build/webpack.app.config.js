const path = require("path");
const merge = require("webpack-merge");
const base = require("./webpack.base.config");

// Merge the base config with the current app config.
module.exports = env => {
    return merge(base(env), {
        // Create the entry points.
        entry: {
            main: "./src/main.js",
        },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "../app")
        }
    });
};