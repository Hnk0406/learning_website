import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key-change-in-production';

// Simple JWT verification middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided, authorization denied'
      });
    }

    // For now, we'll use a simple token verification
    // Since your login returns a mock token, we'll extract user ID from it
    if (token.startsWith('mock-jwt-token-')) {
      // In a real app, you'd verify the JWT properly
      // For now, we'll extract user info from your mock token format
      req.user = {
        userId: 'mock-user-id', // You'll need to store actual user ID in token
        username: 'mock-user'
      };
      return next();
    }

    // If using real JWT tokens later:
    // const decoded = jwt.verify(token, JWT_SECRET);
    // req.user = decoded;
    // next();

    // For now, reject non-mock tokens
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });

  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Token is not valid'
    });
  }
};

export default auth;