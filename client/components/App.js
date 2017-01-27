import React, {PropTypes} from 'react';
import Footer from './common/Footer';
import Header from './common/Header';

const App = (props) => (
  <div className="container-fluid">
    <Header />
    {this.props.children}
    <Footer />
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
