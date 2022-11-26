export interface DataWrapper<T> {
	data: T;
}

export interface GameInfo {
	links: Link[];
	names: {
		international: string;
	}
}

interface Link {
	rel: string;
	uri: string;
}

export interface Leaderboard {
	runs: RunEntry[];
}

interface RunEntry {
	place: number;
	run: Run;
}

interface Run {
	times: {
		primary_t: number;
	};
}
