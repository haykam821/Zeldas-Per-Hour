import React from "react";
import { System } from "../util/system";

interface DataRowProps {
	system: System;
}

interface DataRowState {
	loaded: boolean;
}

export class DataRow extends React.Component<DataRowProps, DataRowState> {
	constructor(props: DataRowProps) {
		super(props);
		this.state = {
			loaded: false,
		};
	}

	async componentDidMount() {
		await this.props.system.loadInfo();

		setTimeout(() => {
			this.setState({
				loaded: true,
			});
		}, 1000);
	}

	render() {
		const system = this.props.system;

		if (!this.state.loaded) {
			return <p>
				Loading {system.name} games...
			</p>;
		}

		return <p>
			On the {system.name},
			you can play {system.fastestGame.name}{" "}
			about {system.fastestGame.getTimesPerHour()}{" "}
			times per hour.
		</p>;
	}
}
