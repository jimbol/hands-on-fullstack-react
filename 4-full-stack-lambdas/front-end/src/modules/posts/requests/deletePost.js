import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../../api'

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId) => {
    await API('DELETE', `/post/${postId}`);
    return postId;
  }
);
