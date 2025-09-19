import React, { useState, useEffect } from 'react';

const AlertSystem = ({ alerts, events }) => {
  const [recentAlerts, setRecentAlerts] = useState([]);

  useEffect(() => {
    // Keep only last 10 alerts
    setRecentAlerts(alerts.slice(-10));
  }, [alerts]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffaa00';
      case 'low': return '#44ff44';
      default: return '#888888';
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'FOCUS_LOST': return '👁️';
      case 'NO_FACE_DETECTED': return '❌';
      case 'MULTIPLE_FACES': return '👥';
      case 'SUSPICIOUS_OBJECT': return '📱';
      case 'CAMERA_ERROR': return '⚠️';
      default: return '⚡';
    }
  };

  return (
    <div className="alert-system">
      <div className="alerts-section">
        <h3>Real-time Alerts</h3>
        <div className="alerts-container">
          {recentAlerts.length === 0 ? (
            <div className="no-alerts">No alerts yet</div>
          ) : (
            recentAlerts.map((alert, index) => (
              <div
                key={index}
                className="alert-item"
                style={{ borderLeft: `4px solid ${getSeverityColor(alert.severity)}` }}
              >
                <div className="alert-header">
                  <span className="alert-icon">{getEventIcon(alert.type)}</span>
                  <span className="alert-time">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="alert-description">{alert.description}</div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="events-log">
        <h3>Event Log</h3>
        <div className="events-container">
          {events.slice(-15).map((event, index) => (
            <div key={index} className="event-item">
              <span className="event-time">
                {new Date(event.timestamp).toLocaleTimeString()}
              </span>
              <span className="event-type">{event.type}</span>
              <span className="event-description">{event.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertSystem;
