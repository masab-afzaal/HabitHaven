import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './config/theme.config';
import AppRouter from './router';
import { SnackbarProvider } from './context/SnackbarContext';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <AppRouter />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;