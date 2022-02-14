import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Posts } from '../../posts';
import { fetchPosts } from '../../posts/requests/fetchPosts';

const getPosts = (state) => {
  return Object.values(state.posts.items);
};

const getLoading = (state) => {
  return state.posts.loading;
};

export const Home = () => {
  const dispatch = useDispatch();
  const latestPosts = useSelector(getPosts);
  const loading = useSelector(getLoading);
  const [initialized, setInitialization] = useState(false);

  useEffect(() => {
    if (initialized) return false;
    dispatch(fetchPosts());
    setInitialization(true);
  }, [dispatch, initialized, setInitialization]);

  if (loading) {
    return (
      <div>
        <Typography variant="h1">Latest Posts</Typography>
        <Typography variant="h4">Loading...</Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h1">Latest Posts</Typography>
      <Posts posts={latestPosts}/>
    </div>
  );
}
