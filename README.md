# SMART-FISHERMEN-SAFETY-RESCUE-SYSTEM
The Smart Fishermen Safety &amp; Rescue System (SFSRS) is an integrated maritime safety solution designed to reduce accidents, improve emergency response, and provide continuous monitoring of fishing boats and fishermen. 
SMART FISHERMEN SAFETY & RESCUE SYSTEM (SFSRS)
Complete Project Manual
Project Title

Smart Fishermen Safety & Rescue System using IoT, GPS, AI and Cloud Computing

Abstract

The Smart Fishermen Safety & Rescue System (SFSRS) is an integrated maritime safety solution designed to reduce accidents, improve emergency response, and provide continuous monitoring of fishing boats and fishermen. Traditional rescue operations often suffer from delayed communication, inaccurate location information, and the absence of real-time monitoring, resulting in the loss of lives and property.

This project combines IoT devices, GPS, satellite communication, LTE networks, AI-based risk prediction, cloud computing, and mobile applications to create a comprehensive safety ecosystem. It provides real-time tracking of boats, monitors crew safety, predicts dangerous weather conditions, automatically detects emergencies, and enables rapid rescue coordination between fishermen, their families, the Coast Guard, and government authorities.

The system is designed to work even in offshore environments by using satellite communication where mobile networks are unavailable. Additionally, wearable emergency devices help locate individual fishermen if they fall overboard, significantly improving rescue efficiency.

Problem Statement

Fishing remains one of the most hazardous occupations worldwide. Many fishermen lose their lives each year due to cyclones, rough seas, equipment failures, and delayed rescue operations.

The major problems are:

Lack of real-time boat tracking
Poor communication in deep-sea areas
Delayed rescue response
Sudden weather changes
Missing fishermen after falling overboard
Families have no information about the boat's status
Manual record keeping
Lack of centralized monitoring
No automatic emergency detection
Existing System

Currently, many fishing boats depend on:

Mobile phones
Marine radio communication
Manual GPS devices
Human observation
Limitations
Mobile networks disappear far from shore.
GPS devices cannot send location independently.
Families cannot track the boat.
Rescue teams spend hours searching.
Weather alerts are often delayed.
Missing fishermen cannot be tracked individually.
Proposed System

The proposed system integrates smart hardware, cloud services, AI, and mobile applications into one platform.

The system consists of:

Smart Boat IoT Device
Fishermen Wearable Safety Device
Fishermen Mobile Application
Family Mobile Application
Rescue Control Dashboard
Government Monitoring Portal
AI Safety Prediction Engine
Cloud Infrastructure
Project Objectives
Reduce loss of fishermen's lives.
Provide real-time GPS tracking.
Enable one-touch SOS alerts.
Predict dangerous weather.
Track individual fishermen.
Improve rescue efficiency.
Provide transparency for government agencies.
Digitize fisheries management.
System Architecture
GPS Satellites
        │
Weather Services
        │
Smart Boat Device
        │
LTE / Satellite Communication
        │
Cloud Server
        │
────────────────────────────────────────
│          │           │             │
Family App Fisherman App Rescue Govt
Main Components
1. Smart Boat Device

Installed permanently inside every fishing boat.

Components
ESP32
GPS Receiver
LTE Module
Satellite Communication Module
SOS Button
Engine Sensor
Fuel Sensor
Battery Monitor
Water Leakage Sensor
Tilt Sensor
Solar Charging
Backup Battery
Functions
Live GPS Tracking
Emergency Alert
Boat Health Monitoring
Fuel Monitoring
Battery Monitoring
Weather Alert
Automatic Accident Detection
2. Fishermen Smart Wearable

Every fisherman wears a waterproof smart band or life jacket beacon.

Components
GPS Receiver
Water Sensor
Accelerometer
SOS Button
LED Flash Light
Buzzer
Rechargeable Battery
LTE/Satellite Communication (or AIS MOB beacon)
Purpose

If a fisherman falls into the sea:

