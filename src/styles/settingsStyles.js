import { colors, gradients, shadows } from './index';

export const settingsStyles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)',
    py: 4
  },
  
  header: {
    mb: 4,
    textAlign: 'center'
  },
  
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    color: colors.primary.main,
    '&:hover': {
      background: 'rgba(2, 132, 199, 0.1)'
    }
  },
  
  title: {
    fontWeight: 700,
    color: '#0c4a6e',
    mb: 1
  },
  
  subtitle: {
    color: '#64748b',
    fontSize: '0.95rem'
  },
  
  tabsPaper: {
    borderRadius: 2,
    boxShadow: shadows.card.default,
    mb: 3,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)'
  },
  
  tabs: {
    '& .MuiTab-root': {
      minHeight: 72,
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.95rem',
      color: '#64748b',
      '&.Mui-selected': {
        color: colors.primary.main
      }
    },
    '& .MuiTabs-indicator': {
      backgroundColor: colors.primary.main,
      height: 3,
      borderRadius: '3px 3px 0 0'
    }
  },
  
  tabContent: {
    minHeight: 400
  },
  
  card: {
    borderRadius: 2,
    boxShadow: shadows.card.default,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      boxShadow: shadows.medium
    }
  },
  
  sectionTitle: {
    fontWeight: 600,
    color: '#0c4a6e',
    mb: 3,
    display: 'flex',
    alignItems: 'center',
    gap: 1
  },
  
  avatarSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 3,
    mb: 2
  },
  
  avatar: {
    width: 100,
    height: 100,
    border: `4px solid ${colors.primary.main}`,
    boxShadow: shadows.medium,
    fontSize: '2.5rem',
    fontWeight: 700,
    background: `linear-gradient(135deg, ${colors.primary.main}, ${colors.primary.dark})`
  },
  
  avatarButton: {
    background: `linear-gradient(135deg, ${colors.primary.main}, ${colors.primary.dark})`,
    color: 'white',
    '&:hover': {
      background: `linear-gradient(135deg, ${colors.primary.dark}, ${colors.primary.main})`,
      transform: 'scale(1.05)'
    },
    transition: 'all 0.2s'
  },
  
  buttonContainer: {
    mt: 3,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  
  saveButton: {
    background: `linear-gradient(135deg, ${colors.primary.main}, ${colors.primary.dark})`,
    color: 'white',
    px: 4,
    py: 1.5,
    fontWeight: 600,
    textTransform: 'none',
    borderRadius: 2,
    boxShadow: shadows.button,
    '&:hover': {
      background: `linear-gradient(135deg, ${colors.primary.dark}, ${colors.primary.main})`,
      boxShadow: shadows.medium,
      transform: 'translateY(-2px)'
    },
    '&:disabled': {
      background: '#cbd5e1',
      color: '#94a3b8'
    },
    transition: 'all 0.2s'
  },
  
  settingsList: {
    '& > *': {
      py: 2
    }
  },
  
  formControl: {
    width: '100%',
    ml: 0,
    mr: 0,
    '& .MuiFormControlLabel-label': {
      width: '100%'
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: colors.primary.main,
      '& + .MuiSwitch-track': {
        backgroundColor: colors.primary.main
      }
    }
  }
};

export default settingsStyles;
