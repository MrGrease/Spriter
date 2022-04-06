import { Button,Form,Container,Badge } from "react-bootstrap";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register()
{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [errorPassMessage, setErrorPassMessage] = useState("");
    const [errorEmailMessage, setErrorEmailMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() =>{
        if(localStorage.getItem("authToken"))
        {
            navigate("/profile")
        }
      },navigate)


    const handleSubmit = async (event) => 
    {
        event.preventDefault();
        setErrorPassMessage("");
        setErrorEmailMessage("");


        const config = {
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
          };


        if(password===confirmPassword)
        {

            try {
                const { data } = await axios.post(
                    process.env.REACT_APP_API+"register",
                  {
                    email,
                    password
                  },
                  config
                );
          
                localStorage.setItem("authToken", data.token);
          
                navigate("/profile")
              } catch (error) {
                setErrorEmailMessage("Username or password is in use");
                renderEmailErrorMessage("Username or password is in use");
                setTimeout(() => {
                  setErrorEmailMessage("");
                }, 5000);
              }
        }else
        {
            console.log("invalid")
            setErrorPassMessage("Passwords do not match");
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