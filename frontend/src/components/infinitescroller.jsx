import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageCell from "./imagecell"
import {Container,Row,Col,Form,Button,InputGroup,FormControl} from "react-bootstrap"


class InfiniteScroller extends React.Component
{
    constructor(props)
    {
        this.items = [];
    }

    async fetchData(){
        return {}
    }



    render(){
    return(
<InfiniteScroll
  dataLength={this.items.length} //This is important field to render the next data
  next={this.fetchData}
  hasMore={true}
  loader={<h4>Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }
>
    <Container>
    <Row>
      <Col>
        <ImageCell/>
      </Col>
      <Col>
      <ImageCell/>
      </Col>
      <Col>
      <ImageCell/>
      </Col>
      <Col>
      <ImageCell/>
      </Col>
    </Row>
  </Container>
  
</InfiniteScroll>
    )
}
}

export default InfiniteScroller;