import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import './App.css';
import SNavbar from './components/navbar';
import MainLogo from './components/mainlogo';
import SearchBar from './components/searchbar';
import ImageCell from './components/imagecell';
import InfiniteScroller from './components/infinitescroller';
import Footer from './components/footer';
import { useState } from 'react';
function App() {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="App">
      <SNavbar></SNavbar>
      <MainLogo></MainLogo>
      <SearchBar search={setSearchTerm}></SearchBar>
      <hr/>
      <InfiniteScroller term={searchTerm} key={searchTerm} />
      <Footer/>
    </div>
  );
}

export default App;
