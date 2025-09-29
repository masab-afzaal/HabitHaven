// Prayer API Service
// This file contains all the API calls for prayer functionality
// Make sure your backend has these routes implemented as described

const API_BASE = 'http://localhost:5000/api/v1';

// Prayer API endpoints matching your backend routes
export const prayerService = {
  // POST /api/v1/prayer/prayers - Log today's prayers
  // This creates prayer entries for all 6 prayers (Fajar, Dhuhr, Asr, Maghrib, Isha, Tahajjud)
  logPrayers: async (token) => {
    try {
      const response = await fetch(`${API_BASE}/prayer/prayers`, {
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
        return { success: false, error: result.message || 'Failed to log prayers' };
      }
    } catch (error) {
      console.error('Error logging prayers:', error);
      return { success: false, error: 'Network error' };
    }
  },

  // GET /api/v1/prayer/prayers/today - Get today's prayers
  // Returns array of today's prayer objects with completion status
  getTodaysPrayers: async (token) => {
    try {
      const response = await fetch(`${API_BASE}/prayer/prayers/today`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (response.ok) {
        return { success: true, data: result.data };
      } else if (response.status === 404) {
        return { success: false, error: 'No prayers found for today', needsCreation: true };
      } else {
        return { success: false, error: result.message || 'Failed to fetch prayers' };
      }
    } catch (error) {
      console.error('Error fetching prayers:', error);
      return { success: false, error: 'Network error' };
    }
  },

  // POST /api/v1/prayer/:prayerId/complete - Mark prayer as completed
  // This also handles rewards, XP, leveling, streaks, and badges automatically
  markPrayerCompleted: async (token, prayerId) => {
    try {
      const response = await fetch(`${API_BASE}/prayer/${prayerId}/complete`, {
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
        return { success: false, error: result.message || 'Failed to mark prayer as completed' };
      }
    } catch (error) {
      console.error('Error marking prayer completed:', error);
      return { success: false, error: 'Network error' };
    }
  }
};

// Usage examples for your components:

/*
// In your React components, use these functions like this:

import { prayerService } from '../services/prayerService';
import { useAuth } from '../context/AuthContext';

const PrayerComponent = () => {
  const { token } = useAuth();
  const [prayers, setPrayers] = useState([]);

  // Fetch today's prayers
  const fetchPrayers = async () => {
    const result = await prayerService.getTodaysPrayers(token);
    if (result.success) {
      setPrayers(result.data);
    } else if (result.needsCreation) {
      // Create today's prayers if they don't exist
      await createTodaysPrayers();
    }
  };

  // Create today's prayers
  const createTodaysPrayers = async () => {
    const result = await prayerService.logPrayers(token);
    if (result.success) {
      setPrayers(result.data);
    }
  };

  // Mark prayer as completed
  const completePrayer = async (prayerId) => {
    const result = await prayerService.markPrayerCompleted(token, prayerId);
    if (result.success) {
      // Refresh prayers to show updated status
      fetchPrayers();
    }
  };

  return (
    // Your prayer component JSX
  );
};
*/

export default prayerService;