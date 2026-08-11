import 'package:flutter/material.dart';
import '../../../core/constants/app_colors.dart';

class RoleSelector extends StatelessWidget {
  final String selectedRole;
  final Function(String) onRoleSelected;

  const RoleSelector({super.key, required this.selectedRole, required this.onRoleSelected});

  @override
  Widget build(BuildContext context) {
    final roles = [
      {'id': 'fisherman', 'label': 'Fisherman'},
      {'id': 'family', 'label': 'Family'},
      {'id': 'rescue_team', 'label': 'Coast Guard'},
      {'id': 'gov_admin', 'label': 'Govt Admin'},
    ];

    return Wrap(
      spacing: 8,
      children: roles.map((r) {
        final isSelected = selectedRole == r['id'];
        return ChoiceChip(
          label: Text(r['label']!),
          selected: isSelected,
          selectedColor: AppColors.primary,
          onSelected: (_) => onRoleSelected(r['id']!),
        );
      }).toList(),
    );
  }
}
