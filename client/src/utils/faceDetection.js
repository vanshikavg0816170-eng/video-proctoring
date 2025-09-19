// // // // // import * as tf from '@tensorflow/tfjs';

// // // // // let faceDetectionModel = null;

// // // // // export const initializeFaceDetection = async () => {
// // // // //   try {
// // // // //     // Load a simple face detection model
// // // // //     // You can use MediaPipe or TensorFlow.js models
// // // // //     await tf.ready();
// // // // //     console.log('Face detection initialized');
// // // // //   } catch (error) {
// // // // //     console.error('Error initializing face detection:', error);
// // // // //   }
// // // // // };

// // // // // export const detectFace = async (canvas) => {
// // // // //   try {
// // // // //     // Convert canvas to tensor
// // // // //     const tensor = tf.browser.fromPixels(canvas);

// // // // //     // Simple mock detection - replace with actual model
// // // // //     const result = await mockFaceDetection(tensor);

// // // // //     tensor.dispose();
// // // // //     return result;
// // // // //   } catch (error) {
// // // // //     console.error('Face detection error:', error);
// // // // //     return { faceCount: 0, isFocused: false };
// // // // //   }
// // // // // };

// // // // // // Mock face detection - replace with actual implementation
// // // // // const mockFaceDetection = async (tensor) => {
// // // // //   // Simulate face detection processing
// // // // //   await new Promise(resolve => setTimeout(resolve, 10));

// // // // //   // Random simulation for demo
// // // // //   const faceCount = Math.random() > 0.1 ? 1 : Math.random() > 0.9 ? 2 : 0;
// // // // //   const isFocused = Math.random() > 0.2; // 80% focused

// // // // //   return {
// // // // //     faceCount,
// // // // //     isFocused,
// // // // //     faces: faceCount > 0 ? [{ x: 100, y: 100, width: 200, height: 200 }] : []
// // // // //   };
// // // // // };

// // // // // // Real implementation would use MediaPipe or similar
// // // // // export const initializeMediaPipeFaceDetection = async () => {
// // // // //   // MediaPipe Face Mesh implementation
// // // // //   // This would require MediaPipe library setup
// // // // //   console.log('MediaPipe face detection would be initialized here');
// // // // // };
// // // // import * as tf from '@tensorflow/tfjs';

// // // // let faceDetectionModel = null;
// // // // let faceMesh = null;

// // // // // Use MediaPipe Face Detection instead of mock
// // // // export const initializeFaceDetection = async () => {
// // // //   try {
// // // //     await tf.ready();

// // // //     // Load MediaPipe Face Detection
// // // //     const { FaceDetection } = await import('@mediapipe/face_detection');
// // // //     const { Camera } = await import('@mediapipe/camera_utils');

// // // //     faceDetectionModel = new FaceDetection({
// // // //       locateFile: (file) => {
// // // //         return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
// // // //       }
// // // //     });

// // // //     faceDetectionModel.setOptions({
// // // //       model: 'short',
// // // //       minDetectionConfidence: 0.7  // Higher threshold to reduce false positives
// // // //     });

// // // //     console.log('Real face detection initialized');
// // // //   } catch (error) {
// // // //     console.error('Error initializing face detection:', error);
// // // //   }
// // // // };

// // // // export const detectFace = async (canvas) => {
// // // //   try {
// // // //     if (!faceDetectionModel) {
// // // //       await initializeFaceDetection();
// // // //     }

// // // //     // Convert canvas to image data
// // // //     const ctx = canvas.getContext('2d');
// // // //     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

// // // //     // Use real face detection instead of mock
// // // //     const result = await realFaceDetection(imageData);

// // // //     return result;
// // // //   } catch (error) {
// // // //     console.error('Face detection error:', error);
// // // //     return { faceCount: 0, isFocused: false, faces: [] };
// // // //   }
// // // // };

// // // // // REAL face detection implementation
// // // // const realFaceDetection = async (imageData) => {
// // // //   return new Promise((resolve) => {
// // // //     if (!faceDetectionModel) {
// // // //       resolve({ faceCount: 0, isFocused: false, faces: [] });
// // // //       return;
// // // //     }

// // // //     faceDetectionModel.onResults((results) => {
// // // //       const faces = results.detections || [];

