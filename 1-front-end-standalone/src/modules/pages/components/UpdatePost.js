import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EditPost } from '../../posts';

const getPost = (postId) => (state) => {
  return state.posts.items[postId];
}

export const UpdatePost = () => {
  const params = useParams();
  const { postId } = params;
  const post = useSelector(getPost(postId));

  return (
    <Container>
      <Typography variant="h1">Edit Post</Typography>
      <EditPost post={post} />
    </Container>
  );
};
