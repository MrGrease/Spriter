import React from 'react';
import {Navbar,Nav,NavDropdown,Container} from 'react-bootstrap';
import {BsBrush} from "react-icons/bs"
function SNavbar()
{
    return (<Navbar className="navbar-dark" bg="primary" expand="lg">
    <Container>
      <Navbar.Brand href="#home"><BsBrush/> Spriter</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Login</Nav.Link>
          <Nav.Link href="#link">Register</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>);
}

export default SNavbar;