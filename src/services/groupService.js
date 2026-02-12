import { apiService } from '../api';
import { API_ENDPOINTS } from '../constants';

export const groupService = {
  createGroup: async (groupData) => {
    const result = await apiService.post(API_ENDPOINTS.GROUP.CREATE, groupData);
    return result;
  },

  joinGroup: async (groupId) => {
    if (!groupId) {
      return { success: false, error: 'Group ID is required' };
    }
    
    const result = await apiService.post(API_ENDPOINTS.GROUP.JOIN(groupId));
    return result;
  },

  leaveGroup: async (groupId) => {
    if (!groupId) {
      return { success: false, error: 'Group ID is required' };
    }
    
    const result = await apiService.post(API_ENDPOINTS.GROUP.LEAVE(groupId));
    return result;
  },

  getAllGroups: async () => {
    try {
      const result = await apiService.get(API_ENDPOINTS.GROUP.GET_ALL);
      console.log('getAllGroups API result:', result);
      
      if (result.success) {
        // Access 'message' field from API response
        const groups = result.message || result.data?.message || [];
        console.log('Extracted groups:', groups);
        return { 
          success: true, 
          message: Array.isArray(groups) ? groups : [] 
        };
      }
      
      if (result.error?.includes('404') || result.error?.includes('not found')) {
        return { success: true, message: [] };
      }
      
      return result;
    } catch (error) {
      console.error('Error in getAllGroups:', error);
      return { success: false, error: error.message };
    }
  },

  getMyGroups: async () => {
    try {
      const result = await apiService.get(API_ENDPOINTS.GROUP.GET_MY_GROUPS);
      console.log('getMyGroups API result:', result);
      
      if (result.success) {
        // Access 'message' field from API response
        const groups = result.message || result.data?.message || [];
        console.log('Extracted my groups:', groups);
        return { 
          success: true, 
          message: Array.isArray(groups) ? groups : [] 
        };
      }
      
      if (result.error?.includes('404') || result.error?.includes('not found')) {
        return { success: true, message: [] };
      }
      
      return result;
    } catch (error) {
      console.error('Error in getMyGroups:', error);
      return { success: false, error: error.message };
    }
  },

  getGroupById: async (groupId) => {
    if (!groupId) {
      return { success: false, error: 'Group ID is required' };
    }
    
    try {
      const result = await apiService.get(API_ENDPOINTS.GROUP.GET_BY_ID(groupId));
      return result;
    } catch (error) {
      console.error('Error in getGroupById:', error);
      return { success: false, error: error.message };
    }
  },

  getGroupDetails: async (groupId) => {
    if (!groupId) {
      return { success: false, error: 'Group ID is required' };
    }
    
    try {
      const result = await apiService.get(API_ENDPOINTS.GROUP.GET_DETAILS(groupId));
      console.log('getGroupDetails API raw result:', result);
      console.log('result.data:', result.data);
      console.log('result.message:', result.message);
      
      if (result.success) {
        // Try multiple possible locations for the data
        let details = null;
        
        // Case 1: data is wrapped in result.data.message
        if (result.data && result.data.message) {
          details = result.data.message;
          console.log('Found details in result.data.message');
        }
        // Case 2: data is in result.message
        else if (result.message) {
          details = result.message;
          console.log('Found details in result.message');
        }
        // Case 3: data is in result.data
        else if (result.data) {
          details = result.data;
          console.log('Found details in result.data');
        }
        
        console.log('Final extracted details:', details);
        console.log('Details admins:', details?.admins);
        console.log('Details members:', details?.members);
        
        return {
          success: true,
          data: details  // This should contain: group, admins, members, challenge, participants
        };
      }
      
      return result;
    } catch (error) {
      console.error('Error in getGroupDetails:', error);
      return { success: false, error: error.message };
    }
  },

  getGroupMembers: async (groupId) => {
    if (!groupId) {
      return { success: false, error: 'Group ID is required' };
    }
    
    try {
      const result = await apiService.get(API_ENDPOINTS.GROUP.GET_MEMBERS(groupId));
      
      if (result.success) {
        const members = result.message || result.data?.message || [];
        return { 
          success: true, 
          message: Array.isArray(members) ? members : [] 
        };
      }
      
      return result;
    } catch (error) {
      console.error('Error in getGroupMembers:', error);
      return { success: false, error: error.message };
    }
  },
};

export default groupService;