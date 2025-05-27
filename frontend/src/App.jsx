import React, { useEffect, useState } from 'react';
import { fetchItemsPrices } from './api';
import { io } from 'socket.io-client';
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Alert,
} from '@mui/material';

const socket = io('http://localhost:8081');

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121e33',
      paper: '#192b4d',
    },
    primary: {
      main: '#1976d2',
    },
  },
});

export default function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const d = await fetchItemsPrices();
        setData(d);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load data.');
        setLoading(false);
      }
    })();

    socket.on('data_update', (rows) => setData(rows));

    return () => socket.off('data_update');
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Container maxWidth="md">
          <Box textAlign="center" mb={3}>
            <Typography variant="h3" color="primary" gutterBottom>
              RuneScape Items & Prices (Live)
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={300}>
              <CircularProgress size={70} color="primary" />
            </Box>
          ) : (
            <TableContainer component={Paper} elevation={4}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Item ID</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Members?</TableCell>
                    <TableCell align="center">High Price</TableCell>
                    <TableCell align="center">Low Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        Please wait while data is getting loaded
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.map((row) => (
                      <TableRow key={row.item_id}>
                        <TableCell align="center">{row.item_id}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.members ? 'Yes' : 'No'}</TableCell>
                        <TableCell align="center">{row.high}</TableCell>
                        <TableCell align="center">{row.low}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}