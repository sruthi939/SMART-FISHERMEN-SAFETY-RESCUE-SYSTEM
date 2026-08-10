-- Smart Fishermen Safety & Rescue System (SFSRS) Schema

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    password_hash TEXT NOT NULL,
    role TEXT CHECK(role IN ('fisherman', 'family', 'rescue_team', 'gov_admin')) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS boats (
    id TEXT PRIMARY KEY,
    registration_number TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    owner_id TEXT REFERENCES users(id),
    boat_type TEXT,
    length_meters REAL,
    home_port TEXT,
    license_number TEXT,
    license_status TEXT DEFAULT 'ACTIVE',
    insurance_policy TEXT,
    insurance_expiry DATE,
    status TEXT DEFAULT 'IN_PORT', -- IN_PORT, AT_SEA, EMERGENCY, MAINTENANCE
    last_latitude REAL,
    last_longitude REAL,
    last_updated TIMESTAMP
);

CREATE TABLE IF NOT EXISTS crew (
    id TEXT PRIMARY KEY,
    boat_id TEXT REFERENCES boats(id),
    fisherman_id TEXT REFERENCES users(id),
    family_contact_id TEXT REFERENCES users(id),
    role TEXT DEFAULT 'CREW', -- CAPTAIN, CREW, DECKHAND
    wearable_id TEXT,
    status TEXT DEFAULT 'ON_BOARD' -- ON_BOARD, OVERBOARD, RESCUED, MISSING
);

CREATE TABLE IF NOT EXISTS wearables (
    id TEXT PRIMARY KEY,
    mac_address TEXT UNIQUE NOT NULL,
    fisherman_id TEXT REFERENCES users(id),
    battery_level INTEGER DEFAULT 100,
    water_immersion BOOLEAN DEFAULT 0,
    fall_detected BOOLEAN DEFAULT 0,
    status TEXT DEFAULT 'ACTIVE', -- ACTIVE, ALARM, INACTIVE
    last_latitude REAL,
    last_longitude REAL,
    last_seen TIMESTAMP
);

CREATE TABLE IF NOT EXISTS telemetry (
    id TEXT PRIMARY KEY,
    boat_id TEXT REFERENCES boats(id),
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    speed_knots REAL,
    heading_deg REAL,
    battery_v REAL,
    fuel_pct INTEGER,
    water_leak BOOLEAN DEFAULT 0,
    tilt_angle REAL DEFAULT 0,
    engine_temp_c REAL,
    signal_type TEXT DEFAULT 'LTE', -- LTE, SATELLITE, MESH
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS emergencies (
    id TEXT PRIMARY KEY,
    incident_number TEXT UNIQUE NOT NULL,
    boat_id TEXT REFERENCES boats(id),
    fisherman_id TEXT REFERENCES users(id),
    emergency_type TEXT NOT NULL, -- BOAT_SOS, MAN_OVERBOARD, ENGINE_FAILURE, MEDICAL, CAPSIZE
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    severity TEXT DEFAULT 'CRITICAL', -- LOW, MEDIUM, HIGH, CRITICAL
    status TEXT DEFAULT 'ACTIVE', -- ACTIVE, DISPATCHED, RESCUED, CLOSED, FALSE_ALARM
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rescue_units (
    id TEXT PRIMARY KEY,
    unit_name TEXT NOT NULL,
    unit_type TEXT NOT NULL, -- COAST_GUARD_BOAT, HELICOPTER, MARINE_POLICE, NAVY_VESSEL
    base_station TEXT NOT NULL,
    latitude REAL,
    longitude REAL,
    status TEXT DEFAULT 'STANDBY', -- STANDBY, DISPATCHED, ON_SITE, RETURNING
    current_emergency_id TEXT REFERENCES emergencies(id)
);

CREATE TABLE IF NOT EXISTS weather_forecasts (
    id TEXT PRIMARY KEY,
    region TEXT NOT NULL,
    wind_speed_knots REAL,
    wave_height_m REAL,
    sea_current_knots REAL,
    pressure_hpa REAL,
    risk_level TEXT DEFAULT 'SAFE', -- SAFE, MODERATE_RISK, HIGH_RISK, RETURN_IMMEDIATELY
    advisory TEXT,
    forecast_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS government_records (
    id TEXT PRIMARY KEY,
    boat_id TEXT REFERENCES boats(id),
    subsidy_status TEXT DEFAULT 'APPROVED',
    subsidy_amount_inr REAL,
    safety_inspection_date DATE,
    compliance_score INTEGER DEFAULT 95
);
