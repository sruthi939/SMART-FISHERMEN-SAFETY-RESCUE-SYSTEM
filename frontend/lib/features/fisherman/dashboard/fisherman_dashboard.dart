import 'package:flutter/material.dart';
import '../../../core/constants/app_colors.dart';
import '../../../widgets/emergency/sos_button.dart';
import '../../../widgets/boat/fuel_status.dart';
import '../../../widgets/boat/battery_status.dart';
import '../../../widgets/weather/weather_card.dart';
import '../../../models/weather.dart';
import '../../../widgets/navigation/fisherman_bottom_nav.dart';

class FishermanDashboard extends StatefulWidget {
  const FishermanDashboard({super.key});

  @override
  State<FishermanDashboard> createState() => _FishermanDashboardState();
}

class _FishermanDashboardState extends State<FishermanDashboard> {
  int _currentIndex = 0;
  bool _sosActive = false;

  final sampleWeather = Weather(
    region: 'Arabian Sea South West',
    windSpeedKnots: 18.5,
    waveHeightM: 2.1,
    seaCurrentKnots: 1.2,
    riskLevel: 'MODERATE_RISK',
    advisory: 'Moderate sea swell. Maintain continuous telemetry link.',
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      appBar: AppBar(
        backgroundColor: AppColors.darkSurface,
        title: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('KL-07-FISH-102 • Sea Falcon', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
            Text('Status: AT_SEA • Harbor: 14.2 NM West', style: TextStyle(fontSize: 11, color: AppColors.textSecondary)),
          ],
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            if (_sosActive)
              Container(
                margin: const EdgeInsets.bottom(16),
                padding: const EdgeInsets.all(12),
                color: Colors.red,
                child: const Row(
                  children: [
                    Icon(Icons.warning, color: Colors.white),
                    SizedBox(width: 8),
                    Expanded(child: Text('MAYDAY SOS BROADCAST ACTIVE', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold))),
                  ],
                ),
              ),

            // SOS Trigger Button
            SosButton(onSosTriggered: () {
              setState(() => _sosActive = true);
            }),

            const SizedBox(height: 20),

            // Boat Telemetry Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.darkCard,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.darkBorder),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('ESP32 Boat Telemetry', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
                  const SizedBox(height: 12),
                  const FuelStatus(fuelPct: 78),
                  const SizedBox(height: 12),
                  const BatteryStatus(batteryV: 13.2),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // Weather Card
            WeatherCard(weather: sampleWeather),
          ],
        ),
      ),
      bottomNavigationBar: FishermanBottomNav(
        currentIndex: _currentIndex,
        onTap: (i) => setState(() => _currentIndex = i),
      ),
    );
  }
}
