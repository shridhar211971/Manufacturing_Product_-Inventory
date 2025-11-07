import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { deepOrange } from '@mui/material/colors';

export default function Header() {
  const userName = 'Shri'; // You can make this dynamic based on logged-in user

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        width: { md: `calc(100% - 230px)` },
        ml: { md: `${230}px` },
        backgroundColor: 'grey',
        color: 'black',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            {userName}
          </Typography>
          
          <Avatar 
            sx={{ 
              bgcolor: deepOrange[500],
              width: 36,
              height: 36,
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            {userName.charAt(0)}
          </Avatar>
          
          <IconButton color="inherit">
            <SettingsIcon sx={{ color: 'text.primary' }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
