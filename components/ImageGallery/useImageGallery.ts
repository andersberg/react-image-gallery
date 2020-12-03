import { useState } from "react";
import { ImageGalleryContextProps, ImageGalleryProps } from "./types";

/**
 * @description Custom hook for creating a interactive image gallery.
 *
 * @param images array of `ImageItem[]`.
 * @param initialSelected index of `images` that should be selected in load.
 *
 * @returns
 */
export function useImageGallery({
	images,
	initialSelected = null,
}: ImageGalleryProps): ImageGalleryContextProps {
	const [selected, setSelected] = useState(initialSelected);

	const selectedImage = images.find(image => image.id === selected);
	const selectedImageIndex = images.findIndex(image => image.id === selected);
	const imagesBeforeSelected = images.filter(
		(_, index) => selectedImageIndex > index
	);
	const imagesAfterSelected = images.filter(
		(_, index) => selectedImageIndex < index
	);

	const handleSelect = (id?: string | null) =>
		setSelected(selected !== id ? id : null);

	const selectNext = () => {
		if (selected === null) {
			return setSelected(null);
		}

		const newSelectedImageIndex =
			selectedImageIndex + 1 > images.length - 1 ? 0 : selectedImageIndex + 1;

		return setSelected(images[newSelectedImageIndex].id);
	};

	const selectPrevious = () => {
		if (selected === null) {
			return setSelected(null);
		}

		const newSelectedImageIndex =
			selectedImageIndex - 1 < 0 ? images.length - 1 : selectedImageIndex - 1;

		return setSelected(images[newSelectedImageIndex].id);
	};

	return {
		images,
		imagesAfterSelected,
		imagesBeforeSelected,
		selected,
		selectedImage,
		selectNext,
		selectPrevious,
		setSelected: handleSelect,
	};
}
