import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Posts } from '../../posts';

const getPosts = (state) => {
  return Object.values(state.posts.items);
};

export const Home = () => {
  const latestPosts = useSelector(getPosts);

  return (
    <div>
      <Typography variant="h1">Latest Posts</Typography>
      <Posts posts={latestPosts}/>
    </div>
  );
}
