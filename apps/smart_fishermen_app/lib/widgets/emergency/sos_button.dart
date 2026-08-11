import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';

class SosButton extends StatefulWidget {
  final VoidCallback onSosTriggered;
  const SosButton({super.key, required this.onSosTriggered});

  @override
  State<SosButton> createState() => _SosButtonState();
}

class _SosButtonState extends State<SosButton> {
  bool isHolding = false;
  double progress = 0.0;

  void _startHolding() async {
    setState(() => isHolding = true);
    for (int i = 1; i <= 10; i++) {
      if (!isHolding) break;
      await Future.delayed(const Duration(milliseconds: 300));
      if (mounted) setState(() => progress = i / 10.0);
    }
    if (isHolding && progress >= 1.0) {
      widget.onSosTriggered();
    }
  }

  void _stopHolding() {
    setState(() {
      isHolding = false;
      progress = 0.0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => _startHolding(),
      onTapUp: (_) => _stopHolding(),
      onTapCancel: () => _stopHolding(),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
        decoration: BoxDecoration(
          color: AppColors.sosRed,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: AppColors.sosRed.withOpacity(0.5),
              blurRadius: 16,
              spreadRadius: 2,
            )
          ],
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.warning_amber_rounded, color: Colors.white),
            const SizedBox(width: 10),
            Text(
              isHolding ? 'HOLDING (${(progress * 100).toInt()}%)' : 'HOLD 3S FOR SOS',
              style: const TextStyle(fontWeight: FontWeight.black, color: Colors.white),
            ),
          ],
        ),
      ),
    );
  }
}
