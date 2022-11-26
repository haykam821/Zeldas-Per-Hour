import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";

const App = ({ Component, pageProps }: AppProps) => {
	return <>
		<Head>
			<title>Zeldas Per Hour</title>
		</Head>
		<Component {...pageProps} />
	</>;
};

export default App;
