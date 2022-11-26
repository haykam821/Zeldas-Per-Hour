const React = require("react");
const Head = require("next/head").default;

const App = ({ Component, pageProps }) => {
	return <>
		<Head>
			<title>Zeldas Per Hour</title>
		</Head>
		<Component {...pageProps} />
	</>;
};

module.exports.default = App;
