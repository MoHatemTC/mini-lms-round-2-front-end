import axiosInstance from './axios';
import { handleApiError } from './courseService';

const CERTIFICATES_ENDPOINT = '/certificates';

/**
 * Certificate Service
 * API utilities for fetching and managing certificates.
 * Relies entirely on the backend for authorization and validation.
 */
export const certificateService = {
  /**
   * Fetch a certificate by ID via GET /certificates/:id
   * @param {string} id 
   * @returns {Promise<any>}
   */
  getCertificateById: async (id) => {
    try {
      const response = await axiosInstance.get(`${CERTIFICATES_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

export default certificateService;
