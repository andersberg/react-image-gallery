import { NextApiRequest, NextApiResponse } from "next";

export default async function imageHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { image } = req.query;
	const filename = Array.isArray(image) ? image[0] : image;

	try {
		const { body, status } = await fetch(
			`http://127.0.0.1:8080/images/${filename}`
		);

		if (status === 200) {
			return res.send(body);
		}

		// Set Content Type to string for all errors.
		res.setHeader("Content-Type", "text");

		if (status === 404) {
			return res.status(404).end("Not found");
		}

		return res.status(status).end("Unknown server error");
	} catch (error) {
		console.error(error);

		res.setHeader("Content-Type", "text");
		return res.status(500).send(JSON.stringify(error, null, 2));
	}
}
