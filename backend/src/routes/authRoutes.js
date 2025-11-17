import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// POST /api/auth/register - Updated for your current User model
router.post('/register', async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    
    console.log('Registration attempt:', { name, email, username });
    
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }
    
    // Hash password manually (since your model doesn't have pre-save hooks)
    const passwordHash = await bcrypt.hash(password, 12);
    
    // Create new user with correct field names
    const user = await User.create({
      name,           // Use 'name' not 'fullName'
      email,
      username,
      passwordHash,   // Use 'passwordHash' not 'password'
      role: 'user',
      // Add other default fields if needed
      socialLinks: {}
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `${field} already exists`
      });
    }
    
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// POST /api/auth/login - Updated for your current User model
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    console.log('Login attempt:', { username });
    
    // Find user in MongoDB - include passwordHash in selection
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check password using bcrypt directly
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password'
      });
    }
    
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token: 'mock-jwt-token-' + Date.now()
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

export default router;