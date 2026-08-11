class Wearable {
  final String id;
  final String macAddress;
  final int batteryLevel;
  final bool waterImmersion;
  final bool fallDetected;
  final String status;

  Wearable({
    required this.id,
    required this.macAddress,
    required this.batteryLevel,
    required this.waterImmersion,
    required this.fallDetected,
    required this.status,
  });

  factory Wearable.fromJson(Map<String, dynamic> json) {
    return Wearable(
      id: json['id'] ?? '',
      macAddress: json['macAddress'] ?? '',
      batteryLevel: json['batteryLevel'] ?? 100,
      waterImmersion: json['waterImmersion'] ?? false,
      fallDetected: json['fallDetected'] ?? false,
      status: json['status'] ?? 'ACTIVE',
    );
  }
}
