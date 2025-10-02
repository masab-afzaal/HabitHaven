// Task API Service
// This file contains all the API calls for task functionality
// Based on your backend routes: /api/v1/task

const API_BASE = import.meta.env.VITE_API_BASE;

export const taskService = {
  // POST /api/v1/task/createTask - Create a new task
  createTask: async (token, taskData) => {
    try {
      const response = await fetch(`${API_BASE}/task/createTask`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.message || 'Failed to create task' };
      }
    } catch (error) {
      console.error('Error creating task:', error);
      return { success: false, error: 'Network error' };
    }
  },

  // GET /api/v1/task/allTask - Get all tasks for the user
  getAllTasks: async (token) => {
    try {
      const response = await fetch(`${API_BASE}/task/allTask`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (response.ok) {
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.message || 'Failed to fetch tasks' };
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return { success: false, error: 'Network error' };
    }
  },

  // GET /api/v1/task/:id - Get a specific task by ID
  getTaskById: async (token, taskId) => {
    try {
      const response = await fetch(`${API_BASE}/task/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (response.ok) {
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.message || 'Failed to fetch task' };
      }
    } catch (error) {
      console.error('Error fetching task:', error);
      return { success: false, error: 'Network error' };
    }
  },

  // PUT /api/v1/task/update/:id - Update a task
  updateTask: async (token, taskId, updateData) => {
    try {
      const response = await fetch(`${API_BASE}/task/update/${taskId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.message || 'Failed to update task' };
      }
    } catch (error) {
      console.error('Error updating task:', error);
      return { success: false, error: 'Network error' };
    }
  },

  // DELETE /api/v1/task/delete/:id - Delete a task
  deleteTask: async (token, taskId) => {
    try {
      const response = await fetch(`${API_BASE}/task/delete/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (response.ok) {
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.message || 'Failed to delete task' };
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      return { success: false, error: 'Network error' };
    }
  },

  // PUT /api/v1/task/complete/:id - Mark task as complete/incomplete
  markTaskComplete: async (token, taskId, isCompleted = true) => {
    try {
      const response = await fetch(`${API_BASE}/task/complete/${taskId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isCompleted })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.message || 'Failed to mark task complete' };
      }
    } catch (error) {
      console.error('Error marking task complete:', error);
      return { success: false, error: 'Network error' };
    }
  }
};

export default taskService;