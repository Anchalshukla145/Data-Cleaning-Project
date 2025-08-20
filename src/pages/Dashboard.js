import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  Upload, 
  CleaningServices, 
  Settings, 
  BarChart,
  TrendingUp,
  DataUsage,
  Speed
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const quickActions = [
    { title: 'Upload Data', description: 'Upload CSV, Excel, or JSON files', icon: <Upload />, path: '/upload' },
    { title: 'Clean Data', description: 'Handle missing values and duplicates', icon: <CleaningServices />, path: '/cleaning' },
    { title: 'Preprocess', description: 'Scale, encode, and transform data', icon: <Settings />, path: '/preprocessing' },
    { title: 'Visualize', description: 'Create charts and plots', icon: <BarChart />, path: '/visualization' },
  ];

  const stats = [
    { title: 'Files Processed', value: '0', icon: <DataUsage /> },
    { title: 'Data Points', value: '0', icon: <TrendingUp /> },
    { title: 'Processing Speed', value: 'Fast', icon: <Speed /> },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome to Data Analysis Platform
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Upload, clean, preprocess, and visualize your data with powerful tools.
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  {stat.icon}
                  <Box>
                    <Typography variant="h6">{stat.value}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Typography variant="h5" gutterBottom>
        Quick Actions
      </Typography>
      <Grid container spacing={3}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 }
              }}
              onClick={() => navigate(action.path)}
            >
              <CardContent>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  {action.icon}
                  <Typography variant="h6">{action.title}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {action.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Recent Activity
        </Typography>
        <Paper>
          <List>
            <ListItem>
              <ListItemIcon>
                <Upload />
              </ListItemIcon>
              <ListItemText 
                primary="No recent activity" 
                secondary="Upload your first file to get started"
              />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard; 