import { configureStore } from '@reduxjs/toolkit';
import { reducers as postReducers } from '../posts';

export const store = configureStore({
  reducer: {
    ...postReducers,
  },
});
