
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import "./login.css";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirectHome, setRedirectHome] = useState(false);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    let postData = {email, password};
    console.log(postData);
    axios.post(`https://info30005-customer-backend.herokuapp.com/api/customer/login`, postData)
      .then((res) => {
        // Set global auth token for whenever an axios request is sent
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        setRedirectHome(true);
      })
      .catch((err) => {
        console.log(err.message);
        
      });
  }
  
  if(redirectHome) {
    return <Redirect to="/"/>;
  }
  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="button" block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default LoginPage;