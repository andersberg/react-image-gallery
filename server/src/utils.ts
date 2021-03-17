import { readdir } from "fs/promises";

/**
 * List files in a directory.
 *
 * @param {string} source - Path to source directory.
 * @returns {Promise<string[]>} List of directory names.
 */
export async function listFiles(source: string) {
	const items = await readdir(source, { withFileTypes: true });
	return items.filter((item) => item.isFile()).map((item) => item.name);
}
/**
 * Lists directories and symbolic links in a directory.
 *
 * @param {string} source - Path to source directory.
 * @returns {Promise<string[]>} List of directory names.
 */
export async function listDirectories(source: string) {
	const items = await readdir(source, { withFileTypes: true });
	return items
		.filter((item) => item.isDirectory() || item.isSymbolicLink())
		.map((item) => item.name);
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
	default: "text/plain",
};

export const imageMimeTypes: Record<string, string> = {
	gif: "image/gif",
	jpg: "image/jpeg",
	jpeg: "image/jpeg",
	png: "image/png",
	default: "image",
};
