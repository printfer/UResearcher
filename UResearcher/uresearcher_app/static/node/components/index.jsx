import React from "react";
import ReactDOM from "react-dom";

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

        return (
            <div className="container-fluid">

                {/* Menu */}
                <Menu />

                {/* Content */}

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
            </div>
        );
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById("index")
);
