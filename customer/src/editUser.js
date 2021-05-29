
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "./editUser.css";

function EditUser(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [redirectHome, setRedirectHome] = useState(false);

  function validateForm() {
    return firstName.length > 0 && lastName.length > 0 &&  password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    let postData = { firstName, lastName, password};
    console.log(postData);
    axios
      .post(
        `https://info30005-customer-backend.herokuapp.com/api/customer/login`,
        postData
      )
      .then((res) => {
        // Set global auth token for whenever an axios request is sent
        localStorage.setItem('token', res.data.token);
        setRedirectHome(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  if (redirectHome) {
    return <Redirect to="/" />;
  }
  return (

    <div className="Login">
      <div className="left">
      <img className="logo-image" src="https://i.imgur.com/kiMFyeA.png" />
      <div className="header">
        
        <h4 className="animation a2"> You can change your name and password here</h4>
      </div>
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="text">
          <Form.Label className="form-name" ></Form.Label>
          <Form.Control className="form-field animation a3" placeholder="New First Name"
            autoFocus
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="text">
          <Form.Label className="form-name" ></Form.Label>
          <Form.Control className="form-field animation a3" placeholder="New Last Name"
            autoFocus
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label className="form-name" ></Form.Label>
          <Form.Control className="form-field animation a4" placeholder="Current Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label className="form-name" ></Form.Label>
          <Form.Control className="form-field animation a4" placeholder="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="confirmPassword">
          <Form.Label className="form-name" ></Form.Label>
          <Form.Control className="form-field animation a4" placeholder="Confirm Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <p className="animation a5"><a href="#">Forgot Password</a></p>
        <Button
          className="button"
          block
          size="lg"
          type="submit"
          disabled={!validateForm()}
        >
          Save
        </Button>
      </Form>
      </div>
      <div className="right"></div>
    </div>

  );
}

export default EditUser;
