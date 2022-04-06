import React from 'react';
import {Card,Button,Container,Row,Col} from 'react-bootstrap'
import ReactStars from "react-rating-stars-component";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
import axios from "axios";
import { BsSuitHeart,BsSuitHeartFill } from 'react-icons/bs';

class ImageCell extends React.Component
{
    ratingChanged()
    {
        console.log("RATING CHANGE MAKE API CALL")
        //console.log(process.env.REACT_APP_APIURL)
    }
    
    favourite()
    {      
       console.log("sending token " +localStorage.getItem("authToken")) 
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          };
          console.log("sending "+config.headers.Authorization);
        try {
              axios.post(
                  process.env.REACT_APP_API+"favourite/"+this.ObjectId,{Id: this.ObjectId,cool:"lime"},
                config
              ).then(function(data)
              {

              });
            } catch (error) {
              console.log(error);
            }
    }

    render()
    {
        return(
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={this.thumbNail} className="Item-img"/>
                <Card.Body>
                <h1></h1>
                <Row>

                <Col>
                    <Button variant="primary">
                    <Link className='btn' to="/Images/${this.ObjectId}" state={{ link: this.link,id:this.ObjectId,rating:this.rating }}>
                    Get!
                    </Link>
                    </Button>
                </Col>
                <Col>
                <Button variant="outline-primary" onClick={this.favourite}><BsSuitHeart></BsSuitHeart></Button>
                </Col>
                </Row>
                </Card.Body>
            </Card>
           
              
            )
    }
    constructor(props)
    {
        super(props);
        this.ObjectId = props.Id
        this.link = props.link;
        this.thumbNail = props.thumbNail;
        if(props.rating)
        {
        this.rating = props.rating;
        }else
        {this.rating =0;}
        this.favourite = this.favourite.bind(this);
    }
}

export default ImageCell;