import React from "react";

export default class Loading extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={this.props.show ? "d-flex justify-content-center p-3" : "hidden"}>
				<div className="spinner-border" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		)
	}
}