import React from 'react';
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
  Schedule
} from '@mui/icons-material';

// Home Component
const Home = ({ onLoginClick, onRegisterClick }) => {
  const features = [
    {
      icon: <Mosque sx={{ fontSize: 40, color: '#0f766e' }} />,
      title: 'Prayer & Task Tracking',
      description: 'Log your prayers and productivity tasks, view history, and monitor progress over time with detailed analytics.'
    },
    {
      icon: <Notifications sx={{ fontSize: 40, color: '#0f766e' }} />,
      title: 'Smart Reminders',
      description: 'Receive intelligent notifications for upcoming prayer times and scheduled tasks to ensure you stay on track.'
    },
    {
      icon: <EmojiEvents sx={{ fontSize: 40, color: '#0f766e' }} />,
      title: 'Personal Challenges',
      description: 'Set personal goals like consistent prayer or completing specific tasks to build positive habits and spiritual growth.'
    },
    {
      icon: <Groups sx={{ fontSize: 40, color: '#0f766e' }} />,
      title: 'Group Challenges',
      description: 'Join or create groups to participate in challenges with friends and community members for accountability.'
    },
    {
      icon: <Analytics sx={{ fontSize: 40, color: '#0f766e' }} />,
      title: 'Daily Performance Score',
      description: 'Get a daily score out of 100 based on completed prayers and tasks, providing clear performance indicators.'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '50K+', icon: <Groups sx={{ color: '#0f766e' }} /> },
    { label: 'Prayers Tracked', value: '2M+', icon: <Mosque sx={{ color: '#0f766e' }} /> },
    { label: 'Tasks Completed', value: '1.5M+', icon: <CheckCircle sx={{ color: '#0f766e' }} /> },
    { label: 'Success Rate', value: '94%', icon: <TrendingUp sx={{ color: '#0f766e' }} /> }
  ];

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 50%, #e6fffa 100%)',
        minHeight: '100vh'
      }}
    >
      {/* Hero Section */}
      <Container maxWidth="xl" sx={{ pt: 8, pb: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 'bold',
              color: '#042f2e',
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
              fontFamily: 'Inter, sans-serif'
            }}
          >
            Transform Your{' '}
            <span style={{ color: '#0f766e' }}>Spiritual Journey</span>
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              color: '#134e4a',
              mb: 6,
              maxWidth: 800,
              mx: 'auto',
              lineHeight: 1.6,
              fontWeight: 400
            }}
          >
            Track your prayers, build productive habits, and grow spiritually with our comprehensive 
            platform designed for modern Muslims seeking balance and growth.
          </Typography>

          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              onClick={onRegisterClick}
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#0f766e',
                color: 'white',
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                textTransform: 'none',
                boxShadow: '0 8px 24px rgba(15, 118, 110, 0.3)',
                '&:hover': {
                  backgroundColor: '#115e59',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 32px rgba(15, 118, 110, 0.4)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Start Your Journey
            </Button>
            
            <Button
              onClick={onLoginClick}
              variant="outlined"
              size="large"
              sx={{
                borderColor: '#0f766e',
                color: '#0f766e',
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                textTransform: 'none',
                borderWidth: 2,
                '&:hover': {
                  borderColor: '#115e59',
                  backgroundColor: 'rgba(15, 118, 110, 0.05)',
                  borderWidth: 2
                }
              }}
            >
              Sign In
            </Button>
          </Box>
        </Box>

        {/* Stats Section */}
        <Paper
          elevation={0}
          sx={{
            background: 'rgba(255, 255, 255, 0.8)',
            border: '2px solid #a7f3d0',
            borderRadius: 4,
            p: 4,
            mb: 12,
            backdropFilter: 'blur(10px)'
          }}
        >
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid size={{ xs: 6, md: 3 }} key={index}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    sx={{
                      backgroundColor: '#ecfdf5',
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
                      color: '#042f2e',
                      mb: 1
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: '#134e4a', fontWeight: 500 }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Features Section */}
        <Box sx={{ mb: 12 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#042f2e',
              mb: 3
            }}
          >
            Powerful Features for{' '}
            <span style={{ color: '#0f766e' }}>Spiritual Growth</span>
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: '#134e4a',
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
                    background: 'rgba(255, 255, 255, 0.85)',
                    border: '2px solid #a7f3d0',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(15, 118, 110, 0.15)',
                      borderColor: '#6ee7b7'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Avatar
                      sx={{
                        backgroundColor: '#ecfdf5',
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
                        color: '#042f2e',
                        mb: 2
                      }}
                    >
                      {feature.title}
                    </Typography>
                    
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#134e4a',
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

        {/* CTA Section */}
        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, #0f766e 0%, #115e59 100%)',
            color: 'white',
            borderRadius: 4,
            p: 8,
            textAlign: 'center'
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 3
            }}
          >
            Ready to Begin Your Journey?
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              mb: 6,
              opacity: 0.9,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Join thousands of Muslims who are transforming their spiritual lives and building productive habits with HabitHaven
          </Typography>

          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              onClick={onRegisterClick}
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#14b8a6',
                color: 'white',
                px: 6,
                py: 2.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#0f766e',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Get Started Free
            </Button>
            
            <Chip
              label="✓ Free Forever"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '1rem',
                py: 3,
                px: 2
              }}
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;