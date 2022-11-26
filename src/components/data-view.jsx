const React = require("react");
const propTypes = require("prop-types");

const styled = require("styled-components").default;

const { data: dataLog } = require("../util/debug.js");

const HOUR = 3600;

const { systems, systemNames, games } = require("../data.js");

const gameTimes = {};
const gameNames = {};

class DataViewUnstyled extends React.Component {
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

				const gameRes = await fetch("https://www.speedrun.com/api/v1/games/" + game);
				const { data: gameInfo } = await gameRes.json();

				const gameName = gameInfo.names.international;
				dataLog("fetched game '%s' (with id '%s')", gameName, game);
				gameNames[game] = gameName;

				let foundRecords = false;
				const leaderboardLink = gameInfo.links.find(link => {
					if (link.rel === "records") {
						foundRecords = true;
						return true;
					}

					return link.rel === "leaderboard";
				});
				if (!leaderboardLink) return;

				dataLog("fetching runs for game '%s' (with id '%s')", gameName, game);

				const leaderboardRes = await fetch(leaderboardLink.uri);
				const leaderboardResData = await leaderboardRes.json();
				const leaderboard = foundRecords ? leaderboardResData.data[0] : leaderboardResData.data;
				if (!leaderboard) return;

				dataLog("fetched runs for game '%s' (with id '%s')", gameName, game);

				const firstPlace = leaderboard.runs.find(run => run.place === 1);
				if (firstPlace && firstPlace.run && firstPlace.run.times && firstPlace.run.times.primary_t) {
					gameTimes[game] = firstPlace.run.times.primary_t;
				}
			}
			this.setState({
				loading: false,
			});
		}
	}

	render() {
		if (this.state.loading) {
			return <div className={this.props.className}>
				<span>
					Loading...
				</span>
			</div>;
		}

		return <div className={this.props.className}>
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
DataViewUnstyled.propTypes = {
	className: propTypes.string,
};

const DataView = styled(DataViewUnstyled)``;
module.exports = DataView;
