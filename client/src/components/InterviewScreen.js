import React, { useState, useEffect, useRef } from 'react';
import VideoInterface from './VideoInterface';
import AlertSystem from './AlertSystem';
import { createInterview, saveEvent } from '../utils/api';
import io from 'socket.io-client';

const InterviewScreen = () => {
  const [interviewId, setInterviewId] = useState(null);
  const [candidateName, setCandidateName] = useState('');
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [events, setEvents] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    
    socketRef.current = io(`${process.env.REACT_APP_BACKEND_URL}`);
    
    socketRef.current.on('new-alert', (alert) => {
      setAlerts(prev => [...prev, alert]);
    });

    return () => socketRef.current.disconnect();
  }, []);

  const startInterview = async () => {
    if (!candidateName.trim()) {
      alert('Please enter candidate name');
      return;
    }

    try {
      const response = await createInterview({
        candidateName,
        startTime: new Date()
      });
      
      setInterviewId(response.data.interviewId);
      setIsInterviewActive(true);
      
      socketRef.current.emit('join-interview', response.data.interviewId);
    } catch (error) {
      console.error('Error starting interview:', error);
      alert('Failed to start interview');
    }
  };

  const endInterview = () => {
    setIsInterviewActive(false);
    socketRef.current.emit('end-interview', interviewId);
  };

  const handleEvent = async (eventData) => {
    const event = {
      interviewId,
      type: eventData.type,
      description: eventData.description,
      timestamp: new Date(),
      severity: eventData.severity
    };

    try {
      await saveEvent(event);
      setEvents(prev => [...prev, event]);
      
      // Emit to socket for real-time updates
      socketRef.current.emit('proctoring-event', event);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <div className="interview-screen">
      <div className="interview-header">
        <h2>Video Interview Proctoring</h2>
        {!isInterviewActive ? (
          <div className="interview-setup">
            <input
              type="text"
              placeholder="Enter Candidate Name"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="candidate-input"
            />
            <button onClick={startInterview} className="start-btn">
              Start Interview
            </button>
          </div>
        ) : (
          <div className="interview-controls">
            <span>Interview Active - {candidateName}</span>
            <button onClick={endInterview} className="end-btn">
              End Interview
            </button>
            {interviewId && (
              <a href={`/report/${interviewId}`} className="report-link">
                View Report
              </a>
            )}
          </div>
        )}
      </div>

      {isInterviewActive && (
        <>
          <div className="main-content">
            <VideoInterface
              onEvent={handleEvent}
              isActive={isInterviewActive}
              interviewId={interviewId}
            />
            <AlertSystem alerts={alerts} events={events} />
          </div>
        </>
      )}
    </div>
  );
};

export default InterviewScreen;

