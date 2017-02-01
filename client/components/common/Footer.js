import React, {PropTypes} from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

const Footer = (props) => (
  <Navbar className="gs-navbar">
    <Nav  role="navigation">
      <LinkContainer to="/docs/faq" className="navbar-brand ">
        <NavItem eventKey="1" title="FAQ">FAQ</NavItem>
      </LinkContainer>
      <LinkContainer to="/docs/documentation"  className="navbar-brand ">
        <NavItem eventKey="2"  title="documentation">Docs</NavItem>
      </LinkContainer>
      <LinkContainer to="/docs/illlegal"  className="navbar-brand ">
        <NavItem eventKey="3" title="illlegal">L@W</NavItem>
      </LinkContainer>
      <LinkContainer to="/docs/contact"  className="navbar-brand ">
        <NavItem eventKey="4" title="FAQ">
          <span className="glyphicon glyphicon-envelope" aria-hidden="true" /></NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
);


Footer.propTypes = {
  user: PropTypes.object
};

export default Footer;

