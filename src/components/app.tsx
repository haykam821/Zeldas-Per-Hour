import { DataView } from "./data-view";
import React from "react";
import { log } from "../util/debug";
import styled from "styled-components";

interface AppProps {
	className?: string;
}

class AppUnstyled extends React.Component<AppProps> {
	render() {
		return <div className={this.props.className}>
			<h1>Zeldas Per Hour</h1>
			<p>
				This fun tool shows how many Zeldas can be played on a given Nintendo console per hour.
				This is calculated by 1 hour / (the fastest any% time for a console&apos;s Zelda game).
				If a console has multiple Zelda games, the fastest will be used.
			</p>

			<DataView />

			<p>
				<a href="https://github.com/haykam821/Zeldas-Per-Hour">GitHub repo</a>
			</p>
		</div>;
	}

	componentDidMount() {
		log("rendered app");
	}
}

export const App = styled(AppUnstyled)`
	font-family: sans-serif;

	${DataView} {
		border: 1px solid black;
		padding: 8px;
	}
`;
