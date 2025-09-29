// Group API Service
// This file contains all the API calls for group functionality
// Based on your backend routes: /api/v1/group

const API_BASE = 'http://localhost:5000/api/v1';

export const groupService = {
  // POST /api/v1/group/createGroup - Create a new group
  createGroup: async (token, groupData) => {
    try {
      const response = await fetch(`${API_BASE}/group/createGroup`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(groupData)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.message || 'Failed to create group' };
      }
    } catch (error) {
      console.error('Error creating group:', error);
      return { success: false, error: 'Network error' };
    }
  },

  // POST /api/v1/group/:id/join - Join a group
  joinGroup: async (token, groupId) => {
    try {
      // Validate groupId
      if (!groupId) {
        return { success: false, error: 'Group ID is required' };
      }

      const response = await fetch(`${API_BASE}/group/${groupId}/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (response.ok) {
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.message || 'Failed to join group' };
      }
    } catch (error) {
      console.error('Error joining group:', error);
      return { success: false, error: 'Network error' };
    }
  },

  // GET /api/v1/group/allGroups - Get all available groups (assuming this exists)
  getAllGroups: async (token) => {
    try {
      const response = await fetch(`${API_BASE}/group/allGroups`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      // Handle 404 - route doesn't exist yet
      if (response.status === 404) {
        console.log('getAllGroups route not implemented yet');
        return { success: true, data: [] };
      }
      
      const result = await response.json();
      
      if (response.ok) {
        // Handle backend response structure - data might be in 'message' or 'data' field
        const groups = result.message || result.data || [];
        return { success: true, data: Array.isArray(groups) ? groups : [] };
      } else {
        return { success: false, error: result.message || 'Failed to fetch groups' };
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
      // Return empty array instead of error for now since route doesn't exist
      return { success: true, data: [] };
    }
  },

  // GET /api/v1/group/myGroups - Get user's joined groups (assuming this exists)
  getMyGroups: async (token) => {
    try {
      const response = await fetch(`${API_BASE}/group/myGroups`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      // Handle 404 - route doesn't exist yet
      if (response.status === 404) {
        console.log('getMyGroups route not implemented yet');
        return { success: true, data: [] };
      }
      
      const result = await response.json();
      
      if (response.ok) {
        // Handle backend response structure
        const groups = result.message || result.data || [];
        return { success: true, data: Array.isArray(groups) ? groups : [] };
      } else {
        return { success: false, error: result.message || 'Failed to fetch your groups' };
      }
    } catch (error) {
      console.error('Error fetching my groups:', error);
      // Return empty array instead of error for now since route doesn't exist
      return { success: true, data: [] };
    }
  },

  // GET /api/v1/group/:id - Get group details (assuming this exists)
  getGroupById: async (token, groupId) => {
    try {
      if (!groupId) {
        return { success: false, error: 'Group ID is required' };
      }

      const response = await fetch(`${API_BASE}/group/${groupId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (response.ok) {
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.message || 'Failed to fetch group details' };
      }
    } catch (error) {
      console.error('Error fetching group details:', error);
      return { success: false, error: 'Network error' };
    }
  }
};

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