import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Divider,
  TextField
} from '@mui/material';
import {
  Settings,
  Transform,
  Save,
  Refresh,
  TrendingUp
} from '@mui/icons-material';

const DataPreprocessing = () => {
  const [preprocessingOptions, setPreprocessingOptions] = useState({
    scaling: true,
    encoding: false,
    featureSelection: false,
    normalization: false,
    scalingMethod: 'standard',
    encodingMethod: 'onehot'
  });
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState(null);

  const handleOptionChange = (option) => (event) => {
    setPreprocessingOptions(prev => ({
      ...prev,
      [option]: event.target.checked
    }));
  };

  const handleSelectChange = (option) => (event) => {
    setPreprocessingOptions(prev => ({
      ...prev,
      [option]: event.target.value
    }));
  };

  const handlePreprocessData = () => {
    setProcessing(true);
    // Simulate preprocessing process
    setTimeout(() => {
      setResults({
        originalFeatures: 15,
        processedFeatures: 12,
        scalingApplied: preprocessingOptions.scaling,
        encodingApplied: preprocessingOptions.encoding,
        featuresRemoved: 3,
        processingTime: '1.8s'
      });
      setProcessing(false);
    }, 2500);
  };

  const preprocessingSteps = [
    {
      title: 'Feature Scaling',
      description: 'Scale numerical features to standard range',
      enabled: preprocessingOptions.scaling
    },
    {
      title: 'Categorical Encoding',
      description: 'Encode categorical variables',
      enabled: preprocessingOptions.encoding
    },
    {
      title: 'Feature Selection',
      description: 'Select most important features',
      enabled: preprocessingOptions.featureSelection
    },
    {
      title: 'Normalization',
      description: 'Normalize data to 0-1 range',
      enabled: preprocessingOptions.normalization
    }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Data Preprocessing
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Transform and prepare your data for machine learning models.
      </Typography>

      <Grid container spacing={3}>
        {/* Preprocessing Options */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Preprocessing Options
            </Typography>
            
            {preprocessingSteps.map((step, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={step.enabled}
                      onChange={handleOptionChange(Object.keys(preprocessingOptions)[index])}
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

            {preprocessingOptions.scaling && (
              <Box sx={{ mt: 2 }}>
                <FormControl fullWidth>
                  <Typography variant="subtitle2" gutterBottom>
                    Scaling Method
                  </Typography>
                  <Select
                    value={preprocessingOptions.scalingMethod}
                    onChange={handleSelectChange('scalingMethod')}
                  >
                    <MenuItem value="standard">Standard Scaler</MenuItem>
                    <MenuItem value="minmax">Min-Max Scaler</MenuItem>
                    <MenuItem value="robust">Robust Scaler</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}

            {preprocessingOptions.encoding && (
              <Box sx={{ mt: 2 }}>
                <FormControl fullWidth>
                  <Typography variant="subtitle2" gutterBottom>
                    Encoding Method
                  </Typography>
                  <Select
                    value={preprocessingOptions.encodingMethod}
                    onChange={handleSelectChange('encodingMethod')}
                  >
                    <MenuItem value="onehot">One-Hot Encoding</MenuItem>
                    <MenuItem value="label">Label Encoding</MenuItem>
                    <MenuItem value="ordinal">Ordinal Encoding</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}

            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<Settings />}
                onClick={handlePreprocessData}
                disabled={processing}
                fullWidth
              >
                {processing ? 'Preprocessing Data...' : 'Preprocess Data'}
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Results */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Preprocessing Results
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
                          {results.originalFeatures}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Original Features
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card>
                      <CardContent>
                        <Typography variant="h4" color="success.main">
                          {results.processedFeatures}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Processed Features
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" gutterBottom>
                  Processing Summary
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    • Scaling applied: {results.scalingApplied ? 'Yes' : 'No'}
                  </Typography>
                  <Typography variant="body2">
                    • Encoding applied: {results.encodingApplied ? 'Yes' : 'No'}
                  </Typography>
                  <Typography variant="body2">
                    • Features removed: {results.featuresRemoved}
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
                    Save Processed Data
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
                  Select preprocessing options and click "Preprocess Data" to begin.
                </Typography>
              </Alert>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Feature Importance */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Feature Importance
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Feature importance visualization will be available after preprocessing and connecting to backend.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default DataPreprocessing; 