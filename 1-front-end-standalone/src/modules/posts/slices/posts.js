import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {
    1: {
      id: 1,
      title: 'Top 3 Nerdy Things I like',
      body: `1. Coding
2. Table top roleplaying games
3. Telescoping`
    },
    2: {
      id: 2,
      title: 'The history of Javascript',
      body: 'Javascript was invented in 1995 at Netscape to handle interactions between the browser and Java applets.'
    },
  },
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPosts: (state, action) => {
      state.items = {
        ...state.items,
        ...action.payload.reduce((acc, post) => {
          acc[post.id] = post;
          return acc;
        }, {}),
      };
    },
    removePost: (state, action) => {
      console.log(action);
      delete state.items[action.payload.id];
    },
  },
});

export const postActions = postsSlice.actions;
export const posts = postsSlice.reducer;
