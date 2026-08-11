const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, 'sfsrs_data.json');

const initialData = {
  users: [
    {
      id: 'u-fish-01',
      name: 'Ramesh Kumar',
      email: 'ramesh@fisherman.org',
      phone: '+91 9876543210',
      password: 'password123',
      role: 'fisherman',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    {
      id: 'u-fish-02',
      name: 'Vijay Sea-Captain',
      email: 'vijay@fisherman.org',
      phone: '+91 9876543211',
      password: 'password123',
      role: 'fisherman',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
    },
    {
      id: 'u-fam-01',
      name: 'Lakshmi Kumar',
      email: 'lakshmi@family.org',
      phone: '+91 9876543212',
      password: 'password123',
      role: 'family',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'
    },
    {
      id: 'u-resc-01',
      name: 'Commandant Rajesh',
      email: 'rajesh@coastguard.gov',
      phone: '+91 9876543213',
      password: 'password123',
      role: 'rescue_team',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    },
    {
      id: 'u-admin-01',
      name: 'Officer Suresh Admin',
      email: 'suresh@fisheries.gov.in',
      phone: '+91 9876543214',
      password: 'password123',
      role: 'gov_admin',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150'
    }
  ],
  boats: [
    {
      id: 'b-102',
      registrationNumber: 'KL-07-FISH-102',
      name: 'Sea Falcon',
      ownerId: 'u-fish-01',
      boatType: 'Deep Sea Trawler (15m)',
      lengthMeters: 15.4,
      homePort: 'Kochi Harbor, Kerala',
      licenseNumber: 'LIC-KER-2024-889',
      licenseStatus: 'ACTIVE',
      insurancePolicy: 'UIIC-MAR-99812',
      insuranceExpiry: '2027-12-31',
      status: 'AT_SEA',
      latitude: 9.9312,
      longitude: 76.2673,
      speedKnots: 8.4,
      headingDeg: 240,
      fuelPct: 78,
      batteryV: 13.2,
      waterLeak: false,
      tiltAngle: 3.5,
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'b-105',
      registrationNumber: 'KL-07-FISH-105',
      name: 'Ocean Defender',
      ownerId: 'u-fish-02',
      boatType: 'Gillnetter Boat (12m)',
      lengthMeters: 12.1,
      homePort: 'Kollam Port, Kerala',
      licenseNumber: 'LIC-KER-2024-912',
      licenseStatus: 'ACTIVE',
      insurancePolicy: 'UIIC-MAR-77341',
      insuranceExpiry: '2027-06-30',
      status: 'AT_SEA',
      latitude: 9.8540,
      longitude: 76.1200,
      speedKnots: 6.2,
      headingDeg: 195,
      fuelPct: 62,
      batteryV: 12.8,
      waterLeak: false,
      tiltAngle: 5.1,
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'b-88',
      registrationNumber: 'TN-01-FISH-88',
      name: 'Wave Rider',
      ownerId: 'u-fish-01',
      boatType: 'Motorized Crafts',
      lengthMeters: 9.8,
      homePort: 'Kanyakumari Port',
      licenseNumber: 'LIC-TN-2025-003',
      licenseStatus: 'PENDING_RENEWAL',
      insurancePolicy: 'UIIC-MAR-11200',
      insuranceExpiry: '2026-09-15',
      status: 'IN_PORT',
      latitude: 9.9600,
      longitude: 76.2800,
      speedKnots: 0.0,
      headingDeg: 0,
      fuelPct: 95,
      batteryV: 13.5,
      waterLeak: false,
      tiltAngle: 0.0,
      lastUpdated: new Date().toISOString()
    }
  ],
  crew: [
    {
      id: 'c-01',
      boatId: 'b-102',
      fishermanId: 'u-fish-01',
      familyId: 'u-fam-01',
      name: 'Ramesh Kumar (Captain)',
      role: 'CAPTAIN',
      wearableId: 'wb-001',
      status: 'ON_BOARD'
    },
    {
      id: 'c-02',
      boatId: 'b-102',
      fishermanId: 'u-fish-02',
      familyId: 'u-fam-01',
      name: 'Vijay Crewman',
      role: 'DECKHAND',
      wearableId: 'wb-002',
      status: 'ON_BOARD'
    },
    {
      id: 'c-03',
      boatId: 'b-105',
      fishermanId: 'u-fish-02',
      familyId: 'u-fam-01',
      name: 'Anil Kumar',
      role: 'ENGINEER',
      wearableId: 'wb-003',
      status: 'ON_BOARD'
    }
  ],
  wearables: [
    {
      id: 'wb-001',
      macAddress: 'AA:BB:CC:11:22:33',
      fishermanId: 'u-fish-01',
      fishermanName: 'Ramesh Kumar',
      batteryLevel: 94,
      waterImmersion: false,
      fallDetected: false,
      status: 'ACTIVE',
      latitude: 9.9312,
      longitude: 76.2673,
      lastSeen: new Date().toISOString()
    },
    {
      id: 'wb-002',
      macAddress: 'AA:BB:CC:44:55:66',
      fishermanId: 'u-fish-02',
      fishermanName: 'Vijay Crewman',
      batteryLevel: 88,
      waterImmersion: false,
      fallDetected: false,
      status: 'ACTIVE',
      latitude: 9.9312,
      longitude: 76.2673,
      lastSeen: new Date().toISOString()
    }
  ],
  emergencies: [
    {
      id: 'em-1001',
      incidentNumber: 'INC-2026-0811-01',
      boatId: 'b-105',
      fishermanId: 'u-fish-02',
      emergencyType: 'MAN_OVERBOARD',
      latitude: 9.8540,
      longitude: 76.1200,
      severity: 'CRITICAL',
      status: 'DISPATCHED',
      description: 'Water immersion sensor triggered on Wearable WB-003 for Anil Kumar. Boat KL-07-FISH-105 reports missing crew member.',
      createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      assignedRescueUnit: 'CG-Kochi-1'
    }
  ],
  rescueUnits: [
    {
      id: 'ru-01',
      unitName: 'CG-Kochi-1 (Fast Patrol Vessel)',
      unitType: 'COAST_GUARD_BOAT',
      baseStation: 'Coast Guard District HQ No. 4, Kochi',
      latitude: 9.9200,
      longitude: 76.2500,
      status: 'DISPATCHED',
      currentEmergencyId: 'em-1001'
    },
    {
      id: 'ru-02',
      unitName: 'CG-Copter-03 (Sea King Helicopter)',
      unitType: 'HELICOPTER',
      baseStation: 'INS Garuda Naval Air Station',
      latitude: 9.9500,
      longitude: 76.2700,
      status: 'STANDBY',
      currentEmergencyId: null
    },
    {
      id: 'ru-03',
      unitName: 'CG-Drone-Alpha (Autonomous Thermal IR SAR Drone)',
      unitType: 'DRONE_SAR',
      baseStation: 'Coast Guard District HQ No. 4, Kochi',
      latitude: 9.8900,
      longitude: 76.2100,
      status: 'STANDBY',
      cameraFeedUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600',
      currentEmergencyId: null
    }
  ],
  weatherForecasts: [
    {
      id: 'wf-01',
      region: 'Arabian Sea South West / Kochi Coast',
      windSpeedKnots: 22.5,
      waveHeightM: 2.8,
      seaCurrentKnots: 1.8,
      pressureHpa: 1004,
      riskLevel: 'MODERATE_RISK',
      advisory: 'Moderate depression forming 40 nautical miles West. Fishing vessels advised to maintain contact and avoid high-sea zone 4.',
      forecastTime: new Date().toISOString()
    }
  ],
  governmentRecords: [
    {
      id: 'gov-102',
      boatId: 'b-102',
      subsidyStatus: 'APPROVED',
      subsidyAmountINR: 45000,
      safetyInspectionDate: '2026-01-15',
      complianceScore: 98,
      blockchainTxHash: '0x8f23a9b1c74d8120e3a45f9921b7c8e90a12f3456789abcd0123ef4567890abc'
    },
    {
      id: 'gov-105',
      boatId: 'b-105',
      subsidyStatus: 'APPROVED',
      subsidyAmountINR: 40000,
      safetyInspectionDate: '2026-02-10',
      complianceScore: 92,
      blockchainTxHash: '0x4e12c8d7b3a95012f45e67890a12b3456789cdef0123456789abcdef01234567'
    }
  ]
};

function seedDatabase() {
  console.log('Seeding SFSRS database file...');
  fs.writeFileSync(dbFilePath, JSON.stringify(initialData, null, 2), 'utf-8');
  console.log(`Database seeded successfully to ${dbFilePath}`);
}

if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, initialData, dbFilePath };
