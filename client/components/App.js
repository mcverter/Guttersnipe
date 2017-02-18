import React, {PropTypes} from 'react';
import Footer from './common/Footer';
import Header from './common/Header';

const App = (props) => (
  <div className="container-fluid entireDisplay">
    <Header  />
    {props.children}
    <Footer />
  </div>
);

App.propTypes = {
  children: PropTypes.object
};

export default App;
