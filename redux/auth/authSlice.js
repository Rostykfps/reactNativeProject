import { createSlice } from '@reduxjs/toolkit';

const authInitialState = {
  userId: null,
  login: null,
  email: null,
  avatar: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
      email: payload.email,
      avatar: payload.avatar,
    }),
  },
});

export const { updateUserProfile } = authSlice.actions;