// // // //       // Filter faces with high confidence and reasonable size
// // // //       const validFaces = faces.filter(face => {
// // // //         const bbox = face.boundingBox;
// // // //         const width = bbox.width * imageData.width;
// // // //         const height = bbox.height * imageData.height;

// // // //         return (
// // // //           face.score[0] > 0.7 &&  // High confidence
// // // //           width > 50 &&           // Minimum width
// // // //           height > 50 &&          // Minimum height
// // // //           width < imageData.width * 0.8 && // Not too large
// // // //           height < imageData.height * 0.8
// // // //         );
// // // //       });

// // // //       const faceCount = validFaces.length;
// // // //       const isFocused = faceCount === 1; // Consider focused if exactly one face

// // // //       resolve({
// // // //         faceCount,
// // // //         isFocused,
// // // //         faces: validFaces.map(face => ({
// // // //           x: face.boundingBox.xCenter * imageData.width,
// // // //           y: face.boundingBox.yCenter * imageData.height,
// // // //           width: face.boundingBox.width * imageData.width,
// // // //           height: face.boundingBox.height * imageData.height,
// // // //           confidence: face.score[0]
// // // //         }))
// // // //       });
// // // //     });

// // // //     // Send image to MediaPipe
// // // //     faceDetectionModel.send({ image: imageData });
// // // //   });
// // // // };

// // // // // Backup: Simple TensorFlow.js implementation if MediaPipe fails
// // // // export const initializeTensorFlowFaceDetection = async () => {
// // // //   try {
// // // //     const blazeface = await import('@tensorflow-models/blazeface');
// // // //     faceDetectionModel = await blazeface.load();
// // // //     console.log('TensorFlow face detection loaded as backup');
// // // //   } catch (error) {
// // // //     console.error('Error loading TensorFlow face detection:', error);
// // // //   }
// // // // };

// // // // const tensorFlowFaceDetection = async (tensor) => {
// // // //   if (!faceDetectionModel) {
// // // //     return { faceCount: 0, isFocused: false, faces: [] };
// // // //   }

// // // //   const predictions = await faceDetectionModel.estimateFaces(tensor, false);

// // // //   // Filter predictions with confidence threshold
// // // //   const validFaces = predictions.filter(prediction => {
// // // //     const [x1, y1] = prediction.topLeft;
// // // //     const [x2, y2] = prediction.bottomRight;
// // // //     const width = x2 - x1;
// // // //     const height = y2 - y1;

// // // //     return (
// // // //       prediction.probability[0] > 0.7 && // High confidence
// // // //       width > 50 && height > 50          // Reasonable size
// // // //     );
// // // //   });

// // // //   return {
// // // //     faceCount: validFaces.length,
// // // //     isFocused: validFaces.length === 1,
// // // //     faces: validFaces
// // // //   };
// // // // };





// // // import * as tf from '@tensorflow/tfjs';

// // // let faceDetectionModel = null;

// // // export const initializeFaceDetection = async () => {
// // //   try {
// // //     await tf.ready();
// // //     // Use BlazeFace instead of MediaPipe to avoid WASM issues
// // //     const blazeface = await import('@tensorflow-models/blazeface');
// // //     faceDetectionModel = await blazeface.load();
// // //     console.log('BlazeFace face detection loaded successfully');
// // //   } catch (error) {
// // //     console.error('Error loading face detection:', error);
// // //   }
// // // };

// // // export const detectFace = async (canvas) => {
// // //   try {
// // //     if (!faceDetectionModel) {
// // //       await initializeFaceDetection();
// // //     }

// // //     const tensor = tf.browser.fromPixels(canvas);
// // //     const predictions = await faceDetectionModel.estimateFaces(tensor, false);

// // //     // Clean up tensor
// // //     tensor.dispose();

// // //     // Filter high-confidence faces
// // //     const validFaces = predictions.filter(pred => pred.probability[0] > 0.6);

// // //     return {
// // //       faceCount: validFaces.length,
// // //       isFocused: validFaces.length === 1,
// // //       faces: validFaces.map(face => ({
// // //         x: face.topLeft[0],
// // //         y: face.topLeft[1],
// // //         width: face.bottomRight[0] - face.topLeft[0],
// // //         height: face.bottomRight[1] - face.topLeft[1],
// // //         confidence: face.probability[0]
// // //       }))
// // //     };
// // //   } catch (error) {
// // //     console.error('Face detection error:', error);
// // //     // Fallback: return no faces to prevent crashes
// // //     return { faceCount: 0, isFocused: false, faces: [] };
// // //   }
// // // };
// import * as tf from '@tensorflow/tfjs';

