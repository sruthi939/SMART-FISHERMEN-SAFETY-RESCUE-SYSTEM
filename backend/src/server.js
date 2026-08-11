const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const { initDatabase } = require('./config/database');
const { cleanUnwantedAppFolders } = require('../../database/cleanup');
const emergencyController = require('./controllers/emergencyController');
const trackingController = require('./controllers/trackingController');

const familyController = require('./controllers/familyController');

// Clean unwanted legacy app folders & initialize database
cleanUnwantedAppFolders();
initDatabase();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
  }
});

// Attach socket IO instance to controllers
emergencyController.setSocketIO(io);
trackingController.setSocketIO(io);
familyController.setSocketIO(io);

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/boats', require('./routes/boatRoutes'));
app.use('/api/emergency', require('./routes/emergencyRoutes'));
app.use('/api/tracking', require('./routes/trackingRoutes'));
app.use('/api/rescue', require('./routes/rescueRoutes'));
app.use('/api/weather', require('./routes/weatherRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/family', require('./routes/familyRoutes'));

// Root Status Endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'Smart Fishermen Safety & Rescue System (SFSRS)',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: [
      '/api/auth/login',
      '/api/boats',
      '/api/emergency',
      '/api/tracking/telemetry',
      '/api/rescue/units',
      '/api/weather',
      '/api/admin/dashboard'
    ]
  });
});

// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log(`🔌 Client connected to SFSRS real-time socket stream: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`
============================================================
  ⚓ SMART FISHERMEN SAFETY & RESCUE SYSTEM (SFSRS) BACKEND
  📡 Server running on http://localhost:${PORT}
  🔌 Socket.IO connected & listening for IoT Telemetry & SOS
============================================================
  `);
});
