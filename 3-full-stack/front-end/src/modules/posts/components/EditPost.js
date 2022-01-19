import { TextField, Button, Container, Typography } from '@mui/material';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router";

import { updatePost } from "../requests/updatePost";

const getPost = (postId) => (state) => {
  return state.posts.items[postId];
};

export const EditPost = () => {
  const params = useParams();
  const { postId } = params;
  const post = useSelector(getPost(postId));

  const [initialized, setInitialization] = useState(false);
  const [title, setTitle] = useState(post ? post.title : '');
  const [body, setBody] = useState(post ? post.body : '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialized) return false;
    if (!post) {
      navigate(`/post/${postId}`)
    }
    setInitialization(true);
  }, [post, initialized, setInitialization, postId, navigate]);

  const savePost = () => {
    dispatch(updatePost({
      title,
      body,
      id: postId,
    }));
    setTitle('');
    setBody('');
    navigate(`/post/${postId}`);
  }

  if (!post) {
    return (
      <Container>
        <h2>That post doesn't exist.</h2>
      </Container>
    );
  }

  return (
    <Container style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h1">Edit Post</Typography>
      <TextField
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value || '')}
      />
      <TextField
        multiline
        rows={4}
        value={body}
        placeholder="Body"
        onChange={(e) => setBody(e.target.value || '')}
      />
      <Button
        onClick={() => savePost()}
      >
        Submit
      </Button>
    </Container>
  );
}
