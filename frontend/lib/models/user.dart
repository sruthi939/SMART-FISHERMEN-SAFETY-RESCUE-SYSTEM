class User {
  final String id;
  final String name;
  final String email;
  final String role; // fisherman, family, rescue_team, gov_admin
  final String? avatarUrl;

  User({
    required this.id,
    required this.name,
    required this.email,
    required this.role,
    this.avatarUrl,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      email: json['email'] ?? '',
      role: json['role'] ?? 'fisherman',
      avatarUrl: json['avatar'] ?? json['avatarUrl'],
    );
  }
}