// let faceDetectionModel = null;
// let modelLoading = false;

// export const initializeFaceDetection = async () => {
//   if (faceDetectionModel || modelLoading) return;

//   try {
//     modelLoading = true;
//     await tf.ready();

//     // Try multiple model loading approaches
//     try {
//       const blazeface = await import('@tensorflow-models/blazeface');
//       faceDetectionModel = await blazeface.load();
//       console.log('BlazeFace loaded successfully');
//     } catch (blazeError) {
//       console.warn('BlazeFace failed, trying alternative:', blazeError);
//       // Fallback to a simpler detection method
//       faceDetectionModel = 'fallback';
//     }

//     modelLoading = false;
//   } catch (error) {
//     console.error('Error loading face detection:', error);
//     modelLoading = false;
//     faceDetectionModel = 'fallback';
//   }
// };

// export const detectFace = async (canvas) => {
//   try {
//     // Ensure model is loaded
//     if (!faceDetectionModel && !modelLoading) {
//       await initializeFaceDetection();
//     }

//     // Wait for model loading to complete
//     while (modelLoading) {
//       await new Promise(resolve => setTimeout(resolve, 100));
//     }

//     // Fallback detection if model failed to load
//     if (faceDetectionModel === 'fallback') {
//       return await fallbackFaceDetection(canvas);
//     }

//     if (!faceDetectionModel) {
//       console.warn('No face detection model available, using fallback');
//       return await fallbackFaceDetection(canvas);
//     }

//     // Ensure canvas has valid content
//     const ctx = canvas.getContext('2d');
//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

//     // Check if canvas has actual content (not just black/empty)
//     const hasContent = checkCanvasContent(imageData);
//     if (!hasContent) {
//       console.log('Canvas appears empty or black');
//       return { faceCount: 0, isFocused: false, faces: [] };
//     }

//     // Convert canvas to tensor with error handling
//     let tensor;
//     try {
//       tensor = tf.browser.fromPixels(canvas);
//     } catch (tensorError) {
//       console.error('Error creating tensor from canvas:', tensorError);
//       return await fallbackFaceDetection(canvas);
//     }

//     // Perform face detection with lower threshold
//     let predictions;
//     try {
//       predictions = await faceDetectionModel.estimateFaces(tensor, false);
//     } catch (detectionError) {
//       console.error('Face detection failed:', detectionError);
//       tensor.dispose();
//       return await fallbackFaceDetection(canvas);
//     }

//     // Clean up tensor immediately
//     tensor.dispose();

//     // Process results with lower confidence threshold
//     const validFaces = predictions.filter(pred => {
//       const confidence = pred.probability ? pred.probability[0] : 0;
//       const hasValidBounds = pred.topLeft && pred.bottomRight;

//       console.log('Face detected with confidence:', confidence);

//       return confidence > 0.3 && hasValidBounds; // Lowered threshold
//     });

//     const result = {
//       faceCount: validFaces.length,
//       isFocused: validFaces.length === 1,
//       faces: validFaces.map(face => ({
//         x: face.topLeft[0],
//         y: face.topLeft[1],
//         width: face.bottomRight[0] - face.topLeft[0],
//         height: face.bottomRight[1] - face.topLeft[1],
//         confidence: face.probability[0]
//       }))
//     };

//     console.log('Face detection result:', result);
//     return result;

//   } catch (error) {
//     console.error('Face detection error:', error);
//     return await fallbackFaceDetection(canvas);
//   }
// };

// // Fallback detection using basic image analysis
// const fallbackFaceDetection = async (canvas) => {
//   try {
//     const ctx = canvas.getContext('2d');
//     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

//     // Simple heuristic: look for skin-tone colors and face-like patterns
//     const skinToneDetected = detectSkinTones(imageData);
//     const hasMovement = checkForMovement(imageData);

//     // If we detect skin tones or movement, assume there's a person
//     if (skinToneDetected || hasMovement) {
//       console.log('Fallback detection: Person detected via heuristics');
//       return {
//         faceCount: 1,
//         isFocused: true,
//         faces: [{
//           x: canvas.width * 0.25,
//           y: canvas.height * 0.25,
//           width: canvas.width * 0.5,
//           height: canvas.height * 0.5,
//           confidence: 0.7
//         }]
//       };
//     }

