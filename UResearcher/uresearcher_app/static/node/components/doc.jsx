import React from "react";
import ReactDOM from "react-dom";
import Markdown from 'react-markdown'

import Menu from "./menu"


class Doc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: ""}
    }

    getDoc(){
        fetch("https://raw.githubusercontent.com/printfer/UResearcher/master/doc/README.md")
            .then((r) => r.text())
            .then(text  => {
                this.setState({data: text})
            })  
    } 
    componentDidMount(){
        this.getDoc();
    }

    render() {

        return (
            <div className="container-fluid">

                {/* Menu */}
                <Menu />

                {/* Content */}
                <div className="container mt-4">
                    <Markdown source={this.state.data}/>
                </div>

            </div>
        );
    }
}

ReactDOM.render(
    <Doc />,
    document.getElementById("doc")
);
