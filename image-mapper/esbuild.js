const { resolve } = require("path");
const { build } = require("esbuild");

const ENVIRONMENT = process.env.NODE_ENV || "development";
const ROOT_DIR = resolve(__dirname);
const OUT_DIR = resolve(__dirname, "dist");

const isDev = "development" === ENVIRONMENT;

const entryPoints = [
	resolve(ROOT_DIR, "src/imageMapper.ts"),
];

build({
	bundle: true,
	entryPoints,
	outdir: OUT_DIR,
	sourcemap: true,
	watch: isDev,
	minify: !isDev,
	platform: "node",
	target: "node12.20.1",
	logLevel: "info",
});
