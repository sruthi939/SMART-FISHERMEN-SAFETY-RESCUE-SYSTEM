import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';

class BatteryStatus extends StatelessWidget {
  final double batteryV;
  const BatteryStatus({super.key, required this.batteryV});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.between,
      children: [
        const Text('Backup Battery Bank', style: TextStyle(color: AppColors.textSecondary, fontSize: 12)),
        Text('${batteryV.toStringAsFixed(1)} V (DC)', style: const TextStyle(fontWeight: FontWeight.bold, color: AppColors.safeGreen)),
      ],
    );
  }
}
