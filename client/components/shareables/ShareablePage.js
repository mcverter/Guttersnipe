import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as shareableActions from '../../actions/shareableActions';
import ShareableFull from './ShareableFull';
import {browserHistory} from 'react-router';
import {fetchSingleShareableIfNeeded} from '../../actions/shareableActions';


class ShareablePage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.fetchSingleShareableIfNeeded(this.props.params.id);
    }

    render() {
        if (!this.props.shareableItems || this.props.selectedIndex < 1) {
            return <div>Loading...</div>;
        }

        const shareable = _.find(this.props.shareableItems,
            {id: this.props.selectedIndex})

        if (!shareable) {
            return <div>Loading...</div>;
        }


                if (this.props.isFetchingShareables) {
            return <div>Loading...</div>;
        }

       return (
            <ShareableFull shareable={shareable} />
        );
    }
}

ShareablePage.propTypes = {
};

function mapStateToProps(state, ownProps) {
    return {
        shareableItems: state.shareables.items,
        selectedIndex: state.shareables.selectedIndex,
        isFetchingShareables: state.shareables.isFetchingShareables
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(shareableActions, dispatch)
    };
}

export default connect(mapStateToProps, {fetchSingleShareableIfNeeded})(ShareablePage);


