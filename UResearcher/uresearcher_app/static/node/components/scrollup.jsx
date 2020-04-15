import React from "react";
import { render } from 'react-dom';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Fab from '@material-ui/core/Fab';


export default class ScrollUpButton extends React.Component {
    constructor() {
        super();

        this.state = {
            intervalId: 0,
            isTop: true,
        };
    }

    componentDidMount() {
        document.addEventListener('scroll', () => {
            const isTop = window.scrollY < 100;
            if (isTop !== this.state.isTop) {
                this.setState({ isTop })
            }
        });
    }

    scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    }

    scrollToTop() {
        let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
        this.setState({ intervalId: intervalId });
    }

    render () {
        const scrollStyle={
            position: "fixed",
            bottom: "20px",
            right: "20px"
        };

        const topStyle={
            display : "none"
        };

        return (
            <div>
                <Fab 
                    style= {this.state.isTop ? topStyle : scrollStyle}
                    aria-label="add"
                    onClick={() => { this.scrollToTop();}}
                >
                    <ExpandLessIcon/>
                </Fab>
            </div>
        );
    }
} 

