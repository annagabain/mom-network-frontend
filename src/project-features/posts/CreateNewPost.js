import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { Card } from "react-bootstrap";

function CreateNewPost() {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    content: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const { content } = postData;
  const history = useHistory();

  const handleChange = (event) => {
    if (event.target.name === "image") {
      // Handle image file input separately
      setImageFile(event.target.files[0]);
    } else {
      setPostData({
        ...postData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if either content or an image is provided
    if (!content && !imageFile) {
      setErrors({ content: ["Please provide either content or an image."] });
      return;
    }

    const formData = new FormData();

    formData.append("content", content);
    if (imageFile) {
      formData.append("post_image", imageFile); // Make sure to use "post_image" as the field name
    }

    try {
      await axiosReq.post("/posts/", formData);
      history.push(`/feed`, null);
      window.location.reload();
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <>
      <Card style={{ backgroundColor: "lightgrey" }}>
        <Card.Body>
          <Form.Group className="mb-3">
            <p>
              Share your thoughts! Create a <span style={{ fontWeight: "bold" }}>New post</span>
            </p>
            <i className="fa-regular fa-square-plus fa-2xl"></i>
            <br></br>
            <br></br>

            <Form.Label htmlFor="content" style={{ display: "none" }}>
              Content
            </Form.Label>

            <Form.Control
              as="textarea"
              rows={6}
              name="content"
              id="content"
              placeholder="Post Content"
              value={content}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="image" style={{ display: "none" }}>
              Image
            </Form.Label>
            <Form.Control
              type="file"
              name="image"
              id="image"
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.content?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          {/* <Button onClick={() => history.goBack()} className="button">
        Cancel 
      </Button> */}
          <span> </span>
          <Button type="submit" className="button">
            Post
          </Button>
        </Card.Body>
      </Card>
    </>
  );

  return (
    <>
      {/* <h2>+ Create a Post</h2> */}
      <Form onSubmit={handleSubmit}>
        <Container>
          <div>{textFields}</div>
        </Container>
      </Form>
      <br></br>
      <br></br>
    </>
  );
}

export default CreateNewPost;
