import React from 'react';
import { useState,useEffect } from "react";
import {Navbar,Nav,NavDropdown,Container} from 'react-bootstrap';
import {BsBrush} from "react-icons/bs"
import { useNavigate } from "react-router-dom";
function NavAuth(props)
{
  const navigate = useNavigate();

  function logout()
  {
    localStorage.clear();
    navigate("/")
  }

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
      <Nav.Link onClick={logout}>Logout</Nav.Link>
    </Nav>)
  }
}

export default NavAuth;