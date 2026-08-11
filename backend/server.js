const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const authRoute = require('./routes/authRoute');
const emergencyRoute = require('./routes/emergencyRoute');
const boatRoute = require('./routes/boatRoute');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoute);
app.use('/api/emergency', emergencyRoute);
app.use('/api/boats', boatRoute);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Smart Fishermen Safety & Rescue System API is active',
    timestamp: new Date()
  });
});

// Socket.IO Real-time Connection
io.on('connection', (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);

  socket.on('vessel_telemetry', (data) => {
    io.emit('telemetry_update', data);
  });

  socket.on('distress_sos', (sosData) => {
    console.log('🚨 DISTRESS SOS RECEIVED:', sosData);
    io.emit('emergency_alert', sosData);
  });

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 SFSRS Backend server running on http://localhost:${PORT}`);
});
