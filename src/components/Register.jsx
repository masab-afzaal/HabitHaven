import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Avatar,
  Grid
} from '@mui/material';
import {
  Mosque,
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  ArrowBack
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Register = ({ onBack, onLoginClick }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const result = await register(formData.fullName, formData.email, formData.password);
      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 50%, #e6fffa 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            background: 'rgba(255, 255, 255, 0.85)',
            border: '2px solid #a7f3d0',
            borderRadius: 4,
            p: 6,
            backdropFilter: 'blur(10px)',
            position: 'relative'
          }}
        >
          {/* Back Button */}
          <IconButton
            onClick={onBack}
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              color: '#0f766e'
            }}
          >
            <ArrowBack />
          </IconButton>

          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4, mt: 2 }}>
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
            
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 'bold',
                color: '#042f2e',
                mb: 1,
                fontFamily: 'Inter, sans-serif'
              }}
            >
              Join HabitHaven
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                color: '#134e4a',
                fontWeight: 400
              }}
            >
              Begin your journey of spiritual growth
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  color: '#dc2626'
                }
              }}
            >
              {error}
            </Alert>
          )}

          {/* Register Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="fullName"
              label="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: '#a7f3d0',
                    borderWidth: 2
                  },
                  '&:hover fieldset': {
                    borderColor: '#6ee7b7'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#0f766e'
                  }
                },
                '& .MuiInputLabel-root': {
                  color: '#134e4a',
                  '&.Mui-focused': {
                    color: '#0f766e'
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: '#0f766e' }} />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              fullWidth
              name="email"
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: '#a7f3d0',
                    borderWidth: 2
                  },
                  '&:hover fieldset': {
                    borderColor: '#6ee7b7'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#0f766e'
                  }
                },
                '& .MuiInputLabel-root': {
                  color: '#134e4a',
                  '&.Mui-focused': {
                    color: '#0f766e'
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: '#0f766e' }} />
                  </InputAdornment>
                )
              }}
            />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: '#a7f3d0',
                        borderWidth: 2
                      },
                      '&:hover fieldset': {
                        borderColor: '#6ee7b7'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#0f766e'
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: '#134e4a',
                      '&.Mui-focused': {
                        color: '#0f766e'
                      }
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#0f766e' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: '#0f766e' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: '#a7f3d0',
                        borderWidth: 2
                      },
                      '&:hover fieldset': {
                        borderColor: '#6ee7b7'
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#0f766e'
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: '#134e4a',
                      '&.Mui-focused': {
                        color: '#0f766e'
                      }
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#0f766e' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          sx={{ color: '#0f766e' }}
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                backgroundColor: '#0f766e',
                color: 'white',
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                mb: 3,
                boxShadow: '0 8px 24px rgba(15, 118, 110, 0.3)',
                '&:hover': {
                  backgroundColor: '#115e59',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 32px rgba(15, 118, 110, 0.4)'
                },
                '&:disabled': {
                  backgroundColor: '#94a3b8',
                  transform: 'none'
                },
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <Divider sx={{ my: 3, color: '#134e4a' }}>or</Divider>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ color: '#134e4a', mb: 2 }}>
                Already have an account?
              </Typography>
              
              <Button
                onClick={onLoginClick}
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: '#0f766e',
                  color: '#0f766e',
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: 2,
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
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;