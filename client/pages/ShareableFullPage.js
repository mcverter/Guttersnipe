import _ from 'lodash';
import React, {PropTypes} from 'react';

import {connect} from 'react-redux';
import {fetchSingleShareableIfNeeded} from '../actions/shareables/shareableActions';
import ShareableFull from '../components/shareables/ShareableMobileFull';


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
      {id: this.props.selectedIndex});

    if (!shareable) {
      return <div>Loading...</div>;
    }

    if (this.props.isFetchingShareables) {
      return <div>Loading...</div>;
    }

    return (
      <ShareableFull id="shareable-full-page" shareable={shareable} />
    );
  }
}

ShareablePage.propTypes = {
  fetchSingleShareableIfNeeded: PropTypes.func,
  params: PropTypes.object,
  shareableItems: PropTypes.array,
  selectedIndex: PropTypes.number,
  isFetchingShareables: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    shareableItems: state.shareables.items,
    selectedIndex: state.shareables.selectedIndex,
    isFetchingShareables: state.shareables.isFetchingShareables
  };
}

export default connect(mapStateToProps, {fetchSingleShareableIfNeeded})(ShareablePage);
