import 'package:flutter/material.dart';

class FamilyBottomNav extends StatelessWidget {
  final int currentIndex;
  final Function(int) onTap;

  const FamilyBottomNav({super.key, required this.currentIndex, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: currentIndex,
      onTap: onTap,
      type: BottomNavigationBarType.fixed,
      backgroundColor: const Color(0xFF0B1329),
      selectedItemColor: Colors.emerald,
      unselectedItemColor: Colors.grey,
      items: const [
        BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
        BottomNavigationBarItem(icon: Icon(Icons.directions_boat), label: 'Boat Radar'),
        BottomNavigationBarItem(icon: Icon(Icons.notifications), label: 'Alerts'),
      ],
    );
  }
}
