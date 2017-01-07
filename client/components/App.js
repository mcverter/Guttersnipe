import React, {PropTypes} from 'react';
//import Footer from './common/Footer';
import Header from './common/Header'
class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
