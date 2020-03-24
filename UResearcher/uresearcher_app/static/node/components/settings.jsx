import React from "react";
import ReactDOM from "react-dom";

import Menu from "./menu"


class Settings extends React.Component {
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
                            <h1 className="h1 mt-5 text-center ">Settings</h1>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <h1 className="h3"><a href="/db">Database Manager</a></h1>
                        </div>
                    </div>

                </div>


            </div>
        );
    }
}

ReactDOM.render(
    <Settings />,
    document.getElementById("settings")
);
