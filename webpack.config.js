const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: "none",
    target: "electron-renderer",
    entry: "./src/index.js",
    output: {
        path: __dirname + '/build/',
        filename: "bundle.js",
        globalObject: "this",
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new MiniCssExtractPlugin()
    ],
    watch: true,
}