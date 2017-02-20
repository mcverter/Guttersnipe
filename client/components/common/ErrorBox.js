import React from 'react';

export default ({msg}) => (
  <div>
    {msg &&
    <div className="alert alert-danger">
      <strong>Oops!</strong> {msg}
    </div>}
  </div>
);
