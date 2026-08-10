import sys
import json

def classify_weather_risk(wind_speed, wave_height, sea_current):
    score = 0
    if wind_speed > 35: score += 40
    elif wind_speed > 25: score += 25
    elif wind_speed > 15: score += 10

    if wave_height > 4.0: score += 40
    elif wave_height > 2.5: score += 25
    elif wave_height > 1.5: score += 10

    if sea_current > 2.5: score += 15
    elif sea_current > 1.5: score += 8

    if score >= 60:
        return "RETURN_IMMEDIATELY", "Extreme wave and wind danger detected."
    elif score >= 40:
        return "HIGH_RISK", "High wave swell. Avoid deep sea zones."
    elif score >= 20:
        return "MODERATE_RISK", "Moderate sea conditions. Exercise caution."
    return "SAFE", "Sea condition is safe for navigation."

if __name__ == "__main__":
    # Example input test
    risk, advisory = classify_weather_risk(28.0, 3.2, 1.8)
    print(json.dumps({"risk_level": risk, "advisory": advisory, "status": "AI Model Active"}))
