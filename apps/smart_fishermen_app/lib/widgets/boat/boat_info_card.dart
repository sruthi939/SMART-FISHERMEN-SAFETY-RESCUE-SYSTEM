import 'package:flutter/material.dart';
import '../../models/boat.dart';
import '../common/app_card.dart';

class BoatInfoCard extends StatelessWidget {
  final Boat boat;
  const BoatInfoCard({super.key, required this.boat});

  @override
  Widget build(BuildContext context) {
    return AppCard(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(boat.name, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
              Text('Port: ${boat.homePort}', style: const TextStyle(fontSize: 12, color: Colors.grey)),
            ],
          ),
          Chip(label: Text(boat.status), backgroundColor: Colors.cyan.withOpacity(0.2)),
        ],
      ),
    );
  }
}
