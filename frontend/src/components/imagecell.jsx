import React from 'react';
import {Card,Button,Container,Row,Col} from 'react-bootstrap'
import ReactStars from "react-rating-stars-component";
class ImageCell extends React.Component
{
    ratingChanged()
    {
        console.log("RATING CHANGE MAKE API CALL")
    }

    render()
    {
        return(
            <Container>
            <Row>
              <Col>
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="./logo192.png" />
                <Card.Body>
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
            </Col>
            </Row>
            </Container>
           
              
            )
    }
    constructor(props)
    {
        super(props);
        this.link = props.link;
        this.rating = props.rating;
    }
}

export default ImageCell;