import { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import env from "env-var";
import { extname, resolve } from "path";
import { mimeTypes } from "../../../utils/utils";
import {
	ErrorMessageNotFound,
	ErrorMessageServerError,
} from "../../../utils/messages";
// Setup
dotenv.config({
	path: resolve(process.cwd(), "..", ".env"),
});

// Environment Variables
const IMAGES_DIR = env.get("IMAGES_DIR").required().asString();
const SERVER_PORT = env.get("SERVER_PORT").required().asPortNumber();
const SERVER_URL = env.get("SERVER_URL").required().asString();

export default async function imageHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { path } = req.query;
	const filepath = Array.isArray(path) ? path.join("/") : path;

	// path should only be <album name>/<image>
	if (path.length > 2) {
		res.setHeader("Content-Type", mimeTypes.txt);
		return res.status(404).end(ErrorMessageNotFound);
	}

	try {
		const endpoint = encodeURI(
			`${SERVER_URL}:${SERVER_PORT}/${IMAGES_DIR}/${filepath}`
		);

		const { body, status } = await fetch(endpoint);

		let type = mimeTypes[extname(endpoint)] ?? mimeTypes.default;

		if (status === 200) {
			res.setHeader("Content-Type", type);
			return res.send(body);
		}

		// Set Content Type to string for all errors.
		res.setHeader("Content-Type", mimeTypes.txt);

		if (status === 404) {
			return res.status(404).end(ErrorMessageNotFound);
		}

		return res.status(status).end(ErrorMessageServerError);
	} catch (error) {
		console.error(error);

		res.setHeader("Content-Type", mimeTypes.txt);
		return res.status(500).end(ErrorMessageServerError);
	}
}
