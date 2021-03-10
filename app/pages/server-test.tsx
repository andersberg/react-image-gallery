import { GetStaticProps, GetStaticPropsResult } from "next";

type ServerTestProps = {
	message: string;
};

function ServerTest(props: ServerTestProps) {
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
	const response = await fetch("http://127.0.0.1:8080/ping");
	const message = await response.text();

	console.log(message);

	return {
		props: {
			message,
		},
	};
};

export default ServerTest;
