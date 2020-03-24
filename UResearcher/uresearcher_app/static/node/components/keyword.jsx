import React from "react";
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, MarkSeries, DiscreteColorLegend } from "react-vis/dist";

export default class Keyword extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// does an ajax call to get the tsne data using the current search
		// fetch("/keyword")
		// 	.then(res => res.json())
		// 	.then((result) => {
		// 		this.setState({ 
		// 			data: result['data'],
		// 			labels: result['labels'],
		// 		});
		// 	});
	}

	render() {
		return (
			<div className={this.props.show ? 'col' : 'hidden'}>
				<div className="card">
					<XYPlot
						width={1000}
						height={600}
						margin={{ left: 80, right: 10, top: 10, bottom: 60 }}
					>
						<HorizontalGridLines />
						<VerticalGridLines />
						<XAxis title="Date" tickLabelAngle={-45} />
						<YAxis />
						{this.props.data.map((keyword, idx) => (
							<MarkSeries key={idx} data={keyword} />
						))}
						
					</XYPlot>
					<DiscreteColorLegend items={this.props.labels.map((label, i) => ({title: label}))} />
				</div>
			</div>
		)
	}
}