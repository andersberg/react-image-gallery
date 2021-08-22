import { pathExistsSync, readdirSync } from "fs-extra";
import sizeOf from "image-size";
import { extname, join } from "path";
import { AbsolutePath, ImageDimension } from "./types";

/**
 * List files in a directory.
 *
 * @param {string} source - Path to source directory.
 * @returns {Promise<string[]>} List of directory names.
 */
export function listFiles(source: string, types: string[]) {
	const items = readdirSync(source, { withFileTypes: true });
	return items
		.filter((item): boolean => {
			if (!item.isFile()) {
				return false;
			} else {
				const filename = join(source, item.name);
				return types.includes(extname(filename));
			}
		})
		.map((item) => item.name);
}
/**
 * Lists directories and symbolic links in a directory.
 *
 * @param {string} source - Path to source directory.
 * @returns {Promise<string[]>} List of directory names.
 */
export function listDirectories(source: string): string[] {
	const items = readdirSync(source, { withFileTypes: true });
	return items
		.filter((item) => item.isDirectory() || item.isSymbolicLink())
		.map((item) => item.name);
}

export function verifyPath(path: AbsolutePath): Boolean {
	const pathExist = pathExistsSync(path);

	if (!pathExist) {
		throw new Error(ErrorPathDoesNotExist(path));
	}

	return pathExist;
}

export function getDimension(
	path: AbsolutePath
): ImageDimension {
	const image = sizeOf(path);
	return {
		width: image?.width,
		height: image?.height,
		type: image?.type,
	};
}

// Errors
export const ErrorPathDoesNotExist = (path: string) => `${path} does not exist`;
