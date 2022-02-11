import { createSlice } from "@reduxjs/toolkit"
import { updatePost } from "../requests/updatePost";
import { deletePost } from "../requests/deletePost";
import { fetchPost } from "../requests/fetchPost";
import { fetchPosts } from "../requests/fetchPosts";

const initialState = {
  items: {},
  loading: false,
};

const addPosts = (state, action) => {
  state.loading = false;
  state.items = {
    ...state.items,
    ...action.payload.reduce((acc, post) => {
      acc[post.id] = post;
      return acc;
    }, {}),
  };
};

const setLoading = (state) => {
  state.loading = true;
};

const removePost = (state, action) => {
  delete state.items[action.payload];
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts,
    removePost,
  },
  extraReducers: (builder) => {
    builder.addCase(updatePost.fulfilled, addPosts);
    builder.addCase(updatePost.pending, setLoading);

    builder.addCase(fetchPost.fulfilled, addPosts);
    builder.addCase(fetchPost.pending, setLoading);

    builder.addCase(fetchPosts.fulfilled, addPosts);
    builder.addCase(fetchPosts.pending, setLoading);

    builder.addCase(deletePost.fulfilled, removePost);
    builder.addCase(deletePost.pending, setLoading);
  },
});

export const postActions = postsSlice.actions;
export const posts = postsSlice.reducer;
