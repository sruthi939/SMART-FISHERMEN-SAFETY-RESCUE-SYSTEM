class CrewMember {
  final String id;
  final String boatId;
  final String name;
  final String role;
  final String wearableId;
  final String status; // ON_BOARD, OVERBOARD, RESCUED

  CrewMember({
    required this.id,
    required this.boatId,
    required this.name,
    required this.role,
    required this.wearableId,
    required this.status,
  });

  factory CrewMember.fromJson(Map<String, dynamic> json) {
    return CrewMember(
      id: json['id'] ?? '',
      boatId: json['boatId'] ?? '',
      name: json['name'] ?? '',
      role: json['role'] ?? 'CREW',
      wearableId: json['wearableId'] ?? '',
      status: json['status'] ?? 'ON_BOARD',
    );
  }
}
