import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import './App.css';
import SNavbar from './components/navbar';
import MainLogo from './components/mainlogo';
import SearchBar from './components/searchbar';
import ImageCell from './components/imagecell';
import InfiniteScroller from './components/infinitescroller';
import Footer from './components/footer';
function App() {
  return (
    <div className="App">
      <SNavbar></SNavbar>
      <MainLogo></MainLogo>
      <SearchBar></SearchBar>
      <hr/>
      <InfiniteScroller/>
      <Footer/>
    </div>
  );
}

export default App;
