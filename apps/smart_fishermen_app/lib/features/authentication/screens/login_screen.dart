import 'package:flutter/material.dart';
import '../../../core/constants/app_colors.dart';
import '../widgets/role_selector.dart';
import '../../fisherman/dashboard/fisherman_dashboard.dart';
import '../../family/dashboard/family_dashboard.dart';
import '../../rescue/dashboard/rescue_dashboard.dart';
import '../../admin/dashboard/admin_dashboard.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  String selectedRole = 'fisherman';
  final _emailController = TextEditingController(text: 'ramesh@fisherman.org');
  final _passwordController = TextEditingController(text: 'password123');

  void _handleLogin() {
    Widget targetScreen;
    if (selectedRole == 'fisherman') {
      targetScreen = const FishermanDashboard();
    } else if (selectedRole == 'family') {
      targetScreen = const FamilyDashboard();
    } else if (selectedRole == 'rescue_team') {
      targetScreen = const RescueDashboardScreen();
    } else {
      targetScreen = const AdminDashboardScreen();
    }
    Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => targetScreen));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Icon(Icons.shield_outlined, size: 64, color: AppColors.primaryLight),
              const SizedBox(height: 16),
              const Text('SFSRS Portal Login', textAlign: TextAlign.center, style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Colors.white)),
              const SizedBox(height: 24),
              RoleSelector(selectedRole: selectedRole, onRoleSelected: (r) => setState(() => selectedRole = r)),
              const SizedBox(height: 20),
              TextField(controller: _emailController, decoration: const InputDecoration(labelText: 'Email Address', filled: true, fillColor: AppColors.darkSurface)),
              const SizedBox(height: 12),
              TextField(controller: _passwordController, obscureText: true, decoration: const InputDecoration(labelText: 'Password', filled: true, fillColor: AppColors.darkSurface)),
              const SizedBox(height: 24),
              ElevatedButton(
                style: ElevatedButton.styleFrom(backgroundColor: AppColors.primary, padding: const EdgeInsets.symmetric(vertical: 16)),
                onPressed: _handleLogin,
                child: const Text('LOGIN TO PORTAL', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
