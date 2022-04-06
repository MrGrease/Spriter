import React from 'react';
import { useState,useEffect } from "react";
import {Navbar,Nav,NavDropdown,Container} from 'react-bootstrap';
import {BsBrush} from "react-icons/bs"
import NavAuth from "./navauth"
function SNavbar()
{
  const [authkey, setAuthKey] = useState(false);
  useEffect(() =>{
    if(localStorage.getItem("authToken"))
    {
      setAuthKey(true);
    }
    else
    {
      setAuthKey(false);
    }
  })

    return (<Navbar className="navbar-dark" bg="primary" expand="lg">
    <Container>
      <Navbar.Brand href="/"><BsBrush/> Spriter</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <NavAuth key={authkey}/>
      </Navbar.Collapse>
    </Container>
  </Navbar>);
}

export default SNavbar;