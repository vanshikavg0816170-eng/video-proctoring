import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

let objectDetectionModel = null;

export const initializeObjectDetection = async () => {
  try {
    await tf.ready();
    objectDetectionModel = await cocoSsd.load();
    console.log('Object detection model loaded');
  } catch (error) {
    console.error('Error loading object detection model:', error);
  }
};

export const detectObjects = async (canvas) => {
  if (!objectDetectionModel) {
    await initializeObjectDetection();
  }
  
  try {
    const predictions = await objectDetectionModel.detect(canvas);
    
    // Filter for suspicious objects
    const suspiciousObjects = predictions.filter(prediction => {
      const suspiciousClasses = [
        'cell phone',
        'book',
        'laptop',
        'person',
        'tv',
        'remote',
        'keyboard',
        'mouse'
      ];
      return suspiciousClasses.includes(prediction.class) && prediction.score > 0.5;
    });
    
    return suspiciousObjects;
  } catch (error) {
    console.error('Object detection error:', error);
    return [];
  }
};

// Additional object detection for specific items
export const detectProhibitedItems = async (canvas) => {
  const objects = await detectObjects(canvas);
  
  const prohibitedItems = {
    'cell phone': 'high',
    'book': 'medium',
    'laptop': 'high',
    'tv': 'medium',
    'remote': 'low'
  };
  
  return objects.map(obj => ({
    ...obj,
    severity: prohibitedItems[obj.class] || 'low'
  }));
};
