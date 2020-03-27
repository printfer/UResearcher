import React from "react";
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, SearchableDiscreteColorLegend, DiscreteColorLegend } from "react-vis/dist";

export default class Keyword extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchText: '',
			keywordsEnabled: Array(1000).fill(false) // the 1000 should be set dynamically but I can't find a good way to
		};
	}

	componentDidMount() {
		this.state.keywordsEnabled.fill(true, 0, 5);
	}

	// componentDidUpdate() {
	// 	if (this.state.keywordsEnabled.length == 0 && this.props.labels.length > 1) {
	// 		var temp = Array(this.props.labels.length).fill(true);
	// 		this.setState({keywordEnabled: temp});
	// 	}
	// }

	handleCheckboxChange(event, i) {
		var temp = this.state.keywordsEnabled;
		temp[i] = event.target.checked;
		this.setState({keywordEnabled: temp});
	}

	formatDate(unix_time) {
		var date = new Date(unix_time * 1000);
		var year = date.getFullYear();
		var month = date.getMonth();
		// var day = date.getDay();

		return month + "-" + year;
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
						<XAxis 
							title="Date" 
							tickLabelAngle={-45} 
							tickFormat={v => this.formatDate(v)}
						/>
						<YAxis title="Frequency" />
						{this.props.data.map((keyword, idx) => (
							this.state.keywordsEnabled[idx] ?
								<LineSeries key={idx} data={keyword} />
							:
								<LineSeries key={idx} data={[]} />
						))}
						
					</XYPlot>
					{/* <SearchableDiscreteColorLegend  */}
					<DiscreteColorLegend 
						items={this.props.labels.map((label, i) => 
							<span key={i}>
								<input 
									id={"cb-" + i}
									type="checkbox" 
									checked={this.state.keywordsEnabled[i]} 
									onChange={(event) => this.handleCheckboxChange(event, i)} 
								/>
								<label htmlFor={"cb-" + i}>{label}</label>
							</span>
						)}
						// onSearchChange={(text) => this.setState({searchText: text})}
						// searchText={this.state.searchText}
						// height={300}
					/>
				</div>
			</div>
		)
	}
}