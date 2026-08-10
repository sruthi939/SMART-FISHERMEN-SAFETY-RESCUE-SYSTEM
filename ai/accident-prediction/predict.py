import sys
import json

def predict_capsize_risk(tilt_angle, fuel_pct, battery_v, water_leak):
    capsize_prob = 0.0
    if abs(tilt_angle) > 30:
        capsize_prob += 0.70
    elif abs(tilt_angle) > 15:
        capsize_prob += 0.30

    if water_leak:
        capsize_prob += 0.45

    if fuel_pct < 10:
        capsize_prob += 0.15

    capsize_prob = min(1.0, capsize_prob)
    status = "CRITICAL_CAPSIZE_WARNING" if capsize_prob > 0.6 else ("WARNING" if capsize_prob > 0.3 else "NORMAL")

    return {
        "capsize_probability": round(capsize_prob, 2),
        "accident_status": status
    }

if __name__ == "__main__":
    result = predict_capsize_risk(18.5, 45, 12.8, True)
    print(json.dumps(result))
