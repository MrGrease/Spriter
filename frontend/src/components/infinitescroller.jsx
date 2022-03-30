import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageCell from "./imagecell"
import {Container,Row,Col,Form,Button,InputGroup,FormControl} from "react-bootstrap"


class InfiniteScroller extends React.Component
{

    constructor(props)
    {
      super(props);
      this.state =   
        {
        items:[],
        page:1,
        hasMore:true,
        searchTerm:props.term
      };

      this.fetchData = this.fetchData.bind(this);
    }

    async fetchData(){
        fetch(process.env.REACT_APP_APIURL+this.state.page, { mode: 'cors' }).then(res=>res.json())
        .then((result)=>
        {
          this.setState(
            {
              items:this.state.items.concat(result),
              page:this.state.page+1
            })
        }).catch((error)=>{
          console.log(error);
          this.setState({hasMore:false})
        })
        return {}
    }

    componentDidMount()
    {
      this.fetchData();
    }

    render(){
    return(
<InfiniteScroll
  dataLength={this.state.items.length}
  next={this.fetchData}
  hasMore={this.state.hasMore}
  loader={<h4>Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }
>
          <Row>
          {this.state.items.map((i, index) => (
            <Col key={index} lg="2" md="4" sm="6" xs="12">
              <ImageCell className="ImageCell" link = {this.state.items[index].link}> - #{index}</ImageCell>
            </Col>
          ))}
</Row>
  
</InfiniteScroll>
    )
}
}

export default InfiniteScroller;