const path = require("path")
const webpack = require("webpack")

const config = (env, argv) => {
    console.log("argv", argv.mode)

    const backendUrl = argv.mode === "production"
        ? "noproduction...yet"
        : "http://localhost:3003"

    return {
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "main.js"
        },
        devServer: {
            contentBase: path.resolve(__dirname, "./public"),
            compress: true,
            port: 3000,
            historyApiFallback: true
        },
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    query: {
                        presets: ["env", "react"],
                        plugins: [
                            "transform-object-rest-spread",
                            "transform-class-properties"
                        ]
                    }
                },
                {
                    test: /\.css$/,
                    loaders: ["style-loader", "css-loader"]
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                BACKEND_URL: JSON.stringify(backendUrl)
            })
        ]
    }
}

module.exports = config