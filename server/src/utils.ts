import { pathExistsSync, readdirSync } from "fs-extra";
import { extname, join } from "path";
import { AbsolutePath } from "./types";

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

export const mimeTypes: Record<string, string> = {
	html: "text/html",
	txt: "text/plain",
	css: "text/css",
	gif: "image/gif",
	jpg: "image/jpeg",
	jpeg: "image/jpeg",
	png: "image/png",
	svg: "image/svg+xml",
	js: "application/javascript",
	json: "application/json",
	default: "text/plain",
};

export const imageMimeTypes: Record<string, string> = {
	gif: "image/gif",
	jpg: "image/jpeg",
	jpeg: "image/jpeg",
	png: "image/png",
	default: "image",
};

// Errors
export const ErrorMessageNotFound = "Not Found";
export const ErrorMessageServerError = "Unknown Server Error";
export const ErrorPathDoesNotExist = (path: string) => `${path} does not exist`;
