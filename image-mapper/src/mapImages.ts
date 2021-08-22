import { existsSync, readFileSync, statSync, unlinkSync, writeFileSync } from "fs";
import { basename, join } from "path";
import { v4 as uuid } from "uuid";
import { AbsolutePath, ImageDirectoryInfo, ImageInfo } from "./types";
import { getDimension, listDirectories, listFiles, verifyPath } from "./utils";


export default function mapImages(imagesDirectory: string, configDirectory: string) {
	try {
		const imageInfoPath = join(configDirectory, "imageInfo.json");

		if(existsSync(imageInfoPath)) {
			unlinkSync(imageInfoPath)
			console.log(`Removed old image info file, ${imageInfoPath}`);
		}

		const imageInfo = readImageInfo(imageInfoPath);
		const subDirectories = listDirectories(imagesDirectory);
		console.log("subDirectories", subDirectories)
		for (const directory of subDirectories) {
			const subDirectory = join(imagesDirectory, directory);
			const subDirectoryImageInfo = imageInfo.find(imageInfo => imageInfo.path === subDirectory)
			verifyPath(subDirectory);
			console.log("Handling", subDirectory);

			const imageDirectoryInfo: ImageDirectoryInfo = getImageDirectoryInfo(
				subDirectory
			);
			
			imageInfo.push(imageDirectoryInfo);
		}
		
		const jsonData = JSON.stringify(imageInfo, null, 2);
		writeFileSync(imageInfoPath, jsonData);
		console.log("Wrote to", imageInfoPath, "\n");
	} catch (error) {
		console.error(error);
	}
}

function readImageInfo(imageInfoPath: string): ImageDirectoryInfo[] {
	if (existsSync(imageInfoPath)) {
		const jsonData = readFileSync(imageInfoPath, { encoding: "utf-8" })

		return JSON.parse(jsonData)
	} else {
		return []
	}
}

function getImageDirectoryInfo(
	directory: AbsolutePath
): ImageDirectoryInfo {
	const imageFilenames = listFiles(directory, [".jpg"]);
	const imagePaths = imageFilenames.map((filename) =>
		join(directory, filename)
	);

	const images = imagePaths.map(getImageInfo);

	return {
		id: uuid(),
		path: directory,
		updated: new Date(),
		images,
	};
}

function getImageInfo(path: AbsolutePath): ImageInfo {
	const dimensions = getDimension(path);
	const name = basename(path);
	const { size, mtime } = statSync(path);

	return {
		...dimensions,
		id: uuid(),
		name,
		path,
		size,
		modified: mtime,
	};
}
