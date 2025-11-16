import mongoose from '../config/db.js';

const lessonSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true, trim: true, maxlength: 160 },
    duration: { type: String, trim: true },
    videoUrl: { type: String, trim: true },
    order: { type: Number, min: 0, default: 0 },
    content: { type: String }
  },
  { timestamps: true }
);

lessonSchema.index({ courseId: 1, order: 1 });

export default mongoose.model('Lesson', lessonSchema);
