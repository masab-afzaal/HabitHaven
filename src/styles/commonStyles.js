/**
 * Azure Peace Theme - Common Reusable Styles
 * Centralized style objects that can be reused across components
 */

import { colors } from './colors';
import { gradients } from './gradients';
import { shadows } from './shadows';

export const commonStyles = {
  // Page Background
  pageBackground: {
    background: gradients.background.primary,
    minHeight: '100vh',
  },

  // Frosted Glass Card
  frostedGlassCard: {
    background: 'rgba(255, 255, 255, 0.75)', // white/75
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: `1px solid ${colors.border.main}`, // sky-300
    borderRadius: 4,
  },

  // Standard Card
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    borderRadius: 3,
    border: `1px solid ${colors.border.main}`, // sky-300
    boxShadow: shadows.card.default,
    '&:hover': {
      boxShadow: shadows.card.hover,
    },
  },

  // Primary Button
  primaryButton: {
    backgroundColor: '#0284c7', // sky-600
    color: colors.white,
    fontWeight: 600,
    borderRadius: 2,
    textTransform: 'none',
    boxShadow: shadows.button.default,
    '&:hover': {
      backgroundColor: '#0c4a6e', // sky-900
      boxShadow: shadows.button.hover,
      transform: 'translateY(-2px)',
    },
    '&:active': {
      transform: 'translateY(0)',
      boxShadow: shadows.button.active,
    },
    '&:disabled': {
      backgroundColor: colors.text.disabled,
      transform: 'none',
    },
    transition: 'all 0.3s ease',
  },

  // Outlined Button
  outlinedButton: {
    borderColor: colors.primary.main,
    color: colors.primary.main,
    fontWeight: 600,
    borderRadius: 2,
    textTransform: 'none',
    borderWidth: 2,
    '&:hover': {
      borderWidth: 2,
      borderColor: colors.primary.dark,
      backgroundColor: 'rgba(2, 132, 199, 0.05)',
    },
  },

  // Text Field
  textField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      '& fieldset': {
        borderColor: colors.border.main,
        borderWidth: 2,
      },
      '&:hover fieldset': {
        borderColor: colors.border.hover,
      },
      '&.Mui-focused fieldset': {
        borderColor: colors.primary.main,
      },
    },
    '& .MuiInputLabel-root': {
      color: colors.text.secondary,
      '&.Mui-focused': {
        color: colors.primary.main,
      },
    },
  },

  // Avatar with Gradient
  avatarGradient: {
    background: gradients.primary.main,
    boxShadow: shadows.avatar,
  },

  // Loading Screen
  loadingScreen: {
    minHeight: '100vh',
    background: gradients.background.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Icon Button
  iconButton: {
    color: colors.primary.main,
    '&:hover': {
      backgroundColor: 'rgba(2, 132, 199, 0.08)',
    },
  },

  // Chip
  chip: {
    backgroundColor: colors.secondary.lighter,
    color: colors.primary.main,
    fontWeight: 500,
    borderRadius: 2,
  },

  // Divider
  divider: {
    borderColor: colors.border.main,
    my: 3,
  },

  // Paper Container
  paperContainer: {
    background: colors.background.paper,
    border: `2px solid ${colors.border.main}`,
    borderRadius: 4,
    backdropFilter: 'blur(10px)',
  },

  // Section Title
  sectionTitle: {
    fontWeight: 'bold',
    color: colors.text.primary,
    mb: 2,
  },

  // Accent Text
  accentText: {
    color: colors.text.accent,
    fontWeight: 500,
  },

  // App Bar
  appBar: {
    background: gradients.primary.main,
    boxShadow: `0 4px 20px rgba(2, 132, 199, 0.2)`,
  },

  // Centered Content
  centeredContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  // Flex Row
  flexRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },

  // Flex Column
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },

  // Hover Card Effect
  hoverCard: {
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: shadows.lg,
    },
  },

  // Success Badge
  successBadge: {
    backgroundColor: colors.status.success.light,
    color: colors.status.success.dark,
    padding: '4px 12px',
    borderRadius: 2,
    fontWeight: 600,
  },

  // Error Badge
  errorBadge: {
    backgroundColor: colors.status.error.light,
    color: colors.status.error.dark,
    padding: '4px 12px',
    borderRadius: 2,
    fontWeight: 600,
  },

  // Input Adornment Icon
  inputAdornmentIcon: {
    color: colors.primary.main,
  },

  // Alert Message
  alertMessage: {
    borderRadius: 2,
    '& .MuiAlert-icon': {
      color: colors.status.error.main,
    },
  },
};

export default commonStyles;
