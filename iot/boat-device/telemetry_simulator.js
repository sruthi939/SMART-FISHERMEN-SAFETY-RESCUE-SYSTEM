const http = require('http');

const BACKEND_HOST = 'localhost';
const BACKEND_PORT = 5000;

// Simulated route for Sea Falcon (KL-07-FISH-102) sailing off Kochi Coast
const routePoints = [
  { lat: 9.9312, lon: 76.2673, speed: 0.0, heading: 240, status: 'Departing Harbor' },
  { lat: 9.9250, lon: 76.2400, speed: 8.2, heading: 245, status: 'Navigating Channel' },
  { lat: 9.9100, lon: 76.2000, speed: 10.5, heading: 250, status: 'Entering Coastal Fishing Zone' },
  { lat: 9.8800, lon: 76.1500, speed: 11.0, heading: 255, status: 'Sailing Deep Sea (LoRa Mesh Active)' },
  { lat: 9.8500, lon: 76.1000, speed: 9.4, heading: 260, status: 'Trawling in Deep Waters' },
  { lat: 9.8200, lon: 76.0500, speed: 6.5, heading: 230, status: 'Approaching High Sea Zone' }
];

let step = 0;
let fuelPct = 90;
let batteryV = 13.4;

function postData(path, payload) {
  const data = JSON.stringify(payload);
  const options = {
    hostname: BACKEND_HOST,
    port: BACKEND_PORT,
    path: path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = http.request(options, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      console.log(`[HTTP ${res.statusCode}] ${path} => ${body.slice(0, 100)}...`);
    });
  });

  req.on('error', (e) => {
    console.error(`❌ Simulator Error connecting to backend: ${e.message}`);
  });

  req.write(data);
  req.end();
}

function sendNextTelemetry() {
  const pt = routePoints[step % routePoints.length];
  step++;
  fuelPct = Math.max(10, fuelPct - 1);
  batteryV = +(13.5 - (Math.random() * 0.4)).toFixed(1);

  const isMeshRelay = step % 3 === 0;
  const signalType = isMeshRelay ? 'LORA_MESH_RELAY' : (step % 2 === 0 ? 'SATELLITE' : 'LTE');

  const payload = {
    boatId: 'b-102',
    latitude: pt.lat + (Math.random() * 0.002 - 0.001),
    longitude: pt.lon + (Math.random() * 0.002 - 0.001),
    speedKnots: pt.speed,
    headingDeg: pt.heading,
    fuelPct: fuelPct,
    batteryV: batteryV,
    tiltAngle: +(Math.random() * 8 + 2).toFixed(1),
    signalType: signalType,
    meshRelayVia: isMeshRelay ? 'KL-07-FISH-105 (Ocean Defender)' : null
  };

  console.log(`📡 [IoT Boat Telemetry] Boat: KL-07-FISH-102 | Pos: (${payload.latitude.toFixed(4)}, ${payload.longitude.toFixed(4)}) | Speed: ${payload.speedKnots} kn | Fuel: ${payload.fuelPct}% | Signal: ${payload.signalType} ${isMeshRelay ? '[Relayed via KL-07-FISH-105]' : ''}`);
  postData('/api/tracking/telemetry', payload);
}

console.log(`
===========================================================
  🛥️ SFSRS IoT TELEMETRY & MOB SIMULATOR RUNNING
  Publishing live boat location to http://${BACKEND_HOST}:${BACKEND_PORT}
  LoRa Mesh Relay & Gyro Roll Capsize Telemetry Active
===========================================================
`);

sendNextTelemetry();
setInterval(sendNextTelemetry, 4000);
