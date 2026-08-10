import 'package:flutter/material.dart';
import '../../models/weather.dart';
import '../../core/constants/app_colors.dart';
import '../common/app_card.dart';

class WeatherCard extends StatelessWidget {
  final Weather weather;
  const WeatherCard({super.key, required this.weather});

  @override
  Widget build(BuildContext context) {
    return AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.between,
            children: [
              const Text('AI Weather Safety Advisory', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
              Chip(
                label: Text(weather.riskLevel, style: const TextStyle(fontSize: 10, color: Colors.white)),
                backgroundColor: weather.riskLevel == 'SAFE' ? AppColors.safeGreen : AppColors.mobOrange,
              )
            ],
          ),
          const SizedBox(height: 8),
          Text(weather.advisory, style: const TextStyle(fontSize: 12, color: AppColors.textSecondary)),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Wind: ${weather.windSpeedKnots} kn', style: const TextStyle(fontSize: 12, color: Colors.cyan)),
              Text('Waves: ${weather.waveHeightM} m', style: const TextStyle(fontSize: 12, color: Colors.blue)),
            ],
          ),
        ],
      ),
    );
  }
}
