import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import courseService from '../../services/courseService';

export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async (courseData, { rejectWithValue }) => {
    try {
      // Remove empty fields
      const cleanData = Object.fromEntries(
        Object.entries(courseData).filter(([_, v]) => {
          if (Array.isArray(v)) return v.length > 0;
          return v !== '' && v !== null && v !== undefined;
        })
      );
      
      const response = await courseService.createCourse(cleanData);
      return response;
    } catch (error) {
      if (error.status || error.errors || error.message) {
        // Return full standardized error
        return rejectWithValue(error);
      }
      return rejectWithValue({ message: 'An unexpected error occurred.' });
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  successMessage: null,
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearCourseState: (state) => {
      state.error = null;
      state.loading = false;
      state.successMessage = null;
    },
    clearCourseError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.successMessage = 'Course saved successfully.';
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: 'Failed to create course.' };
      });
  },
});

export const { clearCourseState, clearCourseError } = courseSlice.actions;
export default courseSlice.reducer;
