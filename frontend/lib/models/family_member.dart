import 'user.dart';

class FamilyMember extends User {
  final String trackedFishermanId;
  final String relation;

  FamilyMember({
    required super.id,
    required super.name,
    required super.email,
    required super.role,
    super.avatarUrl,
    required this.trackedFishermanId,
    required this.relation,
  });
}
