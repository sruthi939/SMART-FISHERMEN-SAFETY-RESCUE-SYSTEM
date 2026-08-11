class GpsLocation {
  final double latitude;
  final double longitude;
  final double speedKnots;
  final DateTime timestamp;

  GpsLocation({
    required this.latitude,
    required this.longitude,
    required this.speedKnots,
    required this.timestamp,
  });
}
