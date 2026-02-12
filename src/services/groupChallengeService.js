import { apiService } from '../api';
import { API_ENDPOINTS } from '../constants';

/**
 * Digs through every possible shape that apiService might return
 * and finds the leaderboard array.
 *
 * Raw API:  { statuscode, success, message: [...ARRAY], data: "string" }
 * apiService might wrap this differently.
 */
const extractArray = (result) => {
  console.log('🔍 RAW result from apiService:', JSON.stringify(result, null, 2));

  const candidates = [
    result?.data,
    result?.message,
    result?.data?.message,
    result?.data?.data,
    result?.message?.message,
    result?.message?.data,
    result,
  ];

  for (const c of candidates) {
    if (Array.isArray(c)) {
      console.log('✅ Found array with length:', c.length, c);
      return c;
    }
  }

  console.warn('⚠️ No array found anywhere in result, returning []');
  return [];
};

/**
 * Finds the challenge object (has _id + totalDays) in the result.
 */
const extractChallenge = (result) => {
  console.log('🔍 RAW result from apiService (challenge):', JSON.stringify(result, null, 2));

  const candidates = [
    result?.data,
    result?.message,
    result?.data?.message,
    result?.data?.data,
    result?.message?.data,
  ];

  for (const c of candidates) {
    if (c && typeof c === 'object' && !Array.isArray(c) && c._id) {
      console.log('✅ Found challenge object:', c);
      return c;
    }
  }

  console.warn('⚠️ No challenge object found');
  return null;
};

export const groupChallengeService = {
  createGroupChallenge: async (data) => {
    try {
      console.log('📤 createGroupChallenge:', data);
      const result = await apiService.post(API_ENDPOINTS.GROUP_CHALLENGE.CREATE, data);
      console.log('📥 createGroupChallenge raw result:', JSON.stringify(result, null, 2));

      if (result.success) {
        return { success: true, data: extractChallenge(result) };
      }
      return result;
    } catch (error) {
      console.error('createGroupChallenge error:', error);
      return { success: false, error: error.message };
    }
  },

  updateProgress: async (groupChallengeId) => {
    if (!groupChallengeId) return { success: false, error: 'Challenge ID required' };
    try {
      console.log('📤 updateProgress:', groupChallengeId);
      const result = await apiService.patch(
        API_ENDPOINTS.GROUP_CHALLENGE.UPDATE_PROGRESS(groupChallengeId)
      );
      console.log('📥 updateProgress raw result:', JSON.stringify(result, null, 2));
      return result.success
        ? { success: true, data: result.message ?? result.data }
        : result;
    } catch (error) {
      console.error('updateProgress error:', error);
      return { success: false, error: error.message };
    }
  },

  getLeaderboard: async (groupChallengeId) => {
    if (!groupChallengeId) return { success: false, error: 'Challenge ID required', data: [] };
    try {
      console.log('📤 getLeaderboard for challenge ID:', groupChallengeId);
      const result = await apiService.get(
        API_ENDPOINTS.GROUP_CHALLENGE.LEADERBOARD(groupChallengeId)
      );
      console.log('📥 getLeaderboard raw result:', JSON.stringify(result, null, 2));

      if (result.success) {
        const arr = extractArray(result);
        console.log('🏆 Final leaderboard array:', arr);
        return { success: true, data: arr };
      }
      return { success: false, error: result.error || 'Failed', data: [] };
    } catch (error) {
      console.error('getLeaderboard error:', error);
      return { success: false, error: error.message, data: [] };
    }
  },
};

export default groupChallengeService;