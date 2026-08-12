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

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Smart Fishermen Safety & Rescue System API Server is operational',
    timestamp: new Date()
  });
});

// Socket.IO Real-time Connection Engine
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

// Error Handling Middleware
app.use(errorHandler);

const PORT = env.PORT;
server.listen(PORT, () => {
  console.log(`🚀 SFSRS Backend server running on http://localhost:${PORT}`);
});
