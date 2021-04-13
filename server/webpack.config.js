const path = require("path");

module.exports = {
	mode: "production",
	target: "node",
	entry: {
		server: "./src/server.ts",
		"test-server": "./src/test-server.ts",
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		// filename: "server.js",
		filename: "[name].js",
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.ts?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
};
