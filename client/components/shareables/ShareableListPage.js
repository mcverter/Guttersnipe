import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ShareableLI from './ShareableLI';
import {browserHistory} from 'react-router';
import {fetchAllShareables} from '../../actions/shareableActions';


class ShareableListPage extends React.Component {
    constructor(props) {
        super(props);
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
                <table>
                    <tbody>
                  {items.map(shareable=>(
                      <ShareableLI key={shareable.id} shareable={shareable} />
                  ))}
                     </tbody>
                </table>
            </div>
        );
    }
}

ShareableListPage.propTypes = {
    shareables: PropTypes.object.isRequired,
    fetchAllShareables: PropTypes.func.isRequired

};

function mapStateToProps(state, ownProps) {
    return {
        shareables: state.shareables
    };
}

export default connect(mapStateToProps, {fetchAllShareables})(ShareableListPage);
