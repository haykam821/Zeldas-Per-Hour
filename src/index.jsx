require("file-loader?name=[name].[ext]!html-minify-loader!./index.html");

const React = require("react");
const ReactDOM = require("react-dom");

const propTypes = require("prop-types");

const debug = require("debug");
const log = debug("zeldas-per-hour:main");
const dataLog = debug("zeldas-per-hour:data");

const HOUR = 3600;

const systems = {
	"3ds": ["The_Legend_of_Zelda", "albw", "alttp", "The_Legend_of_Zelda_Four_Swords", "mm3d", "oot3d", "tfh", "lozst", "oos", "ooa", "tmc", "Zelda_II_The_Adventure_of_Link"],
	ds: ["alttpgba", "lozst", "tlozph"],
	famicom: ["The_Legend_of_Zelda", "Zelda_II_The_Adventure_of_Link"],
	gamecube: ["The_Legend_of_Zelda", "fsa", "mm", "oot", "tp", "tww", "Zelda_II_The_Adventure_of_Link"],
	gb: ["la", "ladx"],
	gba: ["The_Legend_of_Zelda", "alttpgba", "The_Legend_of_Zelda_Four_Swords", "la", "ladx", "oos", "ooa", "tmc", "Zelda_II_The_Adventure_of_Link"],
	gbc: ["ladx", "oos", "ooa"],
	gbi: ["la", "ladx", "oos", "ooa", "tmc"],
	gbp: ["alttpgba", "la", "ladx", "oos", "ooa"],
	n64: ["mm", "oot"],
	nes: ["The_Legend_of_Zelda", "Zelda_II_The_Adventure_of_Link"],
	nesClassic: ["The_Legend_of_Zelda", "Zelda_II_The_Adventure_of_Link"],
	sgb2: ["la", "ladx"],
	shield: ["tp"],
	snes: ["alttp"],
	snesClassic: ["alttp"],
	switch: ["botw", "The_Legend_of_Zelda", "Zelda_II_The_Adventure_of_Link", "alttp", "las"],
	wii: ["The_Legend_of_Zelda", "alttp", "mm", "oot", "tp", "lozss", "Zelda_II_The_Adventure_of_Link"],
	wiiu: ["twwhd", "botw", "The_Legend_of_Zelda", "mm", "oot", "tphd", "lozst", "lozss", "tlozph", "tmc", "Zelda_II_The_Adventure_of_Link"],
};
const systemNames = {
	"3ds": "Nintendo 3DS",
	famicom: "Famicom",
	gamecube: "GameCube",
	gba: "Game Boy Advance",
	gbc: "Game Boy Color",
	gbp: "GBP??",
	n64: "Nintendo 64",
	nes: "NES",
	nesClassic: "NES Classic",
	snes: "SNES",
	snesClassic: "SNES Classic",
	switch: "Nintendo Switch",
	wii: "Wii",
	wiiu: "Wii U",
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
			for (const game of games) {
				if (gameTimes[game]) return;

				dataLog("fetching game with id '%s'", game);
				await fetch("https://www.speedrun.com/api/v1/games/" + game).then(res => res.json()).then(({ data: gameInfo }) => {
					const gameName = gameInfo.names.international;
					dataLog("fetched game '%s' (with id '%s')", gameName, game);
					gameNames[game] = gameName;

					const leaderboardLink = gameInfo.links.find(link => link.rel === "leaderboard");
					if (!leaderboardLink) return;

					dataLog("fetching runs for game '%s' (with id '%s')", gameName, game);
					return fetch(leaderboardLink.uri).then(res => res.json()).then(({ data: leaderboard }) => {
						dataLog("fetched runs for game '%s' (with id '%s')", gameName, game);

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
						you can play ${gameNames[fastestGame]}
						about ${(HOUR / time).toFixed(2)}
						times per hour.`
					}
				</p>;
			})}
		</div>;
	}
}
DataView.propTypes = {
	style: propTypes.string,
};

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
		</React.Fragment>;
	}
}

ReactDOM.render(<App />, document.getElementById("app"), () => {
	log("rendered app");
});