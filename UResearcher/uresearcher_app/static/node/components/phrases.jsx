import React from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ForceGraph2D from 'react-force-graph-2d';

import Loading from "./loading";
import { Card } from "@material-ui/core";

export default class PhraseConnections extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			primaryVal: "",
			numTertiary: 1,
			tertVals: [],
			tertConns: [""],
			clusters: { nodes: [], links: [] },
			clustersLoaded: true
		}
	}

	evaluate() {
		this.setState({clustersLoaded: false});

		var config = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				main_phrase: this.state.primaryVal,
				tert_phrases: this.state.tertVals,
				connections: this.state.tertConns.map((val) => parseInt(val))
			})
		}

		fetch("/phrase", config)
			.then(res => res.json())
			.then((result) => {
				this.setState({ 
					clusters: result['clusters'],
					clustersLoaded: true
				});
			});
	}

	addTertPhrase() {
		this.setState({numTertiary: this.state.numTertiary + 1})
	}

	delTertPhrase() {
		if (this.state.numTertiary > 1)
			this.setState({numTertiary: this.state.numTertiary - 1})
	}

	setTertPhrase(val, i) {
		var newTerts = this.state.tertVals;
		newTerts[i] = val;
		this.setState({tertVals: newTerts});
	}

	setTertConnection(val, i) {
		var newTerts = this.state.tertConns;
		newTerts[i] = val;
		this.setState({tertConns: newTerts});
	}

	render() {
		return (
			<div className={this.props.show ? "" : "hidden"}>
				<div className="row mb-3">
					<div className="col">
						<div className="card">
							<div className="card-body">
								This generates a diagram showing <strong>connecting ideas</strong> between a <strong>main topic</strong> and <strong>related topics</strong>.
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-7 justify-content-center align-items-center">
						<Card>
							<Loading show={!this.state.clustersLoaded}/>
							<ForceGraph2D
								className={this.state.clustersLoaded ? "" : "hidden"}
								graphData={this.state.clusters}
								nodeCanvasObject={(node, ctx, globalScale) => {
									const label = node.id;
									const fontSize = 12 / globalScale;
									ctx.font = `${fontSize}px Sans-Serif`;
									const textWidth = ctx.measureText(label).width;
									const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
									ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
									ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
									ctx.textAlign = 'center';
									ctx.textBaseline = 'middle';
									ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
									ctx.fillText(label, node.x, node.y);
								}}
								nodeLabel=''// no node label
								height={500}
								width={800}
							/>
						</Card>
					</div>
					<div className="col-5">
						{/* <div className="row">
							<div className="col">
								<label htmlFor="primary-phrase" className="mb-0"><h5>Primary Topic:</h5></label>
							</div>
						</div> */}
						<div className="row mb-3">
							<div className="col">
								<Autocomplete
									onInputChange={(event, val) => this.setState({ primaryVal: val })}
									options={this.props.vocab}
									renderInput={params => (
										<TextField {...params} label="Primary Topic" margin="normal" variant="outlined" fullWidth />
									)}
								/>
							</div>
						</div>
						{/* <div className="row">
							<div className="col">
								<label className="mb-0"><h5>Related Topics:</h5></label>
							</div>
						</div> */}
						<div id="tertiary-col">
							{[...Array(this.state.numTertiary)].map((val, idx) =>
								<div key={idx} className="tertiary-row">
									<div className="row mb-1">
										<div className="col">
											<Autocomplete
												onInputChange={(event, val) => this.setTertPhrase(val, idx)}
												options={this.props.vocab}
												renderInput={params => (
													<TextField {...params} label="Related Topic" margin="normal" variant="outlined" fullWidth />
												)}
											/>
										</div>
									</div>
									<div className="row mb-3">
										<div className="col">
											<label>Connections: </label>
										</div>
										<div className="col">
											<input type="number" min="1" className="form-control connections" value={this.state.tertConns[idx]} onChange={(e) => (this.setTertConnection(e.target.value, idx))} />
										</div>
									</div>
								</div>
							)}

						</div>
						<div className="row">
							<div className="col">
								<button className="btn btn-dark" onClick={() => this.evaluate()}>Evaluate</button>
							</div>
							<div className="col">
								<a className="phrase-connections-btn ml-2" onClick={() => this.addTertPhrase()}><i className="far fa-plus-square"></i></a>
								<a className="phrase-connections-btn" onClick={() => this.delTertPhrase()}><i className="far fa-minus-square"></i></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}