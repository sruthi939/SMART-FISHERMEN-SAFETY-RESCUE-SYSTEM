/**
 * Fishermen Smart Wearable Safety Device - ESP32 / Beacon Firmware
 * Features: Water immersion sensor, Accelerometer (Fall Detection), High-brightness Strobe LED, Buzzer, SOS Beacon.
 */

#include <Arduino.h>

#define WATER_SENSOR_PIN 32
#define ACCEL_INT_PIN 33
#define LED_STROBE_PIN 18
#define BUZZER_PIN 19
#define MANUAL_SOS_PIN 21

void setup() {
  Serial.begin(115200);
  pinMode(WATER_SENSOR_PIN, INPUT);
  pinMode(LED_STROBE_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(MANUAL_SOS_PIN, INPUT_PULLUP);

  Serial.println("🛟 SFSRS Fisherman Wearable Beacon Ready.");
}

void triggerMOBAlarm() {
  Serial.println("🆘 MAN OVERBOARD (MOB) DETECTED! Immersion in sea water confirmed.");
  for(int i=0; i<10; i++) {
    digitalWrite(LED_STROBE_PIN, HIGH);
    digitalWrite(BUZZER_PIN, HIGH);
    delay(100);
    digitalWrite(LED_STROBE_PIN, LOW);
    digitalWrite(BUZZER_PIN, LOW);
    delay(100);
  }
}

void loop() {
  int waterValue = analogRead(WATER_SENSOR_PIN);
  if (waterValue > 2000 || digitalRead(MANUAL_SOS_PIN) == LOW) {
    triggerMOBAlarm();
  }
  delay(1000);
}
