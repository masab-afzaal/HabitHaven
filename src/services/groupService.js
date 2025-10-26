import { apiService } from '../api';
import { API_ENDPOINTS } from '../constants';

/**
 * Group API Service
 * Handles all group-related API calls
 */
export const groupService = {
  /**
   * Create a new group
   * @param {Object} groupData - Group data (name, description, etc.)
   * @returns {Promise<Object>} Response with success status and group data
   */
  createGroup: async (groupData) => {
    const result = await apiService.post(API_ENDPOINTS.GROUP.CREATE, groupData);
    return result;
  },

  /**
   * Join a group
   * @param {string} groupId - Group ID to join
   * @returns {Promise<Object>} Response with success status
   */
  joinGroup: async (groupId) => {
    if (!groupId) {
      return { success: false, error: 'Group ID is required' };
    }
    
    const result = await apiService.post(API_ENDPOINTS.GROUP.JOIN(groupId));
    return result;
  },

  /**
   * Get all available groups
   * @returns {Promise<Object>} Response with success status and groups array
   */
  getAllGroups: async () => {
    const result = await apiService.get(API_ENDPOINTS.GROUP.GET_ALL);
    
    if (result.success) {
      // Normalize groups data
      const groups = result.data?.message || result.data?.data || [];
      return { 
        success: true, 
        data: Array.isArray(groups) ? groups : [] 
      };
    }
    
    // Return empty array if route doesn't exist yet
    if (result.error?.includes('404') || result.error?.includes('not found')) {
      return { success: true, data: [] };
    }
    
    return result;
  },

  /**
   * Get user's joined groups
   * @returns {Promise<Object>} Response with success status and groups array
   */
  getMyGroups: async () => {
    const result = await apiService.get(API_ENDPOINTS.GROUP.GET_MY_GROUPS);
    
    if (result.success) {
      // Normalize groups data
      const groups = result.data?.message || result.data?.data || [];
      return { 
        success: true, 
        data: Array.isArray(groups) ? groups : [] 
      };
    }
    
    // Return empty array if route doesn't exist yet
    if (result.error?.includes('404') || result.error?.includes('not found')) {
      return { success: true, data: [] };
    }
    
    return result;
  },

  /**
   * Get group details by ID
   * @param {string} groupId - Group ID
   * @returns {Promise<Object>} Response with success status and group data
   */
  getGroupById: async (groupId) => {
    if (!groupId) {
      return { success: false, error: 'Group ID is required' };
    }
    
    const result = await apiService.get(API_ENDPOINTS.GROUP.GET_BY_ID(groupId));
    return result;
  },
};

export default groupService;

// Usage examples for your components:

/*
// In your React components, use these functions like this:

import { groupService } from '../services/groupService';
import { useAuth } from '../context/AuthContext';

const GroupComponent = () => {
  const { token } = useAuth();
  const [groups, setGroups] = useState([]);

  // Create a new group
  const handleCreateGroup = async (groupData) => {
    const result = await groupService.createGroup(token, groupData);
    if (result.success) {
      console.log('Group created:', result.data);
      // Refresh groups list
      fetchGroups();
    } else {
      console.error('Error:', result.error);
    }
  };

  // Join a group
  const handleJoinGroup = async (groupId) => {
    const result = await groupService.joinGroup(token, groupId);
    if (result.success) {
      console.log('Joined group:', result.data);
      // Refresh groups
      fetchGroups();
    } else {
      console.error('Error:', result.error);
    }
  };

  // Fetch all groups
  const fetchGroups = async () => {
    const result = await groupService.getAllGroups(token);
    if (result.success) {
      setGroups(result.data);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    // Your component JSX here
  );
};
*/