import 'package:flutter/material.dart';

class WearableStatusWidget extends StatelessWidget {
  final int battery;
  const WearableStatusWidget({super.key, required this.battery});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        const Icon(Icons.battery_std, size: 14, color: Colors.green),
        Text('$battery%', style: const TextStyle(fontSize: 11, color: Colors.grey)),
      ],
    );
  }
}
