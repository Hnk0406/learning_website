import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Your Vite frontend
  credentials: true
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/api', routes);

// Health check at root
app.get('/', (req, res) => {
  res.json({ 
    message: 'UPANISHAD Backend API', 
    status: 'running',
    stage: 1
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

export default app;