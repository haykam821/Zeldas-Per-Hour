import { ADVENTURE_OF_LINK, A_LINK_BETWEEN_WORLDS, A_LINK_TO_THE_PAST, A_LINK_TO_THE_PAST_GBA, BREATH_OF_THE_WILD, FOUR_SWORDS_ADVENTURES, Game, LEGEND_OF_ZELDA, LINKS_AWAKENING, LINKS_AWAKENING_2019, LINKS_AWAKENING_DX, MAJORAS_MASK, MAJORAS_MASK_3D, MINISH_CAP, OCARINA_OF_TIME, OCARINA_OF_TIME_3D, ORACLE_OF_AGES, ORACLE_OF_SEASONS, PHANTOM_HOURGLASS, SKYWARD_SWORD, SKYWARD_SWORD_HD, SPIRIT_TRACKS, THE_LEGEND_OF_ZELDA_FOUR_SWORDS, TRI_FORCE_HEROES, TWILIGHT_PRINCESS, TWILIGHT_PRINCESS_HD, WIND_WAKER, WIND_WAKER_HD } from "./game";

import { dataLog } from "./debug";

export class System {
	readonly id: string;
	readonly name: string;
	readonly games: Game[];

	fastestGame: Game = null;

	constructor(id: string, name: string, games: Game[]) {
		this.id = id;
		this.name = name;
		this.games = games;
	}

	async loadInfo(): Promise<void> {
		dataLog("fetching system with id '%s'", this.id);

		for (const game of this.games) {
			await game.loadInfo();

			if (this.fastestGame === null || game.time < this.fastestGame.time) {
				this.fastestGame = game;
			}
		}
	}
}

export const SYSTEMS: System[] = [
	new System("famicom", "Famicom", [
		LEGEND_OF_ZELDA,
		ADVENTURE_OF_LINK,
	]),
	new System("nes", "Nintendo Entertainment System", [
		LEGEND_OF_ZELDA,
		ADVENTURE_OF_LINK,
	]),
	new System("gb", "Game Boy", [
		LINKS_AWAKENING,
		LINKS_AWAKENING_DX,
	]),
	new System("snes", "Super Nintendo Entertainment System", [
		A_LINK_TO_THE_PAST,
		LINKS_AWAKENING,
		LINKS_AWAKENING_DX,
	]),
	new System("n64", "Nintendo 64", [
		MAJORAS_MASK,
		OCARINA_OF_TIME,
	]),
	new System("gbp", "Game Boy Pocket", [
		A_LINK_TO_THE_PAST_GBA,
		LINKS_AWAKENING,
		LINKS_AWAKENING_DX,
		ORACLE_OF_SEASONS,
		ORACLE_OF_AGES,
	]),
	new System("gbc", "Game Boy Color", [
		LINKS_AWAKENING_DX,
		ORACLE_OF_SEASONS,
		ORACLE_OF_AGES,
	]),
	new System("gamecube", "GameCube", [
		LEGEND_OF_ZELDA,
		FOUR_SWORDS_ADVENTURES,
		MAJORAS_MASK,
		OCARINA_OF_TIME,
		TWILIGHT_PRINCESS,
		WIND_WAKER,
		ADVENTURE_OF_LINK,
		LINKS_AWAKENING,
		LINKS_AWAKENING_DX,
		ORACLE_OF_SEASONS,
		ORACLE_OF_AGES,
		MINISH_CAP,
	]),
	new System("gba", "Game Boy Advance", [
		LEGEND_OF_ZELDA,
		A_LINK_TO_THE_PAST_GBA,
		THE_LEGEND_OF_ZELDA_FOUR_SWORDS,
		LINKS_AWAKENING,
		LINKS_AWAKENING_DX,
		ORACLE_OF_SEASONS,
		ORACLE_OF_AGES,
		MINISH_CAP,
		ADVENTURE_OF_LINK,
	]),
	new System("ds", "Nintendo DS", [
		A_LINK_TO_THE_PAST_GBA,
		SPIRIT_TRACKS,
		PHANTOM_HOURGLASS,
	]),
	new System("wii", "Wii", [
		LEGEND_OF_ZELDA,
		A_LINK_TO_THE_PAST,
		MAJORAS_MASK,
		OCARINA_OF_TIME,
		TWILIGHT_PRINCESS,
		SKYWARD_SWORD,
		ADVENTURE_OF_LINK,
	]),
	new System("3ds", "Nintendo 3DS", [
		LEGEND_OF_ZELDA,
		A_LINK_BETWEEN_WORLDS,
		A_LINK_TO_THE_PAST,
		THE_LEGEND_OF_ZELDA_FOUR_SWORDS,
		MAJORAS_MASK_3D,
		OCARINA_OF_TIME_3D,
		TRI_FORCE_HEROES,
		SPIRIT_TRACKS,
		ORACLE_OF_SEASONS,
		ORACLE_OF_AGES,
		MINISH_CAP,
		ADVENTURE_OF_LINK,
	]),
	new System("wiiu", "Wii U", [
		WIND_WAKER_HD,
		BREATH_OF_THE_WILD,
		LEGEND_OF_ZELDA,
		MAJORAS_MASK,
		OCARINA_OF_TIME,
		TWILIGHT_PRINCESS_HD,
		SPIRIT_TRACKS,
		SKYWARD_SWORD,
		PHANTOM_HOURGLASS,
		MINISH_CAP,
		ADVENTURE_OF_LINK,
	]),
	new System("nesClassic", "NES Classic", [
		LEGEND_OF_ZELDA,
		ADVENTURE_OF_LINK,
	]),
	new System("snesClassic", "SNES Classic", [
		A_LINK_TO_THE_PAST,
	]),
	new System("switch", "Nintendo Switch", [
		BREATH_OF_THE_WILD,
		LEGEND_OF_ZELDA,
		ADVENTURE_OF_LINK,
		A_LINK_TO_THE_PAST,
		LINKS_AWAKENING_2019,
		SKYWARD_SWORD_HD,
		OCARINA_OF_TIME,
		MAJORAS_MASK,
	]),
];
