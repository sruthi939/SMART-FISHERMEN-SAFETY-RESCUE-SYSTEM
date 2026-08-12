const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  role: { 
    type: String, 
    enum: ['fisherman', 'family', 'rescue', 'admin'], 
    default: 'fisherman' 
  },
  password: { type: String, required: true },
  aadhaar: { type: String },
  experience: { type: String },
  state: { type: String },
  district: { type: String },
  relationship: { type: String },
  fishermanPhone: { type: String },
  address: { type: String },
  department: { type: String },
  designation: { type: String },
  employeeId: { type: String },
  station: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
