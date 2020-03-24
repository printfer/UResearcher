import React from "react";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TSNE from "./tsne"
import Cosine from "./cosine"
import PhraseConnections from "./phrases"
import Analogies from "./analogies"
import { Divider } from "@material-ui/core";

export default class LKA extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedTab: 0,
		};
	}

	render() {
		return (
			<div className={this.props.show ? "col p-0" : "hidden"}>
				<Tabs
					value={this.state.selectedTab}
					onChange={(event, newValue) => this.setState({ selectedTab: newValue })}
					variant="fullWidth"
					indicatorColor="primary"
					textColor="primary"
				>
					<Tab label="Keyword Projection" />
					<Tab label="Cosine Similarity" />
					<Tab label="Phrase Connections" />
					<Tab label="Analogies" />
				</Tabs>
				<Divider />

				<div className="p-3">
					<TSNE 
						show={this.state.selectedTab == 0} 
						data={this.props.tsneData} 
						labels={this.props.tsneLabels} 
						tsneLoaded={this.props.tsneLoaded}
						// vocab={this.props.tsneLabels}
					/>
					<Cosine show={this.state.selectedTab == 1} vocab={this.props.vocab} />
					<PhraseConnections show={this.state.selectedTab == 2} vocab={this.props.vocab} />
					<Analogies show={this.state.selectedTab == 3} />
				</div>
			</div>
		)
	}
}