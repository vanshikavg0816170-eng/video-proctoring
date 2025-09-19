// // // // // import React, { useRef, useEffect, useState } from 'react';
// // // // // import { detectFace, initializeFaceDetection } from '../utils/faceDetection';
// // // // // import { detectObjects, initializeObjectDetection } from '../utils/objectDetection';

// // // // // const VideoInterface = ({ onEvent, isActive, interviewId }) => {
// // // // //   const videoRef = useRef(null);
// // // // //   const canvasRef = useRef(null);
// // // // //   const mediaRecorderRef = useRef(null);
// // // // //   const streamRef = useRef(null);

// // // // //   const [isRecording, setIsRecording] = useState(false);
// // // // //   const [detectionStats, setDetectionStats] = useState({
// // // // //     focusLost: 0,
// // // // //     noFaceDetected: 0,
// // // // //     objectsDetected: 0,
// // // // //     multipleFaces: 0
// // // // //   });

// // // // //   // Tracking states
// // // // //   const [focusLostTime, setFocusLostTime] = useState(0);
// // // // //   const [noFaceTime, setNoFaceTime] = useState(0);
// // // // //   const lastFocusCheck = useRef(Date.now());
// // // // //   const lastNoFaceCheck = useRef(Date.now());

// // // // //   useEffect(() => {
// // // // //     if (isActive) {
// // // // //       startCamera();
// // // // //       initializeDetection();
// // // // //     }

// // // // //     return () => {
// // // // //       stopCamera();
// // // // //     };
// // // // //   }, [isActive]);

// // // // //   const startCamera = async () => {
// // // // //     try {
// // // // //       const stream = await navigator.mediaDevices.getUserMedia({
// // // // //         video: { width: 640, height: 480 },
// // // // //         audio: true
// // // // //       });

// // // // //       streamRef.current = stream;
// // // // //       videoRef.current.srcObject = stream;

// // // // //       // Start recording
// // // // //       startRecording(stream);

// // // // //       // Start detection loop
// // // // //       startDetectionLoop();

