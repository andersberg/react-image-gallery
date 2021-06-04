import { outputJsonSync, stat } from "fs-extra";
import { join, basename } from "path";
import { v4 as uuid } from "uuid";
import env from "env-var";
import { AbsolutePath, ImageDirectoryInfo, ImageInfo } from "./types";
import { getDimension, listDirectories, listFiles, verifyPath } from "./utils";

export default async function mapImages() {
	try {
		// Environment Variables
		const IMAGES_DIR = env.get("IMAGES_DIR").required().asString();

		await verifyPath(IMAGES_DIR);

		const subDirectories = await listDirectories(IMAGES_DIR);

		for (const directory of subDirectories) {
			const subDirectory = join(IMAGES_DIR, directory);
			await verifyPath(subDirectory);
			console.log("Handling", subDirectory);

			const imageInfoPath = join(subDirectory, "imageInfo.json");
			const imageInfo: ImageDirectoryInfo = await getImageDirectoryInfo(
				subDirectory
			);

			outputJsonSync(imageInfoPath, imageInfo, {
				spaces: 2,
			});
			console.log("Wrote to", imageInfoPath, "\n");
		}
	} catch (error) {
		console.error(error);
	}
}

async function getImageDirectoryInfo(
	directory: AbsolutePath
): Promise<ImageDirectoryInfo> {
	const imageFilenames = await listFiles(directory, [".jpg"]);
	const imagePaths = imageFilenames.map((filename) =>
		join(directory, filename)
	);

	const imagePromises = imagePaths.map(getImageInfo);
	const images = await Promise.all(imagePromises);

	return {
		id: uuid(),
		path: directory,
		updated: new Date(),
		images,
	};
}

async function getImageInfo(path: AbsolutePath): Promise<ImageInfo> {
	const dimensions = await getDimension(path);
	const name = basename(path);
	const { size } = await stat(path);

	return {
		...dimensions,
		id: uuid(),
		name,
		path,
		size,
	};
}