//     return { faceCount: 0, isFocused: false, faces: [] };
//   } catch (error) {
//     console.error('Fallback detection error:', error);
//     return { faceCount: 0, isFocused: false, faces: [] };
//   }
// };

// // Check if canvas has meaningful content
// const checkCanvasContent = (imageData) => {
//   const data = imageData.data;
//   let nonBlackPixels = 0;
//   const totalPixels = data.length / 4;

//   for (let i = 0; i < data.length; i += 4) {
//     const r = data[i];
//     const g = data[i + 1];
//     const b = data[i + 2];

//     // Count non-black pixels
//     if (r > 10 || g > 10 || b > 10) {
//       nonBlackPixels++;
//     }
//   }

//   const contentRatio = nonBlackPixels / totalPixels;
//   return contentRatio > 0.1; // At least 10% non-black content
// };

// // Simple skin tone detection
// const detectSkinTones = (imageData) => {
//   const data = imageData.data;
//   let skinPixels = 0;
//   const totalPixels = data.length / 4;

//   for (let i = 0; i < data.length; i += 4) {
//     const r = data[i];
//     const g = data[i + 1];
//     const b = data[i + 2];

//     // Simple skin tone heuristic
//     if (r > 95 && g > 40 && b > 20 && 
//         Math.max(r, g, b) - Math.min(r, g, b) > 15 &&
//         Math.abs(r - g) > 15 && r > g && r > b) {
//       skinPixels++;
//     }
//   }

//   const skinRatio = skinPixels / totalPixels;
//   return skinRatio > 0.02; // At least 2% skin-tone pixels
// };

// // Simple movement detection (placeholder)
// let lastImageData = null;
// const checkForMovement = (imageData) => {
//   if (!lastImageData) {
//     lastImageData = new Uint8ClampedArray(imageData.data);
//     return true; // Assume movement on first frame
//   }

//   let differences = 0;
//   const threshold = 30;

//   for (let i = 0; i < imageData.data.length; i += 4) {
//     const diff = Math.abs(imageData.data[i] - lastImageData[i]) +
//                  Math.abs(imageData.data[i + 1] - lastImageData[i + 1]) +
//                  Math.abs(imageData.data[i + 2] - lastImageData[i + 2]);

//     if (diff > threshold) {
//       differences++;
//     }
//   }

//   // Update last image data
//   lastImageData.set(imageData.data);

//   const movementRatio = differences / (imageData.data.length / 4);
//   return movementRatio > 0.01; // 1% of pixels changed significantly
// };

// // import * as tf from '@tensorflow/tfjs';

// // let faceDetectionModel = null;
// // let modelLoading = false;
// // let modelLoadAttempts = 0;

// // // Debug logging
// // const debugLog = (message, data = null) => {
// //   console.log(`[FACE_DEBUG] ${message}`, data || '');
// // };

// // export const initializeFaceDetection = async () => {
// //   if (faceDetectionModel || modelLoading) return faceDetectionModel;

// //   try {
// //     modelLoading = true;
// //     modelLoadAttempts++;
// //     debugLog(`Initializing face detection (attempt ${modelLoadAttempts})`);

// //     await tf.ready();
// //     debugLog('TensorFlow.js ready');

// //     // Try to load BlazeFace with timeout
// //     const timeoutPromise = new Promise((_, reject) =>
// //       setTimeout(() => reject(new Error('Model loading timeout')), 15000)
// //     );

// //     const loadPromise = import('@tensorflow-models/blazeface').then(async (blazeface) => {
// //       debugLog('BlazeFace module imported, loading model...');
// //       const model = await blazeface.load();
// //       debugLog('BlazeFace model loaded successfully');
// //       return model;
// //     });

// //     try {
// //       faceDetectionModel = await Promise.race([loadPromise, timeoutPromise]);
// //       debugLog('Model ready for detection');
// //     } catch (modelError) {
// //       debugLog('BlazeFace loading failed, using fallback', modelError.message);
// //       faceDetectionModel = 'fallback';
// //     }

// //     modelLoading = false;
// //     return faceDetectionModel;

