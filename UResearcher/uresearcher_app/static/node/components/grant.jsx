import React from "react";
import { Card } from "@material-ui/core";
import { XYPlot, MarkSeries, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, DiscreteColorLegend } from 'react-vis';
import Loading from "./loading";

export default class Grant extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			grant_floors: Array(0),
			grant_ceilings: Array(0),
			grantsLoaded: false
		};
	}

	componentDidMount() {
		// does an ajax call to get the grant info using the query in the url
		fetch("/grant/" + window.location.search.substr(7))
			.then(res => res.json())
			.then((result) => {
				this.setState({
					grant_floors: result['floors'],
					grant_ceilings: result['ceilings'],
					grantsLoaded: true
				});
			});
	}

	render() {
		return (
			<div className={this.props.show ? 'col p-0' : 'hidden'}>
				<Card>
					<Loading show={!this.state.grantsLoaded} />
					<div className={this.state.grantsLoaded ? 'd-flex justify-content-center align-items-center' : 'hidden'}>
						<XYPlot
							width={1000}
							height={600}
							margin={{ left: 80, right: 10, top: 10, bottom: 60 }}
						>
							<XAxis title="Date" tickLabelAngle={-45} />
							<YAxis title="Total Grant Amount" tickFormat={(x) => (`${x / 1000000} mil`)} />
							<HorizontalGridLines />
							<VerticalGridLines />
							<LineSeries
								data={this.state.grant_floors}
								color="#ff1744"
							/>
							<LineSeries
								data={this.state.grant_ceilings}
								color="#4caf50"
							/>
						</XYPlot>
						<DiscreteColorLegend items={[{ title: 'Grant Floor Values', color: '#ff1744' }, { title: 'Grant Ceiling Values', color: '#4caf50' }]} />
					</div>
				</Card>
			</div>
		)
	}
}