import React, {PropTypes} from 'react';

const App = (props) => (
  <div id="app" className="container-fluid">
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.object
};

export default App;
