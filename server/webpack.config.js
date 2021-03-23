const path = require("path");

module.exports = {
	mode: "production",
	target: "node",
	entry: "./src/server.ts",
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "server.js",
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
