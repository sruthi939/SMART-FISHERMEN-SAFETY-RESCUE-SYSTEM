import 'user.dart';

class RescueOfficer extends User {
  final String assignedUnitId;
  final String stationName;

  RescueOfficer({
    required super.id,
    required super.name,
    required super.email,
    required super.role,
    super.avatarUrl,
    required this.assignedUnitId,
    required this.stationName,
  });
}
