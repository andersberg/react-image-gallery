import fastify from "fastify";
import { readFile } from "fs/promises";
import { resolve } from "path";

const server = fastify({
	logger: true,
});

server.get("/ping", async (request, reply) => {
	return "pong\n";
});

const options = {};

type RequestParams = {
	filename: string;
};
// TODO:
// * https://stackoverflow.com/questions/5823722/how-to-serve-an-image-using-nodejs

server.get<{ Params: RequestParams }>(
	"/images/:filename",
	async (request, response) => {
		server.log.info(`Request params: ${JSON.stringify(request.params)}`);

		const { filename } = request.params;
		try {
			const file = resolve(process.cwd(), "../static", filename);
			const data = await readFile(file);
			return response.send(data);
		} catch (error) {
			if (error.code === "ENOENT") {
				server.log.error(JSON.stringify(error, null, 2));
				return response.status(404).send(error.msg);
			}

			server.log.error(JSON.stringify(error, null, 2));
			return response.status(500).send(error.msg);
		}
	}
);

server.listen(8080, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`Server listening at ${address}`);
});
