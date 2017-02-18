import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import ShareableLI from '../ShareableLI';
import Table from 'react-bootstrap/lib/Table';

const AllShareablesListPage = (props) => {
  const { shareables: {isFetchingShareables, items}} = props;

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
};

AllShareablesListPage.propTypes = {
  shareables: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    shareables: state.shareables
  };
}

export default connect(mapStateToProps)(AllShareablesListPage);
