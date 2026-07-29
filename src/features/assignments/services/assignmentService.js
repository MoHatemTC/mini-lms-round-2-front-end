/**
 * @file assignmentService.js
 * @description API requests service for tasks and hand-in submissions.
 */

import axiosInstance from '../../../services/axios';

/**
 * Reusable error extractor
 */
const handleApiError = (error) => {
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

export const assignmentService = {
  /**
   * Admin: Create or update a task
   * @param {Object} taskData 
   * @returns {Promise<any>}
   */
  createTask: async (taskData) => {
    try {
      const response = await axiosInstance.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Learner: Fetch task details, locking state, and submission metadata
   * @param {string} taskId 
   * @returns {Promise<any>}
   */
  fetchTask: async (taskId) => {
    try {
      const response = await axiosInstance.get(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Learner: Submit task files and links
   * @param {string} taskId 
   * @param {Object} submissionData - { files: [...], links: [...] }
   * @returns {Promise<any>}
   */
  submitTask: async (taskId, submissionData) => {
    try {
      const response = await axiosInstance.post(`/tasks/${taskId}/submit`, submissionData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Learner: Upload a file to the general Storage module
   * @param {File} file 
   * @returns {Promise<any>}
   */
  uploadFile: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axiosInstance.post('/uploads/single', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Securely download an uploaded file as a Blob using the authenticated axiosInstance
   * @param {string} path - The relative file URL stored in the database submission
   * @returns {Promise<Blob>}
   */
  downloadFile: async (path) => {
    try {
      const response = await axiosInstance.get(path, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

export default assignmentService;
