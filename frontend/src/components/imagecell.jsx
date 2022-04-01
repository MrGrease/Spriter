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
class ImageCell extends React.Component
{
    ratingChanged()
    {
        console.log("RATING CHANGE MAKE API CALL")
        //console.log(process.env.REACT_APP_APIURL)
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
                    <ReactStars
                        count={5}
                        onChange={this.ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                    />
                </Col>
                <Col>
                    <Button variant="primary">
                    <Link className='btn' to="/Images/${this.ObjectId}" state={{ link: this.link,id:this.ObjectId,rating:this.rating }}>
                    Get!
                    </Link>
                    </Button>
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
    }
}

export default ImageCell;