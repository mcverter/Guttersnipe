import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

const Footer = (props) => (
  <Navbar className="gs-navbar">
    <Nav justified="true"  role="navigation"
         bsStyle="tabs" activeKey="1">
      <NavItem eventKey="1" href="/home" title="FAQ">
        <Link to="/docs/faq" className="navbar-brand ">FAQ</Link></NavItem>
      <NavItem eventKey="2" href="/home" title="FAQ">
        <Link to="/docs/documentation"  className="navbar-brand ">Docs</Link></NavItem>
      <NavItem eventKey="3" href="/home" title="FAQ">
        <Link to="/docs/illlegal"  className="navbar-brand ">L@W</Link></NavItem>
      <NavItem eventKey="4" href="/home" title="FAQ">
        <Link to="/docs/contact"  className="navbar-brand ">
          <span className="glyphicon glyphicon-envelope" aria-hidden="true" /></Link>
      </NavItem>
    </Nav>
  </Navbar>
);


Footer.propTypes = {
  user: PropTypes.object
};

export default Footer;

