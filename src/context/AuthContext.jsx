import React, { useState, useEffect, createContext, useContext } from 'react';

// Auth Context
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const API_BASE = 'http://localhost:5000/api/v1/user';
  


  useEffect(() => {
    if (token) {
      getCurrentUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const getCurrentUser = async () => {
    try {
  const response = await fetch(`${API_BASE}/my-account`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        setUser(result.data); // Backend returns user in data field
      } else {
        logout();
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {

      
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      

      
      let result;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        // Handle HTML error responses
        const text = await response.text();
        result = { message: text.includes('User Not Exists') ? 'User Not Exists' : 'Server Error' };
      }
      

      
      if (response.ok) {
  
        
        // Handle different possible response formats
        let user, accessToken;
        
        // Try multiple possible response formats
        if (result.data && typeof result.data === 'object') {
          // ApiResponse format: { statusCode, data: { user, accessToken, refreshToken }, message }
          user = result.data.user;
          accessToken = result.data.accessToken;

        } else if (result.user && result.accessToken) {
          // Direct format: { user, accessToken, refreshToken }
          user = result.user;
          accessToken = result.accessToken;

        } else if (result[1] && typeof result[1] === 'object') {
          // Alternative ApiResponse format: [statusCode, data, message]
          user = result[1].user;
          accessToken = result[1].accessToken;

        } else {
          // Try to find user and accessToken anywhere in the response
          const findInObject = (obj, key) => {
            if (obj && typeof obj === 'object') {
              if (obj[key]) return obj[key];
              for (let prop in obj) {
                if (typeof obj[prop] === 'object') {
                  const found = findInObject(obj[prop], key);
                  if (found) return found;
                }
              }
            }
            return null;
          };
          
          user = findInObject(result, 'user');
          accessToken = findInObject(result, 'accessToken');

        }
        

        
        if (accessToken && user) {
          setToken(accessToken);
          localStorage.setItem('token', accessToken);
          setUser(user);
          return { success: true };
        } else {
          console.error('Missing token or user in response');
          console.error('Available keys in result:', Object.keys(result));
          return { success: false, error: 'Missing authentication data' };
        }
      } else {
        console.error('Login failed with status:', response.status);
        // Handle backend error responses
        let errorMessage = 'Login failed';
        if (result.message === 'User Not Exists') {
          errorMessage = 'User does not exist. Please register first.';
        } else if (result.message === 'Invalid User Credentials') {
          errorMessage = 'Invalid email or password.';
        } else if (result.message) {
          errorMessage = result.message;
        }
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error' };
    }
  };

  const register = async (username, email, password, fullName) => {
    try {
  const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullName, email, username, password })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        return { success: true, message: result.message || 'Registration successful! Please login.' };
      } else {
        return { success: false, error: result.message || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const logout = async () => {
    try {
      if (token) {
  await fetch(`${API_BASE}/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
    }
  };

  const updateAccount = async (updateData) => {
    try {
  const response = await fetch(`${API_BASE}/update-Account`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setUser(result.data); // Backend returns updated user in data field
        return { success: true, message: result.message };
      } else {
        return { success: false, error: result.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
  const response = await fetch(`${API_BASE}/change-Password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ oldPassword, newPassword })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        return { success: true, message: result.message };
      } else {
        return { success: false, error: result.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      register,
      logout,
      updateAccount,
      changePassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};
