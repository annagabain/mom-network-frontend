import "../App.css";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../mom_network_logo_11.png";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";

import axios from "axios";

const NavigationBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInIcons = (
    <>
      Hello {currentUser?.username}
      <br></br>
      {currentUser?.profile_image && (
        <img
          src={currentUser?.profile_image}
          style={{
            borderRadius: "50%",
            width: "30px",
            height: "30px",
          }}
        />
      )}
      <NavLink to="/" onClick={handleSignOut}>
        Log out
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink exact to="/login" activeClassName="Active">
        Login
      </NavLink>
      <NavLink exact to="/register" activeClassName="Active">
        Register
      </NavLink>
    </>
  );

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} className="App-logo left" alt="logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Row>
            <Nav className="me-auto">
              <Col sm={6} className="text-same-line">
                <NavLink exact to="/" activeClassName="Active">
                  Home
                </NavLink>
                <NavLink exact to="/feed" activeClassName="Active">
                  Feed
                </NavLink>
                <NavLink exact to="/network" activeClassName="Active">
                  Network
                </NavLink>
              </Col>

              <Col sm={4} className="text-same-line">
                <NavDropdown
                  title="Social Groups"
                  id="basic-nav-dropdown"
                  activeClassName="Active"
                >
                  <NavLink exact to="/groups/baby" activeClassName="active">
                    Baby
                  </NavLink>
                  <br />
                  <NavLink exact to="/groups/toddler" activeClassName="active">
                    Toddler
                  </NavLink>
                  <br />
                  <NavLink
                    exact
                    to="/groups/small-child"
                    activeClassName="active"
                  >
                    Small Child
                  </NavLink>
                  <br />
                  <NavLink
                    exact
                    to="/groups/healthcare"
                    activeClassName="active"
                  >
                    Healthcare
                  </NavLink>
                  <br />
                  <NavLink
                    exact
                    to="/groups/activities"
                    activeClassName="active"
                  >
                    Activities
                  </NavLink>
                </NavDropdown>
              </Col>

              <Col sm={4}>
                <NavLink
                  exact
                  to="/createnewpost"
                  activeClassName="Active"
                  className="text-same-line"
                >
                  + New Post
                </NavLink>
              </Col>

              <Col sm={4} className="text-same-line">
                <h5>{currentUser ? loggedInIcons : loggedOutIcons}</h5>
              </Col>
            </Nav>
          </Row>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;