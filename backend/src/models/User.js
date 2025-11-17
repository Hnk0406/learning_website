import mongoose from '../config/db.js';

const socialLinksSchema = new mongoose.Schema({
  linkedin: { type: String, trim: true },
  github: { type: String, trim: true },
  portfolio: { type: String, trim: true }
});

// Add this to your userSchema in User.js
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true, maxlength: 40 },
    passwordHash: { type: String, required: true },
    avatarUrl: { type: String, trim: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    bio: { type: String, trim: true, maxlength: 280 },
    phone: { type: String, trim: true, maxlength: 20 },
    location: { type: String, trim: true, maxlength: 80 },
    skills: [{ type: String, trim: true, maxlength: 40 }],
    socialLinks: socialLinksSchema,
    // ADD FOCUS STATS HERE:
    focusStats: {
      totalFocusTime: { type: Number, default: 0 },
      completedPomodoros: { type: Number, default: 0 },
      longestStreak: { type: Number, default: 0 },
      currentStreak: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

export default mongoose.model('User', userSchema);
