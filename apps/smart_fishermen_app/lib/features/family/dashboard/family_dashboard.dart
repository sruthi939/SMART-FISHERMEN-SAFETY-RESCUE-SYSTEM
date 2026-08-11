import 'package:flutter/material.dart';
import '../../../core/constants/app_colors.dart';
import '../../../widgets/navigation/family_bottom_nav.dart';
import '../../../widgets/map/location_map.dart';

class FamilyDashboard extends StatefulWidget {
  const FamilyDashboard({super.key});

  @override
  State<FamilyDashboard> createState() => _FamilyDashboardState();
}

class _FamilyDashboardState extends State<FamilyDashboard> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        backgroundColor: AppColors.darkSurface,
        title: const Text('Family Safety Radar', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.darkCard,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.darkBorder),
              ),
              child: const Row(
                children: [
                  CircleAvatar(radius: 24, backgroundColor: Colors.emerald, child: Icon(Icons.person, color: Colors.white)),
                  SizedBox(width: 12),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Ramesh Kumar (Captain)', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white, fontSize: 16)),
                      Text('Sea Falcon (KL-07-FISH-102)', style: TextStyle(color: AppColors.textSecondary, fontSize: 12)),
                      Text('ETA: 6:30 PM Today (4.2 hrs away)', style: TextStyle(color: AppColors.safeGreen, fontWeight: FontWeight.bold, fontSize: 12)),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            const LocationMapWidget(latitude: 9.9312, longitude: 76.2673),
          ],
        ),
      ),
      bottomNavigationBar: FamilyBottomNav(
        currentIndex: _currentIndex,
        onTap: (i) => setState(() => _currentIndex = i),
      ),
    );
  }
}
