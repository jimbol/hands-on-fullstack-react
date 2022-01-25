import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../../api'

export const createPost = createAsyncThunk(
  'posts/createPost',
  async ({ title, body, navigate }) => {
    const response = await API('POST', '/post', {
      post: {
        title,
        body,
      },
    });

    navigate(`/post/${response.insertedId}`);
  }
);
