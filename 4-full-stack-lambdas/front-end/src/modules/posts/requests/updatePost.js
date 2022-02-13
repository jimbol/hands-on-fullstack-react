import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../../api'

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (post) => {
    const response = await API('PUT', `/post/${post.id}`, {
      post,
    });

    return response.posts;
  });
