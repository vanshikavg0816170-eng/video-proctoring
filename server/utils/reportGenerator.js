const Interview = require('../models/Interview');
const Event = require('../models/Event');

const generateReportData = async (interviewId) => {
  try {
    // Get interview data
    const interview = await Interview.findById(interviewId);
    if (!interview) return null;
    
    // Get all events for this interview
    const events = await Event.find({ interviewId }).sort({ timestamp: 1 });
    
    // Calculate event summary
    const summary = {
      focusLost: 0,
      noFaceDetected: 0,
      objectsDetected: 0,
      multipleFaces: 0,
      totalEvents: events.length
    };
    
    events.forEach(event => {
      switch (event.type) {
        case 'FOCUS_LOST':
          summary.focusLost++;
          break;
        case 'NO_FACE_DETECTED':
          summary.noFaceDetected++;
          break;
        case 'SUSPICIOUS_OBJECT':
          summary.objectsDetected++;
          break;
        case 'MULTIPLE_FACES':
          summary.multipleFaces++;
          break;
      }
    });
    
    // Generate recommendations
    const recommendations = generateRecommendations(summary, interview.integrityScore);
    
    return {
      interviewId: interview._id,
      candidateName: interview.candidateName,
      startTime: interview.startTime,
      endTime: interview.endTime,
      duration: interview.duration,
      integrityScore: Math.max(0, interview.integrityScore),
      summary,
      events: events.map(e => e._id),
      recommendations,
      status: 'completed'
    };
  } catch (error) {
    console.error('Error generating report data:', error);
    return null;
  }
};

const generateRecommendations = (summary, integrityScore) => {
  const recommendations = [];
  
  if (integrityScore < 50) {
    recommendations.push('High risk candidate - Consider additional verification');
    recommendations.push('Multiple violations detected - Recommend re-interview');
  } else if (integrityScore < 70) {
    recommendations.push('Medium risk candidate - Review flagged events');
    recommendations.push('Consider follow-up questions on specific topics');
  } else if (integrityScore < 85) {
    recommendations.push('Low risk candidate - Minor issues detected');
    recommendations.push('Acceptable for most positions with standard verification');
  } else {
    recommendations.push('Excellent integrity score - No major concerns');
    recommendations.push('Candidate demonstrated good focus and compliance');
  }
  
  if (summary.focusLost > 5) {
    recommendations.push('High frequency of attention loss - May indicate distraction or disinterest');
  }
  
  if (summary.objectsDetected > 3) {
    recommendations.push('Multiple suspicious objects detected - Investigate potential cheating');
  }
  
  if (summary.multipleFaces > 2) {
    recommendations.push('Multiple people detected in frame - Verify interview environment');
  }
  
  if (summary.noFaceDetected > 3) {
    recommendations.push('Frequent absence from camera view - Check technical issues or compliance');
  }
  
  return recommendations;
};

const calculateIntegrityScore = (events) => {
  let score = 100;
  
  const deductionMap = {
    'FOCUS_LOST': { high: 5, medium: 3, low: 1 },
    'NO_FACE_DETECTED': { high: 10, medium: 7, low: 3 },
    'MULTIPLE_FACES': { high: 15, medium: 10, low: 5 },
    'SUSPICIOUS_OBJECT': { high: 20, medium: 15, low: 10 },
    'CAMERA_ERROR': { high: 5, medium: 3, low: 1 },
    'AUDIO_DETECTED': { high: 10, medium: 7, low: 3 },
    'EYE_CLOSURE': { high: 8, medium: 5, low: 2 }
  };
  
  events.forEach(event => {
    const deduction = deductionMap[event.type]?.[event.severity] || 1;
    score -= deduction;
  });
  
  return Math.max(0, score);
};

module.exports = {
  generateReportData,
  generateRecommendations,
  calculateIntegrityScore
};
