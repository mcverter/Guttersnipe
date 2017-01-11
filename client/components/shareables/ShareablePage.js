import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as shareableActions from '../../actions/shareableActions';
import ShareableLI from './ShareableLI';
import {browserHistory} from 'react-router';
import {fetchOneShareable} from '../../actions/shareableActions';


class ShareableListPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        console.log("about to mount");
        this.props.fetchOneShareable(this.props.params.id);
    }

    render() {
        let selectedShareableIdx = this.props.params.id
        const {shareable} = this.props;
        if (!shareable) {
            return <div>Loading... {selectedShareableIdx}
            </div>;
        }

       /*         const {isFetchingShareables, shareableFetchError,
            items, selectedShareable} = shareables;
         if (isFetchingShareables || !items || items.length < 1)
        console.log("Shareables", shareables);
*/
        return (
            <ShareableFull shareable={shareable} />
        );
    }
}

ShareableListPage.propTypes = {
};

function mapStateToProps(state, ownProps) {
    return {
        selectedShareableIdx: state.selectedShareableIdx
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(shareableActions, dispatch)
    };
}

export default connect(mapStateToProps, {fetchOneShareable})(ShareableListPage);


