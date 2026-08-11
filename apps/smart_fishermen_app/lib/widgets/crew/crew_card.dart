import 'package:flutter/material.dart';
import '../../models/crew_member.dart';
import '../../core/constants/app_colors.dart';

class CrewCard extends StatelessWidget {
  final CrewMember crewMember;
  final VoidCallback? onSimulateMOB;

  const CrewCard({super.key, required this.crewMember, this.onSimulateMOB});

  @override
  Widget build(BuildContext context) {
    final isOverboard = crewMember.status == 'OVERBOARD';

    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: isOverboard ? AppColors.sosDark.withOpacity(0.4) : AppColors.darkCard,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: isOverboard ? AppColors.sosRed : AppColors.darkBorder),
      ),
      child: Row(
        children: [
          CircleAvatar(
            backgroundColor: isOverboard ? AppColors.sosRed : AppColors.primary,
            child: Icon(isOverboard ? Icons.warning : Icons.person, color: Colors.white),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(crewMember.name, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.white)),
                Text('${crewMember.role} • Wearable: ${crewMember.wearableId}', style: const TextStyle(fontSize: 11, color: Colors.grey)),
              ],
            ),
          ),
          if (onSimulateMOB != null && !isOverboard)
            IconButton(
              icon: const Icon(Icons.life_preserver, color: AppColors.mobOrange),
              onPressed: onSimulateMOB,
              tooltip: 'Simulate MOB',
            )
        ],
      ),
    );
  }
}
