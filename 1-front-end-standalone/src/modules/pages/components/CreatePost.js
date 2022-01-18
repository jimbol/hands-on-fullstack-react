import { Container, Typography } from "@mui/material";
import { EditPost } from '../../posts';

export const CreatePost = () => {
  return (
    <Container>
      <Typography variant="h1">Create a Post</Typography>
      <EditPost />
    </Container>
  );
};
