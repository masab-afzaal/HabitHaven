import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Chip
} from '@mui/material';
import { AutoStories } from '@mui/icons-material';
import { islamicContentService } from '../services/islamicContentService';
import { colors, shadows } from '../styles';

const HadithCard = () => {
  const [hadith] = useState(() => {
    const result = islamicContentService.getDailyHadith();
    return result.success ? result.data : null;
  });

  if (!hadith) {
    return null;
  }

  return (
    <Card sx={{
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(139, 92, 246, 0.2)',
      borderRadius: 2,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      height: '100%',
      minHeight: 240,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 16px rgba(139, 92, 246, 0.15)',
        border: '1px solid rgba(139, 92, 246, 0.4)',
      }
    }}>
      <CardContent sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1.5, 
          mb: 2 
        }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1.5,
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(139, 92, 246, 0.25)'
            }}
          >
            <AutoStories sx={{ fontSize: 22, color: 'white' }} />
          </Box>
          <Box>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600, 
                color: '#6b21a8',
                lineHeight: 1.2,
                fontSize: '1rem'
              }}
            >
              حدیثِ نبوی
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#7c3aed',
                fontSize: '0.7rem'
              }}
            >
              Prophetic Hadith
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2, borderColor: 'rgba(139, 92, 246, 0.15)' }} />

        {/* Hadith Translation (Urdu) */}
        <Box sx={{ 
          mb: 2,
          p: 2,
          background: 'linear-gradient(to bottom, rgba(245, 243, 255, 0.5), rgba(255, 255, 255, 0.3))',
          borderRadius: 1.5,
          border: '1px solid rgba(139, 92, 246, 0.15)',
          flex: 1
        }}>
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', 'Urdu Typesetting', serif",
              fontSize: { xs: '0.95rem', sm: '1.05rem' },
              color: '#581c87',
              lineHeight: 1.8,
              textAlign: 'right',
              direction: 'rtl',
              fontWeight: 500
            }}
          >
            {hadith.translation}
          </Typography>
        </Box>

        {/* Narrator */}
        <Box sx={{ 
          mb: 1.5,
          p: 1.2,
          background: 'rgba(245, 243, 255, 0.4)',
          borderRadius: 1.5,
          border: '1px solid rgba(139, 92, 246, 0.1)'
        }}>
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif",
              fontSize: '0.85rem',
              color: '#6b21a8',
              textAlign: 'right',
              direction: 'rtl',
              fontWeight: 500
            }}
          >
            راوی: {hadith.narrator}
          </Typography>
        </Box>

        {/* Reference */}
        <Box sx={{ 
          mt: 'auto',
          pt: 1.5,
          borderTop: '1px solid rgba(139, 92, 246, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: 0.8
        }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#6b21a8',
              fontWeight: 600,
              textAlign: 'center',
              fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif",
              fontSize: '0.85rem',
              direction: 'rtl'
            }}
          >
            {hadith.reference}
          </Typography>
          <Chip 
            label={hadith.book}
            size="small"
            sx={{ 
              alignSelf: 'center',
              backgroundColor: 'rgba(139, 92, 246, 0.12)',
              color: '#6b21a8',
              fontWeight: 600,
              fontSize: '0.65rem',
              height: 22,
              border: '1px solid rgba(139, 92, 246, 0.2)'
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default HadithCard;
