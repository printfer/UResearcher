import React from "react";
import ReactDOM from "react-dom";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';

import LandingFragment from "./landingfragment";
import Menu from "./menu"
import ScrollUpButton from "./scrollup"



class Index extends React.Component {

	constructor(props) {
		super(props);

		this.state = { value: '' };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.search = this.search.bind(this);

		// if the user is on the search results page this sets the searchbar's value to the query
		if (window.location.search.startsWith("?query=")) {
			this.state.value = decodeURIComponent(window.location.search.substr(7));
		}
	}

	// resets the remembered tab
	componentDidMount() {
		fetch("/set_tab/" + "0");
	}

	// updates the searchbar value in the react state
	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	// probably only fires when the user hits enter
	handleSubmit(event) {
		event.preventDefault();
		this.search();
	}

	// redirects to the search results
	search() {
		window.location.href = "/search?query=" + this.state.value;
	}


	render() {
		const heroStyle = {
			minHeight: "calc(90vh - 150px)",
		};

		const subHeroStyle = {
			width: "20rem",
		};

		const jumbotronStyle = {
			backgroundColor: "inherit",
		};

		const pageScroll = () => {
			window.scrollBy({
				top: window.innerHeight,
				behavior: 'smooth'
			});
		};

		return (
			<div className="container-fluid p-0">

				{/* Menu */}
				<Menu />

				{/* Content */}

				<div className="jumbotron jumbotron-fluid" style={jumbotronStyle}>

					{/* Main Search */}
					<div className="container">
						<div className="row align-items-center justify-content-center" style={heroStyle}>
							<div className="col align-items-center" >
								<img src="static/images/UResearcher_magnifier.png" className="rounded mx-auto d-block mb-4 img-fluid" style={subHeroStyle} alt="UResearcher_LOGO" />
								<div className="row justify-content-center">
									<div className="col-9">

										<div className="row no-gutters justify-content-center align-items-center">
											<div className="col">
												<form onSubmit={this.handleSubmit}>
													<input id="search_bar" className="search_input form-control rounded-pill border-dark bg-dark text-light pl-4 pr-5" type="search" placeholder="Search..." value={this.state.value} onChange={this.handleChange} spellCheck="true"/>
												</form>
											</div>
											<div className="col-auto">
												<button className="search_button btn border-0 rounded-circle rounded-sm ml-n5 text-dark" type="button" onClick={this.search}>
													<i className="fa fa-search"></i>
												</button>
											</div>
										</div>

										<h6 className="text-muted mt-1 ml-3">Try a topic you would like to research further, e.g. <em>Gas Chromatography</em> or <em>Support Vector Machine</em></h6>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Expand More */}
					<div className="mt-4 d-flex justify-content-center">
						<IconButton
							color="inherit"
							onClick={pageScroll}
						>
							<ExpandMoreIcon fontSize="large" />
						</IconButton>
					</div>

				</div>


                {/* LandingFragment */}
				<LandingFragment />

                {/* ScrollUpButton */}
                <ScrollUpButton scrollStepInPx="50" delayInMs="16.66"/>

			</div>


		);
	}
}

ReactDOM.render(
	<Index />,
	document.getElementById("index")
);
