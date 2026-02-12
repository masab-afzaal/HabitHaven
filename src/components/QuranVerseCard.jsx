import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider
} from '@mui/material';
import { MenuBook } from '@mui/icons-material';
import { islamicContentService } from '../services/islamicContentService';
import { colors, shadows } from '../styles';

const QuranVerseCard = () => {
  const [verse] = useState(() => {
    const result = islamicContentService.getDailyQuranVerse();
    return result.success ? result.data : null;
  });

  if (!verse) {
    return null;
  }

  return (
    <Card sx={{
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(16, 185, 129, 0.2)',
      borderRadius: 2,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      height: '100%',
      minHeight: 240,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 16px rgba(16, 185, 129, 0.15)',
        border: '1px solid rgba(16, 185, 129, 0.4)',
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
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.25)'
            }}
          >
            <MenuBook sx={{ fontSize: 22, color: 'white' }} />
          </Box>
          <Box>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600, 
                color: '#047857',
                lineHeight: 1.2,
                fontSize: '1rem'
              }}
            >
              آیتِ قرآنی
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#059669',
                fontSize: '0.7rem'
              }}
            >
              Quranic Verse
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2, borderColor: 'rgba(16, 185, 129, 0.15)' }} />

        {/* Arabic Text */}
        <Box sx={{ 
          mb: 2, 
          textAlign: 'center',
          p: 2,
          background: 'linear-gradient(to bottom, rgba(240, 253, 244, 0.5), rgba(255, 255, 255, 0.3))',
          borderRadius: 1.5,
          border: '1px solid rgba(16, 185, 129, 0.15)'
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: "'Amiri Quran', 'Lateef', serif",
              fontSize: { xs: '1.6rem', sm: '1.8rem' },
              fontWeight: 400,
              color: '#065f46',
              lineHeight: 2.4,
              letterSpacing: '0.03em',
              direction: 'rtl',
              textAlign: 'center'
            }}
          >
            {verse.arabic}
          </Typography>
        </Box>

        {/* Urdu Translation */}
        <Box sx={{ 
          mb: 2,
          p: 1.5,
          background: 'rgba(240, 253, 250, 0.4)',
          borderRadius: 1.5,
          border: '1px solid rgba(16, 185, 129, 0.1)'
        }}>
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', 'Urdu Typesetting', serif",
              fontSize: { xs: '0.95rem', sm: '1.05rem' },
              color: '#064e3b',
              lineHeight: 1.8,
              textAlign: 'right',
              direction: 'rtl',
              fontWeight: 500
            }}
          >
            {verse.translation}
          </Typography>
        </Box>

        {/* Reference */}
        <Box sx={{ 
          mt: 'auto',
          pt: 1.5,
          borderTop: '1px solid rgba(16, 185, 129, 0.15)'
        }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#047857',
              fontWeight: 600,
              textAlign: 'center',
              fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif",
              fontSize: '0.85rem',
              direction: 'rtl'
            }}
          >
            {verse.reference}
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: '#059669',
              display: 'block',
              textAlign: 'center',
              mt: 0.5,
              fontSize: '0.65rem',
              opacity: 0.8
            }}
          >
            {verse.surah} • Ayah {verse.ayah}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuranVerseCard;
