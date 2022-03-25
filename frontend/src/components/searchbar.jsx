import {Container,Row,Col,Form,Button,InputGroup,FormControl} from "react-bootstrap"

function SearchBar()
{
    return(      
        <Container className="Search-Bar">
        <Row>
          <Col>
          <InputGroup >
    <FormControl
      placeholder="What are we making today?"
    />
    <Button>
      Go!
    </Button>
  </InputGroup>
          </Col>
        </Row>
      </Container>)
}

export default SearchBar;