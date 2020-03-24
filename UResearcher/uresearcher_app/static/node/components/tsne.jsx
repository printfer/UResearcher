import React from "react";
import { XYPlot, MarkSeries, Hint } from 'react-vis';

import Loading from "./loading";
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

export default class TSNE extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			hoverValue: false,
			hoverLabel: "",
			value: "",
			searchedValues: []
		}
	}

	findWords() {
		// gets words from MuiChips in the autocomplete
		var words = [...document.getElementsByClassName("MuiChip-label")].map((el) => el.textContent);
		// maps words to a list of indices in this.props.labels
		words = words.map((word) => this.props.labels.indexOf(word));
		// final conversion of word into 2d coordinates from this.props.data
		words = words.map((w, i) => this.props.data[i]);

		this.setState({searchedValues: words});
	}

	render() {
		return (
			<div className={this.props.show ? "" : "hidden"}>
				<Loading show={!this.props.tsneLoaded} />
				<div className={this.props.tsneLoaded ? "d-flex flex-column justify-content-center" : "hidden"}>
					<Card className="mb-3">
						<XYPlot height={500} width={1000} onMouseLeave={() => this.setState({hoverValue: false})}>
							<MarkSeries 
								data={this.props.data}
								onNearestXY={(val, info) => this.setState({hoverValue: val, hoverLabel: this.props.labels[info['index']]})}
							/>
							<MarkSeries 
								color="orange"
								data={this.state.searchedValues}
							/>
							{this.state.hoverValue ? <Hint value={this.state.hoverValue}>
								<div className="tsne-hint">
									{this.state.hoverLabel}
								</div>
							</Hint> : null}
						</XYPlot>
					</Card>
					<Card>
						<CardContent className="pb-0">
							<h5 className="mb-0">Find Some Words:</h5>
							<div className="mb-3">
								<Autocomplete
									multiple
									disableCloseOnSelect
									onInputChange={(event, val) => this.setState({ value: val })}
									options={this.props.labels}
									renderOption={(option, { selected }) => (
										<React.Fragment>
										  <Checkbox
											icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
											checkedIcon={<CheckBoxIcon fontSize="small" />}
											style={{ marginRight: 8 }}
											checked={selected}
										  />
										  {option}
										</React.Fragment>
									  )}
									renderInput={params => (
										<TextField {...params} label="Target Word(s)" margin="normal" variant="outlined" fullWidth />
									)}
								/>
								<button className="btn btn-primary" onClick={() => this.findWords()}>Find</button>
							</div>
						</CardContent>
					</Card>
				</div>
				
				{/* <div className="card">
					<div className="card-body">
						This is a 2D projection of all the most important words found in your search results. Mouse over the graph to see which ones share similar contexts.
					</div>
				</div> */}
			</div>
		)
	}
}