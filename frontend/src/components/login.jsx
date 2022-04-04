import { Button,Form,Container,Badge } from "react-bootstrap";
import { useState } from "react";
function Login()
{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errorPassMessage, setErrorPassMessage] = useState("");
    const [errorEmailMessage, setErrorEmailMessage] = useState("");
    function handleSubmit(event) 
    {
        event.preventDefault();
        
    }

    function handleChange(event)
    {
        let eventName =event.target.name;
        if(eventName === "email")
        {
            setEmail(event.target.value);
        }else if(eventName === "password")
        {
            setPassword(event.target.value);
        }
    }

    function renderPasswordErrorMessage(name){
        if(name){
        return(<Badge bg="danger">{errorPassMessage}</Badge>)
        }
    }

    function renderEmailErrorMessage(name)
    {       if(name){
        return(<Badge bg="danger">{errorEmailMessage}</Badge>)
         }
    }

// JSX code for login form
const renderForm = (
    <Container className="loginContainer">
<Form onSubmit={handleSubmit}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" onChange={handleChange} required name="email"/>
    {renderEmailErrorMessage(errorEmailMessage)}
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange={handleChange} required name="password"/>
    {renderPasswordErrorMessage(errorPassMessage)}
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</Container>
 );
 return renderForm;
}

export default Login;