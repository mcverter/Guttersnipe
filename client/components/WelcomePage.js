import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const WelcomePage = (props) => (
  <div className="welcome-pg">
    <h2> Welcome to Guttersnipe, {props.username} </h2>
    <div> <Link to="/shareables"> Shareable List</Link></div>
    <div><Link to="/shareables/create"> Create Shareable </Link></div>
  </div>
);

function mapStateToProps(state){
  return {username:state.auth.username};
}
export default connect(mapStateToProps) (WelcomePage);
