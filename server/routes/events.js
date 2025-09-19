const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Interview = require('../models/Interview');

// Create new event
router.post('/', async (req, res) => {
  try {
    const eventData = req.body;
    
    const event = new Event(eventData);
    await event.save();
    
    // Update interview integrity score
    await updateIntegrityScore(eventData.interviewId, eventData.type, eventData.severity);
    
    res.status(201).json({
      success: true,
      event
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create event'
    });
  }
});

// Get events for an interview
router.get('/interview/:interviewId', async (req, res) => {
  try {
    const events = await Event.find({ interviewId: req.params.interviewId })
      .sort({ timestamp: 1 });
    
    res.json({
      success: true,
      events
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events'
    });
  }
});

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('interviewId');
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }
    
    res.json({
      success: true,
      event
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event'
    });
  }
});

// Update integrity score based on event
const updateIntegrityScore = async (interviewId, eventType, severity) => {
  try {
    const deductionMap = {
      'FOCUS_LOST': { high: 5, medium: 3, low: 1 },
      'NO_FACE_DETECTED': { high: 10, medium: 7, low: 3 },
      'MULTIPLE_FACES': { high: 15, medium: 10, low: 5 },
      'SUSPICIOUS_OBJECT': { high: 20, medium: 15, low: 10 },
      'CAMERA_ERROR': { high: 5, medium: 3, low: 1 },
      'AUDIO_DETECTED': { high: 10, medium: 7, low: 3 },
      'EYE_CLOSURE': { high: 8, medium: 5, low: 2 }
    };
    
    const deduction = deductionMap[eventType]?.[severity] || 1;
    
    await Interview.findByIdAndUpdate(
      interviewId,
      { $inc: { integrityScore: -deduction } }
    );
    
    // Ensure score doesn't go below 0
    const interview = await Interview.findById(interviewId);
    if (interview.integrityScore < 0) {
      await Interview.findByIdAndUpdate(interviewId, { integrityScore: 0 });
    }
  } catch (error) {
    console.error('Error updating integrity score:', error);
  }
};

// Get event statistics
router.get('/stats/:interviewId', async (req, res) => {
  try {
    const stats = await Event.aggregate([
      { $match: { interviewId: req.params.interviewId } },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          severityBreakdown: {
            $push: '$severity'
          }
        }
      }
    ]);
    
    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error fetching event stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event statistics'
    });
  }
});

module.exports = router;
