import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';

class LocationMapWidget extends StatelessWidget {
  final double latitude;
  final double longitude;

  const LocationMapWidget({
    super.key,
    required this.latitude,
    required this.longitude,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 220,
      width: double.infinity,
      decoration: BoxDecoration(
        color: AppColors.darkSurface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.darkBorder),
      ),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.location_on, color: AppColors.primaryLight, size: 40),
            const SizedBox(height: 8),
            Text('GPS Radar Location', style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
            Text('${latitude.toStringAsFixed(4)}° N, ${longitude.toStringAsFixed(4)}° E', style: const TextStyle(fontSize: 12, color: AppColors.textSecondary)),
          ],
        ),
      ),
    );
  }
}
