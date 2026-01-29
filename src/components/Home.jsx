import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  Chip,
  Avatar,
  Paper
} from '@mui/material';
import { 
  Mosque,
  Assignment,
  Notifications,
  EmojiEvents,
  Groups,
  Analytics,
  CheckCircle,
  TrendingUp,
  Schedule,
  AutoAwesome,
  Star
} from '@mui/icons-material';
import { colors, gradients, shadows, commonStyles } from '../styles';

// Home Component
const Home = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: <Mosque sx={{ fontSize: 40, color: colors.text.accent }} />,
      title: 'Prayer & Task Tracking',
      description: 'Log your prayers and productivity tasks, view history, and monitor progress over time with detailed analytics.'
    },
    {
      icon: <Notifications sx={{ fontSize: 40, color: colors.text.accent }} />,
      title: 'Smart Reminders',
      description: 'Receive intelligent notifications for upcoming prayer times and scheduled tasks to ensure you stay on track.'
    },
    {
      icon: <AutoAwesome sx={{ fontSize: 40, color: colors.text.accent }} />,
      title: 'AI-Powered Insights',
      description: 'Get personalized recommendations and insights powered by AI to optimize your spiritual routine and productivity patterns.'
    },
    {
      icon: <EmojiEvents sx={{ fontSize: 40, color: colors.text.accent }} />,
      title: 'Personal Challenges',
      description: 'Set personal goals like consistent prayer or completing specific tasks to build positive habits and spiritual growth.'
    },
    {
      icon: <Groups sx={{ fontSize: 40, color: colors.text.accent }} />,
      title: 'Group Challenges',
      description: 'Join or create groups to participate in challenges with friends and community members for accountability.'
    },
    {
      icon: <Analytics sx={{ fontSize: 40, color: colors.text.accent }} />,
      title: 'Daily Performance Score',
      description: 'Get a daily score out of 100 based on completed prayers and tasks, providing clear performance indicators.'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '50K+', icon: <Groups sx={{ color: colors.text.accent }} /> },
    { label: 'Prayers Tracked', value: '2M+', icon: <Mosque sx={{ color: colors.text.accent }} /> },
    { label: 'Tasks Completed', value: '1.5M+', icon: <CheckCircle sx={{ color: colors.text.accent }} /> },
    { label: 'Success Rate', value: '94%', icon: <TrendingUp sx={{ color: colors.text.accent }} /> }
  ];

  return (
    <Box
      sx={{
        background: gradients.background.primary,
        minHeight: '100vh'
        
      }}
    >
      
      <Container maxWidth="xl" sx={{ pt: { xs: 10, md: 12, lg: 14 }, pb: 12, px: { xs: 3, sm: 4, md: 6 } }}>
        {/* Hero Section with 3D Dashboard Preview */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: 8 }}>
          {/* Text Content - Left Side */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 'bold',
                color: colors.text.primary,
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                fontFamily: 'Inter, sans-serif',
                textAlign: { xs: 'center', lg: 'left' }
              }}
            >
              Transform Your{' '}
              <span style={{ color: colors.text.accent }}>Spiritual Journey</span>
            </Typography>
            
            <Typography
              variant="h5"
              sx={{
                color: colors.text.secondary,
                mb: 6,
                lineHeight: 1.6,
                fontWeight: 400,
                textAlign: { xs: 'center', lg: 'left' }
              }}
            >
              Track your prayers, build productive habits, and grow spiritually with our comprehensive 
              platform designed for modern Muslims seeking balance and growth.
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: { xs: 'center', lg: 'flex-start' }, alignItems: 'center' }}>
              <Button
                onClick={() => navigate('/register')}
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: colors.primary.main,
                  color: 'white',
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  textTransform: 'none',
                  boxShadow: shadows.button.default,
                  '&:hover': {
                    backgroundColor: colors.primary.dark,
                    transform: 'translateY(-2px)',
                    boxShadow: shadows.button.hover
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Start Your Journey
              </Button>
              
              <Button
                onClick={() => navigate('/login')}
                variant="outlined"
                size="large"
                sx={{
                  borderColor: colors.text.accent,
                  color: colors.text.accent,
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  textTransform: 'none',
                  border: `2px solid ${colors.text.accent}`,
                  '&:hover': {
                    borderColor: colors.primary.dark,
                    backgroundColor: 'rgba(2, 132, 199, 0.05)',
                    border: `2px solid ${colors.primary.dark}`
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Sign In
              </Button>
            </Box>
          </Grid>

          {/* Dashboard Mockup - Right Side */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: { xs: 400, sm: 500, md: 550 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', md: 'flex-end' }
              }}
            >
              {/* Desktop View */}
              <Box
                sx={{
                  width: '100%',
                  maxWidth: { xs: '100%', sm: 600, md: 680 },
                  background: 'white',
                  borderRadius: { xs: '16px', md: '24px' },
                  border: `1px solid ${colors.border.main}`,
                  boxShadow: '0px 40px 120px -20px rgba(0, 0, 0, 0.12)',
                  zIndex: 1,
                  aspectRatio: '16 / 10',
                  overflow: 'hidden',
                  transform: {
                    xs: 'none',
                    md: 'perspective(1500px) rotateY(-12deg) rotateX(4deg) translateX(20px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Browser Header */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    px: 2,
                    py: 1.5,
                    background: colors.secondary.main,
                    borderBottom: `1px solid ${colors.border.main}`
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#FF5F56' }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#FFBD2E' }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#27C93F' }} />
                  </Box>
                </Box>

                {/* Dashboard Content */}
                <Box
                  sx={{
                    display: 'flex',
                    height: 'calc(100% - 40px)',
                    background: gradients.background.primary
                  }}
                >
                  {/* Sidebar */}
                  <Box
                    sx={{
                      width: { xs: 60, sm: 80, md: 140 },
                      background: 'white',
                      p: { xs: 0.75, sm: 1.5, md: 2 },
                      borderRight: `1px solid ${colors.border.main}`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0.5
                    }}
                  >
                    {/* Logo Section */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: { xs: 0.5, md: 1 }
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 24, sm: 32, md: 40 },
                          height: { xs: 24, sm: 32, md: 40 },
                          background: `linear-gradient(135deg, ${colors.primary.main}, ${colors.primary.dark})`,
                          borderRadius: { xs: 1, md: 1.5 },
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Mosque sx={{ fontSize: { xs: 12, sm: 16, md: 20 }, color: 'white' }} />
                      </Box>
                    </Box>
                    
                    <Typography
                      sx={{
                        fontSize: { xs: 6, sm: 8, md: 10 },
                        fontWeight: 700,
                        color: colors.text.secondary,
                        mb: { xs: 0.5, md: 1 },
                        px: { xs: 0.5, md: 1 },
                        textTransform: 'uppercase',
                        display: { xs: 'none', md: 'block' }
                      }}
                    >
                      Menu
                    </Typography>
                    
                    {[
                      { icon: <Analytics />, label: 'Overview', active: true },
                      { icon: <Assignment />, label: 'Tasks', active: false },
                      { icon: <Mosque />, label: 'Prayers', active: false },
                      { icon: <Groups />, label: 'Groups', active: false },
                      { icon: <EmojiEvents />, label: 'Challenges', active: false }
                    ].map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: { xs: 'center', md: 'flex-start' },
                          gap: { xs: 0, md: 1 },
                          px: { xs: 0.5, sm: 1, md: 1.5 },
                          py: { xs: 0.75, sm: 0.875, md: 1 },
                          borderRadius: { xs: 1, md: 1.5 },
                          background: item.active ? colors.secondary.lighter : 'transparent',
                          color: item.active ? colors.primary.main : colors.text.secondary,
                          fontSize: { xs: 7, sm: 8, md: 9 },
                          fontWeight: 600,
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Box sx={{ '& svg': { fontSize: { xs: 10, sm: 11, md: 14 } } }}>
                          {item.icon}
                        </Box>
                        <Typography sx={{ fontSize: { xs: 7, sm: 8, md: 9 }, fontWeight: 600, display: { xs: 'none', md: 'block' } }}>
                          {item.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* Main Content */}
                  <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', p: { xs: 1.25, sm: 2, md: 2.5 } }}>
                    {/* Header */}
                    <Box sx={{ mb: { xs: 1.5, md: 2 } }}>
                      <Typography sx={{ fontSize: { xs: 10, sm: 14, md: 16 }, fontWeight: 700, color: colors.text.primary }}>
                        Dashboard Overview
                      </Typography>
                      <Typography sx={{ fontSize: { xs: 6, sm: 8, md: 9 }, color: colors.text.secondary }}>
                        Welcome back, Ahmed!
                      </Typography>
                    </Box>

                    {/* Stats Cards */}
                    <Grid container spacing={{ xs: 0.75, sm: 1, md: 1 }} sx={{ mb: { xs: 1.25, md: 1.5 } }}>
                      {[
                        { label: 'Prayers', value: '4/5', icon: <Mosque />, color: colors.primary.main, bg: colors.primary.main },
                        { label: 'Tasks', value: '8/12', icon: <CheckCircle />, color: '#3b82f6', bg: '#3b82f6' },
                        { label: 'Streak', value: '7', icon: <TrendingUp />, color: '#f59e0b', bg: '#f59e0b' },
                        { label: 'Level', value: '3', icon: <Star />, color: '#8b5cf6', bg: '#8b5cf6' }
                      ].map((stat, index) => (
                        <Grid size={{ xs: 6, sm: 3 }} key={index}>
                          <Box
                            sx={{
                              p: { xs: 0.75, sm: 1, md: 1.25 },
                              borderRadius: { xs: 1.5, md: 2 },
                              background: 'rgba(255, 255, 255, 0.8)',
                              border: `2px solid ${stat.color}33`,
                              backdropFilter: 'blur(8px)',
                              minHeight: { xs: 40, sm: 55, md: 70 },
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                              }
                            }}
                          >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <Box>
                                <Typography sx={{ fontSize: { xs: 10, sm: 12, md: 14 }, fontWeight: 800, color: stat.color, lineHeight: 1.2 }}>
                                  {stat.value}
                                </Typography>
                                <Typography sx={{ fontSize: { xs: 6, sm: 7, md: 8 }, color: colors.text.primary, fontWeight: 500, mt: 0.25 }}>
                                  {stat.label}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  width: { xs: 16, sm: 20, md: 24 },
                                  height: { xs: 16, sm: 20, md: 24 },
                                  borderRadius: { xs: 0.75, md: 1 },
                                  background: `linear-gradient(135deg, ${stat.bg}, ${stat.bg}dd)`,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  boxShadow: `0 2px 8px ${stat.bg}40`,
                                  '& svg': { fontSize: { xs: 9, sm: 11, md: 14 }, color: 'white' }
                                }}
                              >
                                {stat.icon}
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>

                    {/* Recent Activity Section */}
                    <Box
                      sx={{
                        p: { xs: 1, sm: 1.5, md: 2 },
                        borderRadius: { xs: 1.5, md: 2 },
                        background: 'rgba(255, 255, 255, 0.8)',
                        border: `1px solid ${colors.border.light}`,
                        backdropFilter: 'blur(8px)',
                        flexGrow: 1,
                        overflow: 'hidden'
                      }}
                    >
                      <Typography sx={{ fontSize: { xs: 7, sm: 9, md: 11 }, fontWeight: 700, mb: { xs: 0.75, md: 1 }, color: colors.text.primary }}>
                        Recent Activity
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 0.5, md: 0.75 } }}>
                        {/* Completed Prayer */}
                        <Box
                          sx={{
                            p: { xs: 0.75, sm: 1, md: 1.25 },
                            borderRadius: 1.5,
                            background: '#f0fdf4',
                            border: '1px solid #bbf7d0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: { xs: 0.75, md: 1 }
                          }}
                        >
                          <CheckCircle sx={{ color: '#16a34a', fontSize: { xs: 10, sm: 12, md: 16 } }} />
                          <Box>
                            <Typography sx={{ fontSize: { xs: 6, sm: 7, md: 9 }, fontWeight: 700, color: '#166534' }}>
                              Fajr completed
                            </Typography>
                            <Typography sx={{ fontSize: { xs: 5, sm: 6, md: 7 }, color: '#15803d' }}>
                              Today
                            </Typography>
                          </Box>
                        </Box>

                        {/* Completed Task */}
                        <Box
                          sx={{
                            p: { xs: 0.75, sm: 1, md: 1.25 },
                            borderRadius: 1.5,
                            background: '#eff6ff',
                            border: '1px solid #bfdbfe',
                            display: 'flex',
                            alignItems: 'center',
                            gap: { xs: 0.75, md: 1 }
                          }}
                        >
                          <CheckCircle sx={{ color: '#2563eb', fontSize: { xs: 10, sm: 12, md: 16 } }} />
                          <Box>
                            <Typography sx={{ fontSize: { xs: 6, sm: 7, md: 9 }, fontWeight: 700, color: '#1e40af' }}>
                              Morning exercise completed
                            </Typography>
                            <Typography sx={{ fontSize: { xs: 5, sm: 6, md: 7 }, color: '#1d4ed8' }}>
                              Today
                            </Typography>
                          </Box>
                        </Box>

                        {/* Another Activity */}
                        <Box
                          sx={{
                            p: { xs: 0.75, sm: 1, md: 1.25 },
                            borderRadius: 1.5,
                            background: '#fef3c7',
                            border: '1px solid #fde68a',
                            display: 'flex',
                            alignItems: 'center',
                            gap: { xs: 0.75, md: 1 }
                          }}
                        >
                          <TrendingUp sx={{ color: '#d97706', fontSize: { xs: 10, sm: 12, md: 16 } }} />
                          <Box>
                            <Typography sx={{ fontSize: { xs: 6, sm: 7, md: 9 }, fontWeight: 700, color: '#92400e' }}>
                              7 day streak achieved!
                            </Typography>
                            <Typography sx={{ fontSize: { xs: 5, sm: 6, md: 7 }, color: '#b45309' }}>
                              Keep it up!
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Mobile View Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: { xs: -20, sm: 10, md: 30 },
                  right: { xs: 10, sm: 0, md: -20 },
                  zIndex: 10,
                  width: { xs: 110, sm: 150, md: 180 },
                  height: { xs: 220, sm: 300, md: 360 },
                  background: '#1a202c',
                  border: '6px solid #1a202c',
                  borderRadius: { xs: '22px', md: '28px' },
                  boxShadow: '0px 30px 60px -12px rgba(0, 0, 0, 0.25)',
                  overflow: 'hidden',
                  transform: {
                    xs: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)',
                    sm: 'perspective(1200px) rotateY(-10deg) rotateX(2deg)',
                    md: 'perspective(1500px) rotateY(-15deg) rotateX(2deg)'
                  },
                  display: { xs: 'block' },
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Notch */}
                <Box
                  sx={{
                    width: { xs: 35, md: 50 },
                    height: { xs: 12, md: 15 },
                    background: '#1a202c',
                    borderRadius: '0 0 10px 10px',
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 11
                  }}
                />

                {/* Mobile Content */}
                <Box sx={{ height: '100%', overflow: 'hidden', background: gradients.background.primary }}>
                  {/* Mobile Header */}
                  <Box
                    sx={{
                      pt: { xs: 2.5, md: 3.5 },
                      pb: { xs: 1, md: 1.5 },
                      px: { xs: 1.25, md: 1.5 },
                      background: 'white',
                      borderBottom: `1px solid ${colors.border.main}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Box
                        sx={{
                          width: { xs: 16, md: 20 },
                          height: { xs: 16, md: 20 },
                          background: `linear-gradient(135deg, ${colors.primary.main}, ${colors.primary.dark})`,
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Mosque sx={{ fontSize: { xs: 8, md: 10 }, color: 'white' }} />
                      </Box>
                      <Typography sx={{ fontSize: { xs: 7, md: 10 }, fontWeight: 800, color: colors.text.primary }}>
                        HabitHaven
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: { xs: 18, md: 22 },
                        height: { xs: 18, md: 22 },
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${colors.primary.main}, ${colors.primary.dark})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `2px solid ${colors.border.main}`
                      }}
                    >
                      <Typography sx={{ fontSize: { xs: 7, md: 9 }, color: 'white', fontWeight: 700 }}>A</Typography>
                    </Box>
                  </Box>

                  {/* Mobile Dashboard Content */}
                  <Box sx={{ p: { xs: 1.25, md: 1.5 } }}>
                    <Typography sx={{ fontSize: { xs: 7, md: 9 }, fontWeight: 700, mb: { xs: 1, md: 1.5 }, color: colors.text.primary }}>
                      Dashboard Overview
                    </Typography>

                    {/* Mobile Stats Grid */}
                    <Grid container spacing={{ xs: 0.5, md: 0.75 }} sx={{ mb: { xs: 1, md: 1.5 } }}>
                      {[
                        { label: 'Prayers', value: '4/5', color: colors.primary.main, icon: <Mosque /> },
                        { label: 'Tasks', value: '8/12', color: '#3b82f6', icon: <CheckCircle /> },
                        { label: 'Streak', value: '7', color: '#f59e0b', icon: <TrendingUp /> },
                        { label: 'Level', value: '3', color: '#8b5cf6', icon: <Star /> }
                      ].map((stat, i) => (
                        <Grid size={6} key={i}>
                          <Box
                            sx={{
                              p: { xs: 0.75, md: 1 },
                              borderRadius: { xs: 1, md: 1.5 },
                              background: 'rgba(255, 255, 255, 0.8)',
                              border: `2px solid ${stat.color}33`,
                              backdropFilter: 'blur(8px)'
                            }}
                          >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.25 }}>
                              <Typography sx={{ fontSize: { xs: 9, md: 11 }, fontWeight: 800, color: stat.color }}>
                                {stat.value}
                              </Typography>
                              <Box
                                sx={{
                                  width: { xs: 14, md: 16 },
                                  height: { xs: 14, md: 16 },
                                  borderRadius: 0.75,
                                  background: `linear-gradient(135deg, ${stat.color}, ${stat.color}dd)`,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  '& svg': { fontSize: { xs: 7, md: 9 }, color: 'white' }
                                }}
                              >
                                {stat.icon}
                              </Box>
                            </Box>
                            <Typography sx={{ fontSize: { xs: 5, md: 7 }, color: colors.text.secondary, fontWeight: 500 }}>
                              {stat.label}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>

                    {/* Mobile Recent Activity */}
                    <Box
                      sx={{
                        p: { xs: 1, md: 1.5 },
                        borderRadius: { xs: 1.5, md: 2 },
                        background: 'rgba(255, 255, 255, 0.8)',
                        border: `1px solid ${colors.border.main}`,
                        backdropFilter: 'blur(8px)'
                      }}
                    >
                      <Typography sx={{ fontSize: { xs: 6, md: 8 }, fontWeight: 700, mb: { xs: 0.75, md: 1 }, color: colors.text.primary }}>
                        Recent Activity
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 0.5, md: 0.75 } }}>
                        {[
                          { text: 'Fajr completed', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
                          { text: 'Task completed', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' }
                        ].map((item, i) => (
                          <Box
                            key={i}
                            sx={{
                              p: { xs: 0.5, md: 0.75 },
                              borderRadius: 1,
                              background: item.bg,
                              border: `1px solid ${item.border}`,
                              display: 'flex',
                              alignItems: 'center',
                              gap: { xs: 0.5, md: 0.75 }
                            }}
                          >
                            <CheckCircle sx={{ color: item.color, fontSize: { xs: 8, md: 10 } }} />
                            <Typography sx={{ fontSize: { xs: 5, md: 7 }, fontWeight: 600, color: item.color }}>
                              {item.text}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        
        <Paper
          elevation={0}
          sx={{
            background: 'rgba(255, 255, 255, 0.75)', // white/75
            border: `1px solid ${colors.border.main}`, // sky-300
            borderRadius: 4,
            p: 4,
            mb: 12,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            boxShadow: shadows.card.default
          }}
        >
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid size={{ xs: 6, md: 3 }} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{
                      backgroundColor: colors.secondary.lighter, // sky-100
                      width: 60,
                      height: 60,
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 'bold',
                      color: colors.text.primary,
                      mb: 1
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: colors.text.secondary, fontWeight: 500 }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Features Section */}
        <Box id="features" sx={{ mb: 12, scrollMarginTop: '80px' }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: colors.text.primary,
              mb: 3
            }}
          >
            Powerful Features for{' '}
            <span style={{ color: colors.text.accent }}>Spiritual Growth</span>
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: colors.text.secondary,
              mb: 8,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Everything you need to build consistent habits, track progress, and strengthen your connection with Allah
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.75)', // white/75
                    border: `1px solid ${colors.border.main}`, // sky-300
                    borderRadius: 3,
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: shadows.card.hover,
                      borderColor: colors.border.hover // sky-500
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Avatar
                      sx={{
                        backgroundColor: colors.secondary.lighter, // sky-100
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 3
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    
                    <Typography
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: 'bold',
                        color: colors.text.primary,
                        mb: 2
                      }}
                    >
                      {feature.title}
                    </Typography>
                    
                    <Typography
                      variant="body1"
                      sx={{
                        color: colors.text.secondary,
                        lineHeight: 1.6
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* About Section */}
        <Paper
          id="about"
          elevation={0}
          sx={{
            mb: 12,
            scrollMarginTop: '80px',
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: `1px solid ${colors.border.main}`,
            borderRadius: 4,
            p: { xs: 4, md: 8 },
            boxShadow: shadows.card.default
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: colors.text.primary,
              mb: 3
            }}
          >
            Why Choose <span style={{ color: colors.text.accent }}>HabitHaven?</span>
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: colors.text.secondary,
              mb: 8,
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.8,
              fontWeight: 400
            }}
          >
            A comprehensive platform designed to help Muslims build consistent spiritual habits and increase productivity through smart tracking and community support.
          </Typography>

          <Grid container spacing={3} sx={{ maxWidth: 1000, mx: 'auto' }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Avatar
                  sx={{
                    backgroundColor: colors.secondary.lighter,
                    width: 56,
                    height: 56,
                    flexShrink: 0
                  }}
                >
                  <CheckCircle sx={{ fontSize: 28, color: colors.text.accent }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: colors.text.primary, mb: 1 }}>
                    Track Your Progress
                  </Typography>
                  <Typography sx={{ color: colors.text.secondary, lineHeight: 1.7 }}>
                    Monitor your prayers, tasks, and spiritual growth with detailed analytics and insights.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Avatar
                  sx={{
                    backgroundColor: colors.secondary.lighter,
                    width: 56,
                    height: 56,
                    flexShrink: 0
                  }}
                >
                  <Groups sx={{ fontSize: 28, color: colors.text.accent }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: colors.text.primary, mb: 1 }}>
                    Join Community
                  </Typography>
                  <Typography sx={{ color: colors.text.secondary, lineHeight: 1.7 }}>
                    Connect with like-minded Muslims and participate in group challenges together.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Avatar
                  sx={{
                    backgroundColor: colors.secondary.lighter,
                    width: 56,
                    height: 56,
                    flexShrink: 0
                  }}
                >
                  <AutoAwesome sx={{ fontSize: 28, color: colors.text.accent }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: colors.text.primary, mb: 1 }}>
                    AI-Powered Insights
                  </Typography>
                  <Typography sx={{ color: colors.text.secondary, lineHeight: 1.7 }}>
                    Get personalized recommendations to optimize your spiritual routine and habits.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Avatar
                  sx={{
                    backgroundColor: colors.secondary.lighter,
                    width: 56,
                    height: 56,
                    flexShrink: 0
                  }}
                >
                  <Schedule sx={{ fontSize: 28, color: colors.text.accent }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: colors.text.primary, mb: 1 }}>
                    Smart Reminders
                  </Typography>
                  <Typography sx={{ color: colors.text.secondary, lineHeight: 1.7 }}>
                    Never miss a prayer or task with intelligent notifications tailored to you.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Contact/CTA Section */}
        <Paper
          id="contact"
          elevation={0}
          sx={{
            background: 'rgba(255, 255, 255, 0.85)', // Frosted glass effect
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: `2px solid ${colors.border.main}`, // sky-300 border
            borderRadius: 4,
            p: 8,
            textAlign: 'center',
            boxShadow: shadows.lg,
            scrollMarginTop: '80px',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${colors.primary.main}, ${colors.primary.dark})`,
            }
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              color: colors.text.primary,
              background: `linear-gradient(135deg, ${colors.primary.main}, ${colors.primary.dark})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Ready to Begin Your Journey?
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              mb: 6,
              color: colors.text.secondary,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.7,
              fontWeight: 400
            }}
          >
            Join thousands of Muslims who are transforming their spiritual lives and building productive habits with HabitHaven
          </Typography>

          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button
              onClick={() => navigate('/register')}
              variant="contained"
              size="large"
              sx={{
                ...commonStyles.primaryButton,
                px: 7,
                py: 2.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                textTransform: 'none',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: shadows.button.hover,
                }
              }}
            >
              Get Started Free
            </Button>
            
            <Chip
              icon={<CheckCircle sx={{ fontSize: 20, color: colors.primary.main }} />}
              label="Free Forever • No Credit Card"
              sx={{
                backgroundColor: colors.secondary.lighter, // sky-100
                color: colors.text.primary,
                fontSize: '0.95rem',
                py: 3,
                px: 2,
                fontWeight: 500,
                border: `1px solid ${colors.border.main}`,
                '& .MuiChip-icon': {
                  color: colors.primary.main
                }
              }}
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
