const React = require("react");

const Document = require("next/document").default;
const { ServerStyleSheet } = require("styled-components");

class StyledDocument extends Document {
	static async getInitialProps(context) {
		const sheet = new ServerStyleSheet();
		const parentRenderPage = context.renderPage;

		try {
			context.renderPage = () => {
				return parentRenderPage({
					enhanceApp: App => props => {
						return sheet.collectStyles(<App {...props} />);
					},
				});
			};

			const initialProps = await Document.getInitialProps(context);
			return {
				...initialProps,
				styles: [
					initialProps.styles,
					sheet.getStyleElement(),
				],
			};
		} finally {
			sheet.seal();
		}
	}
}

module.exports.default = StyledDocument;
