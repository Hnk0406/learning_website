import mongoose from '../config/db.js';

const favoriteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
  },
  { timestamps: true }
);

favoriteSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.model('Favorite', favoriteSchema);
