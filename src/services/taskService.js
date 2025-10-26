import { apiService } from '../api';
import { API_ENDPOINTS } from '../constants';

/**
 * Task API Service
 * Handles all task-related API calls
 */
export const taskService = {
  /**
   * Create a new task
   * @param {Object} taskData - Task data (title, description, date, etc.)
   * @returns {Promise<Object>} Response with success status and data/error
   */
  createTask: async (taskData) => {
    const result = await apiService.post(API_ENDPOINTS.TASK.CREATE, taskData);
    return result;
  },

  /**
   * Get all tasks for the authenticated user
   * @returns {Promise<Object>} Response with success status and tasks array
   */
  getAllTasks: async () => {
    const result = await apiService.get(API_ENDPOINTS.TASK.GET_ALL);
    
    if (result.success) {
      // Normalize task data structure
      const tasks = Array.isArray(result.data?.message) 
        ? result.data.message.map(task => ({
            _id: task._id || task.id,
            id: task._id || task.id,
            userId: task.userId,
            title: task.title,
            description: task.description,
            isCompleted: task.isCompleted,
            date: task.date,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
          }))
        : result.data?.data || [];
      
      return { success: true, data: tasks };
    }
    
    return result;
  },

  /**
   * Get a specific task by ID
   * @param {string} taskId - Task ID
   * @returns {Promise<Object>} Response with success status and task data
   */
  getTaskById: async (taskId) => {
    const result = await apiService.get(API_ENDPOINTS.TASK.GET_BY_ID(taskId));
    return result;
  },

  /**
   * Update a task
   * @param {string} taskId - Task ID
   * @param {Object} updateData - Updated task data
   * @returns {Promise<Object>} Response with success status and updated task
   */
  updateTask: async (taskId, updateData) => {
    const result = await apiService.put(
      API_ENDPOINTS.TASK.UPDATE(taskId),
      updateData
    );
    return result;
  },

  /**
   * Delete a task
   * @param {string} taskId - Task ID
   * @returns {Promise<Object>} Response with success status
   */
  deleteTask: async (taskId) => {
    const result = await apiService.delete(API_ENDPOINTS.TASK.DELETE(taskId));
    return result;
  },

  /**
   * Mark task as complete/incomplete
   * @param {string} taskId - Task ID
   * @param {boolean} isCompleted - Completion status
   * @returns {Promise<Object>} Response with success status and updated task
   */
  markTaskComplete: async (taskId, isCompleted = true) => {
    const result = await apiService.put(
      API_ENDPOINTS.TASK.MARK_COMPLETE(taskId),
      { isCompleted }
    );
    return result;
  },
};

export default taskService;