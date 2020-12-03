export interface ImageGalleryItem {
	height: number;
	id: string;
	name: string;
	src: string;
	width: number;
}

export interface ImageGalleryProps {
	images: ImageGalleryItem[];
	initialSelected?: string;
	debug?: boolean;
}

export interface ImageGalleryContextProps {
	images: ImageGalleryItem[];
	selected: string;
	selectedImage: ImageGalleryItem;
	imagesBeforeSelected: ImageGalleryItem[];
	imagesAfterSelected: ImageGalleryItem[];
	setSelected: (id?: string | null) => void;
	selectNext: () => void;
	selectPrevious: () => void;
}
