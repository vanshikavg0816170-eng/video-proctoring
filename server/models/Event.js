const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'FOCUS_LOST',
      'NO_FACE_DETECTED',
      'MULTIPLE_FACES',
      'SUSPICIOUS_OBJECT',
      'CAMERA_ERROR',
      'AUDIO_DETECTED',
      'EYE_CLOSURE'
    ]
  },
  description: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  metadata: {
    confidence: Number,
    objectClass: String,
    faceCount: Number,
    duration: Number
  }
}, {
  timestamps: true
});

// Index for efficient querying
eventSchema.index({ interviewId: 1, timestamp: 1 });

module.exports = mongoose.model('Event', eventSchema);
