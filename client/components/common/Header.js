import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import {Link} from 'react-router';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import imgsrc from '../../img/guttersnipeSwaggerSmall.png';


export const Header = ({authenticated}) => {
  const renderAuthLinks = () => {
    if (authenticated) {
      return (
        <LinkContainer to="/auth/signout" className="header navbar-brand ">
          <NavItem eventKey={3} title="Sign Out">Sign Out</NavItem>
        </LinkContainer>
      );
    } else {
      return (
        <NavDropdown title="Signin" id="basic nav-dropdown">
          <LinkContainer to="/auth/signin" className="navbar-brand ">
            <NavItem eventKey={1} title="Sign Up">Sign In</NavItem>
          </LinkContainer>
          <LinkContainer to="/auth/signup" className="navbar-brand ">
            <NavItem eventKey={2} title="Sign Up">Sign Up</NavItem>
          </LinkContainer>
        </NavDropdown>
      );
    }
  };

  return (
    <Navbar className="">
      <Link to="/" >
          <img className="logo-img" src={imgsrc} />
      </Link>



      <Nav pullRight>
        {renderAuthLinks()}
      </Nav>
    </Navbar>
  );
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

Header.propTypes = {
  authenticated: PropTypes.bool
};


export default connect(mapStateToProps) (Header);
/*
 <Nav pullLeft>
 <Navbar.Brand pullLeft>
 <LinkContainer to="/" className="navbar-brand ">
 <NavItem eventKey={5} title="Home Page">
 <span className="logo-img"><img className="logo-img" src={imgsrc} /></span>
 </NavItem>
 </LinkContainer>
 </Navbar.Brand>
 </Nav>
 */
