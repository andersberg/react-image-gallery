import { NextApiRequest, NextApiResponse } from "next";
import { readFile } from "fs/promises";
import { resolve } from "path";

export default async function imageHandler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { image } = req.query;
	try {
		const file = resolve(process.cwd(), "../static", image as string);
		const data = await readFile(file);

		return res.send(data);
	} catch (error) {
		console.error(error);

		return res.status(500).send(JSON.stringify(error, null, 2));
	}
}
