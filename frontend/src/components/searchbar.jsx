import {Container,Row,Col,Form,Button,InputGroup,FormControl} from "react-bootstrap"
import React, { useState } from 'react';
function SearchBar(props)
{
  const [search,setSearch] = useState("");

    return(      
        <Container className="Search-Bar">
        <Row>
          <Col>
          <InputGroup >
    <FormControl
      placeholder="What are we making today?" 
      onChange={event => setSearch(event.target.value)}
    />
    <Button onClick={() => props.search(search)}>
      Go!
    </Button>
  </InputGroup>
          </Col>
        </Row>
      </Container>)
}

export default SearchBar;