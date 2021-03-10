import { ImageGalleryItem } from "../types";
import styles from "./SelectedImage.module.css";

export interface SelectedImageProps {
	image: ImageGalleryItem;
	onClick?: (id: string, event) => void;
	className?: string;
}

export default function SelectedImage({
	image,
	onClick = null,
	className = "",
}: SelectedImageProps) {
	// console.log("SelectedImage", image);
	if (!image) return null;
	return (
		<figure key={image.id}>
			<img
				src={image.src}
				alt={image.name}
				width={image.width}
				height={image.height}
				className={styles.image}
				onClick={event => onClick(image.id, event)}
			/>
		</figure>
	);
}
