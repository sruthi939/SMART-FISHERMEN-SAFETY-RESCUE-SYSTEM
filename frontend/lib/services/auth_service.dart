import '../core/network/api_client.dart';
import '../models/user.dart';

class AuthService {
  final ApiClient _apiClient = ApiClient();

  Future<User> login(String email, String role) async {
    final response = await _apiClient.post('/auth/login', {'email': email, 'role': role});
    return User.fromJson(response.data['user']);
  }
}
