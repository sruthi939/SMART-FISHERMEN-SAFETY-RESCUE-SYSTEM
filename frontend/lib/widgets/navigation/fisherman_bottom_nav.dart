import 'package:flutter/material.dart';

class FishermanBottomNav extends StatelessWidget {
  final int currentIndex;
  final Function(int) onTap;

  const FishermanBottomNav({super.key, required this.currentIndex, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: currentIndex,
      onTap: onTap,
      type: BottomNavigationBarType.fixed,
      backgroundColor: const Color(0xFF0B1329),
      selectedItemColor: Colors.cyan,
      unselectedItemColor: Colors.grey,
      items: const [
        BottomNavigationBarItem(icon: Icon(Icons.dashboard), label: 'Dashboard'),
        BottomNavigationBarItem(icon: Icon(Icons.map), label: 'Tracking'),
        BottomNavigationBarItem(icon: Icon(Icons.cloud), label: 'Weather'),
        BottomNavigationBarItem(icon: Icon(Icons.warning), label: 'Emergency'),
      ],
    );
  }
}
