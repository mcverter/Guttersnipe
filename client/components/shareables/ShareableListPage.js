import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as shareableActions from '../../actions/shareableActions';
import ShareableLI from './ShareableLI';
import {browserHistory} from 'react-router';
import {fetchAllShareables} from '../../actions/shareableActions';


class ShareableListPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.fetchAllShareables();
    }

    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }

    render() {
        const {shareables} = this.props;
        const {isFetchingShareables, shareableFetchError,
            items, selectedIndex} = shareables;
        if (isFetchingShareables || !items || items.length < 1) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h1> Shareables </h1>
                <h2> Sort by  Distance Type Name </h2>
      {items.map(shareable=>(
          <ShareableLI key={shareable.id} shareable={shareable} />
      ))}

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

export default connect(mapStateToProps, {fetchAllShareables})(ShareableListPage);
