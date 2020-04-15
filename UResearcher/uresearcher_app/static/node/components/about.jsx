import React from "react";
import ReactDOM from "react-dom";
import Markdown from 'react-markdown'

import Menu from "./menu"


class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: ""}
    }

    getReadme(){
        fetch("//raw.githubusercontent.com/printfer/UResearcher/master/README.md")
            .then((r) => r.text())
            .then(text  => {
                this.setState({data: text,})
            })  
    } 
    componentDidMount(){
        this.getReadme();
    }

    render() {

        return (
            <div className="container-fluid">

                {/* Menu */}
                <Menu />

                {/* Content */}
                <div className="container">
                    <h1>About</h1>
                    <Markdown source={this.state.data}/>
                </div>

            </div>
        );
    }
}

ReactDOM.render(
    <About />,
    document.getElementById("about")
);
