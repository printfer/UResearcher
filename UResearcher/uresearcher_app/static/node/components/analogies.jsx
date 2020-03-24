import React from "react";

import Loading from "./loading";

export default class Analogies extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			list: [],
			value1: "",
			value2: "",
			value3: ""
		}
	}

	getAnalogy(word) {
		// does an ajax call to get the data using the query in the url
		fetch("/analogy/" + window.location.search.substr(7) + "/" + this.state.value1 + "/" + this.state.value2 + "/" + this.state.value3)
			.then(res => res.json())
			.then((result) => {
				this.setState({ 
					list: result['word_list']
				});
			});
	}

	render() {
		return (
			<div className={this.props.show ? "" : "hidden"}>
				<div className="row mb-3">
					<div className="col">
						<div className="card">
							<div className="card-body">
								Performs math on the underlying word embeddings to produce a result that resembles an analogy.
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col d-flex p-1 align-items-center">
						<input type="text" className="form-control form-control-sm vocab_autocomplete" id="analogy_one" placeholder="Iron" value={this.state.value1} onChange={(event) => this.setState({value1: event.target.value})} />
						<h6 className="ml-2">-</h6>
					</div>
					<div className="col d-flex p-1 align-items-center">
						<input type="text" className="form-control form-control-sm vocab_autocomplete" id="analogy_two" placeholder="Fe" value={this.state.value2} onChange={(event) => this.setState({value2: event.target.value})} />
						<h6 className="ml-2">+</h6>
					</div>
					<div className="col d-flex p-1 align-items-center">
						<input type="text" className="form-control form-control-sm vocab_autocomplete" id="analogy_three" placeholder="He" value={this.state.value3} onChange={(event) => this.setState({value3: event.target.value})} />
						<h6 className="ml-2">=</h6>
					</div>
					<div className="col d-flex p-1 align-items-center">
						<input type="text" readOnly className="form-control form-control-sm vocab_autocomplete" id="analogy_four" placeholder="Helium" />
					</div>
				</div>
				<div className="row">
					<button type="submit" className="btn btn-primary btn-sm m-2" onClick={() => this.getAnalogy()}>Calculate</button>
				</div>
				<div className="row">
					<table className="table table-striped">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Phrase</th>
								<th scope="col">Accuracy</th>
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
				</div>
			</div>
		)
	}
}