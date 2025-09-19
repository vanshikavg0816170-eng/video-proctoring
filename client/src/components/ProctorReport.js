// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getReport } from '../utils/api';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import jsPDF from 'jspdf';

// const ProctorReport = () => {
//   const { id } = useParams();
//   const [report, setReport] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchReport();
//   }, [id]);

//   const fetchReport = async () => {
//     try {
//       const response = await getReport(id);
//       setReport(response.data);
//     } catch (error) {
//       console.error('Error fetching report:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generatePDF = () => {
//     const pdf = new jsPDF();
    
//     pdf.setFontSize(20);
//     pdf.text('Proctoring Report', 20, 30);
    
//     pdf.setFontSize(12);
//     pdf.text(`Candidate: ${report.candidateName}`, 20, 50);
//     pdf.text(`Date: ${new Date(report.startTime).toLocaleDateString()}`, 20, 60);
//     pdf.text(`Duration: ${report.duration} minutes`, 20, 70);
//     pdf.text(`Integrity Score: ${report.integrityScore}/100`, 20, 80);
    
//     pdf.text('Event Summary:', 20, 100);
//     pdf.text(`Focus Lost: ${report.summary.focusLost} times`, 30, 110);
//     pdf.text(`No Face Detected: ${report.summary.noFaceDetected} times`, 30, 120);
//     pdf.text(`Suspicious Objects: ${report.summary.objectsDetected} times`, 30, 130);
//     pdf.text(`Multiple Faces: ${report.summary.multipleFaces} times`, 30, 140);
    
//     pdf.save(`proctoring-report-${report.candidateName}.pdf`);
//   };

//   if (loading) return <div className="loading">Loading report...</div>;
//   if (!report) return <div className="error">Report not found</div>;

//   const chartData = [
//     { name: 'Focus Lost', value: report.summary.focusLost },
//     { name: 'No Face', value: report.summary.noFaceDetected },
//     { name: 'Objects', value: report.summary.objectsDetected },
//     { name: 'Multiple Faces', value: report.summary.multipleFaces }
//   ];

//   return (
//     <div className="proctor-report">
//       <div className="report-header">
//         <h2>Proctoring Report</h2>
//         <button onClick={generatePDF} className="pdf-btn">
//           Download PDF
//         </button>
//       </div>

//       <div className="report-summary">
//         <div className="summary-cards">
//           <div className="summary-card">
//             <h3>Candidate Information</h3>
//             <p><strong>Name:</strong> {report.candidateName}</p>
//             <p><strong>Date:</strong> {new Date(report.startTime).toLocaleDateString()}</p>
//             <p><strong>Start Time:</strong> {new Date(report.startTime).toLocaleTimeString()}</p>
//             <p><strong>Duration:</strong> {report.duration} minutes</p>
//           </div>

//           <div className="summary-card">
//             <h3>Integrity Score</h3>
//             <div className="score-display">
//               <span className="score-number">{report.integrityScore}</span>
//               <span className="score-total">/100</span>
//             </div>
//             <div className={`score-status ${report.integrityScore >= 80 ? 'good' : report.integrityScore >= 60 ? 'warning' : 'poor'}`}>
//               {report.integrityScore >= 80 ? 'Good' : report.integrityScore >= 60 ? 'Questionable' : 'Poor'}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="event-summary">
//         <h3>Event Summary</h3>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="value" fill="#8884d8" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       <div className="detailed-events">
//         <h3>Detailed Events</h3>
//         <div className="events-table">
//           <table>
//             <thead>
//               <tr>
//                 <th>Time</th>
//                 <th>Type</th>
//                 <th>Description</th>
//                 <th>Severity</th>
//               </tr>
//             </thead>
//             <tbody>
//               {report.events.map((event, index) => (
//                 <tr key={index}>
//                   <td>{new Date(event.timestamp).toLocaleTimeString()}</td>
//                   <td>{event.type}</td>
//                   <td>{event.description}</td>
//                   <td className={`severity-${event.severity}`}>{event.severity}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProctorReport;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReport } from '../utils/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import jsPDF from 'jspdf';

