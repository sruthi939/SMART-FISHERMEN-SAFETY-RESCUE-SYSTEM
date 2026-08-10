import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';

class EngineStatus extends StatelessWidget {
  final double tempC;
  const EngineStatus({super.key, required this.tempC});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.between,
      children: [
        const Text('Engine Temperature', style: TextStyle(color: AppColors.textSecondary, fontSize: 12)),
        Text('${tempC.toStringAsFixed(1)} °C', style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
      ],
    );
  }
}
