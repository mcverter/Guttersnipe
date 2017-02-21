import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';


import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';


const Header = ({authenticated}) => {
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
    <Navbar className="gs-navbar">
      <Navbar.Header>
        <Navbar.Brand>
          <LinkContainer to="/" className="navbar-brand ">
            <NavItem eventKey={5} title="Home Page">Guttersnipe</NavItem>
          </LinkContainer>
        </Navbar.Brand>
      </Navbar.Header>
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