// //   } catch (error) {
// //     debugLog('Face detection initialization failed', error.message);
// //     modelLoading = false;
// //     faceDetectionModel = 'fallback';
// //     return faceDetectionModel;
// //   }
// // };

// // export const detectFace = async (canvas) => {
// //   try {
// //     debugLog('Starting face detection');

// //     // Ensure canvas is valid
// //     if (!canvas || !canvas.getContext) {
// //       debugLog('Invalid canvas provided');
// //       return { faceCount: 0, isFocused: false, faces: [] };
// //     }

// //     const ctx = canvas.getContext('2d');
// //     const width = canvas.width;
// //     const height = canvas.height;

// //     debugLog(`Canvas dimensions: ${width}x${height}`);

// //     // Check if canvas has content
// //     const imageData = ctx.getImageData(0, 0, width, height);
// //     const hasContent = checkCanvasContent(imageData);
// //     debugLog(`Canvas has content: ${hasContent}`);

// //     if (!hasContent) {
// //       return { faceCount: 0, isFocused: false, faces: [] };
// //     }

// //     // Ensure model is loaded
// //     if (!faceDetectionModel && !modelLoading) {
// //       debugLog('Model not loaded, initializing...');
// //       await initializeFaceDetection();
// //     }

// //     // Wait for model loading
// //     let waitCount = 0;
// //     while (modelLoading && waitCount < 50) {
// //       await new Promise(resolve => setTimeout(resolve, 100));
// //       waitCount++;
// //     }

// //     if (modelLoading) {
// //       debugLog('Model loading timeout, using fallback');
// //       return await fallbackFaceDetection(canvas);
// //     }

// //     // Use appropriate detection method
// //     if (faceDetectionModel === 'fallback' || !faceDetectionModel) {
// //       debugLog('Using fallback detection');
// //       return await fallbackFaceDetection(canvas);
// //     } else {
// //       debugLog('Using BlazeFace detection');
// //       return await blazeFaceDetection(canvas);
// //     }

// //   } catch (error) {
// //     debugLog('Face detection error', error.message);
// //     return await fallbackFaceDetection(canvas);
// //   }
// // };

// // // BlazeFace detection with better error handling
// // const blazeFaceDetection = async (canvas) => {
// //   try {
// //     let tensor = null;
// //     let predictions = null;

// //     try {
// //       tensor = tf.browser.fromPixels(canvas);
// //       debugLog('Tensor created from canvas');

// //       predictions = await faceDetectionModel.estimateFaces(tensor, false);
// //       debugLog(`BlazeFace predictions: ${predictions.length} faces found`);

// //     } catch (tensorError) {
// //       debugLog('Tensor/prediction error', tensorError.message);
// //       return await fallbackFaceDetection(canvas);
// //     } finally {
// //       if (tensor) tensor.dispose();
// //     }

// //     // Process predictions with very low threshold
// //     const validFaces = predictions.filter(pred => {
// //       const confidence = pred.probability ? pred.probability[0] : 0;
// //       const hasValidBounds = pred.topLeft && pred.bottomRight;

// //       debugLog(`Face confidence: ${confidence}, valid bounds: ${hasValidBounds}`);

// //       // Very low threshold - if BlazeFace detects anything, trust it
// //       return confidence > 0.1 && hasValidBounds;
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

// //     debugLog('BlazeFace result', result);

// //     // If BlazeFace found no faces but we clearly have content, use fallback
// //     if (result.faceCount === 0) {
// //       debugLog('BlazeFace found no faces, trying fallback');
// //       return await fallbackFaceDetection(canvas);
// //     }

// //     return result;

// //   } catch (error) {
// //     debugLog('BlazeFace detection failed', error.message);
// //     return await fallbackFaceDetection(canvas);
// //   }
// // };

// // // Enhanced fallback detection
// // const fallbackFaceDetection = async (canvas) => {
// //   try {
// //     debugLog('Running fallback face detection');

// //     const ctx = canvas.getContext('2d');
// //     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

// //     // Multiple detection heuristics
// //     const skinToneDetected = detectSkinTones(imageData);
// //     const hasMovement = checkForMovement(imageData);
// //     const hasFaceColors = detectFaceColors(imageData);
// //     const hasPersonShapes = detectPersonShapes(imageData);

