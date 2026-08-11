import 'package:flutter/material.dart';
import '../../models/user.dart';
import '../../services/auth_service.dart';

class AuthController extends ChangeNotifier {
  final AuthService _authService = AuthService();
  User? currentUser;
  bool isLoading = false;
  String selectedRole = 'fisherman';

  void setRole(String role) {
    selectedRole = role;
    notifyListeners();
  }

  Future<bool> login(String email, String role) async {
    isLoading = true;
    notifyListeners();
    try {
      currentUser = await _authService.login(email, role);
      isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      isLoading = false;
      notifyListeners();
      return false;
    }
  }
}
