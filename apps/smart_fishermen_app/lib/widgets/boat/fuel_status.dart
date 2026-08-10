import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';

class FuelStatus extends StatelessWidget {
  final int fuelPct;
  const FuelStatus({super.key, required this.fuelPct});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.between,
          children: [
            const Text('Diesel Fuel Level', style: TextStyle(color: AppColors.textSecondary, fontSize: 12)),
            Text('$fuelPct%', style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
          ],
        ),
        const SizedBox(height: 6),
        LinearProgressIndicator(
          value: fuelPct / 100.0,
          color: fuelPct > 50 ? AppColors.safeGreen : (fuelPct > 20 ? AppColors.mobOrange : AppColors.sosRed),
          backgroundColor: AppColors.darkSurface,
          minHeight: 8,
          borderRadius: BorderRadius.circular(4),
        ),
      ],
    );
  }
}
