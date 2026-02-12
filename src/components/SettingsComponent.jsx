import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Grid,
  Divider,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar,
  Card,
  CardContent,
  InputAdornment,
  Tabs,
  Tab
} from '@mui/material';
import {
  Person,
  Email,
  Lock,
  PhotoCamera,
  Notifications,
  Security,
  Palette,
  Language,
  ArrowBack
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { settingsStyles } from '../styles/settingsStyles';
import API_CONFIG from '../config/api.config';

const SettingsComponent = ({ onBack }) => {
  const { user, token } = useAuth();
  
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // Profile state
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    username: user?.username || '',
    avatar: user?.avatar || ''
  });
  
  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    prayerReminders: true,
    taskReminders: true,
    groupUpdates: true,
    challengeUpdates: false
  });
  
  // Appearance settings
  const [appearance, setAppearance] = useState({
    darkMode: false,
    language: 'English',
    fontSize: 'Medium'
  });

  const API_BASE = `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}`;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleProfileChange = (field) => (event) => {
    setProfileData({ ...profileData, [field]: event.target.value });
  };

  const handlePasswordChange = (field) => (event) => {
    setPasswordData({ ...passwordData, [field]: event.target.value });
  };

  const handleNotificationToggle = (setting) => (event) => {
    setNotifications({ ...notifications, [setting]: event.target.checked });
  };

  const handleAppearanceChange = (setting) => (event) => {
    setAppearance({ ...appearance, [setting]: event.target.checked || event.target.value });
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/user/update-Account`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: profileData.fullName,
          email: profileData.email
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        setProfileData({
          ...profileData,
          fullName: result.data?.fullName || profileData.fullName,
          email: result.data?.email || profileData.email
        });
        setSnackbar({
          open: true,
          message: 'Profile updated successfully!',
          severity: 'success'
        });
      } else {
        throw new Error(result.message || 'Failed to update profile');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Error updating profile',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSnackbar({
        open: true,
        message: 'New passwords do not match',
        severity: 'error'
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setSnackbar({
        open: true,
        message: 'Password must be at least 6 characters long',
        severity: 'error'
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/user/change-Password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          oldPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setSnackbar({
          open: true,
          message: 'Password updated successfully!',
          severity: 'success'
        });
      } else {
        throw new Error(result.message || 'Failed to update password');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Error updating password',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Avatar upload endpoint not available yet
    setSnackbar({
      open: true,
      message: 'Avatar upload feature coming soon!',
      severity: 'info'
    });

    /* Uncomment when backend avatar endpoint is ready
    const formData = new FormData();
    formData.append('avatar', file);

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/user/avatar`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const result = await response.json();
      
      if (response.ok) {
        setProfileData({ ...profileData, avatar: result.data?.avatar || profileData.avatar });
        setSnackbar({
          open: true,
          message: 'Avatar updated successfully!',
          severity: 'success'
        });
      } else {
        throw new Error(result.message || 'Failed to update avatar');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Error updating avatar',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
    */
  };

  const handleSaveNotifications = () => {
    // Save notifications to local storage or backend
    localStorage.setItem('notificationSettings', JSON.stringify(notifications));
    setSnackbar({
      open: true,
      message: 'Notification preferences saved!',
      severity: 'success'
    });
  };

  const handleSaveAppearance = () => {
    // Save appearance settings to local storage
    localStorage.setItem('appearanceSettings', JSON.stringify(appearance));
    setSnackbar({
      open: true,
      message: 'Appearance settings saved!',
      severity: 'success'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={settingsStyles.container}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={settingsStyles.header}>
          {onBack && (
            <IconButton onClick={onBack} sx={settingsStyles.backButton}>
              <ArrowBack />
            </IconButton>
          )}
          <Typography variant="h4" sx={settingsStyles.title}>
            Settings
          </Typography>
          <Typography variant="body2" sx={settingsStyles.subtitle}>
            Manage your account settings and preferences
          </Typography>
        </Box>

        {/* Tabs */}
        <Paper sx={settingsStyles.tabsPaper}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={settingsStyles.tabs}
          >
            <Tab icon={<Person />} label="Profile" />
            <Tab icon={<Lock />} label="Security" />
            <Tab icon={<Notifications />} label="Notifications" />
            <Tab icon={<Palette />} label="Appearance" />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        <Box sx={settingsStyles.tabContent}>
          {/* Profile Tab */}
          {activeTab === 0 && (
            <Card sx={settingsStyles.card}>
              <CardContent>
                <Typography variant="h6" sx={settingsStyles.sectionTitle}>
                  Profile Information
                </Typography>
                
                {/* Avatar Section */}
                <Box sx={settingsStyles.avatarSection}>
                  <Avatar
                    src={profileData.avatar}
                    alt={profileData.fullName}
                    sx={settingsStyles.avatar}
                  >
                    {profileData.fullName?.charAt(0).toUpperCase()}
                  </Avatar>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="avatar-upload"
                    type="file"
                    onChange={handleAvatarUpload}
                  />
                  <label htmlFor="avatar-upload">
                    <IconButton
                      component="span"
                      sx={settingsStyles.avatarButton}
                      disabled={loading}
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Profile Fields */}
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={profileData.fullName}
                      onChange={handleProfileChange('fullName')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Username"
                      value={profileData.username}
                      disabled
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person />
                          </InputAdornment>
                        )
                      }}
                      helperText="Username cannot be changed"
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={profileData.email}
                      onChange={handleProfileChange('email')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>

                <Box sx={settingsStyles.buttonContainer}>
                  <Button
                    variant="contained"
                    onClick={handleProfileUpdate}
                    disabled={loading}
                    sx={settingsStyles.saveButton}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Security Tab */}
          {activeTab === 1 && (
            <Card sx={settingsStyles.card}>
              <CardContent>
                <Typography variant="h6" sx={settingsStyles.sectionTitle}>
                  Change Password
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Current Password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange('currentPassword')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      type="password"
                      label="New Password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange('newPassword')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock />
                          </InputAdornment>
                        )
                      }}
                      helperText="Minimum 6 characters"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Confirm New Password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange('confirmPassword')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>

                <Box sx={settingsStyles.buttonContainer}>
                  <Button
                    variant="contained"
                    onClick={handlePasswordUpdate}
                    disabled={loading}
                    sx={settingsStyles.saveButton}
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Notifications Tab */}
          {activeTab === 2 && (
            <Card sx={settingsStyles.card}>
              <CardContent>
                <Typography variant="h6" sx={settingsStyles.sectionTitle}>
                  Notification Preferences
                </Typography>
                
                <Box sx={settingsStyles.settingsList}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.emailNotifications}
                        onChange={handleNotificationToggle('emailNotifications')}
                        color="primary"
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body1">Email Notifications</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Receive updates via email
                        </Typography>
                      </Box>
                    }
                    sx={settingsStyles.formControl}
                  />
                  
                  <Divider />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.pushNotifications}
                        onChange={handleNotificationToggle('pushNotifications')}
                        color="primary"
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body1">Push Notifications</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Receive push notifications in browser
                        </Typography>
                      </Box>
                    }
                    sx={settingsStyles.formControl}
                  />
                  
                  <Divider />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.prayerReminders}
                        onChange={handleNotificationToggle('prayerReminders')}
                        color="primary"
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body1">Prayer Reminders</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Get reminded about prayer times
                        </Typography>
                      </Box>
                    }
                    sx={settingsStyles.formControl}
                  />
                  
                  <Divider />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.taskReminders}
                        onChange={handleNotificationToggle('taskReminders')}
                        color="primary"
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body1">Task Reminders</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Get reminded about upcoming tasks
                        </Typography>
                      </Box>
                    }
                    sx={settingsStyles.formControl}
                  />
                  
                  <Divider />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.groupUpdates}
                        onChange={handleNotificationToggle('groupUpdates')}
                        color="primary"
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body1">Group Updates</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Stay updated with group activities
                        </Typography>
                      </Box>
                    }
                    sx={settingsStyles.formControl}
                  />
                  
                  <Divider />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notifications.challengeUpdates}
                        onChange={handleNotificationToggle('challengeUpdates')}
                        color="primary"
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body1">Challenge Updates</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Get notified about challenge progress
                        </Typography>
                      </Box>
                    }
                    sx={settingsStyles.formControl}
                  />
                </Box>

                <Box sx={settingsStyles.buttonContainer}>
                  <Button
                    variant="contained"
                    onClick={handleSaveNotifications}
                    sx={settingsStyles.saveButton}
                  >
                    Save Preferences
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Appearance Tab */}
          {activeTab === 3 && (
            <Card sx={settingsStyles.card}>
              <CardContent>
                <Typography variant="h6" sx={settingsStyles.sectionTitle}>
                  Appearance Settings
                </Typography>
                
                <Box sx={settingsStyles.settingsList}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={appearance.darkMode}
                        onChange={handleAppearanceChange('darkMode')}
                        color="primary"
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="body1">Dark Mode</Typography>
                        <Typography variant="caption" color="text.secondary">
                          Switch to dark theme (Coming soon)
                        </Typography>
                      </Box>
                    }
                    sx={settingsStyles.formControl}
                  />
                  
                  <Divider />
                  
                  <Box sx={{ py: 2 }}>
                    <Typography variant="body1" gutterBottom>
                      Language
                    </Typography>
                    <Typography variant="caption" color="text.secondary" gutterBottom>
                      Choose your preferred language (Coming soon)
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      value={appearance.language}
                      onChange={handleAppearanceChange('language')}
                      SelectProps={{ native: true }}
                      sx={{ mt: 1 }}
                    >
                      <option value="English">English</option>
                      <option value="Arabic">Arabic</option>
                      <option value="Urdu">Urdu</option>
                    </TextField>
                  </Box>
                  
                  <Divider />
                  
                  <Box sx={{ py: 2 }}>
                    <Typography variant="body1" gutterBottom>
                      Font Size
                    </Typography>
                    <Typography variant="caption" color="text.secondary" gutterBottom>
                      Adjust text size for better readability (Coming soon)
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      value={appearance.fontSize}
                      onChange={handleAppearanceChange('fontSize')}
                      SelectProps={{ native: true }}
                      sx={{ mt: 1 }}
                    >
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                    </TextField>
                  </Box>
                </Box>

                <Box sx={settingsStyles.buttonContainer}>
                  <Button
                    variant="contained"
                    onClick={handleSaveAppearance}
                    sx={settingsStyles.saveButton}
                  >
                    Save Settings
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default SettingsComponent;
