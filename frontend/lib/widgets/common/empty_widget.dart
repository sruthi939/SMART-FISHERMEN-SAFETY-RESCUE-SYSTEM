import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';

class EmptyWidget extends StatelessWidget {
  final String message;
  const EmptyWidget({super.key, required this.message});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(message, style: const TextStyle(color: AppColors.textMuted)),
    );
  }
}
