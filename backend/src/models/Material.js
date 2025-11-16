import mongoose from '../config/db.js';

const materialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    topic: { type: String, trim: true, maxlength: 80 },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    fileUrl: { type: String, trim: true },
    size: { type: String, trim: true },
    uploadedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

materialSchema.index({ courseId: 1, topic: 1 });

export default mongoose.model('Material', materialSchema);