Detect water entry
Detect separation from the boat
Send emergency alert
Transmit live location
Help rescue teams locate the individual
3. Fishermen Mobile Application
Features
Live Boat Location
Weather Forecast
Cyclone Alerts
Navigation Assistance
Safe Fishing Zones
SOS Button
Boat Health
Crew Information
Emergency Contacts
4. Family Application
Features
Live Boat Tracking
Estimated Return Time
Emergency Alerts
SOS Notifications
Rescue Progress
Communication
5. Rescue Dashboard

Used by:

Coast Guard
Marine Police
Disaster Management
Features
Live Boat Map
Live Fishermen Map
SOS Management
Rescue Assignment
Communication
Incident Reports
Rescue Analytics
6. Government Portal

Used by:

Fisheries Department
District Administration
State Government
Features
Boat Registration
Fishermen Registration
Insurance Records
License Verification
Subsidy Management
Rescue Statistics
Working Principle
Normal Operation
Boat starts from harbor.
IoT device activates.
GPS starts receiving location.
Weather information is downloaded.
Live tracking begins.
Families and authorities monitor the trip.
Emergency Situation

If the captain presses SOS:

SOS Button

↓

GPS Coordinates

↓

Cloud Server

↓

Family

↓

Rescue Team

↓

Nearest Coast Guard

↓

Live Rescue Tracking

↓

Case Closed
Overboard Situation

If one fisherman falls into the sea:

Water sensor activates.
Wearable detects separation from the boat.
GPS records the person's location.
Satellite/LTE sends distress signal.
Boat receives missing crew alert.
Rescue dashboard displays the person's position.
Family receives emergency notification.
Rescue begins immediately.
AI Risk Prediction

The AI engine analyzes:

Wind speed
Rain
Sea currents
Wave height
Boat speed
Fuel level
Battery status
Historical accidents

The system classifies risk as:

Safe
Moderate Risk
High Risk
Return Immediately
Technologies Used
Frontend
React.js
Tailwind CSS
Leaflet/Mapbox
Socket.IO
Backend
Node.js
Express.js
JWT Authentication
REST API
MQTT Broker
Database
PostgreSQL
Redis
Cloud
AWS / Azure
Firebase Cloud Messaging
IoT
ESP32
NEO-M8N GPS
SIM7600 LTE Module
Satellite Modem
Waterproof Sensors
Advantages
Saves fishermen's lives
Faster rescue operations
Live boat tracking
Individual fisherman tracking
Automatic emergency detection
Weather forecasting
Family monitoring
Government transparency
Digital record management
AI-based risk prediction
Boat health monitoring
Scalable nationwide deployment
Disadvantages
High implementation cost
Satellite communication is expensive
Regular maintenance required
Requires user training
Internet/LTE coverage limitations
Hardware exposed to harsh marine environments
Cybersecurity risks
Dependence on government coordination
Continuous cloud operational costs
Problems and Solutions
Problem	Cause	Solution
Boat goes missing	No live tracking	Install IoT GPS tracker with LTE/Satellite communication
Fisherman falls into sea	Only boat is tracked	Issue a wearable GPS/AIS emergency beacon to each crew member
SOS not received	No mobile network	Use satellite communication as backup
Delayed rescue	Unknown location	Live tracking dashboard with automatic rescue dispatch
Sudden cyclone	No timely warning	Integrate marine weather APIs and AI risk prediction
Engine failure	No monitoring	Install engine and battery sensors with preventive alerts
Family has no information	No communication	Family tracking application with notifications
False SOS alerts	Accidental activation	Require confirmation when possible and allow rescue verification
GPS data misuse	Weak security	Encrypt data, use secure authentication, and access controls
Device power loss	Battery depleted	Backup battery with optional solar charging
Saltwater damage	Marine environment	Use IP68-rated waterproof and corrosion-resistant hardware
Rescue resources are limited	Physical constraints	Prioritize nearest rescue assets using AI-assisted dispatch
Estimated Budget (Prototype)
Component	Approximate Cost (INR)
ESP32	₹600
GPS Module	₹1,500
LTE Module	₹3,000
Waterproof Sensors	₹2,000
SOS Button	₹200
Backup Battery	₹1,500
Solar Charger	₹2,000
Wearable Device	₹6,000
Cloud Infrastructure	₹2,000/month
Mobile Applications	Development Cost
Dashboard	Development Cost
Future Enhancements
Drone-assisted search operations.
Integration with official AIS and VMS systems.
Automatic capsize detection.
Voice-controlled emergency activation.
Machine learning for improved accident prediction.
Offline mesh networking between nearby fishing boats.
Smart life jackets with automatic inflation and distress signaling.
Conclusion

