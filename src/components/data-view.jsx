const React = require("react");
const propTypes = require("prop-types");

const { data: dataLog } = require("../util/debug.js");

const HOUR = 3600;

const { systems, systemNames, games } = require("../data.js");

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
				const [fastestGame, time] = systems[system].reduce((acc, game) => {
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

module.exports = DataView;