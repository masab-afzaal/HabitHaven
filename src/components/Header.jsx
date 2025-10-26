import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Mosque } from '@mui/icons-material';
import { colors, gradients, shadows } from '../styles';

// Header Component
const Header = () => {
  const navigate = useNavigate();
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: 'rgba(248, 250, 252, 0.95)', // neutral slate-50
        backdropFilter: 'blur(10px)',
        boxShadow: shadows.md
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                background: colors.primary.main,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)',
                border: '1px solid rgba(2, 132, 199, 0.2)',
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
                  color: colors.text.primary,
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Habit<span style={{ color: colors.primary.main }}>Haven</span>
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: colors.text.secondary,
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
              onClick={() => navigate('/login')}
              sx={{
                color: colors.text.primary,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                px: 3,
                py: 1,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'rgba(2, 132, 199, 0.05)'
                }
              }}
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate('/register')}
              variant="contained"
              sx={{
                backgroundColor: colors.primary.main,
                color: 'white',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 3,
                boxShadow: shadows.medium,
                '&:hover': {
                  backgroundColor: colors.primary.dark,
                  transform: 'translateY(-2px)',
                  boxShadow: shadows.large
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
