/**
 * Azure Peace Theme - Shadow Definitions
 * Centralized shadow styles for depth and elevation
 */

import { colors } from './colors';

export const shadows = {
  // Small shadows
  sm: `0 2px 8px rgba(2, 132, 199, 0.15)`,
  
  // Medium shadows
  md: `0 4px 14px rgba(2, 132, 199, 0.25)`,
  
  // Large shadows
  lg: `0 8px 24px rgba(2, 132, 199, 0.3)`,
  
  // Extra large shadows
  xl: `0 12px 32px rgba(2, 132, 199, 0.4)`,
  
  // Button shadows
  button: {
    default: `0 4px 14px rgba(2, 132, 199, 0.25)`,
    hover: `0 6px 20px rgba(2, 132, 199, 0.35)`,
    active: `0 2px 8px rgba(2, 132, 199, 0.2)`,
  },
  
  // Card shadows
  card: {
    default: `0 2px 8px rgba(2, 132, 199, 0.1)`,
    hover: `0 4px 16px rgba(2, 132, 199, 0.2)`,
  },
  
  // Avatar/Icon shadows
  avatar: `0 8px 24px rgba(2, 132, 199, 0.3)`,
  
  // None
  none: 'none',
};

export default shadows;
