import { GetStaticProps, GetStaticPropsResult } from "next";

type ServerTestProps = {
	message: string;
	error?: string;
};

function ServerTest(props: ServerTestProps) {
	if (props.error) {
		return (
			<main>
				<h1>Error</h1>
				<code>{props.error}</code>
			</main>
		);
	}
	return (
		<main>
			<h1>Server Test</h1>
			<code>{props.message}</code>
		</main>
	);
}

export const getStaticProps: GetStaticProps = async (
	context
): Promise<GetStaticPropsResult<ServerTestProps>> => {
	try {
		const response = await fetch("http://127.0.0.1:8080/ping");
		const message = await response.text();
		console.log(message);

		return {
			props: {
				message,
			},
		};
	} catch (error) {
		console.error(error);

		return {
			props: {
				error: JSON.stringify(error, null, 2),
				message: JSON.stringify(error),
			},
		};
	}
};

export default ServerTest;
