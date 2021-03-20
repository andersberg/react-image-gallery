import { NextApiRequest, NextApiResponse } from "next";
import { mimeTypes } from "../../utils/utils";
import {
	ErrorMessageNotFound,
	ErrorMessageServerError,
} from "../../utils/messages";
import { IMAGES_DIR, SERVER_URL } from "../../utils/constants";

export default async function imageHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const endpoint = encodeURI(`${SERVER_URL}/${IMAGES_DIR}`);
		const { body, status } = await fetch(endpoint);

		if (status === 200) {
			res.setHeader("Content-Type", mimeTypes.json);
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
