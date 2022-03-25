import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import './App.css';
import SNavbar from './components/navbar';
import MainLogo from './components/mainlogo';
import SearchBar from './components/searchbar';

function App() {
  return (
    <div className="App">
      <SNavbar></SNavbar>
      <MainLogo></MainLogo>
      <SearchBar></SearchBar>
      <hr/>
    </div>
  );
}

export default App;
