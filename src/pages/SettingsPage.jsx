import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SettingsComponent from '../components/SettingsComponent';

/**
 * Settings Page
 * User settings and preferences management page
 */
const SettingsPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <SettingsComponent onBack={handleBack} />
    </Box>
  );
};

export default SettingsPage;
