import { apiService } from '../api';
import { API_ENDPOINTS } from '../constants';

export const groupChallengeService = {
  /**
   * Create a new group challenge
   * POST /groupChallenge/group-challenges
   * Body: { title, description, goal, totalDays, groupId }
   */
  createGroupChallenge: async (data) => {
    try {
      console.log('Creating group challenge with data:', data);
      const result = await apiService.post(API_ENDPOINTS.GROUP_CHALLENGE.CREATE, data);
      console.log('Create group challenge result:', result);
      
      if (result.success) {
        // API returns: { success: true, message: {...challengeData}, data: "..." }
        return {
          success: true,
          data: result.message,
          message: result.data
        };
      }
      
      return result;
    } catch (error) {
      console.error('Error creating group challenge:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Update progress for current user (day-wise validation)
   * PATCH /groupChallenge/group-challenges/:id/progress
   */
  updateProgress: async (groupChallengeId) => {
    if (!groupChallengeId) {
      return { success: false, error: 'Group challenge ID is required' };
    }

    try {
      console.log('Updating progress for challenge:', groupChallengeId);
      const result = await apiService.patch(API_ENDPOINTS.GROUP_CHALLENGE.UPDATE_PROGRESS(groupChallengeId));
      console.log('Update progress result:', result);
      
      if (result.success) {
        return {
          success: true,
          data: result.message || result.data,
          message: result.data || 'Progress updated successfully'
        };
      }
      
      return result;
    } catch (error) {
      console.error('Error updating progress:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Get leaderboard for a group challenge
   * GET /groupChallenge/group-challenges/:id/leaderboard
   * Returns: Array of user progress with rank
   */
  getLeaderboard: async (groupChallengeId) => {
    if (!groupChallengeId) {
      return { success: false, error: 'Group challenge ID is required' };
    }

    try {
      console.log('Fetching leaderboard for challenge:', groupChallengeId);
      const result = await apiService.get(API_ENDPOINTS.GROUP_CHALLENGE.LEADERBOARD(groupChallengeId));
      console.log('Leaderboard result:', result);
      
      if (result.success) {
        // API returns: { success: true, message: [...leaderboard], data: "..." }
        const leaderboardData = result.message || result.data || [];
        console.log('Extracted leaderboard data:', leaderboardData);
        
        return {
          success: true,
          data: Array.isArray(leaderboardData) ? leaderboardData : [],
          message: result.data
        };
      }
      
      return result;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return { success: false, error: error.message };
    }
  },
};

export default groupChallengeService;