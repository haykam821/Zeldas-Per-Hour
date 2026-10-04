import React from "react";
import styled from "styled-components";

import { SYSTEMS } from "../util/system";
import { DataRow } from "./data-row";

interface DataViewProps {
	className?: string;
}

class DataViewUnstyled extends React.Component<DataViewProps, unknown> {
	render() {
		return <div className={this.props.className}>
			{SYSTEMS.map(system => {
				return <DataRow key={system.id} system={system} />;
			})}
		</div>;
	}
}

export const DataView = styled(DataViewUnstyled)``;
