import React, { useState } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { useHistory } from "react-router-dom";

function LogInForm() {
  const [logInData, setLogInData] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogInData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/login/", logInData);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Row>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container className={` p-4 `}>
          <h3>Login</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                value={logInData.username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={logInData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Container>
      </Col>
      <Col md={6} className={`my-auto d-none d-md-block p-2`}></Col>
    </Row>
  );
}

export default LogInForm;
