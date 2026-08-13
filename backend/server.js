const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const env = require('./config/environment');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

// Route Imports
const authRoute = require('./routes/authRoute');
const fishermanRoute = require('./routes/fishermanRoute');
const familyRoute = require('./routes/familyRoute');
const rescueRoute = require('./routes/rescueRoute');
const adminRoute = require('./routes/adminRoute');
const boatRoute = require('./routes/boatRoute');
const emergencyRoute = require('./routes/emergencyRoute');
const locationRoute = require('./routes/locationRoute');
const tripRoute = require('./routes/tripRoute');
const alertRoute = require('./routes/alertRoute');
const reportRoute = require('./routes/reportRoute');
const documentRoute = require('./routes/documentRoute');

const app = express();
const server = http.createServer(app);

// Connect to Database
connectDB();

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Attach Socket.IO to Express App instance
app.set('io', io);

// Global Middleware
app.use(cors());
app.use(express.json());

// API Routes Mounting
app.use('/api/auth', authRoute);
app.use('/api/fishermen', fishermanRoute);
app.use('/api/families', familyRoute);
app.use('/api/rescue', rescueRoute);
app.use('/api/admin', adminRoute);
app.use('/api/boats', boatRoute);
app.use('/api/emergency', emergencyRoute);
app.use('/api/locations', locationRoute);
app.use('/api/trips', tripRoute);
app.use('/api/alerts', alertRoute);
app.use('/api/reports', reportRoute);
app.use('/api/documents', documentRoute);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Smart Fishermen Safety & Rescue System API Server is operational',
    timestamp: new Date()
  });
});

// Socket.IO Real-time Connection Engine & Event Bus
io.on('connection', (socket) => {
  console.log(`🔌 Client connected to Real-Time Socket Engine: ${socket.id}`);

  // Room Join Events (Fisherman, Family, Rescue Officer, Admin)
  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`📡 Socket ${socket.id} joined room: ${room}`);
  });

  // 1. GPS Transponder Location Telemetry
  socket.on('location:update', (locationData) => {
    console.log('📍 GPS Transponder Location Update:', locationData);
    io.emit('location:update', locationData);
  });

  // 2. Emergency SOS Distress Signal
  socket.on('emergency:created', (sosData) => {
    console.log('🚨 DISTRESS SOS CREATED:', sosData);
    io.emit('emergency:created', sosData);
  });

  // 3. Rescue Acceptance & Assignment
  socket.on('emergency:accepted', (data) => {
    console.log('🛡️ EMERGENCY ACCEPTED BY RESCUE OFFICER:', data);
    io.emit('emergency:accepted', data);
    io.emit('rescue:assigned', data);
  });

  // 4. Rescue Status Lifecycle Progress
  socket.on('rescue:status', (statusData) => {
    console.log('🔄 RESCUE OPERATION STATUS UPDATE:', statusData);
    io.emit('rescue:status', statusData);
  });

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// Error Handling Middleware
app.use(errorHandler);

const PORT = env.PORT;
server.listen(PORT, () => {
  console.log(`🚀 SFSRS Central Backend Server running on http://localhost:${PORT}`);
});
