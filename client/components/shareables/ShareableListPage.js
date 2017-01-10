import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as shareableActions from '../../actions/shareableActions';
import Shareable from './ShareableFull';
import {browserHistory} from 'react-router';

class ShareableListPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        console.log("about to mount");
    }

    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }

    render() {
        const {shareables} = this.props;
        const {isFetchingShareables, shareableFetchError,
            items, selectedShareable} = shareables;
        console.log("Shareables", shareables);
        if (isFetchingShareables || !items || items.length < 1) {
            return <div>Loading...</div>;
        }

        return (
            <div>
      {items.map(shareable=>(
          <Shareable key={shareable.id} shareable={shareable} />
      ))}
                <h1>Shareables</h1>
            </div>
        );
    }
}

ShareableListPage.propTypes = {
    shareables: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        shareables: state.shareables
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(shareableActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareableListPage);
