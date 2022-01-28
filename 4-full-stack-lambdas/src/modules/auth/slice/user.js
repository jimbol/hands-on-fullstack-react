import { createSlice } from "@reduxjs/toolkit"

const initialState = null;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action) => action.payload,
    signOut: () => null,
  },
});

export const userActions = userSlice.actions;
export const user = userSlice.reducer;
