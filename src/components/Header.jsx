import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Mosque } from '@mui/icons-material';

// Header Component
const Header = ({ onLoginClick, onRegisterClick }) => {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'linear-gradient(135deg, #0f766e 0%, #115e59 100%)',
        boxShadow: '0 4px 20px rgba(15, 118, 110, 0.3)'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(20, 184, 166, 0.4)'
              }}
            >
              <Mosque sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Box>
              <Typography 
                variant="h5" 
                component="h1" 
                sx={{ 
                  fontWeight: 'bold',
                  color: 'white',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Habit<span style={{ color: '#5eead4' }}>Haven</span>
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.75rem',
                  mt: -0.5
                }}
              >
                Spiritual Growth & Productivity
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              onClick={onLoginClick}
              sx={{
                color: 'white',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                px: 3,
                py: 1,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Sign In
            </Button>
            <Button
              onClick={onRegisterClick}
              variant="contained"
              sx={{
                backgroundColor: '#14b8a6',
                color: 'white',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(20, 184, 166, 0.4)',
                '&:hover': {
                  backgroundColor: '#0f766e',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(20, 184, 166, 0.5)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Get Started
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;