# Smart Fishermen Safety & Rescue System (SFSRS)

> **Integrated Maritime Safety Ecosystem using IoT, GPS, AI, Cloud Computing & Flutter Cross-Platform Mobile/Web App**

SFSRS is an integrated maritime safety solution designed to reduce accidents, improve emergency response, and provide continuous monitoring of fishing boats and individual fishermen.

The frontend is consolidated into a single, unified Flutter application (**`smart_fishermen_app`**) supporting all four primary role portals (**Fisherman**, **Family**, **Coast Guard Rescue Officer**, and **Government Admin**).

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
│   └── smart_fishermen_app/      # Unified Flutter Application (Android, iOS, Web)
│
├── backend/                      # Node.js + Express + Socket.IO Server (Port 5000)
│   ├── src/
│   │   ├── config/ (db, env)
│   │   ├── controllers/ (auth, boat, emergency, tracking, rescue, weather, admin)
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
└── database/                     # Seed Data & Cleanup Scripts
    ├── seed.js
    ├── schema.sql
    ├── cleanup.js
    └── sfsrs_data.json
```

---

## ⚡ Quick Start Guide

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Seed Database & Cleanup Legacy Folders
```bash
npm run seed
```

### 3. Start Backend Server
```bash
npm run start:backend
# Backend runs on http://localhost:5000
```

### 4. Run Flutter Application
```bash
cd apps/smart_fishermen_app
flutter run
```

---

## 📜 License
Licensed under the MIT License.
