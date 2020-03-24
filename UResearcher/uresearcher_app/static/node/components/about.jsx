import React from "react";
import ReactDOM from "react-dom";

import Menu from "./menu"


class About extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div className="container-fluid">

                {/* Menu */}
                <Menu />

                {/* Content */}
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1 className="h1 mt-5 text-center ">About</h1>
                            <p>UResearcher is an invaluable application for researchers to reduce unnecessary searching while providing worthwhileoutlets. Some basic functions of UResearcher are organizing topics, Identifies knowledge using Latent KnowledgeAnalysis and other machine learning techniques to finding missing information, Analyzes and predicts trends for fruitfulresearch opportunities.</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <h1 className="h3">Github</h1>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <h1 className="h3">Q&A</h1>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <h1 className="h3">Feedback</h1>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

ReactDOM.render(
    <About />,
    document.getElementById("about")
);
