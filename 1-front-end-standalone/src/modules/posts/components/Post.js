import { Container, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { postActions } from '../slices';

const getPost = (postId) => (state) => {
  return state.posts.items[postId];
}

export const Post = () => {
  const params = useParams();
  const { postId } = params;
  const post = useSelector(getPost(postId));
  const navigate = useNavigate();
  const dispatch = useDispatch();


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
            dispatch(postActions.removePost({ id: post.id }));
            navigate('/');
          }}
        >
          Delete
        </Button>
      </div>
    </Container>
  );
}
