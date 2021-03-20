import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { API_URL_ALBUMS, API_URL_IMAGES } from "../../utils/constants";

interface Image {
	name: string;
	path: string;
}

export default function Albums(
	props: InferGetStaticPropsType<typeof getStaticProps>
) {
	const router = useRouter();
	const { isFallback, query, route } = router;

	if (!route) {
		return null;
	}

	if (isFallback) {
		return <h1 className='font-mono text-4xl text-center my-4'>Loading...</h1>;
	}

	return (
		<div className='w-screen flex justify-center'>
			<main className='container center'>
				<h1 className='font-mono text-4xl text-center my-4'>
					{`${query.album}`.toUpperCase()}
				</h1>
				<ul className='grid grid-cols-3 gap-3'>
					{props.images.map(({ name, path }) => (
						<li key={name}>
							<img
								className='objecy-cover'
								src={path}
								alt={name}
								loading='lazy'
							/>
							<span>{name}</span>
						</li>
					))}
				</ul>
			</main>
		</div>
	);
}

export async function getStaticPaths() {
	const response = await fetch(API_URL_ALBUMS);
	const albums: string[] = await response.json();
	const paths = albums.map(id => ({
		params: {
			album: id,
		},
	}));

	return {
		paths,
		fallback: false,
	};
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
	const { params } = context;
	const albumURL = encodeURI(`${API_URL_IMAGES}/${params.album}`);
	const response = await fetch(albumURL);
	const data = await response.json();
	const images: Image[] = data.map(image => ({
		path: encodeURI(`${albumURL}/${image}`),
		name: parse(image).name.replace(/-/g, " "),
	}));

	return {
		props: {
			images,
			notFound: !!data,
		},
	};
};
