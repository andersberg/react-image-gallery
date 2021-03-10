import { toUnicode } from "punycode";
import React from "react";
import { animated, useSprings } from "react-spring";
import { useDrag } from "react-use-gesture";
import { ImageGalleryItem } from "../ImageGallery/types";
import clamp from "lodash/clamp";

export interface SliderProps {
	images: ImageGalleryItem[];
}

export type SliderComponent = React.FunctionComponent<SliderProps>;

const Slider: SliderComponent = ({ images }): JSX.Element => {
	const mounted = React.useRef(false);
	React.useEffect(() => {
		if (!mounted) {
			mounted.current = true;
		}
	}, []);

	const index = React.useRef(0);
	const [spring, setSpring] = useSprings(images.length, i => ({
		x: i * (!!mounted.current ? window.innerWidth : 0),
		display: "block",
	}));

	const bind = useDrag(
		({ active, movement, direction: [xDir], distance, cancel }) => {
			if (active && distance > window.innerWidth / 2) {
				cancel(
					(index.current = clamp(
						index.current + (xDir > 0 ? -1 : 1),
						0,
						images.length - 1
					))
				);

				cancel();
			}
		}
	);

	return (
		<div>
			{images.map((image, index) => (
				<animated.div key={image.id}></animated.div>
			))}
		</div>
	);
};

export default Slider;