// // // // //     } catch (error) {
// // // // //       console.error('Error accessing camera:', error);
// // // // //       onEvent({
// // // // //         type: 'CAMERA_ERROR',
// // // // //         description: 'Failed to access camera',
// // // // //         severity: 'high'
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   const startRecording = (stream) => {
// // // // //     const mediaRecorder = new MediaRecorder(stream);
// // // // //     const chunks = [];

// // // // //     mediaRecorder.ondataavailable = (event) => {
// // // // //       chunks.push(event.data);
// // // // //     };

// // // // //     mediaRecorder.onstop = () => {
// // // // //       const blob = new Blob(chunks, { type: 'video/webm' });
// // // // //       // Here you would upload the video to your server
// // // // //       console.log('Recording stopped, video blob:', blob);
// // // // //     };

// // // // //     mediaRecorderRef.current = mediaRecorder;
// // // // //     mediaRecorder.start();
// // // // //     setIsRecording(true);
// // // // //   };

// // // // //   const initializeDetection = async () => {
// // // // //     await initializeFaceDetection();
// // // // //     await initializeObjectDetection();
// // // // //   };

// // // // //   const startDetectionLoop = () => {
// // // // //     const detectFrame = async () => {
// // // // //       if (!isActive || !videoRef.current) return;

// // // // //       const canvas = canvasRef.current;
// // // // //       const ctx = canvas.getContext('2d');

// // // // //       // Draw current frame
// // // // //       ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

// // // // //       try {
// // // // //         // Face detection
// // // // //         const faceResult = await detectFace(canvas);
// // // // //         await handleFaceDetection(faceResult);

// // // // //         // Object detection
// // // // //         const objectResult = await detectObjects(canvas);
// // // // //         await handleObjectDetection(objectResult);

// // // // //       } catch (error) {
// // // // //         console.error('Detection error:', error);
// // // // //       }

// // // // //       // Continue loop
// // // // //       if (isActive) {
// // // // //         requestAnimationFrame(detectFrame);
// // // // //       }
// // // // //     };

// // // // //     detectFrame();
// // // // //   };
// // // // // const handleFaceDetection = async (result) => {
// // // // //   console.log('Face detection result:', result); // Debug

// // // // //   // Debounce to prevent spam (max once per 3 seconds)
// // // // //   const now = Date.now();

// // // // //   if (result.faceCount === 0) {
// // // // //     if (!this.lastNoFaceAlert || now - this.lastNoFaceAlert > 3000) {
// // // // //       onEvent({
// // // // //         type: 'NO_FACE_DETECTED',
// // // // //         description: 'No person detected in frame',
// // // // //         severity: 'high'
// // // // //       });

// // // // //       setDetectionStats(prev => ({
// // // // //         ...prev,
// // // // //         noFaceDetected: prev.noFaceDetected + 1
// // // // //       }));

// // // // //       this.lastNoFaceAlert = now;
// // // // //     }
// // // // //   }

// // // // //   if (result.faceCount > 1) {
// // // // //     if (!this.lastMultipleFaceAlert || now - this.lastMultipleFaceAlert > 3000) {
// // // // //       onEvent({
// // // // //         type: 'MULTIPLE_FACES',
// // // // //         description: `${result.faceCount} people detected in frame`,
// // // // //         severity: 'high'
// // // // //       });

// // // // //       setDetectionStats(prev => ({
// // // // //         ...prev,
// // // // //         multipleFaces: prev.multipleFaces + 1
// // // // //       }));

// // // // //       this.lastMultipleFaceAlert = now;
// // // // //     }
// // // // //   }

// // // // //   // Reset counters when face is properly detected
// // // // //   if (result.faceCount === 1) {
// // // // //     this.lastNoFaceAlert = null;
// // // // //     this.lastMultipleFaceAlert = null;
// // // // //   }
// // // // // };

// // // // //   // const handleFaceDetection = async (result) => {
// // // // //   //   const now = Date.now();

// // // // //   //   if (result.faceCount === 0) {
// // // // //   //     const timeDiff = now - lastNoFaceCheck.current;
// // // // //   //     setNoFaceTime(prev => prev + timeDiff);

// // // // //   //     if (noFaceTime > 10000) { // 10 seconds
// // // // //   //       onEvent({
// // // // //   //         type: 'NO_FACE_DETECTED',
// // // // //   //         description: 'No face detected for more than 10 seconds',
// // // // //   //         severity: 'high'
// // // // //   //       });

// // // // //   //       setDetectionStats(prev => ({
// // // // //   //         ...prev,
// // // // //   //         noFaceDetected: prev.noFaceDetected + 1
// // // // //   //       }));

// // // // //   //       setNoFaceTime(0);
// // // // //   //     }
// // // // //   //   } else {
// // // // //   //     setNoFaceTime(0);
// // // // //   //     lastNoFaceCheck.current = now;
// // // // //   //   }

// // // // //   //   if (result.faceCount > 1) {
// // // // //   //     onEvent({
// // // // //   //       type: 'MULTIPLE_FACES',
// // // // //   //       description: `${result.faceCount} faces detected in frame`,
// // // // //   //       severity: 'high'
// // // // //   //     });

// // // // //   //     setDetectionStats(prev => ({
// // // // //   //       ...prev,
// // // // //   //       multipleFaces: prev.multipleFaces + 1
// // // // //   //     }));
// // // // //   //   }

// // // // //   //   if (!result.isFocused) {
// // // // //   //     const timeDiff = now - lastFocusCheck.current;
// // // // //   //     setFocusLostTime(prev => prev + timeDiff);

// // // // //   //     if (focusLostTime > 5000) { // 5 seconds
// // // // //   //       onEvent({
// // // // //   //         type: 'FOCUS_LOST',
// // // // //   //         description: 'Candidate not looking at screen for more than 5 seconds',
// // // // //   //         severity: 'medium'
// // // // //   //       });

// // // // //   //       setDetectionStats(prev => ({
// // // // //   //         ...prev,
// // // // //   //         focusLost: prev.focusLost + 1
// // // // //   //       }));

// // // // //   //       setFocusLostTime(0);
// // // // //   //     }
// // // // //   //   } else {
// // // // //   //     setFocusLostTime(0);
// // // // //   //     lastFocusCheck.current = now;
// // // // //   //   }
// // // // //   // };
// // // // //   const handleObjectDetection = async (objects) => {
// // // // //   // Count detected persons as faces
// // // // //   const detectedPersons = objects.filter(obj => 
// // // // //     obj.class === 'person' && obj.score > 0.3
// // // // //   );

// // // // //   console.log('Detected persons:', detectedPersons.length); // Debug

// // // // //   // Create fake face result for handleFaceDetection
// // // // //   const fakeResult = {
// // // // //     faceCount: detectedPersons.length,
// // // // //     isFocused: detectedPersons.length === 1, // Assume focused if 1 person
// // // // //     faces: detectedPersons
// // // // //   };

// // // // //   // Call face detection handler with object detection results
// // // // //   await handleFaceDetection(fakeResult);

// // // // //   // Handle suspicious objects (excluding persons)
// // // // //   const suspiciousObjects = objects.filter(obj => 
// // // // //     ['cell phone', 'book', 'laptop', 'tv', 'remote', 'keyboard', 'mouse'].includes(obj.class) &&
// // // // //     obj.score > 0.5
// // // // //   );

// // // // //   suspiciousObjects.forEach(obj => {
// // // // //     onEvent({
// // // // //       type: 'SUSPICIOUS_OBJECT',
// // // // //       description: `${obj.class} detected with ${Math.round(obj.score * 100)}% confidence`,
// // // // //       severity: obj.class === 'cell phone' ? 'high' : 'medium'
// // // // //     });

// // // // //     setDetectionStats(prev => ({
// // // // //       ...prev,
// // // // //       objectsDetected: prev.objectsDetected + 1
// // // // //     }));
// // // // //   });
// // // // // };

// // // // // // const handleObjectDetection = async (objects) => {
// // // // // //   const suspiciousObjects = objects.filter(obj => 
// // // // // //     ['cell phone', 'book', 'laptop', 'tv', 'remote', 'keyboard', 'mouse'].includes(obj.class)
// // // // // //   );

// // // // // //   // ADD THIS: Count detected persons as faces
// // // // // //   const detectedPersons = objects.filter(obj => obj.class === 'person' && obj.score > 0.5);

// // // // // //   if (detectedPersons.length > 1) {
// // // // // //     onEvent({
// // // // // //       type: 'MULTIPLE_FACES',
// // // // // //       description: `${detectedPersons.length} people detected in frame`,
// // // // // //       severity: 'high'
// // // // // //     });

// // // // // //     setDetectionStats(prev => ({
// // // // // //       ...prev,
// // // // // //       multipleFaces: prev.multipleFaces + 1
// // // // // //     }));
// // // // // //   }

// // // // // //   // Handle no face detection
// // // // // //   if (detectedPersons.length === 0) {
// // // // // //     onEvent({
// // // // // //       type: 'NO_FACE_DETECTED',
// // // // // //       description: 'No person detected in frame',
// // // // // //       severity: 'high'
// // // // // //     });

// // // // // //     setDetectionStats(prev => ({
// // // // // //       ...prev,
// // // // // //       noFaceDetected: prev.noFaceDetected + 1
// // // // // //     }));
// // // // // //   }

// // // // // //   // Existing suspicious object logic
// // // // // //   suspiciousObjects.forEach(obj => {
// // // // // //     if (obj.class !== 'person') { // Don't count persons as suspicious
// // // // // //       onEvent({
// // // // // //         type: 'SUSPICIOUS_OBJECT',
// // // // // //         description: `${obj.class} detected with ${Math.round(obj.score * 100)}% confidence`,
// // // // // //         severity: obj.class === 'cell phone' ? 'high' : 'medium'
// // // // // //       });

// // // // // //       setDetectionStats(prev => ({
// // // // // //         ...prev,
// // // // // //         objectsDetected: prev.objectsDetected + 1
// // // // // //       }));
// // // // // //     }
// // // // // //   });
// // // // // // };

// // // // //   // const handleObjectDetection = async (objects) => {
// // // // //   //   const suspiciousObjects = objects.filter(obj => 
// // // // //   //     ['cell phone', 'book', 'laptop', 'person'].includes(obj.class)
// // // // //   //   );

// // // // //   //   suspiciousObjects.forEach(obj => {
// // // // //   //     onEvent({
// // // // //   //       type: 'SUSPICIOUS_OBJECT',
// // // // //   //       description: `${obj.class} detected with ${Math.round(obj.score * 100)}% confidence`,
// // // // //   //       severity: obj.class === 'cell phone' ? 'high' : 'medium'
// // // // //   //     });

// // // // //   //     setDetectionStats(prev => ({
// // // // //   //       ...prev,
// // // // //   //       objectsDetected: prev.objectsDetected + 1
// // // // //   //     }));
// // // // //   //   });
// // // // //   // };

// // // // //   const stopCamera = () => {
// // // // //     if (streamRef.current) {
// // // // //       streamRef.current.getTracks().forEach(track => track.stop());
// // // // //     }

// // // // //     if (mediaRecorderRef.current && isRecording) {
// // // // //       mediaRecorderRef.current.stop();
// // // // //       setIsRecording(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="video-interface">
// // // // //       <div className="video-container">
// // // // //         <video
// // // // //           ref={videoRef}
// // // // //           autoPlay
// // // // //           muted
// // // // //           playsInline
// // // // //           className="candidate-video"
// // // // //         />
// // // // //         <canvas
// // // // //           ref={canvasRef}
// // // // //           width="640"
// // // // //           height="480"
// // // // //           style={{ display: 'none' }}
// // // // //         />

// // // // //         <div className="video-overlay">
// // // // //           <div className="recording-indicator">
// // // // //             {isRecording && <span className="rec-dot">●</span>}
// // // // //             {isRecording ? 'Recording' : 'Not Recording'}
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="detection-stats">
// // // // //         <h3>Detection Statistics</h3>
// // // // //         <div className="stats-grid">
// // // // //           <div className="stat-item">
// // // // //             <span className="stat-label">Focus Lost:</span>
// // // // //             <span className="stat-value">{detectionStats.focusLost}</span>
// // // // //           </div>
// // // // //           <div className="stat-item">
// // // // //             <span className="stat-label">No Face:</span>
// // // // //             <span className="stat-value">{detectionStats.noFaceDetected}</span>
// // // // //           </div>
// // // // //           <div className="stat-item">
// // // // //             <span className="stat-label">Objects:</span>
// // // // //             <span className="stat-value">{detectionStats.objectsDetected}</span>
// // // // //           </div>
// // // // //           <div className="stat-item">
// // // // //             <span className="stat-label">Multiple Faces:</span>
// // // // //             <span className="stat-value">{detectionStats.multipleFaces}</span>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default VideoInterface;
// // // // import React, { useRef, useEffect, useState } from 'react';
// // // // import { detectFace, initializeFaceDetection } from '../utils/faceDetection';
// // // // import { detectObjects, initializeObjectDetection } from '../utils/objectDetection';

// // // // const VideoInterface = ({ onEvent, isActive, interviewId }) => {
// // // //   const videoRef = useRef(null);
// // // //   const canvasRef = useRef(null);
// // // //   const mediaRecorderRef = useRef(null);
// // // //   const streamRef = useRef(null);

// // // //   // FIX: Use useRef for persistent values in functional components
// // // //   const lastNoFaceAlert = useRef(null);
// // // //   const lastMultipleFaceAlert = useRef(null);
// // // //   const lastObjectAlert = useRef(null);

// // // //   const [isRecording, setIsRecording] = useState(false);
// // // //   const [detectionStats, setDetectionStats] = useState({
// // // //     focusLost: 0,
// // // //     noFaceDetected: 0,
// // // //     objectsDetected: 0,
// // // //     multipleFaces: 0
// // // //   });

// // // //   useEffect(() => {
// // // //     if (isActive) {
// // // //       startCamera();
// // // //       initializeDetection();
// // // //     }

// // // //     return () => {
// // // //       stopCamera();
// // // //     };
// // // //   }, [isActive]);

// // // //   const startCamera = async () => {
// // // //     try {
// // // //       const stream = await navigator.mediaDevices.getUserMedia({
// // // //         video: { width: 640, height: 480 },
// // // //         audio: true
// // // //       });

// // // //       streamRef.current = stream;
// // // //       videoRef.current.srcObject = stream;

// // // //       startRecording(stream);
// // // //       startDetectionLoop();

// // // //     } catch (error) {
// // // //       console.error('Error accessing camera:', error);
// // // //       onEvent({
// // // //         type: 'CAMERA_ERROR',
// // // //         description: 'Failed to access camera',
// // // //         severity: 'high'
// // // //       });
// // // //     }
// // // //   };

// // // //   const startRecording = (stream) => {
// // // //     const mediaRecorder = new MediaRecorder(stream);
// // // //     const chunks = [];

// // // //     mediaRecorder.ondataavailable = (event) => {
// // // //       chunks.push(event.data);
// // // //     };

// // // //     mediaRecorder.onstop = () => {
// // // //       const blob = new Blob(chunks, { type: 'video/webm' });
// // // //       console.log('Recording stopped, video blob:', blob);
// // // //     };

// // // //     mediaRecorderRef.current = mediaRecorder;
// // // //     mediaRecorder.start();
// // // //     setIsRecording(true);
// // // //   };

// // // //   const initializeDetection = async () => {
// // // //     await initializeFaceDetection();
// // // //     await initializeObjectDetection();
// // // //   };

// // // //   const startDetectionLoop = () => {
// // // //     const detectFrame = async () => {
// // // //       if (!isActive || !videoRef.current) return;

// // // //       const canvas = canvasRef.current;
// // // //       const ctx = canvas.getContext('2d');

// // // //       ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

// // // //       try {
// // // //         // Run both detections separately
// // // //         const objectResult = await detectObjects(canvas);
// // // //         await handleObjectDetection(objectResult);

// // // //       } catch (error) {
// // // //         console.error('Detection error:', error);
// // // //       }

// // // //       if (isActive) {
// // // //         requestAnimationFrame(detectFrame);
// // // //       }
// // // //     };

// // // //     detectFrame();
// // // //   };

// // // //   // FIXED: Use object detection to determine face count and handle all events
// // // //   const handleObjectDetection = async (objects) => {
// // // //     const now = Date.now();
// // // //     console.log('All detected objects:', objects); // Debug log

// // // //     // Count detected persons as faces
// // // //     const detectedPersons = objects.filter(obj =>
// // // //       obj.class === 'person' && obj.score > 0.3
// // // //     );

// // // //     console.log('Detected persons:', detectedPersons.length); // Debug log

// // // //     // Handle NO FACE detection - immediate response with debouncing
// // // //     if (detectedPersons.length === 0) {
// // // //       if (!lastNoFaceAlert.current || now - lastNoFaceAlert.current > 2000) {
// // // //         console.log('Triggering NO_FACE_DETECTED event'); // Debug

// // // //         onEvent({
// // // //           type: 'NO_FACE_DETECTED',
// // // //           description: 'No person detected in frame',
// // // //           severity: 'high'
// // // //         });

// // // //         setDetectionStats(prev => ({
// // // //           ...prev,
// // // //           noFaceDetected: prev.noFaceDetected + 1
// // // //         }));

// // // //         lastNoFaceAlert.current = now;
// // // //       }
// // // //     } else {
// // // //       lastNoFaceAlert.current = null; // Reset when face detected
// // // //     }

// // // //     // Handle MULTIPLE FACES detection
// // // //     if (detectedPersons.length > 1) {
// // // //       if (!lastMultipleFaceAlert.current || now - lastMultipleFaceAlert.current > 2000) {
// // // //         console.log('Triggering MULTIPLE_FACES event'); // Debug

// // // //         onEvent({
// // // //           type: 'MULTIPLE_FACES',
// // // //           description: `${detectedPersons.length} people detected in frame`,
// // // //           severity: 'high'
// // // //         });

// // // //         setDetectionStats(prev => ({
// // // //           ...prev,
// // // //           multipleFaces: prev.multipleFaces + 1
// // // //         }));

// // // //         lastMultipleFaceAlert.current = now;
// // // //       }
// // // //     } else {
// // // //       lastMultipleFaceAlert.current = null; // Reset when single face
// // // //     }

// // // //     // Handle SUSPICIOUS OBJECTS
// // // //     const suspiciousObjects = objects.filter(obj =>
// // // //       ['cell phone', 'book', 'laptop', 'tv', 'remote', 'keyboard', 'mouse'].includes(obj.class) &&
// // // //       obj.score > 0.5
// // // //     );

// // // //     if (suspiciousObjects.length > 0) {
// // // //       if (!lastObjectAlert.current || now - lastObjectAlert.current > 2000) {
// // // //         suspiciousObjects.forEach(obj => {
// // // //           console.log('Triggering SUSPICIOUS_OBJECT event:', obj.class); // Debug

// // // //           onEvent({
// // // //             type: 'SUSPICIOUS_OBJECT',
// // // //             description: `${obj.class} detected with ${Math.round(obj.score * 100)}% confidence`,
// // // //             severity: obj.class === 'cell phone' ? 'high' : 'medium'
// // // //           });

// // // //           setDetectionStats(prev => ({
// // // //             ...prev,
// // // //             objectsDetected: prev.objectsDetected + 1
// // // //           }));
// // // //         });

// // // //         lastObjectAlert.current = now;
// // // //       }
// // // //     } else {
// // // //       lastObjectAlert.current = null; // Reset when no suspicious objects
// // // //     }
// // // //   };

// // // //   const stopCamera = () => {
// // // //     if (streamRef.current) {
// // // //       streamRef.current.getTracks().forEach(track => track.stop());
// // // //     }

// // // //     if (mediaRecorderRef.current && isRecording) {
// // // //       mediaRecorderRef.current.stop();
// // // //       setIsRecording(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="video-interface">
// // // //       <div className="video-container">
// // // //         <video
// // // //           ref={videoRef}
// // // //           autoPlay
// // // //           muted
// // // //           playsInline
// // // //           className="candidate-video"
// // // //         />
// // // //         <canvas
// // // //           ref={canvasRef}
// // // //           width="640"
// // // //           height="480"
// // // //           style={{ display: 'none' }}
// // // //         />

// // // //         <div className="video-overlay">
// // // //           <div className="recording-indicator">
// // // //             {isRecording && <span className="rec-dot">●</span>}
// // // //             {isRecording ? 'Recording' : 'Not Recording'}
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <div className="detection-stats">
// // // //         <h3>Detection Statistics</h3>
// // // //         <div className="stats-grid">
// // // //           <div className="stat-item">
// // // //             <span className="stat-label">Focus Lost:</span>
// // // //             <span className="stat-value">{detectionStats.focusLost}</span>
// // // //           </div>
// // // //           <div className="stat-item">
// // // //             <span className="stat-label">No Face:</span>
// // // //             <span className="stat-value">{detectionStats.noFaceDetected}</span>
// // // //           </div>
// // // //           <div className="stat-item">
// // // //             <span className="stat-label">Objects:</span>
// // // //             <span className="stat-value">{detectionStats.objectsDetected}</span>
// // // //           </div>
// // // //           <div className="stat-item">
// // // //             <span className="stat-label">Multiple Faces:</span>
// // // //             <span className="stat-value">{detectionStats.multipleFaces}</span>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default VideoInterface;
// // // // Fixed VideoInterface.js - Updated detection logic
// // import React, { useRef, useEffect, useState } from 'react';
// // import { detectFace, initializeFaceDetection } from '../utils/faceDetection';
// // import { detectObjects, initializeObjectDetection } from '../utils/objectDetection';

// // const VideoInterface = ({ onEvent, isActive, interviewId }) => {
// //   const videoRef = useRef(null);
// //   const canvasRef = useRef(null);
// //   const mediaRecorderRef = useRef(null);
// //   const streamRef = useRef(null);

// //   // Alert debouncing
// //   const lastNoFaceAlert = useRef(null);
// //   const lastMultipleFaceAlert = useRef(null);
// //   const lastObjectAlert = useRef(null);

// //   const [isRecording, setIsRecording] = useState(false);
// //   const [detectionStats, setDetectionStats] = useState({
// //     focusLost: 0,
// //     noFaceDetected: 0,
// //     objectsDetected: 0,
// //     multipleFaces: 0
// //   });

// //   useEffect(() => {
// //     if (isActive) {
// //       startCamera();
// //       initializeDetection();
// //     }
// //     return () => stopCamera();
// //   }, [isActive]);

// //   const startCamera = async () => {
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({
// //         video: { width: 640, height: 480 },
// //         audio: true
// //       });

// //       streamRef.current = stream;
// //       videoRef.current.srcObject = stream;

// //       // Wait for video to be ready
// //       videoRef.current.onloadedmetadata = () => {
// //         startRecording(stream);
// //         startDetectionLoop();
// //       };

// //     } catch (error) {
// //       console.error('Error accessing camera:', error);
// //       onEvent({
// //         type: 'CAMERA_ERROR',
// //         description: 'Failed to access camera',
// //         severity: 'high'
// //       });
// //     }
// //   };

// //   const startRecording = (stream) => {
// //     const mediaRecorder = new MediaRecorder(stream);
// //     const chunks = [];

// //     mediaRecorder.ondataavailable = (event) => chunks.push(event.data);
// //     mediaRecorder.onstop = () => {
// //       const blob = new Blob(chunks, { type: 'video/webm' });
// //       console.log('Recording stopped, video blob:', blob);
// //     };

// //     mediaRecorderRef.current = mediaRecorder;
// //     mediaRecorder.start();
// //     setIsRecording(true);
// //   };

// //   const initializeDetection = async () => {
// //     await Promise.all([
// //       initializeFaceDetection(),
// //       initializeObjectDetection()
// //     ]);
// //   };

// //   const startDetectionLoop = () => {
// //     const detectFrame = async () => {
// //       if (!isActive || !videoRef.current || videoRef.current.readyState !== 4) {
// //         if (isActive) requestAnimationFrame(detectFrame);
// //         return;
// //       }

// //       const canvas = canvasRef.current;
// //       const ctx = canvas.getContext('2d');

// //       // Ensure canvas matches video dimensions
// //       canvas.width = videoRef.current.videoWidth || 640;
// //       canvas.height = videoRef.current.videoHeight || 480;

// //       // Draw current video frame to canvas
// //       ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

// //       try {
// //         // Combined detection approach
// //         await Promise.all([
// //           handleFaceDetection(),
// //           handleObjectDetection()
// //         ]);

// //       } catch (error) {
// //         console.error('Detection error:', error);
// //       }

// //       if (isActive) {
// //         requestAnimationFrame(detectFrame);
// //       }
// //     };

// //     detectFrame();
// //   };

// //   const handleFaceDetection = async () => {
// //     try {
// //       const canvas = canvasRef.current;
// //       const faceResult = await detectFace(canvas);
// //       const now = Date.now();

// //       console.log('Face detection result:', faceResult);

// //       // Handle NO FACE detection
// //       if (faceResult.faceCount === 0) {
// //         if (!lastNoFaceAlert.current || now - lastNoFaceAlert.current > 3000) {
// //           console.log('Triggering NO_FACE_DETECTED event');

// //           onEvent({
// //             type: 'NO_FACE_DETECTED',
// //             description: 'No person detected in frame',
// //             severity: 'high'
// //           });

// //           setDetectionStats(prev => ({
// //             ...prev,
// //             noFaceDetected: prev.noFaceDetected + 1
// //           }));

// //           lastNoFaceAlert.current = now;
// //         }
// //       } else {
// //         lastNoFaceAlert.current = null;
// //       }

// //       // Handle MULTIPLE FACES detection
// //       if (faceResult.faceCount > 1) {
// //         if (!lastMultipleFaceAlert.current || now - lastMultipleFaceAlert.current > 3000) {
// //           console.log('Triggering MULTIPLE_FACES event');

// //           onEvent({
// //             type: 'MULTIPLE_FACES',
// //             description: `${faceResult.faceCount} people detected in frame`,
// //             severity: 'high'
// //           });

// //           setDetectionStats(prev => ({
// //             ...prev,
// //             multipleFaces: prev.multipleFaces + 1
// //           }));

// //           lastMultipleFaceAlert.current = now;
// //         }
// //       } else {
// //         lastMultipleFaceAlert.current = null;
// //       }

// //     } catch (error) {
// //       console.error('Face detection error:', error);
// //     }
// //   };

// //   const handleObjectDetection = async () => {
// //     try {
// //       const canvas = canvasRef.current;
// //       const objects = await detectObjects(canvas);
// //       const now = Date.now();

// //       // Filter suspicious objects (excluding persons)
// //       const suspiciousObjects = objects.filter(obj =>
// //         ['cell phone', 'book', 'laptop', 'tv', 'remote', 'keyboard', 'mouse'].includes(obj.class) &&
// //         obj.score > 0.5
// //       );

// //       if (suspiciousObjects.length > 0) {
// //         if (!lastObjectAlert.current || now - lastObjectAlert.current > 3000) {
// //           suspiciousObjects.forEach(obj => {
// //             console.log('Triggering SUSPICIOUS_OBJECT event:', obj.class);

// //             onEvent({
// //               type: 'SUSPICIOUS_OBJECT',
// //               description: `${obj.class} detected with ${Math.round(obj.score * 100)}% confidence`,
// //               severity: obj.class === 'cell phone' ? 'high' : 'medium'
// //             });

// //             setDetectionStats(prev => ({
// //               ...prev,
// //               objectsDetected: prev.objectsDetected + 1
// //             }));
// //           });

// //           lastObjectAlert.current = now;
// //         }
// //       } else {
// //         lastObjectAlert.current = null;
// //       }

// //     } catch (error) {
// //       console.error('Object detection error:', error);
// //     }
// //   };

// //   const stopCamera = () => {
// //     if (streamRef.current) {
// //       streamRef.current.getTracks().forEach(track => track.stop());
// //     }
// //     if (mediaRecorderRef.current && isRecording) {
// //       mediaRecorderRef.current.stop();
// //       setIsRecording(false);
// //     }
// //   };

// //   return (
// //     <div className="video-interface">
// //       <div className="video-container">
// //         <video
// //           ref={videoRef}
// //           autoPlay
// //           muted
// //           playsInline
// //           className="candidate-video"
// //         />
// //         <canvas
// //           ref={canvasRef}
// //           width="640"
// //           height="480"
// //           style={{ display: 'none' }}
// //         />

// //         <div className="video-overlay">
// //           <div className="recording-indicator">
// //             {isRecording && <span className="rec-dot">●</span>}
// //             {isRecording ? 'Recording' : 'Not Recording'}
// //           </div>
// //         </div>
// //       </div>

// //       <div className="detection-stats">
// //         <h3>Detection Statistics</h3>
// //         <div className="stats-grid">
// //           <div className="stat-item">
// //             <span className="stat-label">Focus Lost:</span>
// //             <span className="stat-value">{detectionStats.focusLost}</span>
// //           </div>
// //           <div className="stat-item">
// //             <span className="stat-label">No Face:</span>
// //             <span className="stat-value">{detectionStats.noFaceDetected}</span>
// //           </div>
// //           <div className="stat-item">
// //             <span className="stat-label">Objects:</span>
// //             <span className="stat-value">{detectionStats.objectsDetected}</span>
// //           </div>
// //           <div className="stat-item">
// //             <span className="stat-label">Multiple Faces:</span>
// //             <span className="stat-value">{detectionStats.multipleFaces}</span>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default VideoInterface;

// // export const initializeFaceDetection = async () => {
// //   if (faceDetectionModel || modelLoading) return;

// //   try {
// //     modelLoading = true;
// //     await tf.ready();

// //     // Try multiple model loading approaches
// //     try {
// //       const blazeface = await import('@tensorflow-models/blazeface');
// //       faceDetectionModel = await blazeface.load();
// //       console.log('BlazeFace loaded successfully');
// //     } catch (blazeError) {
// //       console.warn('BlazeFace failed, trying alternative:', blazeError);
// //       // Fallback to a simpler detection method
// //       faceDetectionModel = 'fallback';
// //     }

// //     modelLoading = false;
// //   } catch (error) {
// //     console.error('Error loading face detection:', error);
// //     modelLoading = false;
// //     faceDetectionModel = 'fallback';
// //   }
// // };

// // export const detectFace = async (canvas) => {
// //   try {
// //     // Ensure model is loaded
// //     if (!faceDetectionModel && !modelLoading) {
// //       await initializeFaceDetection();
// //     }

// //     // Wait for model loading to complete
// //     while (modelLoading) {
// //       await new Promise(resolve => setTimeout(resolve, 100));
// //     }

// //     // Fallback detection if model failed to load
// //     if (faceDetectionModel === 'fallback') {
// //       return await fallbackFaceDetection(canvas);
// //     }

// //     if (!faceDetectionModel) {
// //       console.warn('No face detection model available, using fallback');
// //       return await fallbackFaceDetection(canvas);
// //     }

// //     // Ensure canvas has valid content
// //     const ctx = canvas.getContext('2d');
// //     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

// //     // Check if canvas has actual content (not just black/empty)
// //     const hasContent = checkCanvasContent(imageData);
// //     if (!hasContent) {
// //       console.log('Canvas appears empty or black');
// //       return { faceCount: 0, isFocused: false, faces: [] };
// //     }

// //     // Convert canvas to tensor with error handling
// //     let tensor;
// //     try {
// //       tensor = tf.browser.fromPixels(canvas);
// //     } catch (tensorError) {
// //       console.error('Error creating tensor from canvas:', tensorError);
// //       return await fallbackFaceDetection(canvas);
// //     }

// //     // Perform face detection with lower threshold
// //     let predictions;
// //     try {
// //       predictions = await faceDetectionModel.estimateFaces(tensor, false);
// //     } catch (detectionError) {
// //       console.error('Face detection failed:', detectionError);
// //       tensor.dispose();
// //       return await fallbackFaceDetection(canvas);
// //     }

// //     // Clean up tensor immediately
// //     tensor.dispose();

// //     // Process results with lower confidence threshold
// //     const validFaces = predictions.filter(pred => {
// //       const confidence = pred.probability ? pred.probability[0] : 0;
// //       const hasValidBounds = pred.topLeft && pred.bottomRight;

// //       console.log('Face detected with confidence:', confidence);

// //       return confidence > 0.3 && hasValidBounds; // Lowered threshold
// //     });

// //     const result = {
// //       faceCount: validFaces.length,
// //       isFocused: validFaces.length === 1,
// //       faces: validFaces.map(face => ({
// //         x: face.topLeft[0],
// //         y: face.topLeft[1],
// //         width: face.bottomRight[0] - face.topLeft[0],
// //         height: face.bottomRight[1] - face.topLeft[1],
// //         confidence: face.probability[0]
// //       }))
// //     };

// //     console.log('Face detection result:', result);
// //     return result;

// //   } catch (error) {
// //     console.error('Face detection error:', error);
// //     return await fallbackFaceDetection(canvas);
// //   }
// // };

// // // Fallback detection using basic image analysis
// // const fallbackFaceDetection = async (canvas) => {
// //   try {
// //     const ctx = canvas.getContext('2d');
// //     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

// //     // Simple heuristic: look for skin-tone colors and face-like patterns
// //     const skinToneDetected = detectSkinTones(imageData);
// //     const hasMovement = checkForMovement(imageData);

// //     // If we detect skin tones or movement, assume there's a person
// //     if (skinToneDetected || hasMovement) {
// //       console.log('Fallback detection: Person detected via heuristics');
// //       return {
// //         faceCount: 1,
// //         isFocused: true,
// //         faces: [{
// //           x: canvas.width * 0.25,
// //           y: canvas.height * 0.25,
// //           width: canvas.width * 0.5,
// //           height: canvas.height * 0.5,
// //           confidence: 0.7
// //         }]
// //       };
// //     }

// //     return { faceCount: 0, isFocused: false, faces: [] };
// //   } catch (error) {
// //     console.error('Fallback detection error:', error);
// //     return { faceCount: 0, isFocused: false, faces: [] };
// //   }
// // };

// // // Check if canvas has meaningful content
// // const checkCanvasContent = (imageData) => {
// //   const data = imageData.data;
// //   let nonBlackPixels = 0;
// //   const totalPixels = data.length / 4;

// //   for (let i = 0; i < data.length; i += 4) {
// //     const r = data[i];
// //     const g = data[i + 1];
// //     const b = data[i + 2];

// //     // Count non-black pixels
// //     if (r > 10 || g > 10 || b > 10) {
// //       nonBlackPixels++;
// //     }
// //   }

// //   const contentRatio = nonBlackPixels / totalPixels;
// //   return contentRatio > 0.1; // At least 10% non-black content
// // };

// // // Simple skin tone detection
// // const detectSkinTones = (imageData) => {
// //   const data = imageData.data;
// //   let skinPixels = 0;
// //   const totalPixels = data.length / 4;

// //   for (let i = 0; i < data.length; i += 4) {
// //     const r = data[i];
// //     const g = data[i + 1];
// //     const b = data[i + 2];

// //     // Simple skin tone heuristic
// //     if (r > 95 && g > 40 && b > 20 &&
// //       Math.max(r, g, b) - Math.min(r, g, b) > 15 &&
// //       Math.abs(r - g) > 15 && r > g && r > b) {
// //       skinPixels++;
// //     }
// //   }

// //   const skinRatio = skinPixels / totalPixels;
// //   return skinRatio > 0.02; // At least 2% skin-tone pixels
// // };

// // // Simple movement detection (placeholder)
// // let lastImageData = null;
// // const checkForMovement = (imageData) => {
// //   if (!lastImageData) {
// //     lastImageData = new Uint8ClampedArray(imageData.data);
// //     return true; // Assume movement on first frame
// //   }

// //   let differences = 0;
// //   const threshold = 30;

// //   for (let i = 0; i < imageData.data.length; i += 4) {
// //     const diff = Math.abs(imageData.data[i] - lastImageData[i]) +
// //       Math.abs(imageData.data[i + 1] - lastImageData[i + 1]) +
// //       Math.abs(imageData.data[i + 2] - lastImageData[i + 2]);

// //     if (diff > threshold) {
// //       differences++;
// //     }
// //   }

// //   // Update last image data
// //   lastImageData.set(imageData.data);

// //   const movementRatio = differences / (imageData.data.length / 4);
// //   return movementRatio > 0.01; // 1% of pixels changed significantly
// // };

// // // import React, { useRef, useEffect, useState } from 'react';
// // // import { detectFace, initializeFaceDetection } from '../utils/faceDetection';
// // // import { detectObjects, initializeObjectDetection } from '../utils/objectDetection';

// // // const VideoInterface = ({ onEvent, isActive, interviewId }) => {
// // //   const videoRef = useRef(null);
// // //   const canvasRef = useRef(null);
// // //   const mediaRecorderRef = useRef(null);
// // //   const streamRef = useRef(null);

// // //   // Alert debouncing
// // //   const lastNoFaceAlert = useRef(null);
// // //   const lastMultipleFaceAlert = useRef(null);
// // //   const lastObjectAlert = useRef(null);

// // //   const [isRecording, setIsRecording] = useState(false);
// // //   const [detectionStats, setDetectionStats] = useState({
// // //     focusLost: 0,
// // //     noFaceDetected: 0,
// // //     objectsDetected: 0,
// // //     multipleFaces: 0
// // //   });

// // //   useEffect(() => {
// // //     if (isActive) {
// // //       startCamera();
// // //       initializeDetection();
// // //     }
// // //     return () => stopCamera();
// // //   }, [isActive]);

// // //   const startCamera = async () => {
// // //     try {
// // //       const stream = await navigator.mediaDevices.getUserMedia({
// // //         video: { width: 640, height: 480 },
// // //         audio: true
// // //       });

// // //       streamRef.current = stream;
// // //       videoRef.current.srcObject = stream;
      
// // //       // Wait for video to be ready
// // //       videoRef.current.onloadedmetadata = () => {
// // //         startRecording(stream);
// // //         startDetectionLoop();
// // //       };

// // //     } catch (error) {
// // //       console.error('Error accessing camera:', error);
// // //       onEvent({
// // //         type: 'CAMERA_ERROR',
// // //         description: 'Failed to access camera',
// // //         severity: 'high'
// // //       });
// // //     }
// // //   };

// // //   const startRecording = (stream) => {
// // //     const mediaRecorder = new MediaRecorder(stream);
// // //     const chunks = [];

// // //     mediaRecorder.ondataavailable = (event) => chunks.push(event.data);
// // //     mediaRecorder.onstop = () => {
// // //       const blob = new Blob(chunks, { type: 'video/webm' });
// // //       console.log('Recording stopped, video blob:', blob);
// // //     };

// // //     mediaRecorderRef.current = mediaRecorder;
// // //     mediaRecorder.start();
// // //     setIsRecording(true);
// // //   };

// // //   const initializeDetection = async () => {
// // //     await Promise.all([
// // //       initializeFaceDetection(),
// // //       initializeObjectDetection()
// // //     ]);
// // //   };

// // //   const startDetectionLoop = () => {
// // //     const detectFrame = async () => {
// // //       if (!isActive || !videoRef.current || videoRef.current.readyState !== 4) {
// // //         if (isActive) requestAnimationFrame(detectFrame);
// // //         return;
// // //       }

// // //       const canvas = canvasRef.current;
// // //       const ctx = canvas.getContext('2d');

// // //       // Ensure canvas matches video dimensions
// // //       canvas.width = videoRef.current.videoWidth || 640;
// // //       canvas.height = videoRef.current.videoHeight || 480;
      
// // //       // Draw current video frame to canvas
// // //       ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

// // //       try {
// // //         // Combined detection approach
// // //         await Promise.all([
// // //           handleFaceDetection(),
// // //           handleObjectDetection()
// // //         ]);

// // //       } catch (error) {
// // //         console.error('Detection error:', error);
// // //       }

// // //       if (isActive) {
// // //         requestAnimationFrame(detectFrame);
// // //       }
// // //     };

// // //     detectFrame();
// // //   };

// // //   const handleFaceDetection = async () => {
// // //     try {
// // //       const canvas = canvasRef.current;
// // //       const faceResult = await detectFace(canvas);
// // //       const now = Date.now();

// // //       console.log('Face detection result:', faceResult);

// // //       // Handle NO FACE detection
// // //       if (faceResult.faceCount === 0) {
// // //         if (!lastNoFaceAlert.current || now - lastNoFaceAlert.current > 3000) {
// // //           console.log('Triggering NO_FACE_DETECTED event');
          
// // //           onEvent({
// // //             type: 'NO_FACE_DETECTED',
// // //             description: 'No person detected in frame',
// // //             severity: 'high'
// // //           });

// // //           setDetectionStats(prev => ({
// // //             ...prev,
// // //             noFaceDetected: prev.noFaceDetected + 1
// // //           }));

// // //           lastNoFaceAlert.current = now;
// // //         }
// // //       } else {
// // //         lastNoFaceAlert.current = null;
// // //       }

// // //       // Handle MULTIPLE FACES detection
// // //       if (faceResult.faceCount > 1) {
// // //         if (!lastMultipleFaceAlert.current || now - lastMultipleFaceAlert.current > 3000) {
// // //           console.log('Triggering MULTIPLE_FACES event');
          
// // //           onEvent({
// // //             type: 'MULTIPLE_FACES',
// // //             description: `${faceResult.faceCount} people detected in frame`,
// // //             severity: 'high'
// // //           });

// // //           setDetectionStats(prev => ({
// // //             ...prev,
// // //             multipleFaces: prev.multipleFaces + 1
// // //           }));

// // //           lastMultipleFaceAlert.current = now;
// // //         }
// // //       } else {
// // //         lastMultipleFaceAlert.current = null;
// // //       }

// // //     } catch (error) {
// // //       console.error('Face detection error:', error);
// // //     }
// // //   };

// // //   const handleObjectDetection = async () => {
// // //     try {
// // //       const canvas = canvasRef.current;
// // //       const objects = await detectObjects(canvas);
// // //       const now = Date.now();

// // //       // Filter suspicious objects (excluding persons)
// // //       const suspiciousObjects = objects.filter(obj =>
// // //         ['cell phone', 'book', 'laptop', 'tv', 'remote', 'keyboard', 'mouse'].includes(obj.class) &&
// // //         obj.score > 0.5
// // //       );

// // //       if (suspiciousObjects.length > 0) {
// // //         if (!lastObjectAlert.current || now - lastObjectAlert.current > 3000) {
// // //           suspiciousObjects.forEach(obj => {
// // //             console.log('Triggering SUSPICIOUS_OBJECT event:', obj.class);

// // //             onEvent({
// // //               type: 'SUSPICIOUS_OBJECT',
// // //               description: `${obj.class} detected with ${Math.round(obj.score * 100)}% confidence`,
// // //               severity: obj.class === 'cell phone' ? 'high' : 'medium'
// // //             });

// // //             setDetectionStats(prev => ({
// // //               ...prev,
// // //               objectsDetected: prev.objectsDetected + 1
// // //             }));
// // //           });

// // //           lastObjectAlert.current = now;
// // //         }
// // //       } else {
// // //         lastObjectAlert.current = null;
// // //       }

// // //     } catch (error) {
// // //       console.error('Object detection error:', error);
// // //     }
// // //   };

// // //   const stopCamera = () => {
// // //     if (streamRef.current) {
// // //       streamRef.current.getTracks().forEach(track => track.stop());
// // //     }
// // //     if (mediaRecorderRef.current && isRecording) {
// // //       mediaRecorderRef.current.stop();
// // //       setIsRecording(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="video-interface">
// // //       <div className="video-container">
// // //         <video
// // //           ref={videoRef}
// // //           autoPlay
// // //           muted
// // //           playsInline
// // //           className="candidate-video"
// // //         />
// // //         <canvas
// // //           ref={canvasRef}
// // //           width="640"
// // //           height="480"
// // //           style={{ display: 'none' }}
// // //         />

// // //         <div className="video-overlay">
// // //           <div className="recording-indicator">
// // //             {isRecording && <span className="rec-dot">●</span>}
// // //             {isRecording ? 'Recording' : 'Not Recording'}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="detection-stats">
// // //         <h3>Detection Statistics</h3>
// // //         <div className="stats-grid">
// // //           <div className="stat-item">
// // //             <span className="stat-label">Focus Lost:</span>
// // //             <span className="stat-value">{detectionStats.focusLost}</span>
// // //           </div>
// // //           <div className="stat-item">
// // //             <span className="stat-label">No Face:</span>
// // //             <span className="stat-value">{detectionStats.noFaceDetected}</span>
// // //           </div>
// // //           <div className="stat-item">
// // //             <span className="stat-label">Objects:</span>
// // //             <span className="stat-value">{detectionStats.objectsDetected}</span>
// // //           </div>
// // //           <div className="stat-item">
// // //             <span className="stat-label">Multiple Faces:</span>
// // //             <span className="stat-value">{detectionStats.multipleFaces}</span>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default VideoInterface;


// import React, { useRef, useEffect, useState } from 'react';
// import { detectFace, initializeFaceDetection } from '../utils/faceDetection';
// import { detectObjects, initializeObjectDetection } from '../utils/objectDetection';

// const VideoInterface = ({ onEvent, isActive, interviewId }) => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const streamRef = useRef(null);

//   // Alert debouncing
//   const lastNoFaceAlert = useRef(null);
//   const lastMultipleFaceAlert = useRef(null);
//   const lastObjectAlert = useRef(null);

//   const [isRecording, setIsRecording] = useState(false);
//   const [detectionStats, setDetectionStats] = useState({
//     focusLost: 0,
//     noFaceDetected: 0,
//     objectsDetected: 0,
//     multipleFaces: 0
//   });

//   useEffect(() => {
//     if (isActive) {
//       startCamera();
//       initializeDetection();
//     }
//     return () => stopCamera();
//   }, [isActive]);

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { width: 640, height: 480 },
//         audio: true
//       });

//       streamRef.current = stream;
//       videoRef.current.srcObject = stream;
      
//       // Wait for video to be ready
//       videoRef.current.onloadedmetadata = () => {
//         startRecording(stream);
//         startDetectionLoop();
//       };

//     } catch (error) {
//       console.error('Error accessing camera:', error);
//       onEvent({
//         type: 'CAMERA_ERROR',
//         description: 'Failed to access camera',
//         severity: 'high'
//       });
//     }
//   };

//   const startRecording = (stream) => {
//     const mediaRecorder = new MediaRecorder(stream);
//     const chunks = [];

//     mediaRecorder.ondataavailable = (event) => chunks.push(event.data);
//     mediaRecorder.onstop = () => {
//       const blob = new Blob(chunks, { type: 'video/webm' });
//       console.log('Recording stopped, video blob:', blob);
//     };

//     mediaRecorderRef.current = mediaRecorder;
//     mediaRecorder.start();
//     setIsRecording(true);
//   };

//   const initializeDetection = async () => {
//     await Promise.all([
//       initializeFaceDetection(),
//       initializeObjectDetection()
//     ]);
//   };

//   const startDetectionLoop = () => {
//     const detectFrame = async () => {
//       if (!isActive || !videoRef.current || videoRef.current.readyState !== 4) {
//         if (isActive) requestAnimationFrame(detectFrame);
//         return;
//       }

//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext('2d');

//       // Ensure canvas matches video dimensions
//       canvas.width = videoRef.current.videoWidth || 640;
//       canvas.height = videoRef.current.videoHeight || 480;
      
//       // Draw current video frame to canvas
//       ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//       try {
//         // Combined detection approach
//         await Promise.all([
//           handleFaceDetection(),
//           handleObjectDetection()
//         ]);

//       } catch (error) {
//         console.error('Detection error:', error);
//       }

//       if (isActive) {
//         requestAnimationFrame(detectFrame);
//       }
//     };

//     detectFrame();
//   };

//   const handleFaceDetection = async () => {
//     try {
//       const canvas = canvasRef.current;
//       const faceResult = await detectFace(canvas);
//       const now = Date.now();

//       console.log('Face detection result:', faceResult);

//       // Handle NO FACE detection
//       if (faceResult.faceCount === 0) {
//         if (!lastNoFaceAlert.current || now - lastNoFaceAlert.current > 3000) {
//           console.log('Triggering NO_FACE_DETECTED event');
          
//           onEvent({
//             type: 'NO_FACE_DETECTED',
//             description: 'No person detected in frame',
//             severity: 'high'
//           });

//           setDetectionStats(prev => ({
//             ...prev,
//             noFaceDetected: prev.noFaceDetected + 1
//           }));

//           lastNoFaceAlert.current = now;
//         }
//       } else {
//         lastNoFaceAlert.current = null;
//       }

//       // Handle MULTIPLE FACES detection
//       if (faceResult.faceCount > 1) {
//         if (!lastMultipleFaceAlert.current || now - lastMultipleFaceAlert.current > 3000) {
//           console.log('Triggering MULTIPLE_FACES event');
          
//           onEvent({
//             type: 'MULTIPLE_FACES',
//             description: `${faceResult.faceCount} people detected in frame`,
//             severity: 'high'
//           });

//           setDetectionStats(prev => ({
//             ...prev,
//             multipleFaces: prev.multipleFaces + 1
//           }));

//           lastMultipleFaceAlert.current = now;
//         }
//       } else {
//         lastMultipleFaceAlert.current = null;
//       }

//     } catch (error) {
//       console.error('Face detection error:', error);
//     }
//   };

//   const handleObjectDetection = async () => {
//     try {
//       const canvas = canvasRef.current;
//       const objects = await detectObjects(canvas);
//       const now = Date.now();

//       // Filter suspicious objects (excluding persons)
//       const suspiciousObjects = objects.filter(obj =>
//         ['cell phone', 'book', 'laptop', 'tv', 'remote', 'keyboard', 'mouse'].includes(obj.class) &&
//         obj.score > 0.5
//       );

//       if (suspiciousObjects.length > 0) {
//         if (!lastObjectAlert.current || now - lastObjectAlert.current > 3000) {
//           suspiciousObjects.forEach(obj => {
//             console.log('Triggering SUSPICIOUS_OBJECT event:', obj.class);

//             onEvent({
//               type: 'SUSPICIOUS_OBJECT',
//               description: `${obj.class} detected with ${Math.round(obj.score * 100)}% confidence`,
//               severity: obj.class === 'cell phone' ? 'high' : 'medium'
//             });

//             setDetectionStats(prev => ({
//               ...prev,
//               objectsDetected: prev.objectsDetected + 1
//             }));
//           });

//           lastObjectAlert.current = now;
//         }
//       } else {
//         lastObjectAlert.current = null;
//       }

//     } catch (error) {
//       console.error('Object detection error:', error);
//     }
//   };

//   const stopCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//     }
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   return (
//     <div className="video-interface">
//       <div className="video-container">
//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           playsInline
//           className="candidate-video"
//         />
//         <canvas
//           ref={canvasRef}
//           width="640"
//           height="480"
//           style={{ display: 'none' }}
//         />

//         <div className="video-overlay">
//           <div className="recording-indicator">
//             {isRecording && <span className="rec-dot">●</span>}
//             {isRecording ? 'Recording' : 'Not Recording'}
//           </div>
//         </div>
//       </div>

//       <div className="detection-stats">
//         <h3>Detection Statistics</h3>
//         <div className="stats-grid">
//           <div className="stat-item">
//             <span className="stat-label">Focus Lost:</span>
//             <span className="stat-value">{detectionStats.focusLost}</span>
//           </div>
//           <div className="stat-item">
//             <span className="stat-label">No Face:</span>
//             <span className="stat-value">{detectionStats.noFaceDetected}</span>
//           </div>
//           <div className="stat-item">
//             <span className="stat-label">Objects:</span>
//             <span className="stat-value">{detectionStats.objectsDetected}</span>
//           </div>
//           <div className="stat-item">
//             <span className="stat-label">Multiple Faces:</span>
//             <span className="stat-value">{detectionStats.multipleFaces}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoInterface;


import React, { useRef, useEffect, useState } from 'react';
import { detectFace, initializeFaceDetection } from '../utils/faceDetection';
import { detectObjects, initializeObjectDetection } from '../utils/objectDetection';

const VideoInterface = ({ onEvent, isActive, interviewId }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);

  // Timer refs for focus detection requirements
  const focusLostStartTime = useRef(null);
  const noFaceStartTime = useRef(null);
  
  // Alert debouncing
  const lastNoFaceAlert = useRef(null);
  const lastMultipleFaceAlert = useRef(null);
  const lastObjectAlert = useRef(null);
  const lastFocusAlert = useRef(null);

  const [isRecording, setIsRecording] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('Monitoring...');
  const [detectionStats, setDetectionStats] = useState({
    focusLost: 0,
    noFaceDetected: 0,
    objectsDetected: 0,
    multipleFaces: 0,
    totalFocusLostTime: 0,
    totalNoFaceTime: 0
  });

  useEffect(() => {
    if (isActive) {
      startCamera();
      initializeDetection();
    }
    return () => stopCamera();
  }, [isActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user' // Ensure front camera
        },
        audio: true
      });

      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      
      videoRef.current.onloadedmetadata = () => {
        startRecording(stream);
        startDetectionLoop();
      };

    } catch (error) {
      console.error('Error accessing camera:', error);
      setCurrentStatus('Camera Error');
      onEvent({
        type: 'CAMERA_ERROR',
        description: 'Failed to access camera',
        severity: 'high'
      });
    }
  };

  const startRecording = (stream) => {
    try {
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      });
      const chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        // Here you would upload the video to your server
        console.log('Recording stopped, video blob size:', blob.size);
        // You can implement video upload logic here
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(1000); // Record in 1-second chunks
      setIsRecording(true);
      setCurrentStatus('Recording & Monitoring');
    } catch (error) {
      console.error('Error starting recording:', error);
      setCurrentStatus('Recording Failed');
    }
  };

  const initializeDetection = async () => {
    setCurrentStatus('Initializing Detection Models...');
    await Promise.all([
      initializeFaceDetection(),
      initializeObjectDetection()
    ]);
    setCurrentStatus('Detection Ready');
  };

  const startDetectionLoop = () => {
    const detectFrame = async () => {
      if (!isActive || !videoRef.current || videoRef.current.readyState !== 4) {
        if (isActive) requestAnimationFrame(detectFrame);
        return;
      }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      try {
        await Promise.all([
          handleEnhancedFaceDetection(),
          handleEnhancedObjectDetection()
        ]);
      } catch (error) {
        console.error('Detection error:', error);
      }

      if (isActive) {
        requestAnimationFrame(detectFrame);
      }
    };

    detectFrame();
  };

  const handleEnhancedFaceDetection = async () => {
    try {
      const canvas = canvasRef.current;
      const faceResult = await detectFace(canvas);
      const now = Date.now();

      // Handle NO FACE detection (>10 seconds requirement)
      if (faceResult.faceCount === 0) {
        if (!noFaceStartTime.current) {
          noFaceStartTime.current = now;
        }
        
        const noFaceDuration = (now - noFaceStartTime.current) / 1000;
        
        if (noFaceDuration > 10 && (!lastNoFaceAlert.current || now - lastNoFaceAlert.current > 5000)) {
          console.log(`No face detected for ${noFaceDuration.toFixed(1)} seconds`);
          setCurrentStatus(`⚠️ No face detected for ${noFaceDuration.toFixed(0)}s`);
          
          onEvent({
            type: 'NO_FACE_DETECTED',
            description: `No face detected for ${noFaceDuration.toFixed(1)} seconds`,
            severity: 'high'
          });

          setDetectionStats(prev => ({
            ...prev,
            noFaceDetected: prev.noFaceDetected + 1,
            totalNoFaceTime: prev.totalNoFaceTime + noFaceDuration
          }));

          lastNoFaceAlert.current = now;
          noFaceStartTime.current = now; // Reset timer for next detection
        }
      } else {
        // Reset no face timer when face is detected
        if (noFaceStartTime.current) {
          const finalDuration = (now - noFaceStartTime.current) / 1000;
          if (finalDuration < 10) {
            // Face was detected before 10 seconds
            noFaceStartTime.current = null;
          }
        }
        setCurrentStatus('Face Detected ✓');
      }

      // Handle MULTIPLE FACES detection
      if (faceResult.faceCount > 1) {
        if (!lastMultipleFaceAlert.current || now - lastMultipleFaceAlert.current > 3000) {
          console.log(`Multiple faces detected: ${faceResult.faceCount}`);
          setCurrentStatus(`⚠️ ${faceResult.faceCount} faces detected`);
          
          onEvent({
            type: 'MULTIPLE_FACES',
            description: `${faceResult.faceCount} people detected in frame`,
            severity: 'high'
          });

          setDetectionStats(prev => ({
            ...prev,
            multipleFaces: prev.multipleFaces + 1
          }));

          lastMultipleFaceAlert.current = now;
        }
      }

      // Handle FOCUS LOST detection (>5 seconds requirement)
      // This would require gaze tracking or head pose estimation
      // For now, we'll use face position as a proxy
      if (faceResult.faceCount === 1) {
        const face = faceResult.faces[0];
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const faceX = face.x + face.width / 2;
        const faceY = face.y + face.height / 2;
        
        // Simple focus detection based on face position
        const isLookingAway = Math.abs(faceX - centerX) > canvas.width * 0.2 || 
                             Math.abs(faceY - centerY) > canvas.height * 0.2;
        
        if (isLookingAway) {
          if (!focusLostStartTime.current) {
            focusLostStartTime.current = now;
          }
          
          const focusLostDuration = (now - focusLostStartTime.current) / 1000;
          
          if (focusLostDuration > 5 && (!lastFocusAlert.current || now - lastFocusAlert.current > 5000)) {
            console.log(`Focus lost for ${focusLostDuration.toFixed(1)} seconds`);
            setCurrentStatus(`⚠️ Looking away for ${focusLostDuration.toFixed(0)}s`);
            
            onEvent({
              type: 'FOCUS_LOST',
              description: `Candidate not looking at screen for ${focusLostDuration.toFixed(1)} seconds`,
              severity: 'medium'
            });

            setDetectionStats(prev => ({
              ...prev,
              focusLost: prev.focusLost + 1,
              totalFocusLostTime: prev.totalFocusLostTime + focusLostDuration
            }));

            lastFocusAlert.current = now;
            focusLostStartTime.current = now; // Reset timer
          }
        } else {
          // Reset focus timer when looking at screen
          if (focusLostStartTime.current) {
            const finalDuration = (now - focusLostStartTime.current) / 1000;
            if (finalDuration < 5) {
              focusLostStartTime.current = null;
            }
          }
          if (currentStatus.includes('Looking away')) {
            setCurrentStatus('Focused ✓');
          }
        }
      }

    } catch (error) {
      console.error('Face detection error:', error);
    }
  };

  const handleEnhancedObjectDetection = async () => {
    try {
      const canvas = canvasRef.current;
      const objects = await detectObjects(canvas);
      const now = Date.now();

      // Enhanced suspicious object detection with specific requirements
      const suspiciousObjects = objects.filter(obj => {
        const suspiciousClasses = {
          'cell phone': 'high',
          'book': 'medium', 
          'laptop': 'high',
          'tv': 'medium',
          'remote': 'low',
          'keyboard': 'medium',
          'mouse': 'medium'
        };
        
        return suspiciousClasses[obj.class] && obj.score > 0.4;
      });

      if (suspiciousObjects.length > 0) {
        if (!lastObjectAlert.current || now - lastObjectAlert.current > 2000) {
          suspiciousObjects.forEach(obj => {
            const severityMap = {
              'cell phone': 'high',
              'book': 'medium',
              'laptop': 'high',
              'tv': 'medium',
              'remote': 'low',
              'keyboard': 'medium',
              'mouse': 'medium'
            };

            console.log(`Suspicious object detected: ${obj.class}`);
            setCurrentStatus(`⚠️ ${obj.class} detected`);

            onEvent({
              type: 'SUSPICIOUS_OBJECT',
              description: `${obj.class} detected with ${Math.round(obj.score * 100)}% confidence`,
              severity: severityMap[obj.class] || 'medium'
            });

            setDetectionStats(prev => ({
              ...prev,
              objectsDetected: prev.objectsDetected + 1
            }));
          });

          lastObjectAlert.current = now;
        }
      }

    } catch (error) {
      console.error('Object detection error:', error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    setCurrentStatus('Stopped');
  };

  return (
    <div className="video-interface">
      <div className="video-container">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="candidate-video"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            border: '2px solid #ddd'
          }}
        />
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          style={{ display: 'none' }}
        />

        <div className="video-overlay" style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize: '12px'
        }}>
          <div className="recording-indicator">
            {isRecording && <span className="rec-dot" style={{color: 'red'}}>●</span>}
            {currentStatus}
          </div>
        </div>
      </div>

      <div className="detection-stats" style={{
        marginTop: '20px',
        padding: '15px',
        background: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <h3>Live Detection Statistics</h3>
        <div className="stats-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '10px',
          marginTop: '10px'
        }}>
          <div className="stat-item" style={{
            padding: '10px',
            background: 'white',
            borderRadius: '5px',
            textAlign: 'center'
          }}>
            <span className="stat-label">Focus Lost Events:</span>
            <span className="stat-value" style={{fontWeight: 'bold', color: '#ff6b6b'}}> {detectionStats.focusLost}</span>
            <div style={{fontSize: '12px', color: '#666'}}>
              Total: {Math.round(detectionStats.totalFocusLostTime)}s
            </div>
          </div>
          <div className="stat-item" style={{
            padding: '10px',
            background: 'white',
            borderRadius: '5px',
            textAlign: 'center'
          }}>
            <span className="stat-label">No Face Events:</span>
            <span className="stat-value" style={{fontWeight: 'bold', color: '#ff6b6b'}}> {detectionStats.noFaceDetected}</span>
            <div style={{fontSize: '12px', color: '#666'}}>
              Total: {Math.round(detectionStats.totalNoFaceTime)}s
            </div>
          </div>
          <div className="stat-item" style={{
            padding: '10px',
            background: 'white',
            borderRadius: '5px',
            textAlign: 'center'
          }}>
            <span className="stat-label">Suspicious Objects:</span>
            <span className="stat-value" style={{fontWeight: 'bold', color: '#ff6b6b'}}> {detectionStats.objectsDetected}</span>
          </div>
          <div className="stat-item" style={{
            padding: '10px',
            background: 'white',
            borderRadius: '5px',
            textAlign: 'center'
          }}>
            <span className="stat-label">Multiple Faces:</span>
            <span className="stat-value" style={{fontWeight: 'bold', color: '#ff6b6b'}}> {detectionStats.multipleFaces}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoInterface;