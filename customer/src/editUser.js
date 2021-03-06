
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "./editUser.css";

/* Program that enables a user to edit their information in the editUser page */

function EditUser(props) {
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [redirectHome, setRedirectHome] = useState(false);

  // Valid password must contain at least a number, a uppercase letter and must be at least 8 characters long
  function validateForm() {
    return (newEmail.length > 0 || (newPassword.length > 0 && newPassword == newPasswordConfirm)) && password.length > 0;
  }

  // Handling the submission of new user details and check for validation and difference with previous old credentials
  function handleSubmit(event) {
    event.preventDefault();
    let postData = { old_password: password };
    if(newEmail.length) {
      postData.new_email = newEmail;
    }
    if(newPassword.length) {
      postData.new_password = newPassword;
    }
    axios
      .post(
        `https://info30005-customer-backend.herokuapp.com/api/customer/update`,
        postData
      )
      .then((res) => {
        setRedirectHome(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  if (redirectHome) {
    return <Redirect to="/login" />;
  }

  // jsx starts from here to display components
  return (
    <div className="Login">
      <div className="left">
      <img className="logo-image" src="https://i.imgur.com/kiMFyeA.png" />
      <div className="header">

        <h4 className="animation a2"> You can change your account email and password here</h4>
      </div>

      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="text">
          <Form.Label className="form-name" ></Form.Label>
          <Form.Control className="form-field animation a3" placeholder="New Email"
            autoFocus
            type="text"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label className="form-name" ></Form.Label>
          <Form.Control className="form-field animation a4" placeholder="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="confirmPassword">
          <Form.Label className="form-name" ></Form.Label>
          <Form.Control className="form-field animation a4" placeholder="Confirm Password"
            type="password"
            value={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
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

        <Button
          className="button-b"
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
