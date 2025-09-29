import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';
import { Mosque, Facebook, Twitter, Instagram } from '@mui/icons-material';

// Footer Component
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #0f766e 0%, #115e59 100%)',
        mt: 'auto',
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(20, 184, 166, 0.4)'
                }}
              >
                <Mosque sx={{ color: 'white', fontSize: 32 }} />
              </Box>
              <Box>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: 'white',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  Habit<span style={{ color: '#5eead4' }}>Haven</span>
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  Spiritual Growth & Productivity Platform
                </Typography>
              </Box>
            </Box>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: 1.6,
                maxWidth: 400
              }}
            >
              Your comprehensive companion for spiritual growth, prayer tracking, and productivity enhancement. 
              Build meaningful habits and strengthen your connection with Allah.
            </Typography>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'white',
                fontWeight: 600,
                mb: 3
              }}
            >
              Features
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {['Prayer & Task Tracking', 'Smart Reminders', 'Personal Challenges', 'Group Challenges', 'Daily Performance Score'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    '&:hover': {
                      color: '#5eead4',
                      textDecoration: 'none'
                    },
                    transition: 'color 0.3s ease'
                  }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'white',
                fontWeight: 600,
                mb: 3
              }}
            >
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'Community Guidelines'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    '&:hover': {
                      color: '#5eead4',
                      textDecoration: 'none'
                    },
                    transition: 'color 0.3s ease'
                  }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 6, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography 
            variant="body2" 
            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            © 2025 HabitHaven. All rights reserved. Built with ❤️ for spiritual growth.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            {['Privacy', 'Terms', 'Contact'].map((item) => (
              <Link
                key={item}
                href="#"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  '&:hover': {
                    color: '#5eead4',
                    textDecoration: 'none'
                  },
                  transition: 'color 0.3s ease'
                }}
              >
                {item}
              </Link>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;