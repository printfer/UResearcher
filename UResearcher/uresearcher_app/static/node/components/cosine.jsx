import React from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Loading from "./loading";
import { Card } from "@material-ui/core";

export default class Cosine extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			list: [],
			listLoaded: true,
			value: ""
		}
	}

	getCosineList() {
		this.setState({listLoaded: false});

		// does an ajax call to get the data using the query in the url
		fetch("/cosine/" + window.location.search.substr(7) + "/" + this.state.value)
			.then(res => res.json())
			.then((result) => {
				this.setState({ 
					list: result['word_list'],
					listLoaded: true
				});
			});
	}

	render() {
		return (
			<div className={this.props.show ? "" : "hidden"}>
				<h5 className="mb-2">Get The Most Similar Words To:</h5>
				<div className="mb-3">
					<Autocomplete
						onInputChange={(event, val) => this.setState({ value: val })}
						options={this.props.vocab}
						renderInput={params => (
							<TextField {...params} label="Target Word" margin="normal" variant="outlined" fullWidth />
						)}
					/>
					<button className="btn btn-primary" onClick={() => this.getCosineList()}>Analyze</button>
				</div>
				<Loading show={!this.state.listLoaded}/>
				<div className={this.state.list.length > 0 ? "row d-flex justify-content-center align-items-center" : "hidden"}>
					<Card className="col-8 p-0">
						<table className="table table-striped m-0">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">Phrase</th>
									<th scope="col">Similarity</th>
								</tr>
							</thead>
							<tbody>
								{this.state.list.map((phrase, idx) => (
									<tr key={idx}>
										<th scope="row">{idx + 1}</th>
										<td>{phrase[0]}</td>
										<td>{phrase[1]}</td>
									</tr>
								))}
							</tbody>
						</table>
					</Card>
				</div>
			</div>
		)
	}
}