import 'package:flutter/material.dart';
import '../../../core/constants/app_colors.dart';
import '../../../core/constants/app_strings.dart';
import 'login_screen.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(seconds: 2), () {
      Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const LoginScreen()));
    });
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      backgroundColor: AppColors.darkBackground,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.directions_boat_filled_rounded, size: 80, color: AppColors.primaryLight),
            SizedBox(height: 20),
            Text(AppStrings.appName, style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.white)),
            Text(AppStrings.appTagline, style: TextStyle(fontSize: 12, color: AppColors.textSecondary)),
          ],
        ),
      ),
    );
  }
}