// //     debugLog('Fallback checks', {
// //       skinTone: skinToneDetected,
// //       movement: hasMovement,
// //       faceColors: hasFaceColors,
// //       personShapes: hasPersonShapes
// //     });

// //     // If any heuristic suggests a person is present, assume face detected
// //     const personDetected = skinToneDetected || hasFaceColors || hasPersonShapes || hasMovement;

// //     if (personDetected) {
// //       debugLog('Fallback detected person presence');
// //       return {
// //         faceCount: 1,
// //         isFocused: true,
// //         faces: [{
// //           x: canvas.width * 0.25,
// //           y: canvas.height * 0.25,
// //           width: canvas.width * 0.5,
// //           height: canvas.height * 0.5,
// //           confidence: 0.8
// //         }]
// //       };
// //     }

// //     debugLog('Fallback: No person detected');
// //     return { faceCount: 0, isFocused: false, faces: [] };

// //   } catch (error) {
// //     debugLog('Fallback detection error', error.message);
// //     // If all else fails, assume person is present if canvas has content
// //     return { faceCount: 1, isFocused: true, faces: [] };
// //   }
// // };

// // // Check if canvas has meaningful content
// // const checkCanvasContent = (imageData) => {
// //   const data = imageData.data;
// //   let nonBlackPixels = 0;
// //   let brightPixels = 0;
// //   const totalPixels = data.length / 4;

// //   for (let i = 0; i < data.length; i += 4) {
// //     const r = data[i];
// //     const g = data[i + 1];
// //     const b = data[i + 2];

// //     // Count non-black pixels
// //     if (r > 10 || g > 10 || b > 10) {
// //       nonBlackPixels++;
// //     }

// //     // Count reasonably bright pixels
// //     if (r > 50 || g > 50 || b > 50) {
// //       brightPixels++;
// //     }
// //   }

// //   const contentRatio = nonBlackPixels / totalPixels;
// //   const brightRatio = brightPixels / totalPixels;

// //   debugLog(`Content check - total pixels: ${totalPixels}, non-black: ${nonBlackPixels} (${(contentRatio * 100).toFixed(1)}%), bright: ${brightPixels} (${(brightRatio * 100).toFixed(1)}%)`);

// //   return contentRatio > 0.05 && brightRatio > 0.02; // Lower thresholds
// // };

// // // Enhanced skin tone detection
// // const detectSkinTones = (imageData) => {
// //   const data = imageData.data;
// //   let skinPixels = 0;
// //   const totalPixels = data.length / 4;

// //   for (let i = 0; i < data.length; i += 4) {
// //     const r = data[i];
// //     const g = data[i + 1];
// //     const b = data[i + 2];

// //     // Multiple skin tone ranges
// //     const isSkinTone1 = r > 95 && g > 40 && b > 20 &&
// //       Math.max(r, g, b) - Math.min(r, g, b) > 15 &&
// //       Math.abs(r - g) > 15 && r > g && r > b;

// //     const isSkinTone2 = r > 60 && r < 255 && g > 30 && g < 200 &&
// //       b > 15 && b < 180 && r > g && g > b;

// //     const isSkinTone3 = r > 80 && g > 50 && b > 30 && r > b && g > b;

// //     if (isSkinTone1 || isSkinTone2 || isSkinTone3) {
// //       skinPixels++;
// //     }
// //   }

// //   const skinRatio = skinPixels / totalPixels;
// //   debugLog(`Skin detection: ${skinPixels} pixels (${(skinRatio * 100).toFixed(2)}%)`);

// //   return skinRatio > 0.01; // Very low threshold
// // };

// // // Detect face-like colors (eyes, hair, etc.)
// // const detectFaceColors = (imageData) => {
// //   const data = imageData.data;
// //   let faceColorPixels = 0;
// //   const totalPixels = data.length / 4;

// //   for (let i = 0; i < data.length; i += 4) {
// //     const r = data[i];
// //     const g = data[i + 1];
// //     const b = data[i + 2];

// //     // Dark colors (hair, eyebrows, eyes)
// //     const isDark = r < 100 && g < 100 && b < 100;

// //     // Medium flesh tones
// //     const isMediumTone = r > 100 && r < 200 && g > 80 && g < 160 &&
// //       b > 60 && b < 140;

// //     if (isDark || isMediumTone) {
// //       faceColorPixels++;
// //     }
// //   }

