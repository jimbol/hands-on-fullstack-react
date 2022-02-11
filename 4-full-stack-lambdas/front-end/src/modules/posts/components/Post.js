import { Container, Typography, Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { fetchPost } from "../requests/fetchPost";
import { deletePost } from "../requests/deletePost";

const getPost = (postId) => (state) => {
  return state.posts.items[postId];
}

export const Post = () => {
  const params = useParams();
  const { postId } = params;
  const post = useSelector(getPost(postId));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [initialized, setInitialization] = useState(false);

  useEffect(() => {
    if (initialized) return false;
    dispatch(fetchPost(postId));
    setInitialization(true);
  }, [dispatch, initialized, setInitialization, postId]);

  if (!post) {
    return (
      <Container>
        <h2>That post doesn't exist.</h2>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h1">{post.title}</Typography>
      <Typography variant="p">{post.body}</Typography>
      <div style={{ paddingTop: 24 }}>
        <Button
          onClick={() => navigate(`/update-post/${post.id}`)}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            dispatch(deletePost(post.id));
            navigate('/');
          }}
        >
          Delete
        </Button>
      </div>
    </Container>
  );
}
