const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const Interview = require('../models/Interview');
const Event = require('../models/Event');
const { generateReportData } = require('../utils/reportGenerator');

// Generate report for an interview
router.post('/generate/:interviewId', async (req, res) => {
  try {
    const interviewId = req.params.interviewId;
    
    // Check if report already exists
    let report = await Report.findOne({ interviewId });
    
    if (report) {
      return res.json({
        success: true,
        message: 'Report already exists',
        report
      });
    }
    
    // Generate new report
    const reportData = await generateReportData(interviewId);
    
    if (!reportData) {
      return res.status(404).json({
        success: false,
        message: 'Interview not found'
      });
    }
    
    report = new Report(reportData);
    await report.save();
    
    res.status(201).json({
      success: true,
      report
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate report'
    });
  }
});

// Get report by interview ID
router.get('/:interviewId', async (req, res) => {
  try {
    let report = await Report.findOne({ interviewId: req.params.interviewId })
      .populate('events');
    
    // If no report exists, generate one
    if (!report) {
      const reportData = await generateReportData(req.params.interviewId);
      
      if (!reportData) {
        return res.status(404).json({
          success: false,
          message: 'Interview not found'
        });
      }
      
      report = new Report(reportData);
      await report.save();
      await report.populate('events');
    }
    
    res.json({
      success: true,
      ...report.toObject()
    });
  } catch (error) {
    console.error('Error fetching report:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch report'
    });
  }
});

// Get all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('interviewId')
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json({
      success: true,
      reports
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reports'
    });
  }
});

// Update report
router.put('/:id', async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('events');
    
    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }
    
    res.json({
      success: true,
      report
    });
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update report'
    });
  }
});

module.exports = router;
