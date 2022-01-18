import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const getPost = (postId) => (state) => {
  return state.posts.items[postId];
}

export const Post = () => {
  const params = useParams();
  const { postId } = params;
  const post = useSelector(getPost(postId));

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
    </Container>
  );
}
