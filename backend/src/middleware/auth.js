import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key-change-in-production';

// Simple JWT verification middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    console.log('Auth middleware - Token received:', token ? 'Yes' : 'No');
    
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({
        success: false,
        message: 'No token provided, authorization denied'
      });
    }

    // Accept both mock tokens and real JWT tokens
    if (token.startsWith('mock-jwt-token-')) {
      // For mock tokens, create a mock user
      // In a real scenario, you'd look up the user from your database
      req.user = {
        userId: '67a1b2c3d4e5f67890123456', // Mock user ID
        username: 'demo-user',
        email: 'demo@example.com'
      };
      console.log('Mock token accepted, user:', req.user.username);
      return next();
    }

    // Try to verify as real JWT token
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Find user to ensure they still exist
      const user = await User.findById(decoded.userId).select('-passwordHash');
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }

      req.user = {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      };
      
      console.log('JWT token accepted, user:', req.user.username);
      next();
    } catch (jwtError) {
      console.log('JWT verification failed:', jwtError.message);
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in authentication'
    });
  }
};

export default auth;