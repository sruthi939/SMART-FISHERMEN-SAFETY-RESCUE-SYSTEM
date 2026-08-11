import 'package:flutter/material.dart';
import '../../models/boat.dart';
import '../common/app_card.dart';
import 'fuel_status.dart';
import 'battery_status.dart';

class BoatStatusCard extends StatelessWidget {
  final Boat boat;
  const BoatStatusCard({super.key, required this.boat});

  @override
  Widget build(BuildContext context) {
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(boat.name, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white)),
          Text(boat.registrationNumber, style: const TextStyle(fontSize: 12, color: Colors.grey)),
          const SizedBox(height: 12),
          FuelStatus(fuelPct: boat.fuelPct),
          const SizedBox(height: 8),
          BatteryStatus(batteryV: boat.batteryV),
        ],
      ),
    );
  }
}
