import React from "react";
import ReactDOM from "react-dom";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';


import Menu from "./menu"


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

        const jumbotronStyle= {
            backgroundColor: "inherit",
        };

        const pageScroll = ()=> {
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
                                                    <input id="search_bar" className="search_input form-control rounded-pill border-dark bg-dark text-light pl-4 pr-5" type="search" placeholder="Search..." value={this.state.value} onChange={this.handleChange} />
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
                    <div className="mt-4 row justify-content-center align-items-center">
                        <IconButton
                            color="inherit"
                            onClick={pageScroll}
                        >
                            <ExpandMoreIcon fontSize="large"/>
                        </IconButton>
                    </div>

                </div>


                {/* Our Story */}
                <div className="jumbotron jumbotron-fluid" style={jumbotronStyle}>
                <div className="container text-center">
                    <h5 className="">Our Story</h5>
                    <h1 className="mb-4">Why did we create UResearcher?</h1>
                    <p className="">Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text</p>
                </div>
                </div>


                {/* Our Story */}
                <div className="jumbotron jumbotron-fluid">
                <div className="container text-center">
                    <h5 className="">Our Story</h5>
                    <h1 className="mb-4">Why did we create UResearcher?</h1>
                    <p className="">Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text</p>
                </div>
                </div>

                {/* Function Intro */}
                <div className="container text-center">
                    <h1 className="mb-4">Our Functions</h1>

                    <div className="card-deck">
                        <div className="card">
                            <div className="card-body">
                                <i className="fas fa-project-diagram fa-3x m-3"></i>
                                <h5 className="card-title">Clusters</h5>
                                <p className="card-text">Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <i className="fas fa-money-check-alt fa-3x m-3"></i>
                                <h5 className="card-title">Grant Trends</h5>
                                <p className="card-text">Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <i className="fas fa-chart-bar fa-3x m-3"></i>
                                <h5 className="card-title">Keyword Trends</h5>
                                <p className="card-text">Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text</p>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <i className="fas fa-brain fa-3x m-3"></i>
                                <h5 className="card-title">Latent Knowledge</h5>
                                <p className="card-text">Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text Replace this text</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="mt-4 row justify-content-center align-items-center">
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById("index")
);
