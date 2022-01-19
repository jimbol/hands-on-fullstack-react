import { TextField, Button, Container, Typography } from '@mui/material';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router";

import { postActions } from '../slices';

export const CreatePost = () => {
  const post = {
    id: uuid(),
    title: '',
    body: '',
  };
  const { id } = post;
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const savePost = () => {
    dispatch(postActions.addPosts([{
      id,
      title,
      body,
    }]));
    setTitle('');
    setBody('');
    navigate(`/post/${id}`);
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
