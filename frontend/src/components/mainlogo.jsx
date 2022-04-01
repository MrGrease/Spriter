import {Container,Row,Col} from "react-bootstrap"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function MainLogo()
{
    return(      
    <Container className="Main-Logo">
    <Row>
      <Col>
        <h1 className="Main-Logo-Header">The Best Resource For Reference Material!</h1>
      </Col>
    </Row>
  </Container>)
}

export default MainLogo;