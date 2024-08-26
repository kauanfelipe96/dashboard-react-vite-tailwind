const { CleanWebpackPlugin } = require("clean-webpack-plugin");
var WebpackObfuscator = require("webpack-obfuscator");
const path = require("path");
const glob = require("glob");
const clientBuild = path.resolve(__dirname, "../build/client");

const client = {
    entry: glob.sync("./client/**.ts").reduce(function (obj, el) {
        obj[path.parse(el).name] = el;
        return obj;
    }, {}),
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "esbuild-loader",
                options: {
                    loader: "tsx",
                    target: "es2015",
                },
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new WebpackObfuscator({
            compact: true,
            debugProtection: false,
            debugProtectionInterval: 4000,
            disableConsoleOutput: false,
            identifierNamesGenerator: "hexadecimal",
            log: false,
            numbersToExpressions: true,
            renameGlobals: false,
            selfDefending: true,
            simplify: true,
            splitStrings: true,
            splitStringsChunkLength: 5,
            stringArray: true,
            stringArrayCallsTransform: true,
            stringArrayEncoding: ["rc4"],
            stringArrayIndexShift: true,
            stringArrayRotate: true,
            stringArrayShuffle: true,
            stringArrayWrappersCount: 5,
            stringArrayWrappersChainedCalls: true,
            stringArrayWrappersParametersMaxCount: 5,
            stringArrayWrappersType: "function",
            stringArrayThreshold: 1,
            transformObjectKeys: true,
            unicodeEscapeSequence: false,
        }),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "[name].js",
        path: path.resolve(clientBuild),
    },
};

module.exports = [client];
