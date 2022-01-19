import { TextField, Button, Container, Typography } from '@mui/material';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router";

import { createPost } from "../requests/createPost";

export const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const savePost = () => {
    dispatch(createPost({ title, body, navigate }));

    setTitle('');
    setBody('');
  }

  return (
    <Container style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h1">Create a Post</Typography>

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
