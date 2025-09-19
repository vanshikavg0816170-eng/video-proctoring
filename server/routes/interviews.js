const express = require('express');
const router = express.Router();
const Interview = require('../models/Interview');

// Create new interview
router.post('/', async (req, res) => {
  try {
    const { candidateName, startTime } = req.body;
    
    const interview = new Interview({
      candidateName,
      startTime: startTime || new Date()
    });
    
    await interview.save();
    
    res.status(201).json({
      success: true,
      interviewId: interview._id,
      interview
    });
  } catch (error) {
    console.error('Error creating interview:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create interview'
    });
  }
});

// Get interview by ID
router.get('/:id', async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    
    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }
    
    res.json({
      success: true,
      interview
    });
  } catch (error) {
    console.error('Error fetching interview:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch interview'
    });
  }
});

// Update interview
router.put('/:id', async (req, res) => {
  try {
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }
    
    res.json({
      success: true,
      interview
    });
  } catch (error) {
    console.error('Error updating interview:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update interview'
    });
  }
});

// End interview
router.post('/:id/end', async (req, res) => {
  try {
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      {
        endTime: new Date(),
        status: 'completed'
      },
      { new: true }
    );
    
    if (!interview) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }
    
    res.json({
      success: true,
      interview
    });
  } catch (error) {
    console.error('Error ending interview:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to end interview'
    });
  }
});

// Get all interviews
router.get('/', async (req, res) => {
  try {
    const interviews = await Interview.find()
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json({
      success: true,
      interviews
    });
  } catch (error) {
    console.error('Error fetching interviews:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch interviews'
    });
  }
});

module.exports = router;
