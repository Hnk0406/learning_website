import mongoose from '../config/db.js';

const instructorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    instructor: { type: instructorSchema, required: true },
    category: { type: String, trim: true, maxlength: 40 },
    level: { type: String, trim: true, maxlength: 20 },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    hours: { type: Number, min: 0, default: 0 },
    coverImage: { type: String, trim: true },
    price: { type: Number, min: 0, default: 0 },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    materials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material' }]
  },
  { timestamps: true }
);

courseSchema.index({ title: 'text', description: 'text', category: 1 });

export default mongoose.model('Course', courseSchema);
