import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import Navbar from 'react-bootstrap/lib/Navbar';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';


import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';


const Header = (props) => {
  const {user} = props;

  return (
    <Navbar className="gs-navbar">
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/" className="navbar-brand">Guttersnipe</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
        <NavDropdown eventKey={3} title="Signin" id="basic nav-dropdown">
          <MenuItem eventKey={1} title="Sign In">Sign In</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};

Header.propTypes = {
  user: PropTypes.object
};

export default Header;
