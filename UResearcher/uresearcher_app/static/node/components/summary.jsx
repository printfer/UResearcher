import React from "react";

export default class Summary extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={this.props.show ? 'col' : 'hidden'}>
				<div className="card">
					<div className="card-body">
						<h3 className="card-title">Summary</h3>
						<h5 className="card-title">An auto-generated summary of the current articles from this search.</h5>
						<p className="card-text">{this.props.summary}</p>
					</div>
				</div>
			</div>
		)
	}
}