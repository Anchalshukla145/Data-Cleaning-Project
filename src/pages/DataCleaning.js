import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  TextField,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import {
  CleaningServices,
  Delete,
  Refresh,
  Save,
  Warning
} from '@mui/icons-material';

const DataCleaning = () => {
  const [cleaningOptions, setCleaningOptions] = useState({
    removeNulls: true,
    removeDuplicates: true,
    handleOutliers: false,
    fillNulls: false,
    fillMethod: 'mean'
  });
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState(null);

  const handleOptionChange = (option) => (event) => {
    setCleaningOptions(prev => ({
      ...prev,
      [option]: event.target.checked
    }));
  };

  const handleSelectChange = (option) => (event) => {
    setCleaningOptions(prev => ({
      ...prev,
      [option]: event.target.value
    }));
  };

  const handleCleanData = () => {
    setProcessing(true);
    // Simulate data cleaning process
    setTimeout(() => {
      setResults({
        originalRows: 1000,
        cleanedRows: 950,
        nullValuesRemoved: 30,
        duplicatesRemoved: 20,
        outliersRemoved: 0,
        processingTime: '2.3s'
      });
      setProcessing(false);
    }, 3000);
  };

  const cleaningSteps = [
    {
      title: 'Remove Null Values',
      description: 'Remove rows with missing data',
      enabled: cleaningOptions.removeNulls
    },
    {
      title: 'Remove Duplicates',
      description: 'Remove duplicate rows from dataset',
      enabled: cleaningOptions.removeDuplicates
    },
    {
      title: 'Handle Outliers',
      description: 'Detect and handle outlier values',
      enabled: cleaningOptions.handleOutliers
    },
    {
      title: 'Fill Null Values',
      description: 'Fill missing values with specified method',
      enabled: cleaningOptions.fillNulls
    }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Data Cleaning
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Clean your dataset by removing null values, duplicates, and handling outliers.
      </Typography>

      <Grid container spacing={3}>
        {/* Cleaning Options */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Cleaning Options
            </Typography>
            
            {cleaningSteps.map((step, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={step.enabled}
                      onChange={handleOptionChange(Object.keys(cleaningOptions)[index])}
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="subtitle1">{step.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {step.description}
                      </Typography>
                    </Box>
                  }
                />
              </Box>
            ))}

            {cleaningOptions.fillNulls && (
              <Box sx={{ mt: 2 }}>
                <FormControl fullWidth>
                  <Typography variant="subtitle2" gutterBottom>
                    Fill Method
                  </Typography>
                  <Select
                    value={cleaningOptions.fillMethod}
                    onChange={handleSelectChange('fillMethod')}
                  >
                    <MenuItem value="mean">Mean</MenuItem>
                    <MenuItem value="median">Median</MenuItem>
                    <MenuItem value="mode">Mode</MenuItem>
                    <MenuItem value="forward">Forward Fill</MenuItem>
                    <MenuItem value="backward">Backward Fill</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<CleaningServices />}
                onClick={handleCleanData}
                disabled={processing}
                fullWidth
              >
                {processing ? 'Cleaning Data...' : 'Clean Data'}
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Results */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Cleaning Results
            </Typography>
            
            {processing && (
              <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
                <CircularProgress size={20} />
                <Typography>Processing data...</Typography>
              </Box>
            )}

            {results && (
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h4" color="primary">
                          {results.originalRows}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Original Rows
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h4" color="success.main">
                          {results.cleanedRows}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Cleaned Rows
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" gutterBottom>
                  Cleaning Summary
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    • Null values removed: {results.nullValuesRemoved}
                  </Typography>
                  <Typography variant="body2">
                    • Duplicates removed: {results.duplicatesRemoved}
                  </Typography>
                  <Typography variant="body2">
                    • Outliers removed: {results.outliersRemoved}
                  </Typography>
                  <Typography variant="body2">
                    • Processing time: {results.processingTime}
                  </Typography>
                </Box>

                <Box display="flex" gap={1}>
                  <Button
                    variant="outlined"
                    startIcon={<Save />}
                    size="small"
                  >
                    Save Cleaned Data
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    size="small"
                  >
                    Reset
                  </Button>
                </Box>
              </Box>
            )}

            {!results && !processing && (
              <Alert severity="info">
                <Typography variant="body2">
                  Select cleaning options and click "Clean Data" to begin.
                </Typography>
              </Alert>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Data Preview */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Data Preview
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Data preview will be available after uploading a file and connecting to backend.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default DataCleaning; 