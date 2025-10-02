import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, CircularProgress, Typography, Avatar } from '@mui/material';
import { Mosque } from '@mui/icons-material';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

// Create Material UI theme with Ocean Green colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#0f766e',
      light: '#14b8a6',
      dark: '#115e59',
    },
    secondary: {
      main: '#5eead4',
    },
    background: {
      default: '#ecfdf5',
      paper: '#ffffff',
    },
    text: {
      primary: '#042f2e',
      secondary: '#134e4a',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 50%, #e6fffa 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 3,
                background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                boxShadow: '0 8px 24px rgba(20, 184, 166, 0.3)'
              }}
            >
              <Mosque sx={{ fontSize: 40, color: 'white' }} />
            </Avatar>
            <CircularProgress 
              sx={{ 
                color: '#0f766e',
                mb: 2
              }} 
            />
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#134e4a',
                fontWeight: 600 
              }}
            >
              Loading HabitHaven...
            </Typography>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

  // If user is logged in, show dashboard
  if (user) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
          <Dashboard />
        </Box>
      </ThemeProvider>
    );
  }

  // If user is not logged in, show appropriate view
  const renderView = () => {
    switch (currentView) {
      case 'login':
        return (
          <Login 
            onBack={() => setCurrentView('home')}
            onRegisterClick={() => setCurrentView('register')}
          />
        );
      case 'register':
        return (
          <Register 
            onBack={() => setCurrentView('home')}
            onLoginClick={() => setCurrentView('login')}
          />
        );
      default:
        return (
          <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column'    }} style={{margin:"20px"}}>
            <Header 
              onLoginClick={() => setCurrentView('login')}
              onRegisterClick={() => setCurrentView('register')}
            />
            <Home 
              onLoginClick={() => setCurrentView('login')}
              onRegisterClick={() => setCurrentView('register')}
            />
            <Footer />
          </Box>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {renderView()}
    </ThemeProvider>
  );
};

export default App;