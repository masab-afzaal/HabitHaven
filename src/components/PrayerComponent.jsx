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
  CircularProgress,
  LinearProgress,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Avatar,
  Badge,
  Tooltip,
  Divider
} from '@mui/material';
import {
  Mosque,
  CheckCircle,
  RadioButtonUnchecked,
  Star,
  TrendingUp,
  LocalFireDepartment,
  EmojiEvents,
  Schedule,
  Today,
  CalendarMonth,
  Refresh,
  Analytics
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { prayerService } from '../services/prayerService';

const PrayerComponent = () => {
  const { user, token } = useAuth();
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    todayCompleted: 0,
    totalToday: 0,
    streakCount: 0,
    weeklyPercentage: 0,
    monthlyPercentage: 0
  });

  const API_BASE = 'http://localhost:5000/api/v1';

  // Prayer names with colors and icons
  const prayerConfig = {
    'Fajar': { color: '#6366f1', icon: '🌅', time: 'Dawn' },
    'Dhuhr': { color: '#eab308', icon: '☀️', time: 'Noon' },
    'Asr': { color: '#f97316', icon: '🌤️', time: 'Afternoon' },
    'Maghrib': { color: '#ec4899', icon: '🌅', time: 'Sunset' },
    'Isha': { color: '#6366f1', icon: '🌙', time: 'Night' },
    'Tahajjud': { color: '#8b5cf6', icon: '⭐', time: 'Pre-Dawn' }
  };

  const fetchPrayers = async () => {
    try {
      const result = await prayerService.getTodaysPrayers(token);
      console.log('🔍 Prayer API Response:', result);
      
      if (result.success) {
        const prayersData = result.data || [];
        console.log('📊 Normalized Prayer Data:', prayersData);
        setPrayers(prayersData);
        calculateStats(prayersData);
        setError('');
      } else if (result.needsCreation) {
        console.log('🆕 No prayers found, creating new ones...');
        await logTodaysPrayers();
      } else {
        setError(result.error);
        setPrayers([]); // Set empty array on error
      }
    } catch (error) {
      console.error('Error fetching prayers:', error);
      // Don't show error for 404 (backend not implemented) or network errors
      if (error.message && !error.message.includes('404') && !error.message.includes('Failed to fetch')) {
        setError('Failed to fetch prayers');
      }
      setPrayers([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const logTodaysPrayers = async () => {
    setLoading(true);
    try {
      const result = await prayerService.logPrayers(token);
      if (result.success) {
        const prayersData = result.data || [];
        setPrayers(prayersData);
        calculateStats(prayersData);
        setError('');
      } else {
        setError(result.error);
        setPrayers([]); // Set empty array on error
      }
    } catch (error) {
      console.error('Error creating prayers:', error);
      // Don't show error for 404 (backend not implemented) or network errors
      if (error.message && !error.message.includes('404') && !error.message.includes('Failed to fetch')) {
        setError('Failed to create today\'s prayers');
      }
      setPrayers([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const togglePrayerStatus = async (prayerId) => {
    try {
      // Validate prayer ID
      if (!prayerId) {
        setError('Prayer ID is missing');
        return;
      }

      const result = await prayerService.togglePrayerStatus(token, prayerId);
      if (result && result.success) {
        fetchPrayers(); // Refresh prayers and stats
        setError(''); // Clear any previous errors
      } else {
        setError(result?.error || 'Failed to toggle prayer status');
      }
    } catch (error) {
      console.error('Error toggling prayer status:', error);
      setError('Failed to toggle prayer status');
    }
  };

  const calculateStats = (prayersData) => {
    // Ensure prayersData is always an array
    const safePrayersData = Array.isArray(prayersData) ? prayersData : [];
    
    const completed = safePrayersData.filter(p => p.isCompleted).length;
    const total = safePrayersData.length;
    const mandatoryPrayers = safePrayersData.filter(p => p.prayerName !== 'Tahajjud');
    const mandatoryCompleted = mandatoryPrayers.filter(p => p.isCompleted).length;

    setStats({
      todayCompleted: mandatoryCompleted,
      totalToday: mandatoryPrayers.length,
      streakCount: user?.streakCount || 0,
      weeklyPercentage: 85, // This would come from backend analytics
      monthlyPercentage: 78 // This would come from backend analytics
    });
  };

  useEffect(() => {
    if (token && user) {
      fetchPrayers();
    }
  }, [token, user]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress sx={{ color: 'teal.600', mb: 2 }} />
          <Typography variant="h6">Loading Prayers...</Typography>
        </Box>
      </Box>
    );
  }

  const completionPercentage = stats.totalToday > 0 ? (stats.todayCompleted / stats.totalToday) * 100 : 0;

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'teal.700' }}>
            Prayer Tracker
          </Typography>
          <Button
            onClick={fetchPrayers}
            startIcon={<Refresh />}
            variant="outlined"
            disabled={loading}
            sx={{ 
              borderColor: 'teal.600', 
              color: 'teal.600',
              '&:hover': { borderColor: 'teal.700', backgroundColor: 'teal.50' }
            }}
          >
            {loading ? 'Loading...' : 'Refresh Prayers'}
          </Button>
        </Box>
        <Typography variant="h6" color="text.secondary">
          Track your daily prayers and build a consistent spiritual routine
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {stats.todayCompleted}/{stats.totalToday}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Today's Prayers
                  </Typography>
                </Box>
                <Mosque sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
              <LinearProgress
                variant="determinate"
                value={completionPercentage}
                sx={{
                  mt: 2,
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  '& .MuiLinearProgress-bar': { backgroundColor: 'rgba(255,255,255,0.9)' }
                }}
              />
              <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                {Math.round(completionPercentage)}% Complete
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
                    {stats.streakCount}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Day Streak
                  </Typography>
                </Box>
                <LocalFireDepartment sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
              <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                {stats.streakCount >= 7 ? 'Amazing streak!' : 'Keep it up!'}
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
                    {stats.weeklyPercentage}%
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    This Week
                  </Typography>
                </Box>
                <CalendarMonth sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
              <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                Weekly average
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', color: 'white' }}>
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
                <EmojiEvents sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
              <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                XP: {user?.xp || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Prayer Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                Today's Prayers
              </Typography>
              <Grid container spacing={2}>
                {Array.isArray(prayers) && prayers.map((prayer) => {
                  const config = prayerConfig[prayer.prayerName] || { color: '#6b7280', icon: '🕌', time: '' };
                  const isOptional = prayer.prayerName === 'Tahajjud';
                  
                  return (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={prayer._id}>
                      <Card
                        sx={{
                          border: `2px solid ${prayer.isCompleted ? config.color : '#e5e7eb'}`,
                          backgroundColor: prayer.isCompleted ? `${config.color}15` : 'white',
                          cursor: prayer.isCompleted ? 'default' : 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: prayer.isCompleted ? 'none' : 'translateY(-2px)',
                            boxShadow: prayer.isCompleted ? 'none' : '0 4px 12px rgba(0,0,0,0.15)'
                          }
                        }}
                        onClick={() => togglePrayerStatus(prayer._id)}
                      >
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                          <Box sx={{ position: 'relative', display: 'inline-block' }}>
                            <Avatar
                              sx={{
                                backgroundColor: prayer.isCompleted ? config.color : '#f3f4f6',
                                color: prayer.isCompleted ? 'white' : config.color,
                                width: 60,
                                height: 60,
                                fontSize: '24px',
                                mx: 'auto',
                                mb: 2
                              }}
                            >
                              {config.icon}
                            </Avatar>
                            {prayer.isCompleted && (
                              <CheckCircle
                                sx={{
                                  position: 'absolute',
                                  top: -4,
                                  right: -4,
                                  color: '#10b981',
                                  backgroundColor: 'white',
                                  borderRadius: '50%',
                                  fontSize: 20
                                }}
                              />
                            )}
                          </Box>
                          
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {prayer.prayerName}
                          </Typography>
                          
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {config.time}
                          </Typography>
                          
                          {isOptional && (
                            <Chip
                              label="Optional"
                              size="small"
                              sx={{
                                backgroundColor: '#fef3c7',
                                color: '#92400e',
                                fontSize: '0.75rem'
                              }}
                            />
                          )}
                          
                          {prayer.isCompleted && (
                            <Typography variant="caption" display="block" sx={{ mt: 1, color: config.color }}>
                              ✓ Completed
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
              
              {(!Array.isArray(prayers) || prayers.length === 0) && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Mosque sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    No prayers logged for today
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Click "Refresh Prayers" to create today's prayer list
                  </Typography>
                  <Button
                    onClick={logTodaysPrayers}
                    variant="contained"
                    disabled={loading}
                    sx={{ backgroundColor: 'teal.600' }}
                  >
                    {loading ? 'Creating...' : 'Create Today\'s Prayers'}
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Progress and Rewards Section */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Grid container spacing={3}>
            {/* Daily Progress */}
            <Grid size={{ xs: 12 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Daily Progress
                  </Typography>
                  
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                      <CircularProgress
                        variant="determinate"
                        value={completionPercentage}
                        size={80}
                        thickness={6}
                        sx={{ color: 'teal.600' }}
                      />
                      <Box sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                          {Math.round(completionPercentage)}%
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    {stats.todayCompleted === stats.totalToday 
                      ? "🎉 All mandatory prayers completed!" 
                      : `${stats.totalToday - stats.todayCompleted} prayers remaining`
                    }
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Badges */}
            {user?.badges && user.badges.length > 0 && (
              <Grid size={{ xs: 12 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                      Recent Badges
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {user.badges.slice(-6).map((badge, index) => (
                        <Chip
                          key={index}
                          label={badge}
                          size="small"
                          sx={{
                            backgroundColor: '#fef3c7',
                            color: '#92400e',
                            '& .MuiChip-icon': { color: '#f59e0b' }
                          }}
                          icon={<EmojiEvents />}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {/* Quick Stats */}
            <Grid size={{ xs: 12 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Quick Stats
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body2">Daily Score:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {user?.dailyScore || 0}/15
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body2">Current Streak:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {stats.streakCount} days
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body2">Total XP:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {user?.xp || 0}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="caption" color="text.secondary">
                    Complete all mandatory prayers to earn daily rewards and maintain your streak!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PrayerComponent;
