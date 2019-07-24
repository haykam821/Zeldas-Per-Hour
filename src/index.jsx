require("file-loader?name=[name].[ext]!html-minify-loader!./index.html");

const React = require("react");
const ReactDOM = require("react-dom");

const HOUR = 3600;

const systems = {
	wiiu: ["twwhd", "botw"],
	switch: ["botw"],
};
const systemNames = {
	wiiu: "Wii U",
	switch: "Nintendo Switch",
};

const games = Object.values(systems).reduce((acc, systemGames) => {
	systemGames.forEach(game => {
		if (!acc.includes(game)) {
			acc.push(game);
		}
	});
	return acc;
}, []);

const gameTimes = {};
const gameNames = {};

class DataView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
		};
	}

	async componentDidMount() {
		if (Object.keys(gameTimes).length === 0) {
			for (let game of games) {
				if (gameTimes[game]) return;

				await fetch("https://www.speedrun.com/api/v1/games/" + game).then(res => res.json()).then(({ data: gameInfo }) => {
					gameNames[game] = gameInfo.names.international;
				
					const leaderboardLink = gameInfo.links.find(link => link.rel === "leaderboard");
					if (!leaderboardLink) return;

					return fetch(leaderboardLink.uri).then(res => res.json()).then(({ data: leaderboard }) => {
						const firstPlace = leaderboard.runs.find(run => run.place === 1);
						if (firstPlace && firstPlace.run && firstPlace.run.times && firstPlace.run.times.primary_t) {
							gameTimes[game] = firstPlace.run.times.primary_t;
						}
					});
				});
			}
			this.setState({
				loading: false,
			});
		}
	}

	render() {
		if (this.state.loading) {
			return <p>Loading...</p>;
		}

		return <div style={this.props.style}>
			{Object.keys(systems).map(system => {
				const [ fastestGame, time ] = systems[system].reduce((acc, game) => {
					if (gameTimes[game] < acc[1]) {
						acc = [game, gameTimes[game]];
					}
					return acc;
				}, [null, Infinity]);

				return <p key={system}>
					{
						`On the ${systemNames[system] || system},
						you can play ${gameNames[fastestGame]}}
						about ${(HOUR / time).toFixed(2)}
						times per hour.`
					}
				</p>;
			})}
		</div>
	}
}



class App extends React.Component {
	render() {
		return <React.Fragment>
			<h1>Zeldas Per Hour</h1>
			<p>
				This fun tool shows how many Zeldas can be played on a given Nintendo console per hour.
				This is calculated by 1 hour / (the fastest any% time for a console's Zelda game).
				If a console has multiple Zelda games, the fastest will be used.
			</p>

			<DataView style={{
				border: "1px solid black",
				padding: 8,
			}} />
		</React.Fragment>;
	}
}

ReactDOM.render(<App />, document.getElementById("app"));