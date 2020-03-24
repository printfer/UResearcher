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
						<h5 className="card-title">Summary</h5>
						<p className="card-text">This would be a summary of the search. Apparently it would be a good idea to come up with any kind of algorithmic summary we can. That will go here.</p>
					</div>
				</div>
			</div>
		)
	}
}