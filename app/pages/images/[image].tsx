import { useRouter } from "next/router";

export default function ImagePage() {
	const router = useRouter();
	const { image } = router.query;
	if (!image) {
		return null;
	}
	return (
		<div className='w-screen flex justify-center'>
			<main className='container center'>
				<h1 className='font-mono text-4xl text-center my-4'>
					{`${image}`.toUpperCase()}
				</h1>
				<img
					className='object-center w-full rounded-lg my-8'
					src={`/api/images/${image}.jpg`}
					alt={`${image}`}
				/>
			</main>
		</div>
	);
}