The Smart Fishermen Safety & Rescue System is a practical, scalable, and socially impactful solution that combines IoT, GPS, AI, cloud computing, and modern communication technologies to address critical challenges faced by fishing communities. By enabling real-time tracking, individual crew safety monitoring, weather-based risk prediction, and coordinated rescue operations, the system can significantly reduce search times and improve survival rates.

While challenges such as implementation cost, communication coverage, maintenance, and government coordination remain, these can be mitigated through phased deployment, subsidies, robust engineering, and collaboration with maritime authorities. With these measures, SFSRS has the potential to become a reliable and sustainable safety platform for fishermen at regional and national levels.

Project Innovation

Unlike many existing solutions that only track the fishing boat, this project introduces individual fisherman tracking through wearable emergency devices, AI-based maritime risk prediction, real-time family notifications, and a unified cloud platform connecting fishermen, families, rescue agencies, and government departments. This integrated approach addresses both prevention and response, making the system more effective than conventional GPS-only tracking solutions.

Today 12:04 AM
okey give the folder structure for create this as an app

Yes. For this project, I recommend not putting everything into one frontend. Since you want a real-world application, separate the fisherman app, family app, rescue dashboard, government/admin panel, backend, and IoT firmware.

Recommended Project Folder Structure
smart-fishermen-safety-system/
│
├── README.md
├── .gitignore
├── docker-compose.yml
├── .env.example
│
├── apps/
│   │
│   ├── fisherman-app/
│   │   ├── src/
│   │   │   ├── assets/
│   │   │   ├── components/
│   │   │   │   ├── Navbar/
│   │   │   │   ├── BottomNavigation/
│   │   │   │   ├── WeatherCard/
│   │   │   │   ├── BoatStatus/
│   │   │   │   ├── SOSButton/
│   │   │   │   ├── LocationMap/
│   │   │   │   └── CrewList/
│   │   │   │
│   │   │   ├── pages/
│   │   │   │   ├── Login/
│   │   │   │   ├── Register/
│   │   │   │   ├── Dashboard/
│   │   │   │   ├── LiveTracking/
│   │   │   │   ├── Weather/
│   │   │   │   ├── Crew/
│   │   │   │   ├── Emergency/
│   │   │   │   ├── BoatStatus/
│   │   │   │   └── Profile/
│   │   │   │
│   │   │   ├── services/
│   │   │   ├── hooks/
│   │   │   ├── context/
│   │   │   ├── routes/
│   │   │   └── utils/
│   │   │
│   │   └── package.json
│   │
│   ├── family-app/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── BoatCard/
│   │   │   │   ├── LiveMap/
│   │   │   │   ├── EmergencyAlert/
│   │   │   │   ├── RescueStatus/
│   │   │   │   └── Notification/
│   │   │   │
│   │   │   ├── pages/
│   │   │   │   ├── Login/
│   │   │   │   ├── Dashboard/
│   │   │   │   ├── BoatTracking/
│   │   │   │   ├── Emergency/
│   │   │   │   ├── Notifications/
│   │   │   │   └── Profile/
│   │   │   │
│   │   │   ├── services/
│   │   │   ├── hooks/
│   │   │   ├── context/
│   │   │   └── routes/
│   │   │
│   │   └── package.json
│   │
│   ├── rescue-dashboard/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── LiveMap/
│   │   │   │   ├── BoatMarker/
│   │   │   │   ├── FishermanMarker/
│   │   │   │   ├── SOSPanel/
│   │   │   │   ├── RescueTeam/
│   │   │   │   ├── WeatherLayer/
│   │   │   │   └── AlertPanel/
│   │   │   │
│   │   │   ├── pages/
│   │   │   │   ├── Dashboard/
│   │   │   │   ├── LiveBoats/
│   │   │   │   ├── Emergencies/
│   │   │   │   ├── RescueOperations/
│   │   │   │   ├── Fishermen/
│   │   │   │   ├── Boats/
│   │   │   │   ├── Weather/
│   │   │   │   ├── Reports/
│   │   │   │   └── Settings/
│   │   │   │
│   │   │   ├── services/
│   │   │   ├── hooks/
│   │   │   ├── context/
│   │   │   └── routes/
│   │   │
│   │   └── package.json
│   │
│   └── government-admin/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   │   ├── Dashboard/
│       │   │   ├── Fishermen/
│       │   │   ├── Boats/
│       │   │   ├── Licenses/
│       │   │   ├── Insurance/
│       │   │   ├── RescueReports/
│       │   │   ├── AccidentReports/
│       │   │   ├── Analytics/
│       │   │   └── Users/
│       │   ├── services/
│       │   ├── hooks/
│       │   └── routes/
│       │
│       └── package.json
│
├── backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── cloud.js
│   │   │   └── environment.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── boatController.js
│   │   │   ├── fishermanController.js
│   │   │   ├── trackingController.js
│   │   │   ├── emergencyController.js
│   │   │   ├── rescueController.js
│   │   │   ├── weatherController.js
│   │   │   └── notificationController.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Fisherman.js
│   │   │   ├── Boat.js
│   │   │   ├── Crew.js
│   │   │   ├── GPSLocation.js
│   │   │   ├── Wearable.js
│   │   │   ├── Emergency.js
│   │   │   ├── Rescue.js
│   │   │   ├── Weather.js
│   │   │   └── Notification.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── boatRoutes.js
│   │   │   ├── fishermanRoutes.js
│   │   │   ├── trackingRoutes.js
│   │   │   ├── emergencyRoutes.js
│   │   │   ├── rescueRoutes.js
│   │   │   ├── weatherRoutes.js
│   │   │   └── adminRoutes.js
│   │   │
│   │   ├── services/
│   │   │   ├── gpsService.js
│   │   │   ├── satelliteService.js
│   │   │   ├── weatherService.js
│   │   │   ├── notificationService.js
│   │   │   ├── rescueService.js
│   │   │   └── aiService.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── roleMiddleware.js
│   │   │   ├── errorMiddleware.js
│   │   │   └── validationMiddleware.js
│   │   │
│   │   ├── sockets/
│   │   │   ├── trackingSocket.js
│   │   │   ├── emergencySocket.js
│   │   │   └── rescueSocket.js
│   │   │
│   │   ├── mqtt/
│   │   │   └── mqttClient.js
│   │   │
│   │   ├── utils/
│   │   └── server.js
│   │
│   └── package.json
│
├── iot/
│   │
│   ├── boat-device/
│   │   ├── src/
│   │   │   ├── gps/
│   │   │   ├── lte/
│   │   │   ├── satellite/
│   │   │   ├── sensors/
│   │   │   ├── sos/
│   │   │   ├── power/
│   │   │   └── main.cpp
│   │   └── README.md
│   │
│   └── fisherman-wearable/
│       ├── src/
│       │   ├── gps/
│       │   ├── waterDetection/
│       │   ├── accelerometer/
│       │   ├── sos/
│       │   ├── communication/
│       │   └── main.cpp
│       └── README.md
│
├── ai/
│   ├── weather-risk/
│   │   ├── data/
│   │   ├── models/
│   │   ├── training/
│   │   └── predict.py
│   │
│   └── accident-prediction/
│       ├── data/
│       ├── models/
│       ├── training/
│       └── predict.py
│
├── database/
│   ├── migrations/
│   ├── seed/
│   └── README.md
│
├── docs/
│   ├── requirements/
│   ├── architecture/
│   ├── api/
│   ├── database/
│   ├── hardware/
│   ├── testing/
│   └── deployment/
│
└── scripts/
    ├── setup.sh
    ├── seedDatabase.js
    └── deploy.sh
