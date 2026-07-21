import axiosInstance from './axios';

/**
 * @typedef {Object} CourseRequest
 * @property {string} title
 * @property {string} description
 * @property {string} track
 * @property {string} level
 * @property {string} duration
 * @property {string} skill
 * @property {string[]} learningOutcomes
 * @property {string} [status] - e.g., 'Draft', 'Published'
 */

/**
 * @typedef {Object} CourseResponse
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} track
 * @property {string} level
 * @property {string} duration
 * @property {string} skill
 * @property {string[]} learningOutcomes
 * @property {string} status
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} PaginatedCourseResponse
 * @property {CourseResponse[]} data
 * @property {number} total
 * @property {number} page
 * @property {number} limit
 */

// Centralize API endpoints. Use environment variables to avoid hardcoded URLs.
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';
const COURSES_ENDPOINT = `${API_BASE}/courses`;

/**
 * Reusable error handler for API requests
 * @param {Error} error 
 * @returns {Object} Standardized error object
 */
export const handleApiError = (error) => {
  // TODO: Connect to backend error response schema
  if (error.response) {
    return {
      message: error.response.data?.message || 'An error occurred on the server.',
      status: error.response.status,
      errors: error.response.data?.errors || null
    };
  }
  if (error.request) {
    return { message: 'Network error. Please check your connection.', status: 0 };
  }
  return { message: error.message, status: 500 };
};

export const courseService = {
  /**
   * Fetch all courses (Admin list)
   * TODO: Connect to GET /api/courses
   * @param {Object} params - Query filters (page, limit, search, track, level, status)
   * @returns {Promise<PaginatedCourseResponse>}
   */
  getAllCourses: async (params = {}) => {
    try {
      const response = await axiosInstance.get(COURSES_ENDPOINT, { params });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get a single course by ID
   * TODO: Connect to GET /api/courses/:id
   * @param {string} id 
   * @returns {Promise<CourseResponse>}
   */
  getCourseById: async (id) => {
    try {
      const response = await axiosInstance.get(`${COURSES_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Create a new course
   * TODO: Connect to POST /api/courses
   * @param {CourseRequest} courseData 
   * @returns {Promise<CourseResponse>}
   */
  createCourse: async (courseData) => {
    try {
      const response = await axiosInstance.post(COURSES_ENDPOINT, courseData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Update an existing course
   * TODO: Connect to PUT or PATCH /api/courses/:id
   * @param {string} id 
   * @param {Partial<CourseRequest>} courseData 
   * @returns {Promise<CourseResponse>}
   */
  updateCourse: async (id, courseData) => {
    try {
      const response = await axiosInstance.put(`${COURSES_ENDPOINT}/${id}`, courseData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Delete a course
   * TODO: Connect to DELETE /api/courses/:id
   * @param {string} id 
   * @returns {Promise<void>}
   */
  deleteCourse: async (id) => {
    try {
      const response = await axiosInstance.delete(`${COURSES_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Reusable Upload Handler for attaching files to a course
   * TODO: Connect to POST /api/courses/:id/upload
   * @param {string} courseId 
   * @param {File} file 
   * @param {Function} onUploadProgress - Callback for tracking Axios progress events
   * @returns {Promise<any>}
   */
  uploadCourseFile: async (courseId, file, onUploadProgress) => {
    try {
      const formData = new FormData();
      formData.append('files', file); // Backend expects 'files' array field
      
      const response = await axiosInstance.post(`${COURSES_ENDPOINT}/${courseId}/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  
  /**
   * Delete an uploaded file
   * TODO: Connect to DELETE /api/courses/:id/files/:fileId
   * @param {string} courseId 
   * @param {string} fileId 
   * @returns {Promise<void>}
   */
  deleteCourseFile: async (courseId, fileId) => {
    try {
      const response = await axiosInstance.delete(`${COURSES_ENDPOINT}/${courseId}/files/${fileId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

export default courseService;
