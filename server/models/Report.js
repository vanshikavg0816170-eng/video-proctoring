const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
    required: true,
    unique: true
  },
  candidateName: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date
  },
  duration: {
    type: Number // in minutes
  },
  integrityScore: {
    type: Number,
    default: 100
  },
  summary: {
    focusLost: { type: Number, default: 0 },
    noFaceDetected: { type: Number, default: 0 },
    objectsDetected: { type: Number, default: 0 },
    multipleFaces: { type: Number, default: 0 },
    totalEvents: { type: Number, default: 0 }
  },
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  recommendations: [String],
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Report', reportSchema);
