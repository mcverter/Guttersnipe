import React, {PropTypes} from 'react';

import {connect} from 'react-redux';
import {fetchAllShareables} from '../../actions/shareableActions';

import ShareableLI from './ShareableLI';



class ShareableListPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchAllShareables();
  }

  render() {
    const { shareables: {isFetchingShareables,
      shareableFetchError, items, selectedIndex} }  = this.props;


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

function mapStateToProps(state) {
  return {
    shareables: state.shareables
  };
}

export default connect(mapStateToProps, {fetchAllShareables})(ShareableListPage);
