import express from 'express';
import Progress from '../models/Progress.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Update lesson progress
router.post('/:lessonId', auth, async (req, res) => {
  try {
    const { courseId, completed, watchedSeconds } = req.body;
    
    const progress = await Progress.findOneAndUpdate(
      { 
        userId: req.user.userId, 
        lessonId: req.params.lessonId 
      },
      {
        courseId,
        completed: completed || false,
        watchedSeconds: watchedSeconds || 0
      },
      { 
        upsert: true, 
        new: true,
        runValidators: true 
      }
    );

    res.json({
      success: true,
      message: 'Progress updated',
      data: progress
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update progress'
    });
  }
});

// Get course progress
router.get('/course/:courseId', auth, async (req, res) => {
  try {
    const progress = await Progress.find({
      userId: req.user.userId,
      courseId: req.params.courseId
    }).populate('lessonId');

    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    console.error('Get course progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course progress'
    });
  }
});

export default router;