module.exports = {
    mode: "none",
    target: "web",
    entry: "./src/index.js",
    output: {
        path: __dirname + '/',
        filename: "index.js",
        globalObject: "this",
    },
    watch: true,
}