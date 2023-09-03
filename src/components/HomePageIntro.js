import React from "react";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavLink } from "react-router-dom";

import homepageImageSrc from '../images/pexels-pixabay-51953.jpg';

const HomePageIntro = () => {
  return (
    <>
      <br />
      <br />
      <br />
      <h1>Mom Network</h1>
      <h2>share ideas with other parents</h2>
      <br />

      <NavLink exact to="/login">
        <Button className="button">Log In</Button>
      </NavLink>
      <span>or</span>
      <NavLink exact to="/register">
        <Button className="button" variant="primary">
          Register
        </Button>
      </NavLink>
      <br />
      <br />

      <Container>
      <Row>
        <Col xs={12} md={8}>
        <img src={homepageImageSrc} alt="Mother holding a child at sunset" style={{ width: '100%' }} />
        </Col>
        <Col xs={6} md={4}>
        <p>
        In this project, you will design and build a content-sharing web
        application with React and an API (Django Rest Framework) Back-End. This
        will allow your users to browse and comment/ like each other's content
        as well as add, edit and delete their own. The users will also be able
        to follow one another. The data is presented in a way that makes it easy
        for users to find what they're looking for. Main Technologies HTML, CSS,
        JavaScript React.js Bootstrap.js Django REST Framework Project Idea:
        Content Platform Create a community-based publishing platform to share
        ideas, stories, tutorials and journalistic articles. Now that you're a
        fully-fledged web developer you've decided it's probably time for you to
        start your very own cool, modern content platform, offering a publishing
        portal to a global audience. To provide the best user experience, the
        platform will be available via a browser-based interface. Suggested
        functionality: The platform should enable users to create, read, comment
        and vote on content. Content should be searchable and categorized.
        Search results can be filtered on username, popularity, date created,
        title, content keywords and category.
      </p>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default HomePageIntro;