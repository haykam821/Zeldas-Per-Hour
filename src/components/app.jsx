const React = require("react");
const propTypes = require("prop-types");

const styled = require("styled-components").default;

const DataView = require("./data-view.jsx");

class AppUnstyled extends React.Component {
	render() {
		return <div className={this.props.className}>
			<h1>Zeldas Per Hour</h1>
			<p>
				This fun tool shows how many Zeldas can be played on a given Nintendo console per hour.
				This is calculated by 1 hour / (the fastest any% time for a console&apos;s Zelda game).
				If a console has multiple Zelda games, the fastest will be used.
			</p>

			<DataView />

			<p>
				<a href="https://github.com/haykam821/Zeldas-Per-Hour">GitHub repo</a>
			</p>
		</div>;
	}
}
AppUnstyled.propTypes = {
	className: propTypes.string,
};

const App = styled(AppUnstyled)`
	font-family: sans-serif;

	${DataView} {
		border: 1px solid black;
		padding: 8px;
	}
`;
module.exports = App;