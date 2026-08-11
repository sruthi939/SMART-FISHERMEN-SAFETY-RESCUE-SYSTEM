import 'package:flutter/material.dart';
import '../features/authentication/screens/splash_screen.dart';
import '../features/authentication/screens/login_screen.dart';
import '../features/fisherman/dashboard/fisherman_dashboard.dart';
import '../features/family/dashboard/family_dashboard.dart';
import '../features/rescue/dashboard/rescue_dashboard.dart';
import '../features/admin/dashboard/admin_dashboard.dart';

class AppRouter {
  static const String splash = '/';
  static const String login = '/login';
  static const String fishermanDashboard = '/fisherman';
  static const String familyDashboard = '/family';
  static const String rescueDashboard = '/rescue';
  static const String adminDashboard = '/admin';

  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case splash:
        return MaterialPageRoute(builder: (_) => const SplashScreen());
      case login:
        return MaterialPageRoute(builder: (_) => const LoginScreen());
      case fishermanDashboard:
        return MaterialPageRoute(builder: (_) => const FishermanDashboard());
      case familyDashboard:
        return MaterialPageRoute(builder: (_) => const FamilyDashboard());
      case rescueDashboard:
        return MaterialPageRoute(builder: (_) => const RescueDashboardScreen());
      case adminDashboard:
        return MaterialPageRoute(builder: (_) => const AdminDashboardScreen());
      default:
        return MaterialPageRoute(builder: (_) => const SplashScreen());
    }
  }
}
