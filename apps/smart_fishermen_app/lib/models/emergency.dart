class Emergency {
  final String id;
  final String incidentNumber;
  final String boatId;
  final String boatName;
  final String emergencyType; // BOAT_SOS, MAN_OVERBOARD, CAPSIZE
  final double latitude;
  final double longitude;
  final String severity;
  final String status;
  final String description;
  final String? assignedRescueUnit;

  Emergency({
    required this.id,
    required this.incidentNumber,
    required this.boatId,
    required this.boatName,
    required this.emergencyType,
    required this.latitude,
    required this.longitude,
    required this.severity,
    required this.status,
    required this.description,
    this.assignedRescueUnit,
  });

  factory Emergency.fromJson(Map<String, dynamic> json) {
    return Emergency(
      id: json['id'] ?? '',
      incidentNumber: json['incidentNumber'] ?? '',
      boatId: json['boatId'] ?? '',
      boatName: json['boatName'] ?? '',
      emergencyType: json['emergencyType'] ?? 'BOAT_SOS',
      latitude: (json['latitude'] ?? 0.0).toDouble(),
      longitude: (json['longitude'] ?? 0.0).toDouble(),
      severity: json['severity'] ?? 'CRITICAL',
      status: json['status'] ?? 'ACTIVE',
      description: json['description'] ?? '',
      assignedRescueUnit: json['assignedRescueUnit'],
    );
  }
}
