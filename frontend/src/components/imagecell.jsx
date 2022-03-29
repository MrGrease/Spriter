import React from 'react';
import {Card,Button,Container,Row,Col} from 'react-bootstrap'
import ReactStars from "react-rating-stars-component";
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
                <Card.Img variant="top" src={this.link} className="Item-img"/>
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
                    <Button variant="primary">Get!</Button>
                </Col>
                </Row>
                </Card.Body>
            </Card>
           
              
            )
    }
    constructor(props)
    {
        super(props);
        this.link = props.link;
        if(props.rating)
        {
        this.rating = props.rating;
        }else
        {this.rating =0;}
    }
}

export default ImageCell;