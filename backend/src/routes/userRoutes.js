import express from 'express';
import User from '../models/User.js';
import Favorite from '../models/Favorite.js';
import Enrollment from '../models/Enrollment.js';
import Progress from '../models/Progress.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-passwordHash');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile'
    });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const updates = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      updates,
      { new: true, runValidators: true }
    ).select('-passwordHash');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
});

// Get user's favorite courses
router.get('/favorites', auth, async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.userId })
      .populate({
        path: 'courseId',
        populate: [
          { path: 'instructor.id', select: 'name avatarUrl' },
          { path: 'lessons' }
        ]
      });

    res.json({
      success: true,
      data: favorites
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch favorites'
    });
  }
});

// Add course to favorites
router.post('/favorites/:courseId', auth, async (req, res) => {
  try {
    const favorite = new Favorite({
      userId: req.user.userId,
      courseId: req.params.courseId
    });

    await favorite.save();
    await favorite.populate({
      path: 'courseId',
      populate: { path: 'instructor.id', select: 'name avatarUrl' }
    });

    res.status(201).json({
      success: true,
      message: 'Course added to favorites',
      data: favorite
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Course already in favorites'
      });
    }
    console.error('Add favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add to favorites'
    });
  }
});

// Remove course from favorites
router.delete('/favorites/:courseId', auth, async (req, res) => {
  try {
    await Favorite.findOneAndDelete({
      userId: req.user.userId,
      courseId: req.params.courseId
    });

    res.json({
      success: true,
      message: 'Course removed from favorites'
    });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove from favorites'
    });
  }
});

// Update focus stats
router.patch('/focus-stats', auth, async (req, res) => {
  try {
    const { focusTime, completedPomodoros } = req.body;
    
    const user = await User.findById(req.user.userId);
    
    const updates = {
      'focusStats.totalFocusTime': user.focusStats.totalFocusTime + (focusTime || 0),
      'focusStats.completedPomodoros': user.focusStats.completedPomodoros + (completedPomodoros || 0)
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { $inc: updates },
      { new: true }
    ).select('-passwordHash');

    res.json({
      success: true,
      message: 'Focus stats updated',
      data: updatedUser.focusStats
    });
  } catch (error) {
    console.error('Update focus stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update focus stats'
    });
  }
});

export default router;