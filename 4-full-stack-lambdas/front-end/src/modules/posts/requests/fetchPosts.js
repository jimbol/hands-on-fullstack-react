import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../../api'

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await API('GET', '/posts');
    return response.posts.map((post) => {
      post.id = post._id;
      delete post._id;
      return post;
    });
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId) => {
    await API('DELETE', `/post/${postId}`);
    return postId;
  }
);
