import { createSlice } from '@reduxjs/toolkit';

const authInitialState = {
  userId: null,
  login: null,
  email: null,
  avatar: null,
  stateChange: false,
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
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    // authSignOut: () => authInitialState,
    authSignOut: state => ({ ...state, ...authInitialState }),
  },
});

export const { updateUserProfile, authStateChange, authSignOut } =
  authSlice.actions;
