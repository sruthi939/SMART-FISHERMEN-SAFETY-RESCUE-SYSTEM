import 'package:flutter/material.dart';

class EmergencyTimer extends StatelessWidget {
  final int seconds;
  const EmergencyTimer({super.key, required this.seconds});

  @override
  Widget build(BuildContext context) {
    return Text(
      '00:${seconds.toString().padLeft(2, '0')}',
      style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Colors.red),
    );
  }
}
