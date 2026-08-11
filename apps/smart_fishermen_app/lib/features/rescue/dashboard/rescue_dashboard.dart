import 'package:flutter/material.dart';
import '../../../core/constants/app_colors.dart';
import '../../../widgets/navigation/rescue_bottom_nav.dart';
import '../../../widgets/emergency/emergency_card.dart';
import '../../../models/emergency.dart';

class RescueDashboardScreen extends StatefulWidget {
  const RescueDashboardScreen({super.key});

  @override
  State<RescueDashboardScreen> createState() => _RescueDashboardScreenState();
}

class _RescueDashboardScreenState extends State<RescueDashboardScreen> {
  int _currentIndex = 0;

  final sampleEmergency = Emergency(
    id: 'em-1001',
    incidentNumber: 'INC-2026-0811-01',
    boatId: 'b-105',
    boatName: 'Ocean Defender',
    emergencyType: 'MAN_OVERBOARD',
    latitude: 9.8540,
    longitude: 76.1200,
    severity: 'CRITICAL',
    status: 'ACTIVE',
    description: 'Water immersion sensor triggered on Wearable WB-003 for Anil Kumar.',
    assignedRescueUnit: 'CG-Kochi-1',
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        backgroundColor: AppColors.darkSurface,
        title: const Text('Coast Guard Rescue Command', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Active SOS Incident Queue', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
            const SizedBox(height: 12),
            EmergencyCard(
              emergency: sampleEmergency,
              onDispatch: () {
                ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Dispatched CG-Kochi-1 Fast Patrol Vessel')));
              },
            ),
          ],
        ),
      ),
      bottomNavigationBar: RescueBottomNav(
        currentIndex: _currentIndex,
        onTap: (i) => setState(() => _currentIndex = i),
      ),
    );
  }
}
