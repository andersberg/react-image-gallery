import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { API_URL_ALBUMS } from "../utils/constants";
import Link from "next/link";

interface Album {
	name: string;
	path: string;
}

export default function Albums(
	props: InferGetStaticPropsType<typeof getStaticProps>
) {
	const router = useRouter();
	const { route } = router;
	if (!route) {
		return null;
	}
	console.log(JSON.stringify(props.albums));
	return (
		<div className='w-screen flex justify-center'>
			<main className='container center'>
				<h1 className='font-mono text-4xl text-center my-4'>
					{`${route}`.toUpperCase()}
				</h1>
				<ul className='flex flex-col'>
					{props.albums.map(({ name, path }) => (
						<li key={name}>
							<Link href={encodeURI(`${route}/${path}`)}>
								<a className='underline'>{name}</a>
							</Link>
						</li>
					))}
				</ul>
			</main>
		</div>
	);
}

export const getStaticProps = async context => {
	const response = await fetch(API_URL_ALBUMS);
	const body = await response.json();
	const albums: Album[] = body.map(name => ({
		path: name,
		name,
	}));
	return {
		props: {
			albums,
		},
	};
};