// //   const faceColorRatio = faceColorPixels / totalPixels;
// //   debugLog(`Face colors: ${(faceColorRatio * 100).toFixed(2)}%`);

// //   return faceColorRatio > 0.1;
// // };

// // // Basic shape detection
// // const detectPersonShapes = (imageData) => {
// //   // Simple vertical edge detection for person outline
// //   const data = imageData.data;
// //   const width = Math.sqrt(data.length / 4);
// //   let verticalEdges = 0;

// //   for (let y = 1; y < width - 1; y++) {
// //     for (let x = 1; x < width - 1; x++) {
// //       const idx = (y * width + x) * 4;
// //       const leftIdx = (y * width + (x - 1)) * 4;
// //       const rightIdx = (y * width + (x + 1)) * 4;

// //       const current = data[idx] + data[idx + 1] + data[idx + 2];
// //       const left = data[leftIdx] + data[leftIdx + 1] + data[leftIdx + 2];
// //       const right = data[rightIdx] + data[rightIdx + 1] + data[rightIdx + 2];

// //       if (Math.abs(current - left) > 100 || Math.abs(current - right) > 100) {
// //         verticalEdges++;
// //       }
// //     }
// //   }

// //   const edgeRatio = verticalEdges / (width * width);
// //   debugLog(`Shape detection: ${(edgeRatio * 100).toFixed(2)}% edges`);

// //   return edgeRatio > 0.02;
// // };

// // // Movement detection
// // let lastImageData = null;
// // const checkForMovement = (imageData) => {
// //   if (!lastImageData) {
// //     lastImageData = new Uint8ClampedArray(imageData.data);
// //     return true; // Assume movement on first frame
// //   }

// //   let differences = 0;
// //   const threshold = 25; // Lower threshold
// //   const sampleRate = 10; // Sample every 10th pixel for performance

// //   for (let i = 0; i < imageData.data.length; i += 4 * sampleRate) {
// //     const diff = Math.abs(imageData.data[i] - lastImageData[i]) +
// //       Math.abs(imageData.data[i + 1] - lastImageData[i + 1]) +
// //       Math.abs(imageData.data[i + 2] - lastImageData[i + 2]);

// //     if (diff > threshold) {
// //       differences++;
// //     }
// //   }

// //   // Update last image data
// //   lastImageData.set(imageData.data);

// //   const movementRatio = differences / (imageData.data.length / (4 * sampleRate));
// //   debugLog(`Movement: ${(movementRatio * 100).toFixed(2)}%`);

// //   return movementRatio > 0.005; // Very low threshold
// // };
import * as tf from '@tensorflow/tfjs';

let faceDetectionModel = null;
let modelLoading = false;

export const initializeFaceDetection = async () => {
  if (faceDetectionModel || modelLoading) return;
  
  try {
    modelLoading = true;
    await tf.ready();
    
    // Try multiple model loading approaches
    try {
      const blazeface = await import('@tensorflow-models/blazeface');
      faceDetectionModel = await blazeface.load();
      console.log('BlazeFace loaded successfully');
    } catch (blazeError) {
      console.warn('BlazeFace failed, trying alternative:', blazeError);
      // Fallback to a simpler detection method
      faceDetectionModel = 'fallback';
    }
    
    modelLoading = false;
  } catch (error) {
    console.error('Error loading face detection:', error);
    modelLoading = false;
    faceDetectionModel = 'fallback';
  }
};

