import express from 'express';
import authRoutes from './authRoutes.js';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    stage: 1,
    timestamp: new Date().toISOString()
  });
});

// Use auth routes
router.use('/auth', authRoutes);

export default router;