How the Parts Connect

The most important thing is to understand this flow:

                ┌──────────────────┐
                │   GPS SATELLITE  │
                └────────┬─────────┘
                         ↓
                ┌──────────────────┐
                │  BOAT IoT DEVICE │
                │                  │
                │ GPS              │
                │ Sensors          │
                │ SOS              │
                └────────┬─────────┘
                         ↓
                  LTE / SATELLITE
                         ↓
                ┌──────────────────┐
                │     BACKEND      │
                │                  │
                │ Node + Express   │
                │ MQTT             │
                │ Socket.IO        │
                └────────┬─────────┘
                         ↓
                 ┌───────────────┐
                 │   DATABASE    │
                 └───────┬───────┘
                         ↓
       ┌─────────────────┼──────────────────┐
       ↓                 ↓                  ↓
Fisherman App       Family App       Rescue Dashboard
                                           ↓
                                    Government Admin
Most Important Part: Missing Fisherman

For your specific problem, don't design the system around boat tracking alone.

Use:

Boat
 │
 ├── GPS Device
 │
 ├── Crew Member 1 → Wearable/Beacon
 ├── Crew Member 2 → Wearable/Beacon
 ├── Crew Member 3 → Wearable/Beacon
 └── Crew Member 4 → Wearable/Beacon

