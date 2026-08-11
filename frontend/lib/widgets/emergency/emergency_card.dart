import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../models/emergency.dart';

class EmergencyCard extends StatelessWidget {
  final Emergency emergency;
  final VoidCallback? onDispatch;

  const EmergencyCard({super.key, required this.emergency, this.onDispatch});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.sosDark.withOpacity(0.3),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.sosRed),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.between,
            children: [
              Text(
                emergency.emergencyType,
                style: const TextStyle(fontWeight: FontWeight.bold, color: AppColors.sosRed),
              ),
              Text(
                emergency.incidentNumber,
                style: const TextStyle(color: AppColors.textSecondary, fontSize: 12),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(emergency.description, style: const TextStyle(color: Colors.white, fontSize: 13)),
          if (onDispatch != null) ...[
            const SizedBox(height: 12),
            ElevatedButton(
              style: ElevatedButton.styleFrom(backgroundColor: AppColors.safeGreen),
              onPressed: onDispatch,
              child: const Text('Dispatch Rescue Unit'),
            )
          ]
        ],
      ),
    );
  }
}
