import React, { useState, useEffect, createContext, useContext } from 'react';
import { authService } from '../services';

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
  


  useEffect(() => {
    if (token) {
      getCurrentUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const getCurrentUser = async () => {
    try {
      const result = await authService.getCurrentUser();
      
      if (result.success) {
        setUser(result.data.data || result.data); // Backend returns user in data field
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
      const result = await authService.login(email, password);
      
      if (result.success) {
        const { user, accessToken } = result;
        setToken(accessToken);
        localStorage.setItem('token', accessToken);
        setUser(user);
        return { success: true };
      } else {
        // Handle backend error responses
        let errorMessage = 'Login failed';
        if (result.error?.includes('User Not Exists') || result.error?.includes('not exist')) {
          errorMessage = 'User does not exist. Please register first.';
        } else if (result.error?.includes('Invalid') || result.error?.includes('Credentials')) {
          errorMessage = 'Invalid email or password.';
        } else if (result.error) {
          errorMessage = result.error;
        }
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error' };
    }
  };

  const register = async (fullName, username, email, password) => {
    try {
      const result = await authService.register({ fullName, email, username, password });
      
      if (result.success) {
        // Auto-login after successful registration
        const loginResult = await login(email, password);
        if (loginResult.success) {
          return { success: true, message: 'Registration successful! Welcome to HabitHaven!' };
        } else {
          return { success: true, message: 'Registration successful! Please login.', autoLogin: false };
        }
      } else {
        return { success: false, error: result.error || 'Registration failed' };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await authService.logout();
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
      const result = await authService.updateAccount(updateData);
      
      if (result.success) {
        setUser(result.data.data || result.data); // Backend returns updated user in data field
        return { success: true, message: result.data.message };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      const result = await authService.changePassword(oldPassword, newPassword);
      
      if (result.success) {
        return { success: true, message: result.data.message };
      } else {
        return { success: false, error: result.error };
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
