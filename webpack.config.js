module.exports = {
    mode: "none",
    target: "web",
    entry: "./src/index.js",
    output: {
        path: __dirname + '/dist',
        filename: "index.js",
        globalObject: "this",
    },
    watch: true,
}