const ProctorReport = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      const response = await getReport(id);
      const reportData = response.data;
      
      // Calculate integrity score based on assignment requirements
      const integrityScore = calculateIntegrityScore(reportData);
      
      setReport({
        ...reportData,
        integrityScore
      });
    } catch (error) {
      console.error('Error fetching report:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateIntegrityScore = (reportData) => {
    let score = 100; // Start with perfect score
    
    const summary = reportData.summary || {};
    const events = reportData.events || [];
    
    // Deduction rules based on severity
    const deductions = {
      // High severity violations
      'MULTIPLE_FACES': 15,        // Multiple people in frame
      'NO_FACE_DETECTED': 10,     // No face for >10 seconds
      'SUSPICIOUS_OBJECT': {
        'cell phone': 20,          // Phone detected (high risk)
        'laptop': 15,              // Extra laptop/computer
        'book': 10,                // Books/notes detected
        'default': 8
      },
      'CAMERA_ERROR': 25,          // Camera issues
      
      // Medium severity violations  
      'FOCUS_LOST': 5,             // Looking away for >5 seconds
      
      // Additional time-based penalties
      'TIME_PENALTIES': {
        totalFocusLostTime: 0.1,   // 0.1 point per second of focus lost
        totalNoFaceTime: 0.2       // 0.2 point per second of no face
      }
    };
    
    // Apply event-based deductions
    events.forEach(event => {
      switch(event.type) {
        case 'MULTIPLE_FACES':
          score -= deductions.MULTIPLE_FACES;
          break;
          
        case 'NO_FACE_DETECTED':
          score -= deductions.NO_FACE_DETECTED;
          break;
          
        case 'SUSPICIOUS_OBJECT':
          if (typeof deductions.SUSPICIOUS_OBJECT === 'object') {
            const objectType = event.description.toLowerCase();
            if (objectType.includes('cell phone')) {
              score -= deductions.SUSPICIOUS_OBJECT['cell phone'];
            } else if (objectType.includes('laptop')) {
              score -= deductions.SUSPICIOUS_OBJECT['laptop'];
            } else if (objectType.includes('book')) {
              score -= deductions.SUSPICIOUS_OBJECT['book'];
            } else {
              score -= deductions.SUSPICIOUS_OBJECT.default;
            }
          }
          break;
          
        case 'FOCUS_LOST':
          score -= deductions.FOCUS_LOST;
          break;
          
        case 'CAMERA_ERROR':
          score -= deductions.CAMERA_ERROR;
          break;
          
        default:
          score -= 2; // Default minor deduction for other events
      }
    });
    
    // Apply frequency-based penalties (repeated violations are worse)
    if (summary.multipleFaces > 2) score -= (summary.multipleFaces - 2) * 5;
    if (summary.focusLost > 3) score -= (summary.focusLost - 3) * 2;
    if (summary.objectsDetected > 2) score -= (summary.objectsDetected - 2) * 3;
    
    // Apply time-based penalties if available
    if (reportData.totalFocusLostTime) {
      score -= reportData.totalFocusLostTime * deductions.TIME_PENALTIES.totalFocusLostTime;
    }
    if (reportData.totalNoFaceTime) {
      score -= reportData.totalNoFaceTime * deductions.TIME_PENALTIES.totalNoFaceTime;
    }
    
    // Ensure score doesn't go below 0
    return Math.max(0, Math.round(score));
  };

  const getIntegrityScoreColor = (score) => {
    if (score >= 85) return '#4CAF50';  // Green - Excellent
    if (score >= 70) return '#FFC107';  // Yellow - Good  
    if (score >= 50) return '#FF9800';  // Orange - Questionable
    return '#F44336';                   // Red - Poor
  };

  const getIntegrityScoreLabel = (score) => {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Questionable'; 
    return 'Poor';
  };

  const generateEnhancedPDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    
    // Header
    pdf.setFontSize(24);
    pdf.setFont(undefined, 'bold');
    pdf.text('Video Interview Proctoring Report', pageWidth/2, 30, { align: 'center' });
    
    // Candidate Information
    pdf.setFontSize(16);
    pdf.setFont(undefined, 'bold');
    pdf.text('Candidate Information', 20, 55);
    
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'normal');
    pdf.text(`Name: ${report.candidateName}`, 20, 70);
    pdf.text(`Date: ${new Date(report.startTime).toLocaleDateString()}`, 20, 80);
    pdf.text(`Start Time: ${new Date(report.startTime).toLocaleTimeString()}`, 20, 90);
    pdf.text(`Duration: ${report.duration} minutes`, 20, 100);
    
    // Integrity Score (Highlighted)
    pdf.setFontSize(18);
    pdf.setFont(undefined, 'bold');
    const scoreColor = getIntegrityScoreColor(report.integrityScore);
    pdf.setTextColor(scoreColor === '#4CAF50' ? 0 : scoreColor === '#FFC107' ? 255 : 244, 
                     scoreColor === '#4CAF50' ? 175 : scoreColor === '#FFC107' ? 193 : 67, 
                     scoreColor === '#4CAF50' ? 80 : scoreColor === '#FFC107' ? 7 : 54);
    pdf.text(`Integrity Score: ${report.integrityScore}/100 (${getIntegrityScoreLabel(report.integrityScore)})`, 20, 120);
    
    // Reset color to black
    pdf.setTextColor(0, 0, 0);
    
    // Event Summary
    pdf.setFontSize(16);
    pdf.setFont(undefined, 'bold');
    pdf.text('Violation Summary', 20, 145);
    
    pdf.setFontSize(12);
    pdf.setFont(undefined, 'normal');
    pdf.text(`Focus Lost Events: ${report.summary.focusLost}`, 30, 160);
    pdf.text(`No Face Detected: ${report.summary.noFaceDetected}`, 30, 170);
    pdf.text(`Suspicious Objects: ${report.summary.objectsDetected}`, 30, 180);
    pdf.text(`Multiple Faces: ${report.summary.multipleFaces}`, 30, 190);
    
    // Detailed Events (if space allows)
    if (report.events.length > 0) {
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      pdf.text('Detailed Event Log', 20, 215);
      
      let yPos = 225;
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      
      report.events.slice(0, 15).forEach((event, index) => {
        if (yPos > 270) { // Add new page if needed
          pdf.addPage();
          yPos = 30;
        }
        
        const time = new Date(event.timestamp).toLocaleTimeString();
        const text = `${time} - ${event.type}: ${event.description}`;
        pdf.text(text, 20, yPos);
        yPos += 8;
      });
    }
    
    // Footer
    pdf.setFontSize(8);
    pdf.setFont(undefined, 'italic');
    pdf.text('Generated by Video Interview Proctoring System', pageWidth/2, 285, { align: 'center' });
    pdf.text(`Report generated on: ${new Date().toLocaleString()}`, pageWidth/2, 290, { align: 'center' });
    
    pdf.save(`proctoring-report-${report.candidateName}-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  if (loading) return <div className="loading">Loading report...</div>;
  if (!report) return <div className="error">Report not found</div>;

  const chartData = [
    { name: 'Focus Lost', value: report.summary.focusLost, color: '#FF6B6B' },
    { name: 'No Face', value: report.summary.noFaceDetected, color: '#4ECDC4' },
    { name: 'Objects', value: report.summary.objectsDetected, color: '#45B7D1' },
    { name: 'Multiple Faces', value: report.summary.multipleFaces, color: '#FFA07A' }
  ];

  const pieData = chartData.filter(item => item.value > 0);

  return (
    <div className="proctor-report" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="report-header" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px',
        borderBottom: '2px solid #eee',
        paddingBottom: '20px'
      }}>
        <h2 style={{ color: '#333', margin: 0 }}>Video Interview Proctoring Report</h2>
        <button 
          onClick={generateEnhancedPDF} 
          className="pdf-btn"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          📄 Download PDF Report
        </button>
      </div>

      <div className="report-summary">
        <div className="summary-cards" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px',
          marginBottom: '30px' 
        }}>
          <div className="summary-card" style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #ddd'
          }}>
            <h3 style={{ color: '#333', marginBottom: '15px' }}>Candidate Information</h3>
            <p><strong>Name:</strong> {report.candidateName}</p>
            <p><strong>Date:</strong> {new Date(report.startTime).toLocaleDateString()}</p>
            <p><strong>Start Time:</strong> {new Date(report.startTime).toLocaleTimeString()}</p>
            <p><strong>Duration:</strong> {report.duration} minutes</p>
          </div>

          <div className="summary-card" style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #ddd',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#333', marginBottom: '15px' }}>Integrity Score</h3>
            <div className="score-display" style={{ marginBottom: '10px' }}>
              <span 
                className="score-number" 
                style={{ 
                  fontSize: '48px', 
                  fontWeight: 'bold',
                  color: getIntegrityScoreColor(report.integrityScore)
                }}
              >
                {report.integrityScore}
              </span>
              <span className="score-total" style={{ fontSize: '24px', color: '#666' }}>/100</span>
            </div>
            <div 
              className="score-status"
              style={{
                padding: '5px 15px',
                borderRadius: '20px',
                color: 'white',
                fontWeight: 'bold',
                backgroundColor: getIntegrityScoreColor(report.integrityScore)
              }}
            >
              {getIntegrityScoreLabel(report.integrityScore)}
            </div>
            
            {/* Score breakdown */}
            <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
              <div>Deductions based on:</div>
              <div>• Focus violations</div>
              <div>• Prohibited items</div>
              <div>• Multiple faces</div>
              <div>• Face visibility</div>
            </div>
          </div>
        </div>
      </div>

      {/* Violations Summary */}
      <div className="violations-summary" style={{ marginBottom: '30px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '15px' 
        }}>
          {chartData.map((item, index) => (
            <div 
              key={index}
              style={{
                background: 'white',
                padding: '15px',
                borderRadius: '8px',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                borderLeft: `4px solid ${item.color}`
              }}
            >
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: item.color }}>
                {item.value}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '20px',
        marginBottom: '30px' 
      }}>
        <div className="chart-container" style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3>Violation Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {pieData.length > 0 && (
          <div className="chart-container" style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h3>Violations Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, value}) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Detailed Events Table */}
      <div className="detailed-events" style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h3>Detailed Event Log</h3>
        <div className="events-table" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Time</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Type</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Description</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #dee2e6' }}>Severity</th>
              </tr>
            </thead>
            <tbody>
              {report.events.length > 0 ? report.events.map((event, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '12px' }}>
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </td>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>
                    {event.type.replace(/_/g, ' ')}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {event.description}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span 
                      className={`severity-badge severity-${event.severity}`}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor: 
                          event.severity === 'high' ? '#dc3545' :
                          event.severity === 'medium' ? '#ffc107' : '#28a745'
                      }}
                    >
                      {event.severity.toUpperCase()}
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" style={{ 
                    padding: '20px', 
                    textAlign: 'center', 
                    color: '#28a745',
                    fontWeight: 'bold'
                  }}>
                    No violations detected - Excellent conduct!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Footer */}
      <div className="report-footer" style={{ 
        marginTop: '30px', 
        padding: '20px',
        background: '#f8f9fa',
        borderRadius: '10px',
        fontSize: '12px',
        color: '#6c757d'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div>
            <strong>Report Generated:</strong> {new Date().toLocaleString()}
          </div>
          <div>
            <strong>System Version:</strong> Tutedude Proctoring v1.0
          </div>
        </div>
        <div style={{ marginTop: '10px' }}>
          <strong>Integrity Score Calculation:</strong> Base score of 100 with deductions for violations. 
          High severity: -15 to -25 points, Medium: -5 to -10 points, with additional penalties for repeated violations.
        </div>
      </div>
    </div>
  );
};

export default ProctorReport;