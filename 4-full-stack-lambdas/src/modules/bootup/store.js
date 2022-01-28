import { configureStore } from '@reduxjs/toolkit';
import { reducers as postReducers } from '../posts';
import { reducers as authReducers } from '../auth';

export const store = configureStore({
  reducer: {
    ...postReducers,
    ...authReducers,
  },
});
