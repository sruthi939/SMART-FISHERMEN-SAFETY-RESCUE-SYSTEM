class Boat {
  final String id;
  final String registrationNumber;
  final String name;
  final String boatType;
  final String homePort;
  final String status;
  final double latitude;
  final double longitude;
  final double speedKnots;
  final int fuelPct;
  final double batteryV;
  final bool waterLeak;
  final double tiltAngle;

  Boat({
    required this.id,
    required this.registrationNumber,
    required this.name,
    required this.boatType,
    required this.homePort,
    required this.status,
    required this.latitude,
    required this.longitude,
    required this.speedKnots,
    required this.fuelPct,
    required this.batteryV,
    required this.waterLeak,
    required this.tiltAngle,
  });

  factory Boat.fromJson(Map<String, dynamic> json) {
    return Boat(
      id: json['id'] ?? '',
      registrationNumber: json['registrationNumber'] ?? '',
      name: json['name'] ?? '',
      boatType: json['boatType'] ?? 'Trawler',
      homePort: json['homePort'] ?? 'Kochi Harbor',
      status: json['status'] ?? 'IN_PORT',
      latitude: (json['latitude'] ?? 9.9312).toDouble(),
      longitude: (json['longitude'] ?? 76.2673).toDouble(),
      speedKnots: (json['speedKnots'] ?? 0.0).toDouble(),
      fuelPct: (json['fuelPct'] ?? 100).toInt(),
      batteryV: (json['batteryV'] ?? 13.0).toDouble(),
      waterLeak: json['waterLeak'] ?? false,
      tiltAngle: (json['tiltAngle'] ?? 0.0).toDouble(),
    );
  }
}