The backend maintains a crew manifest.

Example:

Boat: KL-07-FISH-102

Crew:
────────────────────────
Fisherman 001  ✓
Fisherman 002  ✓
Fisherman 003  ✗  ← Missing
Fisherman 004  ✓
────────────────────────

When a wearable detects a man-overboard event:

Wearable
   ↓
Emergency Detection
   ↓
GPS Location
   ↓
LTE / Satellite
   ↓
Backend
   ↓
Emergency Record
   ↓
Rescue Dashboard
   ↓
Family Notification

This is the feature that can make your project substantially different from a basic boat GPS tracker.

Recommended Development Order

Don't build everything at once.

Phase 1 — Backend + Database

Build:

Authentication
     ↓
Fishermen
     ↓
Boats
     ↓
Crew
     ↓
GPS Locations
     ↓
Emergency
     ↓
Rescue
Phase 2 — Rescue Dashboard

Build the control center first:

Dashboard
   ↓
Live Map
   ↓
Boats
   ↓
Fishermen
   ↓
SOS Alerts
   ↓
Rescue Management
Phase 3 — Fisherman App

Build:

Login
 ↓
Dashboard
 ↓
Boat Status
 ↓
Weather
 ↓
Crew
 ↓
SOS
 ↓
Live Tracking
Phase 4 — Family App

Build:

Login
 ↓
My Fisherman
 ↓
Boat Location
 ↓
Trip Status
 ↓
Emergency
 ↓
Rescue Status
Phase 5 — IoT Prototype

Start with:

ESP32
 +
GPS
 +
SOS Button

Then add:

LTE
 ↓
Sensors
 ↓
Backup Battery
 ↓
Satellite communication
Phase 6 — Wearable

Prototype:

ESP32
 +
GPS
 +
Water Sensor
 +
Accelerometer
 +
SOS

Then integrate it with the boat.

Phase 7 — AI

Only after you have basic tracking working, add:

Weather Data
     +
Historical Data
     ↓
AI Model
     ↓
Risk Score
     ↓
Safety Alert
Recommended Technology Choice

Since you've already been working with React and Node.js, I would keep the software stack familiar:

Frontend
React.js
Tailwind CSS
Leaflet

Backend
Node.js
Express.js
Socket.IO

Database
PostgreSQL

Real-time IoT
MQTT

Authentication
JWT

IoT
ESP32
GNSS
LTE

Emergency
Satellite/AIS/EPIRB/PLB depending on deployment requirements

AI
Python
FastAPI
Machine Learning

Important: for a college prototype, you do not need to implement a real satellite network yourself. Build the communication layer so that it can support LTE first and define a satellite adapter/interface for future integration. For an actual maritime deployment, use certified maritime distress/safety equipment rather than relying on a homemade ESP32 device as the sole emergency system.
