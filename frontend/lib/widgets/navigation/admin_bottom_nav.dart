import 'package:flutter/material.dart';

class AdminBottomNav extends StatelessWidget {
  final int currentIndex;
  final Function(int) onTap;

  const AdminBottomNav({super.key, required this.currentIndex, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: currentIndex,
      onTap: onTap,
      type: BottomNavigationBarType.fixed,
      backgroundColor: const Color(0xFF0B1329),
      selectedItemColor: Colors.purpleAccent,
      unselectedItemColor: Colors.grey,
      items: const [
        BottomNavigationBarItem(icon: Icon(Icons.account_balance), label: 'Registry'),
        BottomNavigationBarItem(icon: Icon(Icons.directions_boat), label: 'Vessels'),
        BottomNavigationBarItem(icon: Icon(Icons.analytics), label: 'Analytics'),
      ],
    );
  }
}
