import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../../api'

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await API('GET', '/posts');
    return response.posts;
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId) => {
    await API('DELETE', `/post/${postId}`);
    return postId;
  }
);
