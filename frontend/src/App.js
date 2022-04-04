import { useState,React } from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import './App.css';
import SNavbar from './components/navbar';
import MainLogo from './components/mainlogo';
import SearchBar from './components/searchbar';
import ImageCell from './components/imagecell';
import InfiniteScroller from './components/infinitescroller';
import Footer from './components/footer';
import Login from './components/login'
import Register from './components/register';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import ImagePage from './components/imagepage';
function App() {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
    <div className="App">
      <SNavbar></SNavbar>
      <Routes>
          <Route exact path="/" element={<>
            <MainLogo></MainLogo>
            <SearchBar search={setSearchTerm}></SearchBar>
            <hr/>
            <InfiniteScroller term={searchTerm} key={searchTerm} />
          </>}>
          </Route>
          <Route exact path="/login" element={<Login></Login>}>
          </Route>
          <Route exact path="/register" element={<Register></Register>}>
          </Route>
          <Route path="/Images/:id" element={ <ImagePage></ImagePage>}>
          </Route>
        </Routes>

      <Footer/>
    </div>
    </Router>
  );
}

export default App;
