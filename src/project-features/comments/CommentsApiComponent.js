import React, { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"; // Import the CurrentUserContext
import { Link } from "react-router-dom";

function CommentsApiComponent({ postId, onDeleteComment }) {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useContext(CurrentUserContext); // Get the currentUser from the context

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const allComments = [];
        let page = 1;

        // Fetch comments from all pages until there are no more pages
        while (true) {
          const response = await fetch(
            `https://mom-network-backend.herokuapp.com/comments/?page=${page}`
          );
          const data = await response.json();

          if (!data.results || data.results.length === 0) {
            // No more comments to fetch
            break;
          }

          allComments.push(...data.results);
          page++;
        }
        console.log("Fetched comments:", allComments); // Log the fetched comments
        setComments(allComments);
        setIsLoading(false); // Set loading state to false when comments are loaded
      } catch (error) {
        console.error("Error fetching comments:", error);
        setIsLoading(false); // Set loading state to false on error
      }
    };

    fetchComments();
  }, []);

  useEffect(() => {
    if (postId) {
      const postIdInt = parseInt(postId, 10);
      const filtered = comments
        .filter((comment) => comment.post === postIdInt)
        .reverse(); // Reverse the order to show newest comments first
      setFilteredComments(filtered);
    }
  }, [postId, comments]);

  return (
    <div>
      {/* <h1>Comments</h1> */}
      {isLoading ? (
        <p>Loading comments...</p>
      ) : (
        <>
          {filteredComments.map((comment) => (
            <Card className="mb-3" key={comment.id} style={{ width: "66%" }}>
              <Card.Body>
                <div>
                  <p>ID: {comment.id}</p>
                  <p>{comment.owner} says:</p>
                  <p>{comment.comment_text}</p>
                  {currentUser?.username === comment.owner && (
                    <div>
                      <Link to={`/edit-comment/${comment.id}`}>
                        <Button className="button right">Edit</Button>
                      </Link>
                      <Button
                        onClick={() =>
                          console.log("Delete Comment button clicked")
                        }
                        variant="danger"
                        className="right"
                      >
                        D
                      </Button>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}

export default CommentsApiComponent;
