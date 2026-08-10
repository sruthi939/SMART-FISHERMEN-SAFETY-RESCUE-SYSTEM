# Smart Fishermen Safety & Rescue System (SFSRS)

> **Integrated Maritime Safety Ecosystem using IoT, GPS, AI, Cloud Computing & Real-time Web Apps**

SFSRS is an end-to-end maritime safety solution designed to reduce accidents, improve emergency response, and provide continuous monitoring of fishing boats and individual fishermen. Traditional rescue operations often suffer from delayed communication, inaccurate location information, and the absence of real-time tracking.

SFSRS bridges this gap by combining IoT boat devices, waterproof crew wearable beacons (Man-Overboard MOB detection), satellite/LTE telemetry, AI weather risk prediction, and role-specific web applications for Fishermen, Families, Coast Guard Rescue Command, and Government Fisheries Administration.

---

## 🏗️ System Architecture & Monorepo Structure

```
smart-fishermen-safety-system/
├── docker-compose.yml
├── .env.example
├── README.md
├── package.json
│
├── apps/
│   ├── portal-hub/               # Central Command Suite Launcher (Port 3000)
│   ├── fisherman-app/            # Fisherman Mobile Web App (Port 3001)
│   ├── family-app/               # Family Tracking App (Port 3002)
│   ├── rescue-dashboard/         # Coast Guard Rescue Command Center (Port 3003)
│   └── government-admin/         # State Fisheries Dept Admin Portal (Port 3004)
│
├── backend/                      # Node.js + Express + Socket.IO Server (Port 5000)
│   ├── src/
│   │   ├── config/ (db, env)
│   │   ├── controllers/ (auth, boat, emergency, tracking, rescue, weather, admin)
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/ (aiService, gpsService, rescueService)
│   │   └── server.js
│   └── package.json
│
├── iot/                          # IoT Device Firmware & Live Simulators
│   ├── boat-device/ (ESP32 C++ main.cpp + telemetry_simulator.js)
│   └── fisherman-wearable/ (C++ MOB beacon main.cpp)
│
├── ai/                           # AI Safety Risk Engine
│   ├── weather-risk/ (predict.py)
│   └── accident-prediction/ (predict.py)
│
└── database/                     # Seed Data & Schema Definitions
    ├── seed.js
    ├── schema.sql
    └── sfsrs_data.json
```

---

## 🌟 Key Application Features

### 1. 🛥️ Fisherman Mobile App (`apps/fisherman-app` - Port 3001)
- **3-Second Hold SOS Emergency Button** (prevents accidental triggers).
- **Interactive Navigation Map (Leaflet)** showing live boat position, speed (knots), heading, and safe fishing zone boundaries.
- **ESP32 Boat Telemetry Gauges:** Diesel fuel level, battery voltage, hull water bilge sensor alert, and roll stability tilt sensor.
- **Onboard Crew & Wearable Status:** Real-time beacon connection monitoring for each crew member.
- **AI Weather Safety Advisory:** Dynamic storm classification (`SAFE`, `MODERATE_RISK`, `RETURN_IMMEDIATELY`).

### 2. 🛟 Family Safety App (`apps/family-app` - Port 3002)
- **Peace-of-Mind Live Radar:** Visual map tracking the boat relative to home port (Kochi Harbor).
- **Return ETA Predictions:** Estimated time of arrival & offshore nautical mile distance.
- **Crew Safety Card:** Confirms whether crew member is safe on board or in distress.
- **Instant SOS Push Alerts:** Visual emergency banners and direct one-touch calls to Coast Guard Helpline (1554).

### 3. 🚨 Coast Guard Rescue Command (`apps/rescue-dashboard` - Port 3003)
- **Dark Operations Center UI:** Tactical Leaflet map displaying active fishing vessels, Coast Guard patrol vessels (`CG-Kochi-1`), and naval helicopters.
- **Pulsing SOS Distress Queue:** Instant alerts for boat SOS and individual Man-Overboard (MOB) wearable signals with precise GPS coordinates.
- **One-Click Dispatch Console:** Assign nearest rescue assets and update mission status (`DISPATCHED`, `RESCUED`).

### 4. 🏛️ Government & Fisheries Portal (`apps/government-admin` - Port 3004)
- **State Vessel Registry:** Registered boats, owner info, license status (`ACTIVE`, `PENDING_RENEWAL`), and insurance validity.
- **New Boat Registration Form:** Issue official registration numbers & digital safety compliance certificates.
- **Fuel Subsidy Tracker:** Direct Benefit Transfer (DBT) disbursement analytics.

### 5. 📡 IoT Telemetry Simulator (`iot/boat-device/telemetry_simulator.js`)
- Simulates real-time boat movement along coastal fishing routes off Kochi, updating GPS coordinates, fuel reserves, battery voltage, and signal fallback (LTE / Satellite) every 4 seconds.

---

## ⚡ Quick Start Guide

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Seed Database
```bash
npm run seed
```

### 3. Start Backend Server
```bash
npm run start:backend
# Backend runs on http://localhost:5000
```

### 4. Start IoT Telemetry Simulator (Optional for Live Data Stream)
```bash
npm run start:simulator
```

### 5. Launch Web Applications
- **Central Portal Hub:** `npm run dev:hub` (http://localhost:3000)
- **Fisherman App:** `npm run dev:fisherman` (http://localhost:3001)
- **Family App:** `npm run dev:family` (http://localhost:3002)
- **Rescue Control Dashboard:** `npm run dev:rescue` (http://localhost:3003)
- **Government Admin:** `npm run dev:admin` (http://localhost:3004)

---

## 🛠️ Technology Stack
- **Frontend:** React 18, Vite, Tailwind CSS, Leaflet Maps, Lucide Icons, Socket.IO Client.
- **Backend:** Node.js, Express, Socket.IO, JWT Authentication, JSON/SQLite Database engine.
- **IoT Firmware:** ESP32 C++, NEO-M8N GPS, SIM7600 LTE/Sat modem, water immersion sensors, tilt accelerometers.
- **AI Engine:** Python (FastAPI/Node wrapper) for machine learning risk score calculation.

---

## 📜 License
Licensed under the MIT License.
