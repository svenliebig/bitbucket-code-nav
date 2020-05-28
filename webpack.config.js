const path = require("path")
const WebpackUserScript = require("webpack-userscript")
const packageConfiguration = require("./package")

const devMode = process.env.NODE_ENV === "development"

const filename = `${packageConfiguration.name}.user.js`
const rawUrl = `${packageConfiguration.repository}/raw/master/${packageConfiguration.dist}/${filename}`

const webpackUserScript = new WebpackUserScript({
    headers: {
        name: packageConfiguration.name,
        namespace: packageConfiguration.homepage,
        version: devMode ? `[version]-build.[buildNo]` : `[version]`,
        description: packageConfiguration.description,
        author: packageConfiguration.author.name,
        authorversion: packageConfiguration.author.name,
        match: "https://bitbucket.schuetze.ag/projects/ISBJRD/repos/*.tsx",
        grant: ["none"],
        updateURL: rawUrl,
        downloadURL: rawUrl,
    },
    pretty: devMode,
})

module.exports = {
    plugins: [webpackUserScript],
    entry: path.resolve(__dirname, packageConfiguration.main),
    optimization: {
        minimize: !devMode,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, packageConfiguration.dist),
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx", ".css"],
    },
    output: {
        path: path.resolve(__dirname, packageConfiguration.dist),
        filename,
    },
}
