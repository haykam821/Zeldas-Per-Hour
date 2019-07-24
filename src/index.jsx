require("file-loader?name=[name].[ext]!html-minify-loader!./index.html");

const React = require("react");
const ReactDOM = require("react-dom");

const HOUR = 3600;

const systems = {
	wiiu: ["twwhd", "botw", "The_Legend_of_Zelda", "mm", "oot", "tphd", "lozst", "lozss", "tlozph", "tmc", "Zelda_II_The_Adventure_of_Link"],
	switch: ["botw", "The_Legend_of_Zelda", "Zelda_II_The_Adventure_of_Link"],
	nes: ["The_Legend_of_Zelda", "Zelda_II_The_Adventure_of_Link"],
	gamecube: ["The_Legend_of_Zelda", "fsa", "mm", "oot", "tp", "tww", "Zelda_II_The_Adventure_of_Link"],
	wii: ["The_Legend_of_Zelda", "alttp", "mm", "oot", "tp", "lozss", "Zelda_II_The_Adventure_of_Link"],
	gba: ["The_Legend_of_Zelda", "alttpgba", "The_Legend_of_Zelda_Four_Swords", "la", "ladx", "oos", "ooa", "tmc", "Zelda_II_The_Adventure_of_Link"],
	"3ds": ["The_Legend_of_Zelda", "albw", "alttp", "The_Legend_of_Zelda_Four_Swords", "mm3d", "oot3d", "tfh", "lozst", "oos", "ooa", "tmc", "Zelda_II_The_Adventure_of_Link"],
	famicom: ["The_Legend_of_Zelda", "Zelda_II_The_Adventure_of_Link"],
	nesClassic: ["The_Legend_of_Zelda", "Zelda_II_The_Adventure_of_Link"],
	snesClassic: ["alttp"],
	snes: ["alttp"],
	gbp: ["alttpgba", "la", "ladx", "oos", "ooa"],
	ds: ["alttpgba", "lozst", "tlozph"],
	sgb2: ["la", "ladx"],
	gb: ["la", "ladx"],
	gbi: ["la", "ladx", "oos", "ooa", "tmc"],
	gbc: ["ladx", "oos", "ooa"],
	n64: ["mm", "oot"],
	shield: ["tp"],
};
const systemNames = {
	wiiu: "Wii U",
	switch: "Nintendo Switch",
	nes: "NES",
	snes: "SNES",
	gamecube: "GameCube",
	wii: "Wii",
	gba: "Game Boy Advance",
	"3ds": "Nintendo 3DS",
	famicom: "Famicom",
	nesClassic: "NES Classic",
	snesClassic: "SNES Classic",
	gbp: "GBP??",
	gbc: "Game Boy Color",
	n64: "Nintendo 64",
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