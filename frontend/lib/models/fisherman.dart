import 'user.dart';

class Fisherman extends User {
  final String assignedBoatId;
  final String? wearableId;
  final String emergencyContactPhone;

  Fisherman({
    required super.id,
    required super.name,
    required super.email,
    required super.role,
    super.avatarUrl,
    required this.assignedBoatId,
    this.wearableId,
    required this.emergencyContactPhone,
  });
}