export const detectFace = async (canvas) => {
  try {
    // Ensure model is loaded
    if (!faceDetectionModel && !modelLoading) {
      await initializeFaceDetection();
    }
    
    // Wait for model loading to complete
    while (modelLoading) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Fallback detection if model failed to load
    if (faceDetectionModel === 'fallback') {
      return await fallbackFaceDetection(canvas);
    }
    
    if (!faceDetectionModel) {
      console.warn('No face detection model available, using fallback');
      return await fallbackFaceDetection(canvas);
    }
    
    // Ensure canvas has valid content
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Check if canvas has actual content (not just black/empty)
    const hasContent = checkCanvasContent(imageData);
    if (!hasContent) {
      console.log('Canvas appears empty or black');
      return { faceCount: 0, isFocused: false, faces: [] };
    }
    
    // Convert canvas to tensor with error handling
    let tensor;
    try {
      tensor = tf.browser.fromPixels(canvas);
    } catch (tensorError) {
      console.error('Error creating tensor from canvas:', tensorError);
      return await fallbackFaceDetection(canvas);
    }
    
    // Perform face detection with lower threshold
    let predictions;
    try {
      predictions = await faceDetectionModel.estimateFaces(tensor, false);
    } catch (detectionError) {
      console.error('Face detection failed:', detectionError);
      tensor.dispose();
      return await fallbackFaceDetection(canvas);
    }
    
    // Clean up tensor immediately
    tensor.dispose();
    
    // Process results with lower confidence threshold
    const validFaces = predictions.filter(pred => {
      const confidence = pred.probability ? pred.probability[0] : 0;
      const hasValidBounds = pred.topLeft && pred.bottomRight;
      
      console.log('Face detected with confidence:', confidence);
      
      return confidence > 0.3 && hasValidBounds; // Lowered threshold
    });
    
    const result = {
      faceCount: validFaces.length,
      isFocused: validFaces.length === 1,
      faces: validFaces.map(face => ({
        x: face.topLeft[0],
        y: face.topLeft[1],
        width: face.bottomRight[0] - face.topLeft[0],
        height: face.bottomRight[1] - face.topLeft[1],
        confidence: face.probability[0]
      }))
    };
    
    console.log('Face detection result:', result);
    return result;
    
  } catch (error) {
    console.error('Face detection error:', error);
    return await fallbackFaceDetection(canvas);
  }
};

// Fallback detection using basic image analysis
const fallbackFaceDetection = async (canvas) => {
  try {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Simple heuristic: look for skin-tone colors and face-like patterns
    const skinToneDetected = detectSkinTones(imageData);
    const hasMovement = checkForMovement(imageData);
    
    // If we detect skin tones or movement, assume there's a person
    if (skinToneDetected || hasMovement) {
      console.log('Fallback detection: Person detected via heuristics');
      return {
        faceCount: 1,
        isFocused: true,
        faces: [{
          x: canvas.width * 0.25,
          y: canvas.height * 0.25,
          width: canvas.width * 0.5,
          height: canvas.height * 0.5,
          confidence: 0.7
        }]
      };
    }
    
    return { faceCount: 0, isFocused: false, faces: [] };
  } catch (error) {
    console.error('Fallback detection error:', error);
    return { faceCount: 0, isFocused: false, faces: [] };
  }
};

// Check if canvas has meaningful content
const checkCanvasContent = (imageData) => {
  const data = imageData.data;
  let nonBlackPixels = 0;
  const totalPixels = data.length / 4;
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Count non-black pixels
    if (r > 10 || g > 10 || b > 10) {
      nonBlackPixels++;
    }
  }
  
  const contentRatio = nonBlackPixels / totalPixels;
  return contentRatio > 0.1; // At least 10% non-black content
};

// Simple skin tone detection
const detectSkinTones = (imageData) => {
  const data = imageData.data;
  let skinPixels = 0;
  const totalPixels = data.length / 4;
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // Simple skin tone heuristic
    if (r > 95 && g > 40 && b > 20 && 
        Math.max(r, g, b) - Math.min(r, g, b) > 15 &&
        Math.abs(r - g) > 15 && r > g && r > b) {
      skinPixels++;
    }
  }
  
  const skinRatio = skinPixels / totalPixels;
  return skinRatio > 0.02; // At least 2% skin-tone pixels
};

// Simple movement detection (placeholder)
let lastImageData = null;
const checkForMovement = (imageData) => {
  if (!lastImageData) {
    lastImageData = new Uint8ClampedArray(imageData.data);
    return true; // Assume movement on first frame
  }
  
  let differences = 0;
  const threshold = 30;
  
  for (let i = 0; i < imageData.data.length; i += 4) {
    const diff = Math.abs(imageData.data[i] - lastImageData[i]) +
                 Math.abs(imageData.data[i + 1] - lastImageData[i + 1]) +
                 Math.abs(imageData.data[i + 2] - lastImageData[i + 2]);
    
    if (diff > threshold) {
      differences++;
    }
  }
  
  // Update last image data
  lastImageData.set(imageData.data);
  
  const movementRatio = differences / (imageData.data.length / 4);
  return movementRatio > 0.01; // 1% of pixels changed significantly
};