import fastify from "fastify";
import dotenv from "dotenv";
import env from "env-var";
import { readFile } from "fs/promises";
import { resolve, join, extname } from "path";
import { RequestParams } from "./types";
import { imageMimeTypes, listDirectories, listFiles } from "./utils";

// Setup
dotenv.config({
	path: resolve(process.cwd(), "..", ".env"),
});

// Environment Variables
const ENV_IMAGES_DIR = env.get("IMAGES_DIR").required().asString();
const ENV_STATIC_DIR = env.get("STATIC_DIR").required().asString();
const ENV_PORT = env.get("SERVER_PORT").required().asPortNumber();

// Paths
const CWD = process.cwd();
const ROOT_DIR = resolve(CWD, "..");
const STATIC_DIR = resolve(ROOT_DIR, ENV_STATIC_DIR);

// Messages
const ErrorMessageNotFound = "Not Found";
const ErrorMessageServer = "Server Error";

// Server
const server = fastify({
	logger: {
		level: "info",
		prettyPrint: true,
	},
});

// Routes
server.get("/", async (_, response) => {
	response.header("Content-Type", "text/plain");
	return response.status(404).send(ErrorMessageNotFound);
});

server.get<{ Params: RequestParams }>(
	"/image/:filename",
	async (request, response) => {
		const { filename } = request.params;
		const extension = extname(filename).slice(1);
		const type = imageMimeTypes[extension] ?? imageMimeTypes.default;
		const file = join(STATIC_DIR, filename);
		try {
			const data = await readFile(file);
			response.header("Content-Type", type);
			return response.status(200).send(data);
		} catch (error) {
			server.log.error(JSON.stringify(error, null, 2));
			if (error.code === "ENOENT") {
				return response.status(404).send(ErrorMessageNotFound);
			}
			return response.status(500).send(ErrorMessageServer);
		}
	}
);

server.get<{ Params: { name: string; image: string } }>(
	`/${ENV_IMAGES_DIR}/:name/:image`,
	async (request, response) => {
		try {
			const { name, image } = request.params;
			if (!image) {
				return response.code(308).redirect(`/${ENV_IMAGES_DIR}/${name}`);
			}
			const path = join(STATIC_DIR, name, image);
			const file = await readFile(path);
			const extension = extname(image).slice(1);
			const type = imageMimeTypes[extension] ?? imageMimeTypes.default;
			response.header("Content-Type", type);
			return response.status(200).send(file);
		} catch (error) {
			server.log.error(JSON.stringify(error, null, 2));
			if (error.code === "ENOENT") {
				return response.status(404).send(ErrorMessageNotFound);
			}
			return response.status(500).send(ErrorMessageServer);
		}
	}
);

server.get<{ Params: { name: string } }>(
	`/${ENV_IMAGES_DIR}/:name`,
	async (request, response) => {
		try {
			const { name } = request.params;
			const path = join(STATIC_DIR, name);
			if (!name) {
				return response.code(308).redirect(`/${ENV_IMAGES_DIR}`);
			}
			const images = await listFiles(path);
			if (!!images.length) {
				return response.status(200).send(images);
			}
			return response.status(404).send(ErrorMessageNotFound);
		} catch (error) {
			server.log.error(JSON.stringify(error, null, 2));
			if (error.code === "ENOENT" || error.message === ErrorMessageNotFound) {
				return response.status(404).send(ErrorMessageNotFound);
			}
			return response.status(500).send(ErrorMessageServer);
		}
	}
);

server.get(
	`/${ENV_IMAGES_DIR}`,
	{ prefixTrailingSlash: "both" },
	async (request, response) => {
		try {
			const projects = await listDirectories(STATIC_DIR);
			if (!!projects.length) {
				return response.status(200).send(projects);
			}
			return response.status(404).send(ErrorMessageNotFound);
		} catch (error) {
			server.log.error(JSON.stringify(error, null, 2));
			if (error.code === "ENOENT") {
				return response.status(404).send(ErrorMessageNotFound);
			}
			return response.status(500).send(ErrorMessageServer);
		}
	}
);

// Initialization
server.listen(ENV_PORT, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`Server listening at ${address}`);
});
