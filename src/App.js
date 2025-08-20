import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';

// Import components
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import DataUpload from './pages/DataUpload';
import DataCleaning from './pages/DataCleaning';
import DataPreprocessing from './pages/DataPreprocessing';
import DataVisualization from './pages/DataVisualization';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Header />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/upload" element={<DataUpload />} />
              <Route path="/cleaning" element={<DataCleaning />} />
              <Route path="/preprocessing" element={<DataPreprocessing />} />
              <Route path="/visualization" element={<DataVisualization />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 