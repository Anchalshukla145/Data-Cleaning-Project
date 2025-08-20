import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Typography,
  Paper,
  Button,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Grid
} from '@mui/material';
import {
  CloudUpload,
  InsertDriveFile,
  CheckCircle,
  Error,
  Description
} from '@mui/icons-material';

const DataUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    setError('');
    setUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      const newFiles = acceptedFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'success',
        preview: URL.createObjectURL(file)
      }));
      
      setUploadedFiles(prev => [...prev, ...newFiles]);
      setUploading(false);
    }, 2000);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/json': ['.json']
    },
    multiple: true
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Upload Data
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Upload your CSV, Excel, or JSON files to begin data analysis.
      </Typography>

      {/* Upload Area */}
      <Paper
        {...getRootProps()}
        sx={{
          p: 4,
          textAlign: 'center',
          cursor: 'pointer',
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.300',
          backgroundColor: isDragActive ? 'primary.50' : 'background.paper',
          '&:hover': {
            borderColor: 'primary.main',
            backgroundColor: 'primary.50'
          }
        }}
      >
        <input {...getInputProps()} />
        <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          or click to select files
        </Typography>
        <Button variant="contained" component="span">
          Choose Files
        </Button>
        <Typography variant="caption" display="block" sx={{ mt: 2 }}>
          Supported formats: CSV, Excel (.xlsx, .xls), JSON
        </Typography>
      </Paper>

      {/* Upload Progress */}
      {uploading && (
        <Alert severity="info" sx={{ mt: 2 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <CircularProgress size={16} />
            Uploading files...
          </Box>
        </Alert>
      )}

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Uploaded Files ({uploadedFiles.length})
          </Typography>
          <Grid container spacing={2}>
            {uploadedFiles.map((file, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper sx={{ p: 2 }}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <InsertDriveFile color="primary" />
                    <Box flex={1}>
                      <Typography variant="subtitle2" noWrap>
                        {file.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatFileSize(file.size)}
                      </Typography>
                    </Box>
                    <Chip
                      icon={file.status === 'success' ? <CheckCircle /> : <Error />}
                      label={file.status}
                      color={file.status === 'success' ? 'success' : 'error'}
                      size="small"
                    />
                  </Box>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => removeFile(index)}
                    sx={{ mt: 1 }}
                  >
                    Remove
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* File Preview */}
      {uploadedFiles.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            File Preview
          </Typography>
          <Paper sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              File preview functionality will be implemented with backend integration.
            </Typography>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default DataUpload; 