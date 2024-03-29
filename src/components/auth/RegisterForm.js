import React, { useState } from "react";
// import { Link, useHistory } from "react-router-dom";
import { useHistory } from "react-router-dom";


import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";

const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = registerData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", registerData);
      history.push("/login");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <>
      <br />
      <br />
      <br />

      {/* <h3>Register</h3> */}
      <Container className="mt-3">
        Don't have an account?
      </Container>
      <br></br>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label className="d-none">username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={handleChange}
          />
          {errors &&
            errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
        </Form.Group>

        <Form.Group className="mb-3" controlId="password1">
          <Form.Label className="d-none">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password1"
            value={password1}
            onChange={handleChange}
          />
          {errors &&
            errors.password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
        </Form.Group>

        <Form.Group className="mb-3" controlId="password2">
          <Form.Label className="d-none">Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="password2"
            value={password2}
            onChange={handleChange}
          />
          {errors &&
            errors.password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
        </Form.Group>

        <Button type="submit" className="button">
          Register
        </Button>

        {errors &&
          errors.non_field_errors?.map((message, idx) => (
            <Alert key={idx} variant="warning" className="mt-3">
              {message}
            </Alert>
          ))}
      </Form>

      {/* <Container className="mt-3">
        <Link to="/login">
          Already have an account? <span>Log in</span>
        </Link>{" "}
      </Container> */}
    </>
  );
};

export default RegisterForm;
