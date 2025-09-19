// Event types
export const EVENT_TYPES = {
  FOCUS_LOST: 'FOCUS_LOST',
  NO_FACE_DETECTED: 'NO_FACE_DETECTED',
  MULTIPLE_FACES: 'MULTIPLE_FACES',
  SUSPICIOUS_OBJECT: 'SUSPICIOUS_OBJECT',
  CAMERA_ERROR: 'CAMERA_ERROR',
  AUDIO_DETECTED: 'AUDIO_DETECTED',
  EYE_CLOSURE: 'EYE_CLOSURE'
};

// Severity levels
export const SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

// Interview status
export const INTERVIEW_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Suspicious objects to detect
export const SUSPICIOUS_OBJECTS = [
  'cell phone',
  'book',
  'laptop',
  'tv',
  'remote',
  'keyboard',
  'mouse'
];

// Detection thresholds
export const DETECTION_THRESHOLDS = {
  FOCUS_LOST_TIME: 5000, // 5 seconds
  NO_FACE_TIME: 10000,   // 10 seconds
  OBJECT_CONFIDENCE: 0.5  // 50% confidence
};

// Scoring deductions
export const SCORE_DEDUCTIONS = {
  FOCUS_LOST: { high: 5, medium: 3, low: 1 },
  NO_FACE_DETECTED: { high: 10, medium: 7, low: 3 },
  MULTIPLE_FACES: { high: 15, medium: 10, low: 5 },
  SUSPICIOUS_OBJECT: { high: 20, medium: 15, low: 10 },
  CAMERA_ERROR: { high: 5, medium: 3, low: 1 },
  AUDIO_DETECTED: { high: 10, medium: 7, low: 3 },
  EYE_CLOSURE: { high: 8, medium: 5, low: 2 }
};
