import { apiService } from '../api';
import { API_ENDPOINTS } from '../constants';

/**
 * Authentication API Service
 * Handles all auth-related API calls
 */
export const authService = {
  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} Response with success status and user/token data
   */
  login: async (email, password) => {
    const result = await apiService.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });
    
    if (result.success) {
      // Handle different possible response formats from backend
      let user, accessToken;
      const data = result.data;
      
      if (data.data && typeof data.data === 'object') {
        // ApiResponse format: { statusCode, data: { user, accessToken, refreshToken }, message }
        user = data.data.user;
        accessToken = data.data.accessToken;
      } else if (data.user && data.accessToken) {
        // Direct format: { user, accessToken, refreshToken }
        user = data.user;
        accessToken = data.accessToken;
      }
      
      if (accessToken && user) {
        return { success: true, user, accessToken };
      } else {
        return { 
          success: false, 
          error: 'Missing authentication data in response' 
        };
      }
    }
    
    return result;
  },

  /**
   * Register new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Response with success status
   */
  register: async (userData) => {
    const result = await apiService.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    return result;
  },

  /**
   * Logout user
   * @returns {Promise<Object>} Response with success status
   */
  logout: async () => {
    const result = await apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
    return result;
  },

  /**
   * Get current user account details
   * @returns {Promise<Object>} Response with success status and user data
   */
  getCurrentUser: async () => {
    const result = await apiService.get(API_ENDPOINTS.AUTH.MY_ACCOUNT);
    return result;
  },

  /**
   * Update user account
   * @param {Object} updateData - Updated user data
   * @returns {Promise<Object>} Response with success status and updated user
   */
  updateAccount: async (updateData) => {
    const result = await apiService.post(
      API_ENDPOINTS.AUTH.UPDATE_ACCOUNT,
      updateData
    );
    return result;
  },

  /**
   * Change user password
   * @param {string} oldPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} Response with success status
   */
  changePassword: async (oldPassword, newPassword) => {
    const result = await apiService.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
      oldPassword,
      newPassword,
    });
    return result;
  },
};

export default authService;
