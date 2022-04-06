import { useEffect,useState } from "react";
import {Container,Row,Col} from "react-bootstrap"
import axios from "axios";
import ImageCell from "./imagecell";

function Profile({history})
{
  const [error, setError] = useState("");
  const [favourites,setFavourites] = useState({items:[]});
  
  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        console.log(process.env.REACT_APP_API+"profile")
        const { data } = await axios.get(process.env.REACT_APP_API+"profile", config);
        setFavourites({items:data});
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, []);



  return error ? 
  (<h1 className="Main-Logo-Header">{error}</h1>)
  :(      
    <Row>
      <Col>
        <h1 className="Main-Logo-Header">Your favourites</h1>
        <hr/>
        <Row>
      {favourites.items.map((i, index) => (
        <Col key={index} lg="2" md="4" sm="6" xs="12">
          <ImageCell className="ImageCell" link = {favourites.items[index].link} thumbNail = {favourites.items[index].thumbNail} Id = {favourites.items[index]._id}> - #{index}</ImageCell>
        </Col>
        
      ))}
    </Row>
      </Col>
    </Row>)

}

export default Profile;