import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  CircularProgress,
  LinearProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Task as TaskIcon,
  Groups as GroupsIcon,
  EmojiEvents as ChallengesIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Add as AddIcon,
  CheckCircle,
  RadioButtonUnchecked,
  Star,
  TrendingUp,
  CalendarToday,
  Notifications,
  Mosque
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import PrayerComponent from './PrayerComponent';
import TaskComponent from './TaskComponent';

const Dashboard = () => {
  const { user, logout, token } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', date: '' });

  const API_BASE = 'http://localhost:5000/api/v1';
  const drawerWidth = 280;

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
        await logTodaysPrayers();
      }
    } catch (error) {
      console.error('Error fetching prayers:', error);
    }
  };

  const logTodaysPrayers = async () => {
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
        setPrayers(result.data || []);
      }
    } catch (error) {
      console.error('Error creating prayers:', error);
    }
  };

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

  const createTask = async () => {
    try {
      const response = await fetch(`${API_BASE}/task/createTask`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      });
      if (response.ok) {
        setNewTask({ title: '', description: '', date: '' });
        setOpenTaskDialog(false);
        fetchTasks();
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const toggleTaskComplete = async (taskId, isCompleted) => {
    try {
      await fetch(`${API_BASE}/task/complete/${taskId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isCompleted: !isCompleted })
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  useEffect(() => {
    if (token && user) {
      const loadData = async () => {
        setLoading(true);
        await Promise.all([fetchTasks(), fetchPrayers()]);
        setLoading(false);
      };
      loadData();
    }
  }, [token, user]);

  // Function to render active tab content
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'tasks':
        return <TaskComponent />;
      case 'prayers':
        return <PrayerComponent />;
      case 'groups':
        return <GroupsTab />;
      case 'challenges':
        return <ChallengesTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab />;
    }
  };

  // Overview Tab Component
  const OverviewTab = () => {
    const safePrayers = Array.isArray(prayers) ? prayers : [];
    const safeTasks = Array.isArray(tasks) ? tasks : [];
    const completedPrayers = safePrayers.filter(p => p.isCompleted).length;
    const totalPrayers = safePrayers.length;
    const mandatoryPrayers = safePrayers.filter(p => p.prayerName !== 'Tahajjud');
    const completedMandatory = mandatoryPrayers.filter(p => p.isCompleted).length;
    const totalTasks = safeTasks.length;
    const completedTasks = safeTasks.filter(t => t.isCompleted).length;

    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
          Welcome back, {user?.fullName || user?.username}!
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Here's your spiritual journey overview for today
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {completedMandatory}/{mandatoryPrayers.length}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Today's Prayers
                    </Typography>
                  </Box>
                  <Mosque sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={mandatoryPrayers.length > 0 ? (completedMandatory / mandatoryPrayers.length) * 100 : 0}
                  sx={{
                    mt: 2,
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    '& .MuiLinearProgress-bar': { backgroundColor: 'rgba(255,255,255,0.9)' }
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {completedTasks}/{totalTasks}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Today's Tasks
                    </Typography>
                  </Box>
                  <TaskIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
                <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                  {completedTasks} completed today
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {user?.streakCount || 0}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Day Streak
                    </Typography>
                  </Box>
                  <TrendingUp sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
                <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                  Keep it up!
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', color: 'white' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      Level {user?.level || 1}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Current Level
                    </Typography>
                  </Box>
                  <Star sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
                <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                  XP: {user?.xp || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Activity */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Recent Activity
            </Typography>
            <Grid container spacing={2}>
              {safePrayers.filter(p => p.isCompleted).slice(-3).map((prayer) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={prayer._id}>
                  <Paper sx={{ p: 2, backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CheckCircle sx={{ color: '#16a34a' }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {prayer.prayerName} completed
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Today
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}

              {safeTasks.filter(t => t.isCompleted).slice(-2).map((task) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={task._id}>
                  <Paper sx={{ p: 2, backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CheckCircle sx={{ color: '#2563eb' }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {task.title} completed
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(task.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {safePrayers.filter(p => p.isCompleted).length === 0 && safeTasks.filter(t => t.isCompleted).length === 0 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No recent activity. Complete some prayers or tasks to see them here!
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    );
  };

  // Tasks Tab Component
  const TasksTab = () => {
    return (
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
          Task Manager
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Task management features coming soon...
        </Typography>
      </Container>
    );
  };

  // Groups Tab Component
  const GroupsTab = () => {
    return (
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
          Groups
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Group features coming soon...
        </Typography>
      </Container>
    );
  };

  // Challenges Tab Component
  const ChallengesTab = () => {
    return (
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
          Challenges
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Challenge features coming soon...
        </Typography>
      </Container>
    );
  };

  // Settings Tab Component
  const SettingsTab = () => {
    return (
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Settings panel coming soon...
        </Typography>
      </Container>
    );
  };

  const menuItems = [
  { id: 'overview', label: 'Overview', icon: <DashboardIcon /> },
  { id: 'tasks', label: 'Tasks', icon: <TaskIcon /> },
  { id: 'prayers', label: 'Prayers', icon: <Mosque /> },
  { id: 'groups', label: 'Groups', icon: <GroupsIcon /> },
  { id: 'challenges', label: 'Challenges', icon: <ChallengesIcon /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
  ];

  const drawer = (
    <Box>
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Box
          sx={{
            width: 64,
            height: 64,
            background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
            boxShadow: '0 8px 32px rgba(20, 184, 166, 0.3)'
          }}
        >
          <Mosque sx={{ color: 'white', fontSize: 32 }} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'teal.700' }}>
          Habit<span style={{ color: '#14b8a6' }}>Haven</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome, {user?.username}!
        </Typography>
      </Box>
      
      <Divider />
      
      <List sx={{ px: 2, py: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            component="button"
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              if (isMobile) setMobileOpen(false);
            }}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              backgroundColor: activeTab === item.id ? 'rgba(20, 184, 166, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: activeTab === item.id ? 'rgba(20, 184, 166, 0.15)' : 'rgba(0, 0, 0, 0.04)',
              }
            }}
          >
            <ListItemIcon sx={{ color: activeTab === item.id ? 'teal.600' : 'text.secondary' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.label}
              sx={{ 
                '& .MuiListItemText-primary': {
                  color: activeTab === item.id ? 'teal.700' : 'text.primary',
                  fontWeight: activeTab === item.id ? 600 : 400
                }
              }}
            />
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
        <Button
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={logout}
          variant="outlined"
          sx={{
            borderColor: 'rgba(239, 68, 68, 0.3)',
            color: 'error.main',
            '&:hover': {
              borderColor: 'error.main',
              backgroundColor: 'rgba(239, 68, 68, 0.05)'
            }
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  if (loading) {
    return (
      <Box 
        sx={{ 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              boxShadow: '0 8px 32px rgba(20, 184, 166, 0.3)'
            }}
          >
            <Mosque sx={{ color: 'white', fontSize: 40 }} />
          </Box>
          <CircularProgress sx={{ color: 'teal.600', mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'teal.700' }}>
            Loading Dashboard...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 100%)'
      }}
    >
      {isMobile && (
        <AppBar position="fixed" sx={{ backgroundColor: 'white', color: 'text.primary' }}>
          <Toolbar>
            <IconButton
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              HabitHaven
            </Typography>
            <IconButton>
              <Notifications />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: 'white',
              borderRight: '1px solid rgba(0, 0, 0, 0.05)'
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: isMobile ? 8 : 0
        }}
      >
        {renderActiveTab()}
      </Box>
    </Box>
  );
};

export default Dashboard;
