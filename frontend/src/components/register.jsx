import { Button,Form,Container,Badge } from "react-bootstrap";
import { useState } from "react";
function Register()
{

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [errorPassMessage, setErrorPassMessage] = useState("");
    const [errorEmailMessage, setErrorEmailMessage] = useState("");
    function handleSubmit(event) 
    {
        event.preventDefault();
        if(password===confirmPassword)
        {
            console.log("valid");
        }else
        {
            console.log("invalid")
            setErrorPassMessage("Passwords do not match");
        }

        if(true)
        {
            setErrorEmailMessage("Email in use");
        }
        
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
        }else if(eventName === "confirmPassword")
        {
            setConfirmPassword(event.target.value);
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
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control type="password" placeholder="Confirm Password" onChange={handleChange} required name="confirmPassword"/>
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

export default Register;