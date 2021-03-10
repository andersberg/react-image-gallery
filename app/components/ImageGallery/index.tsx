import React from "react";
import ImageGrid from "./elements/ImageGrid";
import Navigation from "./elements/Navigation";
import Pagination from "./elements/Pagination";
import SelectedImage from "./elements/SelectedImage";
import { ImageGalleryProps, ImageGalleryContextProps } from "./types";
import { useImageGallery } from "./useImageGallery";

/**
 * TODO:
 * - Add slider for Selected Image
 * - Show prev and next image in slider
 * - Add animations for image transition
 * - Add individual control buttons
 * - Add swipe support
 * - Add component mounted status to state
 */

const ImageGalleryContext = React.createContext<ImageGalleryContextProps>(null);

export type ImageGalleryComponentChild = React.FunctionComponent<{
	className?: string;
}>;

export interface ImageGalleryCompoundComponent
	extends React.FunctionComponent<ImageGalleryProps> {
	Controls: ImageGalleryComponentChild;
	ImagesAfter: ImageGalleryComponentChild;
	ImagesBefore: ImageGalleryComponentChild;
	Pagination: ImageGalleryComponentChild;
	SelectedImage: ImageGalleryComponentChild;
}

const ImageGallery: ImageGalleryCompoundComponent = ({ images, children }) => {
	const instanceProps = useImageGallery({ images });

	return (
		<ImageGalleryContext.Provider value={instanceProps}>
			{children}
		</ImageGalleryContext.Provider>
	);
};

export function useImageGalleryContext() {
	const context = React.useContext(ImageGalleryContext);
	if (!context) {
		throw new Error(
			`ImageGallery compound components can't be rendered outside of the ImageGallery component.`
		);
	}
	return context;
}

export const ImageGallerySelectedImage: ImageGalleryComponentChild = ({
	className,
}) => {
	const { selectedImage, setSelected } = useImageGalleryContext();

	return (
		<SelectedImage
			className={className}
			image={selectedImage}
			onClick={setSelected}
		/>
	);
};

export const ImageGalleryImagesBefore: ImageGalleryComponentChild = ({
	className,
}) => {
	const { imagesBeforeSelected, setSelected } = useImageGalleryContext();
	return (
		<ImageGrid
			className={className}
			images={imagesBeforeSelected}
			onClick={setSelected}
		/>
	);
};

export const ImagesGalleryImagesAfter: ImageGalleryComponentChild = ({
	className,
}) => {
	const { imagesAfterSelected, setSelected } = useImageGalleryContext();
	return (
		<ImageGrid
			className={className}
			images={imagesAfterSelected}
			onClick={setSelected}
		/>
	);
};

export const ImageGalleryControls: ImageGalleryComponentChild = ({
	className,
}) => {
	const { selectNext, selectPrevious, setSelected } = useImageGalleryContext();
	return (
		<Navigation className={className}>
			<button onClick={() => setSelected(null)}>RESET</button>
			<button onClick={() => selectPrevious()}>Previous</button>
			<button onClick={() => selectNext()}>Next</button>
		</Navigation>
	);
};

export const ImageGalleryPagination: ImageGalleryComponentChild = ({
	className,
}) => {
	const { images, setSelected } = useImageGalleryContext();

	return (
		<Pagination className={className}>
			<button onClick={() => setSelected(null)}>RESET</button>
			{images.map((image, index) => (
				<button
					key={`pagination-${className}-${image.id}`}
					onClick={() => setSelected(image.id)}
				>
					{index + 1}
				</button>
			))}
		</Pagination>
	);
};

ImageGallery.Controls = ImageGalleryControls;
ImageGallery.ImagesAfter = ImagesGalleryImagesAfter;
ImageGallery.ImagesBefore = ImageGalleryImagesBefore;
ImageGallery.Pagination = ImageGalleryPagination;
ImageGallery.SelectedImage = ImageGallerySelectedImage;

export default ImageGallery;
