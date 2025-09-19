import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interview API
export const createInterview = async (interviewData) => {
  return await api.post('/interviews', interviewData);
};

export const getInterview = async (id) => {
  return await api.get(`/interviews/${id}`);
};

export const updateInterview = async (id, data) => {
  return await api.put(`/interviews/${id}`, data);
};

// Events API
export const saveEvent = async (eventData) => {
  return await api.post('/events', eventData);
};

export const getEvents = async (interviewId) => {
  return await api.get(`/events/interview/${interviewId}`);
};

// Reports API
export const getReport = async (interviewId) => {
  return await api.get(`/reports/${interviewId}`);
};

export const generateReport = async (interviewId) => {
  return await api.post(`/reports/generate/${interviewId}`);
};

// Upload video
export const uploadVideo = async (videoBlob, interviewId) => {
  const formData = new FormData();
  formData.append('video', videoBlob);
  formData.append('interviewId', interviewId);
  
  return await api.post('/upload/video', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export default api;
