import sys
import json
import math

def predict_mob_drift(lat, lon, current_speed_knots=1.5, current_dir_deg=220, wind_speed_knots=15.0):
    """
    AI MOB Drift Trajectory Predictor
    Calculates projected victim position at +1h, +2h, and +3h based on sea current and wind leeway vectors.
    """
    R = 6371.0 # Earth radius in km
    deg2rad = math.pi / 180.0
    rad2deg = 180.0 / math.pi

    # Combine ocean current vector (100%) and wind leeway vector (3%)
    drift_speed_knots = current_speed_knots + (wind_speed_knots * 0.03)
    drift_speed_kmh = drift_speed_knots * 1.852

    drift_dir_rad = current_dir_deg * deg2rad

    trajectory = []
    for hour in range(1, 4):
        dist_km = drift_speed_kmh * hour
        
        d_lat = (dist_km * math.cos(drift_dir_rad)) / R * rad2deg
        d_lon = (dist_km * math.sin(drift_dir_rad)) / (R * math.cos(lat * deg2rad)) * rad2deg

        proj_lat = lat + d_lat
        proj_lon = lon + d_lon
        search_radius_m = int(500 + (hour * 400)) # Expanding search circle radius in meters

        trajectory.append({
            "hour": hour,
            "latitude": round(proj_lat, 5),
            "longitude": round(proj_lon, 5),
            "drift_distance_nm": round(drift_speed_knots * hour, 2),
            "search_radius_m": search_radius_m
        })

    return {
        "status": "SUCCESS",
        "initial_position": {"latitude": lat, "longitude": lon},
        "drift_speed_knots": round(drift_speed_knots, 2),
        "trajectory": trajectory
    }

if __name__ == "__main__":
    result = predict_mob_drift(9.8540, 76.1200, 1.8, 225, 20.0)
    print(json.dumps(result, indent=2))
