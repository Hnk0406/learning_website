import mongoose from '../config/db.js';

const contactSubmissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, maxlength: 120 },
    message: { type: String, required: true, trim: true, maxlength: 2000 }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model('ContactSubmission', contactSubmissionSchema);
