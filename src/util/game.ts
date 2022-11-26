import { DataWrapper, GameInfo, Leaderboard } from "./game-info";

import { dataLog } from "./debug";

const HOUR = 3600;

export class Game {
	readonly id: string;

	loaded = false;
	name: string;
	time: number;

	constructor(id: string) {
		this.id = id;
	}

	async loadInfo(): Promise<void> {
		if (this.loaded) {
			return;
		}

		dataLog("fetching game with id '%s'", this.id);

		const gameRes = await fetch("https://www.speedrun.com/api/v1/games/" + this.id);
		const { data: gameInfo }: DataWrapper<GameInfo> = await gameRes.json();

		this.name = gameInfo.names.international;
		dataLog("fetched game '%s' (with id '%s')", this.name, this.id);

		let foundRecords = false;
		const leaderboardLink = gameInfo.links.find(link => {
			if (link.rel === "records") {
				foundRecords = true;
				return true;
			}

			return link.rel === "leaderboard";
		});
		if (!leaderboardLink) return;

		dataLog("fetching runs for game '%s' (with id '%s')", this.name, this.id);

		const leaderboardRes = await fetch(leaderboardLink.uri);
		const leaderboardResData = await leaderboardRes.json();
		const leaderboard: Leaderboard = foundRecords ? leaderboardResData.data[0] : leaderboardResData.data;
		if (!leaderboard) return;

		dataLog("fetched runs for game '%s' (with id '%s')", this.name, this.id);

		const firstPlace = leaderboard.runs.find(run => run.place === 1);
		if (firstPlace && firstPlace.run && firstPlace.run.times && firstPlace.run.times.primary_t) {
			this.time = firstPlace.run.times.primary_t;
		}

		this.loaded = true;
	}

	getTimesPerHour(): string {
		return (HOUR / this.time).toFixed(2);
	}
}

export const LEGEND_OF_ZELDA = new Game("the_legend_of_zelda");
export const ADVENTURE_OF_LINK = new Game("zelda_ii_the_adventure_of_link");
export const A_LINK_TO_THE_PAST = new Game("alttp");
export const LINKS_AWAKENING = new Game("la");
export const OCARINA_OF_TIME = new Game("oot");
export const LINKS_AWAKENING_DX = new Game("ladx");
export const MAJORAS_MASK = new Game("mm");
export const ORACLE_OF_AGES = new Game("ooa");
export const ORACLE_OF_SEASONS = new Game("oos");
export const A_LINK_TO_THE_PAST_GBA = new Game("alttpgba");
export const THE_LEGEND_OF_ZELDA_FOUR_SWORDS = new Game("The_Legend_of_Zelda_Four_Swords");
export const WIND_WAKER = new Game("tww");
export const FOUR_SWORDS_ADVENTURES = new Game("fsa");
export const MINISH_CAP = new Game("tmc");
export const TWILIGHT_PRINCESS = new Game("tp");
export const PHANTOM_HOURGLASS = new Game("tlozph");
export const SPIRIT_TRACKS = new Game("lozst");
export const OCARINA_OF_TIME_3D = new Game("oot3d");
export const SKYWARD_SWORD = new Game("lozss");
export const WIND_WAKER_HD = new Game("twwhd");
export const A_LINK_BETWEEN_WORLDS = new Game("albw");
export const MAJORAS_MASK_3D = new Game("mm3d");
export const TRI_FORCE_HEROES = new Game("tfh");
export const TWILIGHT_PRINCESS_HD = new Game("tphd");
export const BREATH_OF_THE_WILD = new Game("botw");
export const LINKS_AWAKENING_2019 = new Game("las");
export const SKYWARD_SWORD_HD = new Game("sshd");
