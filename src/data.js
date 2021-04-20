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
module.exports.systems = systems;

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
module.exports.systemNames = systemNames;

const games = Object.values(systems).reduce((acc, systemGames) => {
	systemGames.forEach(game => {
		if (!acc.includes(game)) {
			acc.push(game);
		}
	});
	return acc;
}, []);
module.exports.games = games;
