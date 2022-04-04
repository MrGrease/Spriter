import React, { useEffect } from 'react';
import {Navbar,Nav,NavDropdown,Container} from 'react-bootstrap';
import {BsBrush} from "react-icons/bs"
function SNavbar()
{

  function auth()
  {
    if(!localStorage.getItem("authToken"))
    {
      return(        
      <Nav className="ms-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/register">Register</Nav.Link>
    </Nav>)
    }else
    {
      return(        
        <Nav className="ms-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/profile">Profile</Nav.Link>
      </Nav>)
    }
  }

    return (<Navbar className="navbar-dark" bg="primary" expand="lg">
    <Container>
      <Navbar.Brand href="/"><BsBrush/> Spriter</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      {auth()}
      </Navbar.Collapse>
    </Container>
  </Navbar>);
}

export default SNavbar;