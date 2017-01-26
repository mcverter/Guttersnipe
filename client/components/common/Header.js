import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';


const Header = (props) => {
  const {user} = props;

  return (
    <Navbar className="gs-navbar" justified="true" bsStyle="tabs" activeKey="1">
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/" className="navbar-brand">Guttersnipe</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
        <NavItem eventKey={1} title="Sign In">Sign In</NavItem>
      </Nav>
    </Navbar>
  );
}

Header.propTypes = {
  user: PropTypes.object
};

export default Header;
