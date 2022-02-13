import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../../api'

export const fetchPost = createAsyncThunk(
  'posts/fetchPost',
  async (postId) => {
    const response = await API('GET', `/post/get/${postId}`);
    return response.posts;
  }
);
