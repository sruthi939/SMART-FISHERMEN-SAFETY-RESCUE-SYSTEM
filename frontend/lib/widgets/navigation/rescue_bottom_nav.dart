import 'package:flutter/material.dart';

class RescueBottomNav extends StatelessWidget {
  final int currentIndex;
  final Function(int) onTap;

  const RescueBottomNav({super.key, required this.currentIndex, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: currentIndex,
      onTap: onTap,
      type: BottomNavigationBarType.fixed,
      backgroundColor: const Color(0xFF0B1329),
      selectedItemColor: Colors.redAccent,
      unselectedItemColor: Colors.grey,
      items: const [
        BottomNavigationBarItem(icon: Icon(Icons.shield), label: 'Ops Center'),
        BottomNavigationBarItem(icon: Icon(Icons.map), label: 'Live Map'),
        BottomNavigationBarItem(icon: Icon(Icons.warning), label: 'Distress Queue'),
      ],
    );
  }
}
