const React = require("react");
const DataView = require("./data-view.jsx");

class App extends React.Component {
	render() {
		return <React.Fragment>
			<h1>Zeldas Per Hour</h1>
			<p>
				This fun tool shows how many Zeldas can be played on a given Nintendo console per hour.
				This is calculated by 1 hour / (the fastest any% time for a console&apos;s Zelda game).
				If a console has multiple Zelda games, the fastest will be used.
			</p>

			<DataView style={{
				border: "1px solid black",
				padding: 8,
			}} />

			<p>
				<a href="https://github.com/haykam821/Zeldas-Per-Hour">GitHub repo</a>
			</p>
		</React.Fragment>;
	}
}
module.exports = App;