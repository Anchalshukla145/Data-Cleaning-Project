import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  FormControl,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  TextField,
  Chip
} from '@mui/material';
import {
  BarChart,
  ShowChart,
  PieChart,
  ScatterPlot,
  Save,
  Refresh,
  Download
} from '@mui/icons-material';

const DataVisualization = () => {
  const [chartType, setChartType] = useState('bar');
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [generating, setGenerating] = useState(false);
  const [chartData, setChartData] = useState(null);

  const chartTypes = [
    { value: 'bar', label: 'Bar Chart', icon: <BarChart /> },
    { value: 'line', label: 'Line Chart', icon: <ShowChart /> },
    { value: 'pie', label: 'Pie Chart', icon: <PieChart /> },
    { value: 'scatter', label: 'Scatter Plot', icon: <ScatterPlot /> }
  ];

  const sampleColumns = ['Age', 'Salary', 'Department', 'Experience', 'Performance'];

  const handleGenerateChart = () => {
    if (!xAxis || !yAxis) {
      return;
    }
    
    setGenerating(true);
    // Simulate chart generation
    setTimeout(() => {
      setChartData({
        type: chartType,
        xAxis,
        yAxis,
        dataPoints: Math.floor(Math.random() * 100) + 50,
        generatedAt: new Date().toLocaleTimeString()
      });
      setGenerating(false);
    }, 2000);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Data Visualization
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Create charts and visualizations to explore your data patterns.
      </Typography>

      <Grid container spacing={3}>
        {/* Chart Configuration */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Chart Configuration
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Chart Type
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                >
                  {chartTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      <Box display="flex" alignItems="center" gap={1}>
                        {type.icon}
                        {type.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                X-Axis Column
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={xAxis}
                  onChange={(e) => setXAxis(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Select X-Axis</em>
                  </MenuItem>
                  {sampleColumns.map((column) => (
                    <MenuItem key={column} value={column}>
                      {column}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Y-Axis Column
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={yAxis}
                  onChange={(e) => setYAxis(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Select Y-Axis</em>
                  </MenuItem>
                  {sampleColumns.map((column) => (
                    <MenuItem key={column} value={column}>
                      {column}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Button
              variant="contained"
              startIcon={<BarChart />}
              onClick={handleGenerateChart}
              disabled={generating || !xAxis || !yAxis}
              fullWidth
            >
              {generating ? 'Generating Chart...' : 'Generate Chart'}
            </Button>
          </Paper>
        </Grid>

        {/* Chart Display */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Chart Preview
            </Typography>
            
            {generating && (
              <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
                <CircularProgress size={20} />
                <Typography>Generating chart...</Typography>
              </Box>
            )}

            {chartData && (
              <Box>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      {chartTypes.find(t => t.value === chartData.type)?.icon}
                      <Typography variant="h6">
                        {chartTypes.find(t => t.value === chartData.type)?.label}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Chip 
                        label={`X: ${chartData.xAxis}`} 
                        color="primary" 
                        size="small" 
                        sx={{ mr: 1 }}
                      />
                      <Chip 
                        label={`Y: ${chartData.yAxis}`} 
                        color="secondary" 
                        size="small" 
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      Data Points: {chartData.dataPoints}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Generated: {chartData.generatedAt}
                    </Typography>
                  </CardContent>
                </Card>

                <Box display="flex" gap={1} sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Download />}
                    size="small"
                  >
                    Download Chart
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Save />}
                    size="small"
                  >
                    Save Chart
                  </Button>
                </Box>
              </Box>
            )}

            {!chartData && !generating && (
              <Alert severity="info">
                <Typography variant="body2">
                  Select chart type and axes, then click "Generate Chart" to create a visualization.
                </Typography>
              </Alert>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Chart Gallery */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Chart Gallery
        </Typography>
        <Grid container spacing={2}>
          {chartTypes.map((type) => (
            <Grid item xs={12} sm={6} md={3} key={type.value}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 }
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2}>
                    {type.icon}
                    <Typography variant="subtitle1">
                      {type.label}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Click to create a new {type.label.toLowerCase()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Advanced Options */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Advanced Options
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Advanced chart customization options will be available after connecting to backend and loading data.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default DataVisualization; 