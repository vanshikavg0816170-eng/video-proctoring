const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Import routes
const interviewRoutes = require('./routes/interviews');
const eventRoutes = require('./routes/events');
const reportRoutes = require('./routes/reports');

// Import database connection
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for video uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/interviews', interviewRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/reports', reportRoutes);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('join-interview', (interviewId) => {
    socket.join(interviewId);
    console.log(`Socket ${socket.id} joined interview ${interviewId}`);
  });
  
  socket.on('proctoring-event', (eventData) => {
    // Broadcast event to all clients in the interview room
    socket.to(eventData.interviewId).emit('new-alert', eventData);
  });
  
  socket.on('end-interview', (interviewId) => {
    socket.leave(interviewId);
    console.log(`Interview ${interviewId} ended for socket ${socket.id}`);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, io };
