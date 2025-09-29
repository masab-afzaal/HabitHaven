import React, { useState, useEffect } from 'react';
import { User, Calendar, Target, Settings, LogOut, Heart, Star, Clock, Plus, Trash2, Edit, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Dashboard Component
const Dashboard = () => {
  const { user, logout, token } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [tasks, setTasks] = useState([]);
  const [prayers, setPrayers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_BASE = 'http://localhost:5000/api/v1';

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_BASE}/task/allTask`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (response.ok) {
        setTasks(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Fetch today's prayers
  const fetchPrayers = async () => {
    try {
      const response = await fetch(`${API_BASE}/prayer/prayers/today`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (response.ok) {
        setPrayers(result.data || []);
      } else if (response.status === 404) {
        // No prayers for today, create them
        await createTodaysPrayers();
      }
    } catch (error) {
      console.error('Error fetching prayers:', error);
    }
  };

  // Create today's prayers (Backend expects: prayers, startDate, endDate, prayerType)
  const createTodaysPrayers = async () => {
    try {
      const response = await fetch(`${API_BASE}/prayer/prayers`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prayers: "Today's prayers",
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
          prayerType: "fajr"
        })
      });
      const result = await response.json();
      if (response.ok) {
        setPrayers(result.data || []);
      }
    } catch (error) {
      console.error('Error creating prayers:', error);
    }
  };

  // Mark prayer as completed
  const markPrayerComplete = async (prayerId) => {
    try {
      const response = await fetch(`${API_BASE}/prayer/${prayerId}/compelete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        fetchPrayers(); // Refresh prayers
      }
    } catch (error) {
      console.error('Error marking prayer complete:', error);
    }
  };

  // Create task
  const createTask = async (taskData) => {
    try {
      const response = await fetch(`${API_BASE}/task/createTask`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: taskData.title,
          description: taskData.description,
          date: taskData.date
        })
      });
      if (response.ok) {
        fetchTasks(); // Refresh tasks
        return { success: true };
      } else {
        const result = await response.json();
        return { success: false, error: result.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  // Mark task as complete
  const markTaskComplete = async (taskId, isCompleted) => {
    try {
      const response = await fetch(`${API_BASE}/task/complete/${taskId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isCompleted })
      });
      if (response.ok) {
        fetchTasks(); // Refresh tasks
      }
    } catch (error) {
      console.error('Error marking task complete:', error);
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_BASE}/task/delete/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        fetchTasks(); // Refresh tasks
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Fetch user's challenges
  const fetchChallenges = async () => {
    try {
      const response = await fetch(`${API_BASE}/challenge/my-challenges`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (response.ok) {
        setChallenges(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  };

  // Create challenge
  const createChallenge = async (challengeData) => {
    try {
      const response = await fetch(`${API_BASE}/challenge/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: challengeData.title,
          description: challengeData.description,
          goal: challengeData.goal,
          totalDays: challengeData.totalDays,
          isGroup: challengeData.isGroup
        })
      });
      if (response.ok) {
        fetchChallenges();
        return { success: true };
      } else {
        const result = await response.json();
        return { success: false, error: result.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  // Join challenge
  const joinChallenge = async (challengeId) => {
    try {
      const response = await fetch(`${API_BASE}/challenge/join/${challengeId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        fetchChallenges();
        return { success: true };
      } else {
        const result = await response.json();
        return { success: false, error: result.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  // Update challenge progress
  const updateChallengeProgress = async (challengeId) => {
    try {
      const response = await fetch(`${API_BASE}/challenge/${challengeId}/progress`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        fetchChallenges();
        return { success: true };
      } else {
        const result = await response.json();
        return { success: false, error: result.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  // Create group
  const createGroup = async (groupData) => {
    try {
      const response = await fetch(`${API_BASE}/group/createGroup`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: groupData.name,
          description: groupData.description
        })
      });
      if (response.ok) {
        return { success: true };
      } else {
        const result = await response.json();
        return { success: false, error: result.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  // Join group
  const joinGroup = async (groupId) => {
    try {
      const response = await fetch(`${API_BASE}/group/${groupId}/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        return { success: true };
      } else {
        const result = await response.json();
        return { success: false, error: result.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchTasks(), fetchPrayers(), fetchChallenges()]);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setError('Failed to load dashboard data');
      }
      setLoading(false);
    };
    
    if (token && user) {
      loadData();
    }
  }, [token, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <div className="text-lg font-semibold text-gray-900">Loading Dashboard...</div>
        </div>
      </div>
    );
  }

  const DashboardSidebar = () => (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 h-full">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">SoulTracker</h2>
            <p className="text-sm text-gray-600">Dashboard</p>
          </div>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === 'overview' 
                ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('prayers')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === 'prayers' 
                ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span>Prayers</span>
          </button>

          <button
            onClick={() => setActiveTab('habits')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === 'habits' 
                ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Target className="w-5 h-5" />
            <span>Habits</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === 'profile' 
                ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('challenges')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === 'challenges' 
                ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Star className="w-5 h-5" />
            <span>Challenges</span>
          </button>

          <button
            onClick={() => setActiveTab('groups')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === 'groups' 
                ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <User className="w-5 h-5" />
            <span>Groups</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
              activeTab === 'settings' 
                ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );

  const OverviewTab = () => {
    // Safety checks for arrays
    const safePrayers = Array.isArray(prayers) ? prayers : [];
    const safeTasks = Array.isArray(tasks) ? tasks : [];
    
    const completedPrayers = safePrayers.filter(p => p.isCompleted).length;
    const totalPrayers = safePrayers.length;
    const mandatoryPrayers = safePrayers.filter(p => p.prayerName !== 'Tahajjud');
    const completedMandatory = mandatoryPrayers.filter(p => p.isCompleted).length;
    const totalTasks = safeTasks.length;
    const completedTasks = safeTasks.filter(t => t.isCompleted).length;
    const prayerPercentage = totalPrayers > 0 ? (completedPrayers / totalPrayers) * 100 : 0;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.fullName || user?.username}!</h1>
            <p className="text-gray-600">Here's your spiritual journey overview</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Today</div>
            <div className="text-lg font-semibold text-gray-900">{new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Prayers</p>
                <p className="text-2xl font-bold text-green-600">{completedMandatory}/{mandatoryPrayers.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${mandatoryPrayers.length > 0 ? (completedMandatory / mandatoryPrayers.length) * 100 : 0}%` }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Tasks</p>
                <p className="text-2xl font-bold text-blue-600">{completedTasks}/{totalTasks}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">{completedTasks} completed today</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">User Level</p>
                <p className="text-2xl font-bold text-purple-600">{user?.level || 1}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">XP: {user?.xp || 0} | Streak: {user?.streakCount || 0} days</p>
            </div>
          </div>
        </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {Array.isArray(prayers) ? prayers.filter(p => p.isCompleted).slice(-3).map((prayer) => (
            <div key={prayer._id} className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{prayer.prayerName} completed</p>
                <p className="text-sm text-gray-600">Today</p>
              </div>
            </div>
          )) : []}

          {Array.isArray(tasks) ? tasks.filter(t => t.isCompleted).slice(-2).map((task) => (
            <div key={task._id} className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{task.title} completed</p>
                <p className="text-sm text-gray-600">{new Date(task.date).toLocaleDateString()}</p>
              </div>
            </div>
          )) : []}
          
          {((!Array.isArray(prayers)) || (Array.isArray(prayers) && prayers.filter(p => p.isCompleted).length === 0)) && ((!Array.isArray(tasks)) || (Array.isArray(tasks) && tasks.filter(t => t.isCompleted).length === 0)) && (
            <p className="text-gray-500 text-center py-4">No recent activity. Complete some prayers or tasks to see them here!</p>
          )}
        </div>
      </div>
    </div>
    );
  };

  const PrayersTab = () => {
    const safePrayers = Array.isArray(prayers) ? prayers : [];
    const completedPrayers = safePrayers.filter(p => p.isCompleted).length;
    const totalPrayers = safePrayers.length;
    const completionRate = totalPrayers > 0 ? Math.round((completedPrayers / totalPrayers) * 100) : 0;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Prayer Tracker</h1>
          <button 
            onClick={createTodaysPrayers}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Refresh Prayers
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Prayers</h3>
            <div className="space-y-3">
              {safePrayers.map((prayer) => (
                <div 
                  key={prayer._id}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    prayer.isCompleted ? 'bg-green-50' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => !prayer.isCompleted && markPrayerComplete(prayer._id)}
                >
                  <span className="font-medium text-gray-900">{prayer.prayerName}</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    prayer.isCompleted ? 'bg-green-600' : 'bg-gray-300'
                  }`}>
                    {prayer.isCompleted && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
              ))}
              {safePrayers.length === 0 && (
                <p className="text-gray-500 text-center py-4">No prayers logged for today. Click "Refresh Prayers" to create them.</p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Progress</h3>
            <div className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{completionRate}%</div>
                <div className="text-sm text-gray-600">Prayer completion rate today</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completed: {completedPrayers}</span>
                  <span>Total: {totalPrayers}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${completionRate}%` }}
                  ></div>
                </div>
              </div>
              {user?.badges && user.badges.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Badges</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.badges.slice(-3).map((badge, index) => (
                      <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HabitsTab = () => {
    const [showAddTask, setShowAddTask] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', description: '', date: new Date().toISOString().split('T')[0] });
    const [taskLoading, setTaskLoading] = useState(false);

    const handleAddTask = async (e) => {
      e.preventDefault();
      if (!newTask.title.trim()) return;
      
      setTaskLoading(true);
      const result = await createTask(newTask);
      
      if (result.success) {
        setNewTask({ title: '', description: '', date: new Date().toISOString().split('T')[0] });
        setShowAddTask(false);
      } else {
        setError(result.error);
      }
      setTaskLoading(false);
    };

    const safeTasks = Array.isArray(tasks) ? tasks : [];
    const todaysTasks = safeTasks.filter(task => {
      const taskDate = new Date(task.date).toDateString();
      const today = new Date().toDateString();
      return taskDate === today;
    });

    const completedToday = todaysTasks.filter(t => t.isCompleted).length;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
          <button 
            onClick={() => setShowAddTask(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>

        {showAddTask && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Task</h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter task title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter task description (optional)"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newTask.date}
                  onChange={(e) => setNewTask({...newTask, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={taskLoading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {taskLoading ? 'Creating...' : 'Create Task'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddTask(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Tasks</h3>
            <div className="space-y-3">
              {todaysTasks.map((task) => (
                <div key={task._id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => markTaskComplete(task._id, !task.isCompleted)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        task.isCompleted ? 'bg-green-600' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    >
                      {task.isCompleted && <Check className="w-4 h-4 text-white" />}
                    </button>
                    <div>
                      <p className={`font-medium ${task.isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {task.title}
                      </p>
                      {task.description && (
                        <p className="text-sm text-gray-600">{task.description}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {todaysTasks.length === 0 && (
                <p className="text-gray-500 text-center py-4">No tasks for today. Create one to get started!</p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Overview</h3>
            <div className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{completedToday}/{todaysTasks.length}</div>
                <div className="text-sm text-gray-600">Tasks completed today</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Tasks: {safeTasks.length}</span>
                  <span>Completed: {safeTasks.filter(t => t.isCompleted).length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${safeTasks.length > 0 ? (safeTasks.filter(t => t.isCompleted).length / safeTasks.length) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              {safeTasks.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Tasks</h4>
                  <div className="space-y-1">
                    {safeTasks.slice(-3).map((task) => (
                      <div key={task._id} className="text-xs text-gray-600">
                        <span className={task.isCompleted ? 'line-through' : ''}>{task.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProfileTab = () => {
    const { updateAccount } = useAuth();
    const [profileData, setProfileData] = useState({
      fullName: user?.fullName || '',
      email: user?.email || '',
      username: user?.username || ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleUpdateProfile = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage('');

      const result = await updateAccount(profileData);
      
      if (result.success) {
        setMessage('Profile updated successfully!');
      } else {
        setMessage(`Error: ${result.error}`);
      }
      
      setLoading(false);
      
      setTimeout(() => setMessage(''), 3000);
    };

    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user?.fullName || user?.username}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>

          {message && (
            <div className={`mb-4 px-4 py-3 rounded-lg ${
              message.includes('Error') 
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-green-50 border border-green-200 text-green-700'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={profileData.username}
                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    );
  };

  const SettingsTab = () => {
    const { changePassword } = useAuth();
    const [passwordData, setPasswordData] = useState({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChangePassword = async (e) => {
      e.preventDefault();
      
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        setMessage('Error: New passwords do not match');
        return;
      }

      setLoading(true);
      setMessage('');

      const result = await changePassword(passwordData.oldPassword, passwordData.newPassword);
      
      if (result.success) {
        setMessage('Password changed successfully!');
        setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setMessage(`Error: ${result.error}`);
      }
      
      setLoading(false);
      
      setTimeout(() => setMessage(''), 3000);
    };

    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
          
          {message && (
            <div className={`mb-4 px-4 py-3 rounded-lg ${
              message.includes('Error') 
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-green-50 border border-green-200 text-green-700'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={passwordData.oldPassword}
                onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Changing Password...' : 'Change Password'}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Prayer Reminders</p>
                <p className="text-sm text-gray-600">Get notified for prayer times</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Habit Reminders</p>
                <p className="text-sm text-gray-600">Daily habit completion reminders</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Dark Mode</p>
                <p className="text-sm text-gray-600">Switch to dark theme</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ChallengesTab = () => {
    const [showCreateChallenge, setShowCreateChallenge] = useState(false);
    const [newChallenge, setNewChallenge] = useState({
      title: '',
      description: '',
      goal: '',
      totalDays: '',
      isGroup: false
    });
    const [challengeLoading, setChallengeLoading] = useState(false);

    const handleCreateChallenge = async (e) => {
      e.preventDefault();
      if (!newChallenge.title.trim() || !newChallenge.totalDays) return;
      
      setChallengeLoading(true);
      const result = await createChallenge({
        ...newChallenge,
        totalDays: parseInt(newChallenge.totalDays)
      });
      
      if (result.success) {
        setNewChallenge({ title: '', description: '', goal: '', totalDays: '', isGroup: false });
        setShowCreateChallenge(false);
      } else {
        setError(result.error);
      }
      setChallengeLoading(false);
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Challenges</h1>
          <button 
            onClick={() => setShowCreateChallenge(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Challenge</span>
          </button>
        </div>

        {showCreateChallenge && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Challenge</h3>
            <form onSubmit={handleCreateChallenge} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newChallenge.title}
                  onChange={(e) => setNewChallenge({...newChallenge, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Challenge title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newChallenge.description}
                  onChange={(e) => setNewChallenge({...newChallenge, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your challenge"
                  rows="3"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
                  <input
                    type="text"
                    value={newChallenge.goal}
                    onChange={(e) => setNewChallenge({...newChallenge, goal: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="What's the goal?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Days</label>
                  <input
                    type="number"
                    value={newChallenge.totalDays}
                    onChange={(e) => setNewChallenge({...newChallenge, totalDays: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="30"
                    min="1"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newChallenge.isGroup}
                  onChange={(e) => setNewChallenge({...newChallenge, isGroup: e.target.checked})}
                  className="rounded"
                />
                <label className="text-sm text-gray-700">Group Challenge</label>
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  disabled={challengeLoading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {challengeLoading ? 'Creating...' : 'Create Challenge'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateChallenge(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Challenges</h3>
            <div className="space-y-3">
              {Array.isArray(challenges) ? challenges.map((participant) => {
                const challenge = participant.challengeId;
                const progress = (participant.progress / challenge.totalDays) * 100;
                
                return (
                  <div key={participant._id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{challenge.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        participant.completed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {participant.completed ? 'Completed' : 'Active'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress: {participant.progress}/{challenge.totalDays} days</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      {!participant.completed && (
                        <button
                          onClick={() => updateChallengeProgress(challenge._id)}
                          className="w-full mt-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          Mark Day Complete
                        </button>
                      )}
                    </div>
                  </div>
                );
              }) : []}
              {(!Array.isArray(challenges) || challenges.length === 0) && (
                <p className="text-gray-500 text-center py-4">No challenges yet. Create one to get started!</p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Challenge Stats</h3>
            <div className="space-y-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {Array.isArray(challenges) ? challenges.filter(c => c.completed).length : 0}
                </div>
                <div className="text-sm text-gray-600">Completed Challenges</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {Array.isArray(challenges) ? challenges.filter(c => !c.completed).length : 0}
                </div>
                <div className="text-sm text-gray-600">Active Challenges</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {Array.isArray(challenges) ? challenges.reduce((acc, c) => acc + c.progress, 0) : 0}
                </div>
                <div className="text-sm text-gray-600">Total Days Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const GroupsTab = () => {
    const [showCreateGroup, setShowCreateGroup] = useState(false);
    const [newGroup, setNewGroup] = useState({ name: '', description: '' });
    const [groupLoading, setGroupLoading] = useState(false);
    const [joinGroupId, setJoinGroupId] = useState('');

    const handleCreateGroup = async (e) => {
      e.preventDefault();
      if (!newGroup.name.trim()) return;
      
      setGroupLoading(true);
      const result = await createGroup(newGroup);
      
      if (result.success) {
        setNewGroup({ name: '', description: '' });
        setShowCreateGroup(false);
      } else {
        setError(result.error);
      }
      setGroupLoading(false);
    };

    const handleJoinGroup = async (e) => {
      e.preventDefault();
      if (!joinGroupId.trim()) return;
      
      const result = await joinGroup(joinGroupId);
      
      if (result.success) {
        setJoinGroupId('');
        setError(''); // Clear any previous errors
        // You might want to show a success message here
      } else {
        setError(result.error);
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
          <button 
            onClick={() => setShowCreateGroup(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Group</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {showCreateGroup && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Group</h3>
              <form onSubmit={handleCreateGroup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
                  <input
                    type="text"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter group name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your group"
                    rows="3"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    disabled={groupLoading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {groupLoading ? 'Creating...' : 'Create Group'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateGroup(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Join Group</h3>
            <form onSubmit={handleJoinGroup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Group ID</label>
                <input
                  type="text"
                  value={joinGroupId}
                  onChange={(e) => setJoinGroupId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter group ID to join"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Join Group
              </button>
            </form>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Group Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Community Support</h4>
              <p className="text-sm text-gray-600">Join others on similar spiritual journeys</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Shared Goals</h4>
              <p className="text-sm text-gray-600">Work together towards common objectives</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Motivation</h4>
              <p className="text-sm text-gray-600">Stay motivated with group accountability</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'prayers':
        return <PrayersTab />;
      case 'habits':
        return <HabitsTab />;
      case 'profile':
        return <ProfileTab />;
      case 'challenges':
        return <ChallengesTab />;
      case 'groups':
        return <GroupsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      <div className="flex-1 overflow-hidden">
        <div className="p-8">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;