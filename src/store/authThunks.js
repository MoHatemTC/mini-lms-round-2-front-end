import { createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from "../services/auth.service";

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authService.login(credentials);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message || 'Something went wrong' }
      );
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authService.refresh();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message || 'Something went wrong' }
      );
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const data = await authService.logout();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message || 'Something went wrong' }
      );
    }
  }
);
