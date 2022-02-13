import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../../api'

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId) => {
    await API('DEL', `/post/${postId}`);
    return postId;
  }
);
