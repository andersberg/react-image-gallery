import { ImageGalleryItem } from "../types";
import styles from "./ImageGrid.module.css";

export interface ImageGridProps {
	images: ImageGalleryItem[];
	onClick?: (id: string, event) => void;
	className?: string;
}

export default function ImageGrid({
	images,
	onClick = null,
	className = "",
}: ImageGridProps) {
	// console.log(
	// 	className,
	// 	images.map(({ id }) => id)
	// );
	if (!images.length) return null;

	return (
		<div className={`${styles.grid} ${className}`.trim()}>
			{images.map(image => (
				<figure
					key={image.id}
					className={styles.cell}
					onClick={event => onClick(image.id, event)}
				>
					<img
						src={image.src}
						alt={image.name}
						width={image.width}
						height={image.height}
						className={styles.image}
					/>
				</figure>
			))}
		</div>
	);
}
