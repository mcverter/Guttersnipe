import React, {PropTypes} from 'react';

import {connect} from 'react-redux';
import {fetchAllShareables} from '../../../actions/shareables/shareableActions';

import ShareableLI from '../../shareables/ShareableLI';
import Table from 'react-bootstrap/lib/Table';



class AllShareablesListPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
//    this.props.fetchAllShareables();
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
        <h2>View Map</h2>
        <h2> View Calendar </h2>
        <Table striped bordered>
          <thead>
          <tr>
            <th>Headline</th>
            <th>Thing</th>
            <th>Space</th>
            <th>Time</th>
            <th>Rating</th>
            <th>Full Record</th>
          </tr>
          </thead>
          <tbody>
          {items.map(shareable=>(
            <ShareableLI key={shareable.id} shareable={shareable} />
          ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

AllShareablesListPage.propTypes = {
  shareables: PropTypes.object.isRequired,
  fetchAllShareables: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    shareables: state.shareables
  };
}

export default connect(mapStateToProps, {fetchAllShareables})(AllShareablesListPage);
