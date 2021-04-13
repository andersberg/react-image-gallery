import fastify from "fastify";
import helmet from "fastify-helmet";
import cors from "fastify-cors";
import { readFileSync } from "fs-extra";
import { resolve } from "path";

const CWD = process.cwd();
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || 443;
const PATH_CERT =
	"/Users/andersberg/Repos/image-gallery-app/https/development.local.cert";
const PATH_KEY =
	"/Users/andersberg/Repos/image-gallery-app/https/development.local.key";

const server = fastify({
	logger: {
		level: "info",
		prettyPrint: true,
	},
	http2: true,
	https: {
		cert: readFileSync(resolve(__dirname, PATH_CERT)),
		key: readFileSync(resolve(__dirname, PATH_KEY)),
	},
});

// Middlewares
server.register(helmet);
server.register(cors, {
	origin: [],
	methods: ["GET"],
});

server.get("/", (_, response) => {
	response.code(200).send("Hello from test server 1!");
});

server.get("/ping", (_, response) => {
	response.code(200).send("Pong!");
});

// Initialization
server.listen(PORT, HOST, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	console.log(`Test Server listening on: ${address}`);
});
