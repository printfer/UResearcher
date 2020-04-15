import React from "react";
import ReactDOM from "react-dom";

import LandingFragment from "./landingfragment";


class LandingPage extends React.Component {

    render() {
        return (
            <LandingFragment />
        );
    }
}

ReactDOM.render(
    <LandingPage />,
    document.getElementById("landing-page")
);
