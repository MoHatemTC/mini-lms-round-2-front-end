import axios from 'axios';

// Read backend URL from environment variables for production, fallback to localhost in dev
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const quizService = {
  /**
   * Admin flow: Save a newly created quiz configuration in the database
   */
  createQuiz: async (quizData, adminId = 1) => {
    const response = await apiClient.post('/quizzes', quizData, {
      headers: { 'x-user-id': adminId.toString() },
    });
    return response.data;
  },

  /**
   * Learner flow: Fetch the locked status and questions of a specific quiz
   */
  fetchQuiz: async (quizId, learnerId) => {
    const response = await apiClient.get(`/quizzes/${quizId}`, {
      headers: { 'x-user-id': learnerId.toString() },
    });
    return response.data;
  },

  /**
   * Learner flow: Submit completed answers for auto-grading
   */
  submitQuiz: async (quizId, learnerId, answers) => {
    const response = await apiClient.post(`/quizzes/${quizId}/submit`, { answers }, {
      headers: { 'x-user-id': learnerId.toString() },
    });
    return response.data;
  },

  /**
   * Simulate material completion from Slot 4
   */
  simulateSlot4Completion: async (learnerId, materialId) => {
    const response = await apiClient.post('/quizzes/simulate-slot4', { material_id: materialId }, {
      headers: { 'x-user-id': learnerId.toString() },
    });
    return response.data;
  },
};
