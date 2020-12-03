import React from "react";
import Head from "next/head";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { nanoid } from "nanoid";
import styles from "../styles/Home.module.css";
import { useImageGallery } from "../components/ImageGallery/useImageGallery";
import { ImageGalleryItem } from "../components/ImageGallery/types";
import ImageGallery from "../components/ImageGallery";

const IMAGE_COUNT = 9;
const IMAGE_HEIGHT = 1200;
const IMAGE_WIDTH = 800;

export interface PageProps {
	images: ImageGalleryItem[];
}

export default function Home(props: PageProps) {
	return (
		<main className={styles.container}>
			<Head>
				<title>React Image Gallery</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<section>
				<h1>React Image Gallery compound component</h1>
				<ImageGallery images={props.images}>
					<ImageGallery.Controls />
					<ImageGallery.Pagination />
					<hr
						style={{
							margin: "25px 0",
							border: "2px solid black",
						}}
					/>
					<ImageGallery.ImagesBefore />
					<ImageGallery.SelectedImage />
					<ImageGallery.ImagesAfter />
				</ImageGallery>
			</section>
		</main>
	);
}

export const getStaticProps: GetStaticProps = async (
	context
): Promise<GetStaticPropsResult<PageProps>> => {
	const images = [...new Array(IMAGE_COUNT)].map(
		(_, index): ImageGalleryItem => ({
			id: nanoid(),
			name: `${index + 1}`,
			height: IMAGE_HEIGHT,
			width: IMAGE_WIDTH,
			src: `https://picsum.photos/seed/${
				index + 1
			}/${IMAGE_WIDTH}/${IMAGE_HEIGHT}.webp`,
		})
	);

	return {
		props: {
			images,
		},
	};
};
