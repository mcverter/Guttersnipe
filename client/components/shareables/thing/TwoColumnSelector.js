/**
 * Created by mitchell on 1/16/2017.
 */
import React, {Component, PropTypes} from 'react';
class TwoColumnSelector extends Component{
    constructor (props) {
        super(props);
        let {choices} = props;
        this.unchosen = choices;
        this.chosen = []
    }

    onClick() {
    }

    render() {
        return <div></div>;
    }
}

TwoColumnSelector.propTypes = {
    choices: PropTypes.array
}