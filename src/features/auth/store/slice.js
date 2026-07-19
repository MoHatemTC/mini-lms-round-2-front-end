import { createSlice } from '@reduxjs/toolkit';

/**
 * Temporary fake authentication layer.
 * Mocked Admin user until Slot 1 (Login) is completed.
 */
const initialState = {
  user: {
    id: 1,
    name: 'Mock Admin',
    email: 'admin@lms.local',
    role: 'Admin'
  },
  accessToken: 'mock_token_123',
  isAuthenticated: true,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Scaffolded for future Slot 1 implementation
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    }
  }
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
