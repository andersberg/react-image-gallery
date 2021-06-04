export interface RequestParams {
	filename: string;
}

export type AbsolutePath = string;

export interface ImageDimension {
	width: number | undefined;
	height: number | undefined;
	orientation?: number;
	type?: string;
}

export interface ImageInfo extends ImageDimension {
	name: string;
	path: AbsolutePath;
	size: number;
	id: string;
}

export interface ImageDirectoryInfo {
	id: string;
	path: AbsolutePath;
	images: ImageInfo[];
	updated: Date;
}
