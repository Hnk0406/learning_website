import express from 'express';
const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  console.log('Login attempt:', { username });
  
  // Mock users for Stage 1
  const validUsers = [
    { username: 'admin', password: 'password123', email: 'admin@upanishad.com' },
    { username: 'user', password: 'user123', email: 'user@upanishad.com' },
    { username: 'aryabhatta', password: 'test123', email: 'arya@upanishad.com' }
  ];
  
  const user = validUsers.find(u => 
    u.username === username && u.password === password
  );
  
  if (user) {
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        username: user.username,
        email: user.email
      },
      token: 'mock-jwt-token-' + Date.now()
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid username or password'
    });
  }
});

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  
  console.log('Registration attempt:', { username, email });
  
  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }
  
  res.json({
    success: true,
    message: 'Registration successful',
    user: { username, email }
  });
});

export default router;