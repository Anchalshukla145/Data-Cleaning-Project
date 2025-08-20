import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart, Upload, CleaningServices, Settings, Dashboard } from '@mui/icons-material';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', path: '/', icon: <Dashboard /> },
    { text: 'Upload Data', path: '/upload', icon: <Upload /> },
    { text: 'Data Cleaning', path: '/cleaning', icon: <CleaningServices /> },
    { text: 'Preprocessing', path: '/preprocessing', icon: <Settings /> },
    { text: 'Visualization', path: '/visualization', icon: <BarChart /> },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Data Analysis Platform
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {menuItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              startIcon={item.icon}
              onClick={() => navigate(item.path)}
              sx={{
                backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {item.text}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 