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

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  render() {
    const {shareables} = this.props;
    return (
      <div>
                  <h1>Shareables</h1>

      {shareables.map(shareable=>(
          <ShareableLI key={shareable.id} shareable={shareable} />
      ))}
      </div>
    );
  }
}

ShareableListPage.propTypes = {
  shareables: PropTypes.array.isRequired,
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
