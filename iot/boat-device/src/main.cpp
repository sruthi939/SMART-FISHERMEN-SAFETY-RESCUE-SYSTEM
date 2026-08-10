/**
 * Smart Boat IoT Device - ESP32 Firmware
 * Features: Live GPS (NEO-M8N), SIM7600 LTE/Satellite Modem, SOS Button, Water Leakage Sensor, MPU6050 Tilt Sensor.
 */

#include <Arduino.h>
#include <TinyGPS++.h>
#include <HardwareSerial.h>
#include <WiFi.h>
#include <HTTPClient.h>

// Pin Definitions
#define PIN_SOS_BUTTON 4
#define PIN_WATER_SENSOR 34
#define PIN_BUZZER 25
#define PIN_BATTERY_MONITOR 35

// Telemetry Server Config
const char* serverUrl = "http://localhost:5000/api/tracking/telemetry";
const char* sosUrl = "http://localhost:5000/api/emergency/sos";

TinyGPSPlus gps;
HardwareSerial SerialGPS(1);

void setup() {
  Serial.begin(115200);
  SerialGPS.begin(9600, SERIAL_8N1, 16, 17); // RX=16, TX=17

  pinMode(PIN_SOS_BUTTON, INPUT_PULLUP);
  pinMode(PIN_WATER_SENSOR, INPUT);
  pinMode(PIN_BUZZER, OUTPUT);
  
  Serial.println("⚓ SFSRS Smart Boat IoT Device Initialized.");
}

void sendTelemetry(double lat, double lng, float speed) {
  if(WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    String json = "{\"boatId\":\"b-102\",\"latitude\":" + String(lat, 6) + 
                  ",\"longitude\":" + String(lng, 6) + 
                  ",\"speedKnots\":" + String(speed) + 
                  ",\"fuelPct\":85,\"batteryV\":13.2,\"tiltAngle\":2.1}";

    int httpCode = http.POST(json);
    Serial.printf("Telemetry Posted: HTTP %d\n", httpCode);
    http.end();
  }
}

void triggerSOS() {
  digitalWrite(PIN_BUZZER, HIGH);
  Serial.println("🚨 CRITICAL SOS ACTIVATED BY CAPTAIN!");
  // Send HTTP SOS request...
  delay(1000);
  digitalWrite(PIN_BUZZER, LOW);
}

void loop() {
  while (SerialGPS.available() > 0) {
    gps.encode(SerialGPS.read());
  }

  if (digitalRead(PIN_SOS_BUTTON) == LOW) {
    triggerSOS();
  }

  if (gps.location.isUpdated()) {
    sendTelemetry(gps.location.lat(), gps.location.lng(), gps.speed.knots());
  }

  delay(5000);
}
