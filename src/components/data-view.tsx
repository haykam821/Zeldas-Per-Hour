import { DataRow } from "./data-row";
import React from "react";
import { SYSTEMS } from "../util/system";
import styled from "styled-components";

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
