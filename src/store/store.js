import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import courseReducer from '../features/courses/courseSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
  },
});

export default store;
